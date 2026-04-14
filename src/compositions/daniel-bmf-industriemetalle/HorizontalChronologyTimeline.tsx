// Iter2.4 — HorizontalChronologyTimeline bottom-bar transparent overlay
// Feedback Bild 8: nicht fullscreen, unten platziert, transparenter BG,
// goldene Linie muss bis zum Ende durchgehen, langsamer.
// ovl-028: China export chronology (Aug23 → Okt25), 5 events

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  useVideoConfig,
  Easing,
} from "remotion";

const EVENTS = [
  { label: "AUG 23", desc: "Gallium · Germanium", color: "#f5d37a" },
  { label: "DEZ 23", desc: "Graphit", color: "#f5d37a" },
  { label: "SEP 24", desc: "Antimon", color: "#f5d37a" },
  { label: "APR 25", desc: "Seltene Erden", color: "#E30613" },
  { label: "OKT 25", desc: "EU Krisendialog", color: "#E30613" },
];

export const HorizontalChronologyTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Container entry + early exit fade (Iter2.6: don't linger on last frame,
  // start fading 150f before end so Dario doesn't feel the dead pause)
  const fadeOutStart = Math.max(60, durationInFrames - 150);
  const opacity = interpolate(
    frame,
    [0, 24, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const slideY = interpolate(frame, [0, 24], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Gold line grows to FULL width; finish well before the exit fade
  // (duration ~1160 @ new ovl-028 range, line full by ~frame 960)
  const lineProgress = interpolate(
    frame,
    [30, Math.max(60, durationInFrames - 200)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    },
  );

  // Header + event reveals staggered across the duration (slower than before)
  const headerOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stagger events: distributed across the full lineProgress window
  // Each event reveals when lineProgress reaches its position
  const EVENT_SPACING = 1 / (EVENTS.length - 1); // 0.25

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Bottom-placed overlay, transparent BG, no fullscreen dim */}
      {/* Iter2.7: bottom moved lower (60 → 20) so it doesn't clash with
          ovl-027 PriceExplosionBars chart cards above */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 20,
          height: 180,
          opacity,
          transform: `translateY(${slideY}px)`,
          padding: "0 100px",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            gap: 20,
            marginBottom: 24,
            opacity: headerOpacity,
          }}
        >
          <div
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 40,
              color: "#fff5e0",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textShadow: "0 4px 20px rgba(0,0,0,0.9)",
            }}
          >
            CHINA EXPORT-KONTROLLEN
          </div>
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: 22,
              color: "rgba(245, 211, 122, 0.82)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textShadow: "0 2px 12px rgba(0,0,0,0.9)",
            }}
          >
            DIE KETTE · 2023-2025
          </div>
        </div>

        {/* Timeline bar */}
        <div style={{ position: "relative", height: 120 }}>
          {/* Gold line — Iter2.10: narrower track (12-88) matches node positions */}
          <div
            style={{
              position: "absolute",
              left: "12%",
              right: "12%",
              top: 48,
              height: 4,
              background: "rgba(245, 211, 122, 0.16)",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "12%",
              width: `${lineProgress * 76}%`,
              top: 48,
              height: 4,
              background: "linear-gradient(90deg, #d4a017, #f5d37a, #E30613)",
              boxShadow: "0 0 20px rgba(245, 211, 122, 0.78)",
              borderRadius: 2,
            }}
          />

          {/* Event nodes — reveal as the gold line passes their position.
              Iter2.10: clamp to [max(0, p-0.05), min(1, p+0.01)] so the 5th
              node at p=1.0 reaches full opacity when lineProgress=1.0. */}
          {EVENTS.map((evt, i) => {
            const progressAtNode = i * EVENT_SPACING;
            const revealStart = Math.max(0, progressAtNode - 0.05);
            const revealEnd = Math.min(1, progressAtNode + 0.01);
            const nodeReveal = interpolate(
              lineProgress,
              [revealStart, revealEnd],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            // Iter2.10: narrower track (9-91 → 12-88) so the last node
            // (at p=1.0) stays inside the container, not clipped at the edge.
            const leftPercent = 12 + progressAtNode * 76;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${leftPercent}%`,
                  top: 0,
                  transform: `translateX(-50%) scale(${nodeReveal})`,
                  opacity: nodeReveal,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 900,
                    fontSize: 26,
                    color: evt.color,
                    letterSpacing: "0.02em",
                    textShadow: `0 0 18px ${evt.color}, 0 2px 12px rgba(0,0,0,0.9)`,
                  }}
                >
                  {evt.label}
                </div>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    background: evt.color,
                    border: "3px solid rgba(8, 6, 4, 0.9)",
                    boxShadow: `0 0 16px ${evt.color}`,
                  }}
                />
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: 16,
                    color: "rgba(255, 245, 224, 0.88)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                  }}
                >
                  {evt.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default HorizontalChronologyTimeline;
