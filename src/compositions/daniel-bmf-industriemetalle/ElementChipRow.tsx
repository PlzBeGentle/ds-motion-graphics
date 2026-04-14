import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, BMF_SPRINGS, seqLifecycle } from "./bmf-theme";

const CHIPS = [
  { symbol: "In", name: "INDIUM", atomic_no: 49 },
  { symbol: "Ga", name: "GALLIUM", atomic_no: 31 },
  { symbol: "Ge", name: "GERMANIUM", atomic_no: 32 },
];

/**
 * ElementChipRow (ovl-007) — periodic-element 3-chip grid.
 * Symbol + name + atomic number, stagger scale-pop entry.
 */
export const ElementChipRow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 14, 12);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 1220,
          top: 200,
          width: 620,
          opacity,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {CHIPS.map((c, i) => {
          const pop = spring({
            frame: frame - i * 4 - 4,
            fps,
            config: BMF_SPRINGS.snappy,
          });
          const scale = interpolate(pop, [0, 1], [0.7, 1]);
          const chipOpacity = interpolate(pop, [0, 1], [0, 1]);
          return (
            <div
              key={c.symbol}
              style={{
                opacity: chipOpacity,
                transform: `scale(${scale})`,
                transformOrigin: "left center",
                background: BMF_COLORS.panelBg,
                border: `1.5px solid ${BMF_COLORS.goldBorder}`,
                borderRadius: 8,
                backdropFilter: "blur(18px)",
                padding: "24px 32px",
                display: "flex",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div
                style={{
                  fontFamily: BMF_FONTS.sans,
                  fontWeight: 900,
                  fontSize: 96,
                  color: BMF_COLORS.goldAccent,
                  lineHeight: 1,
                  minWidth: 140,
                }}
              >
                {c.symbol}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div
                  style={{
                    fontFamily: BMF_FONTS.sans,
                    fontWeight: 700,
                    fontSize: 22,
                    color: BMF_COLORS.warmWhiteSoft,
                    letterSpacing: "0.14em",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontFamily: BMF_FONTS.mono,
                    fontWeight: 700,
                    fontSize: 16,
                    color: "rgba(212,160,23,0.7)",
                    letterSpacing: "0.1em",
                  }}
                >
                  N° {c.atomic_no}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default ElementChipRow;
