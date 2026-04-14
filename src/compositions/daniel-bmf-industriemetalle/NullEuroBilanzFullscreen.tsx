// Phase F.5 / Iter2.1 — NullEuroBilanzFullscreen (deutschland-karte removed)
// ovl-024: "0,00 EUR mehr Einnahmen" + 3 VERLOREN columns
// Custom de-DE format CountUp (CountUp library uses "." as decimal separator).
// Frame range 10872-11205 → 11031-11210 (word-sync "0" @ 367.70s = frame 11031)

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";
import { MovingGridBG } from "./MovingGridBG";

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

  // Custom de-DE format CountUp: 100,00 → 0,00 EUR
  const countSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 16, stiffness: 100, mass: 1 },
  });
  const currentVal = interpolate(countSpring, [0, 1], [100, 0]);
  const deEurStr = currentVal.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
      {/* Moving grid BG (Iter2.5) */}
      <AbsoluteFill style={{ opacity: bgOpacity }}>
        <MovingGridBG
          gridColor="rgba(227, 6, 19, 0.12)"
          accentColor="rgba(227, 6, 19, 0.22)"
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
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 212,
              color: "#E30613",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow: "0 0 48px rgba(227, 6, 19, 0.5), 0 6px 24px rgba(0,0,0,0.82)",
              opacity: interpolate(frame, [8, 22], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {deEurStr} EUR
          </div>
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
