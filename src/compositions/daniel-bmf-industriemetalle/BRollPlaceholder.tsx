import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

interface Props {
  topic: string;
  label?: string;
}

/**
 * BRollPlaceholder — Full-screen dark card with gold border showing
 * the expected B-Roll topic. Replace later with real footage.
 */
export const BRollPlaceholder: React.FC<Props> = ({ topic, label = "B-ROLL" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 10, 10);

  return (
    <AbsoluteFill style={{ opacity, background: BMF_COLORS.warmBlack }}>
      {/* Subtle gradient */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Gold border frame */}
      <div
        style={{
          position: "absolute",
          inset: 60,
          border: `2px solid ${BMF_COLORS.goldBorder}`,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 800,
            fontSize: 32,
            color: BMF_COLORS.goldAccent,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 96,
            color: BMF_COLORS.warmWhite,
            letterSpacing: "0.02em",
            textAlign: "center",
            textShadow: "0 8px 32px rgba(0,0,0,0.8)",
            maxWidth: "80%",
            lineHeight: 1.1,
          }}
        >
          {topic}
        </div>
        <div
          style={{
            fontFamily: BMF_FONTS.mono,
            fontWeight: 600,
            fontSize: 18,
            color: BMF_COLORS.warmWhiteSoft,
            letterSpacing: "0.2em",
          }}
        >
          PLACEHOLDER · REPLACE WITH FOOTAGE
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default BRollPlaceholder;
