import React from "react";
import { BMFDocumentCard } from "./BMFDocumentCard";
import { BMF_COLORS } from "./bmf-theme";

/**
 * BMF2004DocumentCard (ovl-009) — sepia-aged variant of BMFDocumentCard.
 * Adds "2004" seal stamp top-right.
 */
export const BMF2004DocumentCard: React.FC = () => (
  <BMFDocumentCard
    logoText="BMF 2004"
    badgeText="28. JAN 2004"
    headline="GÜLTIG SEIT 22 JAHREN"
    paperColor={BMF_COLORS.paperSepia}
    sepia={true}
    sealStamp="2004"
    x={80}
    y={640}
    w={680}
    h={400}
  />
);

export default BMF2004DocumentCard;
