# Phase 4 — Sound Executor Output (Agent 3A)

**Video:** daniel-bmf-industriemetalle
**Duration:** 760s / 22800f @ 30fps
**Pipeline Phase:** 4 (Sound Executor — translates Master-Timeline into production-ready cue sheets)
**Date:** 2026-04-14

---

## Files in This Folder

| File | Purpose | Audience |
|---|---|---|
| `sfx-cue-sheet.md` | Human-readable overview of all 70 SFX cues, budget status, signature moments | Dario review |
| `sfx-cue-sheet.json` | Machine-readable cue-list with exact volumes, layers, reverbs, pans, file paths | Premiere/AE import + Remotion |
| `music-bed-plan.json` | 6 music beds — search params, stems, volume automation, crossfades, ducking | Epidemic Sound search + Premiere |
| `voice-processing-chain.json` | 8-plugin voice chain with exact settings for Daniel's ~120Hz voice | Premiere/AE Essential Sound / AU bus |
| `README.md` | This file | — |

---

## Quick Summary

- **70 SFX cues** approved (2 rejected: sfx-018, sfx-019 — redundant ticks per C2 breathing-cadence)
- **6 music beds** (mb-01 through mb-06) covering 5 mood-shifts + final silence-punch
- **3 Deep Booms** (AT LIMIT) on 9.April, Kobalt, Danke Deutschland
- **3 Risers** (1.23s / 2.73s / 8s) — budget 3/4
- **11 Silence blocks** (4 critical pre-high-impact)
- **Voice chain** = 8 plugins: HPF -> EQ -> 3x Serial Comp -> De-Esser -> Reverb Aux -> Limiter
- **Target:** -14 LUFS integrated, -1.0 dBTP ceiling

---

## Top 3 Signature Sound Moments

1. **KOBALT REVEAL** (frame 5868 / 195.6s) — CENTERPIECE. 2.73s riser -> 500ms silence -> DEEP BOOM 2 (3-layer, 0.10) -> Fullscreen shake sync 8f. Human review required.
2. **DANKE DEUTSCHLAND** (frame 22649 / 754.96s) — CLOSER. 1s music full-duck -> 1.5s total silence -> DEEP BOOM 3 (longest tail, Hall 3.0s) -> warm outro-stinger overlap.
3. **DREI MAL DUERFT IHR RATEN** (frame 14609 / 486.98s) — Hole-tiefpunkt. 8s major-riser -> 500ms silence -> high-impact bass-hit (not deep-boom, reserved).

---

## Voice Processing Chain Order

```
Daniel Mic -> [1] HPF 90Hz -> [2] Parametric EQ (200/380/3000/11000)
           -> [3] Comp Gentle 2.5:1 -> [4] Comp Medium 3.5:1 -> [5] Comp Control 2:1
           -> [6] De-Esser 6.5kHz -> [7] Reverb Aux Room 0.8s 8% -> [8] Limiter -1.0dBTP
           -> Master Bus (-14 LUFS)
```

Key point: **Presence-Boost +2.5 dB at 3 kHz** (not the -6..-12 Cut A4.3.3 suggests) because Daniel's voice lacks natural presence — this is a speaker-specific override, documented in `voice-processing-chain.json`.

---

## Premiere / AE Import Format

The output is provided in **JSON (with WAV target paths)** — not XML/AAF directly. Rationale:

- **Remotion-first workflow:** The pipeline targets `src/compositions/daniel-bmf-industriemetalle/` Remotion sequences with `<Audio>` tags. A Remotion importer script can read `sfx-cue-sheet.json` and generate `<Sequence><Audio src={staticFile(...)} volume={interpolate(...)} /></Sequence>` blocks directly.
- **Premiere Import Path (fallback):** Convert `sfx-cue-sheet.json` -> Premiere XML (FCPXML 1.10) via a small Node.js transformer. Fields map 1:1 (frame -> ticks, volume -> audio-level keyframes, pan -> pan keyframes, reverb -> effect presets). A transformer script is NOT included — build on demand with:
  ```bash
  node scripts/cue-sheet-to-fcpxml.js \
    --input phase-4/sound/sfx-cue-sheet.json \
    --output phase-4/sound/sfx-cue-sheet.fcpxml \
    --fps 30
  ```
- **AAF:** Not targeted. If needed, go FCPXML -> DaVinci Resolve -> AAF export.
- **CSV fallback:** `sfx-cue-sheet.md` tables can be extracted to CSV for manual Premiere paste.

**Recommended workflow:** Remotion for SFX placement + volume automation (deterministic, frame-accurate). Use Premiere only if final VO editing + manual cleanup is needed, then print-to-tape the master.

---

## Asset Acquisition Checklist

Before render, acquire WAV files for all `file_path_target` entries. Two primary sources:

1. **Epidemic Sound** (preferred) — use `epidemic-sound` MCP with `epidemic_search.query` from each cue's metadata. Download in WAV 48kHz 24-bit, stems FULL if available. Stage into `public/sfx/daniel-bmf/`.
2. **FOUR Editors SFX Pack** (fallback) — TOSHIBA EXT: `/Volumes/TOSHIBA EXT/Video Edting/FOUR Editors Sound Effects/`. Each cue lists a `four_editors_fallback` path. Copy selected WAVs to `public/sfx/daniel-bmf/`.

Critical assets that need manual review before render:
- **Deep Boom 2 Kobalt** — sub-bass calibration test render (human-approve gate)
- **Deep Boom 3 Danke Deutschland** — longest tail Hall 3.0s, verify doesn't bleed into next video
- **Music Bed crossfade mb-03 -> mb-04 @ 500s** — 4s log curve must land cleanly on drei-mal refrain
- **Room tone Daniel studio loop** — sample 3s from caption-pause, loop under entire timeline

---

## Quality Checks (Auto + Manual)

**Automatic (from master-timeline.json review_gates):**
- 68 of 70 SFX cues auto-approved
- 2 human-approval gates: Deep Boom 2 sub-bass test + mb-03->mb-04 crossfade landing
- All volume settings compliant with A3.12 hierarchy
- All 4 critical silence blocks align with corresponding high-impact cues
- Phase-alignment flagged true on all 3 deep-boom 3-layer chains

**Manual (post-first-render):**
- LUFS measurement: render 5s test clips at Kobalt, drei-mal, Danke Deutschland. Verify integrated -14 LUFS, short-term <= -9 LUFS.
- True Peak: -1.0 dBTP hard ceiling via limiter — verify with meter plugin post-render.
- Listening test on 3 systems: headphones, studio monitors, laptop speakers. Deep Boom 2 must feel physical on monitors, not vanish on laptop speakers.
- Reverb bleed check at frames 22603-22649 (pre-boom-3 silence) — Daniel's voice-reverb aux must fade fully before silence.

---

## Dependencies / Upstream

- **Master Timeline:** `../phase-2/master-timeline.json` (consumed)
- **Phase 1C Sound Cues:** `../phase-1/1C-sound-cues.json` (consumed)
- **Transcript:** `../../../src/compositions/daniel-bmf-industriemetalle/captions.ts` (182 segments, 1814 words)
- **Agent prompt:** `../../../docs/agents/agent-3A-sound-executor.md`
- **Rules:** `../../../docs/rules/A-sound-design/` (A1-A5 all applied)

## Downstream / Next Phase

- Phase 5: Render the Remotion composition with audio track included
- Phase 6: Final mix/master pass + LUFS verification + YouTube upload prep
