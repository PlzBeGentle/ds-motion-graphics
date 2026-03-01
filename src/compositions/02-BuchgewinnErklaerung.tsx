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
import { ImpactShockwave } from "../components/ImpactShockwave";
import { ChromaticAberration } from "../components/ChromaticAberration";

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

// SVG icons for asset types
const AssetSvgIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 48 }) => {
  const stroke = LOCOS.goldLight;
  const props = { width: size, height: size, viewBox: "0 0 48 48", fill: "none" as const };
  switch (type) {
    case "stock":
      return (
        <svg {...props}>
          <polyline points="4,38 14,26 22,32 30,14 38,20 44,8" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="36,8 44,8 44,16" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="4" y1="42" x2="44" y2="42" stroke={LOCOS.silver} strokeWidth="1" opacity={0.3} />
        </svg>
      );
    case "gold":
      return (
        <svg {...props}>
          <path d="M8,36 L14,16 L34,16 L40,36 Z" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="14" y1="16" x2="24" y2="6" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="16" x2="24" y2="6" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="26" x2="30" y2="26" stroke={stroke} strokeWidth="1.5" opacity={0.4} />
        </svg>
      );
    case "btc":
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="18" stroke={stroke} strokeWidth="2.5" />
          <path d="M18,14 L18,34 M18,14 L27,14 Q32,14 32,19 Q32,24 27,24 M18,24 L28,24 Q34,24 34,29 Q34,34 28,34 L18,34" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="20" y1="10" x2="20" y2="14" stroke={stroke} strokeWidth="1.5" />
          <line x1="26" y1="10" x2="26" y2="14" stroke={stroke} strokeWidth="1.5" />
          <line x1="20" y1="34" x2="20" y2="38" stroke={stroke} strokeWidth="1.5" />
          <line x1="26" y1="34" x2="26" y2="38" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "house":
      return (
        <svg {...props}>
          <path d="M6,24 L24,8 L42,24" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10,22 L10,40 L38,40 L38,22" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="20" y="28" width="8" height="12" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
};

// Empty wallet icon (replaces 🤲 emoji)
const EmptyWalletIcon: React.FC = () => (
  <svg width={72} height={72} viewBox="0 0 72 72" fill="none">
    <rect x="8" y="20" width="56" height="40" rx="4" stroke={LOCOS.silver} strokeWidth="2.5" />
    <path d="M8,20 L36,8 L64,20" stroke={LOCOS.silver} strokeWidth="2" strokeLinecap="round" />
    <rect x="44" y="32" width="20" height="16" rx="3" stroke={LOCOS.silver} strokeWidth="2" />
    <circle cx="54" cy="40" r="3" stroke={LOCOS.silver} strokeWidth="1.5" />
    <line x1="20" y1="36" x2="36" y2="36" stroke={LOCOS.silver} strokeWidth="1" opacity={0.3} strokeDasharray="4 3" />
    <line x1="20" y1="42" x2="32" y2="42" stroke={LOCOS.silver} strokeWidth="1" opacity={0.3} strokeDasharray="4 3" />
  </svg>
);

// Asset icon with tax overlay
const AssetIcon: React.FC<{
  label: string;
  icon: string;
  delay: number;
  showTax: boolean;
}> = ({ label, icon, delay, showTax }) => {
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
      <AssetSvgIcon type={icon} size={56} />
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
              <EmptyWalletIcon />
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
            <ChromaticAberration triggerFrame={105} duration={10} maxOffset={4}>
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
            </ChromaticAberration>
          )}

          {/* Asset row */}
          <div style={{ display: "flex", gap: 70, justifyContent: "center" }}>
            <AssetIcon icon="stock" label="AKTIE" delay={assetsDelay} showTax />
            <AssetIcon icon="gold" label="GOLD" delay={assetsDelay + 6} showTax />
            <AssetIcon icon="btc" label="BTC" delay={assetsDelay + 12} showTax />
            <AssetIcon icon="house" label="HAUS" delay={assetsDelay + 18} showTax />
          </div>

          {/* Impact shockwave on tax notice */}
          <ImpactShockwave triggerFrame={88} x={960} y={500} color={LOCOS.red} maxRadius={150} />
        </AbsoluteFill>
      </CameraMove>

      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.35} />
    </AbsoluteFill>
  );
};
