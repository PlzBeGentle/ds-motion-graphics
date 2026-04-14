// Phase F.4 — EUKrisendialogNewsCard rewritten as NewspaperMockup3D editorial
// ovl-029: EU Krisendialog Oktober 2025. Editorial (no press release asset).

import React from "react";
import { NewspaperMockup3D } from "../../components/library/remotion-coder/NewspaperMockup3D";

export const EUKrisendialogNewsCard: React.FC = () => (
  <NewspaperMockup3D
    newspaperName="EUROPÄISCHE KOMMISSION · BRÜSSEL"
    dateStamp="OKTOBER 2025 · KRISENDIALOG"
    headline="EU SCHLÄGT ALARM — KRITISCHE ROHSTOFFE"
    subheadline="Hochrangiges Treffen zu China-Exportkontrollen & strategischen Lieferketten"
    bodyParagraphs={[
      "Nach fünf Exportbeschränkungen in zwei Jahren fordert die EU-Kommission einen gemeinsamen Krisenplan für Gallium, Germanium, Antimon, Graphit und Rare Earths.",
      "Mitgliedsstaaten diskutieren nationale Reserven, Zolllager-Privilegien und Rückverlagerung kritischer Industrien.",
    ]}
    pullQuote="Europas Abhängigkeit ist strukturell — nicht konjunkturell."
    pullQuoteAttribution="Handelsblatt, 12. Okt 2025"
    variant="overlay"
    clusterOffsetX={280}
  />
);

export default EUKrisendialogNewsCard;
