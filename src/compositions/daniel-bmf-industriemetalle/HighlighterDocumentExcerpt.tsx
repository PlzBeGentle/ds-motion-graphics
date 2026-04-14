// Phase F.1 — HighlighterDocumentExcerpt rewritten as image-direct display
// ovl-018: Dario's pre-highlighted bmf-schreiben-passsage.png with 3D panel framing
// and slow push-in animation. No re-render needed because the PNG is already marked.

import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
} from "remotion";

export const HighlighterDocumentExcerpt: React.FC = () => {
  const frame = useCurrentFrame();

  const panelOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panelScale = interpolate(frame, [0, 32], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Slow push-in on the highlighted passage across the full overlay duration
  const imageZoom = interpolate(frame, [0, 485], [1.0, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imageDriftY = interpolate(frame, [0, 485], [0, -12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)",
        perspective: "2000px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1360,
          height: 860,
          marginLeft: -680,
          marginTop: -430,
          opacity: panelOpacity,
          transform: `translateZ(0) scale(${panelScale}) rotateX(3deg) rotateY(-10deg)`,
          transformStyle: "preserve-3d",
          background: "#fbf6e8",
          border: "1px solid rgba(212, 160, 23, 0.34)",
          borderRadius: 8,
          boxShadow:
            "0 40px 120px rgba(0, 0, 0, 0.78), " +
            "0 15px 50px rgba(0,0,0,0.5), " +
            "inset 0 1px 0 rgba(255,255,255,0.8)",
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("assets/bmf-schreiben-passsage.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imageZoom}) translateY(${imageDriftY}px)`,
            transformOrigin: "center 40%",
          }}
        />
      </div>

      {/* Source watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: 20,
          color: "rgba(255, 200, 120, 0.72)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          opacity: panelOpacity,
        }}
      >
        BMF-Schreiben · 9. April 2026 · Seite 5
      </div>
    </AbsoluteFill>
  );
};

export default HighlighterDocumentExcerpt;
