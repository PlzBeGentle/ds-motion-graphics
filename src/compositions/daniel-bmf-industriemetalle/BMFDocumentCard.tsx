// Iter2.3 — BMFDocumentCard simplified to ONLY show the screenshot
// Feedback Bild 1: "hier sollte nur der screenshot rein" — no text overlay,
// just the mbf-schreiben-titelseite.png as a centered document with subtle
// KenBurns + tilted panel framing.
// ovl-002: BMF-Schreiben Reveal — 653-856

import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
  staticFile,
} from "remotion";
import { MovingGridBG } from "./MovingGridBG";

export const BMFDocumentCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const scale = interpolate(entry, [0, 1], [0.88, 1]);
  const translateY = interpolate(entry, [0, 1], [40, 0]);

  // Slow KenBurns drift over the 200+ frame lifetime
  const kbScale = interpolate(frame, [0, 203], [1.0, 1.06]);
  const kbDriftY = interpolate(frame, [0, 203], [0, -14]);

  return (
    <AbsoluteFill>
      {/* Moving grid BG (Iter2.6 fullscreen centered treatment) */}
      <AbsoluteFill style={{ opacity }}>
        <MovingGridBG
          gridColor="rgba(245, 211, 122, 0.10)"
          accentColor="rgba(245, 211, 122, 0.16)"
        />
      </AbsoluteFill>

      {/* Centered screenshot (no tilt — straight-on, bigger) */}
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
            width: 1100,
            height: 820,
            opacity,
            transform: `translateY(${translateY}px) scale(${scale})`,
            borderRadius: 12,
            overflow: "hidden",
            border: "2px solid rgba(245, 211, 122, 0.55)",
            boxShadow:
              "0 60px 160px rgba(0,0,0,0.88), 0 0 100px rgba(245, 211, 122, 0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
          }}
        >
          <Img
            src={staticFile("assets/mbf-schreiben-titelseite.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${kbScale}) translateY(${kbDriftY}px)`,
              transformOrigin: "center 30%",
              filter: "brightness(1.02) contrast(1.06)",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default BMFDocumentCard;
