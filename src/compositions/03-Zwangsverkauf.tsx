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

// Animated bar component
const Bar: React.FC<{
  label: string;
  color: string;
  maxHeight: number;
  delay: number;
  x: number;
}> = ({ label, color, maxHeight, delay, x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const grow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 60, mass: 1 },
  });

  const height = interpolate(grow, [0, 1], [0, maxHeight]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY.body,
          fontWeight: 700,
          fontSize: 18,
          color,
          opacity: grow,
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
          transform: `translateY(${-height - 10}px)`,
        }}
      >
        {label}
      </div>
      {/* Bar */}
      <div
        style={{
          width: 80,
          height,
          backgroundColor: color,
          borderRadius: "4px 4px 0 0",
          boxShadow: `0 0 20px ${color}40`,
          position: "absolute",
          bottom: 0,
        }}
      />
    </div>
  );
};

// Domino piece
const Domino: React.FC<{ delay: number; x: number }> = ({ delay, x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fall = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, stiffness: 100, mass: 0.8 },
  });

  const rotation = interpolate(fall, [0, 1], [0, 80]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 160,
        width: 30,
        height: 80,
        backgroundColor: LOCOS.white,
        border: `2px solid ${LOCOS.silver}`,
        borderRadius: 4,
        transformOrigin: "bottom right",
        transform: `rotate(${rotation}deg)`,
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    />
  );
};

export const Zwangsverkauf: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step timings
  const step1 = 5;    // Buchgewinn grows
  const step2 = 40;   // Steuerforderung appears
  const step3 = 80;   // KEIN CASH blinks
  const step4 = 120;  // Price falls
  const step5 = 160;  // Dominos fall

  // "KEIN CASH" blink
  const blinkOn = frame > step3 && frame < step4 && Math.sin(frame * 0.4) > 0;

  // Arrow
  const arrowIn = spring({
    frame: frame - step3 - 15,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  // Falling price bar
  const priceFall = spring({
    frame: frame - step4,
    fps,
    config: { damping: 12, stiffness: 60, mass: 1 },
  });
  const priceHeight = interpolate(priceFall, [0, 1], [250, 60]);

  // Buzzword timing
  const buzzwordDelay = 200;

  return (
    <AbsoluteFill>
      {/* Step 1: Green bar (Buchgewinn) */}
      <Bar
        label="BUCHGEWINN"
        color="#4CAF50"
        maxHeight={250}
        delay={step1}
        x={350}
      />

      {/* Step 2: Red bar (Steuerforderung) */}
      <Bar
        label="STEUERFORDERUNG"
        color={LOCOS.red}
        maxHeight={180}
        delay={step2}
        x={500}
      />

      {/* Step 3: KEIN CASH + Arrow */}
      {frame > step3 && (
        <>
          <div
            style={{
              position: "absolute",
              left: 700,
              top: 350,
              fontFamily: FONT_FAMILY.headline,
              fontWeight: 700,
              fontSize: 42,
              color: LOCOS.red,
              opacity: blinkOn ? 1 : 0.3,
              textShadow: SHADOW.textRed,
              letterSpacing: "0.06em",
            }}
          >
            KEIN CASH
          </div>
          {/* Arrow */}
          <svg
            style={{
              position: "absolute",
              left: 940,
              top: 355,
              opacity: arrowIn,
            }}
            width="80"
            height="40"
            viewBox="0 0 80 40"
          >
            <path
              d="M5 20 L60 20 M50 10 L65 20 L50 30"
              stroke={LOCOS.gold}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              left: 1040,
              top: 350,
              fontFamily: FONT_FAMILY.headline,
              fontWeight: 700,
              fontSize: 36,
              color: LOCOS.gold,
              opacity: arrowIn,
              letterSpacing: "0.06em",
            }}
          >
            VERKAUFEN!
          </div>
        </>
      )}

      {/* Step 4: Price falls */}
      {frame > step4 && (
        <div
          style={{
            position: "absolute",
            left: 1250,
            bottom: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY.body,
              fontWeight: 700,
              fontSize: 18,
              color: LOCOS.red,
              letterSpacing: "0.04em",
            }}
          >
            PREIS
          </div>
          <div
            style={{
              width: 80,
              height: priceHeight,
              backgroundColor: LOCOS.red,
              borderRadius: "4px 4px 0 0",
              boxShadow: `0 0 20px ${LOCOS.red}40`,
              transition: "height 0.1s",
            }}
          />
          {/* Down arrow */}
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M20 5 L20 30 M10 22 L20 32 L30 22"
              stroke={LOCOS.red}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* Step 5: Dominos */}
      {frame > step5 && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Domino key={i} delay={step5 + i * 5} x={400 + i * 50} />
          ))}
        </>
      )}

      {/* Buzzword at end */}
      {frame > buzzwordDelay && (
        <BuzzwordLowerThird text="ZWANGSLIQUIDATION" delay={buzzwordDelay} />
      )}
    </AbsoluteFill>
  );
};
