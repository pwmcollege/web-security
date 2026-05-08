#!/usr/bin/env python

from flask import Flask

app = Flask(__name__)


@app.get("/health")
def health():
    return "OK\n", 200


application = app
