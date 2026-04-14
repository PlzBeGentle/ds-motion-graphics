---
title: BMF-Industriemetalle — Continuation Plan für neue Session
created: 2026-04-14
status: handoff-ready
estimated_remaining_work: 7-10h + ~$11-16 AI-Costs
---

# Continuation Plan — Daniel BMF-Industriemetalle Video

> **ZWECK:** Dieses File ist ein self-contained Handoff für eine neue Claude-Code-Session. Die vorherige Session (2026-04-14) hat die komplette Pipeline 0-6 durchgespielt + einen Skeleton-Build in Remotion Studio live. Diese Session ist massiv aufgebläht (Agent-Reports, Iterations-Log, Brand-Fixes, Komponenten-Builds). Die nächste Session liest dieses File **einmal am Anfang** + springt direkt in die offenen Tasks.

---

## 🎬 Wo wir stehen (1-Satz)

**Komplettes 22800-frame Remotion-Skeleton läuft in `localhost:3006`, 27 Components gebaut, Phase 5 QC PASS, aber 22 Components sind unreviewed, SFX ist 0, B-Roll sind 11 Placeholder-Cards, LOCOS-Brand verified aber Layout-Bugs lauern noch.**

---

## 📚 Pflicht-Lesung am Session-Start (in dieser Reihenfolge)

1. **Dieses File** (du liest es gerade)
2. **Master Session-Log:** `~/ds-motion-graphics/pipeline-runs/daniel-bmf-industriemetalle/SESSION-LOG.md` (~1400 Zeilen, Sektionen 0-23). Das ist die volle Provenance. Du MUSST nicht alles lesen — nur Section 17-20 (Phase 6 + Post-Iter + Current State).
3. **Knowledge-Hub Session Pointer:** `~/knowledge/log/sessions/2026-04-14-bmf-pipeline-build.md` (Executive Summary)
4. **Video-Editor Skill:** `~/.claude/skills/video-editor/SKILL.md` (552 Zeilen, lädt die Brand-Atoms)
5. **B-Roll Classification:** `~/ds-motion-graphics/pipeline-runs/daniel-bmf-industriemetalle/phase-4/edit/b-roll-classification.md` (11 Slots Foto vs Video vs Motion-Graphics)

**Gesamt ~30 min Kontext-Load.** Danach bist du ready to ship.

---

## 🏁 Current State Snapshot

### Was LIVE ist in Remotion Studio (`localhost:3006`, composition `BMF-Industriemetalle`)

- **Master Footage:** `public/bmf/daniel-master.mp4` symlink zu `~/Downloads/Sequenz 01_33.mp4` (1.7 GB, 22800 frames @ 30fps, Audio included)
- **Zoom-Layer:** `DanielZoomLayer.tsx` mit 19 Keyframes (push-in, crash-zoom pre-Kobalt 1.18→1.25, pull-out, ken-burns, slow-push) + ±0.5% breathing micro-drift
- **Color-Grade:** `LocosColorGrade.tsx` mit 11 Segmenten (LOCOS Premium Base + selektiver Rot-Akzent auf col_004 Kobalt + col_006 Null-Cent, **KEIN Teal-Orange** — brand-verified)
- **39 Overlays** wired:
  - 2 fertig: `KobaltFullscreen`, `HandelsblattFAZNewsCard` (v3 mit rotes-x.png Stamp-Animation)
  - 22 new (agent-built, skeleton quality, unreviewed)
  - 13 library mit Props-Override
- **10 KineticMoments** (alle bottom-positioned, 5 reveal types: mask-wipe, blur-reveal, tracking, stamp-slam, slow-fade + RGB glitch overlay)
- **3 Lower-Thirds** (DanielLowerThirdStatCard 5h Nachtschicht, CTALowerThird soft-CTA @ 0:47, HardCTALowerThird @ 11:06)
- **2 Letterboxes** (bei 2 Pattern-Interrupts)
- **11 BRoll-Placeholders** (dark cards + gold border + topic label, NO real footage)

### Was DISABLED ist (bewusst)

- `BmfCaptions` (durchgehende Subtitles — User: "fliegen erstmal raus")
- `ChapterCard` Layer-6 Map (Timing-Kollisionen mit km-05/07, ovl-024/025, km-10)
- `EUCriticalIconRow` ovl-016 (lief über KobaltFullscreen)

### Was FUNDAMENTAL FEHLT

| Item | Status | Wo spec'd |
|---|---|---|
| **SFX Audio (70 cues)** | 0 files in `public/sfx/daniel-bmf/`, nur TODO-Kommentare im Master | `phase-4/sound/sfx-cue-sheet.json` |
| **B-Roll Footage (11 slots)** | 0 generierte Assets | `phase-4/edit/b-roll-slots.md` + `b-roll-classification.md` |
| **Schweiz-Alpen JPG** | Placeholder (gradient) | `SchweizLocationCard.tsx` braucht `public/bmf/schweiz-alpen.jpg` |
| **22 Components Review** | Unreviewed nach Skeleton-Build | Bekannte Problemkandidaten in Section "Known Bugs" unten |

### Git-State am Session-Ende

| Repo | Commit | Files |
|---|---|---|
| `~/ds-motion-graphics/` | `498b9ad` | 86 files, 35135 insertions (alles `src/compositions/daniel-bmf-industriemetalle/` + `pipeline-runs/daniel-bmf-industriemetalle/` + symlink) |
| `~/knowledge/` | `f231b49` + `716c1b7` | BMF content-factory + retro-atom + session-log update |

**⚠ NICHT committed:** `src/Root.tsx` hat pre-existing uncommitted changes aus anderen Sessions. Die BMF-Composition-Registration (2 Import-Zeilen + 1 `<Composition id="BMF-Industriemetalle">` Block) lebt darin. Muss am Session-Anfang **geprüft** werden — wenn Studio startet und die Composition findet, ist es noch da. Wenn nicht → aus `git stash` oder Root.tsx-Backup restaurieren.

---

## 🐛 Known Bugs (für Phase F Component Review)

Diese sind **vermutet** basierend auf dem Build-Pattern des Agents, nicht alle sind verifiziert:

1. **ovl-003 "EIN FEDERSTRICH"** — KineticText y=40-200 überlappt rechnerisch Face-Safe-Zone (y=80-560). Von 4A QC geflagt. **Nicht gefixt.**
2. **HardCTALowerThird ovl-036** — 23.9s Standzeit, Arrow-Bounce könnte über die Zeit tedious werden. Review ob er nicht mit Daniels Schultern @ y=820 kollidiert.
3. **SchweizLocationCard ovl-034** — Parallax-Depth Reveal nutzt aktuell gradient placeholder weil `schweiz-alpen.jpg` fehlt.
4. **BMFDocumentCard + Varianten** (ovl-002, 009, 018, 026) — rechts-split 620x820, Default x=1220 y=120. Wenn Daniel nach rechts gestikuliert könnte die Karte überlappen. Visual check nötig.
5. **OhneTriptychon ovl-004** — 3 Cards nebeneinander x=80 y=700 width 1760. Prüfen ob nicht unter Daniel-Schultern abgeschnitten wird.
6. **ZollfreilagerFlowSplit ovl-008** — left-split 60x200 width 680 height 640. Visual check.
7. **TwoDateTimelineSplit ovl-025** — right-split 1180x260. Visual check.
8. **Captions du-drift in Akt 6** — 2x "du" statt "ihr" bei Schweiz-CTA. In `captions-data.ts` fixen wenn Captions wieder aktiviert werden.
9. **Font-Weight-Warnings aus 4C QC** — Lower-Third subtitle 500→600, Kinetic "·" bullet 400→700, palette `red_negative: #FF4444` cleanup.

---

## 🎯 Die 7 offenen Phasen (in Reihenfolge)

### Phase A — Sound-Design-Layer (30 min, 0 Cost)

**Ziel:** 70 `<Audio>` Cues + 6 Music-Beds als `BmfSoundDesign.tsx` Component, analog zu `AmlaVideo.tsx` / `SpritpreisVideo.tsx` Pattern.

**Steps:**
1. Read `phase-4/sound/sfx-cue-sheet.json` — 70 approved cues mit Frame, Type, Volume, Duration
2. Read `phase-4/sound/music-bed-plan.json` — 6 beds mit Moll→Dur shift bei 8:20
3. Check existing: `src/components/EpidemicSoundLibrary.ts` + `longformSfxPreset()` helper → welche SFX-Files sind schon in `public/sfx/epidemic/`?
4. Build `BmfSoundDesign.tsx`:
   - Loop über SFX cues → `<Sequence from={X}><Audio src={staticFile(...)} volume={Y} /></Sequence>`
   - Music-Bed als durchgehender `<Audio>` Layer pro Segment mit `volume={interpolate(frame, [fade-in, fade-out], [...])}`
   - Ducking via separater `<Audio>` oder volume-interpolation zu Silence-Frames
   - Missing SFX → TODO-Kommentar + Volume 0 placeholder
5. Import in `BmfIndustriemetalleVideo.tsx` als **LAYER 0** (vor OffthreadVideo im Audio-Stack)
6. TypeScript check + Studio-Refresh

**Success-Kriterium:** Beim Scrub hörst du Music-Bed + Impacts + Silence-vor-Booms. Missing SFX sind stumm aber Composition läuft.

---

### Phase B — B-Roll Orchestration (45 min build + 2-3h generate, $11-16)

**Ziel:** 11 BRoll-Placeholder → echte Components mit echten Assets.

**Steps:**
1. Read `phase-4/edit/b-roll-classification.md` — hat komplette Slot-by-Slot Matrix
2. User-Entscheidungen klären (falls noch nicht):
   - Slot 4 Telefon: self-shot oder Veo?
   - Slot 5 Kobalt: DRC-Mine oder EV-Batterie?
   - Slot 8 Chipfabrik: TSMC/Intel/ASML?
3. **Motion-Graphics Slot 11 zuerst** (0 Cost, schnell): inline SVG Icons mit Stagger-Reveal
4. **7 FLUX Stills** generieren:
   - Script: `scripts/bmf-broll-gen.sh` — bash wrapper der `generate-image` oder `route --model fal-flux-pro` sequentiell für 7 Slots ruft
   - Prompts aus `b-roll-classification.md` extrahieren
   - Output: `public/bmf/b-roll/slot-{01,02,03,06,07,09,10-alpen,10-vault}.jpg`
   - Iteration: bei schlechtem Output neuen Prompt, FLUX kostet nur $0.05/Bild
5. **3 Veo Videos** generieren (nach User-Approval):
   - Via `ae-premium-editing` Skill MCP-Tools oder direkt fal.ai API
   - Slot 4/5/8, 7s each
   - Output: `public/bmf/b-roll/slot-{04,05,08}.mp4`
6. **Refactor BRollPlaceholder → 11 echte Components:**
   - Foto-KenBurns Slots: `BmfBRoll01BMFBerlin.tsx` etc. mit `<KenBurns src={staticFile("bmf/b-roll/slot-01-bmf-berlin.jpg")}>`
   - Video-Gen Slots: `BmfBRoll05Kobalt.tsx` etc. mit `<OffthreadVideo src={staticFile("bmf/b-roll/slot-05-kobalt.mp4")} muted>`
   - Slot 11: inline Motion-Graphics
7. Master-Composition updaten: `BROLL_SLOTS.map()` → explicit Components pro Slot

**Success-Kriterium:** 11 BRoll-Slots haben echte visuelle Assets, Scrub zeigt Alpen bei 9:55, Kobalt-Mine bei 3:45, Chipfabrik bei 7:35 etc.

---

### Phase C — Schweiz-Alpen Asset für SchweizLocationCard (10 min)

**Ziel:** `SchweizLocationCard.tsx` Parallax-Depth Reveal bekommt echtes BG-Foto.

Ein zusätzlicher FLUX Call (Teil von Phase B Slot 10), gleicher Prompt aber 1920x1080 high-quality. Drop in `public/bmf/schweiz-alpen.jpg`, Component liest das bereits.

---

### Phase D — ovl-003 Face-Safe-Zone Fix (5 min)

Read ovl-003 rendering code in `BmfIndustriemetalleVideo.tsx` (KineticMoment km-01 oder separate). Wenn y=40-200 → auf bottom umstellen oder auf y=15-65 (banner single-line) begrenzen. Re-render still bei Frame ~960 und prüfen ob Daniels Gesicht frei ist.

---

### Phase E — 4C Brand-Warnings Fixes (10 min)

3 kleine font-weight Fixes aus `phase-5/4C-brand-qc.json`:
- `CTALowerThird.tsx` + `HardCTALowerThird.tsx` + `DanielLowerThirdStatCard.tsx`: subtitle weight 500 → 600
- `KineticMoment.tsx` (km-01 oder km-07): "·" bullet weight 400 → 700
- `bmf-theme.ts` oder `mograph-overlay-specs.json`: `red_negative: #FF4444` aus palette-declaration entfernen (nie applied, doc-typo)

---

### Phase F — 22 Components Frame-by-Frame Review (3-5h mit Dario)

**Dies ist der Bulk der verbleibenden Arbeit.** Muss gemeinsam mit User geschehen weil visuelle Beurteilung.

**Workflow pro Component:**
1. Ich öffne die Component-Datei + die Frame-Range
2. Dario rendert Still via `npx remotion still src/index.ts BMF-Industriemetalle stills/check-frame-XXXX.png --frame=XXXX --gl=angle`
3. Dario schaut + sagt was falsch ist (Position, Size, Overflow, Collision, Font, Color)
4. Ich fixe die Component (Koordinaten, Font-Sizes, Layouts)
5. Re-render, re-check
6. Nächste Component

**Batch-Reihenfolge** (wichtigste zuerst):
1. ovl-003 "EIN FEDERSTRICH" (known Face-Safe-Zone issue)
2. KobaltFullscreen @ 5838 — ist schon reviewed, sanity-check dass Zoom-Layer kompatibel ist
3. NullEuroBilanzFullscreen ovl-024 @ 10872 (3rd Fullscreen, Screen-Shake Mechanik)
4. HardCTALowerThird ovl-036 @ 19980 (23.9s Standzeit — Arrow-Bounce review)
5. SchweizLocationCard ovl-034 @ 17079 (nach Phase C mit echtem Asset)
6. 4 BMFDocumentCard Varianten (ovl-002, 009, 018, 026) — alle basieren auf derselben Base, ein Fix fixt meistens alle 4
7. ElementChipRow ovl-007, EUCriticalIconRow ovl-016 (currently disabled — prüfen ob re-enable möglich)
8. Die restlichen 13 Components die vermutlich ok aber unreviewed sind

---

### Phase G — Chapter-Card Timing Rework (optional, 1h)

Aktuell alle 7 Chapter-Cards disabled wegen Kollisionen. Option:
- **A** — Chapter-Timings verschieben sodass sie in CLEAN Zones landen (zwischen Overlays), nicht auf Section-Boundaries
- **B** — Chapter-Cards permanent droppen und das Video ohne Section-Markers veröffentlichen (akzeptabel bei News-Reaktion, weniger bei Longform-Educational)

**Mein Vorschlag:** B — keep disabled. Section-Anchoring kommt aus den KineticType-Moments mit #1/#2/#3/#4 Counter-Stamps + Color-Grade-Shifts.

---

### Phase H — Final Render (20-40 min Render-Time)

```bash
cd ~/ds-motion-graphics
npx remotion render src/index.ts BMF-Industriemetalle \
  out/bmf-industriemetalle-final.mp4 \
  --codec=h264 \
  --crf=18 \
  --gl=angle \
  --concurrency=4
```

Output: `out/bmf-industriemetalle-final.mp4` — direkt YouTube-ready (H.264, 1080p60, -14 LUFS via BmfSoundDesign Voice-Chain).

---

## 💰 Estimated Total Remaining

| Phase | Time | Cost |
|---|---|---|
| A Sound | 30 min | $0 |
| B B-Roll Build + Generate | 3-4h | $11-16 |
| C Schweiz Asset | (in B) | (in B) |
| D ovl-003 Fix | 5 min | $0 |
| E Brand Warnings | 10 min | $0 |
| F Component Review | 3-5h | $0 |
| G Chapter Rework | 1h (optional) | $0 |
| H Render | 20-40 min | $0 |
| **TOTAL** | **~7-10h** | **~$11-16** |

---

## 🔧 Kritische Files um Remotion-Studio wieder hochzufahren

```bash
# Studio starten (detached, überlebt Sessions)
cd ~/ds-motion-graphics && nohup npx remotion studio --port=3006 > /tmp/ds-mg-studio.log 2>&1 & disown

# Status check
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3006/

# Composition in Browser öffnen
open http://localhost:3006

# Einzelnes Still rendern
npx remotion still src/index.ts BMF-Industriemetalle stills/check-f5838.png --frame=5838 --gl=angle

# Final Video rendern
npx remotion render src/index.ts BMF-Industriemetalle out/final.mp4 --codec=h264 --gl=angle --concurrency=4
```

**Root.tsx Issue:** Wenn Studio lädt aber keine `BMF-Industriemetalle` Composition zeigt, sind Root.tsx-Änderungen weg. Fix: manuell in `src/Root.tsx` wieder hinzufügen:
```tsx
import BmfIndustriemetalleVideo from "./compositions/daniel-bmf-industriemetalle/BmfIndustriemetalleVideo";
// ...
<Composition
  id="BMF-Industriemetalle"
  component={BmfIndustriemetalleVideo}
  durationInFrames={22800}
  fps={30}
  width={1920}
  height={1080}
/>
```

---

## 🧠 Wichtige Session-Learnings zum Merken

1. **LOCOS Brand ist NICHT Teal-Orange** — das ist Frechdachs/Hollywood. LOCOS = Gold (#A68B2C / #d4a017 / #f5d37a) + warmes Schwarz (#161514) + Rot AKZENT (#E30613, niemals als Flächenfarbe). Details: `~/knowledge/atoms/video/color/locos-brand-color-language.md`.
2. **Iteriere Spec, nicht Modell** — qwen-coder bei guter Spec ≈ gemini 3.1 pro bei 8x niedrigerem Preis.
3. **Real-Life Assets > Generated SVG** — rotes-x.png war ein game-changer für HandelsblattFAZNewsCard.
4. **Stagger ist Brand-Signature** — 4 X-Marks gestaffelt (4× 6-Frame-Intervall) wirken viel stärker als simultan.
5. **mlx-whisper > openai-whisper** auf Apple Silicon (~10x schneller).
6. **Daniel improvisiert** — Skript-Plan ist Hypothese, reale Aufnahme ist Wahrheit. Edit folgt der realen Aufnahme.
7. **Cross-Layer-Conflict-Check** fehlt aktuell im Pipeline-Design. Chapter-Card-Kollisionen wurden vom Build-Agent nicht erkannt. Sollte ein Phase-6-QC-Step werden.
8. **Font-Size + Layout-Math Build-Time-Validation** — "0 CENT" 560px Orbitron overflow ist vermeidbar gewesen.
9. **Library-Component-API-Check vor Build** — ChartBuild ist Line-Chart, nicht Bar-Chart.
10. **Asset-Path-Matching beim Cross-Project-Copy** — staticFile() paths müssen angepasst werden.
11. **Transform-Origin bei Zoom NIE 50/50** — immer 38-45% Y (Daniels Face-Level).
12. **`nohup + disown`** für detached long-running Processes (Remotion Studio).
13. **Knowledge-Lift** (research → atom → composite → skill) ist Pflicht-Stufe damit Pipeline-Agents brand-aware sind.
14. **All-in-Remotion statt Premiere** — Dario's Workflow ist vollständig Remotion-native. Kein Export zu externem NLE.

---

## 📎 Key File-Index

### Masters
- **Composition:** `src/compositions/daniel-bmf-industriemetalle/BmfIndustriemetalleVideo.tsx` (603 Zeilen)
- **Theme:** `src/compositions/daniel-bmf-industriemetalle/bmf-theme.ts`
- **Session-Log:** `pipeline-runs/daniel-bmf-industriemetalle/SESSION-LOG.md` (~1400 Zeilen, 23 Sections)
- **This file:** `pipeline-runs/daniel-bmf-industriemetalle/CONTINUATION-PLAN.md`

### Phase Outputs (alle in `pipeline-runs/daniel-bmf-industriemetalle/`)
- `phase-1/` — 5 Analyse-JSONs (Emotional, Overlay, Sound-Cue, Pacing, Color)
- `phase-2/master-timeline.json` — konsolidierte Master-Plan mit Conflict-Resolutions
- `phase-4/sound/` — SFX + Music-Bed + Voice-Chain Specs
- `phase-4/mograph/` — 39 Overlay Specs + Build-Order
- `phase-4/edit/` — Cut-Points + Zoom-Keyframes + PIs + B-Roll Slots + **b-roll-classification.md** (Foto vs Video)
- `phase-4/color/` — 11 Lumetri Presets + LUT-Recs
- `phase-4/text/` — SRT + KineticMoments + Lower-Thirds + Title-Cards
- `phase-5/` — 3 QC-Reports (Technical, Creative, Brand)
- `phase-6/build-report.md` — Full-Build-Agent Summary

### Brand Atoms (in knowledge repo)
- `~/knowledge/atoms/video/color/locos-brand-color-language.md` — LOCOS palette + shock-red-accent override
- `~/knowledge/atoms/video/mograph/daniel-finance-3d-design.md` — Material recipes + anti-pattern list
- `~/knowledge/atoms/video/mograph/daniel-talking-head-layout.md` — Face-Safe-Zone coordinates

### Existing Component Patterns (für Phase A Sound-Layer als Referenz)
- `src/compositions/ezb-falle/EZBFalleVideo.tsx` — Voice + SFX + KenBurns pattern
- `src/compositions/spritpreis/SpritpreisVideo.tsx` — 48 SfxCues pattern mit longformSfxPreset
- `src/compositions/amla/AmlaVideo.tsx` — AnimatedGrade + Letterbox integration
- `src/components/EpidemicSoundLibrary.ts` — SFX constant library + presets
- `src/components/KenBurns.tsx` — Photo animation wrapper (für B-Roll)
- `src/components/ColorGrade.tsx` + `src/components/Letterbox.tsx`

### Referenz-B-Roll Assets (für FLUX-Style-Matching)
- `~/ds-motion-graphics/public/ezb-falle/assets/` — 10 existing JPGs (bank-interior, ecb-building, euro-notes, gas-pump, gold-bars, hormuz-aerial, inflation-shopping, lagarde, money-printing, oil-refinery) — zeigen den existing Style-Level

---

## 🎬 Session-Start-Prompt für neue Session

Wenn du diese Session öffnest, dann klebst du das in den ersten User-Turn:

```
Wir arbeiten weiter am BMF-Industriemetalle Video. Bitte lies zuerst
~/ds-motion-graphics/pipeline-runs/daniel-bmf-industriemetalle/CONTINUATION-PLAN.md
+ Section 17-20 von SESSION-LOG.md im gleichen Verzeichnis.

Dann machen wir mit Phase A (Sound-Design-Layer) weiter. Oder sag mir wenn
du eine andere Phase zuerst willst.
```

---

## ⚠ Was NICHT in der nächsten Session gemacht werden soll

- **Neue Pipeline-Features** — wir sind in der Finish-Phase, keine neuen Layer-Konzepte
- **Skript-Änderungen** — Skript ist final, Daniel hat es gesprochen, Transcript ist frozen
- **Neue Brand-Atoms** — LOCOS ist seeded + verified, Frechdachs-Atom kommt in eigener Session
- **Komplette Component-Rewrites** — Fixes statt Neubau, time-budget ist eng
- **YouTube Upload / Thumbnail** — separater Workflow, nicht in dieser Pipeline-Session

---

**End of Continuation Plan. Next session starts here.**
