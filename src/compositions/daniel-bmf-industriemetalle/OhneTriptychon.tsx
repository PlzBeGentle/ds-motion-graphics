import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

/**
 * OhneTriptychon (ovl-004) — 3-panel "OHNE PARLAMENT / VORWARNUNG / UEBERGANG".
 * Stagger-slide-up 4f between panels, red-accent. Below-shoulders layout.
 */
const PANELS = [
  { label: "OHNE", accent: "PARLAMENT" },
  { label: "OHNE", accent: "VORWARNUNG" },
  { label: "OHNE", accent: "ÜBERGANG" },
];

export const OhneTriptychon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 16, 12);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 700,
          width: 1760,
          height: 320,
          opacity,
          display: "flex",
          flexDirection: "row",
          gap: 40,
          justifyContent: "center",
        }}
      >
        {PANELS.map((p, i) => {
          const panelSpring = spring({
            frame: frame - i * 4 - 4,
            fps,
            config: BMF_SPRINGS.smooth,
          });
          const translateY = interpolate(panelSpring, [0, 1], [40, 0]);
          const pOpacity = interpolate(panelSpring, [0, 1], [0, 1]);
          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: pOpacity,
                transform: `translateY(${translateY}px)`,
                background: BMF_COLORS.panelBg,
                border: `1.5px solid ${BMF_COLORS.goldBorder}`,
                borderRadius: 8,
                backdropFilter: "blur(20px)",
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: BMF_FONTS.sans,
                  fontWeight: 700,
                  fontSize: 28,
                  color: BMF_COLORS.warmWhiteSoft,
                  letterSpacing: "0.18em",
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  fontFamily: BMF_FONTS.sans,
                  fontWeight: 900,
                  fontSize: 56,
                  color: BMF_COLORS.redAccent,
                  letterSpacing: "0.02em",
                  textShadow: "0 4px 20px rgba(0,0,0,0.6)",
                }}
              >
                {p.accent}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default OhneTriptychon;
