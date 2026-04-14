import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

/**
 * HardCTALowerThird (ovl-036) — Full-width bottom bar with 2 icons.
 * BMF-PDF + Erstgespräch. Gold border, bigger than soft-CTA.
 */
export const HardCTALowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 18, 16);

  const slideY = interpolate(frame, [0, 18], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowBounce = Math.sin((frame / 30) * 2 * Math.PI) * 4;
  const breathe = 1 + 0.003 * Math.sin((frame / 100) * 2 * Math.PI);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 820,
          width: 1800,
          opacity,
          transform: `translateY(${slideY}px) scale(${breathe})`,
          background: "rgba(26,26,34,0.88)",
          border: `1.5px solid ${BMF_COLORS.goldAccent}`,
          borderRadius: 8,
          backdropFilter: "blur(20px)",
          padding: "32px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 60,
        }}
      >
        {/* Left CTA: PDF */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1 }}>
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: 10,
              background: "rgba(212,160,23,0.18)",
              border: `2px solid ${BMF_COLORS.goldAccent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: BMF_FONTS.sans,
              fontWeight: 900,
              fontSize: 22,
              color: BMF_COLORS.goldAccent,
            }}
          >
            PDF
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontFamily: BMF_FONTS.sans,
                fontWeight: 900,
                fontSize: 36,
                color: BMF_COLORS.warmWhite,
                letterSpacing: "0.02em",
              }}
            >
              BMF-PDF
            </div>
            <div
              style={{
                fontFamily: BMF_FONTS.sans,
                fontWeight: 700,
                fontSize: 22,
                color: BMF_COLORS.goldHighlight,
                letterSpacing: "0.12em",
              }}
            >
              LINK IN BESCHREIBUNG
            </div>
          </div>
        </div>

        {/* Animated down arrow */}
        <div
          style={{
            fontSize: 54,
            color: BMF_COLORS.goldAccent,
            fontWeight: 900,
            transform: `translateY(${arrowBounce}px)`,
          }}
        >
          ↓
        </div>

        {/* Right CTA: Calendar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "right" }}>
            <div
              style={{
                fontFamily: BMF_FONTS.sans,
                fontWeight: 900,
                fontSize: 36,
                color: BMF_COLORS.warmWhite,
                letterSpacing: "0.02em",
              }}
            >
              ERSTGESPRÄCH
            </div>
            <div
              style={{
                fontFamily: BMF_FONTS.sans,
                fontWeight: 700,
                fontSize: 22,
                color: BMF_COLORS.goldHighlight,
                letterSpacing: "0.12em",
              }}
            >
              LOCOS.DE
            </div>
          </div>
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: 10,
              background: "rgba(212,160,23,0.18)",
              border: `2px solid ${BMF_COLORS.goldAccent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: BMF_FONTS.sans,
              fontWeight: 900,
              fontSize: 22,
              color: BMF_COLORS.goldAccent,
            }}
          >
            CAL
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default HardCTALowerThird;
