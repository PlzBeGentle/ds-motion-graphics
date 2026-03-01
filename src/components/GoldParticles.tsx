import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  drift: number;
  opacity: number;
}

interface GoldParticlesProps {
  count?: number;
  /** "ambient" = slow floating, "burst" = explosive at a point */
  mode?: "ambient" | "burst";
  /** For burst mode: center X (0-1920) */
  burstX?: number;
  /** For burst mode: center Y (0-1080) */
  burstY?: number;
  /** Frame at which burst triggers */
  burstFrame?: number;
  style?: React.CSSProperties;
}

// Deterministic pseudo-random based on seed
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

export const GoldParticles: React.FC<GoldParticlesProps> = ({
  count = 30,
  mode = "ambient",
  burstX = 960,
  burstY = 540,
  burstFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: seededRandom(i * 3 + 1) * 1920,
      y: seededRandom(i * 3 + 2) * 1080,
      size: 1.5 + seededRandom(i * 3 + 3) * 3.5,
      speed: 0.3 + seededRandom(i * 7 + 4) * 0.8,
      delay: seededRandom(i * 5 + 5) * 60,
      drift: (seededRandom(i * 11 + 6) - 0.5) * 2,
      opacity: 0.3 + seededRandom(i * 13 + 7) * 0.7,
    }));
  }, [count]);

  if (mode === "burst") {
    const elapsed = frame - burstFrame;
    if (elapsed < 0) return null;

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          ...style,
        }}
      >
        {particles.map((p, i) => {
          const angle = (i / count) * Math.PI * 2 + seededRandom(i * 17) * 0.5;
          const distance = elapsed * (2 + seededRandom(i * 19) * 4);
          const px = burstX + Math.cos(angle) * distance;
          const py = burstY + Math.sin(angle) * distance - elapsed * 0.3;
          const fadeOut = interpolate(elapsed, [0, 40], [1, 0], {
            extrapolateRight: "clamp",
          });
          const scale = interpolate(elapsed, [0, 5, 30], [0, 1.5, 0.5], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: px,
                top: py,
                width: p.size * 2,
                height: p.size * 2,
                borderRadius: "50%",
                backgroundColor: LOCOS.goldLight,
                boxShadow: `0 0 ${p.size * 4}px ${LOCOS.gold}`,
                opacity: fadeOut * p.opacity,
                transform: `scale(${scale})`,
              }}
            />
          );
        })}
      </div>
    );
  }

  // Ambient mode: floating particles
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        ...style,
      }}
    >
      {particles.map((p, i) => {
        const lifeFrame = frame - p.delay;
        if (lifeFrame < 0) return null;

        const yOffset = -lifeFrame * p.speed;
        const xOffset = Math.sin(lifeFrame * 0.04 + i) * 30 * p.drift;

        const py = ((p.y + yOffset) % 1200) - 60;
        const px = p.x + xOffset;

        const twinkle = interpolate(
          Math.sin(lifeFrame * 0.08 + i * 2),
          [-1, 1],
          [0.2, 1]
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py < -50 ? py + 1200 : py,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: LOCOS.goldLight,
              boxShadow: `0 0 ${p.size * 3}px ${LOCOS.gold}80`,
              opacity: twinkle * p.opacity * 0.6,
            }}
          />
        );
      })}
    </div>
  );
};
