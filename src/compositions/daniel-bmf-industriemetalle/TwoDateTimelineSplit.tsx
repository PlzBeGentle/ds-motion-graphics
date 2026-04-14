// Iter2.4 — TwoDateTimelineSplit simple 2-dot side card (was HistoricalTimeline3D)
// Feedback Bild 6: dolly-animation macht bei 2 Datenpunkten keinen Sinn + Fullscreen unnötig
// ovl-025: "9. April 2026" ↔ "4. Februar 2025" — 2 trigger moments

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
  Easing,
} from "remotion";

export const TwoDateTimelineSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });
  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const slideY = interpolate(entry, [0, 1], [30, 0]);

  // Node 1 (2025) reveal
  const node1 = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  // Line draw
  const lineProgress = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  // Node 2 (2026) reveal
  const node2 = interpolate(frame, [44, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const NODES = [
    {
      date: "4. FEBRUAR 2025",
      label: "China verschärft Rare-Earths",
      color: "#E30613",
      progress: node1,
    },
    {
      date: "9. APRIL 2026",
      label: "BMF-Schreiben · Kobalt nicht mehr steuerfrei",
      color: "#f5d37a",
      progress: node2,
    },
  ];

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 1080,
          top: 240,
          width: 820,
          opacity,
          transform: `translateY(${slideY}px) rotateY(-4deg)`,
          transformOrigin: "left center",
          padding: "40px 48px",
          background: "rgba(14, 12, 8, 0.94)",
          backdropFilter: "blur(22px) saturate(1.2)",
          WebkitBackdropFilter: "blur(22px) saturate(1.2)",
          border: "1.5px solid rgba(245, 211, 122, 0.42)",
          borderRadius: 14,
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 800,
            fontSize: 18,
            color: "rgba(245, 211, 122, 0.82)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          Zwei Daten · Ein Muster
        </div>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            marginTop: 18,
            paddingLeft: 44,
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 17,
              top: 12,
              width: 3,
              height: `${lineProgress * 210}px`,
              background: "linear-gradient(180deg, #E30613, #f5d37a)",
              boxShadow: "0 0 10px rgba(245, 211, 122, 0.5)",
            }}
          />

          {NODES.map((node, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                marginBottom: i === 0 ? 44 : 0,
                opacity: node.progress,
                transform: `translateX(${(1 - node.progress) * -16}px)`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  background: node.color,
                  border: "3px solid #0a0806",
                  boxShadow: `0 0 18px ${node.color}`,
                  flexShrink: 0,
                }}
              />
              <div style={{ marginLeft: 56 }}>
                <div
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 900,
                    fontSize: 42,
                    color: node.color,
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                  }}
                >
                  {node.date}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: 20,
                    color: "rgba(255, 245, 224, 0.82)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {node.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default TwoDateTimelineSplit;
