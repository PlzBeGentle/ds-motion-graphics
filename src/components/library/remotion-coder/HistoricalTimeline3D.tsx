import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from "remotion";

const TYPE_COLORS = {
  krise: "#FF4540",
  boom: "#5DEB93",
  law: "#FFB020",
  event: "#6FB4FF",
};

const CARD_WIDTH = 360;
const CARD_HEIGHT = 240;
const CARD_GAP = 80;
const TIMELINE_AXIS_Y = 540;

type TimelineEvent = {
  year: number;
  title: string;
  description: string;
  type: "krise" | "boom" | "law" | "event";
};

type HistoricalTimeline3DProps = {
  title: string;
  subtitle?: string;
  events: TimelineEvent[];
  highlightIndices?: number[];
};

export const HistoricalTimeline3D: React.FC<HistoricalTimeline3DProps> = ({
  title,
  subtitle,
  events,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const totalDistance = (events.length - 1) * (CARD_WIDTH + CARD_GAP);
  const dollyProgress = interpolate(frame, [30, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const cameraX = interpolate(dollyProgress, [0, 1], [0, -totalDistance]);

  const START_X = 1920 / 2 - CARD_WIDTH / 2 - 200;

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)",
      perspective: "2000px",
      perspectiveOrigin: "50% 50%",
    }}>
      <div style={{
        position: "absolute",
        top: 80,
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 10,
      }}>
        <h1 style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: 48,
          fontWeight: 900,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.95)",
          textShadow: "0 2px 16px rgba(0, 0, 0, 0.9)",
          margin: 0,
        }}>{title}</h1>
        {subtitle && (
          <div style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255, 200, 120, 0.75)",
            marginTop: 10,
          }}>{subtitle}</div>
        )}
      </div>

      <div style={{
        position: "absolute",
        inset: 0,
        transformStyle: "preserve-3d",
        transform: `translateX(${cameraX}px) rotateX(2deg)`,
      }}>
        <div style={{
          position: "absolute",
          top: TIMELINE_AXIS_Y,
          left: -100,
          width: totalDistance + 400,
          height: 3,
          background: "linear-gradient(to right, rgba(255,200,120,0) 0%, rgba(255,200,120,0.7) 5%, rgba(255,200,120,0.7) 95%, rgba(255,200,120,0) 100%)",
          boxShadow: "0 0 20px rgba(255,200,120,0.4)",
        }} />

        {events.map((event, i) => {
          const cardX = START_X + i * (CARD_WIDTH + CARD_GAP);
          const color = TYPE_COLORS[event.type];

          const cardCenterX = cardX + CARD_WIDTH / 2;
          const cameraCenterX = -cameraX + 1920 / 2;
          const distanceFromCenter = Math.abs(cardCenterX - cameraCenterX);
          const isVisible = distanceFromCenter < 1200;

          const cardOpacity = isVisible ?
            interpolate(distanceFromCenter, [0, 300, 1200], [1, 0.7, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) : 0;
          const cardScale = interpolate(distanceFromCenter, [0, 1200], [1, 0.85], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

          return (
            <div key={i} style={{
              position: "absolute",
              top: TIMELINE_AXIS_Y - CARD_HEIGHT - 60,
              left: cardX,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              opacity: cardOpacity,
              transform: `scale(${cardScale}) rotateY(-6deg)`,
              transformStyle: "preserve-3d",
              transformOrigin: "center bottom",
            }}>
              <div style={{
                position: "absolute",
                top: CARD_HEIGHT + 28,
                left: CARD_WIDTH / 2 - 14,
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: color,
                boxShadow: `0 0 24px ${color}, 0 0 48px ${color}99`,
              }} />
              <div style={{
                position: "absolute",
                top: CARD_HEIGHT,
                left: CARD_WIDTH / 2 - 1,
                width: 2,
                height: 28,
                background: `linear-gradient(to bottom, ${color}, ${color}88)`,
              }} />
              <div style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(18, 16, 12, 0.78)",
                backdropFilter: "blur(18px) saturate(1.2)",
                WebkitBackdropFilter: "blur(18px) saturate(1.2)",
                border: `1px solid ${color}66`,
                borderTop: `3px solid ${color}`,
                borderRadius: 14,
                padding: "24px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${color}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
              }}>
                <div style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: 62,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.9,
                  color: color,
                  textShadow: `0 0 20px ${color}80`,
                }}>{event.year}</div>

                <div style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.95)",
                  marginTop: 8,
                  lineHeight: 1.1,
                }}>{event.title}</div>

                <div style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.4,
                  marginTop: 6,
                }}>{event.description}</div>

                <div style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: color,
                  backgroundColor: `${color}22`,
                  border: `1px solid ${color}55`,
                  borderRadius: 4,
                  padding: "3px 8px",
                }}>
                  {event.type}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const DemoSceneHistoricalTimeline3D: React.FC = () => {
  return (
    <HistoricalTimeline3D
      title="Die grossen Krisen im Finanzsystem"
      subtitle="1923 - 2027"
      events={[
        {year: 1923, title: "Hyperinflation", description: "1 USD = 4.2 Billionen Reichsmark. Ersparnisse ausgelöscht.", type: "krise"},
        {year: 1930, title: "Brüning-Deflation", description: "Notverordnungen, 6 Mio Arbeitslose, Vorstufe zur NS-Machtergreifung.", type: "krise"},
        {year: 1971, title: "Gold-Standard Ende", description: "Nixon kündigt Bretton-Woods. USD ist nur noch Papier.", type: "event"},
        {year: 2008, title: "Lehman-Pleite", description: "Globale Finanzkrise. QE als neues Instrument.", type: "krise"},
        {year: 2020, title: "Corona-Schock", description: "ECB druckt 1.8 Bio EUR. Schulden explodieren.", type: "krise"},
        {year: 2027, title: "AMLA-Start", description: "EU-Meldepflicht ab 10.000 EUR. Gläserner Anleger.", type: "law"},
      ]}
    />
  );
};

export default DemoSceneHistoricalTimeline3D;