#!/usr/bin/env python

import base64
import gzip
import json
import os
import time
from pathlib import Path

from flask import Flask, redirect, render_template, request

app = Flask(__name__)

YAN_GDB = ("Ou5Bhe7o3J0", 36029)

try:
    with open("/challenge/.config", "r") as f:
        YOUTUBE_ID, TOTAL_TIME = f.read().strip().split()
        TOTAL_TIME = int(TOTAL_TIME)

except FileNotFoundError:
    flag_path = "/flag"

    if not os.path.islink(flag_path):
        fd = os.open(
            flag_path, os.O_WRONLY | os.O_CREAT | os.O_TRUNC | os.O_NOFOLLOW, 0o644
        )
        try:
            os.write(fd, "pwn.college{3v3ry0n3_sh0uld_4ppr3c14t3_z4rdus!!!}\n".encode())
            os.fsync(fd)
        finally:
            os.close(fd)

    YOUTUBE_ID, TOTAL_TIME = YAN_GDB  # enforce zardus gdb


def open_timeline_file():
    local_share_dir = Path("/home/hacker/.local/share/")
    local_share_dir.mkdir(parents=True, exist_ok=True)
    os.chown(local_share_dir, 1000, 1000)

    lectures_dir = local_share_dir / "lectures"
    if lectures_dir.is_symlink():
        lectures_dir.unlink()

    timeline_path = lectures_dir / f"{YOUTUBE_ID}.gz"
    if timeline_path.is_symlink():
        timeline_path.unlink()

    lectures_dir.mkdir(parents=True, exist_ok=True)

    existing_data = []
    try:
        if timeline_path.exists() and not timeline_path.is_symlink():
            with gzip.open(timeline_path, "rb") as gz_file:
                for line in gz_file:
                    existing_data.append(line)
    except (FileNotFoundError, EOFError):
        pass
    except (gzip.BadGzipFile, OSError, IOError):
        timeline_path.unlink()

    try:
        fd = os.open(
            timeline_path, os.O_CREAT | os.O_WRONLY | os.O_TRUNC | os.O_NOFOLLOW, 0o600
        )
        file_obj = os.fdopen(fd, "wb")
        timeline_file = gzip.open(file_obj, "wb")

        for line in existing_data:
            timeline_file.write(line)

        return timeline_file
    except Exception:
        os.close(fd)
        return None


timeline = []
timeline_file = open_timeline_file()


@app.route("/")
def index():
    return redirect(f"{YOUTUBE_ID}/")


@app.route("/<youtube_id>/")
def lecture(youtube_id):
    return render_template("lecture.html", youtube_id=youtube_id)


@app.route("/<youtube_id>/telemetry", methods=["GET", "POST"])
def update_telemetry(youtube_id):
    if youtube_id != YOUTUBE_ID:
        return {"error": "Incorrect video"}, 400

    fields = {
        "reason": str,
        "player": [
            "state",
            "time",
            "muted",
            "volume",
            "rate",
            "loaded",
            "duration",
            "url",
        ],
        "document": ["visibility", "fullscreen", "agent"],
    }
    for field in fields:
        if field not in request.json:
            return {"error": "Missing required data"}, 400
        if isinstance(fields[field], list):
            for sub_field in fields[field]:
                if sub_field not in request.json[field]:
                    return {"error": "Missing required data"}, 400
    event = request.json.copy()
    event["youtube_id"] = youtube_id
    event["timestamp"] = time.time()
    timeline.append(event)

    event_json = json.dumps(event)

    if timeline_file:
        encoded_event = base64.b64encode(event_json.encode()).decode()
        timeline_file.write(encoded_event.encode() + b"\n")
        timeline_file.flush()

    result = {}

    valid_coverage, invalid_coverage = resolve_timeline_coverage(timeline)
    result["coverage"] = {"valid": valid_coverage, "invalid": invalid_coverage}

    completed = sum(end - start for start, end in valid_coverage) > TOTAL_TIME - 5
    if completed:
        result["flag"] = "pwn.college{z4rdus_4ppr0v3s_0f_y0ur_d3d1c4t10n!}"

    return result


def resolve_timeline_coverage(timeline):
    if not timeline:
        return [], []

    valid_coverage = []
    invalid_coverage = []

    last_time = timeline[0]["player"]["time"]
    last_timestamp = timeline[0]["timestamp"]

    for event in timeline[1:]:
        elapsed_time = event["player"]["time"] - last_time
        elapsed_timestamp = event["timestamp"] - last_timestamp

        if elapsed_timestamp * 2 + 2 > elapsed_time > 0:
            valid_coverage.append((last_time, event["player"]["time"]))
        elif elapsed_time > 0:
            invalid_coverage.append((last_time, event["player"]["time"]))

        last_time = event["player"]["time"]
        last_timestamp = event["timestamp"]

    def merge_intervals(intervals):
        if not intervals:
            return []
        intervals = sorted(intervals, key=lambda x: x[0])
        merged = [intervals[0]]
        for current_start, current_end in intervals[1:]:
            last_start, last_end = merged[-1]
            if current_start <= last_end:
                merged[-1] = (last_start, max(last_end, current_end))
            else:
                merged.append((current_start, current_end))
        return merged

    valid_coverage = merge_intervals(valid_coverage)
    invalid_coverage = merge_intervals(invalid_coverage)

    def subtract_intervals(intervals, subtracting):
        result = []
        for int_start, int_end in intervals:
            current_start = int_start
            for sub_start, sub_end in subtracting:
                if sub_end <= current_start or sub_start >= int_end:
                    continue
                if sub_start > current_start:
                    result.append((current_start, sub_start))
                current_start = max(current_start, sub_end)
                if current_start >= int_end:
                    break
            if current_start < int_end:
                result.append((current_start, int_end))
        return result

    invalid_coverage = subtract_intervals(invalid_coverage, valid_coverage)

    return valid_coverage, invalid_coverage


application = app
