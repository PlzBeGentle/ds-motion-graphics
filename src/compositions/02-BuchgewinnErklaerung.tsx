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
import { GradientShine } from "../components/GradientShine";
import { StampEffect } from "../components/StampEffect";
import { NumberCounter } from "../components/NumberCounter";
import { ImpactShockwave } from "../components/ImpactShockwave";

// SVG Asset Icons (professional, no emojis)
const StockIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path d="M6 38 L14 28 L22 32 L30 18 L38 10 L42 14" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 10 L42 10 L42 20" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const GoldIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path d="M8 36 L16 20 L32 20 L40 36 Z" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M12 36 L18 24 L30 24 L36 36" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    <line x1="8" y1="36" x2="40" y2="36" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
const BitcoinIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="16" fill="none" stroke={color} strokeWidth="2.5" />
    <path d="M20 14 L20 34 M20 14 L28 14 Q33 14 33 19 Q33 24 28 24 L20 24 L28 24 Q34 24 34 29 Q34 34 28 34 L20 34 M18 12 L18 16 M26 12 L26 16 M18 32 L18 36 M26 32 L26 36" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);
const HouseIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path d="M6 24 L24 8 L42 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 22 L10 40 L38 40 L38 22" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M20 40 L20 30 L28 30 L28 40" fill="none" stroke={color} strokeWidth="2" />
  </svg>
);

// Candlestick chart
const CandlestickChart: React.FC<{ progress: number; frame: number }> = ({ progress, frame }) => {
  const candles = [
    { o: 160, c: 150, h: 140, l: 165, green: true },
    { o: 148, c: 140, h: 132, l: 155, green: true },
    { o: 142, c: 155, h: 130, l: 158, green: false },
    { o: 150, c: 130, h: 125, l: 155, green: true },
    { o: 128, c: 115, h: 108, l: 135, green: true },
    { o: 118, c: 125, h: 105, l: 130, green: false },
    { o: 122, c: 100, h: 92, l: 128, green: true },
    { o: 98, c: 80, h: 72, l: 105, green: true },
    { o: 82, c: 90, h: 75, l: 95, green: false },
    { o: 88, c: 65, h: 58, l: 95, green: true },
    { o: 63, c: 50, h: 42, l: 70, green: true },
    { o: 52, c: 40, h: 35, l: 58, green: true },
  ];

  const visibleCandles = Math.floor(progress * candles.length);
  const candleWidth = 22;
  const gap = 8;

  return (
    <svg width="380" height="200" viewBox="0 0 380 200">
      {[50, 100, 150].map((y) => (
        <line key={y} x1="0" y1={y} x2="380" y2={y} stroke={LOCOS.silver} strokeWidth="0.5" opacity="0.12" />
      ))}
      {candles.slice(0, visibleCandles).map((c, i) => {
        const x = i * (candleWidth + gap) + 10;
        const bodyTop = Math.min(c.o, c.c);
        const bodyHeight = Math.abs(c.o - c.c) || 2;
        const color = c.green ? "#4CAF50" : LOCOS.red;
        return (
          <g key={i}>
            {/* Wick */}
            <line x1={x + candleWidth/2} y1={c.h} x2={x + candleWidth/2} y2={c.l} stroke={color} strokeWidth="1.5" />
            {/* Body */}
            <rect x={x} y={bodyTop} width={candleWidth} height={bodyHeight} fill={c.green ? color : "none"} stroke={color} strokeWidth="1.5" rx="1" />
            {/* Glow on last candle */}
            {i === visibleCandles - 1 && (
              <rect x={x-2} y={bodyTop-2} width={candleWidth+4} height={bodyHeight+4} fill={color} opacity="0.15" rx="2" style={{ filter: "blur(4px)" }} />
            )}
          </g>
        );
      })}
    </svg>
  );
};

// Envelope that opens
const TaxEnvelope: React.FC<{ progress: number }> = ({ progress }) => {
  const flapAngle = interpolate(progress, [0, 0.4, 0.6], [0, 0, 180], {
    extrapolateRight: "clamp",
  });
  const docSlide = interpolate(progress, [0.5, 1], [0, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", width: 200, height: 140 }}>
      {/* Document sliding out */}
      <div
        style={{
          position: "absolute",
          top: docSlide,
          left: 20,
          width: 160,
          height: 110,
          backgroundColor: `${LOCOS.white}F0`,
          border: `1px solid ${LOCOS.silver}40`,
          display: "flex",
          flexDirection: "column",
          padding: "12px 16px",
          gap: 6,
          zIndex: 1,
        }}
      >
        {/* Fake text lines */}
        {[80, 120, 100, 60].map((w, i) => (
          <div key={i} style={{ width: w, height: 4, backgroundColor: `${LOCOS.silver}40`, borderRadius: 2 }} />
        ))}
        <div style={{
          fontFamily: FONT_FAMILY.headline,
          fontSize: 14,
          color: LOCOS.red,
          fontWeight: 700,
          marginTop: 8,
          letterSpacing: "0.06em",
        }}>
          STEUERBESCHEID
        </div>
      </div>
      {/* Envelope body */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: 200,
          height: 100,
          backgroundColor: `${LOCOS.darkBg}F0`,
          border: `2px solid ${LOCOS.red}80`,
          borderRadius: "0 0 4px 4px",
          zIndex: 2,
        }}
      />
      {/* Envelope flap */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          width: 0,
          height: 0,
          borderLeft: "100px solid transparent",
          borderRight: "100px solid transparent",
          borderTop: `60px solid ${LOCOS.red}60`,
          transformOrigin: "top center",
          transform: `rotateX(${flapAngle}deg)`,
          zIndex: flapAngle > 90 ? 0 : 3,
        }}
      />
    </div>
  );
};

// Asset with red STEUERPFLICHTIG stamp
const AssetWithStamp: React.FC<{
  icon: React.ReactNode;
  label: string;
  delay: number;
}> = ({ icon, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, stiffness: 150, mass: 0.5 },
  });

  const stampDrop = spring({
    frame: frame - delay - 12,
    fps,
    config: { damping: 5, stiffness: 250, mass: 0.5 },
  });

  const stampScale = interpolate(stampDrop, [0, 1], [4, 1]);

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
      <div style={{ opacity: stampDrop > 0.5 ? 0.4 : 1 }}>{icon}</div>
      <div style={{
        fontFamily: FONT_FAMILY.body,
        fontSize: 16,
        fontWeight: 700,
        color: LOCOS.textLight,
        letterSpacing: "0.06em",
      }}>
        {label}
      </div>
      {/* Red stamp overlay */}
      {stampDrop > 0.01 && (
        <div style={{
          position: "absolute",
          top: -5,
          left: "50%",
          transform: `translateX(-50%) scale(${stampScale}) rotate(-8deg)`,
          opacity: interpolate(stampDrop, [0, 0.3], [0, 0.85], { extrapolateRight: "clamp" }),
          fontFamily: FONT_FAMILY.headline,
          fontSize: 10,
          fontWeight: 700,
          color: LOCOS.red,
          border: `1.5px solid ${LOCOS.red}`,
          padding: "2px 6px",
          letterSpacing: "0.08em",
          whiteSpace: "nowrap",
          textShadow: `0 0 8px ${LOCOS.red}60`,
        }}>
          STEUERPFLICHTIG
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
    config: { damping: 25, stiffness: 25, mass: 2 },
  });

  // Counter for +40%
  const counterIn = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  });

  // Right side
  const rightIn = spring({
    frame: frame - 55,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.7 },
  });

  // Divider crack
  const dividerIn = spring({
    frame: frame - 45,
    fps,
    config: { damping: 15, stiffness: 60, mass: 1 },
  });

  const dividerCrack = interpolate(
    frame,
    [85, 90, 95],
    [0, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Envelope animation
  const envelopeProgress = spring({
    frame: frame - 85,
    fps,
    config: { damping: 10, stiffness: 50, mass: 1 },
  });

  const envelopeDrop = spring({
    frame: frame - 82,
    fps,
    config: { damping: 7, stiffness: 120, mass: 0.7 },
  });

  // Blink
  const blinkPhase = frame > 115;
  const blinkOn = blinkPhase && Math.sin(frame * 0.45) > -0.2;

  const assetsDelay = 145;

  return (
    <AbsoluteFill>
      <CameraMove zoomEnd={1.025} panX={-3}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 70 }}>
          <GoldParticles count={15} mode="ambient" />

          {/* Split screen */}
          <div style={{ display: "flex", gap: 60, alignItems: "center", marginBottom: 40 }}>
            {/* Left: Candlestick Chart */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <CandlestickChart progress={chartProgress} frame={frame} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, opacity: counterIn }}>
                <div style={{
                  fontFamily: FONT_FAMILY.body,
                  fontSize: 22,
                  color: LOCOS.silver,
                }}>
                  Buchgewinn
                </div>
                <div style={{
                  fontFamily: FONT_FAMILY.headline,
                  fontWeight: 700,
                  fontSize: 36,
                  color: "#4CAF50",
                }}>
                  +<NumberCounter to={40} suffix="%" delay={50} fontSize={36} color="#4CAF50" formatNumber={false} />
                </div>
              </div>
            </div>

            {/* Divider — cracks on impact */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: 2,
                height: interpolate(dividerIn, [0, 1], [0, 240]),
                background: `linear-gradient(180deg, transparent, ${LOCOS.silver}50, transparent)`,
              }} />
              {/* Crack lines on divider */}
              {dividerCrack > 0 && (
                <svg width="40" height="240" viewBox="0 0 40 240" style={{
                  position: "absolute",
                  top: 0,
                  left: -19,
                  opacity: dividerCrack,
                }}>
                  <path d="M20 80 L12 95 L22 110 L15 130 L20 140" stroke={LOCOS.white} strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M20 100 L28 115 L18 125" stroke={LOCOS.white} strokeWidth="0.8" fill="none" opacity="0.3" />
                </svg>
              )}
            </div>

            {/* Right: Empty hand + zero */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              opacity: rightIn,
              transform: `translateY(${interpolate(rightIn, [0, 1], [30, 0])}px)`,
            }}>
              {/* Hand SVG instead of emoji */}
              <svg width="90" height="90" viewBox="0 0 90 90">
                <path d="M25 70 Q20 55 22 45 L28 30 Q30 25 35 27 L38 32 Q40 22 45 24 L47 32 Q50 20 55 22 L56 34 Q60 24 64 26 L62 45 Q68 40 70 45 L65 65 Q60 75 45 78 Q30 78 25 70Z"
                  fill="none" stroke={LOCOS.silver} strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <div style={{
                fontFamily: FONT_FAMILY.headline,
                fontWeight: 700,
                fontSize: 32,
                color: LOCOS.silver,
                letterSpacing: "0.04em",
              }}>
                Verkauft: 0 EUR
              </div>
            </div>
          </div>

          {/* Envelope dropping in */}
          <div style={{
            transform: `translateY(${interpolate(envelopeDrop, [0, 1], [-300, 0])}px) scale(${interpolate(envelopeDrop, [0, 1], [1.3, 1])})`,
            opacity: interpolate(envelopeDrop, [0, 0.15], [0, 1], { extrapolateRight: "clamp" }),
            marginBottom: 25,
          }}>
            <TaxEnvelope progress={envelopeProgress} />
          </div>

          {/* Impact when envelope lands */}
          <ImpactShockwave triggerFrame={88} x={960} y={520} color={LOCOS.red} maxRadius={150} />
          <GoldParticles count={20} mode="burst" burstX={960} burstY={520} burstFrame={88} />

          {/* TROTZDEM ZAHLEN blink */}
          {blinkPhase && (
            <div style={{
              fontFamily: FONT_FAMILY.headline,
              fontWeight: 700,
              fontSize: 54,
              color: LOCOS.red,
              opacity: blinkOn ? 1 : 0.1,
              textShadow: blinkOn
                ? `0 0 40px ${LOCOS.red}DD, 0 0 80px ${LOCOS.red}60, 0 0 140px ${LOCOS.red}30`
                : "none",
              letterSpacing: "0.12em",
              marginBottom: 40,
            }}>
              TROTZDEM ZAHLEN!
            </div>
          )}

          {/* Asset row with stamps */}
          <div style={{ display: "flex", gap: 70, justifyContent: "center" }}>
            <AssetWithStamp icon={<StockIcon color={LOCOS.textLight} size={52} />} label="AKTIE" delay={assetsDelay} />
            <AssetWithStamp icon={<GoldIcon color={LOCOS.goldLight} size={52} />} label="GOLD" delay={assetsDelay + 8} />
            <AssetWithStamp icon={<BitcoinIcon color={LOCOS.textLight} size={52} />} label="BTC" delay={assetsDelay + 16} />
            <AssetWithStamp icon={<HouseIcon color={LOCOS.textLight} size={52} />} label="HAUS" delay={assetsDelay + 24} />
          </div>
        </AbsoluteFill>
      </CameraMove>

      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.4} />
    </AbsoluteFill>
  );
};
