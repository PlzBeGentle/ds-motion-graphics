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
import { QuoteCard } from "../components/QuoteCard";
import { PLAYBOOK_STEPS } from "../data/transcript";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { GradientShine } from "../components/GradientShine";
import { HexGrid } from "../components/HexGrid";

// Playbook step icons as SVG with path drawing
const PlaybookIcon: React.FC<{
  type: string;
  color: string;
  drawProgress: number;
}> = ({ type, color, drawProgress }) => {
  const size = 40;
  const dashOffset = interpolate(drawProgress, [0, 1], [200, 0]);
  const strokeProps = {
    stroke: color,
    strokeWidth: 2,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeDasharray: 200,
    strokeDashoffset: dashOffset,
  };

  switch (type) {
    case "balloon":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <ellipse cx="20" cy="15" rx="11" ry="13" {...strokeProps} />
          <path d="M20 28 L20 37 M16 37 L24 37" {...strokeProps} />
          {/* Glow */}
          <ellipse
            cx="20"
            cy="15"
            rx="11"
            ry="13"
            stroke={color}
            strokeWidth="6"
            fill="none"
            opacity={0.1 * drawProgress}
            style={{ filter: "blur(4px)" }}
          />
        </svg>
      );
    case "eye":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <path d="M3 20 Q20 6 37 20 Q20 34 3 20" {...strokeProps} />
          <circle cx="20" cy="20" r="5" {...strokeProps} />
          <circle
            cx="20"
            cy="20"
            r="2"
            fill={color}
            opacity={drawProgress}
          />
          <path
            d="M3 20 Q20 6 37 20 Q20 34 3 20"
            stroke={color}
            strokeWidth="6"
            fill="none"
            opacity={0.1 * drawProgress}
            style={{ filter: "blur(4px)" }}
          />
        </svg>
      );
    case "gear":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="6" {...strokeProps} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 20 + Math.cos(rad) * 10;
            const y1 = 20 + Math.sin(rad) * 10;
            const x2 = 20 + Math.cos(rad) * 15;
            const y2 = 20 + Math.sin(rad) * 15;
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                opacity={drawProgress}
              />
            );
          })}
          <circle
            cx="20"
            cy="20"
            r="6"
            stroke={color}
            strokeWidth="6"
            fill="none"
            opacity={0.1 * drawProgress}
            style={{ filter: "blur(4px)" }}
          />
        </svg>
      );
    default:
      return null;
  }
};

export const JunckerZitat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const QUOTE =
    "Wir beschliessen etwas, stellen das dann in den Raum und warten einige Zeit ab, was passiert. Wenn es dann kein grosses Geschrei gibt, weil die meisten gar nicht begreifen, was da beschlossen wurde, dann machen wir weiter.";

  // Quote: 225 chars at 2 chars/frame ≈ 113 frames to type
  // + delay 5 + 10 + author ~8 + hold 60 = ~196
  const phase2Start = 200;

  // Phase 1 fade out
  const phase1Opacity = interpolate(
    frame,
    [phase2Start - 15, phase2Start],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 2: title
  const titleIn = spring({
    frame: frame - phase2Start,
    fps,
    config: { damping: 10, stiffness: 80, mass: 0.8 },
  });

  return (
    <AbsoluteFill>
      <CameraMove
        zoomStart={frame < phase2Start ? 1.0 : 1.02}
        zoomEnd={frame < phase2Start ? 1.02 : 1.0}
        panY={frame < phase2Start ? -4 : 3}
      >
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            background: `radial-gradient(ellipse at center, ${LOCOS.black}E0 0%, ${LOCOS.black}90 60%, transparent 100%)`,
          }}
        >
          <HexGrid delay={0} opacity={0.06} />
          <GoldParticles count={15} mode="ambient" />

          {/* Phase 1: Quote */}
          {frame < phase2Start + 10 && (
            <div style={{ opacity: phase1Opacity }}>
              <QuoteCard
                quote={QUOTE}
                author="Jean-Claude Juncker"
                delay={5}
              />
            </div>
          )}

          {/* Phase 2: Playbook */}
          {frame >= phase2Start && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 55,
              }}
            >
              {/* Title with gradient shine */}
              <div
                style={{
                  opacity: titleIn,
                  transform: `translateY(${interpolate(
                    titleIn,
                    [0, 1],
                    [40, 0]
                  )}px) scale(${interpolate(titleIn, [0, 1], [0.9, 1])})`,
                }}
              >
                <GradientShine
                  text="DAS POLITISCHE PLAYBOOK"
                  fontSize={48}
                  delay={phase2Start}
                  loop
                  shineDuration={50}
                />
              </div>

              {/* Particle burst on title reveal */}
              <GoldParticles
                count={30}
                mode="burst"
                burstX={960}
                burstY={350}
                burstFrame={phase2Start + 5}
              />

              {/* Steps */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 40,
                }}
              >
                {PLAYBOOK_STEPS.map((step, i) => {
                  const stepDelay = phase2Start + 18 + i * 22;
                  const stepIn = spring({
                    frame: frame - stepDelay,
                    fps,
                    config: { damping: 10, stiffness: 100, mass: 0.7 },
                  });

                  const iconDraw = spring({
                    frame: frame - stepDelay - 5,
                    fps,
                    config: { damping: 25, stiffness: 40, mass: 1.5 },
                  });

                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 28,
                        opacity: stepIn,
                        transform: `translateX(${interpolate(
                          stepIn,
                          [0, 1],
                          [-80, 0]
                        )}px)`,
                      }}
                    >
                      {/* Number with gold gradient */}
                      <div
                        style={{
                          fontFamily: FONT_FAMILY.headline,
                          fontWeight: 700,
                          fontSize: 52,
                          width: 65,
                          textAlign: "center",
                          backgroundImage: `linear-gradient(180deg, ${LOCOS.goldLight}, ${LOCOS.gold})`,
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          filter: `drop-shadow(0 0 10px ${LOCOS.gold}40)`,
                        }}
                      >
                        {i + 1}
                      </div>
                      {/* Icon with path draw */}
                      <PlaybookIcon
                        type={step.icon}
                        color={LOCOS.goldLight}
                        drawProgress={iconDraw}
                      />
                      {/* Text */}
                      <div
                        style={{
                          fontFamily: FONT_FAMILY.headline,
                          fontWeight: 700,
                          fontSize: 34,
                          color: LOCOS.white,
                          letterSpacing: "0.04em",
                          textShadow: `0 0 30px ${LOCOS.gold}15`,
                        }}
                      >
                        {step.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </AbsoluteFill>
      </CameraMove>

      <FilmGrain opacity={0.05} vignette vignetteIntensity={0.45} />
    </AbsoluteFill>
  );
};
