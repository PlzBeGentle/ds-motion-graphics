// LOCOS Brand Theme — BMF-Industriemetalle video
// Strictly enforced per ~/knowledge/atoms/video/color/locos-brand-color-language.md

export const BMF_COLORS = {
  goldPrimary: "#A68B2C",
  goldLight: "#C8A84C",
  goldAccent: "#d4a017",
  goldHighlight: "#f5d37a",
  warmBlack: "#161514",
  darkBg: "#1A1A22",
  panelBg: "rgba(26,26,34,0.85)",
  panelBgSoft: "rgba(26,26,34,0.70)",
  goldBorder: "rgba(212,160,23,0.35)",
  redAccent: "#E30613",
  redNegative: "#FF4444",
  greenPositive: "#00C62E",
  warmWhite: "#FFF5E0",
  warmWhiteSoft: "rgba(255,245,224,0.85)",
  warmWhiteDim: "rgba(255,245,224,0.62)",
  paperWhite: "#F3ECDD",
  paperSepia: "#E8DEC5",
} as const;

export const BMF_FONTS = {
  sans: "Inter, -apple-system, system-ui, sans-serif",
  display: "Montserrat, Inter, sans-serif",
  serif: "'Playfair Display', Georgia, serif",
  mono: "Orbitron, 'IBM Plex Mono', monospace",
} as const;

// Standard spring presets (per B-motion-graphics rules)
export const BMF_SPRINGS = {
  snappy: { damping: 12, stiffness: 200, mass: 0.5 },
  standard: { damping: 16, stiffness: 140, mass: 0.7 },
  smooth: { damping: 18, stiffness: 100, mass: 0.9 },
  heavy: { damping: 20, stiffness: 70, mass: 1.0, overshootClamping: true },
} as const;

// Face-safe-zone (per daniel-talking-head-layout.md)
export const FACE_SAFE = { xMin: 760, xMax: 1160, yMin: 80, yMax: 560 };

// Common panel style
export const panelStyle = (opts?: {
  accent?: string;
  borderLeftOnly?: boolean;
  radius?: number;
}): React.CSSProperties => {
  const accent = opts?.accent ?? BMF_COLORS.goldAccent;
  const radius = opts?.radius ?? 8;
  if (opts?.borderLeftOnly) {
    return {
      background: BMF_COLORS.panelBg,
      borderLeft: `4px solid ${accent}`,
      borderRadius: radius,
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
    };
  }
  return {
    background: BMF_COLORS.panelBg,
    border: `1.5px solid ${BMF_COLORS.goldBorder}`,
    borderRadius: radius,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  };
};

// Standard entrance/exit helper — returns opacity 0-1 across a Sequence lifecycle
export function seqLifecycle(
  frame: number,
  durationInFrames: number,
  inFrames = 14,
  outFrames = 12
) {
  if (frame < 0) return 0;
  if (frame < inFrames) return frame / inFrames;
  if (frame > durationInFrames - outFrames) {
    return Math.max(0, (durationInFrames - frame) / outFrames);
  }
  return 1;
}
