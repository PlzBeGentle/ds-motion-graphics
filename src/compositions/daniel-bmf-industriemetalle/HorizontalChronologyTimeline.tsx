// Phase F.3 — HorizontalChronologyTimeline rewritten as HistoricalTimeline3D
// ovl-028: China export-control chronology (Aug23 → Okt25). Extended range.

import React from "react";
import { HistoricalTimeline3D } from "../../components/library/remotion-coder/HistoricalTimeline3D";

export const HorizontalChronologyTimeline: React.FC = () => (
  <HistoricalTimeline3D
    title="CHINA EXPORT-KONTROLLEN"
    subtitle="2023 · 2024 · 2025 — DIE KETTE"
    events={[
      {
        year: 2023,
        title: "AUG 2023",
        description: "Gallium + Germanium — erste Drosselung",
        type: "krise",
      },
      {
        year: 2023,
        title: "DEZ 2023",
        description: "Graphit — Batterie-Rohstoff unter Kontrolle",
        type: "krise",
      },
      {
        year: 2024,
        title: "SEP 2024",
        description: "Antimon — Halbleiter + Munition betroffen",
        type: "krise",
      },
      {
        year: 2025,
        title: "APR 2025",
        description: "Rare Earths — alle 7 seltenen Erden",
        type: "krise",
      },
      {
        year: 2025,
        title: "OKT 2025",
        description: "EU-Krisendialog · Brüssel schlägt Alarm",
        type: "event",
      },
    ]}
    highlightIndices={[4]}
  />
);

export default HorizontalChronologyTimeline;
