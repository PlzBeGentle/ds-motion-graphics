# Motion Graphics Grundprinzipien — Deep Research Report

> Referenz-Dokument fuer professionelle Animationen in ds-motion-graphics.
> Alle Werte sind fuer 25fps (DS-Standard) und 30fps (Reel-Standard) angegeben.

---

## 1. Die 12 Disney-Prinzipien — angewendet auf YouTube Motion Graphics

### 1.1 Squash & Stretch auf Text/Grafiken

**Prinzip:** Objekte verformen sich bei Bewegung — sie werden in Bewegungsrichtung gestaucht und senkrecht dazu gestreckt. Das vermittelt Gewicht und Elastizitaet.

**Anwendung auf Motion Graphics:**
- Text der einblendet: Beim Landen kurz auf 95% Y / 105% X stauchen (2-3 Frames), dann auf 100% zurueckfedern
- Zahlen-Counter: Beim Erreichen des Endwerts kurz minimal skalieren (101-102%), dann zurueck
- Buttons/Badges: Beim Pop-In auf 110% Y / 95% X ueberschiessen, dann settlen
- WICHTIG: Bei Text SEHR dezent — max 3-5% Verformung, sonst wird es cartoonhaft

**Konkret in Remotion:**
```tsx
// Squash & Stretch beim Landen eines Elements
const squash = spring({ frame: frame - landFrame, fps, config: { damping: 8, stiffness: 200, mass: 0.5 } });
const scaleX = interpolate(squash, [0, 0.5, 1], [1, 1.04, 1]);
const scaleY = interpolate(squash, [0, 0.5, 1], [1, 0.96, 1]);
// transform: `scale(${scaleX}, ${scaleY})`
```

### 1.2 Anticipation (Vorwarnung vor Bewegung)

**Prinzip:** Bevor ein Objekt sich bewegt, bewegt es sich kurz in die ENTGEGENGESETZTE Richtung. Das bereitet das Auge vor und gibt der Bewegung Gewicht.

**Anwendung auf Motion Graphics:**
- Text fliegt nach rechts rein → zuerst 8-15px nach LINKS verschieben (3-4 Frames), dann nach rechts
- Element skaliert hoch → zuerst auf 95% schrumpfen (2-3 Frames), dann auf 100%+ hochziehen
- Bar Chart waechst nach oben → Balken zuckt 2-3px nach UNTEN bevor er hochschiesst
- Lower Third schiebt von links rein → zuerst 10px nach links zurueckziehen

**Timing:**
- Anticipation-Phase: 2-4 Frames bei 25fps (80-160ms)
- Bewegungs-Phase: 8-14 Frames (320-560ms)
- Verhaeltnis: Anticipation ist ~20-25% der Gesamtbewegung

**Konkret in Remotion:**
```tsx
// Anticipation + Bewegung
const t = interpolate(frame - delay, [0, 3, 15], [0, -0.05, 1], {
  extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
});
// Erst -5% (zurueckziehen), dann auf 100% (Endposition)
const translateX = interpolate(t, [-0.05, 0, 1], [-10, 0, targetX]);
```

### 1.3 Follow-Through & Overlapping Action

**Prinzip:** Wenn ein Objekt stoppt, stoppen nicht alle Teile gleichzeitig. Leichtere Teile schwingen nach, schwerere stoppen zuerst.

**Anwendung auf Motion Graphics:**
- Headline stoppt → Subtitle schwingt 2-3 Frames laenger nach
- Grafik-Container stoppt → Inhalte (Icons, Text) kommen 3-5 Frames spaeter zur Ruhe
- Chart-Linie stoppt → Glow/Schatten schwingt 2 Frames nach
- Lower Third stoppt → Goldlinie federt 1-2 Frames laenger

**Konkret:**
- Hauptelement: damping 12, kommt auf Frame X zur Ruhe
- Sekundaer-Element: damping 8 (weicher), startet 2-3 Frames spaeter
- Dekoratives Element: damping 6, startet 4-5 Frames spaeter

### 1.4 Slow In / Slow Out (Easing)

**DAS WICHTIGSTE PRINZIP. Lineare Bewegung sieht IMMER billig aus.**

**Warum linear = billig:**
- Reale Objekte beschleunigen und bremsen
- Lineare Bewegung hat keine Traegheit → wirkt gewichtslos → wirkt digital → wirkt billig
- Jedes PowerPoint-Default ist linear → sofortige "Schulprojekt"-Assoziation

**Die vier Basis-Kurven:**

| Kurve | Cubic-Bezier | Einsatz |
|-------|-------------|---------|
| **Standard (ease-in-out)** | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Universell, Element bewegt sich auf Screen |
| **Deceleration (ease-out)** | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Element KOMMT auf Screen (schnell rein, langsam bremsen) |
| **Acceleration (ease-in)** | `cubic-bezier(0.4, 0.0, 1, 1)` | Element GEHT von Screen (langsam starten, schnell raus) |
| **Sharp** | `cubic-bezier(0.4, 0.0, 0.6, 1)` | Temporaere Elemente, schnell ein/aus |

**In Remotion:** Spring-Animationen haben automatisch Easing eingebaut. Die `spring()` Funktion simuliert physikalisches Easing. Fuer kubisches Easing: `Easing.bezier(x1, y1, x2, y2)` mit `interpolate()`.

### 1.5 Arcs (Bogenfoermige Bewegungspfade)

**Prinzip:** Natuerliche Bewegung folgt IMMER Boegen, nie geraden Linien. Ein Ball fliegt in einer Parabel, eine Hand bewegt sich in einem Bogen.

**Anwendung auf Motion Graphics:**
- Icons die einblenden: Nicht gerade von links nach Mitte, sondern in einem leichten Bogen (translateY + translateX gleichzeitig mit unterschiedlichem Easing)
- Elemente die "fallen": Parabolische Kurve (Y quadratisch, X linear)
- Tooltips/Popups: Leichter Aufwaertsbogen beim Erscheinen, nicht gerade nach oben

**Konkret:**
```tsx
// Bogen-Bewegung statt gerader Linie
const progress = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 80, mass: 1 } });
const x = interpolate(progress, [0, 1], [startX, endX]);
const y = interpolate(progress, [0, 0.5, 1], [startY, startY - 30, endY]); // Bogen nach oben
```

### 1.6 Secondary Action (Begleitbewegungen)

**Prinzip:** Kleine Nebenbewegungen die die Hauptaktion unterstuetzen, ohne von ihr abzulenken.

**Anwendung auf Motion Graphics:**
- Text blendet ein → subtiler Goldshimmer swept ueber den Text (bereits in GradientShine.tsx)
- Zahl zaehlt hoch → dezentes Pulsieren des Hintergrund-Glows
- Chart baut sich auf → Gridlinien faden gleichzeitig subtil ein
- Element erscheint → Mini-Partikel/Dust am Eintrittspunkt
- Lower Third schiebt rein → Hintergrund dimmt minimal (2-3% dunkler)

**WICHTIG:** Secondary Actions muessen SUBTIL sein. Opacity 0.05-0.15, nie prominent.

### 1.7 Staging (Blickfuehrung)

**Prinzip:** Zu jedem Zeitpunkt muss EINE Sache die Aufmerksamkeit haben. Staging lenkt den Blick.

**Anwendung auf Motion Graphics:**
- Nur EIN Element animiert sich zur gleichen Zeit als Hauptaktion
- Restliche Elemente sind statisch oder haben nur Secondary Actions
- Kontrast nutzen: Das wichtigste Element ist am hellsten/groessten
- Weissraum um das Hauptelement herum
- Hintergrund dimmen wenn Overlay aktiv ist (GraphicBackdrop bei 82% schwarz)
- Motion: Das Auge folgt Bewegung — das sich bewegende Element hat automatisch Aufmerksamkeit

---

## 2. Was macht Animationen BILLIG vs TEUER?

### 2.1 Die 7 Todssuenden billiger Animation

| # | Billig | Teuer |
|---|--------|-------|
| 1 | **Lineare Bewegung** — kein Easing, alles gleiche Geschwindigkeit | **Physik-basiert** — spring(), ease-out, Beschleunigung/Verzoegerung |
| 2 | **Alles gleichzeitig** — alle Elemente poppen simultan | **Gestaffelt** — 50-100ms Offset zwischen Elementen, Hierarchie |
| 3 | **Nur Fade** — Opacity 0→1, fertig | **Kombination** — Fade + translateY + scale + leichter Blur |
| 4 | **Falsche Dauer** — zu schnell (2-3 Frames) oder zu langsam (60+ Frames) | **Sweet Spot** — 12-18 Frames rein, 8-12 Frames raus |
| 5 | **Kein Overshoot** — Element stoppt exakt an Endposition | **Leichter Overshoot** — 2-5% uebers Ziel, dann zurueck |
| 6 | **Flat Design** — keine Tiefe, keine Textur | **Layered** — Schatten, Glow, Grain, Vignette, Noise-Textur |
| 7 | **Generische Schrift** — Arial, Calibri, eine Groesse | **Typografie-System** — 3-4 Groessen, 2 Gewichte, Spacing |

### 2.2 "Element fliegt rein" vs "Element hat Gewicht und Physik"

**PowerPoint-Einblendung:**
```
Frame 0: Element bei Position A
Frame 1: Element bei Position B
→ Sofort da, kein Easing, kein Overshoot, keine Anticipation
```

**Professionelle Einblendung (Beispiel: Headline von unten):**
```
Frame 0-2:   Element bei startY, opacity 0
Frame 3-4:   Anticipation — Element bewegt sich 5px WEITER RUNTER, opacity 0→0.3
Frame 5-8:   Schnelle Hauptbewegung nach oben, opacity 0.3→0.95
Frame 9-11:  Overshoot — Element schiesst 8px UEBER Zielposition
Frame 12-14: Settle — Element federt zurueck auf exakte Zielposition, opacity 1.0
Frame 15:    Subtiler Scale-Settle von 101%→100%
```
Gesamt: 15 Frames = 600ms bei 25fps. Das ist der "Weight"-Feel.

### 2.3 Motion Design Polish — die unsichtbaren Details

**Die Details die keiner bewusst sieht, aber JEDER unbewusst fuehlt:**

1. **Film Grain** — 3-6% Opacity, wechselt jeden Frame (bereits in FilmGrain.tsx)
2. **Vignette** — Raender 30-40% abdunkeln, zieht Auge zur Mitte
3. **Subtiler Schatten** — Nicht `box-shadow: 5px 5px black`, sondern:
   - Primaer: `0 4px 30px rgba(0,0,0,0.5)` (weich, weit)
   - Sekundaer: `0 1px 3px rgba(0,0,0,0.3)` (scharf, nah)
4. **Goldener Glow** — Nicht einfarbig, sondern Gradient: goldDim → gold → goldLight
5. **Letterpsacing** — 0.02em-0.04em auf Headlines, 0.06em-0.12em auf Caps
6. **Noise/Textur auf Flaechen** — feTurbulence SVG-Filter bei 2-4% Opacity
7. **Micro-Bewegung im Hintergrund** — Langsamer Drift (0.5px/Frame), nie komplett statisch
8. **Color Grading** — Leichte Warm/Cool-Shifts ueber die Dauer des Videos

---

## 3. Konkrete Timing-Werte — die Bibel

### 3.1 Animations-Dauern bei 25fps

| Animation | Frames @25fps | Millisekunden | Easing |
|-----------|--------------|---------------|--------|
| **Pop-In (Scale 0→1)** | 12-15 | 480-600 | spring, damping 8-12 |
| **Slide-In (von Seite)** | 14-18 | 560-720 | spring, damping 12-15 |
| **Fade-In** | 8-12 | 320-480 | ease-out |
| **Fade-Out** | 6-10 | 240-400 | ease-in |
| **Number Counter** | 20-35 | 800-1400 | spring, damping 20 |
| **Bar Chart Aufbau** | 18-25 | 720-1000 | spring, damping 15 |
| **Line Draw** | 25-40 | 1000-1600 | spring, damping 25 |
| **Stagger-Offset** | 2-4 pro Element | 80-160ms | — |
| **Hold (Lese-Zeit)** | 45-90 | 1800-3600 | — |
| **Overshoot-Peak** | Frame 8-10 | — | — |
| **Settle nach Overshoot** | 4-6 | 160-240 | — |
| **Anticipation** | 2-4 | 80-160 | — |

### 3.2 Animations-Dauern bei 30fps (Reels)

| Animation | Frames @30fps | Millisekunden |
|-----------|--------------|---------------|
| **Pop-In** | 14-18 | 467-600 |
| **Slide-In** | 17-22 | 567-733 |
| **Fade-In** | 10-15 | 333-500 |
| **Fade-Out** | 8-12 | 267-400 |
| **Stagger-Offset** | 2-5 pro Element | 67-167ms |

### 3.3 Material Design Referenz-Dauern

| Kontext | Dauer |
|---------|-------|
| Desktop Transitionen | 150-200ms |
| Mobile Standard | 300ms |
| Mobile komplex/Fullscreen | 375ms |
| Elemente rein | 225ms |
| Elemente raus | 195ms |
| Maximum sinnvoll | 400ms |

---

## 4. Easing-Kurven — die Referenz

### 4.1 Material Design Kurven (Production-Proven)

| Name | Cubic-Bezier | Wann nutzen |
|------|-------------|-------------|
| **Standard** | `(0.4, 0.0, 0.2, 1)` | Default fuer alles auf Screen |
| **Deceleration** | `(0.0, 0.0, 0.2, 1)` | Elemente kommen rein (ease-out) |
| **Acceleration** | `(0.4, 0.0, 1, 1)` | Elemente gehen raus (ease-in) |
| **Sharp** | `(0.4, 0.0, 0.6, 1)` | Temporaere Overlays |

### 4.2 Overshoot-Kurven

| Name | Cubic-Bezier | Effekt |
|------|-------------|--------|
| **Gentle Overshoot** | `(0.34, 1.56, 0.64, 1)` | Sanfter Spring bei Ankunft |
| **Strong Overshoot** | `(0.68, -0.6, 0.32, 1.6)` | Zurueckziehen + Ueberschiessen |
| **Back-Out** | `(0.175, 0.885, 0.32, 1.275)` | Klassischer Back-Ease |

### 4.3 Remotion Spring-Presets (KERNSTUECK)

#### Preset-Tabelle fuer ds-motion-graphics:

| Zweck | damping | stiffness | mass | Overshoot? | Frames ~25fps |
|-------|---------|-----------|------|------------|---------------|
| **Snappy Pop-In** | 12 | 200 | 0.5 | Minimal | ~10 |
| **Standard Einblendung** | 12 | 100 | 0.8 | Ja, dezent | ~14 |
| **Smooth Slide** | 15 | 80 | 1.0 | Nein | ~18 |
| **Bouncy Stamp** | 6 | 200 | 0.8 | Ja, stark | ~20 |
| **Heavy Counter** | 20 | 60 | 1.0 | Nein | ~30 |
| **Line Draw** | 25 | 40 | 1.5 | Nein | ~35 |
| **Gentle Fade** | 14 | 120 | 0.6 | Minimal | ~12 |
| **Bar Growth** | 15 | 80 | 1.0 | Dezent | ~22 |
| **Wipe/Reveal** | 18 | 50 | 1.2 | Nein | ~25 |
| **No-Bounce (clamped)** | 20 | 100 | 1.0 | Nein (clamp) | ~15 |

#### Erklaerung der Parameter:

- **damping hoch (15-25):** Keine Schwingung, sanftes Anhalten → Professionell, ernst
- **damping niedrig (4-8):** Starkes Nachschwingen → Spielerisch, energetisch
- **stiffness hoch (150-300):** Schnelle, snappige Reaktion → Impact-Momente
- **stiffness niedrig (30-60):** Langsame, schwere Bewegung → Daten, Charts
- **mass niedrig (0.3-0.6):** Leicht, schnell → kleine UI-Elemente
- **mass hoch (1.2-2.0):** Schwer, traege → grosse Container, Hintergruende

---

## 5. Overshoot — wann und wie

### 5.1 Was ist Overshoot?

Das Element schiesst 2-8% UEBER die Zielposition hinaus, dann federt es zurueck. In Remotion: spring() mit damping < 15 erzeugt automatisch Overshoot.

### 5.2 Overshoot-Sequenz in Frames (Scale-Animation)

```
Frame 0:    scale 0.0   (unsichtbar)
Frame 1-3:  scale 0→0.6 (schnelle Beschleunigung)
Frame 4-7:  scale 0.6→1.08 (Ueberschiessen um 8%)
Frame 8-9:  scale 1.08→0.97 (Zurueckfedern unter Ziel)
Frame 10-11: scale 0.97→1.02 (Leichtes Nachschwingen)
Frame 12:   scale 1.02→1.0 (Settle)
```
Gesamt: 12 Frames = 480ms bei 25fps

### 5.3 Overshoot-Amplitude nach Kontext

| Kontext | Overshoot | Warum |
|---------|-----------|-------|
| **Headline Text** | 3-5% | Dezent, Lesbarkeit nicht stoeren |
| **Icon Pop-In** | 8-12% | Energetisch, Aufmerksamkeit |
| **Stamp/Badge** | 15-30% (scale 4→1) | Dramatisch, bereits in StampEffect.tsx |
| **Bar Chart** | 2-4% | Subtil, Daten muessen korrekt wirken |
| **Counter-Zahl** | 0% (clamp) | Zahlen duerfen NICHT ueberschiessen |
| **Lower Third** | 3-5px Position | Leichtes Nachfedern der Position |

### 5.4 Dan Ebberts Overshoot-Expression (Referenz)

```javascript
freq = 3;    // Schwingungsfrequenz (3 = Standard, 5 = schneller)
decay = 5;   // Abklingrate (5 = Standard, 8 = schneller gedaempft)
// Erzeugt: Ziel + amplitude * sin(t*w) / e^(decay*t) / w
```

---

## 6. Stagger/Offset — gestaffelte Animationen

### 6.1 Grundregel

Elemente einer Gruppe NICHT gleichzeitig einblenden, sondern mit 50-100ms Versatz (2-3 Frames bei 25fps).

### 6.2 Offset-Werte

| Szenario | Offset pro Element | Max Gesamtdauer |
|----------|-------------------|-----------------|
| Navigationspunkte | 50-80ms (1-2 Frames) | < 400ms |
| Listenpunkte (3-5 Items) | 80-120ms (2-3 Frames) | < 800ms |
| Grid-Elemente (6-12 Items) | 40-60ms (1-2 Frames) | < 1000ms |
| Chart-Balken | 60-100ms (2-3 Frames) | < 1200ms |

### 6.3 Hierarchie-Reihenfolge

1. **Zuerst:** Hauptelement (Headline, wichtigste Zahl)
2. **Dann:** Unterstuetzende Elemente (Subtitle, Labels)
3. **Dann:** Dekorative Elemente (Lines, Dots, Grid)
4. **Zuletzt:** Hintergrund-Effekte (Glow, Particles)

### 6.4 Konkret in Remotion

```tsx
// Stagger-Pattern fuer eine Liste
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
const STAGGER_FRAMES = 3; // 120ms bei 25fps

{items.map((item, i) => (
  <AnimatedText
    key={i}
    text={item}
    delay={baseDelay + i * STAGGER_FRAMES}
    animation="fly-up"
  />
))}
```

---

## 7. Finance/News Motion Graphics Stile

### 7.1 Bloomberg TV Stil

**Merkmale:**
- Extrem saubere Typografie: Serifenlose Schrift (Bloomberg eigene), eng gesperrt
- Farben: Primaer Weiss auf Dunkelblau/Schwarz, Akzent in Rot/Gruen (Boerse)
- Overlays: Horizontale Balken, von links reinschiebend, mit Goldlinie
- Animationen: Sehr kontrolliert, kaum Overshoot, kurze Dauern (200-300ms)
- Charts: Clean, minimale Gridlines, Datenpunkte pulsieren subtil
- Lower Thirds: Slide-In von links, Farbbalken als Indikator, sofort lesbar

**Chart-Animation Bloomberg-Stil:**
```
Frame 0-3:   Axes faden ein (ease-out, 120ms)
Frame 4-6:   Grid-Lines zeichnen sich (stroke-dasharray Animation)
Frame 7-20:  Datenlinie zeichnet sich von links nach rechts
Frame 20-22: Datenpunkt am Ende pulsiert (scale 1.0 → 1.3 → 1.0)
Frame 22-25: Label faded ein neben dem Datenpunkt
```

### 7.2 CNBC / Fox Business Stil

**Merkmale:**
- Staerker gebrandete Farben (CNBC blau, Fox rot)
- Mehr Gloss/Gradient auf Containern
- 3D-Effekte auf Logos und Trennlinien
- Ticker-Animation am unteren Rand (konstante lineare Bewegung — HIER ist linear OK)
- Breaking-News Flash: Schneller Scale-In + Rot-Puls

### 7.3 Al Jazeera / BBC Dokumentar-Stil

**Merkmale:**
- Grosszuegigerer Weissraum als Bloomberg
- Langsamere Animationen (400-600ms)
- Mehr Partikel und atmosphaerische Effekte
- Infografiken bauen sich Schicht fuer Schicht auf
- Handschrift-Stil-Annotationen (PathDraw-artig)

### 7.4 Vox Video-Essay Stil

**Kern-Merkmale:**
- Minimalistisch, illustrativ, 2D
- Begrenzte Farbpalette (3-4 Farben pro Video)
- Highlighter-Effekt auf Schluesselwoertern (gelb, halbtransparent)
- Map-Animationen (GEOlayers-Stil)
- Typografie: Mix aus Serif (Headlines) und Sans-Serif (Body)
- Charts: Simpel, grosse Labels, animierte Zahlen
- Transitions: Meistens Wipe oder Draw-On, selten Fades

**Vox Infografik-Aufbau:**
```
Phase 1 (Frame 0-8):   Hintergrundflaeche wipe-in von links
Phase 2 (Frame 5-15):  Headline typed rein (Buchstabe fuer Buchstabe)
Phase 3 (Frame 12-25): Datenpunkte erscheinen gestaffelt (je 3 Frames)
Phase 4 (Frame 20-35): Verbindungslinien zeichnen sich zwischen Punkten
Phase 5 (Frame 30-40): Annotation/Label faded ein am wichtigsten Punkt
```

### 7.5 Johnny Harris Stil

**Kern-Merkmale:**
- Karten-Animationen als Kernelement (Zoom, Pan, Highlight-Regionen)
- Cutout-Fotos mit animierten Rahmen
- Hand-Drawn-Feel auf Annotierungen
- Schnelle Schnitte zwischen "Talking Head" und Grafik
- Filmische Transitions (Cross-Dissolve, Light Leaks)
- Grafiken wirken absichtlich "editorial" — wie aus einem Magazin

### 7.6 Netflix Doku Stil ("Inside Job", "Social Dilemma")

**Kern-Merkmale:**
- Cinematic Color Grade (teal/orange oder kalt/blau)
- Infografiken eingebettet in reale Footage (Compositing)
- Slow-Motion-Effekte auf Grafiken (alles wirkt "gewichtig")
- Tiefenunschaerfe auf Hintergruenden
- Subtile Partikel-Systeme
- Typografie: Stark, bold, wenig Woerter, GROSS
- Animations-Dauer tendenziell laenger (500-800ms) fuer "cinematic feel"

---

## 8. Die "Agency Look" Checkliste

### 8.1 Typografie-Hierarchie

**Professionell = 3 klar getrennte Ebenen:**

| Ebene | Groesse (1080p) | Gewicht | Spacing | Beispiel |
|-------|-----------------|---------|---------|----------|
| **Headline** | 56-72px | 700 (Bold) | 0.02em | "3,7 Billionen Euro" |
| **Subtitle** | 28-36px | 500 (Medium) | 0.04em | "Schuldenstand Deutschland" |
| **Body/Label** | 18-24px | 400 (Regular) | 0.06em | "Quelle: Bundesbank 2024" |
| **Micro/Caption** | 14-16px | 400 | 0.08em | Datenpunkt-Labels |

**Regel:** Zwischen den Ebenen mindestens 1.5x Groessenunterschied. 72px Headline → 36px Subtitle → 24px Body.

### 8.2 Farb-Beschraenkung

**Maximum 3+1 Farben:**
- 1 Primaer-Farbe (Gold: #A68B2C)
- 1 Neutral (Weiss: #EBE9E4)
- 1 Hintergrund (Schwarz: #161514)
- +1 Akzent fuer Warnungen (Rot: #E30613)

**Warum 3 Farben besser als 7:**
- Weniger Farben = staerkere Markenidentitaet
- Jede zusaetzliche Farbe verwirrt das visuelle System
- Farbvariationen durch Opacity: gold bei 100%, 60%, 30% statt neue Farben
- Bloomberg nutzt 3 Farben. Canva-User nutzen 8.

### 8.3 Whitespace / Negative Space

**Mindestens 20% der Flaeche muss LEER sein.**

| Zone | Mindest-Padding |
|------|-----------------|
| Bildschirmrand zu Content | 80-120px |
| Zwischen Headline und Subtitle | 24-40px |
| Zwischen Grafik-Elementen | 16-24px |
| Innerhalb Container (Padding) | 32-48px |

**Die Regel:** Im Zweifel MEHR Platz lassen. Weniger Inhalt mit mehr Luft wirkt teurer als vollgestopfte Slides.

### 8.4 Grid-System

**8-Punkt-Grid fuer Video (1920x1080):**
- Alle Positionen auf 8px-Raster ausrichten
- Margins: 80px links/rechts = "Safe Area"
- Vertikale Drittel: 360px Spalten
- Horizontale Drittel: 640px Reihen

### 8.5 Micro-Animationen

| Effekt | Wie | Wann |
|--------|-----|------|
| **Glow-Pulse** | opacity 0.3→0.6→0.3, Dauer 60-90 Frames, Loop | Auf wichtigen Zahlen waehrend Hold |
| **Shimmer-Sweep** | Linear-gradient Position -20%→120%, 30-40 Frames | Nach Text-Einblendung (bereits in BuzzwordLowerThird) |
| **Breathe** | scale 1.0→1.02→1.0, Dauer 90-120 Frames, Loop | Auf Containern waehrend Hold |
| **Subtle Drift** | translateX 0→3px, 120+ Frames | Hintergrund-Elemente, immer |
| **Dot Pulse** | r 3→5→3, opacity 0.4→0.8→0.4 | Datenpunkte auf Charts |

### 8.6 Textur und Tiefe

**Layer-Stack von hinten nach vorne:**
1. **Hintergrund** — Solide Farbe (#161514)
2. **Gradient-Overlay** — Radial, Mitte heller (5-8% transparent)
3. **Grid/Pattern** — HexGrid oder subtile Linien (3-8% Opacity)
4. **Content** — Die eigentlichen Grafiken
5. **Schatten** — Unter Content-Containern
6. **Glow** — Um Akzent-Elemente
7. **Film Grain** — SVG Noise (3-6% Opacity)
8. **Vignette** — Radial-Gradient Abdunkelung

---

## 9. Zahlen und Charts professionell animieren

### 9.1 Counter-Animationen

**Aktueller Stand in NumberCounter.tsx:**
- spring mit damping 20, stiffness 60, mass 1
- Das ist gut fuer langsames, schweres Hochzaehlen

**Optimierung:**
```tsx
// Schneller Counter (kurze Zahlen, z.B. "47%")
config: { damping: 18, stiffness: 100, mass: 0.8 }
// ~20 Frames, kein Overshoot weil damping > sqrt(4*stiffness*mass)

// Langsamer Counter (grosse Zahlen, z.B. "3.700.000.000")
config: { damping: 22, stiffness: 40, mass: 1.5 }
// ~40 Frames, langsam anlaufend, majestaetisch bremsend

// NIEMALS: Overshoot bei Zahlen! Immer damping hoch genug oder overshootClamping: true
```

**tabular-nums bereits korrekt gesetzt** — verhindert dass Ziffern bei unterschiedlicher Breite springen.

### 9.2 Bar Chart Animation

**Professioneller Aufbau:**
```
Phase 1 (Frame 0-5):    Achsen-Linien zeichnen sich (PathDraw-Stil)
Phase 2 (Frame 3-7):    Labels faden ein (gestaffelt, je 2 Frames)
Phase 3 (Frame 6-25):   Balken wachsen von unten hoch
                         → spring damping 15, stiffness 80, mass 1.0
                         → 2-3% Overshoot, dann settle
                         → Stagger: 3 Frames zwischen Balken
Phase 4 (Frame 22-28):  Wert-Labels erscheinen am Balkenende (fade + slide)
Phase 5 (Frame 25-30):  Highlight-Balken bekommt Glow-Pulse
```

**Balken-Easing:** Ease-Out mit leichtem Overshoot. NICHT linear hochfahren (wirkt wie Ladebalken).

### 9.3 Line Chart Animation

**Die "Geile Linie" — 5 Layer:**

1. **Shadow-Line** — 4px stroke, blur(4px), opacity 0.1, color gold
2. **Glow-Line** — 6px stroke, blur(8px), opacity 0.15, color goldLight
3. **Main-Line** — 2.5px stroke, opacity 0.8, color gold
4. **Bright-Core** — 1px stroke, opacity 0.4, color white (innerster Kern)
5. **Travel-Dot** — circle r=4, goldLight, reist am Endpunkt der Zeichnung mit

**Animation:**
- stroke-dasharray = pathLength
- stroke-dashoffset: pathLength → 0 (spring, damping 25, stiffness 40, mass 1.5)
- Travel-Dot: Position = aktuelle dashoffset-Position
- Am Endpunkt: Dot expanded zu scale 1.5, dann shrink + pulse-loop

**PathDraw.tsx hat bereits den Grundansatz** — fehlt: Multi-Layer Glow und Travel-Dot mit korrekter Position.

### 9.4 Vergleichs-Grafiken (A vs B)

**Pattern: Split-Screen mit synchronem Aufbau**

```
Frame 0-3:   Mittellinie zeichnet sich vertikal (von oben nach unten)
Frame 3-8:   Labels "A" und "B" erscheinen links/rechts der Linie
Frame 6-20:  Beide Balken/Werte wachsen GLEICHZEITIG (gleicher Startframe!)
             → Laengerer Balken/groessere Zahl MUSS schneller wachsen
             → Beide kommen GLEICHZEITIG zum Stopp
Frame 18-25: Differenz-Indikator erscheint (Pfeil, Prozentzahl)
Frame 23-28: Hervorhebung des "Gewinners" (Glow, groesser, heller)
```

**Wichtig:** Beide Seiten GLEICHZEITIG starten und stoppen. Unterschied nur in der Endgroesse.

---

## 10. Konkrete Code-Werte — Quick Reference

### 10.1 Der "Perfect Pop-In"

```tsx
// Fuer Icons, Badges, kleine Elemente
const pop = spring({
  frame: frame - delay,
  fps,
  config: { damping: 10, stiffness: 180, mass: 0.5 },
});
const scale = interpolate(pop, [0, 1], [0.3, 1]);
const opacity = interpolate(pop, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });
// Ergebnis: Schnell auf ~110%, settle auf 100% in ~12 Frames
```

### 10.2 Der "Cinematic Slide-In"

```tsx
// Fuer Headlines, Lower Thirds
const slide = spring({
  frame: frame - delay,
  fps,
  config: { damping: 14, stiffness: 80, mass: 1.0 },
});
const translateY = interpolate(slide, [0, 1], [50, 0]);
const opacity = interpolate(slide, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });
// Ergebnis: Smooth von unten, kein/kaum Overshoot, 16-18 Frames
```

### 10.3 Der "News Ticker Build"

```tsx
// Fuer Lower Thirds Bloomberg-Stil
const wipe = spring({
  frame: frame - delay,
  fps,
  config: { damping: 18, stiffness: 120, mass: 0.6 },
});
const clipX = interpolate(wipe, [0, 1], [0, 100]);
// Container: clipPath: `inset(0 ${100 - clipX}% 0 0)`
// Gold-Linie: Separat, 3 Frames vorher starten
```

### 10.4 Der "Data Reveal"

```tsx
// Fuer Chart-Werte, Counter
const reveal = spring({
  frame: frame - delay,
  fps,
  config: { damping: 20, stiffness: 60, mass: 1.2 },
  // overshootClamping: true  ← aktivieren wenn Zahl NICHT ueberschiessen darf
});
// Dauer: ~30 Frames, schwer und praezise
```

### 10.5 Der "Stamp Drop"

```tsx
// Bereits in StampEffect.tsx — Analyse:
// damping: 6, stiffness: 200, mass: 0.8
// Scale: 4 → 1 (starkes Overshoot wegen niedrigem damping)
// = Dramatisch, Aufmerksamkeit, "Urteil"
```

---

## 11. Abgleich mit bestehendem Code

### 11.1 Was bereits GUT ist

| Komponente | Staerke |
|------------|---------|
| AnimatedText.tsx | Spring-basiert, 5 Animation-Types, Glow-Option |
| NumberCounter.tsx | tabular-nums, lokalisierte Formatierung, passendes Easing |
| GradientShine.tsx | Shimmer-Sweep als Secondary Action — exzellent |
| BuzzwordLowerThird.tsx | Flash + Shimmer + Slide = 3 Layer Polish |
| FilmGrain.tsx | Frame-basierter Seed, Vignette-Option |
| StampEffect.tsx | Starkes Overshoot fuer dramatischen Impact |
| PathDraw.tsx | Glow-Layer + Main-Layer = professioneller Ansatz |

### 11.2 Was verbessert werden KANN

| Komponente | Verbesserung | Prinzip |
|------------|-------------|---------|
| AnimatedText.tsx | **Anticipation fehlt** — Element springt direkt von Start zu Ziel. 2-3 Frames Gegenbewegung einbauen. | Anticipation |
| AnimatedText.tsx | **Kein Follow-Through** — alles stoppt gleichzeitig. Glow sollte 2-3 Frames nachfedern. | Follow-Through |
| NumberCounter.tsx | **overshootClamping fehlt** — Zahlen koennten theoretisch ueber Zielwert springen. | Staging |
| GoldBar.tsx | **Kein Glow-Pulse nach Aufbau** — Bar ist nach Animation tot/statisch. Subtiles Pulsieren. | Secondary Action |
| IconWithLabel.tsx | **Gleichzeitige Animation** — Icon und Label starten zusammen. Label sollte 3 Frames spaeter kommen. | Stagger |
| TimelineItem.tsx | **Kein Arc** — Dot und Labels skalieren gerade hoch. Leichter Y-Bogen waere natuerlicher. | Arcs |
| CameraMove.tsx | **Nur ease-out** — Kein spring(), keine Physik. Wirkt mechanisch. | Slow In/Out |
| ImpactShockwave.tsx | **Linear progression** — `elapsed/duration` ist linear. Braucht Easing. | Slow In/Out |

---

## 12. Zusammenfassung — die 10 Gebote professioneller Motion Graphics

1. **NIEMALS linear.** Jede Bewegung braucht Easing. Spring-Physik bevorzugen.
2. **Alles gestaffelt.** Kein Element gleichzeitig mit einem anderen. Minimum 2 Frames Offset.
3. **Anticipation einbauen.** 2-4 Frames Gegenbewegung vor der Hauptbewegung.
4. **Overshoot kontrolliert einsetzen.** 3-8% bei visuellen Elementen, 0% bei Daten/Zahlen.
5. **Timing beachten.** Ein: 12-18 Frames. Hold: 45-90 Frames. Aus: 8-12 Frames.
6. **Tiefe erzeugen.** Minimum 3 Layer: Glow, Hauptelement, Schatten.
7. **Textur nicht vergessen.** Film Grain, Noise, Vignette — immer bei 3-8% Opacity.
8. **Farben limitieren.** Maximum 3+1 Farben. Variationen durch Opacity.
9. **Typografie-Hierarchie.** 3 klar getrennte Groessen mit 1.5x Faktor dazwischen.
10. **Weissraum atmen lassen.** 20%+ der Flaeche muss leer bleiben.
