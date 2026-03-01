import React from "react";
import { Composition } from "remotion";
import { loadFonts } from "./theme/fonts";
import { CANVAS } from "./theme/styles";

import { HookTitle } from "./compositions/01-HookTitle";
import { BuchgewinnErklaerung } from "./compositions/02-BuchgewinnErklaerung";
import { Zwangsverkauf } from "./compositions/03-Zwangsverkauf";
import { JunckerZitat } from "./compositions/04-JunckerZitat";
import { KrisenTimeline } from "./compositions/05-KrisenTimeline";
import { Weltkarte } from "./compositions/06-Weltkarte";
import { DreiSaeulen } from "./compositions/07-DreiSaeulen";
import { OutroChecklist } from "./compositions/08-OutroChecklist";
import { BuzzwordClip } from "./compositions/BuzzwordSet";
import { BUZZWORDS } from "./data/buzzwords";

loadFonts();

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="01-HookTitle"
        component={HookTitle}
        durationInFrames={3 * FPS}
        fps={FPS}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="02-BuchgewinnErklaerung"
        component={BuchgewinnErklaerung}
        durationInFrames={7 * FPS}
        fps={FPS}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="03-Zwangsverkauf"
        component={Zwangsverkauf}
        durationInFrames={9 * FPS}
        fps={FPS}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="04-JunckerZitat"
        component={JunckerZitat}
        durationInFrames={9 * FPS}
        fps={FPS}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="05-KrisenTimeline"
        component={KrisenTimeline}
        durationInFrames={9 * FPS}
        fps={FPS}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="06-Weltkarte"
        component={Weltkarte}
        durationInFrames={7 * FPS}
        fps={FPS}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="07-DreiSaeulen"
        component={DreiSaeulen}
        durationInFrames={7 * FPS}
        fps={FPS}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="08-OutroChecklist"
        component={OutroChecklist}
        durationInFrames={5 * FPS}
        fps={FPS}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      {/* Buzzword clips */}
      {BUZZWORDS.map((bw) => (
        <Composition
          key={bw.id}
          id={`09-Buzzword-${bw.id}`}
          component={BuzzwordClip}
          defaultProps={{ text: bw.text }}
          durationInFrames={Math.round(2.5 * FPS)}
          fps={FPS}
          width={CANVAS.width}
          height={CANVAS.height}
        />
      ))}
    </>
  );
};
