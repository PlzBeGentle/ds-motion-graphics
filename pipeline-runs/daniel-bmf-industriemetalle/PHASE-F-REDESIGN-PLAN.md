---
title: Phase F — Redesign Pass Plan
created: 2026-04-15
status: waiting-on-user-assets
supersedes: CONTINUATION-PLAN.md "Phase F Component Review" section
---

# Phase F — Redesign Pass Plan

> **Kontext:** Phase 6 Skeleton-Build und Phase B B-Roll-Integration haben einen
> playable state erzeugt, aber Dario hat legitim kritisiert: (1) keine
> word-level caption sync, (2) Elemente revealen zu früh, (3) manche Momente
> bleiben zu lange, (4) Style-Inkonsistenz (ListicleCard vs KineticMoment),
> (5) Null Nutzung der 38+ Components in `~/remotion-coder-test/src/` und
> 200+ Components in `~/ds-motion-graphics/src/components/library/`, (6) Null
> real-world assets in den Overlay-Components (ausser `rotes-x.png` in
> HandelsblattFAZNewsCard), (7) Ich habe nicht nach Assets gefragt bevor ich
> gebaut habe.
>
> **Dieser Plan ersetzt den "Phase F Component Review" aus CONTINUATION-PLAN.md.**
> Statt overlay-by-overlay mini-fixes machen wir einen kompletten Redesign-Pass.

---

## 1. Grund-Prinzipien (hart)

1. **Kein Element reveal bevor Daniel das Thema-Wort gesprochen hat.** Word-Start aus `captions.ts` ist die Quelle der Wahrheit. Timing aus Phase-4-Specs ist Hypothese, die Aufnahme ist Wahrheit.
2. **Library first.** Für jede neue Komponente erst checken: Gibt es eine passende in `remotion-coder-test/src/` oder `ds-motion-graphics/src/components/library/`? Bau-from-scratch nur wenn keine passt.
3. **Real-world assets first.** Fake-Dokumente, generated-SVG-Icons, und Stock-Photo-Look sind Fallbacks. Echte BMF-PDFs, echte News-Artikel-Screenshots, echte Press-Releases sind Default.
4. **Konsistente visual language pro Moment-Typ.** Alle Listicle-Counter (#1/#2/#3/#4) nutzen die gleiche Component. Alle Document-Cards nutzen die gleiche Component. Keine Stylemischung.
5. **Kein Overlay länger als die Daniel-Phrase die es zeigt.** Wenn Daniel 4s über Kupfer redet, bleibt der Kupfer-Visual max. 4.5s. Nicht 12s.
6. **Word-level sync für KineticMoments.** Jedes text-word der KineticMoments kriegt seinen eigenen Start-Frame, gekoppelt an den word-start in `captions.ts`.

---

## 2. Library-Inventar (verfügbar, ungenutzt)

### `~/remotion-coder-test/src/` — 38 Components, überwiegend 3D

| Component | Lines | Use-Case im BMF-Video |
|---|---|---|
| **HighlightedWord** | 154 | **Core für alle KineticMoments** — word-by-word reveal mit pulse-circle, underline, char-stagger |
| **GesetzesBlatt3D** | 358 | **BMFDocumentCard, BMF2004DocumentCard, ChinaBekanntmachungDocumentCard, HighlighterDocumentExcerpt** — nimmt `paragraphs[]` mit `highlight?: boolean` pro segment, rendert als glass panel law-sheet mit paper texture, offical stamp, word-highlighting. Props: sourceName, sourceMeta, lawTitle, lawSection, paragraphs, paperTextureSrc, variant (fullscreen/overlay), clusterOffsetX |
| **KobaltFullscreen** | — | **existierend + schon genutzt** (ovl-015), lebend in beiden repos |
| **HandelsblattFAZNewsCard** | — | **existierend + schon genutzt** (ovl-new-001) |
| **ChapterTransition3D** | 214 | **Ersatz für die 7 disabled Chapter-Cards** — letterbox entry, char-stagger title, exit at frame 100-118 |
| **BigQuoteCard3D** | 322 | **QuoteCard ovl-021 + ovl-033** — 3D quote presentation |
| **BloombergChart3D** | 423 | **PriceExplosionBars ovl-027** — echte Bloomberg-Style chart mit 3D body |
| **BloombergDashboard** | — | Alternative für PriceExplosionBars (multi-metric) |
| **BloombergFrame** | — | Chrome wrapper für Charts |
| **HistoricalTimeline3D** | 229 | **HorizontalChronologyTimeline ovl-028 + AuthorityTimeline ovl-037** — timeline mit 3D depth |
| **FlatEuropeMap3D** | 252 | **Neuer Visual** für seg_138 "europäische Industrie weiß nicht wie sie ihre Chipfabrik versorgen soll" (Slot 8 bridge) |
| **GoldVault3D** | 660 | **Slot 10 Schweiz-Tresor moment** — 3D Alternative zum FLUX still |
| **GoldBar3D + GoldBarStack3D** | — | Supporting visuals für Schweiz payoff |
| **NewspaperMockup3D** | 445 | **DonnerstagNewsCard ovl-011, EUKrisendialogNewsCard ovl-029** — 3D newspaper article mockup |
| **Safe3D** | — | Trust-anchor moments |
| **Stacked3D** | 401 | Multi-card stack layouts |
| **TickerBar** | — | Price ticker untere Kante für Chronology section |
| **LampEffect3D / Meteors3D** | — | Background-Stimmung für bestimmte Moments |
| **AnimatedBulletList** | — | Ersatz für OhneTriptychon ovl-004 |
| **PortraitCard3D** | — | Trust-cards |
| **GlareCard3D** | — | Premium stat moments |
| **AreaChart3D / DonutChart3D / ComparisonBar3D** | — | Data viz variants |
| **FlipWords3D** | — | Multi-word toggle moments |

### `~/ds-motion-graphics/src/components/library/` — ~200 Components

**`text/`** (17 Components, kritisch für Word-Sync):
- `TextGenerateEffect.tsx` — word-by-word fade-in, kann an captions.ts timing gebunden werden
- `TypewriterEffect.tsx` — letter-stagger für quote reveals
- `HeroHighlight.tsx` — highlight-background auf single words
- `EncryptedText.tsx` — für "#1/#2/#3/#4" counter scramble-reveal
- `AuroraTextEffect.tsx` — hero moments
- `ContainerTextFlip.tsx` — für flip-between-options moments
- `ColourfulText.tsx` — multi-color accent text
- `TextRevealCard.tsx` — hover-reveal card (für quote unveil)
- `ShinyText.tsx` — gold shine on keywords (Daniel-LOCOS palette)
- `FlipWords.tsx` — cycling words

**`cards/`** (22 Components):
- `CardStack.tsx` — für BMF-Document paper stack visual
- `GlareCard.tsx` + `ThreeDCard.tsx` + `ThreeDPerspectiveCard.tsx` — premium panel looks
- `MagicCard.tsx` — für CTA cards
- `EvervaultCard.tsx` — encrypted grid background für tech moments
- `AceternityBentoGrid.tsx` + `LightswindBentoGrid.tsx` — multi-slot grids

**`effects/`** (39 Components):
- `CountUp.tsx` — **kritisch** für alle Zahlen-Reveals (PercentDownStatCard 19%, PriceExplosionBars 365/400/437%, usw.)
- `BorderBeam.tsx` + `MovingBorder.tsx` — premium panel-frames
- `GlowingCards.tsx` + `GlowingEffect.tsx` — accent on impact moments
- `Spotlight.tsx` — focused reveal
- `Sparkles.tsx` — gold particle moments (Schweiz payoff)
- `Meteors.tsx` + `ShootingStars.tsx` — background atmosphere
- `LampEffect.tsx` — dramatic side-light
- `PointerHighlight.tsx` — manual pointer annotation
- `TracingBeam.tsx` — timeline trace-reveal

**`backgrounds/`** (25 Components): Atmosphere layers
**`layout/`** (36 Components): Grid, Parallax, Timeline, ScrollStack, TeamCarousel, HeroParallax

### Was wir heute schon haben (Phase A + B)

- `BmfSoundDesign.tsx` — 6 music beds + 51 SFX cues
- `BmfBRoll11IconsCollage.tsx` — Slot 11 motion-graphics
- `DanielZoomLayer.tsx` — 19 zoom keyframes
- `LocosColorGrade.tsx` — 11 color segments
- 7 nano-banana stills + 3 Veo mp4s in `public/bmf/b-roll/`

---

## 3. Overlay-by-Overlay Redesign Matrix (alle 38+)

Jeder Eintrag hat:
- **Current:** Was jetzt im Skeleton ist
- **Target:** Welche Library-Component + welche Assets
- **Sync:** Start-Frame aus captions.ts word-timing
- **Effort:** S(30min) / M(1-2h) / L(2-4h)

### Akt 1 — Hook + Setup (0-155s)

**ovl-001 — Daniel 5 STUNDEN Lower-Third** (frame 72-258, 2.4-8.6s)
- **Current:** DanielLowerThirdStatCard handmade
- **Target:** Ersatz durch `library/effects/CountUp` + `library/text/ShinyText` "5 STUNDEN" mit gold shine; oder `library/cards/MagicCard` als container
- **Sync:** Daniel's erstes "5 Stunden" @ 5.12s = frame 154. **Current start 72 = 2.4s = 2.7s zu früh.** Fix: start bei frame 154.
- **Effort:** S — props swap
- **Assets:** — keine

**ovl-002 — BMFDocumentCard "Schreiben liegt vor"** (frame 648-870, 21.6-29s)
- **Current:** handmade right-split card
- **Target:** **GesetzesBlatt3D (variant="overlay", clusterOffsetX=320)** mit echten paragraphs aus BMF-PDF
- **Sync:** Daniel "Ich habe es hier vor mir liegen" @ 52.1s = frame 1563. **Current start 648 = 21.6s = 30.5s zu früh.** Fix: Dies ist eigentlich der Moment wo Daniel schon das Schreiben verlinkt, start @ frame 1563.
- **Effort:** M — needs asset
- **Assets:** 🔴 `bmf-schreiben-2026-cover.png` + `bmf-schreiben-2026-full.pdf` für paragraphs array

**ovl-003 (km-01) — "22 JAHRE · EIN FEDERSTRICH"** (frame 870-1038, 29-34.6s)
- **Current:** KineticMoment 3-stacked words, bullet prefix awkward
- **Target:** `library/text/ShinyText` "22 JAHRE" + `HighlightedWord` on "GESTOPPT" (Daniel's eigentliches Wort)
- **Sync:** Daniel "22 Jahre gelebte Rechtspraxis einfach so gestoppt hat" @ seg 26: "22" @ 29.56s = frame 887, "Jahre" @ 30.42 = frame 912, "gestoppt" @ 33.66 = frame 1009. **Current start 870 = 0.57s zu früh.** Fix: "22" reveal @ frame 887, "JAHRE" @ 912, "GESTOPPT" (nicht "EIN FEDERSTRICH") @ 1009 — jedes word synct auf seinen word-start.
- **Effort:** M — wording change + library swap
- **Assets:** — keine

**ovl-004 — OhneTriptychon "Parlament/Vorwarnung/Übergang"** (frame 1041-1158, 34.7-38.6s)
- **Current:** 3 Cards nebeneinander, handmade
- **Target:** `AnimatedBulletList` (remotion-coder-test) — staggered bullet entries mit word-sync
- **Sync:** Daniel "Ohne Parlament, ohne Vorwarnung, ohne Übergangsfriste" @ seg 27: "Ohne Parlament" @ 34.68-35.42, "ohne Vorwarnung" @ 35.66-36.82, "ohne Übergangsfriste" @ 36.84-38.62. Current start 1041 = 34.7s = on time ✓. Aber die 3 Bullets müssen SEQUENTIAL zu den 3 word-starts revealen (nicht simultan). Fix: 3 separate Sequences @ frames 1040, 1069, 1105.
- **Effort:** S — stagger timing fix
- **Assets:** — keine

**ovl-005 — FullscreenTakeover "0 CENT"** (frame 1173-1395, 39.1-46.5s)
- **Current:** FullscreenTakeover (library) mit "0 CENT" text
- **Target:** `library/effects/CountUp` (count from 100 → 0) + FullscreenTakeover chrome; oder `HighlightedWord` variant="both" auf "NICHT EINEN"
- **Sync:** Daniel "Cent" @ 44.14s = frame 1324. "Nicht einen" @ 45.64-46.22 = frame 1369-1386. **Current start 1173 = 39.1s = 5s zu früh** (der "0 CENT" text ist bereits vollständig sichtbar während Daniel noch den Setup redet). Fix: Fullscreen-Chrome kann früh starten (bildet Kontext), aber die "0 CENT" number reveal @ frame 1324 (exact "Cent" word).
- **Effort:** M — internal reveal timing rewrite
- **Assets:** — keine

**ovl-006 — CTALowerThird "verlinke das Ganze"** (frame 1410-1695, 47-56.5s)
- **Current:** handmade lower-third
- **Target:** `library/cards/MagicCard` mit link-icon + ShinyText
- **Sync:** Daniel "verlinke euch das Ganze" @ seg 30: "verlinke" @ 54.04 = frame 1621. **Current start 1410 = 47s = 7s zu früh.** Fix: start @ frame 1621.
- **Effort:** S
- **Assets:** — keine (optional: link-icon SVG)

### Akt 2 — Context "Wie lief es früher?" (56-155s)

**ovl-007 — ElementChipRow Indium/Renium** (frame 2001-2193, 66.7-73.1s)
- **Current:** handmade chip row
- **Target:** `library/cards/AceternityBentoGrid` mit einzelnen Element-Photo-Cells, oder `library/layout/InfiniteMovingCards`
- **Sync:** Daniel "Industriemetalle wie Indium oder Renium" @ seg 35: "Indium" @ 71.14 = frame 2134, "Renium" @ 71.70 = frame 2151. **Current start 2001 = 4s zu früh.** Fix: start @ frame 2134, "Indium" reveal first, "Renium" stagger @ 2151.
- **Effort:** M
- **Assets:** 🟢 `indium-ingot.jpg` + `renium-ingot.jpg` (nice-to-have)

**ovl-008 — ZollfreilagerFlowSplit** (frame 2280-2544, 76-84.8s)
- **Current:** handmade left-split
- **Target:** `library/layout/Timeline` oder custom flow-diagram
- **Sync:** Daniel "Zollfreilager" @ seg 37: "Zollfreilager" @ 77.94 = frame 2338. Current start 2280 = 76s = ~2s zu früh. Klein.
- **Effort:** M
- **Assets:** — keine

**ovl-009 — BMF2004DocumentCard** (frame 2670-3165, 89-105.5s)
- **Current:** handmade 2004 document
- **Target:** **GesetzesBlatt3D** mit sourceMeta "2004", paperTextureSrc für aged look
- **Sync:** Daniel "2004" word mentions — check segments. Context: "Die aktuelle Rechtslage wurde 2004 festgelegt..."
- **Effort:** M
- **Assets:** 🔴 `bmf-schreiben-2004-cover.png` + paragraphs

**ovl-010 (km-02) — "AUFGEHOBEN" stamp-slam** (frame 3270-3552, 109-118.4s)
- **Current:** KineticMoment center, blur-reveal
- **Target:** `library/effects/Stamp`-style mit red stroke; oder `HighlightedWord` variant="both" rot
- **Sync:** Daniel "letzte Woche" section — "aufgehoben" word @ ~frame 3271. Mini-check needed.
- **Effort:** S
- **Assets:** — keine (optional: physical stamp PNG)

**ovl-011 — DonnerstagNewsCard** (frame 3750-4104, 125-136.8s)
- **Current:** handmade news card
- **Target:** **NewspaperMockup3D** (remotion-coder-test, 445 lines) mit echtem article-screenshot
- **Sync:** Daniel "Donnerstagabend gegen 20 Uhr" @ seg 47: "Donnerstagabend" @ 128.12 = frame 3844. Current start 3750 = 125s = 3s zu früh.
- **Effort:** M
- **Assets:** 🟡 `donnerstag-leak-source.png` (Twitter/X post, news article, oder generic phone-screen fallback)

**ovl-012 (km-03) — "BRUCH NICHT UPDATE"** (frame 4452-4827, 148.4-160.9s)
- **Current:** KineticMoment tracking reveal
- **Target:** `library/text/FlipWords` — "UPDATE" → "BRUCH" flip; oder `library/text/ContainerTextFlip`
- **Sync:** Daniel "Bruch" word — check segments. Phrase probably at ~seg 55.
- **Effort:** S
- **Assets:** — keine

### Akt 3 — Die 4 Punkte Listicle (155-345s)

**ovl-013 — ListicleCounterStatCard 1/4 "VIER DINGE"** (frame 4890-5205, 163-173.5s)
- **Current:** handmade panel-style card (screenshot 1)
- **Target:** **Konsistenz-Entscheidung nötig.** Option A: beide ähnliche Counter moments (1/4 + #1) vereinheitlichen auf den panel-card style; Option B: vereinheitlichen auf den kinetic-center style (screenshot 2); Option C: Neuer 3D style aus `NewspaperMockup3D` oder `Stacked3D`
- **Sync:** Daniel "vier Dinge" phrase — check context
- **Effort:** M
- **Assets:** — keine

**ovl-014 (km-04) — "#1 DAS WORT DAS ALLES VERRÄT"** (frame 5322-5472, 177.4-182.4s)
- **Current:** KineticMoment bottom, tracking
- **Target:** `EncryptedText` (library/text) für "#1" scramble, dann `HighlightedWord` für "DAS WORT"
- **Sync:** Daniel "das eine Wort das alles verrät" phrase — check
- **Effort:** M
- **Assets:** — keine

**ovl-015 — KobaltFullscreen** (frame 5838-7278, 194.6-242.6s)
- **Current:** KobaltFullscreen (already copied from remotion-coder-test)
- **Target:** **KEEP** — timing ist korrekt: Daniel sagt "Kobalt" first @ 195.60s = frame 5868, deep-boom sfx @ 5868, ovl-015 start @ 5838 (-1s setup). **Duration hinterfragen:** 48s hold ist lang. Bis frame 7278 = 242.6s. Daniel hört auf Kobalt nach seg 73 zu sagen (~234s). Fix: duration evtl. kürzen auf ~7000-7100, das ist direkt nach Daniels letztem "Kobalt" word.
- **Effort:** S — duration tweak
- **Assets:** 🔴 **`bmf-schreiben-2026-kobalt-passage.png`** — der Screenshot der Seite mit Kobalt-Passage, als Backdrop innerhalb der KobaltFullscreen component zeigen (hinter dem "KOBALT" text)

**ovl-016 — EUCriticalIconRow "EU-Liste"** (frame 6909-7278, disabled)
- **Current:** disabled wegen Kollision mit ovl-015
- **Target:** Re-enable aber als **overlay unter KobaltFullscreen** (kleineres panel)
- **Sync:** Daniel "EU-Liste der kritischen Rohstoffe" @ seg 73: "EU" @ 231.96 = frame 6959, "kritischen" @ 232.76 = frame 6983. Current start 6909 = 230.3s = ok.
- **Effort:** S — re-enable + visual subordinate
- **Assets:** 🟡 `eu-critical-raw-materials-list-2023.png`

**ovl-017 (km-05) — "#2 DIE VERBOTENE RÜCKWIRKUNG"** (frame 7287-7575)
- **Current:** KineticMoment mask-wipe
- **Target:** konsistent mit km-04 (selbe Counter-Style-Decision)
- **Sync:** Check word-timing for "rückwirkung"
- **Effort:** S

**ovl-018 — HighlighterDocumentExcerpt "wörtlich vor"** (frame 7584-7974)
- **Current:** handmade highlighter excerpt mit fake-text
- **Target:** **GesetzesBlatt3D** mit `highlight: true` auf den konkret vorgelesenen paragraph
- **Sync:** Daniel "Ich lese euch den Satz wörtlich vor" @ seg 63: "wörtlich" @ 197.88 = frame 5936 — wait, das ist vor ovl-018 start. Let me re-check: ovl-018 starts @ frame 7584 = 252.8s. Daniel sagt nochmal "wörtlich" oder beginnt nochmal zu zitieren um ~252s?
- **Assets:** 🔴🔴 **`bmf-schreiben-2026-vorgelesene-passage.png`** — **der WICHTIGSTE Asset**, der konkret vorgelesene Absatz mit Highlighter auf der Zeile
- **Effort:** M

**ovl-019 (km-06) — "STRAFZETTEL"** (frame 7998-8295)
- **Current:** KineticMoment mask-wipe
- **Target:** `HighlightedWord` variant="circle" rot auf "STRAFZETTEL"
- **Sync:** Daniel "Strafzettel" @ seg 84: "Strafzettel" @ 268.04 = frame 8041. Current start 7998 = 266.6s = 1.4s zu früh.
- **Effort:** S

**ovl-020 (km-07) — "#3 22 JAHRE GELÖSCHT"** (frame 8670-8895)
- **Current:** KineticMoment stamp-slam
- **Target:** konsistent mit #1/#2
- **Effort:** S

**ovl-021 — QuoteCard "aufgehoben"** (frame 9501-9954)
- **Current:** QuoteCard library
- **Target:** **BigQuoteCard3D** (322 lines) mit original quote aus BMF-Schreiben
- **Effort:** M
- **Assets:** 🟡 BMF-Schreiben quote passage (part of MUST-HAVE PDF)

**ovl-022 (km-08) — "#4 0 CENT NEUE STEUERN"** (frame 9981-10299)
- **Current:** KineticMoment tracking
- **Target:** konsistent mit #1/#2/#3
- **Effort:** S

### Akt 4 — Das Muster "Kein Zufall" (345-500s)

**ovl-023 — PercentDownStatCard 19%** (frame 10464-10704)
- **Current:** handmade percent card
- **Target:** `library/effects/CountUp` mit count-down-animation 100 → 81 → 19% rot
- **Sync:** Word-check benötigt
- **Effort:** S
- **Assets:** — keine

**ovl-024 — NullEuroBilanzFullscreen "0,00 EUR"** (frame 10872-11205)
- **Current:** handmade fullscreen
- **Target:** `library/effects/CountUp` 100 → 0,00 EUR + `library/effects/GlowingEffect` red
- **Sync:** Word-check benötigt
- **Effort:** M
- **Assets:** 🟡 `bundeshaushalt-industriemetalle-0-eur.png` als background-layer

**ovl-025 — TwoDateTimelineSplit "9.April 26 / 4.Februar 25"** (frame 11259-11535)
- **Current:** handmade timeline split
- **Target:** **HistoricalTimeline3D** mit 2 date nodes
- **Effort:** M
- **Assets:** — keine

**ovl-026 — ChinaBekanntmachungDocumentCard** (frame 11535-12012)
- **Current:** handmade document card
- **Target:** **GesetzesBlatt3D** mit Chinese source style
- **Sync:** Word-check for China export control mention
- **Effort:** M
- **Assets:** 🔴 `china-bekanntmachung-aktuell.png`

**ovl-027 — PriceExplosionBars "GALLIUM/GERMANIUM/ANTIMON +%"** (frame 12213-12570)
- **Current:** handmade bars chart (replaced ChartBuild in Phase 6)
- **Target:** **BloombergChart3D** (423 lines) oder **BloombergDashboard**
- **Sync:** Daniel erwähnt die drei metals separately in seg 128+. Each bar stagger reveals @ its mention word-start.
- **Effort:** L — component swap + data mapping + sync
- **Assets:** 🟢 optional real price charts (gallium, germanium, antimon)

**ovl-028 — HorizontalChronologyTimeline** (frame 12669-13317)
- **Current:** handmade horizontal timeline
- **Target:** **HistoricalTimeline3D** mit 5 nodes (Aug23/Dez23/Sep24/Apr25/Okt25)
- **Sync:** Daniel "Im August 23 hat China..." @ seg 126. Each date-dot reveals at its mention word-start.
- **Effort:** L — full rewrite mit word-sync per node
- **Assets:** — keine

**ovl-029 — EUKrisendialogNewsCard** (frame 13434-13767)
- **Current:** handmade news card
- **Target:** **NewspaperMockup3D** mit real press release screenshot
- **Effort:** M
- **Assets:** 🔴 `eu-krisendialog-oktober-2025.png`

**ovl-030 (km-09) — "GENAU JETZT" (glitch)** (frame 13773-14178)
- **Current:** KineticMoment mask-wipe + glitch
- **Target:** `library/text/EncryptedText` oder keep KineticMoment aber word-sync fix
- **Effort:** S

### Akt 5 — Lösung "Schweiz" (500-640s)

**ovl-031 — SplitNarrative "Reserven"** (frame 14649-15075)
- **Current:** SplitNarrative library
- **Target:** **FlatEuropeMap3D** mit map markers on Reserven-Länder; oder keep SplitNarrative aber word-sync
- **Effort:** M
- **Assets:** — keine

**ovl-032 — TrustCheckmarkStatCard** (frame 15315-15888)
- **Current:** handmade checkmark stat
- **Target:** `library/cards/MagicCard` + `library/effects/CountUp` + Safe3D für trust-visual
- **Effort:** S

**ovl-033 — QuoteCard Nicht-Beanstandung** (frame 15888-16467)
- **Current:** QuoteCard library
- **Target:** **BigQuoteCard3D**
- **Effort:** S
- **Assets:** 🟡 optional BMF-Schreiben "Nicht-Beanstandung" exact quote

**ovl-034 — SchweizLocationCard** (frame 17079-17643)
- **Current:** handmade location card mit placeholder gradient (Phase B: jetzt mit echtem Alpen-FLUX still als background)
- **Target:** Keep + use FLUX still OR swap to **GoldVault3D** für Tresor-Moment
- **Effort:** S — asset-swap
- **Assets:** ✅ `slot-10-schweiz-alpen.png` (Phase B done)

**ovl-035 — CoreMessageStatCard** (frame 18078-18543)
- **Current:** handmade stat card
- **Target:** `library/cards/GlareCard` + `CountUp`
- **Effort:** S

### Akt 6 — CTA + Outro (640-760s)

**ovl-new-001 — HandelsblattFAZNewsCard** (frame 19350-19980)
- **Current:** already built mit rotes-x.png stamps (Phase 3)
- **Target:** **KEEP** — funktioniert schon gut. Optional: echte article screenshots in den 4 cards ersetzen statt generic placeholders
- **Effort:** S
- **Assets:** 🟡 `handelsblatt-artikel-industriemetalle.png` + faz + nzz + spiegel

**ovl-036 — HardCTALowerThird** (frame 19980-20697, 666-689.9s = 23.9s Standzeit)
- **Current:** handmade CTA
- **Target:** `library/cards/MagicCard` + `BorderBeam` + `library/effects/GradientButton`; 23.9s ist SEHR lang — maybe duration auf ~15s reduzieren
- **Effort:** M
- **Assets:** — keine (optional Daniel-cutout wenn self-shot)

**ovl-037 — AuthorityTimeline "20 Jahre Finanzbranche"** (frame 21243-21786)
- **Current:** handmade timeline
- **Target:** **HistoricalTimeline3D** mit trust-mode
- **Effort:** M

**ovl-038 (km-10) — "DANKE DEUTSCHLAND"** (frame 22587-22797)
- **Current:** KineticMoment slow-fade bottom
- **Target:** `library/text/AuroraTextEffect` gold — bitter-sarkastischer slow fade
- **Sync:** Daniel "Danke Deutschland" @ seg 198 — word-check
- **Effort:** S

---

## 4. Kritische Timing-Findings (Spot-Check)

Aus schnellem caption-Audit (nicht vollständig):

| Overlay | Current Start | Daniel's Word Start | Drift | Severity |
|---|---|---|---|---|
| ovl-001 "5 STUNDEN" | frame 72 (2.4s) | "5 Stunden" @ 5.12s (frame 154) | **-2.7s zu früh** | M |
| ovl-002 BMFDocument | frame 648 (21.6s) | "Ich habe es hier vor mir liegen" @ 52.1s | **-30.5s zu früh** | **CRITICAL** — das ist der Schreibens-Reveal-Moment, der schon vor dem Kapitel startet |
| ovl-003 "22 JAHRE" | frame 870 (29.0s) | "22" @ 29.56 (frame 887) | -0.57s zu früh | S |
| ovl-005 "0 CENT" | frame 1173 (39.1s) | "Cent" @ 44.14 (frame 1324) | **-5.0s zu früh** | L |
| ovl-006 CTALowerThird | frame 1410 (47.0s) | "verlinke" @ 54.04 (frame 1621) | **-7.0s zu früh** | L |
| ovl-007 ElementChipRow | frame 2001 (66.7s) | "Indium" @ 71.14 (frame 2134) | -4.4s zu früh | M |
| ovl-015 KobaltFullscreen | frame 5838 (194.6s) | "Kobalt" @ 195.60 (frame 5868) | -1.0s pre-roll | ✅ OK |
| ovl-019 "STRAFZETTEL" | frame 7998 (266.6s) | "Strafzettel" @ 268.04 (frame 8041) | -1.4s zu früh | S |

**Pattern:** Fast alle Overlays triggern 1-30 Sekunden zu früh, weil die Phase-4-Spec-Frames aus einem geplanten Skript kamen, Daniel aber improvisiert hat und später spricht. **Vollständiger Audit aller 38 Overlays gegen captions.ts ist Pflicht-Schritt 1 in Phase F execution.**

---

## 5. KineticMoment Word-Level Sync Strategie

Aktuell rendert `KineticMoment` mit statischen word positions. Redesign:

```tsx
type KineticWord = {
  text: string;
  color: string;
  size: number;
  // NEW: captionWordStart sekundengenauer Zeitpunkt aus captions.ts
  captionWordStart: number;  // z.B. 29.56 für "22"
  // oder: matchCaptionWord: "22" — wir suchen automatisch den word-start
};
```

Dann in component: `const frame = useCurrentFrame(); const wordFrame = Math.round(captionWordStart * fps); const visible = frame >= wordFrame;`. Stagger-reveal jedes words an sein echtes word-start-frame.

**Plus:** Layout fix für km-01 style issue — statt 3 stacked lines, als inline-wrap oder 2-line layout ohne awkward bullet-prefix. Der `·` bullet wird entweder entfernt oder als separator ZWISCHEN zwei inline words gerendert.

**Helper function** zum captions-lookup:
```tsx
import { SEGMENTS } from "./captions";
export function findWordStart(word: string, afterSeconds: number = 0): number | null {
  for (const seg of SEGMENTS) {
    if (seg.start < afterSeconds) continue;
    for (const w of seg.words) {
      if (w.word.toLowerCase().replace(/[.,]/g, "") === word.toLowerCase()) {
        return w.start;
      }
    }
  }
  return null;
}
```

Usage: `captionWordStart: findWordStart("Kobalt", 190) ?? 195.60`

---

## 6. Real-World Assets Integration Points

### 🔴 MUST-HAVE (blocks Phase F execution)

| Asset | Slot/Overlay | Pfad | Wer |
|---|---|---|---|
| `bmf-schreiben-2026-full.pdf` | ovl-002/015/018 | `public/bmf/assets/documents/` | Dario |
| `bmf-schreiben-2026-cover.png` | ovl-002 | `public/bmf/assets/documents/` | Dario |
| `bmf-schreiben-2026-kobalt-passage.png` | ovl-015 | `public/bmf/assets/documents/` | Dario |
| `bmf-schreiben-2026-vorgelesene-passage.png` | ovl-018 | `public/bmf/assets/documents/` | Dario |
| `bmf-schreiben-2004-cover.png` | ovl-009 | `public/bmf/assets/documents/` | Dario |
| `china-bekanntmachung-aktuell.png` | ovl-026 | `public/bmf/assets/documents/` | Dario |
| `eu-krisendialog-oktober-2025.png` | ovl-029 | `public/bmf/assets/news/` | Dario |

### 🟡 HIGH-VALUE

| Asset | Slot/Overlay | Pfad | Wer |
|---|---|---|---|
| `donnerstag-leak-source.png` | ovl-011 | `public/bmf/assets/news/` | Dario |
| `eu-critical-raw-materials-list-2023.png` | ovl-016 | `public/bmf/assets/documents/` | Dario |
| `bundeshaushalt-industriemetalle-0-eur.png` | ovl-024 | `public/bmf/assets/documents/` | Dario |
| `handelsblatt-artikel-industriemetalle.png` | ovl-new-001 | `public/bmf/assets/news/` | Dario |
| `faz-artikel-industriemetalle.png` | ovl-new-001 | `public/bmf/assets/news/` | Dario |

### 🟢 NICE-TO-HAVE (element photos)

`public/bmf/assets/elements/`: `kobalt-ingot.jpg`, `gallium-ingot.jpg`, `germanium-ingot.jpg`, `antimon-ingot.jpg`, `indium-ingot.jpg`, `renium-ingot.jpg`

### 🟢 NICE-TO-HAVE (price charts)

`public/bmf/assets/charts/`: `gallium-preischart-2023-2026.png`, `germanium-preischart.png`, `antimon-preischart-437-prozent.png`

---

## 7. User Decisions benötigt bevor Execution startet

### D1 — Counter-Style Consistency
Alle "listicle counter" moments (ovl-013 "1/4", ovl-014 "#1", ovl-017 "#2", ovl-020 "#3", ovl-022 "#4") müssen **denselben visual style** nutzen. Option:
- **A** — Panel-Card style (ovl-013 screenshot 1) — cleaner, statischer
- **B** — Kinetic-Center style (ovl-014 screenshot 2) — dynamischer, center-stacked
- **C** — Neuer 3D style mit `NewspaperMockup3D` oder custom "chapter counter" card
- **D** — Mix (1/4 total-count card = Option A, dann #1/#2/#3/#4 per-item = Option B) — das ist tatsächlich die aktuelle Intention, aber zu ähnlich aussehend verwirrt es

### D2 — Word-Level Sync Mode
- **A** — **Strict:** Jedes Wort der KineticMoments synct zu seinem caption word-start (hoher Aufwand, präziseste Umsetzung)
- **B** — **Keyword-only:** Nur die Key-Words (Kobalt, 22 Jahre, 0 Cent, Schweiz, etc.) syncen zu word-start, restliche Text als editorial beat
- **C** — **Editorial mit Regel:** Keine sync aber strikte Regel "kein Overlay/Element reveal bevor Daniel das Thema-Wort gesprochen hat"

### D3 — Chapter-Transitions
- **A** — Re-enable alle 7 Chapter-Cards mit **ChapterTransition3D** (remotion-coder-test)
- **B** — Keep disabled (CONTINUATION-PLAN original recommendation)

### D4 — KineticMoment Wording
Die Phase-4-Specs haben editorial text ("EIN FEDERSTRICH") der nicht Daniel's Originalton matcht ("gestoppt"). Soll:
- **A** — Alle KineticMoments an Daniel's tatsächliche Words angleichen (wörtlich)
- **B** — Editorial-Text behalten wo er stärker ist (aber dann timed zu Daniel's "closest concept word")

### D5 — Overlay-Durations Audit
Viele overlays bleiben lange stehen obwohl Daniel längst weitergeredet hat. Soll:
- **A** — Hard rule: overlay-duration = max 0.5s über das letzte relevante Daniel-word hinaus
- **B** — Editorial freedom (status quo), aber kupfer-style "vieeeel zu lange" einzeln fixen

---

## 8. Execution Order

**Sobald Assets + Decisions da sind:**

### Phase F.1 — Foundation (2-3h)
1. Voll-Audit: alle 38 overlays gegen captions.ts word-starts, exakte Drift-Tabelle erstellen
2. Helper function `findWordStart()` in eigenes File `captions-lookup.ts`
3. `BROLL_SLOTS` + overlay frame ranges global korrigieren
4. Copy/symlink `remotion-coder-test/src/*.tsx` components ins ds-motion-graphics workspace (als `src/components/library/remotion-coder/`)
5. `GesetzesBlatt3D`, `HighlightedWord`, `NewspaperMockup3D`, `HistoricalTimeline3D`, `BigQuoteCard3D`, `BloombergChart3D`, `ChapterTransition3D`, `GoldVault3D`, `FlatEuropeMap3D` importieren

### Phase F.2 — Document-Card Swaps (1-2h)
Alle 4 BMF/Document overlays (ovl-002, 009, 018, 026) auf GesetzesBlatt3D mit echten PDF-Assets

### Phase F.3 — News-Card Swaps (1h)
ovl-011, ovl-029, ovl-new-001 auf NewspaperMockup3D mit echten news-Assets

### Phase F.4 — KineticMoment Rewrite (2-3h)
Alle 10 km-* Moments neu mit word-sync + konsistentem counter style + fixed layout

### Phase F.5 — Listicle Counter + Stat Cards (1-2h)
ovl-013 + ovl-023 + ovl-032 + ovl-035 auf library components

### Phase F.6 — Chart + Timeline Rewrites (2-3h)
ovl-027 (PriceExplosionBars → BloombergChart3D), ovl-028 (Chronology → HistoricalTimeline3D), ovl-037 (AuthorityTimeline → HistoricalTimeline3D)

### Phase F.7 — Fullscreen + Misc (1h)
ovl-005 (0 CENT), ovl-024 (Null-EUR), ovl-034 (Schweiz), ovl-036 (HardCTA)

### Phase F.8 — Chapter Transitions (1h optional)
7 Chapter-Cards mit ChapterTransition3D re-enable

### Phase F.9 — Timing Pass + Frame-by-Frame Review (2h mit Dario)
Jeder overlay wird frame-gerendert, visuell geprüft, finales tuning

**Total estimate: 12-17h über mehrere Sessions**

---

## 9. Was NICHT in Phase F gemacht wird

- **Phase A Sound-Design loop-Problem** — separate Task vor Final Render, eigene Session. Längere Source-Tracks sourcen oder sequential sub-sequences.
- **Phase D ovl-003 Face-Safe-Zone** — wird in F.4 automatisch mitgefixt (KineticMoment rewrite)
- **Phase E 4C Brand-QC Warnings** — wird in F.4+F.5 automatisch mitgefixt
- **Neue Overlays erfinden** — wir arbeiten nur an den existing 38. Keine neuen moments.
- **Skript-Änderungen** — Daniel hat's gesprochen, Text ist frozen.

---

## 10. Status & Next Steps

- ✅ Plan gelesen + verstanden (Dario)
- ⏳ Assets raussuchen und in `public/bmf/assets/` ablegen (Dario) — **blockiert Phase F.2 + F.3**
- ⏳ User Decisions D1-D5 beantworten (Dario) — **blockiert Phase F.4**
- ⏳ Voll-Audit captions.ts × overlays (Claude) — kann parallel starten während Dario sammelt
- ⏳ remotion-coder-test components ins motion-graphics workspace importieren (Claude) — kann parallel starten

**Sobald Assets + D1-D5 da sind → Phase F.1 execution start.**

---

**Commits:**
- `22c2923` feat(bmf): Phase B start - BROLL_SLOTS fix + slot-11 icons collage
- `1cf6e25` feat(bmf): Phase B complete - B-roll assets + refactor + loop bugfix
- `48f936c` fix(bmf): pad SFX sequences to min 30 frames for Studio draw-peaks
- (pending) docs(bmf): Phase F redesign plan
