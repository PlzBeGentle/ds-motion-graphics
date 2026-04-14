// Phase F.3 — PriceExplosionBars rewritten with real chart PNGs
// ovl-027: 3 real price charts (Gallium / Germanium / Antimon) triptychon
// with CountUp overlays for +365% / +400% / +437%.
// Frame range 12213-12570 → 12334-12930 (word-sync to "Gallium" / "437").
// Per-chart reveal staggered to Daniel's word-starts:
//   Gallium   @ local 0   (abs 12334)
//   Germanium @ local 28  (abs 12362 — word "Germanium" 412.08s)
//   Antimon   @ local 589 (abs 12923 — word "437" 430.76s)

import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
  staticFile,
} from "remotion";
import { MovingGridBG } from "./MovingGridBG";

type ChartBlockProps = {
  src: string;
  label: string;
  percent: number;
  color: string;
  startFrame: number;
  countStartFrame: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

const ChartBlock: React.FC<ChartBlockProps> = ({
  src,
  label,
  percent,
  color,
  startFrame,
  countStartFrame,
  x,
  y,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;
  if (localFrame < -4) return null;

  const entrySpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.8 },
  });

  const opacity = interpolate(entrySpring, [0, 1], [0, 1]);
  const scale = interpolate(entrySpring, [0, 1], [0.84, 1]);
  const translateY = interpolate(entrySpring, [0, 1], [40, 0]);

  const countProgress = interpolate(
    frame - countStartFrame,
    [0, 50],
    [0, percent],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const displayPercent = Math.round(countProgress);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(14, 12, 8, 0.86)",
          backdropFilter: "blur(22px) saturate(1.2)",
          WebkitBackdropFilter: "blur(22px) saturate(1.2)",
          border: "1px solid rgba(245, 211, 122, 0.22)",
          borderRadius: 18,
          boxShadow:
            "0 30px 80px rgba(0, 0, 0, 0.72), inset 0 1px 0 rgba(255,255,255,0.12)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: '"Montserrat", "Inter", sans-serif',
            fontWeight: 900,
            fontSize: 30,
            color: "#fff5e0",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>

        <div
          style={{
            flex: 1,
            position: "relative",
            borderRadius: 10,
            overflow: "hidden",
            background: "rgba(0,0,0,0.35)",
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "brightness(1.05) contrast(1.08)",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 900,
            fontSize: 56,
            color,
            letterSpacing: "-0.02em",
            textAlign: "right",
            textShadow: `0 0 24px ${color}aa`,
          }}
        >
          +{displayPercent}%
        </div>
      </div>
    </div>
  );
};

export const PriceExplosionBars: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const CHART_WIDTH = 500;
  const CHART_HEIGHT = 500;
  const GAP = 40;
  const totalWidth = CHART_WIDTH * 3 + GAP * 2;
  const startX = (1920 - totalWidth) / 2;
  // Iter2.8: Charts positioned BETWEEN header (y=90-180) and ovl-028 timeline
  // (which sits at bottom y=880-1060). Safe zone y=260-780.
  const chartY = 260;

  return (
    <AbsoluteFill>
      {/* Moving grid BG (Iter2.6) */}
      <AbsoluteFill style={{ opacity: headerOpacity }}>
        <MovingGridBG
          gridColor="rgba(245, 211, 122, 0.10)"
          accentColor="rgba(227, 6, 19, 0.22)"
        />
      </AbsoluteFill>
      <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 900,
            fontSize: 56,
            color: "#fff5e0",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textShadow: "0 4px 20px rgba(0,0,0,0.72)",
          }}
        >
          PREIS-EXPLOSION
        </div>
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: 22,
            color: "rgba(245, 211, 122, 0.82)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          Industriemetalle · 2023 → 2025
        </div>
      </div>

      <ChartBlock
        src="assets/gallium preis.png"
        label="GALLIUM"
        percent={365}
        color="#f5d37a"
        startFrame={0}
        countStartFrame={48}
        x={startX}
        y={chartY}
        width={CHART_WIDTH}
        height={CHART_HEIGHT}
      />

      <ChartBlock
        src="assets/germanium preis.png"
        label="GERMANIUM"
        percent={400}
        color="#f5d37a"
        startFrame={22}
        countStartFrame={70}
        x={startX + CHART_WIDTH + GAP}
        y={chartY}
        width={CHART_WIDTH}
        height={CHART_HEIGHT}
      />

      {/* Iter2.7 — Antimon reveal moved earlier (was 589) so all 3 charts
          are visible from the start of the triptychon hero-moment */}
      <ChartBlock
        src="assets/antimon preis.png"
        label="ANTIMON"
        percent={437}
        color="#E30613"
        startFrame={44}
        countStartFrame={92}
        x={startX + (CHART_WIDTH + GAP) * 2}
        y={chartY}
        width={CHART_WIDTH}
        height={CHART_HEIGHT}
      />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default PriceExplosionBars;
