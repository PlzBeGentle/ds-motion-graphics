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

// Simple chart line component
const ChartLine: React.FC<{ progress: number }> = ({ progress }) => {
  const points = [
    [0, 180],
    [40, 160],
    [80, 140],
    [120, 100],
    [160, 120],
    [200, 70],
    [240, 50],
    [280, 30],
    [320, 40],
    [360, 20],
  ];

  const visiblePoints = Math.floor(progress * points.length);
  const pathData = points
    .slice(0, visiblePoints)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");

  return (
    <svg width="380" height="200" viewBox="0 0 380 200">
      {/* Grid lines */}
      {[50, 100, 150].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="380"
          y2={y}
          stroke={LOCOS.silver}
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}
      {/* Chart line */}
      <path
        d={pathData}
        stroke={LOCOS.goldLight}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Area fill */}
      {visiblePoints > 1 && (
        <path
          d={`${pathData} L ${points[visiblePoints - 1][0]} 200 L 0 200 Z`}
          fill={`${LOCOS.gold}15`}
        />
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
    config: { damping: 10, stiffness: 120, mass: 0.6 },
  });

  const taxPop = spring({
    frame: frame - delay - 10,
    fps,
    config: { damping: 8, stiffness: 150, mass: 0.5 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: pop,
        transform: `scale(${interpolate(pop, [0, 1], [0.5, 1])})`,
        position: "relative",
      }}
    >
      <div style={{ fontSize: 52 }}>{emoji}</div>
      <div
        style={{
          fontFamily: FONT_FAMILY.body,
          fontSize: 16,
          fontWeight: 700,
          color: LOCOS.textLight,
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
      {/* Tax overlay */}
      {showTax && (
        <div
          style={{
            position: "absolute",
            top: -5,
            right: -10,
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: `${LOCOS.red}DD`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${interpolate(taxPop, [0, 1], [0, 1])})`,
            fontSize: 16,
            fontWeight: 700,
            color: LOCOS.white,
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

  // Phase timings
  const chartProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 30, stiffness: 40, mass: 1.5 },
  });

  // Labels
  const labelInLeft = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  const labelInRight = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  // Tax notice drop
  const taxDrop = spring({
    frame: frame - 80,
    fps,
    config: { damping: 8, stiffness: 180, mass: 0.8 },
  });

  // "TROTZDEM ZAHLEN" blink
  const blinkOn =
    frame > 100 && Math.sin(frame * 0.3) > 0;

  // Assets section
  const assetsDelay = 130;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Split screen container */}
      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          marginBottom: 60,
        }}
      >
        {/* Left: Chart */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <ChartLine progress={chartProgress} />
          <div
            style={{
              fontFamily: FONT_FAMILY.headline,
              fontWeight: 700,
              fontSize: 28,
              color: LOCOS.goldLight,
              opacity: labelInLeft,
              transform: `translateY(${interpolate(
                labelInLeft,
                [0, 1],
                [20, 0]
              )}px)`,
              letterSpacing: "0.04em",
            }}
          >
            Buchgewinn +40%
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 2,
            height: 200,
            backgroundColor: `${LOCOS.silver}40`,
          }}
        />

        {/* Right: Empty hand */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: labelInRight,
            transform: `translateY(${interpolate(
              labelInRight,
              [0, 1],
              [20, 0]
            )}px)`,
          }}
        >
          <div style={{ fontSize: 80 }}>🤲</div>
          <div
            style={{
              fontFamily: FONT_FAMILY.headline,
              fontWeight: 700,
              fontSize: 28,
              color: LOCOS.silver,
              letterSpacing: "0.04em",
            }}
          >
            Verkauft: 0 EUR
          </div>
        </div>
      </div>

      {/* Tax notice dropping in */}
      <div
        style={{
          transform: `translateY(${interpolate(
            taxDrop,
            [0, 1],
            [-200, 0]
          )}px) scale(${interpolate(taxDrop, [0, 1], [1.3, 1])})`,
          opacity: interpolate(taxDrop, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          }),
          backgroundColor: `${LOCOS.red}20`,
          border: `2px solid ${LOCOS.red}`,
          padding: "16px 40px",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY.headline,
            fontWeight: 700,
            fontSize: 24,
            color: LOCOS.red,
            letterSpacing: "0.06em",
          }}
        >
          STEUERBESCHEID
        </div>
      </div>

      {/* TROTZDEM ZAHLEN blink */}
      {frame > 100 && (
        <div
          style={{
            fontFamily: FONT_FAMILY.headline,
            fontWeight: 700,
            fontSize: 48,
            color: LOCOS.red,
            opacity: blinkOn ? 1 : 0.3,
            textShadow: SHADOW.textRed,
            letterSpacing: "0.08em",
            marginBottom: 50,
          }}
        >
          TROTZDEM ZAHLEN!
        </div>
      )}

      {/* Asset row */}
      <div
        style={{
          display: "flex",
          gap: 60,
          justifyContent: "center",
        }}
      >
        <AssetIcon emoji="📈" label="AKTIE" delay={assetsDelay} showTax />
        <AssetIcon
          emoji="🥇"
          label="GOLD"
          delay={assetsDelay + 8}
          showTax
        />
        <AssetIcon
          emoji="₿"
          label="BTC"
          delay={assetsDelay + 16}
          showTax
        />
        <AssetIcon
          emoji="🏠"
          label="HAUS"
          delay={assetsDelay + 24}
          showTax
        />
      </div>
    </AbsoluteFill>
  );
};
