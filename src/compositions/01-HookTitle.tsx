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
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { ScreenCrack } from "../components/ScreenCrack";
import { GlitchEffect } from "../components/GlitchEffect";

export const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text = "ENTEIGNUNG DURCH DIE HINTERTUER?";
  const letters = text.split("");

  // Shake effect (brief, at frame ~20)
  const shakeX = interpolate(
    frame,
    [18, 19, 20, 21, 22, 23, 24, 25],
    [0, 8, -6, 5, -4, 3, -1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const shakeY = interpolate(
    frame,
    [18, 19, 20, 21, 22, 23, 25],
    [0, -3, 4, -2, 3, -1, 0],
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
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 700]);

  // Red line pulse
  const pulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.5, 1]);

  // Gold glow intensifies on the "?" at the end
  const questionGlow = interpolate(frame, [15, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <GlitchEffect triggerFrame={18} duration={8} intensity={0.8}>
      <CameraMove zoomStart={1.02} zoomEnd={1.0} panY={3}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: fadeOut,
          }}
        >
          {/* Ambient particles */}
          <GoldParticles count={20} mode="ambient" />

          {/* Burst particles on shake */}
          <GoldParticles
            count={40}
            mode="burst"
            burstX={960}
            burstY={480}
            burstFrame={20}
          />

          {/* Main text */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: 1400,
              transform: `translate(${shakeX}px, ${shakeY}px)`,
            }}
          >
            {letters.map((letter, i) => {
              const letterDelay = i * 0.5;
              const letterProgress = spring({
                frame: frame - letterDelay,
                fps,
                config: { damping: 8, stiffness: 140, mass: 0.4 },
              });

              const y = interpolate(letterProgress, [0, 1], [50, 0]);
              const scale = interpolate(letterProgress, [0, 0.5, 1], [0.6, 1.1, 1]);
              const letterOpacity = interpolate(letterProgress, [0, 0.3], [0, 1], {
                extrapolateRight: "clamp",
              });

              const isQuestion = letter === "?";
              const letterColor = isQuestion ? LOCOS.red : LOCOS.white;

              // Gold gradient shine on each letter
              const shinePos = interpolate(
                frame,
                [20, 50],
                [-50 + i * 5, 150 + i * 5],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <span
                  key={i}
                  style={{
                    fontFamily: FONT_FAMILY.headline,
                    fontWeight: 700,
                    fontSize: 96,
                    display: "inline-block",
                    opacity: letterOpacity,
                    transform: `translateY(${y}px) scale(${scale})`,
                    marginRight: letter === " " ? 22 : 2,
                    ...(isQuestion
                      ? {
                          color: LOCOS.red,
                          textShadow: `0 0 ${40 + questionGlow * 60}px ${LOCOS.red}AA, 0 0 80px ${LOCOS.red}40`,
                        }
                      : {
                          backgroundImage: `linear-gradient(
                            90deg,
                            ${LOCOS.white} ${shinePos - 10}%,
                            ${LOCOS.goldLight} ${shinePos}%,
                            ${LOCOS.white} ${shinePos + 10}%
                          )`,
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          filter: `drop-shadow(0 0 30px ${LOCOS.gold}50)`,
                        }),
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              );
            })}
          </div>

          {/* Red accent line with glow */}
          <div
            style={{
              width: lineWidth,
              height: 5,
              marginTop: 35,
              opacity: pulse,
              background: `linear-gradient(90deg, transparent, ${LOCOS.red}, transparent)`,
              boxShadow: `0 0 30px ${LOCOS.red}80, 0 0 60px ${LOCOS.red}40`,
              borderRadius: 2,
            }}
          />
        </AbsoluteFill>
      </CameraMove>
      </GlitchEffect>

      <ScreenCrack triggerFrame={20} originX={960} originY={480} />
      <FilmGrain opacity={0.05} vignette vignetteIntensity={0.5} />
    </AbsoluteFill>
  );
};
