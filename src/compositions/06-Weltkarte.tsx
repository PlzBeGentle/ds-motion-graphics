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
import { DIVERSIFICATION_TARGETS } from "../data/transcript";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";
import { CameraMove } from "../components/CameraMove";

// Simplified but recognizable continent SVG paths (scaled to 1920x1080 viewport)
const CONTINENT_PATHS = {
  // Europe (will be highlighted red)
  europe:
    "M880,280 L890,270 L910,265 L930,260 L955,265 L970,275 L980,285 L985,300 L975,315 L965,330 L960,345 L955,360 L950,375 L940,385 L925,395 L910,405 L895,410 L880,405 L870,395 L865,380 L860,365 L855,350 L858,335 L862,320 L868,305 L875,290 Z",
  // Scandinavia
  scandinavia:
    "M900,200 L910,195 L925,205 L935,220 L940,240 L935,255 L925,260 L910,255 L900,245 L895,230 L895,215 Z",
  // UK/Ireland
  uk: "M845,275 L855,270 L860,280 L858,295 L850,300 L842,295 L840,285 Z",
  // North America
  northAmerica:
    "M180,200 L220,180 L270,175 L320,180 L370,195 L400,220 L420,250 L430,280 L425,310 L410,340 L390,360 L365,375 L340,385 L310,380 L280,370 L250,355 L225,335 L210,310 L200,280 L190,250 L185,225 Z",
  // Central America
  centralAmerica:
    "M340,385 L355,395 L365,410 L370,425 L360,435 L350,430 L345,415 L340,400 Z",
  // South America
  southAmerica:
    "M370,440 L395,430 L420,440 L440,460 L450,490 L455,520 L450,550 L440,575 L425,600 L410,620 L395,635 L385,640 L380,630 L375,610 L370,585 L365,555 L360,525 L358,495 L360,465 Z",
  // Africa
  africa:
    "M870,420 L900,410 L930,415 L955,430 L970,450 L978,475 L975,505 L965,535 L950,560 L935,580 L920,595 L905,600 L890,595 L878,580 L868,555 L862,530 L858,500 L856,470 L860,445 Z",
  // Middle East
  middleEast:
    "M980,360 L1010,350 L1040,355 L1060,370 L1065,390 L1055,405 L1035,415 L1010,420 L990,410 L978,395 L975,375 Z",
  // Russia / Central Asia
  russia:
    "M980,200 L1020,190 L1080,185 L1140,190 L1200,200 L1260,210 L1320,205 L1370,200 L1400,210 L1390,230 L1370,250 L1340,260 L1300,265 L1260,260 L1220,250 L1180,245 L1140,250 L1100,255 L1060,260 L1020,265 L990,260 L975,245 L970,225 Z",
  // India
  india:
    "M1120,380 L1150,370 L1175,380 L1190,400 L1195,425 L1185,450 L1170,470 L1150,480 L1135,475 L1120,460 L1110,435 L1108,410 L1112,395 Z",
  // China / East Asia
  eastAsia:
    "M1220,270 L1260,260 L1300,265 L1340,275 L1370,290 L1390,310 L1395,335 L1385,360 L1365,375 L1340,380 L1310,375 L1280,365 L1255,350 L1235,330 L1225,310 L1220,290 Z",
  // Southeast Asia
  southeastAsia:
    "M1300,400 L1330,390 L1360,400 L1380,415 L1395,435 L1400,455 L1390,470 L1370,475 L1350,470 L1330,455 L1315,435 L1305,418 Z",
  // Japan
  japan:
    "M1420,280 L1430,270 L1440,280 L1445,300 L1440,320 L1430,330 L1420,325 L1415,310 L1415,295 Z",
  // Australia
  australia:
    "M1340,540 L1380,530 L1420,535 L1455,545 L1480,560 L1490,580 L1485,600 L1470,615 L1445,625 L1415,625 L1385,620 L1360,605 L1345,585 L1338,565 Z",
};

// EU center for pulsing
const EU_CENTER = { x: 920, y: 340 };

const WorldMap: React.FC<{
  frame: number;
  fps: number;
  euPulse: number;
  mapDrawProgress: number;
}> = ({ frame, fps, euPulse, mapDrawProgress }) => {
  const nonEuPaths = Object.entries(CONTINENT_PATHS).filter(
    ([key]) => !["europe", "scandinavia", "uk"].includes(key)
  );
  const euPaths = Object.entries(CONTINENT_PATHS).filter(([key]) =>
    ["europe", "scandinavia", "uk"].includes(key)
  );

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <defs>
        {/* EU red glow filter */}
        <filter id="eu-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gold glow filter for target dots */}
        <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Non-EU continents — path drawing animation */}
      {nonEuPaths.map(([key, d]) => (
        <path
          key={key}
          d={d}
          fill={`${LOCOS.silver}12`}
          stroke={LOCOS.silver}
          strokeWidth="1.5"
          opacity={0.35}
          strokeDasharray="3000"
          strokeDashoffset={interpolate(
            mapDrawProgress,
            [0, 1],
            [3000, 0]
          )}
        />
      ))}

      {/* EU continents — red glow + pulse */}
      {euPaths.map(([key, d]) => (
        <React.Fragment key={key}>
          {/* Glow layer */}
          <path
            d={d}
            fill={`${LOCOS.red}${Math.round(15 + euPulse * 20)
              .toString(16)
              .padStart(2, "0")}`}
            stroke={LOCOS.red}
            strokeWidth="3"
            opacity={0.3 + euPulse * 0.3}
            filter="url(#eu-glow)"
            strokeDasharray="3000"
            strokeDashoffset={interpolate(
              mapDrawProgress,
              [0, 1],
              [3000, 0]
            )}
          />
          {/* Main */}
          <path
            d={d}
            fill={`${LOCOS.red}25`}
            stroke={LOCOS.red}
            strokeWidth="1.5"
            opacity={0.5 + euPulse * 0.3}
            strokeDasharray="3000"
            strokeDashoffset={interpolate(
              mapDrawProgress,
              [0, 1],
              [3000, 0]
            )}
          />
        </React.Fragment>
      ))}

      {/* EU danger zone circle */}
      <circle
        cx={EU_CENTER.x}
        cy={EU_CENTER.y}
        r={90 + euPulse * 10}
        fill="none"
        stroke={LOCOS.red}
        strokeWidth="1.5"
        opacity={0.15 + euPulse * 0.15}
        strokeDasharray="8 6"
      />
    </svg>
  );
};

// Animated flight arrow with traveling dot
const FlightArrow: React.FC<{
  targetX: number;
  targetY: number;
  delay: number;
  frame: number;
  fps: number;
}> = ({ targetX, targetY, delay, frame, fps }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 40, mass: 1.5 },
  });

  if (progress < 0.01) return null;

  const startX = EU_CENTER.x;
  const startY = EU_CENTER.y;

  // Curved control point
  const cpX = (startX + targetX) / 2;
  const cpY = Math.min(startY, targetY) - 100;

  // Bezier point at progress t
  const t = Math.min(progress, 1);
  const dotX =
    (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * targetX;
  const dotY =
    (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * targetY;

  const pathD = `M ${startX} ${startY} Q ${cpX} ${cpY} ${targetX} ${targetY}`;

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    >
      <defs>
        <linearGradient
          id={`flight-${targetX}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={LOCOS.gold} stopOpacity="0.1" />
          <stop offset="50%" stopColor={LOCOS.goldLight} stopOpacity="0.8" />
          <stop offset="100%" stopColor={LOCOS.goldLight} stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Glow trail */}
      <path
        d={pathD}
        stroke={LOCOS.gold}
        strokeWidth="6"
        fill="none"
        opacity={0.1}
        strokeDasharray="2000"
        strokeDashoffset={2000 - 2000 * progress}
        style={{ filter: "blur(4px)" }}
      />
      {/* Main trail */}
      <path
        d={pathD}
        stroke={`url(#flight-${targetX})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="2000"
        strokeDashoffset={2000 - 2000 * progress}
        strokeLinecap="round"
      />
      {/* Traveling dot */}
      {progress > 0.02 && progress < 0.95 && (
        <>
          <circle
            cx={dotX}
            cy={dotY}
            r={6}
            fill={LOCOS.goldLight}
            opacity={0.3}
            style={{ filter: "blur(3px)" }}
          />
          <circle cx={dotX} cy={dotY} r={3} fill={LOCOS.goldLight} />
        </>
      )}
    </svg>
  );
};

export const Weltkarte: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const euPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0, 1]);

  // Map draws in first
  const mapDraw = spring({
    frame: frame - 3,
    fps,
    config: { damping: 30, stiffness: 20, mass: 3 },
  });

  return (
    <AbsoluteFill>
      <CameraMove zoomStart={1.05} zoomEnd={1.0} panX={-5} panY={3}>
        <AbsoluteFill>
          <GoldParticles count={12} mode="ambient" />

          {/* World map with path drawing */}
          <WorldMap
            frame={frame}
            fps={fps}
            euPulse={euPulse}
            mapDrawProgress={mapDraw}
          />

          {/* Flight arrows */}
          {DIVERSIFICATION_TARGETS.map((target, i) => (
            <FlightArrow
              key={i}
              targetX={target.x}
              targetY={target.y}
              delay={40 + i * 22}
              frame={frame}
              fps={fps}
            />
          ))}

          {/* Target dots and labels */}
          {DIVERSIFICATION_TARGETS.map((target, i) => {
            const dotDelay = 60 + i * 22;
            const dotIn = spring({
              frame: frame - dotDelay,
              fps,
              config: { damping: 8, stiffness: 120, mass: 0.5 },
            });

            const ringPulse = interpolate(
              Math.sin((frame - dotDelay) * 0.12),
              [-1, 1],
              [0.8, 1.3]
            );

            return (
              <React.Fragment key={i}>
                {/* Outer ring pulse */}
                <div
                  style={{
                    position: "absolute",
                    left: target.x - 16,
                    top: target.y - 16,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `2px solid #4CAF5060`,
                    opacity: dotIn * 0.6,
                    transform: `scale(${frame > dotDelay ? ringPulse : 0})`,
                  }}
                />
                {/* Green dot */}
                <div
                  style={{
                    position: "absolute",
                    left: target.x - 8,
                    top: target.y - 8,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: "#4CAF50",
                    boxShadow: "0 0 25px #4CAF5080, 0 0 50px #4CAF5030",
                    opacity: dotIn,
                    transform: `scale(${interpolate(dotIn, [0, 1], [0, 1])})`,
                  }}
                />
                {/* Label with background */}
                <div
                  style={{
                    position: "absolute",
                    left: target.x + 18,
                    top: target.y - 14,
                    fontFamily: FONT_FAMILY.headline,
                    fontWeight: 700,
                    fontSize: 20,
                    color: LOCOS.white,
                    opacity: dotIn,
                    letterSpacing: "0.06em",
                    textShadow:
                      "0 0 15px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6)",
                    transform: `translateX(${interpolate(
                      dotIn,
                      [0, 1],
                      [10, 0]
                    )}px)`,
                  }}
                >
                  {target.name}
                </div>

                {/* Particle burst on arrival */}
                <GoldParticles
                  count={15}
                  mode="burst"
                  burstX={target.x}
                  burstY={target.y}
                  burstFrame={dotDelay}
                />
              </React.Fragment>
            );
          })}

          {/* EU label */}
          <div
            style={{
              position: "absolute",
              left: EU_CENTER.x - 45,
              top: EU_CENTER.y + 80,
              fontFamily: FONT_FAMILY.headline,
              fontWeight: 700,
              fontSize: 24,
              color: LOCOS.red,
              opacity: 0.4 + euPulse * 0.5,
              letterSpacing: "0.12em",
              textShadow: `0 0 20px ${LOCOS.red}60`,
            }}
          >
            EU-ZONE
          </div>
        </AbsoluteFill>
      </CameraMove>

      <FilmGrain opacity={0.04} vignette vignetteIntensity={0.45} />
    </AbsoluteFill>
  );
};
