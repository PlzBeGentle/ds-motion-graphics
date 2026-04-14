import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

interface Props {
  chapterNumber: string;
  title: string;
  subtitle: string;
}

/**
 * ChapterCard — Blur-reveal chapter title card for BMF video.
 * Used for all 7 chapter markers.
 */
export const ChapterCard: React.FC<Props> = ({ chapterNumber, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 14, 12);

  const blur = interpolate(frame, [0, 12], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(22,21,20,0.72)",
        opacity,
      }}
    >
      <div
        style={{
          filter: `blur(${blur}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 800,
            fontSize: 22,
            color: BMF_COLORS.goldAccent,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {chapterNumber}
        </div>
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 78,
            color: BMF_COLORS.goldHighlight,
            lineHeight: 1.05,
            letterSpacing: "0.04em",
            textShadow: "0 6px 30px rgba(0,0,0,0.75)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 600,
            fontSize: 28,
            color: "rgba(255,245,224,0.70)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default ChapterCard;
