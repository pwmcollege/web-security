#!/usr/bin/env python

import json
import tempfile

from flask import Flask, request

app = Flask(__name__)


@app.get("/health")
def health():
    return "ok", 200


@app.post("/hello")
def hackers():
    fields = {
        "hello": str,
    }

    for field in fields:
        if field not in request.json:
            return {"error": "Missing required data"}, 400
        if isinstance(fields[field], list):
            for sub_field in fields[field]:
                if sub_field not in request.json[field]:
                    return {"error": "Missing required data"}, 400

    data = request.json.copy()

    with tempfile.TemporaryFile(mode="w+t") as f:
        f.write(json.dumps(data))

    return {
        "hello": "hackers!",
    }


application = app
