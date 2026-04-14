import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

/**
 * PriceExplosionBars — 3-Bar horizontal chart for ovl-027.
 *
 * Shows GALLIUM +365%, GERMANIUM +400%, ANTIMON +437% as animated
 * horizontal bars with LOCOS gold/red accent. Right-split position,
 * respects face-safe-zone (x=1180-1880, y=180-880).
 *
 * Replacement for library ChartBuild which is a line chart (wrong type
 * for 2-3 categorical percentage values).
 */

const BARS = [
  { label: "GALLIUM", value: 365, icon: "Ga" },
  { label: "GERMANIUM", value: 400, icon: "Ge" },
  { label: "ANTIMON", value: 437, icon: "Sb" },
];

const MAX_VALUE = 500; // scale so 437% doesn't hit edge

export const PriceExplosionBars: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const opacity = seqLifecycle(frame, durationInFrames, 18, 18);

  // Panel entrance
  const panelSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 110, mass: 0.85 },
  });
  const panelScale = interpolate(panelSpring, [0, 1], [0.92, 1]);
  const panelY = interpolate(panelSpring, [0, 1], [30, 0]);

  // Title reveal
  const titleOpacity = interpolate(frame, [6, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 1180,
        top: 180,
        width: 680,
        height: 720,
        opacity,
        transform: `scale(${panelScale}) translateY(${panelY}px)`,
        transformOrigin: "center top",
        background: "rgba(22,21,20,0.88)",
        backdropFilter: "blur(14px)",
        border: `1.5px solid rgba(212,160,23,0.38)`,
        borderRadius: 8,
        padding: "32px 32px 36px 32px",
        boxShadow:
          "0 28px 72px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        pointerEvents: "none",
      }}
    >
      {/* Label row */}
      <div
        style={{
          opacity: titleOpacity,
          fontFamily: BMF_FONTS.sans,
          fontWeight: 600,
          fontSize: 18,
          color: BMF_COLORS.goldAccent,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
        }}
      >
        KRITISCHE METALLE · EU
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          fontFamily: BMF_FONTS.sans,
          fontWeight: 900,
          fontSize: 44,
          color: BMF_COLORS.goldHighlight,
          lineHeight: 1.05,
          letterSpacing: "0.02em",
          marginBottom: 12,
          textShadow: "0 2px 20px rgba(0,0,0,0.7)",
        }}
      >
        PREIS-EXPLOSION
      </div>

      {/* Bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {BARS.map((bar, i) => {
          const barStart = 24 + i * 12;
          const barSpring = spring({
            frame: frame - barStart,
            fps,
            config: { damping: 18, stiffness: 90, mass: 1 },
          });
          const barProgress = interpolate(barSpring, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const barWidth = `${(bar.value / MAX_VALUE) * 100 * barProgress}%`;

          // Number count-up
          const counterStart = barStart + 8;
          const counterProgress = interpolate(
            frame,
            [counterStart, counterStart + 22],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );
          const displayValue = Math.round(bar.value * counterProgress);

          const labelOpacity = interpolate(frame, [barStart, barStart + 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div key={bar.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Label + Value row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  opacity: labelOpacity,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: BMF_FONTS.sans,
                      fontWeight: 800,
                      fontSize: 22,
                      color: BMF_COLORS.warmWhite,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {bar.label}
                  </span>
                  <span
                    style={{
                      fontFamily: BMF_FONTS.sans,
                      fontWeight: 600,
                      fontSize: 14,
                      color: "rgba(255,245,224,0.58)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {bar.icon}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 900,
                    fontSize: 36,
                    color: BMF_COLORS.redAccent,
                    letterSpacing: "-0.02em",
                    textShadow: "0 2px 16px rgba(227,6,19,0.35)",
                  }}
                >
                  +{displayValue}%
                </span>
              </div>

              {/* Bar track + fill */}
              <div
                style={{
                  height: 18,
                  background: "rgba(255,245,224,0.08)",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(212,160,23,0.18)",
                }}
              >
                <div
                  style={{
                    width: barWidth,
                    height: "100%",
                    background: `linear-gradient(90deg, ${BMF_COLORS.goldHighlight} 0%, ${BMF_COLORS.redAccent} 100%)`,
                    boxShadow: "0 0 16px rgba(227,6,19,0.35)",
                    transition: "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer annotation */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 16,
          borderTop: "1px solid rgba(212,160,23,0.22)",
          fontFamily: BMF_FONTS.sans,
          fontWeight: 500,
          fontSize: 14,
          color: "rgba(255,245,224,0.58)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: titleOpacity,
        }}
      >
        SEIT CHINA-EXPORTKONTROLLEN · 2024-2026
      </div>
    </div>
  );
};

export default PriceExplosionBars;
