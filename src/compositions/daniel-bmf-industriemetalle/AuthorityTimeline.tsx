// Phase F.3 — AuthorityTimeline rewritten as GlareCard3D wrapper
// ovl-037: "20 JAHRE FINANZBRANCHE" — Daniel's credibility anchor.

import React from "react";
import { GlareCard3D } from "../../components/library/remotion-coder/GlareCard3D";

export const AuthorityTimeline: React.FC = () => (
  <GlareCard3D
    title="20 JAHRE"
    subtitle="FINANZBRANCHE"
    fromValue={2006}
    toValue={2026}
    badgeText="DANIEL SAUER · SEIT 2006"
  />
);

export default AuthorityTimeline;
