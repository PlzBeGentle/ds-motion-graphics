import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { LOCOS } from "../theme/colors";

interface SeismographProps {
  /** Frames at which spikes occur */
  spikeFrames: number[];
  /** Y position */
  y?: number;
  startX?: number;
  endX?: number;
  color?: string;
}

export const Seismograph: React.FC<SeismographProps> = ({
  spikeFrames,
  y = 540,
  startX = 180,
  endX = 1740,
  color = LOCOS.gold,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Build the seismograph line
  const totalWidth = endX - startX;
  const points: string[] = [];

  for (let px = 0; px <= totalWidth; px += 3) {
    const x = startX + px;
    let yOffset = 0;

    // Check proximity to each spike frame
    for (const spikeFrame of spikeFrames) {
      // Convert spike frame to X position on timeline
      const spikeX =
        startX +
        (spikeFrame / 250) * totalWidth; // approximate mapping

      const dist = Math.abs(x - spikeX);
      if (dist < 40) {
        // Has the spike happened yet?
        const spikeProgress = spring({
          frame: frame - spikeFrame,
          fps,
          config: { damping: 4, stiffness: 300, mass: 0.3 },
        });

        if (spikeProgress > 0.01) {
          const spikeMagnitude = interpolate(
            dist,
            [0, 15, 40],
            [50, 25, 0],
            { extrapolateRight: "clamp" }
          );

          // Oscillating spike
          const oscillation = Math.sin(dist * 0.4) * spikeProgress;
          yOffset += oscillation * spikeMagnitude;
        }
      }
    }

    // Subtle noise
    const noise = Math.sin(px * 0.1 + frame * 0.05) * 1.5;

    points.push(`${x},${y + yOffset + noise}`);
  }

  const pathD = `M${points.join(" L")}`;

  // Draw progress
  const drawProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 30, stiffness: 20, mass: 3 },
  });

  const totalLen = totalWidth * 1.5; // approximate
  const dashOffset = interpolate(drawProgress, [0, 1], [totalLen, 0]);

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {/* Glow */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="5"
        opacity={0.12}
        strokeDasharray={totalLen}
        strokeDashoffset={dashOffset}
        style={{ filter: "blur(4px)" }}
      />
      {/* Main line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity={0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLen}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};
