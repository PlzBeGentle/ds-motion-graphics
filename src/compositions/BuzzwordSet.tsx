import React from "react";
import { AbsoluteFill } from "remotion";
import { BuzzwordLowerThird } from "../components/BuzzwordLowerThird";
import { GoldParticles } from "../components/GoldParticles";
import { FilmGrain } from "../components/FilmGrain";

interface BuzzwordClipProps {
  text: string;
}

export const BuzzwordClip: React.FC<BuzzwordClipProps> = ({ text }) => {
  return (
    <AbsoluteFill>
      <GoldParticles count={8} mode="ambient" />
      <BuzzwordLowerThird text={text} delay={5} duration={60} />
      <FilmGrain opacity={0.03} vignette={false} />
    </AbsoluteFill>
  );
};
