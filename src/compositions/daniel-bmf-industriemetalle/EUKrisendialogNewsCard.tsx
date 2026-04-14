import React from "react";
import { DonnerstagNewsCard } from "./DonnerstagNewsCard";
import { BMF_COLORS } from "./bmf-theme";

/**
 * EUKrisendialogNewsCard (ovl-029) — Variant of DonnerstagNewsCard
 * with gold accent for EU-bridge context.
 */
export const EUKrisendialogNewsCard: React.FC = () => (
  <DonnerstagNewsCard
    headline="EU KRISENDIALOG"
    sub="BRÜSSEL · OKT 2025"
    accentColor={BMF_COLORS.goldAccent}
    showClockIcon={false}
    x={1200}
    y={300}
    w={660}
  />
);

export default EUKrisendialogNewsCard;
