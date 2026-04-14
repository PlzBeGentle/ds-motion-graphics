import React from "react";
import { HorizontalChronologyTimeline } from "./HorizontalChronologyTimeline";

/**
 * AuthorityTimeline (ovl-037) — 3-dot biography timeline.
 * Variant of HorizontalChronologyTimeline.
 */
export const AuthorityTimeline: React.FC = () => (
  <HorizontalChronologyTimeline
    dots={[
      { date: "2005", label: "START FINANZBRANCHE" },
      { date: "2008", label: "LEHMAN · FINANZKRISE" },
      { date: "2011", label: "EURO-KRISE" },
    ]}
    x={80}
    y={720}
    w={1760}
  />
);

export default AuthorityTimeline;
