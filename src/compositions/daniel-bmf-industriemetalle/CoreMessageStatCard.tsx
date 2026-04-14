// Phase F.5 — CoreMessageStatCard rewritten as GlareCard3D wrapper
// ovl-035: "ANTIZYKLISCH · PHYSISCHE SUBSTANZ · LIMITIERT VON DER NATUR"
// Frame range 18078-18543 → ~18200-18540

import React from "react";
import { GlareCard3D } from "../../components/library/remotion-coder/GlareCard3D";

export const CoreMessageStatCard: React.FC = () => (
  <GlareCard3D
    title="ANTIZYKLISCH"
    subtitle="PHYSISCHE SUBSTANZ"
    fromValue={0}
    toValue={100}
    badgeText="LIMITIERT VON DER NATUR"
  />
);

export default CoreMessageStatCard;
