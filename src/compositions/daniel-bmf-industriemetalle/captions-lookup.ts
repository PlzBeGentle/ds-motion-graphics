// Phase F.0 — Word-sync helpers for BMF overlay timing
// Uses SEGMENTS from captions.ts to find exact frame positions for trigger words.

import { SEGMENTS } from "./captions";

const FPS = 30;
const D5_CAP_FRAMES = 8; // 0.25s rounded up from 7.5

const clean = (s: string): string =>
  s.toLowerCase().replace(/[.,;:!?"()\u00ab\u00bb\u201e\u201c]/g, "").trim();

/**
 * Find the start-frame of the first occurrence of a word at or after a given time.
 * Case-insensitive, strips punctuation. Returns null if not found.
 */
export function findWordFrame(
  word: string,
  afterSeconds: number = 0,
): number | null {
  const target = clean(word);
  for (const seg of SEGMENTS) {
    if (seg.end < afterSeconds) continue;
    for (const w of seg.words) {
      if (w.start < afterSeconds) continue;
      const c = clean(w.word);
      if (c === target || c.startsWith(target)) {
        return Math.round(w.start * FPS);
      }
    }
  }
  return null;
}

/**
 * Find the end-frame of the last occurrence of a word within a time window.
 */
export function findWordEndFrame(
  word: string,
  afterSeconds: number,
  beforeSeconds: number,
): number | null {
  const target = clean(word);
  let lastEnd: number | null = null;
  for (const seg of SEGMENTS) {
    if (seg.end < afterSeconds || seg.start > beforeSeconds) continue;
    for (const w of seg.words) {
      if (w.start < afterSeconds || w.end > beforeSeconds) continue;
      const c = clean(w.word);
      if (c === target || c.startsWith(target)) {
        lastEnd = Math.round(w.end * FPS);
      }
    }
  }
  return lastEnd;
}

/**
 * Find the end-frame of a segment by its approximate start-frame.
 */
export function findSegmentEndFrame(startFrame: number): number | null {
  const startSec = startFrame / FPS;
  for (const seg of SEGMENTS) {
    if (Math.abs(seg.start - startSec) < 0.5) {
      return Math.round(seg.end * FPS);
    }
  }
  return null;
}

/**
 * Compute overlay end = max(last-relevant-word-end) + D5 cap (8 frames).
 */
export function computeOverlayEnd(
  triggerWords: string[],
  afterSeconds: number,
  beforeSeconds: number,
): number {
  let maxEnd = 0;
  for (const w of triggerWords) {
    const end = findWordEndFrame(w, afterSeconds, beforeSeconds);
    if (end && end > maxEnd) maxEnd = end;
  }
  return maxEnd + D5_CAP_FRAMES;
}

/**
 * Safe wrapper: findWordFrame with a fallback when lookup returns null.
 */
export function wordFrameOr(
  word: string,
  afterSeconds: number,
  fallback: number,
): number {
  const r = findWordFrame(word, afterSeconds);
  return r ?? fallback;
}
