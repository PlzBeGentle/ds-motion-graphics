#!/usr/bin/env python3
"""
BMF Veo 3.1 B-Roll Generator

Submits plain-text prompts from scripts/bmf-veo-prompts.json to fal.ai
Veo 3.1 queue API, polls until complete, downloads MP4s to
public/bmf/b-roll/.

Generation is sequential (each Veo 3.1 clip takes ~2-3 minutes) and
cost per clip is ~$1.60 at 1080p 8s without audio.

Reads FAL_API_KEY from environment or ~/ds-content-studio/.env.local
fallback (same pattern as bmf-broll-gen.py).

Usage:
  python scripts/bmf-veo-gen.py                    # all 3 clips
  python scripts/bmf-veo-gen.py 4                   # only slot 4
  python scripts/bmf-veo-gen.py 4 8                 # slots 4 and 8
  FORCE=1 python scripts/bmf-veo-gen.py 5           # overwrite existing

Skips slots whose output file already exists (unless FORCE=1).
"""

import json
import os
import pathlib
import sys
import time
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
PROMPTS_FILE = ROOT / "scripts" / "bmf-veo-prompts.json"
OUT_DIR = ROOT / "public" / "bmf" / "b-roll"
ENDPOINT = "https://queue.fal.run/fal-ai/veo3.1"

POLL_INTERVAL_S = 5
POLL_TIMEOUT_S = 600  # Veo Standard 1080p takes ~2:41 per 8s clip, double buffer
SUBMIT_TIMEOUT_S = 60
DOWNLOAD_TIMEOUT_S = 300


def load_key() -> str:
    key = os.environ.get("FAL_API_KEY")
    if key:
        return key.strip()
    fallback = pathlib.Path.home() / "ds-content-studio" / ".env.local"
    if fallback.exists():
        for line in fallback.read_text().splitlines():
            if line.startswith("FAL_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(
        "No FAL_API_KEY found. Set env var or place in ~/ds-content-studio/.env.local"
    )


def submit(key: str, prompt: str, negative_prompt: str) -> str:
    body = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "aspect_ratio": "16:9",
        "duration": "8s",
        "resolution": "1080p",
        "generate_audio": False,
        "auto_fix": True,
    }
    req = urllib.request.Request(
        ENDPOINT,
        headers={
            "Authorization": f"Key {key}",
            "Content-Type": "application/json",
        },
        data=json.dumps(body).encode("utf-8"),
    )
    with urllib.request.urlopen(req, timeout=SUBMIT_TIMEOUT_S) as r:
        data = json.loads(r.read())
    rid = data.get("request_id")
    if not rid:
        raise RuntimeError(f"No request_id in submit response: {data}")
    return rid


def poll_status(key: str, rid: str) -> None:
    url = f"{ENDPOINT}/requests/{rid}/status"
    deadline = time.time() + POLL_TIMEOUT_S
    last_queue_position = None
    while time.time() < deadline:
        time.sleep(POLL_INTERVAL_S)
        req = urllib.request.Request(url, headers={"Authorization": f"Key {key}"})
        try:
            with urllib.request.urlopen(req, timeout=15) as r:
                data = json.loads(r.read())
        except urllib.error.URLError as e:
            print(f"    poll error (retry): {e}")
            continue
        status = data.get("status")
        if status == "COMPLETED":
            return
        if status == "FAILED":
            raise RuntimeError(f"fal.ai Veo generation failed: {data.get('error') or data}")
        # "IN_PROGRESS" or "IN_QUEUE"
        queue_position = data.get("queue_position")
        if queue_position != last_queue_position:
            last_queue_position = queue_position
            elapsed = int(time.time() - (deadline - POLL_TIMEOUT_S))
            pos_str = f" queue {queue_position}" if queue_position else ""
            print(f"    [{elapsed:3d}s] {status}{pos_str}")
    raise TimeoutError(f"Poll timeout after {POLL_TIMEOUT_S}s for {rid}")


def fetch_result(key: str, rid: str) -> dict:
    url = f"{ENDPOINT}/requests/{rid}"
    req = urllib.request.Request(url, headers={"Authorization": f"Key {key}"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def download(video_url: str, dest: pathlib.Path) -> None:
    req = urllib.request.Request(video_url, headers={"User-Agent": "bmf-veo-gen/1.0"})
    with urllib.request.urlopen(req, timeout=DOWNLOAD_TIMEOUT_S) as r:
        dest.write_bytes(r.read())


def main() -> int:
    if not PROMPTS_FILE.exists():
        raise SystemExit(f"Prompts file not found: {PROMPTS_FILE}")
    prompts_doc = json.loads(PROMPTS_FILE.read_text())
    entries = prompts_doc.get("prompts", [])
    if not entries:
        raise SystemExit("No prompts[] in prompts file")

    only = set()
    for arg in sys.argv[1:]:
        if arg.isdigit():
            only.add(int(arg))
    force = os.environ.get("FORCE") == "1"

    key = load_key()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    selected = [e for e in entries if not only or e.get("slot") in only]
    if not selected:
        print(f"No entries match selectors {only}")
        return 1

    print(f"Veo 3.1 generating {len(selected)} clip(s) to {OUT_DIR.relative_to(ROOT)}")
    print(f"Expected cost: ~${len(selected) * 1.60:.2f} ({len(selected)} x 8s x $0.20 no-audio)")
    print()
    failures = []
    for entry in selected:
        slot = entry["slot"]
        filename = entry["filename"]
        dest = OUT_DIR / filename
        header = f"[slot {slot}] {filename}"
        if dest.exists() and not force:
            print(f"{header} — exists, skip (FORCE=1 to regen)")
            continue

        prompt = entry["prompt"]
        negative_prompt = entry.get("negative_prompt", "")
        print(f"{header}")
        print(f"    intent: {entry.get('intent', '')}")
        try:
            t0 = time.time()
            rid = submit(key, prompt, negative_prompt)
            print(f"    submitted, request_id {rid}")
            poll_status(key, rid)
            result = fetch_result(key, rid)
            video = result.get("video") or {}
            video_url = video.get("url")
            if not video_url:
                raise RuntimeError(f"No video url in result: {result}")
            print(f"    downloading mp4 ...")
            download(video_url, dest)
            dt = time.time() - t0
            size_mb = dest.stat().st_size / (1024 * 1024)
            print(f"    saved {dest.relative_to(ROOT)} ({size_mb:.1f} MB, {dt:.0f}s)")
        except Exception as exc:
            print(f"    FAILED: {exc}")
            failures.append((slot, str(exc)))
        print()

    if failures:
        print(f"Completed with {len(failures)} failure(s):")
        for slot, msg in failures:
            print(f"  slot {slot}: {msg}")
        return 2
    print("All done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
