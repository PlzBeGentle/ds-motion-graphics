import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from "remotion";

type HighlightedWordProps = {
  word: string;
  variant?: "underline" | "circle" | "both";
  position?: "center" | "lower-third" | "upper-third";
  scale?: number;
};

const HighlightedWord: React.FC<HighlightedWordProps> = ({
  word,
  variant = "underline",
  position = "center",
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const POSITIONS = {
    "center": {top: "50%", left: "50%", transform: "translate(-50%, -50%)"},
    "lower-third": {top: "72%", left: "50%", transform: "translate(-50%, -50%)"},
    "upper-third": {top: "28%", left: "50%", transform: "translate(-50%, -50%)"},
  };

  const FONT_SIZE = 96 * scale;

  // Background pulse
  const bgSpring = spring({frame: frame - 20, fps, config: {damping: 12, stiffness: 120, mass: 0.8}});
  const bgOpacity = interpolate(bgSpring, [0, 1], [0, 1]);
  const bgScale = interpolate(bgSpring, [0, 0.5, 1], [0.8, 1.1, 1]);

  // Underline
  const underlineProgress = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Circle
  const circleCircumference = 2 * Math.PI * 200;
  const circleProgress = interpolate(frame, [30, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Glow pulse (continuous)
  const pulseFrame = Math.max(0, frame - 60);
  const glowPulse = 1 + Math.sin(pulseFrame / 18) * 0.2;

  return (
    <div style={{
      position: "absolute",
      ...POSITIONS[position],
      display: "inline-block",
      padding: "24px 48px",
    }}>
      {/* Background pulse rectangle */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(255, 176, 32, 0.12)",
        borderRadius: 12,
        transformOrigin: "center center",
        transform: `scale(${bgScale})`,
        opacity: bgOpacity,
        boxShadow: `0 0 40px rgba(255, 176, 32, ${0.3 * bgOpacity})`,
      }} />

      {/* SVG circle overlay (if variant=circle or both) */}
      {(variant === "circle" || variant === "both") && (
        <svg
          style={{
            position: "absolute",
            inset: -20,
            width: "calc(100% + 40px)",
            height: "calc(100% + 40px)",
            pointerEvents: "none",
          }}
        >
          <ellipse
            cx="50%"
            cy="50%"
            rx="48%"
            ry="44%"
            fill="none"
            stroke="#ffb020"
            strokeWidth={3}
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference * (1 - circleProgress)}
            style={{filter: "drop-shadow(0 0 8px rgba(255, 176, 32, 0.7))"}}
            transform="rotate(-10 960 540)"
          />
        </svg>
      )}

      {/* Text with letter-stagger */}
      <div style={{
        position: "relative",
        fontFamily: '"Inter", -apple-system, sans-serif',
        fontSize: FONT_SIZE,
        fontWeight: 900,
        letterSpacing: "0.02em",
        color: "#ffe58a",
        textShadow: `0 0 ${30 * glowPulse}px rgba(255, 200, 80, 0.85), 0 0 ${60 * glowPulse}px rgba(255, 176, 32, 0.5), 0 6px 20px rgba(0, 0, 0, 0.8)`,
        display: "flex",
      }}>
        {word.split("").map((ch, i) => {
          const charFrame = frame - i * 2;
          const charOp = interpolate(charFrame, [0, 14], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
          const charY = interpolate(charFrame, [0, 14], [14, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)});
          return (
            <span key={i} style={{display: "inline-block", opacity: charOp, transform: `translateY(${charY}px)`, whiteSpace: "pre"}}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          );
        })}
      </div>

      {/* Underline (if variant=underline or both) */}
      {(variant === "underline" || variant === "both") && (
        <div style={{
          position: "absolute",
          bottom: 14,
          left: 48,
          right: 48,
          height: 6,
          backgroundColor: "#ffb020",
          borderRadius: 3,
          transformOrigin: "left center",
          transform: `scaleX(${underlineProgress})`,
          boxShadow: "0 0 16px rgba(255, 176, 32, 0.85)",
        }} />
      )}
    </div>
  );
};

export const DemoSceneHighlightedWord: React.FC = () => {
  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)",
    }}>
      <HighlightedWord
        word="MELDEPFLICHT"
        variant="both"
        position="center"
        scale={1}
      />
    </AbsoluteFill>
  );
};

export default DemoSceneHighlightedWord;