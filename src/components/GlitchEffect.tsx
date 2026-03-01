import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";

interface GlitchEffectProps {
  /** Frame at which glitch triggers */
  triggerFrame: number;
  /** How many frames the glitch lasts */
  duration?: number;
  /** Intensity 0-1 */
  intensity?: number;
  children: React.ReactNode;
}

// Deterministic pseudo-random
const seeded = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

export const GlitchEffect: React.FC<GlitchEffectProps> = ({
  triggerFrame,
  duration = 8,
  intensity = 1,
  children,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - triggerFrame;

  if (elapsed < -1 || elapsed > duration) {
    return <div style={{ position: "relative" }}>{children}</div>;
  }

  const glitchAmount = interpolate(
    elapsed,
    [0, duration * 0.3, duration],
    [0, intensity, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Slice offsets — deterministic per frame
  const slices = Array.from({ length: 6 }, (_, i) => ({
    top: `${seeded(frame * 100 + i * 7) * 100}%`,
    height: `${5 + seeded(frame * 100 + i * 13) * 15}%`,
    offsetX: (seeded(frame * 100 + i * 19) - 0.5) * 40 * glitchAmount,
  }));

  // White flash frames
  const flashOpacity =
    (elapsed === 0 || elapsed === 2) ? 0.15 * intensity : 0;

  return (
    <div style={{ position: "relative" }}>
      {children}

      {/* Glitch slices */}
      {glitchAmount > 0.01 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {slices.map((slice, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: slice.top,
                left: 0,
                right: 0,
                height: slice.height,
                transform: `translateX(${slice.offsetX}px)`,
                backgroundColor: `${i % 2 === 0 ? LOCOS.red : LOCOS.gold}08`,
                mixBlendMode: "screen",
              }}
            />
          ))}
        </div>
      )}

      {/* White flash */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: LOCOS.white,
            opacity: flashOpacity,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
