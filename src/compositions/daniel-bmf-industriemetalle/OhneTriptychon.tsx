// Phase F.6 — OhneTriptychon rewritten as AnimatedBulletList
// ovl-004: "OHNE PARLAMENT / VORWARNUNG / ÜBERGANG" — 3 bullets stagger
// Frame range 1041-1158 → 1040-1166 (word-sync "Parlament")

import React from "react";
import { AnimatedBulletList } from "../../components/library/remotion-coder/AnimatedBulletList";

export const OhneTriptychon: React.FC = () => (
  <AnimatedBulletList
    title="DREI DINGE FEHLEN"
    subtitle="WIE DIE REGEL ABGESCHAFFT WURDE"
    items={[
      { title: "OHNE PARLAMENT", description: "Keine Gesetzesdebatte · keine Abstimmung" },
      { title: "OHNE VORWARNUNG", description: "7 Seiten · Donnerstagabend · 20 Uhr" },
      { title: "OHNE ÜBERGANGSFRIST", description: "Wirksam ab dem ersten Werktag" },
    ]}
    bulletStyle="number"
    accentColor="#E30613"
    variant="overlay"
    clusterOffsetX={0}
  />
);

export default OhneTriptychon;
