import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";
import { DREI_SAEULEN } from "../data/transcript";
import { NumberCounter } from "../components/NumberCounter";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { GradientShine } from "../components/GradientShine";
import { ImpactShockwave } from "../components/ImpactShockwave";

// Isometric pillar with 3D side face
const IsoPillar: React.FC<{ title: string; subtitle: string; delay: number; index: number; icon: React.ReactNode }> = ({ title, subtitle, delay, index, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 45, mass: 1.2 } });
  const pillarHeight = interpolate(grow, [0, 1], [0, 340]);
  const labelIn = spring({ frame: frame - delay - 18, fps, config: { damping: 10, stiffness: 100, mass: 0.7 } });
  const shimmerPos = interpolate(frame - delay, [0, 60], [-100, 200], { extrapolateRight: "clamp" });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 320 }}>
      <div style={{ opacity: labelIn, transform: `translateY(${interpolate(labelIn, [0, 1], [25, 0])}px)`, marginBottom: 18 }}>
        <GradientShine text={title} fontSize={21} delay={delay + 18} shineDuration={35} style={{ textAlign: "center", lineHeight: 1.3 }} />
      </div>

      {/* Isometric pillar container */}
      <div style={{ position: "relative", width: 200, height: pillarHeight }}>
        {/* Side face (3D effect) */}
        <div style={{
          position: "absolute", top: 0, right: -30, width: 30, height: pillarHeight,
          background: `linear-gradient(180deg, ${LOCOS.goldDim} 0%, ${LOCOS.goldDim}80 100%)`,
          transform: "skewY(-30deg)", transformOrigin: "top left",
          borderRight: `1px solid ${LOCOS.gold}30`,
        }} />
        {/* Top face */}
        <div style={{
          position: "absolute", top: -15, left: 0, width: 200, height: 30,
          background: `linear-gradient(135deg, ${LOCOS.goldLight}80, ${LOCOS.gold}60)`,
          transform: "skewX(-30deg) scaleY(0.5)", transformOrigin: "bottom left",
          opacity: grow,
        }} />
        {/* Front face */}
        <div style={{
          width: 200, height: pillarHeight,
          background: `linear-gradient(180deg, ${LOCOS.goldLight} 0%, ${LOCOS.gold} 40%, ${LOCOS.goldDim} 100%)`,
          borderRadius: "4px 4px 0 0",
          boxShadow: `0 0 40px ${LOCOS.gold}25`,
          position: "relative", overflow: "hidden",
        }}>
          {/* Shimmer */}
          <div style={{ position: "absolute", top: 0, left: `${shimmerPos}%`, width: "25%", height: "100%", background: `linear-gradient(90deg, transparent, ${LOCOS.goldLight}25, transparent)`, transform: "skewX(-20deg)" }} />
          {/* Icon inside pillar */}
          <div style={{ position: "absolute", top: pillarHeight * 0.3, left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}>{icon}</div>
          {/* Number watermark */}
          <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 68, color: `${LOCOS.black}18` }}>{index + 1}</div>
        </div>
      </div>

      <div style={{ fontFamily: FONT_FAMILY.body, fontSize: 16, fontWeight: 400, color: LOCOS.textLight, textAlign: "center", marginTop: 16, opacity: labelIn, maxWidth: 280, lineHeight: 1.4, transform: `translateY(${interpolate(labelIn, [0, 1], [15, 0])}px)` }}>{subtitle}</div>
    </div>
  );
};

// Pillar icons
const GoldBarsIcon = () => (<svg width="50" height="50" viewBox="0 0 50 50"><path d="M8 38 L16 22 L34 22 L42 38 Z" fill="none" stroke={LOCOS.goldLight} strokeWidth="1.5" /><path d="M12 38 L18 26 L32 26 L38 38" fill="none" stroke={LOCOS.goldLight} strokeWidth="1" opacity="0.6" /><line x1="8" y1="38" x2="42" y2="38" stroke={LOCOS.goldLight} strokeWidth="1.5" /></svg>);
const GlobeIcon = () => (<svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" fill="none" stroke={LOCOS.goldLight} strokeWidth="1.5" /><ellipse cx="25" cy="25" rx="10" ry="18" fill="none" stroke={LOCOS.goldLight} strokeWidth="1" /><line x1="7" y1="25" x2="43" y2="25" stroke={LOCOS.goldLight} strokeWidth="1" /><line x1="25" y1="7" x2="25" y2="43" stroke={LOCOS.goldLight} strokeWidth="1" /></svg>);
const DocStackIcon = () => (<svg width="50" height="50" viewBox="0 0 50 50"><rect x="12" y="8" width="26" height="34" rx="2" fill="none" stroke={LOCOS.goldLight} strokeWidth="1.5" /><rect x="15" y="11" width="26" height="34" rx="2" fill="none" stroke={LOCOS.goldLight} strokeWidth="1" opacity="0.5" /><line x1="18" y1="18" x2="32" y2="18" stroke={LOCOS.goldLight} strokeWidth="1" opacity="0.6" /><line x1="18" y1="24" x2="32" y2="24" stroke={LOCOS.goldLight} strokeWidth="1" opacity="0.6" /><line x1="18" y1="30" x2="28" y2="30" stroke={LOCOS.goldLight} strokeWidth="1" opacity="0.6" /></svg>);

export const DreiSaeulen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Contrast scene: crumbling EU pillar first
  const euCrumble = spring({ frame: frame - 3, fps, config: { damping: 15, stiffness: 60, mass: 1 } });
  const euFadeOut = interpolate(frame, [30, 45], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mainFadeIn = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const counterDelay = 155;
  const counterIn = spring({ frame: frame - counterDelay, fps, config: { damping: 12, stiffness: 80, mass: 1 } });
  const icons = [<GoldBarsIcon />, <GlobeIcon />, <DocStackIcon />];

  return (
    <AbsoluteFill>
      <CameraMove zoomEnd={1.025} panY={-5}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <GoldParticles count={20} mode="ambient" />

          {/* Contrast: single EU pillar crumbling */}
          {frame < 50 && (
            <div style={{ position: "absolute", opacity: euFadeOut, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 20, color: LOCOS.silver, marginBottom: 12, letterSpacing: "0.06em" }}>NUR EIN STANDORT?</div>
              <div style={{
                width: 120, height: interpolate(euCrumble, [0, 1], [0, 200]),
                backgroundColor: LOCOS.silver, borderRadius: "4px 4px 0 0", position: "relative", overflow: "hidden",
              }}>
                {/* Cracks */}
                <svg width="120" height="200" viewBox="0 0 120 200" style={{ position: "absolute", inset: 0 }}>
                  <path d="M40 0 L35 40 L50 60 L30 100 L45 140 L35 200" stroke={LOCOS.black} strokeWidth="2" fill="none" opacity="0.4" />
                  <path d="M80 0 L85 30 L70 70 L90 120 L75 180" stroke={LOCOS.black} strokeWidth="1.5" fill="none" opacity="0.3" />
                </svg>
              </div>
              {/* Crumble particles */}
              <GoldParticles count={10} mode="burst" burstX={960} burstY={500} burstFrame={20} />
            </div>
          )}

          {/* Main content */}
          <div style={{ opacity: mainFadeIn }}>
            {/* Title */}
            <div style={{ textAlign: "center", marginBottom: 30, opacity: spring({ frame: frame - 40, fps, config: { damping: 15, stiffness: 80, mass: 0.8 } }) }}>
              <GradientShine text="DEINE 3-SAEULEN-STRATEGIE" fontSize={36} delay={40} loop shineDuration={55} />
            </div>

            {/* Isometric pillars */}
            <div style={{ display: "flex", gap: 60, justifyContent: "center", alignItems: "flex-end", marginBottom: 45 }}>
              {DREI_SAEULEN.map((s, i) => (
                <IsoPillar key={i} title={s.title} subtitle={s.subtitle} delay={i * 22 + 50} index={i} icon={icons[i]} />
              ))}
            </div>

            {/* Burst per pillar */}
            {DREI_SAEULEN.map((_, i) => (
              <React.Fragment key={`fx-${i}`}>
                <ImpactShockwave triggerFrame={i * 22 + 65} x={480 + i * 380} y={600} color={LOCOS.gold} maxRadius={100} />
                <GoldParticles count={12} mode="burst" burstX={480 + i * 380} burstY={500} burstFrame={i * 22 + 65} />
              </React.Fragment>
            ))}

            {/* Counters with progress rings */}
            <div style={{ display: "flex", gap: 80, justifyContent: "center", opacity: counterIn, transform: `translateY(${interpolate(counterIn, [0, 1], [35, 0])}px)` }}>
              {[
                { label: "Sparplan", prefix: "ab ", to: 50, suffix: " EUR/Monat" },
                { label: "Einmalanlage", prefix: "ab ", to: 5000, suffix: " EUR" },
                { label: "Anonymkauf", prefix: "bis ", to: 2000, suffix: " EUR" },
              ].map((item, i) => {
                const ringProgress = spring({ frame: frame - counterDelay - i * 8, fps, config: { damping: 20, stiffness: 40, mass: 1.5 } });
                const circumference = 2 * Math.PI * 22;
                return (
                  <div key={i} style={{ textAlign: "center", position: "relative" }}>
                    {/* Progress ring */}
                    <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: "absolute", left: "50%", top: -8, transform: "translateX(-50%) rotate(-90deg)" }}>
                      <circle cx="30" cy="30" r="22" fill="none" stroke={`${LOCOS.gold}20`} strokeWidth="2" />
                      <circle cx="30" cy="30" r="22" fill="none" stroke={LOCOS.gold} strokeWidth="2" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - ringProgress)} strokeLinecap="round" />
                    </svg>
                    <div style={{ fontFamily: FONT_FAMILY.body, fontSize: 14, color: LOCOS.silver, marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase", paddingTop: 50 }}>{item.label}</div>
                    <NumberCounter prefix={item.prefix} to={item.to} suffix={item.suffix} delay={counterDelay + i * 8} fontSize={28} />
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      </CameraMove>
      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.4} />
    </AbsoluteFill>
  );
};
