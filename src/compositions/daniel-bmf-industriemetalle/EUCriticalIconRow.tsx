import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

/**
 * EUCriticalIconRow (ovl-016) — Icon-label stack: EU flag, battery, e-car.
 * Stagger scale-pop 5f between items.
 */
const ITEMS = [
  { label: "EU CRITICAL", icon: "EU" },
  { label: "BATTERIE", icon: "BAT" },
  { label: "E-AUTO", icon: "EV" },
];

export const EUCriticalIconRow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 14, 12);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 1220,
          top: 220,
          width: 640,
          opacity,
          background: BMF_COLORS.panelBg,
          border: `1.5px solid ${BMF_COLORS.goldBorder}`,
          borderRadius: 8,
          backdropFilter: "blur(20px)",
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {ITEMS.map((it, i) => {
          const pop = spring({
            frame: frame - i * 5 - 4,
            fps,
            config: BMF_SPRINGS.snappy,
          });
          const scale = interpolate(pop, [0, 1], [0.7, 1]);
          const itemOpacity = interpolate(pop, [0, 1], [0, 1]);
          return (
            <div
              key={it.label}
              style={{
                opacity: itemOpacity,
                transform: `scale(${scale})`,
                transformOrigin: "left center",
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 12,
                  background: "rgba(212,160,23,0.12)",
                  border: `2px solid ${BMF_COLORS.goldAccent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: BMF_FONTS.sans,
                  fontWeight: 900,
                  fontSize: 28,
                  color: BMF_COLORS.goldAccent,
                }}
              >
                {it.icon}
              </div>
              <div
                style={{
                  fontFamily: BMF_FONTS.sans,
                  fontWeight: 800,
                  fontSize: 32,
                  color: BMF_COLORS.warmWhite,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {it.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default EUCriticalIconRow;
