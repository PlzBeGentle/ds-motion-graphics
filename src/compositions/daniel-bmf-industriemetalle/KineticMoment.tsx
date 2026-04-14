import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BMF_FONTS } from "./bmf-theme";

export interface KineticWord {
  text: string;
  color: string;
  size: number;
  weight?: number;
}

interface Props {
  words: KineticWord[];
  revealType?: "mask-wipe" | "blur-reveal" | "tracking" | "slow-fade" | "stamp-slam" | "glitch";
  staggerFrames?: number;
  position?: "top" | "center" | "bottom";
  font?: string;
  /** Optional glitch for ovl-030 */
  enableGlitch?: boolean;
}

/**
 * KineticMoment — Center-stacked kinetic text wrapper for BMF kinetic moments.
 * This is a purpose-built wrapper around the kinetic-moments.json spec
 * (the library KineticType.tsx uses left/right sides which doesn't match our spec).
 *
 * Used for all 10 kinetic moments (km-01 through km-10) + above-head overlay texts.
 */
export const KineticMoment: React.FC<Props> = ({
  words,
  revealType = "mask-wipe",
  staggerFrames = 4,
  position = "center",
  font = BMF_FONTS.display,
  enableGlitch = false,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 10;
  const globalExit = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch RGB-split overlay when enabled (frames 5-10)
  const glitchActive = enableGlitch && frame >= 5 && frame < 10;
  const glitchOffset = glitchActive ? (Math.sin(frame * 4) * 4) : 0;

  const verticalAlign =
    position === "top" ? "flex-start" : position === "bottom" ? "flex-end" : "center";
  // Face-Safe-Zone: Daniel's face is at y:80-560 on 1920x1080.
  // "top" = 15px padding (above face, single-line banner territory only — multi-line
  // will spill into the face). 2026-04-14: alle Multi-Line km wurden auf "bottom" umgestellt.
  // "bottom" = 120px padding (below shoulders at y:720+).
  const paddingTop = position === "top" ? 15 : 0;
  const paddingBottom = position === "bottom" ? 120 : 0;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: verticalAlign,
        alignItems: "center",
        gap: 12,
        paddingTop,
        paddingBottom,
        opacity: globalExit,
      }}
    >
      {words.map((word, i) => {
        const localFrame = frame - i * staggerFrames;

        // Opacity in
        const entryOp = interpolate(localFrame, [0, 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

        let clipPath = "inset(0 0 0 0)";
        let transform = "none";
        let blur = 0;

        if (revealType === "mask-wipe") {
          const progress = interpolate(localFrame, [0, 10], [0, 100], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.exp),
          });
          clipPath = `inset(0 ${100 - progress}% 0 0)`;
        } else if (revealType === "blur-reveal") {
          blur = interpolate(localFrame, [0, 10], [12, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.exp),
          });
        } else if (revealType === "tracking") {
          const tracking = interpolate(localFrame, [0, 25], [-0.03, 0.06], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.exp),
          });
          transform = `none`;
          // applied via letterSpacing below
          (word as any).__tracking = tracking;
        } else if (revealType === "slow-fade") {
          // Override entry opacity with slow fade 20-frame
          const slow = interpolate(localFrame, [0, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          (word as any).__slowOp = slow;
        } else if (revealType === "stamp-slam") {
          const slam = interpolate(localFrame, [0, 6, 10], [2.2, 0.92, 1.0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          transform = `scale(${slam})`;
        }

        const effectiveOp =
          revealType === "slow-fade"
            ? ((word as any).__slowOp ?? entryOp)
            : entryOp;
        const letterSpacing =
          revealType === "tracking"
            ? `${((word as any).__tracking ?? 0.04).toFixed(3)}em`
            : "0.02em";

        return (
          <div
            key={i}
            style={{
              opacity: effectiveOp,
              clipPath,
              transform,
              filter: glitchActive ? `blur(${blur}px)` : `blur(${blur}px)`,
              fontFamily: font,
              fontWeight: word.weight ?? 900,
              fontSize: word.size,
              color: word.color,
              letterSpacing,
              textTransform: "uppercase",
              lineHeight: 1,
              textShadow: "0 6px 28px rgba(0,0,0,0.7)",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {word.text}
            {glitchActive && (
              <>
                <span
                  style={{
                    position: "absolute",
                    left: glitchOffset,
                    top: 0,
                    color: "#E30613",
                    mixBlendMode: "screen",
                    opacity: 0.55,
                  }}
                >
                  {word.text}
                </span>
              </>
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export default KineticMoment;
