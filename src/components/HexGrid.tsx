import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";

interface HexGridProps {
  /** Grid appears starting at this frame */
  delay?: number;
  opacity?: number;
}

export const HexGrid: React.FC<HexGridProps> = ({
  delay = 0,
  opacity = 0.08,
}) => {
  const frame = useCurrentFrame();

  const gridOpacity = interpolate(frame - delay, [0, 20], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Generate hex grid points
  const hexes = useMemo(() => {
    const result: { cx: number; cy: number }[] = [];
    const size = 50;
    const h = size * Math.sqrt(3);
    for (let row = -1; row < 24; row++) {
      for (let col = -1; col < 42; col++) {
        const cx = col * size * 1.5;
        const cy = row * h + (col % 2 === 0 ? 0 : h / 2);
        result.push({ cx, cy });
      }
    }
    return result;
  }, []);

  if (gridOpacity < 0.001) return null;

  // Hex path
  const hexPath = (cx: number, cy: number, s: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + s * Math.cos(angle)},${cy + s * Math.sin(angle)}`;
    });
    return `M${pts.join("L")}Z`;
  };

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: gridOpacity,
      }}
    >
      {hexes.map((h, i) => (
        <path
          key={i}
          d={hexPath(h.cx, h.cy, 24)}
          fill="none"
          stroke={LOCOS.gold}
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
};
