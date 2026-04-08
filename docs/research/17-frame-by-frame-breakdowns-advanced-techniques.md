# Frame-by-Frame Breakdowns & Advanced Motion Graphics Techniques

> Ultra-Deep Research: Konkrete Frame-Beschreibungen, Production-Code, exakte Timing-Werte.
> Alle Angaben bei 30fps (Remotion-Standard), Umrechnung auf 25fps in Klammern.

---

## 1. BLOOMBERG-STIL GRAFIK — Frame-by-Frame Breakdown

### 1.1 Typische Bloomberg Infografik: "Zinsentwicklung"-Chart

Bloomberg TV nutzt ein extrem stringentes visuelles System: Dunkelblau (#0F1B2D) als Basis, weisse Serifenlose (Bloomberg proprietaer, naechste Entsprechung: Inter oder DM Sans bei Gewicht 500), Akzentfarben ausschliesslich fuer Daten (Gruen #3CC13C fuer positiv, Rot #E32636 fuer negativ), Gold/Gelb (#F4C542) fuer Highlights.

**Der Aufbau einer Bloomberg-Chart-Grafik, Frame fuer Frame:**

```
PHASE 1: CONTAINER (Frame 0-6)
─────────────────────────────
Frame 0:    Bildschirm zeigt nur den dunkelblauen Hintergrund.
            Kein Element sichtbar. Audio: Stille oder Moderator spricht.

Frame 1:    Ein 1px breiter goldener horizontaler Strich erscheint
            mittig im unteren Drittel (Y ~720px bei 1080p).
            Laenge: 0px → 120px in diesem einen Frame.
            Easing: Kein Easing — es ist ein harter Cut/Snap.
            Opacity: sofort 1.0.

Frame 2-4:  Der goldene Strich "wipet" nach rechts und links gleichzeitig
            auf seine volle Breite (~600px). Geschwindigkeit:
            Frame 2: 120px → 340px (schnelle Beschleunigung)
            Frame 3: 340px → 520px (Verzoegerung beginnt)
            Frame 4: 520px → 600px + 8px Overshoot → 600px
            Easing: ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1)

Frame 3-5:  GLEICHZEITIG mit dem Strich-Ende: Ein dunkles Panel
            (rgba(15,27,45,0.92)) expandiert UNTER dem Strich
            nach unten. Hoehe waechst: 0 → 280px.
            Easing: ease-out-cubic, KEIN Overshoot.
            Der Panel hat 1px border-top in Gold.
            Box-Shadow: 0 8px 32px rgba(0,0,0,0.4)

Frame 5-6:  Panel hat volle Groesse erreicht. 1 Frame Settle.
            Kein visuelles Feedback — es steht einfach still.
```

```
PHASE 2: ACHSEN + GRID (Frame 4-10)
────────────────────────────────────
Frame 4-6:  Die Y-Achse (links) zeichnet sich von unten nach oben.
            Stroke-dasharray Animation. 2px weiss, opacity 0.6.
            Dauer: 3 Frames = 100ms. Sehr schnell.
            Easing: linear (bewusst, weil es ein "Zeichnen" simuliert)

Frame 5-7:  Die X-Achse (unten) zeichnet sich von links nach rechts.
            Start 1 Frame nach Y-Achse (Stagger).
            Gleiche Technik, gleiche Dauer.

Frame 6-9:  Horizontale Grid-Lines faden ein. NICHT einzeln, sondern
            ALLE GLEICHZEITIG. Opacity: 0 → 0.12 ueber 3 Frames.
            Farbe: weiss. Strichstaerke: 0.5px. Dashed: 2 4.
            Easing: ease-out. Kein Stagger bei Grid-Lines.
            Bloomberg-Regel: Grid ist IMMER dezent. Max 0.15 Opacity.

Frame 8-10: Achsen-Labels (Jahreszahlen, Prozentwerte) faden ein.
            Opacity: 0 → 0.7 ueber 3 Frames.
            Font: 13px, weight 400, color rgba(255,255,255,0.7).
            KEIN translateY oder translateX — reines Fade.
            Bloomberg zeigt Labels nie bei voller Opacity.
```

```
PHASE 3: DATENLINIE (Frame 8-22)
─────────────────────────────────
Frame 8:    Die Datenlinie beginnt am linken Rand der Chart-Area.
            Startpunkt: kleiner Kreis (r=3px) pulsiert einmal
            (scale 1.0 → 1.4 → 1.0 ueber 4 Frames).

Frame 8-18: Die Linie zeichnet sich von links nach rechts.
            Stroke-dasharray = Gesamtlaenge des Pfads (~800px).
            Dashoffset: 800 → 0.
            Dauer: 10 Frames = 333ms.
            Easing: ease-out-quint — schneller Start, langsames Ende.
            Die Linie ist 2px breit, Farbe #3CC13C (Gruen).
            PLUS: 4px Glow-Layer dahinter, blur(6px), opacity 0.2.

Frame 12-14: WAEHREND die Linie noch zeichnet:
            Ein Datenpunkt-Label beginnt einzublenden.
            Es sitzt am Hoechstpunkt der Kurve.
            Opacity: 0 → 1 ueber 3 Frames.
            Font: 11px, bold, weiss.
            Hintergrund: kleines dunkles Pill (border-radius: 12px).
            translateY: -8px → 0px (leichtes Hochschieben)

Frame 18-20: Linie ist komplett gezeichnet.
            Am Endpunkt: Kreis (r=4px) erscheint.
            Scale: 0 → 1.2 → 1.0 (Micro-Bounce, 3 Frames).
            Farbe: gleich wie Linie.

Frame 20-22: Endwert-Label neben dem Endpunkt.
            "2,7%" in bold, 18px, Farbe der Linie.
            Fade + translateX von rechts: 15px → 0px.
            Dauer: 3 Frames.
```

```
PHASE 4: HEADLINE + QUELLE (Frame 6-14)
────────────────────────────────────────
Frame 6-9:  Headline UEBER dem Chart.
            "EZB-Leitzins seit 2015"
            Clip-Path Reveal von links: inset(0 100% 0 0) → inset(0 0% 0 0).
            Dauer: 4 Frames.
            Font: 22px, weight 600, weiss, letter-spacing 0.02em.
            Easing: ease-out-cubic.

Frame 10-12: Subtitle/Quelle unter der Headline.
            "Quelle: EZB, Stand: Maerz 2026"
            Reiner Fade, 3 Frames, Endopacity 0.5.
            Font: 12px, weight 400, rgba(255,255,255,0.5).

Frame 22+:  ALLES STEHT STILL.
            Keine Micro-Animation. Bloomberg laesst Grafiken
            KOMPLETT statisch stehen. Das unterscheidet sie von
            YouTubern: Professionelles Nachrichtendesign vertraut
            darauf, dass der Inhalt traegt, nicht die Animation.
```

**Bloomberg Sound Design:**
- Frame 1 (Goldlinie erscheint): Subtiler "digital whoosh", 200ms, mittelhohe Frequenz
- Frame 8 (Linie beginnt): Leises "rising tone", 400ms, begleitet die Zeichnung
- Kein Sound bei Labels, Grid, oder Achsen — Bloomberg ist LEISE

### 1.2 Bloomberg Lower Third

```
Frame 0:    Nichts sichtbar im unteren Bildbereich.

Frame 1:    Goldene vertikale Linie (2px breit, 48px hoch) erscheint
            am linken Rand bei X=80px, Y=880px.
            Erscheint SOFORT — kein Fade, kein Scale. Harter Snap.

Frame 1-4:  Dunkles Panel expandiert NACH RECHTS von der Goldlinie.
            Width: 0 → 520px.
            Easing: ease-out-quart.
            Hoehe: 48px, fixed.
            Background: rgba(10,18,32,0.95).
            Border: 1px solid rgba(255,255,255,0.08).

Frame 3-5:  Name-Text clippt rein (clip-path von links).
            "JANE DOE" — 16px, weight 700, weiss, tracking 0.08em.
            2 Frames nach Panel-Start (Stagger).

Frame 5-7:  Titel-Text clippt rein unter dem Namen.
            "Chief Economist, Deutsche Bank" — 13px, weight 400,
            rgba(255,255,255,0.6).
            2 Frames nach Name (Stagger).

Frame 7+:   Steht still. Keine Animation.
            Dauer: Solange Person spricht (typisch 120-300 Frames).

Exit (letzte 4 Frames):
            Panel collapsed nach links (Width 520 → 0).
            Easing: ease-in-cubic. SCHNELLER als Einblendung.
            Goldlinie verschwindet als Letztes (1 Frame nach Panel).
```

### 1.3 Remotion-Code: Bloomberg Chart

```tsx
import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from 'remotion';

interface BloombergChartProps {
  title: string;
  source: string;
  /** SVG path d-attribute for the data line */
  linePath: string;
  /** Estimated total path length */
  pathLength?: number;
  /** Y-axis labels from bottom to top */
  yLabels: string[];
  /** X-axis labels left to right */
  xLabels: string[];
  /** Line color */
  lineColor?: string;
  /** End value display text */
  endValue?: string;
  delay?: number;
}

const BLOOMBERG = {
  bg: '#0F1B2D',
  panelBg: 'rgba(15,27,45,0.92)',
  gold: '#F4C542',
  text: 'rgba(255,255,255,0.7)',
  textDim: 'rgba(255,255,255,0.5)',
  grid: 'rgba(255,255,255,0.12)',
  green: '#3CC13C',
  red: '#E32636',
};

export const BloombergChart: React.FC<BloombergChartProps> = ({
  title,
  source,
  linePath,
  pathLength = 800,
  yLabels,
  xLabels,
  lineColor = BLOOMBERG.green,
  endValue,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay; // local frame

  // ---- PHASE 1: Gold line wipe (f 0-4) ----
  const goldWidth = interpolate(f, [0, 1, 4], [0, 120, 600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.poly(4)),
  });

  // Panel height (f 3-6)
  const panelHeight = interpolate(f, [3, 6], [0, 280], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.poly(3)),
  });

  // ---- PHASE 2: Axes (f 4-9) ----
  const yAxisDraw = interpolate(f, [4, 7], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const xAxisDraw = interpolate(f, [5, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const gridOpacity = interpolate(f, [6, 9], [0, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.poly(2)),
  });
  const labelOpacity = interpolate(f, [8, 11], [0, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.poly(2)),
  });

  // ---- PHASE 3: Data line (f 8-18) ----
  const lineProgress = interpolate(f, [8, 18], [pathLength, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.poly(5)),
  });

  // End dot micro-bounce (f 18-21)
  const dotScale = spring({
    frame: Math.max(0, f - 18),
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.4 },
  });

  // ---- PHASE 4: Title clip reveal (f 6-10) ----
  const titleClip = interpolate(f, [6, 10], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.poly(3)),
  });
  const sourceOpacity = interpolate(f, [10, 13], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // End value label (f 20-23)
  const endLabelOpacity = interpolate(f, [20, 23], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const endLabelX = interpolate(f, [20, 23], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.poly(3)),
  });

  if (f < 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 660,
        top: 200,
        width: 600,
        height: 400,
        fontFamily: '"DM Sans", "Inter", sans-serif',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: '#fff',
          letterSpacing: '0.02em',
          clipPath: `inset(0 ${titleClip}% 0 0)`,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: BLOOMBERG.textDim,
          opacity: sourceOpacity,
          marginBottom: 16,
        }}
      >
        {source}
      </div>

      {/* Gold separator line */}
      <div
        style={{
          width: goldWidth,
          height: 1,
          backgroundColor: BLOOMBERG.gold,
          margin: '0 auto',
          boxShadow: `0 0 8px ${BLOOMBERG.gold}66`,
        }}
      />

      {/* Chart panel */}
      <div
        style={{
          height: panelHeight,
          backgroundColor: BLOOMBERG.panelBg,
          borderTop: `1px solid ${BLOOMBERG.gold}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          position: 'relative',
          marginTop: 0,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 560 260"
          style={{ position: 'absolute', top: 10, left: 40 }}
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((ratio, i) => (
            <line
              key={`grid-${i}`}
              x1={0}
              y1={ratio * 240}
              x2={520}
              y2={ratio * 240}
              stroke="#fff"
              strokeWidth={0.5}
              strokeDasharray="2 4"
              opacity={gridOpacity}
            />
          ))}

          {/* Y-Axis */}
          <line
            x1={0}
            y1={240}
            x2={0}
            y2={240 - 240 * yAxisDraw}
            stroke="#fff"
            strokeWidth={1.5}
            opacity={0.6}
          />
          {/* X-Axis */}
          <line
            x1={0}
            y1={240}
            x2={520 * xAxisDraw}
            y2={240}
            stroke="#fff"
            strokeWidth={1.5}
            opacity={0.6}
          />

          {/* Data line glow */}
          <path
            d={linePath}
            fill="none"
            stroke={lineColor}
            strokeWidth={4}
            strokeDasharray={pathLength}
            strokeDashoffset={lineProgress}
            opacity={0.2}
            style={{ filter: 'blur(6px)' }}
          />
          {/* Data line main */}
          <path
            d={linePath}
            fill="none"
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={lineProgress}
          />

          {/* End dot */}
          {f >= 18 && (
            <circle
              cx={520}
              cy={60}
              r={4 * interpolate(dotScale, [0, 1], [0, 1])}
              fill={lineColor}
            />
          )}
        </svg>

        {/* Axis labels */}
        {yLabels.map((label, i) => (
          <div
            key={`y-${i}`}
            style={{
              position: 'absolute',
              left: 4,
              top: 10 + (i * 240) / (yLabels.length - 1),
              fontSize: 11,
              color: BLOOMBERG.text,
              opacity: labelOpacity,
            }}
          >
            {label}
          </div>
        ))}

        {/* End value */}
        {endValue && (
          <div
            style={{
              position: 'absolute',
              right: 8,
              top: 50,
              fontSize: 18,
              fontWeight: 700,
              color: lineColor,
              opacity: endLabelOpacity,
              transform: `translateX(${endLabelX}px)`,
            }}
          >
            {endValue}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 2. VOX-STIL ERKLÄR-GRAFIK — Frame-by-Frame

### 2.1 Kern-Designprinzipien

Vox Media (insbesondere der YouTube-Kanal "Vox" mit Serien wie "Explained") nutzt ein Design-System mit folgenden festen Regeln:
- **Palette:** Maximal 4 Farben pro Video-Segment. Typisch: 1 dunkler Hintergrund (nicht schwarz, sondern dunkelgrau #2A2A2A oder dunkelblau), 1 helle Primaerfarbe (Cream/Off-White), 1 Highlighter-Akzent (Gelb #FFD700 oder Koralle #FF6B6B), 1 Daten-Farbe.
- **Highlighter-Effekt:** Das Markenzeichen. Ein gelbes, halbtransparentes Rechteck (opacity 0.35-0.45) wird HINTER einem Schluesselwort gezeichnet. Es wirkt wie ein physischer Textmarker.
- **Schichtaufbau:** Jede Infografik baut sich Schicht fuer Schicht auf — nie alles gleichzeitig.
- **Typografie:** Mix aus Serif fuer emotionale Headlines (Georgia, Playfair Display) und Sans-Serif fuer Daten (Inter, Helvetica Neue).
- **Illustration:** Flat 2D, keine Gradients auf Illustrationen (nur auf Hintergrund), dicke Outlines (2-3px).

### 2.2 Vox Infografik-Aufbau: "Vergleich zweier Laender"

```
PHASE 1: HINTERGRUND-WIPE (Frame 0-8)
──────────────────────────────────────
Frame 0:    Vorheriges Bild/Video sichtbar.

Frame 1-2:  Ein farbiger Block (z.B. #F5F0E8, warmes Off-White)
            wipet von links nach rechts ueber den gesamten Screen.
            clipPath: inset(0 X% 0 0), X geht von 100 → 0.
            Geschwindigkeit: SCHNELL.
            Frame 1: 100% → 40%
            Frame 2: 40% → 0%
            Easing: ease-out-quad.
            Es ist kein sanfter Uebergang — es ist WIPE. Hart, schnell, entschlossen.

Frame 3:    Hintergrund steht. 1 Frame Pause bevor Inhalt kommt.
            Diese Pause ist ENTSCHEIDEND — sie gibt dem Auge Zeit
            den neuen "Raum" wahrzunehmen.
```

```
PHASE 2: HEADLINE EINTIPPEN (Frame 4-15)
─────────────────────────────────────────
Frame 4:    Cursor blinkt an Position (Y=180px, links-buendig bei X=120px).
            Kein Cursor-Blink noetig — aber der Text beginnt.

Frame 4-12: Text erscheint Buchstabe fuer Buchstabe.
            "Warum Deutschland mehr zahlt"
            Geschwindigkeit: 3 Zeichen pro Frame bei 30fps = 90 chars/sec.
            Das ist SCHNELLER als ein Mensch tippt, aber langsam genug
            zum Mitlesen.
            Font: Playfair Display, 42px, weight 700, Farbe #1A1A1A.
            Kein Fade auf einzelnen Buchstaben — harter Appear.
            Kein Sound pro Buchstabe (Vox nutzt keinen Typewriter-SFX).

Frame 12-14: HIGHLIGHTER auf "mehr zahlt":
            Ein gelbes Rechteck (#FFD700, opacity 0.38) expandiert
            HINTER den letzten zwei Woertern.
            Width: 0 → gemessene Textbreite + 12px Padding.
            Height: Zeilenhoehe + 4px.
            Position: leicht unterhalb der Textmitte (wirkt natuerlicher).
            Dauer: 3 Frames.
            Easing: ease-out. KEIN Overshoot.
            Der Highlighter wipe von links nach rechts — wie ein Stift.
```

```
PHASE 3: DATENPUNKTE / ILLUSTRATION (Frame 14-28)
──────────────────────────────────────────────────
Frame 14-16: Erstes Element: Ein Flat-Illustration einer Deutschlandkarte
            Scale: 0.85 → 1.0.
            Opacity: 0 → 1.
            Dauer: 3 Frames.
            Easing: ease-out. KEIN Bounce bei Vox.
            Position: Links, Y-zentriert bei ~500px.

Frame 17-19: Zweites Element: UK-Karte rechts daneben.
            Gleiche Animation, 3 Frames Stagger.
            IDENTISCHER Animationstyp — Vox wiederholt Animationen
            innerhalb einer Grafik. Konsistenz > Abwechslung.

Frame 20-24: Zahlen erscheinen unter den Karten.
            "342 EUR/Monat" unter Deutschland.
            "187 GBP/Monat" unter UK.
            Fade + translateY: 12px → 0px.
            Dauer: 4 Frames pro Zahl.
            Stagger: 3 Frames zwischen den Zahlen.
            Font: Inter, 28px, weight 700.
            Farbe: Primaerfarbe des jeweiligen Elements.

Frame 24-28: Verbindungslinie oder Pfeil zwischen den Elementen.
            PathDraw-Animation: stroke-dashoffset animiert.
            Dauer: 5 Frames.
            Farbe: #666, 1.5px, gestrichelt.
            Ueber der Linie: Differenz-Label "1,8x".
            Erscheint nach Linie (2 Frames Stagger).
```

```
PHASE 4: ANNOTATION (Frame 26-34)
──────────────────────────────────
Frame 26-30: Ein Callout-Pfeil zeigt auf den wichtigsten Datenpunkt.
            Vox nutzt handschrift-artige Pfeile (leicht kurvig, nicht gerade).
            PathDraw, 5 Frames, Farbe passend zum Highlighter.

Frame 30-34: Annotations-Text neben dem Pfeil.
            Typewriter-Einblendung, gleiche Geschwindigkeit wie Headline.
            Font: Handschrift-artig oder kursiv (Vox nutzt manchmal
            eine echte Handschrift-Schrift fuer Annotierungen).
            Farbe: gleich wie Pfeil.

Frame 34+:  Hold. Alles steht still.
            Vox haelt Grafiken typisch 3-5 Sekunden (90-150 Frames).
            KEINE Micro-Animationen waehrend Hold.
```

### 2.3 Remotion-Code: Vox Highlighter-Effekt

```tsx
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface HighlighterTextProps {
  text: string;
  /** Words to highlight (indices in split array) */
  highlightWords: number[];
  delay?: number;
  typeSpeed?: number; // chars per frame, default 3
  highlightColor?: string;
  fontSize?: number;
  fontFamily?: string;
}

export const HighlighterText: React.FC<HighlighterTextProps> = ({
  text,
  highlightWords,
  delay = 0,
  typeSpeed = 3,
  highlightColor = 'rgba(255,215,0,0.38)',
  fontSize = 42,
  fontFamily = '"Playfair Display", Georgia, serif',
}) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  if (f < 0) return null;

  // Phase 1: Typewriter
  const visibleChars = Math.min(Math.floor(f * typeSpeed), text.length);
  const displayText = text.substring(0, visibleChars);
  const typingDone = visibleChars >= text.length;
  const typeEndFrame = Math.ceil(text.length / typeSpeed);

  // Phase 2: Highlighter (starts 2 frames after typing ends)
  const highlightStart = typeEndFrame + 2;
  const highlightProgress = interpolate(
    f,
    [highlightStart, highlightStart + 3],
    [0, 100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.poly(2)) }
  );

  const words = text.split(' ');
  const displayWords = displayText.split(' ');

  return (
    <div style={{ fontSize, fontFamily, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}>
      {words.map((word, i) => {
        const isVisible = i < displayWords.length;
        const isHighlighted = highlightWords.includes(i) && typingDone;
        const partialWord = i === displayWords.length - 1 ? displayWords[i] : word;

        return (
          <span key={i} style={{ position: 'relative', display: 'inline' }}>
            {isHighlighted && (
              <span
                style={{
                  position: 'absolute',
                  left: -4,
                  right: `${100 - highlightProgress}%`,
                  top: '15%',
                  bottom: '-5%',
                  backgroundColor: highlightColor,
                  borderRadius: 2,
                  zIndex: -1,
                }}
              />
            )}
            <span style={{ opacity: isVisible ? 1 : 0 }}>
              {isVisible ? (i === displayWords.length - 1 ? partialWord : word) : word}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </div>
  );
};
```

---

## 3. KURZGESAGT vs GENERISCH — Was GENAU den Unterschied macht

### 3.1 Animations-Geschwindigkeit

Kurzgesagt (In a Nutshell) arbeitet bei 24fps. Ihre Animationen sind im Vergleich zu generischen Erklaervideos:

| Parameter | Kurzgesagt | Generisch (Whiteboard/Vyond) |
|-----------|-----------|------------------------------|
| **Einblendung** | 6-10 Frames (250-416ms) | 15-24 Frames (625-1000ms) |
| **Ausblendung** | 4-6 Frames (166-250ms) | 10-15 Frames |
| **Hold-Zeit** | 36-72 Frames (1.5-3s) | 72-120 Frames (3-5s) |
| **Transition** | 3-6 Frames (125-250ms) | 12-20 Frames |
| **Stagger** | 2-3 Frames (83-125ms) | 6-10 Frames |

**Kernunterschied 1: Kurzgesagt ist SCHNELLER.** Nicht hektisch, sondern *entschlossen*. Generische Videos halten Animationen zu lang, was Langeweile erzeugt. Kurzgesagt's Philosophie: "Zeig es, lass es kurz sacken, geh weiter."

### 3.2 Easing-Kurven

**Kurzgesagt nutzt ueberwiegend zwei Kurventypen:**

1. **Pop-In (90% aller Einblendungen):**
   Ease-out mit leichtem Overshoot. In After Effects: "Overshoot expression" mit freq=3, decay=6.
   Remotion-Equivalent: `spring({ damping: 10, stiffness: 160, mass: 0.5 })`.
   Das Element "platzt" rein und settled schnell. Kein langes Nachschwingen.

2. **Smooth Slide (10%, nur bei grossen Szenen-Wechseln):**
   Ease-in-out-cubic. Langsam starten, schnelle Mitte, langsam stoppen.
   Remotion-Equivalent: `Easing.bezier(0.4, 0, 0.2, 1)` mit `interpolate()`.

**Was Kurzgesagt NICHT nutzt:**
- Linear (nie)
- Ease-in alleine (nie fuer Einblendungen — nur fuer Exits)
- Langsame Springs (damping > 20) — zu traege fuer ihren Stil
- Bounce (damping < 6) — zu verspielt fuer Sachinhalte

### 3.3 Gleichzeitige Bewegung

**Kurzgesagt-Regel: Maximal 3 Elemente bewegen sich gleichzeitig.**

```
RICHTIG (Kurzgesagt):
Frame 0-6:   Erde dreht sich langsam (Background-Loop, immer aktiv)
Frame 10-16: Satellit fliegt von rechts rein (EINZIGE aktive Animation)
Frame 16-22: Label zum Satellit faded ein (naechste aktive Animation)
→ Zu keinem Zeitpunkt kaempfen mehr als 2 Animationen um Aufmerksamkeit.

FALSCH (Generisch):
Frame 0-20:  Erde dreht, Sterne blinken, 3 Satelliten fliegen rein,
             Titel erscheint, Counter zaehlt, Pfeil animiert
→ Das Auge weiss nicht wohin. Chaotisch.
```

### 3.4 Stillstand-Phasen

**Kurzgesagt hat BEWUSSTE Stillstand-Phasen:**
- Nach jeder Animations-Sequenz: 1.5-3 Sekunden NICHTS bewegt sich (ausser Ambient-Loops)
- Waehrend Sprecher einen Punkt erklaert: Bild steht KOMPLETT still
- Erst wenn ein neuer Punkt beginnt, bewegt sich etwas Neues

**Generische Videos haben keine Stillstand-Phasen:**
- Immer irgendetwas animiert sich
- "Horror vacui" — Angst vor leeren/stillen Momenten
- Das wirkt amateurhaft, weil es dem Zuschauer keine Verarbeitungszeit gibt

### 3.5 Sekundaer-Animation (Background)

Kurzgesagt hat IMMER subtile Hintergrund-Animation:
- Sterne die langsam blinken (opacity 0.3-0.7 Loop, 120-180 Frames Periode)
- Wolken die langsam driften (translateX 0.2px/Frame, fast unsichtbar)
- Wasser das leicht welllt (SVG path morph, 0.5px Amplitude)
- Partikel die langsam sinken (1px/Frame, opacity 0.1-0.2)

**Aber:** Diese Ambient-Animationen sind IMMER:
- Unter 0.3 Opacity
- Langsam (60+ Frames pro Cycle)
- Nicht-ablenkend (keine ploetzlichen Aenderungen)
- UNABHAENGIG von der Hauptanimation (laufen immer, egal was passiert)

### 3.6 Farb-Einsatz

Kurzgesagt nutzt pro Video eine feste Palette von 5-7 Farben. Diese werden NIE verlassen.

**Kurzgesagt Farbregeln:**
1. Hintergrund ist IMMER eine einzelne Farbe oder ein sehr sanfter Gradient (nie busy)
2. Jedes Element hat EINE Farbe + eine dunklere Schatten-Version (20-30% dunkler, gleicher Hue)
3. Highlights/Wichtiges: Die hellste Farbe der Palette (typisch Gelb oder Weiss)
4. Schwarze Outlines (2px) auf ALLEN Illustrationen — das erzeugt den "sauberen" Look
5. Keine Gradients auf Elementen (nur Flat Color + Schatten-Stufe)

**DS-Umsetzung in unserem System:**
- Unsere LOCOS-Palette (Gold, Schwarz, Weiss, Rot) ist bereits restriktiv — gut
- Was fehlt: Schatten-Stufen. Aktuell nutzen wir goldDim, aber keine "Schatten-Version" jeder Farbe
- Was fehlt: Outline-Style als Option fuer illustrative Grafiken

---

## 4. MORPHING / SHAPE TRANSITIONS

### 4.1 SVG Path Morphing — Technische Grundlage

SVG-Path-Morphing funktioniert durch Interpolation der d-Attribute zweier Pfade. Jeder SVG-Pfad besteht aus Befehlen (M, L, C, Q, A, Z) mit Koordinaten. Morphing interpoliert die Koordinaten-Werte linear zwischen Start- und Endform.

**Grundvoraussetzung:** Beide Pfade muessen die GLEICHE Struktur haben:
- Gleiche Anzahl Befehle
- Gleiche Befehlstypen in gleicher Reihenfolge
- Gleiche Anzahl Kontrollpunkte

**Wenn die Struktur unterschiedlich ist** (und das ist der Normalfall): Einen der Pfade in aequivalente Befehle umwandeln. Beispiel: Ein Kreis hat typisch 4 C-Befehle (kubische Bezier), ein Stern hat 10 L-Befehle. Man muss den Kreis in 10 Punkte aufloesen oder den Stern in 4 kubische Kurven umwandeln.

### 4.2 Remotion Path Morphing mit @remotion/paths

```tsx
import { interpolatePath } from '@remotion/paths';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';

// Beispiel: Euro-Zeichen morpht zu Goldbarren-Umriss
const euroPath = 'M 80 30 C 70 10, 40 0, 30 15 C 15 35, 15 65, 30 85 ' +
  'C 40 100, 70 90, 80 70 M 15 40 L 65 40 M 15 60 L 65 60';

const goldBarPath = 'M 20 80 L 30 20 L 70 20 L 80 80 Z ' +
  'M 30 20 L 35 30 L 65 30 L 70 20 M 25 50 L 75 50';

// PROBLEM: Diese Pfade haben unterschiedliche Struktur.
// LOESUNG: @remotion/paths normalisiert automatisch.

const EuroToGold: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1.0 },
  });

  // interpolatePath normalisiert die Pfade intern
  const morphedPath = interpolatePath(progress, euroPath, goldBarPath);

  return (
    <svg width={100} height={100} viewBox="0 0 100 100">
      <path
        d={morphedPath}
        fill="none"
        stroke="#A68B2C"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
};
```

### 4.3 Welche Formen lassen sich gut morphen?

| Morphing-Paar | Qualitaet | Grund |
|---------------|-----------|-------|
| Kreis → Stern | Sehr gut | Aehnliche Symmetrie, Punkte verteilen sich natuerlich |
| Kreis → Quadrat | Gut | Corners expandieren, vorhersehbar |
| Euro-Zeichen → Pfeil | Mittel | Verschiedene Topologie, braucht matching |
| Buchstabe → Buchstabe | Gut | Gleiche Font = aehnliche Punktanzahl |
| Landkarte → Kreis | Schlecht | Zu viele Punkte vs. zu wenige, sieht chaotisch aus |
| Einfache Form → Komplexe Form | Schlecht | Die einfache Form "explodiert" in viele Richtungen |

**Faustregel:** Morphing wirkt am besten wenn:
1. Beide Formen aehnliche Punktanzahl haben (Differenz < 30%)
2. Beide Formen aehnliche Gesamtgroesse haben
3. Die Uebergangszeit 12-20 Frames betraegt (zu schnell = nicht lesbar, zu langsam = langweilig)
4. Ein Easing mit leichtem Ease-Out genutzt wird (nie linear)

### 4.4 Wann Morphing vs. Schnitt?

**Morphing nutzen wenn:**
- Zwei Konzepte inhaltlich verbunden sind (Euro → Inflation → Goldbarren)
- Die Transformation eine METAPHER ist ("Geld wird zu Schulden")
- Es maximal 1-2 Morphs pro 30 Sekunden gibt (sparsam!)
- Beide Formen simple Outlines sind (funktioniert schlecht mit gefuellten Flaechen)

**Schnitt (Cut/Crossfade) nutzen wenn:**
- Thema wechselt komplett
- Formen sind zu unterschiedlich fuer sauberes Morphing
- Tempo ist hoch (Morphing braucht Zeit)
- 3D-Elemente im Spiel sind (SVG Morphing ist rein 2D)

### 4.5 Performance in Remotion

`@remotion/paths` ist bereits als Dependency installiert (v4.0.445). Die `interpolatePath`-Funktion:
- Ist CPU-intensiv bei Pfaden mit >100 Punkten
- Sollte nicht auf jedem Frame fuer mehr als 3-4 Pfade gleichzeitig genutzt werden
- Kann mit `useMemo` fuer statische Pfade optimiert werden
- Die Normalisierung (unterschiedliche Pfadstrukturen angleichen) passiert pro Frame — bei identischen Pfadstrukturen ist es deutlich schneller

---

## 5. ADVANCED MASK/MATTE TECHNIKEN

### 5.1 Luma Matte vs Alpha Matte

**Alpha Matte:** Die Standard-Maske. Die Transparenz (Alpha-Kanal) eines Bildes bestimmt, was sichtbar ist. Schwarz = unsichtbar, Weiss = sichtbar, Graustufen = teiltransparent.

**Luma Matte:** Die HELLIGKEIT (Luminanz) eines Bildes bestimmt die Transparenz. Dunkle Bereiche = unsichtbar, helle Bereiche = sichtbar. Der Unterschied: Ein Luma Matte kann ein normales RGB-Bild oder Video als Maske nutzen — es braucht keinen Alpha-Kanal.

**Wann welches?**
- Alpha Matte: Standard fuer alles mit definierten Kanten (Formen, Text)
- Luma Matte: Fuer weiche, organische Reveals (Rauch, Licht, Gradient-Wipes)

### 5.2 CSS/Remotion Maskentechniken

#### 5.2.1 Animierte Clip-Path Masken

```tsx
// Kreis-Reveal: Element wird durch wachsenden Kreis enthullt
const CircleReveal: React.FC<{
  delay?: number;
  cx?: string; // '50%'
  cy?: string; // '50%'
  children: React.ReactNode;
}> = ({ delay = 0, cx = '50%', cy = '50%', children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 60, mass: 1.0 },
  });

  // circle(radius at centerX centerY)
  const radius = interpolate(progress, [0, 1], [0, 75]); // 0% to 75% radius

  return (
    <div
      style={{
        clipPath: `circle(${radius}% at ${cx} ${cy})`,
        transition: 'none', // Remotion controls this
      }}
    >
      {children}
    </div>
  );
};
```

#### 5.2.2 Polygon Wipe (Stern-Reveal)

```tsx
// Stern-Form expandiert und enthullt den Inhalt
const StarReveal: React.FC<{
  delay?: number;
  points?: number;
  children: React.ReactNode;
}> = ({ delay = 0, points = 5, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  const maxRadius = 80; // % of container
  const currentRadius = progress * maxRadius;
  const innerRadius = currentRadius * 0.4; // Inner points at 40% of outer

  // Generate star polygon points
  const starPoints: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? currentRadius : innerRadius;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    starPoints.push(`${x}% ${y}%`);
  }

  return (
    <div style={{ clipPath: `polygon(${starPoints.join(', ')})` }}>
      {children}
    </div>
  );
};
```

#### 5.2.3 Gradient Wipe (Luma-Matte Equivalent)

```tsx
// Gradient-Maske: Element wird durch einen weichen Gradient enthullt
// Dies ist das CSS-Aequivalent zu einem Luma Matte in After Effects
const GradientWipe: React.FC<{
  delay?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'radial';
  /** Softness of the edge in percentage points */
  feather?: number;
  children: React.ReactNode;
}> = ({ delay = 0, direction = 'left', feather = 15, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 50, mass: 1.2 },
  });

  // Position of the wipe edge (in %)
  const wipePos = interpolate(progress, [0, 1], [-feather, 100 + feather]);

  let maskImage: string;

  if (direction === 'radial') {
    const radius = interpolate(progress, [0, 1], [0, 85]);
    maskImage = `radial-gradient(circle at 50% 50%, black ${radius}%, transparent ${radius + feather}%)`;
  } else {
    const angle = {
      left: '90deg',
      right: '270deg',
      top: '180deg',
      bottom: '0deg',
    }[direction];

    maskImage = `linear-gradient(${angle}, black ${wipePos - feather}%, transparent ${wipePos}%)`;
  }

  return (
    <div
      style={{
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
      }}
    >
      {children}
    </div>
  );
};
```

#### 5.2.4 Track Matte (After Effects Equivalent)

In After Effects ist ein Track Matte ein separates Layer das als Maske dient. In Remotion/CSS gibt es kein direktes Equivalent, aber wir koennen es simulieren:

```tsx
// Track Matte: Ein animiertes Element (z.B. wachsender Kreis)
// wird als Maske fuer ein anderes Element verwendet
const TrackMatte: React.FC<{
  /** The matte element (e.g., an animated shape) */
  matte: React.ReactNode;
  /** The content to be revealed */
  children: React.ReactNode;
}> = ({ matte, children }) => {
  const matteId = React.useId();

  return (
    <div style={{ position: 'relative' }}>
      {/* The matte (invisible, used only for masking) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          // Render to an offscreen canvas that serves as mask
          // CSS approach: use mask-image with a rendered element
        }}
      >
        {/* SVG-based approach for programmatic track mattes */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <mask id={matteId}>
              {/* White areas = visible, black areas = hidden */}
              <rect width="100%" height="100%" fill="black" />
              <foreignObject width="100%" height="100%">
                {matte}
              </foreignObject>
            </mask>
          </defs>
        </svg>
      </div>

      {/* The content with the mask applied */}
      <div style={{ mask: `url(#${matteId})`, WebkitMask: `url(#${matteId})` }}>
        {children}
      </div>
    </div>
  );
};

// Einfachere Alternative: Clip-Path + animiertes Element
// Fuer die meisten Faelle reicht clip-path mit CSS custom shapes.
```

#### 5.2.5 Inset-Wipe (Rechteck-Reveal)

```tsx
// Rechteck wipe von einer Seite oder von der Mitte
const InsetReveal: React.FC<{
  delay?: number;
  /** 'center' = expandiert von Mitte, 'left' = von links etc. */
  origin?: 'center' | 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
}> = ({ delay = 0, origin = 'left', children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // inset(top right bottom left)
  let clipPath: string;
  const remaining = interpolate(progress, [0, 1], [100, 0]);

  switch (origin) {
    case 'left':
      clipPath = `inset(0 ${remaining}% 0 0)`;
      break;
    case 'right':
      clipPath = `inset(0 0 0 ${remaining}%)`;
      break;
    case 'top':
      clipPath = `inset(0 0 ${remaining}% 0)`;
      break;
    case 'bottom':
      clipPath = `inset(${remaining}% 0 0 0)`;
      break;
    case 'center':
      const half = remaining / 2;
      clipPath = `inset(${half}% ${half}% ${half}% ${half}%)`;
      break;
  }

  return (
    <div style={{ clipPath }}>
      {children}
    </div>
  );
};
```

---

## 6. PROCEDURAL / GENERATIVE ANIMATION

### 6.1 Noise-basierte Animation

**Was ist Noise-basierte Animation?**
Statt deterministische Keyframes zu setzen, nutzt man eine Noise-Funktion (Perlin Noise, Simplex Noise) um "organische" Pseudo-Zufallswerte zu erzeugen. Das Ergebnis: Bewegungen die natuerlich und unvorhersehbar wirken, aber NICHT zufaellig sind (gleicher Seed = gleiches Ergebnis = deterministische Renders).

**Perlin Noise vs. Simplex Noise:**
- Perlin Noise: Aelterer Algorithmus, leichte Artefakte auf Gittern, ausreichend fuer 2D
- Simplex Noise: Neuer, weniger Artefakte, besser fuer hoeherdimensionale Anwendungen
- `@remotion/noise` nutzt intern eine optimierte Simplex-Noise-Implementation

### 6.2 @remotion/noise fuer organische Bewegung

`@remotion/noise` ist bereits als Dependency installiert (v4.0.445).

```tsx
import { noise2D, noise3D } from '@remotion/noise';
import { useCurrentFrame, AbsoluteFill } from 'remotion';
import { LOCOS } from '../theme/colors';

// Organisch schwebende Partikel
const OrganicParticles: React.FC<{
  count?: number;
  speed?: number;
  color?: string;
}> = ({ count = 30, speed = 0.008, color = LOCOS.gold }) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    // noise2D(seed, x, y) => -1 bis +1
    // Seed pro Partikel anders, time als x-Achse
    const time = frame * speed;

    const x = 960 + noise2D(`particle-x-${i}`, time, i * 0.1) * 800;
    const y = 540 + noise2D(`particle-y-${i}`, time, i * 0.1 + 100) * 400;
    const scale = 0.5 + (noise2D(`particle-s-${i}`, time * 0.5, i * 0.1 + 200) + 1) * 0.5;
    const opacity = 0.05 + (noise2D(`particle-o-${i}`, time * 0.3, i * 0.1 + 300) + 1) * 0.1;

    return { x, y, scale, opacity };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: p.opacity,
            transform: `scale(${p.scale})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
```

### 6.3 Generative Hintergruende

#### Dot-Grid mit Noise-Animation

```tsx
const NoiseDotGrid: React.FC<{
  spacing?: number;
  dotSize?: number;
  noiseSpeed?: number;
  color?: string;
}> = ({
  spacing = 40,
  dotSize = 2,
  noiseSpeed = 0.005,
  color = LOCOS.gold,
}) => {
  const frame = useCurrentFrame();

  const cols = Math.ceil(1920 / spacing);
  const rows = Math.ceil(1080 / spacing);
  const time = frame * noiseSpeed;

  const dots: JSX.Element[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const baseX = col * spacing + spacing / 2;
      const baseY = row * spacing + spacing / 2;

      // Noise-basierte Verschiebung (organisch, nicht zufaellig)
      const offsetX = noise2D('grid-x', col * 0.15 + time, row * 0.15) * 6;
      const offsetY = noise2D('grid-y', col * 0.15, row * 0.15 + time) * 6;

      // Noise-basierte Opacity (Welle die durch das Grid laeuft)
      const noiseVal = noise2D('grid-o', col * 0.1 + time * 2, row * 0.1);
      const opacity = 0.03 + Math.max(0, noiseVal) * 0.12;

      // Noise-basierte Groesse
      const sizeMultiplier = 0.7 + (noise2D('grid-s', col * 0.2 + time * 0.5, row * 0.2) + 1) * 0.3;

      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={baseX + offsetX}
          cy={baseY + offsetY}
          r={dotSize * sizeMultiplier}
          fill={color}
          opacity={opacity}
        />
      );
    }
  }

  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {dots}
    </svg>
  );
};
```

#### Fliessende Wellen-Hintergrund

```tsx
const FlowingWaves: React.FC<{
  layers?: number;
  color?: string;
  speed?: number;
}> = ({ layers = 4, color = LOCOS.gold, speed = 0.01 }) => {
  const frame = useCurrentFrame();

  const wavePaths = Array.from({ length: layers }, (_, layerIndex) => {
    const time = frame * speed * (0.5 + layerIndex * 0.3);
    const yBase = 600 + layerIndex * 80; // Jede Welle etwas tiefer
    const amplitude = 30 + layerIndex * 15;
    const frequency = 0.003 + layerIndex * 0.001;
    const opacity = 0.03 + (layers - layerIndex) * 0.02;

    // Pfad generieren
    let path = `M 0 ${yBase}`;
    for (let x = 0; x <= 1920; x += 10) {
      const noiseY = noise2D(`wave-${layerIndex}`, x * frequency + time, layerIndex);
      const y = yBase + noiseY * amplitude;
      path += ` L ${x} ${y}`;
    }
    path += ` L 1920 1080 L 0 1080 Z`;

    return { path, opacity };
  });

  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {wavePaths.map((wave, i) => (
        <path key={i} d={wave.path} fill={color} opacity={wave.opacity} />
      ))}
    </svg>
  );
};
```

---

## 7. ADVANCED PARTIKEL-SYSTEME

### 7.1 Konfigurierbares Partikelsystem

```tsx
import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, random } from 'remotion';
import { LOCOS } from '../theme/colors';

type ParticlePreset = 'confetti' | 'smoke' | 'dataStream' | 'matrixRain' | 'dust';

interface ParticleSystemProps {
  preset: ParticlePreset;
  /** Frame at which system activates */
  triggerFrame?: number;
  /** Duration of the effect in frames */
  duration?: number;
  /** Number of particles */
  count?: number;
  /** Origin X (0-1920) */
  originX?: number;
  /** Origin Y (0-1080) */
  originY?: number;
  /** Primary color */
  color?: string;
  /** Effect intensity 0-1 */
  intensity?: number;
}

interface ParticleConfig {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  opacity: number;
  life: number; // 0-1 normalized lifetime
  shape: 'circle' | 'rect' | 'line' | 'char';
  char?: string;
}

const PRESET_CONFIGS: Record<ParticlePreset, {
  initParticle: (i: number, count: number, ox: number, oy: number, color: string) => ParticleConfig;
  updateParticle: (p: ParticleConfig, elapsed: number, duration: number) => ParticleConfig;
  gravity: number;
  friction: number;
}> = {
  confetti: {
    gravity: 0.15,
    friction: 0.98,
    initParticle: (i, count, ox, oy, color) => {
      const angle = random(`conf-a-${i}`) * Math.PI * 2;
      const speed = 8 + random(`conf-s-${i}`) * 12;
      const colors = [LOCOS.gold, LOCOS.goldLight, LOCOS.red, LOCOS.white, '#C8A84C'];
      return {
        x: ox,
        y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6, // Upward bias
        size: 6 + random(`conf-sz-${i}`) * 8,
        rotation: random(`conf-r-${i}`) * 360,
        rotSpeed: (random(`conf-rs-${i}`) - 0.5) * 15,
        color: colors[Math.floor(random(`conf-c-${i}`) * colors.length)],
        opacity: 0.9,
        life: 0,
        shape: 'rect',
      };
    },
    updateParticle: (p, elapsed, duration) => ({
      ...p,
      life: elapsed / duration,
      opacity: interpolate(elapsed / duration, [0, 0.7, 1], [0.9, 0.8, 0]),
    }),
  },

  smoke: {
    gravity: -0.03, // Rises
    friction: 0.96,
    initParticle: (i, count, ox, oy, color) => ({
      x: ox + (random(`smoke-x-${i}`) - 0.5) * 60,
      y: oy,
      vx: (random(`smoke-vx-${i}`) - 0.5) * 1.5,
      vy: -0.5 - random(`smoke-vy-${i}`) * 1.5,
      size: 30 + random(`smoke-sz-${i}`) * 60,
      rotation: random(`smoke-r-${i}`) * 360,
      rotSpeed: (random(`smoke-rs-${i}`) - 0.5) * 2,
      color: `rgba(120,120,120,0.06)`,
      opacity: 0.08,
      life: 0,
      shape: 'circle',
    }),
    updateParticle: (p, elapsed, duration) => ({
      ...p,
      life: elapsed / duration,
      size: p.size * (1 + elapsed * 0.01), // Grows over time
      opacity: interpolate(elapsed / duration, [0, 0.2, 0.8, 1], [0, 0.08, 0.05, 0]),
    }),
  },

  dataStream: {
    gravity: 0,
    friction: 1,
    initParticle: (i, count, ox, oy, color) => ({
      x: ox + (random(`ds-x-${i}`) - 0.5) * 100,
      y: oy + random(`ds-y-${i}`) * 1080,
      vx: 3 + random(`ds-vx-${i}`) * 4, // Always moves right
      vy: (random(`ds-vy-${i}`) - 0.5) * 0.5,
      size: 2 + random(`ds-sz-${i}`) * 3,
      rotation: 0,
      rotSpeed: 0,
      color: LOCOS.gold,
      opacity: 0.2 + random(`ds-o-${i}`) * 0.3,
      life: 0,
      shape: 'circle',
    }),
    updateParticle: (p, elapsed, duration) => ({
      ...p,
      life: elapsed / duration,
      // Wrap around when reaching screen edge
      x: p.x > 1920 ? -10 : p.x,
      opacity: interpolate(elapsed / duration, [0, 0.1, 0.9, 1], [0, p.opacity, p.opacity, 0]),
    }),
  },

  matrixRain: {
    gravity: 0.05,
    friction: 1,
    initParticle: (i, count, ox, oy, color) => {
      const chars = '01アイウエオカキクケコ$%&=+<>';
      return {
        x: (i % 48) * 40 + 20, // Column-based
        y: -20 - random(`mx-y-${i}`) * 500,
        vx: 0,
        vy: 2 + random(`mx-vy-${i}`) * 4,
        size: 14 + random(`mx-sz-${i}`) * 4,
        rotation: 0,
        rotSpeed: 0,
        color: LOCOS.gold,
        opacity: 0.1 + random(`mx-o-${i}`) * 0.4,
        life: 0,
        shape: 'char',
        char: chars[Math.floor(random(`mx-c-${i}`) * chars.length)],
      };
    },
    updateParticle: (p, elapsed, duration) => ({
      ...p,
      life: elapsed / duration,
      y: p.y > 1100 ? -20 : p.y, // Wrap
      opacity: interpolate(elapsed / duration, [0, 0.05, 0.9, 1], [0, p.opacity, p.opacity * 0.7, 0]),
    }),
  },

  dust: {
    gravity: 0.01,
    friction: 0.995,
    initParticle: (i, count, ox, oy, color) => ({
      x: random(`dust-x-${i}`) * 1920,
      y: random(`dust-y-${i}`) * 1080,
      vx: (random(`dust-vx-${i}`) - 0.5) * 0.3,
      vy: -0.1 - random(`dust-vy-${i}`) * 0.2,
      size: 1 + random(`dust-sz-${i}`) * 2.5,
      rotation: 0,
      rotSpeed: 0,
      color: LOCOS.goldLight,
      opacity: 0.04 + random(`dust-o-${i}`) * 0.08,
      life: 0,
      shape: 'circle',
    }),
    updateParticle: (p, elapsed, duration) => ({
      ...p,
      life: elapsed / duration,
      opacity: interpolate(elapsed / duration, [0, 0.1, 0.9, 1], [0, p.opacity, p.opacity, 0]),
    }),
  },
};

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  preset,
  triggerFrame = 0,
  duration = 60,
  count = 40,
  originX = 960,
  originY = 540,
  color = LOCOS.gold,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - triggerFrame;

  if (elapsed < 0 || elapsed > duration + 30) return null;

  const config = PRESET_CONFIGS[preset];

  // Generate initial particles (deterministic)
  const initialParticles = useMemo(() =>
    Array.from({ length: count }, (_, i) =>
      config.initParticle(i, count, originX, originY, color)
    ),
    [count, originX, originY, color, preset]
  );

  // Simulate physics for current frame
  const particles = initialParticles.map((initial, i) => {
    let p = { ...initial };
    // Step simulation
    for (let step = 0; step < elapsed; step++) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += config.gravity;
      p.vx *= config.friction;
      p.vy *= config.friction;
      p.rotation += p.rotSpeed;
    }
    // Apply preset-specific updates
    p = config.updateParticle(p, elapsed, duration);
    return p;
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: intensity,
      }}
    >
      {particles.map((p, i) => {
        if (p.opacity < 0.005) return null;

        if (p.shape === 'char') {
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                fontSize: p.size,
                fontFamily: 'monospace',
                color: p.color,
                opacity: p.opacity,
                transform: `rotate(${p.rotation}deg)`,
                textShadow: `0 0 8px ${p.color}60`,
              }}
            >
              {p.char}
            </div>
          );
        }

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x - p.size / 2,
              top: p.y - p.size / 2,
              width: p.size,
              height: p.shape === 'rect' ? p.size * 0.4 : p.size,
              borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'rect' ? 2 : 0,
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: `rotate(${p.rotation}deg)`,
              boxShadow: p.shape === 'circle' ? `0 0 4px ${p.color}30` : 'none',
            }}
          />
        );
      })}
    </div>
  );
};
```

**Verwendung:**
```tsx
// Konfetti bei Meilenstein
<ParticleSystem preset="confetti" triggerFrame={120} duration={60} count={80} originX={960} originY={400} />

// Subtiler Staub im Hintergrund (laeuft dauerhaft)
<ParticleSystem preset="dust" triggerFrame={0} duration={9000} count={25} intensity={0.5} />

// Matrix-Regen fuer Tech-Segment
<ParticleSystem preset="matrixRain" triggerFrame={200} duration={150} count={100} />

// Daten-Stroeme die nach rechts fliessen
<ParticleSystem preset="dataStream" triggerFrame={50} duration={200} count={30} />
```

---

## 8. GLITCH ART / DATAMOSHING

### 8.1 Was ist Datamoshing?

Datamoshing entsteht durch absichtliches Entfernen von I-Frames (Keyframes) aus einem komprimierten Video. Ohne I-Frames nutzt der Decoder weiterhin die Bewegungsdaten der P-Frames, aber bezieht sie auf das falsche Referenzbild. Das Ergebnis: Pixel des alten Bildes "fliessen" in die Form des neuen Bildes.

**In CSS/Remotion kann man echtes Datamoshing nicht reproduzieren** (das passiert auf Codec-Ebene). Aber man kann die VISUELLEN Effekte simulieren:

### 8.2 Glitch-Typen und ihre CSS-Simulation

#### Typ 1: RGB-Split (Chromatischer Aberration)
Bereits in `ChromaticAberration.tsx` implementiert. Verbesserte Version:

```tsx
// Advanced RGB-Split mit unabhaengiger Achsenbewegung pro Kanal
const AdvancedRGBSplit: React.FC<{
  triggerFrame: number;
  duration?: number;
  maxOffset?: number;
  children: React.ReactNode;
}> = ({ triggerFrame, duration = 6, maxOffset = 8, children }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - triggerFrame;

  if (elapsed < 0 || elapsed > duration) return <>{children}</>;

  // Pseudo-random jitter pro Frame
  const seed = (n: number) => {
    const x = Math.sin(n * 9301 + 49297) * 49297;
    return x - Math.floor(x);
  };

  const intensity = interpolate(elapsed, [0, 2, duration], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Jeder Kanal bewegt sich unabhaengig (X + Y)
  const redX = (seed(frame * 7 + 1) - 0.5) * maxOffset * 2 * intensity;
  const redY = (seed(frame * 7 + 2) - 0.5) * maxOffset * intensity;
  const blueX = (seed(frame * 7 + 3) - 0.5) * maxOffset * 2 * intensity;
  const blueY = (seed(frame * 7 + 4) - 0.5) * maxOffset * intensity;

  return (
    <div style={{ position: 'relative' }}>
      {/* Red channel */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translate(${redX}px, ${redY}px)`,
        opacity: 0.4,
        mixBlendMode: 'screen',
        filter: 'url(#red-only)',
      }}>
        {children}
      </div>
      {/* Blue channel */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translate(${blueX}px, ${blueY}px)`,
        opacity: 0.4,
        mixBlendMode: 'screen',
        filter: 'url(#blue-only)',
      }}>
        {children}
      </div>
      {/* SVG filters for channel isolation */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="red-only">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          </filter>
          <filter id="blue-only">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
      {/* Main layer */}
      {children}
    </div>
  );
};
```

#### Typ 2: Scanlines

```tsx
const Scanlines: React.FC<{
  triggerFrame: number;
  duration?: number;
  lineHeight?: number;
  speed?: number;
  intensity?: number;
}> = ({
  triggerFrame,
  duration = 10,
  lineHeight = 3,
  speed = 4,
  intensity = 0.3,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - triggerFrame;

  if (elapsed < 0 || elapsed > duration) return null;

  const opacity = interpolate(elapsed, [0, 2, duration - 2, duration], [0, intensity, intensity, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const offset = (elapsed * speed) % (lineHeight * 2);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 95,
        opacity,
        background: `repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent ${lineHeight}px,
          rgba(0,0,0,0.4) ${lineHeight}px,
          rgba(0,0,0,0.4) ${lineHeight * 2}px
        )`,
        backgroundPositionY: offset,
        mixBlendMode: 'multiply',
      }}
    />
  );
};
```

#### Typ 3: Pixel-Block-Shift (Block-Glitch)

```tsx
const BlockGlitch: React.FC<{
  triggerFrame: number;
  duration?: number;
  blockCount?: number;
  maxShift?: number;
  children: React.ReactNode;
}> = ({
  triggerFrame,
  duration = 4, // KURZ! Glitch sollte max 4-6 Frames sein
  blockCount = 8,
  maxShift = 50,
  children,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - triggerFrame;

  if (elapsed < 0 || elapsed > duration) {
    return <div style={{ position: 'relative' }}>{children}</div>;
  }

  const seed = (n: number) => {
    const x = Math.sin(n * 9301 + 49297) * 49297;
    return x - Math.floor(x);
  };

  const intensity = interpolate(elapsed, [0, 1, duration], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const blocks = Array.from({ length: blockCount }, (_, i) => ({
    top: `${seed(frame * 100 + i * 11) * 100}%`,
    height: `${3 + seed(frame * 100 + i * 17) * 12}%`,
    shiftX: (seed(frame * 100 + i * 23) - 0.5) * maxShift * 2 * intensity,
  }));

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {children}
      {/* Shifted slices */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {blocks.map((block, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: block.top,
              left: 0,
              right: 0,
              height: block.height,
              transform: `translateX(${block.shiftX}px)`,
              overflow: 'hidden',
            }}
          >
            {/* Clone of children, shifted */}
            <div style={{ position: 'absolute', inset: 0, transform: `translateY(-${block.top})` }}>
              {children}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 8.3 Wann Glitch "cool" vs "billig"

| Cool | Billig |
|------|--------|
| Max 4-6 Frames Dauer | Laenger als 15 Frames — wirkt wie ein Bug |
| Genau auf einem Beat/Impact | Zufaellig platziert, kein Kontext |
| Einmal pro 15-30 Sekunden | Alle 3 Sekunden — ermuedend |
| Begleitet von SFX (kurzer Glitch-Buzz) | Ohne Sound — wirkt verloren |
| Im Kontext von Tech/Disruption/Krise | Bei jedem Thema — wirkt wie "Default-Effekt" |
| Intensity 0.5-0.7 | Intensity 1.0 — zu aggressiv |
| RGB-Split ODER Block-Shift, nicht beides | Alles gleichzeitig — ueberladen |

---

## 9. HOLOGRAPHIC / IRIDESCENT EFFECTS

### 9.1 Holografischer Schimmer in CSS

```tsx
const HolographicSheen: React.FC<{
  /** Speed of the color animation */
  speed?: number;
  /** Opacity of the effect */
  intensity?: number;
  children: React.ReactNode;
}> = ({ speed = 0.02, intensity = 0.15, children }) => {
  const frame = useCurrentFrame();
  const time = frame * speed;

  // Rotating conic gradient creates holographic rainbow effect
  const angle = time * 60; // degrees

  // Shifting hue for iridescence
  const hue1 = (time * 100) % 360;
  const hue2 = (hue1 + 60) % 360;
  const hue3 = (hue1 + 180) % 360;
  const hue4 = (hue1 + 240) % 360;

  return (
    <div style={{ position: 'relative' }}>
      {children}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `conic-gradient(
            from ${angle}deg at 50% 50%,
            hsla(${hue1}, 80%, 70%, ${intensity}) 0deg,
            hsla(${hue2}, 70%, 60%, ${intensity * 0.7}) 90deg,
            hsla(${hue3}, 90%, 65%, ${intensity}) 180deg,
            hsla(${hue4}, 75%, 60%, ${intensity * 0.8}) 270deg,
            hsla(${hue1}, 80%, 70%, ${intensity}) 360deg
          )`,
          mixBlendMode: 'color-dodge',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
};
```

### 9.2 Gradient-Mesh Animation

```tsx
const AnimatedGradientMesh: React.FC<{
  colors?: string[];
  speed?: number;
}> = ({
  colors = [
    'rgba(166,139,44,0.2)',   // Gold
    'rgba(200,168,76,0.15)',  // Gold Light
    'rgba(100,80,200,0.1)',   // Purple hint
    'rgba(60,160,200,0.08)',  // Teal hint
  ],
  speed = 0.008,
}) => {
  const frame = useCurrentFrame();
  const time = frame * speed;

  // 4 control points that orbit slowly
  const points = colors.map((color, i) => {
    const phase = (i * Math.PI * 2) / colors.length;
    const x = 50 + Math.cos(time + phase) * 30;
    const y = 50 + Math.sin(time * 0.7 + phase) * 25;
    return { x, y, color };
  });

  // Build multiple radial gradients
  const gradients = points.map(
    (p) => `radial-gradient(ellipse at ${p.x}% ${p.y}%, ${p.color} 0%, transparent 70%)`
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: gradients.join(', '),
        filter: 'blur(40px)',
      }}
    />
  );
};
```

### 9.3 Gold Premium-Effekt (Specular Highlight)

```tsx
// Speziell fuer Gold-Premium-Branding: Ein wandernder Specular-Highlight
const GoldSpecular: React.FC<{
  delay?: number;
  /** Duration of one sweep in frames */
  sweepDuration?: number;
  children: React.ReactNode;
}> = ({ delay = 0, sweepDuration = 60, children }) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  if (f < 0) return <>{children}</>;

  // One sweep, then hold
  const sweepPos = interpolate(
    f,
    [0, sweepDuration],
    [-30, 130],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.poly(2)) }
  );

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: `${sweepPos}%`,
            width: '20%',
            height: '140%',
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(255,255,255,0.25), rgba(255,255,255,0.15), transparent)`,
            transform: 'skewX(-20deg)',
          }}
        />
      </div>
    </div>
  );
};
```

**Wann holographische Effekte nutzen:**
- Premium-Branding-Momente (Gold/Edelmetall-Themen)
- Celebratory Moments (Meilensteine, positive Nachrichten)
- Tech/Zukunft-Themen (Innovation, Disruption)
- NICHT bei seriosen Daten-Prasentationen (wirkt unserioes)
- NICHT oefter als 1x pro 60 Sekunden

---

## 10. DIE "LETZTE MEILE" — POLISH

### 10.1 Was unterscheidet 95% von 100%

Die letzten 5% Qualitaet kommen aus Details die kein Zuschauer bewusst sieht, aber jeder unbewusst fuehlt. Hier die konkreten Techniken:

### 10.2 Micro-Bounce auf dem letzten Frame

Wenn ein Element seine Endposition erreicht hat, 1-2 Frames nach Stillstand einen winzigen Bounce (0.5-1px) einfuegen. Das verhindert den "dead stop" — das Gefuehl dass die Animation abrupt endet.

```tsx
// Nach dem spring settlement: Mini-Settle
const MicroSettle: React.FC<{
  delay?: number;
  children: React.ReactNode;
}> = ({ delay = 0, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  // Extra micro-bounce NACH dem settle (Frame 16-20 bei standard spring)
  const settleFrame = delay + 16; // approximate settle frame
  const microBounce = frame > settleFrame
    ? Math.sin((frame - settleFrame) * 0.8) * Math.exp(-(frame - settleFrame) * 0.3) * 0.8
    : 0;

  return (
    <div
      style={{
        transform: `translateY(${interpolate(mainSpring, [0, 1], [40, 0]) + microBounce}px)`,
        opacity: interpolate(mainSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
      }}
    >
      {children}
    </div>
  );
};
```

### 10.3 Schatten die auf Bewegung reagieren

Statt eines statischen box-shadow: Shadow-Offset aendert sich basierend auf der Bewegungsrichtung des Elements, mit 2-3 Frames Verzoegerung.

```tsx
const DynamicShadow: React.FC<{
  delay?: number;
  children: React.ReactNode;
}> = ({ delay = 0, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  // Shadow reagiert 2 Frames spaeter (Follow-Through)
  const shadowProgress = spring({
    frame: frame - delay - 2,
    fps,
    config: { damping: 10, stiffness: 80, mass: 1.0 },
  });

  const moveY = interpolate(progress, [0, 1], [40, 0]);
  // Shadow offset ist INVERS zur Bewegung und verzoegert
  const shadowY = interpolate(shadowProgress, [0, 0.5, 1], [0, 12, 4]);
  const shadowBlur = interpolate(shadowProgress, [0, 0.5, 1], [8, 40, 20]);
  const shadowOpacity = interpolate(shadowProgress, [0, 0.3, 1], [0, 0.4, 0.25]);

  return (
    <div
      style={{
        transform: `translateY(${moveY}px)`,
        opacity: interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
        boxShadow: `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`,
      }}
    >
      {children}
    </div>
  );
};
```

### 10.4 Glow der einmal pulsiert bei Ankunft

```tsx
const ArrivalGlow: React.FC<{
  delay?: number;
  color?: string;
  children: React.ReactNode;
}> = ({ delay = 0, color = LOCOS.gold, children }) => {
  const frame = useCurrentFrame();

  // One-shot pulse: peaks at 5 frames after arrival, fades over 15 frames
  const arrivalFrame = delay + 14; // approximate when spring settles
  const pulseElapsed = frame - arrivalFrame;

  const glowIntensity = pulseElapsed >= 0
    ? interpolate(
        pulseElapsed,
        [0, 5, 20],
        [0, 0.5, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 0;

  return (
    <div
      style={{
        filter: glowIntensity > 0.01
          ? `drop-shadow(0 0 ${10 + glowIntensity * 30}px ${color}${Math.round(glowIntensity * 200).toString(16).padStart(2, '0')})`
          : 'none',
      }}
    >
      {children}
    </div>
  );
};
```

### 10.5 Grain-Overlay auf Grafiken (nicht nur auf Video)

Das bestehende `FilmGrain.tsx` liegt ueber dem gesamten Video. Fuer premium-feel sollte Grain auch INNERHALB von Grafik-Containern liegen:

```tsx
// Leichtes Grain innerhalb eines Containers (nicht fullscreen)
const InlineGrain: React.FC<{
  opacity?: number;
  children: React.ReactNode;
}> = ({ opacity = 0.04, children }) => {
  const frame = useCurrentFrame();
  const seed = frame * 7 + 42;

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {children}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          opacity,
        }}
      >
        <filter id={`ig-${frame}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#ig-${frame})`} />
      </svg>
    </div>
  );
};
```

### 10.6 Subtle Color-Shift (Hue-Drift)

```tsx
// Unmerkliche Hue-Verschiebung ueber 10 Sekunden
// +-2 Grad — nicht sichtbar, aber das Bild wirkt "lebendig"
const HueDrift: React.FC<{
  range?: number; // degrees, default 2
  period?: number; // frames per cycle, default 300 (10s)
  children: React.ReactNode;
}> = ({ range = 2, period = 300, children }) => {
  const frame = useCurrentFrame();

  const hueShift = Math.sin((frame * 2 * Math.PI) / period) * range;

  return (
    <div style={{ filter: `hue-rotate(${hueShift}deg)` }}>
      {children}
    </div>
  );
};
```

### 10.7 Edge-Highlight (wandernder Specular)

Bereits in Sektion 9.3 (`GoldSpecular`) beschrieben. Fuer Kanten von Containern:

```tsx
const EdgeHighlight: React.FC<{
  speed?: number;
  color?: string;
}> = ({ speed = 0.015, color = 'rgba(255,255,255,0.08)' }) => {
  const frame = useCurrentFrame();

  // Moving highlight entlang der Kante
  const pos = (frame * speed * 100) % 400 - 100; // -100 to 300, wrapping

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        borderRadius: 'inherit',
      }}
    >
      {/* Top edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${pos}%`,
          width: '30%',
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  );
};
```

### 10.8 Ambient-Partikel im Hintergrund

Bereits in Sektion 6.2 (`OrganicParticles`) beschrieben. Die optimalen Werte fuer Ambient-Einsatz:
- count: 15-25 (nicht mehr, wirkt hektisch)
- speed: 0.004-0.008 (langsam)
- opacity pro Partikel: 0.03-0.10 (kaum sichtbar)
- size: 1-4px
- Farbe: LOCOS.gold oder LOCOS.goldLight
- IMMER aktiv, unabhaengig von anderen Animationen

### 10.9 Komplette Polish-Checkliste

```
POLISH-PASS CHECKLISTE (vor finalem Render)
────────────────────────────────────────────
[ ] Kein Element bewegt sich linear (ALLE spring oder eased)
[ ] Stagger zwischen ALLEN gleichzeitig erscheinenden Elementen (min 2f)
[ ] Film Grain aktiv (3-6% opacity)
[ ] Vignette aktiv (30-40% an Raendern)
[ ] Ambient-Partikel im Hintergrund (15-25, kaum sichtbar)
[ ] Schatten auf ALLEN schwebenden Elementen
[ ] Glow auf ALLEN Gold-Akzenten
[ ] Audio-Sync: Impacts auf Beats (+-2 Frames Toleranz)
[ ] Hold-Zeiten: Min 45 Frames (1.5s) zwischen Animationen
[ ] Micro-Bounce auf MicroBounce.tsx-Wrappern fuer statische Elemente
[ ] Color Grade durchgehend (ColorGrade.tsx)
[ ] Letterbox bei cinematic Momenten
[ ] Kein Element bei 100% weiss — immer leicht off-white (#EBE9E4)
[ ] Typografie-Hierarchie: Headline 56-72, Sub 28-36, Body 18-24
[ ] Mindestens 80px Padding zum Bildschirmrand
```

---

## ZUSAMMENFASSUNG: Fehlende Komponenten im Codebase

Nach dieser Analyse fehlen folgende Komponenten in `src/components/`:

| Komponente | Prioritaet | Beschreibung |
|------------|-----------|--------------|
| `ParticleSystem.tsx` | Hoch | Konfigurierbares System mit Presets (confetti, smoke, dataStream, matrixRain, dust) |
| `CircleReveal.tsx` | Hoch | Clip-Path Kreis-Reveal |
| `InsetReveal.tsx` | Hoch | Clip-Path Rechteck-Wipe (left, right, center) |
| `GradientWipe.tsx` | Mittel | CSS-Masken basierter Gradient-Reveal (Luma-Matte-Equivalent) |
| `HighlighterText.tsx` | Mittel | Vox-Stil Highlighter mit Typewriter |
| `NoiseDotGrid.tsx` | Mittel | Generativer Dot-Grid Hintergrund mit @remotion/noise |
| `FlowingWaves.tsx` | Niedrig | Noise-basierte Wellen-Hintergrund-Schichten |
| `OrganicParticles.tsx` | Mittel | Noise-gesteuerte Ambient-Partikel |
| `Scanlines.tsx` | Niedrig | Glitch-Overlay fuer Tech-Momente |
| `BlockGlitch.tsx` | Niedrig | Block-Verschiebungs-Glitch |
| `HolographicSheen.tsx` | Niedrig | Conic-Gradient Regenbogen-Overlay |
| `GoldSpecular.tsx` | Mittel | Wandernder Licht-Sweep auf Gold-Elementen |
| `DynamicShadow.tsx` | Mittel | Schatten der auf Bewegung reagiert (Follow-Through) |
| `HueDrift.tsx` | Niedrig | Unmerkliche Farbverschiebung ueber Zeit |
| `BloombergChart.tsx` | Hoch | Bloomberg-Stil Chart-Aufbau |

Bestehende Verbesserungen (kein neuer Komponenten-Code noetig, nur Updates):

| Komponente | Aenderung |
|-----------|-----------|
| `AnimatedText.tsx` | Anticipation (2-3f Gegenbewegung) hinzufuegen |
| `NumberCounter.tsx` | `overshootClamping: true` in spring config |
| `IconWithLabel.tsx` | Stagger: Label 3 Frames nach Icon |
| `ImpactShockwave.tsx` | Easing statt linearer `elapsed/duration` |
| `GlitchEffect.tsx` | Duration von 8 auf 4-6 reduzieren (Best Practice) |
