import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing, staticFile} from "remotion";

type BigQuoteCard3DProps = {
  quote: string;
  author: string;
  authorRole?: string;
  authorDate?: string;
  authorPortraitSrc?: string;
  paperTextureSrc?: string;
  variant?: "fullscreen" | "overlay";
  clusterOffsetX?: number;
};

export const BigQuoteCard3D: React.FC<BigQuoteCard3DProps> = ({
  quote,
  author,
  authorRole,
  authorDate,
  authorPortraitSrc,
  paperTextureSrc,
  variant = "fullscreen",
  clusterOffsetX = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const PANEL_WIDTH_FULLSCREEN = 1400;
  const PANEL_HEIGHT_FULLSCREEN = 740;
  const PANEL_WIDTH_OVERLAY = 1080;
  const PANEL_HEIGHT_OVERLAY = 580;

  const PANEL_WIDTH = variant === "fullscreen" ? PANEL_WIDTH_FULLSCREEN : PANEL_WIDTH_OVERLAY;
  const PANEL_HEIGHT = variant === "fullscreen" ? PANEL_HEIGHT_FULLSCREEN : PANEL_HEIGHT_OVERLAY;

  const PADDING_X = 100;
  const PADDING_TOP = 90;
  const PADDING_BOTTOM = 90;

  const SERIF_STACK = '"Georgia", "Times New Roman", "Didot", serif';
  const SANS_STACK = '"Inter", -apple-system, sans-serif';

  // Phase A — Panel Entry
  const panelSpring = spring({frame, fps, config: {damping: 15, stiffness: 80, mass: 1.0}});
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1]);
  const panelBlur = interpolate(panelSpring, [0, 1], [14, 0]);

  // Phase B — Decorative Quote Marks
  const quoteMarksSpring = spring({frame: frame - 10, fps, config: {damping: 16, stiffness: 70, mass: 1.2}});
  const quoteMarksOpacity = interpolate(quoteMarksSpring, [0, 1], [0, 0.12]);
  const quoteMarksScale = interpolate(quoteMarksSpring, [0, 1], [0.8, 1]);

  // Phase C — Quote Words
  const quoteWords = quote.split(" ");
  const wordStartFrame = 28;
  const framesPerWord = 4;

  // Phase D — Divider
  const dividerProgress = interpolate(frame, [95, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Phase E — Attribution
  const attrOpacity = interpolate(frame, [115, 140], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const attrY = interpolate(frame, [115, 140], [12, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)});

  const portraitSpring = spring({frame: frame - 118, fps, config: {damping: 12, stiffness: 140, mass: 0.7}});
  const portraitScale = interpolate(portraitSpring, [0, 0.5, 1], [0.4, 1.12, 1]);
  const portraitOpacity = interpolate(portraitSpring, [0, 1], [0, 1]);

  const DIVIDER_TOP_PERCENT = 0.68;
  const DIVIDER_TOP = PANEL_HEIGHT * DIVIDER_TOP_PERCENT;
  const DIVIDER_WIDTH = 140;
  const ATTR_TOP = DIVIDER_TOP + 40;

  const glassPanelStyle: React.CSSProperties = {
    position: "absolute",
    width: PANEL_WIDTH,
    height: PANEL_HEIGHT,
    left: "50%",
    top: "50%",
    marginLeft: -PANEL_WIDTH / 2,
    marginTop: -PANEL_HEIGHT / 2,
    backgroundColor: paperTextureSrc ? "rgba(10, 8, 4, 1)" : "rgba(18, 16, 12, 0.72)",
    backdropFilter: "blur(24px) saturate(1.2)",
    WebkitBackdropFilter: "blur(24px) saturate(1.2)",
    border: "1px solid rgba(255, 200, 120, 0.24)",
    borderRadius: 16,
    boxShadow:
      "0 30px 90px rgba(0, 0, 0, 0.7), " +
      "0 10px 40px rgba(0,0,0,0.4), " +
      "inset 0 1px 0 rgba(255,255,255,0.08), " +
      "inset 0 -1px 0 rgba(0,0,0,0.3)",
    opacity: panelOpacity,
    filter: `blur(${panelBlur}px)`,
    overflow: "hidden",
  };

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
        transform: `translateX(${clusterOffsetX}px) rotateX(3deg) rotateY(-12deg)`,
      }}>
        <div style={glassPanelStyle}>
          {paperTextureSrc && (
            <img
              src={paperTextureSrc}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 1.0,
                filter: "brightness(0.32) sepia(0.55) saturate(1.25) contrast(1.15)",
                pointerEvents: "none",
              }}
            />
          )}
          
          <div style={{
            position: "absolute",
            top: -60,
            left: 40,
            fontSize: 540,
            fontFamily: SERIF_STACK,
            fontStyle: "italic",
            fontWeight: 900,
            color: "#ffd77a",
            opacity: quoteMarksOpacity,
            transform: `scale(${quoteMarksScale})`,
            transformOrigin: "top left",
            lineHeight: 0.8,
            pointerEvents: "none",
            userSelect: "none",
            textShadow: "0 0 40px rgba(255, 200, 80, 0.3)",
          }}>
            "
          </div>
          
          <div style={{
            position: "absolute",
            bottom: -220,
            right: 40,
            fontSize: 540,
            fontFamily: SERIF_STACK,
            fontStyle: "italic",
            fontWeight: 900,
            color: "#ffd77a",
            opacity: quoteMarksOpacity,
            transform: `scale(${quoteMarksScale})`,
            transformOrigin: "bottom right",
            lineHeight: 0.8,
            pointerEvents: "none",
            userSelect: "none",
            textShadow: "0 0 40px rgba(255, 200, 80, 0.3)",
          }}>
            "
          </div>
          
          <div style={{
            position: "absolute",
            top: PADDING_TOP + 30,
            left: PADDING_X,
            right: PADDING_X,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            gap: "0 22px",
            fontFamily: SERIF_STACK,
            fontStyle: "italic",
            fontSize: variant === "fullscreen" ? 84 : 62,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.18,
            color: "#ffffff",
            textAlign: "center",
            textShadow: "0 4px 24px rgba(0, 0, 0, 0.7)",
            zIndex: 2,
          }}>
            {quoteWords.map((word, i) => {
              const wordDelay = wordStartFrame + i * framesPerWord;
              const wordOp = interpolate(frame, [wordDelay, wordDelay + 18], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const wordY = interpolate(frame, [wordDelay, wordDelay + 18], [12, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              });
              const wordBlur = interpolate(frame, [wordDelay, wordDelay + 18], [4, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <span key={i} style={{
                  display: "inline-block",
                  opacity: wordOp,
                  transform: `translateY(${wordY}px)`,
                  filter: `blur(${wordBlur}px)`,
                }}>
                  {word}
                </span>
              );
            })}
          </div>
          
          <div style={{
            position: "absolute",
            top: DIVIDER_TOP,
            left: "50%",
            marginLeft: -DIVIDER_WIDTH / 2,
            width: DIVIDER_WIDTH,
            height: 2,
            backgroundColor: "rgba(255, 200, 120, 0.7)",
            transformOrigin: "center center",
            transform: `scaleX(${dividerProgress})`,
            boxShadow: "0 0 14px rgba(255, 200, 120, 0.4)",
            zIndex: 2,
          }} />
          
          <div style={{
            position: "absolute",
            top: ATTR_TOP,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            opacity: attrOpacity,
            transform: `translateY(${attrY}px)`,
            zIndex: 2,
          }}>
            {authorPortraitSrc && (
              <div style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(255, 200, 120, 0.6)",
                boxShadow: "0 4px 18px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 200, 120, 0.2)",
                opacity: portraitOpacity,
                transform: `scale(${portraitScale})`,
                flexShrink: 0,
              }}>
                <img
                  src={authorPortraitSrc}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(0.6) contrast(1.08) brightness(0.95)",
                  }}
                />
              </div>
            )}
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              fontFamily: SANS_STACK,
            }}>
              <div style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.95)",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.85)",
              }}>
                {author}
              </div>
              {(authorRole || authorDate) && (
                <div style={{
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255, 200, 120, 0.72)",
                  marginTop: 4,
                }}>
                  {authorRole}
                  {authorRole && authorDate ? " · " : ""}
                  {authorDate}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DemoSceneBigQuoteCard3D: React.FC = () => {
  return (
    <BigQuoteCard3D
      quote="Das ist ein bedeutender Schock, den wir gerade erleben — und die Folgen werden wir alle spüren."
      author="Christine Lagarde"
      authorRole="Präsidentin EZB"
      authorDate="14.03.2026"
      authorPortraitSrc={staticFile("lagarde.png")}
      paperTextureSrc={staticFile("leather-dark.jpg")}
      variant="fullscreen"
    />
  );
};

export default DemoSceneBigQuoteCard3D;
