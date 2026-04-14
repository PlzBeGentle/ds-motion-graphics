// Iter2.8 — OhneTriptychon wrapped with MovingGridBG
// Feedback Bild 30: "FULLSCREEN OHNE BG" — AnimatedBulletList was rendering
// on a plain black background.
// ovl-004: OHNE PARLAMENT / VORWARNUNG / ÜBERGANGSFRIST

import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedBulletList } from "../../components/library/remotion-coder/AnimatedBulletList";
import { MovingGridBG } from "./MovingGridBG";

export const OhneTriptychon: React.FC = () => (
  <AbsoluteFill>
    <MovingGridBG
      gridColor="rgba(227, 6, 19, 0.10)"
      accentColor="rgba(227, 6, 19, 0.20)"
    />
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
  </AbsoluteFill>
);

export default OhneTriptychon;
