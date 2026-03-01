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
import { CHECKLIST_ITEMS } from "../data/transcript";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { GradientShine } from "../components/GradientShine";
import { ImpactShockwave } from "../components/ImpactShockwave";

const CheckItem: React.FC<{
  text: string;
  delay: number;
  index: number;
}> = ({ text, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const itemIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.7 },
  });

  const checkIn = spring({
    frame: frame - delay - 10,
    fps,
    config: { damping: 6, stiffness: 200, mass: 0.4 },
  });

  const translateX = interpolate(itemIn, [0, 1], [80, 0]);
  const checkScale = interpolate(checkIn, [0, 1], [3, 1]);
  const checkOpacity = interpolate(checkIn, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        opacity: itemIn,
        transform: `translateX(${translateX}px)`,
        marginBottom: 32,
      }}
    >
      {/* Checkbox with animated check */}
      <div
        style={{
          width: 48,
          height: 48,
          border: `3px solid ${LOCOS.gold}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: checkIn > 0.5 ? `0 0 15px ${LOCOS.gold}40` : "none",
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          style={{
            transform: `scale(${checkScale})`,
            opacity: checkOpacity,
          }}
        >
          {/* Glow */}
          <path
            d="M5 15L12 22L25 8"
            stroke={LOCOS.gold}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
            style={{ filter: "blur(3px)" }}
          />
          {/* Check */}
          <path
            d="M5 15L12 22L25 8"
            stroke={LOCOS.goldLight}
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
          fontSize: 38,
          color: LOCOS.white,
          letterSpacing: "0.02em",
          textShadow: `0 0 20px ${LOCOS.gold}10`,
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

  const ctaDelay = 100;
  const ctaIn = spring({
    frame: frame - ctaDelay,
    fps,
    config: { damping: 10, stiffness: 80, mass: 0.8 },
  });

  // Bell animation
  const bellSwing =
    frame > ctaDelay
      ? interpolate(Math.sin((frame - ctaDelay) * 0.3), [-1, 1], [-18, 18])
      : 0;

  return (
    <AbsoluteFill>
      <CameraMove zoomStart={1.03} zoomEnd={1.0} panY={4}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 100,
            /* Overlay — transparent background */
          }}
        >
          <GoldParticles count={25} mode="ambient" />

          {/* Checklist */}
          <div style={{ marginBottom: 55 }}>
            {CHECKLIST_ITEMS.map((item, i) => (
              <CheckItem key={i} text={item} delay={i * 28 + 5} index={i} />
            ))}
          </div>

          {/* Particle burst + shockwave on each check */}
          {CHECKLIST_ITEMS.map((_, i) => (
            <React.Fragment key={`check-effects-${i}`}>
              <GoldParticles
                count={12}
                mode="burst"
                burstX={540}
                burstY={340 + i * 60}
                burstFrame={i * 28 + 18}
              />
              <ImpactShockwave
                triggerFrame={i * 28 + 18}
                x={540}
                y={340 + i * 60}
                color={LOCOS.gold}
                maxRadius={60}
                duration={15}
              />
            </React.Fragment>
          ))}

          {/* CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              opacity: ctaIn,
              transform: `translateY(${interpolate(ctaIn, [0, 1], [35, 0])}px)`,
            }}
          >
            {/* Bell icon */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              style={{
                transform: `rotate(${bellSwing}deg)`,
                transformOrigin: "top center",
              }}
            >
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                stroke={LOCOS.goldLight}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Glow */}
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke={LOCOS.gold}
                strokeWidth="5"
                fill="none"
                opacity="0.15"
                style={{ filter: "blur(3px)" }}
              />
            </svg>
            <GradientShine
              text="KANAL ABONNIEREN"
              fontSize={34}
              delay={ctaDelay}
              loop
              shineDuration={40}
            />
          </div>

          {/* LOCOS Logo removed per client request */}
        </AbsoluteFill>
      </CameraMove>

      <FilmGrain opacity={0.05} vignette vignetteIntensity={0.5} />
    </AbsoluteFill>
  );
};
