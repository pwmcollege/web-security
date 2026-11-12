"use strict";

(() => {
    const MAX_UPLOAD = 1_000_000;
    const baseUrl = new URL("./", location.href);
    const byId = (id) => document.getElementById(id);
    const form = byId("archive-form");
    const input = byId("archive-input");
    const dropZone = byId("drop-zone");
    const browseButton = byId("browse-button");
    const removeButton = byId("remove-button");
    const extractButton = byId("extract-button");
    const resetButton = byId("reset-button");
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    let selectedFile = null;
    let archiveId = null;
    let busy = false;
    let dragDepth = 0;

    function formatSize(bytes) {
        if (bytes < 1_000) return `${bytes} B`;

        if (bytes < 1_000_000) return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(bytes / 1_000)} KB`;

        if (bytes < 1_000_000_000) return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;

        return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(bytes / 1_000_000_000)} GB`;
    }

    function error(message) {
        byId("error-text").textContent = message;
        byId("error-message").hidden = !message;
    }

    function announce(message) {
        byId("status-message").textContent = message;
    }

    function setBusy(value) {
        busy = value;
        browseButton.disabled = value;
        removeButton.disabled = value;
        extractButton.disabled = value;
        resetButton.disabled = value;
        input.disabled = value;
        dropZone.setAttribute("aria-busy", String(value));
        byId("extract-label").textContent = value ? "Extracting…" : "Extract files";
        byId("extract-spinner").hidden = !value;
        byId("extract-arrow").hidden = value;
    }

    function selectFile(file) {
        if (busy) return;

        error("");

        if (!file) return;

        removeFile();

        if (!file.name.toLowerCase().endsWith(".zip")) {
            error("Choose a ZIP archive to continue.");

            return;
        }

        if (file.size > MAX_UPLOAD) {
            error("This archive is too large. Choose a ZIP file of 1 MB or less.");

            return;
        }

        if (file.size === 0) {
            error("This file is empty. Choose a valid ZIP archive.");

            return;
        }

        selectedFile = file;
        byId("selected-name").textContent = file.name;
        byId("selected-size").textContent = formatSize(file.size);
        byId("empty-state").hidden = true;
        byId("selected-state").hidden = false;
        byId("selection-actions").hidden = false;
        byId("file-limit").hidden = true;
        removeButton.hidden = false;
        dropZone.classList.add("has-file");
        browseButton.textContent = "Change";
        browseButton.setAttribute("aria-label", "Change file");
        browseButton.classList.replace("button-primary", "button-secondary");
        announce(`${file.name} selected. Ready to extract.`);
    }

    function removeFile() {
        announce("");
        selectedFile = null;
        input.value = "";
        byId("empty-state").hidden = false;
        byId("selected-state").hidden = true;
        byId("selection-actions").hidden = true;
        byId("file-limit").hidden = false;
        removeButton.hidden = true;
        byId("selected-name").textContent = "";
        byId("selected-size").textContent = "";
        dropZone.classList.remove("has-file");
        browseButton.textContent = "Choose file";
        browseButton.removeAttribute("aria-label");
        browseButton.classList.replace("button-secondary", "button-primary");
    }

    function requestHeaders() {
        return { "X-Unpack-Request": "1", "X-CSRF-Token": csrfToken };
    }

    async function readResponse(response) {
        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error(response.status === 413 ? "This archive is too large. Choose a ZIP file of 1 MB or less." : "The archive could not be opened. Please try again.");
        }

        if (!response.ok) throw new Error(typeof data.error === "string" ? data.error : "The archive could not be opened. Please try again.");

        return data;
    }

    function renderEntries(entries) {
        const rows = document.createDocumentFragment();

        for (const entry of entries) {
            const isFolder = entry.type === "folder";
            const template = byId(isFolder ? "folder-row-template" : "file-row-template");
            const row = template.content.cloneNode(true);
            row.querySelector(".file-path").textContent = entry.name;
            row.querySelector(".file-size").textContent = isFolder ? "—" : formatSize(entry.size);

            if (isFolder) {
                const button = row.querySelector(".folder-row");
                button.setAttribute("aria-label", `Open folder ${entry.name}`);
                button.addEventListener("click", () => showFolder(entry, true));
            } else {
                const link = row.querySelector(".download-link");
                link.href = entry.url;
                link.setAttribute("aria-label", `Download ${entry.path}`);
                link.title = `Download ${entry.name}`;
            }

            rows.append(row);
        }

        byId("file-rows").replaceChildren(rows);
    }

    function showBreadcrumbs(folder, focus = false) {
        const ancestors = [];

        for (let ancestor = folder; ancestor; ancestor = ancestor.parent) {
            ancestors.unshift(ancestor);
        }

        const breadcrumbs = document.createDocumentFragment();
        let currentCrumb;

        for (const ancestor of ancestors) {
            const item = document.createElement("li");
            const isCurrent = ancestor === folder;
            const crumb = document.createElement(isCurrent ? "span" : "button");
            crumb.textContent = ancestor.name;

            if (isCurrent) {
                crumb.setAttribute("aria-current", "page");
                crumb.tabIndex = -1;
                currentCrumb = crumb;
            } else {
                crumb.type = "button";
                crumb.className = "breadcrumb-button";
                crumb.addEventListener("click", () => showFolder(ancestor, true));
            }

            item.append(crumb);
            breadcrumbs.append(item);
        }

        byId("folder-breadcrumbs").replaceChildren(breadcrumbs);

        if (focus) currentCrumb.focus();
    }

    function showFolder(folder, focus = false) {
        const entries = [...folder.entries.values()].sort((left, right) => {
            if (left.type !== right.type) return left.type === "folder" ? -1 : 1;

            return left.name.localeCompare(right.name, undefined, { numeric: true });
        });
        renderEntries(entries);
        showBreadcrumbs(folder, focus);

        if (focus) {
            announce(`${folder.name}. ${entries.length} ${entries.length === 1 ? "item" : "items"}.`);
        }
    }

    function showResults(data) {
        const root = { name: "Files", type: "folder", parent: null, entries: new Map() };

        for (const file of data.files) {
            const url = new URL(file.url, baseUrl);

            if (url.origin !== baseUrl.origin || !url.pathname.startsWith(`${baseUrl.pathname}api/archives/`)) throw new Error("The archive returned an invalid download link.");

            const parts = file.path.split("/");
            const name = parts.pop();
            let folder = root;

            for (const part of parts) {
                if (!folder.entries.has(part)) {
                    folder.entries.set(part, {
                        name: part,
                        type: "folder",
                        parent: folder,
                        entries: new Map(),
                    });
                }

                folder = folder.entries.get(part);
            }

            const entry = { ...file, name, type: "file", url: url.href };
            folder.entries.set(name, entry);
        }

        archiveId = data.id;
        showFolder(root);
        byId("results-title").textContent = data.name;
        byId("file-list").hidden = data.files.length === 0;
        byId("empty-archive").hidden = data.files.length !== 0;
        byId("upload-view").hidden = true;
        byId("results-view").hidden = false;
        byId("main").classList.add("showing-results");
        byId("results-title").focus();
        announce(`Extraction complete. ${data.files.length} ${data.files.length === 1 ? "file is" : "files are"} ready to download.`);
    }

    browseButton.addEventListener("click", () => {
        input.value = "";
        input.click();
    });

    input.addEventListener("change", () => selectFile(input.files[0]));

    removeButton.addEventListener("click", () => {
        removeFile();
        error("");
        announce("File removed.");
        browseButton.focus();
    });

    document.addEventListener("dragover", (event) => event.preventDefault());
    document.addEventListener("drop", (event) => event.preventDefault());

    dropZone.addEventListener("dragenter", (event) => {
        event.preventDefault();

        if (busy) return;

        dragDepth += 1;
        dropZone.classList.add("is-dragging");
    });

    dropZone.addEventListener("dragleave", () => {
        dragDepth = Math.max(0, dragDepth - 1);

        if (dragDepth === 0) dropZone.classList.remove("is-dragging");
    });

    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        dragDepth = 0;
        dropZone.classList.remove("is-dragging");

        if (busy) return;

        if (event.dataTransfer.files.length !== 1) {
            error("Choose one ZIP archive at a time.");

            return;
        }

        selectFile(event.dataTransfer.files[0]);
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (busy || !selectedFile) return;

        error("");
        setBusy(true);
        announce("Extracting your archive.");

        try {
            const response = await fetch(new URL("api/extract", baseUrl), {
                method: "POST",
                headers: { ...requestHeaders(), "Content-Type": "application/zip", "X-Archive-Name": encodeURIComponent(selectedFile.name) },
                body: selectedFile,
            });
            showResults(await readResponse(response));
        } catch (failure) {
            error(failure instanceof TypeError ? "Could not reach Unzip. Please try again." : failure.message);
            announce("Extraction failed.");
        } finally {
            setBusy(false);
        }
    });

    resetButton.addEventListener("click", async () => {
        if (busy) return;

        error("");
        resetButton.disabled = true;

        try {
            if (archiveId !== null) {
                const response = await fetch(new URL(`api/archives/${encodeURIComponent(archiveId)}`, baseUrl), { method: "DELETE", headers: requestHeaders() });

                if (!response.ok && response.status !== 404) await readResponse(response);
            }

            archiveId = null;
            removeFile();
            byId("file-rows").replaceChildren();
            byId("folder-breadcrumbs").replaceChildren();
            byId("results-view").hidden = true;
            byId("upload-view").hidden = false;
            byId("main").classList.remove("showing-results");
            announce("Ready to open another archive.");
            browseButton.focus();
        } catch (failure) {
            error(failure instanceof TypeError ? "Could not reach Unzip. Please try again." : failure.message);
        } finally {
            resetButton.disabled = false;
        }
    });
})();
