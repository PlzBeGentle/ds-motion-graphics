// Iter2.6 — CoreMessageStatCard 2D replacement (was GlareCard3D causing R3F error)
// Feedback Bild 15 persistent: R3F "Hooks can only be used within Canvas"
// root cause = GlareCard3D → drei <Html> → useThree() outside ThreeCanvas
// ovl-035: "ANTIZYKLISCH · PHYSISCHE SUBSTANZ · LIMITIERT"

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
  Easing,
} from "remotion";
import { MovingGridBG } from "./MovingGridBG";

export const CoreMessageStatCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const scale = interpolate(entry, [0, 1], [0.9, 1]);
  const translateY = interpolate(entry, [0, 1], [30, 0]);

  // Gold shine sweep across the hero text
  const shinePhase = (frame / 90) % 1;
  const shinePos = interpolate(shinePhase, [0, 1], [-20, 120]);

  // Line draws
  const line1Progress = interpolate(frame, [18, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const line2Progress = interpolate(frame, [32, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const line3Progress = interpolate(frame, [46, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      {/* Moving grid BG */}
      <AbsoluteFill style={{ opacity: opacity * 0.94 }}>
        <MovingGridBG
          gridColor="rgba(245, 211, 122, 0.12)"
          accentColor="rgba(245, 211, 122, 0.22)"
        />
      </AbsoluteFill>

      {/* Centered glass card */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            padding: "56px 80px",
            background: "rgba(14, 10, 4, 0.92)",
            backdropFilter: "blur(24px) saturate(1.3)",
            WebkitBackdropFilter: "blur(24px) saturate(1.3)",
            border: "2px solid rgba(245, 211, 122, 0.55)",
            borderRadius: 22,
            boxShadow:
              "0 50px 120px rgba(0,0,0,0.82), 0 0 120px rgba(245, 211, 122, 0.32), inset 0 1px 0 rgba(255,255,255,0.14)",
            opacity,
            transform: `translateY(${translateY}px) scale(${scale})`,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 1240,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gold shine sweep */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${shinePos}%`,
              width: "22%",
              background:
                "linear-gradient(90deg, transparent, rgba(245, 211, 122, 0.18), transparent)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 800,
              fontSize: 26,
              color: "rgba(245, 211, 122, 0.82)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              opacity: line1Progress,
              transform: `translateY(${(1 - line1Progress) * 14}px)`,
            }}
          >
            DIE KERN-BOTSCHAFT
          </div>
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 128,
              color: "#f5d37a",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow:
                "0 0 48px rgba(245, 211, 122, 0.68), 0 6px 24px rgba(0,0,0,0.78)",
              opacity: line2Progress,
              transform: `translateY(${(1 - line2Progress) * 20}px)`,
            }}
          >
            ANTIZYKLISCH
          </div>
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: 28,
              color: "#fff5e0",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: line3Progress,
              transform: `translateY(${(1 - line3Progress) * 14}px)`,
            }}
          >
            Physische Substanz · Limitiert von der Natur
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default CoreMessageStatCard;
