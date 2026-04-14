import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

/**
 * SchweizLocationCard (ovl-034) — Warm payoff location card.
 * BG placeholder (warm gradient until real schweiz-alpen.jpg present), flag,
 * LOESUNG / SCHWEIZ label. Parallax-depth reveal.
 */
export const SchweizLocationCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 20, 16);

  const bgBlur = interpolate(frame, [0, 22], [4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const panelProgress = interpolate(frame, [6, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const flagProgress = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // KenBurns drift on BG
  const kbScale = interpolate(frame, [0, durationInFrames], [1.0, 1.06]);
  const kbX = interpolate(frame, [0, durationInFrames], [0, -12]);
  const kbY = interpolate(frame, [0, durationInFrames], [0, -8]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 1180,
          top: 140,
          width: 720,
          height: 800,
          opacity,
          borderRadius: 12,
          overflow: "hidden",
          border: `1.5px solid rgba(212,160,23,0.45)`,
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* BG placeholder — warm gold/alpine gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #3a2d1a 0%, #5c4420 35%, #8a6a2c 65%, #3a2d1a 100%)",
            filter: `blur(${bgBlur}px)`,
            transform: `scale(${kbScale}) translate(${kbX}px, ${kbY}px)`,
          }}
        />
        {/* Vignette */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, transparent 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Darker warm overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: BMF_COLORS.panelBgSoft,
            opacity: 0.72,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
            gap: 20,
            opacity: panelProgress,
            transform: `translateY(${(1 - panelProgress) * 20}px)`,
          }}
        >
          {/* Swiss flag */}
          <div
            style={{
              width: 120,
              height: 120,
              background: "#ff0000",
              position: "relative",
              opacity: flagProgress,
              transform: `scale(${flagProgress})`,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 60,
                height: 18,
                background: "#fff",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 18,
                height: 60,
                background: "#fff",
              }}
            />
          </div>

          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 700,
              fontSize: 26,
              color: BMF_COLORS.goldAccent,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            LÖSUNG
          </div>
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 900,
              fontSize: 96,
              color: BMF_COLORS.warmWhite,
              letterSpacing: "0.02em",
              lineHeight: 1,
              textShadow: "0 6px 28px rgba(0,0,0,0.8)",
            }}
          >
            SCHWEIZ
          </div>
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 700,
              fontSize: 22,
              color: BMF_COLORS.warmWhiteSoft,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop: 12,
              padding: "8px 20px",
              border: `1.5px solid ${BMF_COLORS.goldBorder}`,
              borderRadius: 4,
            }}
          >
            DIREKT-LAGERUNG
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default SchweizLocationCard;
