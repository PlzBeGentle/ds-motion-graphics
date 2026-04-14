import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { BMF_COLORS, BMF_FONTS, panelStyle } from "./bmf-theme";

/**
 * Slot 11 — Branchen-Icons Collage (CTA-Anker)
 *
 * Frame Range in master: 20640-20820 (6s, 180f) at 30fps
 *
 * Skript-Kontext (ts 688-694s):
 *   "Link zu dem kostenfreien Erstgespraech... wenn du einen Teil deiner
 *    Ersparnisse in krisenssichere Sachwerte investieren moechtest, die
 *    endlich sind und die in China unter schweren Exportkontrollen stehen"
 *
 * Funktion: visueller Anker "warum bleibt die Nachfrage nach diesen Metallen
 * hoch?" — 4 Branchen die sie BRAUCHEN. CTA-Setup.
 *
 * Layout: 2x2 grid, 4 gold icons (outline-style SVGs) on glass panel,
 * labels darunter. Stagger reveal 8f per icon (A3.1 rules), gold glow pulse,
 * title "DIE NACHFRAGE BLEIBT" oben.
 *
 * Brand: strict LOCOS — gold + warm-white + warm-black. No cyan/neon.
 */

type IconId = "halbleiter" | "maschinenbau" | "photovoltaik" | "medizin";

const ICON_CELLS: { id: IconId; label: string }[] = [
  { id: "halbleiter", label: "HALBLEITER" },
  { id: "maschinenbau", label: "MASCHINENBAU" },
  { id: "photovoltaik", label: "PHOTOVOLTAIK" },
  { id: "medizin", label: "MEDIZINTECHNIK" },
];

const IconSvg: React.FC<{ id: IconId; size: number }> = ({ id, size }) => {
  const color = BMF_COLORS.goldAccent;
  const strokeW = 4;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none" as const,
    stroke: color,
    strokeWidth: strokeW,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "halbleiter":
      // Chip: rounded square body + 4 pin groups on each side + inner square
      return (
        <svg {...common}>
          <rect x="22" y="22" width="56" height="56" rx="6" />
          <rect x="34" y="34" width="32" height="32" rx="2" />
          {/* left pins */}
          <line x1="10" y1="32" x2="22" y2="32" />
          <line x1="10" y1="44" x2="22" y2="44" />
          <line x1="10" y1="56" x2="22" y2="56" />
          <line x1="10" y1="68" x2="22" y2="68" />
          {/* right pins */}
          <line x1="78" y1="32" x2="90" y2="32" />
          <line x1="78" y1="44" x2="90" y2="44" />
          <line x1="78" y1="56" x2="90" y2="56" />
          <line x1="78" y1="68" x2="90" y2="68" />
          {/* top pins */}
          <line x1="32" y1="10" x2="32" y2="22" />
          <line x1="44" y1="10" x2="44" y2="22" />
          <line x1="56" y1="10" x2="56" y2="22" />
          <line x1="68" y1="10" x2="68" y2="22" />
          {/* bottom pins */}
          <line x1="32" y1="78" x2="32" y2="90" />
          <line x1="44" y1="78" x2="44" y2="90" />
          <line x1="56" y1="78" x2="56" y2="90" />
          <line x1="68" y1="78" x2="68" y2="90" />
        </svg>
      );
    case "maschinenbau":
      // Gear: outer teeth via rotated rects + inner circle
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="8" />
          {/* 8 teeth as short lines radiating out */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x1 = 50 + Math.cos(angle) * 26;
            const y1 = 50 + Math.sin(angle) * 26;
            const x2 = 50 + Math.cos(angle) * 36;
            const y2 = 50 + Math.sin(angle) * 36;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </svg>
      );
    case "photovoltaik":
      // Solar panel: rectangle with diagonal grid lines + sun above
      return (
        <svg {...common}>
          {/* Sun */}
          <circle cx="50" cy="22" r="8" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x1 = 50 + Math.cos(angle) * 12;
            const y1 = 22 + Math.sin(angle) * 12;
            const x2 = 50 + Math.cos(angle) * 17;
            const y2 = 22 + Math.sin(angle) * 17;
            return <line key={`r${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
          {/* Panel body (tilted) */}
          <path d="M 18 88 L 28 48 L 82 48 L 72 88 Z" />
          {/* Grid lines */}
          <line x1="24" y1="68" x2="77" y2="68" />
          <line x1="40" y1="48" x2="36" y2="88" />
          <line x1="55" y1="48" x2="55" y2="88" />
          <line x1="70" y1="48" x2="74" y2="88" />
        </svg>
      );
    case "medizin":
      // Medical cross + pulse line underneath
      return (
        <svg {...common}>
          <circle cx="50" cy="42" r="26" />
          {/* Plus cross inside */}
          <line x1="50" y1="28" x2="50" y2="56" />
          <line x1="36" y1="42" x2="64" y2="42" />
          {/* Pulse line under */}
          <path d="M 14 80 L 32 80 L 38 68 L 46 92 L 54 72 L 62 80 L 86 80" />
        </svg>
      );
  }
};

export const BmfBRoll11IconsCollage: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Panel entry (0-20f), hold, exit (last 20f)
  const panelOpacity = interpolate(
    frame,
    [0, 14, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const panelY = interpolate(frame, [0, 18], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title entry 6-22f
  const titleOpacity = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [6, 22], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Icon stagger: first icon at 18f, then 8f interval each
  const iconStart = 18;
  const iconStagger = 8;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: panelOpacity,
      }}
    >
      <div
        style={{
          ...panelStyle({ radius: 18 }),
          width: 1280,
          padding: "60px 72px 72px",
          transform: `translateY(${panelY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              fontFamily: BMF_FONTS.display,
              fontWeight: 900,
              fontSize: 56,
              letterSpacing: "0.04em",
              color: BMF_COLORS.warmWhite,
              textTransform: "uppercase",
              lineHeight: 1.0,
            }}
          >
            DIE NACHFRAGE BLEIBT
          </div>
          <div
            style={{
              fontFamily: BMF_FONTS.display,
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "0.22em",
              color: BMF_COLORS.goldHighlight,
              textTransform: "uppercase",
            }}
          >
            4 BRANCHEN · BRAUCHEN DIE METALLE · JEDEN TAG
          </div>
        </div>

        {/* 2x2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 28,
            width: "100%",
          }}
        >
          {ICON_CELLS.map((cell, i) => {
            const cellStart = iconStart + i * iconStagger;
            const cellProgress = spring({
              frame: frame - cellStart,
              fps,
              config: { damping: 14, stiffness: 140, mass: 0.7 },
            });
            const cellExitOpacity = interpolate(
              frame,
              [durationInFrames - 20, durationInFrames - 8],
              [1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            const cellOpacity = Math.min(cellProgress, cellExitOpacity);
            const cellScale = 0.88 + cellProgress * 0.12;

            // Subtle gold pulse on icon after entry
            const pulseFrame = Math.max(0, frame - cellStart - 14);
            const pulse = 0.85 + 0.15 * Math.sin(pulseFrame * 0.12 + i * 0.5);

            return (
              <div
                key={cell.id}
                style={{
                  background: "rgba(22,21,20,0.70)",
                  border: `1.5px solid ${BMF_COLORS.goldBorder}`,
                  borderRadius: 12,
                  padding: "36px 24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  opacity: cellOpacity,
                  transform: `scale(${cellScale})`,
                  transformOrigin: "center center",
                }}
              >
                <div
                  style={{
                    filter: `drop-shadow(0 0 ${8 + pulse * 12}px rgba(212,160,23,${0.25 + pulse * 0.25}))`,
                  }}
                >
                  <IconSvg id={cell.id} size={120} />
                </div>
                <div
                  style={{
                    fontFamily: BMF_FONTS.display,
                    fontWeight: 800,
                    fontSize: 26,
                    letterSpacing: "0.14em",
                    color: BMF_COLORS.warmWhite,
                    textTransform: "uppercase",
                  }}
                >
                  {cell.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default BmfBRoll11IconsCollage;
