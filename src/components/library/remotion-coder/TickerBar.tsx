import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from "remotion";

type TickerItem = {
  symbol: string;
  value: string;
  change: number;
  unit?: string;
};

type TickerBarProps = {
  items: TickerItem[];
  scrollSpeed?: number;
  background?: "dark" | "amber-tint";
};

const TickerItemDisplay: React.FC<{item: TickerItem}> = ({item}) => {
  const isUp = item.change >= 0;
  const color = isUp ? "#5DEB93" : "#FF4540";
  const arrow = isUp ? "▲" : "▼";
  const sign = isUp ? "+" : "";
  return (
    <div style={{display: "inline-flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 700}}>
      <span style={{color: "rgba(255, 200, 120, 0.9)", letterSpacing: "0.08em"}}>
        {item.symbol}
      </span>
      <span style={{color: "rgba(255,255,255,0.92)"}}>
        {item.value}
      </span>
      <span style={{color, fontSize: 20}}>{arrow}</span>
      <span style={{color, fontWeight: 800}}>
        {sign}{item.change.toFixed(2)}{item.unit ?? "%"}
      </span>
    </div>
  );
};

export const TickerBar: React.FC<TickerBarProps> = ({items, scrollSpeed = 4, background = "dark"}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const speed = scrollSpeed;
  const offsetX = -(frame * speed);

  const enterSpring = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 90, mass: 0.8},
  });
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);
  const enterY = interpolate(enterSpring, [0, 1], [96, 0]);

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 96,
      backgroundColor: background === "amber-tint" ? "rgba(28, 22, 14, 0.85)" : "rgba(8, 8, 14, 0.88)",
      backdropFilter: "blur(20px) saturate(1.3)",
      WebkitBackdropFilter: "blur(20px) saturate(1.3)",
      borderTop: "1px solid rgba(255, 200, 120, 0.25)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      fontFamily: '"Inter", -apple-system, sans-serif',
      opacity: enterOpacity,
      transform: `translateY(${enterY}px)`,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 60,
        whiteSpace: "nowrap",
        transform: `translateX(${offsetX}px)`,
        paddingLeft: 80,
      }}>
        {duplicatedItems.map((item, i) => (
          <TickerItemDisplay key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export const DemoSceneTickerBar: React.FC = () => {
  const items: TickerItem[] = [
    {symbol: "GOLD", value: "2,847.50", change: 1.24, unit: "%"},
    {symbol: "SILBER", value: "34.82", change: 2.15, unit: "%"},
    {symbol: "DAX", value: "18,234", change: -0.84, unit: "%"},
    {symbol: "S&P 500", value: "5,762", change: -0.42, unit: "%"},
    {symbol: "EUR/USD", value: "1.0684", change: -0.18, unit: "%"},
    {symbol: "BTC", value: "68,420", change: 3.47, unit: "%"},
    {symbol: "OEL", value: "78.24", change: 1.82, unit: "%"},
    {symbol: "BUND 10Y", value: "2.34", change: 0.08, unit: "%"},
  ];
  return (
    <AbsoluteFill style={{backgroundColor: "#0b0d1a"}}>
      <TickerBar items={items} scrollSpeed={4} background="dark" />
    </AbsoluteFill>
  );
};

export default DemoSceneTickerBar;