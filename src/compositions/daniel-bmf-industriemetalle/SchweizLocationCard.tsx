// Iter2.4 — SchweizLocationCard: removed slot-10 BG (redundant with B-roll slot 10)
// Feedback Bild 13: schweiz-alpen.png used twice back-to-back (SchweizLocationCard
// @ 17278-17550 + B-roll slot 10 @ 17850-18060) felt redundant.
// Now: just the glass card over Daniel + gold sparkles, no own BG.
// "Freihafen" + "Gold-Grade" removed (not in script).

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Sparkles } from "../../components/library/effects/Sparkles";
import { MovingGridBG } from "./MovingGridBG";

export const SchweizLocationCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1]);
  const panelScale = interpolate(panelSpring, [0, 1], [0.88, 1]);
  const panelY = interpolate(panelSpring, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Iter2.8: MovingGridBG gold-warm, fullscreen had no BG before */}
      <AbsoluteFill style={{ opacity: panelOpacity }}>
        <MovingGridBG
          gridColor="rgba(245, 211, 122, 0.12)"
          accentColor="rgba(245, 211, 122, 0.22)"
        />
      </AbsoluteFill>

      {/* Sparkles gold particles layered over the grid */}
      <Sparkles count={60} color="#f5d37a" minSize={1} maxSize={3} speed={0.32} />

      {/* Centered glass card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${panelY}px) scale(${panelScale})`,
          opacity: panelOpacity,
          padding: "42px 60px",
          background: "rgba(14, 10, 4, 0.86)",
          backdropFilter: "blur(22px) saturate(1.3)",
          WebkitBackdropFilter: "blur(22px) saturate(1.3)",
          border: "1.5px solid rgba(245, 211, 122, 0.52)",
          borderRadius: 20,
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.82), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 80px rgba(245, 211, 122, 0.28)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          minWidth: 580,
        }}
      >
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 800,
            fontSize: 26,
            color: "rgba(245, 211, 122, 0.82)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          DIE LÖSUNG
        </div>
        <div
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 900,
            fontSize: 140,
            color: "#f5d37a",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textShadow:
              "0 0 48px rgba(245, 211, 122, 0.68), 0 6px 24px rgba(0,0,0,0.72)",
          }}
        >
          SCHWEIZ
        </div>
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: 26,
            color: "#fff5e0",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Dein Zolllager
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default SchweizLocationCard;
