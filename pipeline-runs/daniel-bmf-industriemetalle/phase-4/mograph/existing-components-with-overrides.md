# Existing Library Components with Props Override — daniel-bmf-industriemetalle

Source: `phase-4/mograph/mograph-overlay-specs.json`. These 13 overlays reuse existing production components from `ds-motion-graphics/src/components/`.

## KineticType (10x reuse — highest reuse component)

Path: `src/components/KineticType.tsx`

Used for all chapter-marker + emphasis text overlays. Props passed via master-composition wrapper.

| Overlay | Frame Range | Words | Key Override |
|---------|-------------|-------|--------------|
| ovl-003 | 870-1038 | 22 JAHRE · EIN FEDERSTRICH | revealType=mask-wipe, color gold+white |
| ovl-010 | 3270-3552 | AUFGEHOBEN · EIN SATZ · SEITE 7 | revealType=stamp-slam, color red+white, impact-flash |
| ovl-012 | 4452-4827 | BRUCH · NICHT UPDATE | revealType=highlighter-wipe, color red+white |
| ovl-014 | 5322-5472 | #1 · DAS WORT DAS ALLES VERRAET | revealType=mask-wipe, gold #-token |
| ovl-017 | 7287-7575 | #2 · DIE VERBOTENE RUECKWIRKUNG | revealType=mask-wipe, gold #-token |
| ovl-019 | 7998-8295 | STRAFZETTEL · FUER EIN SCHILD NAECHSTE WOCHE | stagger 5f |
| ovl-020 | 8670-8895 | #3 · 22 JAHRE GELOESCHT | stamp-slam, red #-token |
| ovl-022 | 9981-10299 | #4 · 0 CENT NEUE STEUERN | mask-wipe, red #-token |
| ovl-030 | 13773-14178 | GENAU JETZT · LETZTE INFRASTRUKTUR WEG | **glitch-reveal** 5f, RGB-split 4px (budget 1/5) |
| ovl-038 | 22587-22797 | DANKE, DEUTSCHLAND. | Playfair Display, slow-fade-in, letter-spacing animation |

**Common overrides:**
- `fontFamily: "Montserrat"` (except ovl-038 which uses "Playfair Display")
- `fontWeight: 900`
- `textShadow: "0 4px 20px rgba(0,0,0,0.6)"`
- `withLetterbox: false` (unless timeline PI says otherwise)
- Colors from LOCOS palette only: gold `#d4a017`, red `#E30613`, warm-white `#FFF5E0`

**Potential gap:** KineticType currently supports mask-wipe + highlighter-wipe. Verify `stamp-slam`, `slow-fade-in`, `glitch-reveal` reveal types are implemented; if not, add them as new `revealType` enum values (single-component edit, not new component).

## FullscreenTakeover (1x reuse)

Path: `src/components/FullscreenTakeover.tsx`

| Overlay | Frame Range | Content | Key Override |
|---------|-------------|---------|--------------|
| ovl-005 | 1173-1395 | 0 CENT MEHR STEUERN | Orbitron 900, hero=560px red `#E30613`, backdrop `#161514` opacity 0.92, screen-shake 6f, deep-boom-1 sync |

**Common overrides:**
- `fontFamily: "Orbitron"` (signature hero-number font)
- Hero color `#E30613` (LOCOS red accent, not generic red)
- Backdrop warm black `#161514` not `#000000`
- Vignette 0.42
- Film-grain 0.12

## QuoteCard (2x reuse)

Path: `src/components/QuoteCard.tsx`

| Overlay | Frame Range | Content | Key Override |
|---------|-------------|---------|--------------|
| ovl-021 | 9501-9954 | "Das BMF-Schreiben vom 28. Januar 2004 wird damit aufgehoben." | Playfair Display 700, underline "wird damit aufgehoben" red |
| ovl-033 | 15888-16467 | "Nicht-Beanstandungsklausel" + sub | Playfair Display 700, underline gold |

**Common overrides:**
- `fontFamily: "Playfair Display"` weight 700
- `backgroundColor: "rgba(26,26,34,0.82)"` (warm dark glass)
- `borderColor: "rgba(212,160,23,0.35)"` (gold border)
- `underlineColor: "#E30613"` or `"#d4a017"` per context
- 3D-rotation-in entrance + underline-draw 22f after entrance

## ChartBuild (1x reuse as BarChart)

Path: `src/components/ChartBuild.tsx`

| Overlay | Frame Range | Content | Key Override |
|---------|-------------|---------|--------------|
| ovl-027 | 12213-12570 | GALLIUM +365% · GERMANIUM +400% | 2 red bars, Inter 800 title, count-up with overshoot-clamping |

**Common overrides:**
- `chartType: "bar"`
- `barColorNegative: "#E30613"` (LOCOS red for negative trend)
- `gridLineOpacity: 0.15`, `dashPattern: "4,4"` (per B3.7)
- `countUpSpring: { damping: 20, stiffness: 70, mass: 1.0, overshootClamping: true }` (per B3.6)
- `yAxisBaseline: 0` (per B3.3 finance rule)
- `animSequence: "container_title_axes_gridlines_data_labels"` (per B3.2 starre Reihenfolge)

## SplitNarrative (1x reuse as SplitScreen)

Path: `src/components/SplitNarrative.tsx`

| Overlay | Frame Range | Content | Key Override |
|---------|-------------|---------|--------------|
| ovl-031 | 14649-15075 | CHINA · RUSSLAND  vs  DEUTSCHLAND | Stagger 6f, gold left / red right, trend arrows |

**Common overrides:**
- `leftColor: "#d4a017"` (gold = positive position in LOCOS palette)
- `rightColor: "#E30613"` (red = negative position)
- `separatorColor: "#d4a017"`, `separatorWidthPx: 2`
- `leftLabelFont: "Inter"`, weight 800, size 32
- Stagger: `left_delay_frames: 0, right_delay_frames: 6` (non-linear per B1.5)

---

## Summary

| Component | Reuse Count | Total Overlay Time |
|-----------|-------------|---------------------|
| KineticType | 10 | ~15.0s |
| QuoteCard | 2 | ~34.4s |
| FullscreenTakeover | 1 | 7.4s |
| ChartBuild | 1 | 11.9s |
| SplitNarrative | 1 | 14.2s |
| **Total reused overlays** | **15 of 39 (38%)** | — |

## Reuse Insights

- `KineticType` is **the single highest-reuse asset** — 10 of 39 overlays. Any regression in KineticType affects 25% of the video. Must verify all 3 reveal types (mask-wipe, highlighter-wipe, stamp-slam) AND glitch-reveal AND slow-fade-in exist before building new components. If any missing, **edit KineticType first** — cheaper than variant components.
- `QuoteCard` + `FullscreenTakeover` + `ChartBuild` + `SplitNarrative` all require **LOCOS brand color prop overrides** (default palettes likely use generic white/red). Consider adding a `brandPreset="locos"` prop to each that sets all LOCOS colors in one line.
- No library component outside these 5 root-components is reused — the library/ folder (255 converted components) does not contain any suitable matches for the document/stat/card-focused overlay types in this video. Hence 26 new components required.
