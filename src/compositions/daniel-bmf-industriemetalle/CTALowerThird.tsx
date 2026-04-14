import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

/**
 * CTALowerThird (ovl-006) — Soft-CTA lower-third.
 * "LINK: BMF-SCHREIBEN · BESCHREIBUNG UNTER DEM VIDEO"
 */
export const CTALowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame: frame - 4, fps, config: BMF_SPRINGS.standard });
  const slideX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = seqLifecycle(frame, durationInFrames, 16, 12);
  const breathe = 1 + 0.003 * Math.sin((frame / 100) * 2 * Math.PI);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 880,
          width: 900,
          opacity,
          transform: `translateX(${slideX}px) scale(${breathe})`,
          transformOrigin: "left center",
          background: BMF_COLORS.panelBg,
          borderLeft: `4px solid ${BMF_COLORS.goldAccent}`,
          borderRadius: 6,
          backdropFilter: "blur(16px)",
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 8,
            background: "rgba(212,160,23,0.18)",
            border: `2px solid ${BMF_COLORS.goldAccent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: BMF_COLORS.goldAccent,
            fontSize: 28,
            fontWeight: 900,
          }}
        >
          ↓
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 800,
              fontSize: 36,
              color: BMF_COLORS.warmWhite,
              letterSpacing: "0.02em",
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            LINK: BMF-SCHREIBEN
          </div>
          <div
            style={{
              fontFamily: BMF_FONTS.sans,
              fontWeight: 600,
              fontSize: 22,
              color: BMF_COLORS.warmWhiteSoft,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            BESCHREIBUNG UNTER DEM VIDEO
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default CTALowerThird;
