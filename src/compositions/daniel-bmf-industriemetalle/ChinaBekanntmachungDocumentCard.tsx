import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

/**
 * ChinaBekanntmachungDocumentCard (ovl-026) — paper card with CN characters,
 * red seal, and staggered metal chip row.
 */
const METALS = ["WOLFRAM", "TELLUR", "WISMUT", "INDIUM", "MOLYBDÄN"];

export const ChinaBekanntmachungDocumentCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const rotateY = interpolate(frame, [0, 18], [-70, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = seqLifecycle(frame, durationInFrames, 14, 14);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", perspective: 1000 }}>
      <div
        style={{
          position: "absolute",
          left: 1180,
          top: 120,
          width: 720,
          height: 840,
          opacity,
          transform: `rotateY(${rotateY}deg)`,
          transformOrigin: "center center",
          backgroundColor: BMF_COLORS.paperWhite,
          boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
          borderRadius: 4,
          padding: "40px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 28,
            color: "#0a0a0a",
            letterSpacing: "0.08em",
          }}
        >
          中华人民共和国
        </div>
        <div style={{ height: 2, width: 60, background: BMF_COLORS.redAccent }} />
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 40,
            color: "#0a0a0a",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          BEKANNTMACHUNG
          <br />
          NR. 10
        </div>

        {/* Red seal */}
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 36,
            width: 130,
            height: 130,
            borderRadius: 65,
            border: `4px solid ${BMF_COLORS.redAccent}`,
            color: BMF_COLORS.redAccent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: BMF_FONTS.sans,
            fontWeight: 900,
            fontSize: 36,
            transform: "rotate(-8deg)",
            opacity: 0.85,
          }}
        >
          Nr.10
        </div>

        {/* Metal chips row */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {METALS.map((metal, i) => {
            const chipProgress = interpolate(
              frame,
              [24 + i * 4, 36 + i * 4],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={metal}
                style={{
                  opacity: chipProgress,
                  transform: `translateY(${(1 - chipProgress) * 12}px)`,
                  background: BMF_COLORS.panelBg,
                  borderRadius: 4,
                  padding: "10px 18px",
                  fontFamily: BMF_FONTS.sans,
                  fontWeight: 700,
                  fontSize: 20,
                  color: BMF_COLORS.warmWhite,
                  letterSpacing: "0.14em",
                }}
              >
                {metal}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default ChinaBekanntmachungDocumentCard;
