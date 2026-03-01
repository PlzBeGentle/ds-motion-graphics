import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";
import { TIMELINE_EVENTS } from "../data/transcript";
import { BuzzwordLowerThird } from "../components/BuzzwordLowerThird";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { GradientShine } from "../components/GradientShine";

// Enhanced timeline item with connection line
const TimelinePoint: React.FC<{
  year: string;
  label: string;
  delay: number;
  isAlert?: boolean;
  x: number;
  frame: number;
  fps: number;
}> = ({ year, label, delay, isAlert = false, x, frame, fps }) => {
  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, stiffness: 150, mass: 0.5 },
  });

  const scale = interpolate(pop, [0, 1], [0, 1]);
  const opacity = pop;

  const pulse = isAlert
    ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0.6, 1])
    : 1;

  const dotColor = isAlert ? LOCOS.red : LOCOS.gold;
  const dotSize = isAlert ? 24 : 18;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Year label */}
      <div
        style={{
          fontFamily: FONT_FAMILY.headline,
          fontWeight: 700,
          fontSize: isAlert ? 34 : 28,
          color: dotColor,
          marginBottom: 12,
          opacity: pulse,
          textShadow: isAlert
            ? `0 0 30px ${LOCOS.red}80`
            : `0 0 15px ${LOCOS.gold}40`,
        }}
      >
        {year}
      </div>
      {/* Dot with ring */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            backgroundColor: dotColor,
            boxShadow: `0 0 ${isAlert ? 30 : 20}px ${dotColor}80`,
            transform: `scale(${pulse})`,
          }}
        />
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            top: -6,
            left: -6,
            width: dotSize + 12,
            height: dotSize + 12,
            borderRadius: "50%",
            border: `2px solid ${dotColor}40`,
            transform: `scale(${pulse})`,
          }}
        />
      </div>
      {/* Vertical connector */}
      <div
        style={{
          width: 1,
          height: 20,
          backgroundColor: `${dotColor}40`,
          marginTop: 4,
        }}
      />
      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY.body,
          fontWeight: 700,
          fontSize: isAlert ? 19 : 16,
          color: isAlert ? LOCOS.red : LOCOS.white,
          textAlign: "center",
          maxWidth: 170,
          letterSpacing: "0.04em",
          textShadow: isAlert ? `0 0 20px ${LOCOS.red}60` : "none",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const KrisenTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startX = 180;
  const endX = 1740;
  const totalWidth = endX - startX;
  const spacing = totalWidth / (TIMELINE_EVENTS.length - 1);

  // Gold line growing with glow
  const lineProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 25, stiffness: 25, mass: 2.5 },
  });

  const lineWidth = interpolate(lineProgress, [0, 1], [0, totalWidth]);

  const buzzwordDelay = 210;

  return (
    <AbsoluteFill>
      <CameraMove zoomEnd={1.02} panX={-8}>
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <GoldParticles count={18} mode="ambient" />

          {/* Title */}
          <div
            style={{
              position: "absolute",
              top: 110,
              opacity: spring({
                frame: frame - 3,
                fps,
                config: { damping: 15, stiffness: 80, mass: 0.8 },
              }),
              transform: `translateY(${interpolate(
                spring({
                  frame: frame - 3,
                  fps,
                  config: { damping: 15, stiffness: 80, mass: 0.8 },
                }),
                [0, 1],
                [20, 0]
              )}px)`,
            }}
          >
            <GradientShine
              text="KRISEN-TIMELINE"
              fontSize={40}
              delay={3}
              shineDuration={45}
            />
          </div>

          {/* Gold line — glow layer */}
          <div
            style={{
              position: "absolute",
              left: startX,
              top: "50%",
              height: 8,
              width: lineWidth,
              background: `linear-gradient(90deg, ${LOCOS.goldDim}40, ${LOCOS.gold}60, ${LOCOS.goldLight}40)`,
              borderRadius: 4,
              filter: "blur(6px)",
              transform: "translateY(-50%)",
            }}
          />
          {/* Gold line — main */}
          <div
            style={{
              position: "absolute",
              left: startX,
              top: "50%",
              height: 3,
              width: lineWidth,
              background: `linear-gradient(90deg, ${LOCOS.goldDim}, ${LOCOS.gold}, ${LOCOS.goldLight}, ${LOCOS.gold})`,
              borderRadius: 2,
              transform: "translateY(-50%)",
            }}
          />

          {/* Tip glow dot traveling with the line */}
          {lineProgress > 0.02 && lineProgress < 0.98 && (
            <div
              style={{
                position: "absolute",
                left: startX + lineWidth - 6,
                top: "50%",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: LOCOS.goldLight,
                boxShadow: `0 0 20px ${LOCOS.goldLight}`,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}

          {/* Timeline items */}
          {TIMELINE_EVENTS.map((event, i) => {
            const x = startX + i * spacing;
            const isLast = i === TIMELINE_EVENTS.length - 1;
            return (
              <TimelinePoint
                key={i}
                year={event.year}
                label={event.label}
                delay={20 + i * 28}
                isAlert={isLast}
                x={x}
                frame={frame}
                fps={fps}
              />
            );
          })}

          {/* Particle burst on last item */}
          <GoldParticles
            count={20}
            mode="burst"
            burstX={endX}
            burstY={540}
            burstFrame={20 + 4 * 28 + 5}
          />
        </AbsoluteFill>
      </CameraMove>

      {/* Buzzword */}
      {frame > buzzwordDelay && (
        <BuzzwordLowerThird
          text="DAUERKRISENMODUS SEIT 2008"
          delay={buzzwordDelay}
        />
      )}

      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.4} />
    </AbsoluteFill>
  );
};
