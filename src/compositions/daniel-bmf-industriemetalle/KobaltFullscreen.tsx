import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const KobaltFullscreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A: Entry animations
  const titleSpringStart = Math.max(0, frame - 3);
  const titleOpacity = interpolate(titleSpringStart, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(titleSpringStart, [0, 15], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(titleSpringStart, [0, 15], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chipSpringStart = Math.max(0, frame - 6);
  const chipOpacity = interpolate(chipSpringStart, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chipScale = interpolate(chipSpringStart, [0, 15], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chipY = interpolate(chipSpringStart, [0, 15], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const underlineProgress = interpolate(frame, [9, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowOpacityRaw = interpolate(frame, [12, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowPulse = 1 + Math.sin((frame - 15) * 0.12) * 0.05;
  const glowOpacity = glowOpacityRaw * glowPulse;

  // Phase B & C: Pulsing effects
  const pulseOffset = Math.sin((frame - 15) * 0.15) * 1;

  return (
    <>
      {/* Layer 1: Background */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#161514" }} />

      {/* Layer 2: Subtle Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, rgba(45, 35, 20, 0.15), transparent 70%)`,
        }}
      />

      {/* Layer 3: Red Glow */}
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 800,
          width: 320,
          height: 320,
          background: `radial-gradient(circle at center, 
            rgba(227, 6, 19, ${glowOpacity * 0.35}) 0%, 
            rgba(227, 6, 19, 0) 70%)`,
        }}
      />

      {/* Layer 4: KOBALT Title */}
      <div
        style={{
          position: "absolute",
          top: 200 + pulseOffset,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 280,
          fontWeight: 900,
          fontFamily: '"Inter", system-ui, sans-serif',
          color: "#f5d37a",
          letterSpacing: "0.04em",
          opacity: titleOpacity,
          transform: `scale(${titleScale}) translateY(${titleY}px)`,
          textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 60px rgba(245, 211, 122, 0.15)",
          zIndex: 4,
        }}
      >
        KOBALT
      </div>

      {/* Layer 5: Red Underline */}
      <div
        style={{
          position: "absolute",
          top: 540,
          left: "50%",
          transform: `translateX(-50%) scaleX(${underlineProgress})`,
          transformOrigin: "center",
          width: 380,
          height: 4,
          backgroundColor: "#E30613",
          borderRadius: 2,
          zIndex: 5,
        }}
      />

      {/* Layer 6: Element Chip Container */}
      <div
        style={{
          position: "absolute",
          top: 620 + chipY,
          left: 800,
          width: 320,
          height: 320,
          backgroundColor: "rgba(26, 26, 34, 0.85)",
          border: "2px solid rgba(212, 160, 23, 0.45)",
          borderRadius: 8,
          backdropFilter: "blur(20px)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: chipOpacity,
          transform: `scale(${chipScale})`,
          zIndex: 6,
        }}
      >
        {/* Layer 9: ELEMENT Label */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 22,
            fontSize: 18,
            fontWeight: 600,
            color: "rgba(255, 245, 224, 0.55)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            zIndex: 9,
          }}
        >
          ELEMENT
        </div>

        {/* Layer 7: Co Letter */}
        <div
          style={{
            fontSize: 200,
            fontWeight: 900,
            fontFamily: '"Inter", system-ui, sans-serif',
            color: "#f5d37a",
            textAlign: "center",
            lineHeight: 1.0,
            textShadow: "0 0 40px rgba(245, 211, 122, 0.4)",
            zIndex: 7,
          }}
        >
          Co
        </div>

        {/* Layer 8: Atomic Number */}
        <div
          style={{
            marginTop: 20,
            fontSize: 64,
            fontWeight: 700,
            color: "rgba(255, 245, 224, 0.78)",
            textAlign: "center",
            letterSpacing: "-0.02em",
            zIndex: 8,
          }}
        >
          27
        </div>
      </div>

      {/* Layer 10: Vignette Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.55) 70%, rgba(0, 0, 0, 0.85) 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Layer 11: Subtle Film Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          opacity: 0.05,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 11,
        }}
      />
    </>
  );
};

const DemoSceneKobaltFullscreen: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#161514" }}>
      <KobaltFullscreen />
    </AbsoluteFill>
  );
};

export default DemoSceneKobaltFullscreen;
