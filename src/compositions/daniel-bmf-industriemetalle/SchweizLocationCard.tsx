// Phase F.7 — SchweizLocationCard rewritten with slot-10 KenBurns + Sparkles
// ovl-034: Warm Schweiz payoff. Uses slot-10-schweiz-alpen.png as full BG
// with KenBurns drift + Sparkles particle overlay (NO GoldVault3D per Dario).
// Frame range 17079-17643 → 17278-17550 (word-sync "Schweiz"@575.94s)

import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  staticFile,
} from "remotion";
import { Sparkles } from "../../components/library/effects/Sparkles";

export const SchweizLocationCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // BG entry
  const bgOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kbScale = interpolate(frame, [0, durationInFrames], [1.02, 1.1]);
  const kbDriftY = interpolate(frame, [0, durationInFrames], [0, -18]);

  // Panel entry
  const panelSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1]);
  const panelScale = interpolate(panelSpring, [0, 1], [0.9, 1]);
  const panelY = interpolate(panelSpring, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* BG — Schweiz Alpen KenBurns */}
      <AbsoluteFill style={{ opacity: bgOpacity }}>
        <Img
          src={staticFile("bmf/b-roll/slot-10-schweiz-alpen.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${kbScale}) translateY(${kbDriftY}px)`,
            transformOrigin: "center 60%",
            filter: "brightness(0.82) saturate(1.15) contrast(1.08)",
          }}
        />
      </AbsoluteFill>

      {/* Warm vignette overlay */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 0%, rgba(14, 8, 2, 0.55) 100%)",
        }}
      />

      {/* Sparkles gold particles */}
      <Sparkles count={70} color="#f5d37a" minSize={1} maxSize={4} speed={0.35} />

      {/* Centered glass card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${panelY}px) scale(${panelScale})`,
          opacity: panelOpacity,
          padding: "48px 64px",
          background: "rgba(14, 10, 4, 0.8)",
          backdropFilter: "blur(18px) saturate(1.3)",
          WebkitBackdropFilter: "blur(18px) saturate(1.3)",
          border: "1.5px solid rgba(245, 211, 122, 0.48)",
          borderRadius: 20,
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.82), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 80px rgba(245, 211, 122, 0.22)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          minWidth: 620,
        }}
      >
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 800,
            fontSize: 28,
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
            fontSize: 148,
            color: "#f5d37a",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textShadow: "0 0 48px rgba(245, 211, 122, 0.68), 0 6px 24px rgba(0,0,0,0.72)",
          }}
        >
          SCHWEIZ
        </div>
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: 30,
            color: "#fff5e0",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Zolllager · Freihafen · Gold-Grade
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default SchweizLocationCard;
