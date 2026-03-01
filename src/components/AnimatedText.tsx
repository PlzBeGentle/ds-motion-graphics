import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";

type AnimationType = "fly-up" | "fly-left" | "fade" | "scale" | "fly-down";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
  animation?: AnimationType;
  glow?: boolean;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 64,
  color = LOCOS.white,
  fontFamily = FONT_FAMILY.headline,
  fontWeight = 700,
  animation = "fly-up",
  glow = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  let transform = "none";
  let opacity = progress;

  switch (animation) {
    case "fly-up":
      transform = `translateY(${interpolate(progress, [0, 1], [60, 0])}px)`;
      break;
    case "fly-down":
      transform = `translateY(${interpolate(progress, [0, 1], [-60, 0])}px)`;
      break;
    case "fly-left":
      transform = `translateX(${interpolate(progress, [0, 1], [-80, 0])}px)`;
      break;
    case "scale":
      transform = `scale(${interpolate(progress, [0, 1], [0.3, 1])})`;
      break;
    case "fade":
      transform = "none";
      break;
  }

  const textShadow = glow
    ? `0 0 40px ${LOCOS.gold}80, 0 0 80px ${LOCOS.gold}40`
    : "none";

  return (
    <div
      style={{
        fontSize,
        fontFamily,
        fontWeight,
        color,
        opacity,
        transform,
        textShadow,
        letterSpacing: "0.02em",
        ...style,
      }}
    >
      {text}
    </div>
  );
};
