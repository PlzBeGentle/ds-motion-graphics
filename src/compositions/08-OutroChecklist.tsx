import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";
import { CHECKLIST_ITEMS } from "../data/transcript";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { GradientShine } from "../components/GradientShine";
import { ImpactShockwave } from "../components/ImpactShockwave";

const CheckItem: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const itemIn = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 100, mass: 0.7 } });

  // Handwritten check — path drawing animation
  const checkDraw = spring({ frame: frame - delay - 10, fps, config: { damping: 15, stiffness: 80, mass: 0.8 } });
  const checkDashOffset = interpolate(checkDraw, [0, 1], [60, 0]);

  const translateX = interpolate(itemIn, [0, 1], [80, 0]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, opacity: itemIn, transform: `translateX(${translateX}px)`, marginBottom: 34 }}>
      <div style={{ width: 50, height: 50, border: `3px solid ${LOCOS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: checkDraw > 0.5 ? `0 0 15px ${LOCOS.gold}40` : "none" }}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          {/* Glow */}
          <path d="M6 16 L13 23 L26 9" stroke={LOCOS.gold} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={checkDraw * 0.2} style={{ filter: "blur(3px)" }} />
          {/* Handwritten check — path draw */}
          <path d="M6 16 L13 23 L26 9" stroke={LOCOS.goldLight} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset={checkDashOffset} />
        </svg>
      </div>
      <div style={{ fontFamily: FONT_FAMILY.body, fontWeight: 700, fontSize: 38, color: LOCOS.white, letterSpacing: "0.02em" }}>{text}</div>
    </div>
  );
};

export const OutroChecklist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background color shift: dark red → dark gold as checks complete
  const bgShift = interpolate(frame, [0, 30, 60, 90], [0, 0.1, 0.3, 0.6], { extrapolateRight: "clamp" });
  const bgColor = `rgba(${Math.round(26 + bgShift * 20)}, ${Math.round(25 + bgShift * 15)}, ${Math.round(20 + bgShift * 8)}, 0)`;

  const ctaDelay = 100;
  const ctaIn = spring({ frame: frame - ctaDelay, fps, config: { damping: 10, stiffness: 80, mass: 0.8 } });
  const bellSwing = frame > ctaDelay ? interpolate(Math.sin((frame - ctaDelay) * 0.3), [-1, 1], [-18, 18]) : 0;

  // Pulsing CTA button
  const ctaPulse = frame > ctaDelay + 15 ? interpolate(Math.sin((frame - ctaDelay) * 0.15), [-1, 1], [0.95, 1.05]) : 1;

  const logoIn = spring({ frame: frame - ctaDelay - 12, fps, config: { damping: 20, stiffness: 60, mass: 1 } });

  return (
    <AbsoluteFill>
      {/* Subtle bg color shift overlay */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${LOCOS.gold}${Math.round(bgShift * 8).toString(16).padStart(2, "0")} 0%, transparent 70%)`, pointerEvents: "none" }} />

      <CameraMove zoomStart={1.03} zoomEnd={1.0} panY={4}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100 }}>
          <GoldParticles count={25} mode="ambient" />

          <div style={{ marginBottom: 50 }}>
            {CHECKLIST_ITEMS.map((item, i) => (
              <CheckItem key={i} text={item} delay={i * 28 + 5} />
            ))}
          </div>

          {/* Shockwave per check */}
          {CHECKLIST_ITEMS.map((_, i) => (
            <React.Fragment key={`fx-${i}`}>
              <ImpactShockwave triggerFrame={i * 28 + 18} x={530} y={340 + i * 65} color={LOCOS.gold} maxRadius={60} duration={10} />
              <GoldParticles count={10} mode="burst" burstX={530} burstY={340 + i * 65} burstFrame={i * 28 + 18} />
            </React.Fragment>
          ))}

          {/* Pulsing CTA */}
          <div style={{
            display: "flex", alignItems: "center", gap: 22, opacity: ctaIn,
            transform: `translateY(${interpolate(ctaIn, [0, 1], [35, 0])}px) scale(${ctaPulse})`,
            backgroundColor: `${LOCOS.gold}15`, border: `2px solid ${LOCOS.gold}40`,
            padding: "14px 36px", borderRadius: 8,
            boxShadow: `0 0 ${20 + (ctaPulse - 0.95) * 200}px ${LOCOS.gold}30`,
          }}>
            <svg width="44" height="44" viewBox="0 0 24 24" style={{ transform: `rotate(${bellSwing}deg)`, transformOrigin: "top center" }}>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke={LOCOS.goldLight} strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={LOCOS.gold} strokeWidth="5" fill="none" opacity="0.15" style={{ filter: "blur(3px)" }} />
            </svg>
            <GradientShine text="JETZT HANDELN" fontSize={34} delay={ctaDelay} loop shineDuration={35} />
          </div>

          {/* LOCOS Logo */}
          <div style={{ position: "absolute", bottom: 50, opacity: logoIn, fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 30, letterSpacing: "0.25em", backgroundImage: `linear-gradient(90deg, ${LOCOS.goldDim}, ${LOCOS.gold}, ${LOCOS.goldDim})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 15px ${LOCOS.gold}30)` }}>LOCOS</div>
        </AbsoluteFill>
      </CameraMove>
      <FilmGrain opacity={0.05} vignette vignetteIntensity={0.5} />
    </AbsoluteFill>
  );
};
