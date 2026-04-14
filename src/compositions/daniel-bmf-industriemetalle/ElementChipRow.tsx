// Phase F.6 — ElementChipRow rewritten with glass-element chips + stagger reveal
// ovl-007: "Indium / Gallium / Germanium / Rhenium / Antimon" — periodic element row
// Frame range 2001-2193 → 2078-2199 (word-sync "Industriemetalle"@69.28s)

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";

const CHIPS = [
  { symbol: "In", name: "INDIUM", atomicNo: 49, wordStart: 2134 },
  { symbol: "Ga", name: "GALLIUM", atomicNo: 31, wordStart: 2078 },
  { symbol: "Ge", name: "GERMANIUM", atomicNo: 32, wordStart: 2090 },
  { symbol: "Re", name: "RHENIUM", atomicNo: 75, wordStart: 2151 },
];

export const ElementChipRow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sequence starts at frame 2078 (absolute). Local frame 0 = abs frame 2078.
  // Compute stagger offsets from word-starts relative to Sequence start.
  const SEQ_START = 2078;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(14, 12, 8, 0.88) 0%, rgba(2, 3, 8, 0.95) 70%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 800,
            fontSize: 28,
            color: "rgba(245, 211, 122, 0.82)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Industriemetalle · Steuerfrei
        </div>

        <div style={{ display: "flex", gap: 32 }}>
          {CHIPS.map((chip, i) => {
            const localStart = chip.wordStart - SEQ_START;
            const localFrame = frame - localStart;
            if (localFrame < -2) return null;
            const entry = spring({
              frame: localFrame,
              fps,
              config: { damping: 14, stiffness: 140, mass: 0.7 },
            });
            const opacity = interpolate(entry, [0, 1], [0, 1]);
            const scale = interpolate(entry, [0, 1], [0.72, 1]);
            const translateY = interpolate(entry, [0, 1], [48, 0]);

            return (
              <div
                key={chip.symbol}
                style={{
                  width: 240,
                  height: 280,
                  background: "rgba(14, 12, 8, 0.92)",
                  backdropFilter: "blur(22px) saturate(1.2)",
                  WebkitBackdropFilter: "blur(22px) saturate(1.2)",
                  border: "1.5px solid rgba(245, 211, 122, 0.42)",
                  borderRadius: 18,
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 32px rgba(245, 211, 122, 0.15)",
                  padding: "28px 22px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  transformOrigin: "center center",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: 20,
                    color: "rgba(245, 211, 122, 0.72)",
                    alignSelf: "flex-end",
                  }}
                >
                  {chip.atomicNo}
                </div>
                <div
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 900,
                    fontSize: 104,
                    color: "#f5d37a",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    textShadow: "0 0 28px rgba(245, 211, 122, 0.5)",
                  }}
                >
                  {chip.symbol}
                </div>
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 800,
                    fontSize: 22,
                    color: "#fff5e0",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {chip.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default ElementChipRow;
