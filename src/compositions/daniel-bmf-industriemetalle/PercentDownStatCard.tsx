// Phase F.5 — PercentDownStatCard rewritten with CountUp + red-glow glass card
// ovl-023: "19%" — the hidden VAT uplift nobody wants to pay

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";
import { CountUp } from "../../components/library/effects/CountUp";

export const PercentDownStatCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.8 },
  });
  const slideX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Red-glow pulse
  const glowPulse = 0.7 + 0.3 * Math.sin((frame / 24) * Math.PI * 2);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 720,
          width: 820,
          opacity,
          transform: `translateX(${slideX}px)`,
          padding: "32px 40px",
          background: "rgba(18, 8, 8, 0.92)",
          backdropFilter: "blur(22px) saturate(1.3)",
          WebkitBackdropFilter: "blur(22px) saturate(1.3)",
          border: "1.5px solid rgba(227, 6, 19, 0.55)",
          borderRadius: 18,
          boxShadow: `0 24px 72px rgba(0,0,0,0.78), 0 0 72px rgba(227, 6, 19, ${
            0.28 * glowPulse
          }), inset 0 1px 0 rgba(255,255,255,0.08)`,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* Hero row: CountUp + down arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <CountUp
            value={19}
            startValue={0}
            suffix="%"
            fontSize={192}
            color="#E30613"
            fontWeight={900}
            springPreset="snappy"
            startFrame={10}
          />
          {/* Down arrow */}
          <svg width={96} height={120} viewBox="0 0 96 120" style={{ marginBottom: 12 }}>
            <path
              d="M 48 12 L 48 92 M 20 72 L 48 100 L 76 72"
              stroke="#E30613"
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{
                filter: "drop-shadow(0 0 16px rgba(227, 6, 19, 0.78))",
                opacity: interpolate(frame, [20, 40], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
          </svg>
        </div>

        <div
          style={{
            fontFamily: '"Montserrat", "Inter", sans-serif',
            fontWeight: 900,
            fontSize: 40,
            color: "#fff5e0",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          AUFPREIS · NIEMAND KAUFT
        </div>

        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: 22,
            color: "rgba(255, 245, 224, 0.68)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          USt · SOFORT FÄLLIG · KEIN MARKT
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default PercentDownStatCard;
