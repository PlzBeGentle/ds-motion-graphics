// Phase F.1 — ChinaBekanntmachungDocumentCard rewritten as GesetzesBlatt3D editorial
// ovl-026: China Export Control Notice — editorial (no real asset, 5-year chronology)

import React from "react";
import { GesetzesBlatt3D } from "../../components/library/remotion-coder/GesetzesBlatt3D";

export const ChinaBekanntmachungDocumentCard: React.FC = () => (
  <GesetzesBlatt3D
    sourceName="Ministry of Commerce · People's Republic of China"
    sourceMeta="中华人民共和国商务部 · 2023-2025"
    lawTitle="Export Control Notice"
    lawSection="August 2023 · Dezember 2023 · September 2024 · April 2025"
    paragraphs={[
      {
        number: "§",
        segments: [
          { text: "Gallium · Germanium · Graphit · Antimon · " },
          { text: "Rare Earths", highlight: true },
          { text: " — export restricted." },
        ],
      },
    ]}
    variant="overlay"
  />
);

export default ChinaBekanntmachungDocumentCard;
