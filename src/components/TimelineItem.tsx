import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";

interface TimelineItemProps {
  year: string;
  label: string;
  delay?: number;
  isAlert?: boolean;
  x: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  year,
  label,
  delay = 0,
  isAlert = false,
  x,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 150, mass: 0.6 },
  });

  const scale = interpolate(pop, [0, 1], [0, 1]);
  const opacity = pop;

  // Pulsing effect for alert items
  const pulse = isAlert
    ? interpolate(
        Math.sin((frame - delay) * 0.15),
        [-1, 1],
        [0.7, 1],
      )
    : 1;

  const dotColor = isAlert ? LOCOS.red : LOCOS.gold;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {/* Year label above */}
      <div
        style={{
          fontFamily: FONT_FAMILY.headline,
          fontWeight: 700,
          fontSize: 28,
          color: dotColor,
          marginBottom: 8,
          opacity: pulse,
        }}
      >
        {year}
      </div>
      {/* Dot */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: dotColor,
          boxShadow: `0 0 20px ${dotColor}80`,
          transform: `scale(${pulse})`,
        }}
      />
      {/* Label below */}
      <div
        style={{
          fontFamily: FONT_FAMILY.body,
          fontWeight: 700,
          fontSize: 16,
          color: LOCOS.white,
          textAlign: "center",
          maxWidth: 160,
          marginTop: 8,
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
    </div>
  );
};
