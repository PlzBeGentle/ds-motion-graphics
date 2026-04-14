import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

interface Props {
  headline?: string;
  sub?: string;
  accentColor?: string;
  showClockIcon?: boolean;
  x?: number;
  y?: number;
  w?: number;
}

/**
 * DonnerstagNewsCard (ovl-011 / ovl-029 template) — red-accent news card.
 * 3D rotateY entry + fly-out-right.
 */
export const DonnerstagNewsCard: React.FC<Props> = ({
  headline = "DONNERSTAG · 20 UHR",
  sub = "INOFFIZIELL VERTEILT",
  accentColor = BMF_COLORS.redAccent,
  showClockIcon = true,
  x = 1200,
  y = 640,
  w = 640,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const rotateY = interpolate(frame, [0, 16], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = seqLifecycle(frame, durationInFrames, 14, 12);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", perspective: 1000 }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          opacity,
          transform: `rotateY(${rotateY}deg)`,
          transformOrigin: "right center",
          background: BMF_COLORS.panelBg,
          borderLeft: `4px solid ${accentColor}`,
          borderRadius: 6,
          backdropFilter: "blur(18px)",
          padding: "24px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {showClockIcon && (
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              border: `2px solid ${accentColor}`,
              position: "relative",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 2,
                height: 14,
                background: accentColor,
                transformOrigin: "top center",
                transform: "translate(-50%, 0)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 12,
                height: 2,
                background: accentColor,
                transformOrigin: "left center",
                transform: "translate(0, -50%)",
              }}
            />
          </div>
        )}
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 48,
            color: BMF_COLORS.warmWhite,
            letterSpacing: "0.02em",
            lineHeight: 1.05,
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
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default DonnerstagNewsCard;
