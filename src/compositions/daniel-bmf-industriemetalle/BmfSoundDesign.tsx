import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

import { ES_MUSIC, ES_SFX } from "../../components/EpidemicSoundLibrary";

/**
 * BmfSoundDesign — Phase A Sound-Layer (Session 2, 2026-04-15)
 *
 * Wires 70 approved SFX cues (phase-4/sound/sfx-cue-sheet.json) +
 * 6 music beds (phase-4/sound/music-bed-plan.json) into the BMF master
 * composition as absolute-timeline audio layers.
 *
 * Source-of-truth specs (frames, trigger words, intensities):
 *   pipeline-runs/daniel-bmf-industriemetalle/phase-4/sound/sfx-cue-sheet.json
 *   pipeline-runs/daniel-bmf-industriemetalle/phase-4/sound/music-bed-plan.json
 *   pipeline-runs/daniel-bmf-industriemetalle/phase-4/sound/voice-processing-chain.json
 *
 * Asset-Strategy:
 *  - Target WAVs in `public/sfx/daniel-bmf/` do NOT yet exist (Phase B will
 *    source from Epidemic Sound MCP + FOUR Editors pack).
 *  - We map each approved cue to the closest available file in
 *    `public/sfx/epidemic/` via EpidemicSoundLibrary. This is PLACEHOLDER
 *    audio — the character is right (bass-hit vs whoosh vs riser) but exact
 *    signature samples (deep-boom layering, warm-gold hall reverb) still come
 *    in Phase B.
 *  - Cues without any matching library file (breath-in, phone-line) carry
 *    src: null → they render silent with a note.
 *  - Silence cues (`type: "silence"`) and music-change markers do NOT get
 *    audio entries; their job is just to drive music-bed automation and
 *    those drops are expressed inside BmfBed.automation below.
 *
 * Mix:
 *  - Volumes come directly from sfx-cue-sheet.json volume_curve peak values.
 *    They were authored to land the -14 LUFS mix target before voice-chain
 *    processing. Daniel's voice comes from the embedded OffthreadVideo audio.
 *  - Music beds target 0.032-0.034 under voice with sidechain-style ducks
 *    flattened into the automation keyframes (music → 0 before every impact).
 *  - 3-layer deep-boom chain (sub/body/top) is collapsed to a single hit
 *    using BOOM_ULTRA_LOW — the layered version arrives in Phase B.
 */

// ─── SFX cue list (70 approved) ──────────────────────────────────────────

type BmfCue = {
  id: string;
  frame: number;
  durationFrames: number;
  /** Relative path inside public/sfx/ — null = silent placeholder TODO */
  src: string | null;
  volume: number;
  fadeIn?: number;
  fadeOut?: number;
  note?: string;
};

const CUES: BmfCue[] = [
  // sfx-002 foley breath-in @ Leute (no matching library file)
  { id: "sfx-002", frame: 0, durationFrames: 12, src: null, volume: 0, note: "breath-in (no file)" },

  // sfx-004 bass-hit "5 Stunden" (hook bookend, intensity 7, blue)
  { id: "sfx-004", frame: 163, durationFrames: 22, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.05, fadeOut: 14 },

  // sfx-005 short tension riser → "9. April" (1.2s)
  { id: "sfx-005", frame: 630, durationFrames: 37, src: ES_SFX.RISER_SHARP, volume: 0.09, fadeIn: 18, fadeOut: 8 },

  // sfx-007 DEEP BOOM 1/3 — "9. April" Schlussstrich (intensity 10, red)
  { id: "sfx-007", frame: 667, durationFrames: 60, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.10, fadeOut: 30 },

  // sfx-009 medium impact "22 Jahre gestoppt" (red, intensity 7)
  { id: "sfx-009", frame: 913, durationFrames: 18, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.05, fadeOut: 12 },

  // sfx-010-012 metallic staccato trinity "ohne Parlament / Vorwarnung / Uebergangsfristen"
  { id: "sfx-010", frame: 1055, durationFrames: 12, src: ES_SFX.GLITCH_HIT, volume: 0.04, fadeOut: 6 },
  { id: "sfx-011", frame: 1085, durationFrames: 12, src: ES_SFX.GLITCH_HIT, volume: 0.04, fadeOut: 6 },
  { id: "sfx-012", frame: 1117, durationFrames: 14, src: ES_SFX.GLITCH_HIT, volume: 0.045, fadeOut: 6 },

  // sfx-014 high-impact "keinen Cent" (intensity 8, red)
  { id: "sfx-014", frame: 1312, durationFrames: 20, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.07, fadeOut: 14 },

  // sfx-015 dry stinger "nicht einen"
  { id: "sfx-015", frame: 1387, durationFrames: 12, src: ES_SFX.GLITCH_HIT, volume: 0.05, fadeOut: 6 },

  // sfx-016 paper rustle "ich habe es hier vor mir liegen"
  { id: "sfx-016", frame: 1650, durationFrames: 15, src: ES_SFX.PAPER_RUSTLE, volume: 0.018, fadeOut: 8 },

  // sfx-017 soft swoosh section-transition hook→context
  { id: "sfx-017", frame: 1902, durationFrames: 14, src: ES_SFX.WHOOSH_SPACEY, volume: 0.07, fadeOut: 8 },

  // sfx-020/021 soft clicks (Renium, Zollfreilager)
  { id: "sfx-020", frame: 2151, durationFrames: 6, src: ES_SFX.GLASS_CLINK, volume: 0.02, fadeOut: 3 },
  { id: "sfx-021", frame: 2338, durationFrames: 6, src: ES_SFX.GLASS_CLINK, volume: 0.02, fadeOut: 3 },

  // sfx-022/023 dry thuds on 2004 (anchor + echo repeat)
  { id: "sfx-022", frame: 3079, durationFrames: 15, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.04, fadeOut: 8 },
  { id: "sfx-023", frame: 3127, durationFrames: 15, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.05, fadeOut: 8 },

  // sfx-024 hard whip 2004→today (L→R sweep, pan-auto skipped in placeholder)
  { id: "sfx-024", frame: 3267, durationFrames: 14, src: ES_SFX.WHOOSH_DEEP, volume: 0.08, fadeOut: 6 },

  // sfx-025 medium impact "Bruch" (punchline)
  { id: "sfx-025", frame: 4634, durationFrames: 16, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.05, fadeOut: 10 },

  // sfx-028 listicle-1 ding "Erstens"
  { id: "sfx-028", frame: 5308, durationFrames: 14, src: ES_SFX.GLITCH_HIT, volume: 0.06, fadeOut: 6 },

  // sfx-029 medium riser 2.73s → Kobalt (builds to impact @ 5868)
  { id: "sfx-029", frame: 5323, durationFrames: 82, src: ES_SFX.RISER_GRITTY, volume: 0.07, fadeIn: 40, fadeOut: 10 },

  // sfx-030 paper rustle "sieben Seiten BMF-Schreiben"
  { id: "sfx-030", frame: 5403, durationFrames: 18, src: ES_SFX.PAPER_RUSTLE, volume: 0.02, fadeOut: 8 },

  // sfx-032 DEEP BOOM 2/3 — KOBALT CENTERPIECE (intensity 10, red, signature moment)
  { id: "sfx-032", frame: 5868, durationFrames: 75, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.10, fadeOut: 35 },

  // sfx-033 paper rustle "wörtlich vor"
  { id: "sfx-033", frame: 6222, durationFrames: 18, src: ES_SFX.PAPER_RUSTLE, volume: 0.02, fadeOut: 8 },

  // sfx-034 echo-impact "Kobalt EU-Liste"
  { id: "sfx-034", frame: 6909, durationFrames: 14, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.05, fadeOut: 8 },

  // sfx-036 listicle-2 ding "Zweitens"
  { id: "sfx-036", frame: 7286, durationFrames: 14, src: ES_SFX.GLITCH_HIT, volume: 0.06, fadeOut: 6 },

  // sfx-037 soft swoosh polizei-analogie
  { id: "sfx-037", frame: 7994, durationFrames: 12, src: ES_SFX.WHOOSH_SPACEY, volume: 0.07, fadeOut: 6 },

  // sfx-039 listicle-3 ding "Drittens"
  { id: "sfx-039", frame: 8670, durationFrames: 14, src: ES_SFX.GLITCH_HIT, volume: 0.06, fadeOut: 6 },

  // sfx-040 staccato "Keine Parlamentsbeschluesse"
  { id: "sfx-040", frame: 9697, durationFrames: 16, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.05, fadeOut: 10 },

  // sfx-041 staccato "22 Jahre weggewischt"
  { id: "sfx-041", frame: 9795, durationFrames: 16, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.05, fadeOut: 10 },

  // sfx-043 listicle-4 ding "Und viertens"
  { id: "sfx-043", frame: 9981, durationFrames: 14, src: ES_SFX.GLITCH_HIT, volume: 0.06, fadeOut: 6 },

  // sfx-045 hard whip "9. April 26" timeline dot
  { id: "sfx-045", frame: 11256, durationFrames: 10, src: ES_SFX.WHOOSH_DEEP, volume: 0.08, fadeOut: 4 },

  // sfx-046 hard whip "4. Februar 25" timeline dot (reverse sweep)
  { id: "sfx-046", frame: 11396, durationFrames: 10, src: ES_SFX.WHOOSH_DEEP, volume: 0.08, fadeOut: 4 },

  // sfx-047-051 chronology dings (Aug23, Dez23, Sep24, Apr25, Okt25-climax)
  { id: "sfx-047", frame: 12212, durationFrames: 6, src: ES_SFX.GLASS_CLINK, volume: 0.03, fadeOut: 3 },
  { id: "sfx-048", frame: 12669, durationFrames: 6, src: ES_SFX.GLASS_CLINK, volume: 0.03, fadeOut: 3 },
  { id: "sfx-049", frame: 12774, durationFrames: 6, src: ES_SFX.GLASS_CLINK, volume: 0.03, fadeOut: 3 },
  { id: "sfx-050", frame: 13080, durationFrames: 6, src: ES_SFX.GLASS_CLINK, volume: 0.03, fadeOut: 3 },
  { id: "sfx-051", frame: 13434, durationFrames: 8, src: ES_SFX.GLASS_CLINK, volume: 0.035, fadeOut: 4 },

  // sfx-052 MAJOR RISER 8s → "drei Mal duerft ihr raten" (Daniel signature build)
  { id: "sfx-052", frame: 14370, durationFrames: 240, src: ES_SFX.RISER_LONG_TRAILER, volume: 0.08, fadeIn: 90, fadeOut: 16 },

  // sfx-054 high-impact "drei Mal duerft ihr raten" (intensity 8)
  { id: "sfx-054", frame: 14609, durationFrames: 22, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.07, fadeOut: 14 },

  // sfx-056 soft click "Vertrauensschutz"
  { id: "sfx-056", frame: 15660, durationFrames: 6, src: ES_SFX.GLASS_CLINK, volume: 0.02, fadeOut: 3 },

  // sfx-057 soft ding "Euer bestehendes Depot"
  { id: "sfx-057", frame: 16080, durationFrames: 6, src: ES_SFX.GLASS_CLINK, volume: 0.02, fadeOut: 3 },

  // sfx-058 phone-line subtle memory foley (no matching library file)
  { id: "sfx-058", frame: 17079, durationFrames: 9, src: null, volume: 0, note: "phone-line-subtle (no file)" },

  // sfx-059 tonal whoosh → Schweiz solution reveal (warm color-shift marker)
  { id: "sfx-059", frame: 17275, durationFrames: 14, src: ES_SFX.WHOOSH_SPACEY, volume: 0.08, fadeOut: 6 },

  // sfx-060 warm bass-hit "Schweiz" (gold, resolution)
  { id: "sfx-060", frame: 17293, durationFrames: 16, src: ES_SFX.BOOM_LOW, volume: 0.05, fadeOut: 10 },

  // sfx-061 warm bass-hit "antizyklisch"
  { id: "sfx-061", frame: 18823, durationFrames: 14, src: ES_SFX.BOOM_LOW, volume: 0.045, fadeOut: 8 },

  // sfx-063 paper rustle "Original-PDF Link"
  { id: "sfx-063", frame: 19975, durationFrames: 18, src: ES_SFX.PAPER_RUSTLE, volume: 0.022, fadeOut: 8 },

  // sfx-064 dry thud "20 Jahren Finanzbranche" (trust anchor, gold)
  { id: "sfx-064", frame: 21244, durationFrames: 14, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.045, fadeOut: 8 },

  // sfx-065 bass-hit "Das habe ich noch nicht erlebt"
  { id: "sfx-065", frame: 22144, durationFrames: 16, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.055, fadeOut: 10 },

  // sfx-066 bass-hit "wirklich bitter"
  { id: "sfx-066", frame: 22572, durationFrames: 16, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.055, fadeOut: 10 },

  // sfx-069 DEEP BOOM 3/3 — "Danke Deutschland" closer (intensity 10, longest tail)
  { id: "sfx-069", frame: 22649, durationFrames: 90, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.10, fadeOut: 45 },

  // sfx-070 soft outro stinger (handled by mb-06 swell instead)
  { id: "sfx-070", frame: 22691, durationFrames: 60, src: null, volume: 0, note: "covered by mb-06 swell" },
];

// ─── Music beds (6 segments with crossfade automation) ───────────────────

type BmfBed = {
  id: string;
  src: string;
  /** Absolute start frame (can overlap with previous bed's out-fade) */
  from: number;
  /** Absolute end frame (can overlap with next bed's in-fade) */
  to: number;
  /** [absoluteFrame, volume] automation keyframes — linearly interpolated */
  automation: Array<[number, number]>;
};

const BEDS: BmfBed[] = [
  // mb-01 HOOK_PAIN + SHOCK_ANCHOR + CONTEXT_VALLEY + RISING_BMF_2004 (0-155s, E-Moll tense-investigation)
  {
    id: "mb-01",
    src: ES_MUSIC.TRACKER,
    from: 0,
    to: 4740,
    automation: [
      [0, 0],
      [60, 0.032],
      [154, 0],
      [180, 0.032],
      [637, 0],
      [700, 0.032],
      [894, 0],
      [928, 0.032],
      [1284, 0],
      [1330, 0.032],
      [4560, 0.032],
      [4740, 0],
    ],
  },

  // mb-02 HANDELSPARTNER + KOBALT + RUECKWIRKUNG + DRITTENS (155-345s, C-Moll rising-outrage)
  {
    id: "mb-02",
    src: ES_MUSIC.PARTICLE_EMISSION,
    from: 4560,
    to: 10440,
    automation: [
      [4560, 0],
      [4740, 0.034],
      [5292, 0],
      [5340, 0.034],
      [5823, 0],
      [5970, 0.034],
      [7271, 0],
      [7310, 0.034],
      [8655, 0],
      [8695, 0.034],
      [9966, 0],
      [10005, 0.034],
      [10260, 0.034],
      [10440, 0],
    ],
  },

  // mb-03 NULL_CENT + CHINA_CHRONOLOGIE + DREI_MAL (345-500s, F-Moll cold-pattern-reveal)
  {
    id: "mb-03",
    src: ES_MUSIC.CONFIDENTIALITY,
    from: 10260,
    to: 15180,
    automation: [
      [10260, 0],
      [10440, 0.033],
      [10855, 0],
      [10920, 0.033],
      [14130, 0.040],
      [14594, 0],
      [14700, 0.033],
      [14940, 0.033],
      [15180, 0],
    ],
  },

  // mb-04 OPTIONS + SCHWEIZ + ANTIZYKLISCH (500-640s, G-Dur warm resolute-solution)
  {
    id: "mb-04",
    src: ES_MUSIC.CURTAINS_FALL,
    from: 14940,
    to: 19290,
    automation: [
      [14940, 0],
      [15075, 0.024],
      [15300, 0.033],
      [17263, 0],
      [17293, 0.045],
      [17500, 0.033],
      [18823, 0.040],
      [18900, 0.033],
      [19050, 0.024],
      [19290, 0],
    ],
  },

  // mb-05 CTA + AUTHORITY + FINALE (640-753s, B-Dur cta-resolve, reuses warm bed)
  {
    id: "mb-05",
    src: ES_MUSIC.CURTAINS_FALL,
    from: 19110,
    to: 22634,
    automation: [
      [19110, 0],
      [19290, 0.034],
      [22144, 0.040],
      [22220, 0.034],
      [22572, 0.040],
      [22603, 0.034],
      [22634, 0],
    ],
  },

  // mb-06 OUTRO Danke Deutschland (755-760s, outro swell after deep-boom-3)
  {
    id: "mb-06",
    src: ES_MUSIC.CURTAINS_FALL,
    from: 22650,
    to: 22800,
    automation: [
      [22650, 0],
      [22691, 0.04],
      [22700, 0.034],
      [22760, 0.034],
      [22800, 0],
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────

const interpolateAutomation = (
  absoluteFrame: number,
  automation: Array<[number, number]>,
): number => {
  if (automation.length === 0) return 0;
  if (absoluteFrame <= automation[0][0]) return automation[0][1];
  const last = automation[automation.length - 1];
  if (absoluteFrame >= last[0]) return last[1];
  for (let i = 0; i < automation.length - 1; i++) {
    const [f0, v0] = automation[i];
    const [f1, v1] = automation[i + 1];
    if (absoluteFrame >= f0 && absoluteFrame <= f1) {
      if (f1 === f0) return v1;
      const t = (absoluteFrame - f0) / (f1 - f0);
      return v0 + (v1 - v0) * t;
    }
  }
  return 0;
};

const sfxEnvelope = (
  frameInSequence: number,
  totalFrames: number,
  peak: number,
  fadeIn: number,
  fadeOut: number,
): number => {
  if (fadeIn > 0 && frameInSequence < fadeIn) {
    return peak * (frameInSequence / fadeIn);
  }
  const fadeOutStart = totalFrames - fadeOut;
  if (fadeOut > 0 && frameInSequence > fadeOutStart) {
    const remaining = totalFrames - frameInSequence;
    return peak * Math.max(0, remaining / fadeOut);
  }
  return peak;
};

// ─── Players ─────────────────────────────────────────────────────────────

// NOTE: `loop` prop removed 2026-04-15 — triggers Remotion Studio's
// draw-peaks.js IndexSizeError ("createImageData: source width is zero")
// during waveform visualization when source duration is still being fetched.
// Trade-off: mb-02 (PARTICLE_EMISSION 163s vs 196s slot) and mb-03
// (CONFIDENTIALITY 139s vs 164s slot) fall silent after source ends.
// Phase B placeholder quality — longer source tracks arrive with proper
// Epidemic Sound bed sourcing before final render.
const MusicBedPlayer: React.FC<{ bed: BmfBed }> = ({ bed }) => {
  const duration = bed.to - bed.from;
  return (
    <Sequence from={bed.from} durationInFrames={duration}>
      <Audio
        src={staticFile(`sfx/${bed.src}`)}
        volume={(f) => interpolateAutomation(bed.from + f, bed.automation)}
      />
    </Sequence>
  );
};

// NOTE: `MIN_SEQUENCE_FRAMES` guard added 2026-04-15 — Remotion Studio's
// draw-peaks.js drawBars() reads `canvas.width` from the DOM waveform
// canvas, which collapses to 0 px when an Audio Sequence is so short that
// at the user's current timeline zoom the clip renders at <1 px wide. That
// triggers `createImageData(0, height)` IndexSizeError.
// Fix: pad every SFX Sequence to at least 30 frames. Audible duration is
// unchanged because the volume envelope still uses `cue.durationFrames` —
// the extra tail frames just play silence (envelope returns 0 after fadeOut).
const MIN_SEQUENCE_FRAMES = 30;

const SfxHitPlayer: React.FC<{ cue: BmfCue }> = ({ cue }) => {
  if (!cue.src) return null;
  const fadeIn = cue.fadeIn ?? 0;
  const fadeOut = cue.fadeOut ?? Math.min(15, cue.durationFrames);
  const seqFrames = Math.max(cue.durationFrames, MIN_SEQUENCE_FRAMES);
  return (
    <Sequence from={cue.frame} durationInFrames={seqFrames}>
      <Audio
        src={staticFile(`sfx/${cue.src}`)}
        volume={(f) => sfxEnvelope(f, cue.durationFrames, cue.volume, fadeIn, fadeOut)}
      />
    </Sequence>
  );
};

// ─── Main component ──────────────────────────────────────────────────────

export const BmfSoundDesign: React.FC = () => {
  return (
    <>
      {BEDS.map((bed) => (
        <MusicBedPlayer key={bed.id} bed={bed} />
      ))}
      {CUES.map((cue) => (
        <SfxHitPlayer key={cue.id} cue={cue} />
      ))}
    </>
  );
};

export default BmfSoundDesign;
