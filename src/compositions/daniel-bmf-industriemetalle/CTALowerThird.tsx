// Phase F.6/F.7 — CTALowerThird rewritten with ShinyText + gold glass card
// ovl-006: "ICH VERLINKE EUCH DAS GANZE" soft CTA
// Frame range 1410-1695 → 1606-1805 (word-sync "ich"@53.54s)

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";
import { ShinyText } from "../../components/library/text/ShinyText";

export const CTALowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.8 },
  });
  const slideX = interpolate(entrance, [0, 1], [-60, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const breathe = 1 + 0.003 * Math.sin((frame / 100) * 2 * Math.PI);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 870,
          width: 960,
          opacity,
          transform: `translateX(${slideX}px) scale(${breathe})`,
          transformOrigin: "left center",
          background: "rgba(14, 12, 8, 0.9)",
          backdropFilter: "blur(22px) saturate(1.2)",
          WebkitBackdropFilter: "blur(22px) saturate(1.2)",
          borderLeft: "4px solid #d4a017",
          border: "1.5px solid rgba(245, 211, 122, 0.42)",
          borderRadius: 14,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 22,
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.72), 0 0 40px rgba(245, 211, 122, 0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Link icon */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 12,
            background: "rgba(212,160,23,0.22)",
            border: "2px solid #d4a017",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f5d37a",
            fontSize: 34,
            fontWeight: 900,
            boxShadow: "0 0 24px rgba(212,160,23,0.42)",
          }}
        >
          ↓
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <ShinyText
            fontSize={40}
            fontWeight={900}
            fontFamily='"Montserrat", "Inter", sans-serif'
            baseColor="rgba(255, 245, 224, 0.4)"
            shineColor="#fff5e0"
            shineWidth={35}
            speed={90}
            startFrame={14}
          >
            LINK: DAS GANZE BMF-SCHREIBEN
          </ShinyText>
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: 22,
              color: "rgba(245, 211, 122, 0.82)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            In der Videobeschreibung · Selbst nachlesen
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default CTALowerThird;
