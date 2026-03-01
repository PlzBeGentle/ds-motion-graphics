import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";

interface GoldBarProps {
  direction?: "horizontal" | "vertical";
  maxWidth?: number;
  maxHeight?: number;
  thickness?: number;
  delay?: number;
  style?: React.CSSProperties;
}

export const GoldBar: React.FC<GoldBarProps> = ({
  direction = "horizontal",
  maxWidth = 400,
  maxHeight = 400,
  thickness = 4,
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80, mass: 1 },
  });

  const isHorizontal = direction === "horizontal";

  const width = isHorizontal
    ? interpolate(progress, [0, 1], [0, maxWidth])
    : thickness;
  const height = isHorizontal
    ? thickness
    : interpolate(progress, [0, 1], [0, maxHeight]);

  return (
    <div
      style={{
        width,
        height,
        background: `linear-gradient(${
          isHorizontal ? "90deg" : "180deg"
        }, ${LOCOS.goldDim}, ${LOCOS.gold}, ${LOCOS.goldLight})`,
        boxShadow: `0 0 20px ${LOCOS.gold}60`,
        borderRadius: 2,
        ...style,
      }}
    />
  );
};
