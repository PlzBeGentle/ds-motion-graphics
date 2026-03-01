import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { LOCOS } from "../theme/colors";

interface PathDrawProps {
  /** SVG path "d" attribute */
  d: string;
  /** Total estimated path length (for dashoffset animation) */
  pathLength?: number;
  delay?: number;
  duration?: number;
  color?: string;
  strokeWidth?: number;
  /** Glow around the stroke */
  glow?: boolean;
  /** Show a dot traveling along the path */
  travelDot?: boolean;
  width?: number;
  height?: number;
  viewBox?: string;
  style?: React.CSSProperties;
}

export const PathDraw: React.FC<PathDrawProps> = ({
  d,
  pathLength = 2000,
  delay = 0,
  duration = 30,
  color = LOCOS.gold,
  strokeWidth = 2.5,
  glow = true,
  travelDot = false,
  width = 200,
  height = 200,
  viewBox = "0 0 200 200",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 25, stiffness: 40, mass: 1.5 },
  });

  const dashOffset = interpolate(progress, [0, 1], [pathLength, 0]);

  return (
    <svg width={width} height={height} viewBox={viewBox} style={style}>
      {/* Glow layer */}
      {glow && (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 4}
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.15}
          style={{ filter: `blur(${strokeWidth * 2}px)` }}
        />
      )}
      {/* Main stroke */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Travel dot */}
      {travelDot && progress > 0.05 && progress < 0.98 && (
        <circle r={strokeWidth * 2} fill={LOCOS.goldLight} opacity={0.9}>
          {/* Using animateMotion would need SMIL — instead we approximate with offset */}
        </circle>
      )}
    </svg>
  );
};
