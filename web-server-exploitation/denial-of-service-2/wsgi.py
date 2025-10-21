#!/usr/bin/env python

from flask import Flask

app = Flask(__name__)


@app.get("/health")
def health():
    return "ok", 200


application = app
