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
import { DREI_SAEULEN } from "../data/transcript";
import { NumberCounter } from "../components/NumberCounter";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { GradientShine } from "../components/GradientShine";
import { HexGrid } from "../components/HexGrid";
import { ImpactShockwave } from "../components/ImpactShockwave";

const Pillar: React.FC<{
  title: string;
  subtitle: string;
  delay: number;
  index: number;
}> = ({ title, subtitle, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const grow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 45, mass: 1.2 },
  });

  const pillarHeight = interpolate(grow, [0, 1], [0, 360]);

  const labelIn = spring({
    frame: frame - delay - 18,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.7 },
  });

  // Shimmer effect on pillar
  const shimmerPos = interpolate(
    frame - delay,
    [0, 60],
    [-100, 200],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 340,
      }}
    >
      {/* Title with shine */}
      <div
        style={{
          opacity: labelIn,
          transform: `translateY(${interpolate(labelIn, [0, 1], [25, 0])}px)`,
          marginBottom: 20,
        }}
      >
        <GradientShine
          text={title}
          fontSize={22}
          delay={delay + 18}
          shineDuration={35}
          style={{ textAlign: "center", lineHeight: 1.3 }}
        />
      </div>

      {/* Pillar */}
      <div
        style={{
          width: 210,
          height: pillarHeight,
          background: `linear-gradient(180deg, ${LOCOS.goldLight} 0%, ${LOCOS.gold} 40%, ${LOCOS.goldDim} 100%)`,
          borderRadius: "10px 10px 0 0",
          boxShadow: `0 0 40px ${LOCOS.gold}25, inset 0 2px 0 ${LOCOS.goldLight}80, inset -3px 0 8px ${LOCOS.goldDim}40`,
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
            width: "30%",
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${LOCOS.goldLight}30, transparent)`,
            transform: "skewX(-20deg)",
          }}
        />
        {/* Number watermark */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: FONT_FAMILY.headline,
            fontWeight: 700,
            fontSize: 72,
            color: `${LOCOS.black}20`,
          }}
        >
          {index + 1}
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: FONT_FAMILY.body,
          fontSize: 17,
          fontWeight: 400,
          color: LOCOS.textLight,
          textAlign: "center",
          marginTop: 18,
          opacity: labelIn,
          maxWidth: 290,
          lineHeight: 1.4,
          transform: `translateY(${interpolate(labelIn, [0, 1], [15, 0])}px)`,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

export const DreiSaeulen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counterDelay = 135;
  const counterIn = spring({
    frame: frame - counterDelay,
    fps,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });

  return (
    <AbsoluteFill>
      <CameraMove zoomEnd={1.025} panY={-5}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 90,
            background: `radial-gradient(ellipse at center, ${LOCOS.black}E0 0%, ${LOCOS.black}90 60%, transparent 100%)`,
          }}
        >
          <HexGrid delay={0} opacity={0.05} />
          <GoldParticles count={20} mode="ambient" />

          {/* Title */}
          <div
            style={{
              position: "absolute",
              top: 60,
              opacity: spring({
                frame: frame - 2,
                fps,
                config: { damping: 15, stiffness: 80, mass: 0.8 },
              }),
            }}
          >
            <GradientShine
              text="DEINE 3-SAEULEN-STRATEGIE"
              fontSize={36}
              delay={2}
              loop
              shineDuration={55}
            />
          </div>

          {/* Pillars */}
          <div
            style={{
              display: "flex",
              gap: 50,
              justifyContent: "center",
              alignItems: "flex-end",
              marginBottom: 50,
            }}
          >
            {DREI_SAEULEN.map((s, i) => (
              <Pillar
                key={i}
                title={s.title}
                subtitle={s.subtitle}
                delay={i * 22 + 8}
                index={i}
              />
            ))}
          </div>

          {/* Particle bursts + shockwaves per pillar */}
          {DREI_SAEULEN.map((_, i) => (
            <React.Fragment key={`effects-${i}`}>
              <GoldParticles
                count={15}
                mode="burst"
                burstX={480 + i * 390}
                burstY={450}
                burstFrame={i * 22 + 30}
              />
              <ImpactShockwave
                triggerFrame={i * 22 + 28}
                x={480 + i * 390}
                y={450}
                color={LOCOS.gold}
                maxRadius={80}
              />
            </React.Fragment>
          ))}

          {/* Counter section */}
          <div
            style={{
              display: "flex",
              gap: 80,
              justifyContent: "center",
              opacity: counterIn,
              transform: `translateY(${interpolate(
                counterIn,
                [0, 1],
                [35, 0]
              )}px)`,
            }}
          >
            {[
              { label: "Sparplan", prefix: "ab ", to: 50, suffix: " EUR/Monat" },
              { label: "Einmalanlage", prefix: "ab ", to: 5000, suffix: " EUR" },
              { label: "Anonymkauf", prefix: "bis ", to: 2000, suffix: " EUR" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: FONT_FAMILY.body,
                    fontSize: 15,
                    color: LOCOS.silver,
                    marginBottom: 8,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </div>
                <NumberCounter
                  prefix={item.prefix}
                  to={item.to}
                  suffix={item.suffix}
                  delay={counterDelay + i * 8}
                  fontSize={30}
                />
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </CameraMove>

      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.35} />
    </AbsoluteFill>
  );
};
