// Phase F.1 — BMFDocumentCard rewritten as GesetzesBlatt3D wrapper
// ovl-002: BMF-Schreiben 9. April 2026 right-split reveal
// Props kept for backwards compat but mostly unused (library component owns styling).

import React from "react";
import { staticFile } from "remotion";
import { GesetzesBlatt3D } from "../../components/library/remotion-coder/GesetzesBlatt3D";

export const BMFDocumentCard: React.FC = () => (
  <GesetzesBlatt3D
    sourceName="Bundesministerium der Finanzen"
    sourceMeta="Wilhelmstraße 97 · 10117 Berlin · 9. April 2026"
    lawTitle="Umsatzsteuer · Steuerbefreiung § 4 Nr. 4b UStG"
    lawSection="GZ: III C 3 - S 7157-a/00005/001/052"
    paragraphs={[
      {
        number: "§",
        segments: [
          { text: "7 Seiten, die " },
          { text: "22 Jahre", highlight: true },
          { text: " Rechtspraxis beenden." },
        ],
      },
    ]}
    paperTextureSrc={staticFile("assets/mbf-schreiben-titelseite.png")}
    variant="overlay"
    clusterOffsetX={320}
  />
);

export default BMFDocumentCard;
