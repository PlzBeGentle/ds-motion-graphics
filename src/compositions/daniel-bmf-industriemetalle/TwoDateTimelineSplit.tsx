// Phase F.3 — TwoDateTimelineSplit rewritten as HistoricalTimeline3D wrapper
// ovl-025: "9. April 2026" vs "4. Februar 2025" — the two trigger moments.

import React from "react";
import { HistoricalTimeline3D } from "../../components/library/remotion-coder/HistoricalTimeline3D";

export const TwoDateTimelineSplit: React.FC = () => (
  <HistoricalTimeline3D
    title="ZWEI DATEN · EIN MUSTER"
    subtitle="9. APRIL 2026 · 4. FEBRUAR 2025"
    events={[
      {
        year: 2025,
        title: "4. FEBRUAR 2025",
        description: "China verschärft Rare-Earths Export",
        type: "krise",
      },
      {
        year: 2026,
        title: "9. APRIL 2026",
        description: "BMF-Schreiben · Kobalt nicht mehr steuerfrei",
        type: "law",
      },
    ]}
  />
);

export default TwoDateTimelineSplit;
