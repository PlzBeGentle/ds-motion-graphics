import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";

// Already-built centerpieces
import DemoSceneKobaltFullscreen from "./KobaltFullscreen";
import DemoSceneHandelsblattFAZNewsCard from "./HandelsblattFAZNewsCard";

// NEW BMF components (22)
import DanielLowerThirdStatCard from "./DanielLowerThirdStatCard";
import BMFDocumentCard from "./BMFDocumentCard";
import BMF2004DocumentCard from "./BMF2004DocumentCard";
import HighlighterDocumentExcerpt from "./HighlighterDocumentExcerpt";
import ChinaBekanntmachungDocumentCard from "./ChinaBekanntmachungDocumentCard";
import DonnerstagNewsCard from "./DonnerstagNewsCard";
import EUKrisendialogNewsCard from "./EUKrisendialogNewsCard";
import OhneTriptychon from "./OhneTriptychon";
import ElementChipRow from "./ElementChipRow";
import EUCriticalIconRow from "./EUCriticalIconRow";
import PercentDownStatCard from "./PercentDownStatCard";
import TrustCheckmarkStatCard from "./TrustCheckmarkStatCard";
import CoreMessageStatCard from "./CoreMessageStatCard";
import ListicleCounterStatCard from "./ListicleCounterStatCard";
import NullEuroBilanzFullscreen from "./NullEuroBilanzFullscreen";
import ZollfreilagerFlowSplit from "./ZollfreilagerFlowSplit";
import TwoDateTimelineSplit from "./TwoDateTimelineSplit";
import HorizontalChronologyTimeline from "./HorizontalChronologyTimeline";
import AuthorityTimeline from "./AuthorityTimeline";
import SchweizLocationCard from "./SchweizLocationCard";
import CTALowerThird from "./CTALowerThird";
import HardCTALowerThird from "./HardCTALowerThird";
import PriceExplosionBars from "./PriceExplosionBars";
import DanielZoomLayer from "./DanielZoomLayer";

// Utility / layer components
import ChapterCard from "./ChapterCard";
import KineticMoment from "./KineticMoment";
import BRollPlaceholder from "./BRollPlaceholder";
import LocosColorGrade from "./LocosColorGrade";
// import BmfCaptions from "./BmfCaptions"; // DISABLED 2026-04-14 per user request

// Shared library components
import { FullscreenTakeover } from "../../components/FullscreenTakeover";
import { Letterbox } from "../../components/Letterbox";
import { SplitNarrative } from "../../components/SplitNarrative";
import { QuoteCard } from "../../components/QuoteCard";
import { ChartBuild } from "../../components/ChartBuild";

/**
 * BMF-Industriemetalle Video — Daniel Sauer Longform (Phase-6 Full Build)
 *
 * Dauer: 760s / 22800 frames @ 30fps
 *
 * Layer-Stack (bottom → top):
 *   1. Daniel master footage (OffthreadVideo, full 22800 frames, audio)
 *   2. B-Roll placeholders (11 slots from cut-points / pattern-interrupts)
 *   3. LOCOS Color Grade (11 segments, cross-faded)
 *   4. 39 mograph overlays (22 new + 13 library + 2 already-built + 2 variants)
 *   5. 3 Lower-Thirds (ovl-001, ovl-006, ovl-036)
 *   6. 7 Chapter title cards
 *   7. 10 KineticType moments
 *   8. 2 Letterboxes (pattern interrupts idx 8 + 18)
 *   9. Burned-in captions (176 segments, suppressed during lower-thirds)
 *
 * Brand: strict LOCOS (gold #d4a017, warm-black #161514, red-accent #E30613,
 * warm-white #FFF5E0). NEVER Teal-Orange, NEVER cyan/magenta/neon.
 *
 * SFX: 70 cues in phase-4/sound/sfx-cue-sheet.json — audio files do not yet
 * exist in public/sfx/daniel-bmf/, so cues are documented as TODO comments.
 *
 * Pattern interrupts / pacing: see pipeline-runs/daniel-bmf-industriemetalle/
 * phase-4/edit/pattern-interrupts.json + cut-points.json.
 */

// ============================================================================
// FRAME CONSTANTS (from phase-4/mograph/mograph-overlay-specs.json)
// ============================================================================

// Overlay frame ranges — keep in sync with mograph-overlay-specs.json
const O = {
  "ovl-001": { start: 72, end: 258 },        // DanielLowerThirdStatCard (5 Stunden)
  "ovl-002": { start: 648, end: 870 },        // BMFDocumentCard
  "ovl-003": { start: 870, end: 1038 },       // KineticText 22 JAHRE · EIN FEDERSTRICH
  "ovl-004": { start: 1041, end: 1158 },      // OhneTriptychon
  "ovl-005": { start: 1173, end: 1395 },      // FullscreenTakeover 0 CENT
  "ovl-006": { start: 1410, end: 1695 },      // CTALowerThird
  "ovl-007": { start: 2001, end: 2193 },      // ElementChipRow
  "ovl-008": { start: 2280, end: 2544 },      // ZollfreilagerFlowSplit
  "ovl-009": { start: 2670, end: 3165 },      // BMF2004DocumentCard
  "ovl-010": { start: 3270, end: 3552 },      // KineticText AUFGEHOBEN (stamp-slam)
  "ovl-011": { start: 3750, end: 4104 },      // DonnerstagNewsCard
  "ovl-012": { start: 4452, end: 4827 },      // KineticText BRUCH NICHT UPDATE
  "ovl-013": { start: 4890, end: 5205 },      // ListicleCounterStatCard 1/4
  "ovl-014": { start: 5322, end: 5472 },      // KineticText #1
  "ovl-015": { start: 5838, end: 7278 },      // KobaltFullscreen (already built)
  "ovl-016": { start: 6909, end: 7278 },      // EUCriticalIconRow
  "ovl-017": { start: 7287, end: 7575 },      // KineticText #2 RUECKWIRKUNG
  "ovl-018": { start: 7584, end: 7974 },      // HighlighterDocumentExcerpt
  "ovl-019": { start: 7998, end: 8295 },      // KineticText STRAFZETTEL
  "ovl-020": { start: 8670, end: 8895 },      // KineticText #3 22 JAHRE GELOESCHT
  "ovl-021": { start: 9501, end: 9954 },      // QuoteCard — aufgehoben
  "ovl-022": { start: 9981, end: 10299 },     // KineticText #4 0 CENT
  "ovl-023": { start: 10464, end: 10704 },    // PercentDownStatCard 19%
  "ovl-024": { start: 10872, end: 11205 },    // NullEuroBilanzFullscreen
  "ovl-025": { start: 11259, end: 11535 },    // TwoDateTimelineSplit
  "ovl-026": { start: 11535, end: 12012 },    // ChinaBekanntmachungDocumentCard
  "ovl-027": { start: 12213, end: 12570 },    // ChartBuild PREIS-EXPLOSION
  "ovl-028": { start: 12669, end: 13317 },    // HorizontalChronologyTimeline
  "ovl-029": { start: 13434, end: 13767 },    // EUKrisendialogNewsCard
  "ovl-030": { start: 13773, end: 14178 },    // KineticText GENAU JETZT (glitch)
  "ovl-031": { start: 14649, end: 15075 },    // SplitNarrative Reserven
  "ovl-032": { start: 15315, end: 15888 },    // TrustCheckmarkStatCard
  "ovl-033": { start: 15888, end: 16467 },    // QuoteCard Nicht-Beanstandung
  "ovl-034": { start: 17079, end: 17643 },    // SchweizLocationCard
  "ovl-035": { start: 18078, end: 18543 },    // CoreMessageStatCard
  "ovl-036": { start: 19980, end: 20697 },    // HardCTALowerThird
  "ovl-037": { start: 21243, end: 21786 },    // AuthorityTimeline
  "ovl-038": { start: 22587, end: 22797 },    // KineticText DANKE DEUTSCHLAND
  "ovl-new-001": { start: 19350, end: 19980 }, // HandelsblattFAZNewsCard
} as const;

// Chapter title cards
const CHAPTERS = [
  { start: 0, end: 78, num: "KAPITEL 01", title: "FÜNF STUNDEN NACHTSCHICHT", sub: "WAS MIR GESTERN KLAR GEWORDEN IST" },
  { start: 4650, end: 4830, num: "KAPITEL 02", title: "DAS WORT DAS ALLES VERRÄT", sub: "#1 · KOBALT · DIE SMOKING GUN" },
  { start: 7287, end: 7467, num: "KAPITEL 03", title: "DIE VERBOTENE RÜCKWIRKUNG", sub: "#2 · 22 JAHRE · EIN FEDERSTRICH" },
  { start: 8670, end: 8850, num: "KAPITEL 04", title: "DAS NULL-CENT-PARADOX", sub: "#3 · DEUTSCHLAND BEKOMMT GAR NICHTS" },
  { start: 11100, end: 11280, num: "KAPITEL 05", title: "DAS MUSTER", sub: "#4 · KEIN ZUFALL · EINE KETTE" },
  { start: 16380, end: 16560, num: "KAPITEL 06", title: "DIE LÖSUNG", sub: "SCHWEIZ · GOLD-GRADE · WARMER PAYOFF" },
  { start: 22587, end: 22797, num: "KAPITEL 07", title: "DANKE, DEUTSCHLAND.", sub: "FINAL · COLD ACCENT · SLOW FADE" },
];

// B-Roll slots (from pattern-interrupts.json — 11 slots for footage)
const BROLL_SLOTS = [
  { start: 1860, duration: 210, topic: "Zollfreilager Frankfurt" },
  { start: 3150, duration: 90, topic: "BMF-PDF · Red 2004 Stamp (freeze)" },
  { start: 6600, duration: 240, topic: "Batterie · E-Auto · EU Critical Raw" },
  { start: 8100, duration: 200, topic: "Verkehrsschild Metapher" },
  { start: 10200, duration: 200, topic: "0,00 EUR Bilanz B-Roll" },
  { start: 11900, duration: 200, topic: "China Export-Stopp Karte" },
  { start: 13765, duration: 210, topic: "Chipfabrik TSMC / Intel" },
  { start: 14500, duration: 200, topic: "Strategische Reserven Tresor" },
  { start: 17850, duration: 210, topic: "Schweiz Alpen · Tresor" },
  { start: 20700, duration: 240, topic: "Halbleiter · Maschinenbau · PV · Medizintechnik" },
  { start: 22100, duration: 190, topic: "Closer · Bittersweet" },
];

// Letterboxes — pattern-interrupts idx 8 + 18
const LETTERBOXES = [
  { start: 10182, duration: 120, barHeight: 108 }, // peak refrain
  { start: 22290, duration: 90, barHeight: 108 },  // final closer
];

// 10 KineticMoments from kinetic-moments.json
const KINETIC_MOMENTS = [
  {
    id: "km-01",
    start: 870, end: 1038, position: "bottom" as const, reveal: "tracking" as const,
    words: [
      { text: "22", color: "#f5d37a", size: 108 },
      { text: "JAHRE", color: "#fff5e0", size: 72 },
      { text: "· EIN FEDERSTRICH", color: "#fff5e0", size: 54 },
    ],
  },
  {
    id: "km-02",
    start: 3270, end: 3552, position: "center" as const, reveal: "blur-reveal" as const,
    words: [
      { text: "AUFGEHOBEN", color: "#E30613", size: 84 },
      { text: "EIN SATZ", color: "#fff5e0", size: 54 },
      { text: "SEITE 7", color: "#f5d37a", size: 54 },
    ],
  },
  {
    id: "km-03",
    start: 4452, end: 4827, position: "bottom" as const, reveal: "tracking" as const,
    words: [
      { text: "BRUCH", color: "#E30613", size: 108 },
      { text: "NICHT UPDATE", color: "#fff5e0", size: 48 },
    ],
  },
  {
    id: "km-04",
    start: 5322, end: 5472, position: "bottom" as const, reveal: "tracking" as const,
    words: [
      { text: "#1", color: "#f5d37a", size: 64 },
      { text: "DAS WORT DAS", color: "#fff5e0", size: 54 },
      { text: "ALLES VERRÄT", color: "#f5d37a", size: 72 },
    ],
  },
  {
    id: "km-05",
    start: 7287, end: 7575, position: "bottom" as const, reveal: "mask-wipe" as const,
    words: [
      { text: "#2", color: "#f5d37a", size: 64 },
      { text: "DIE VERBOTENE", color: "#fff5e0", size: 54 },
      { text: "RÜCKWIRKUNG", color: "#f5d37a", size: 78 },
    ],
  },
  {
    id: "km-06",
    start: 7998, end: 8295, position: "bottom" as const, reveal: "mask-wipe" as const,
    words: [
      { text: "STRAFZETTEL", color: "#E30613", size: 84 },
      { text: "FÜR EIN SCHILD · NÄCHSTE WOCHE", color: "#fff5e0", size: 42 },
    ],
  },
  {
    id: "km-07",
    start: 8670, end: 8895, position: "bottom" as const, reveal: "stamp-slam" as const,
    words: [
      { text: "#3", color: "#f5d37a", size: 64 },
      { text: "22 JAHRE", color: "#f5d37a", size: 96 },
      { text: "GELÖSCHT", color: "#E30613", size: 78 },
    ],
  },
  {
    id: "km-08",
    start: 9981, end: 10299, position: "bottom" as const, reveal: "tracking" as const,
    words: [
      { text: "#4", color: "#f5d37a", size: 64 },
      { text: "0 CENT", color: "#E30613", size: 132 },
      { text: "NEUE STEUERN", color: "#fff5e0", size: 48 },
    ],
  },
  {
    id: "km-09",
    start: 13773, end: 14178, position: "bottom" as const, reveal: "mask-wipe" as const,
    words: [
      { text: "GENAU JETZT", color: "#E30613", size: 84 },
      { text: "LETZTE INFRASTRUKTUR WEG", color: "#fff5e0", size: 48 },
    ],
    glitch: true,
  },
  {
    id: "km-10",
    start: 22587, end: 22797, position: "bottom" as const, reveal: "slow-fade" as const,
    words: [
      { text: "DANKE,", color: "#fff5e0", size: 84 },
      { text: "DEUTSCHLAND.", color: "rgba(255,245,224,0.62)", size: 84 },
    ],
  },
];

// ============================================================================
// MASTER COMPOSITION
// ============================================================================

export const BmfIndustriemetalleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 1 — Daniel Master Footage mit Zoom-Layer
          19 Zoom-Keyframes aus phase-4/edit/zoom-keyframes.json
          (push-in/pull-out/ken-burns/snap/crash, scales 1.0-1.25)
          transformOrigin 50% 38-45% (Daniels Gesicht, nie 50/50)
          + breathing micro-drift 0.5% sin wave
          ═══════════════════════════════════════════════════════════════════ */}
      <DanielZoomLayer />

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 2 — B-Roll Placeholder Slots (11)
          Dario: replace these with real footage later.
          ═══════════════════════════════════════════════════════════════════ */}
      {BROLL_SLOTS.map((slot, i) => (
        <Sequence key={`broll-${i}`} from={slot.start} durationInFrames={slot.duration}>
          <BRollPlaceholder topic={slot.topic} label={`B-ROLL ${String(i + 1).padStart(2, "0")}`} />
        </Sequence>
      ))}

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 3 — LOCOS Color Grade (11 segments, cross-faded)
          ═══════════════════════════════════════════════════════════════════ */}
      <LocosColorGrade />

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 4 — 39 Overlays (ordered by frame_start)
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ovl-001 — DanielLowerThirdStatCard 5 STUNDEN (hook anchor, col_001) */}
      <Sequence from={O["ovl-001"].start} durationInFrames={O["ovl-001"].end - O["ovl-001"].start}>
        <DanielLowerThirdStatCard
          heroLabel="5"
          heroUnit="STUNDEN"
          sub="NACHTSCHICHT AN EINEM THEMA"
        />
      </Sequence>

      {/* ovl-002 — BMFDocumentCard (right-split) */}
      <Sequence from={O["ovl-002"].start} durationInFrames={O["ovl-002"].end - O["ovl-002"].start}>
        <BMFDocumentCard />
      </Sequence>

      {/* ovl-003 — KineticMoment 22 JAHRE · EIN FEDERSTRICH (top) */}
      {/* Handled by km-01 KineticMoment below */}

      {/* ovl-004 — OhneTriptychon */}
      <Sequence from={O["ovl-004"].start} durationInFrames={O["ovl-004"].end - O["ovl-004"].start}>
        <OhneTriptychon />
      </Sequence>

      {/* ovl-005 — FullscreenTakeover 0 CENT MEHR STEUERN
          fontSize 560 → 380 (560 war zu groß für 1920, Text lief links raus) */}
      <Sequence from={O["ovl-005"].start} durationInFrames={O["ovl-005"].end - O["ovl-005"].start}>
        <FullscreenTakeover
          text="0 CENT"
          variant="impact"
          fontSize={380}
          color="#E30613"
          bgColor="#161514"
          accentColor="#E30613"
          fontFamily="Orbitron, sans-serif"
          fontWeight={900}
        />
      </Sequence>

      {/* ovl-006 — CTALowerThird (soft-CTA link in description) */}
      <Sequence from={O["ovl-006"].start} durationInFrames={O["ovl-006"].end - O["ovl-006"].start}>
        <CTALowerThird />
      </Sequence>

      {/* ovl-007 — ElementChipRow (In · Ga · Ge) */}
      <Sequence from={O["ovl-007"].start} durationInFrames={O["ovl-007"].end - O["ovl-007"].start}>
        <ElementChipRow />
      </Sequence>

      {/* ovl-008 — ZollfreilagerFlowSplit */}
      <Sequence from={O["ovl-008"].start} durationInFrames={O["ovl-008"].end - O["ovl-008"].start}>
        <ZollfreilagerFlowSplit />
      </Sequence>

      {/* ovl-009 — BMF2004DocumentCard (sepia + seal stamp) */}
      <Sequence from={O["ovl-009"].start} durationInFrames={O["ovl-009"].end - O["ovl-009"].start}>
        <BMF2004DocumentCard />
      </Sequence>

      {/* ovl-010 — KineticMoment AUFGEHOBEN (stamp-slam) handled by km-02 */}

      {/* ovl-011 — DonnerstagNewsCard */}
      <Sequence from={O["ovl-011"].start} durationInFrames={O["ovl-011"].end - O["ovl-011"].start}>
        <DonnerstagNewsCard />
      </Sequence>

      {/* ovl-012 — KineticMoment BRUCH NICHT UPDATE handled by km-03 */}

      {/* ovl-013 — ListicleCounterStatCard 1/4 VIER DINGE */}
      <Sequence from={O["ovl-013"].start} durationInFrames={O["ovl-013"].end - O["ovl-013"].start}>
        <ListicleCounterStatCard />
      </Sequence>

      {/* ovl-014 — KineticMoment #1 (km-04) */}

      {/* ovl-015 — KobaltFullscreen (already built, CENTERPIECE) */}
      <Sequence from={O["ovl-015"].start} durationInFrames={O["ovl-015"].end - O["ovl-015"].start}>
        <DemoSceneKobaltFullscreen />
      </Sequence>

      {/* ovl-016 — EUCriticalIconRow (right-split) — DISABLED 2026-04-14
          Grund: Frame-Range 6909-7278 läuft VOLLSTÄNDIG innerhalb der
          KobaltFullscreen-Sequence (5838-7278). EUCriticalIconRow würde
          über dem Centerpiece liegen und den Fullscreen-Takeover-Effekt
          brechen. Entweder shift to 7278+ oder komplett weglassen. */}
      {/* <Sequence from={O["ovl-016"].start} durationInFrames={O["ovl-016"].end - O["ovl-016"].start}>
        <EUCriticalIconRow />
      </Sequence> */}

      {/* ovl-017 — KineticMoment #2 RUECKWIRKUNG (km-05) */}

      {/* ovl-018 — HighlighterDocumentExcerpt */}
      <Sequence from={O["ovl-018"].start} durationInFrames={O["ovl-018"].end - O["ovl-018"].start}>
        <HighlighterDocumentExcerpt />
      </Sequence>

      {/* ovl-019 — KineticMoment STRAFZETTEL (km-06) */}

      {/* ovl-020 — KineticMoment #3 22 JAHRE GELOESCHT (km-07) */}

      {/* ovl-021 — QuoteCard BMF-Schreiben aufgehoben */}
      <Sequence from={O["ovl-021"].start} durationInFrames={O["ovl-021"].end - O["ovl-021"].start}>
        <div
          style={{
            position: "absolute",
            left: 1200,
            top: 260,
            width: 660,
            height: 520,
          }}
        >
          <QuoteCard
            quote="Das BMF-Schreiben vom 28. Januar 2004 wird damit aufgehoben."
            author="BMF-SCHREIBEN · 9. APRIL 2026 · SEITE 7"
            fontFamily="Playfair Display, serif"
            fontWeight={700}
          />
        </div>
      </Sequence>

      {/* ovl-022 — KineticMoment #4 0 CENT NEUE STEUERN (km-08) */}

      {/* ovl-023 — PercentDownStatCard 19% */}
      <Sequence from={O["ovl-023"].start} durationInFrames={O["ovl-023"].end - O["ovl-023"].start}>
        <PercentDownStatCard />
      </Sequence>

      {/* ovl-024 — NullEuroBilanzFullscreen (custom 2-column fullscreen) */}
      <Sequence from={O["ovl-024"].start} durationInFrames={O["ovl-024"].end - O["ovl-024"].start}>
        <NullEuroBilanzFullscreen />
      </Sequence>

      {/* ovl-025 — TwoDateTimelineSplit */}
      <Sequence from={O["ovl-025"].start} durationInFrames={O["ovl-025"].end - O["ovl-025"].start}>
        <TwoDateTimelineSplit />
      </Sequence>

      {/* ovl-026 — ChinaBekanntmachungDocumentCard */}
      <Sequence from={O["ovl-026"].start} durationInFrames={O["ovl-026"].end - O["ovl-026"].start}>
        <ChinaBekanntmachungDocumentCard />
      </Sequence>

      {/* ovl-027 — PREIS-EXPLOSION 3-Bar-Chart (inline, LOCOS brand)
          ChartBuild (library) ist eine Line-Chart — rendert 2 Punkte als
          flache Linie, visuell no-op. Ersetzt durch inline 3-Bar-Chart mit
          GALLIUM / GERMANIUM / ANTIMON per Skript. */}
      <Sequence from={O["ovl-027"].start} durationInFrames={O["ovl-027"].end - O["ovl-027"].start}>
        <PriceExplosionBars />
      </Sequence>

      {/* ovl-028 — HorizontalChronologyTimeline (4-dot metals chronology) */}
      <Sequence from={O["ovl-028"].start} durationInFrames={O["ovl-028"].end - O["ovl-028"].start}>
        <HorizontalChronologyTimeline />
      </Sequence>

      {/* ovl-029 — EUKrisendialogNewsCard */}
      <Sequence from={O["ovl-029"].start} durationInFrames={O["ovl-029"].end - O["ovl-029"].start}>
        <EUKrisendialogNewsCard />
      </Sequence>

      {/* ovl-030 — KineticMoment GENAU JETZT (glitch, km-09) */}

      {/* ovl-031 — SplitNarrative Reserven CN/RU up vs DE down */}
      <Sequence from={O["ovl-031"].start} durationInFrames={O["ovl-031"].end - O["ovl-031"].start}>
        <SplitNarrative
          left={{
            title: "CN · RU",
            subtitle: "RESERVEN AUFBAU",
            color: "#d4a017",
            bgColor: "#161514",
          }}
          right={{
            title: "DE",
            subtitle: "RESERVEN ABBAU",
            color: "#E30613",
            bgColor: "#1a1918",
          }}
          dividerColor="#d4a017"
          animationStyle="simultaneous"
        />
      </Sequence>

      {/* ovl-032 — TrustCheckmarkStatCard */}
      <Sequence from={O["ovl-032"].start} durationInFrames={O["ovl-032"].end - O["ovl-032"].start}>
        <TrustCheckmarkStatCard />
      </Sequence>

      {/* ovl-033 — QuoteCard Nicht-Beanstandungsklausel */}
      <Sequence from={O["ovl-033"].start} durationInFrames={O["ovl-033"].end - O["ovl-033"].start}>
        <div
          style={{
            position: "absolute",
            left: 1200,
            top: 260,
            width: 680,
            height: 520,
          }}
        >
          <QuoteCard
            quote="Nicht-Beanstandungsklausel — Alle Altkäufe bleiben umsatzsteuerfrei."
            author="BMF § 4 NR. 4B"
            fontFamily="Playfair Display, serif"
            fontWeight={700}
          />
        </div>
      </Sequence>

      {/* ovl-034 — SchweizLocationCard (warm payoff) */}
      <Sequence from={O["ovl-034"].start} durationInFrames={O["ovl-034"].end - O["ovl-034"].start}>
        <SchweizLocationCard />
      </Sequence>

      {/* ovl-035 — CoreMessageStatCard ANTIZYKLISCH */}
      <Sequence from={O["ovl-035"].start} durationInFrames={O["ovl-035"].end - O["ovl-035"].start}>
        <CoreMessageStatCard />
      </Sequence>

      {/* ovl-new-001 — HandelsblattFAZNewsCard (CTA dead-zone filler) */}
      <Sequence from={O["ovl-new-001"].start} durationInFrames={O["ovl-new-001"].end - O["ovl-new-001"].start}>
        <DemoSceneHandelsblattFAZNewsCard />
      </Sequence>

      {/* ovl-036 — HardCTALowerThird */}
      <Sequence from={O["ovl-036"].start} durationInFrames={O["ovl-036"].end - O["ovl-036"].start}>
        <HardCTALowerThird />
      </Sequence>

      {/* ovl-037 — AuthorityTimeline */}
      <Sequence from={O["ovl-037"].start} durationInFrames={O["ovl-037"].end - O["ovl-037"].start}>
        <AuthorityTimeline />
      </Sequence>

      {/* ovl-038 — KineticMoment DANKE DEUTSCHLAND (km-10, slow-fade) */}

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 5 — 10 KineticMoments (km-01 .. km-10)
          ═══════════════════════════════════════════════════════════════════ */}
      {KINETIC_MOMENTS.map((km) => (
        <Sequence
          key={km.id}
          from={km.start}
          durationInFrames={km.end - km.start}
          name={km.id}
        >
          <KineticMoment
            words={km.words}
            revealType={km.reveal}
            position={km.position}
            staggerFrames={4}
            enableGlitch={km.glitch}
          />
        </Sequence>
      ))}

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 6 — 7 Chapter Title Cards — DISABLED 2026-04-14
          Grund: Chapters sind Fullscreen-Dim-Overlays die mit anderen
          Content-Layern kollidieren:
          - Chapter 03 (7287-7467) + km-05 RUECKWIRKUNG (7287-7575)
          - Chapter 04 (8670-8850) + km-07 "22 JAHRE GELOESCHT" (8670-8895)
          - Chapter 05 (11100-11280) + NullEuroBilanzFullscreen (10872-11205)
            + TwoDateTimelineSplit (11259-11535)
          - Chapter 07 (22587-22797) + km-10 DANKE DEUTSCHLAND (22587-22797)
          Wieder aktivieren nach Chapter-Timing-Rework.
          ═══════════════════════════════════════════════════════════════════ */}
      {/* {CHAPTERS.map((ch, i) => (
        <Sequence
          key={`chapter-${i}`}
          from={ch.start}
          durationInFrames={ch.end - ch.start}
          name={ch.num}
        >
          <ChapterCard chapterNumber={ch.num} title={ch.title} subtitle={ch.sub} />
        </Sequence>
      ))} */}

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 7 — 2 Letterboxes (pattern interrupts)
          ═══════════════════════════════════════════════════════════════════ */}
      {LETTERBOXES.map((lb, i) => (
        <Sequence
          key={`letterbox-${i}`}
          from={lb.start}
          durationInFrames={lb.duration}
        >
          <Letterbox barHeight={lb.barHeight} />
        </Sequence>
      ))}

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 8 — Burned-in Captions (176 segments) — DISABLED 2026-04-14
          User request: "die durchgehenden subtitels fliegen erstmal raus".
          Wieder aktivieren durch Uncomment + Import-Zeile oben.
          ═══════════════════════════════════════════════════════════════════ */}
      {/* <BmfCaptions /> */}

      {/* ═══════════════════════════════════════════════════════════════════
          SFX / AUDIO — TODO
          ═══════════════════════════════════════════════════════════════════
          70 SFX cues defined in pipeline-runs/daniel-bmf-industriemetalle/
          phase-4/sound/sfx-cue-sheet.json

          Audio files referenced in cues (public/sfx/daniel-bmf/*.wav) do not
          yet exist. Once Dario sources them from Epidemic Sound, wire them in
          here as <Sequence from={cue.frame}><Audio src={...} volume={cue.volume} /></Sequence>

          Key signature moments from the cue sheet:
            sfx-001  frame 0      music bed start (tense-investigation)
            sfx-015  frame 5838   Kobalt DEEP_BOOM_2 + 2.73s riser
            sfx-022  frame 9981   Null-Cent DEEP_BOOM_1
            sfx-030  frame 10872  0,00 EUR silence-before-impact
            sfx-055  frame 17079  Schweiz tonal-whoosh + warm-bass-hit
            sfx-068  frame 22587  DANKE DEUTSCHLAND DEEP_BOOM_3 + silence-freeze

          Existing public/sfx/epidemic/ files usable as interim:
            - boom-low.wav, boom-ultra-low.wav → deep booms
            - riser-long-trailer.wav, riser-suspenseful.wav → risers
            - glitch-hit.wav → ovl-030 glitch
            - paper-rustle.wav → BMF doc entrances
            - keyboard-click.wav → KineticMoment foley
            - tracker-suspense.mp3, particle-emission-dark.mp3 → music beds
      */}
    </AbsoluteFill>
  );
};

export default BmfIndustriemetalleVideo;
