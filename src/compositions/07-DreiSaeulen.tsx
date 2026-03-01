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
    config: { damping: 14, stiffness: 60, mass: 1 },
  });

  const pillarHeight = interpolate(grow, [0, 1], [0, 340]);

  const labelIn = spring({
    frame: frame - delay - 20,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 320,
      }}
    >
      {/* Title above pillar */}
      <div
        style={{
          fontFamily: FONT_FAMILY.headline,
          fontWeight: 700,
          fontSize: 22,
          color: LOCOS.gold,
          textAlign: "center",
          marginBottom: 16,
          opacity: labelIn,
          transform: `translateY(${interpolate(labelIn, [0, 1], [20, 0])}px)`,
          letterSpacing: "0.04em",
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>

      {/* Pillar */}
      <div
        style={{
          width: 200,
          height: pillarHeight,
          background: `linear-gradient(180deg, ${LOCOS.goldLight} 0%, ${LOCOS.gold} 50%, ${LOCOS.goldDim} 100%)`,
          borderRadius: "8px 8px 0 0",
          boxShadow: `0 0 30px ${LOCOS.gold}30, inset 0 2px 0 ${LOCOS.goldLight}80`,
          position: "relative",
        }}
      >
        {/* Number on pillar */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: FONT_FAMILY.headline,
            fontWeight: 700,
            fontSize: 64,
            color: `${LOCOS.black}40`,
          }}
        >
          {index + 1}
        </div>
      </div>

      {/* Subtitle below */}
      <div
        style={{
          fontFamily: FONT_FAMILY.body,
          fontSize: 17,
          fontWeight: 400,
          color: LOCOS.textLight,
          textAlign: "center",
          marginTop: 16,
          opacity: labelIn,
          maxWidth: 280,
          lineHeight: 1.4,
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

  // Counter section
  const counterDelay = 130;
  const counterIn = spring({
    frame: frame - counterDelay,
    fps,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 100,
      }}
    >
      {/* Pillars */}
      <div
        style={{
          display: "flex",
          gap: 60,
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
            delay={i * 25 + 5}
            index={i}
          />
        ))}
      </div>

      {/* Counter section */}
      <div
        style={{
          display: "flex",
          gap: 60,
          justifyContent: "center",
          opacity: counterIn,
          transform: `translateY(${interpolate(
            counterIn,
            [0, 1],
            [30, 0]
          )}px)`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT_FAMILY.body,
              fontSize: 16,
              color: LOCOS.silver,
              marginBottom: 6,
            }}
          >
            Sparplan
          </div>
          <NumberCounter
            prefix="ab "
            to={50}
            suffix=" EUR/Monat"
            delay={counterDelay}
            fontSize={28}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT_FAMILY.body,
              fontSize: 16,
              color: LOCOS.silver,
              marginBottom: 6,
            }}
          >
            Einmalanlage
          </div>
          <NumberCounter
            prefix="ab "
            to={5000}
            suffix=" EUR"
            delay={counterDelay + 10}
            fontSize={28}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT_FAMILY.body,
              fontSize: 16,
              color: LOCOS.silver,
              marginBottom: 6,
            }}
          >
            Anonymkauf
          </div>
          <NumberCounter
            prefix="bis "
            to={2000}
            suffix=" EUR"
            delay={counterDelay + 20}
            fontSize={28}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
