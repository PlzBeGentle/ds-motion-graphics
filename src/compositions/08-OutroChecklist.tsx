import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";
import { CHECKLIST_ITEMS } from "../data/transcript";

const CheckItem: React.FC<{
  text: string;
  delay: number;
}> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const itemIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  const checkIn = spring({
    frame: frame - delay - 12,
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.5 },
  });

  const translateX = interpolate(itemIn, [0, 1], [60, 0]);
  const checkScale = interpolate(checkIn, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity: itemIn,
        transform: `translateX(${translateX}px)`,
        marginBottom: 28,
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 44,
          height: 44,
          border: `3px solid ${LOCOS.gold}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          style={{ transform: `scale(${checkScale})` }}
        >
          <path
            d="M5 14L11 20L23 8"
            stroke={LOCOS.gold}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* Text */}
      <div
        style={{
          fontFamily: FONT_FAMILY.body,
          fontWeight: 700,
          fontSize: 36,
          color: LOCOS.white,
          letterSpacing: "0.02em",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const OutroChecklist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // CTA section
  const ctaDelay = 100;
  const ctaIn = spring({
    frame: frame - ctaDelay,
    fps,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });

  // Bell animation
  const bellSwing = interpolate(
    Math.sin((frame - ctaDelay) * 0.25),
    [-1, 1],
    [-15, 15]
  );

  // Logo fade
  const logoIn = spring({
    frame: frame - ctaDelay - 15,
    fps,
    config: { damping: 20, stiffness: 60, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      {/* Checklist */}
      <div style={{ marginBottom: 60 }}>
        {CHECKLIST_ITEMS.map((item, i) => (
          <CheckItem key={i} text={item} delay={i * 25 + 5} />
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: ctaIn,
          transform: `translateY(${interpolate(ctaIn, [0, 1], [30, 0])}px)`,
        }}
      >
        {/* Bell icon */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          style={{
            transform: `rotate(${frame > ctaDelay ? bellSwing : 0}deg)`,
          }}
        >
          <path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
            stroke={LOCOS.gold}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            fontFamily: FONT_FAMILY.headline,
            fontWeight: 700,
            fontSize: 32,
            color: LOCOS.gold,
            letterSpacing: "0.06em",
          }}
        >
          KANAL ABONNIEREN
        </div>
      </div>

      {/* LOCOS Logo text */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: logoIn,
          fontFamily: FONT_FAMILY.headline,
          fontWeight: 700,
          fontSize: 28,
          color: LOCOS.goldDim,
          letterSpacing: "0.2em",
        }}
      >
        LOCOS
      </div>
    </AbsoluteFill>
  );
};
