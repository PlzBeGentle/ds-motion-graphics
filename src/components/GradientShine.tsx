import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";

interface GradientShineProps {
  text: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  /** How many frames for one full shine sweep */
  shineDuration?: number;
  /** Delay before first shine */
  delay?: number;
  /** Repeat shine */
  loop?: boolean;
  style?: React.CSSProperties;
}

export const GradientShine: React.FC<GradientShineProps> = ({
  text,
  fontSize = 64,
  fontWeight = 700,
  fontFamily = FONT_FAMILY.headline,
  shineDuration = 40,
  delay = 15,
  loop = false,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const elapsed = frame - delay;
  const shineFrame = loop
    ? ((elapsed % (shineDuration + 30)) + (shineDuration + 30)) %
      (shineDuration + 30)
    : elapsed;

  const shinePosition = interpolate(
    shineFrame,
    [0, shineDuration],
    [-50, 150],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        fontFamily,
        letterSpacing: "0.04em",
        backgroundImage: `linear-gradient(
          90deg,
          ${LOCOS.goldDim} 0%,
          ${LOCOS.gold} ${shinePosition - 15}%,
          ${LOCOS.goldLight} ${shinePosition - 5}%,
          ${LOCOS.white} ${shinePosition}%,
          ${LOCOS.goldLight} ${shinePosition + 5}%,
          ${LOCOS.gold} ${shinePosition + 15}%,
          ${LOCOS.goldDim} 100%
        )`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
    >
      {text}
    </div>
  );
};
