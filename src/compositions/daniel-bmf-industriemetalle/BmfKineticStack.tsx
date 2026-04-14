// Phase F.2 — BMF Kinetic Stack
// Renders stacked kinetic word lines with per-word entry delays (word-sync via
// absolute start-frame relative to the parent Sequence). Replaces the old
// KineticMoment.tsx component usage across all 11 BMF kinetic moments.

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export type BmfKineticWord = {
  text: string;
  // Frame offset from the parent Sequence start when this word first enters.
  startFrame: number;
  // End frame offset (optional — for per-word unmount timing). Defaults to Sequence end.
  endFrame?: number;
  color?: string;
  size?: number;
  // Accent treatment: "plain" (text only), "circle" (red oval stroke), "underline"
  // (gold underline), "both" (circle + underline).
  variant?: "plain" | "circle" | "underline" | "both";
  accentColor?: string;
  // Visual emphasis reveal: "scale" (spring pop), "blur" (blur-in + fade),
  // "track" (letter-spacing tracking from wide to tight).
  reveal?: "scale" | "blur" | "track";
};

export type BmfKineticStackProps = {
  words: BmfKineticWord[];
  position?: "center" | "lower-third" | "upper-third";
  // Optional prefix shown above the main stack, e.g. "#1" counter scramble.
  counter?: {
    text: string;
    startFrame: number;
    color?: string;
    size?: number;
  };
};

const FONT_STACK = '"Montserrat", "Inter", -apple-system, sans-serif';

const POSITION_TOP: Record<"center" | "lower-third" | "upper-third", string> = {
  center: "50%",
  "lower-third": "66%",
  "upper-third": "32%",
};

export const BmfKineticStack: React.FC<BmfKineticStackProps> = ({
  words,
  position = "center",
  counter,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerTop = POSITION_TOP[position];

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: containerTop,
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          minWidth: 600,
        }}
      >
        {counter && <KineticCounter frame={frame} counter={counter} />}
        {words.map((word, i) => (
          <KineticWordLine
            key={i}
            frame={frame}
            fps={fps}
            word={word}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const KineticCounter: React.FC<{
  frame: number;
  counter: NonNullable<BmfKineticStackProps["counter"]>;
}> = ({ frame, counter }) => {
  const localFrame = frame - counter.startFrame;
  const opacity = interpolate(localFrame, [0, 8, 16, 28], [0, 1, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Encrypted-style scramble: cycle through chars 0..4 for first 8 frames
  const SCRAMBLE_CHARS = "01#NX!@*".split("");
  const scramblePhase = localFrame < 12;
  let displayText = counter.text;
  if (scramblePhase && localFrame >= 0) {
    displayText = counter.text
      .split("")
      .map((c, idx) => {
        if (c === " " || c === "/" || c === ".") return c;
        const revealAt = idx * 2;
        if (localFrame < revealAt) {
          return SCRAMBLE_CHARS[(localFrame + idx) % SCRAMBLE_CHARS.length];
        }
        return c;
      })
      .join("");
  }
  if (localFrame < 0) return null;
  return (
    <div
      style={{
        fontFamily: FONT_STACK,
        fontWeight: 900,
        fontSize: counter.size ?? 68,
        color: counter.color ?? "#f5d37a",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        opacity,
        lineHeight: 1,
        textShadow: "0 0 24px rgba(245, 211, 122, 0.5), 0 4px 16px rgba(0,0,0,0.72)",
        marginBottom: 8,
      }}
    >
      {displayText}
    </div>
  );
};

const KineticWordLine: React.FC<{
  frame: number;
  fps: number;
  word: BmfKineticWord;
}> = ({ frame, fps, word }) => {
  const localFrame = frame - word.startFrame;
  if (localFrame < -4) return null;

  const reveal = word.reveal ?? "scale";
  const size = word.size ?? 84;
  const color = word.color ?? "#fff5e0";
  const isCircle = word.variant === "circle" || word.variant === "both";
  const isUnderline = word.variant === "underline" || word.variant === "both";
  const accent = word.accentColor ?? (isCircle ? "#E30613" : "#f5d37a");

  // Entry animation
  const entrySpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.7 },
  });

  let opacity = 0;
  let scale = 1;
  let blur = 0;
  let letterSpacing = "0.02em";
  let translateY = 0;

  if (reveal === "scale") {
    opacity = interpolate(entrySpring, [0, 1], [0, 1]);
    scale = interpolate(entrySpring, [0, 1], [0.72, 1]);
    blur = interpolate(entrySpring, [0, 1], [8, 0]);
  } else if (reveal === "blur") {
    opacity = interpolate(localFrame, [0, 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    blur = interpolate(localFrame, [0, 22], [14, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    scale = interpolate(localFrame, [0, 22], [0.94, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (reveal === "track") {
    opacity = interpolate(localFrame, [0, 14], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const trackAmt = interpolate(localFrame, [0, 28], [0.18, 0.02], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    letterSpacing = `${trackAmt}em`;
    translateY = interpolate(localFrame, [0, 18], [14, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  // Underline draw
  const underlineProgress = interpolate(localFrame, [12, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Circle draw
  const circleProgress = interpolate(localFrame, [14, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "relative",
        fontFamily: FONT_STACK,
        fontWeight: 900,
        fontSize: size,
        color,
        letterSpacing,
        textTransform: "uppercase",
        lineHeight: 1,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
        textShadow: isCircle
          ? `0 0 32px ${accent}cc, 0 6px 24px rgba(0,0,0,0.78)`
          : "0 4px 22px rgba(0,0,0,0.78), 0 0 40px rgba(245, 211, 122, 0.18)",
        padding: isCircle ? "6px 28px" : 0,
        whiteSpace: "nowrap",
      }}
    >
      {word.text}

      {isUnderline && (
        <div
          style={{
            position: "absolute",
            left: "2%",
            right: "2%",
            bottom: -8,
            height: size > 80 ? 8 : 6,
            background: accent,
            transformOrigin: "left center",
            transform: `scaleX(${underlineProgress})`,
            boxShadow: `0 0 18px ${accent}aa`,
          }}
        />
      )}

      {isCircle && (
        <svg
          style={{
            position: "absolute",
            top: -18,
            left: -28,
            width: "calc(100% + 56px)",
            height: "calc(100% + 36px)",
            pointerEvents: "none",
            overflow: "visible",
          }}
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <ellipse
            cx="100"
            cy="50"
            rx="94"
            ry="42"
            fill="none"
            stroke={accent}
            strokeWidth={3.2}
            strokeDasharray={500}
            strokeDashoffset={500 * (1 - circleProgress)}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 8px ${accent}cc)`,
              transform: "rotate(-4deg)",
              transformOrigin: "center",
            }}
          />
        </svg>
      )}
    </div>
  );
};

export default BmfKineticStack;
