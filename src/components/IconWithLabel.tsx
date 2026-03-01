import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";

interface IconWithLabelProps {
  icon: React.ReactNode;
  label: string;
  delay?: number;
  size?: number;
  color?: string;
}

export const IconWithLabel: React.FC<IconWithLabelProps> = ({
  icon,
  label,
  delay = 0,
  size = 48,
  color = LOCOS.white,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const opacity = progress;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ fontSize: size, lineHeight: 1 }}>{icon}</div>
      <div
        style={{
          fontFamily: FONT_FAMILY.body,
          fontSize: 18,
          fontWeight: 700,
          color,
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
    </div>
  );
};
