# Phase 4 — Color Grading Output

## Segment Overview

| ID | Range (f) | Range (s) | Section | Temperature | Key |
|---|---|---|---|---|---|
| col_001_hook | 0–1521 | 0–50.7 | hook pain anchor | cool -25% | Daniel exhausted |
| col_002_context | 1521–4860 | 50.7–162.0 | context explanation | neutral | LOCOS base pure |
| col_003_rising | 4860–5838 | 162.0–194.6 | rising § 4 | cool -10% | Prep for peak |
| **col_004_kobalt_peak** | **5838–7278** | **194.6–242.9** | **PEAK 1 Kobalt** | **LOCOS SHOCK RED** | **Brand override** |
| col_005_post_kobalt_cool | 7278–9981 | 242.9–332.7 | sustained cool | cool -15% | Post shock |
| **col_006_null_cent_peak** | **9981–11208** | **332.7–373.6** | **PEAK 2 Null Cent** | **LOCOS SHOCK RED** | **Brand override** |
| col_007_kein_zufall_valley | 11208–15117 | 373.6–503.9 | valley deep | cool -30% | Deepest drop |
| col_008_breathing_options | 15117–16467 | 503.9–548.9 | breathing bridge | neutral | Decompression |
| col_009_schweiz_gold | 16467–19050 | 548.9–635.0 | WARM PAYOFF | gold +12% | Resolution + halation |
| col_010_cta_bittersweet | 19050–22500 | 635.0–750.0 | CTA | neutral warm | Trust + call |
| col_011_closer_cold_accent | 22500–22800 | 750.0–760.0 | bitter closer | cool -20% | Hard cut end |

## Output-Dateien

```
phase-4/color/
├── README.md                          # Diese Datei
├── color-segments.json                # Komplette Spec (alle 11 Segments)
├── color-segments.md                  # Human-readable Segment-Dokumentation
├── lut-recommendations.md             # LUT-Files + Opacities + Workflow
├── transition-keyframes.json          # 10 Color-Transitions mit Keyframes
└── lumetri-presets/                   # 11 Premiere Lumetri Preset JSONs
    ├── col_001_hook.json
    ├── col_002_context.json
    ├── col_003_rising.json
    ├── col_004_kobalt_peak.json        ← Shock Red #1
    ├── col_005_post_kobalt_cool.json
    ├── col_006_null_cent_peak.json     ← Shock Red #2
    ├── col_007_kein_zufall_valley.json
    ├── col_008_breathing_options.json
    ├── col_009_schweiz_gold.json       ← Halation on
    ├── col_010_cta_bittersweet.json
    └── col_011_closer_cold_accent.json
```

## Premiere Lumetri Workflow

### Option A — Pro Sequence-Clip (empfohlen für Feinjustage)

1. **Source footage** auf Timeline legen.
2. **Input LUT setzen** (per Adjustment Layer auf V2):
   - Lumetri → Basic Correction → Input LUT → `LOCOS_Rec709_Neutral.cube` (100%)
3. **Clip per Segment schneiden** gemäss `color-segments.json` frame_start/frame_end.
4. **Pro Segment-Clip** den Lumetri-Preset aus `lumetri-presets/col_XXX.json` laden:
   - Lumetri Color Panel → Hamburger-Menü → Load Preset → ausgewähltes JSON-File
   - (Premiere importiert die Basic + Creative + Curves + Color Wheels Werte)
5. **Skin Tone Protection** als separates HSL Secondary pro Clip:
   - Lumetri → HSL Secondary → Key → Hue 15–45, Sat 25–85, Luma 30–85 → Refine Denoise 10, Blur 3
6. **Shock-Red Segments (col_004, col_006):** Zusätzliches HSL Secondary für Red Boost:
   - Hue 350–12, Sat 40–100, Luma 20–80 → Saturation +60, Hue shift -2
7. **Vignette** in Lumetri → Vignettes mit den Amount/Midpoint/Feather Werten aus dem Preset.
8. **Chromatic Aberration (col_004/006):** Adjustment Layer mit "Offset" Effekt + separate R/B Kanäle oder via Chromatic Aberration Plugin.
9. **Halation (col_009):** Duplicate Layer → Gaussian Blur 3px → Luma-Key (>0.72) → Screen Blend @ 20% opacity → Hue 35° Tint.
10. **Film Grain:** Adjustment Layer über alles mit Noise/Grain Plugin, Opacity 9–14% (pro Segment variiert), Blend Mode Overlay.

### Option B — Adjustment Layer Stack (effizienter für lange Projekte)

1. Eine **Adjustment Layer pro Segment** auf V3 platzieren, Länge = Segment-Länge.
2. Preset laden per Adjustment Layer.
3. Transitions zwischen Segments via "Cross Dissolve" auf den Adjustment Layers mit der Länge aus `transition-keyframes.json` (20/40/60 Frames).
4. Globale Adjustment Layer auf V4 für Input LUT + Skin Protect (läuft über ganzes Video).
5. Globale Adjustment Layer auf V5 für Film Grain + Vignette-Sprecher-Folge (wenn Zoom/Pan).

## Transitions

Details in `transition-keyframes.json`. Quick-Reference:

| Frame | From → To | Dauer | Easing |
|---|---|---|---|
| 1521 | hook → context | 60f | standard |
| 4860 | context → rising | 40f | standard |
| 5838 | rising → **kobalt peak** | **20f** | ease-in (fast shock) |
| 7278 | **kobalt peak** → post cool | **40f** | ease-out (asymmetric) |
| 9981 | post cool → **null cent peak** | **20f** | ease-in (fast shock) |
| 11208 | **null cent peak** → valley | **40f** | ease-out (asymmetric) |
| 15117 | valley → breathing | 60f | standard |
| 16467 | breathing → **gold payoff** | 60f | ease-out (warm bloom) |
| 19050 | gold → CTA | 60f | standard |
| 22500 | CTA → closer | 40f | standard |

**Wichtig:** Die 2 Shock-Red-Segmente haben **asymmetrische Transitions** (20f rein / 40f raus). Die `cross dissolve` Overlap in Premiere muss dementsprechend links-weighted sein.

## Brand Override Summary

- **Base Grade (alle Segmente):** LOCOS Premium Grade
- **Peak Look (col_004, col_006):** LOCOS Shock Red Accent `#E30613` (**NICHT** Teal-Orange)
- **Resolution (col_009):** Gold Warm Payoff (NICHT Teal-Orange — D1.3 Regel 8)
- **Anti-Patterns geblockt:** Teal-Orange, Cyan, Magenta, Violet, Neon-Green, Holographic, Bleach Bypass

## QA Checklist

- [ ] Vectorscope: Skin Tone auf I-Line 123° ±3° in allen non-Peak-Segmenten
- [ ] Waveform: kein Luma-Clipping >1%
- [ ] RGB Parade: Balance okay, keine massive Blue/Red-Drift in Mitten
- [ ] Peak-Check col_004: Rot-Akzent isoliert sichtbar, Skin nicht überfärbt
- [ ] Peak-Check col_006: Null-Cent-Zahl in #E30613, BG warm-black #161514
- [ ] Transitions: 20f/40f asymmetrisch auf Shock-Segments, 60f auf Standard
- [ ] Vignette: Alle Segmente haben Vignette (8–42% opacity range)
- [ ] Grain: 9–14% Opacity, Overlay blend mode, fine/coarse mix 25/75

## Kritischer Hinweis für nächsten Render

**Erster Render = Validation Render.** Die Shock-Red-Werte (col_004 + col_006) sind laut Brand-Atom "tentative" (confidence: medium). Bei ersten Stills:
1. Ist der Rot-Akzent isoliert sichtbar oder schwimmt er im Frame?
2. Ist der warm-schwarze Hintergrund #161514 erkennbar oder kippt er zu grau?
3. Bleibt Daniels Skin Tone stabil oder zieht das Red-Boost ihn ins Rötliche?

Feedback an `atoms/video/color/locos-brand-color-language.md#shock-look-locos-red-accent` für Confidence-Upgrade.
