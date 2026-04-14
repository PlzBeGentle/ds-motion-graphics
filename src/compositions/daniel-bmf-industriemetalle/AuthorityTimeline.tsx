// Iter2.6 — AuthorityTimeline 2D replacement (was GlareCard3D causing R3F error)
// ovl-037: "20 JAHRE FINANZBRANCHE · DANIEL SAUER · SEIT 2006"

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
  Easing,
} from "remotion";

export const AuthorityTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const slideX = interpolate(entry, [0, 1], [-60, 0]);
  const scale = interpolate(entry, [0, 1], [0.92, 1]);

  // Count from 0 to 20
  const count = Math.round(
    interpolate(frame, [12, 48], [0, 20], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 780,
          width: 880,
          opacity,
          transform: `translateX(${slideX}px) scale(${scale})`,
          transformOrigin: "left center",
          padding: "30px 40px",
          background: "rgba(14, 10, 4, 0.94)",
          backdropFilter: "blur(22px) saturate(1.2)",
          WebkitBackdropFilter: "blur(22px) saturate(1.2)",
          border: "1.5px solid rgba(245, 211, 122, 0.48)",
          borderRadius: 14,
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.75), 0 0 60px rgba(245, 211, 122, 0.22), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* Hero number */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 148,
              color: "#f5d37a",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              textShadow: "0 0 32px rgba(245, 211, 122, 0.55)",
            }}
          >
            {count}
          </div>
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 56,
              color: "#fff5e0",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            JAHRE
          </div>
        </div>

        {/* Gold separator */}
        <div
          style={{
            width: 3,
            height: 120,
            background: "linear-gradient(180deg, transparent, #f5d37a, transparent)",
            boxShadow: "0 0 12px rgba(245, 211, 122, 0.5)",
          }}
        />

        {/* Label */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 42,
              color: "#fff5e0",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            FINANZBRANCHE
          </div>
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: 20,
              color: "rgba(245, 211, 122, 0.82)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Daniel Sauer · Seit 2006
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default AuthorityTimeline;
