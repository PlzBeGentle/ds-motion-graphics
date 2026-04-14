# New Components to Build — daniel-bmf-industriemetalle

Source: `phase-4/mograph/mograph-overlay-specs.json`

## Already Built (production-ready, DO NOT re-build)

| # | Component | For Overlay | Source File | Still |
|---|-----------|-------------|-------------|-------|
| 1 | `KobaltFullscreen` | ovl-015 (KOBALT centerpiece) | `/Users/dario/remotion-coder-test/src/KobaltFullscreen.tsx` | `stills/kobalt-test-frame60.png` |
| 2 | `HandelsblattFAZNewsCard` | ovl-new-001 (Dead-zone-filler) | `/Users/dario/remotion-coder-test/src/HandelsblattFAZNewsCard.tsx` (v3) | `stills/handelsblatt-v3-frame90.png` |

**Action:** Copy both files from `remotion-coder-test/src/` into `ds-motion-graphics/src/components/daniel-bmf/` and copy `public/rotes-x.png` asset. Register composition imports in `src/compositions/daniel-bmf-industriemetalle/DanielBMFIndustriemetalle.tsx`. NO qwen-coder call needed — these already exist.

---

## New to Build (24 components)

All build via `route --model qwen-coder --file <spec>.md --output <target>.tsx` per orchestrator playbook. Estimated avg $0.012/call, total ~$0.29.

All components MUST:
- Use `useCurrentFrame()` + `interpolate()` + `spring()` (NO framer-motion, NO CSS transition, NO SVG `<animate>`)
- Use `{position: "absolute", inset: 0}` NEVER `...AbsoluteFill`
- Stay within face-safe-zone `x:760-1160 y:80-560`
- Use LOCOS palette only: gold `#d4a017` `#A68B2C`, warm-black `#161514`, red accent `#E30613`, warm-white `#FFF5E0`. NO cyan/magenta/teal-orange.
- Use Inter/Montserrat/Playfair Display/Orbitron font families only
- Include explicit NIE-list in spec-header per daniel-finance-3d-design spec-pipeline check
- Respect duration_frames (each component receives a `startFrame` + `durationInFrames` prop and auto-exits)

### A — Document / Card Family (5 components, reusable base)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 1 | `BMFDocumentCard` | ovl-002 | CRITICAL | Base — paper white, BMF header, eagle SVG stub, 3D-rotation entrance. Template for ovl-009, ovl-018, ovl-026. |
| 2 | `BMF2004DocumentCard` | ovl-009 | CRITICAL | Variant: aged sepia paper + seal stamp "2004" top-right. |
| 3 | `HighlighterDocumentExcerpt` | ovl-018 | CRITICAL | Variant: Highlighter-wipe animation on phrase "wird veroeffentlicht". |
| 4 | `ChinaBekanntmachungDocumentCard` | ovl-026 | SHOULD | Variant: red seal, CN characters header, 5-metal chip row stagger. |
| 5 | `DonnerstagNewsCard` | ovl-011 | SHOULD | Base NewsCard — red accent left border, clock icon. Template for ovl-029. |

### B — Stat / Info Card Family (6 components, reusable base)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 6 | `DanielLowerThirdStatCard` | ovl-001 | CRITICAL | Base hero-number + sub-label lower-third. Bottom-left anchor. Template for ovl-013, ovl-023, ovl-032, ovl-035. |
| 7 | `ElementChipRow` | ovl-007 | SHOULD | 3-chip periodic-element grid (symbol + name + atomic-no). |
| 8 | `EUCriticalIconRow` | ovl-016 | CRITICAL | Icon-label stack (EU-flag, battery, e-car). Stagger-scale-pop. |
| 9 | `PercentDownStatCard` | ovl-023 | CRITICAL | Variant of StatCard with big percent + down-arrow + count-up. |
| 10 | `TrustCheckmarkStatCard` | ovl-032 | CRITICAL | Variant with green checkmark. |
| 11 | `CoreMessageStatCard` | ovl-035 | SHOULD | Variant with gold accent, no icon. |

### C — Fullscreen Family (1 component)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 12 | `NullEuroBilanzFullscreen` | ovl-024 | CRITICAL | Fullscreen split + / - column bilanz. Custom — not derivable from stock FullscreenTakeover. Counter on "0,00 EUR" with overshoot-clamped spring. Screen-shake 6f. |

### D — Triptychon / Group Card (1 component)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 13 | `OhneTriptychon` | ovl-004 | CRITICAL | 3-panel grid "OHNE PARLAMENT / VORWARNUNG / UEBERGANG", stagger 4f. |

### E — Split Screen / Flow Diagram (1 component)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 14 | `ZollfreilagerFlowSplit` | ovl-008 | SHOULD | Flow chart: Ware → Zollfreilager → Grenze (off). Left-panel only. |

### F — Timeline Family (3 components)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 15 | `TwoDateTimelineSplit` | ovl-025 | CRITICAL | 2-dot horizontal timeline with connector label "14 MONATE". |
| 16 | `HorizontalChronologyTimeline` | ovl-028 | CRITICAL | 4-dot horizontal draw-line + metal-chip icons. Template for ovl-037. |
| 17 | `AuthorityTimeline` | ovl-037 | SHOULD | Variant — 3-dot biography timeline (2005/2008/2011). |

### G — News Card Family (1 component besides Donnerstag)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 18 | `EUKrisendialogNewsCard` | ovl-029 | SHOULD | Variant of DonnerstagNewsCard — EU flag + warn-icon + gold accent. |

### H — Location Card (1 component)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 19 | `SchweizLocationCard` | ovl-034 | CRITICAL | KenBurns Schweiz-Alpen BG + flag + "LOESUNG SCHWEIZ" label. Parallax-depth reveal. Warm payoff polish tier (not max). |

### I — CTA / Lower-Third Family (2 components)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 20 | `CTALowerThird` | ovl-006 | CRITICAL | Soft-CTA lower-third (link-in-description). Template for ovl-036. |
| 21 | `HardCTALowerThird` | ovl-036 | CRITICAL | Variant — two-icon (pdf + calendar), full-width bottom bar, larger. |

### J — Listicle StatCard variant (1 component)

| # | Name | For | Priority | Notes |
|---|------|-----|----------|-------|
| 22 | `ListicleCounterStatCard` | ovl-013 | CRITICAL | Variant of DanielLowerThirdStatCard with "1 / 4" counter pill top-left. |

---

## Build Strategy

1. **Build the 4 base components first** — each unlocks 2-4 variants:
   - `DanielLowerThirdStatCard` → unlocks ovl-001, ovl-013 (variant), ovl-023 (variant), ovl-032 (variant), ovl-035 (variant)
   - `BMFDocumentCard` → unlocks ovl-002, ovl-009 (variant), ovl-018 (variant), ovl-026 (variant)
   - `DonnerstagNewsCard` → unlocks ovl-011, ovl-029 (variant)
   - `HorizontalChronologyTimeline` → unlocks ovl-028, ovl-037 (variant)
2. **Then build fullscreens + centerpieces:** `NullEuroBilanzFullscreen` (ovl-024), `SchweizLocationCard` (ovl-034)
3. **Then utility components:** `OhneTriptychon`, `ZollfreilagerFlowSplit`, `TwoDateTimelineSplit`, `EUCriticalIconRow`, `ElementChipRow`, `CTALowerThird`, `HardCTALowerThird`
4. **Registry additions:** Index each into `src/components/daniel-bmf/index.ts` and expose via `src/compositions/daniel-bmf-industriemetalle/DanielBMFIndustriemetalle.tsx`.

## Cost Estimate

- 22 new components × ~$0.012/qwen-coder call = **~$0.264**
- Variant components (ovl-009, ovl-018, ovl-026, ovl-013, ovl-023, ovl-029, ovl-032, ovl-035, ovl-036, ovl-037) can partially reuse base → some can be done in ~$0.006 edit-mode calls
- **Estimated total: $0.29 – $0.40** (24 unique builds incl. 2 variant-lite calls)
- KobaltFullscreen + HandelsblattFAZNewsCard: **$0** (already built)

## Spec-File Location Pattern

Each spec should live at `pipeline-runs/daniel-bmf-industriemetalle/phase-4/mograph/specs/<ComponentName>.spec.md` following the template at `~/knowledge/routing/templates/remotion-component-spec-template.md` (ASCII-mockup + JSX-skeleton + frame-state-table + exact style-objects + NIE-list + max-3-phases).
