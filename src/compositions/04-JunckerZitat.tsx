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

// Playbook step icons as SVG
const PlaybookIcon: React.FC<{ type: string; color: string }> = ({
  type,
  color,
}) => {
  const size = 36;
  switch (type) {
    case "balloon":
      return (
        <svg width={size} height={size} viewBox="0 0 36 36">
          <ellipse
            cx="18"
            cy="14"
            rx="10"
            ry="12"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          <path
            d="M18 26 L18 34 M15 34 L21 34"
            stroke={color}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    case "eye":
      return (
        <svg width={size} height={size} viewBox="0 0 36 36">
          <path
            d="M2 18 Q18 6 34 18 Q18 30 2 18"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          <circle
            cx="18"
            cy="18"
            r="5"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          <circle cx="18" cy="18" r="2" fill={color} />
        </svg>
      );
    case "gear":
      return (
        <svg width={size} height={size} viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="6"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 18 + Math.cos(rad) * 9;
            const y1 = 18 + Math.sin(rad) * 9;
            const x2 = 18 + Math.cos(rad) * 13;
            const y2 = 18 + Math.sin(rad) * 13;
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}
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

  // Phase 2 starts
  const phase2Start = 120;

  // Phase 1 fade out
  const phase1Opacity = interpolate(
    frame,
    [phase2Start - 10, phase2Start],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 2: Playbook title
  const titleIn = spring({
    frame: frame - phase2Start,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Phase 1: Quote */}
      {frame < phase2Start + 10 && (
        <div style={{ opacity: phase1Opacity }}>
          <QuoteCard quote={QUOTE} author="Jean-Claude Juncker" delay={5} />
        </div>
      )}

      {/* Phase 2: Playbook */}
      {frame >= phase2Start && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 50,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontFamily: FONT_FAMILY.headline,
              fontWeight: 700,
              fontSize: 44,
              color: LOCOS.gold,
              letterSpacing: "0.1em",
              opacity: titleIn,
              transform: `translateY(${interpolate(
                titleIn,
                [0, 1],
                [30, 0]
              )}px)`,
            }}
          >
            DAS POLITISCHE PLAYBOOK
          </div>

          {/* Steps */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 36,
            }}
          >
            {PLAYBOOK_STEPS.map((step, i) => {
              const stepDelay = phase2Start + 15 + i * 20;
              const stepIn = spring({
                frame: frame - stepDelay,
                fps,
                config: { damping: 12, stiffness: 100, mass: 0.8 },
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    opacity: stepIn,
                    transform: `translateX(${interpolate(
                      stepIn,
                      [0, 1],
                      [-60, 0]
                    )}px)`,
                  }}
                >
                  {/* Number */}
                  <div
                    style={{
                      fontFamily: FONT_FAMILY.headline,
                      fontWeight: 700,
                      fontSize: 48,
                      color: LOCOS.gold,
                      width: 60,
                      textAlign: "center",
                    }}
                  >
                    {i + 1}
                  </div>
                  {/* Icon */}
                  <PlaybookIcon type={step.icon} color={LOCOS.goldLight} />
                  {/* Text */}
                  <div
                    style={{
                      fontFamily: FONT_FAMILY.headline,
                      fontWeight: 700,
                      fontSize: 32,
                      color: LOCOS.white,
                      letterSpacing: "0.04em",
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
  );
};
