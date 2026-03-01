import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";

interface ImpactShockwaveProps {
  triggerFrame: number;
  x: number;
  y: number;
  color?: string;
  maxRadius?: number;
  duration?: number;
}

export const ImpactShockwave: React.FC<ImpactShockwaveProps> = ({
  triggerFrame,
  x,
  y,
  color = LOCOS.gold,
  maxRadius = 120,
  duration = 20,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - triggerFrame;

  if (elapsed < 0 || elapsed > duration) return null;

  const progress = elapsed / duration;
  const radius = progress * maxRadius;
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.6, 0]);
  const strokeWidth = interpolate(progress, [0, 1], [4, 1]);

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {/* Second ring, delayed */}
      {elapsed > 3 && (
        <circle
          cx={x}
          cy={y}
          r={Math.max(0, (elapsed - 3) / duration * maxRadius)}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 0.6}
          opacity={opacity * 0.5}
        />
      )}
    </svg>
  );
};
