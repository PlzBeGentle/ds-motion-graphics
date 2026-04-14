# BMF Industriemetalle — Color Segments (Human-Readable)

**Video:** `daniel-bmf-industriemetalle` | **FPS:** 30 | **Duration:** 760s / 22800f | **Segments:** 11

## Brand Framework

- **Base Grade (all segments):** LOCOS Premium Grade
  - Contrast 1.06–1.12, Saturation 0.85–0.95, Warmth +0.10–0.20, cool shadows (200°), warm highlights (30°), Vignette 0.30–0.50, fine grain 1–2%.
- **Shock / Peak Look:** LOCOS Premium + selective Red Accent `#E30613` (NOT Teal-Orange).
- **Skin tone protection:** I-Line 123° ±3°, hue 15–45° qualifier, never below 0.45 saturation floor.

## Anti-Patterns (blocked in all segments)

- NO Teal-Orange (Hue 180–220° paired with 20–40° highlights)
- NO Cyan `#06e0ff`, NO Magenta `#ff4aa0`, NO Violet `#6a4aff`, NO neon-green, NO rainbow/holographic
- NO full-saturation pushes past 1.20
- NO bleach bypass (Daniel-pain is pure desaturation, not bleach)
- NO pure `#000000` backgrounds — always warm black `#161514` via shadow lift

---

## Segment 1 — `col_001_hook` (0–1521f / 0–50.7s)

**Temperature:** cool desaturated | **Transition:** 0f in / 60f out

**Why these values:** Daniel ist erschoepft nach 5h Nachtschicht, ungeglaeubig. Das überschreibt die D1.1-Default-Regel (Hook = warm) bewusst. Der Viewer landet nicht in einer "Willkommen"-Welt sondern in einem Bleiern-dumpfen Morgen. Shadows lift toward 210° (kalt), Highlights minimal zu 32° (Spur Wärme damit Hautton nicht tot wird). Saturation 75 % senkt den Frame ohne Skin-Tone zu killen (hue-curve hält 15–45° bei 0.98). Vignette 18% ist stärker als neutral — sperrt den Blick auf Daniel's erschöpftes Gesicht.

**Key Lumetri:** contrast 12, saturation 75, WB-Temp -12, Shadows Wheel 210° @ 0.20 sat.

---

## Segment 2 — `col_002_context` (1521–4860f / 50.7–162.0s)

**Temperature:** neutral (LOCOS Premium pure) | **Transition:** 60f in / 40f out

**Why these values:** Erklärungs-Phase (15 Jahre Lager, China/Gallium-Kontext). Pure LOCOS Premium ohne emotionalen Shift. Saturation 92 (Base), Warmth +8 (leicht Gold-Tint), Contrast +8. Der Viewer soll zuhören, nicht fühlen — daher minimal ausgeprägte Color-Wheels, nur der charakteristische LOCOS-Split (Shadows zu 200° kühl, Highlights zu 30° warm).

**Key Lumetri:** contrast 8, saturation 92, WB-Temp +8, Balanced Split.

---

## Segment 3 — `col_003_rising` (4860–5838f / 162.0–194.6s)

**Temperature:** cool (-10 sat) | **Transition:** 40f in / **20f out** (fast-out = prep für Kobalt-Peak)

**Why these values:** § 4 Nr. 4a + 4b. Empörung baut sich auf. Kühler als context, aber noch nicht Peak. Die Transition_out 20f ist asymmetrisch — wir fahren HART in den Kobalt-Shock-Red-Peak, damit der Drop funktioniert.

**Key Lumetri:** contrast 14, saturation 88, WB-Temp -6, Shadows Wheel 205° @ 0.16 sat.

---

## Segment 4 — `col_004_kobalt_peak` (5838–7278f / 194.6–242.9s) — **SHOCK #1**

**Temperature:** `locos-shock-red-accent` (BRAND OVERRIDE) | **Transition:** 20f in / 40f out (asymmetric)

**Why these values:** PEAK #1 — Kobalt-Reveal 500 Mio vs. 0 Cent. Vom User geklarstellt: **NICHT Teal-Orange**. Stattdessen:

1. **LOCOS Premium Base** (Contrast 1.12, Saturation 0.92, warm Highlights)
2. **Global Desaturation -8%** damit das einzelne Rot-Element visuell aus dem Frame springt
3. **Selective Red Boost** via HSL-Qualifier (Hue 350°–12°, Sat 40–100%, Luma 20–80%) → Sat-Mult 1.35, Ziel `#E30613`
4. **Warmes Schwarz #161514** im Hintergrund via Shadow-Lift zu 20° (NICHT pures Schwarz)
5. **Vignette 42%** — verstärkt, verengt den Tunnel auf das Element
6. **Chromatic Aberration 1.5px** für 14 Frames — NUR Edge-Impulse beim Reveal

**Key Lumetri:** contrast 18, saturation 92 (global) → 1.35× red push via Hue Sat Curve, vignette 42%, shadow-wheel 20° warm black.

**Rot-Isolation Premiere-Workflow:**
- Lumetri → Curves → Hue vs Sat: drop all hues except 355° to 0.80, raise 355° to 1.35.
- OR adjust layer with Secondary HSL Qualifier (Hue 350–12°, Sat >40%) + Lumetri Saturation +60.

---

## Segment 5 — `col_005_post_kobalt_cool` (7278–9981f / 242.9–332.7s)

**Temperature:** cool sustained | **Transition:** 40f in / **20f out** (prep für Null-Cent-Peak)

**Why these values:** Rückwirkungs-Rant + "Drittens". Sustained cool peak nach Kobalt-Explosion. Sat 85 (zwischen Kobalt-Frame 92 und valley 70), Contrast 15. Bleibt ohne Red-Accent-Effekt weil Budget (2/3 Shock-Red verwendet, 1 Slot offen für Null-Cent). Hier baut sich nur Unbehagen auf — keine Schock-Isolation.

**Key Lumetri:** contrast 15, saturation 85, WB-Temp -8, Shadows 208° @ 0.17 sat.

---

## Segment 6 — `col_006_null_cent_peak` (9981–11208f / 332.7–373.6s) — **SHOCK #2**

**Temperature:** `locos-shock-red-accent` (BRAND OVERRIDE) | **Transition:** 20f in / 40f out

**Why these values:** PEAK #2 — Null-Cent-Refrain. Identisch zur Kobalt-Logik mit minimal anderen Werten (Sat -10 statt -8, Contrast 1.10 statt 1.12, Vignette 40 statt 42) — dadurch ergibt sich ein Gefühl "derselbe Schock, etwas weiter". Selective-Red greift auf "Null"-Zahlen und Title.

**Key Lumetri:** contrast 16, saturation 90 global + 1.30× red push, vignette 40%, shadow-wheel 22° warm black.

---

## Segment 7 — `col_007_kein_zufall_valley` (11208–15117f / 373.6–503.9s)

**Temperature:** cool deep (-30 sat) | **Transition:** 40f in / 60f out

**Why these values:** Valley der Akt-4-Kette (2020 → 2024 → 2026 → 2027). Bittere Klarheit. Sättigung auf 0.70 — der tiefste Drop im Video. Aber: Hue-Sat-Curve protokolliert Skin-Tone (Hue 15–45 bleibt bei 0.80–0.85, nicht unter 0.45-Floor) damit Daniel nicht wie eine Leiche aussieht. Shadows Wheel auf 210° @ 0.22 Sat = deutlich kühler als die anderen cool-Segmente.

**Key Lumetri:** contrast 16, saturation 70, WB-Temp -14, Skin-protected Hue-Sat-Curve.

---

## Segment 8 — `col_008_breathing_options` (15117–16467f / 503.9–548.9s)

**Temperature:** neutral bridge | **Transition:** 60f in / 60f out

**Why these values:** Breathing-Pause + Options. Saubere Brücke vom Valley zum Gold-Payoff. Sat fast zurück auf Base (95), Exposure fast 0, Vignette dropped zu 12%. Der Viewer kriegt visuell Luft — dann kommt Gold.

**Key Lumetri:** contrast 10, saturation 95, WB-Temp 0, Standard LOCOS Split.

---

## Segment 9 — `col_009_schweiz_gold` (16467–19050f / 548.9–635.0s) — **WARM PAYOFF**

**Temperature:** gold warm | **Transition:** 60f in / 60f out

**Why these values:** Akt-6-Solution: Schweizer Zollfreilager. Wärmster Grade im Video. Exposure +0.12, Saturation 112, WB-Temp +14, Highlights-Wheel auf 38° @ 0.18 Sat (kräftiger Gold-Push auf Sonne/Gold-Barren). Halation aktiviert für Glow auf Highlights >0.72 Luminance — nur hier. **KEIN Teal-Orange** (D1.3-Regel 8 verbietet T&O in Resolution-Phasen).

**Key Lumetri:** contrast 10, saturation 112, WB-Temp +14, Gold Hue-Sat-Curve 30–60° boost, halation on.

---

## Segment 10 — `col_010_cta_bittersweet` (19050–22500f / 635.0–750.0s)

**Temperature:** neutral-warm CTA | **Transition:** 60f in / 40f out

**Why these values:** CTA. Vertrauenswürdig, handlungsbereit. Minimal warmer als Context (+4 Exposure, Sat 103, WB-Temp +6). Nicht zu hell — der Closer kommt noch mit kaltem Akzent. Transition-out 40f gleitet weich in den bitteren Closer.

**Key Lumetri:** contrast 9, saturation 103, WB-Temp +6, standard warm-neutral.

---

## Segment 11 — `col_011_closer_cold_accent` (22500–22800f / 750.0–760.0s)

**Temperature:** cool bitter accent | **Transition:** 40f in / 0f out (hard cut = end of video)

**Why these values:** Staccato "Danke, Berlin." + "Euer Daniel." Bitterkeit pur. Kalter Akzent auf warmer Basis. Intensity 7 aber KEIN Shock-Red — bitter ist nicht Schock. Mirror von Hook-Segment (col_001) aber etwas wärmer (Sat 80 statt 75) weil es nicht mehr Erschöpfung ist sondern Resignation mit Haltung.

**Key Lumetri:** contrast 14, saturation 80, WB-Temp -10, Shadows 208° @ 0.16 sat.

---

## Top-3 Color-Shifts (wichtigste Momente)

1. **col_003 → col_004 (Kobalt-Peak)** — harter 20f-Drop in LOCOS Shock Red. Global desaturation fällt von 88 auf 92 (plus Hue-Sat-Push auf Rot), Vignette zieht von 14 auf 42, Shadows rollen von 205° cool zu 20° warm. Chromatic Aberration triggert beim Reveal. Das ist der grösste visuelle Shock des Videos.

2. **col_008 → col_009 (Options → Schweiz Gold)** — 60f-Übergang vom neutralen Bridge in den wärmsten Frame. Saturation +17, Exposure +0.17, Halation schaltet on. Nach 9 Minuten Kühle/Desaturation explodiert das Bild in Gold-Payoff.

3. **col_010 → col_011 (CTA → Bitter Closer)** — 40f-Kippmoment. Neutral-warm WB +6 dreht auf -10, Saturation fällt von 103 auf 80, Contrast zieht an. Endet auf Hardcut ohne Transition — letztes Bild bleibt bitter-still.
