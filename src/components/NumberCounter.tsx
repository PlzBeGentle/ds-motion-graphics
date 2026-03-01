import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";

interface NumberCounterProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  formatNumber?: boolean;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  delay = 0,
  fontSize = 48,
  color = LOCOS.gold,
  formatNumber = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 60, mass: 1 },
  });

  const value = interpolate(progress, [0, 1], [from, to]);
  const rounded = Math.round(value);

  const formatted = formatNumber
    ? rounded.toLocaleString("de-DE")
    : String(rounded);

  return (
    <span
      style={{
        fontFamily: FONT_FAMILY.headline,
        fontWeight: 700,
        fontSize,
        color,
        letterSpacing: "0.02em",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
