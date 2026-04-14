// Phase F.1 — BMF2004DocumentCard rewritten as GesetzesBlatt3D editorial variant
// ovl-009: 28. Januar 2004 BMF-Schreiben reference card (editorial — no real asset)

import React from "react";
import { GesetzesBlatt3D } from "../../components/library/remotion-coder/GesetzesBlatt3D";

export const BMF2004DocumentCard: React.FC = () => (
  <GesetzesBlatt3D
    sourceName="Bundesministerium der Finanzen"
    sourceMeta="28. Januar 2004"
    lawTitle="IV D 1 — S 7157 — 01/04"
    lawSection="Bundessteuerblatt I · S. 242"
    paragraphs={[
      {
        number: "§",
        segments: [
          { text: "Die Regel, die " },
          { text: "22 Jahre", highlight: true },
          { text: " galt." },
        ],
      },
    ]}
    variant="overlay"
  />
);

export default BMF2004DocumentCard;
