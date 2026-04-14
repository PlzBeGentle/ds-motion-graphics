// Iter2.12 — BmfSoundDesign slim rewrite
//
// Replaces the Phase-A heavy 428-line version which was synced to old
// frame ranges (pre-Iter2 redesign). All cues here match the CURRENT
// active overlay ranges in BmfIndustriemetalleVideo.tsx.
//
// Strategy:
// - 2 music beds (confidentiality-dark 0-14400, curtains-fall-epic 14400-22800)
// - SFX cues for every hero moment of every active overlay
// - Daniel voice comes from the master OffthreadVideo track
// - All paths via staticFile, files live in public/sfx/epidemic/

import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

import { ES_MUSIC, ES_SFX } from "../../components/EpidemicSoundLibrary";

type SfxCue = {
  frame: number;
  src: string;
  volume: number;
  durationInFrames?: number;
  // Iter2.20: Audio endAt (frames) — trims the audio file internally while
  // the Sequence stays ≥30f to keep Remotion Studio's draw-peaks happy.
  // Use this for hard-cut risers and tight stagger pops.
  audioEndAt?: number;
  note?: string;
};

const DEFAULT_DURATION = 120; // ~4s, long enough for most hits to bloom
const MIN_SEQUENCE_DURATION = 30; // Studio draw-peaks safety floor

const CUES: SfxCue[] = [
  // =========================================================================
  // AKT 1 — Hook + BMF Reveal (0-155s)
  // =========================================================================
  { frame: 150, src: ES_SFX.RISER_SHARP, volume: 0.35, note: "pre-hook riser" },
  { frame: 162, src: ES_SFX.GLASS_CLINK, volume: 0.38, note: "ovl-001 5 STUNDEN reveal" },

  // ovl-002 BMF-Schreiben reveal
  { frame: 640, src: ES_SFX.RISER_SUSPENSEFUL, volume: 0.32, note: "BMF pre-reveal build" },
  { frame: 653, src: ES_SFX.PAPER_RUSTLE, volume: 0.52, durationInFrames: 180, note: "ovl-002 BMF doc paper" },
  { frame: 670, src: ES_SFX.BOOM_LOW, volume: 0.42, note: "BMF doc impact" },

  // ovl-003 "22 JAHRE GESTOPPT" kinetic
  { frame: 880, src: ES_SFX.RISER_SHARP, volume: 0.3, note: "pre 22 JAHRE" },
  { frame: 887, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.48, note: "22 JAHRE" },
  { frame: 1010, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.55, note: "GESTOPPT" },

  // ovl-004 OhneTriptychon (Iter2.18: per-bullet pops restored with new clean
  // single-shot POP_SINGLE file)
  { frame: 1040, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "ovl-004 entry" },
  { frame: 1055, src: ES_SFX.POP_SINGLE, volume: 0.42, audioEndAt: 20, note: "bullet 1 OHNE PARLAMENT" },
  { frame: 1085, src: ES_SFX.POP_SINGLE, volume: 0.42, audioEndAt: 20, note: "bullet 2 OHNE VORWARNUNG" },
  { frame: 1117, src: ES_SFX.POP_SINGLE, volume: 0.42, audioEndAt: 20, note: "bullet 3 OHNE ÜBERGANGSFRIST" },

  // ovl-005 FullscreenTakeover 0 CENT
  { frame: 1185, src: ES_SFX.RISER_GRITTY, volume: 0.36, audioEndAt: 13, note: "0 CENT build — hard cut at impact" },
  { frame: 1193, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.5, note: "ovl-005 0 CENT hit" },

  // ovl-006 CTA soft
  { frame: 1606, src: ES_SFX.POP, volume: 0.3, note: "ovl-006 link CTA" },

  // ovl-007 Element chips (Iter2.18: per-chip CAMERA_CLICK_SINGLE — word-sync
  // to Daniel's "Industriemetalle wie Indium oder Renium" @69.28-72.06s)
  { frame: 2078, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "ovl-007 container" },
  { frame: 2082, src: ES_SFX.CAMERA_CLICK_SINGLE, volume: 0.38, audioEndAt: 10, note: "GALLIUM chip" },
  { frame: 2095, src: ES_SFX.CAMERA_CLICK_SINGLE, volume: 0.38, audioEndAt: 10, note: "GERMANIUM chip" },
  { frame: 2134, src: ES_SFX.CAMERA_CLICK_SINGLE, volume: 0.38, audioEndAt: 12, note: "INDIUM chip" },
  { frame: 2151, src: ES_SFX.CAMERA_CLICK_SINGLE, volume: 0.38, audioEndAt: 12, note: "RHENIUM chip" },

  // ovl-008 Zollfreilager flow
  { frame: 2338, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "ovl-008 flow entry" },

  // =========================================================================
  // AKT 2 — BMF 2004 + 4 Punkte Listicle (155-345s)
  // =========================================================================

  // ovl-009 BMF 2004
  { frame: 3079, src: ES_SFX.PAPER_RUSTLE, volume: 0.48, durationInFrames: 150, note: "ovl-009 2004 doc" },

  // ovl-010 AUFGEHOBEN stamp slam
  { frame: 3378, src: ES_SFX.RISER_SHARP, volume: 0.34, note: "pre AUFGEHOBEN" },
  { frame: 3390, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.58, note: "ovl-010 AUFGEHOBEN slam" },
  { frame: 3390, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.42, note: "AUFGEHOBEN layered impact" },

  // ovl-011 Donnerstag news (Iter2.13: keyboard volume 0.3 → 0.14 per user at 2:12)
  { frame: 3844, src: ES_SFX.WHOOSH_SPACEY, volume: 0.36, note: "ovl-011 news entry" },
  { frame: 3858, src: ES_SFX.KEYBOARD_CLICK, volume: 0.14, durationInFrames: 180, note: "news typing" },

  // ovl-012 KEIN UPDATE → BRUCH kinetic (Iter2.15: BRUCH hit moved to frame 4805 when Daniel says "Bruch")
  { frame: 4690, src: ES_SFX.POP, volume: 0.3, note: "ovl-012 KEIN UPDATE reveal" },
  { frame: 4805, src: ES_SFX.GLITCH_HIT, volume: 0.42, note: "BRUCH hit" },
  { frame: 4805, src: ES_SFX.BOOM_LOW, volume: 0.4, note: "BRUCH layered" },

  // KAP02 DAS WORT DAS ALLES VERRÄT
  { frame: 4610, src: ES_SFX.RISER_LONG_TRAILER, volume: 0.32, audioEndAt: 15, note: "KAP02 build — hard cut at impact" },
  { frame: 4620, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.44, note: "KAP02 open" },
  { frame: 4790, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "KAP02 close" },

  // ovl-013 VIER DINGE (Iter2.15: word-sync "Vier" @163.02s=4891)
  { frame: 4881, src: ES_SFX.RISER_SHARP, volume: 0.3, note: "pre VIER DINGE" },
  { frame: 4891, src: ES_SFX.POP, volume: 0.3, note: "VIER DINGE reveal" },
  { frame: 4901, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.4, note: "VIER DINGE hit" },

  // ovl-014 DAS WORT (Iter2.14: word-sync "Das eine Wort" @177.44s=5323)
  { frame: 5323, src: ES_SFX.GLITCH_HIT, volume: 0.36, note: "ovl-014 Das Wort scramble" },
  { frame: 5340, src: ES_SFX.POP, volume: 0.3, note: "Das Wort reveal" },

  // ovl-015 KOBALT FULLSCREEN — the centerpiece
  { frame: 5820, src: ES_SFX.RISER_LONG_TRAILER, volume: 0.42, audioEndAt: 24, note: "KOBALT hero build — hard cut at impact 5838" },
  { frame: 5838, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.62, note: "KOBALT hero punch" },
  { frame: 5868, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.48, note: "KOBALT kinetic reveal" },

  // KAP03 DIE VERBOTENE RÜCKWIRKUNG
  { frame: 7247, src: ES_SFX.RISER_SUSPENSEFUL, volume: 0.32, note: "KAP03 build" },
  { frame: 7257, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.44, note: "KAP03 open" },

  // ovl-018 Highlighter doc excerpt
  { frame: 7495, src: ES_SFX.PAPER_RUSTLE, volume: 0.45, durationInFrames: 150, note: "ovl-018 passage reveal" },
  { frame: 7530, src: ES_SFX.GLASS_CLINK, volume: 0.3, note: "highlighter line 1" },
  { frame: 7680, src: ES_SFX.GLASS_CLINK, volume: 0.3, note: "highlighter line 2" },

  // ovl-019 STRAFZETTEL
  { frame: 8041, src: ES_SFX.GLITCH_HIT, volume: 0.35, note: "ovl-019 strafzettel" },
  { frame: 8045, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.42, note: "STRAFZETTEL hit" },

  // KAP04 DAS NULL-CENT-PARADOX
  { frame: 8630, src: ES_SFX.RISER_SUSPENSEFUL, volume: 0.32, note: "KAP04 build" },
  { frame: 8640, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.44, note: "KAP04 open" },

  // ovl-021 BigQuote "aufgehoben"
  { frame: 9596, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.42, note: "ovl-021 quote" },
  { frame: 9596, src: ES_SFX.GLASS_CLINK, volume: 0.3, note: "quote glass" },

  // ovl-022 counter #4 0 CENT NEUE STEUERN
  { frame: 10116, src: ES_SFX.GLITCH_HIT, volume: 0.36, note: "ovl-022 #4 scramble" },
  { frame: 10126, src: ES_SFX.BOOM_LOW, volume: 0.45, note: "0 CENT hit" },

  // ovl-023 19%
  { frame: 10373, src: ES_SFX.RISER_SHARP, volume: 0.32, note: "ovl-023 build" },
  { frame: 10383, src: ES_SFX.GLASS_CLINK, volume: 0.36, note: "19% reveal" },

  // ovl-024 0,00 EUR hero
  { frame: 11020, src: ES_SFX.RISER_GRITTY, volume: 0.4, audioEndAt: 13, note: "pre 0,00 EUR — hard cut at impact 11031" },
  { frame: 11031, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.6, note: "ovl-024 0,00 EUR punch" },
  { frame: 11031, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.44, note: "0,00 EUR layered" },

  // ovl-025 Two date timeline (Iter2.15: node 2 "4. Februar" sync to Daniel's "4." @ frame 11399)
  { frame: 11260, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "ovl-025 timeline entry" },
  { frame: 11268, src: ES_SFX.POP, volume: 0.28, note: "9. April 2026 node" },
  { frame: 11399, src: ES_SFX.POP, volume: 0.28, note: "4. Februar 2025 node" },

  // ovl-026 China Bekanntmachung (Iter2.13: keyboard lower)
  { frame: 11535, src: ES_SFX.PAPER_RUSTLE, volume: 0.4, durationInFrames: 150, note: "ovl-026 china doc" },
  { frame: 11555, src: ES_SFX.KEYBOARD_CLICK, volume: 0.11, durationInFrames: 240, note: "china metal chips" },

  // ovl-028 China chronology timeline (Iter2.18: POP_SINGLE for each node reveal,
  // word-synced to Daniel's date mentions)
  { frame: 12230, src: ES_SFX.WHOOSH_DEEP, volume: 0.32, note: "ovl-028 timeline entry" },
  { frame: 12230, src: ES_SFX.POP_SINGLE, volume: 0.34, audioEndAt: 25, note: "AUG 23 node" },
  { frame: 12681, src: ES_SFX.POP_SINGLE, volume: 0.34, audioEndAt: 25, note: "DEZ 23 node" },
  { frame: 12779, src: ES_SFX.POP_SINGLE, volume: 0.34, audioEndAt: 25, note: "SEP 24 node" },
  { frame: 13083, src: ES_SFX.POP_SINGLE, volume: 0.34, audioEndAt: 25, note: "APR 25 node" },
  { frame: 13280, src: ES_SFX.POP_SINGLE, volume: 0.34, audioEndAt: 25, note: "OKT 25 node" },

  // ovl-027 Price Explosion (Iter2.18: POP_SINGLE per chart reveal + entry clink)
  { frame: 12334, src: ES_SFX.GLASS_CLINK, volume: 0.35, note: "charts triptychon entry" },
  { frame: 12334, src: ES_SFX.POP_SINGLE, volume: 0.36, audioEndAt: 18, note: "GALLIUM chart reveal" },
  { frame: 12356, src: ES_SFX.POP_SINGLE, volume: 0.36, audioEndAt: 18, note: "GERMANIUM chart reveal" },
  { frame: 12378, src: ES_SFX.POP_SINGLE, volume: 0.36, audioEndAt: 18, note: "ANTIMON chart reveal" },

  // ovl-029 EU Krisendialog (Iter2.13: keyboard volume matched lower)
  { frame: 13434, src: ES_SFX.WHOOSH_SPACEY, volume: 0.32, note: "ovl-029 news entry" },
  { frame: 13448, src: ES_SFX.KEYBOARD_CLICK, volume: 0.13, durationInFrames: 180, note: "EU news typing" },

  // ovl-030 WEGREGULIERT (Iter2.15: retexted, hit synced to "wegzuregulieren" @ 469.50s = frame 14085)
  { frame: 14035, src: ES_SFX.GLITCH_TRANSITION, volume: 0.42, durationInFrames: 55, note: "ovl-030 glitch bed — hard cut at impact 14085" },
  { frame: 14085, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.44, note: "WEGREGULIERT impact" },

  // KAP05 KEIN ZUFALL (moved to 14400-14580 in Iter2.11)
  { frame: 14390, src: ES_SFX.RISER_SHARP, volume: 0.34, note: "KAP05 build" },
  { frame: 14400, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.5, note: "KAP05 KEIN ZUFALL punch" },

  // =========================================================================
  // AKT 3 — Die Lösung + CTA (500-760s)
  // =========================================================================

  // ovl-032 Trust checkmark (Iter2.15: word-sync "Vertrauensschutz" @522.76s=15683)
  { frame: 15683, src: ES_SFX.POP, volume: 0.3, note: "ovl-032 checkmark" },
  { frame: 15700, src: ES_SFX.GLASS_CLINK, volume: 0.3, note: "VERTRAUENSSCHUTZ reveal" },

  // KAP06 DIE LÖSUNG
  { frame: 16370, src: ES_SFX.RISER_LONG_TRAILER, volume: 0.36, audioEndAt: 15, note: "KAP06 warm build — hard cut at impact" },
  { frame: 16380, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.4, note: "KAP06 open" },

  // ovl-034 SCHWEIZ warm payoff
  { frame: 17268, src: ES_SFX.RISER_GRITTY, volume: 0.34, audioEndAt: 13, note: "SCHWEIZ pre-build — hard cut at impact" },
  { frame: 17278, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.48, note: "ovl-034 SCHWEIZ payoff" },
  { frame: 17278, src: ES_SFX.BOOM_LOW, volume: 0.38, note: "SCHWEIZ warm sub" },

  // ovl-035 CoreMessage ANTIZYKLISCH (Iter2.14: word-sync "antizyklisch" @619.54s=18586)
  { frame: 18586, src: ES_SFX.GLASS_CLINK, volume: 0.32, note: "ovl-035 ANTIZYKLISCH" },
  { frame: 18586, src: ES_SFX.POP, volume: 0.28, note: "core message reveal" },

  // ovl-new-001 Steuer-Fachpresse (Iter2.18: per-card POP_SINGLE reveals + stamps)
  { frame: 19444, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "ovl-new-001 press entry" },
  { frame: 19456, src: ES_SFX.POP_SINGLE, volume: 0.34, audioEndAt: 12, note: "PwC card" },
  { frame: 19470, src: ES_SFX.POP_SINGLE, volume: 0.34, audioEndAt: 12, note: "DATEV card" },
  { frame: 19484, src: ES_SFX.POP_SINGLE, volume: 0.34, audioEndAt: 12, note: "Haufe card" },
  { frame: 19498, src: ES_SFX.POP_SINGLE, volume: 0.34, audioEndAt: 12, note: "RP card" },
  { frame: 19510, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.44, note: "rotes X stamp group" },

  // ovl-036 HardCTA (Iter2.14: word-sync "Und wer darüber hinaus..." @679.52s=20385, single phase)
  { frame: 20375, src: ES_SFX.RISER_GRITTY, volume: 0.38, audioEndAt: 13, note: "HardCTA build — hard cut at impact" },
  { frame: 20385, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.48, note: "ovl-036 HardCTA hit" },
  { frame: 20385, src: ES_SFX.BOOM_LOW, volume: 0.4, note: "HardCTA sub" },

  // ovl-037 Authority timeline 20 Jahre
  { frame: 21262, src: ES_SFX.RISER_SHARP, volume: 0.3, note: "ovl-037 build" },
  { frame: 21274, src: ES_SFX.GLASS_CLINK, volume: 0.34, note: "20 JAHRE reveal" },
];

const MUSIC_BEDS = [
  {
    src: ES_MUSIC.CONFIDENTIALITY,
    from: 0,
    durationInFrames: 14400,
    volume: 0.028,
  },
  {
    src: ES_MUSIC.CURTAINS_FALL,
    from: 14400,
    durationInFrames: 22800 - 14400,
    volume: 0.034,
  },
];

export const BmfSoundDesign: React.FC = () => (
  <>
    {MUSIC_BEDS.map((bed, i) => (
      <Sequence
        key={`music-${i}`}
        from={bed.from}
        durationInFrames={bed.durationInFrames}
        name={`music-bed-${i}`}
      >
        <Audio src={staticFile(`sfx/${bed.src}`)} volume={bed.volume} />
      </Sequence>
    ))}

    {CUES.map((cue, i) => {
      // Sequence must be ≥30f so Studio's draw-peaks doesn't crash
      const seqDuration = Math.max(
        cue.durationInFrames ?? DEFAULT_DURATION,
        MIN_SEQUENCE_DURATION,
      );
      return (
        <Sequence
          key={`sfx-${i}`}
          from={cue.frame}
          durationInFrames={seqDuration}
          name={`sfx-${i}-${cue.note ?? ""}`}
        >
          <Audio
            src={staticFile(`sfx/${cue.src}`)}
            volume={cue.volume}
            endAt={cue.audioEndAt}
          />
        </Sequence>
      );
    })}
  </>
);

export default BmfSoundDesign;
