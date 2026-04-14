---
slug: daniel-bmf-industriemetalle
session_date: 2026-04-14
session_type: full-pipeline-build
operator: Dario Riegauf (LYNØ) + Claude Opus 4.6
status: phase-6-skeleton-in-remotion-studio-with-zoom-layer
last_update: 2026-04-14 (post-iteration fixes)
---

# Session Log — daniel-bmf-industriemetalle Video Pipeline Build

> **Zweck dieses Dokuments:** Vollständige Provenance des Pipeline-Builds für das BMF-Industriemetalle-Video. Hier liegen alle Drafts, Iterationen, Brand-Decisions, Render-Pfade, Kosten, Konflikte und ihre Resolutions. Damit man später (oder eine andere Session) nachvollziehen kann **was unsere ersten Drafts waren, was im Endergebnis steht, und wie wir dahin kamen**.

---

## 0. Video-Kontext

- **Slug:** `daniel-bmf-industriemetalle`
- **Persona:** Daniel Sauer / LOCOS / Vermögensschutz-Brand / Channel @Krisensichere-Geldanlagen
- **Format:** YouTube Longform
- **Thema:** BMF-Schreiben § 4 Nr. 4b UStG vom 9. April 2026 — Steuerprivileg für Industriemetalle, das Daniel als versteckten politischen Move einordnet
- **Aufgenommen:** 14.04.2026 (Daniel-Side, 5h Nachtschicht-Kontext)
- **Skript-Pipeline:** cf-script 4-Stage (BMF-Skript-Session 14.04.2026 morgens — siehe `~/knowledge/log/ingest.md#2026-04-14`)
- **Audio (Source):** `/Users/dario/Downloads/Sequenz 01_32-esv2-60p-bg-3p-music-1p.wav` (139 MB WAV)
- **Video (Source):** `/Users/dario/Downloads/Sequenz 01_33.mp4`

---

## 1. Skript (vor dieser Session bereits da)

**Pfad:** `~/knowledge/routing/content-factory/daniel-bmf-industriemetalle/04-final.md`

**Pipeline-Genealogie:**
- `00-topic.md` — Initial Topic + Hero-Zahlen-Liste
- `01-research-brief.md` — Research-Briefing-Template ausgefüllt
- `01-research-sonar.md` — Perplexity Sonar Deep Research output
- `01-research-tongyi.md` — Tongyi Research output (später als unbrauchbar markiert: halluziniert Expertenzitate, **NIE wieder nutzen** — siehe `feedback_content_factory_pipeline.md`)
- `01-research.md` — Konsolidierter Research (Opus merge der zwei Quellen)
- `02-plan.md` — 12-Section-Plan (Voice-Strategy, Hero-Zahlen-Allocation, Hook-Decision, Loops, Refrain, Eskalation, Emotionsbogen, CTA)
- `03-draft.md` — Gemini-Draft via cf-script Stage 3 (route --model gemini)
- **`04-final.md` — Opus-Polish (final ablese-fertiges Skript) ← INPUT FÜR DIESE SESSION**

**Skript-Plan-Länge:** ~570s (9:30 geplant)
**Reale Aufnahme:** 760s (12:40) → +33% länger als geplant. Daniel hat improvisiert, vor allem in der China-Chronologie und im Kobalt-Reveal.

---

## 2. Pipeline-Architektur

7-Phasen-Pipeline aus dem 14-Agent-System (`~/ds-motion-graphics/docs/VIDEO-AGENT-BLUEPRINT.md`):

```
Phase 0  Transcription                      → loop-whisper-to-captions.py
Phase 1  Analyse (5 parallele Agents)      → Phase-1 JSON outputs
Phase 2  Master-Plan (1 Orchestrator)      → master-timeline.json
Phase 3  Design-Review (Human-in-the-Loop) → 2 NEUE Components gebaut
Phase 4  Execution (5 parallele Agents)    → Production-ready Specs (RUNNING)
Phase 5  QC (3 sequentielle Agents)        → noch ausstehend
Phase 6  Render & Assembly (Premiere)      → noch ausstehend
```

Alle Outputs liegen in `~/ds-motion-graphics/pipeline-runs/daniel-bmf-industriemetalle/phase-X/`.

---

## 3. Phase 0 — Transcription

**Tool:** `loop-whisper-to-captions.py` (selbst gebaut in dieser Session, lebt in `~/scripts/ds-daniel-analysis/learning-loop/`)

**Whisper-History:**
1. **Erster Versuch:** `openai-whisper` CLI (miniconda) mit `large-v3` Modell auf CPU FP32 → 11% nach 12 min, ETA ~110 min. **GESTOPPT** — viel zu langsam.
2. **Zweiter Versuch:** Script umgeschrieben auf `mlx-whisper` (Apple MLX native). Lief in 17 min total (8 min einmaliger Model-Download + 8.5 min Transcription).

**Output:** `/Users/dario/ds-motion-graphics/src/compositions/daniel-bmf-industriemetalle/captions.ts`
- 182 segments
- 1814 Wörter
- 759.94 sekunden Audio
- Format: TypeScript export im ds-motion-graphics-Standard mit word-level timestamps

**Learnings:**
- mlx-whisper ist ~10x schneller als openai-whisper auf CPU für Apple Silicon
- Model-Download ist einmalig, danach gecached → künftige Runs ~5 min für 12-Min-Audio
- Script-Pfad: `~/scripts/ds-daniel-analysis/learning-loop/loop-whisper-to-captions.py`
- Trigger-Command: `python3 loop-whisper-to-captions.py "<audio-path>" <slug>`

---

## 4. Phase 1 — Analyse (5 Agents parallel)

**Spawn:** 5 Task-Tool Sub-Agents in einer Message, alle mit `general-purpose` subagent_type.

**Outputs (alle in `phase-1/`):**

### 1A — Emotional-Beat-Mapper
**Output:** `1A-emotional-beats.json`
- 20 Segments
- 6 Peaks (intensity ≥8)
- 3 Valleys (intensity ≤4)
- Max gap zwischen Peaks: 99s (9s über C2.2 90s-limit, kompensiert durch Bridge-Segment)
- **Kern-Finding:** Daniel hat improvisiert. Hook ist Pain-Hook ("Leute, ich bin absolut erschrocken") statt Skript-Shock-Hook ("5h Nachtschicht"). **Kobalt-Reveal @ 3:14 ist real Climax (Intensity 10)**, NICHT die Schweiz-Lösung wie geplant.
- CTA-Drift: real bei 83.9% statt 55-75% (China-Chronologie hat alles nach hinten geschoben)

### 1B — Overlay-Opportunity-Scanner
**Output:** `1B-overlay-candidates.json`
- 38 Overlay-Candidates
- 19 Hero-Number-Overlays (alle Hero-Zahlen abgedeckt: 5 Stunden, 9. April, BMF 2004, 22 Jahre, 0 Cent, Kobalt, 19%, 4. Feb 25, +365% Gallium, +400% Germanium, +437% Antimon, China Bekanntmachung 10)
- 22 Must-Priority + 12 Should + 0 Could
- 3 Fullscreen-Takeovers
- Avg 20s Overlay-Spacing
- 5 Dead Zones identifiziert, 1 kritisch (618-666s = 48s, später durch ovl-new-001 NewsCard gefüllt)
- **Top-3 Overlays:** KOBALT Fullscreen (3:14), 0 CENT MEHR Fullscreen (0:39), Gallium/Germanium BarChart (6:47)

### 1C — Sound-Cue-Scanner
**Output:** `1C-sound-cues.json`
- 72 Sound-Cues
- **3 Deep Booms** (an Pflicht-Maximum):
  1. @ 0:22 "9. April 2026"
  2. @ 3:15 "Dieses Wort ist Kobalt" — 1.5s Dramatic-Silence davor
  3. @ 12:34 "Danke, Deutschland" — bitter-sarkastisch
- 3 Risers
- 6 Music-Beds: tense-investigation → rising-outrage → cold-pattern-reveal → resolute-solution (Moll→Dur Shift) → cta-resolve → final-silence-punch
- Voice LUFS Target: -14

### 1D — Pacing-Analyzer
**Output:** `1D-pacing-plan.json`
- 73 Cut-Points
- CPM 5.76 (im Daniel-Standard 4-6)
- Längster Talking-Head-Stretch: 45s (well under 90s absolute max)
- 17 Pattern Interrupts (avg ~42s apart)
- First PI bei exakt 28s (im 25-35s-Pflichtfenster)
- 2 Breathing Pauses
- 11 B-Roll Targets identifiziert
- 0 Constraint-Violations

### 1E — Color-Emotion-Mapper
**Output:** `1E-color-plan.json`
- 9 Color-Segments
- **Hook bewusst cool/desaturiert** (Override des D1.1 Standard-Welcome-Warm) — Begründung: Daniel ist nach 5h Nachtschicht erschöpft, kein einladendes Gefühl
- 1 Teal-Orange Peak ⚠ (später als BRAND-MISMATCH erkannt, siehe Sektion 6)
- Note: 1E hatte zum Render-Zeitpunkt KEINE 1A-Daten verfügbar. Hat Tags estimated aus dem Skript. Master-Plan musste das später re-alignen.

---

## 5. Phase 2 — Master-Plan (1 Orchestrator)

**Spawn:** 1 sequentieller Task-Agent mit Zugriff auf alle 5 Phase-1-Outputs + Skript + Transcript.

**Output:** `phase-2/master-timeline.json` (siehe File für vollständige Details)

### Konsolidierte Counts
- 23 Master-Timeline-Segmente (ts_001-ts_023)
- 8 Konflikte gelöst (4 angesagt + 4 vom Orchestrator selber gefunden)
- 39 Overlays approved (38 aus 1B + 1 NEU `ovl-new-001`)
- 0 Overlays rejected
- 70/72 Sound-Cues approved (2 redundante Listicle-Klicks rejected)
- 71/71 Cut-Points approved (10 J-Cuts, 9 L-Cuts, 52 Hard, avg CPM 5.4)
- 11 Color-Segments final (von 1Es 9 erweitert)
- 18 Pattern-Interrupts diversifiziert über 8 Typen
- Budgets: T&O 2/3 · Letterbox 2/3 · Glitch 1/5 · Fullscreen 3/3 (max)

### Konflikt-Resolutions

| ID | Konflikt | Resolution |
|---|---|---|
| C001 | 1A pain-hook vs 1E cool-hook override | Beide aligned — 1Es Override war richtig, 1A bestätigt |
| C002 | T&O Placement: Null-Cent (1E) vs Kobalt (1A Intensity 10) | **1A gewinnt** — T&O nach Kobalt verschoben, Null-Cent bleibt zweiter Peak |
| C003 | 48s Dead Zone bei 618-666s | **NEUE Component** `ovl-new-001` Handelsblatt/FAZ NewsCard @ 645-666s |
| C004 | CTA-Drift 83.9% vs 55-75% target | **Akzeptiert** + ovl-006 BMF-Link von should→must als früher Soft-CTA @ 0:47 |
| C005 | Kobalt vs Schweiz Peak-Hierarchie | **Kobalt = Centerpiece** (max Polish), Schweiz = warm Payoff |
| C006 | Peak 10→Peak 8 ohne Valley | Micro-Valley 19.5s zwischen seg_007 und seg_008 |
| C007 | 1D wollte 5 Fullscreens, B5-Limit 3 | 3 Fullscreens canonical, Rest downgraded zu KineticText/NewsCard |
| C008 | 1B Dead Zone 56.6-66.7s | Akzeptiert als clean-phase + B-Roll Frankfurt @ 1:02 |

### Top-5 Edit-Decisions

1. **Kobalt = CENTERPIECE, Schweiz = PAYOFF** — folgt realem Daniel, nicht veraltetem Skript-Plan
2. **Pain-Hook bleibt cool/desaturiert** — D1.1-Override durchgezogen
3. **T&O-Budget auf 2/3 hochgesetzt** ⚠ (später revidiert wegen Brand-Mismatch — siehe Sektion 6)
4. **NewsCard löst Dead Zone + CTA-Fusion** — eine Komponente schließt zwei Probleme
5. **CTA-Drift akzeptiert mit frühem Soft-CTA-Hedge** — kein Re-Take nötig

### Validation
- 0 Constraint-Violations
- 5 Warnings (3 info/low, 2 medium, 1 high)
  - W001 Fullscreen-Budget at max (info)
  - W002 CTA-Drift akzeptiert (medium, Retention-Risiko)
  - W003 Peak-Cluster nur durch Micro-Valley kompensiert (medium, Phase 4 QC beobachten)
  - W004 Max Talking-Head 45s am Target-Boundary (low)
  - W005 ovl-new-001 ist NEUE Component (high für Phase 3B Build)

---

## 6. ⚠ KRITISCHES FINDING: Brand-Mismatch Teal-Orange

**Wann:** Nach Master-Plan-Präsentation, vor Phase 3 Component-Builds.

**Was passiert ist:**
1. Pipeline-Agents 1E (Color-Mapper) und 2A (Orchestrator) hatten beide **Teal-Orange** als Default-Schock-Look für Kobalt + Null-Cent vorgeschlagen, basierend auf Blueprint D1.3 ("Teal-&-Orange-Look — Shadows H:200-220° / Highlights H:20-40°").
2. **User-Korrektur:** "Wie kommst du auf die teal/orange geschichten das ist doch eigentlich aus frechdachs website" — Brand-Mismatch erkannt.

**Root-Cause:**
- Die LOCOS-Brand-Palette war **bereits dokumentiert** in `~/ds-motion-graphics/docs/research/14-color-science-grading-komplett.md` (Section 5.7 "LOCOS Premium Grade" + Section 7.2 "LOCOS-Palette-Analyse")
- ABER: nie als knowledge-atom extrahiert, also waren die Pipeline-Agents blind dafür
- Plus: Es existierte schon `atoms/video/mograph/daniel-finance-3d-design.md` mit explizitem Cyan/Magenta-Verbot — aber das war im Skill nicht referenziert, also auch unsichtbar für die Agents

**Resolution (3-Layer-Fix):**

### 6a) Knowledge-Atom seeded
Neues Atom: `~/knowledge/atoms/video/color/locos-brand-color-language.md` (5 Claims)
- `#locos-palette-gold-schwarz-rot` — Gold #A68B2C / warmes Schwarz #161514 / Rot AKZENT #E30613
- `#locos-premium-grade-base` — Kontrast 1.06-1.10, Saturation 0.85-0.95, Warmth 0.10-0.20, Vignette 0.3-0.5
- `#shock-look-locos-red-accent` — Schock-Hypothese: LOCOS Premium + selektiver Rot-Boost (status: tentative, render-validation pending)
- `#teal-orange-ist-NICHT-locos` — Anti-Pattern hard rule
- `#frechdachs-vs-locos-trennung` — Brand-Separation (TODO Frechdachs-Atom)

### 6b) Master-Plan gepatcht
- `master-timeline.json` col_004 (Kobalt) + col_006 (Null-Cent) von `temperature: "teal-orange"` zu `temperature: "locos-shock-red-accent"`
- Konkrete Werte: LOCOS Premium Grade Base + Saturation -8% bis -10% + selektiver Rot-Push #E30613 + Vignette 0.40-0.42
- **In Section 5 Top-5 Decisions ist #3 jetzt obsolet** — T&O-Budget wurde de facto auf 0/3 reduziert für LOCOS-Videos

### 6c) Pointer-Layer aufgeräumt
- `~/knowledge/index.md` neue Section "Video / Color (Brand-Layer)"
- `~/knowledge/composites/roles/video-editor.md` → `[[locos-brand-color-language]]` Wikilink
- `~/.claude/skills/video-editor/SKILL.md` (552 Zeilen, separately maintained) → wird beim nächsten Pipeline-Run das Brand-Atom automatisch laden
- Cross-Link zwischen `locos-brand-color-language.md` und `daniel-finance-3d-design.md` als komplementäre Atoms (Color-Pipeline vs 3D-Material-Properties)

**Commits:** `f6fbd77` (atom seed) + `2f33c46` (cross-link)

**Systemisches Learning:** Research-Docs sind nicht automatisch in der Pipeline aktiv. Knowledge-Lift research → atom → composite → skill ist eine Pflicht-Stufe. Nächste Pipeline-Runs werden das Atom automatisch laden.

---

## 7. Phase 3 — Design-Review (Component Builds)

### 7a) KobaltFullscreen

**Spec-File:** `/Users/dario/remotion-coder-test/SPEC-KobaltFullscreen.md`
**Component-File:** `/Users/dario/remotion-coder-test/src/KobaltFullscreen.tsx` (224 Zeilen)
**Composition-ID:** `kobalt-fullscreen` (im `Root.tsx` registriert)

**Generation:**
- Tool: `route --model qwen-coder --temperature 0.2 --max-tokens 16000`
- Cost: **$0.0094**
- Duration: **25.7s**
- Tokens: 4391 in → 2005 out
- Strip command nach generation: `sed -i '' '1d;$d'` (qwen wrapped output in fences)
- TypeScript-Check: 0 errors

**Spec-Approach:** CSS-only (kein Three.js) für Render-Test des LOCOS-Brand-Color-Looks. Primäres Ziel war NICHT 3D-Material-Polish sondern: Beweisen dass der Color-Look stimmt.

**Layer-Stack im Component:**
1. BG `#161514` warm-schwarz
2. Subtle radial-gradient (warmer Mittelpunkt)
3. Red-Glow radial-gradient unter Element-Chip (Layer-Spec: opacity 0.35 — später als zu schwach kritisiert)
4. KOBALT-Title (Inter 900, 280pt, color #f5d37a, text-align center)
5. Red-Underline unter KOBALT (4px height, #E30613, scaleX 0→1 animation)
6. Element-Chip (320x320, rgba(26,26,34,0.85) bg, gold border)
7. "Co" Letter (200pt, #f5d37a, im Chip)
8. "27" Atomic Number (64pt, im Chip)
9. "ELEMENT" Label (18pt uppercase, im Chip oben links)
10. Vignette Overlay (radial-gradient stark, 0.55 mid → 0.85 edge)
11. Subtle Film Grain (SVG noise pattern, opacity 0.05, mix-blend overlay)

**Animation-Phasen:**
- A (Frame 0-15): Entry — Title spring + Chip spring (3f stagger) + Underline scaleX + Glow fade-in
- B (Frame 15-40): Settle & Pulse — sin-wave micro-pulse (1px Y), Glow opacity ±5%
- C (Frame 40-90): Hold

**Renders:**
- `stills/kobalt-test-frame30.png` (post-entry-settle)
- `stills/kobalt-test-frame60.png` (canonical mid-hold) — **APPROVED**

**User-Reaction:** "ok weiter" → Brand-Look bestätigt.

**Mein Review-Findings (subjektiv, vom User akzeptiert ohne Iteration):**
- ✓ BG warmes Schwarz, KOBALT in warm gold, Element-Chip lesbar, Vignette stark, NO Cyan/Magenta
- ⚠ Roter Glow unter Chip etwas subtle (könnte 0.5-0.6 statt 0.35 vertragen) — nicht iteriert
- ⚠ KOBALT-Text leicht blass — nicht iteriert
- ⚠ Element-Chip etwas flach — nicht iteriert
- ⚠ Layout: KOBALT sehr breit relativ zum Chip — nicht iteriert

### 7b) HandelsblattFAZNewsCard

**Spec-File:** `/Users/dario/remotion-coder-test/SPEC-HandelsblattFAZNewsCard.md`
**Component-File:** `/Users/dario/remotion-coder-test/src/HandelsblattFAZNewsCard.tsx` (548 Zeilen)
**Composition-ID:** `handelsblatt-faz-newscard` (im `Root.tsx` registriert)
**Used in Master-Plan:** ovl-new-001 @ 645-666s (Dead-Zone-Filler)

#### Generation v1
- Tool: `route --model qwen-coder --temperature 0.2 --max-tokens 16000`
- Cost: **$0.0195**
- Duration: **64.6s**
- Tokens: 4416 in → 5107 out
- Generation-Output: KEIN Fence-Wrap diesmal (qwen-coder hat das aus dem Prompt verstanden)
- TypeScript-Check: 0 errors

**Layer-Stack:**
1. BG #161514
2. Subtle Texture
3. Headline "DEUTSCHE WIRTSCHAFTSPRESSE" (gold #d4a017, 56pt, letter-spacing 0.18em)
4. Headline-Underline (gold gradient)
5-8. Vier Press-Cards (2x2 Grid, 460x280px, glassmorph)
- Logos als Text-Wordmarks in warm-weiß (NICHT Original-Farben → vermeidet Copyright)
9-12. Vier rote X-Marks ⚠ **als SVG-Strokes** mit stroke-dasharray draw-on Animation
13. Subline "Kein einziger Artikel zu BMF § 4 Nr. 4b vom 9. April"
14. Vignette Overlay
15. Film Grain

**Render v1:** `stills/handelsblatt-test-frame90.png` — **APPROVED mit Critique**

**User-Critique:** "wir haben grade ein real life asset das würde besser aussehen als diese toten striche"

#### Iteration v2 — Real-Life Asset
**Asset gefunden:** `/Users/dario/ds-motion-graphics/public/assets/logos/rotes-x.png`
- 360x360 PNG, 8-bit RGBA, ~100 KB
- Klassisches rotes X mit weißem Outline (Stamp/Sticker-Style)

**Asset-Copy:** Nach `/Users/dario/remotion-coder-test/public/rotes-x.png`

**Component-Edit:**
- Import erweitert: `Img, staticFile` aus remotion
- Alle 4 SVG-Block (X1-X4) ersetzt durch eine `.map()`-Loop die `<Img src={staticFile("rotes-x.png")}>` rendert
- **Animation umgestellt:** statt `stroke-dasharray draw-on` → **Stamp-Animation** mit:
  - `spring(damping 9, stiffness 180, mass 0.7)` — bouncy snap
  - Scale curve `[0, 0.6, 1] → [0, 1.18, 1.0]` (overshoot)
  - Per-X Rotation-Variance `[-4°, +3°, -6°, +5°]` (Charakter, nicht maschinell aligned)
  - Drop-shadow `0 0 36px rgba(227,6,19,0.55)` Red-Glow + `0 8px 24px rgba(0,0,0,0.6)` Tiefen-Schatten
  - Größe: **280x280px** (von ursprünglich 220x220)
  - Opacity ramp: 4 Frames (statt 8 vorher) — schneller snap

**Render v2:** `stills/handelsblatt-v2-frame90.png`

**User-Critique:** "ja weiter bisher sieht ja alles gut aus. aber x n bisschen kleiner nicht verkehrt."

#### Iteration v3 — Smaller X
**Edit:** width/height von 280→**220**, position offset entsprechend angepasst (left/top -110 statt -140)

**Renders v3:**
- `stills/handelsblatt-v3-frame40.png` — Mid-Stagger (X1 settled, X2 mid-stamp, X3+X4 noch leer)
- `stills/handelsblatt-v3-frame55.png` — 3 of 4 X visible
- `stills/handelsblatt-v3-frame90.png` (canonical mid-hold) — **APPROVED**

**Stagger-Animation Frame-Mapping (final v3):**
| X | Card | Start-Frame | Time | Rotation |
|---|---|---|---|---|
| X1 | Handelsblatt | Frame 32 | 1.07s | -4° |
| X2 | FAZ | Frame 38 | 1.27s | +3° |
| X3 | Die Welt | Frame 44 | 1.47s | -6° |
| X4 | Manager Magazin | Frame 50 | 1.67s | +5° |

Spacing 6 Frames = 0.2s zwischen X-Stamps. Plus Cards staffeln davor (Frame 10/14/18/22) plus Headline (Frame 5) plus Subline (Frame 65).

**User-Reaktion:** "ja die roten x kommen ja mit der zeit rein denke ihch und nciht sofort." → bestätigt dass das Stagger-Design verstanden ist. **APPROVED**

#### Total Cost beider Components
- KobaltFullscreen: $0.0094
- HandelsblattFAZNewsCard v1: $0.0195
- v2 Edits + v3 Edit: nur lokale Edits, kein zusätzlicher route call
- **Total qwen-coder-Kosten: $0.029**

#### Material-Recipe-Source
- Spec referenziert `~/knowledge/atoms/video/mograph/daniel-finance-3d-design.md` Material-Recipes (für 3D-Components, hier nicht direkt verwendet aber als Brand-Reference)
- Beide Components folgen LOCOS Premium Grade Base
- **0 Cyan/Magenta/Teal in beiden finalen Stills** (mehrfach geprüft)

---

## 8. Phase 4 — Execution (KOMPLETT ✓)

**Spawn:** 5 parallele Task-Agents in einer Message. Alle 5 fertig.

| Agent | Task | Output-Verzeichnis | Status |
|---|---|---|---|
| 3A Sound-Executor | SFX-Cue-Sheet + Music-Bed + Voice-Chain | `phase-4/sound/` | ✓ done (~13 min) |
| 3B MoGraph-Executor | 39 Overlay-Specs | `phase-4/mograph/` | ✓ done (~10 min) |
| 3C Zoom/Edit-Executor | Cut-Markers + Zoom-Keyframes + Premiere XML | `phase-4/edit/` | ✓ done (~9 min) |
| 3D Color-Executor | Lumetri-Settings + LUT-Recommendations | `phase-4/color/` | ✓ done (~10 min) |
| 3E Text-Caption-Executor | Captions + Lower-Thirds + KineticType | `phase-4/text/` | ✓ done (~5 min) |

### 8a) 3A Sound-Executor — Output

**Files in `phase-4/sound/`:**
- `sfx-cue-sheet.md` (11 KB human-readable)
- `sfx-cue-sheet.json` (61 KB machine-readable, 70 approved + 2 rejected stubs)
- `music-bed-plan.json` (23 KB, 6 beds mit Search-Params, Stems, Volume-Automation, Ducking)
- `voice-processing-chain.json` (6.8 KB, 8-Plugin chain)
- `README.md` (6.3 KB, Import-Anleitung + QC-Checks)

**Counts:**
- 70/72 SFX-Cues approved (sfx-018, sfx-019 thinned per C2 breathing-cadence)
- 3/3 Deep Booms at limit (9.April @ 0:22, Kobalt @ 3:15, Danke Deutschland @ 12:34)
- 3/4 Risers (1.23s / 2.73s / 8s)
- 11 Silence-Blocks, davon 4 critical pre-high-impact
- 6 Music-Beds mit 5 mood-shifts

**Music-Bed-Arc:**
| Bed | Frames | Mood | Key | BPM |
|---|---|---|---|---|
| mb-01 | 0-4650 | tense-investigation | E-Moll | 85-100 |
| mb-02 | 4650-10350 | rising-outrage | C-Moll | 90-105 |
| mb-03 | 10350-15000 | cold-pattern-reveal | F-Moll | 95-110 |
| **mb-04** | **15000-19200** | **resolute-solution** | **G-Dur** | **85-95** |
| mb-05 | 19200-22603 | cta-resolve | B-Dur | 90-100 |
| mb-06 | 22650-22800 | final-silence-punch + outro-swell | A-Moll → B-Dur | 0 → 85 |

**Key Mood-Shift:** mb-03 → mb-04 bei 8:20 (500s) — 4s logarithmic crossfade Fm → GM, der einzige deliberate **Moll → Dur Stimmungswandel** im Video.

**Voice-Processing-Chain (Reihenfolge):**
```
HPF 90Hz → Param EQ (200Hz -3.5 / 380Hz -5 / 3kHz +2.5 / 11kHz +1.5 shelf)
→ Comp Stage1 (VCA 2.5:1 -18dB) → Stage2 (Opto 3.5:1 -15dB) → Stage3 (FET 2:1 -12dB)
→ De-Esser (6.5kHz, -4dB max) → Reverb Aux (Room 0.8s, 8% wet) → Limiter (-1.0 dBTP)
```

**Override:** Presence-Band auf **+2.5 dB Boost** statt A4.3.3 Cut — Daniel fehlt natürliche Präsenz, nicht umgekehrt. Dokumentiert im voice-processing-chain.json.

**Premiere-Import-Format:** JSON mit WAV target paths (NICHT direkt XML/AAF). Pipeline ist Remotion-first — simpler Importer-Script liest die JSON und generiert `<Sequence><Audio src={staticFile(...)} volume={interpolate(...)} /></Sequence>` blocks. Falls Premiere-Import nötig: FCPXML 1.10 als Zwischenformat via Node.js-Transformer (zu bauen).

**Top-3 Sound-Momente:**
1. **KOBALT REVEAL** @ 5868f / 195.6s — Riser 2.73s → Silence 500ms → Deep Boom 2 (3-layer, max 0.10, Hall 2.5s, screen-shake 8f sync). **Human-Review-Gate für Sub-Bass-Kalibrierung.**
2. **DANKE DEUTSCHLAND** @ 22649f / 754.96s — Music full-duck 1s → 1.5s Total-Stille (größte Drama-Pause) → Deep Boom 3 (Hall 3.0s longest tail) → warmer Outro-Stinger überlappt Boom-Tail
3. **DREI MAL DÜRFT IHR RATEN** @ 14609f / 486.98s — 8s Major-Riser Crescendo → 500ms Silence → High-Impact bass-hit 0.07 (NICHT deep-boom, reserviert)

**Constraints validated:**
- Alle 3 Deep-Booms haben 15f Silence davor (A3.9) ✓
- Phase-alignment flag auf allen 3 Deep-Boom 3-layer chains true ✓
- Music unter Sprache: 0.032-0.034 über alle 6 Beds (A2.5 compliant) ✓
- Schweiz = gold warm-bass-hit NICHT deep-boom (C005 resolution: payoff not climax) ✓
- 2 Human-Approval-Gates dokumentiert: Kobalt Sub-Bass + mb-03→mb-04 4s log-crossfade landing

---

### 8b) 3B MoGraph-Executor — Output

**Files in `phase-4/mograph/`:**
- `mograph-overlay-specs.json` — alle 39 Overlays mit Component-Type, Props, Position, Animation, Status
- `new-components-to-build.md` — Liste der 22 NEUEN Components
- `existing-components-with-overrides.md` — Library-Components mit Props-Override
- `component-build-order.md` — empfohlene Build-Sequence Critical → Optional
- `README.md`

**Component-Breakdown (39 approved):**
| Status | Count | Cost |
|---|---|---|
| ✓ Already built (KobaltFullscreen + HandelsblattFAZNewsCard) | 2 | $0 |
| Library mit Props-Override | 13 (über 5 Components) | $0 |
| NEW zu bauen | 22 (12 unique + 10 copy-edit variants) | ~$0.28-0.36 |

**3D vs 2D:**
- **0 R3F / Three.js** — kein `--gl=angle` Risiko für dieses Video
- 4 CSS-3D Document-Cards (perspective + rotateY für Entrance)
- 35 pure 2D/CSS

**Top-5 wichtigste Components:**
1. **ovl-015 KobaltFullscreen** @ 3:14-3:30 — Centerpiece, already built ✓
2. **ovl-005 FullscreenTakeover "0 CENT MEHR STEUERN"** @ 0:39-0:46 — existing, Orbitron 560px Hero in #E30613, Deep-Boom-1 anchor
3. **ovl-024 NullEuroBilanzFullscreen** @ 6:02-6:13 — NEW, third and last Fullscreen (budget 3/3 final)
4. **ovl-034 SchweizLocationCard** @ 9:42-9:52 — NEW right-split, parallax-depth KenBurns Schweiz-Alpen, warm payoff
5. **ovl-new-001 HandelsblattFAZNewsCard** @ 10:45-11:06 — already built v3 ✓

**Library-Reuse-Pattern:**
- **KineticType — 10x reused** (25% aller Overlays!) — kritischer Pfad. Vor Tier-1-Builds müssen alle 5 Reveal-Types verifiziert werden (mask-wipe, highlighter-wipe, stamp-slam, glitch-reveal, slow-fade-in)
- QuoteCard — 2x (legal quotes ovl-021, ovl-033)
- FullscreenTakeover / ChartBuild / SplitNarrative — je 1x

**Risk-Flags:**
- KineticType Reveal-Type-Coverage muss zuerst verifiziert werden
- `SchweizLocationCard` braucht `public/bmf/schweiz-alpen.jpg` Asset
- `shock-look-locos-red-accent` ist `confidence: medium` — KobaltFullscreen-Render ist Validation (✓ schon in Phase 3 erledigt)

**Brand-Compliance bestätigt:**
- ✓ Zero Cyan/Magenta/Teal-Orange (LOCOS-Override)
- ✓ Fonts nur Inter/Montserrat/Playfair/Orbitron/DM Sans
- ✓ Alle 39 Overlays respektieren Face-Safe-Zone `x:760-1160 y:80-560`
- ✓ Cognitive Load max 3 of 4 (Daniel=1)
- ✓ Fullscreen 3/3, Glitch 1/5, Stamp-Slam 2/3

---

### 8c) 3C Zoom-Edit-Executor — Output

**Files in `phase-4/edit/`:**
- `cut-points.json`
- `cut-points.csv` (Premiere-Marker-Format)
- `zoom-keyframes.json` (Lumetri-kompatibel)
- `pattern-interrupts.json`
- `b-roll-slots.md` (mit Sourcing-Hints)
- `premiere-markers.xml` (FCP7-XML xmeml v5, primary Import-Format)
- `README.md`

**Counts:**
- **71 Cut-Points** (55 Hard, 6 J-Cuts mit 10-15f Overlap, 10 L-Cuts mit 10-15f Overlap)
- **CPM 5.6** (Daniel-Standard 4-6 ✓)
- **19 Zoom-Keyframes** — Max Scale **1.25x** (Crash-Zoom pre-Kobalt, unter 1.28 1080p Limit ✓)
- **Smooth Ramps 72% / Hard Jumps 28%** (C3.4.6 compliant)
- **transformOrigin** zwischen 38-45% Y (nie 50/50, immer Daniels Gesicht), 50/38 am Kobalt-Peak, asset-based 55/55→45/40 für Schweiz-BG
- **18 Pattern-Interrupts** über 8 Typen (3 Fullscreen / 3 B-Roll / 3 KineticText / 2 Freeze / 2 Letterbox / 2 Zoom / 1 Snap / 1 Split / 1 Color)
- **Budgets eingehalten:** Fullscreen 3/3 ✓ Letterbox 2/3 ✓
- **11 B-Roll Slots** (74s total = ~9.7% hard B-Roll + ~30% Overlay-Breakthrough = ~40% visual variation ✓)
- **Längster Talking-Head: 45s** ✓ (im 45-60s Quality-Target, well under 90s absolute max)

**Master-Plan-Reporting-Diskrepanz dokumentiert:**
Master-Timeline hatte als headline "10 J-Cut / 9 L-Cut / 52 Hard". 1D raw data + 3C audit zeigen **6/10/55**. Total 71 stimmt aber. Master-Plan-Report-Bug, kein Pipeline-Fehler.

**Premiere Import-Format:** **FCP7-XML** (`premiere-markers.xml`) — alle 118 Marker auf einmal importierbar (71 Cuts + 19 Zooms + 18 PIs + 11 B-Roll-Ranges).

**Dario-Workflow:**
1. Premiere Pro → 1920×1080 30fps Sequence `daniel-bmf-industriemetalle-markers`
2. Daniels Master-Camera-Clip auf V1
3. `File → Import → premiere-markers.xml`
4. "Import markers into existing sequence"
5. `Window → Markers` Panel — alle 118 Entries sortierbar nach Name-Prefix (CUT-, ZOOM-, PI-, BROLL-)

**B-Roll Sourcing-Prioritäten** (in `b-roll-slots.md`):
- MUST: Kobalt (Slot 5), Schweiz Alpen+Tresor (Slot 10), Chipfabrik TSMC/Intel (Slot 8), BMF Berlin (Slot 1)
- SHOULD: 4 weitere Slots
- COULD: 3 weitere

---

### 8d) 3D Color-Executor — Output

**Files in `phase-4/color/`:**
- `color-segments.json` — alle 11 Segmente mit konkreten Lumetri-Werten
- `color-segments.md` — human-readable Erklärung pro Segment
- `transition-keyframes.json` — Color-Transitions zwischen Segments
- `lut-recommendations.md` — LUT-File-Vorschläge mit Begründung
- `lumetri-presets/col_001_hook.json` bis `col_011_closer_cold_accent.json` (11 Files)
- `README.md`

**Brand-Compliance Audit (DOKUMENTIERT):**
- ✓ **0 Segmente mit Teal-Orange-Mode** (`teal_orange_segments: 0`)
- ✓ Cool-Shadow-Splits in allen Cool-Segmenten sind LOCOS Premium Base (Saturation **0.04-0.20**) — NICHT der D1.3-Teal-Orange-Push (der 0.70-0.75 verlangt)
- ✓ Shock-Peak-Segmente (col_004 Kobalt, col_006 Null-Cent) haben uniform warme Shadows (20-22°) + warme Highlights (28°) + selektiver Rot-Boost via HSL Secondary Qualifier `#E30613`, Sat ×1.35
- ✓ Kein `#06e0ff` / `#ff4aa0` / `#6a4aff` irgendwo
- ✓ Skin-Tone-Schutz in allen 11 Presets als HSL Secondary Qualifier (Hue 15-45°, I-Line 123° ±3°)

**6 LOCOS-Custom-LUTs zu bauen:**

| LUT | Opacity | Verwendet in |
|---|---|---|
| `LOCOS_Rec709_Neutral.cube` | 100% | Technical Input (alle Segmente) |
| `LOCOS_Premium_Base.cube` | 35-40% | col_002, col_008, col_010 |
| `LOCOS_Premium_CoolDesaturate.cube` | 30-38% | col_001, col_003, col_005, col_011 |
| `LOCOS_Premium_ValleyDeep.cube` | 45% | col_007 |
| `LOCOS_Shock_RedAccent.cube` | 42-45% | col_004, col_006 (Brand-Override) |
| `LOCOS_Gold_Payoff.cube` | 40% | col_009 |

**⚠ Die LOCOS-LUTs existieren noch NICHT** — Workflow zum Eigenbau aus Lumetri-States ist in `lut-recommendations.md` dokumentiert. **TODO für Render-Phase.**

**Top-3 Color-Shifts:**
1. **col_003 → col_004 Kobalt Peak** (Frame 5838, **20f asymmetrisch in**) — Hard-Drop in LOCOS Shock Red. Contrast 14→18, Vignette 14→42, Shadow-Wheel rollt 205° cool → 20° warm, Selective Red Boost via HSL Qualifier (Hue 350-12°, Sat ×1.35), Chromatic Aberration triggert 14f
2. **col_008 → col_009 Schweiz Gold** (Frame 16467, 60f standard) — Exposure -0.05→+0.12, Saturation 95→112, WB +14, Highlights-Wheel 38° @ 0.18 Sat (Gold-Push auf Berge/Barren), Halation @ 0.72 Luminance Key. **KEIN Teal-Orange** (D1.3 Regel 8 verbietet das für Resolution)
3. **col_010 → col_011 Bitter Closer** (Frame 22500, 40f accent shift) — WB +6→-10, Saturation 103→80, Contrast 9→14. Endet auf **Hardcut** — Resignation mit Haltung statt Erschöpfung

**Premiere Lumetri Import:** `Lumetri Color Panel → Hamburger → Load Preset` für jedes der 11 JSON-Files. Mapping direkt auf Lumetri Basic/Creative/Curves/Wheels/HSL Secondary.

**Shock-Red-Limit:** 2/3 verwendet (col_004, col_006) — 1 Slot frei falls später benötigt.

---

### 8e) 3E Text-Caption-Executor — Output

**Files in `phase-4/text/`:**
- `captions.srt` — 182 SRT entries (full transcript) für Premiere/YouTube Import
- `captions-kinetic.json` — 176 burned-in kinetic segments (6 suppressed inside Lower-Third windows per cognitive-load rule)
- `lower-thirds.json` — 3 Lower-Thirds
- `title-cards.json` — 7 Chapter-Markers (Akt 1-7)
- `kinetic-moments.json` — 10 KineticType-Moments
- `README.md`

**Counts:**
- **182 Caption-Lines** (im 150-200 Target für 12:40 Audio)
- **3 Lower-Thirds:** ovl-001 (5 STUNDEN NACHTSCHICHT), ovl-006 (Soft-CTA BMF-Link), ovl-036 (Hard-CTA BMF-PDF + Erstgespräch)
- **7 Chapter-Markers** (Hook bis "Danke Deutschland")
- **10 KineticType-Moments** (im 8-12 Budget)

**Brand-Compliance Audit (DOKUMENTIERT):**
- ✓ Scripted hex-scan aller 4 JSON-Files → nur LOCOS-Palette-Werte
- Warm white: `#fff5e0`, `rgba(255,245,224,0.62-0.85)` (primary body)
- LOCOS Gold: `#f5d37a`, `#d4a017` (Akzent / Hero)
- LOCOS Red: `#E30613` (selektiv NUR auf Schock-Hero-Wörter: AUFGEHOBEN, BRUCH, 0 CENT, STRAFZETTEL, GELÖSCHT, GENAU JETZT, WEG)
- LOCOS warm black: `#161514`, `rgba(22,21,20,0.58)`
- Zwei "teal" Vorkommen sind explizite Anti-Pattern-Kommentare ("NOT teal-orange") — keine Farbwerte

**Top-3 KineticType-Moments:**

1. **km-08 ovl-022 "#4 · 0 CENT · NEUE STEUERN"** @ Frame 9981-10299 (5:32-5:43, 10.6s)
   - "0 CENT" in `#E30613` @ 132px Inter 900, letter-spacing -0.03em
   - Tracking-Reveal -0.02em → 0.06em über 12f ease-out-expo, Stagger 4f
   - Breath-Pulse aktiviert (>3s Standzeit)
   - Keyboard-Click foley @ 0.018
   - **Loudest visual moment of the video**

2. **km-09 ovl-030 "GENAU JETZT · LETZTE INFRASTRUKTUR · WEG"** @ Frame 13773-14178 (7:39-7:52, 13.5s)
   - "GENAU JETZT" + "WEG" in #E30613, Mitte in #fff5e0
   - **1/5 Glitch-Budget verwendet:** rgb_split_px 5, duration 5f, opacity 55%, blend screen
   - **Einziger Glitch-Moment im ganzen Video** (per 3B Budget)

3. **km-10 ovl-038 "DANKE, DEUTSCHLAND."** @ Frame 22587-22797 (12:33-12:39, 7.0s)
   - "DANKE," in #fff5e0, "DEUTSCHLAND." in `rgba(255,245,224,0.62)` (ausblassen, kalt)
   - Blur-Reveal 12→0px, duration 28f + fade-in 24f
   - **KEIN Foley** — pure Stille + slow fade (synchron mit mb-06 final-silence-punch)

**Standzeit-Audit:** Alle 10 KineticMoments + 3 Lower-Thirds + 7 Chapter-Cards PASS (≥3s Mindestzeit, ≥`max(90f, word_count × 18f)`).

**Wichtige Decisions:**
- **Captions burned-in als sekundärer Layer** — Master-Timeline sagt `captions_burned_in: false` (YT-native CC), aber zusätzlich `captions-kinetic.json` für optional Remotion-Burn-In
- **Hero-Zahlen-Bold-Detection automatisch** aus Transcript-Match gegen Skript-Hero-Liste
- **Font Inter** statt Agent-Default DM Sans (User-Constraint)
- **LOCOS Red #E30613 statt Rules-Doc #FF4444** — Brand-Atom ist authoritative
- **Kinetic moments = 10 (nicht 12)** — alle aus master-timeline 3E_text übernommen, mehr wäre Over-Engineering

---

## 8f) Phase 4 Costs Summary

| Agent | Tool | Time |
|---|---|---|
| 3A Sound | Claude sub-agent | ~13 min |
| 3B MoGraph | Claude sub-agent | ~10 min |
| 3C Zoom/Edit | Claude sub-agent | ~9 min |
| 3D Color | Claude sub-agent | ~10 min |
| 3E Text/Caption | Claude sub-agent | ~5 min |
| **Phase 4 total parallel runtime** | | **~13 min** (longest = 3A) |

## 8g) Phase 4 Constraints — alle eingehalten

- ✓ 0 Cyan/Magenta/Teal-Orange (3D Color + 3E Text + 3B MoGraph alle bestätigt)
- ✓ LOCOS Brand-Override durchgängig
- ✓ Face-Safe-Zone respektiert (3B MoGraph)
- ✓ Cognitive Load max 3-4 (3B + 3E)
- ✓ LUFS Target -14 (3A Sound)
- ✓ Deep Boom 3/3 at limit (3A Sound)
- ✓ Talking-Head max 45s (3C Edit)
- ✓ Pattern-Interrupt budgets (3C Edit)
- ✓ Skin-Tone-Schutz in allen Color-Presets (3D Color)

## 8h) Phase 4 Open Risks für Phase 5 QC

- ⚠ KineticType Reveal-Type-Coverage muss verifiziert werden bevor Tier-1 MoGraph-Builds
- ⚠ LOCOS-LUTs existieren noch nicht — müssen vor Color-Render gebaut werden
- ⚠ `SchweizLocationCard` braucht externes Asset (`schweiz-alpen.jpg`)
- ⚠ Kobalt Sub-Bass-Kalibrierung braucht Human-Review (3A Sound flagged)
- ⚠ mb-03 → mb-04 4s log-crossfade landing braucht Human-Review (3A Sound flagged)
- ⚠ shock-look-locos-red-accent ist `confidence: medium` — Render-Validation am echten BMF-Frame steht aus

---

## 9. Was NACH Phase 4 noch passieren muss

### Phase 5 — QC (3 sequentielle Agents)
- 4A Technical QC (LUFS, True-Peak, WCAG, Frame-Kollisionen)
- 4B Creative QC (Cognitive Load, Emotional-Bogen, Pacing-Plan, Open-Loops)
- 4C Brand-Consistency QC (Daniel-Voice-Match, LOCOS-Palette, Font-Hierarchie)

### Phase 6 — Render & Assembly (manuell)
- Remotion-Renders der approved Components (ProRes 4444 + Alpha)
- AE-Compositing wo nötig (Roto, Tracking, Particles)
- Premiere Final Assembly (Master-Timeline aus phase-2 als Guideline)
- Final Master Render (H.264, -14 LUFS, -1.0 dBTP, 1080p60 oder 1440p60)

### Externe Hand-Jobs (parallel)
- B-Roll-Sourcing (Schweiz Alpen+Tresor, Chipfabrik TSMC/Intel, Zollfreilager Frankfurt) — 11 Slots, ~74s Material
- Thumbnail-Design (separater Skill, nicht Teil dieser Pipeline)
- YouTube Upload + Description + Tags

---

## 10. Render-Index (alle Stills + Pfade)

| File | Component | Frame | Status | Beschreibung |
|---|---|---|---|---|
| `~/remotion-coder-test/stills/kobalt-test-frame30.png` | KobaltFullscreen | 30 | approved | Post-Entry-Settle |
| `~/remotion-coder-test/stills/kobalt-test-frame60.png` | KobaltFullscreen | 60 | **APPROVED canonical** | Mid-Hold |
| `~/remotion-coder-test/stills/handelsblatt-test-frame90.png` | HandelsblattFAZ v1 | 90 | superseded | SVG-Strokes (alt) |
| `~/remotion-coder-test/stills/handelsblatt-v2-frame90.png` | HandelsblattFAZ v2 | 90 | superseded | Real-Life-X 280x280 (zu groß) |
| `~/remotion-coder-test/stills/handelsblatt-v3-frame40.png` | HandelsblattFAZ v3 | 40 | reference | Mid-Stagger 1 X visible |
| `~/remotion-coder-test/stills/handelsblatt-v3-frame55.png` | HandelsblattFAZ v3 | 55 | reference | Mid-Stagger 3 X visible |
| `~/remotion-coder-test/stills/handelsblatt-v3-frame90.png` | HandelsblattFAZ v3 | 90 | **APPROVED canonical** | Final all 4 X 220x220 |

---

## 11. Spec-Index (alle Specs)

| File | Component | Version | Pfad |
|---|---|---|---|
| SPEC-KobaltFullscreen.md | KobaltFullscreen | v1 | `~/remotion-coder-test/SPEC-KobaltFullscreen.md` |
| SPEC-HandelsblattFAZNewsCard.md | HandelsblattFAZNewsCard | v1 (SVG) | `~/remotion-coder-test/SPEC-HandelsblattFAZNewsCard.md` |

> Die SPEC-Files entsprechen NICHT den Edit-Iterationen v2/v3 — die wurden direkt im .tsx-Code editiert, nicht in der Spec. Wenn diese Components später nochmal generiert werden müssen, sollte die Spec auf v2 (Real-Life-Asset) erweitert werden.

---

## 12. Costs Summary

| Stage | Tool | Cost | Time |
|---|---|---|---|
| Phase 0 Whisper (1. attempt fail) | openai-whisper CPU | $0 | 12 min wasted |
| Phase 0 Whisper (mlx) | mlx-whisper large-v3 | $0 | 17 min (8 min model download + 8.5 min transcription) |
| Phase 1 (5 agents) | Claude sub-agents | metered separately | ~12 min parallel |
| Phase 2 (1 agent) | Claude sub-agent | metered separately | ~12 min |
| Phase 3 KobaltFullscreen | qwen-coder | $0.0094 | 25.7s |
| Phase 3 HandelsblattFAZNewsCard v1 | qwen-coder | $0.0195 | 64.6s |
| Phase 3 v2 (real-life asset) | local edit | $0 | ~5 min hand-edit |
| Phase 3 v3 (smaller X) | local edit | $0 | <1 min |
| Phase 4 (5 agents) | Claude sub-agents | metered separately | running |
| **Total qwen-coder** | | **$0.029** | |

Sub-agent costs (Claude task-tool spawning) sind nicht separat metered in dieser Session.

---

## 13. Knowledge-Hub-Updates aus dieser Session

Commits im `~/knowledge/` repo (alle aus dieser Session):

| Commit | Beschreibung |
|---|---|
| `cfd51c5` (vorher) | docs phase-04 complete |
| `fbf2aa3` | sync 26-claim count + BMF refs to index + skript-schreiber composite |
| `9b2bfbc` | composite skript-schreiber: cf-script pipeline awareness |
| `8ed6617` | learning-loop-v1 architecture spec |
| `4572457` | learning-loop-v1 lock 6 decisions |
| `d010a94` | learning-loop MVP stages 3+4 + EZB-Falle validation (5-gram 27% match v3) |
| `1ee3407` | graph-hygiene: wire up 5 new mograph atoms |
| `4a93379` | graph-hygiene: commit untracked workflow + templates |
| `f6fbd77` | brand-fix locos: seed color-language atom + override Blueprint D1.3 |
| `2f33c46` | graph-link: cross-reference locos-color ↔ daniel-finance-3d-design |

**Neue Atoms aus dieser Session:**
- `~/knowledge/atoms/video/color/locos-brand-color-language.md` (5 claims)

**Updated Atoms / Composites:**
- `~/knowledge/index.md` (mograph/assets/color sections)
- `~/knowledge/composites/roles/video-editor.md` (mograph + brand-color wikilinks, 26 voice claims fix)
- `~/knowledge/composites/roles/skript-schreiber.md` (26 claims, BMF-session refs)

---

## 14. Wichtige Learnings für zukünftige Pipeline-Runs

1. **Knowledge-Lift ist Pflicht-Stufe.** Research-Docs in `ds-motion-graphics/docs/research/` sind nicht automatisch in der Pipeline aktiv — sie müssen als Atoms extrahiert UND in Composites + Skill als Wikilinks gelistet werden. Nur dann sind die Pipeline-Agents brand-aware. Die Teal-Orange-Episode war ein direkter Gap zwischen "gibt es" und "ist gefunden".

2. **Brand-Defaults müssen den Generic-Defaults vorangehen.** Blueprint D1-D3 sind generische Cinematic-Techniken. Brand-Atoms sind Overrides. Pipeline-Agents müssen bei Konflikt die Brand-Atoms gewinnen lassen.

3. **mlx-whisper > openai-whisper** auf Apple Silicon. ~10x schneller. Always nutze MLX wenn verfügbar.

4. **Iteriere die Spec, nicht das Modell** — bestätigt zum N-ten Mal. qwen-coder mit guter Spec liefert Production-Ready-Code zu $0.01-0.02. Modellwechsel zu Gemini würde nichts verbessern.

5. **Real-Life Assets > Generated SVG** für emotionale Akzente. Das `rotes-x.png` Asset hat den HandelsblattFAZNewsCard von "designed" zu "visceral" gehoben. Lookup-Tabellen in `daniel-finance-3d-design.md` haben mehr solche Assets dokumentiert — beim nächsten Run zuerst dort prüfen, bevor SVG generiert wird.

6. **Stagger ist Brand-Signature.** Die 4 X-Marks gestaffelt (4× 6-Frame-Intervall) wirken viel stärker als wenn alle gleichzeitig poppen würden. Gleiches Prinzip für alle Multi-Element-Reveals.

7. **Master-Plan löst Konflikte explizit.** Die 8 dokumentierten Konflikt-Resolutions sind nachvollziehbar — wenn etwas später nicht stimmt, kann man genau zurückverfolgen warum die Entscheidung so getroffen wurde.

8. **"Daniel hat improvisiert" muss von der Pipeline ernstgenommen werden.** Skript-Plan ist Hypothese. Was Daniel real spricht, ist die Wahrheit. Edit folgt der realen Aufnahme, nicht dem geplanten Skript. (Kobalt = real Climax, nicht Schweiz; CTA bei 83.9% akzeptiert; Pain-Hook statt Shock-Hook.)

---

## 16. Phase 5 — QC (3 parallele Review-Agents)

**Spawn:** 3 parallel Task-Agents in einer Message. Alle 3 im ~7 min durchgelaufen.

### 16a) 4A Technical QC

**Output:** `phase-5/4A-technical-qc.json`

- **25 Checks total:** 18 Pass / **0 Failures** / 7 Warnings
- **Phase-6 Blockers:** KEINE — Render kann starten
- **2 Medium Warnings:**
  - **`C2.2-fullscreen-takeover-budget`** — 3/3 Fullscreens (ovl-005, 015, 024) + ovl-new-001 als "fullscreen-PI" reclassifiziert. Strikte Auslegung = 4/3. Aktion: Creative-Review bestätigen ob NewsCard als Takeover zählt.
  - **`FACE-SAFE-ZONE`** — ovl-003 KineticText (x:0-1920, y:40-200) überlappt Face-Safe-Zone rechnerisch. Spec sagt OK, bbox-Math sagt Overlap. Später durch `paddingTop: 80 → 15` + alle "top" Positions → "bottom" Umstellung gefixt (siehe Sektion 18c).
- **5 Low Warnings:** Caption-Standzeiten, Font-Sizes 20-22px (B2.3 range ok), B-Roll-Ratio aus Specs nicht berechenbar, PI-Gap 34s, Breathing-Coverage 6/39.

**Was bestanden:** LUFS/True-Peak/Music-unter-Sprache/Deep-Booms/Silence-vor-Impact/Voice-Chain/Phase-Alignment/Cuts-at-Wortgrenzen/J+L-Cut-Overlaps/Talking-Head-Max/Zoom-Max-1.25x/transformOrigin/Glitch+Letterbox-Budgets/Face-Safe-Zone (38/39)/Cognitive-Load/Remotion-Pflichten G1-G3.

### 16b) 4B Creative QC

**Output:** `phase-5/4B-creative-qc.json`

- **22 Checks:** 15 Pass / 4 Fail / 3 Warn
- **Verdict:** `CREATIVE_QC_PASS_WITH_DOCUMENTED_DRIFT` — Phase 6 GREEN
- **Alle 5 Open Loops geschlossen:**
  - L1 Meta-Story "5h Nachtschicht wofür?" @ 98.1%
  - L2 Null-Cent-Paradox @ 43.8%
  - L3 Handelspartner-Stopp @ 72.2% (perfect 70-80% target)
  - L4 Kobalt-Wort (nested cliffhanger) @ 25.6%
  - L5 China-Muster @ 62.2%
- **Emotional Arc:** `man-in-a-hole` ✓, Fall 20% / Hole 50% / Rise 30%, 6 Peaks / 3 Valleys
- **2 dokumentierte Drifts (akzeptiert):**
  - `E2.2 Peak-Valley-Gap 99s` (9s über 90s) — kompensiert durch Rising-Bridge seg_012
  - `E2.5 CTA-Timing 87.6%` (außerhalb 55-75%) — kompensiert durch Early Soft-CTA ovl-006 @ 6.2%
- **Improvement-Suggestions:**
  - SUG4 (medium) — CTA-Drift-Retention-Monitoring nach Upload
  - SUG2 (low) — **B-Roll-Ratio nur 10.9%** (Target 35-50%) — Schweiz B-Roll von 7s → 10-12s
  - SUG1/SUG3/SUG5 (low) — 3. Atempause optional, km-07/km-08 Redundanz, seg_007→seg_008 Dual-Peak

### 16c) 4C Brand-Consistency QC

**Output:** `phase-5/4C-brand-qc.json`

- **27 Checks:** 23 Pass / 0 Fail / 4 Warn / 1 Info
- **Brand-Compliance BESTÄTIGT:** 0 Teal-Orange / 0 Cyan / 0 Magenta / 0 Neon
- **Hex-Audit Statistik:** 216 hex occurrences, 22 unique, alle LOCOS-compliant
  - `#E30613` 42x (LOCOS red)
  - `#D4A017` 33x, `#F5D37A` 65x, `#A68B2C` 2x, `#C8A84C` 1x (Gold family)
  - `#161514` 22x (warm black)
  - `#FFF5E0` 30x (warm white)
  - `#00C62E` 4x (B3.4 semantic green, TrustCheckmark only)
- **1 WARN Hex:** `#FF4444` als `palette.red_negative` declared aber NIRGENDWO applied (Documentation-Typo-Only)
- **Font-Audit:** Inter 57x, Montserrat 10x, Orbitron 3x, Playfair Display 3x, DM Sans 1x — alle allowlist. 0 Arial/Calibri/Comic Sans
- **Voice-Audit:** 33x ihr/euch, 0 Sie, **2 du-drifts in Akt 6 Schweiz-CTA** (Captions brauchen Fix: "wenn du einen Teil" → "wenn ihr einen Teil"), 0 Emojis, keine Mandanten-Opener, klare Position in title-cards, keine Sales-Pitches
- **4 Non-Blocking Warnings (5-min Fix-Kosten):**
  - W1 Captions 2x du→ihr in Akt 6
  - W2 Lower-Thirds subtitle weight 500→600
  - W3 Kinetic "·" bullet weight 400→700
  - W4 `red_negative: #FF4444` palette-declaration cleanup

### 16d) Phase-5-Status Zusammengefasst

- **TOTAL: 74 Checks / 56 Pass / 4 Fail / 14 Warn / 1 Info**
- **Phase-6 GREEN über alle 3 QC-Agents** — kein Re-Routing zu Phase 2 oder 3
- **Alle 4 Failures in 4B sind documented drifts** die bewusst vom Master-Plan akzeptiert wurden (CTA-Drift, Peak-Gap)
- **Brand-Compliance vollständig bestätigt** — die LOCOS-Override-Korrektur (siehe Sektion 6) hat gewirkt

---

## 17. Phase 6 — Skeleton Full-Build in Remotion Studio

**Kontext:** Nach Phase 5 GREEN hat der User gefordert: "ich muss das im gesamten video sehen in remotion studio lol" — er wollte den full video state in Remotion Studio, nicht nur isolierte Component-Renders.

### 17a) Master-Composition Scaffolding

**Schritt 1 — Setup:**
- Symlink `Sequenz 01_33.mp4` (1.7 GB video) → `~/ds-motion-graphics/public/bmf/daniel-master.mp4` (saves 1.7 GB vs copy)
- Copy `KobaltFullscreen.tsx` + `HandelsblattFAZNewsCard.tsx` von `remotion-coder-test/src/` → `ds-motion-graphics/src/compositions/daniel-bmf-industriemetalle/`
- `captions.ts` war schon da (Phase 0 Output)

**Schritt 2 — Minimal Master-Composition:**
`BmfIndustriemetalleVideo.tsx` initial built als 78-Zeilen Skeleton:
- Layer 1: OffthreadVideo (22800f full)
- Layer 2: KobaltFullscreen Sequence @ 5838-7278
- Layer 3: HandelsblattFAZNewsCard Sequence @ 19350-19980

**Schritt 3 — Registered in `src/Root.tsx`:**
```tsx
<Composition
  id="BMF-Industriemetalle"
  component={BmfIndustriemetalleVideo}
  durationInFrames={22800}
  fps={30}
  width={1920}
  height={1080}
/>
```

### 17b) Studio-Startup-Saga

1. **Erster Start via `cd ~/ds-motion-graphics && npm start` in background task** — lief, Server ready on `localhost:3003`, Bundle in 3.6s, dann **SIGTERM (exit 143)** vom Harness nach ~60-90s (background-task timeout).
2. **Zweiter Start via `nohup npx remotion studio --port=3006`** — detached via nohup + disown, überlebt Sessions. HTTP 200 auf `localhost:3006`.
3. **Wichtiges Learning:** `nohup ... & disown` ist der korrekte Weg Remotion Studio detached zu starten, nicht plain `npm start` in background.

### 17c) Phase-6 Full-Build-Agent (großer Subagent)

**Spawn:** 1 großer Task-Agent mit umfassendem Briefing — soll ALLES was Phase 4 spezifiziert hat in die Master-Composition wired haben. Runtime ~20 min.

**Agent-Output:**
- **27 neue Files** in `src/compositions/daniel-bmf-industriemetalle/`:
  - Theme: `bmf-theme.ts` (LOCOS-Palette Single-Source)
  - Color-Layer: `LocosColorGrade.tsx` (11 Segments cross-faded)
  - Captions-Layer: `BmfCaptions.tsx` + `captions-data.ts` (176 segments)
  - Utility: `ChapterCard`, `KineticMoment`, `BRollPlaceholder`, `CTALowerThird`, `HardCTALowerThird`
  - 22 Overlay-Components: NullEuroBilanzFullscreen, SchweizLocationCard, BMFDocumentCard, BMF2004DocumentCard, ChinaBekanntmachungDocumentCard, HighlighterDocumentExcerpt, DonnerstagNewsCard, EUKrisendialogNewsCard, DanielLowerThirdStatCard, CoreMessageStatCard, ListicleCounterStatCard, PercentDownStatCard, TrustCheckmarkStatCard, ElementChipRow, EUCriticalIconRow, OhneTriptychon, ZollfreilagerFlowSplit, TwoDateTimelineSplit, HorizontalChronologyTimeline, AuthorityTimeline

- **`BmfIndustriemetalleVideo.tsx` 78 → 603 Zeilen**, komplettes Layer-Stack:
  1. Daniel Master Footage (OffthreadVideo 22800f + Audio)
  2. B-Roll Placeholders (11 slots, dark card + gold border + topic label)
  3. LOCOS Color Grade Layer (11 segments cross-faded)
  4. 39 MoGraph Overlays wired with correct frame ranges
  5. 3 Lower-Thirds
  6. 7 Chapter Title-Cards
  7. 10 KineticType Moments
  8. 2 Letterboxes (Pattern-Interrupts)
  9. Burned-in Captions (176 segments)

- **TypeScript:** 0 Errors in `daniel-bmf-industriemetalle/`
- **Total:** 34 explicit `<Sequence>` wrappers + 2 frameless layer-components

**Wichtiger Build-Finding:**
Die bestehende Library-Component `KineticType.tsx` in `ds-motion-graphics/src/components/` hatte nicht alle von 4B spezifizierten Reveal-Types (`mask-wipe-strikethrough`, `highlighter-wipe`, `glitch-reveal`, `slow-fade-in`). Plus die `side: left|right` API passte nicht zum center-stacked Word-Spec. **Agent hat `KineticMoment.tsx` als purpose-built Wrapper gebaut** der alle 5 Reveal-Types handhabt + RGB-split Glitch-Overlay. **Das ist ein Knowledge-TODO:** Library-KineticType sollte erweitert werden.

**Build-Report:** `/Users/dario/ds-motion-graphics/pipeline-runs/daniel-bmf-industriemetalle/phase-6/build-report.md` (10.5 KB)

---

## 18. Post-Build Iteration (User-Screenshots + Bug-Fixes)

Nachdem der Skeleton-Build fertig war und der User in Remotion Studio scrollte, kam eine Iterations-Phase mit konkreten Bug-Reports via Screenshots. Jeder Bug → gezielter Fix → Retest.

### 18a) Bug-Fix 1: Studio-Port-Verwirrung

**Symptom:** User öffnete `localhost:3005` und sah andere Compositions — nicht BMF-Industriemetalle.
**Root-Cause:** `localhost:3005` war von einer ANDEREN Session (`remotion-coder-test`, PID 24837) belegt. Mein `nohup ... & disown` hatte das ds-motion-graphics Studio auf port 3002 gestartet und das wurde dann vom System gekillt als der andere Studio seinen Port nahm.
**Fix:** Neustart explizit auf port `3006`:
```bash
cd ~/ds-motion-graphics && nohup npx remotion studio --port=3006 > /tmp/ds-mg-studio.log 2>&1 & disown
```
**Result:** HTTP 200 auf `localhost:3006`, überlebt Sessions.

### 18b) Bug-Fix 2: Durchgehende Captions raus

**User-Request:** "die durchgehenden subtitels fliegen erstmal raus"
**Fix:** `BmfCaptions` Import + Usage in BmfIndustriemetalleVideo.tsx auskommentiert (nicht gelöscht — leicht wieder aktivierbar).

### 18c) Bug-Fix 3: Chapter-Card-Kollisionen + KineticMoment Face-Safe-Zone

**User-Report:** "da überlegern sich sooo viele overlays und richtig viele sind 'verschoben'"

**Timing-Audit-Ergebnis:** 5 Kollisions-Bugs identifiziert:
1. `ovl-016` EUCriticalIconRow (6909-7278) läuft WÄHREND KobaltFullscreen (5838-7278) — Icon-Row über dem Centerpiece
2. Chapter 03 (7287-7467) + km-05 (7287-7575) simultaneous
3. Chapter 04 (8670-8850) + km-07 (8670-8895) simultaneous
4. Chapter 05 (11100-11280) + NullEuroBilanzFullscreen (10872-11205) + TwoDateTimelineSplit (11259-11535) simultaneous
5. Chapter 07 (22587-22797) + km-10 DANKE DEUTSCHLAND (22587-22797) simultaneous

**Zusätzlich Face-Safe-Zone Violation:**
`KineticMoment.tsx` `position="top" → paddingTop: 80`. Bei Face-Safe-Zone y=80-560 bedeutet das Text startet GENAU an der Face-Zone-Oberkante. Bei 108px Hero-Text + weiteren Zeilen landet der Text von y=80 bis y~360 = **mitten in Daniels Gesicht**.

**Fixes:**
1. **Alle 7 Chapter-Cards disabled** — `LAYER 6` Map auskommentiert
2. **ovl-016 EUCriticalIconRow disabled** — auskommentiert
3. **KineticMoment "top" paddingTop: 80 → 15** (banner-only top zone)
4. **Alle 7 km mit position "top" → "bottom"** umgestellt (km-01, km-03, km-04, km-05, km-07, km-08, km-09) — rendern jetzt unter Daniels Schultern y=720+

### 18d) Bug-Fix 4: "0 CENT" Fullscreen-Overflow

**User-Screenshot:** "0 CENT" links aus dem Frame rausgeschnitten, nur "D CENT" sichtbar.
**Root-Cause:** `fontSize: 560` bei Orbitron 900 → "0 CENT" ca. 2040px breit, overflowt 1920 Canvas-Breite.
**Fix:** `fontSize: 560 → 380` im `FullscreenTakeover` props für ovl-005. Passt jetzt sicher zentriert in 1920.

### 18e) Bug-Fix 5: HandelsblattFAZNewsCard rote X-Stempel fehlen

**User-Screenshot:** 4 Press-Cards rendern, aber die roten X-Marks sind missing (nur Placeholder-Icons oben links in den Cards sichtbar).
**Root-Cause:** Component nutzt `staticFile("rotes-x.png")`. In `remotion-coder-test/public/rotes-x.png` lag es direkt im public-root, in `ds-motion-graphics/public/assets/logos/rotes-x.png` in einem Unterverzeichnis. Beim Copy der Component wurde der Pfad nicht angepasst.
**Fix:** `staticFile("rotes-x.png") → staticFile("assets/logos/rotes-x.png")`. Die roten Stempel rendern jetzt mit Stamp-Animation + gestaffeltem Entry (32, 38, 44, 50f).

### 18f) Bug-Fix 6: PriceExplosionBars fehlt

**User-Screenshot + Feedback:** "das ding ist oben rechts dieses diagramm ausm bild" — bei Frame 12389 (ca. 6:56) sollte das PREIS-EXPLOSION Diagramm rechts-oben sein, ist aber missing.
**Root-Cause:** `ChartBuild.tsx` Library-Component ist eine **Line-Chart** (SVG polyline). Bei nur 2 Datenpunkten (GALLIUM 365, GERMANIUM 400) zeichnet sie eine einzige flache Linie — visuell no-op. Plus: ANTIMON +437% aus dem Skript war nicht als Datenpunkt drin.
**Fix:** Komplett ersetzt durch **neue inline Component `PriceExplosionBars.tsx`** (180 Zeilen):
- 3 horizontale Balken (GALLIUM 365%, GERMANIUM 400%, ANTIMON 437%)
- Right-split Position: `left:1180, top:180, width:680, height:720`
- LOCOS Brand-Styling: warm-schwarz BG, Gold-Border, Gold→Rot Gradient Bars, Orbitron 900 Hero-Zahlen
- Stagger-Animation: Panel Spring-Entry → Title Fade → 3 Bars staffeln (12f Versatz) → Number Count-Up parallel
- Element-Symbol-Chips (Ga/Ge/Sb) als Authority-Anker
- Footer: "SEIT CHINA-EXPORTKONTROLLEN · 2024-2026"

### 18g) Feature-Fix 7: Zoom-Cuts fehlen komplett

**User-Feedback:** "es sind 0 zoom cuts etc drauf"
**Root-Cause:** Die 19 Zoom-Keyframes aus `phase-4/edit/zoom-keyframes.json` waren NICHT in die Master-Composition wired. Das OffthreadVideo spielte als continuous clip ohne visuelle Variation.
**Fix:** Neue Component **`DanielZoomLayer.tsx`** (160 Zeilen):
- Flattened alle 19 Zoom-Segmente in eine ZoomSeg[]-Liste (fs/fe/start-scale/end-scale/origin/easing)
- `findSegment(frame)` lookup + `interpolate()` für smooth scale-changes innerhalb jedes Segments
- Transform-Origin cross-fade zwischen aneinandergrenzenden Segmenten (vermeidet harte Origin-Jumps)
- Subtle breathing micro-drift (±0.5% sin-wave, 4s Periode) auf ALLEN Frames — Video ist nie komplett statisch
- Wrapped `OffthreadVideo` inside `<div style={{transform: scale(X), transformOrigin: Y}}>`

**Zoom-Moves die jetzt laufen:**
| Time | Scale | Origin | Type |
|---|---|---|---|
| 0-2s | 1.0→1.12 | 50/45 | Push-in Hook |
| 2-38.6s | 1.12 hold | 50/43 | Hook-sustain |
| 38.6s-2:05 | 1.05 hold | 50/45 | Context |
| 2:29 | 1.15→1.18 | 50/42 | Snap-zoom (8f) |
| **3:14** | **1.18→1.25** | **50/40** | **🔥 Crash-zoom pre-Kobalt (6f, Easing.exp-out)** |
| 3:14-3:31 | 1.25 hold | 50/40 | Kobalt centerpiece |
| 3:31 | 1.25→1.10 | 50/38 | Pull-out post-Kobalt (20f) |
| 4:40 | 1.10→1.15 | 50/45 | Ken-Burns slow push (300f) |
| **6:02** | **1.15→1.22** | **50/40** | **🔥 Crash-zoom pre-NullEuro (8f)** |
| 6:02-6:13 | 1.22 hold | 50/40 | NullEuro centerpiece |
| 6:13 | 1.22→1.08 | 50/38 | Pull-out post-NullEuro (20f) |
| 8:00 | 1.08→1.14 | 50/45 | Ken-Burns push (500f) |
| 8:30-9:10 | 1.05→1.08 | 50/45 | Warm push Schweiz setup |
| 9:29 | 1.0→1.08 | 55/55 | Ken-Burns on-asset (Schweiz Alpen) |
| 12:20-12:40 | 1.05→1.10 | 50/45 | Slow-push DANKE DEUTSCHLAND |

**Warum keine harten "Video-Cuts":** Bei einer Single-Camera-Aufnahme ergibt Audio-Video-Schnitt keinen Sinn — das wären Jump-Cuts auf derselben Einstellung (billig). Die visuelle Variation kommt durch **Zoom-Changes + Overlays + Pattern-Interrupts**. Die 71 Cut-Points aus `phase-4/edit/cut-points.json` sind für Premiere-Marker (FCP7-XML) gedacht falls du später B-Roll einschneidest.

---

## 19. Current State & Files

### 19a) Remotion Studio

**Laufend:** `http://localhost:3006` (detached via `nohup`, PID wird im Terminal angezeigt)
**Composition-ID:** `BMF-Industriemetalle`
**Duration:** 22800 frames / 760s / 12:40 @ 30fps / 1920x1080

### 19b) File-Struktur ds-motion-graphics/src/compositions/daniel-bmf-industriemetalle/

29 files total (27 neue + 2 existierende KobaltFullscreen/HandelsblattFAZNewsCard + captions.ts):
```
AuthorityTimeline.tsx                    HardCTALowerThird.tsx
BMFDocumentCard.tsx                      HighlighterDocumentExcerpt.tsx
BMF2004DocumentCard.tsx                  HorizontalChronologyTimeline.tsx
BmfCaptions.tsx (disabled)               KineticMoment.tsx
BmfIndustriemetalleVideo.tsx (MASTER)    KobaltFullscreen.tsx
bmf-theme.ts                             ListicleCounterStatCard.tsx
BRollPlaceholder.tsx                     LocosColorGrade.tsx
captions-data.ts (176 segments)         NullEuroBilanzFullscreen.tsx
captions.ts (Whisper output)             OhneTriptychon.tsx
ChapterCard.tsx (disabled in master)    PercentDownStatCard.tsx
ChinaBekanntmachungDocumentCard.tsx      PriceExplosionBars.tsx ← NEU post-iter
CoreMessageStatCard.tsx                  SchweizLocationCard.tsx
CTALowerThird.tsx                        TrustCheckmarkStatCard.tsx
DanielLowerThirdStatCard.tsx             TwoDateTimelineSplit.tsx
DanielZoomLayer.tsx ← NEU post-iter      ZollfreilagerFlowSplit.tsx
DonnerstagNewsCard.tsx                   
ElementChipRow.tsx
EUCriticalIconRow.tsx (disabled in master)
EUKrisendialogNewsCard.tsx
HandelsblattFAZNewsCard.tsx
```

### 19c) Pipeline-Runs Verzeichnis komplett

```
~/ds-motion-graphics/pipeline-runs/daniel-bmf-industriemetalle/
├── SESSION-LOG.md (dieses File)
├── phase-1/
│   ├── 1A-emotional-beats.json (20 segments)
│   ├── 1B-overlay-candidates.json (38 + 1 new)
│   ├── 1C-sound-cues.json (72 total, 70 approved)
│   ├── 1D-pacing-plan.json (73 cuts, 17 PIs)
│   └── 1E-color-plan.json (9 segments)
├── phase-2/
│   └── master-timeline.json (23 segments, LOCOS shock-red override applied)
├── phase-4/
│   ├── sound/        (sfx-cue-sheet md+json, music-bed-plan, voice-chain, README)
│   ├── mograph/      (overlay-specs, new-components list, build-order, README)
│   ├── edit/         (cut-points json+csv, zoom-keyframes, PIs, b-roll-slots, premiere-markers xml, README)
│   ├── color/        (color-segments json+md, transition-keyframes, LUT-recs, 11 Lumetri presets, README)
│   └── text/         (captions.srt, captions-kinetic.json, lower-thirds, title-cards, kinetic-moments, README)
├── phase-5/
│   ├── 4A-technical-qc.json (18 pass / 0 fail / 7 warn)
│   ├── 4B-creative-qc.json (15 pass / 4 fail documented / 3 warn)
│   └── 4C-brand-qc.json (23 pass / 0 fail / 4 warn — brand confirmed)
└── phase-6/
    └── build-report.md (vom Full-Build-Agent)
```

### 19d) Disabled-Layers (für spätere Re-Enable)

| Layer | Why | Re-enable wie |
|---|---|---|
| `BmfCaptions` | User: "durchgehende subtitels fliegen raus" | Import + Usage in BmfIndustriemetalleVideo.tsx uncommenten |
| All 7 `ChapterCard`s | Timing-Kollisionen mit km-05/07, ovl-024/025, km-10 | Chapter-timings ändern sodass keine Overlays überlappen, dann Map uncommenten |
| `ovl-016 EUCriticalIconRow` | Läuft über KobaltFullscreen während dessen aktiv | Frame-range verschieben zu nach 7278 oder komplett droppen |

---

## 20. Costs & Time Summary (final)

| Stage | Tool | Cost | Time |
|---|---|---|---|
| Phase 0 (mlx-whisper) | mlx-whisper large-v3 | $0 | ~17 min (8 min model-download + 8.5 min transcribe) |
| Phase 1 (5 parallel agents) | Claude sub-agents | not metered separately | ~12 min parallel |
| Phase 2 (orchestrator) | Claude sub-agent | not metered separately | ~12 min |
| Phase 3 KobaltFullscreen | qwen-coder | $0.0094 | 25.7s |
| Phase 3 HandelsblattFAZNewsCard v1 | qwen-coder | $0.0195 | 64.6s |
| Phase 3 v2/v3 (real-life asset, smaller X) | local edits | $0 | ~6 min |
| Phase 4 (5 parallel executors) | Claude sub-agents | not metered separately | ~13 min parallel |
| Phase 5 (3 parallel QC agents) | Claude sub-agents | not metered separately | ~7 min parallel |
| Phase 6 Full-Build-Agent | Claude sub-agent | not metered separately | ~20 min |
| Post-iteration fixes (chapter disable, 0 CENT, rotes-x, PriceExplosionBars, DanielZoomLayer) | local edits | $0 | ~30 min |
| **Total route/qwen-coder spend** | | **$0.029** | |

## 21. Knowledge-Hub-Updates Final-Liste

Commits in `~/knowledge/` aus dieser Session (chronologisch):

1. `fbf2aa3` sync: propagate 26-claim count + BMF refs to index + skript-schreiber composite
2. `9b2bfbc` composite(skript-schreiber): add cf-script pipeline awareness
3. `8ed6617` plan(learning-loop-v1): architecture spec for Phase 2c
4. `4572457` plan(learning-loop-v1): lock 6 decisions from Dario sign-off
5. `d010a94` learning-loop(mvp): implement + validate stages 3+4 on EZB-Falle
6. `1ee3407` graph-hygiene: wire up 5 new atoms from ed0e4e7
7. `4a93379` graph-hygiene: commit untracked workflow + templates
8. `f6fbd77` brand-fix(locos): seed color-language atom + override Blueprint D1.3 **← KRITISCH**
9. `2f33c46` graph-link: cross-reference locos-color ↔ daniel-finance-3d-design
10. `c3b2b9f` session-log: BMF-Industriemetalle full pipeline build (phase 0-4 complete)

Post-Phase-4-Session-Log + ds-motion-graphics commits kommen noch (diese Session).

---

## 22. 8 Wichtige Learnings für zukünftige Pipeline-Runs

1. **Knowledge-Lift ist Pflicht-Stufe.** Research-Docs sind nicht automatisch aktiv. Atoms → Composites → Skills als Wikilinks = Pflicht damit Pipeline-Agents brand-aware werden. Die Teal-Orange-Episode war ein direkter Knowledge-Gap zwischen "gibt es im research-doc" und "ist im atom-layer sichtbar".

2. **Brand-Defaults schlagen Generic-Defaults.** Blueprint D1-D3 sind generische Cinematic-Techniken. Brand-Atoms sind Overrides. Pipeline-Agents müssen bei Konflikt die Brand-Atoms gewinnen lassen.

3. **mlx-whisper > openai-whisper** auf Apple Silicon. ~10x schneller. Always MLX wenn verfügbar.

4. **Iteriere die Spec, nicht das Modell.** qwen-coder mit guter Spec liefert Production-Ready-Code zu $0.01-0.02. Modellwechsel zu Gemini würde nichts verbessern.

5. **Real-Life Assets > Generated SVG** für emotionale Akzente. Das `rotes-x.png` Asset hat den HandelsblattFAZNewsCard von "designed" zu "visceral" gehoben.

6. **Stagger ist Brand-Signature.** 4 X-Marks gestaffelt (4× 6-Frame-Intervall) wirken viel stärker als alle gleichzeitig.

7. **Master-Plan löst Konflikte explizit dokumentiert.** Wenn etwas später nicht stimmt, kann man nachvollziehen warum die Entscheidung so getroffen wurde.

8. **"Daniel hat improvisiert" ernstnehmen.** Skript-Plan ist Hypothese. Real-Aufnahme ist Wahrheit. Edit folgt der realen Aufnahme, nicht dem geplanten Skript.

**NEU aus Post-Iter-Phase:**

9. **Timing-Kollisionen zwischen Layer-Gruppen explizit prüfen.** Der Build-Agent hat nicht selbst gemerkt dass Chapter-Cards mit KineticMoments in overlap laufen. Cross-Layer-Conflict-Check muss ein Phase-6-QC-Step werden.

10. **Font-Size-Math vor Render.** 560px Orbitron 900 ist zu breit für "0 CENT" bei 1920. Solche Layout-Mathes sollten in einer Component-Build-Time-Validation checken.

11. **Asset-Paths beim Component-Copy matchen.** `staticFile("rotes-x.png")` funktioniert nur wenn das Asset im gleichen public/-Pfad liegt. Beim Copy zwischen Projekten muss der staticFile-Call angepasst werden.

12. **Library-Components-API-Check vor Build.** ChartBuild war eine Line-Chart obwohl der Spec eine Bar-Chart wollte. Der Agent hätte die Component-Datei lesen sollen bevor er sie einwiret.

13. **Transform-Origin bei Zoom NIE 50/50.** Immer 38-45% Y weil das Daniels Face-Level ist. 50/50 wäre Bauch-Level — sieht billig aus.

14. **nohup + disown** für detached long-running Prozesse (Remotion Studio). Plain `&` wird vom Harness gekillt.

---

## 23. TODO für die nächste Session

### Kritisch (vor Render)
- [ ] **6 LOCOS-Custom-LUTs bauen** aus den Lumetri-Presets (LOCOS_Premium_Base, _CoolDesaturate, _ValleyDeep, _Shock_RedAccent, _Gold_Payoff, _Rec709_Neutral)
- [ ] **SFX-Audio-Files** in `public/sfx/daniel-bmf/` legen ODER interim mapping zu existing `public/sfx/epidemic/` files aktivieren
- [ ] **B-Roll-Sourcing** (4 MUST: Kobalt, Schweiz Alpen, Chipfabrik, BMF Berlin) → echte Footage in `public/bmf/b-roll/` legen
- [ ] **`schweiz-alpen.jpg`** für SchweizLocationCard (aktuell gradient fallback)

### Wichtig (Brand-Consistency-Fixes aus 4C QC)
- [ ] Akt 6 Captions: 2x `du→ihr` Fix in captions-data.ts
- [ ] Lower-Thirds subtitle weight 500→600
- [ ] Kinetic "·" bullet weight 400→700
- [ ] `red_negative: #FF4444` aus Palette-Declaration entfernen (Typo cleanup)

### Nice-to-have (Phase 6 Polish)
- [ ] Chapter-Cards neu positionieren sodass keine Overlay-Kollisionen + re-enable
- [ ] ovl-016 EUCriticalIconRow frame-range shifted (oder droppen)
- [ ] Captions wieder aktivieren mit Timing-Fix für Akt-6
- [ ] ovl-003 KineticText "EIN FEDERSTRICH" Face-Safe-Zone prüfen (aktuell mit km-01 als "bottom" position gelöst?)
- [ ] KineticType Library-Component erweitern um 5 Reveal-Types + center-stacked API
- [ ] Frechdachs-Brand-Atom seeden für Brand-Trennung
- [ ] Skinne `ChartBuild` Library-Component zu Bar-Chart-Variant oder dedicated `BarChart.tsx` bauen

### Extern (Hand-Jobs für Dario)
- [ ] Mandanten-Vermögens-Range mit Daniel verifizieren (200-300k€+ ist Hypothese)
- [ ] Render-Preview-Still (Kobalt + Null-Cent Frames) als Validation für `shock-look-locos-red-accent` confidence upgrade tentative → validated
- [ ] Final-Render in Premiere inkl. B-Roll-Assembly + echtem SFX-Mix
- [ ] YouTube Upload + Description + Tags + Thumbnail
- [ ] Learning-Loop MVP auf dieses Video anwenden nach Daniel-Live-Upload (EZB-Falle reproduziert 27% 5-gram, BMF sollte ähnlich laufen)

---

**Letzte Update:** 2026-04-14 post-Phase-6-Iteration (Zoom-Layer + Bug-Fixes live in Studio)
