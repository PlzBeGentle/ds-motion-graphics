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
  note?: string;
};

const DEFAULT_DURATION = 120; // ~4s, long enough for most hits to bloom

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

  // ovl-004 OhneTriptychon bullet stagger
  { frame: 1040, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "ovl-004 entry" },
  { frame: 1055, src: ES_SFX.POP, volume: 0.28, note: "bullet 1 OHNE PARLAMENT" },
  { frame: 1085, src: ES_SFX.POP, volume: 0.28, note: "bullet 2 OHNE VORWARNUNG" },
  { frame: 1117, src: ES_SFX.POP, volume: 0.28, note: "bullet 3 OHNE ÜBERGANGSFRIST" },

  // ovl-005 FullscreenTakeover 0 CENT
  { frame: 1185, src: ES_SFX.RISER_GRITTY, volume: 0.36, note: "0 CENT build" },
  { frame: 1193, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.5, note: "ovl-005 0 CENT hit" },

  // ovl-006 CTA soft
  { frame: 1606, src: ES_SFX.POP, volume: 0.3, note: "ovl-006 link CTA" },

  // ovl-007 Element chips
  { frame: 2078, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "ovl-007 container" },
  { frame: 2078, src: ES_SFX.GLASS_CLINK, volume: 0.32, note: "GALLIUM chip" },
  { frame: 2090, src: ES_SFX.GLASS_CLINK, volume: 0.32, note: "GERMANIUM chip" },
  { frame: 2134, src: ES_SFX.GLASS_CLINK, volume: 0.32, note: "INDIUM chip" },
  { frame: 2151, src: ES_SFX.GLASS_CLINK, volume: 0.32, note: "RHENIUM chip" },

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

  // ovl-011 Donnerstag news
  { frame: 3844, src: ES_SFX.WHOOSH_SPACEY, volume: 0.36, note: "ovl-011 news entry" },
  { frame: 3858, src: ES_SFX.KEYBOARD_CLICK, volume: 0.3, durationInFrames: 180, note: "news typing" },

  // ovl-012 BRUCH kinetic
  { frame: 4690, src: ES_SFX.GLITCH_HIT, volume: 0.42, note: "ovl-012 BRUCH" },
  { frame: 4690, src: ES_SFX.BOOM_LOW, volume: 0.4, note: "BRUCH layered" },

  // KAP02 DAS WORT DAS ALLES VERRÄT
  { frame: 4610, src: ES_SFX.RISER_LONG_TRAILER, volume: 0.32, durationInFrames: 270, note: "KAP02 build" },
  { frame: 4620, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.44, note: "KAP02 open" },
  { frame: 4790, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "KAP02 close" },

  // ovl-013 counter 1/4
  { frame: 4910, src: ES_SFX.RISER_SHARP, volume: 0.3, note: "pre counter 1/4" },
  { frame: 4920, src: ES_SFX.POP, volume: 0.3, note: "counter 1/4 scramble" },
  { frame: 4930, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.4, note: "VIER DINGE" },

  // ovl-014 counter #1 DAS WORT
  { frame: 5385, src: ES_SFX.GLITCH_HIT, volume: 0.36, note: "ovl-014 #1 scramble" },
  { frame: 5400, src: ES_SFX.POP, volume: 0.3, note: "#1 reveal" },

  // ovl-015 KOBALT FULLSCREEN — the centerpiece
  { frame: 5820, src: ES_SFX.RISER_LONG_TRAILER, volume: 0.42, durationInFrames: 300, note: "KOBALT hero build" },
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
  { frame: 11020, src: ES_SFX.RISER_GRITTY, volume: 0.4, durationInFrames: 60, note: "pre 0,00 EUR" },
  { frame: 11031, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.6, note: "ovl-024 0,00 EUR punch" },
  { frame: 11031, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.44, note: "0,00 EUR layered" },

  // ovl-025 Two date timeline
  { frame: 11260, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "ovl-025 timeline entry" },
  { frame: 11268, src: ES_SFX.POP, volume: 0.28, note: "2025 node" },
  { frame: 11304, src: ES_SFX.POP, volume: 0.28, note: "2026 node" },

  // ovl-026 China Bekanntmachung
  { frame: 11535, src: ES_SFX.PAPER_RUSTLE, volume: 0.4, durationInFrames: 150, note: "ovl-026 china doc" },
  { frame: 11555, src: ES_SFX.KEYBOARD_CLICK, volume: 0.22, durationInFrames: 240, note: "china metal chips" },

  // ovl-028 China chronology timeline bottom bar
  { frame: 12230, src: ES_SFX.WHOOSH_DEEP, volume: 0.32, note: "ovl-028 timeline entry" },
  { frame: 12230, src: ES_SFX.POP, volume: 0.28, note: "AUG 23 node" },
  { frame: 12681, src: ES_SFX.POP, volume: 0.28, note: "DEZ 23 node" },
  { frame: 12779, src: ES_SFX.POP, volume: 0.28, note: "SEP 24 node" },
  { frame: 13083, src: ES_SFX.POP, volume: 0.28, note: "APR 25 node" },
  { frame: 13280, src: ES_SFX.POP, volume: 0.28, note: "OKT 25 node" },

  // ovl-027 Price Explosion
  { frame: 12334, src: ES_SFX.GLASS_CLINK, volume: 0.35, note: "GALLIUM chart" },
  { frame: 12356, src: ES_SFX.GLASS_CLINK, volume: 0.35, note: "GERMANIUM chart" },
  { frame: 12378, src: ES_SFX.GLASS_CLINK, volume: 0.35, note: "ANTIMON chart" },

  // ovl-029 EU Krisendialog
  { frame: 13434, src: ES_SFX.WHOOSH_SPACEY, volume: 0.32, note: "ovl-029 news entry" },
  { frame: 13448, src: ES_SFX.KEYBOARD_CLICK, volume: 0.26, durationInFrames: 180, note: "EU news typing" },

  // ovl-030 GENAU JETZT glitch
  { frame: 14035, src: ES_SFX.GLITCH_TRANSITION, volume: 0.42, durationInFrames: 150, note: "ovl-030 glitch" },
  { frame: 14035, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.38, note: "GENAU JETZT impact" },

  // KAP05 KEIN ZUFALL (moved to 14400-14580 in Iter2.11)
  { frame: 14390, src: ES_SFX.RISER_SHARP, volume: 0.34, note: "KAP05 build" },
  { frame: 14400, src: ES_SFX.BOOM_ULTRA_LOW, volume: 0.5, note: "KAP05 KEIN ZUFALL punch" },

  // =========================================================================
  // AKT 3 — Die Lösung + CTA (500-760s)
  // =========================================================================

  // ovl-032 Trust checkmark
  { frame: 15660, src: ES_SFX.POP, volume: 0.3, note: "ovl-032 checkmark" },
  { frame: 15680, src: ES_SFX.GLASS_CLINK, volume: 0.3, note: "VERTRAUENSSCHUTZ reveal" },

  // KAP06 DIE LÖSUNG
  { frame: 16370, src: ES_SFX.RISER_LONG_TRAILER, volume: 0.36, durationInFrames: 240, note: "KAP06 warm build" },
  { frame: 16380, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.4, note: "KAP06 open" },

  // ovl-034 SCHWEIZ warm payoff
  { frame: 17268, src: ES_SFX.RISER_GRITTY, volume: 0.34, note: "SCHWEIZ pre-build" },
  { frame: 17278, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.48, note: "ovl-034 SCHWEIZ payoff" },
  { frame: 17278, src: ES_SFX.BOOM_LOW, volume: 0.38, note: "SCHWEIZ warm sub" },

  // ovl-035 CoreMessage ANTIZYKLISCH
  { frame: 18200, src: ES_SFX.GLASS_CLINK, volume: 0.32, note: "ovl-035 ANTIZYKLISCH" },
  { frame: 18200, src: ES_SFX.POP, volume: 0.28, note: "core message reveal" },

  // ovl-new-001 Steuer-Fachpresse
  { frame: 19350, src: ES_SFX.WHOOSH_DEEP, volume: 0.3, note: "ovl-new-001 press entry" },
  { frame: 19362, src: ES_SFX.POP, volume: 0.28, note: "PwC card" },
  { frame: 19376, src: ES_SFX.POP, volume: 0.28, note: "DATEV card" },
  { frame: 19390, src: ES_SFX.POP, volume: 0.28, note: "Haufe card" },
  { frame: 19404, src: ES_SFX.POP, volume: 0.28, note: "RP card" },
  { frame: 19414, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.38, note: "rotes X stamp 1" },
  { frame: 19420, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.36, note: "rotes X stamp 2" },
  { frame: 19426, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.36, note: "rotes X stamp 3" },
  { frame: 19432, src: ES_SFX.IMPACT_CINEMATIC, volume: 0.36, note: "rotes X stamp 4" },

  // ovl-036 HardCTA
  { frame: 19970, src: ES_SFX.RISER_TRAILER, volume: 0.4, durationInFrames: 240, note: "HardCTA build" },
  { frame: 19980, src: ES_SFX.IMPACT_DEEP_HIT, volume: 0.48, note: "ovl-036 HardCTA hit" },
  { frame: 19980, src: ES_SFX.BOOM_LOW, volume: 0.4, note: "HardCTA sub" },
  { frame: 20280, src: ES_SFX.WHOOSH_DEEP, volume: 0.24, note: "HardCTA phase 2" },
  { frame: 20480, src: ES_SFX.WHOOSH_DEEP, volume: 0.24, note: "HardCTA phase 3" },

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
        <Audio src={staticFile(bed.src)} volume={bed.volume} />
      </Sequence>
    ))}

    {CUES.map((cue, i) => (
      <Sequence
        key={`sfx-${i}`}
        from={cue.frame}
        durationInFrames={cue.durationInFrames ?? DEFAULT_DURATION}
        name={`sfx-${i}-${cue.note ?? ""}`}
      >
        <Audio src={staticFile(cue.src)} volume={cue.volume} />
      </Sequence>
    ))}
  </>
);

export default BmfSoundDesign;
