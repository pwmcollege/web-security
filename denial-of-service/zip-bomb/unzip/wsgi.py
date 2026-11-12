import atexit
import io
import os
import secrets
import shutil
import stat
import tempfile
import time
import unicodedata
import zipfile
import zlib
from pathlib import Path
from urllib.parse import unquote, urlsplit

from flask import Flask, abort, jsonify, render_template, request, send_file, session
from werkzeug.exceptions import HTTPException, RequestEntityTooLarge
from werkzeug.middleware.proxy_fix import ProxyFix

MAX_UPLOAD = 1_000_000


def validate_entries(archive):
    reserved_names = {"CON", "PRN", "AUX", "NUL", "CONIN$", "CONOUT$"} | {
        f"{prefix}{number}" for prefix in ("COM", "LPT") for number in "123456789¹²³"
    }
    result = []
    paths = {}

    for entry in archive.infolist():
        original = entry.orig_filename

        if not original or original != entry.filename:
            abort(400, "This ZIP contains an unsafe file path.")

        if "\\" in original or original.startswith("/") or ":" in original:
            abort(400, "This ZIP contains an unsafe file path.")

        if any(unicodedata.category(char) in {"Cc", "Cf", "Cs"} for char in original):
            abort(400, "This ZIP contains an unsafe file path.")

        name = unicodedata.normalize("NFC", original)
        directory = name.endswith("/")
        parts = name[:-1].split("/") if directory else name.split("/")

        if len(name.encode("utf-8")) > 4096 or any(
            part in {"", ".", ".."}
            or part.endswith((" ", "."))
            or len(part.encode("utf-8")) > 255
            or part.split(".", 1)[0].upper() in reserved_names
            for part in parts
        ):
            abort(400, "This ZIP contains an unsafe file path.")

        mode = (entry.external_attr >> 16) & 0xFFFF
        kind = stat.S_IFMT(mode)

        if kind not in {0, stat.S_IFREG, stat.S_IFDIR}:
            abort(
                400,
                "Links and special files are not supported. Choose a ZIP with regular files.",
            )

        if (kind == stat.S_IFDIR and not directory) or (
            kind == stat.S_IFREG and directory
        ):
            abort(400, "This ZIP contains conflicting file information.")

        if (entry.external_attr & 0x10) and not directory:
            abort(400, "This ZIP contains conflicting file information.")

        if entry.flag_bits & (0x1 | 0x40 | 0x2000):
            abort(400, "Password-protected ZIP files are not supported.")

        if entry.compress_type not in {zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED}:
            abort(
                400,
                "Choose a ZIP using standard ZIP compression (Store or Deflate).",
            )

        if directory and entry.file_size:
            abort(400, "This ZIP contains conflicting folder information.")

        canonical = "/".join(parts).casefold()

        if canonical in paths:
            abort(400, "This ZIP contains duplicate or conflicting file names.")

        paths[canonical] = directory
        result.append((entry, "/".join(parts), directory))

    for path in paths:
        parts = path.split("/")

        for end in range(1, len(parts)):
            ancestor = "/".join(parts[:end])

            if ancestor in paths and not paths[ancestor]:
                abort(400, "This ZIP contains conflicting file and folder names.")

    return result


def remove_archive(archives, archive_id):
    archive = archives.pop(archive_id, None)

    if archive:
        shutil.rmtree(archive["directory"], ignore_errors=True)


def extract_archive(root, archives, payload, name, owner):
    archive_id = secrets.token_hex(16)
    directory = Path(tempfile.mkdtemp(prefix="archive-", dir=root))
    files = []

    try:
        with zipfile.ZipFile(io.BytesIO(payload)) as archive:
            entries = validate_entries(archive)

            for entry, display_path, is_directory in entries:
                with archive.open(entry, "r") as source:
                    if is_directory:
                        if source.read(1):
                            abort(
                                400, "This ZIP contains conflicting folder information."
                            )

                        continue

                    file_id = secrets.token_hex(16)
                    blob = directory / file_id
                    flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW
                    fd = os.open(blob, flags, 0o600)

                    with os.fdopen(fd, "wb") as destination:
                        shutil.copyfileobj(source, destination, 64 * 1024)
                        size = destination.tell()

                    files.append({"id": file_id, "path": display_path, "size": size})

        record = {
            "id": archive_id,
            "name": name,
            "files": files,
            "total_size": sum(file["size"] for file in files),
            "owner": owner,
            "directory": directory,
            "created_at": time.monotonic(),
        }

        for old_id, old in list(archives.items()):
            if secrets.compare_digest(old["owner"], owner):
                remove_archive(archives, old_id)

        archives[archive_id] = record

        return record
    except Exception:
        shutil.rmtree(directory, ignore_errors=True)

        raise


def create_app(*, storage_parent=None):
    app = Flask(__name__)
    app.config.update(
        SECRET_KEY=secrets.token_bytes(32),
        MAX_CONTENT_LENGTH=MAX_UPLOAD,
        SESSION_COOKIE_NAME="unpack_session",
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Strict",
    )
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=0, x_proto=1)
    root = Path(tempfile.mkdtemp(prefix="unpack-", dir=storage_parent))
    archives = {}
    app.extensions["archive_root"] = root
    app.extensions["archives"] = archives
    atexit.register(shutil.rmtree, root, ignore_errors=True)

    @app.before_request
    def protect_requests():
        now = time.monotonic()

        for archive_id, archive in list(archives.items()):
            if now - archive["created_at"] >= 30 * 60:
                remove_archive(archives, archive_id)

        if request.method not in {"GET", "HEAD", "OPTIONS"}:
            if request.headers.get("Sec-Fetch-Site") == "cross-site":
                abort(403)

            origin = request.headers.get("Origin")

            if origin:
                try:
                    parsed = urlsplit(origin)
                except ValueError:
                    abort(403)

                if (
                    parsed.scheme != request.scheme
                    or parsed.netloc != request.host
                    or parsed.path
                    or parsed.query
                    or parsed.fragment
                ):
                    abort(403)

            token = request.headers.get("X-CSRF-Token", "")
            expected = session.get("csrf", "")

            if (
                not expected
                or not token.isascii()
                or not secrets.compare_digest(token, expected)
            ):
                abort(403)

            if request.headers.get("X-Unpack-Request") != "1":
                abort(403)

    @app.after_request
    def security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["Cache-Control"] = "no-store"
        response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; script-src 'self'; style-src 'self'; "
            "img-src 'self' data:; font-src 'self'; connect-src 'self'; "
            "object-src 'none'; base-uri 'none'; form-action 'self'"
        )

        return response

    @app.errorhandler(HTTPException)
    def http_error(error):
        messages = {
            400: error.description,
            403: "Refresh this page and try again.",
            404: "These files are no longer available. Extract your ZIP again.",
            405: "That action is not available.",
            413: "Choose a ZIP file no larger than 1 MB.",
            415: "Choose a ZIP file to extract.",
        }

        return (
            jsonify(
                error=messages.get(error.code, "The request could not be completed.")
            ),
            error.code,
        )

    @app.get("/")
    def index():
        session.setdefault("owner", secrets.token_hex(32))
        session.setdefault("csrf", secrets.token_hex(32))

        return render_template("index.html", csrf_token=session["csrf"])

    @app.get("/health")
    def health():
        return "OK\n"

    @app.post("/api/extract")
    def extract():
        if request.mimetype not in {"application/zip", "application/octet-stream"}:
            abort(415)

        payload = request.stream.read(MAX_UPLOAD + 1)

        if len(payload) > MAX_UPLOAD:
            raise RequestEntityTooLarge()

        if not payload:
            return jsonify(error="Choose a ZIP file to extract."), 400

        name = unquote(request.headers.get("X-Archive-Name", "archive.zip"))
        name = name.replace("\\", "/").rsplit("/", 1)[-1]
        name = "".join(
            c for c in name if unicodedata.category(c) not in {"Cc", "Cf", "Cs"}
        )[:255]
        name = name or "archive.zip"

        try:
            archive = extract_archive(root, archives, payload, name, session["owner"])
        except (
            zipfile.BadZipFile,
            zipfile.LargeZipFile,
            zlib.error,
            NotImplementedError,
            RuntimeError,
            EOFError,
            ValueError,
        ):
            return (
                jsonify(error="This ZIP is damaged or uses an unsupported format."),
                400,
            )
        except OSError:
            return (
                jsonify(
                    error="The files could not be extracted. Clear this archive and try again."
                ),
                507,
            )

        files = [
            dict(file, url=f"api/archives/{archive['id']}/files/{file['id']}")
            for file in archive["files"]
        ]

        return jsonify(
            id=archive["id"],
            name=archive["name"],
            files=files,
            total_size=archive["total_size"],
        )

    def owned_archive(archive_id):
        archive = archives.get(archive_id)
        owner = session.get("owner", "")

        if (
            archive is None
            or not owner
            or not secrets.compare_digest(archive["owner"], owner)
        ):
            abort(404)

        return archive

    @app.get("/api/archives/<archive_id>/files/<file_id>")
    def download(archive_id, file_id):
        archive = owned_archive(archive_id)
        file = next((item for item in archive["files"] if item["id"] == file_id), None)

        if file is None:
            abort(404)

        try:
            fd = os.open(
                archive["directory"] / file["id"],
                os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK,
            )
        except OSError:
            abort(404)

        if not stat.S_ISREG(os.fstat(fd).st_mode):
            os.close(fd)
            abort(404)

        stream = os.fdopen(fd, "rb")
        response = send_file(
            stream,
            as_attachment=True,
            download_name=file["path"].rsplit("/", 1)[-1],
            mimetype="application/octet-stream",
            conditional=False,
            etag=False,
        )
        response.content_length = file["size"]
        response.call_on_close(stream.close)

        return response

    @app.delete("/api/archives/<archive_id>")
    def clear(archive_id):
        owned_archive(archive_id)
        remove_archive(archives, archive_id)

        return "", 204

    return app
