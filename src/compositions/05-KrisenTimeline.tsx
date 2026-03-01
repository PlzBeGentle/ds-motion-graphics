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
import { GoldBar } from "../components/GoldBar";
import { TimelineItem } from "../components/TimelineItem";
import { TIMELINE_EVENTS } from "../data/transcript";
import { BuzzwordLowerThird } from "../components/BuzzwordLowerThird";

export const KrisenTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline positions
  const startX = 180;
  const endX = 1740;
  const totalWidth = endX - startX;
  const spacing = totalWidth / (TIMELINE_EVENTS.length - 1);

  // Gold line growing
  const lineProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 30, stiffness: 30, mass: 2 },
  });

  const lineWidth = interpolate(lineProgress, [0, 1], [0, totalWidth]);

  // Buzzword at the end
  const buzzwordDelay = 200;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          fontFamily: FONT_FAMILY.headline,
          fontWeight: 700,
          fontSize: 36,
          color: LOCOS.gold,
          letterSpacing: "0.08em",
          opacity: spring({
            frame: frame - 3,
            fps,
            config: { damping: 20, stiffness: 80, mass: 1 },
          }),
        }}
      >
        KRISEN-TIMELINE
      </div>

      {/* Gold line */}
      <div
        style={{
          position: "absolute",
          left: startX,
          top: "50%",
          height: 4,
          width: lineWidth,
          background: `linear-gradient(90deg, ${LOCOS.goldDim}, ${LOCOS.gold}, ${LOCOS.goldLight})`,
          boxShadow: `0 0 20px ${LOCOS.gold}60`,
          borderRadius: 2,
        }}
      />

      {/* Timeline items */}
      {TIMELINE_EVENTS.map((event, i) => {
        const x = startX + i * spacing;
        const itemDelay = 15 + i * 25;
        const isLast = i === TIMELINE_EVENTS.length - 1;

        return (
          <TimelineItem
            key={i}
            year={event.year}
            label={event.label}
            delay={itemDelay}
            isAlert={isLast}
            x={x}
          />
        );
      })}

      {/* Buzzword at end */}
      {frame > buzzwordDelay && (
        <BuzzwordLowerThird
          text="DAUERKRISENMODUS SEIT 2008"
          delay={buzzwordDelay}
        />
      )}
    </AbsoluteFill>
  );
};
