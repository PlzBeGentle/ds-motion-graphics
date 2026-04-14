# Component Build Order — daniel-bmf-industriemetalle

Source: `phase-4/mograph/mograph-overlay-specs.json`, `new-components-to-build.md`, `existing-components-with-overrides.md`.

## Principle

Build **base components first** so variants can be produced as cheap copy-edit variants (~$0.006/call) instead of full new builds. Critical path first, optional last. All builds via `route --model qwen-coder`.

---

## Tier 0 — Prep (zero LLM cost)

| # | Task | Owner |
|---|------|-------|
| 0a | Copy `/Users/dario/remotion-coder-test/src/KobaltFullscreen.tsx` → `ds-motion-graphics/src/components/daniel-bmf/KobaltFullscreen.tsx` | manual |
| 0b | Copy `/Users/dario/remotion-coder-test/src/HandelsblattFAZNewsCard.tsx` → `ds-motion-graphics/src/components/daniel-bmf/HandelsblattFAZNewsCard.tsx` | manual |
| 0c | Copy `rotes-x.png` into `ds-motion-graphics/public/bmf/rotes-x.png`; update `staticFile("rotes-x.png")` → `staticFile("bmf/rotes-x.png")` | manual |
| 0d | Create `src/compositions/daniel-bmf-industriemetalle/DanielBMFIndustriemetalle.tsx` scaffold (empty Sequence list, 22800 frames @ 30fps) | manual |
| 0e | Create `src/components/daniel-bmf/index.ts` barrel export | manual |
| 0f | Verify KineticType supports: mask-wipe, highlighter-wipe, stamp-slam, glitch-reveal, slow-fade-in reveal types. If not, edit KineticType first (see existing-components-with-overrides.md insight). | manual |

---

## Tier 1 — Critical Base Components (build first, unlock variants)

Order matters — each base unblocks 2-5 variants.

| # | Component | For | Est. Cost | Unlocks Variants |
|---|-----------|-----|-----------|------------------|
| 1 | `DanielLowerThirdStatCard` | ovl-001 | $0.014 | ovl-013, ovl-023, ovl-032, ovl-035 (4 variants) |
| 2 | `BMFDocumentCard` | ovl-002 | $0.014 | ovl-009, ovl-018, ovl-026 (3 variants) |
| 3 | `HorizontalChronologyTimeline` | ovl-028 | $0.014 | ovl-037 (1 variant) |
| 4 | `DonnerstagNewsCard` | ovl-011 | $0.012 | ovl-029 (1 variant) |
| 5 | `CTALowerThird` | ovl-006 | $0.012 | ovl-036 (1 variant) |

**Tier 1 subtotal: ~$0.066** (5 base components unlocking 10 variants)

---

## Tier 2 — Critical Unique Components (high polish, centerpiece)

Build as standalone — no variants derive from these.

| # | Component | For | Est. Cost | Notes |
|---|-----------|-----|-----------|-------|
| 6 | `NullEuroBilanzFullscreen` | ovl-024 | $0.015 | Fullscreen 3/3, counter + split bilanz, screen-shake |
| 7 | `SchweizLocationCard` | ovl-034 | $0.015 | Parallax-depth reveal, KenBurns BG, warm payoff |
| 8 | `OhneTriptychon` | ovl-004 | $0.014 | 3-panel stagger with icons |
| 9 | `EUCriticalIconRow` | ovl-016 | $0.012 | 3-icon label stack |
| 10 | `TwoDateTimelineSplit` | ovl-025 | $0.012 | 2-dot timeline with connector label |
| 11 | `HardCTALowerThird` | ovl-036 | $0.012 | Variant of CTALowerThird — needs Tier 1 #5 first |

**Tier 2 subtotal: ~$0.080**

---

## Tier 3 — Variants (copy-edit mode, cheaper)

Each is a small edit of a Tier 1 base. Use `route --model qwen-coder` with the base component file passed in as context + spec for the diff.

| # | Component | Base | For | Est. Cost |
|---|-----------|------|-----|-----------|
| 12 | `ListicleCounterStatCard` | DanielLowerThirdStatCard | ovl-013 | $0.006 |
| 13 | `PercentDownStatCard` | DanielLowerThirdStatCard | ovl-023 | $0.008 (counter addition) |
| 14 | `TrustCheckmarkStatCard` | DanielLowerThirdStatCard | ovl-032 | $0.006 (color swap + icon) |
| 15 | `CoreMessageStatCard` | DanielLowerThirdStatCard | ovl-035 | $0.006 |
| 16 | `BMF2004DocumentCard` | BMFDocumentCard | ovl-009 | $0.008 (aged paper filter + seal) |
| 17 | `HighlighterDocumentExcerpt` | BMFDocumentCard | ovl-018 | $0.010 (highlighter-wipe anim) |
| 18 | `ChinaBekanntmachungDocumentCard` | BMFDocumentCard | ovl-026 | $0.010 (red seal + 5-chip stagger) |
| 19 | `EUKrisendialogNewsCard` | DonnerstagNewsCard | ovl-029 | $0.006 |
| 20 | `AuthorityTimeline` | HorizontalChronologyTimeline | ovl-037 | $0.006 |

**Tier 3 subtotal: ~$0.066**

---

## Tier 4 — Optional / Should-priority

Lower priority per 1B `priority: should`. Build last.

| # | Component | For | Est. Cost | Priority |
|---|-----------|-----|-----------|----------|
| 21 | `ElementChipRow` | ovl-007 | $0.012 | should |
| 22 | `ZollfreilagerFlowSplit` | ovl-008 | $0.014 | should |

**Tier 4 subtotal: ~$0.026**

---

## Totals

| Tier | Components | Est. Cost |
|------|-----------|-----------|
| Tier 0 (prep) | 6 tasks (manual) | $0.000 |
| Tier 1 (base) | 5 | ~$0.066 |
| Tier 2 (unique critical) | 6 | ~$0.080 |
| Tier 3 (variants) | 9 | ~$0.066 |
| Tier 4 (optional) | 2 | ~$0.026 |
| **Total new builds** | **22** | **~$0.238** |
| Already built (Kobalt + HandelsblattFAZ) | 2 | $0.000 |
| **Grand total (24 unique builds — two reused)** | **24** | **~$0.238 – $0.300** |

Add **~20% buffer for retries and spec-refinements** → realistic total **$0.28 – $0.36**.

---

## Build Workflow per Component

1. Write spec `.md` in `phase-4/mograph/specs/<Name>.spec.md` following template at `~/knowledge/routing/templates/remotion-component-spec-template.md`. Include explicit NIE-list per Daniel-3D-design check.
2. `route --model qwen-coder --file specs/<Name>.spec.md --file <any-base-component>.tsx --output src/components/daniel-bmf/<Name>.tsx`
3. Strip markdown fences: `sed -i '' '1d;$d' src/components/daniel-bmf/<Name>.tsx` (qwen-coder often wraps output in ```tsx blocks despite spec)
4. Register in `src/components/daniel-bmf/index.ts`
5. Render still at frame 30 (mid-animation) for visual review: `npx remotion still src/index.ts daniel-bmf stills/<name>-frame30.png --frame=<absolute_frame> --gl=angle`
6. Visual review against locos-brand-color-language + daniel-finance-3d-design — red flags: cyan/magenta/teal, font ≠ Inter/Montserrat/Playfair/Orbitron, position intersects face-safe-zone
7. If 3D component — render with `--gl=angle` (required for R3F in headless Chromium)
8. If Alpha-Channel export needed: `--codec=prores --prores-profile=4444 --gl=angle`
9. Max 2 retries per component. If still fail → manual edit.

## Risk Flags

- **KineticType coverage** — 10 overlays depend on it. Verify all reveal types exist before Tier 1. Otherwise edit KineticType first (~$0.020 single edit) to avoid 10 broken overlays.
- **SchweizLocationCard** — requires Schweiz Alpen photo asset in `public/bmf/schweiz-alpen.jpg`. Source from Unsplash or Daniel-content library.
- **Fullscreen budget enforcement** — ovl-005, ovl-015, ovl-024 = 3/3 used. ovl-new-001 (HandelsblattFAZ) is categorised as pattern-interrupt, not fullscreen-takeover. Do NOT accidentally build a 4th fullscreen.
- **Glitch budget** — only ovl-030 (1/5). Don't add glitch-reveal anywhere else without checking.
- **Shock-red-accent color grade is HYPOTHESIS** — `confidence: medium` in brand atom. First Kobalt render is the visual validation. If it looks wrong, whole col_004 + col_006 grade plan is open to revision.
