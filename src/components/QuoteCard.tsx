import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LOCOS } from "../theme/colors";
import { FONT_FAMILY } from "../theme/fonts";

interface QuoteCardProps {
  quote: string;
  author: string;
  delay?: number;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1 },
  });

  const cardScale = interpolate(cardIn, [0, 1], [0.9, 1]);
  const cardOpacity = cardIn;

  // Typewriter effect
  const charsPerFrame = 2;
  const typedFrame = Math.max(0, frame - delay - 10);
  const visibleChars = Math.min(
    Math.floor(typedFrame * charsPerFrame),
    quote.length
  );
  const displayedQuote = quote.substring(0, visibleChars);

  // Author fade-in after quote finishes
  const authorDelay = delay + 10 + Math.ceil(quote.length / charsPerFrame) + 5;
  const authorOpacity = spring({
    frame: frame - authorDelay,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.8 },
  });

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        maxWidth: 900,
        padding: 48,
        backgroundColor: `${LOCOS.darkBg}F0`,
        border: `2px solid ${LOCOS.goldDim}80`,
        boxShadow: `0 0 60px ${LOCOS.gold}20, 0 4px 30px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Opening quote mark */}
      <div
        style={{
          fontFamily: FONT_FAMILY.accent,
          fontSize: 80,
          color: LOCOS.gold,
          lineHeight: 0.5,
          marginBottom: 16,
        }}
      >
        &ldquo;
      </div>
      {/* Quote text */}
      <div
        style={{
          fontFamily: FONT_FAMILY.accent,
          fontStyle: "italic",
          fontSize: 32,
          color: LOCOS.textLight,
          lineHeight: 1.5,
          minHeight: 120,
        }}
      >
        {displayedQuote}
        {visibleChars < quote.length && (
          <span
            style={{
              opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
              color: LOCOS.gold,
            }}
          >
            |
          </span>
        )}
      </div>
      {/* Author */}
      <div
        style={{
          fontFamily: FONT_FAMILY.headline,
          fontSize: 22,
          color: LOCOS.gold,
          marginTop: 24,
          opacity: authorOpacity,
          letterSpacing: "0.06em",
        }}
      >
        — {author}
      </div>
    </div>
  );
};
