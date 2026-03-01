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
import { PLAYBOOK_STEPS } from "../data/transcript";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { GradientShine } from "../components/GradientShine";
import { StampEffect } from "../components/StampEffect";
import { ImpactShockwave } from "../components/ImpactShockwave";

// Newspaper-style quote card with aged paper texture
const NewspaperQuote: React.FC<{ quote: string; author: string; delay: number; frame: number; fps: number }> = ({ quote, author, delay, frame, fps }) => {
  const cardIn = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 70, mass: 1 } });

  // Variable speed typewriter — pause before key phrases
  const pauseWords = ["gar nicht begreifen", "machen wir weiter"];
  let charsPerFrame = 1.3;
  const typedFrame = Math.max(0, frame - delay - 12);

  // Calculate visible chars with variable speed
  let visibleChars = 0;
  let accumulator = 0;
  for (let f = 0; f < typedFrame; f++) {
    const currentText = quote.substring(0, visibleChars);
    const isNearPause = pauseWords.some(pw => {
      const idx = quote.indexOf(pw);
      return idx > 0 && visibleChars >= idx - 2 && visibleChars <= idx;
    });
    accumulator += isNearPause ? 0.3 : charsPerFrame;
    if (accumulator >= 1) {
      visibleChars += Math.floor(accumulator);
      accumulator -= Math.floor(accumulator);
    }
    if (visibleChars >= quote.length) break;
  }
  visibleChars = Math.min(visibleChars, quote.length);
  const displayedQuote = quote.substring(0, visibleChars);

  const authorDelay = delay + 12 + Math.ceil(quote.length / 1.1) + 5;
  const authorOpacity = spring({ frame: frame - authorDelay, fps, config: { damping: 20, stiffness: 100, mass: 0.8 } });

  return (
    <div style={{
      opacity: cardIn, transform: `scale(${interpolate(cardIn, [0, 1], [0.92, 1])})`,
      maxWidth: 920, padding: "50px 55px", position: "relative",
      // Aged paper look
      backgroundColor: `#1E1D1B`,
      border: `1px solid ${LOCOS.goldDim}40`,
      boxShadow: `0 0 80px ${LOCOS.gold}10, 0 8px 40px rgba(0,0,0,0.5), inset 0 0 100px rgba(0,0,0,0.3)`,
    }}>
      {/* Paper texture overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, transparent 4px)` }} />

      {/* Fold crease */}
      <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: `linear-gradient(180deg, transparent, ${LOCOS.silver}15, transparent)` }} />

      {/* Juncker silhouette (subtle) */}
      <div style={{
        position: "absolute", right: 30, top: 20, opacity: 0.04,
        fontFamily: FONT_FAMILY.headline, fontSize: 200, color: LOCOS.white,
        lineHeight: 1,
      }}>👤</div>

      {/* Opening quote */}
      <div style={{ fontFamily: FONT_FAMILY.accent, fontSize: 80, color: LOCOS.gold, lineHeight: 0.5, marginBottom: 20 }}>&ldquo;</div>

      {/* Quote text */}
      <div style={{
        fontFamily: FONT_FAMILY.accent, fontStyle: "italic", fontSize: 30, color: LOCOS.textLight, lineHeight: 1.6, minHeight: 130,
      }}>
        {displayedQuote}
        {visibleChars < quote.length && (
          <span style={{ opacity: Math.sin(frame * 0.35) > 0 ? 1 : 0, color: LOCOS.gold }}>|</span>
        )}
      </div>

      {/* Author */}
      <div style={{ fontFamily: FONT_FAMILY.headline, fontSize: 22, color: LOCOS.gold, marginTop: 28, opacity: authorOpacity, letterSpacing: "0.08em" }}>— {author}</div>
    </div>
  );
};

// Playbook icon with path drawing
const PlaybookIcon: React.FC<{ type: string; color: string; progress: number }> = ({ type, color, progress }) => {
  const s = 42;
  const dashOffset = interpolate(progress, [0, 1], [200, 0]);
  const sp = { stroke: color, strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeDasharray: 200, strokeDashoffset: dashOffset };

  if (type === "balloon") return (
    <svg width={s} height={s} viewBox="0 0 42 42">
      <ellipse cx="21" cy="16" rx="11" ry="14" {...sp} />
      <path d="M21 30 L21 38 M17 38 L25 38" {...sp} />
      <ellipse cx="21" cy="16" rx="11" ry="14" stroke={color} strokeWidth="6" fill="none" opacity={0.1 * progress} style={{ filter: "blur(4px)" }} />
    </svg>
  );
  if (type === "eye") return (
    <svg width={s} height={s} viewBox="0 0 42 42">
      <path d="M3 21 Q21 7 39 21 Q21 35 3 21" {...sp} />
      <circle cx="21" cy="21" r="5" {...sp} />
      <circle cx="21" cy="21" r="2" fill={color} opacity={progress} />
    </svg>
  );
  return (
    <svg width={s} height={s} viewBox="0 0 42 42">
      <circle cx="21" cy="21" r="7" {...sp} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        return <line key={a} x1={21 + Math.cos(r)*10} y1={21 + Math.sin(r)*10} x2={21 + Math.cos(r)*15} y2={21 + Math.sin(r)*15} stroke={color} strokeWidth={2.5} strokeLinecap="round" opacity={progress} />;
      })}
    </svg>
  );
};

export const JunckerZitat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const QUOTE = "Wir beschliessen etwas, stellen das dann in den Raum und warten einige Zeit ab, was passiert. Wenn es dann kein grosses Geschrei gibt, weil die meisten gar nicht begreifen, was da beschlossen wurde, dann machen wir weiter.";

  const phase2Start = 118;
  const stampFrame = phase2Start - 18;

  const phase1Opacity = interpolate(frame, [phase2Start - 12, phase2Start], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleIn = spring({ frame: frame - phase2Start, fps, config: { damping: 10, stiffness: 80, mass: 0.8 } });

  return (
    <AbsoluteFill>
      <CameraMove zoomStart={frame < phase2Start ? 1.0 : 1.02} zoomEnd={frame < phase2Start ? 1.02 : 1.0} panY={frame < phase2Start ? -4 : 3}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <GoldParticles count={15} mode="ambient" />

          {/* Phase 1: Newspaper Quote */}
          {frame < phase2Start + 10 && (
            <div style={{ opacity: phase1Opacity, position: "relative" }}>
              <NewspaperQuote quote={QUOTE} author="Jean-Claude Juncker" delay={5} frame={frame} fps={fps} />

              {/* VERTRAULICH stamp */}
              {frame > stampFrame && (
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
                  <StampEffect text="VERTRAULICH" delay={stampFrame} color={LOCOS.red} fontSize={42} rotation={-15} />
                </div>
              )}

              <ImpactShockwave triggerFrame={stampFrame} x={960} y={460} color={LOCOS.red} maxRadius={180} />
            </div>
          )}

          {/* Phase 2: Playbook */}
          {frame >= phase2Start && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 55 }}>
              {/* Title */}
              <div style={{ opacity: titleIn, transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px) scale(${interpolate(titleIn, [0, 1], [0.9, 1])})` }}>
                <GradientShine text="DAS POLITISCHE PLAYBOOK" fontSize={48} delay={phase2Start} loop shineDuration={50} />
              </div>

              <GoldParticles count={30} mode="burst" burstX={960} burstY={350} burstFrame={phase2Start + 5} />

              {/* Steps with connecting dotted lines */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
                {PLAYBOOK_STEPS.map((step, i) => {
                  const stepDelay = phase2Start + 18 + i * 24;
                  const stepIn = spring({ frame: frame - stepDelay, fps, config: { damping: 10, stiffness: 100, mass: 0.7 } });
                  const iconDraw = spring({ frame: frame - stepDelay - 5, fps, config: { damping: 25, stiffness: 40, mass: 1.5 } });

                  return (
                    <React.Fragment key={i}>
                      {/* Dotted connector line */}
                      {i > 0 && (
                        <div style={{
                          height: 30, display: "flex", justifyContent: "center", opacity: stepIn * 0.4,
                        }}>
                          <svg width="2" height="30" viewBox="0 0 2 30">
                            <line x1="1" y1="0" x2="1" y2="30" stroke={LOCOS.gold} strokeWidth="2" strokeDasharray="4 4" />
                          </svg>
                        </div>
                      )}
                      <div style={{
                        display: "flex", alignItems: "center", gap: 28, opacity: stepIn, padding: "10px 0",
                        transform: `translateX(${interpolate(stepIn, [0, 1], [-80, 0])}px)`,
                        // Classified document feel
                        backgroundColor: `${LOCOS.darkBg}80`, borderLeft: `3px solid ${LOCOS.gold}40`, paddingLeft: 20, paddingRight: 30,
                      }}>
                        <div style={{ fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 52, width: 65, textAlign: "center", backgroundImage: `linear-gradient(180deg, ${LOCOS.goldLight}, ${LOCOS.gold})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 10px ${LOCOS.gold}40)` }}>
                          {i + 1}
                        </div>
                        <PlaybookIcon type={step.icon} color={LOCOS.goldLight} progress={iconDraw} />
                        <div style={{ fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 34, color: LOCOS.white, letterSpacing: "0.04em", textShadow: `0 0 30px ${LOCOS.gold}15` }}>{step.text}</div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </AbsoluteFill>
      </CameraMove>
      <FilmGrain opacity={0.05} vignette vignetteIntensity={0.5} />
    </AbsoluteFill>
  );
};
