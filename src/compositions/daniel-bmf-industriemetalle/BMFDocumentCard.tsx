import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

interface Props {
  logoText?: string;
  badgeText?: string;
  headline?: string;
  underlineColor?: string;
  docPages?: number;
  paperColor?: string;
  sepia?: boolean;
  sealStamp?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

/**
 * BMFDocumentCard — Base BMF paper card (ovl-002/ovl-009/ovl-018/ovl-026 template).
 * 3D rotateY entry, paper white bg, BMF eagle stub, headline + red underline.
 */
export const BMFDocumentCard: React.FC<Props> = ({
  logoText = "BUNDESFINANZ\nMINISTERIUM",
  badgeText = "BMF · 9. APRIL 2026",
  headline = "SCHREIBEN",
  underlineColor = BMF_COLORS.redAccent,
  docPages = 7,
  paperColor = BMF_COLORS.paperWhite,
  sepia = false,
  sealStamp,
  x = 1220,
  y = 120,
  w = 620,
  h = 820,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 3D rotation entrance
  const rotateY = interpolate(frame, [0, 20], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scaleIn = interpolate(frame, [0, 20], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = seqLifecycle(frame, durationInFrames, 14, 14);
  const breathe = 1 + 0.003 * Math.sin((frame / 100) * 2 * Math.PI);

  // Underline draw after entrance
  const underlineWidth = interpolate(frame, [24, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none", perspective: 1000 }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: h,
          opacity,
          transform: `rotateY(${rotateY}deg) scale(${scaleIn * breathe})`,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          backgroundColor: paperColor,
          boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5)",
          borderRadius: 4,
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          filter: sepia ? "sepia(0.14) saturate(0.85)" : "none",
        }}
      >
        {/* Eagle icon stub */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            background: "#1a1918",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: BMF_COLORS.goldAccent,
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 32,
          }}
        >
          BRD
        </div>

        {/* Logo */}
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 26,
            color: "#0a0a0a",
            lineHeight: 1.15,
            letterSpacing: "0.02em",
            whiteSpace: "pre-line",
          }}
        >
          {logoText}
        </div>

        {/* Gold divider */}
        <div style={{ height: 2, width: 80, background: BMF_COLORS.goldAccent }} />

        {/* Badge */}
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 800,
            fontSize: 18,
            color: "#555",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {badgeText}
        </div>

        {/* Headline + underline */}
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 900,
              fontSize: 72,
              color: "#0a0a0a",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              marginTop: 10,
              height: 6,
              width: `${underlineWidth * 80}%`,
              background: underlineColor,
            }}
          />
        </div>

        {/* Page counter */}
        <div
          style={{
            fontFamily: BMF_FONTS.mono,
            fontWeight: 700,
            fontSize: 14,
            color: "#888",
            letterSpacing: "0.18em",
          }}
        >
          {docPages} SEITEN
        </div>

        {/* Optional seal stamp */}
        {sealStamp && (
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 28,
              width: 110,
              height: 110,
              borderRadius: 55,
              border: `4px solid ${BMF_COLORS.redAccent}`,
              color: BMF_COLORS.redAccent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: BMF_FONTS.sans,
              fontWeight: 900,
              fontSize: 32,
              transform: "rotate(-8deg)",
              opacity: 0.85,
              letterSpacing: "0.02em",
            }}
          >
            {sealStamp}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export default BMFDocumentCard;
