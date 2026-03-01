import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface CameraMoveProps {
  /** Zoom amount: 1.0 = no zoom, 1.03 = 3% zoom over duration */
  zoomEnd?: number;
  zoomStart?: number;
  /** Pan X in pixels (start to end) */
  panX?: number;
  /** Pan Y in pixels */
  panY?: number;
  /** Easing: "linear" or "ease" */
  easing?: "linear" | "ease";
  children: React.ReactNode;
}

export const CameraMove: React.FC<CameraMoveProps> = ({
  zoomStart = 1.0,
  zoomEnd = 1.03,
  panX = 0,
  panY = -5,
  easing = "ease",
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Slight ease-out for more natural feel
  const easedProgress =
    easing === "ease" ? 1 - Math.pow(1 - progress, 2) : progress;

  const zoom = interpolate(easedProgress, [0, 1], [zoomStart, zoomEnd]);
  const translateX = interpolate(easedProgress, [0, 1], [0, panX]);
  const translateY = interpolate(easedProgress, [0, 1], [0, panY]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `scale(${zoom}) translate(${translateX}px, ${translateY}px)`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};
