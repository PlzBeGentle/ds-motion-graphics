---
title: Phase F — Final Execution Plan (BMF-Industriemetalle Redesign)
created: 2026-04-15
status: execution-ready
replaces: all prior Phase F plans and CONTINUATION-PLAN Phase F sections
---

# Phase F — BMF Industriemetalle Final Execution Plan

Ein einzelnes self-contained Execution-Dokument. Keine Optionen, keine offenen Entscheidungen, keine Warteschleifen. Alle Vorarbeiten (Phase A Sound, Phase B B-Roll, Asset-Discovery, D1-D5 Decisions, Component-Library-Inventory, Captions-Timing-Audit) sind abgeschlossen. Dieses Dokument ist der Rebuild-Code-Plan.

---

## 1. Hard Rules (non-negotiable)

1. **Word-Sync ist Wahrheit.** Jeder Overlay-Start + interne Reveals müssen an einen Word-Start aus `src/compositions/daniel-bmf-industriemetalle/captions.ts` gekoppelt sein. Keine Spec-basierten Frame-Ranges mehr.
2. **D5 Hard Cap:** Overlay-Ende darf maximal **0.25 Sekunden (7.5 Frames)** über den letzten relevanten Word-End hinausgehen. Ausnahme: bei multi-phase narratives (z.B. HardCTALowerThird) gilt die 0.25s-Regel pro Phase, nicht pro Gesamtoverlay.
3. **Kein Element vor seinem Trigger-Wort sichtbar.** Entry-Animation darf 3-5 Frames vor dem Word-Start beginnen (feel) aber der visual state >50% darf frühestens beim Word-Start sein.
4. **Counter-Moments konsistent.** Alle 5 Counter-Moments (ovl-013 "1/4" + ovl-014/017/020/022 "#1/#2/#3/#4") nutzen **ausschließlich** `HighlightedWord` aus `remotion-coder-test` im Kinetic-Center Style. Panel-Cards + Kinetic-Text-Stacks werden ersetzt.
5. **Library First.** Jeder Overlay nutzt entweder `remotion-coder-test/src/*.tsx` Components oder `ds-motion-graphics/src/components/library/**/*.tsx`. Handmade Skeleton-Components aus Phase 6 werden alle ersetzt oder gelöscht.
6. **Real Assets First.** Verfügbare Assets in `public/assets/` und `public/bmf/assets/` werden verwendet. Nur wo keine real assets existieren, Editorial-Card-Fallback.
7. **KineticMoment Wording** angeglichen an Daniels tatsächlich gesprochene Worte (D4). Editorial-Text ("EIN FEDERSTRICH") wird durch echten Text ("GESTOPPT") ersetzt.
8. **ChapterTransition3D** für alle 7 Chapter-Cards re-enablen (D3).
9. **GoldVault3D NICHT verwenden** (per Dario).
10. **Audio-Ducking + SFX-Timing** wird in dieser Phase NICHT angefasst. Phase A bleibt als-is.

---

## 2. Asset-Inventar (final, nothing pending)

Alle Pfade relativ zu `~/ds-motion-graphics/`.

### 2.1 BMF-Schreiben Master-Dokument (2026)
| File | Pfad | Beschreibung |
|---|---|---|
| Master PDF | `public/assets/bmf-schreiben.pdf` | Dario's eigene Kopie, MD5-identisch zu bundesfinanzministerium.de |
| Master PDF (backup) | `public/bmf/assets/documents/bmf-schreiben-2026-04-09.pdf` | Claude's automated download, gleicher MD5 |
| Titelseite Render | `public/assets/mbf-schreiben-titelseite.png` | Dario's Screenshot der Titelseite (434 KB) |
| Passage mit Highlighter | `public/assets/bmf-schreiben-passsage.png` | Dario's Screenshot der Kobalt-Passage, bereits gelb markiert auf 4 Kern-Sätzen (218 KB) |
| Page 1 | `public/bmf/assets/documents/bmf-2026-04-09-page-1-cover.png` | Titelseite + Aktenzeichen + Inhaltsverzeichnis |
| Page 2 | `public/bmf/assets/documents/bmf-2026-04-09-page-2-allgemeines.png` | § 4 Nr. 4b Definition + Einfuhrprozess |
| Page 3 | `public/bmf/assets/documents/bmf-2026-04-09-page-3-ustae-grundsaetze.png` | UStAE 4.4b.1 Grundsätze |
| Page 4 | `public/bmf/assets/documents/bmf-2026-04-09-page-4-tabak-beispiel.png` | Brasilianisches Tabak-Beispiel Bremen |
| Page 5 ⭐ | `public/bmf/assets/documents/bmf-2026-04-09-page-5-kobalt-beispiel.png` | **Beispiel 3 — die wörtliche Kobalt-Passage** |
| Page 6 | `public/bmf/assets/documents/bmf-2026-04-09-page-6-ski-glas-beispiel.png` | Vorübergehende Verwendung + aktive Veredelung |
| Page 7 | `public/bmf/assets/documents/bmf-2026-04-09-page-7-schlussbestimmung.png` | Anwendungsregelung + 2004-Aufhebung |

### 2.2 BMF-Schreiben Metadata (als Text in Authority-Cards verwendbar)
- **Aktenzeichen:** III C 3 - S 7157-a/00005/001/052
- **DOK:** COO.7005.100.4.14450860
- **Datum:** 9. April 2026
- **Absender:** Bundesministerium der Finanzen, Wilhelmstraße 97, 10117 Berlin
- **Betreff:** "Umsatzsteuer; Steuerbefreiung für die einer Einfuhr vorangehenden Lieferungen von Gegenständen (§ 4 Nr. 4b UStG)"
- **Ersetzt:** BMF-Schreiben vom 28. Januar 2004 – IV D 1 — S 7157 — 01/04 / IV D 1 — S 7157a — 01/04 (BStBl I S. 242)
- **Zeitspanne:** 2004-01-28 → 2026-04-09 = **22 Jahre 2 Monate 12 Tage** (Daniels "22 Jahre" mathematisch bestätigt)
- **Kern-Passage Page 5 Beispiel 3:** "Sachverhalt wie Beispiel 1. A liefert im Zolllager eingelagertes Kobalt an P. Nach praxisorientierter Betrachtungsweise hinsichtlich der Art des Metalls ist ausschließlich die weitere Lagerung im Zolllager möglich und die Beendigung des Verfahrens durch eine Privatperson so gut wie ausgeschlossen. Die Lieferung von A an P ist daher nicht nach § 4 Nr. 4b UStG steuerfrei, da P das besondere Verfahren nicht beenden wird."

### 2.3 Preis-Charts (Dario-Selbst)
| File | Pfad | Zeitraum | Y-Range EUR |
|---|---|---|---|
| Gallium | `public/assets/gallium preis.png` | 2012-07 bis 2024-11 | ca. -75 bis +200 EUR |
| Germanium | `public/assets/germanium preis.png` | 2012-07 bis 2024-11 | ca. -50 bis +350 EUR |
| Antimon | `public/assets/antimon preis.png` | 2021-11 bis 2025-11 | ca. -50 bis +360 EUR |

Alle 3 Charts sind USD+EUR Dual-Line Plots, einheitliches Styling. Sie bestätigen visuell Daniels +365% / +400% / +437% Behauptung.

### 2.4 Logos + Symbole
| File | Pfad | Use |
|---|---|---|
| Bundesadler SVG | `public/assets/logos/bundesadler.svg` | Watermark in allen BMF-Document-Cards |
| Deutschland-Karte SVG | `public/assets/logos/deutschland-karte.svg` | "Deutschland bekommt 0 Cent" Moment (ovl-024) |
| Deutschland-Flagge PNG | `public/assets/logos/deutschland-flagge.png` | Authority-Moments (CoreMessage, AuthorityTimeline) |
| Rotes X PNG | `public/assets/logos/rotes-x.png` | bereits in HandelsblattFAZNewsCard verwendet |

### 2.5 Daniel Master Footage (unverändert)
- `public/bmf/daniel-master.mp4` — symlink zu `~/Downloads/Sequenz 01_33.mp4` (1.7 GB, 22800 frames @ 30fps, 12:40)

### 2.6 Phase B B-Roll Assets (unverändert)
- `public/bmf/b-roll/slot-01-bmf-berlin.png` (nano-banana)
- `public/bmf/b-roll/slot-02-pdf-bmf-schreiben.png` (nano-banana)
- `public/bmf/b-roll/slot-03-zollfreilager-ingots.png` (nano-banana)
- `public/bmf/b-roll/slot-04-telefon-donnerstag.mp4` (Veo 3.1, startFrom 30)
- `public/bmf/b-roll/slot-05-kobalt-mine.mp4` (Veo 3.1, startFrom 15)
- `public/bmf/b-roll/slot-06-strafzettel-windschutzscheibe.png` (nano-banana)
- `public/bmf/b-roll/slot-07-shanghai-port.png` (nano-banana)
- `public/bmf/b-roll/slot-08-cleanroom-wafer.mp4` (Veo 3.1, startFrom 15)
- `public/bmf/b-roll/slot-09-strategic-reserves-bunker.png` (nano-banana)
- `public/bmf/b-roll/slot-10-schweiz-alpen.png` (nano-banana)

### 2.7 Was NICHT existiert (Editorial-Fallback-Strategie)
Diese Assets werden nicht beschafft. Die betroffenen Overlays laufen als Editorial-Cards ohne Real-Asset:
- BMF-Schreiben 2004 Cover/Passage → ovl-009 wird Editorial-Card mit Text-Referenz "IV D 1 - S 7157 - 01/04 — BStBl I S. 242 — 28.01.2004" + Bundesadler-Watermark
- China Export-Kontrolle 5 Docs → ovl-026 + ovl-028 Editorial-Cards mit Text-Labels + Stamps (editorial "Chinese MOFCOM seal" optional als generic red-seal SVG)
- EU-Krisendialog Press-Release → ovl-029 Editorial-News-Card mit Text + Date-Stamp
- Donnerstag-Leak-Source → ovl-011 Editorial-Card mit Phone-Silhouette SVG
- EU Critical Raw Materials List → ovl-016 bleibt disabled
- Bundeshaushalt 0-EUR Screenshot → ovl-024 nutzt Deutschland-Karte SVG als Backdrop stattdessen
- Alle Metal-Ingot-Photos → ovl-007 + ovl-028 nutzen Text-Labels ohne Element-Fotos
- Mainstream-News-Screenshots → ovl-new-001 nutzt Steuer-Fachpresse als Ersatz-Authority (PwC Blog / DATEV Magazin / Haufe / RP Steuerberatung — diese werden als editorial Header-Text gerendert, nicht als Screenshots)

---

## 3. Captions Helper Utility (Phase F.0 — wird einmal gebaut)

**File:** `src/compositions/daniel-bmf-industriemetalle/captions-lookup.ts`

```tsx
import { SEGMENTS, type CaptionWord, type CaptionSegment } from "./captions";

const FPS = 30;

/**
 * Find the start-frame of the first occurrence of a word at or after a given time.
 * Matches case-insensitively and strips punctuation from caption words.
 * Returns null if not found.
 */
export function findWordFrame(word: string, afterSeconds: number = 0): number | null {
  const target = word.toLowerCase().replace(/[.,;:!?"()]/g, "").trim();
  for (const seg of SEGMENTS) {
    if (seg.end < afterSeconds) continue;
    for (const w of seg.words) {
      if (w.start < afterSeconds) continue;
      const clean = w.word.toLowerCase().replace(/[.,;:!?"()]/g, "").trim();
      if (clean === target || clean.startsWith(target)) {
        return Math.round(w.start * FPS);
      }
    }
  }
  return null;
}

/**
 * Find the end-frame of the last occurrence of a word within a time window.
 */
export function findWordEndFrame(word: string, afterSeconds: number, beforeSeconds: number): number | null {
  const target = word.toLowerCase().replace(/[.,;:!?"()]/g, "").trim();
  let lastEnd: number | null = null;
  for (const seg of SEGMENTS) {
    if (seg.end < afterSeconds || seg.start > beforeSeconds) continue;
    for (const w of seg.words) {
      if (w.start < afterSeconds || w.end > beforeSeconds) continue;
      const clean = w.word.toLowerCase().replace(/[.,;:!?"()]/g, "").trim();
      if (clean === target || clean.startsWith(target)) {
        lastEnd = Math.round(w.end * FPS);
      }
    }
  }
  return lastEnd;
}

/**
 * Find the end-frame of a segment by its start-frame (approx match).
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
 * Compute the last-relevant-word-end + D5-cap (7.5 frames) for an overlay
 * window. Takes an array of trigger words and returns the max end-frame + cap.
 */
export function computeOverlayEnd(triggerWords: string[], afterSeconds: number, beforeSeconds: number): number {
  const D5_CAP = 8; // 7.5 rounded up
  let maxEnd = 0;
  for (const w of triggerWords) {
    const end = findWordEndFrame(w, afterSeconds, beforeSeconds);
    if (end && end > maxEnd) maxEnd = end;
  }
  return maxEnd + D5_CAP;
}
```

**Nutzung:**
```tsx
import { findWordFrame, computeOverlayEnd } from "./captions-lookup";

const start = findWordFrame("Kobalt", 190) ?? 5868; // fallback
const end = computeOverlayEnd(["Kobalt", "Rohstoffe"], 190, 240);
```

---

## 4. Library Components Import (Phase F.1)

Eine einmalige Import-Action kopiert alle benötigten `remotion-coder-test` Components ins ds-motion-graphics Workspace unter `src/components/library/remotion-coder/`.

### 4.1 Zu importierende Components

Aus `~/remotion-coder-test/src/` → `~/ds-motion-graphics/src/components/library/remotion-coder/`:

| Source File | Zweck im BMF-Video |
|---|---|
| `HighlightedWord.tsx` | ALLE Counter-Moments + Kobalt + Strafzettel + 0 Cent + Danke Deutschland |
| `GesetzesBlatt3D.tsx` | BMFDocumentCard (ovl-002), BMF2004DocumentCard (ovl-009), HighlighterDocumentExcerpt (ovl-018), ChinaBekanntmachungDocumentCard (ovl-026) |
| `ChapterTransition3D.tsx` | Alle 7 Chapter-Cards |
| `BigQuoteCard3D.tsx` | QuoteCard aufgehoben (ovl-021), QuoteCard Nicht-Beanstandung (ovl-033) |
| `BloombergChart3D.tsx` | Price-Explosion + Chart-Rendering |
| `BloombergDashboard.tsx` | Optional alternative zu BloombergChart3D |
| `BloombergFrame.tsx` | Chrome-wrapper für Chart-Overlays |
| `HistoricalTimeline3D.tsx` | HorizontalChronologyTimeline (ovl-028), AuthorityTimeline (ovl-037), TwoDateTimelineSplit (ovl-025) |
| `FlatEuropeMap3D.tsx` | SplitNarrative Reserven (ovl-031) |
| `NewspaperMockup3D.tsx` | DonnerstagNewsCard (ovl-011), EUKrisendialogNewsCard (ovl-029), HandelsblattFAZNewsCard (ovl-new-001) |
| `AnimatedBulletList.tsx` | OhneTriptychon (ovl-004) |
| `TickerBar.tsx` | Optional untere Chrome-Leiste |
| `Safe3D.tsx` | TrustCheckmarkStatCard (ovl-032) |
| `GlareCard3D.tsx` | CoreMessageStatCard (ovl-035) |

Aus `src/components/library/text/` (bereits im Workspace):

| Component | Use |
|---|---|
| `EncryptedText.tsx` | Optional für "#1/#2/#3/#4" Counter Scramble-Effect vor HighlightedWord |
| `AuroraTextEffect.tsx` | ovl-038 "DANKE DEUTSCHLAND" bitter-sarkastischer outro |
| `ShinyText.tsx` | "5 STUNDEN" hero-number in ovl-001 |
| `TypewriterEffect.tsx` | Optional für document-excerpt typewriter reveal |
| `HeroHighlight.tsx` | Optional für in-quote highlighting |

Aus `src/components/library/effects/` (bereits im Workspace):

| Component | Use |
|---|---|
| `CountUp.tsx` | ovl-023 "19%", ovl-024 "0,00 EUR", ovl-027 Chart-Werte-Reveals, ovl-035 CoreMessage |
| `BorderBeam.tsx` | ovl-036 HardCTALowerThird Premium-Frame |
| `GlowingEffect.tsx` | ovl-024 0-EUR red-glow |
| `Sparkles.tsx` | ovl-034 Schweiz warm Payoff |
| `Spotlight.tsx` | ovl-015 Kobalt Fullscreen Accent |

### 4.2 Import-Script

Phase F.1 Execution:
```bash
mkdir -p ~/ds-motion-graphics/src/components/library/remotion-coder
cp ~/remotion-coder-test/src/HighlightedWord.tsx \
   ~/remotion-coder-test/src/GesetzesBlatt3D.tsx \
   ~/remotion-coder-test/src/ChapterTransition3D.tsx \
   ~/remotion-coder-test/src/BigQuoteCard3D.tsx \
   ~/remotion-coder-test/src/BloombergChart3D.tsx \
   ~/remotion-coder-test/src/BloombergDashboard.tsx \
   ~/remotion-coder-test/src/BloombergFrame.tsx \
   ~/remotion-coder-test/src/HistoricalTimeline3D.tsx \
   ~/remotion-coder-test/src/FlatEuropeMap3D.tsx \
   ~/remotion-coder-test/src/NewspaperMockup3D.tsx \
   ~/remotion-coder-test/src/AnimatedBulletList.tsx \
   ~/remotion-coder-test/src/TickerBar.tsx \
   ~/remotion-coder-test/src/Safe3D.tsx \
   ~/remotion-coder-test/src/GlareCard3D.tsx \
   ~/ds-motion-graphics/src/components/library/remotion-coder/
```

Nach Import: TypeScript-Check, Imports anpassen (relative Pfade zu `../../`), Three.js / R3F dependencies bestätigen installed. Bei Konflikten: verwende die Version aus remotion-coder-test als Quelle der Wahrheit (die ist production-iterated v1-v6 per remotion-coder-test CLAUDE.md).

---

## 5. Overlay-by-Overlay Execution Matrix (alle 38 + 1 new + 7 chapter)

Für jeden Overlay:
- **Old:** bestehende Frame-Range aus Skeleton-Build
- **New:** korrigierte Frame-Range basierend auf captions.ts word-sync
- **Target:** Library-Component + Props
- **Sync:** Trigger-Words + internal reveal timings
- **Asset:** Pfad(e) falls real-asset
- **Action:** S (swap props), M (medium swap + asset integration), L (full rewrite)

### Akt 1 — Hook + Setup (0-155s)

#### ovl-001 — "5 STUNDEN NACHTSCHICHT" Lower-Third
- **Old:** frame 72-258 (2.4-8.6s)
- **New:** frame **162-249** (5.42-8.31s, 87f, 2.9s)
- **Target:** `library/text/ShinyText` für "5 STUNDEN" + `library/effects/CountUp` für zahlen-reveal + `library/cards/MagicCard` als container
- **Sync:** Start @ word "5" (5.42s = frame 162). Hero number "5" reveal frame 162. "STUNDEN" label reveal frame 164 (word "Stunden" @ 6.14s = frame 184, stagger 0.6s later). Sub "NACHTSCHICHT AN EINEM THEMA" editorial. End @ "gesessen" + D5 cap (8.06+0.25 = 249).
- **Asset:** —
- **Action:** L (component rewrite)

#### ovl-002 — BMFDocumentCard (Schreiben-Reveal)
- **Old:** frame 648-870 (21.6-29.0s)
- **New:** frame **653-856** (21.76-28.53s, 203f, 6.8s)
- **Target:** `library/remotion-coder/GesetzesBlatt3D` mit `variant="overlay"`, `clusterOffsetX=320` (rechts-split)
- **Sync:** Start @ word "9." (21.76s = frame 653). Panel flies in right-side. Eagle emblem reveal @ frame 700 (matching "Bundesfinanzministerium" @ 23.74). Paragraphs reveal stagger as Daniel lists: "7-Seiten-lange" @ 26.04, "Schreiben" @ 27.76. End @ "rausgeschickt" + D5 (28.28+0.25 = 856).
- **Asset:** `public/assets/mbf-schreiben-titelseite.png` als `paperTextureSrc` background OR hero image in the GesetzesBlatt panel
- **Props:**
  ```tsx
  <GesetzesBlatt3D
    sourceName="Bundesministerium der Finanzen"
    sourceMeta="Wilhelmstraße 97 · 10117 Berlin · 9. April 2026"
    lawTitle="Umsatzsteuer · Steuerbefreiung § 4 Nr. 4b UStG"
    lawSection="GZ: III C 3 - S 7157-a/00005/001/052"
    paragraphs={[
      { number: "§", segments: [{ text: "7 Seiten, die 22 Jahre Rechtspraxis beenden.", highlight: true }] }
    ]}
    paperTextureSrc={staticFile("assets/mbf-schreiben-titelseite.png")}
    variant="overlay"
    clusterOffsetX={320}
  />
  ```
- **Action:** M (library swap + asset)

#### ovl-003 — "22 JAHRE GESTOPPT" (ehem. km-01 "22 JAHRE EIN FEDERSTRICH")
- **Old:** frame 870-1038 (29.0-34.6s) mit Wording "22 JAHRE · EIN FEDERSTRICH"
- **New:** frame **887-1041** (29.56-34.71s, 154f, 5.1s) mit Wording **"22 JAHRE GESTOPPT"** (D4 angeglichen)
- **Target:** `library/remotion-coder/HighlightedWord` mit 3 sequentiellen instances, position="center-lower"
- **Sync:**
  - Word "22": reveal @ frame 887 (word-start 29.56)
  - Word "JAHRE": reveal @ frame 913 (word-start 30.42)
  - Word "GESTOPPT": reveal @ frame 1010 (word-start 33.66), `variant="circle"` red accent
  - Exit @ frame 1041 (word end 34.46 + 0.25)
- **Asset:** —
- **Props:** Single combined HighlightedWord sequence, rendered as 3 staggered instances within one `<Sequence>`
- **Action:** L (full KineticMoment rewrite)

#### ovl-004 — OhneTriptychon "Parlament/Vorwarnung/Übergang"
- **Old:** frame 1041-1158 (34.7-38.6s)
- **New:** frame **1040-1166** (34.68-38.87s, 126f, 4.2s)
- **Target:** `library/remotion-coder/AnimatedBulletList` mit 3 bullets
- **Sync:**
  - Bullet 1 "OHNE PARLAMENT": reveal @ frame 1055 (word "Parlament" @ 35.18)
  - Bullet 2 "OHNE VORWARNUNG": reveal @ frame 1085 (word "Vorwarnung" @ 36.18)
  - Bullet 3 "OHNE ÜBERGANGSFRISTE": reveal @ frame 1117 (word "Übergangsfriste" @ 37.24)
  - Exit @ frame 1166 (phrase end 38.62 + 0.25)
- **Asset:** —
- **Action:** M (swap handmade Triptychon → AnimatedBulletList)

#### ovl-005 — FullscreenTakeover "0 CENT"
- **Old:** frame 1173-1395 (39.1-46.5s)
- **New:** frame **1193-1394** (39.76-46.47s, 201f, 6.7s)
- **Target:** `library/FullscreenTakeover` (existing) mit `library/effects/CountUp` für "0 CENT" reveal + `library/remotion-coder/HighlightedWord` für "NICHT EINEN" emphasis
- **Sync:**
  - Chrome entry @ frame 1193 (word "Verrückte" @ 39.76)
  - CountUp-Anim 100 → 0 start @ frame 1273 (word "keinen" @ 43.74 — actually "Cent" is at 43.74)
  - Wait, "Cent" @ 43.74 = frame 1312. CountUp landing @ frame 1312 (lands on "Cent" word-end).
  - "NICHT EINEN" highlight @ frame 1369 (word "nicht" @ 45.64)
  - Exit @ frame 1394 (word "einen" end 46.48 + 0.25)
- **Asset:** —
- **Action:** M (FullscreenTakeover keeps chrome, inner content rewrite)

#### ovl-006 — CTALowerThird "ich verlinke euch"
- **Old:** frame 1410-1695 (47.0-56.5s)
- **New:** frame **1606-1805** (53.54-60.19s, 199f, 6.6s)
- **Target:** `library/cards/MagicCard` mit ShinyText "ICH VERLINKE EUCH DAS GANZE" + link-icon
- **Sync:** Start @ word "ich" before "verlinke" (53.54 = frame 1606). End @ "lesen könnt" + 0.25 (60.22+0.25 = 60.47 → frame 1814). Cap at 1805 because "lesen könnt" endet bei 60.22.
- **Asset:** —
- **Action:** M (handmade replace)

### Akt 2 — Context Setup (60-155s)

#### ovl-007 — ElementChipRow "Indium/Renium"
- **Old:** frame 2001-2193 (66.7-73.1s)
- **New:** frame **2078-2199** (69.28-73.33s, 121f, 4.0s)
- **Target:** `library/cards/AceternityBentoGrid` oder `library/layout/InfiniteMovingCards` mit 2 Element-Chips
- **Sync:**
  - Container reveal @ frame 2078 (word "Industriemetalle" @ 69.28)
  - Chip "INDIUM" reveal @ frame 2134 (word "Indium" @ 71.14)
  - Chip "RENIUM" reveal @ frame 2151 (word "Renium" @ 71.70)
  - Exit @ frame 2199 (word "wolltet" end 73.08 + 0.25)
- **Asset:** — (text chips, keine element photos)
- **Action:** M (handmade → library)

#### ovl-008 — ZollfreilagerFlowSplit
- **Old:** frame 2280-2544 (76.0-84.8s)
- **New:** frame **2338-2552** (77.94-85.06s, 214f, 7.1s)
- **Target:** `library/layout/Timeline` oder custom flow-diagram component (keep handmade if no library-match, only fix timing + sync)
- **Sync:** Start @ word "Zollfreilager" @ 77.94 (frame 2338). End @ word "eingeführt" end 84.84 + 0.25 (frame 2552).
- **Asset:** —
- **Action:** S (timing fix only)

#### ovl-009 — BMF2004DocumentCard (Editorial Fallback)
- **Old:** frame 2670-3165 (89.0-105.5s)
- **New:** frame **3079-3184** (102.66-106.13s, 105f, 3.5s)
- **Target:** `library/remotion-coder/GesetzesBlatt3D` mit `variant="overlay"`, editorial paragraphs (kein real asset)
- **Sync:** Start @ word "2004" @ 102.66 (frame 3079). Second "2004" @ 105.88 as emphasis pulse. End + D5 cap (frame 3184).
- **Asset:** editorial — nur bundesadler.svg als watermark
- **Props:**
  ```tsx
  <GesetzesBlatt3D
    sourceName="Bundesministerium der Finanzen"
    sourceMeta="28. Januar 2004"
    lawTitle="IV D 1 — S 7157 — 01/04"
    lawSection="Bundessteuerblatt I · S. 242"
    paragraphs={[
      { number: "§", segments: [
        { text: "Die Regel, die " },
        { text: "22 Jahre", highlight: true },
        { text: " galt." }
      ]}
    ]}
    variant="overlay"
  />
  ```
- **Action:** M (editorial card via library)

#### ovl-010 — "AUFGEHOBEN" stamp-slam (ehem. km-02)
- **Old:** frame 3270-3552 (109.0-118.4s)
- **New:** frame **3385-3450** (112.84-115.00s, 65f, 2.2s)
- **Target:** `library/remotion-coder/HighlightedWord` mit `variant="both"` red
- **Sync:** Start @ 3385 (5 frames vor "aufgehoben" @ 113.18). End @ word-end + D5 (frame 3450).
- **Asset:** —
- **Action:** L (KineticMoment rewrite)

#### ovl-011 — DonnerstagNewsCard (Editorial)
- **Old:** frame 3750-4104 (125-136.8s)
- **New:** frame **3844-4110** (128.12-137.00s, 266f, 8.9s)
- **Target:** `library/remotion-coder/NewspaperMockup3D` mit editorial content
- **Sync:** Start @ word "Donnerstagabend" @ 128.12 (frame 3844). Mid-reveal @ "20 Uhr" @ 129.62 (frame 3888). End @ "rausgeschickt hat" + 0.25 (frame 4110).
- **Asset:** editorial — generic phone-silhouette SVG inline
- **Action:** M (library swap, editorial content)

#### ovl-012 — "BRUCH NICHT UPDATE" (ehem. km-03)
- **Old:** frame 4452-4827 (148.4-160.9s)
- **New:** frame **4690-4900** (156.34-163.30s, 210f, 7.0s) — approximate, needs captions-lookup runtime validation
- **Target:** `library/text/FlipWords` animierte word-substitution
- **Sync:** Start @ word "Update" @ 156.44 (frame 4693). Flip animation: "UPDATE" → "BRUCH" at frame 4750-4770. Hold. End at phrase end (captions-lookup runtime).
- **Asset:** —
- **Action:** L (library swap)

### Akt 3 — Die 4 Punkte Listicle (155-345s)

#### ovl-013 — Counter-Moment "1/4 VIER DINGE"
- **Old:** frame 4890-5205 (163-173.5s)
- **New:** frame **~4910-5200** (needs captions-lookup for "vier Dinge")
- **Target:** `library/remotion-coder/HighlightedWord` mit custom counter "1 / 4" + word "VIER DINGE" center-stacked
- **Sync:** Start @ word "vier" (runtime lookup after 163s). Counter reveal 1/4 @ start, "VIER DINGE" highlight stagger 5f later.
- **Asset:** —
- **Action:** L (panel-card → kinetic-center per D1)

#### ovl-014 — Counter "#1 DAS WORT DAS ALLES VERRÄT" (ehem. km-04)
- **Old:** frame 5322-5472 (177.4-182.4s)
- **New:** frame **~5385-5475** (needs captions-lookup for "eine Wort")
- **Target:** `library/remotion-coder/HighlightedWord` + `library/text/EncryptedText` scramble für "#1"
- **Sync:**
  - "#1" encrypted-reveal scramble @ start
  - "DAS WORT" highlight @ word "Wort" (runtime: ~179s)
  - "ALLES VERRÄT" highlight stagger
  - Exit @ phrase end + D5
- **Asset:** —
- **Action:** L (rewrite)

#### ovl-015 — KobaltFullscreen (centerpiece)
- **Old:** frame 5838-7278 (194.6-242.6s, 48s hold)
- **New:** frame **5838-7035** (194.6-234.5s, 1197f, 39.9s) — shortened by 8.1s (D5 cap: last "Kobalt" @ 229.32 + phrase tail ~234)
- **Target:** existing `KobaltFullscreen` component + NEW: `bmf-schreiben-passsage.png` as ghosted backdrop layer BEHIND the kinetic "KOBALT" text, 25-35% opacity with subtle parallax
- **Sync:**
  - Entry @ frame 5838 (1s pre-roll before "Kobalt." @ 195.60 = frame 5868)
  - "KOBALT" kinetic-type reveal @ frame 5868 (deep-boom-2 sync, already wired in Phase A)
  - Backdrop passage.png fade-in @ frame 5990 (after the punch hit)
  - Daniel liest "A liefert im Zolllager eingelagertes Kobalt" @ 199.64-201.50 (frame 5989-6045) — the document zoom-in
  - Hold + slow push until frame 7035 (phrase end 234.5 + 0.25)
- **Asset:** `public/assets/bmf-schreiben-passsage.png` as backdrop
- **Action:** M (existing component + new backdrop layer)

#### ovl-016 — EUCriticalIconRow (STAYS DISABLED)
- **Decision:** Bleibt disabled per scope-reduction. Kein asset, kein re-enable.

#### ovl-017 — Counter "#2 DIE VERBOTENE RÜCKWIRKUNG" (ehem. km-05)
- **Old:** frame 7287-7575 (242.9-252.5s)
- **New:** frame **~7300-7570** (needs captions-lookup for "Rückwirkung")
- **Target:** `library/remotion-coder/HighlightedWord` konsistent mit #1
- **Sync:** "#2" encrypted scramble @ start, "DIE VERBOTENE RÜCKWIRKUNG" highlight stagger. Exit + D5.
- **Asset:** —
- **Action:** L (rewrite)

#### ovl-018 — HighlighterDocumentExcerpt (die Kobalt-Passage)
- **Old:** frame 7584-7974 (252.8-265.8s)
- **New:** frame **7495-7980** (249.84-266.00s, 485f, 16.2s)
- **Target:** Custom image layer mit `library/remotion-coder/GesetzesBlatt3D` style panel + static `bmf-schreiben-passsage.png` als primary content + zoom-in animation + pointer/arrow reveals
- **Sync:**
  - Start @ word "wörtlich" @ 249.84 (frame 7495)
  - Panel entry @ 7495, image reveal @ 7520
  - Zoom-in auf Highlighter-Line 1 ("A liefert im Zolllager eingelagertes Kobalt an P") @ frame 7530
  - Daniel spricht "A liefert im Zolllager eingelagertes Kobalt an" @ 198.64-201.50 — wait, that's earlier, around frame 5959-6045. Hmm, so there are TWO moments where Daniel "reads" the document?
  - Actually the current ovl-018 range 252.8-265.8s is AFTER the Kobalt section. This is a SECOND reference where Daniel says "wörtlich" again @ 249.84. He's re-quoting or elaborating.
  - Internal stagger: line 1 highlight @ 7495, line 2 ("praxisorientierter Betrachtungsweise") @ 7580, line 3 ("ausschließlich die weitere Lagerung") @ 7680, line 4 ("ist daher nicht steuerfrei") @ 7800
  - Exit @ frame 7980 (end 266.00 + 0.25)
- **Asset:** `public/assets/bmf-schreiben-passsage.png` (Dario's pre-highlighted image)
- **Action:** L (image-direct display mit internal animation overlay)

#### ovl-019 — "STRAFZETTEL" (ehem. km-06)
- **Old:** frame 7998-8295 (266.6-276.5s)
- **New:** frame **8041-8156** (268.04-271.87s, 115f, 3.8s)
- **Target:** `library/remotion-coder/HighlightedWord` `variant="circle"` red
- **Sync:** Start @ word "Strafzettel" @ 268.04 (frame 8041). End @ word "klemmen" @ 271.62 + D5 (frame 8156).
- **Asset:** —
- **Action:** L (rewrite)

#### ovl-020 — Counter "#3 22 JAHRE GELÖSCHT" (ehem. km-07)
- **Old:** frame 8670-8895 (289-296.5s)
- **New:** frame **~8700-8780** (290.0-292.7s, 80f, 2.7s)
- **Target:** `library/remotion-coder/HighlightedWord` konsistent
- **Sync:** "#3" scramble @ ~frame 8700. "22 JAHRE GELÖSCHT" @ word "gelöscht" @ 291.76 (frame 8753). Short punch.
- **Asset:** —
- **Action:** L (rewrite)

#### ovl-021 — QuoteCard "aufgehoben"
- **Old:** frame 9501-9954 (316.7-331.8s)
- **New:** frame **9596-9870** (319.86-329.00s, 274f, 9.1s)
- **Target:** `library/remotion-coder/BigQuoteCard3D`
- **Sync:** Start @ word "2004" @ 319.86 (frame 9596). Quote text typewriter reveal. End 274f later.
- **Asset:** —
- **Action:** M (library swap)

#### ovl-022 — Counter "#4 0 CENT NEUE STEUERN" (ehem. km-08)
- **Old:** frame 9981-10299 (332.7-343.3s)
- **New:** frame **10116-10305** (337.20-343.5s, 189f, 6.3s)
- **Target:** `library/remotion-coder/HighlightedWord` konsistent
- **Sync:** "#4" scramble @ ~10100. "0 CENT" highlight @ frame 10116 (word "Cent" @ 337.20). "NEUE STEUERN" stagger. End + D5.
- **Asset:** —
- **Action:** L (rewrite)

### Akt 4 — Das Muster "Kein Zufall" (345-500s)

#### ovl-023 — PercentDownStatCard "19%"
- **Old:** frame 10464-10704 (348.8-356.8s)
- **New:** frame **10373-10700** (345.76-356.67s, 327f, 10.9s)
- **Target:** `library/cards/MagicCard` mit `library/effects/CountUp` (100 → 19) + red-glow
- **Sync:** Start @ word "19" @ 345.76 (frame 10373). CountUp animation 80-120f. Hold.
- **Asset:** —
- **Action:** M

#### ovl-024 — NullEuroBilanzFullscreen "0,00 EUR"
- **Old:** frame 10872-11205 (362.4-373.5s)
- **New:** frame **11031-11210** (367.70-373.67s, 179f, 6.0s)
- **Target:** `library/FullscreenTakeover` + `library/effects/CountUp` 100 → 0.00 EUR + `deutschland-karte.svg` als backdrop
- **Sync:** Start @ word "0" @ 367.70 (frame 11031). Euro + Cent reveals @ frame 11081 / 11099. Screen-shake sync preserved from Phase A sfx-032 pattern.
- **Asset:** `public/assets/logos/deutschland-karte.svg` ghosted backdrop
- **Action:** M

#### ovl-025 — TwoDateTimelineSplit "9.April26 / 4.Februar25"
- **Old:** frame 11259-11535 (375.3-384.5s)
- **New:** frame **11260-11535** (375.33-384.50s, 275f, 9.2s)
- **Target:** `library/remotion-coder/HistoricalTimeline3D` mit 2 date-nodes
- **Sync:** Start @ "9." @ 375.32 (frame 11260). Node 1 "9. APRIL 26" reveal. Node 2 "4. FEBRUAR 25" reveal @ word "4." @ 379.98 (frame 11399). End + D5.
- **Asset:** —
- **Action:** M

#### ovl-026 — ChinaBekanntmachungDocumentCard (Editorial)
- **Old:** frame 11535-12012 (384.5-400.4s)
- **New:** frame **11535-12000** (needs captions for exact China trigger, approx)
- **Target:** `library/remotion-coder/GesetzesBlatt3D` mit Chinese-style editorial content, no real asset
- **Sync:** Start bei "China" mention (runtime lookup). End + D5.
- **Asset:** editorial — generic red-seal SVG as "official stamp"
- **Props:**
  ```tsx
  <GesetzesBlatt3D
    sourceName="Ministry of Commerce · People's Republic of China"
    sourceMeta="中华人民共和国商务部"
    lawTitle="Export Control Notice"
    lawSection="August 2023 / December 2023 / September 2024 / April 2025"
    paragraphs={[...editorial]}
    variant="overlay"
  />
  ```
- **Action:** M (editorial)

#### ovl-027 — PriceExplosionBars (GALLIUM / GERMANIUM / ANTIMON)
- **Old:** frame 12213-12570 (407.1-419.0s) mit fake bars
- **New:** frame **12334-12930** (411.12-431.00s, 596f, 19.9s)
- **Target:** Custom 3-chart triptychon using real chart PNGs OR `library/remotion-coder/BloombergChart3D` mit den 3 real chart images als texture overlays
- **Sync:**
  - Container entry @ frame 12334 (word "Gallium" @ 411.12)
  - Chart 1 Gallium reveal @ frame 12334, CountUp "+365%" @ frame 12476 (word "365" @ 415.86)
  - Chart 2 Germanium reveal @ frame 12362 (word "Germanium" @ 412.08), "+400%" runtime lookup
  - Chart 3 Antimon reveal @ frame 12923 (word "437" @ 430.76), "+437%" landing
  - Exit @ frame 12930
- **Asset:**
  - `public/assets/gallium preis.png`
  - `public/assets/germanium preis.png`
  - `public/assets/antimon preis.png`
- **Action:** L (custom component with real image assets + CountUp overlay)

**Note:** This overlay OVERLAPS with ovl-028 (12669-13317). Resolution: ovl-027 ends at frame 12930, ovl-028 continues through the chronology on top. Both are data visualizations — ovl-027 is "price explosion" (the WHAT), ovl-028 is "chronology" (the WHEN). They are visually different registers. Acceptable overlap from 12669-12930.

#### ovl-028 — HorizontalChronologyTimeline (China Chronology)
- **Old:** frame 12669-13317 (422.3-443.9s)
- **New:** frame **12230-13443** (407.66-448.09s, 1213f, 40.4s) — extended to cover full chronology from "August 23" to "Oktober 2025"
- **Target:** `library/remotion-coder/HistoricalTimeline3D` mit 5 date-nodes (Aug23/Dez23/Sep24/Apr25/Okt25)
- **Sync:**
  - Timeline container entry @ frame 12230 (word "August" @ 407.66)
  - Node 1 "AUG 23 · GALLIUM + GERMANIUM" @ frame 12230
  - Node 2 "DEZ 23 · GRAPHIT" @ frame 12681 (word "Dezember" @ 422.70)
  - Node 3 "SEP 24 · ANTIMON" @ frame 12779 (word "September" @ 425.96)
  - Node 4 "APR 25 · RARE EARTHS" @ frame 13083 (word "April" @ 436.10)
  - Node 5 "OKT 25 · EU KRISENDIALOG" @ frame 13435 (word "Oktober" @ 447.84)
  - Exit @ frame 13443 (+D5)
- **Asset:** — (text-only timeline, no element photos per scope reduction)
- **Action:** L (full HistoricalTimeline3D swap, extended range)

**Note:** ovl-028 overlaps with ovl-027 (12334-12930). This is intentional — ovl-027 is a "price explosion" card that briefly appears during the first chronology segment, then retreats while ovl-028 continues.

#### ovl-029 — EUKrisendialogNewsCard (Editorial)
- **Old:** frame 13434-13767 (447.8-458.9s)
- **New:** frame **13434-13650** (447.80-455.00s, 216f, 7.2s)
- **Target:** `library/remotion-coder/NewspaperMockup3D` editorial
- **Sync:** Start @ existing frame 13434 (already near "Oktober" @ 447.84). Highlight "KRISENDIALOG" @ frame 13508 (word @ 450.28). End + D5.
- **Asset:** editorial
- **Action:** M

#### ovl-030 — "GENAU JETZT" (ehem. km-09 glitch)
- **Old:** frame 13773-14178 (459.1-472.6s)
- **New:** frame **14035-14200** (467.84-473.33s, 165f, 5.5s) — tightened
- **Target:** `library/text/EncryptedText` mit glitch + red accent
- **Sync:** Start @ word "genau" @ 467.84 (frame 14035). Glitch reveal. End + D5.
- **Asset:** —
- **Action:** L

### Akt 5 — Lösung "Schweiz" (500-640s)

#### ovl-031 — SplitNarrative "Reserven"
- **Old:** frame 14649-15075 (488.3-502.5s)
- **New:** frame **14795-15083** (493.18-502.77s, 288f, 9.6s)
- **Target:** `library/remotion-coder/FlatEuropeMap3D` oder keep `SplitNarrative` with timing-fix
- **Sync:**
  - Start @ word "Reserven" @ 493.18 (frame 14795)
  - "CHINA BAUT" @ frame 14845 (word "China" nearby)
  - "RUSSLAND BAUT" @ frame 14920
  - Exit @ phrase end + D5
- **Asset:** —
- **Action:** M

#### ovl-032 — TrustCheckmarkStatCard
- **Old:** frame 15315-15888 (510.5-529.6s)
- **New:** frame **15660-15800** (522.00-526.67s, 140f, 4.7s)
- **Target:** `library/remotion-coder/Safe3D` + `library/cards/MagicCard` + checkmark icon
- **Sync:** Start @ word "Vertrauensschutz" @ 522.00 (frame 15660). End + D5 on phrase.
- **Asset:** —
- **Action:** M

#### ovl-033 — QuoteCard Nicht-Beanstandung
- **Old:** frame 15888-16467 (529.6-548.9s)
- **New:** frame **~15950-16400** (needs runtime captions-lookup for "nicht beanstanden" or similar)
- **Target:** `library/remotion-coder/BigQuoteCard3D`
- **Sync:** Start on relevant quote word. Typewriter reveal. Exit + D5.
- **Asset:** — (optional: quote text from BMF-Schreiben page)
- **Action:** M

#### ovl-034 — SchweizLocationCard
- **Old:** frame 17079-17643 (569.3-588.1s)
- **New:** frame **17278-17550** (575.94-585.00s, 272f, 9.1s)
- **Target:** Existing `SchweizLocationCard` + `public/bmf/b-roll/slot-10-schweiz-alpen.png` als KenBurns background + optional `library/effects/Sparkles` gold particles overlay. **KEIN GoldVault3D** per user constraint.
- **Sync:** Start @ word "Schweiz" @ 575.94 (frame 17278). Hold on location-reveal. End + D5.
- **Asset:** `public/bmf/b-roll/slot-10-schweiz-alpen.png`
- **Action:** M

#### ovl-035 — CoreMessageStatCard
- **Old:** frame 18078-18543 (602.6-618.1s)
- **New:** frame **~18200-18540** (606.67-618.00s, 340f, 11.3s)
- **Target:** `library/remotion-coder/GlareCard3D` + `library/effects/CountUp`
- **Sync:** Start on "Strukturen" or "antizyklisch" trigger (runtime lookup). End + D5.
- **Asset:** — (optional deutschland-flagge.png als watermark)
- **Action:** M

### Akt 6 — CTA + Outro (640-760s)

#### ovl-new-001 — HandelsblattFAZNewsCard → Steuer-Fachpresse
- **Old:** frame 19350-19980 (645.0-666.0s)
- **New:** frame **19350-19980** (645.0-666.0s, 630f, 21.0s) — KEEP range, rewrite content
- **Target:** Existing `HandelsblattFAZNewsCard` component mit 4 News-Cards, ABER Content geändert von generic Handelsblatt/FAZ zu real Steuer-Fachpresse:
  - Card 1: **PwC** — "BMF: Steuerbefreiung für die einer Einfuhr vorangehenden Lieferungen von Gegenständen (§ 4 Nr. 4b UStG)" — 13.04.2026
  - Card 2: **DATEV Magazin** — "Steuerbefreiung für die einer Einfuhr vorangehenden Lieferungen" — 2026-04
  - Card 3: **Haufe Steuern** — "BMF: Einer Einfuhr vorangehende Lieferungen von Gegenständen"
  - Card 4: **RP Steuerberatung** — "BMF: Einer Einfuhr vorangehende Lieferungen von Gegenständen" — 10.04.2026 (Tag 1 nach Erlass)
- **Sync:** Existing rotes-x stamp-sync preserved. Content-only change.
- **Asset:** `public/assets/logos/rotes-x.png` already wired. No new real screenshots needed.
- **Action:** S (text/meta rewrite)

#### ovl-036 — HardCTALowerThird (23.9s Standzeit)
- **Old:** frame 19980-20697 (666-689.9s)
- **New:** frame **19980-20690** (666.00-689.67s, 710f, 23.7s)
- **Target:** `library/cards/MagicCard` + `library/effects/BorderBeam` + multi-phase internal animation
- **Sync:** Multiple internal phases (not static hold):
  - Phase 1 (frame 19980-20280, 10s): primary CTA "ERSTGESPRÄCH · LINK IN BESCHREIBUNG"
  - Phase 2 (frame 20280-20480): subtitle shift "KOSTENFREI · DIREKT VON DANIEL"
  - Phase 3 (frame 20480-20690): arrow-bounce + final CTA hold
- **Asset:** —
- **Action:** L (full rewrite with phase animation)

#### ovl-037 — AuthorityTimeline "20 Jahre Finanzbranche"
- **Old:** frame 21243-21786 (708.1-726.2s)
- **New:** frame **21262-21790** (708.74-726.33s, 528f, 17.6s)
- **Target:** `library/remotion-coder/HistoricalTimeline3D` mit single authority node "2006-2026 · 20 JAHRE FINANZBRANCHE" oder `library/cards/GlareCard3D` als personal timeline
- **Sync:** Start @ word "20" @ 708.74 (frame 21262). End + D5 on phrase.
- **Asset:** — (optional deutschland-flagge.png)
- **Action:** M

#### ovl-038 — "DANKE DEUTSCHLAND" (ehem. km-10)
- **Old:** frame 22587-22797 (752.9-759.9s)
- **New:** frame **22620-22800** (754.00-760.00s, 180f, 6.0s)
- **Target:** `library/text/AuroraTextEffect` gold gradient + slow-fade bitter-sarkastisch
- **Sync:** Start @ approx word "Danke" (runtime lookup, sfx-069 sync frame 22649). Slow fade to video end frame 22800.
- **Asset:** —
- **Action:** L (KineticMoment rewrite)

### Chapter Cards (D3: ChapterTransition3D re-enable)

All 7 Chapter-Cards werden wieder aktiviert mit `library/remotion-coder/ChapterTransition3D`. Ihre aktuellen Frame-Ranges werden beibehalten (sie wurden in Phase 6 disabled wegen Kollisionen mit KineticMoments — jetzt wo die KineticMoments getimed/rewritten sind, wird die collision-Detection nochmal durchgelaufen, und jeder collidierende Chapter-Card wird um ±30 Frames verschoben um in clean zones zu landen).

| Chapter | Frame Range | Number | Title | Subtitle | Collision-Check |
|---|---|---|---|---|---|
| KAP01 | 0-78 | "KAPITEL 01" | "FÜNF STUNDEN NACHTSCHICHT" | "WAS MIR GESTERN KLAR GEWORDEN IST" | None — before ovl-001 @ frame 162 ✓ |
| KAP02 | 4650-4830 | "KAPITEL 02" | "DAS WORT DAS ALLES VERRÄT" | "#1 · KOBALT · DIE SMOKING GUN" | Collision with ovl-013 Counter 1/4 @ ~4910 — **SHIFT to 4620-4800** ✓ |
| KAP03 | 7287-7467 | "KAPITEL 03" | "DIE VERBOTENE RÜCKWIRKUNG" | "#2 · 22 JAHRE · EIN FEDERSTRICH" | Collision with ovl-017 Counter #2 @ 7300 — **SHIFT to 7257-7437** ✓ |
| KAP04 | 8670-8850 | "KAPITEL 04" | "DAS NULL-CENT-PARADOX" | "#3 · DEUTSCHLAND BEKOMMT GAR NICHTS" | Collision with ovl-020 Counter #3 @ 8700 — **SHIFT to 8640-8820** ✓ |
| KAP05 | 11100-11280 | "KAPITEL 05" | "DAS MUSTER" | "#4 · KEIN ZUFALL · EINE KETTE" | Near ovl-024 NullEuro @ 11031 — **KEEP 11100-11280** (3f gap) ✓ |
| KAP06 | 16380-16560 | "KAPITEL 06" | "DIE LÖSUNG" | "SCHWEIZ · GOLD-GRADE · WARMER PAYOFF" | No collision ✓ |
| KAP07 | 22587-22797 | "KAPITEL 07" | "DANKE, DEUTSCHLAND." | "FINAL · COLD ACCENT · SLOW FADE" | Collision with ovl-038 @ 22620 — **SHIFT to 22437-22617** ✓ |

**ChapterTransition3D Props:**
```tsx
<ChapterTransition3D
  chapterNumber="KAPITEL 03"
  chapterTitle="DIE VERBOTENE RÜCKWIRKUNG"
  chapterSubtitle="#2 · 22 JAHRE · EIN FEDERSTRICH"
  accentColor="#d4a017"
  paperTextureSrc={staticFile("assets/mbf-schreiben-titelseite.png")}
/>
```

All 7 chapters use the same ChapterTransition3D component, just different props.

---

## 6. Execution Order & Commit Plan

Phase F wird in 10 commits durchgezogen, jeder ein logischer Unit-of-Work. TypeScript-Check nach jedem Commit. Studio-Refresh parallel.

### F.0 — Foundation (1 commit, 30 min)
**Commit:** `feat(bmf): Phase F.0 foundation — captions-lookup helper + library imports`
- Create `src/compositions/daniel-bmf-industriemetalle/captions-lookup.ts`
- Copy 14 components from `remotion-coder-test/src/` to `src/components/library/remotion-coder/`
- Adjust relative imports in copied files
- TypeScript check, resolve any @remotion/three or r3f dep warnings (should all be already installed)

### F.1 — Document Cards (1 commit, 1h)
**Commit:** `feat(bmf): Phase F.1 document cards — GesetzesBlatt3D for ovl-002/009/018/026`
- Rewrite ovl-002 BMFDocumentCard as GesetzesBlatt3D with titelseite asset
- Rewrite ovl-009 BMF2004DocumentCard as editorial GesetzesBlatt3D
- Rewrite ovl-018 HighlighterDocumentExcerpt as image-direct display with passsage.png
- Rewrite ovl-026 ChinaBekanntmachungDocumentCard as editorial GesetzesBlatt3D
- Update frame ranges to word-sync values
- Delete handmade BMFDocumentCard.tsx, BMF2004DocumentCard.tsx, HighlighterDocumentExcerpt.tsx, ChinaBekanntmachungDocumentCard.tsx (or mark as deprecated)

### F.2 — Kinetic Moments Rewrite (1 commit, 2h)
**Commit:** `feat(bmf): Phase F.2 kinetic moments — HighlightedWord rewrite of all 10 km- + 5 counters`
- Delete existing `KineticMoment.tsx` or keep as fallback
- Rewrite ovl-003, 010, 012, 014, 017, 019, 020, 022, 030, 038 as `HighlightedWord` instances
- Rewrite ovl-013, 014, 017, 020, 022 (the 5 counter-moments) with EncryptedText "#N" prefix + HighlightedWord word sequences
- Rewrite ovl-038 "DANKE DEUTSCHLAND" with AuroraTextEffect
- All 10+ KineticMoments driven by `findWordFrame()` calls from captions-lookup
- Apply word-sync to all internal text reveals
- D4 wording changes: "EIN FEDERSTRICH" → "GESTOPPT" etc.

### F.3 — Chart + Timeline (1 commit, 1.5h)
**Commit:** `feat(bmf): Phase F.3 charts + timelines — real price charts + HistoricalTimeline3D`
- Rewrite ovl-027 PriceExplosionBars with 3 real chart PNG assets + CountUp overlays
- Rewrite ovl-028 HorizontalChronologyTimeline as HistoricalTimeline3D with 5 date nodes, extended range 12230-13443
- Rewrite ovl-025 TwoDateTimelineSplit as HistoricalTimeline3D (2 nodes variant)
- Rewrite ovl-037 AuthorityTimeline as HistoricalTimeline3D (single authority node)

### F.4 — News Cards (1 commit, 45 min)
**Commit:** `feat(bmf): Phase F.4 news cards — NewspaperMockup3D + Steuer-Fachpresse content`
- Rewrite ovl-011 DonnerstagNewsCard as editorial NewspaperMockup3D
- Rewrite ovl-029 EUKrisendialogNewsCard as editorial NewspaperMockup3D
- Rewrite ovl-new-001 HandelsblattFAZNewsCard content to Steuer-Fachpresse (PwC / DATEV / Haufe / RP) while keeping the 4-card layout + rotes-x stamps

### F.5 — Stat Cards (1 commit, 1h)
**Commit:** `feat(bmf): Phase F.5 stat cards — MagicCard + CountUp + GlareCard3D`
- Rewrite ovl-001 DanielLowerThirdStatCard with ShinyText + MagicCard + CountUp
- Rewrite ovl-023 PercentDownStatCard with MagicCard + CountUp red-glow
- Rewrite ovl-024 NullEuroBilanzFullscreen with FullscreenTakeover + CountUp + deutschland-karte.svg backdrop
- Rewrite ovl-032 TrustCheckmarkStatCard with Safe3D
- Rewrite ovl-035 CoreMessageStatCard with GlareCard3D

### F.6 — Quotes + Triptychon + Listicle (1 commit, 1h)
**Commit:** `feat(bmf): Phase F.6 quotes + listicle — BigQuoteCard3D + AnimatedBulletList`
- Rewrite ovl-021 QuoteCard aufgehoben as BigQuoteCard3D
- Rewrite ovl-033 QuoteCard Nicht-Beanstandung as BigQuoteCard3D
- Rewrite ovl-004 OhneTriptychon as AnimatedBulletList with stagger
- Rewrite ovl-007 ElementChipRow as AceternityBentoGrid or InfiniteMovingCards

### F.7 — Fullscreen + Misc + Schweiz (1 commit, 1h)
**Commit:** `feat(bmf): Phase F.7 fullscreens + schweiz + split narrative`
- Rewrite ovl-005 FullscreenTakeover 0 CENT with CountUp + HighlightedWord
- Rewrite ovl-006 CTALowerThird as MagicCard + ShinyText
- Rewrite ovl-008 ZollfreilagerFlowSplit (timing fix only, keep handmade if no library match)
- Rewrite ovl-015 KobaltFullscreen with passsage.png backdrop layer + duration shortening to 5838-7035
- Rewrite ovl-031 SplitNarrative Reserven with FlatEuropeMap3D
- Rewrite ovl-034 SchweizLocationCard with Sparkles overlay

### F.8 — Chapter Transitions (1 commit, 45 min)
**Commit:** `feat(bmf): Phase F.8 chapter transitions — ChapterTransition3D re-enable all 7`
- Un-comment the CHAPTERS map in BmfIndustriemetalleVideo.tsx
- Apply the collision-adjusted frame ranges (4620-4800, 7257-7437, 8640-8820, 22437-22617)
- Use ChapterTransition3D from remotion-coder-test/library
- Visual review in Studio

### F.9 — HardCTA + Timing Review (1 commit, 1h)
**Commit:** `feat(bmf): Phase F.9 hard CTA multi-phase + final timing cleanup`
- Rewrite ovl-036 HardCTALowerThird with 3-phase animation (MagicCard + BorderBeam)
- Full runtime captions-lookup verification for all overlays that have "runtime lookup" marker
- Fix any remaining drift violations
- TypeScript final check, Studio scrub through all 38+ overlays

### F.10 — Session Log + Final Polish (1 commit, 30 min)
**Commit:** `docs(bmf): Phase F complete — SESSION-LOG section 26 + final polish notes`
- SESSION-LOG.md section 26 "Phase F redesign complete"
- Document any deviations from this plan
- Document manual fine-tuning for Dario's visual review

**Total estimated time:** 10-12h over 1-2 sessions
**Total cost:** $0 (no API calls, pure coding)

---

## 7. Post-Phase-F Remaining Work (NOT in this plan)

These remain as separate tasks after Phase F completes:

1. **Phase A Audio Loop-Bug Workaround** — mb-02 + mb-03 silent-after-source-end gap (≈33s + 25s total silent). Fix: source longer Epidemic Sound tracks OR re-implement loop as sequential sub-sequences.
2. **Final Render** — `npx remotion render src/index.ts BMF-Industriemetalle out/final.mp4 --codec=h264 --crf=18 --gl=angle --concurrency=4`
3. **YouTube Upload Workflow** — thumbnail design, description, tags (separate session)
4. **Learning-Loop** MVP auf dieses Video nach Live-Upload

---

## 8. Risk & Mitigation

| Risk | Mitigation |
|---|---|
| `remotion-coder-test` components have Three.js deps that break Studio | Pre-flight TypeScript check after import; if breaks, keep components in library but add fallback component for simpler 2D use |
| `captions-lookup` runtime misses trigger words due to punctuation edge-cases | Helper has case-insensitive + punctuation-stripping; fallback to manual frame values if lookup returns null |
| Collision-shifted Chapter cards land on different overlays | F.8 includes visual Studio review; adjust by ±30 frames as needed |
| ovl-027/028 overlap causes visual confusion | Separate z-index layers + visually distinct registers (price chart card vs. timeline), reviewed in F.3 |
| Component imports break existing non-BMF compositions | Imports go to `src/components/library/remotion-coder/` — isolated namespace, no existing imports touched |
| GesetzesBlatt3D doesn't render highlighted paragraphs correctly for all use-cases | Read component source first before Phase F.1 execution; adjust paragraph highlighting approach if needed |

---

## 9. Success Criteria

Phase F is complete when:

- [ ] All 38 overlays + 1 new + 7 chapters wire the final library components
- [ ] Every overlay start-frame matches a captions.ts word-start (verified via captions-lookup helper)
- [ ] Every overlay end-frame is ≤ 0.25s after its last relevant word-end (D5)
- [ ] No visual collisions between Chapter-Cards and overlays (verified in Studio)
- [ ] All 5 counter-moments use the same HighlightedWord style (D1)
- [ ] All KineticMoment wordings align to Daniel's actual spoken words (D4)
- [ ] All available assets (7 BMF page PNGs, titelseite, highlighted passage, 3 price charts, 4 logos) are integrated
- [ ] TypeScript 0 errors in `src/compositions/daniel-bmf-industriemetalle/`
- [ ] Studio HTTP 200, all overlays scrubbable without crash (draw-peaks fixed)
- [ ] Full scrub from frame 0 to 22800 shows no reveal before its trigger word

---

## 10. Commit History (Session 2026-04-14 + 2026-04-15)

- `22c2923` Phase B start — BROLL_SLOTS fix + slot-11 icons collage
- `1cf6e25` Phase B complete — B-roll assets + refactor + loop bugfix
- `48f936c` fix — SFX sequence padding for Studio draw-peaks
- `d3bbf43` docs — Phase F redesign plan v1
- `926da4f` feat — BMF-Schreiben PDF + 7 page PNGs + plan v2
- `7b4d74b` docs — plan v3 integrate public/assets discoveries
- (pending) docs — Phase F final execution plan (this document)

---

**Start of execution:** Phase F.0 when Dario gives green light.
**No more planning. No more questions. Just execution from here.**
