// Phase F.5 — TrustCheckmarkStatCard rewritten as Safe3D wrapper
// ovl-032: Altbestand-Vertrauensschutz — the safe that protects existing positions
// Frame range 15315-15888 → 15660-15800 (word-sync "Vertrauensschutz")

import React from "react";
import { Safe3D } from "../../components/library/remotion-coder/Safe3D";

export const TrustCheckmarkStatCard: React.FC = () => (
  <Safe3D
    title="ALTBESTAND GESCHÜTZT"
    subtitle="Vertrauensschutz · Nicht-Beanstandungsklausel"
    revealText="SICHER"
    revealColor="#5DEB93"
  />
);

export default TrustCheckmarkStatCard;
