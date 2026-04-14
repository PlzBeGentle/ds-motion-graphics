import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing, staticFile} from "remotion";

type NewspaperMockup3DProps = {
  newspaperName: string;
  dateStamp: string;
  issueNumber?: string;
  headline: string;
  subheadline?: string;
  bodyParagraphs: string[];
  photoPlaceholderLabel?: string;
  photoSrc?: string;
  paperTextureSrc?: string;
  pullQuote?: string;
  pullQuoteAttribution?: string;
  variant?: "fullscreen" | "overlay";
  clusterOffsetX?: number;
};

const NewspaperMockup3D: React.FC<NewspaperMockup3DProps> = ({
  newspaperName,
  dateStamp,
  issueNumber,
  headline,
  subheadline,
  bodyParagraphs,
  photoPlaceholderLabel,
  photoSrc,
  paperTextureSrc,
  pullQuote,
  pullQuoteAttribution,
  variant = "fullscreen",
  clusterOffsetX = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const PANEL_WIDTH_FULLSCREEN = 1440;
  const PANEL_HEIGHT_FULLSCREEN = 820;
  const PANEL_WIDTH_OVERLAY = 1080;
  const PANEL_HEIGHT_OVERLAY = 640;

  const PANEL_WIDTH = variant === "fullscreen" ? PANEL_WIDTH_FULLSCREEN : PANEL_WIDTH_OVERLAY;
  const PANEL_HEIGHT = variant === "fullscreen" ? PANEL_HEIGHT_FULLSCREEN : PANEL_HEIGHT_OVERLAY;

  const PADDING_X = 64;
  const PADDING_TOP = 44;
  const MASTHEAD_HEIGHT = 56;
  const DIVIDER_TOP = MASTHEAD_HEIGHT + PADDING_TOP + 8;

  const paperSpring = spring({
    frame,
    fps,
    config: {damping: 15, stiffness: 80, mass: 1.0},
  });

  const panelOpacity = interpolate(paperSpring, [0, 1], [0, 1]);
  const panelBlur = interpolate(paperSpring, [0, 1], [14, 0]);
  const panelX = interpolate(paperSpring, [0, 1], [140, 0]);
  const panelRotY = interpolate(paperSpring, [0, 0.7, 1], [8, -2, 0]);

  const dividerProgress = interpolate(frame, [18, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const SERIF_STACK = '"Georgia", "Times New Roman", "Didot", serif';
  const SANS_STACK = '"Inter", -apple-system, sans-serif';

  const BODY_TOP = DIVIDER_TOP + 220;
  const BODY_HEIGHT = PANEL_HEIGHT - BODY_TOP - 160;
  const PHOTO_WIDTH = 340;
  const PHOTO_HEIGHT = 260;
  const BODY_TEXT_LEFT = PADDING_X + PHOTO_WIDTH + 40;
  const BODY_TEXT_WIDTH = PANEL_WIDTH - PADDING_X * 2 - PHOTO_WIDTH - 40;
  const PULL_QUOTE_TOP = PANEL_HEIGHT - 140;

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)",
      perspective: "1800px",
      perspectiveOrigin: "50% 50%",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        transformStyle: "preserve-3d",
        transform: `translateX(${clusterOffsetX + panelX}px) rotateX(3deg) rotateY(${-12 + panelRotY}deg)`,
      }}>
        <div style={{
          position: "absolute",
          width: PANEL_WIDTH,
          height: PANEL_HEIGHT,
          left: "50%",
          top: "50%",
          marginLeft: -PANEL_WIDTH / 2,
          marginTop: -PANEL_HEIGHT / 2,
          backgroundColor: paperTextureSrc ? "rgba(10, 8, 4, 1)" : "rgba(22, 18, 12, 0.78)",
          backdropFilter: "blur(24px) saturate(1.15)",
          WebkitBackdropFilter: "blur(24px) saturate(1.15)",
          border: "1px solid rgba(255, 200, 120, 0.24)",
          borderRadius: 14,
          boxShadow:
            "0 30px 90px rgba(0, 0, 0, 0.7), " +
            "0 10px 40px rgba(0,0,0,0.4), " +
            "inset 0 1px 0 rgba(255,255,255,0.08), " +
            "inset 0 -1px 0 rgba(0,0,0,0.3)",
          opacity: panelOpacity,
          filter: `blur(${panelBlur}px)`,
          transform: `translateY(${0}px)`,
          overflow: "hidden",
        }}>
          {/* Paper texture overlay */}
          {paperTextureSrc ? (
            <img
              src={paperTextureSrc}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 1.0,
                filter: "brightness(0.32) sepia(0.55) saturate(1.25) contrast(1.15)",
                pointerEvents: "none",
              }}
            />
          ) : (
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at top left, rgba(255, 220, 160, 0.03) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />
          )}

          {/* Masthead row (name + date) */}
          <div style={{
            position: "absolute",
            top: PADDING_TOP,
            left: PADDING_X,
            right: PADDING_X,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            height: MASTHEAD_HEIGHT,
          }}>
            {/* Newspaper name (letter-stagger) */}
            <div style={{
              fontFamily: SERIF_STACK,
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: "0.02em",
              color: "rgba(255, 255, 255, 0.95)",
              textShadow: "0 2px 12px rgba(0,0,0,0.9)",
              display: "flex",
            }}>
              {newspaperName.split("").map((ch, i) => {
                const charFrame = frame - 8 - i * 1.2;
                const charOp = interpolate(charFrame, [0, 12], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                const charY = interpolate(charFrame, [0, 12], [10, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                return (
                  <span key={i} style={{
                    display: "inline-block",
                    opacity: charOp,
                    transform: `translateY(${charY}px)`,
                    whiteSpace: "pre",
                  }}>
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                );
              })}
            </div>

            {/* Date + issue number */}
            <div style={{
              fontFamily: SANS_STACK,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255, 200, 120, 0.75)",
              opacity: interpolate(frame, [16, 32], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
            }}>
              {dateStamp}{issueNumber ? ` · ${issueNumber}` : ""}
            </div>
          </div>

          {/* Divider line */}
          <div style={{
            position: "absolute",
            top: DIVIDER_TOP,
            left: PADDING_X,
            width: PANEL_WIDTH - PADDING_X * 2,
            height: 2,
            backgroundColor: "rgba(255, 200, 120, 0.45)",
            transformOrigin: "left center",
            transform: `scaleX(${dividerProgress})`,
            boxShadow: "0 0 12px rgba(255, 200, 120, 0.2)",
          }} />

          {/* Headline — letter-stagger, serif, massive */}
          <div style={{
            position: "absolute",
            top: DIVIDER_TOP + 30,
            left: PADDING_X,
            right: PADDING_X,
            fontFamily: SERIF_STACK,
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            color: "#ffffff",
            textShadow: "0 4px 20px rgba(0,0,0,0.7)",
            display: "flex",
            flexWrap: "wrap",
          }}>
            {headline.split("").map((ch, i) => {
              const charFrame = frame - 25 - i * 1.2;
              const charOp = interpolate(charFrame, [0, 14], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
              const charY = interpolate(charFrame, [0, 14], [14, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
              return (
                <span key={i} style={{
                  display: "inline-block",
                  opacity: charOp,
                  transform: `translateY(${charY}px)`,
                  whiteSpace: "pre",
                }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}
          </div>

          {/* Subheadline (if provided) */}
          {subheadline && (
            <div style={{
              position: "absolute",
              top: DIVIDER_TOP + 140,
              left: PADDING_X,
              right: PADDING_X,
              fontFamily: SERIF_STACK,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
              color: "rgba(255, 200, 120, 0.82)",
              opacity: interpolate(frame, [35, 55], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
            }}>
              {subheadline}
            </div>
          )}

          {/* Photo box — real image if photoSrc set, else placeholder */}
          <div style={{
            position: "absolute",
            top: BODY_TOP,
            left: PADDING_X,
            width: PHOTO_WIDTH,
            height: PHOTO_HEIGHT,
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            border: "1.5px solid rgba(255, 200, 120, 0.35)",
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
            opacity: interpolate(frame, [45, 65], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
            transform: `scale(${interpolate(frame, [45, 65], [0.95, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})})`,
          }}>
            {photoSrc ? (
              <>
                <img
                  src={photoSrc}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(0.7) contrast(1.08) brightness(0.92)",
                  }}
                />
                {photoPlaceholderLabel && (
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "6px 12px",
                    fontFamily: SANS_STACK,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255, 220, 160, 0.9)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  }}>
                    {photoPlaceholderLabel}
                  </div>
                )}
              </>
            ) : (
              <div style={{
                textAlign: "center",
                fontFamily: SANS_STACK,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255, 200, 120, 0.6)",
              }}>
                <div style={{fontSize: 32, marginBottom: 8}}>◯</div>
                <div>{photoPlaceholderLabel ?? "FOTO"}</div>
              </div>
            )}
          </div>

          {/* Body text column (right side of photo) */}
          <div style={{
            position: "absolute",
            top: BODY_TOP,
            left: BODY_TEXT_LEFT,
            width: BODY_TEXT_WIDTH,
            maxHeight: BODY_HEIGHT,
            overflow: "hidden",
            fontFamily: SANS_STACK,
            fontSize: 20,
            fontWeight: 400,
            lineHeight: 1.5,
            color: "rgba(255, 255, 255, 0.82)",
          }}>
            {bodyParagraphs.map((para, i) => {
              const paraDelay = 55 + i * 10;
              const paraOp = interpolate(frame, [paraDelay, paraDelay + 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const paraY = interpolate(frame, [paraDelay, paraDelay + 20], [8, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              });
              return (
                <p key={i} style={{
                  margin: "0 0 14px 0",
                  opacity: paraOp,
                  transform: `translateY(${paraY}px)`,
                }}>
                  {para}
                </p>
              );
            })}
          </div>

          {pullQuote && (
            <>
              {/* Gold underline that draws in */}
              <div style={{
                position: "absolute",
                top: PULL_QUOTE_TOP - 12,
                left: PADDING_X,
                width: (PANEL_WIDTH - PADDING_X * 2) * 0.5,
                height: 2,
                backgroundColor: "rgba(255, 200, 120, 0.6)",
                transformOrigin: "left center",
                transform: `scaleX(${interpolate(frame, [100, 125], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)})})`,
                boxShadow: "0 0 14px rgba(255, 200, 120, 0.3)",
              }} />

              {/* Pull quote */}
              <div style={{
                position: "absolute",
                top: PULL_QUOTE_TOP,
                left: PADDING_X,
                right: PADDING_X,
                fontFamily: SERIF_STACK,
                fontStyle: "italic",
                fontSize: 34,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                color: "#ffd77a",
                textShadow: "0 2px 16px rgba(255, 180, 30, 0.4)",
                opacity: interpolate(frame, [90, 115], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
                transform: `translateY(${interpolate(frame, [90, 115], [10, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)})}px)`,
              }}>
                » {pullQuote} «
              </div>

              {/* Attribution */}
              {pullQuoteAttribution && (
                <div style={{
                  position: "absolute",
                  top: PULL_QUOTE_TOP + 58,
                  left: PADDING_X,
                  fontFamily: SANS_STACK,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255, 200, 120, 0.7)",
                  opacity: interpolate(frame, [105, 125], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
                }}>
                  — {pullQuoteAttribution}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DemoSceneNewspaperMockup3D: React.FC = () => {
  return (
    <NewspaperMockup3D
      newspaperName="DAS HANDELSBLATT"
      dateStamp="14. APRIL 2026"
      issueNumber="Nr. 71"
      headline="AMLA STARTET 2027"
      subheadline="EU plant gläsernen Anleger"
      bodyParagraphs={[
        "Die neue EU-Anti-Geldwäsche-Behörde AMLA soll ab 2027 alle Konten über 10.000 Euro systematisch überwachen.",
        "Kritiker warnen vor einem gläsernen Anleger — Datenschützer sehen die Verhältnismäßigkeit nicht gewahrt.",
        "Die Bundesbank begrüßt die Initiative grundsätzlich, fordert aber klare Schutzmechanismen für Privatanleger.",
      ]}
      photoPlaceholderLabel="LAGARDE · EZB"
      photoSrc={staticFile("lagarde.png")}
      paperTextureSrc={staticFile("paper-crumpled.jpg")}
      pullQuote="Das ist ein bedeutender Schock"
      pullQuoteAttribution="Christine Lagarde, EZB"
      variant="fullscreen"
    />
  );
};

export default DemoSceneNewspaperMockup3D;
