import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from "remotion";

type EuroCountry = {
  code: string;
  gridRow: number;
  gridCol: number;
  highlighted?: boolean;
};

type FlatEuropeMap3DProps = {
  title: string;
  subtitle?: string;
  highlightMarker?: {
    city: string;
    label: string;
    countryCode: string;
  };
  variant?: "fullscreen" | "overlay";
  countries?: EuroCountry[];
};

const FlatEuropeMap3D: React.FC<FlatEuropeMap3DProps> = ({
  title,
  subtitle,
  highlightMarker,
  variant = "fullscreen",
  countries: inputCountries,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const countries = inputCountries || [
    // Row 0 — North
    {code: "NO", gridRow: 0, gridCol: 5},
    {code: "SE", gridRow: 0, gridCol: 6},
    {code: "FI", gridRow: 0, gridCol: 7},
    // Row 1
    {code: "IE", gridRow: 1, gridCol: 2},
    {code: "GB", gridRow: 1, gridCol: 3},
    {code: "DK", gridRow: 1, gridCol: 5},
    {code: "EE", gridRow: 1, gridCol: 8},
    // Row 2
    {code: "NL", gridRow: 2, gridCol: 4},
    {code: "DE", gridRow: 2, gridCol: 5},
    {code: "PL", gridRow: 2, gridCol: 6},
    {code: "LV", gridRow: 2, gridCol: 8},
    {code: "LT", gridRow: 2, gridCol: 9},
    // Row 3
    {code: "BE", gridRow: 3, gridCol: 4},
    {code: "LU", gridRow: 3, gridCol: 5},
    {code: "CZ", gridRow: 3, gridCol: 6},
    {code: "SK", gridRow: 3, gridCol: 7},
    // Row 4
    {code: "FR", gridRow: 4, gridCol: 3},
    {code: "CH", gridRow: 4, gridCol: 5},
    {code: "AT", gridRow: 4, gridCol: 6},
    {code: "HU", gridRow: 4, gridCol: 7},
    {code: "RO", gridRow: 4, gridCol: 9},
    // Row 5
    {code: "ES", gridRow: 5, gridCol: 2},
    {code: "IT", gridRow: 5, gridCol: 5},
    {code: "SI", gridRow: 5, gridCol: 6},
    {code: "HR", gridRow: 5, gridCol: 7},
    {code: "BG", gridRow: 5, gridCol: 9},
    // Row 6
    {code: "PT", gridRow: 6, gridCol: 2},
    {code: "GR", gridRow: 6, gridCol: 7},
  ];

  const PANEL_WIDTH_FULLSCREEN = 1500;
  const PANEL_HEIGHT_FULLSCREEN = 820;

  const PANEL_WIDTH = variant === "fullscreen" ? PANEL_WIDTH_FULLSCREEN : PANEL_WIDTH_FULLSCREEN * 0.8;
  const PANEL_HEIGHT = variant === "fullscreen" ? PANEL_HEIGHT_FULLSCREEN : PANEL_HEIGHT_FULLSCREEN * 0.8;

  const GRID_START_X = 200;
  const GRID_START_Y = 170;
  const TILE_WIDTH = 92;
  const TILE_HEIGHT = 62;
  const TILE_GAP_X = 10;
  const TILE_GAP_Y = 10;

  const panelEntryFrame = 10;
  const panelOpacity = interpolate(frame, [panelEntryFrame, panelEntryFrame + 20], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const panelBlur = interpolate(frame, [panelEntryFrame, panelEntryFrame + 20], [10, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)",
      perspective: "1800px",
      perspectiveOrigin: "50% 50%",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        transformStyle: "preserve-3d",
        transform: "rotateX(6deg) rotateY(-10deg)",
      }}>
        <div style={{
          position: "absolute",
          width: PANEL_WIDTH,
          height: PANEL_HEIGHT,
          left: "50%",
          top: "50%",
          marginLeft: -PANEL_WIDTH / 2,
          marginTop: -PANEL_HEIGHT / 2,
          backgroundColor: "rgba(18, 16, 12, 0.72)",
          backdropFilter: "blur(24px) saturate(1.2)",
          border: "1px solid rgba(255, 200, 120, 0.22)",
          borderRadius: 20,
          boxShadow: "0 30px 90px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
          opacity: panelOpacity,
          filter: `blur(${panelBlur}px)`,
        }}>
          <div style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}>
            <h1 style={{
              margin: 0,
              fontFamily: '"Inter", -apple-system, sans-serif',
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#ffe58a",
              textShadow: "0 0 16px rgba(255, 200, 80, 0.5)",
            }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{
                margin: 0,
                fontFamily: '"Inter", -apple-system, sans-serif',
                fontSize: 20,
                fontWeight: 500,
                color: "rgba(255, 200, 120, 0.8)",
                letterSpacing: "0.04em",
              }}>
                {subtitle}
              </p>
            )}
          </div>

          {countries.map((country, i) => {
            const isHighlighted = country.highlighted || country.code === highlightMarker?.countryCode;
            const tileX = GRID_START_X + country.gridCol * (TILE_WIDTH + TILE_GAP_X);
            const tileY = GRID_START_Y + country.gridRow * (TILE_HEIGHT + TILE_GAP_Y);

            // Row-based stagger entry
            const rowDelay = 30 + country.gridRow * 6 + country.gridCol * 2;
            const tileOp = interpolate(frame, [rowDelay, rowDelay + 20], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
            const tileScale = interpolate(frame, [rowDelay, rowDelay + 20], [0.6, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)});

            // Pulse for highlighted
            const pulseFrame = Math.max(0, frame - 120);
            const pulse = isHighlighted ? 1 + Math.sin(pulseFrame / 15) * 0.08 : 1;

            return (
              <div key={i} style={{
                position: "absolute",
                left: tileX,
                top: tileY,
                width: TILE_WIDTH,
                height: TILE_HEIGHT,
                backgroundColor: isHighlighted ? "rgba(255, 176, 32, 0.22)" : "rgba(255, 255, 255, 0.05)",
                border: isHighlighted ? "2px solid rgba(255, 176, 32, 0.9)" : "1px solid rgba(255, 200, 120, 0.2)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: '"Inter", -apple-system, sans-serif',
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "0.04em",
                color: isHighlighted ? "#ffe58a" : "rgba(255, 200, 120, 0.72)",
                opacity: tileOp,
                transform: `scale(${tileScale * pulse})`,
                boxShadow: isHighlighted ? `0 0 24px rgba(255, 176, 32, ${0.4 * pulse})` : "0 2px 8px rgba(0,0,0,0.4)",
                textShadow: isHighlighted ? "0 0 12px rgba(255, 200, 80, 0.7)" : "none",
              }}>
                {country.code}
              </div>
            );
          })}

          {highlightMarker && (() => {
            const markerCountry = countries.find(c => c.code === highlightMarker.countryCode);
            if (!markerCountry) return null;
            const markerX = GRID_START_X + markerCountry.gridCol * (TILE_WIDTH + TILE_GAP_X) + TILE_WIDTH / 2;
            const markerY = GRID_START_Y + markerCountry.gridRow * (TILE_HEIGHT + TILE_GAP_Y) + TILE_HEIGHT + 50;
            const labelOp = interpolate(frame, [110, 140], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
            const labelY = interpolate(frame, [110, 140], [10, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)});
            return (
              <>
                <div style={{
                  position: "absolute",
                  left: markerX - 1,
                  top: markerY - 50,
                  width: 2,
                  height: 48,
                  background: "linear-gradient(to bottom, #ffb020, #ffb02000)",
                  opacity: labelOp,
                }} />
                <div style={{
                  position: "absolute",
                  left: markerX,
                  top: markerY,
                  transform: `translate(-50%, ${labelY}px)`,
                  padding: "12px 20px",
                  backgroundColor: "rgba(255, 176, 32, 0.18)",
                  border: "2px solid rgba(255, 176, 32, 0.8)",
                  borderRadius: 999,
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: 20,
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#ffe58a",
                  whiteSpace: "nowrap",
                  opacity: labelOp,
                  boxShadow: "0 8px 32px rgba(255, 176, 32, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                  textShadow: "0 0 14px rgba(255, 200, 80, 0.7)",
                }}>
                  ★ {highlightMarker.label}: {highlightMarker.city}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DemoSceneFlatEuropeMap3D: React.FC = () => {
  return (
    <FlatEuropeMap3D
      title="EU-LÄNDER UNTER AMLA"
      subtitle="Start 01.01.2027 · 27 Staaten + Norwegen"
      highlightMarker={{city: "BRÜSSEL", label: "AMLA HQ", countryCode: "BE"}}
      variant="fullscreen"
    />
  );
};

export default DemoSceneFlatEuropeMap3D;