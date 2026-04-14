import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

/**
 * PercentDownStatCard (ovl-023) — Big percent + down-arrow + count-up.
 * "19% Aufpreis, niemand kauft"
 */
export const PercentDownStatCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame: frame - 4, fps, config: BMF_SPRINGS.standard });
  const slideX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = seqLifecycle(frame, durationInFrames, 16, 12);

  // Count-up from 0 to 19 over 25 frames starting at frame 10
  const count = interpolate(frame, [10, 35], [0, 19], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 780,
          width: 760,
          opacity,
          transform: `translateX(${slideX}px)`,
          background: BMF_COLORS.panelBg,
          border: `1.5px solid ${BMF_COLORS.goldBorder}`,
          borderRadius: 8,
          backdropFilter: "blur(20px)",
          padding: "28px 36px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Down arrow */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "36px solid transparent",
            borderRight: "36px solid transparent",
            borderTop: `54px solid ${BMF_COLORS.redAccent}`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              fontFamily: BMF_FONTS.mono,
              fontWeight: 900,
              fontSize: 160,
              color: BMF_COLORS.redAccent,
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            {Math.round(count)}
            <span style={{ fontSize: 100, marginLeft: 6 }}>%</span>
          </div>
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 700,
              fontSize: 24,
              color: BMF_COLORS.warmWhite,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            AUFPREIS · NIEMAND KAUFT
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default PercentDownStatCard;
