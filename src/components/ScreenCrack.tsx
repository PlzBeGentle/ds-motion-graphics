import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { LOCOS } from "../theme/colors";

interface ScreenCrackProps {
  /** Frame at which crack appears */
  triggerFrame: number;
  /** Origin X (0-1920) */
  originX?: number;
  /** Origin Y (0-1080) */
  originY?: number;
}

export const ScreenCrack: React.FC<ScreenCrackProps> = ({
  triggerFrame,
  originX = 960,
  originY = 540,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const crackProgress = spring({
    frame: frame - triggerFrame,
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.3 },
  });

  if (crackProgress < 0.01) return null;

  // Generate crack lines radiating from origin
  const cracks = [
    // Main cracks
    `M${originX},${originY} l${-120 * crackProgress},${-80 * crackProgress} l${-40 * crackProgress},${-60 * crackProgress}`,
    `M${originX},${originY} l${100 * crackProgress},${-110 * crackProgress} l${60 * crackProgress},${-30 * crackProgress}`,
    `M${originX},${originY} l${-80 * crackProgress},${90 * crackProgress} l${-50 * crackProgress},${40 * crackProgress}`,
    `M${originX},${originY} l${130 * crackProgress},${60 * crackProgress} l${30 * crackProgress},${50 * crackProgress}`,
    `M${originX},${originY} l${-30 * crackProgress},${-130 * crackProgress}`,
    `M${originX},${originY} l${60 * crackProgress},${-50 * crackProgress} l${80 * crackProgress},${10 * crackProgress}`,
    // Secondary branches
    `M${originX - 120 * crackProgress},${originY - 80 * crackProgress} l${-30 * crackProgress},${20 * crackProgress}`,
    `M${originX + 100 * crackProgress},${originY - 110 * crackProgress} l${20 * crackProgress},${-40 * crackProgress}`,
    `M${originX + 130 * crackProgress},${originY + 60 * crackProgress} l${-20 * crackProgress},${30 * crackProgress}`,
  ];

  const fadeOut = interpolate(
    frame - triggerFrame,
    [0, 30, 60],
    [1, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: fadeOut,
        zIndex: 100,
      }}
    >
      {/* Glow layer */}
      {cracks.map((d, i) => (
        <path
          key={`glow-${i}`}
          d={d}
          stroke={LOCOS.white}
          strokeWidth="4"
          fill="none"
          opacity={0.15}
          style={{ filter: "blur(4px)" }}
        />
      ))}
      {/* Main cracks */}
      {cracks.map((d, i) => (
        <path
          key={`crack-${i}`}
          d={d}
          stroke={LOCOS.white}
          strokeWidth={i < 6 ? 1.5 : 0.8}
          fill="none"
          opacity={i < 6 ? 0.7 : 0.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {/* Impact point */}
      <circle
        cx={originX}
        cy={originY}
        r={5 * crackProgress}
        fill={LOCOS.white}
        opacity={0.3}
      />
    </svg>
  );
};
