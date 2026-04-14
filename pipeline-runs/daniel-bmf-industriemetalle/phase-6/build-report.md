# Phase-6 Build Report — daniel-bmf-industriemetalle

**Generated:** 2026-04-14
**Agent:** Phase-6 Full-Build Agent (Claude Opus 4.6)
**Composition:** `BMF-Industriemetalle` (Root.tsx, id already registered)
**Duration:** 22800 frames / 760s / 12:40 @ 30fps / 1920x1080

---

## Status

- Master composition fully wired up with ALL phase-4 layers
- 22 NEW component files built (minimum-viable, LOCOS-brand-safe)
- 5 library components reused with overrides (FullscreenTakeover, Letterbox, SplitNarrative, QuoteCard, ChartBuild)
- 2 already-built components imported (KobaltFullscreen, HandelsblattFAZNewsCard)
- 5 utility layers added (LocosColorGrade, BmfCaptions, BRollPlaceholder, ChapterCard, KineticMoment)
- TypeScript: **0 new errors in `daniel-bmf-industriemetalle/`** (all remaining errors are pre-existing in vendor/other-comp code)

---

## File Inventory

### NEW components built (22)
All in `src/compositions/daniel-bmf-industriemetalle/`:

1. `DanielLowerThirdStatCard.tsx` — Base StatCard (ovl-001)
2. `BMFDocumentCard.tsx` — Base paper document card (ovl-002, template)
3. `BMF2004DocumentCard.tsx` — Sepia variant (ovl-009)
4. `HighlighterDocumentExcerpt.tsx` — Highlighter-wipe document (ovl-018)
5. `ChinaBekanntmachungDocumentCard.tsx` — CN characters + metal chips (ovl-026)
6. `DonnerstagNewsCard.tsx` — Base NewsCard (ovl-011, template)
7. `EUKrisendialogNewsCard.tsx` — Gold variant (ovl-029)
8. `OhneTriptychon.tsx` — 3-panel stagger slide-up (ovl-004)
9. `ElementChipRow.tsx` — Periodic element 3-chip (ovl-007)
10. `EUCriticalIconRow.tsx` — Icon-label row 3-item (ovl-016)
11. `PercentDownStatCard.tsx` — 19% down-arrow count-up (ovl-023)
12. `TrustCheckmarkStatCard.tsx` — Green check variant (ovl-032)
13. `CoreMessageStatCard.tsx` — Gold accent variant (ovl-035)
14. `ListicleCounterStatCard.tsx` — 1/4 counter pill variant (ovl-013)
15. `NullEuroBilanzFullscreen.tsx` — Custom 2-column fullscreen (ovl-024)
16. `ZollfreilagerFlowSplit.tsx` — Flow diagram left-split (ovl-008)
17. `TwoDateTimelineSplit.tsx` — 2-dot connector timeline (ovl-025)
18. `HorizontalChronologyTimeline.tsx` — 4-dot chronology (ovl-028, template)
19. `AuthorityTimeline.tsx` — 3-dot biography variant (ovl-037)
20. `SchweizLocationCard.tsx` — Warm payoff card (ovl-034, BG-placeholder gradient)
21. `CTALowerThird.tsx` — Soft CTA (ovl-006)
22. `HardCTALowerThird.tsx` — Hard CTA full-width bar (ovl-036)

### NEW utility layers (5)
23. `ChapterCard.tsx` — 7 chapter title cards (blur reveal)
24. `KineticMoment.tsx` — Center-stacked kinetic text (10 moments, all reveal-types)
25. `BRollPlaceholder.tsx` — Full-screen B-Roll slot card
26. `LocosColorGrade.tsx` — 11-segment cross-fading CSS-filter grade layer
27. `BmfCaptions.tsx` — 176 burned-in caption segments + 3 suppression windows

### NEW support files
28. `bmf-theme.ts` — BMF_COLORS, BMF_FONTS, BMF_SPRINGS, panelStyle helper, seqLifecycle helper
29. `captions-data.ts` — Auto-generated from captions-kinetic.json (176 segs, 906 lines)

### Existing (pre-phase-6, kept)
- `BmfIndustriemetalleVideo.tsx` — **REWRITTEN** to full master composition (~500 lines)
- `KobaltFullscreen.tsx` — already built Phase-3
- `HandelsblattFAZNewsCard.tsx` — already built Phase-3
- `captions.ts` — Whisper transcript source

---

## Library Components Used (with overrides)

| Overlay | Component | Path | Notes |
|---|---|---|---|
| ovl-005 | `FullscreenTakeover` | `src/components/FullscreenTakeover.tsx` | 0 CENT MEHR STEUERN, variant=impact, Orbitron 900, red hero |
| ovl-021 | `QuoteCard` | `src/components/QuoteCard.tsx` | BMF aufgehoben quote, Playfair Display, absolute-positioned |
| ovl-027 | `ChartBuild` | `src/components/ChartBuild.tsx` | Gallium 365% / Germanium 400% line chart |
| ovl-031 | `SplitNarrative` | `src/components/SplitNarrative.tsx` | CN/RU up vs DE down reserves |
| ovl-033 | `QuoteCard` | `src/components/QuoteCard.tsx` | Nicht-Beanstandungsklausel |
| PI 8, 18 | `Letterbox` | `src/components/Letterbox.tsx` | 2 letterboxes at f10182 + f22290 |

**Library reuse count:** 6 import sites (4 distinct library components + 2 copies)

---

## Master Composition Stats

- **Total Sequence blocks:** 57
  - 39 overlays (22 new + 13 library-backed + 2 already-built + 2 variants inlined)
  - 10 KineticMoments
  - 7 ChapterCards
  - 11 BRollPlaceholders
  - 2 Letterboxes
  - 1 LocosColorGrade (frameless, applies across full duration)
  - 1 BmfCaptions (frameless, reads 176 segs internally)
  - 1 OffthreadVideo background layer
- **Layers stacked:** 9 (per header doc)

---

## TODO / Pending (handed back to Dario)

### Assets
- **B-Roll footage:** 11 slots use `BRollPlaceholder` (gold border + label). Replace with real footage for:
  1. Zollfreilager Frankfurt
  2. BMF-PDF freeze + red stamp
  3. Batterie / E-Auto / EU Critical Raw
  4. Verkehrsschild Metapher
  5. 0,00 EUR Bilanz
  6. China Export-Stopp
  7. Chipfabrik TSMC/Intel
  8. Strategische Reserven Tresor
  9. Schweiz Alpen + Tresor
  10. Halbleiter / Maschinenbau / PV / Medizintechnik
  11. Closer bittersweet
- **Schweiz-Alpen BG:** `public/bmf/schweiz-alpen.jpg` not present. `SchweizLocationCard` uses warm gold gradient placeholder. Drop real photo and swap the BG `<div>` for a `<KenBurns>` or `<img>`.

### SFX audio files
Audio files referenced in 70 cues of `sfx-cue-sheet.json` target `public/sfx/daniel-bmf/*.wav` which does not exist. Cues are documented as TODO comment block at the bottom of `BmfIndustriemetalleVideo.tsx`.

**Interim workaround using existing Epidemic Sound files in `public/sfx/epidemic/`:**
- `boom-low.wav` / `boom-ultra-low.wav` → deep-booms (sfx-015 Kobalt, sfx-022 Null-Cent, sfx-068 closer)
- `riser-long-trailer.wav` / `riser-suspenseful.wav` → pre-peak risers
- `glitch-hit.wav` → ovl-030 GENAU JETZT glitch (km-09)
- `paper-rustle.wav` → BMF document card entrances
- `keyboard-click.wav` → KineticMoment foley
- `tracker-suspense.mp3` / `particle-emission-dark.mp3` → music beds mb-01, mb-02

Recommendation: once Epidemic Sound mass-download is complete, paste `<Audio>` tags per cue inside the bottom TODO block.

### KineticType reveal-types
Phase-4 spec references these reveal-types which are NOT natively in `src/components/KineticType.tsx`:
- `mask-wipe-strikethrough` (ovl-010) — approximated as `stamp-slam` in KineticMoment, should eventually add strikethrough pseudo-element
- `highlighter-wipe` (ovl-012) — approximated as `tracking`
- `glitch-reveal` (ovl-030) — implemented as KineticMoment.enableGlitch flag (RGB-offset span overlay)
- `slow-fade-in` (ovl-038 closer) — implemented in KineticMoment as `slow-fade` reveal type

All handled pragmatically inside the new `KineticMoment.tsx`. Library `KineticType.tsx` was NOT used because its `side: left|right` API mismatches the center-stacked word layout of our spec.

### Components that need manual review (Top-3 critical)
1. **`NullEuroBilanzFullscreen.tsx`** (ovl-024) — Custom 2-column bilanz. 220px Orbitron hero counter, 6f screen shake, stagger-reveal columns. Most complex new component + centerpiece adjacent to Null-Cent peak. Visual-check whether plus/minus columns feel balanced and whether 0,00 EUR reads at Orbitron 220px without overflow.
2. **`SchweizLocationCard.tsx`** (ovl-034) — Warm payoff. Uses gradient placeholder until real `schweiz-alpen.jpg` exists. Check parallax-depth reveal timing, Swiss flag size (120px) may be too small relative to 96px SCHWEIZ headline.
3. **`HardCTALowerThird.tsx`** (ovl-036) — Full-width bar, 717-frame standzeit (23.9s!). Check arrow bounce frequency (currently 30-frame sine) isn't distracting over that duration, and that 1800x200px bar doesn't collide with Daniel's shoulders at y=820.

### Brand verification performed
- **LOCOS palette only:** All new components import from `bmf-theme.ts` which exposes only gold (#A68B2C, #d4a017, #f5d37a), warm-black (#161514), warm-white (#FFF5E0), red-accent (#E30613), green-positive (#00C62E). Verified no cyan/magenta/teal-orange/neon in any new file.
- **Fonts:** Only Inter, Montserrat, Playfair Display, Orbitron referenced. Verified via grep.
- **Face-safe-zone:** All lower-thirds anchored x∈[60, 80], right-split at x∈[1180, 1220]. Fullscreens (ovl-005, ovl-015, ovl-024, ovl-new-001) are takeovers and exempt. No overlay lands in `x:760-1160 y:80-560`.
- **Color grade NOT teal-orange:** `LocosColorGrade` uses LOCOS-premium base + selective red-accent overlay on shock peaks (col_004 Kobalt, col_006 Null-Cent) via radial-gradient screen blend. No hue-rotate, no selective orange pull.
- **Cognitive load:** max 2 parallel overlays verified by inspection of master timeline. KineticMoments don't overlap other mograph overlays (they sit during Daniel-only pauses). Captions auto-suppress during the 3 lower-third windows (ovl-001, ovl-006, ovl-036) per `captions-kinetic.json#suppress_windows_frames`.

---

## Build Metrics

- **Files created:** 27 new files (22 new overlay components + 5 utility layers + bmf-theme.ts + captions-data.ts — and rewrote BmfIndustriemetalleVideo.tsx)
- **Files modified:** 1 (`BmfIndustriemetalleVideo.tsx` from 75 → ~500 lines)
- **Files unchanged (kept):** 3 (`KobaltFullscreen.tsx`, `HandelsblattFAZNewsCard.tsx`, `captions.ts`)
- **TypeScript status:** clean for daniel-bmf (0 errors). All pre-existing errors (vendor, kw15, spritpreis, fonts, Root) unchanged.
- **Composition registration:** already present in `src/Root.tsx:38` and `:870` — no changes needed.
- **Estimated build time:** ~25 minutes (agent wall-clock)

---

## Next Steps (for Dario)

1. Open Remotion Studio and scrub `BMF-Industriemetalle` composition end-to-end to catch Frame-0 panics and layout collisions
2. Review Top-3 components listed above for visual correctness
3. Source Epidemic Sound SFX files (70 cues) and wire them into the master via `<Sequence from={frame}><Audio src={...} /></Sequence>` blocks
4. Replace 11 B-Roll placeholders with real footage clips
5. Drop `public/bmf/schweiz-alpen.jpg` to replace the warm-gradient placeholder in SchweizLocationCard
6. Run a sub-second still render at key peak frames: 5838 (Kobalt), 9981 (km-08 0 CENT), 10872 (NullEuroBilanz), 17079 (Schweiz), 22587 (DANKE DEUTSCHLAND) — to verify all overlays land at the right position and don't clip into Daniel's face
7. Consider replacing `KineticMoment.tsx` with production-polished KineticType-V2 later (current one is minimum-viable)
