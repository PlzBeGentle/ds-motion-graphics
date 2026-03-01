import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";
import { DIVERSIFICATION_TARGETS } from "../data/transcript";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";
import { HexGrid } from "../components/HexGrid";
import { RadarSweep } from "../components/RadarSweep";
import { ImpactShockwave } from "../components/ImpactShockwave";

const EU_CENTER = { x: 920, y: 340 };

const CONTINENT_PATHS: Record<string, string> = {
  europe: "M880,280 L890,270 L910,265 L930,260 L955,265 L970,275 L980,285 L985,300 L975,315 L965,330 L960,345 L955,360 L950,375 L940,385 L925,395 L910,405 L895,410 L880,405 L870,395 L865,380 L860,365 L855,350 L858,335 L862,320 L868,305 L875,290 Z",
  scandinavia: "M900,200 L910,195 L925,205 L935,220 L940,240 L935,255 L925,260 L910,255 L900,245 L895,230 L895,215 Z",
  uk: "M845,275 L855,270 L860,280 L858,295 L850,300 L842,295 L840,285 Z",
  northAmerica: "M180,200 L220,180 L270,175 L320,180 L370,195 L400,220 L420,250 L430,280 L425,310 L410,340 L390,360 L365,375 L340,385 L310,380 L280,370 L250,355 L225,335 L210,310 L200,280 L190,250 L185,225 Z",
  southAmerica: "M370,440 L395,430 L420,440 L440,460 L450,490 L455,520 L450,550 L440,575 L425,600 L410,620 L395,635 L385,640 L380,630 L375,610 L370,585 L365,555 L360,525 L358,495 L360,465 Z",
  africa: "M870,420 L900,410 L930,415 L955,430 L970,450 L978,475 L975,505 L965,535 L950,560 L935,580 L920,595 L905,600 L890,595 L878,580 L868,555 L862,530 L858,500 L856,470 L860,445 Z",
  eastAsia: "M1220,270 L1260,260 L1300,265 L1340,275 L1370,290 L1390,310 L1395,335 L1385,360 L1365,375 L1340,380 L1310,375 L1280,365 L1255,350 L1235,330 L1225,310 L1220,290 Z",
  india: "M1120,380 L1150,370 L1175,380 L1190,400 L1195,425 L1185,450 L1170,470 L1150,480 L1135,475 L1120,460 L1110,435 L1108,410 L1112,395 Z",
  australia: "M1340,540 L1380,530 L1420,535 L1455,545 L1480,560 L1490,580 L1485,600 L1470,615 L1445,625 L1415,625 L1385,620 L1360,605 L1345,585 L1338,565 Z",
};

// Shield icon for safe harbors
const ShieldIcon: React.FC<{ x: number; y: number; opacity: number }> = ({ x, y, opacity }) => (
  <svg width="28" height="32" viewBox="0 0 28 32" style={{ position: "absolute", left: x - 14, top: y - 32, opacity }}>
    <path d="M14 2 L26 8 L26 18 Q26 28 14 30 Q2 28 2 18 L2 8 Z" fill="none" stroke="#4CAF50" strokeWidth="2" />
    <path d="M9 16 L13 20 L20 12" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Weltkarte: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const euPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0, 1]);
  const mapDraw = spring({ frame: frame - 3, fps, config: { damping: 30, stiffness: 20, mass: 3 } });

  const euPaths = ["europe", "scandinavia", "uk"];

  return (
    <AbsoluteFill>
      <CameraMove zoomStart={1.05} zoomEnd={1.0} panX={-5} panY={3}>
        <AbsoluteFill>
          {/* HexGrid overlay */}
          <HexGrid delay={5} opacity={0.06} />
          <GoldParticles count={12} mode="ambient" />

          {/* World map SVG */}
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <filter id="eu-glow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Non-EU */}
            {Object.entries(CONTINENT_PATHS).filter(([k]) => !euPaths.includes(k)).map(([k, d]) => (
              <path key={k} d={d} fill={`${LOCOS.silver}12`} stroke={LOCOS.silver} strokeWidth="1.5" opacity={0.35} strokeDasharray="3000" strokeDashoffset={interpolate(mapDraw, [0, 1], [3000, 0])} />
            ))}
            {/* EU — red glow */}
            {Object.entries(CONTINENT_PATHS).filter(([k]) => euPaths.includes(k)).map(([k, d]) => (
              <React.Fragment key={k}>
                <path d={d} fill={`${LOCOS.red}20`} stroke={LOCOS.red} strokeWidth="3" opacity={0.3 + euPulse * 0.3} filter="url(#eu-glow2)" strokeDasharray="3000" strokeDashoffset={interpolate(mapDraw, [0, 1], [3000, 0])} />
                <path d={d} fill={`${LOCOS.red}15`} stroke={LOCOS.red} strokeWidth="1.5" opacity={0.5 + euPulse * 0.3} strokeDasharray="3000" strokeDashoffset={interpolate(mapDraw, [0, 1], [3000, 0])} />
              </React.Fragment>
            ))}
            <circle cx={EU_CENTER.x} cy={EU_CENTER.y} r={90 + euPulse * 10} fill="none" stroke={LOCOS.red} strokeWidth="1.5" opacity={0.15 + euPulse * 0.15} strokeDasharray="8 6" />

            {/* Flight arrows */}
            {DIVERSIFICATION_TARGETS.map((t, i) => {
              const delay = 40 + i * 22;
              const p = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 40, mass: 1.5 } });
              if (p < 0.01) return null;
              const cpX = (EU_CENTER.x + t.x) / 2;
              const cpY = Math.min(EU_CENTER.y, t.y) - 100;
              const pathD = `M ${EU_CENTER.x} ${EU_CENTER.y} Q ${cpX} ${cpY} ${t.x} ${t.y}`;
              // Traveling dot position
              const tt = Math.min(p, 1);
              const dotX = (1-tt)*(1-tt)*EU_CENTER.x + 2*(1-tt)*tt*cpX + tt*tt*t.x;
              const dotY = (1-tt)*(1-tt)*EU_CENTER.y + 2*(1-tt)*tt*cpY + tt*tt*t.y;

              return (
                <g key={i}>
                  <path d={pathD} stroke={LOCOS.gold} strokeWidth="6" fill="none" opacity={0.08} strokeDasharray="2000" strokeDashoffset={2000 - 2000*p} style={{ filter: "blur(4px)" }} />
                  <path d={pathD} stroke={LOCOS.goldLight} strokeWidth="2" fill="none" strokeDasharray="2000" strokeDashoffset={2000 - 2000*p} strokeLinecap="round" />
                  {/* Data stream dots along path */}
                  {p > 0.3 && [0.2, 0.4, 0.6, 0.8].map((frac, j) => {
                    const streamT = (frac + (frame * 0.01) % 1) % 1 * p;
                    const sx = (1-streamT)*(1-streamT)*EU_CENTER.x + 2*(1-streamT)*streamT*cpX + streamT*streamT*t.x;
                    const sy = (1-streamT)*(1-streamT)*EU_CENTER.y + 2*(1-streamT)*streamT*cpY + streamT*streamT*t.y;
                    return <circle key={j} cx={sx} cy={sy} r={1.5} fill={LOCOS.goldLight} opacity={0.4} />;
                  })}
                  {p > 0.02 && p < 0.95 && <>
                    <circle cx={dotX} cy={dotY} r={6} fill={LOCOS.goldLight} opacity={0.3} style={{ filter: "blur(3px)" }} />
                    <circle cx={dotX} cy={dotY} r={3} fill={LOCOS.goldLight} />
                  </>}
                </g>
              );
            })}
          </svg>

          {/* Radar sweep from EU */}
          <RadarSweep centerX={EU_CENTER.x} centerY={EU_CENTER.y} radius={500} delay={15} color={LOCOS.gold} speed={2} />

          {/* Target dots, shields, labels */}
          {DIVERSIFICATION_TARGETS.map((t, i) => {
            const dotDelay = 60 + i * 22;
            const dotIn = spring({ frame: frame - dotDelay, fps, config: { damping: 8, stiffness: 120, mass: 0.5 } });
            const ringPulse = interpolate(Math.sin((frame - dotDelay) * 0.12), [-1, 1], [0.8, 1.3]);
            return (
              <React.Fragment key={i}>
                <div style={{ position: "absolute", left: t.x - 16, top: t.y - 16, width: 32, height: 32, borderRadius: "50%", border: "2px solid #4CAF5060", opacity: dotIn * 0.6, transform: `scale(${frame > dotDelay ? ringPulse : 0})` }} />
                <div style={{ position: "absolute", left: t.x - 8, top: t.y - 8, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#4CAF50", boxShadow: "0 0 25px #4CAF5080", opacity: dotIn, transform: `scale(${interpolate(dotIn, [0, 1], [0, 1])})` }} />
                <ShieldIcon x={t.x} y={t.y} opacity={dotIn} />
                <div style={{ position: "absolute", left: t.x + 18, top: t.y - 14, fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 20, color: LOCOS.white, opacity: dotIn, letterSpacing: "0.06em", textShadow: "0 0 15px rgba(0,0,0,0.9)", transform: `translateX(${interpolate(dotIn, [0, 1], [10, 0])}px)` }}>{t.name}</div>
                <ImpactShockwave triggerFrame={dotDelay} x={t.x} y={t.y} color="#4CAF50" maxRadius={80} />
                <GoldParticles count={12} mode="burst" burstX={t.x} burstY={t.y} burstFrame={dotDelay} />
              </React.Fragment>
            );
          })}

          <div style={{ position: "absolute", left: EU_CENTER.x - 45, top: EU_CENTER.y + 80, fontFamily: FONT_FAMILY.headline, fontWeight: 700, fontSize: 24, color: LOCOS.red, opacity: 0.4 + euPulse * 0.5, letterSpacing: "0.12em", textShadow: `0 0 20px ${LOCOS.red}60` }}>EU-ZONE</div>
        </AbsoluteFill>
      </CameraMove>
      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.45} />
    </AbsoluteFill>
  );
};
