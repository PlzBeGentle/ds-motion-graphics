/**
 * Epidemic Sound Library — lizenzfreie Musik & SFX
 * Alle Dateien in public/sfx/epidemic/
 * Verwendung: direkt als sfx-Pfad in SoundDesign-Komponente
 */

import type { SfxCue, MusicBedProps } from "./SoundDesign";

// ─── Musik-Tracks (Copyright-frei via Epidemic Sound) ──────────────────────

export const ES_MUSIC = {
  /** Suspense/Sneaking — 90 BPM, 2:58 — perfekt für Finanz-Aufdeckung */
  TRACKER: "epidemic/tracker-suspense.wav",
  /** Dark/Mystery/Sci-Fi — 73 BPM, 2:43 — düstere Themen, Warnung */
  PARTICLE_EMISSION: "epidemic/particle-emission-dark.wav",
  /** Mysterious/Suspense/Crime Scene — 85 BPM, 2:19 — investigativ, dunkel */
  CONFIDENTIALITY: "epidemic/confidentiality-dark.wav",
  /** Epic/Drama/Sentimental — 82 BPM, 3:13 — Lösung, Gold, Hoffnung */
  CURTAINS_FALL: "epidemic/curtains-fall-epic.wav",
} as const;

// ─── Sound Effects ─────────────────────────────────────────────────────────

export const ES_SFX = {
  /** Cinematic boom impact — dark, snappy hit (5.9s) */
  IMPACT_CINEMATIC: "epidemic/impact-cinematic.wav",
  /** Deep low boom (3.5s) — Punchlines, Statements */
  BOOM_LOW: "epidemic/boom-low.wav",
  /** Short deep whoosh (3.2s) — Overlay-Transitions */
  WHOOSH_DEEP: "epidemic/whoosh-deep.wav",
  /** Sharp bass riser (1s) — schneller Buildup vor Hit */
  RISER_SHARP: "epidemic/riser-sharp.wav",
  /** Trailer swell reverse (7.8s) — großer Moment, CTA */
  RISER_TRAILER: "epidemic/riser-trailer-swell.wav",
  /** Short cinematic gritty riser (4.3s) — mittlerer Buildup */
  RISER_GRITTY: "epidemic/riser-cinematic-gritty.wav",
  /** Cartoon pop (1.8s) — Szenen-Wechsel, Bullet Points (MULTI-hit, vorsicht bei rapid-fire) */
  POP: "epidemic/pop-various.wav",
  /** Single cartoon pop — saubere rapid-fire bullet/chip reveals */
  POP_SINGLE: "epidemic/pop-single.wav",
  /** Glitch video transition (10.7s) — harte Cuts, Breaking News */
  GLITCH_TRANSITION: "epidemic/glitch-transition.wav",
  /** Short glitch hit + metallic tone (0.9s) — Text-Einblendungen */
  GLITCH_HIT: "epidemic/glitch-hit.wav",
  /** Cinematic intense deep hit (5.8s) — Punchlines, Schock-Momente */
  IMPACT_DEEP_HIT: "epidemic/impact-deep-hit.wav",
  /** Dark ultra-low boom (5.9s) — Hook, "Kein Zufall", maximaler Impact */
  BOOM_ULTRA_LOW: "epidemic/boom-ultra-low.wav",
  /** Spacey transition whoosh (4.6s) — Premium Overlay-Wechsel */
  WHOOSH_SPACEY: "epidemic/whoosh-spacey.wav",
  /** Long cinematic trailer riser (10.6s) — großer Buildup vor Reveals */
  RISER_LONG_TRAILER: "epidemic/riser-long-trailer.wav",
  /** Suspenseful cinematic riser (5.4s) — kurzer Buildup vor Schock */
  RISER_SUSPENSEFUL: "epidemic/riser-suspenseful.wav",
  /** Camera shutter click (0.8s) — subtiler Zoom-Cut Sound (MULTI-hit) */
  CAMERA_CLICK: "epidemic/camera-click.wav",
  /** Single camera shutter click — saubere rapid-fire stagger reveals */
  CAMERA_CLICK_SINGLE: "epidemic/camera-click-single.wav",
  /** Paper rustle foley (3.7s) — Dokument/Brief Overlays */
  PAPER_RUSTLE: "epidemic/paper-rustle.wav",
  /** Glass micro clink (6.5s) — Charts, Zahlen, subtile Akzente */
  GLASS_CLINK: "epidemic/glass-clink.wav",
  /** Keyboard typing (6.6s) — Text-Einblendungen, Typewriter */
  KEYBOARD_CLICK: "epidemic/keyboard-click.wav",
} as const;

// ─── Presets für typische DS-Content-Typen ─────────────────────────────────

/** Finanz-Reel: düster, investigativ, Daniel deckt auf */
export function finanzReelMusic(durationFrames: number): MusicBedProps {
  return {
    src: ES_MUSIC.TRACKER,
    baseVolume: 0.025,
    swells: [],
    ducks: [],
  };
}

/** Dark/Warnung-Reel: Krise, Crash, System-Kritik */
export function darkReelMusic(durationFrames: number): MusicBedProps {
  return {
    src: ES_MUSIC.PARTICLE_EMISSION,
    baseVolume: 0.02,
    swells: [],
    ducks: [],
  };
}

/** Standard SFX-Set für Reels: Whoosh bei Overlays, Boom auf Punchlines */
export function reelSfxPreset(overlayFrames: number[], punchlineFrames: number[], ctaFrame?: number): SfxCue[] {
  const cues: SfxCue[] = [];

  // Whoosh bei jedem Overlay-Wechsel
  for (const f of overlayFrames) {
    cues.push({
      frame: f,
      sfx: ES_SFX.WHOOSH_DEEP,
      volume: 0.06,
      fadeOut: 15,
      duration: 30,
    });
  }

  // Boom auf Punchlines
  for (const f of punchlineFrames) {
    cues.push({
      frame: f,
      sfx: ES_SFX.BOOM_LOW,
      volume: 0.08,
      fadeOut: 20,
      duration: 45,
    });
  }

  // Riser vor CTA
  if (ctaFrame) {
    cues.push({
      frame: ctaFrame - 90, // 3s vorher
      sfx: ES_SFX.RISER_GRITTY,
      volume: 0.06,
      fadeIn: 30,
      fadeOut: 10,
      duration: 90,
    });
  }

  return cues;
}

/** SFX für YouTube Long-Form: Impact + Glitch + Riser */
export function longformSfxPreset(impactFrames: number[], glitchFrames: number[], riserFrames: number[]): SfxCue[] {
  const cues: SfxCue[] = [];

  for (const f of impactFrames) {
    cues.push({
      frame: f,
      sfx: ES_SFX.IMPACT_CINEMATIC,
      volume: 0.08,
      fadeOut: 25,
      duration: 45,
    });
  }

  for (const f of glitchFrames) {
    cues.push({
      frame: f,
      sfx: ES_SFX.GLITCH_HIT,
      volume: 0.06,
      fadeOut: 10,
      duration: 25,
    });
  }

  for (const f of riserFrames) {
    cues.push({
      frame: f - 60,
      sfx: ES_SFX.RISER_SHARP,
      volume: 0.05,
      fadeIn: 20,
      fadeOut: 5,
      duration: 30,
    });
  }

  return cues;
}
