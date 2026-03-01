import React from "react";
import { AbsoluteFill } from "remotion";
import { BuzzwordLowerThird } from "../components/BuzzwordLowerThird";

interface BuzzwordClipProps {
  text: string;
}

export const BuzzwordClip: React.FC<BuzzwordClipProps> = ({ text }) => {
  return (
    <AbsoluteFill>
      <BuzzwordLowerThird text={text} delay={5} duration={65} />
    </AbsoluteFill>
  );
};
