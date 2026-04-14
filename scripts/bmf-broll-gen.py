#!/usr/bin/env python3
"""
BMF B-Roll Generator

Submits structured JSON prompts from scripts/bmf-broll-prompts.json to
fal.ai nano-banana-2 queue API, polls until complete, downloads PNGs to
public/bmf/b-roll/.

Reads FAL_API_KEY from environment. If not set, falls back to
~/ds-content-studio/.env.local which has the key for the Content Studio
project.

Usage:
  python scripts/bmf-broll-gen.py                    # generate all
  python scripts/bmf-broll-gen.py 1 3 9               # only specific slots
  FORCE=1 python scripts/bmf-broll-gen.py 1           # overwrite existing

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
PROMPTS_FILE = ROOT / "scripts" / "bmf-broll-prompts.json"
OUT_DIR = ROOT / "public" / "bmf" / "b-roll"
ENDPOINT = "https://queue.fal.run/fal-ai/nano-banana-2"

POLL_INTERVAL_S = 2
POLL_TIMEOUT_S = 240
SUBMIT_TIMEOUT_S = 60
DOWNLOAD_TIMEOUT_S = 60


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


def submit(key: str, prompt_str: str) -> str:
    req = urllib.request.Request(
        ENDPOINT,
        headers={
            "Authorization": f"Key {key}",
            "Content-Type": "application/json",
        },
        data=json.dumps({
            "prompt": prompt_str,
            "aspect_ratio": "16:9",
            "num_images": 1,
            "output_format": "png",
            "resolution": "2K",
            "safety_tolerance": "4",
        }).encode("utf-8"),
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
    while time.time() < deadline:
        time.sleep(POLL_INTERVAL_S)
        req = urllib.request.Request(url, headers={"Authorization": f"Key {key}"})
        try:
            with urllib.request.urlopen(req, timeout=10) as r:
                data = json.loads(r.read())
        except urllib.error.URLError as e:
            print(f"    poll error (retry): {e}")
            continue
        status = data.get("status")
        if status == "COMPLETED":
            return
        if status == "FAILED":
            raise RuntimeError(f"fal.ai generation failed: {data.get('error')}")
    raise TimeoutError(f"Poll timeout after {POLL_TIMEOUT_S}s for {rid}")


def fetch_result(key: str, rid: str) -> dict:
    url = f"{ENDPOINT}/requests/{rid}"
    req = urllib.request.Request(url, headers={"Authorization": f"Key {key}"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def download(image_url: str, dest: pathlib.Path) -> None:
    req = urllib.request.Request(image_url, headers={"User-Agent": "bmf-broll-gen/1.0"})
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

    print(f"Generating {len(selected)} images to {OUT_DIR.relative_to(ROOT)}")
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

        prompt_str = json.dumps(entry["json"], indent=2, ensure_ascii=False)
        print(f"{header}")
        print(f"    intent: {entry.get('intent', '')}")
        try:
            t0 = time.time()
            rid = submit(key, prompt_str)
            print(f"    submitted, request_id {rid}")
            poll_status(key, rid)
            result = fetch_result(key, rid)
            images = result.get("images") or []
            image_url = (images[0] or {}).get("url") if images else None
            if not image_url:
                raise RuntimeError(f"No image url in result: {result}")
            download(image_url, dest)
            dt = time.time() - t0
            size_kb = dest.stat().st_size // 1024
            print(f"    saved {dest.relative_to(ROOT)} ({size_kb} KB, {dt:.1f}s)")
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
