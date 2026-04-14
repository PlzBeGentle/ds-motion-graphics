// Iter2.2 — TrustCheckmarkStatCard: 2D replacement for Safe3D
// Safe3D caused R3F "Hooks can only be used within Canvas component" crash
// + visually broken (safe door disappeared). Replaced with pure CSS glass card
// + animated green checkmark SVG.
// ovl-032: Altbestand-Vertrauensschutz trust card

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
  Easing,
} from "remotion";

export const TrustCheckmarkStatCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const scale = interpolate(entry, [0, 1], [0.88, 1]);

  // Checkmark SVG path draw
  const checkProgress = interpolate(frame, [18, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Green glow pulse
  const glowPulse = 0.7 + 0.3 * Math.sin((frame / 22) * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          padding: "54px 72px",
          background: "rgba(8, 18, 10, 0.92)",
          backdropFilter: "blur(24px) saturate(1.3)",
          WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          border: "1.5px solid rgba(93, 235, 147, 0.55)",
          borderRadius: 20,
          boxShadow: `0 40px 120px rgba(0,0,0,0.82), 0 0 80px rgba(93, 235, 147, ${
            0.32 * glowPulse
          }), inset 0 1px 0 rgba(255,255,255,0.1)`,
          display: "flex",
          alignItems: "center",
          gap: 44,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {/* Green checkmark circle */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: 90,
            background: "rgba(93, 235, 147, 0.15)",
            border: "4px solid #5DEB93",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 48px rgba(93, 235, 147, ${0.5 * glowPulse})`,
            flexShrink: 0,
          }}
        >
          <svg width={100} height={100} viewBox="0 0 100 100">
            <path
              d="M 20 52 L 42 74 L 82 28"
              stroke="#5DEB93"
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={120}
              strokeDashoffset={120 * (1 - checkProgress)}
              style={{ filter: "drop-shadow(0 0 12px rgba(93, 235, 147, 0.82))" }}
            />
          </svg>
        </div>

        {/* Text column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 800,
              fontSize: 26,
              color: "rgba(93, 235, 147, 0.88)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            VERTRAUENSSCHUTZ
          </div>
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 96,
              color: "#fff5e0",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow: "0 4px 24px rgba(0,0,0,0.72)",
            }}
          >
            ALTBESTAND GESCHÜTZT
          </div>
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: 28,
              color: "rgba(255, 245, 224, 0.82)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Nicht-Beanstandungsklausel · BMF § 4 Nr. 4b
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default TrustCheckmarkStatCard;
