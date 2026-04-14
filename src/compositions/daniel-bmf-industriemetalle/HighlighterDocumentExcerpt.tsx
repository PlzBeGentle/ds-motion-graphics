import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

/**
 * HighlighterDocumentExcerpt (ovl-018) — paper card with highlighter-wipe on phrase.
 * Highlight wipes across "wird veroeffentlicht" after card entrance.
 */
export const HighlighterDocumentExcerpt: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const rotateY = interpolate(frame, [0, 18], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = seqLifecycle(frame, durationInFrames, 14, 14);

  // Highlighter wipe starts at frame 24
  const highlighterProgress = interpolate(frame, [24, 36], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none", perspective: 1000 }}>
      <div
        style={{
          position: "absolute",
          left: 1200,
          top: 220,
          width: 660,
          height: 560,
          opacity,
          transform: `rotateY(${rotateY}deg)`,
          transformOrigin: "center center",
          backgroundColor: "#F5EEDA",
          boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
          borderRadius: 4,
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 800,
            fontSize: 22,
            color: "#555",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          BUNDESSTEUERBLATT TEIL 1
        </div>

        <div style={{ height: 2, width: 60, background: BMF_COLORS.goldAccent }} />

        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 600,
            fontSize: 32,
            color: "#0a0a0a",
            lineHeight: 1.5,
          }}
        >
          <div>Dieses Schreiben</div>
          <div style={{ position: "relative", display: "inline-block", fontWeight: 800 }}>
            {/* Highlighter layer */}
            <div
              style={{
                position: "absolute",
                inset: "-2px -6px",
                background: "#F4D03F",
                opacity: 0.62,
                clipPath: `inset(0 ${100 - highlighterProgress}% 0 0)`,
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>wird veröffentlicht</span>
          </div>
          <div>im Bundessteuerblatt Teil 1.</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default HighlighterDocumentExcerpt;
