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
import { GradientShine } from "../components/GradientShine";

// Animated chart line with drawing effect
const ChartLine: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const points: [number, number][] = [
    [0, 180],
    [30, 170],
    [60, 155],
    [90, 130],
    [120, 140],
    [150, 110],
    [180, 85],
    [210, 70],
    [240, 55],
    [270, 65],
    [300, 45],
    [330, 30],
    [360, 35],
    [380, 20],
  ];

  const pathData = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");

  const totalLength = 500;
  const dashOffset = interpolate(progress, [0, 1], [totalLength, 0]);

  // Glow dot at the tip
  const visibleIdx = Math.min(
    Math.floor(progress * (points.length - 1)),
    points.length - 1
  );
  const tipX = points[visibleIdx][0];
  const tipY = points[visibleIdx][1];

  return (
    <svg width="400" height="210" viewBox="0 0 400 210">
      {/* Grid lines */}
      {[50, 100, 150].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="400"
          y2={y}
          stroke={LOCOS.silver}
          strokeWidth="0.5"
          opacity="0.15"
        />
      ))}
      {/* Area fill */}
      <path
        d={`${pathData} L 380 210 L 0 210 Z`}
        fill={`${LOCOS.gold}08`}
        strokeDasharray={totalLength + 600}
        strokeDashoffset={dashOffset}
      />
      {/* Glow line */}
      <path
        d={pathData}
        stroke={LOCOS.gold}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
        opacity={0.2}
        style={{ filter: "blur(4px)" }}
      />
      {/* Main line */}
      <path
        d={pathData}
        stroke={LOCOS.goldLight}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
      />
      {/* Tip glow dot */}
      {progress > 0.05 && (
        <>
          <circle
            cx={tipX}
            cy={tipY}
            r={8}
            fill={LOCOS.goldLight}
            opacity={0.3}
            style={{ filter: "blur(4px)" }}
          />
          <circle cx={tipX} cy={tipY} r={4} fill={LOCOS.goldLight} />
        </>
      )}
    </svg>
  );
};

// Asset icon with tax overlay
const AssetIcon: React.FC<{
  label: string;
  emoji: string;
  delay: number;
  showTax: boolean;
}> = ({ label, emoji, delay, showTax }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, stiffness: 150, mass: 0.5 },
  });

  const taxPop = spring({
    frame: frame - delay - 8,
    fps,
    config: { damping: 6, stiffness: 200, mass: 0.4 },
  });

  const taxScale = interpolate(taxPop, [0, 1], [3, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        opacity: pop,
        transform: `scale(${interpolate(pop, [0, 1], [0.3, 1])})`,
        position: "relative",
      }}
    >
      <div style={{ fontSize: 56 }}>{emoji}</div>
      <div
        style={{
          fontFamily: FONT_FAMILY.body,
          fontSize: 17,
          fontWeight: 700,
          color: LOCOS.textLight,
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </div>
      {showTax && (
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -12,
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: LOCOS.red,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${taxScale})`,
            opacity: taxPop,
            fontSize: 17,
            fontWeight: 700,
            color: LOCOS.white,
            boxShadow: `0 0 15px ${LOCOS.red}80`,
          }}
        >
          %
        </div>
      )}
    </div>
  );
};

export const BuchgewinnErklaerung: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartProgress = spring({
    frame: frame - 8,
    fps,
    config: { damping: 30, stiffness: 30, mass: 2 },
  });

  // Labels stagger
  const labelInLeft = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.7 },
  });

  const labelInRight = spring({
    frame: frame - 55,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.7 },
  });

  // Tax notice with heavy bounce
  const taxDrop = spring({
    frame: frame - 85,
    fps,
    config: { damping: 6, stiffness: 200, mass: 0.6 },
  });

  // Blink faster, more aggressive
  const blinkPhase = frame > 105;
  const blinkOn = blinkPhase && Math.sin(frame * 0.4) > -0.2;

  const assetsDelay = 135;

  return (
    <AbsoluteFill>
      <CameraMove zoomEnd={1.025} panX={-3}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 80,
          }}
        >
          <GoldParticles count={15} mode="ambient" />

          {/* Split screen */}
          <div
            style={{
              display: "flex",
              gap: 100,
              alignItems: "center",
              marginBottom: 50,
            }}
          >
            {/* Left: Chart */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
              }}
            >
              <ChartLine progress={chartProgress} frame={frame} />
              <div
                style={{
                  opacity: labelInLeft,
                  transform: `translateY(${interpolate(
                    labelInLeft,
                    [0, 1],
                    [25, 0]
                  )}px)`,
                }}
              >
                <GradientShine
                  text="Buchgewinn +40%"
                  fontSize={30}
                  delay={45}
                />
              </div>
            </div>

            {/* Divider — animated line */}
            <div
              style={{
                width: 2,
                height: interpolate(
                  spring({
                    frame: frame - 40,
                    fps,
                    config: { damping: 15, stiffness: 60, mass: 1 },
                  }),
                  [0, 1],
                  [0, 220]
                ),
                background: `linear-gradient(180deg, transparent, ${LOCOS.silver}40, transparent)`,
              }}
            />

            {/* Right: Empty hand */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
                opacity: labelInRight,
                transform: `translateY(${interpolate(
                  labelInRight,
                  [0, 1],
                  [25, 0]
                )}px)`,
              }}
            >
              <div style={{ fontSize: 84 }}>🤲</div>
              <div
                style={{
                  fontFamily: FONT_FAMILY.headline,
                  fontWeight: 700,
                  fontSize: 30,
                  color: LOCOS.silver,
                  letterSpacing: "0.04em",
                }}
              >
                Verkauft: 0 EUR
              </div>
            </div>
          </div>

          {/* Tax notice dropping */}
          <div
            style={{
              transform: `translateY(${interpolate(
                taxDrop,
                [0, 1],
                [-250, 0]
              )}px) scale(${interpolate(taxDrop, [0, 1], [1.5, 1])}) rotate(${interpolate(
                taxDrop,
                [0, 0.5, 1],
                [-3, 1, 0]
              )}deg)`,
              opacity: interpolate(taxDrop, [0, 0.2], [0, 1], {
                extrapolateRight: "clamp",
              }),
              backgroundColor: `${LOCOS.red}15`,
              border: `2px solid ${LOCOS.red}`,
              padding: "18px 48px",
              marginBottom: 35,
              boxShadow: `0 0 40px ${LOCOS.red}30`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY.headline,
                fontWeight: 700,
                fontSize: 26,
                color: LOCOS.red,
                letterSpacing: "0.08em",
              }}
            >
              STEUERBESCHEID
            </div>
          </div>

          {/* Particle burst when tax drops */}
          <GoldParticles
            count={25}
            mode="burst"
            burstX={960}
            burstY={500}
            burstFrame={88}
          />

          {/* TROTZDEM ZAHLEN blink */}
          {blinkPhase && (
            <div
              style={{
                fontFamily: FONT_FAMILY.headline,
                fontWeight: 700,
                fontSize: 52,
                color: LOCOS.red,
                opacity: blinkOn ? 1 : 0.15,
                textShadow: blinkOn
                  ? `0 0 40px ${LOCOS.red}CC, 0 0 80px ${LOCOS.red}60, 0 0 120px ${LOCOS.red}30`
                  : "none",
                letterSpacing: "0.1em",
                marginBottom: 45,
              }}
            >
              TROTZDEM ZAHLEN!
            </div>
          )}

          {/* Asset row */}
          <div style={{ display: "flex", gap: 70, justifyContent: "center" }}>
            <AssetIcon emoji="📈" label="AKTIE" delay={assetsDelay} showTax />
            <AssetIcon emoji="🥇" label="GOLD" delay={assetsDelay + 6} showTax />
            <AssetIcon emoji="₿" label="BTC" delay={assetsDelay + 12} showTax />
            <AssetIcon emoji="🏠" label="HAUS" delay={assetsDelay + 18} showTax />
          </div>
        </AbsoluteFill>
      </CameraMove>

      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.35} />
    </AbsoluteFill>
  );
};
