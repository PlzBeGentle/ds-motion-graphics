import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";

interface RadarSweepProps {
  centerX: number;
  centerY: number;
  radius?: number;
  delay?: number;
  color?: string;
  /** Speed: degrees per frame */
  speed?: number;
}

export const RadarSweep: React.FC<RadarSweepProps> = ({
  centerX,
  centerY,
  radius = 400,
  delay = 0,
  color = LOCOS.gold,
  speed = 3,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - delay;

  if (elapsed < 0) return null;

  const angle = (elapsed * speed) % 360;
  const rad = (angle * Math.PI) / 180;

  const endX = centerX + Math.cos(rad) * radius;
  const endY = centerY + Math.sin(rad) * radius;

  // Fade trail: cone gradient behind the sweep line
  const trailAngle1 = ((angle - 30) * Math.PI) / 180;
  const trailAngle2 = ((angle - 60) * Math.PI) / 180;

  const opacity = interpolate(elapsed, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <radialGradient id="radar-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sweep cone (trail) */}
      <path
        d={`M${centerX},${centerY} L${endX},${endY} A${radius},${radius} 0 0,0 ${
          centerX + Math.cos(trailAngle1) * radius
        },${centerY + Math.sin(trailAngle1) * radius} Z`}
        fill={color}
        opacity={0.06}
      />
      <path
        d={`M${centerX},${centerY} L${
          centerX + Math.cos(trailAngle1) * radius
        },${centerY + Math.sin(trailAngle1) * radius} A${radius},${radius} 0 0,0 ${
          centerX + Math.cos(trailAngle2) * radius
        },${centerY + Math.sin(trailAngle2) * radius} Z`}
        fill={color}
        opacity={0.03}
      />

      {/* Sweep line */}
      <line
        x1={centerX}
        y1={centerY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth="1.5"
        opacity={0.4}
      />

      {/* Center dot */}
      <circle cx={centerX} cy={centerY} r={3} fill={color} opacity={0.6} />

      {/* Range rings */}
      {[0.33, 0.66, 1].map((r, i) => (
        <circle
          key={i}
          cx={centerX}
          cy={centerY}
          r={radius * r}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity={0.1}
          strokeDasharray="4 8"
        />
      ))}
    </svg>
  );
};
