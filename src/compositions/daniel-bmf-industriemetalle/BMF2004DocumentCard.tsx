// Iter2.3 — BMF2004DocumentCard small reference card
// Feedback Bild 2: GesetzesBlatt3D box way too large for just "22 Jahre galt"
// ovl-009: 28. Januar 2004 BMF-Schreiben editorial reference (no real asset)

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";

export const BMF2004DocumentCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const slideY = interpolate(entry, [0, 1], [30, 0]);
  const scale = interpolate(entry, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 1140,
          top: 260,
          width: 720,
          opacity,
          transform: `translateY(${slideY}px) scale(${scale}) rotateY(-5deg)`,
          transformOrigin: "left center",
          padding: "36px 44px",
          background: "rgba(18, 14, 8, 0.94)",
          backdropFilter: "blur(22px) saturate(1.2)",
          WebkitBackdropFilter: "blur(22px) saturate(1.2)",
          border: "1.5px solid rgba(245, 211, 122, 0.42)",
          borderRadius: 12,
          boxShadow:
            "0 28px 70px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 800,
            fontSize: 16,
            color: "rgba(245, 211, 122, 0.78)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          BMF · 28. Januar 2004
        </div>

        {/* Gold divider */}
        <div
          style={{
            height: 2,
            width: 60,
            background: "#d4a017",
            boxShadow: "0 0 10px rgba(212, 160, 23, 0.5)",
          }}
        />

        {/* Main label */}
        <div
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 900,
            fontSize: 44,
            color: "#fff5e0",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          IV D 1 — S 7157 — 01/04
        </div>

        {/* Sub */}
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: 20,
            color: "rgba(255, 245, 224, 0.72)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Bundessteuerblatt I · S. 242
        </div>

        {/* Highlight */}
        <div
          style={{
            marginTop: 8,
            fontFamily: '"Inter", sans-serif',
            fontSize: 24,
            fontStyle: "italic",
            color: "#fff5e0",
          }}
        >
          Die Regel, die{" "}
          <span
            style={{
              background: "rgba(245, 211, 122, 0.28)",
              padding: "2px 6px",
              color: "#f5d37a",
              fontWeight: 800,
              fontStyle: "normal",
            }}
          >
            22 Jahre
          </span>{" "}
          galt.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default BMF2004DocumentCard;
