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
import { Seismograph } from "../components/Seismograph";
import { ImpactShockwave } from "../components/ImpactShockwave";

export const KrisenTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startX = 180;
  const endX = 1740;
  const totalWidth = endX - startX;
  const spacing = totalWidth / (TIMELINE_EVENTS.length - 1);
  const itemDelays = TIMELINE_EVENTS.map((_, i) => 25 + i * 30);

  // Color gradient on timeline: green → yellow → red
  const lineProgress = spring({ frame: frame - 5, fps, config: { damping: 25, stiffness: 25, mass: 2.5 } });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, totalWidth]);

  // Year cycling for last item "202X"
  const lastItemDelay = itemDelays[itemDelays.length - 1];
  const cycleStart = lastItemDelay + 5;
  const cycleYears = ["2025", "2026", "2027", "2028", "2029", "203X", "???"];
  const cycleIdx = frame > cycleStart
    ? Math.min(Math.floor((frame - cycleStart) / 3), cycleYears.length - 1)
    : 0;
  const displayYear = frame > cycleStart ? cycleYears[cycleIdx] : TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1].year;
  const yearSettled = cycleIdx >= cycleYears.length - 1;

  const buzzwordDelay = 215;

  return (
    <AbsoluteFill>
      <CameraMove zoomEnd={1.02} panX={-8}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <GoldParticles count={18} mode="ambient" />

          {/* Title */}
          <div style={{
            position: "absolute", top: 100,
            opacity: spring({ frame: frame - 3, fps, config: { damping: 15, stiffness: 80, mass: 0.8 } }),
            transform: `translateY(${interpolate(spring({ frame: frame - 3, fps, config: { damping: 15, stiffness: 80, mass: 0.8 } }), [0, 1], [20, 0])}px)`,
          }}>
            <GradientShine text="KRISEN-TIMELINE" fontSize={40} delay={3} shineDuration={45} />
          </div>

          {/* Color gradient timeline line: green → yellow → orange → red */}
          <div style={{ position: "absolute", left: startX, top: "50%", height: 8, width: lineWidth, borderRadius: 4, filter: "blur(6px)", transform: "translateY(-50%)",
            background: `linear-gradient(90deg, #4CAF5040, #FFC10740, ${LOCOS.red}40)`,
          }} />
          <div style={{ position: "absolute", left: startX, top: "50%", height: 3, width: lineWidth, borderRadius: 2, transform: "translateY(-50%)",
            background: `linear-gradient(90deg, #4CAF50, #8BC34A, #FFC107, #FF9800, ${LOCOS.red})`,
          }} />

          {/* Traveling tip dot */}
          {lineProgress > 0.02 && lineProgress < 0.98 && (
            <div style={{ position: "absolute", left: startX + lineWidth - 6, top: "50%", width: 12, height: 12, borderRadius: "50%", backgroundColor: LOCOS.goldLight, boxShadow: `0 0 20px ${LOCOS.goldLight}`, transform: "translate(-50%, -50%)" }} />
          )}

          {/* Seismograph line behind timeline */}
          <Seismograph spikeFrames={itemDelays} y={540} startX={startX} endX={endX} color={`${LOCOS.gold}60`} />

          {/* Timeline items */}
          {TIMELINE_EVENTS.map((event, i) => {
            const x = startX + i * spacing;
            const isLast = i === TIMELINE_EVENTS.length - 1;
            const delay = itemDelays[i];

            const pop = spring({ frame: frame - delay, fps, config: { damping: 8, stiffness: 150, mass: 0.5 } });
            const scale = interpolate(pop, [0, 1], [0, 1]);

            // Color per position (green → red)
            const posColor = isLast ? LOCOS.red : interpolate(i, [0, TIMELINE_EVENTS.length - 2], [0, 1]).toString();
            const dotColor = isLast ? LOCOS.red : [`#4CAF50`, `#8BC34A`, `#FFC107`, `#FF9800`][i] || LOCOS.gold;

            const pulse = isLast ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0.6, 1]) : 1;
            const dotSize = isLast ? 26 : 18;

            // Mini crash chart at each point
            const crashIn = spring({ frame: frame - delay - 8, fps, config: { damping: 10, stiffness: 80, mass: 0.6 } });

            const yearDisplay = isLast ? displayYear : event.year;

            return (
              <React.Fragment key={i}>
                <div style={{
                  position: "absolute", left: x, top: "50%",
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity: pop, display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  {/* Year */}
                  <div style={{
                    fontFamily: FONT_FAMILY.headline, fontWeight: 700,
                    fontSize: isLast ? 36 : 28, color: dotColor, marginBottom: 12, opacity: pulse,
                    textShadow: isLast ? `0 0 30px ${LOCOS.red}80` : `0 0 15px ${dotColor}40`,
                  }}>{yearDisplay}</div>

                  {/* Dot + ring */}
                  <div style={{ position: "relative" }}>
                    <div style={{ width: dotSize, height: dotSize, borderRadius: "50%", backgroundColor: dotColor, boxShadow: `0 0 ${isLast ? 30 : 20}px ${dotColor}80`, transform: `scale(${pulse})` }} />
                    <div style={{ position: "absolute", top: -6, left: -6, width: dotSize + 12, height: dotSize + 12, borderRadius: "50%", border: `2px solid ${dotColor}40`, transform: `scale(${pulse})` }} />
                  </div>

                  {/* Mini crash chart */}
                  <svg width="60" height="30" viewBox="0 0 60 30" style={{ marginTop: 6, opacity: crashIn * 0.5 }}>
                    <path d="M0 5 L15 8 L25 3 L35 25 L45 22 L60 28" stroke={LOCOS.red} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>

                  {/* Label */}
                  <div style={{
                    fontFamily: FONT_FAMILY.body, fontWeight: 700,
                    fontSize: isLast ? 19 : 15, color: isLast ? LOCOS.red : LOCOS.white,
                    textAlign: "center", maxWidth: 160, letterSpacing: "0.04em",
                    textShadow: isLast ? `0 0 20px ${LOCOS.red}60` : "none",
                  }}>{event.label}</div>
                </div>

                {/* Shockwave at each event */}
                <ImpactShockwave triggerFrame={delay} x={x} y={540} color={dotColor} maxRadius={60} duration={12} />
              </React.Fragment>
            );
          })}

          {/* Big burst on last event */}
          <GoldParticles count={25} mode="burst" burstX={endX} burstY={540} burstFrame={itemDelays[itemDelays.length - 1]} />
        </AbsoluteFill>
      </CameraMove>

      {frame > buzzwordDelay && <BuzzwordLowerThird text="DAUERKRISENMODUS SEIT 2008" delay={buzzwordDelay} />}
      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.4} />
    </AbsoluteFill>
  );
};
