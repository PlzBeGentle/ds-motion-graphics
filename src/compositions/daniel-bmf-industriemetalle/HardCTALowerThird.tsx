// Iter2.14 — HardCTALowerThird single-phase rewrite
// ovl-036: 8.5s hold (20385-20640). Word-synced to Daniel's
// "Und wer darüber hinaus konkret wissen will..." @ 679.52s (frame 20385).
// Hard cut before B-roll slot-11 @ frame 20640.
// Collapsed 3-phase animation → single clear CTA (shorter hold).

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";
import { BorderBeam } from "../../components/library/effects/BorderBeam";

export const HardCTALowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry
  const entrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120, mass: 1 },
  });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const slideY = interpolate(entrance, [0, 1], [60, 0]);
  const breathe = 1 + 0.003 * Math.sin((frame / 100) * 2 * Math.PI);

  // Arrow bounce continuous
  const arrowBounce = Math.sin((frame / 18) * 2 * Math.PI) * 6;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 780,
          width: 1800,
          opacity,
          transform: `translateY(${slideY}px) scale(${breathe})`,
          transformOrigin: "center center",
          padding: "36px 56px",
          background: "rgba(14, 10, 4, 0.94)",
          backdropFilter: "blur(24px) saturate(1.3)",
          WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          border: "2px solid rgba(245, 211, 122, 0.48)",
          borderRadius: 22,
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.82), 0 0 80px rgba(245, 211, 122, 0.28), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 32,
          overflow: "hidden",
        }}
      >
        {/* BorderBeam gold orbit */}
        <BorderBeam
          size={220}
          colorFrom="#d4a017"
          colorTo="#f5d37a"
          borderWidth={3}
          opacity={0.88}
          glowIntensity={1}
          periodInFrames={180}
          borderRadius={22}
        />

        {/* Arrow icon */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 16,
            background: "rgba(212, 160, 23, 0.22)",
            border: "3px solid #f5d37a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f5d37a",
            fontSize: 72,
            fontWeight: 900,
            transform: `translateY(${arrowBounce}px)`,
            boxShadow: "0 0 32px rgba(245, 211, 122, 0.68)",
            flexShrink: 0,
          }}
        >
          →
        </div>

        {/* Single-phase content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 72,
              color: "#f5d37a",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              textShadow: "0 0 32px rgba(245, 211, 122, 0.42)",
            }}
          >
            ERSTGESPRÄCH
          </div>
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 44,
              color: "#fff5e0",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            LINK IN DER VIDEOBESCHREIBUNG
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default HardCTALowerThird;
