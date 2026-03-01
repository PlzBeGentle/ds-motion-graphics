import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";
import { SHADOW } from "../theme/styles";

export const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Letter-by-letter spring animation
  const text = "ENTEIGNUNG DURCH DIE HINTERTUER?";
  const letters = text.split("");

  // Shake effect (brief, at frame ~20)
  const shakeIntensity = interpolate(
    frame,
    [18, 20, 22, 25],
    [0, 6, -4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fade out
  const fadeOut = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red accent line
  const lineProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 15, stiffness: 80, mass: 1 },
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 600]);

  // Red line pulse
  const pulse = interpolate(
    Math.sin(frame * 0.12),
    [-1, 1],
    [0.6, 1]
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Main text */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 1400,
          transform: `translateX(${shakeIntensity}px)`,
        }}
      >
        {letters.map((letter, i) => {
          const letterDelay = i * 0.6;
          const letterProgress = spring({
            frame: frame - letterDelay,
            fps,
            config: { damping: 10, stiffness: 120, mass: 0.5 },
          });

          const y = interpolate(letterProgress, [0, 1], [40, 0]);
          const letterOpacity = letterProgress;

          return (
            <span
              key={i}
              style={{
                fontFamily: FONT_FAMILY.headline,
                fontWeight: 700,
                fontSize: 92,
                color: letter === "?" ? LOCOS.red : LOCOS.white,
                opacity: letterOpacity,
                transform: `translateY(${y}px)`,
                display: "inline-block",
                textShadow: SHADOW.text,
                marginRight: letter === " " ? 20 : 2,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          );
        })}
      </div>

      {/* Red accent line */}
      <div
        style={{
          width: lineWidth,
          height: 5,
          backgroundColor: LOCOS.red,
          marginTop: 30,
          opacity: pulse,
          boxShadow: SHADOW.textRed,
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
};
