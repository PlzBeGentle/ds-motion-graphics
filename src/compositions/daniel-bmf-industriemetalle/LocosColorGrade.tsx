import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

/**
 * LocosColorGrade — 11-segment LOCOS Premium color grade layer.
 * Iterates over 11 color segments from phase-4/color/color-segments.json
 * and applies the css_filter (contrast/saturate/brightness) with
 * cross-fade between segments (60f standard, asymmetric 20f in / 40f out
 * for shock-peaks col_004 Kobalt + col_006 Null-Cent).
 *
 * LOCOS brand constraint: NEVER Teal-Orange. Shock-peaks use locos-red-accent:
 * a selective red boost overlay on desaturated frame, NOT hue-shift.
 */

interface Segment {
  id: string;
  frameStart: number;
  frameEnd: number;
  contrast: number;
  saturate: number;
  brightness: number;
  warmth: number; // positive = warm, negative = cool
  vignette: number; // 0-1
  isShockPeak?: boolean;
  transitionInFrames: number;
  transitionOutFrames: number;
}

const SEGMENTS: Segment[] = [
  { id: "col_001_hook", frameStart: 0, frameEnd: 1521, contrast: 1.06, saturate: 0.75, brightness: 0.97, warmth: -0.12, vignette: 0.18, transitionInFrames: 0, transitionOutFrames: 60 },
  { id: "col_002_context", frameStart: 1521, frameEnd: 4860, contrast: 1.02, saturate: 1.0, brightness: 1.0, warmth: 0.08, vignette: 0.10, transitionInFrames: 60, transitionOutFrames: 40 },
  { id: "col_003_rising", frameStart: 4860, frameEnd: 5838, contrast: 1.08, saturate: 0.90, brightness: 0.98, warmth: -0.06, vignette: 0.14, transitionInFrames: 40, transitionOutFrames: 20 },
  { id: "col_004_kobalt_peak", frameStart: 5838, frameEnd: 7278, contrast: 1.12, saturate: 0.92, brightness: 0.96, warmth: 0.06, vignette: 0.42, isShockPeak: true, transitionInFrames: 20, transitionOutFrames: 40 },
  { id: "col_005_post_kobalt", frameStart: 7278, frameEnd: 9981, contrast: 1.09, saturate: 0.85, brightness: 0.97, warmth: -0.08, vignette: 0.18, transitionInFrames: 40, transitionOutFrames: 60 },
  { id: "col_006_null_cent_peak", frameStart: 9981, frameEnd: 11208, contrast: 1.10, saturate: 0.90, brightness: 0.96, warmth: 0.04, vignette: 0.40, isShockPeak: true, transitionInFrames: 20, transitionOutFrames: 40 },
  { id: "col_007_valley", frameStart: 11208, frameEnd: 15117, contrast: 1.10, saturate: 0.70, brightness: 0.96, warmth: -0.14, vignette: 0.20, transitionInFrames: 40, transitionOutFrames: 60 },
  { id: "col_008_bridge", frameStart: 15117, frameEnd: 16467, contrast: 1.04, saturate: 0.95, brightness: 0.99, warmth: 0.0, vignette: 0.12, transitionInFrames: 60, transitionOutFrames: 60 },
  { id: "col_009_schweiz_gold", frameStart: 16467, frameEnd: 19050, contrast: 1.05, saturate: 1.12, brightness: 1.03, warmth: 0.14, vignette: 0.10, transitionInFrames: 60, transitionOutFrames: 60 },
  { id: "col_010_cta", frameStart: 19050, frameEnd: 22500, contrast: 1.03, saturate: 1.03, brightness: 1.01, warmth: 0.06, vignette: 0.12, transitionInFrames: 60, transitionOutFrames: 60 },
  { id: "col_011_closer_cold", frameStart: 22500, frameEnd: 22800, contrast: 1.08, saturate: 0.80, brightness: 0.97, warmth: -0.10, vignette: 0.16, transitionInFrames: 60, transitionOutFrames: 0 },
];

// Linearly interpolate current segment values using adjacent segments for
// smooth cross-fades.
function computeGrade(frame: number) {
  // Find the active segment
  let active = SEGMENTS[0];
  for (const seg of SEGMENTS) {
    if (frame >= seg.frameStart && frame < seg.frameEnd) {
      active = seg;
      break;
    }
  }
  // Indices
  const idx = SEGMENTS.indexOf(active);
  const prev = idx > 0 ? SEGMENTS[idx - 1] : null;
  const next = idx < SEGMENTS.length - 1 ? SEGMENTS[idx + 1] : null;

  // Cross-fade with previous in the first transitionInFrames
  const inStart = active.frameStart;
  const inEnd = active.frameStart + active.transitionInFrames;
  const outStart = active.frameEnd - active.transitionOutFrames;
  const outEnd = active.frameEnd;

  let c = active.contrast;
  let s = active.saturate;
  let b = active.brightness;
  let w = active.warmth;
  let v = active.vignette;

  if (prev && frame < inEnd && active.transitionInFrames > 0) {
    const t = interpolate(frame, [inStart, inEnd], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    c = prev.contrast + (active.contrast - prev.contrast) * t;
    s = prev.saturate + (active.saturate - prev.saturate) * t;
    b = prev.brightness + (active.brightness - prev.brightness) * t;
    w = prev.warmth + (active.warmth - prev.warmth) * t;
    v = prev.vignette + (active.vignette - prev.vignette) * t;
  }
  if (next && frame >= outStart && active.transitionOutFrames > 0) {
    const t = interpolate(frame, [outStart, outEnd], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    c = active.contrast + (next.contrast - active.contrast) * t;
    s = active.saturate + (next.saturate - active.saturate) * t;
    b = active.brightness + (next.brightness - active.brightness) * t;
    w = active.warmth + (next.warmth - active.warmth) * t;
    v = active.vignette + (next.vignette - active.vignette) * t;
  }

  return { c, s, b, w, v, isShockPeak: active.isShockPeak };
}

export const LocosColorGrade: React.FC = () => {
  const frame = useCurrentFrame();
  const { c, s, b, w, v, isShockPeak } = computeGrade(frame);

  const cssFilter = `contrast(${c.toFixed(3)}) saturate(${s.toFixed(3)}) brightness(${b.toFixed(3)})`;
  // Warmth: amber multiply when positive, cool blue when negative
  const warmAlpha = Math.abs(w) * 0.28;
  const warmColor = w >= 0 ? "rgba(255,200,120," : "rgba(120,160,220,";

  return (
    <>
      {/* Single-layer filter applied via an overlay (can't modify OffthreadVideo in-place,
         so we stack a filter-accepting fill underneath; also use tint + vignette). */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          backdropFilter: cssFilter,
          WebkitBackdropFilter: cssFilter,
        }}
      />
      {/* Warmth tint */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: `${warmColor}${warmAlpha})`,
          mixBlendMode: "multiply",
        }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: `radial-gradient(ellipse at 50% 45%, transparent ${40 + (1 - v) * 20}%, rgba(10,10,20,${v}) 100%)`,
        }}
      />
      {/* LOCOS shock-red accent: selective red overlay on shock peaks */}
      {isShockPeak && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(227,6,19,0.08) 0%, rgba(227,6,19,0.02) 60%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />
      )}
      {/* Subtle shadow tint — cool blue in cool segments */}
      {w < 0 && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(10,15,30,0.08) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      )}
    </>
  );
};

export default LocosColorGrade;
