import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

/**
 * ListicleCounterStatCard (ovl-013) — Variant of DanielLowerThirdStatCard
 * with "1/4" counter pill top-left.
 */
export const ListicleCounterStatCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame: frame - 4, fps, config: BMF_SPRINGS.standard });
  const slideX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = seqLifecycle(frame, durationInFrames, 16, 12);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 780,
          width: 720,
          opacity,
          transform: `translateX(${slideX}px)`,
          background: BMF_COLORS.panelBg,
          border: `1.5px solid ${BMF_COLORS.goldBorder}`,
          borderRadius: 8,
          backdropFilter: "blur(20px)",
          padding: "24px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Counter pill */}
        <div
          style={{
            alignSelf: "flex-start",
            background: BMF_COLORS.goldAccent,
            color: BMF_COLORS.warmBlack,
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 30,
            padding: "4px 18px",
            borderRadius: 22,
            letterSpacing: "0.04em",
          }}
        >
          1 / 4
        </div>
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 64,
            color: BMF_COLORS.warmWhite,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          VIER DINGE
        </div>
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 700,
            fontSize: 22,
            color: BMF_COLORS.warmWhiteSoft,
            letterSpacing: "0.14em",
          }}
        >
          JEDES EINZELNE ABSURD
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default ListicleCounterStatCard;
