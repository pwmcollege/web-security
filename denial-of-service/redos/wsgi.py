import os
import re
from pathlib import Path

from flask import Flask, render_template, request

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 4096


def load_entries():
    wordnet = Path(os.getenv("WORDNET_DATA", "/usr/share/wordnet"))
    ipa = Path(os.getenv("IPA_DATA", "/usr/share/dictionary/en_US.txt"))

    with ipa.open(encoding="utf-8") as source:
        pronunciations = dict(line.rstrip("\n").split("\t", 1) for line in source)

    entries = {}

    for suffix, part in (
        ("noun", "noun"),
        ("verb", "verb"),
        ("adj", "adjective"),
        ("adv", "adverb"),
    ):
        definitions = {}

        with (wordnet / f"data.{suffix}").open(encoding="utf-8") as source:
            for line in source:
                if line.startswith(" "):
                    continue

                fields, _, gloss = line.partition(" | ")
                offset = fields.split(maxsplit=1)[0]
                definitions[offset] = gloss.split('; "', 1)[0].strip()

        with (wordnet / f"index.{suffix}").open(encoding="utf-8") as source:
            for line in source:
                if line.startswith(" "):
                    continue

                lemma, _, _, pointer_count, *fields = line.split()
                word = lemma.replace("_", " ")

                if word not in pronunciations:
                    continue

                if word not in entries:
                    entries[word] = {
                        "word": word,
                        "pronunciation": pronunciations[word],
                        "senses": [],
                    }

                offsets = fields[int(pointer_count) + 2 :]
                entries[word]["senses"].extend(
                    {"part": part, "definition": definitions[offset]}
                    for offset in offsets
                )

    return dict(sorted(entries.items()))


def search_words(query):
    try:
        pattern = re.compile(query, re.IGNORECASE)
    except (re.error, OverflowError, RecursionError) as error:
        raise ValueError("Invalid regex.") from error

    matches = [word for word in words if pattern.search(word)]

    if not any(character in query for character in r".^$*+?{}[]\|()"):
        matches.sort(
            key=lambda word: (not pattern.fullmatch(word), not pattern.match(word))
        )

    return matches


entries = load_entries()
words = list(entries)


@app.get("/")
def index():
    return render_template("dictionary.html")


@app.get("/health")
def health():
    return "OK\n", 200


@app.post("/api/words")
def lookup():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return {"error": "Expected a JSON object."}, 400

    query = data.get("query", "")
    page = data.get("page", 1)

    if not isinstance(query, str) or type(page) is not int:
        return {"error": "Expected a regex string and a page number."}, 400

    try:
        matches = search_words(query) if query else words
    except ValueError as error:
        return {"error": str(error)}, 400

    page_count = len(matches)
    page = min(max(page, 1), max(page_count, 1))

    return {
        "words": [entries[matches[page - 1]]] if matches else [],
        "page": page,
        "page_count": page_count,
    }


application = app
