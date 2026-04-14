import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, staticFile} from "remotion";

type ChapterTransition3DProps = {
  chapterNumber: string;
  chapterTitle: string;
  chapterSubtitle?: string;
  paperTextureSrc?: string;
  accentColor?: string;
};

const ChapterTransition3D: React.FC<ChapterTransition3DProps> = ({
  chapterNumber,
  chapterTitle,
  chapterSubtitle,
  paperTextureSrc,
  accentColor = "#ffb020",
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Letterbox animation
  const letterboxProgress = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const letterboxHeight = interpolate(letterboxProgress, [0, 1], [0, 140]);

  // Exit animation
  const exitProgress = interpolate(frame, [100, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const letterboxRetract = interpolate(exitProgress, [0, 1], [140, 0]);
  const finalLetterboxHeight = Math.min(letterboxHeight, letterboxRetract);

  // Chapter number animation
  const chapterNumberOpacity = interpolate(
    frame,
    [10, 30],
    [0, 1],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  // Title animation
  const titleChars = chapterTitle.split("");
  const titleCharAnimations = titleChars.map((_, i) => {
    const charFrame = frame - 22 - i * 2;
    const charOp = interpolate(charFrame, [0, 16], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
    const charY = interpolate(charFrame, [0, 16], [30, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1)
    });
    return {opacity: charOp, y: charY};
  });

  // Divider animation
  const dividerProgress = interpolate(
    frame,
    [50, 75],
    [0, 1],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  // Subtitle animation
  const subtitleOpacity = interpolate(
    frame,
    [65, 90],
    [0, 1],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );
  const subtitleY = interpolate(
    frame,
    [65, 90],
    [10, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)",
    }}>
      {paperTextureSrc && (
        <img src={paperTextureSrc} style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.4,
          filter: "brightness(0.2) sepia(0.5) contrast(1.2)",
        }} />
      )}

      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: finalLetterboxHeight,
        backgroundColor: "#000",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.8)",
      }} />

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: finalLetterboxHeight,
        backgroundColor: "#000",
        boxShadow: "0 -2px 20px rgba(0, 0, 0, 0.8)",
      }} />

      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"Inter", -apple-system, sans-serif',
      }}>
        <div style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: accentColor,
          marginBottom: 42,
          opacity: chapterNumberOpacity * contentOpacity,
          textShadow: "0 0 20px rgba(255, 176, 32, 0.6)",
        }}>
          {chapterNumber.split("").map((ch, i) => (
            <span key={i} style={{display: "inline-block", whiteSpace: "pre"}}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        <div style={{
          fontSize: 144,
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontWeight: 900,
          letterSpacing: "-0.02em",
          lineHeight: 0.95,
          color: "#ffffff",
          textAlign: "center",
          textShadow: "0 8px 32px rgba(0, 0, 0, 0.9), 0 0 60px rgba(255, 200, 80, 0.15)",
          display: "flex",
        }}>
          {titleChars.map((ch, i) => (
            <span 
              key={i} 
              style={{
                display: "inline-block", 
                opacity: titleCharAnimations[i].opacity * contentOpacity, 
                transform: `translateY(${titleCharAnimations[i].y}px)`,
                whiteSpace: "pre"
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        <div style={{
          width: 200,
          height: 3,
          backgroundColor: accentColor,
          marginTop: 42,
          marginBottom: 32,
          transformOrigin: "center",
          transform: `scaleX(${dividerProgress})`,
          boxShadow: "0 0 16px rgba(255, 176, 32, 0.7)",
          opacity: contentOpacity,
        }} />

        {chapterSubtitle && (
          <div style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: 28,
            fontWeight: 500,
            fontStyle: "italic",
            color: "rgba(255, 200, 120, 0.85)",
            textAlign: "center",
            maxWidth: 1200,
            lineHeight: 1.3,
            opacity: subtitleOpacity * contentOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}>
            {chapterSubtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const DemoSceneChapterTransition3D: React.FC = () => {
  return (
    <ChapterTransition3D
      chapterNumber="KAPITEL 01"
      chapterTitle="Die Krise"
      chapterSubtitle="Warum unser Geld gerade nichts mehr wert ist"
      paperTextureSrc={staticFile("paper-crumpled.jpg")}
      accentColor="#ffb020"
    />
  );
};

export default DemoSceneChapterTransition3D;