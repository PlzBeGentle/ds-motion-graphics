import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";

interface StampEffectProps {
  text: string;
  delay?: number;
  color?: string;
  fontSize?: number;
  rotation?: number;
}

export const StampEffect: React.FC<StampEffectProps> = ({
  text,
  delay = 0,
  color = LOCOS.red,
  fontSize = 56,
  rotation = -12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 6, stiffness: 200, mass: 0.8 },
  });

  const scale = interpolate(drop, [0, 1], [4, 1]);
  const opacity = interpolate(drop, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontFamily: FONT_FAMILY.headline,
        fontWeight: 700,
        fontSize,
        color,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        border: `4px solid ${color}`,
        padding: "8px 24px",
        letterSpacing: "0.1em",
        textShadow: `0 0 30px ${color}80`,
      }}
    >
      {text}
    </div>
  );
};
