import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";

interface BuzzwordLowerThirdProps {
  text: string;
  delay?: number;
  duration?: number;
}

export const BuzzwordLowerThird: React.FC<BuzzwordLowerThirdProps> = ({
  text,
  delay = 0,
  duration = 75,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.5 },
  });

  const slideOut = spring({
    frame: frame - delay - duration + 15,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.6 },
  });

  const translateX = interpolate(slideIn, [0, 1], [-700, 0]);
  const translateXOut = interpolate(slideOut, [0, 1], [0, -700]);
  const finalX = frame - delay > duration - 15 ? translateXOut : translateX;

  // Gold flash effect — brighter and longer
  const flashProgress = interpolate(
    frame - delay,
    [6, 10, 20],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Shimmer sweep across text
  const shimmerPos = interpolate(
    frame - delay,
    [12, 35],
    [-20, 120],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 0,
        transform: `translateX(${finalX}px)`,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Gold accent bar with glow */}
      <div
        style={{
          width: 6,
          height: 65,
          background: `linear-gradient(180deg, ${LOCOS.goldLight}, ${LOCOS.gold}, ${LOCOS.goldDim})`,
          marginRight: 0,
          boxShadow: `0 0 25px ${LOCOS.gold}80, 0 0 50px ${LOCOS.gold}30`,
        }}
      />
      {/* Text container */}
      <div
        style={{
          backgroundColor: `${LOCOS.black}E8`,
          paddingLeft: 28,
          paddingRight: 48,
          paddingTop: 16,
          paddingBottom: 16,
          borderLeft: `3px solid ${LOCOS.gold}80`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shimmer overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${shimmerPos}%`,
            width: "15%",
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${LOCOS.goldLight}20, transparent)`,
            transform: "skewX(-20deg)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY.headline,
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: "0.1em",
            backgroundImage: `linear-gradient(
              90deg,
              ${LOCOS.goldDim} 0%,
              ${LOCOS.gold} 30%,
              ${LOCOS.goldLight} 50%,
              ${LOCOS.gold} 70%,
              ${LOCOS.goldDim} 100%
            )`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 ${10 + flashProgress * 30}px ${LOCOS.gold}${
              flashProgress > 0 ? "AA" : "40"
            })`,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
