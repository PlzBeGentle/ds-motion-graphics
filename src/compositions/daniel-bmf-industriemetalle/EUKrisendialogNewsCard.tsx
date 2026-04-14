// Iter2.3 — EUKrisendialogNewsCard simple 2D card (was NewspaperMockup3D)
// Feedback Bild 9: too much text + text overflow in NewspaperMockup3D box
// ovl-029: EU Krisendialog Oktober 2025

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
  Easing,
} from "remotion";

export const EUKrisendialogNewsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const slideY = interpolate(entry, [0, 1], [30, 0]);
  const scale = interpolate(entry, [0, 1], [0.94, 1]);

  const dividerProgress = interpolate(frame, [14, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 1080,
          top: 180,
          width: 820,
          opacity,
          transform: `translateY(${slideY}px) scale(${scale}) rotateY(-4deg)`,
          transformOrigin: "left center",
          padding: "44px 48px",
          background: "rgba(14, 12, 8, 0.95)",
          backdropFilter: "blur(22px) saturate(1.2)",
          WebkitBackdropFilter: "blur(22px) saturate(1.2)",
          border: "1.5px solid rgba(245, 211, 122, 0.42)",
          borderRadius: 14,
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* Source + Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: '"Inter", sans-serif',
            fontWeight: 800,
            fontSize: 18,
            color: "rgba(245, 211, 122, 0.82)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span>EU · BRÜSSEL</span>
          <span style={{ color: "#E30613" }}>OKT 2025</span>
        </div>

        {/* Gold divider */}
        <div
          style={{
            height: 2,
            width: `${dividerProgress * 100}%`,
            background: "linear-gradient(90deg, #d4a017, transparent)",
            boxShadow: "0 0 12px rgba(212, 160, 23, 0.5)",
          }}
        />

        {/* Headline */}
        <div
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 900,
            fontSize: 64,
            color: "#fff5e0",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            textShadow: "0 4px 20px rgba(0,0,0,0.72)",
          }}
        >
          EU SCHLÄGT ALARM
        </div>
        <div
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 900,
            fontSize: 36,
            color: "#E30613",
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
          }}
        >
          Krisendialog · Kritische Rohstoffe
        </div>

        {/* Meta footer */}
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: 18,
            color: "rgba(255, 245, 224, 0.68)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          Europäische Kommission · Krisensitzung
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default EUKrisendialogNewsCard;
