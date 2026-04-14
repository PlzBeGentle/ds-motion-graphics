import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";

const HandelsblattFAZNewsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A: Headline + Cards Reveal (0-30)
  const headlineReveal = spring({
    frame: Math.max(frame - 5, 0),
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.7 },
  });

  const underlineScale = interpolate(
    frame,
    [8, 16],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const card1Reveal = spring({
    frame: Math.max(frame - 10, 0),
    fps,
    config: { damping: 16, stiffness: 110, mass: 0.85 },
  });
  const card2Reveal = spring({
    frame: Math.max(frame - 14, 0),
    fps,
    config: { damping: 16, stiffness: 110, mass: 0.85 },
  });
  const card3Reveal = spring({
    frame: Math.max(frame - 18, 0),
    fps,
    config: { damping: 16, stiffness: 110, mass: 0.85 },
  });
  const card4Reveal = spring({
    frame: Math.max(frame - 22, 0),
    fps,
    config: { damping: 16, stiffness: 110, mass: 0.85 },
  });

  // Phase B: X Draw-On (30-60)
  const x1DrawProgress = interpolate(
    frame,
    [32, 40],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const x2DrawProgress = interpolate(
    frame,
    [38, 46],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const x3DrawProgress = interpolate(
    frame,
    [44, 52],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const x4DrawProgress = interpolate(
    frame,
    [50, 58],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Logo opacity when X appears
  const logo1Opacity = interpolate(
    frame,
    [32, 40],
    [1.0, 0.55],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const logo2Opacity = interpolate(
    frame,
    [38, 46],
    [1.0, 0.55],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const logo3Opacity = interpolate(
    frame,
    [44, 52],
    [1.0, 0.55],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const logo4Opacity = interpolate(
    frame,
    [50, 58],
    [1.0, 0.55],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Phase C: Subline (60-180)
  const sublineOpacity = interpolate(
    frame,
    [65, 80],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const sublineY = interpolate(
    frame,
    [65, 80],
    [10, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Vignette pulse
  const vignettePulse = 0.55 + Math.sin(Math.max(frame - 80, 0) * 0.1) * 0.02;

  // Card positions
  const cardPositions = [
    { x: 440, y: 260 }, // Handelsblatt
    { x: 1020, y: 260 }, // FAZ
    { x: 440, y: 580 }, // Die Welt
    { x: 1020, y: 580 }, // Manager Magazin
  ];

  // X positions (centered on cards)
  const xPositions = cardPositions.map(pos => ({
    x: pos.x + 230,
    y: pos.y + 140,
  }));

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Layer 1: Background */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#161514" }} />

      {/* Layer 2: Subtle Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 45%, rgba(45, 35, 20, 0.12), transparent 100%)`,
        }}
      />

      {/* Layer 3: Headline */}
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          fontFamily: '"Inter", system-ui, sans-serif',
          fontWeight: 800,
          fontSize: 56,
          letterSpacing: "0.18em",
          color: "#d4a017",
          textTransform: "uppercase",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          opacity: headlineReveal,
          transform: `scale(${interpolate(headlineReveal, [0, 1], [0.95, 1])})`,
        }}
      >
        DEUTSCHE WIRTSCHAFTSPRESSE
      </div>

      {/* Layer 4: Headline Underline */}
      <div
        style={{
          position: "absolute",
          top: 185,
          left: "calc(50% - 240px)",
          width: 480,
          height: 2,
          background: "linear-gradient(90deg, transparent, #d4a017 20%, #d4a017 80%, transparent)",
          transform: `scaleX(${underlineScale})`,
          transformOrigin: "center",
        }}
      />

      {/* Layer 5-8: Press Cards */}
      {/* Card 1: Handelsblatt */}
      <div
        style={{
          position: "absolute",
          left: 440,
          top: 260,
          width: 460,
          height: 280,
          backgroundColor: "rgba(26, 26, 34, 0.85)",
          border: "1.5px solid rgba(212, 160, 23, 0.35)",
          borderRadius: 6,
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(card1Reveal, [0, 1], [0, 1]),
          transform: `scale(${interpolate(card1Reveal, [0, 1], [0.92, 1])}) translateY(${interpolate(card1Reveal, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 60,
            color: "rgba(255, 245, 224, 0.78)",
            letterSpacing: "0.02em",
            textAlign: "center",
            lineHeight: 1.1,
            opacity: logo1Opacity,
          }}
        >
          <div>HANDELS</div>
          <div>BLATT</div>
        </div>
      </div>

      {/* Card 2: FAZ */}
      <div
        style={{
          position: "absolute",
          left: 1020,
          top: 260,
          width: 460,
          height: 280,
          backgroundColor: "rgba(26, 26, 34, 0.85)",
          border: "1.5px solid rgba(212, 160, 23, 0.35)",
          borderRadius: 6,
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(card2Reveal, [0, 1], [0, 1]),
          transform: `scale(${interpolate(card2Reveal, [0, 1], [0.92, 1])}) translateY(${interpolate(card2Reveal, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 38,
            color: "rgba(255, 245, 224, 0.78)",
            letterSpacing: "-0.01em",
            textAlign: "center",
            lineHeight: 1.1,
            opacity: logo2Opacity,
          }}
        >
          <div>FRANK-</div>
          <div>FURTER</div>
          <div>ALLG.</div>
        </div>
      </div>

      {/* Card 3: Die Welt */}
      <div
        style={{
          position: "absolute",
          left: 440,
          top: 580,
          width: 460,
          height: 280,
          backgroundColor: "rgba(26, 26, 34, 0.85)",
          border: "1.5px solid rgba(212, 160, 23, 0.35)",
          borderRadius: 6,
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(card3Reveal, [0, 1], [0, 1]),
          transform: `scale(${interpolate(card3Reveal, [0, 1], [0.92, 1])}) translateY(${interpolate(card3Reveal, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 80,
            color: "rgba(255, 245, 224, 0.78)",
            letterSpacing: "0.04em",
            textAlign: "center",
            lineHeight: 1.1,
            opacity: logo3Opacity,
          }}
        >
          <div>DIE</div>
          <div>WELT</div>
        </div>
      </div>

      {/* Card 4: Manager Magazin */}
      <div
        style={{
          position: "absolute",
          left: 1020,
          top: 580,
          width: 460,
          height: 280,
          backgroundColor: "rgba(26, 26, 34, 0.85)",
          border: "1.5px solid rgba(212, 160, 23, 0.35)",
          borderRadius: 6,
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(card4Reveal, [0, 1], [0, 1]),
          transform: `scale(${interpolate(card4Reveal, [0, 1], [0.92, 1])}) translateY(${interpolate(card4Reveal, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 50,
            color: "rgba(255, 245, 224, 0.78)",
            letterSpacing: "0.02em",
            textAlign: "center",
            lineHeight: 1.1,
            opacity: logo4Opacity,
          }}
        >
          <div>MANAGER</div>
          <div>MAGAZIN</div>
        </div>
      </div>

      {/* Layer 9-12: Red X Marks — REAL-LIFE ASSET (rotes-x.png Stamp/Sticker) */}
      {/* Stamp-Animation: scale 0 -> 1.18 (overshoot) -> 1.0 (settle), slight rotation per X for character */}
      {(() => {
        const xConfigs = [
          { startFrame: 32, rotation: -4 },
          { startFrame: 38, rotation: 3 },
          { startFrame: 44, rotation: -6 },
          { startFrame: 50, rotation: 5 },
        ];
        return xConfigs.map((cfg, i) => {
          const stampSpring = spring({
            frame: frame - cfg.startFrame,
            fps,
            config: { damping: 9, stiffness: 180, mass: 0.7 },
          });
          const xOpacity = interpolate(frame, [cfg.startFrame, cfg.startFrame + 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // Overshoot scale curve: 0 -> 1.18 -> 1.0
          const xScale = interpolate(stampSpring, [0, 0.6, 1], [0, 1.18, 1.0]);
          return (
            <div
              key={`x-${i}`}
              style={{
                position: "absolute",
                left: xPositions[i].x - 110,
                top: xPositions[i].y - 110,
                width: 220,
                height: 220,
                opacity: xOpacity,
                transform: `scale(${xScale}) rotate(${cfg.rotation}deg)`,
                transformOrigin: "center center",
                filter: "drop-shadow(0 0 36px rgba(227, 6, 19, 0.55)) drop-shadow(0 8px 24px rgba(0, 0, 0, 0.6))",
                pointerEvents: "none",
              }}
            >
              <Img
                src={staticFile("assets/logos/rotes-x.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
            </div>
          );
        });
      })()}

      {/* Layer 13: Subline */}
      <div
        style={{
          position: "absolute",
          top: 880 + sublineY,
          width: "100%",
          textAlign: "center",
          fontFamily: '"Inter", system-ui, sans-serif',
          fontWeight: 500,
          fontSize: 32,
          color: "rgba(255, 245, 224, 0.85)",
          letterSpacing: "0.02em",
          opacity: sublineOpacity,
        }}
      >
        Kein einziger Artikel zu BMF § 4 Nr. 4b vom 9. April
      </div>

      {/* Layer 14: Vignette Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.85) 100%)",
          pointerEvents: "none",
          opacity: vignettePulse,
        }}
      />

      {/* Layer 15: Subtle Film Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};

const DemoSceneHandelsblattFAZNewsCard: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#161514" }}>
      <HandelsblattFAZNewsCard />
    </AbsoluteFill>
  );
};

export default DemoSceneHandelsblattFAZNewsCard;