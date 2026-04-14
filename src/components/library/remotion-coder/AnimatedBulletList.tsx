import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing, staticFile} from "remotion";

type BulletItem = {
  title: string;
  description?: string;
};

type AnimatedBulletListProps = {
  title: string;
  subtitle?: string;
  items: BulletItem[];
  bulletStyle?: "dot" | "number" | "check";
  accentColor?: string;
  paperTextureSrc?: string;
  variant?: "fullscreen" | "overlay";
  clusterOffsetX?: number;
};

export const AnimatedBulletList: React.FC<AnimatedBulletListProps> = ({
  title,
  subtitle,
  items,
  bulletStyle = "dot",
  accentColor = "#ffb020",
  paperTextureSrc,
  variant = "fullscreen",
  clusterOffsetX = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const PANEL_WIDTH_FULLSCREEN = 1300;
  const PANEL_HEIGHT_FULLSCREEN = 760;
  const PANEL_WIDTH_OVERLAY = 1000;
  const PANEL_HEIGHT_OVERLAY = 600;

  const PANEL_WIDTH = variant === "fullscreen" ? PANEL_WIDTH_FULLSCREEN : PANEL_WIDTH_OVERLAY;
  const PANEL_HEIGHT = variant === "fullscreen" ? PANEL_HEIGHT_FULLSCREEN : PANEL_HEIGHT_OVERLAY;

  const PADDING_X = 80;
  const PADDING_TOP = 70;
  const ITEM_HEIGHT = 100;
  const ITEM_GAP = 14;
  const LIST_TOP = 200;

  // Panel entry animation (Phase A)
  const panelEntryStart = 0;
  const panelEntryEnd = 28;
  const panelOpacity = interpolate(frame, [panelEntryStart, panelEntryEnd], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const panelBlur = interpolate(frame, [panelEntryStart, panelEntryEnd], [20, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  // Title and divider animation (Phase B)
  const titleStart = 10;
  const titleDuration = 40;
  const titleEnd = titleStart + titleDuration;
  const dividerProgress = interpolate(frame, [titleStart + 20, titleEnd], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  // Item animations (Phase C)
  const itemStaggerDelay = 14;

  const renderMarker = (i: number, scale: number) => {
    if (bulletStyle === "number") {
      return (
        <div style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          backgroundColor: `${accentColor}22`,
          border: `2px solid ${accentColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: 20,
          fontWeight: 900,
          color: accentColor,
          flexShrink: 0,
          transform: `scale(${scale})`,
          boxShadow: `0 0 18px ${accentColor}77`,
        }}>
          {i + 1}
        </div>
      );
    }
    if (bulletStyle === "check") {
      return (
        <div style={{
          width: 42,
          height: 42,
          borderRadius: 8,
          backgroundColor: `${accentColor}22`,
          border: `2px solid ${accentColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 900,
          color: accentColor,
          flexShrink: 0,
          transform: `scale(${scale})`,
          boxShadow: `0 0 18px ${accentColor}77`,
        }}>
          ✓
        </div>
      );
    }
    // default "dot"
    return (
      <div style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: accentColor,
        flexShrink: 0,
        transform: `scale(${scale})`,
        boxShadow: `0 0 20px ${accentColor}, 0 0 40px ${accentColor}66`,
        marginTop: 14,
        marginLeft: 8,
        marginRight: 8,
      }} />
    );
  };

  return (
    <AbsoluteFill style={{
      // Iter2.9: removed radial-gradient BG so parent MovingGridBG shows through
      background: "transparent",
      // was: "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)"; kept disabled below
      perspective: "1800px",
      perspectiveOrigin: "50% 50%",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        transformStyle: "preserve-3d",
        transform: `translateX(${clusterOffsetX}px) rotateX(3deg) rotateY(-12deg)`,
      }}>
        <div style={{
          position: "absolute",
          width: PANEL_WIDTH,
          height: PANEL_HEIGHT,
          left: "50%",
          top: "50%",
          marginLeft: -PANEL_WIDTH / 2,
          marginTop: -PANEL_HEIGHT / 2,
          backgroundColor: paperTextureSrc ? "rgba(10, 8, 4, 1)" : "rgba(18, 16, 12, 0.72)",
          backdropFilter: "blur(24px) saturate(1.2)",
          border: "1px solid rgba(255, 200, 120, 0.24)",
          borderRadius: 16,
          boxShadow: "0 30px 90px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
          opacity: panelOpacity,
          filter: `blur(${panelBlur}px)`,
          overflow: "hidden",
        }}>
          {paperTextureSrc && (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${paperTextureSrc})`,
              backgroundSize: "cover",
              opacity: 0.1,
              pointerEvents: "none",
            }} />
          )}
          
          <div style={{
            position: "absolute",
            top: PADDING_TOP,
            left: PADDING_X,
            right: PADDING_X,
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: 42,
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.95)",
            textShadow: "0 2px 16px rgba(0, 0, 0, 0.85)",
            display: "flex",
            flexWrap: "wrap",
          }}>
            {title.split("").map((ch, i) => {
              const charDelay = titleStart + i * 1.5;
              const charOpacity = interpolate(frame, [charDelay, charDelay + 10], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
              return (
                <span
                  key={i}
                  style={{
                    opacity: charOpacity,
                    display: ch === " " ? "inline-block" : "inline",
                    width: ch === " " ? "0.5em" : undefined,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </div>

          <div style={{
            position: "absolute",
            top: PADDING_TOP + 70,
            left: PADDING_X,
            width: 160,
            height: 3,
            backgroundColor: accentColor,
            transformOrigin: "left center",
            transform: `scaleX(${dividerProgress})`,
            boxShadow: `0 0 14px ${accentColor}88`,
          }} />

          <div style={{
            position: "absolute",
            top: LIST_TOP,
            left: PADDING_X,
            right: PADDING_X,
          }}>
            {items.map((item, i) => {
              const itemDelay = 40 + i * itemStaggerDelay;
              const itemOp = interpolate(frame, [itemDelay, itemDelay + 22], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
              const itemX = interpolate(frame, [itemDelay, itemDelay + 22], [-40, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)});
              
              const markerSpring = spring({frame: frame - itemDelay, fps, config: {damping: 10, stiffness: 160, mass: 0.5}});
              const markerScale = interpolate(markerSpring, [0, 0.5, 1], [0, 1.3, 1]);

              return (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 22,
                  marginBottom: ITEM_GAP + 8,
                  opacity: itemOp,
                  transform: `translateX(${itemX}px)`,
                }}>
                  {renderMarker(i, markerScale)}
                  <div style={{flex: 1, paddingTop: 4}}>
                    <div style={{
                      fontFamily: '"Inter", -apple-system, sans-serif',
                      fontSize: 30,
                      fontWeight: 800,
                      letterSpacing: "0.02em",
                      color: "rgba(255, 255, 255, 0.95)",
                      lineHeight: 1.2,
                    }}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div style={{
                        fontFamily: '"Inter", -apple-system, sans-serif',
                        fontSize: 19,
                        fontWeight: 500,
                        color: "rgba(255, 200, 120, 0.72)",
                        lineHeight: 1.4,
                        marginTop: 4,
                      }}>
                        {item.description}
                      </div>
                    )}
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

export const DemoSceneAnimatedBulletList: React.FC = () => {
  return (
    <AnimatedBulletList
      title="So schützt du dein Vermögen"
      items={[
        {title: "Physisches Gold kaufen", description: "Krügerrand, Philharmoniker, Maple Leaf"},
        {title: "Bargeld-Reserve halten", description: "Mindestens 3 Monatsgehälter liquide"},
        {title: "Konten diversifizieren", description: "Mehrere Banken und Jurisdiktionen"},
        {title: "Immobilien prüfen", description: "Ruhige Lagen, nicht überbewertet"},
        {title: "Aktien breit streuen", description: "MSCI World + Rohstoffe als Hedge"},
      ]}
      bulletStyle="number"
      accentColor="#ffb020"
      paperTextureSrc={staticFile("paper-crumpled.jpg")}
      variant="fullscreen"
    />
  );
};

export default DemoSceneAnimatedBulletList;