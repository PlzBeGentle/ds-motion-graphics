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
import { BuzzwordLowerThird } from "../components/BuzzwordLowerThird";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { ImpactShockwave } from "../components/ImpactShockwave";
import { GlitchEffect } from "../components/GlitchEffect";

// Chain link between steps
const ChainLink: React.FC<{ x1: number; x2: number; y: number; delay: number }> = ({
  x1, x2, y, delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 60, mass: 1 } });
  const width = interpolate(progress, [0, 1], [0, x2 - x1]);

  return (
    <svg style={{ position: "absolute", left: x1, top: y - 8, pointerEvents: "none" }} width={x2 - x1} height="16" viewBox={`0 0 ${x2 - x1} 16`}>
      {Array.from({ length: Math.floor(width / 20) }, (_, i) => (
        <ellipse key={i} cx={i * 20 + 10} cy={8} rx={8} ry={5} fill="none" stroke={LOCOS.gold} strokeWidth="2" opacity={0.6} />
      ))}
    </svg>
  );
};

// Bar with cracks
const Bar: React.FC<{
  label: string; color: string; maxHeight: number; delay: number; x: number; crackAt?: number;
}> = ({ label, color, maxHeight, delay, x, crackAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 50, mass: 1.2 } });
  const height = interpolate(grow, [0, 1], [0, maxHeight]);
  const showCrack = crackAt && frame > crackAt;

  return (
    <div style={{ position: "absolute", left: x, bottom: 370, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 17, color, opacity: grow, letterSpacing: "0.05em", whiteSpace: "nowrap", position: "absolute", bottom: height + 14 }}>
        {label}
      </div>
      <div style={{ width: 90, height, background: `linear-gradient(180deg, ${color}DD, ${color})`, borderRadius: "6px 6px 0 0", boxShadow: `0 0 25px ${color}40`, position: "absolute", bottom: 0, overflow: "hidden" }}>
        {showCrack && (
          <svg width="90" height={height} viewBox={`0 0 90 ${height}`} style={{ position: "absolute", top: 0, left: 0 }}>
            <path d={`M30 0 L25 ${height*0.2} L35 ${height*0.35} L22 ${height*0.5} L32 ${height*0.7} L28 ${height}`} stroke={LOCOS.black} strokeWidth="2" fill="none" opacity="0.6" />
            <path d={`M60 0 L65 ${height*0.15} L55 ${height*0.4} L62 ${height*0.6}`} stroke={LOCOS.black} strokeWidth="1.5" fill="none" opacity="0.4" />
          </svg>
        )}
      </div>
    </div>
  );
};

// 3D-perspective domino
const Domino: React.FC<{ delay: number; x: number; index: number }> = ({ delay, x, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fall = spring({ frame: frame - delay, fps, config: { damping: 6, stiffness: 80, mass: 0.5 } });
  const rotation = interpolate(fall, [0, 1], [0, 78]);

  return (
    <>
      {/* Shadow */}
      <div style={{
        position: "absolute", left: x + 5, bottom: 132,
        width: 24, height: 8, borderRadius: "50%",
        backgroundColor: "rgba(0,0,0,0.3)",
        transform: `scaleX(${0.5 + fall * 1.5})`,
        filter: "blur(3px)",
      }} />
      {/* Domino with 3D perspective */}
      <div style={{
        position: "absolute", left: x, bottom: 140,
        width: 28, height: 75,
        transformOrigin: "bottom right",
        transform: `rotate(${rotation}deg) perspective(200px) rotateY(8deg)`,
        transformStyle: "preserve-3d",
      }}>
        {/* Front face */}
        <div style={{
          width: "100%", height: "100%",
          background: `linear-gradient(135deg, ${LOCOS.white} 0%, #DDD 100%)`,
          border: `1.5px solid ${LOCOS.silver}60`,
          borderRadius: 4,
          boxShadow: `3px 4px 12px rgba(0,0,0,${0.2 + fall * 0.3})`,
          display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, padding: "10px 5px",
        }}>
          {Array.from({ length: Math.min(index + 1, 6) }, (_, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: LOCOS.black, opacity: 0.5 }} />
          ))}
        </div>
      </div>
    </>
  );
};

// Warning triangle
const WarningTriangle: React.FC<{ frame: number }> = ({ frame }) => {
  const rotation = frame * 2;
  const pulse = interpolate(Math.sin(frame * 0.3), [-1, 1], [0.7, 1]);
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" style={{ transform: `rotate(${Math.sin(rotation * 0.02) * 5}deg)`, opacity: pulse }}>
      <path d="M25 8 L45 42 L5 42 Z" fill="none" stroke={LOCOS.red} strokeWidth="3" strokeLinejoin="round" />
      <text x="25" y="36" textAnchor="middle" fill={LOCOS.red} fontSize="22" fontWeight="700" fontFamily={FONT_FAMILY.headline}>!</text>
    </svg>
  );
};

// Blood drip on falling price
const BloodDrip: React.FC<{ x: number; startFrame: number }> = ({ x, startFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  if (elapsed < 0) return null;

  const drips = [0, 8, 15, 22].map((d, i) => {
    const dripProgress = Math.max(0, (elapsed - d) / 30);
    const y = dripProgress * 60;
    const opacity = interpolate(dripProgress, [0, 0.5, 1], [0, 0.7, 0], { extrapolateRight: "clamp" });
    return (
      <div key={i} style={{
        position: "absolute", left: x + i * 18 + 10, top: y,
        width: 6, height: 12 + dripProgress * 8,
        backgroundColor: LOCOS.red, borderRadius: "0 0 50% 50%",
        opacity,
      }} />
    );
  });

  return <div style={{ position: "absolute", left: 0, bottom: 320, pointerEvents: "none" }}>{drips}</div>;
};

export const Zwangsverkauf: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const step1 = 5; const step2 = 40; const step3 = 80; const step4 = 120; const step5 = 165;
  const buzzwordDelay = 215;

  const cashPulse = frame > step3 && frame < step4 ? interpolate(Math.sin(frame * 0.4), [-1, 1], [0.05, 1]) : 0;
  const arrowIn = spring({ frame: frame - step3 - 12, fps, config: { damping: 10, stiffness: 120, mass: 0.6 } });
  const priceFall = spring({ frame: frame - step4, fps, config: { damping: 10, stiffness: 50, mass: 1.2 } });
  const priceHeight = interpolate(priceFall, [0, 1], [250, 45]);

  // Screen shake on domino impact
  const dominoImpact = step5 + 6 * 4 + 5;
  const impactShake = interpolate(frame, [dominoImpact, dominoImpact+1, dominoImpact+2, dominoImpact+3, dominoImpact+5], [0, 5, -4, 2, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <CameraMove zoomEnd={1.03} panX={5} panY={-3}>
        <GlitchEffect triggerFrame={dominoImpact} duration={4} intensity={0.4}>
          <AbsoluteFill style={{ transform: `translate(${impactShake}px, ${impactShake * 0.5}px)` }}>
            <GoldParticles count={12} mode="ambient" />

            <Bar label="BUCHGEWINN" color="#4CAF50" maxHeight={260} delay={step1} x={300} crackAt={step2 + 15} />
            <Bar label="STEUERFORDERUNG" color={LOCOS.red} maxHeight={190} delay={step2} x={460} />

            {/* Chain link between bars */}
            <ChainLink x1={395} x2={460} y={500} delay={step2 + 10} />

            {/* Step 3: Warning + KEIN CASH */}
            {frame > step3 && (
              <>
                <div style={{ position: "absolute", left: 650, top: 325, display: "flex", alignItems: "center", gap: 15 }}>
                  <WarningTriangle frame={frame} />
                  <div style={{
                    fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 48, color: LOCOS.red,
                    opacity: cashPulse, textShadow: `0 0 40px ${LOCOS.red}CC, 0 0 80px ${LOCOS.red}50`, letterSpacing: "0.08em",
                  }}>KEIN CASH</div>
                </div>

                {/* Chain + arrow to VERKAUFEN */}
                <ChainLink x1={560} x2={650} y={380} delay={step3 + 8} />

                <svg style={{ position: "absolute", left: 920, top: 348, opacity: arrowIn, transform: `translateX(${interpolate(arrowIn, [0, 1], [-20, 0])}px)` }} width="90" height="40" viewBox="0 0 90 40">
                  <defs><linearGradient id="ag"><stop offset="0%" stopColor={LOCOS.goldDim} /><stop offset="100%" stopColor={LOCOS.goldLight} /></linearGradient></defs>
                  <path d="M5 20 L65 20 M55 8 L70 20 L55 32" stroke="url(#ag)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div style={{ position: "absolute", left: 1030, top: 338, opacity: arrowIn }}>
                  <div style={{ fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 42, backgroundImage: `linear-gradient(90deg, ${LOCOS.gold}, ${LOCOS.goldLight})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.06em" }}>VERKAUFEN!</div>
                </div>
              </>
            )}

            {/* Step 4: Price falls + blood drip */}
            {frame > step4 && (
              <>
                <div style={{ position: "absolute", left: 1280, bottom: 370, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 17, color: LOCOS.red, letterSpacing: "0.06em", position: "absolute", bottom: priceHeight + 14 }}>PREIS</div>
                  <div style={{ width: 90, height: priceHeight, background: `linear-gradient(180deg, ${LOCOS.red}DD, ${LOCOS.red})`, borderRadius: "6px 6px 0 0", boxShadow: `0 0 25px ${LOCOS.red}40`, position: "absolute", bottom: 0 }} />
                </div>
                <BloodDrip x={1280} startFrame={step4 + 15} />
              </>
            )}

            {/* Step 5: 3D Dominos */}
            {frame > step5 && [0, 1, 2, 3, 4, 5, 6].map((i) => (
              <Domino key={i} delay={step5 + i * 4} x={370 + i * 48} index={i} />
            ))}

            {/* Shockwave when last domino falls */}
            <ImpactShockwave triggerFrame={dominoImpact} x={550} y={700} color={LOCOS.red} maxRadius={200} />
            <GoldParticles count={20} mode="burst" burstX={550} burstY={700} burstFrame={dominoImpact} />
          </AbsoluteFill>
        </GlitchEffect>
      </CameraMove>

      {frame > buzzwordDelay && <BuzzwordLowerThird text="ZWANGSLIQUIDATION" delay={buzzwordDelay} />}
      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.4} />
    </AbsoluteFill>
  );
};
