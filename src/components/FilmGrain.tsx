import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

interface FilmGrainProps {
  opacity?: number;
  /** Also add vignette darkening at edges */
  vignette?: boolean;
  vignetteIntensity?: number;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({
  opacity = 0.06,
  vignette = true,
  vignetteIntensity = 0.4,
}) => {
  const frame = useCurrentFrame();

  // Generate a noise pattern using SVG filter — shifts each frame for grain animation
  const seed = frame * 7 + 42;

  return (
    <>
      {/* Grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 999,
          mixBlendMode: "overlay",
          opacity,
        }}
      >
        <svg width="100%" height="100%" style={{ position: "absolute" }}>
          <filter id={`grain-${frame}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="3"
              seed={seed}
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="saturate"
              values="0"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter={`url(#grain-${frame})`}
          />
        </svg>
      </div>

      {/* Vignette */}
      {vignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 998,
            background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,${vignetteIntensity}) 100%)`,
          }}
        />
      )}
    </>
  );
};
