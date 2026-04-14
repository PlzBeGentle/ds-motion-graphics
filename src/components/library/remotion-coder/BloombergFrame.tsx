import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from "remotion";

type BloombergFrameProps = {
  children: React.ReactNode;
  brandLabel?: string;
  showBrandLabel?: boolean;
  showStand?: boolean;
  size?: "large" | "medium" | "small";
  position?: "center" | "left" | "right";
};

export const BloombergFrame: React.FC<BloombergFrameProps> = ({
  children,
  brandLabel = "",
  showBrandLabel = false,
  showStand = false,
  size = "large",
  position = "center",
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sizePresets = {
    large: {width: 1680, height: 920, bezel: 28, borderRadius: 14},
    medium: {width: 1340, height: 740, bezel: 22, borderRadius: 12},
    small: {width: 1040, height: 580, bezel: 18, borderRadius: 10},
  };
  
  const {width, height, bezel, borderRadius} = sizePresets[size];
  const innerWidth = width - bezel * 2;
  const innerHeight = height - bezel * 2 - (showBrandLabel ? 32 : 0);

  const frameSpring = spring({frame, fps, config: {damping: 15, stiffness: 80, mass: 1.0}});
  const frameOpacity = interpolate(frameSpring, [0, 1], [0, 1]);
  const frameScale = interpolate(frameSpring, [0, 1], [0.92, 1]);
  const frameBlur = interpolate(frameSpring, [0, 1], [12, 0]);

  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: position === "left" ? "30%" : position === "right" ? "70%" : "50%",
      transform: `translate(-50%, -50%) scale(${frameScale})`,
      width,
      height,
      opacity: frameOpacity,
      filter: `blur(${frameBlur}px)`,
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#1a1a22",
        borderRadius,
        boxShadow:
          "0 40px 100px rgba(0, 0, 0, 0.85), " +
          "0 20px 60px rgba(0, 0, 0, 0.5), " +
          "inset 0 2px 0 rgba(255,255,255,0.08), " +
          "inset 0 -1px 0 rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{
          position: "absolute",
          top: bezel,
          left: bezel,
          width: innerWidth,
          height: innerHeight,
          borderRadius: borderRadius * 0.5,
          overflow: "hidden",
          backgroundColor: "#02030a",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), inset 0 2px 0 rgba(0,0,0,0.5)",
        }}>
          {children}
          <div style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 40%, transparent 60%)",
          }} />
        </div>
        {showBrandLabel && (
          <div style={{
            position: "absolute",
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.35)",
            fontFamily: '"Inter", -apple-system, sans-serif',
            textTransform: "uppercase",
          }}>
            {brandLabel}
          </div>
        )}
      </div>
      {showStand && (
        <div style={{
          position: "absolute",
          top: height + 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: width * 0.15,
          height: 40,
          background: "linear-gradient(to bottom, #1a1a22 0%, #0a0a10 100%)",
          borderRadius: "0 0 6px 6px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.8)",
        }} />
      )}
    </div>
  );
};

export const DemoSceneBloombergFrame: React.FC = () => {
  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)",
    }}>
      <BloombergFrame
        size="large"
        position="center"
        showBrandLabel={false}
        showStand={false}
      >
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: 72,
          fontWeight: 900,
          color: "rgba(255, 176, 32, 0.85)",
          textShadow: "0 0 40px rgba(255, 176, 32, 0.55)",
        }}>
          [CHART PLACEHOLDER]
        </div>
      </BloombergFrame>
    </AbsoluteFill>
  );
};

export default DemoSceneBloombergFrame;