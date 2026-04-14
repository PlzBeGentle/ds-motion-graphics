import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

interface Props {
  headline?: string;
  sub?: string;
  accent?: string;
}

/**
 * TrustCheckmarkStatCard (ovl-032) — green checkmark trust card.
 * Altbestand Vertrauensschutz — lower-third left.
 */
export const TrustCheckmarkStatCard: React.FC<Props> = ({
  headline = "ALTBESTAND · VERTRAUENSSCHUTZ",
  sub = "IHRE RESERVEN SIND SICHER",
  accent = BMF_COLORS.greenPositive,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame: frame - 4, fps, config: BMF_SPRINGS.standard });
  const slideX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = seqLifecycle(frame, durationInFrames, 16, 14);

  const checkProgress = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 760,
          width: 820,
          opacity,
          transform: `translateX(${slideX}px)`,
          background: BMF_COLORS.panelBg,
          borderLeft: `4px solid ${accent}`,
          borderRadius: 8,
          backdropFilter: "blur(20px)",
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Checkmark */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            background: `${accent}22`,
            border: `3px solid ${accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <polyline
              points="8,22 17,30 32,12"
              fill="none"
              stroke={accent}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset={60 - checkProgress * 60}
            />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 900,
              fontSize: 44,
              color: BMF_COLORS.warmWhite,
              lineHeight: 1.05,
              letterSpacing: "0.01em",
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 700,
              fontSize: 24,
              color: BMF_COLORS.warmWhiteSoft,
              letterSpacing: "0.12em",
            }}
          >
            {sub}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default TrustCheckmarkStatCard;
