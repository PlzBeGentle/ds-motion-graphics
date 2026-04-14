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
  Easing,
  staticFile,
} from "remotion";

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
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        perspective: "2200px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 940,
          height: 680,
          marginLeft: -470,
          marginTop: -340,
          opacity,
          transform: `translateY(${translateY}px) scale(${scale}) rotateX(4deg) rotateY(-8deg)`,
          transformStyle: "preserve-3d",
          borderRadius: 10,
          overflow: "hidden",
          border: "1.5px solid rgba(245, 211, 122, 0.42)",
          boxShadow:
            "0 50px 140px rgba(0,0,0,0.82), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
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
  );
};

export default BMFDocumentCard;
