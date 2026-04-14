import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { BMF_COLORS, BMF_FONTS, seqLifecycle } from "./bmf-theme";

interface Dot {
  date: string;
  label: string;
}

interface Props {
  dots?: Dot[];
  x?: number;
  y?: number;
  w?: number;
}

const DEFAULT_DOTS: Dot[] = [
  { date: "AUG 23", label: "GALLIUM · GERMANIUM" },
  { date: "DEZ 23", label: "GRAPHIT" },
  { date: "SEP 24", label: "ANTIMON +437%" },
  { date: "APR 25", label: "+7 SELTENE ERDEN" },
];

/**
 * HorizontalChronologyTimeline (ovl-028) — 4-dot horizontal timeline.
 * Draw-line animation + stagger dots with metal chip labels.
 */
export const HorizontalChronologyTimeline: React.FC<Props> = ({
  dots = DEFAULT_DOTS,
  x = 80,
  y = 700,
  w = 1760,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = seqLifecycle(frame, durationInFrames, 14, 14);

  const lineProgress = interpolate(frame, [4, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: 320,
          opacity,
          background: "rgba(26,26,34,0.82)",
          border: `1.5px solid ${BMF_COLORS.goldBorder}`,
          borderRadius: 8,
          backdropFilter: "blur(18px)",
          padding: "48px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", height: 140 }}>
          {/* Horizontal line */}
          <div
            style={{
              position: "absolute",
              left: 30,
              right: 30,
              top: "50%",
              height: 3,
              background: BMF_COLORS.goldAccent,
              transform: `translateY(-50%) scaleX(${lineProgress})`,
              transformOrigin: "left center",
            }}
          />
          {/* Dots */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            {dots.map((d, i) => {
              const dotStart = 12 + i * 6;
              const dotProgress = interpolate(
                frame,
                [dotStart, dotStart + 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    opacity: dotProgress,
                    transform: `scale(${dotProgress})`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: BMF_FONTS.sans,
                      fontWeight: 900,
                      fontSize: 28,
                      color: BMF_COLORS.warmWhite,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {d.date}
                  </div>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      background: BMF_COLORS.goldAccent,
                      boxShadow: `0 0 20px ${BMF_COLORS.goldAccent}`,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: BMF_FONTS.sans,
                      fontWeight: 700,
                      fontSize: 18,
                      color: BMF_COLORS.warmWhiteSoft,
                      letterSpacing: "0.12em",
                      textAlign: "center",
                      maxWidth: 220,
                    }}
                  >
                    {d.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default HorizontalChronologyTimeline;
