import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";
import { DIVERSIFICATION_TARGETS } from "../data/transcript";

// Simplified world map as SVG dots/lines
const WorldMapOutline: React.FC<{ euPulse: number }> = ({ euPulse }) => {
  // Simplified continent outlines as dot clusters
  const continents = {
    europe: [
      // Rough EU area dots
      [880, 320], [900, 300], [920, 310], [940, 320], [960, 300],
      [880, 340], [900, 330], [920, 340], [940, 340], [960, 330],
      [900, 360], [920, 360], [940, 360], [960, 350],
      [880, 380], [900, 380], [920, 380], [940, 380],
      [900, 400], [920, 400], [940, 400],
      [920, 420], [940, 420],
    ],
    northAmerica: [
      [300, 280], [320, 260], [340, 280], [360, 300], [380, 290],
      [320, 300], [340, 320], [360, 330], [380, 320],
      [300, 320], [320, 340], [340, 350],
      [280, 300], [260, 320],
    ],
    southAmerica: [
      [420, 500], [440, 480], [460, 500], [440, 520],
      [430, 540], [450, 540], [440, 560], [430, 580],
      [420, 600], [440, 600], [430, 620],
    ],
    africa: [
      [920, 460], [940, 440], [960, 460], [940, 480],
      [920, 500], [940, 500], [960, 500],
      [930, 520], [950, 520], [940, 540],
      [930, 560], [940, 580],
    ],
    asia: [
      [1100, 300], [1120, 280], [1140, 300], [1160, 280],
      [1100, 320], [1120, 320], [1140, 320], [1160, 320], [1180, 310],
      [1120, 340], [1140, 340], [1160, 340], [1200, 330],
      [1140, 360], [1160, 360], [1180, 360], [1200, 350],
      [1200, 380], [1220, 370], [1240, 380],
      [1300, 340], [1320, 350], [1340, 340], [1360, 350],
      [1380, 360], [1400, 370], [1420, 380],
      [1300, 380], [1320, 380], [1340, 380],
    ],
    oceania: [
      [1400, 560], [1420, 550], [1440, 560], [1460, 570],
      [1420, 580], [1440, 580], [1460, 590],
    ],
  };

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {/* Non-EU continents */}
      {[
        ...continents.northAmerica,
        ...continents.southAmerica,
        ...continents.africa,
        ...continents.asia,
        ...continents.oceania,
      ].map(([x, y], i) => (
        <circle
          key={`world-${i}`}
          cx={x}
          cy={y}
          r={4}
          fill={LOCOS.silver}
          opacity={0.3}
        />
      ))}

      {/* EU dots - pulsing red */}
      {continents.europe.map(([x, y], i) => (
        <circle
          key={`eu-${i}`}
          cx={x}
          cy={y}
          r={5}
          fill={LOCOS.red}
          opacity={0.4 + euPulse * 0.4}
        />
      ))}

      {/* EU glow overlay */}
      <circle
        cx={920}
        cy={360}
        r={80}
        fill="none"
        stroke={LOCOS.red}
        strokeWidth="2"
        opacity={0.2 + euPulse * 0.3}
        strokeDasharray="8 4"
      />
    </svg>
  );
};

// Animated arrow from EU to target
const FlightArrow: React.FC<{
  targetX: number;
  targetY: number;
  delay: number;
}> = ({ targetX, targetY, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 60, mass: 1 },
  });

  // Start from EU center
  const startX = 920;
  const startY = 360;

  const currentX = interpolate(progress, [0, 1], [startX, targetX]);
  const currentY = interpolate(progress, [0, 1], [startY, targetY]);

  // Control point for curve
  const cpX = (startX + targetX) / 2;
  const cpY = Math.min(startY, targetY) - 80;

  const pathLength = progress;

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id={`arrow-grad-${targetX}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={LOCOS.gold} stopOpacity="0.2" />
          <stop offset="100%" stopColor={LOCOS.goldLight} stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${targetX} ${targetY}`}
        stroke={`url(#arrow-grad-${targetX})`}
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="1600"
        strokeDashoffset={1600 - 1600 * pathLength}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Weltkarte: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // EU pulse
  const euPulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0, 1]
  );

  // Map fade in
  const mapIn = spring({
    frame: frame - 3,
    fps,
    config: { damping: 20, stiffness: 60, mass: 1 },
  });

  return (
    <AbsoluteFill style={{ opacity: mapIn }}>
      {/* World map */}
      <WorldMapOutline euPulse={euPulse} />

      {/* Flight arrows */}
      {DIVERSIFICATION_TARGETS.map((target, i) => (
        <FlightArrow
          key={i}
          targetX={target.x}
          targetY={target.y}
          delay={30 + i * 20}
        />
      ))}

      {/* Target dots and labels */}
      {DIVERSIFICATION_TARGETS.map((target, i) => {
        const dotDelay = 50 + i * 20;
        const dotIn = spring({
          frame: frame - dotDelay,
          fps,
          config: { damping: 10, stiffness: 120, mass: 0.6 },
        });

        const pulse = interpolate(
          Math.sin((frame - dotDelay) * 0.15),
          [-1, 1],
          [0.8, 1.2]
        );

        return (
          <React.Fragment key={i}>
            {/* Green dot */}
            <div
              style={{
                position: "absolute",
                left: target.x - 8,
                top: target.y - 8,
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
                boxShadow: "0 0 20px #4CAF5080",
                opacity: dotIn,
                transform: `scale(${frame > dotDelay ? pulse : 0})`,
              }}
            />
            {/* Label */}
            <div
              style={{
                position: "absolute",
                left: target.x + 16,
                top: target.y - 10,
                fontFamily: FONT_FAMILY.body,
                fontWeight: 700,
                fontSize: 20,
                color: LOCOS.white,
                opacity: dotIn,
                letterSpacing: "0.04em",
                textShadow: "0 0 10px rgba(0,0,0,0.8)",
              }}
            >
              {target.name}
            </div>
          </React.Fragment>
        );
      })}

      {/* EU label */}
      <div
        style={{
          position: "absolute",
          left: 840,
          top: 440,
          fontFamily: FONT_FAMILY.headline,
          fontWeight: 700,
          fontSize: 22,
          color: LOCOS.red,
          opacity: 0.5 + euPulse * 0.5,
          letterSpacing: "0.1em",
        }}
      >
        EU-ZONE
      </div>
    </AbsoluteFill>
  );
};
