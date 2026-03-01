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
    config: { damping: 14, stiffness: 120, mass: 0.6 },
  });

  const slideOut = spring({
    frame: frame - delay - duration + 15,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.6 },
  });

  const translateX = interpolate(slideIn, [0, 1], [-600, 0]);
  const translateXOut = interpolate(slideOut, [0, 1], [0, -600]);
  const finalX = frame - delay > duration - 15 ? translateXOut : translateX;

  // Gold flash effect
  const flashProgress = interpolate(
    frame - delay,
    [8, 12, 18],
    [0, 1, 0],
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
      {/* Gold accent bar */}
      <div
        style={{
          width: 6,
          height: 60,
          backgroundColor: LOCOS.gold,
          marginRight: 16,
          boxShadow: `0 0 20px ${LOCOS.gold}80`,
        }}
      />
      {/* Text container */}
      <div
        style={{
          backgroundColor: `${LOCOS.black}DD`,
          paddingLeft: 24,
          paddingRight: 40,
          paddingTop: 14,
          paddingBottom: 14,
          borderLeft: `3px solid ${LOCOS.gold}`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY.headline,
            fontWeight: 700,
            fontSize: 38,
            color: LOCOS.gold,
            letterSpacing: "0.08em",
            textShadow: `0 0 ${30 + flashProgress * 40}px ${LOCOS.gold}${
              flashProgress > 0 ? "FF" : "60"
            }`,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
