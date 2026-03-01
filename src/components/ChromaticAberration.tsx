import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface ChromaticAberrationProps {
  /** Frame at which effect triggers */
  triggerFrame: number;
  /** How many frames the effect lasts */
  duration?: number;
  /** Max pixel offset for RGB split */
  maxOffset?: number;
  children: React.ReactNode;
}

export const ChromaticAberration: React.FC<ChromaticAberrationProps> = ({
  triggerFrame,
  duration = 6,
  maxOffset = 6,
  children,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - triggerFrame;

  if (elapsed < 0 || elapsed > duration) {
    return <>{children}</>;
  }

  const offset = interpolate(
    elapsed,
    [0, duration * 0.3, duration],
    [0, maxOffset, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ position: "relative" }}>
      {/* Red channel — shifted left */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${-offset}px)`,
          opacity: 0.5,
          mixBlendMode: "screen",
          filter: "saturate(0) brightness(0.5)",
        }}
      >
        <div style={{ filter: `drop-shadow(0 0 0 #FF000080)` }}>
          {children}
        </div>
      </div>
      {/* Blue channel — shifted right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${offset}px)`,
          opacity: 0.5,
          mixBlendMode: "screen",
          filter: "saturate(0) brightness(0.5)",
        }}
      >
        <div style={{ filter: `drop-shadow(0 0 0 #0066FF80)` }}>
          {children}
        </div>
      </div>
      {/* Main layer */}
      {children}
    </div>
  );
};
