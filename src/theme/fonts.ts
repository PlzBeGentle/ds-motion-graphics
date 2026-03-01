import { staticFile } from "remotion";

export const loadFonts = () => {
  const dmSansBold = new FontFace(
    "DM Sans",
    `url('${staticFile("fonts/DMSans-Variable.ttf")}')`,
    { weight: "700", style: "normal" }
  );
  const dmSansRegular = new FontFace(
    "DM Sans",
    `url('${staticFile("fonts/DMSans-Variable.ttf")}')`,
    { weight: "400", style: "normal" }
  );
  const playfair = new FontFace(
    "Playfair Display",
    `url('${staticFile("fonts/PlayfairDisplay-Italic.ttf")}')`,
    { weight: "400", style: "italic" }
  );

  dmSansBold.load().then((f) => document.fonts.add(f));
  dmSansRegular.load().then((f) => document.fonts.add(f));
  playfair.load().then((f) => document.fonts.add(f));
};

export const FONT_FAMILY = {
  headline: "DM Sans, sans-serif",
  body: "DM Sans, sans-serif",
  accent: "Playfair Display, serif",
};
