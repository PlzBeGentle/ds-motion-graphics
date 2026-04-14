// Iter2.5 — MovingGridBG: animated black grid background for fullscreen cards
// Feedback Bild 17: "moving bg, am besten so schwarz mit diesen grid linen das
// sich aber die ganze zeit bewegt" — used as backdrop layer behind centered
// fullscreen content (ovl-024 NullEuroBilanz + ovl-032 TrustCheckmark).

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from "remotion";

type MovingGridBGProps = {
  gridSize?: number;
  gridColor?: string;
  accentColor?: string;
  speed?: number; // px per frame for horizontal drift
  verticalSpeed?: number;
  vignette?: boolean;
};

export const MovingGridBG: React.FC<MovingGridBGProps> = ({
  gridSize = 80,
  gridColor = "rgba(245, 211, 122, 0.14)",
  accentColor = "rgba(245, 211, 122, 0.22)",
  speed = 0.6,
  verticalSpeed = 0.3,
  vignette = true,
}) => {
  const frame = useCurrentFrame();

  // Continuous drift
  const driftX = (frame * speed) % gridSize;
  const driftY = (frame * verticalSpeed) % gridSize;

  // Accent beam that sweeps across horizontally
  const beamPhase = (frame / 180) % 1;
  const beamLeft = interpolate(beamPhase, [0, 1], [-20, 120]);

  return (
    <AbsoluteFill
      style={{
        background: "#050403",
        overflow: "hidden",
      }}
    >
      {/* Primary grid lines */}
      <div
        style={{
          position: "absolute",
          inset: -gridSize,
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          transform: `translate(${-driftX}px, ${-driftY}px)`,
        }}
      />

      {/* Secondary accent grid (larger spacing, stronger) */}
      <div
        style={{
          position: "absolute",
          inset: -gridSize * 5,
          backgroundImage: `
            linear-gradient(${accentColor} 1.5px, transparent 1.5px),
            linear-gradient(90deg, ${accentColor} 1.5px, transparent 1.5px)
          `,
          backgroundSize: `${gridSize * 5}px ${gridSize * 5}px`,
          transform: `translate(${-driftX * 1.4}px, ${-driftY * 1.4}px)`,
          opacity: 0.55,
        }}
      />

      {/* Horizontal sweeping accent beam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${beamLeft}%`,
          width: "18%",
          background:
            "linear-gradient(90deg, transparent, rgba(245, 211, 122, 0.12), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Radial vignette */}
      {vignette && (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 0%, rgba(0,0,0,0.62) 100%)",
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export default MovingGridBG;
