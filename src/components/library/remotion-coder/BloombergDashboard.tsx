import React from "react";
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from "remotion";
import {BloombergChart3D} from "./BloombergChart3D";
import {TickerBar} from "./TickerBar";

export const DemoSceneBloombergDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const inflationData = [
    {year: 1950, value: 0.0}, {year: 1955, value: 1.4}, {year: 1960, value: 1.5},
    {year: 1965, value: 3.4}, {year: 1970, value: 3.6}, {year: 1973, value: 7.1},
    {year: 1975, value: 5.9}, {year: 1980, value: 5.4}, {year: 1985, value: 2.0},
    {year: 1990, value: 2.7}, {year: 1995, value: 1.7}, {year: 2000, value: 1.4},
    {year: 2005, value: 1.5}, {year: 2008, value: 2.6}, {year: 2010, value: 1.1},
    {year: 2015, value: 0.3}, {year: 2020, value: 0.5}, {year: 2022, value: 6.9},
    {year: 2023, value: 5.9}, {year: 2024, value: 2.4},
  ];

  const tickerItems = [
    {symbol: "GOLD", value: "2,847.50", change: 1.24, unit: "%"},
    {symbol: "SILBER", value: "34.82", change: 2.15, unit: "%"},
    {symbol: "DAX", value: "18,234", change: -0.84, unit: "%"},
    {symbol: "S&P 500", value: "5,762", change: -0.42, unit: "%"},
    {symbol: "EUR/USD", value: "1.0684", change: -0.18, unit: "%"},
    {symbol: "BTC", value: "68,420", change: 3.47, unit: "%"},
    {symbol: "ÖL", value: "78.24", change: 1.82, unit: "%"},
    {symbol: "BUND 10Y", value: "2.34", change: 0.08, unit: "%"},
  ];

  return (
    <>
      {/* Layer 1: BloombergChart3D as background (fullscreen glass panel with chart) */}
      <BloombergChart3D
        title="INFLATION YoY"
        subtitle="BUNDESREPUBLIK · 1950–2024"
        data={inflationData}
        yAxisLabel="%"
        colorScheme="amber"
        variant="fullscreen"
        peakAnnotation={{value: 7.1, year: 1973}}
        currentAnnotation={{value: 2.4, direction: "down"}}
      />

      {/* Layer 2: TickerBar overlay at bottom */}
      <AbsoluteFill>
        <TickerBar items={tickerItems} scrollSpeed={4} background="dark" />
      </AbsoluteFill>
    </>
  );
};

export default DemoSceneBloombergDashboard;
