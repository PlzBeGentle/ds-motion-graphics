// Phase F.5 — NullEuroBilanzFullscreen rewritten with deutschland-karte backdrop + CountUp
// ovl-024: "0,00 EUR mehr Einnahmen" + 3 VERLOREN columns
// Frame range 10872-11205 → 11031-11210 (word-sync "0" @ 367.70s = frame 11031)

import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
  staticFile,
} from "remotion";
import { CountUp } from "../../components/library/effects/CountUp";

const MINUS_ROWS = [
  { label: "ANLEGER", state: "VERLOREN" },
  { label: "HÄNDLER", state: "VERLOREN" },
  { label: "RESERVEN", state: "VERLOREN" },
];

export const NullEuroBilanzFullscreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background dim layer entry
  const bgOpacity = interpolate(frame, [0, 6], [0, 0.94], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hero split entry
  const heroSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120, mass: 1 },
  });
  const heroScale = interpolate(heroSpring, [0, 1], [0.82, 1]);
  const heroOpacity = interpolate(heroSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      {/* Dim background */}
      <AbsoluteFill style={{ background: "#0a0808", opacity: bgOpacity }} />

      {/* Germany map backdrop — ghosted behind the hero number */}
      <AbsoluteFill
        style={{
          opacity: interpolate(frame, [8, 36], [0, 0.22], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "drop-shadow(0 0 48px rgba(227, 6, 19, 0.62))",
        }}
      >
        <Img
          src={staticFile("assets/logos/deutschland-karte.svg")}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 920,
            height: "auto",
            marginLeft: -460,
            marginTop: -380,
          }}
        />
      </AbsoluteFill>

      {/* Split grid: PLUS (0 EUR) vs MINUS (3 VERLOREN rows) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
          transformOrigin: "center center",
        }}
      >
        {/* LEFT: PLUS column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            padding: "80px 60px",
            borderRight: "2px solid rgba(227, 6, 19, 0.3)",
          }}
        >
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 800,
              fontSize: 32,
              color: "rgba(245, 211, 122, 0.78)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            MEHR EINNAHMEN
          </div>
          <CountUp
            value={0}
            startValue={100}
            decimals={2}
            suffix=" EUR"
            separator="."
            fontSize={212}
            color="#E30613"
            fontWeight={900}
            springPreset="snappy"
            startFrame={8}
          />
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: 28,
              color: "rgba(255, 245, 224, 0.62)",
              letterSpacing: "0.14em",
            }}
          >
            DEUTSCHLAND BEKOMMT
          </div>
        </div>

        {/* RIGHT: MINUS column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 38,
            padding: "80px 60px",
          }}
        >
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 800,
              fontSize: 32,
              color: "rgba(227, 6, 19, 0.88)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            DREI VERLIERER
          </div>
          {MINUS_ROWS.map((row, i) => {
            const rowReveal = interpolate(frame, [24 + i * 8, 42 + i * 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: rowReveal,
                  transform: `translateX(${(1 - rowReveal) * 32}px)`,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    border: "3px solid #E30613",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E30613",
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 900,
                    fontSize: 28,
                  }}
                >
                  ×
                </div>
                <div
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 900,
                    fontSize: 62,
                    color: "#fff5e0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: 26,
                    color: "rgba(227, 6, 19, 0.88)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginLeft: 12,
                  }}
                >
                  {row.state}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default NullEuroBilanzFullscreen;
