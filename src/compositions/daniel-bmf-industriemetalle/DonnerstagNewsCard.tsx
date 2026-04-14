// Phase F.4 — DonnerstagNewsCard rewritten as NewspaperMockup3D editorial
// ovl-011: Donnerstagabend-Leak Einzelheiten. Editorial (no real source asset).

import React from "react";
import { NewspaperMockup3D } from "../../components/library/remotion-coder/NewspaperMockup3D";

export const DonnerstagNewsCard: React.FC = () => (
  <NewspaperMockup3D
    newspaperName="BMF · INTERNE WEISUNG"
    dateStamp="DONNERSTAG · 9. APRIL 2026 · 20:00 UHR"
    issueNumber="GZ: III C 3 - S 7157-a/00005/001/052"
    headline="7 SEITEN — IN DER NACHT RAUSGESCHICKT"
    subheadline="Bundesfinanzministerium publiziert neue § 4 Nr. 4b UStG Anweisung"
    bodyParagraphs={[
      "Das Schreiben erreicht Steuerberater, Zolllager-Betreiber und Edelmetall-Händler ohne Vorlauf. Eine Übergangsfrist fehlt. Die Wirkung tritt sofort ein.",
      "Ein versteckter Satz auf Seite 7 hebt das 22 Jahre gültige BMF-Schreiben vom 28. Januar 2004 auf — die gesamte bisherige Rechtspraxis fällt in sich zusammen.",
    ]}
    pullQuote="7 Seiten. Donnerstagabend. Ohne Parlament. Ohne Übergang."
    pullQuoteAttribution="Daniel Sauer"
    variant="overlay"
    clusterOffsetX={-280}
  />
);

export default DonnerstagNewsCard;
