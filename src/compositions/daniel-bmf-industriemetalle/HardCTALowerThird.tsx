// Phase F.9 — HardCTALowerThird rewritten with 3-phase animation + BorderBeam
// ovl-036: 23.7s hold. Phases:
//   1 (0-300f, 10s): "ERSTGESPRÄCH · LINK IN BESCHREIBUNG" primary CTA
//   2 (300-500f, ~6.7s): subtitle shift "KOSTENFREI · DIREKT VON DANIEL"
//   3 (500-710f, ~7s): arrow bounce + final CTA hold
// Range 19980-20697 → 19980-20690

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
  Easing,
} from "remotion";
import { BorderBeam } from "../../components/library/effects/BorderBeam";

const PHASE_1_END = 300;
const PHASE_2_END = 500;

export const HardCTALowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry
  const entrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 120, mass: 1 },
  });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const slideY = interpolate(entrance, [0, 1], [60, 0]);
  const breathe = 1 + 0.003 * Math.sin((frame / 100) * 2 * Math.PI);

  // Phase transitions (crossfade between the 3 subtitle states)
  const phase1Opacity = interpolate(
    frame,
    [0, 24, PHASE_1_END - 24, PHASE_1_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const phase2Opacity = interpolate(
    frame,
    [PHASE_1_END - 18, PHASE_1_END + 12, PHASE_2_END - 18, PHASE_2_END + 12],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const phase3Opacity = interpolate(
    frame,
    [PHASE_2_END - 18, PHASE_2_END + 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Arrow bounce (phase 3+)
  const arrowBounce = Math.sin((frame / 18) * 2 * Math.PI) * 8;

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
            transform: `translateY(${phase3Opacity * arrowBounce}px)`,
            boxShadow: "0 0 32px rgba(245, 211, 122, 0.68)",
            flexShrink: 0,
          }}
        >
          →
        </div>

        {/* Multi-phase content column */}
        <div style={{ flex: 1, position: "relative", minHeight: 150 }}>
          {/* Phase 1 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: phase1Opacity,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 900,
                fontSize: 64,
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
                fontSize: 48,
                color: "#fff5e0",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              LINK IN DER VIDEOBESCHREIBUNG
            </div>
          </div>

          {/* Phase 2 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: phase2Opacity,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 900,
                fontSize: 64,
                color: "#f5d37a",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              KOSTENFREI
            </div>
            <div
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 900,
                fontSize: 48,
                color: "#fff5e0",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              UNVERBINDLICH · TERMINE BEGRENZT
            </div>
          </div>

          {/* Phase 3 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: phase3Opacity,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 900,
                fontSize: 64,
                color: "#f5d37a",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              JETZT HANDELN
            </div>
            <div
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 900,
                fontSize: 48,
                color: "#fff5e0",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              BEVOR ES VORBEI IST
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default HardCTALowerThird;
