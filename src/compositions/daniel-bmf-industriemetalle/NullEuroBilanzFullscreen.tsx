import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

/**
 * NullEuroBilanzFullscreen (ovl-024) — Fullscreen bilanz: +/- column split.
 * Plus column: "0,00 EUR mehr Einnahmen" (giant orbitron)
 * Minus column: Anleger/Haendler/Reserven — alle VERLOREN.
 * Counter-up overshoot-clamped spring on 0,00.
 */
const MINUS_ROWS = [
  { label: "ANLEGER", state: "VERLOREN" },
  { label: "HÄNDLER", state: "VERLOREN" },
  { label: "RESERVEN", state: "VERLOREN" },
];

export const NullEuroBilanzFullscreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 4], [0, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heroSpring = spring({
    frame: frame - 4,
    fps,
    config: BMF_SPRINGS.heavy,
  });
  const heroScale = interpolate(heroSpring, [0, 1], [0.75, 1]);
  const heroOpacity = interpolate(heroSpring, [0, 0.3], [0, 1]);
  const globalOpacity = seqLifecycle(frame, durationInFrames, 8, 16);

  // Screen shake 6f on entry
  const shake =
    frame < 10
      ? Math.sin(frame * 3.2) * Math.max(0, 8 - frame * 0.8)
      : 0;

  return (
    <AbsoluteFill style={{ opacity: globalOpacity, transform: `translateX(${shake}px)` }}>
      {/* Black backdrop */}
      <AbsoluteFill style={{ background: BMF_COLORS.warmBlack, opacity: bgOpacity }} />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "row",
          padding: "80px 120px",
          gap: 80,
        }}
      >
        {/* Plus column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 24,
            opacity: heroOpacity,
          }}
        >
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 800,
              fontSize: 48,
              color: BMF_COLORS.goldAccent,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            + MEHR EINNAHMEN
          </div>
          <div
            style={{
              fontFamily: BMF_FONTS.mono,
              fontWeight: 900,
              fontSize: 220,
              color: BMF_COLORS.goldAccent,
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              transform: `scale(${heroScale})`,
              transformOrigin: "left center",
              textShadow: "0 8px 40px rgba(0,0,0,0.7)",
            }}
          >
            0,00
          </div>
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 900,
              fontSize: 72,
              color: BMF_COLORS.goldAccent,
              letterSpacing: "0.02em",
            }}
          >
            EUR
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: "rgba(212,160,23,0.25)" }} />

        {/* Minus column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 800,
              fontSize: 48,
              color: BMF_COLORS.redAccent,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            − VERLUSTE
          </div>
          {MINUS_ROWS.map((row, i) => {
            const rowProgress = interpolate(
              frame,
              [8 + i * 5, 22 + i * 5],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={row.label}
                style={{
                  opacity: rowProgress,
                  transform: `translateX(${(1 - rowProgress) * 40}px)`,
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 28,
                  borderBottom: "1px solid rgba(227,6,19,0.25)",
                  paddingBottom: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: BMF_FONTS.sans,
                    fontWeight: 800,
                    fontSize: 48,
                    color: BMF_COLORS.warmWhite,
                    letterSpacing: "0.02em",
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    fontFamily: BMF_FONTS.sans,
                    fontWeight: 900,
                    fontSize: 56,
                    color: BMF_COLORS.redAccent,
                    letterSpacing: "0.02em",
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
