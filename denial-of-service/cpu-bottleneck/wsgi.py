#!/usr/bin/env python

import re

from flask import Flask, request

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 4096

PATTERN = re.compile(r"^(a+)+$")


@app.get("/health")
def health():
    return "OK\n", 200


@app.post("/match")
def match():
    if not request.is_json:
        return {"error": "Invalid JSON"}, 400
    if "input" not in request.json:
        return {"error": "Missing required data"}, 400
    text = request.json["input"]
    if not isinstance(text, str):
        return {"error": "Invalid input"}, 400
    return {"match": bool(PATTERN.fullmatch(text))}


application = app
