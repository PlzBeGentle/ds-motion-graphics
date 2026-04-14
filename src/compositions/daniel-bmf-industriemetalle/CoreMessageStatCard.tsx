import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

/**
 * CoreMessageStatCard (ovl-035) — Gold-accent headline card (variant of TrustCard).
 * "ANTIZYKLISCH — PHYSISCHE SUBSTANZ · LIMITIERT VON DER NATUR"
 */
export const CoreMessageStatCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame: frame - 4, fps, config: BMF_SPRINGS.standard });
  const slideX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = seqLifecycle(frame, durationInFrames, 16, 14);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 760,
          width: 860,
          opacity,
          transform: `translateX(${slideX}px)`,
          background: BMF_COLORS.panelBg,
          borderLeft: `4px solid ${BMF_COLORS.goldAccent}`,
          borderRadius: 8,
          backdropFilter: "blur(20px)",
          padding: "28px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 54,
            color: BMF_COLORS.goldHighlight,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          ANTIZYKLISCH
        </div>
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 700,
            fontSize: 22,
            color: BMF_COLORS.warmWhiteSoft,
            letterSpacing: "0.12em",
          }}
        >
          PHYSISCHE SUBSTANZ · LIMITIERT VON DER NATUR
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default CoreMessageStatCard;
