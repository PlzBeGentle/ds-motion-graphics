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
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { GlitchEffect } from "../components/GlitchEffect";
import { ScreenCrack } from "../components/ScreenCrack";
import { ImpactShockwave } from "../components/ImpactShockwave";

export const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text = "ENTEIGNUNG DURCH DIE HINTERTUER?";
  const letters = text.split("");
  const questionIdx = letters.length - 1;

  // Shake timing
  const shakeFrame = 20;
  const shakeX = interpolate(
    frame,
    [shakeFrame, shakeFrame+1, shakeFrame+2, shakeFrame+3, shakeFrame+4, shakeFrame+5, shakeFrame+6, shakeFrame+8],
    [0, 10, -8, 6, -5, 4, -2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const shakeY = interpolate(
    frame,
    [shakeFrame, shakeFrame+1, shakeFrame+2, shakeFrame+3, shakeFrame+5, shakeFrame+8],
    [0, -5, 6, -3, 2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Chromatic aberration offset during shake
  const chromaOffset = interpolate(
    frame,
    [shakeFrame, shakeFrame+2, shakeFrame+5, shakeFrame+8],
    [0, 8, 4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Flash frames — single-frame white flashes before and during shake
  const isFlashFrame = frame === shakeFrame - 1 || frame === shakeFrame + 1;
  const flashOpacity = isFlashFrame ? 0.2 : 0;

  // Fade out
  const fadeOut = interpolate(frame, [72, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red accent line
  const lineProgress = spring({
    frame: frame - 28,
    fps,
    config: { damping: 15, stiffness: 80, mass: 1 },
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 700]);
  const pulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.5, 1]);

  // Question mark position (approximate) for screen crack origin
  const questionX = 1180;
  const questionY = 480;

  // Build the text content (used for chroma layers + main)
  const renderText = (chromaShift: number, layerOpacity: number, tint?: string) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 1400,
        transform: `translate(${shakeX + chromaShift}px, ${shakeY}px)`,
        opacity: layerOpacity,
      }}
    >
      {letters.map((letter, i) => {
        const letterDelay = i * 0.45;

        // Burn-in effect: letters glow white-hot then cool to gold/white
        const burnIn = spring({
          frame: frame - letterDelay,
          fps,
          config: { damping: 6, stiffness: 160, mass: 0.3 },
        });

        const burnPhase = interpolate(
          frame - letterDelay,
          [0, 3, 8, 14],
          [0, 1, 0.8, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const y = interpolate(burnIn, [0, 1], [50, 0]);
        const scale = interpolate(burnIn, [0, 0.3, 1], [0.5, 1.15, 1]);
        const letterOpacity = interpolate(burnIn, [0, 0.15], [0, 1], {
          extrapolateRight: "clamp",
        });

        const isQuestion = i === questionIdx;
        const baseColor = isQuestion ? LOCOS.red : LOCOS.white;

        // Burn color: white-hot → gold → settle
        const burnColor = tint || (burnPhase > 0.1
          ? `rgba(255, ${Math.round(200 + burnPhase * 55)}, ${Math.round(150 * (1 - burnPhase))}, 1)`
          : baseColor);

        // Shine sweep
        const shinePos = interpolate(
          frame,
          [22, 55],
          [-50 + i * 4, 150 + i * 4],
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
                    color: tint || LOCOS.red,
                    textShadow: `0 0 ${30 + burnPhase * 80}px ${LOCOS.red}CC, 0 0 60px ${LOCOS.red}60, 0 0 100px ${LOCOS.red}30`,
                  }
                : {
                    color: "transparent",
                    backgroundImage: tint
                      ? "none"
                      : `linear-gradient(
                          90deg,
                          ${burnColor} ${shinePos - 10}%,
                          ${LOCOS.goldLight} ${shinePos}%,
                          ${burnColor} ${shinePos + 10}%
                        )`,
                    backgroundColor: tint || undefined,
                    WebkitBackgroundClip: tint ? undefined : "text",
                    backgroundClip: tint ? undefined : "text",
                    WebkitTextFillColor: tint || "transparent",
                    filter: burnPhase > 0.1
                      ? `drop-shadow(0 0 ${20 + burnPhase * 40}px ${LOCOS.goldLight})`
                      : `drop-shadow(0 0 20px ${LOCOS.gold}40)`,
                  }),
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        );
      })}
    </div>
  );

  return (
    <AbsoluteFill>
      <CameraMove zoomStart={1.04} zoomEnd={1.0} panY={3}>
        <GlitchEffect triggerFrame={shakeFrame} duration={6} intensity={0.8}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              opacity: fadeOut,
            }}
          >
            <GoldParticles count={20} mode="ambient" />
            <GoldParticles
              count={50}
              mode="burst"
              burstX={960}
              burstY={480}
              burstFrame={shakeFrame}
            />

            {/* Chromatic aberration layers */}
            {chromaOffset > 0.5 && (
              <>
                {/* Red channel */}
                <AbsoluteFill
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    mixBlendMode: "screen",
                    opacity: 0.3,
                  }}
                >
                  {renderText(-chromaOffset, 1, "#FF0000")}
                </AbsoluteFill>
                {/* Blue channel */}
                <AbsoluteFill
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    mixBlendMode: "screen",
                    opacity: 0.3,
                  }}
                >
                  {renderText(chromaOffset, 1, "#0066FF")}
                </AbsoluteFill>
              </>
            )}

            {/* Main text */}
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {renderText(0, 1)}
            </AbsoluteFill>

            {/* Red accent line with gradient + glow */}
            <div
              style={{
                position: "absolute",
                top: "58%",
                width: lineWidth,
                height: 5,
                opacity: pulse,
                background: `linear-gradient(90deg, transparent, ${LOCOS.red}, transparent)`,
                boxShadow: `0 0 30px ${LOCOS.red}80, 0 0 60px ${LOCOS.red}40`,
                borderRadius: 2,
              }}
            />
          </AbsoluteFill>
        </GlitchEffect>

        {/* Screen crack from the "?" */}
        <ScreenCrack
          triggerFrame={shakeFrame}
          originX={questionX}
          originY={questionY}
        />

        {/* Impact shockwave */}
        <ImpactShockwave
          triggerFrame={shakeFrame}
          x={960}
          y={480}
          color={LOCOS.red}
          maxRadius={300}
        />
      </CameraMove>

      {/* White flash frames */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: LOCOS.white,
          opacity: flashOpacity,
          pointerEvents: "none",
          zIndex: 200,
        }}
      />

      <FilmGrain opacity={0.05} vignette vignetteIntensity={0.55} />
    </AbsoluteFill>
  );
};
