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
import { BuzzwordLowerThird } from "../components/BuzzwordLowerThird";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";

// Animated bar with glow
const Bar: React.FC<{
  label: string;
  color: string;
  maxHeight: number;
  delay: number;
  x: number;
  width?: number;
}> = ({ label, color, maxHeight, delay, x, width = 90 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const grow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 50, mass: 1.2 },
  });

  const height = interpolate(grow, [0, 1], [0, maxHeight]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 380,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY.headline,
          fontWeight: 700,
          fontSize: 18,
          color,
          opacity: grow,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          position: "absolute",
          bottom: height + 14,
        }}
      >
        {label}
      </div>
      {/* Bar with gradient */}
      <div
        style={{
          width,
          height,
          background: `linear-gradient(180deg, ${color}DD 0%, ${color} 100%)`,
          borderRadius: "6px 6px 0 0",
          boxShadow: `0 0 25px ${color}40, inset 0 2px 0 ${color}80`,
          position: "absolute",
          bottom: 0,
        }}
      />
    </div>
  );
};

// Domino with realistic shadow
const Domino: React.FC<{ delay: number; x: number; index: number }> = ({
  delay,
  x,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fall = spring({
    frame: frame - delay,
    fps,
    config: { damping: 7, stiffness: 80, mass: 0.6 },
  });

  const rotation = interpolate(fall, [0, 1], [0, 75]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 140,
        width: 28,
        height: 75,
        background: `linear-gradient(135deg, ${LOCOS.white} 0%, #CCC 100%)`,
        border: `1.5px solid ${LOCOS.silver}60`,
        borderRadius: 4,
        transformOrigin: "bottom right",
        transform: `rotate(${rotation}deg)`,
        boxShadow: `2px 4px 15px rgba(0,0,0,${0.2 + fall * 0.2})`,
      }}
    >
      {/* Dots on domino */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          padding: "12px 6px",
        }}
      >
        {Array.from({ length: Math.min(index + 1, 4) }, (_, i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: LOCOS.black,
              opacity: 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const Zwangsverkauf: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const step1 = 5;
  const step2 = 40;
  const step3 = 80;
  const step4 = 120;
  const step5 = 160;
  const buzzwordDelay = 210;

  // "KEIN CASH" pulse
  const cashPulse =
    frame > step3 && frame < step4
      ? interpolate(Math.sin(frame * 0.4), [-1, 1], [0.1, 1])
      : 0;

  // Arrow animation
  const arrowIn = spring({
    frame: frame - step3 - 12,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.6 },
  });

  // Falling price
  const priceFall = spring({
    frame: frame - step4,
    fps,
    config: { damping: 10, stiffness: 50, mass: 1.2 },
  });
  const priceHeight = interpolate(priceFall, [0, 1], [250, 50]);

  return (
    <AbsoluteFill>
      <CameraMove zoomEnd={1.03} panX={5} panY={-3}>
        <AbsoluteFill>
          <GoldParticles count={12} mode="ambient" />

          {/* Step 1: Green bar */}
          <Bar
            label="BUCHGEWINN"
            color="#4CAF50"
            maxHeight={260}
            delay={step1}
            x={320}
          />

          {/* Step 2: Red bar */}
          <Bar
            label="STEUERFORDERUNG"
            color={LOCOS.red}
            maxHeight={190}
            delay={step2}
            x={480}
          />

          {/* Step 3: KEIN CASH + Arrow + VERKAUFEN */}
          {frame > step3 && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 680,
                  top: 340,
                  fontFamily: FONT_FAMILY.headline,
                  fontWeight: 700,
                  fontSize: 46,
                  color: LOCOS.red,
                  opacity: cashPulse,
                  textShadow: `0 0 40px ${LOCOS.red}AA, 0 0 80px ${LOCOS.red}50`,
                  letterSpacing: "0.08em",
                }}
              >
                KEIN CASH
              </div>
              {/* Animated arrow */}
              <svg
                style={{
                  position: "absolute",
                  left: 920,
                  top: 348,
                  opacity: arrowIn,
                  transform: `translateX(${interpolate(arrowIn, [0, 1], [-20, 0])}px)`,
                }}
                width="90"
                height="40"
                viewBox="0 0 90 40"
              >
                <defs>
                  <linearGradient id="arrow-grad">
                    <stop offset="0%" stopColor={LOCOS.goldDim} />
                    <stop offset="100%" stopColor={LOCOS.goldLight} />
                  </linearGradient>
                </defs>
                <path
                  d="M5 20 L65 20 M55 8 L70 20 L55 32"
                  stroke="url(#arrow-grad)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: 1030,
                  top: 340,
                  opacity: arrowIn,
                  transform: `translateX(${interpolate(arrowIn, [0, 1], [15, 0])}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_FAMILY.headline,
                    fontWeight: 700,
                    fontSize: 40,
                    backgroundImage: `linear-gradient(90deg, ${LOCOS.gold}, ${LOCOS.goldLight})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.06em",
                  }}
                >
                  VERKAUFEN!
                </div>
              </div>
            </>
          )}

          {/* Step 4: Price falls */}
          {frame > step4 && (
            <div
              style={{
                position: "absolute",
                left: 1280,
                bottom: 380,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY.headline,
                  fontWeight: 700,
                  fontSize: 18,
                  color: LOCOS.red,
                  letterSpacing: "0.06em",
                  position: "absolute",
                  bottom: priceHeight + 14,
                }}
              >
                PREIS
              </div>
              <div
                style={{
                  width: 90,
                  height: priceHeight,
                  background: `linear-gradient(180deg, ${LOCOS.red}DD 0%, ${LOCOS.red} 100%)`,
                  borderRadius: "6px 6px 0 0",
                  boxShadow: `0 0 25px ${LOCOS.red}40`,
                  position: "absolute",
                  bottom: 0,
                }}
              />
              {/* Animated down arrow */}
              <svg
                style={{ position: "absolute", bottom: -45 }}
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <path
                  d="M20 5 L20 30 M10 22 L20 32 L30 22"
                  stroke={LOCOS.red}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity={interpolate(
                    Math.sin(frame * 0.15),
                    [-1, 1],
                    [0.4, 1]
                  )}
                />
              </svg>
            </div>
          )}

          {/* Step 5: Dominos */}
          {frame > step5 &&
            [0, 1, 2, 3, 4, 5, 6].map((i) => (
              <Domino key={i} delay={step5 + i * 4} x={380 + i * 45} index={i} />
            ))}

          {/* Buzzword */}
          {frame > buzzwordDelay && (
            <BuzzwordLowerThird text="ZWANGSLIQUIDATION" delay={buzzwordDelay} />
          )}
        </AbsoluteFill>
      </CameraMove>

      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.4} />
    </AbsoluteFill>
  );
};
