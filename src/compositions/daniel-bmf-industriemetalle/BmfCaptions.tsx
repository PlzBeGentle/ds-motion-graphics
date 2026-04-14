import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BMF_COLORS, BMF_FONTS } from "./bmf-theme";
import { CAPTION_SEGMENTS, SUPPRESS_WINDOWS } from "./captions-data";

interface Segment {
  start_frame: number;
  end_frame: number;
  text: string;
}

const SEGMENTS: readonly Segment[] = CAPTION_SEGMENTS;
// Windows where captions must be suppressed (lower-thirds cognitive-load rule)
const SUPPRESS: ReadonlyArray<readonly [number, number]> = SUPPRESS_WINDOWS as any;

function isSuppressed(frame: number): boolean {
  for (const [a, b] of SUPPRESS) {
    if (frame >= a && frame <= b) return true;
  }
  return false;
}

/**
 * BmfCaptions — Burned-in caption stream.
 * Reads 176 segments from captions-data.ts, shows active segment
 * at y≈87% with mask-wipe entry + fade exit. Suppressed during lower-thirds.
 */
export const BmfCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  if (isSuppressed(frame)) return null;

  // Find active segment
  let active: Segment | null = null;
  for (const seg of SEGMENTS) {
    if (frame >= seg.start_frame && frame <= seg.end_frame) {
      active = seg;
      break;
    }
  }
  if (!active) return null;

  const local = frame - active.start_frame;
  const segDuration = active.end_frame - active.start_frame;

  // Reveal clip-path mask-wipe over 6 frames
  const revealProgress = interpolate(local, [0, 6], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });
  // Fade-out last 5 frames
  const exitOpacity = interpolate(
    local,
    [segDuration - 5, segDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: 100,
      }}
    >
      <div
        style={{
          maxWidth: "78%",
          background: "rgba(22,21,20,0.58)",
          borderRadius: 6,
          padding: "10px 22px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          clipPath: `inset(0 ${100 - revealProgress}% 0 0)`,
          opacity: exitOpacity,
          fontFamily: BMF_FONTS.sans,
          fontWeight: 700,
          fontSize: 56,
          color: "rgba(255,245,224,0.85)",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          textAlign: "center",
          textShadow: "0 4px 20px rgba(0,0,0,0.65), 0 2px 4px rgba(0,0,0,0.85)",
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};

export default BmfCaptions;
