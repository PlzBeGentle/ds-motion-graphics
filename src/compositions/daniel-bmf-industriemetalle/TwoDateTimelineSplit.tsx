import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

/**
 * TwoDateTimelineSplit (ovl-025) — 2-dot horizontal timeline with 14 MONATE label.
 * China Export-Stopp (Feb 25) → BMF-Schreiben (April 26).
 */
export const TwoDateTimelineSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 14, 12);

  const leftDotProgress = interpolate(frame, [4, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineProgress = interpolate(frame, [12, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightDotProgress = interpolate(frame, [28, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 1180,
          top: 260,
          width: 700,
          height: 420,
          opacity,
          background: BMF_COLORS.panelBg,
          border: `1.5px solid ${BMF_COLORS.goldBorder}`,
          borderRadius: 8,
          backdropFilter: "blur(18px)",
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* Timeline with 2 dots + connector */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              background: BMF_COLORS.goldAccent,
              opacity: leftDotProgress,
              transform: `scale(${leftDotProgress})`,
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 26,
              right: 26,
              top: "50%",
              height: 3,
              background: BMF_COLORS.goldAccent,
              transform: `translateY(-50%) scaleX(${lineProgress})`,
              transformOrigin: "left center",
            }}
          />
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              background: BMF_COLORS.goldAccent,
              opacity: rightDotProgress,
              transform: `scale(${rightDotProgress})`,
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -20,
              transform: "translateX(-50%)",
              fontFamily: BMF_FONTS.sans,
              fontWeight: 700,
              fontSize: 20,
              color: BMF_COLORS.goldAccent,
              letterSpacing: "0.18em",
              opacity: lineProgress,
            }}
          >
            14 MONATE
          </div>
        </div>

        {/* Labels */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ opacity: leftDotProgress }}>
            <div
              style={{
                fontFamily: BMF_FONTS.sans,
                fontWeight: 900,
                fontSize: 56,
                color: BMF_COLORS.warmWhite,
                lineHeight: 1,
                textShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            >
              4. FEB 25
            </div>
            <div
              style={{
                fontFamily: BMF_FONTS.sans,
                fontWeight: 700,
                fontSize: 22,
                color: BMF_COLORS.warmWhiteSoft,
                letterSpacing: "0.12em",
                marginTop: 8,
              }}
            >
              CHINA EXPORT-STOPP
            </div>
          </div>
          <div style={{ opacity: rightDotProgress, textAlign: "right" }}>
            <div
              style={{
                fontFamily: BMF_FONTS.sans,
                fontWeight: 900,
                fontSize: 56,
                color: BMF_COLORS.warmWhite,
                lineHeight: 1,
                textShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            >
              9. APRIL 26
            </div>
            <div
              style={{
                fontFamily: BMF_FONTS.sans,
                fontWeight: 700,
                fontSize: 22,
                color: BMF_COLORS.warmWhiteSoft,
                letterSpacing: "0.12em",
                marginTop: 8,
              }}
            >
              BMF-SCHREIBEN
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default TwoDateTimelineSplit;
