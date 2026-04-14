import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, interpolate, useCurrentFrame } from "remotion";

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
// ListicleCounterStatCard removed in F.2 — ovl-013 now uses BmfKineticStack
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
// ChapterCard replaced by ChapterTransition3D in F.8
import { ChapterTransition3D } from "../../components/library/remotion-coder/ChapterTransition3D";
// KineticMoment removed in F.2 — replaced by BmfKineticStack for all 11 moments
import BmfKineticStack from "./BmfKineticStack";
import BmfBRoll11IconsCollage from "./BmfBRoll11IconsCollage";
import LocosColorGrade from "./LocosColorGrade";
import BmfSoundDesign from "./BmfSoundDesign";
import { KenBurns } from "../../components/KenBurns";
import { AuroraTextEffect } from "../../components/library/text/AuroraTextEffect";
// import BmfCaptions from "./BmfCaptions"; // DISABLED 2026-04-14 per user request

// Shared library components
import { FullscreenTakeover } from "../../components/FullscreenTakeover";
import { Letterbox } from "../../components/Letterbox";
import { BigQuoteCard3D } from "../../components/library/remotion-coder/BigQuoteCard3D";
import { FlatEuropeMap3D } from "../../components/library/remotion-coder/FlatEuropeMap3D";

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
  "ovl-001": { start: 162, end: 249 },        // DanielLowerThirdStatCard (F.5 word-sync "5"@5.42s)
  "ovl-002": { start: 653, end: 856 },        // BMFDocumentCard (F.1 word-sync: "9."→"rausgeschickt")
  "ovl-003": { start: 887, end: 1041 },       // Kinetic 22 JAHRE GESTOPPT (F.2 D4 wording, word-sync)
  "ovl-004": { start: 1040, end: 1166 },      // OhneTriptychon → AnimatedBulletList (F.6)
  "ovl-005": { start: 1193, end: 1394 },      // FullscreenTakeover 0 CENT (F.7 word-sync "Verrückte")
  "ovl-006": { start: 1606, end: 1805 },      // CTALowerThird (F.7 word-sync "ich"@53.54s)
  "ovl-007": { start: 2078, end: 2199 },      // ElementChipRow (F.6 word-sync "Industriemetalle")
  "ovl-008": { start: 2338, end: 2552 },      // ZollfreilagerFlowSplit (F.7 word-sync)
  "ovl-009": { start: 3079, end: 3184 },      // BMF2004DocumentCard (F.1 word-sync: "2004" mention)
  "ovl-010": { start: 3385, end: 3450 },      // Kinetic AUFGEHOBEN (F.2 word-sync + D5 cap)
  "ovl-011": { start: 3750, end: 4104 },      // DonnerstagNewsCard
  "ovl-012": { start: 4690, end: 4900 },      // Kinetic BRUCH NICHT UPDATE (F.2 word-sync)
  "ovl-013": { start: 4910, end: 5200 },      // Kinetic Counter 1/4 VIER DINGE (F.2 was ListicleCounterStatCard)
  "ovl-014": { start: 5385, end: 5475 },      // Kinetic Counter #1 DAS WORT (F.2 word-sync)
  "ovl-015": { start: 5838, end: 7035 },      // KobaltFullscreen + passsage backdrop (F.7 D5 cap, shortened)
  "ovl-016": { start: 6909, end: 7278 },      // EUCriticalIconRow
  "ovl-017": { start: 7300, end: 7570 },      // Kinetic Counter #2 RÜCKWIRKUNG (F.2 word-sync)
  "ovl-018": { start: 7495, end: 7980 },      // HighlighterDocumentExcerpt (F.1 word-sync: "wörtlich")
  "ovl-019": { start: 8041, end: 8156 },      // Kinetic STRAFZETTEL (F.2 word-sync)
  "ovl-020": { start: 8700, end: 8780 },      // Kinetic Counter #3 22 JAHRE GELÖSCHT (F.2 word-sync)
  "ovl-021": { start: 9596, end: 9870 },      // BigQuoteCard3D — aufgehoben (F.6 word-sync "2004")
  "ovl-022": { start: 10116, end: 10305 },    // Kinetic Counter #4 0 CENT NEUE STEUERN (F.2 word-sync)
  "ovl-023": { start: 10373, end: 10700 },    // PercentDownStatCard 19% (F.5 word-sync "19"@345.76)
  "ovl-024": { start: 11031, end: 11210 },    // NullEuroBilanzFullscreen (F.5 word-sync "0"@367.70)
  "ovl-025": { start: 11260, end: 11535 },    // TwoDateTimelineSplit → HistoricalTimeline3D (F.3)
  "ovl-026": { start: 11535, end: 12000 },    // ChinaBekanntmachungDocumentCard (F.1 editorial trim)
  "ovl-027": { start: 12334, end: 12930 },    // PriceExplosionBars real charts (F.3 word-sync Gallium→437)
  "ovl-028": { start: 12230, end: 13443 },    // HorizontalChronologyTimeline → HistoricalTimeline3D (F.3 extended)
  "ovl-029": { start: 13434, end: 13767 },    // EUKrisendialogNewsCard
  "ovl-030": { start: 14035, end: 14200 },    // Kinetic GENAU JETZT (F.2 word-sync)
  "ovl-031": { start: 14795, end: 15083 },    // SplitNarrative Reserven → FlatEuropeMap3D (F.7)
  "ovl-032": { start: 15660, end: 15800 },    // TrustCheckmarkStatCard → Safe3D (F.5 word-sync "Vertrauensschutz")
  "ovl-033": { start: 15950, end: 16400 },    // BigQuoteCard3D Nicht-Beanstandung (F.6)
  "ovl-034": { start: 17278, end: 17550 },    // SchweizLocationCard (F.7 word-sync "Schweiz")
  "ovl-035": { start: 18200, end: 18540 },    // CoreMessageStatCard → GlareCard3D (F.5)
  "ovl-036": { start: 19980, end: 20690 },    // HardCTALowerThird 3-phase + BorderBeam (F.9)
  "ovl-037": { start: 21262, end: 21790 },    // AuthorityTimeline → GlareCard3D (F.3 word-sync "20")
  "ovl-038": { start: 22620, end: 22800 },    // Kinetic DANKE DEUTSCHLAND via AuroraTextEffect (F.2)
  "ovl-new-001": { start: 19350, end: 19980 }, // HandelsblattFAZNewsCard
} as const;

// Chapter title cards (F.8 re-enabled with ChapterTransition3D + collision-adjusted ranges)
// KAP02/03/04/07 shifted by ±30 frames to avoid collision with F.2 kinetic moments
// and F.5 NullEuroBilanz. Ranges verified clean per PHASE-F-REDESIGN-PLAN.md section 5.
const CHAPTERS = [
  { start: 0, end: 78, num: "KAPITEL 01", title: "FÜNF STUNDEN NACHTSCHICHT", sub: "WAS MIR GESTERN KLAR GEWORDEN IST" },
  { start: 4620, end: 4800, num: "KAPITEL 02", title: "DAS WORT DAS ALLES VERRÄT", sub: "#1 · KOBALT · DIE SMOKING GUN" },
  { start: 7257, end: 7437, num: "KAPITEL 03", title: "DIE VERBOTENE RÜCKWIRKUNG", sub: "#2 · 22 JAHRE · GESTOPPT" },
  { start: 8640, end: 8820, num: "KAPITEL 04", title: "DAS NULL-CENT-PARADOX", sub: "#3 · DEUTSCHLAND BEKOMMT GAR NICHTS" },
  { start: 11100, end: 11280, num: "KAPITEL 05", title: "DAS MUSTER", sub: "#4 · KEIN ZUFALL · EINE KETTE" },
  { start: 16380, end: 16560, num: "KAPITEL 06", title: "DIE LÖSUNG", sub: "SCHWEIZ · GOLD-GRADE · WARMER PAYOFF" },
  { start: 22437, end: 22617, num: "KAPITEL 07", title: "DANKE, DEUTSCHLAND.", sub: "FINAL · COLD ACCENT · SLOW FADE" },
];

// B-Roll slots — canonical frame ranges from phase-4/edit/b-roll-slots.md
// (source: phase-1/1D-pacing-plan.json b_roll_targets[], 11 targets, ~74s total)
// Fixed 2026-04-15 — Phase 6 build agent had mismatched frame ranges that
// didn't align with Daniel's caption timing at the slot beats.
//
// Asset types (Phase B 2026-04-15):
//   still            — nano-banana-2 generated PNG, animated via <KenBurns>
//   video            — fal.ai Veo 3.1 generated mp4, rendered via <OffthreadVideo>
//   motion-graphics  — pure inline Remotion component (no external asset)
type BRollSlot = {
  slot: number;
  start: number;
  duration: number;
  topic: string;
} & (
  | {
      type: "still";
      asset: string;
      // KenBurns params — fine-tuned per slot (direction of drift matches the
      // visual storytelling beat, zoom amount matches desired intensity).
      zoomStart: number;
      zoomEnd: number;
      driftX: number;
      driftY: number;
    }
  | {
      type: "video";
      asset: string;
      // Frames to skip from the start of the Veo clip. Veo clips drift on
      // their first/last frames; trimming the opening also lets us place the
      // punchier middle section inside the master slot window.
      startFrom: number;
    }
  | {
      type: "motion-graphics";
    }
);

const BROLL_SLOTS: BRollSlot[] = [
  { slot: 1, start: 1170, duration: 210, topic: "BMF Berlin · 0-Cent-Ironie",
    type: "still", asset: "bmf/b-roll/slot-01-bmf-berlin.png",
    zoomStart: 1.00, zoomEnd: 1.08, driftX: 0, driftY: -20 },                       // 39-46s, push-in + drift up to reveal facade height

  { slot: 2, start: 1800, duration: 210, topic: "PDF BMF-Schreiben Close-Up",
    type: "still", asset: "bmf/b-roll/slot-02-pdf-bmf-schreiben.png",
    zoomStart: 1.00, zoomEnd: 1.12, driftX: 0, driftY: -15 },                       // 60-67s, push-in toward eagle emblem

  { slot: 3, start: 2280, duration: 180, topic: "Zollfreilager · Industriemetall-Barren",
    type: "still", asset: "bmf/b-roll/slot-03-zollfreilager-ingots.png",
    zoomStart: 1.00, zoomEnd: 1.10, driftX: 0, driftY: 0 },                         // 76-82s, symmetric push-in along vanishing point

  { slot: 4, start: 3750, duration: 210, topic: "Telefon · Donnerstagabend 20 Uhr",
    type: "video", asset: "bmf/b-roll/slot-04-telefon-donnerstag.mp4",
    startFrom: 30 },                                                                 // 125-132s, skip first 1s of slow hand reach (per Dario feedback)

  { slot: 5, start: 6750, duration: 210, topic: "Kobalt · EU-Liste kritische Rohstoffe",
    type: "video", asset: "bmf/b-roll/slot-05-kobalt-mine.mp4",
    startFrom: 15 },                                                                 // 225-232s, skip first 0.5s typical Veo drift

  { slot: 6, start: 7860, duration: 180, topic: "Verkehrsschild · Strafzettel-Metapher",
    type: "still", asset: "bmf/b-roll/slot-06-strafzettel-windschutzscheibe.png",
    zoomStart: 1.00, zoomEnd: 1.14, driftX: -20, driftY: 0 },                       // 262-268s, push-in toward ticket, slight left drift

  { slot: 7, start: 12210, duration: 210, topic: "China Shanghai Hafen · Exportkontrollen",
    type: "still", asset: "bmf/b-roll/slot-07-shanghai-port.png",
    zoomStart: 1.00, zoomEnd: 1.08, driftX: 25, driftY: 0 },                        // 407-414s, slight right drift across the port span

  { slot: 8, start: 13650, duration: 210, topic: "Chipfabrik Reinraum · Wafer-Robotik",
    type: "video", asset: "bmf/b-roll/slot-08-cleanroom-wafer.mp4",
    startFrom: 15 },                                                                 // 455-462s, skip first 0.5s drift

  { slot: 9, start: 14790, duration: 210, topic: "Strategische Reserven · Bunker",
    type: "still", asset: "bmf/b-roll/slot-09-strategic-reserves-bunker.png",
    zoomStart: 1.00, zoomEnd: 1.12, driftX: 0, driftY: 0 },                         // 493-500s, slow push down central aisle

  { slot: 10, start: 17850, duration: 210, topic: "Schweiz Alpen · Warm Payoff",
    type: "still", asset: "bmf/b-roll/slot-10-schweiz-alpen.png",
    zoomStart: 1.00, zoomEnd: 1.10, driftX: 20, driftY: -8 },                       // 595-602s, warm slow push with slight right-up drift into the sunset

  { slot: 11, start: 20640, duration: 180, topic: "Branchen-Icons · Halbleiter/Maschinen/PV/Medizin",
    type: "motion-graphics" },                                                       // 688-694s, BmfBRoll11IconsCollage
];

// Letterboxes — pattern-interrupts idx 8 + 18
const LETTERBOXES = [
  { start: 10182, duration: 120, barHeight: 108 }, // peak refrain
  { start: 22290, duration: 90, barHeight: 108 },  // final closer
];

// Phase F.2 — 11 Kinetic Moments rewritten with BmfKineticStack + HighlightedWord
// style. Word-sync via captions.ts word-starts (see PHASE-F-REDESIGN-PLAN.md).
// D4 wording applied (FEDERSTRICH → GESTOPPT, etc.). All 5 counter moments
// (#1-#4 + 1/4) use the same BmfKineticStack counter treatment per D1.
// Frame ranges live in the O map above; per-word startFrames are relative
// to each Sequence.

// Phase F.7 — KobaltBackdropPassage: ghosted passage.png behind Kobalt centerpiece
const KobaltBackdropPassage: React.FC = () => {
  const frame = useCurrentFrame();
  // Fade in after the initial Kobalt punch (@ frame 30 of the 1197f Sequence)
  const opacity = interpolate(frame, [150, 220], [0, 0.32], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Slow parallax drift across the duration
  const kbScale = interpolate(frame, [0, 1197], [1.0, 1.08]);
  const kbDriftY = interpolate(frame, [0, 1197], [0, -18]);

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <Img
        src={staticFile("assets/bmf-schreiben-passsage.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${kbScale}) translateY(${kbDriftY}px)`,
          filter: "brightness(0.78) contrast(1.15) saturate(0.92)",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================================
// MASTER COMPOSITION
// ============================================================================

export const BmfIndustriemetalleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 0 — Sound Design (6 music beds + 70 SFX cues)
          Phase A Session 2 — epidemic library placeholders, signature
          samples arrive in Phase B
          ═══════════════════════════════════════════════════════════════════ */}
      <BmfSoundDesign />

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
      {BROLL_SLOTS.map((slot) => {
        const key = `broll-${slot.slot}`;
        if (slot.type === "motion-graphics") {
          return (
            <Sequence key={key} from={slot.start} durationInFrames={slot.duration}>
              <BmfBRoll11IconsCollage />
            </Sequence>
          );
        }
        if (slot.type === "still") {
          return (
            <Sequence key={key} from={slot.start} durationInFrames={slot.duration}>
              <KenBurns
                src={staticFile(slot.asset)}
                zoomStart={slot.zoomStart}
                zoomEnd={slot.zoomEnd}
                driftX={slot.driftX}
                driftY={slot.driftY}
                duration={slot.duration}
              />
            </Sequence>
          );
        }
        // video
        return (
          <Sequence key={key} from={slot.start} durationInFrames={slot.duration}>
            <OffthreadVideo
              src={staticFile(slot.asset)}
              startFrom={slot.startFrom}
              muted
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Sequence>
        );
      })}

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

      {/* ovl-013 — Kinetic Counter 1/4 VIER DINGE (F.2 was ListicleCounterStatCard) */}
      <Sequence from={O["ovl-013"].start} durationInFrames={O["ovl-013"].end - O["ovl-013"].start}>
        <BmfKineticStack
          position="center"
          counter={{ text: "1 / 4", startFrame: 0, color: "#f5d37a", size: 72 }}
          words={[
            { text: "VIER DINGE", startFrame: 10, size: 108, color: "#fff5e0", variant: "underline", accentColor: "#f5d37a", reveal: "scale" },
            { text: "DIE NIEMAND SEHEN SOLL", startFrame: 32, size: 44, color: "rgba(255,245,224,0.78)", reveal: "track" },
          ]}
        />
      </Sequence>

      {/* ovl-014 — Kinetic Counter #1 DAS WORT DAS ALLES VERRÄT */}
      <Sequence from={O["ovl-014"].start} durationInFrames={O["ovl-014"].end - O["ovl-014"].start}>
        <BmfKineticStack
          position="center"
          counter={{ text: "# 1", startFrame: 0, color: "#f5d37a", size: 64 }}
          words={[
            { text: "DAS WORT", startFrame: 12, size: 96, color: "#fff5e0", reveal: "scale" },
            { text: "DAS ALLES VERRÄT", startFrame: 30, size: 72, color: "#f5d37a", variant: "underline", accentColor: "#f5d37a", reveal: "track" },
          ]}
        />
      </Sequence>

      {/* ovl-015 — KobaltFullscreen + passsage backdrop layer (F.7, shortened to 5838-7035) */}
      <Sequence from={O["ovl-015"].start} durationInFrames={O["ovl-015"].end - O["ovl-015"].start}>
        <KobaltBackdropPassage />
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

      {/* ovl-021 — BigQuoteCard3D BMF-Schreiben aufgehoben (F.6) */}
      <Sequence from={O["ovl-021"].start} durationInFrames={O["ovl-021"].end - O["ovl-021"].start}>
        <BigQuoteCard3D
          quote="Das BMF-Schreiben vom 28. Januar 2004 wird damit aufgehoben."
          author="BMF-Schreiben"
          authorRole="Seite 7 · letzter Satz"
          authorDate="9. April 2026"
          variant="overlay"
          clusterOffsetX={220}
        />
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

      {/* ovl-031 — SplitNarrative → FlatEuropeMap3D Reserven (F.7) */}
      <Sequence from={O["ovl-031"].start} durationInFrames={O["ovl-031"].end - O["ovl-031"].start}>
        <FlatEuropeMap3D
          title="STRATEGISCHE RESERVEN"
          subtitle="CHINA BAUT AUF · EUROPA BAUT AB"
          highlightMarker={{
            city: "BERLIN",
            label: "0 CENT RESERVE",
            countryCode: "DE",
          }}
          variant="fullscreen"
        />
      </Sequence>

      {/* ovl-032 — TrustCheckmarkStatCard */}
      <Sequence from={O["ovl-032"].start} durationInFrames={O["ovl-032"].end - O["ovl-032"].start}>
        <TrustCheckmarkStatCard />
      </Sequence>

      {/* ovl-033 — BigQuoteCard3D Nicht-Beanstandungsklausel (F.6) */}
      <Sequence from={O["ovl-033"].start} durationInFrames={O["ovl-033"].end - O["ovl-033"].start}>
        <BigQuoteCard3D
          quote="Die Nicht-Beanstandungsklausel schützt alle Altbestände. Ihre Reserven bleiben umsatzsteuerfrei."
          author="BMF § 4 Nr. 4b UStG"
          authorRole="Übergangsregelung"
          authorDate="9. April 2026"
          variant="overlay"
          clusterOffsetX={220}
        />
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
          LAYER 5 — 11 Kinetic Moments (F.2 rewrite with BmfKineticStack)
          Counter-moments (ovl-013/014/017/020/022) use identical counter
          treatment per D1. Word-sync to captions.ts word-starts.
          D4 wording: "EIN FEDERSTRICH" → "GESTOPPT".
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ovl-003 — "22 JAHRE GESTOPPT" (ehem. km-01) */}
      <Sequence from={O["ovl-003"].start} durationInFrames={O["ovl-003"].end - O["ovl-003"].start} name="km-01">
        <BmfKineticStack
          position="center"
          words={[
            { text: "22 JAHRE", startFrame: 0, size: 108, color: "#f5d37a", variant: "underline", accentColor: "#f5d37a", reveal: "scale" },
            { text: "GESTOPPT", startFrame: 123, size: 144, color: "#fff5e0", variant: "circle", accentColor: "#E30613", reveal: "scale" },
          ]}
        />
      </Sequence>

      {/* ovl-010 — "AUFGEHOBEN" stamp-slam (ehem. km-02) */}
      <Sequence from={O["ovl-010"].start} durationInFrames={O["ovl-010"].end - O["ovl-010"].start} name="km-02">
        <BmfKineticStack
          position="center"
          words={[
            { text: "AUFGEHOBEN", startFrame: 5, size: 132, color: "#E30613", variant: "both", accentColor: "#E30613", reveal: "scale" },
          ]}
        />
      </Sequence>

      {/* ovl-012 — "BRUCH NICHT UPDATE" (ehem. km-03) */}
      <Sequence from={O["ovl-012"].start} durationInFrames={O["ovl-012"].end - O["ovl-012"].start} name="km-03">
        <BmfKineticStack
          position="center"
          words={[
            { text: "BRUCH", startFrame: 0, size: 160, color: "#E30613", variant: "circle", accentColor: "#E30613", reveal: "scale" },
            { text: "KEIN UPDATE", startFrame: 60, size: 56, color: "#fff5e0", reveal: "track" },
          ]}
        />
      </Sequence>

      {/* ovl-017 — Counter #2 DIE VERBOTENE RÜCKWIRKUNG (ehem. km-05) */}
      <Sequence from={O["ovl-017"].start} durationInFrames={O["ovl-017"].end - O["ovl-017"].start} name="km-05">
        <BmfKineticStack
          position="center"
          counter={{ text: "# 2", startFrame: 0, color: "#f5d37a", size: 64 }}
          words={[
            { text: "DIE VERBOTENE", startFrame: 12, size: 72, color: "#fff5e0", reveal: "scale" },
            { text: "RÜCKWIRKUNG", startFrame: 32, size: 120, color: "#E30613", variant: "circle", accentColor: "#E30613", reveal: "scale" },
          ]}
        />
      </Sequence>

      {/* ovl-019 — "STRAFZETTEL" (ehem. km-06) */}
      <Sequence from={O["ovl-019"].start} durationInFrames={O["ovl-019"].end - O["ovl-019"].start} name="km-06">
        <BmfKineticStack
          position="center"
          words={[
            { text: "STRAFZETTEL", startFrame: 0, size: 128, color: "#E30613", variant: "circle", accentColor: "#E30613", reveal: "scale" },
            { text: "FÜR EIN SCHILD NÄCHSTE WOCHE", startFrame: 40, size: 38, color: "rgba(255,245,224,0.82)", reveal: "track" },
          ]}
        />
      </Sequence>

      {/* ovl-020 — Counter #3 22 JAHRE GELÖSCHT (ehem. km-07) */}
      <Sequence from={O["ovl-020"].start} durationInFrames={O["ovl-020"].end - O["ovl-020"].start} name="km-07">
        <BmfKineticStack
          position="center"
          counter={{ text: "# 3", startFrame: 0, color: "#f5d37a", size: 64 }}
          words={[
            { text: "22 JAHRE", startFrame: 12, size: 108, color: "#f5d37a", reveal: "scale" },
            { text: "GELÖSCHT", startFrame: 32, size: 132, color: "#E30613", variant: "circle", accentColor: "#E30613", reveal: "scale" },
          ]}
        />
      </Sequence>

      {/* ovl-022 — Counter #4 0 CENT NEUE STEUERN (ehem. km-08) */}
      <Sequence from={O["ovl-022"].start} durationInFrames={O["ovl-022"].end - O["ovl-022"].start} name="km-08">
        <BmfKineticStack
          position="center"
          counter={{ text: "# 4", startFrame: 0, color: "#f5d37a", size: 64 }}
          words={[
            { text: "0 CENT", startFrame: 10, size: 180, color: "#E30613", variant: "circle", accentColor: "#E30613", reveal: "scale" },
            { text: "NEUE STEUERN", startFrame: 42, size: 56, color: "#fff5e0", reveal: "track" },
          ]}
        />
      </Sequence>

      {/* ovl-030 — "GENAU JETZT" glitch (ehem. km-09) */}
      <Sequence from={O["ovl-030"].start} durationInFrames={O["ovl-030"].end - O["ovl-030"].start} name="km-09">
        <BmfKineticStack
          position="center"
          words={[
            { text: "GENAU JETZT", startFrame: 0, size: 132, color: "#E30613", variant: "circle", accentColor: "#E30613", reveal: "scale" },
            { text: "LETZTE INFRASTRUKTUR WEG", startFrame: 30, size: 40, color: "rgba(255,245,224,0.82)", reveal: "track" },
          ]}
        />
      </Sequence>

      {/* ovl-038 — "DANKE, DEUTSCHLAND." AuroraTextEffect slow fade (ehem. km-10) */}
      <Sequence from={O["ovl-038"].start} durationInFrames={O["ovl-038"].end - O["ovl-038"].start} name="km-10">
        <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.58)" }}>
          <AuroraTextEffect
            text="DANKE, DEUTSCHLAND."
            fontSize="140px"
            firstColor="#d4a017"
            secondColor="#f5d37a"
            thirdColor="#E30613"
            fourthColor="#fff5e0"
          />
        </AbsoluteFill>
      </Sequence>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 6 — 7 Chapter Title Cards (F.8 re-enabled with ChapterTransition3D)
          Collision-adjusted ranges:
            KAP02 4620-4800 (was 4650-4830, shifted -30 to clear km-04 counter)
            KAP03 7257-7437 (was 7287-7467, shifted -30 to clear km-05 counter)
            KAP04 8640-8820 (was 8670-8850, shifted -30 to clear km-07 counter)
            KAP07 22437-22617 (was 22587-22797, shifted -150 to clear AuroraTextEffect)
          KAP05 near ovl-024 NullEuroBilanz (3f gap); KAP01 + KAP06 clean.
          ═══════════════════════════════════════════════════════════════════ */}
      {CHAPTERS.map((ch, i) => (
        <Sequence
          key={`chapter-${i}`}
          from={ch.start}
          durationInFrames={ch.end - ch.start}
          name={ch.num}
        >
          <ChapterTransition3D
            chapterNumber={ch.num}
            chapterTitle={ch.title}
            chapterSubtitle={ch.sub}
            accentColor="#d4a017"
            paperTextureSrc={staticFile("assets/mbf-schreiben-titelseite.png")}
          />
        </Sequence>
      ))}

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
