import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from "remotion";

type Safe3DProps = {
  revealText?: string;
  revealColor?: string;
  title?: string;
  subtitle?: string;
};

const SAFE_WIDTH = 600;
const SAFE_HEIGHT = 640;
const DOOR_INSET = 30;
const DOOR_WIDTH = SAFE_WIDTH - DOOR_INSET * 2;
const DOOR_HEIGHT = SAFE_HEIGHT - DOOR_INSET * 2;

const Safe3D: React.FC<Safe3DProps> = ({
  revealText,
  revealColor = "#ff4540",
  title = "Dein Geld ist nicht sicher",
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Phase A — Safe Entry (Frame 0-28)
  const entryProgress = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const safeScale = interpolate(entryProgress, [0, 1], [0.85, 1]);
  const safeOpacity = interpolate(entryProgress, [0, 0.3, 1], [0, 0.7, 1]);
  const safeBlur = interpolate(entryProgress, [0, 15], [2, 0], {
    extrapolateRight: "clamp",
  });

  // Phase C — Door Opens (Frame 55-110)
  const doorOpenProgress = interpolate(frame, [55, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const doorRotation = interpolate(doorOpenProgress, [0, 1], [0, -110]);
  const wheelRotation = interpolate(doorOpenProgress, [0, 1], [0, 540]);

  // Phase D — Reveal Content (Frame 100-150)
  const revealFrame = Math.max(0, frame - 100);
  const revealSpring = spring({
    frame: revealFrame,
    fps,
    config: {damping: 10, stiffness: 140, mass: 0.6},
  });
  const revealOpacity = interpolate(revealSpring, [0, 1], [0, 1]);
  const revealScale = interpolate(revealSpring, [0, 0.5, 1], [0.5, 1.2, 1]);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, #0a0a14 0%, #020308 60%, #000000 100%)",
        perspective: "1600px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {title && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: 60,
            fontWeight: 800,
            color: "#ffffff",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </div>
      )}

      {subtitle && (
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: 32,
            fontWeight: 500,
            color: "#aaaaaa",
          }}
        >
          {subtitle}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: SAFE_WIDTH,
          height: SAFE_HEIGHT,
          marginLeft: -SAFE_WIDTH / 2,
          marginTop: -SAFE_HEIGHT / 2,
          transformStyle: "preserve-3d",
          transform: `rotateX(6deg) rotateY(-10deg) scale(${safeScale})`,
        }}
      >
        {/* Safe body */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #3a3a42 0%, #1a1a22 50%, #0a0a12 100%)",
            borderRadius: 12,
            boxShadow:
              "0 40px 100px rgba(0, 0, 0, 0.9), " +
              "0 20px 50px rgba(0, 0, 0, 0.6), " +
              "inset 0 2px 0 rgba(255, 255, 255, 0.12), " +
              "inset 0 -2px 0 rgba(0, 0, 0, 0.6)",
            opacity: safeOpacity,
            filter: `blur(${safeBlur}px)`,
          }}
        >
          {/* Rivets on corners */}
          {[
            {top: 16, left: 16},
            {top: 16, right: 16},
            {bottom: 16, left: 16},
            {bottom: 16, right: 16},
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pos,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, #888, #222 60%, #111)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.8)",
              }}
            />
          ))}
        </div>

        {/* Safe interior (reveal area behind door) */}
        <div
          style={{
            position: "absolute",
            top: DOOR_INSET,
            left: DOOR_INSET,
            width: DOOR_WIDTH,
            height: DOOR_HEIGHT,
            borderRadius: 6,
            background:
              "radial-gradient(ellipse at center, rgba(255, 176, 32, 0.35) 0%, rgba(40, 20, 0, 0.95) 60%, #000000 100%)",
            boxShadow:
              "inset 0 8px 40px rgba(0, 0, 0, 0.9), inset 0 0 80px rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Reveal text */}
          {revealText && (
            <div
              style={{
                fontFamily: '"Inter", -apple-system, sans-serif',
                fontSize: 110,
                fontWeight: 900,
                letterSpacing: "0.06em",
                color: revealColor,
                textShadow: `0 0 40px ${revealColor}, 0 0 80px ${revealColor}88`,
                opacity: revealOpacity,
                transform: `scale(${revealScale})`,
              }}
            >
              {revealText}
            </div>
          )}
        </div>

        {/* Safe door (rotates open on Y-axis, left-hinged) */}
        <div
          style={{
            position: "absolute",
            top: DOOR_INSET,
            left: DOOR_INSET,
            width: DOOR_WIDTH,
            height: DOOR_HEIGHT,
            background:
              "linear-gradient(135deg, #3a3a42 0%, #1a1a22 50%, #0a0a12 100%)",
            borderRadius: 6,
            transformOrigin: "left center",
            transform: `rotateY(${doorRotation}deg)`,
            transformStyle: "preserve-3d",
            boxShadow:
              "inset 0 2px 0 rgba(255, 255, 255, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.6), 0 20px 40px rgba(0, 0, 0, 0.8)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Lock wheel (rotates during open) */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 180,
              height: 180,
              marginLeft: -90,
              marginTop: -90,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #5a5a62, #1a1a22 70%)",
              border: "6px solid #0a0a12",
              boxShadow:
                "0 8px 24px rgba(0, 0, 0, 0.9), inset 0 4px 12px rgba(255, 255, 255, 0.1)",
              transform: `rotate(${wheelRotation}deg)`,
            }}
          >
            {/* 6 wheel spokes */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 14,
                  height: 60,
                  marginLeft: -7,
                  marginTop: -30,
                  background: "linear-gradient(to bottom, #666, #222)",
                  borderRadius: 4,
                  transformOrigin: "center center",
                  transform: `rotate(${angle}deg) translateY(-30px)`,
                }}
              />
            ))}
            {/* Center circle */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 40,
                height: 40,
                marginLeft: -20,
                marginTop: -20,
                borderRadius: "50%",
                background: "radial-gradient(circle, #888, #222)",
                boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.3)",
              }}
            />
          </div>

          {/* Door handle (right side) */}
          <div
            style={{
              position: "absolute",
              right: 40,
              top: "50%",
              width: 16,
              height: 110,
              marginTop: -55,
              background: "linear-gradient(to right, #555, #222)",
              borderRadius: 8,
              boxShadow:
                "inset 0 2px 0 rgba(255, 255, 255, 0.2), 0 3px 6px rgba(0, 0, 0, 0.8)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DemoSceneSafe3D: React.FC = () => {
  return (
    <Safe3D
      revealText="LEER"
      revealColor="#ff4540"
      title="Dein Geld im Safe"
      subtitle="2027 · Nach der Meldepflicht"
    />
  );
};

export default DemoSceneSafe3D;