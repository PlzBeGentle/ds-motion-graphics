import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from "remotion";

type DataPoint = {year: number; value: number};

type BloombergChart3DProps = {
  title: string;
  subtitle: string;
  data: DataPoint[];
  yAxisLabel?: string;
  colorScheme?: "amber" | "red" | "green";
  variant?: "fullscreen" | "overlay";
  peakAnnotation?: {value: number; year: number; label?: string};
  currentAnnotation?: {value: number; label?: string; direction?: "up" | "down"};
};

export const BloombergChart3D: React.FC<BloombergChart3DProps> = ({
  title,
  subtitle,
  data,
  yAxisLabel = "%",
  colorScheme = "amber",
  variant = "fullscreen",
  peakAnnotation,
  currentAnnotation,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Layout constants
  const PANEL_WIDTH_FULLSCREEN = 1520;
  const PANEL_HEIGHT_FULLSCREEN = 620;
  const PANEL_WIDTH_OVERLAY = 1100;
  const PANEL_HEIGHT_OVERLAY = 480;

  const PANEL_WIDTH = variant === "fullscreen" ? PANEL_WIDTH_FULLSCREEN : PANEL_WIDTH_OVERLAY;
  const PANEL_HEIGHT = variant === "fullscreen" ? PANEL_HEIGHT_FULLSCREEN : PANEL_HEIGHT_OVERLAY;

  const CHART_PADDING_TOP = 90;
  const CHART_PADDING_LEFT = 110;
  const CHART_PADDING_RIGHT = 80;  // bubble sits in top-right above chart, not beside
  const CHART_PADDING_BOTTOM = 100;

  const chartWidth = PANEL_WIDTH - CHART_PADDING_LEFT - CHART_PADDING_RIGHT;
  const chartHeight = PANEL_HEIGHT - CHART_PADDING_TOP - CHART_PADDING_BOTTOM;

  // Color scheme
  const COLORS = {
    amber: {
      main: "#FFB020",
      alpha: "rgba(255, 176, 32, 0.4)",
      glow: "rgba(255, 176, 32, 0.8)",
    },
    red: {
      main: "#FF4540",
      alpha: "rgba(255, 69, 64, 0.4)",
      glow: "rgba(255, 69, 64, 0.8)",
    },
    green: {
      main: "#5DEB93",
      alpha: "rgba(93, 235, 147, 0.4)",
      glow: "rgba(93, 235, 147, 0.8)",
    },
  };
  const {main: colorMain, alpha: colorMainAlpha, glow: colorMainGlow} = COLORS[colorScheme];

  // Animation phases
  const panelSpring = spring({frame, fps, config: {damping: 14, stiffness: 85, mass: 0.9}});
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1]);
  const panelBlur = interpolate(panelSpring, [0, 1], [14, 0]);
  const panelY = interpolate(panelSpring, [0, 1], [-40, 0]);

  const axisProgress = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const lineDrawProgress = interpolate(frame, [35, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const peakSpring = spring({frame: frame - 85, fps, config: {damping: 10, stiffness: 140, mass: 0.6}});
  const peakOpacity = interpolate(peakSpring, [0, 1], [0, 1]);
  const peakY = interpolate(peakSpring, [0, 1], [20, 0]);

  const currentSpring = spring({frame: frame - 95, fps, config: {damping: 10, stiffness: 140, mass: 0.6}});
  const currentOpacity = interpolate(currentSpring, [0, 1], [0, 1]);
  const currentScale = interpolate(currentSpring, [0, 1], [0.8, 1]);

  // Y-axis scale — yMax rounded up to nearest multiple of 6 so yStep is integer
  const rawMax = Math.max(...data.map(d => d.value)) * 1.05;
  const yMax = Math.ceil(rawMax / 2) * 2;  // round up to nearest 2
  const yMin = 0;
  const yStep = yMax / 6;

  const yToPixel = (v: number) => CHART_PADDING_TOP + chartHeight * (1 - (v - yMin) / (yMax - yMin));

  // X-axis scale
  const xMin = data[0].year;
  const xMax = data[data.length - 1].year;
  const xToPixel = (year: number) => CHART_PADDING_LEFT + chartWidth * (year - xMin) / (xMax - xMin);

  // Calculate path length for polyline animation
  let pathLength = 0;
  const pathPoints = [];
  for (let i = 0; i < data.length; i++) {
    const x = xToPixel(data[i].year);
    const y = yToPixel(data[i].value);
    pathPoints.push(`${x},${y}`);
  }

  for (let i = 1; i < data.length; i++) {
    const dx = xToPixel(data[i].year) - xToPixel(data[i - 1].year);
    const dy = yToPixel(data[i].value) - yToPixel(data[i - 1].value);
    pathLength += Math.sqrt(dx * dx + dy * dy);
  }

  // Calculate glow head position
  const currentPathPos = pathLength * lineDrawProgress;
  let accumulated = 0;
  let headX = xToPixel(data[0].year);
  let headY = yToPixel(data[0].value);
  
  if (data.length > 1) {
    for (let i = 1; i < data.length; i++) {
      const dx = xToPixel(data[i].year) - xToPixel(data[i - 1].year);
      const dy = yToPixel(data[i].value) - yToPixel(data[i - 1].value);
      const segLen = Math.sqrt(dx * dx + dy * dy);
      
      if (accumulated + segLen >= currentPathPos) {
        const t = (currentPathPos - accumulated) / segLen;
        headX = xToPixel(data[i - 1].year) + dx * t;
        headY = yToPixel(data[i - 1].value) + dy * t;
        break;
      }
      accumulated += segLen;
    }
  }

  // X-axis tick years (sample every few years)
  const xTickYears = [];
  const yearRange = xMax - xMin;
  const step = Math.ceil(yearRange / 6); // Show about 6-7 ticks
  
  for (let year = xMin; year <= xMax; year += step) {
    xTickYears.push(year);
  }
  // Ensure we include the last year
  if (xTickYears[xTickYears.length - 1] !== xMax) {
    xTickYears.push(xMax);
  }

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)",
        perspective: "1800px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transform: variant === "fullscreen"
            ? "rotateX(3deg) rotateY(-12deg)"
            : "rotateX(3deg) rotateY(-14deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: PANEL_WIDTH,
            height: PANEL_HEIGHT,
            left: variant === "fullscreen" ? "50%" : "auto",
            right: variant === "fullscreen" ? "auto" : 60,
            top: variant === "fullscreen" ? "50%" : 240,
            marginLeft: variant === "fullscreen" ? -PANEL_WIDTH / 2 : 0,
            marginTop: variant === "fullscreen" ? -PANEL_HEIGHT / 2 : 0,
            backgroundColor: "rgba(18, 16, 12, 0.62)",
            backdropFilter: "blur(24px) saturate(1.2)",
            WebkitBackdropFilter: "blur(24px) saturate(1.2)",
            border: "1px solid rgba(255, 200, 120, 0.22)",
            borderRadius: 24,
            boxShadow:
              "0 30px 90px rgba(0, 0, 0, 0.7), " +
              "0 10px 40px rgba(0,0,0,0.4), " +
              "inset 0 1px 0 rgba(255,255,255,0.1), " +
              "inset 0 -1px 0 rgba(0,0,0,0.3)",
            fontFamily: '"Inter", -apple-system, sans-serif',
            opacity: panelOpacity,
            filter: `blur(${panelBlur}px)`,
            transform: `translateY(${panelY}px)`,
          }}
        >
          {/* Title */}
          <div style={{
            position: "absolute",
            top: 32,
            left: 44,
            fontSize: 32,
            fontWeight: 800,
            color: "rgba(255,255,255,0.92)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: '"Inter", -apple-system, sans-serif',
            textShadow: "0 2px 12px rgba(0,0,0,0.85)",
            display: "flex",
          }}>
            {title.split("").map((ch, i) => {
              const charFrame = frame - i * 1.5;
              const charOp = interpolate(charFrame, [2, 14], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
              const charY = interpolate(charFrame, [2, 14], [12, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
              return (
                <span key={i} style={{display: "inline-block", opacity: charOp, transform: `translateY(${charY}px)`, whiteSpace: "pre"}}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}
          </div>

          {/* Subtitle */}
          <div style={{
            position: "absolute",
            top: 42,
            right: 44,
            fontSize: 18,
            fontWeight: 600,
            color: "rgba(255, 200, 120, 0.7)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: interpolate(frame, [10, 22], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
          }}>
            {subtitle}
          </div>

          {/* SVG Chart Area */}
          <svg
            width={PANEL_WIDTH}
            height={PANEL_HEIGHT}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            {/* Grid lines */}
            {Array.from({length: 6}, (_, i) => {
              const y = yToPixel((i + 1) * yStep);
              return (
                <line
                  key={i}
                  x1={CHART_PADDING_LEFT}
                  y1={y}
                  x2={CHART_PADDING_LEFT + chartWidth}
                  y2={y}
                  stroke="rgba(255, 200, 120, 0.08)"
                  strokeWidth={1}
                  opacity={axisProgress}
                />
              );
            })}

            {/* Y-axis labels */}
            {Array.from({length: 7}, (_, i) => {
              const val = i * yStep;
              const y = yToPixel(val);
              return (
                <text
                  key={i}
                  x={CHART_PADDING_LEFT - 16}
                  y={y + 5}
                  textAnchor="end"
                  fontSize={18}
                  fontFamily='"Inter", sans-serif'
                  fontWeight={500}
                  fill="rgba(255, 255, 255, 0.5)"
                  opacity={axisProgress}
                >
                  {Math.round(val)}{yAxisLabel}
                </text>
              );
            })}

            {/* X-axis labels */}
            {xTickYears.map(year => (
              <text
                key={year}
                x={xToPixel(year)}
                y={CHART_PADDING_TOP + chartHeight + 32}
                textAnchor="middle"
                fontSize={18}
                fontFamily='"Inter", sans-serif'
                fontWeight={500}
                fill="rgba(255, 255, 255, 0.5)"
                opacity={axisProgress}
              >
                {year}
              </text>
            ))}

            {/* Data line */}
            <polyline
              points={pathPoints.join(" ")}
              fill="none"
              stroke={colorMain}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - lineDrawProgress)}
              style={{
                filter: `drop-shadow(0 0 12px ${colorMain}) drop-shadow(0 0 24px ${colorMainAlpha})`,
              }}
            />

            {/* Glow head circle */}
            <circle
              cx={headX}
              cy={headY}
              r={9}
              fill={colorMain}
              opacity={lineDrawProgress > 0 && lineDrawProgress < 1 ? 1 : 0}
              style={{filter: `drop-shadow(0 0 16px ${colorMain})`}}
            />
            <circle
              cx={headX}
              cy={headY}
              r={16}
              fill="none"
              stroke={colorMain}
              strokeWidth={2}
              opacity={lineDrawProgress > 0 && lineDrawProgress < 1 ? 0.4 : 0}
            />
          </svg>

          {/* Peak annotation */}
          {peakAnnotation && (
            <div style={{
              position: "absolute",
              bottom: 48,
              left: 44,
              fontSize: 22,
              fontWeight: 700,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: peakOpacity,
              transform: `translateY(${peakY}px)`,
            }}>
              PEAK: <span style={{color: colorMain, fontWeight: 900, marginLeft: 8}}>
                {peakAnnotation.value}{yAxisLabel}
              </span>
              <span style={{marginLeft: 12, fontWeight: 500, color: "rgba(255,255,255,0.45)"}}>
                ({peakAnnotation.year})
              </span>
            </div>
          )}

          {/* Current value badge — floats top-right over the panel edge */}
          {currentAnnotation && (
            <div style={{
              position: "absolute",
              top: -32,
              right: 60,
              transform: `scale(${currentScale})`,
              transformOrigin: "right center",
              zIndex: 5,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: `rgba(${colorScheme === "red" ? "255,69,64" : "255,176,32"}, 0.15)`,
              border: `2px solid ${colorMain}`,
              borderRadius: 999,
              padding: "12px 24px",
              fontSize: 24,
              fontWeight: 900,
              color: colorMain,
              letterSpacing: "-0.01em",
              textShadow: `0 0 20px ${colorMainGlow}`,
              boxShadow: `0 8px 32px ${colorMainAlpha}, inset 0 1px 0 rgba(255,255,255,0.15)`,
              opacity: currentOpacity,
            }}>
              <span>{currentAnnotation.direction === "down" ? "↓" : "↑"}</span>
              <span>AKTUELL {currentAnnotation.value}{yAxisLabel}</span>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DemoSceneBloombergChart3D: React.FC = () => {
  // German inflation YoY data 1950-2024 (real historical)
  const inflationData = [
    {year: 1950, value: 0.0}, {year: 1955, value: 1.4}, {year: 1960, value: 1.5},
    {year: 1965, value: 3.4}, {year: 1970, value: 3.6}, {year: 1973, value: 7.1},
    {year: 1975, value: 5.9}, {year: 1980, value: 5.4}, {year: 1985, value: 2.0},
    {year: 1990, value: 2.7}, {year: 1995, value: 1.7}, {year: 2000, value: 1.4},
    {year: 2005, value: 1.5}, {year: 2008, value: 2.6}, {year: 2010, value: 1.1},
    {year: 2015, value: 0.3}, {year: 2020, value: 0.5}, {year: 2022, value: 6.9},
    {year: 2023, value: 5.9}, {year: 2024, value: 2.4},
  ];
  return (
    <BloombergChart3D
      title="INFLATION YoY"
      subtitle="BUNDESREPUBLIK · 1950–2024"
      data={inflationData}
      yAxisLabel="%"
      colorScheme="amber"
      variant="fullscreen"
      peakAnnotation={{value: 7.1, year: 1973, label: "Oil Crisis"}}
      currentAnnotation={{value: 2.4, direction: "down"}}
    />
  );
};

export default DemoSceneBloombergChart3D;
