import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, panelStyle, seqLifecycle } from "./bmf-theme";

interface Props {
  heroLabel: string;
  heroUnit?: string;
  sub: string;
  accentColor?: string;
  x?: number;
  y?: number;
  w?: number;
  heroSize?: number;
}

/**
 * DanielLowerThirdStatCard — Base StatCard (ovl-001 template)
 * Lower-third anchor. Inter 900 hero-number + sub-label.
 * Glass panel with gold border, slide-in-left + fade-out.
 */
export const DanielLowerThirdStatCard: React.FC<Props> = ({
  heroLabel,
  heroUnit,
  sub,
  accentColor = BMF_COLORS.goldAccent,
  x = 80,
  y = 780,
  w = 640,
  heroSize = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame: frame - 3, fps, config: BMF_SPRINGS.standard });
  const slideX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = seqLifecycle(frame, durationInFrames, 16, 12);
  const breathe = 1 + 0.003 * Math.sin((frame / 100) * 2 * Math.PI);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          opacity,
          transform: `translateX(${slideX}px) scale(${breathe})`,
          transformOrigin: "left center",
          padding: "22px 28px",
          ...panelStyle(),
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: heroSize,
            color: accentColor,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          {heroLabel}
          {heroUnit && (
            <span
              style={{
                fontSize: heroSize * 0.32,
                color: BMF_COLORS.warmWhite,
                marginLeft: 14,
                letterSpacing: "0.08em",
              }}
            >
              {heroUnit}
            </span>
          )}
        </div>
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 700,
            fontSize: 22,
            color: BMF_COLORS.warmWhiteSoft,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default DanielLowerThirdStatCard;
