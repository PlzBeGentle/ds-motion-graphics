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
import { MovingGridBG } from "./MovingGridBG";

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
    <AbsoluteFill>
      {/* Moving grid BG (Iter2.6) */}
      <AbsoluteFill style={{ opacity: panelOpacity }}>
        <MovingGridBG
          gridColor="rgba(245, 211, 122, 0.10)"
          accentColor="rgba(245, 211, 122, 0.16)"
        />
      </AbsoluteFill>

      {/* Centered straight-on passage image, no tilt */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1420,
          height: 880,
          marginLeft: -710,
          marginTop: -440,
          opacity: panelOpacity,
          transform: `scale(${panelScale})`,
          background: "#fbf6e8",
          border: "2px solid rgba(245, 211, 122, 0.55)",
          borderRadius: 12,
          boxShadow:
            "0 60px 160px rgba(0, 0, 0, 0.88), 0 0 100px rgba(245, 211, 122, 0.22), inset 0 1px 0 rgba(255,255,255,0.8)",
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("assets/bmf-schreiben-passsage.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            background: "#fbf6e8",
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
