// Phase F.5 — DanielLowerThirdStatCard rewritten with CountUp + ShinyText + glass card
// ovl-001: "5 STUNDEN NACHTSCHICHT" lower-third, word-sync 162-249 (5.42s→8.31s)

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";
import { CountUp } from "../../components/library/effects/CountUp";
import { ShinyText } from "../../components/library/text/ShinyText";

interface Props {
  heroLabel?: string;
  heroUnit?: string;
  sub?: string;
}

export const DanielLowerThirdStatCard: React.FC<Props> = ({
  heroLabel = "5",
  heroUnit = "STUNDEN",
  sub = "NACHTSCHICHT AN EINEM THEMA",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - 3,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.8 },
  });
  const slideX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const breathe = 1 + 0.003 * Math.sin((frame / 100) * 2 * Math.PI);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 740,
          width: 760,
          opacity,
          transform: `translateX(${slideX}px) scale(${breathe})`,
          transformOrigin: "left center",
          padding: "28px 36px",
          background: "rgba(14, 12, 8, 0.88)",
          backdropFilter: "blur(22px) saturate(1.2)",
          WebkitBackdropFilter: "blur(22px) saturate(1.2)",
          border: "1.5px solid rgba(245, 211, 122, 0.35)",
          borderRadius: 16,
          boxShadow:
            "0 24px 72px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Hero row: CountUp value + ShinyText label */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
          }}
        >
          <CountUp
            value={Number(heroLabel)}
            startValue={0}
            fontSize={168}
            color="#f5d37a"
            fontWeight={900}
            colorScheme="gold"
            springPreset="snappy"
            startFrame={6}
          />
          <ShinyText
            fontSize={56}
            fontWeight={900}
            fontFamily='"Montserrat", "Inter", sans-serif'
            baseColor="rgba(255, 245, 224, 0.35)"
            shineColor="#fff5e0"
            shineWidth={40}
            speed={90}
            startFrame={20}
          >
            {heroUnit}
          </ShinyText>
        </div>

        {/* Sub label */}
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: 24,
            color: "rgba(255, 245, 224, 0.82)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {sub}
        </div>

        {/* Gold accent line */}
        <div
          style={{
            height: 3,
            width: interpolate(frame, [12, 32], [0, 260], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            background: "linear-gradient(90deg, #d4a017, #f5d37a)",
            boxShadow: "0 0 16px rgba(245, 211, 122, 0.72)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export default DanielLowerThirdStatCard;
