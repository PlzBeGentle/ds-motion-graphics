import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

/**
 * ZollfreilagerFlowSplit (ovl-008) — Flow diagram: WARE → ZOLLFREILAGER → GRENZE (off).
 * Left-split panel. Stagger-flow nodes with drawing edges.
 */
const NODES = [
  { label: "WARE", icon: "□" },
  { label: "ZOLLFREILAGER", icon: "▦" },
  { label: "GRENZE", icon: "⊗", disabled: true },
];

export const ZollfreilagerFlowSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 14, 12);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 200,
          width: 680,
          height: 640,
          opacity,
          background: BMF_COLORS.panelBg,
          border: `1.5px solid ${BMF_COLORS.goldBorder}`,
          borderRadius: 8,
          backdropFilter: "blur(18px)",
          padding: "40px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 800,
            fontSize: 22,
            color: BMF_COLORS.goldAccent,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          ZOLLFREILAGER
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {NODES.map((n, i) => {
            const nodeSpring = spring({
              frame: frame - i * 5 - 4,
              fps,
              config: BMF_SPRINGS.standard,
            });
            const nodeOpacity = interpolate(nodeSpring, [0, 1], [0, 1]);
            const nodeX = interpolate(nodeSpring, [0, 1], [-30, 0]);

            return (
              <React.Fragment key={n.label}>
                <div
                  style={{
                    opacity: nodeOpacity,
                    transform: `translateX(${nodeX}px)`,
                    background: n.disabled
                      ? "rgba(227,6,19,0.12)"
                      : "rgba(212,160,23,0.12)",
                    border: `2px solid ${
                      n.disabled ? BMF_COLORS.redAccent : BMF_COLORS.goldAccent
                    }`,
                    borderRadius: 6,
                    padding: "20px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      fontFamily: BMF_FONTS.sans,
                      fontSize: 48,
                      color: n.disabled ? BMF_COLORS.redAccent : BMF_COLORS.goldAccent,
                    }}
                  >
                    {n.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: BMF_FONTS.sans,
                      fontWeight: 800,
                      fontSize: 28,
                      color: BMF_COLORS.warmWhite,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {n.label}
                  </div>
                </div>
                {i < NODES.length - 1 && (
                  <div
                    style={{
                      opacity: nodeOpacity,
                      marginLeft: 40,
                      color: BMF_COLORS.goldAccent,
                      fontSize: 28,
                      fontFamily: BMF_FONTS.sans,
                    }}
                  >
                    ↓
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: BMF_FONTS.sans,
            fontWeight: 700,
            fontSize: 22,
            color: BMF_COLORS.redAccent,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          NICHT EINGEFÜHRT
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default ZollfreilagerFlowSplit;
