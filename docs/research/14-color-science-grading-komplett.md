# COLOR SCIENCE & COLOR GRADING — Komplette Wissensbasis

> Datum: 04.04.2026
> Kontext: Daniel Sauer YouTube Finance Channel (LOCOS), Remotion Pipeline
> Niveau: Professioneller Colorist — Frame-genaue Werte, Vectorscope-Winkel, CSS-Properties, Hex/RGB/HSL

---

## LEGENDE

**Relevanz-Rating (1-5) fuer "YouTube Talking-Head Finance Channel":**
- **5** = In JEDEM Video anwenden
- **4** = Deutliche Qualitaetssteigerung
- **3** = Nice to have, hebt das Level
- **2** = Nur bei speziellen Formaten
- **1** = Akademisch interessant

---

# 1. COLOR THEORY FUNDAMENTALS

## 1.1 Farbrad — 12 Farben

Das Farbrad organisiert Farben in einer kreisfoermigen Anordnung basierend auf chromatischer Verwandtschaft.

### Primaerfarben (Licht/Additiv: RGB)
| Farbe | Hex | RGB | HSL | Winkel |
|-------|-----|-----|-----|--------|
| Rot | #FF0000 | 255, 0, 0 | 0°, 100%, 50% | 0° |
| Gruen | #00FF00 | 0, 255, 0 | 120°, 100%, 50% | 120° |
| Blau | #0000FF | 0, 0, 255 | 240°, 100%, 50% | 240° |

### Sekundaerfarben
| Farbe | Hex | RGB | HSL | Winkel |
|-------|-----|-----|-----|--------|
| Gelb | #FFFF00 | 255, 255, 0 | 60°, 100%, 50% | 60° |
| Cyan | #00FFFF | 0, 255, 255 | 180°, 100%, 50% | 180° |
| Magenta | #FF00FF | 255, 0, 255 | 300°, 100%, 50% | 300° |

### Tertiaerfarben
| Farbe | Hex | Winkel |
|-------|-----|--------|
| Orange | #FF8000 | 30° |
| Chartreuse | #80FF00 | 90° |
| Spring Green | #00FF80 | 150° |
| Azure | #0080FF | 210° |
| Violett | #8000FF | 270° |
| Rose | #FF0080 | 330° |

**Relevanz: 3** — Grundlagenwissen, das hilft Komplementaer-Kontraste bewusst einzusetzen.

## 1.2 Farbschemata / Color Harmonies

### Komplementaerfarben (180° Abstand)
Zwei gegenueberliegende Farben auf dem Rad. Maximaler Kontrast, hohe visuelle Energie.
- Blau (#0000FF) + Orange (#FF8000)
- Rot (#FF0000) + Cyan (#00FFFF)
- Gelb (#FFFF00) + Violett (#8000FF)

**Warum Teal & Orange funktioniert:** Hauttoene liegen bei ca. 20-40° auf dem Farbrad (Orange-Bereich). Der Komplementaer-Kontrast dazu liegt bei ca. 200-220° (Teal/Cyan-Bereich). Somit werden Hauttoene automatisch zum visuellen Fokus gegenueber dem Teal-Hintergrund. Das ist kein Zufall — es ist angewandte Farbtheorie.

### Analogous (benachbart, je 30° Abstand)
Drei nebeneinanderliegende Farben. Harmonisch, ruhig, wenig Kontrast.
- Gold (#C8A84C) + Orange (#E8A020) + Warm Red (#E85020) — LOCOS-artig
- Verwendung: Vertrauensbildende Segmente, ruhige Erklaerpassagen

### Triadic (je 120° Abstand)
Drei gleichmaessig verteilte Farben. Lebendig, ausgewogen.
- Rot + Blau + Gelb (Primaerachse)
- Orange + Gruen + Violett (Sekundaerachse)
- Verwendung: Selten im Color Grading, eher in Infografiken/Charts

### Split-Complementary
Eine Grundfarbe + die beiden Nachbarn ihrer Komplementaerfarbe. Weniger aggressiv als reiner Komplementaer-Kontrast.
- Gold (#C8A84C) + Azure (#0080FF) + Violett (#8000FF)
- Verwendung: Elegante, "teure" Farbkombinationen

**Relevanz: 4** — Komplementaer (Teal/Orange) und Analogous (Gold-Range) sind die beiden zentralen Schemata fuer Finance-Content.

## 1.3 Warme vs Kalte Farben — Psychologische Wirkung

### Warme Farben (0°-60°, 300°-360°): Rot, Orange, Gelb
- **Psychologie:** Energie, Naehe, Dringlichkeit, Waerme, Emotion
- **Physiologisch:** Erhoehte Herzfrequenz, gesteigerte Aufmerksamkeit
- **Finance-Kontext:** Urgency, Call to Action, "JETZT handeln", Gewinn-Momente
- **LOCOS-Anwendung:** Gold (#A68B2C) ist bewusst warm — Vertrauen + Wert

### Kalte Farben (180°-270°): Cyan, Blau, Violett
- **Psychologie:** Distanz, Ruhe, Autoritaet, Kompetenz, Analyse
- **Physiologisch:** Reduzierte Herzfrequenz, erhoehte Konzentration
- **Finance-Kontext:** Datenanalyse, "sachliche Betrachtung", Risiko-Warnung
- **LOCOS-Anwendung:** Teal in Schatten erzeugt analytische Kuehle

### Neutral (60°-180°): Gruen
- **Psychologie:** Wachstum, Geld, Sicherheit, Natur
- **Finance-Kontext:** Gewinne (gruene Zahlen), positive Entwicklung

**Relevanz: 5** — Der Emotionsbogen eines Videos laesst sich durch Warm/Kalt-Verschiebung in der Color Grade steuern. Genau das macht die AnimatedGrade-Komponente in der EZB-Falle-Composition.

## 1.4 Saettigung vs Helligkeit vs Hue — Emotionale Steuerung

### Hue (Farbton, 0-360°)
- Bestimmt WAS wir sehen (Rot, Blau, Gruen...)
- Emotionale Grundrichtung (warm/kalt/neutral)
- Aenderung = komplette Stimmungsaenderung

### Saturation (Saettigung, 0-100%)
- Bestimmt die INTENSITAET der Farbe
- **Hohe Saettigung (70-100%):** Energie, Jugend, Pop-Kultur, YouTube-Thumbnails
- **Mittlere Saettigung (40-70%):** Professionell, vertrauenswuerdig, Broadcast-Look
- **Niedrige Saettigung (10-40%):** Ernst, dramatisch, "teuer", Film-Look
- **0% Saettigung:** Schwarzweiss — extremste Dramatik
- Finance-YouTube: 50-70% Saettigung ist der Sweet Spot. Zu bunt = unserioes, zu entsaettigt = langweilig auf kleinen Screens

### Lightness/Value (Helligkeit, 0-100%)
- Bestimmt wie HELL oder DUNKEL die Farbe ist
- **Hohe Helligkeit:** Leichtigkeit, Optimismus, Klarheit
- **Mittlere Helligkeit:** Neutral, ausgewogen
- **Niedrige Helligkeit:** Schwere, Ernsthaftigkeit, Dramatik, Luxus
- Finance-YouTube: Leicht unterdurchschnittliche Helligkeit (brightness 0.95-0.98) wirkt "cinematic"

**Relevanz: 5** — Die drei Parameter sind die Grundbausteine jedes Grade. Saettigung bei 55-65% + Helligkeit bei 95-98% + Hue-Shift warm = der LOCOS-Look.

## 1.5 Color Harmony — Warum manche Kombinationen "teuer" aussehen

### Das Geheimnis des "teuren" Looks
Drei Faktoren machen eine Farbkomposition hochwertig:

1. **Reduzierte Palette:** Maximal 3 dominante Farben. Jede weitere Farbe senkt die wahrgenommene Wertigkeit. Bloomberg: Schwarz + Amber + Weiss. Financial Times: Creme + Teal + Schwarz. LOCOS: Gold + Schwarz + Rot (Akzent).

2. **Geringfuegige Entsaettigung:** Luxusmarken nutzen nie volle Saettigung. Statt #FF0000 (pures Rot) verwenden sie #C8102E (gedaempftes Rot). Statt #FFD700 (Goldgelb) verwenden sie #A68B2C (gedaempftes Gold, wie LOCOS). Die Reduktion um 20-40% Saettigung signalisiert unterbewusst "kein billiges Plastik".

3. **Komplementaer-Kontrast mit niedrigem Chroma:** Der Teal & Orange-Look funktioniert als "teuer", weil beide Seiten leicht entsaettigt sind. Voll gesaettigtes Orange + Teal = Spielzeug. Entsaettigtes Orange (Hautton) + gemuetetes Teal (Schatten) = Kino.

**Relevanz: 5** — Direkt anwendbar auf jeden Frame. Die LOCOS-Palette folgt diesen Prinzipien bereits.

---

# 2. COLOR SPACES & TECHNISCHE GRUNDLAGEN

## 2.1 Rec.709 — Der YouTube-Standard

- **Was:** ITU-Empfehlung fuer HDTV. Definiert Primaerfarben (Rot, Gruen, Blau), Weissabgleichpunkt (D65 bei 6500K) und Gamma-Kurve (ca. 2.4)
- **Gamut-Abdeckung:** ca. 35.9% des CIE 1931 Farbraums
- **Primaer-Koordinaten (CIE xy):**
  - Rot: x=0.640, y=0.330
  - Gruen: x=0.300, y=0.600
  - Blau: x=0.150, y=0.060
- **Warum wichtig:** YouTube, Vimeo, alle Streaming-Dienste, alle SDR-Fernseher und 99% aller Mobilgeraete zeigen Rec.709 an. ALLES was fuer YouTube produziert wird, MUSS in Rec.709 ausgeliefert werden.
- **Transfer Function:** Gamma ~2.4 (technisch: ein Stueck linear unter 0.018, dann Potenzfunktion)

**Relevanz: 5** — Export-Farbraum fuer JEDES YouTube-Video. Kein Rec.2020, kein DCI-P3.

## 2.2 sRGB — Fast identisch mit Rec.709

- **Was:** IEC-Standard fuer Computer-Monitore und Web
- **Gamut:** Identische Primaerfarben wie Rec.709 — exakt derselbe Farbumfang
- **Unterschied:** Nur die Transfer Function (Gamma-Kurve) ist anders. sRGB nutzt Gamma ~2.2 (optimiert fuer helle Raeume), Rec.709 nutzt Gamma ~2.4 (optimiert fuer dunkle Raeume)
- **Praxis-Konsequenz:** Ein sRGB-Bild auf einem Rec.709-Monitor sieht minimal dunkler aus als beabsichtigt (und umgekehrt). Der Unterschied ist subtil (~5% Helligkeitsverschiebung in Mitteltoenern)

**Relevanz: 4** — Remotion rendert in sRGB (Web-Standard). Da YouTube sowieso Rec.709 erwartet und die Gamuts identisch sind, ist der Unterschied marginal. Aber: bei der Farbkalibrierung des Monitors beachten.

## 2.3 DCI-P3 — Digital Cinema

- **Was:** SMPTE-Standard fuer digitale Kinoprojektion
- **Gamut-Abdeckung:** ca. 53.6% des CIE 1931 Farbraums (1.5x Rec.709)
- **Praxis:** Alle modernen Apple-Geraete (iPhone, MacBook, iPad) koennen DCI-P3 anzeigen. Das bedeutet: ein iPhone-Nutzer KANN mehr Farben sehen als Rec.709 liefert — aber YouTube liefert nur Rec.709 SDR
- **Falle:** Wenn du auf einem DCI-P3-Display gradest aber in Rec.709 exportierst, siehst du waehrend der Arbeit Farben, die im Export nicht existieren (Gamut Clipping)

**Relevanz: 3** — Nur relevant bei der Monitor-Kalibrierung. Apple-Nutzer mit P3-Displays sehen eine leicht gedaempfte Version des Grades.

## 2.4 Rec.2020 — Ultra HD

- **Was:** ITU-Empfehlung fuer UHD/4K/8K
- **Gamut-Abdeckung:** ca. 75.8% des CIE 1931 Farbraums (2.1x Rec.709)
- **Praxis:** Kein Consumer-Display kann Rec.2020 vollstaendig anzeigen (Stand 2026). Es ist ein Ziel-Farbraum fuer die Zukunft.
- **YouTube:** Wenn du Rec.2020 ohne HDR-Metadata hochlaedst, konvertiert YouTube automatisch zu Rec.709 mit 8-bit — dabei gehen Farben verloren und es kann zu Banding kommen. NIEMALS Rec.2020 SDR fuer YouTube exportieren.

**Relevanz: 2** — Nur relevant wenn HDR-Content produziert wird. Fuer Daniel Sauer: irrelevant.

## 2.5 Log-Profile — Warum Profis in Log filmen

### Was ist ein Log-Profil?
Ein Log-Profil (logarithmisches Gamma) komprimiert den Dynamikumfang der Kamera in ein flaches, kontrastloses, entsaettigtes Bild. Statt die 14+ Blendenstufen eines Sensors in 256 Helligkeitswerte (8-bit) linear zu quetschen, verteilt Log die Werte logarithmisch: mehr Stufen in den Mitten, wo das Auge am empfindlichsten ist.

### Verbreitete Log-Profile
| Profil | Hersteller | Dynamikumfang | Mittelpunkt |
|--------|------------|---------------|-------------|
| S-Log3 | Sony | ~15 Stops | 41% IRE bei 18% Grau |
| C-Log3 | Canon | ~14 Stops | 33% IRE bei 18% Grau |
| V-Log | Panasonic | ~14 Stops | 42% IRE bei 18% Grau |
| N-Log | Nikon | ~12 Stops | 38% IRE bei 18% Grau |
| Log-C | ARRI | ~14+ Stops | 38% IRE bei 18% Grau |

### Warum Log?
1. **Mehr Spielraum im Grade:** Highlights und Schatten sind nicht abgeschnitten — du kannst im Grade "zurueckholen" was in Rec.709 bereits verloren waere
2. **Flexibilitaet:** Du entscheidest in der Post ueber Kontrast, nicht die Kamera
3. **Konsistenz:** Verschiedene Lichtbedingungen lassen sich leichter angleichen

### Das 8-bit-Problem mit Log
**KRITISCH:** Log auf 8-bit ist kontraproduktiv. 8-bit = 256 Helligkeitsstufen. Wenn du 14 Stops Dynamik in 256 Stufen quetschst, hat JEDE Stufe einen riesigen Helligkeitssprung. Beim Grading (Kontrast-Erhoehung) werden diese Stufen sichtbar = **Banding**. Log MUSS mit 10-bit (1024 Stufen) oder hoeher aufgenommen werden.

**Relevanz: 3** — Daniel Sauer filmt nicht in Log (Talking-Head, kontrolliertes Licht). Aber wichtig zu wissen fuer B-Roll und Stock-Footage-Einkauf.

## 2.6 Gamma Curves — Was passiert technisch

### Lineare Gamma (1.0)
- Jede Stufe entspricht einer gleichen Menge Licht
- Sieht extrem dunkel aus auf einem Monitor, weil Monitore nicht-linear darstellen
- Wird intern in Compositing-Software verwendet (Linear Workflow)

### Rec.709 Gamma (~2.4)
- Standardkurve fuer HDTV
- Kompensiert die nicht-lineare Lichtausgabe von Monitoren
- Mittleres Grau (18% reflektiert) = ca. 46% Code Value

### sRGB Gamma (~2.2)
- Leicht flacher als Rec.709
- Mittleres Grau = ca. 50% Code Value (deshalb sehen sRGB-Bilder auf Rec.709 leicht heller aus)

### Log Gamma
- Stark abgeflachte Kurve
- Mittleres Grau bei ca. 38-42% Code Value (je nach Profil)
- Braucht eine Technical LUT (Log -> Rec.709) als Ausgangspunkt

**Relevanz: 3** — Technisches Verstaendnis hilft beim Debugging von "flau aussehenden" Bildern (falscher Farbraum-Tag).

## 2.7 8-bit vs 10-bit — Grading-Relevanz

### 8-bit
- 256 Stufen pro Kanal (R, G, B)
- 16.7 Millionen Farben total
- **Problem:** Banding bei Gradienten (Himmel, Farbverlaeufe, Studio-Hintergruende)
- **YouTube liefert in 8-bit** — egal was du hochlaedst, der Stream ist 8-bit SDR
- **H.264 Standard-Profil:** 8-bit, 4:2:0 Chroma Subsampling

### 10-bit
- 1024 Stufen pro Kanal
- 1.07 Milliarden Farben total (64x mehr als 8-bit)
- **Vorteil:** Banding ist praktisch unsichtbar, weichere Verlaeufe
- **Praxis:** Auch wenn YouTube auf 8-bit komprimiert, BEGINNE die Arbeit in 10-bit. Das Dithering beim Runterkonvertieren von 10->8-bit ist besser als natives 8-bit.

### Banding-Probleme und Loesungen
Banding = sichtbare Stufen in eigentlich weichen Farbverlaeufen. Ursachen:
1. Niedrige Bit-Tiefe (8-bit)
2. Starke Kompression (niedriger Bitrate-YouTube)
3. Aggressive Grading (starke Kontrastanpassung)

Loesungen:
- **Film Grain:** 1-2% feines Rauschen bricht Banding-Kanten auf (bereits in ColorGrade.tsx implementiert)
- **Dithering:** Minimales Rauschen in glatten Flaechen
- **Moderate Grading:** Keine extremen Lift/Gain-Anpassungen
- **Hohes Bitrate beim Export:** Mindestens 12 Mbps fuer 1080p, 40+ Mbps fuer 4K

**Relevanz: 5** — YouTube komprimiert JEDES Video auf 8-bit. Grain-Overlay und moderates Grading sind Pflicht.

---

# 3. GRADING-WERKZEUGE — Frame fuer Frame erklaert

## 3.1 Lift / Gamma / Gain

### Lift (Schatten)
- **Was es macht:** Hebt oder senkt die dunkelsten Bereiche des Bildes. Der Schwarz-Punkt wird verschoben.
- **Technisch:** Addiert/subtrahiert einen Wert vom unteren Ende der Gammakurve. Schwarze Pixel (0,0,0) werden direkt verschoben. Weisse Pixel (255,255,255) bleiben unberuehrt. Mitteltoene werden anteilig beeinflusst.
- **Farbrad-Nutzung:** Ziehe den Punkt im Lift-Rad nach Teal (ca. 200°) um kalte Schatten zu erzeugen. Ziehe nach Orange (ca. 30°) fuer warme Schatten.
- **Typische Werte (Finance-Look):**
  - Helligkeit: -0.02 bis -0.05 (leicht absenken fuer tiefere Schwarze)
  - Farbe: Leicht Teal (RGB ca. -5R, +0G, +5B pro Kanal)

### Gamma (Mitteltoene)
- **Was es macht:** Biegt die mittleren Helligkeitswerte. Die zentrale "Woelbung" der Gammakurve aendert sich.
- **Technisch:** Verschiebt den Mittelpunkt der Gammakurve. Schwarz und Weiss bleiben exakt gleich. NUR die Mitteltoene (ca. 20-80 IRE) werden beeinflusst.
- **Farbrad-Nutzung:** Gamma-Farbverschiebung beeinflusst den groessten sichtbaren Bereich des Bildes. Hauttoene LEBEN im Gamma-Bereich. Verschiebe das Gamma-Rad VORSICHTIG.
- **Typische Werte:**
  - Helligkeit: +0.00 bis +0.03 (nahezu neutral halten)
  - Farbe: Minimal warm (RGB ca. +2R, +0G, -1B)

### Gain (Highlights)
- **Was es macht:** Multipliziert die hellsten Bereiche. Wie ein Dimmer fuer die Highlights.
- **Technisch:** Skaliert den oberen Bereich der Kurve. Schwarze Pixel bleiben bei 0. Weisse Pixel werden proportional skaliert. Eine Gain-Erhoehung macht Highlights heller UND verschiebt Mitteltoene leicht nach oben.
- **Farbrad-Nutzung:** Ziehe Gain nach Warm/Orange fuer sonnige, warme Highlights. Ziehe nach Blau fuer kuehle, "stählerne" Highlights.
- **Typische Werte (Finance-Look):**
  - Helligkeit: +0.00 bis +0.05
  - Farbe: Leicht warm (RGB ca. +3R, +1G, -2B)

**Relevanz: 5** — Lift/Gamma/Gain sind die drei wichtigsten Werkzeuge jedes Grades. 90% aller professionellen Grades beginnen hier.

## 3.2 Offset — Wann statt Lift?

- **Was:** Verschiebt die GESAMTE Kurve gleichmaessig nach oben/unten oder in eine Farbrichtung. Jeder Pixel wird um denselben Betrag verschoben.
- **Unterschied zu Lift:** Lift beeinflusst nur Schatten. Offset beeinflusst ALLES gleichmaessig.
- **Wann Offset nutzen:**
  - Weissabgleich-Korrektur (gesamtes Bild hat Farbstich)
  - Belichtungskorrektur (gesamtes Bild zu hell/dunkel)
  - Shot-Matching (schnelle globale Anpassung)
- **Wann NICHT Offset:** Kreatives Grading. Lift/Gamma/Gain erlauben selektive Steuerung.

**Relevanz: 3** — Primaer fuer technische Korrekturen, nicht fuer den kreativen Look.

## 3.3 Curves — Das maechtigste Werkzeug

### RGB Master-Kurve
- **X-Achse:** Eingangs-Helligkeit (links=dunkel, rechts=hell)
- **Y-Achse:** Ausgangs-Helligkeit
- **S-Kurve:** Der Klassiker. Hebt Highlights, senkt Schatten = erhoehter Kontrast. Sanfte S-Kurve mit 2 Kontrollpunkten bei ca. 25% und 75%.
- **Werte fuer Finance-Look:**
  - Schatten-Punkt: Input 64, Output 54 (leicht absenken)
  - Highlight-Punkt: Input 192, Output 202 (leicht anheben)
  - Das ergibt ca. +8% Kontrastverstaerkung — subtil, cinematic

### Individuelle R/G/B-Kurven
- **Rot-Kurve anheben in Schatten:** Warme Schatten (wie ein leichter Sepia-Ton)
- **Blau-Kurve anheben in Schatten:** Kalte, teal-artige Schatten
- **Gruen-Kurve absenken in Schatten:** Magenta-Shift in Schatten (Film-Look)
- **Finance-Look Rezept:**
  - Rot-Kurve Schatten: Input 0, Output 8 (leichter Rot-Lift in tiefen Schatten)
  - Blau-Kurve Schatten: Input 0, Output 12 (staerkerer Blau-Lift = Teal-Schatten)
  - Rot-Kurve Highlights: Input 255, Output 248 (Highlights leicht weniger rot)
  - Blau-Kurve Highlights: Input 255, Output 242 (Highlights waermer, weniger blau)

### Hue vs Hue
- Aendert den Farbton einer bestimmten Farbe zu einer anderen
- Beispiel: Gruene Pflanzen im Hintergrund leicht nach Teal verschieben, ohne Hauttoene zu beruehren
- Finance-Anwendung: Hintergrund-Farben in den Teal-Bereich ziehen

### Hue vs Sat
- Aendert die Saettigung einer bestimmten Farbe
- Beispiel: Orange (Hauttoene) leicht entsaettigen, damit sie nicht "verbrannt" aussehen
- Finance-Anwendung: Rote Warntexte in Overlays volle Saettigung geben, Rest moderat halten

### Hue vs Lum
- Aendert die Helligkeit einer bestimmten Farbe
- Beispiel: Blaue Bereiche abdunkeln (dunklerer Himmel)
- Finance-Anwendung: Gold-Toene leicht aufhellen fuer "Glow"-Effekt

**Relevanz: 5** — Curves bieten die feinste Kontrolle. Die RGB-Kurven-Methode fuer Teal-Schatten ist direkt in CSS uebersetzbar.

## 3.4 Color Wheels vs Curves vs Sliders — Wann welches Tool?

| Werkzeug | Staerke | Einsatz |
|----------|---------|---------|
| **Color Wheels** (Lift/Gamma/Gain) | Schnell, intuitiv, broad strokes | Grundlegendes Grading, Shot Matching, 80% der Arbeit |
| **Curves** (RGB, Hue vs X) | Praezise, selektiv, granular | Feinarbeit, gezielte Farbverschiebungen, S-Kurve |
| **Sliders** (Temperature, Tint, Exposure) | Am einfachsten, global | Weissabgleich, Belichtungskorrektur, schnelle Fixes |

**Workflow-Reihenfolge:**
1. Sliders: Weissabgleich + Belichtung korrigieren
2. Color Wheels: Lift/Gamma/Gain fuer Grundlook
3. Curves: Feinarbeit, Teal-Schatten, Hautton-Schutz

## 3.5 Qualifiers / HSL Keys — Farben isolieren

- **Was:** Auswaehlen eines bestimmten Farbbereichs basierend auf Hue, Saturation, Luminance
- **Anwendung:** Hautton isolieren (Hue: 15-45°, Sat: 25-75%, Lum: 30-80%), dann separat graden
- **DaVinci Resolve:** Qualifier Tool im Color Tab
- **CSS/Remotion:** Nicht direkt moeglich — muss ueber feColorMatrix oder separate Layer simuliert werden

**Relevanz: 4** — Essenziell fuer Hautton-Korrektur. In Remotion nur ueber Blend-Mode-Layer annaeherbar.

## 3.6 Power Windows / Masks — Bereiche isolieren

- **Was:** Geometrische Formen (Kreis, Rechteck, Polygon, Gradient) die einen Bildbereich isolieren
- **Anwendung:**
  - Vignette (radiale Maske, Raender abdunkeln)
  - Gesicht aufhellen (elliptische Maske auf Gesicht)
  - Himmel separat graden (Gradient-Maske oben)
- **CSS/Remotion:** Vignette = radial-gradient, Gesichtsaufhellung = radial-gradient mit screen blend

**Relevanz: 4** — Vignette ist bereits in ColorGrade.tsx implementiert. Gezielte Aufhellungen erhoehen die Wertigkeit.

## 3.7 Primary vs Secondary Correction

### Primary Correction (Node 1)
- Betrifft das GESAMTE Bild
- Ziel: Technisch korrektes Bild (Belichtung, Weissabgleich, Kontrast)
- Werkzeuge: Lift/Gamma/Gain, Offset, Master-Kurve
- **Muss IMMER zuerst passieren**

### Secondary Correction (Node 2+)
- Betrifft ISOLIERTE Bereiche (per Qualifier oder Power Window)
- Ziel: Kreative Anpassungen, Hautton-Schutz, lokale Korrekturen
- Werkzeuge: Qualifiers, Hue vs Hue, Power Windows
- **Kommt NACH der Primary**

**Relevanz: 5** — Die Reihenfolge ist heilig. Primary zuerst, dann Secondary. In Remotion: erst globaler filter(), dann lokale Blend-Mode-Layer.

---

# 4. SKIN TONE GRADING

## 4.1 Die Skin Tone Line auf dem Vectorscope

### Was ist das?
Eine diagonale Linie auf dem Vectorscope, die bei ca. **123° (der +I-Achse)** verlaeuft. Diese Linie markiert den Bereich, in dem JEDER menschliche Hautton liegt — egal ob hell oder dunkel, europaeisch, afrikanisch oder asiatisch. Der Unterschied zwischen Hauttoenen verschiedener Ethnien zeigt sich in der SAETTIGUNG und HELLIGKEIT, NICHT im Hue.

### Warum 123°?
- Die I-Linie (In-Phase) im NTSC-Farbsystem liegt bei 123°
- Historisch: Analog-TV hat die I-Achse mit hoeherer Bandbreite uebertragen als die Q-Achse, weil dort die Hauttoene liegen
- Der menschliche Hautton liegt bei ca. 118-128° auf dem Vectorscope (der I-Achse), unabhaengig von der Ethnizitaet
- In DaVinci Resolve: Die "Skin Tone Indicator"-Linie zeigt genau diese Richtung an

### Akzeptabler Bereich
- **Ideal:** 120-126° (eng auf der I-Linie)
- **Akzeptabel:** 115-135° (leichte Abweichung)
- **Problematisch:** Unter 115° (zu gelb/gruen) oder ueber 135° (zu rot/magenta)

## 4.2 Warum liegt JEDE Hautfarbe auf derselben Linie?

Die Hautfarbe wird primaer durch **Melanin** (braun) und **Haemoglobin** (rot/pink) bestimmt. Beide Pigmente liegen im Spektralbereich Orange-Rot (Hue ca. 15-30° auf dem Standard-Farbrad, was ca. 123° auf dem NTSC-Vectorscope entspricht). Melanin verschiebt nur die SAETTIGUNG (weniger = heller, mehr = dunkler) und HELLIGKEIT, NICHT den Grundton.

**Abweichungen:**
- Asiatische Haut: Leicht gelber (ca. 118-122°), weniger Haemoglobin-Rot
- Kaukasische Haut: Leicht roetlicher (ca. 122-128°), mehr Haemoglobin sichtbar
- Afrikanische Haut: Leicht oranger (ca. 120-126°), hoher Melaningehalt reduziert sichtbares Haemoglobin

Alle diese Werte liegen innerhalb eines 10°-Korridors. Der Vectorscope zeigt sie als Linie in derselben Richtung.

## 4.3 Wie korrigiert man Hauttoene ohne den Rest zu veraendern?

### Workflow (DaVinci Resolve)
1. **Qualifier:** HSL-Qualifier auf Hautton setzen (Hue: 15-45°, Sat: 25-75%)
2. **Highlight:** Maske anzeigen lassen — nur Haut sollte ausgewaehlt sein
3. **Softness erhoehen:** Edge-Weichzeichnung damit keine harten Kanten entstehen
4. **Korrektur anwenden:**
   - Hue zu weit Rot? Gamma-Rad leicht nach Gelb/Orange ziehen
   - Hue zu weit Gelb? Gamma-Rad leicht nach Rot ziehen
   - Zu gesaettigt? Sat-Regler runter
   - Zu gruen/cyan? Hue vs Hue: Gruen-Bereich nach Orange verschieben

### Workflow (CSS/Remotion)
Da CSS keine pixel-genauen Qualifiers hat, verwende Layer-Strategie:
1. Talking-Head-Layer mit `filter: saturate(0.9) brightness(1.02)` leicht anpassen
2. Warm-Tint-Layer mit `rgba(255, 200, 120, 0.05)` und `mix-blend-mode: multiply` fuer Gold-Shift
3. Vignette um den Kopf-Bereich herum mit `radial-gradient` — hellt Gesicht automatisch auf

## 4.4 Memory Colors — Warum Hautton, Himmel und Gras wichtig sind

### Was sind Memory Colors?
Farben von Objekten, die wir taeglich sehen und deren "richtige" Farbe wir im Gedaechtnis haben. Weicht eine Memory Color ab, bemerkt der Zuschauer es SOFORT — auch unterbewusst.

### Die drei kritischen Memory Colors
| Memory Color | Erwarteter Hue | Saettigung | Toleranz |
|-------------|----------------|------------|----------|
| **Hautton** | 20-35° (Orange) | 40-65% | Sehr gering — jede Abweichung faellt auf |
| **Himmel** | 210-230° (Blau) | 40-70% | Mittel — leicht wärmer/kaelter akzeptabel |
| **Gras/Vegetation** | 80-120° (Gruen) | 30-60% | Hoch — breites Spektrum akzeptiert |

### Interessant
Studien zeigen: Menschen erinnern sich an Farben SAETTER als sie tatsaechlich sind. Hauttoene werden ca. 10% saetter erinnert, Himmel ca. 15% saetter. Professionelle Coloristen nutzen das: sie erhoehen die Saettigung der Memory Colors leicht gegenueber der Realitaet, um "richtig" auszusehen.

### Finance-Video-Anwendung
- **Hautton:** Daniels Hautton muss IMMER auf der I-Linie liegen. Zu rot = krank. Zu gelb = krank. Zu entsaettigt = deprimiert.
- **Himmel in B-Roll:** Wenn B-Roll einen Himmel zeigt, MUSS er blau sein (nicht gruen, nicht lila). Auch ein dramatisch bewoelkter Himmel braucht einen leichten Blau-Shift.
- **Vegetation:** In B-Roll mit Natur: Gras muss gruen sein, nicht gelb-gruen (wirkt krank).

**Relevanz: 5** — Hautton ist das #1 Kriterium fuer einen professionellen Grade. Falsche Hauttoene sind der haeufigste Fehler bei Amateur-Grading.

---

# 5. LOOK-SYSTEME & STILE

## 5.1 Teal & Orange — Der Kino-Standard

### Warum funktioniert es?
1. **Komplementaerfarben:** Teal (~200°) ist das Komplement zu Orange (~20°). Maximaler Farb-Kontrast.
2. **Hautton-Hervorhebung:** Menschliche Haut ist im Orange-Bereich. Teal-Hintergrund macht Haut zum visuellen Fokuspunkt.
3. **Tag/Nacht-Assoziationen:** Warmes Orange = Sonne/Feuer/Naehe. Kaltes Teal = Schatten/Nacht/Distanz. Der Kontrast erzeugt unterbewusste Tiefe.
4. **Universelle Anwendbarkeit:** Funktioniert bei jeder Hautfarbe, jedem Lichtsetup, jedem Setting.

### Genaue Werte fuer den Teal & Orange Look

**Teal (Schatten/Hintergrund):**
| Parameter | Wert |
|-----------|------|
| Hex | #1A8B8B bis #2A9A9A |
| RGB | R:26-42, G:139-154, B:139-154 |
| HSL | 180°, 70-75%, 32-38% |
| Vectorscope-Winkel | ~180-195° |
| DaVinci Lift | Offset nach 180° (Teal), ca. -0.05 R, +0.02 G, +0.04 B |

**Orange (Hautton/Highlights):**
| Parameter | Wert |
|-----------|------|
| Hex | #D4875A bis #E8A070 |
| RGB | R:212-232, G:135-160, B:90-112 |
| HSL | 22-28°, 55-65%, 60-68% |
| Vectorscope-Winkel | ~123° (Skin Tone Line!) |
| DaVinci Gain | Offset nach 30° (Orange), ca. +0.03 R, +0.01 G, -0.03 B |

### Teal & Orange in CSS/Remotion
```css
/* Layer 1: Teal-Shift in Schatten via linear-gradient + screen blend */
background: linear-gradient(180deg, transparent 0%, rgba(10, 40, 50, 0.12) 100%);
mix-blend-mode: screen;

/* Layer 2: Warm/Orange-Shift in Highlights via color blend */
background: rgba(255, 180, 100, 0.06);
mix-blend-mode: multiply;

/* Layer 3: Kontrast-Boost via S-Kurve-Approximation */
filter: contrast(1.08) saturate(1.10) brightness(0.97);
```

**Relevanz: 5** — Der Standard-Look fuer Film und Premium-YouTube. Bereits im LOCOS-Grade als Basis vorhanden.

## 5.2 Bleach Bypass — Entsaettigter Hochkontrast

### Was ist es?
Analog-Film-Technik, bei der die Bleich-Phase in der Filmentwicklung uebersprungen wird. Das Silber bleibt im Film — erzeugt metallisch wirkende Highlights, entsaettigte Farben, harte Schatten, koernige Textur.

### Visuelle Merkmale
- Saettigung: 30-50% der Normalwerte
- Kontrast: +30-50% gegenueber Normal
- Schatten: Tief, fast zerquetscht (Schwarz bei 0-5 IRE)
- Highlights: Metallisch, silbrig, nicht "strahlend" sondern "glänzend"
- Grain: Deutlich sichtbar, grob

### Beruehmte Verwendung
- **Se7en** (David Fincher, 1995): Gruener Farbstich + Bleach Bypass
- **Saving Private Ryan** (Spielberg, 1998): Desaturiert + Kontrastreich
- **300** (Zack Snyder, 2006): Extreme Entsaettigung + Gold-Tonung

### CSS/Remotion-Umsetzung
```css
filter: contrast(1.35) saturate(0.45) brightness(0.92);
/* Plus Grain-Overlay mit 8-10% Opacity */
```

### Finance-Anwendung
Geeignet fuer: Krisen-Segmente, "Warnung"-Momente, historische Rueckblicke.
NICHT geeignet fuer: Gesamt-Grade eines Videos (zu entsaettigt fuer YouTube).

**Relevanz: 3** — Starkes Stilmittel fuer 5-15 Sekunden lange Krisen-Cutaways. Nicht als Gesamt-Look.

## 5.3 Desaturated High-Contrast — Der "Fincher-Look"

### Merkmale
- Saettigung: 50-70% (nicht so extrem wie Bleach Bypass)
- Kontrast: Erhoehte Mitten-Kontrast, nicht "gecrushed" sondern "kontrolliert"
- Farbpalette: Reduziert auf 2-3 Toene (Gruen/Gelb in Se7en, Blau/Gold in Gone Girl)
- Highlights: Klar, nicht ueberbelichtet
- Schatten: Tief aber mit Detail (keine "schwarzen Loecher")

### CSS/Remotion-Werte
```css
filter: contrast(1.15) saturate(0.65) brightness(0.95);
/* Optional: leichter Gruen-Shift in Schatten */
background: rgba(10, 30, 10, 0.04);
mix-blend-mode: screen;
```

**Relevanz: 3** — Gut fuer investigative Segmente. Der reduzierte Look signalisiert "journalistische Ernsthaftigkeit".

## 5.4 Warm Vintage — Der "Wes Anderson-Look"

### Merkmale
- Pastellige, entsaettigte warme Toene (Pfirsich, Mint, Buttergelb)
- Highlights: Angehoben (lifted blacks), kein echtes Schwarz
- Kontrast: Reduziert (flacher, "dreamy")
- Saettigung: Selektiv — bestimmte Farben gesaettigt (Rot, Gelb), andere entsaettigt (Blau, Gruen)
- Typische Palette: #E0B488, #E6A86B, #A17A57, #F2D7BC, #283618

### CSS/Remotion-Werte
```css
filter: contrast(0.90) saturate(0.80) brightness(1.05);
/* Lifted Blacks: Schattenlayer mit warmem Tint */
background: rgba(60, 45, 30, 0.06);
mix-blend-mode: screen;
/* Warm Highlight-Tint */
background: rgba(255, 220, 180, 0.04);
mix-blend-mode: multiply;
```

**Relevanz: 2** — Fuer Finance-Content zu "soft". Aber einzelne Elemente (Nostalgie-Sequenzen, "frueher war alles besser") koennten den Stil nutzen.

## 5.5 Day for Night

### Technik
Tageslicht so graden, dass es wie Nachtaufnahme wirkt.

### Rezept
1. Belichtung stark senken (brightness 0.3-0.5)
2. Saettigung reduzieren (saturate 0.4-0.6)
3. Blau-Shift in Schatten und Mitteltoene (Purkinje-Effekt: nachts sehen wir blau)
4. Kontrast erhoehen (contrast 1.2-1.4)
5. Schwarze zerquetschen (Schatten <5 IRE)
6. Optional: kuenstliches Mondlicht (harter Highlight von oben-rechts)

### CSS/Remotion-Werte
```css
filter: brightness(0.35) saturate(0.5) contrast(1.30);
/* Blau-Tint */
background: rgba(20, 40, 80, 0.25);
mix-blend-mode: multiply;
```

**Relevanz: 1** — Praktisch nie in Finance-Videos anwendbar. Nur akademisch interessant.

## 5.6 Cross-Processing

### Was ist es?
Analog-Film in den falschen Chemikalien entwickeln (C-41-Film in E-6-Chemie oder umgekehrt). Erzeugt unvorhersehbare Farbverschiebungen, erhoehten Kontrast und surrealistische Farben.

### Digitale Nachbildung
- Rot- und Gruen-Kurven: Starke S-Kurve (Kontrast-Boost)
- Blau-Kurve: Invertierte S-Kurve (Kontrast-Reduktion in Blau)
- Ergebnis: Gruenlich-gelbe Highlights, magenta-blaue Schatten

### CSS/Remotion (Vereinfacht)
```css
/* Cross-Processing Approximation */
filter: contrast(1.20) saturate(1.15) hue-rotate(10deg);
background: rgba(60, 80, 20, 0.06);
mix-blend-mode: color;
```

**Relevanz: 1** — Zu experimentell fuer Finance-Content.

## 5.7 Welcher Look passt zu Finance/Investigativ Content?

### Empfehlung: "LOCOS Premium Grade"

Der optimale Look fuer Daniel Sauer kombiniert:

| Eigenschaft | Wert | Begruendung |
|-------------|------|-------------|
| Kontrast | 1.06-1.10 | Leicht erhoehter Kontrast = "sauber, professionell" |
| Saettigung | 0.85-0.95 (dann selektiv anheben) | Leicht entsaettigt = "ernst, nicht YouTube-bunt" |
| Warmth | 0.10-0.20 (Gold-Tint) | Gold = LOCOS-Branding, Vertrauen, Wert |
| Schatten | Leicht Teal (200°) | Kuehle Schatten = Analyse, Ernsthaftigkeit |
| Highlights | Leicht Warm (30°) | Warme Highlights = Hoffnung, Loesung |
| Vignette | 0.3-0.5 | Fokus auf Sprecher, "Kino-Feeling" |
| Grain | 1-2% (fein) | Banding-Praevention + Film-Textur |

Dieser Look ist bereits in der `ColorGrade.tsx`-Komponente implementiert. Die `AnimatedGrade` im EZB-Falle-Video verschiebt Warmth und Saettigung entlang des emotionalen Bogens.

---

# 6. LUTs (Look-Up Tables)

## 6.1 Was ist ein LUT technisch?

Ein LUT ist eine mathematische Zuordnungstabelle: fuer jeden Eingangs-Farbwert gibt es einen definierten Ausgangs-Farbwert. Statt eine komplexe Farb-Formel in Echtzeit zu berechnen, wird das Ergebnis vorberechnet und in einer Tabelle gespeichert.

**Analogie:** Statt "berechne 7 x 8" nachzuschlagen, schaust du in die Einmaleins-Tabelle: Zeile 7, Spalte 8 = 56. Das ist ein LUT.

## 6.2 1D LUT vs 3D LUT

### 1D LUT
- **Struktur:** Drei separate Tabellen (R, G, B), je eine Zuordnung Input -> Output
- **Groesse:** 10-bit = 3 x 1024 Werte = 3072 Werte total
- **Kann:** Helligkeit, Kontrast, Gamma-Kurve pro Kanal aendern
- **Kann NICHT:** Farb-Interaktionen aendern (z.B. "wenn Rot UND Blau hoch, dann Gruen runter")
- **Anwendung:** Gamma-Konvertierung (Log -> Rec.709), einfache Kontrast-Anpassungen

### 3D LUT
- **Struktur:** Ein 3D-Wuerfel (Cube), in dem R, G, B die drei Achsen bilden. Jeder Punkt im Wuerfel definiert die Ausgabefarbe fuer eine bestimmte Eingabefarbe.
- **Groesse:** Typisch 33x33x33 = 35.937 Punkte (jeder mit R,G,B = 107.811 Werte). Oder 65x65x65 = 274.625 Punkte fuer hoehere Praezision.
- **Kann:** ALLES was eine 1D LUT kann PLUS Farb-Interaktionen, Hue-Shifts, selektive Saettigungs-Aenderungen
- **Zwischen den Punkten:** Trilineare oder tetraedrische Interpolation berechnet Zwischenwerte
- **Anwendung:** Kreative Looks, komplexe Farb-Konvertierungen, Film-Emulationen

### Format
- **.cube:** Industriestandard, Klartext-Datei mit LUT-Werten
- **.3dl:** Aelteres Autodesk-Format
- **.lut:** DaVinci-spezifisch

## 6.3 Technical LUT vs Creative LUT

### Technical LUT (Input Transform)
- **Zweck:** Kamera-Log-Profil in Rec.709 konvertieren
- **Beispiel:** Sony S-Log3 to Rec.709 LUT (mitgeliefert von Sony)
- **Charakter:** Neutral, "so wie die Szene aussah"
- **Wann:** IMMER als erster Schritt, BEVOR kreatives Grading beginnt
- **MUSS angewendet werden:** Ohne Technical LUT sieht Log-Material flau und kontrastlos aus

### Creative LUT (Look)
- **Zweck:** Einen bestimmten visuellen Stil erzeugen (Teal/Orange, Film-Look, Vintage...)
- **Beispiel:** "Hollywood Blockbuster", "Fuji Velvia Film Emulation", "Teal Shadows"
- **Charakter:** Stilisiert, kuenstlerisch
- **Wann:** NACH der Technical LUT (wenn Log) oder NACH der Primary Correction

## 6.4 Warum man LUTs NICHT blind draufklatscht

### Problem 1: Belichtungs-Abhaengigkeit
Ein LUT wurde fuer eine bestimmte Belichtung erstellt. Ist dein Bild heller/dunkler, verschiebt der LUT die Farben in unerwartete Richtungen. **Loesung:** IMMER erst Belichtung und Weissabgleich korrigieren, DANN LUT anwenden.

### Problem 2: Hautton-Drift
Ein LUT kennt keine "Hauttoene". Er verschiebt ALLE Farben im betreffenden Bereich — auch Haut. Ein Teal-LUT kann Hauttoene gruenlich machen. **Loesung:** Hautton nach LUT-Anwendung auf dem Vectorscope pruefen und per Secondary korrigieren.

### Problem 3: Clipping
Ein kontraststarker LUT kann Highlights oder Schatten abschneiden (clipping). **Loesung:** Belichtung VOR dem LUT reduzieren, damit Headroom bleibt.

## 6.5 LUTs mit 30-50% Opacity als Ausgangspunkt

### Die professionelle Methode
1. LUT anwenden
2. Opacity/Intensity auf 30-50% reduzieren (DaVinci: Key Output Gain)
3. Den Rest des Looks manuell per Lift/Gamma/Gain verfeinern
4. Ergebnis: LUT-Charakter als Basis + volle manuelle Kontrolle

**Warum:** Ein LUT bei 100% ist fast immer zu stark. Die 30-50%-Methode nutzt den LUT als Richtungsangabe, nicht als fertigen Look.

## 6.6 Eigene LUTs erstellen

### Workflow
1. Ein Bild perfekt graden (Primary + Secondary + Curves + alles)
2. In DaVinci: File > Generate 3D LUT (DCTL)
3. Format: .cube, 33x33x33 (Standard) oder 65x65x65 (High-Precision)
4. LUT auf anderen Shots anwenden und per Primary Correction anpassen
5. **Wichtig:** Der LUT konserviert nur die Farb-Transformation, KEINE Qualifiers/Masks

### Fuer Remotion
LUTs sind in CSS/Remotion nicht direkt nutzbar. Die Alternative: die Farbwerte des LUTs in feColorMatrix-Matrizen und CSS-Filter-Ketten uebersetzen. Die `ColorGrade.tsx`-Komponente ist im Prinzip ein "programmatischer LUT".

**Relevanz: 4** — LUTs sind im DaVinci-Workflow zentral. Fuer Remotion uebersetzt in CSS-Layer.

---

# 7. SCENE-TO-SCENE MATCHING

## 7.1 Warum sieht Szene A anders aus als Szene B?

### Haeufige Ursachen
| Ursache | Symptom | Haeufigkeit |
|---------|---------|-------------|
| **Wechselndes Licht** | Helligkeit schwankt, Farbtemperatur aendert sich | Sehr haeufig bei Tageslicht |
| **Auto-Weissabgleich** | Jeder Shot hat anderen WB | Haeufig bei Consumer-Kameras |
| **Verschiedene Kameras** | Unterschiedliche Farbwiedergabe, Saettigung | Haeufig bei Multi-Cam |
| **Verschiedene Objektive** | Unterschiedliche Kontrastwiedergabe, Flare-Verhalten | Mittel |
| **Unterschiedliche Settings** | ISO, Blende, Verschlusszeit aendern den Look | Mittel |
| **B-Roll vs A-Cam** | Stock Footage hat voellig anderen Charakter | Sehr haeufig |

Fuer Daniel Sauer: Primaer **wechselndes Licht** (Tageslicht-Studio) und **B-Roll-Mismatch** (Stock vs selbstgefilmt).

## 7.2 Shot Matching Workflow

### Schritt 1: Reference Frame waehlen
- Den "besten" Shot als Referenz waehlen (korrekte Belichtung, schoenste Farben)
- Diesen Shot zuerst perfekt graden
- Scopes notieren: Waveform-Verteilung, Vectorscope-Schwerpunkt, Histogramm-Form

### Schritt 2: Match-Shots angleichen
- Jeden weiteren Shot einzeln an die Referenz angleichen
- **Waveform:** Abgleich der Helligkeit (Schwarzpunkt, Wesspunkt, Mitteltoene)
- **RGB Parade:** Abgleich der Kanalbalance (alle drei Kanaele gleich hoch?)
- **Vectorscope:** Abgleich der Farbsaettigung und -richtung (Schwerpunkt zur Referenz bewegen)

### Schritt 3: Verifizieren
- Shots direkt hintereinander abspielen (Cut-by-Cut)
- Auf dem Scope zwischen Referenz und Match-Shot hin- und herspringen
- Hauttoene auf dem Vectorscope pruefen (I-Linie bei 123°?)

## 7.3 Scopes lesen

### Waveform (Luma)
- **Y-Achse:** Helligkeit (0 IRE = Schwarz, 100 IRE = Weiss)
- **X-Achse:** Horizontale Position im Bild (links = links im Bild)
- **Was du siehst:** Die Helligkeitsverteilung des Bildes als Wolke
- **Gut kalibriert:** Schwarze Bereiche bei 0-5 IRE, Highlights bei 90-100 IRE, Schwerpunkt bei 40-60 IRE
- **Problem erkennen:** Clipping oben (> 100 IRE) oder unten (< 0 IRE), zu flaches Bild (alles zwischen 30-70 IRE)

### RGB Parade
- Drei separate Waveforms fuer R, G, B
- **Alle drei gleich hoch?** = Neutraler Weissabgleich
- **Rot hoeher als Blau?** = Warmer Farbstich (zu warm)
- **Blau hoeher als Rot?** = Kalter Farbstich (zu kalt)
- **Shot Matching:** Alle drei Kanaele muessen zwischen den Shots dieselbe Form haben

### Vectorscope
- **Kreisfoermig:** Zeigt Hue (Winkel) und Saettigung (Abstand vom Zentrum)
- **Targets:** Sechs markierte Punkte (R, Mg, B, Cy, G, Yl) — das sind die Farb-Targets fuer Testcharts
- **Schwerpunkt:** Wo der "Klumpen" der Farbinformationen liegt. Neutrales Bild = Zentrum. Warmes Bild = Richtung Orange/Gelb.
- **Skin Tone Line:** Bei 123° — alle Hauttoene muessen auf dieser Linie liegen

### Histogram
- **X-Achse:** Helligkeit (links=dunkel, rechts=hell)
- **Y-Achse:** Anzahl der Pixel mit diesem Helligkeitswert
- **Gut belichtet:** Glockenkurve mit leichten Auslaeufern links und rechts
- **Unterbelichtet:** Schwerpunkt links
- **Ueberbelichtet:** Schwerpunkt rechts
- **Eingeschraenkter Dynamikumfang:** Schmale Kurve in der Mitte

## 7.4 Automatisches vs Manuelles Matching

### Automatisch (DaVinci Shot Match)
- DaVinci Resolve hat "Shot Match" (Rechtsklick > Shot Match to this Clip)
- Analysiert Belichtung und Farbe der Referenz und wendet aequivalente Werte an
- **Genauigkeit:** 70-80% — ersetzt NICHT manuelles Feintuning
- **Vorteil:** Schneller Ausgangspunkt fuer grosse Projekte

### Manuell (Immer besser)
- Braucht 2-5 Minuten pro Shot
- Ergebnis: 95-100% Match
- **Fuer Daniel Sauer:** Da die meisten Videos im selben Setting (Studio) gefilmt werden, reichen oft kleine Anpassungen zwischen Shots

**Relevanz: 4** — B-Roll muss zum Talking-Head passen. Inkonsistente Farben sind ein Zeichen von Amateurarbeit.

---

# 8. GRADING FUER YOUTUBE SPEZIFISCH

## 8.1 YouTube-Kompression — Was passiert mit Farben?

### Upload-Pipeline
1. Du laedst ein H.264/H.265-Video hoch (z.B. 50 Mbps)
2. YouTube re-encodiert in mehrere Qualitaetsstufen:
   - **1080p:** H.264 (~5-8 Mbps) oder VP9 (~3-5 Mbps) oder AV1 (~2-4 Mbps)
   - **4K:** VP9 (~18-25 Mbps) oder AV1 (~12-18 Mbps)
3. Farbraum wird auf Rec.709 SDR (8-bit, 4:2:0) normalisiert
4. Chroma Subsampling 4:2:0: Farbinformation hat nur 1/4 der Aufloesung der Helligkeitsinformation

### Was geht verloren?
- **Feine Farbverlaeufe:** Werden zu sichtbaren Stufen (Banding)
- **Subtile Saettigungsunterschiede:** Werden "zusammengequetscht"
- **Schatten-Detail:** Dunkle Bereiche verlieren Zeichnung (Macroblocking)
- **Feine Texturen:** Film Grain wird teilweise geglaettet oder zu Block-Artefakten

## 8.2 Banding-Probleme bei YouTube

### Was ist Banding?
Statt weicher Farbverlaeufe (Himmel, Studio-Hintergrund, Grafik-Gradienten) zeigt YouTube harte Farbstufen — als ob jemand den Verlauf in 8-16 Farben quantisiert hat.

### Warum passiert es?
1. **8-bit-Kompression:** 256 Stufen pro Kanal reichen nicht fuer weiche Verlaeufe
2. **Niedrige Bitrate:** YouTube gibt 1080p nur 5-8 Mbps — viel weniger als dein Original
3. **4:2:0 Chroma Subsampling:** Farb-Aenderungen haben nur 1/4 der Aufloesung
4. **Re-Encoding:** Jede Kompression zerstoert subtile Unterschiede

### Wo tritt Banding am meisten auf?
- **Himmel:** Grosse gleichmaessige Flaeche mit minimalem Farbverlauf
- **Studio-Hintergrund:** Beleuchtete Wand mit Gradient
- **Grafik-Verlaeufe:** CSS-Gradienten in Overlays (!)
- **Vignetten:** Radiale Abdunklung an Raendern (!)

**Relevanz fuer LOCOS:** Die Vignette in `ColorGrade.tsx` und Gradient-Hintergruende in Overlays sind Banding-Kandidaten.

## 8.3 Wie man Banding minimiert

### Film Grain / Noise Overlay (PRIMAEERE Methode)
- **Warum es funktioniert:** Feines Rauschen bricht die harten Kanten zwischen Farbstufen auf. Der Encoder "sieht" keine grosse einheitliche Flaeche mehr, sondern viele kleine Unterschiede, und verteilt die Bitrate besser.
- **Ideale Staerke:** 1-2% Opacity (kaum sichtbar, aber wirksam)
- **Typ:** Fein, monochrom, gleichmaessig verteilt. KEIN grobes Korn (das erzeugt MEHR Kompressionsartefakte)
- **In ColorGrade.tsx:** Bereits implementiert via SVG feTurbulence. Default ist `grain: false` fuer Performance. **Empfehlung: grain: true fuer alle finalen Renders.**
- **Warnung:** Zu viel Grain = YouTube interpretiert jedes Rausch-Pixel als bewegtes Objekt und verschwendet Bitrate darauf. Sweet Spot: 1-2%.

### Dithering
- Technisch dasselbe Prinzip wie Grain, aber gezielt in glatten Flaechen
- In der Praxis reicht globaler Grain-Overlay

### Export-Bitrate maximieren
- **1080p:** Mindestens 15-20 Mbps (YouTube empfiehlt 8 Mbps — das ist das MINIMUM, nicht das Optimum)
- **4K:** Mindestens 50-60 Mbps
- **Codec:** H.264 High Profile, VBR 2-Pass
- **Trick:** 4K hochladen auch wenn das Quellmaterial 1080p ist. YouTube gibt 4K-Videos einen besseren Codec (VP9 statt H.264) mit hoeherer Bitrate. Dein 1080p-Stream sieht dadurch sauberer aus.

## 8.4 Rec.709 als Export-Farbraum — Warum NICHT Rec.2020?

- YouTube konvertiert Rec.2020 SDR automatisch zu Rec.709. Dabei gehen Out-of-Gamut-Farben verloren.
- Die Konvertierung kann zu unerwarteten Farbverschiebungen fuehren.
- Es gibt keinen Vorteil: YouTube-SDR ist IMMER Rec.709.
- **Einzige Ausnahme:** Rec.2020 + HDR (HLG oder PQ) + 10-bit = YouTube-HDR. Dann bleibt Rec.2020 erhalten. Aber nur fuer HDR-faehige Geraete.

## 8.5 HDR auf YouTube — Lohnt sich das?

### Fuer Daniel Sauer: NEIN.

| Argument | Detail |
|----------|--------|
| **Aufwand** | HDR erfordert HDR-Monitor zum Grading, HDR-LUT-Workflow, spezielle Exporteinstellungen, HDR-Metadata |
| **Viewer-Anteil** | Nur ~15-25% der YouTube-Viewer haben HDR-faehige Geraete (Stand 2026) |
| **Content-Typ** | HDR lohnt sich bei Natur-Doku, Landschaft, Kino. Bei Talking-Head + Screen-Grafiken ist der Mehrwert minimal |
| **SDR-Fallback** | Fuer alle nicht-HDR-Viewer konvertiert YouTube automatisch. Die SDR-Version sieht oft schlechter aus als ein direkt in SDR gemastertes Video |
| **Kosten** | HDR-Monitor ab 1500 EUR, Kalibrierungstool, Lernkurve |

## 8.6 Geraete-Unterschiede — Wie sehen Farben aus?

### Die Realitaet
| Geraet | Typischer Farbraum | Helligkeit | Gamma |
|--------|-------------------|------------|-------|
| iPhone (2022+) | DCI-P3 | 1000-2000 nits | Adaptiv |
| Android High-End | DCI-P3 | 800-1500 nits | Variabel |
| Android Budget | sRGB (unterkalibriert) | 300-500 nits | Oft zu warm |
| MacBook | DCI-P3 | 500-1600 nits | sRGB-Gamma |
| Windows-Laptop | sRGB (oft ungenau) | 250-400 nits | Variabel |
| Smart TV | Rec.709+ (variabel) | 300-1000 nits | Rec.709 Gamma |

### Konsequenzen fuer das Grading
1. **Nicht zu subtil graden:** Feine Nuancen verschwinden auf Budget-Geraeten
2. **Kontrast leicht erhoehen:** Ausgleich fuer flache Budget-Displays
3. **Saettigung leicht erhoehen:** Budget-Screens sind oft entsaettigter als kalibrierte Monitore
4. **Schatten nicht zu dunkel:** Billige Displays haben schlechten Schwarzwert — zu dunkle Schatten "saufen ab"
5. **Am iPhone testen:** ~55% der YouTube-Views kommen von Mobilgeraeten. Das iPhone ist der "Reference-Screen" fuer YouTube.

**Relevanz: 5** — Jedes Video muss auf dem iPhone gut aussehen. Grading auf dem Profi-Monitor UND iPhone-Check ist Pflicht.

---

# 9. GRADING IN CSS / REMOTION

## 9.1 CSS filter() — Entsprechungen zu Grading-Operationen

| CSS filter() | Grading-Equivalent | Was es technisch macht |
|-------------|-------------------|------------------------|
| `brightness(x)` | **Offset/Exposure** | Multipliziert alle Pixel mit x. brightness(0.97) = leichte Abdunklung. NICHT wie Lift/Gamma — es beeinflusst ALLES gleichmaessig |
| `contrast(x)` | **Kontrast (S-Kurve)** | Verschiebt Pixel weg vom/zum Mittelpunkt (128). contrast(1.08) = Dunkles dunkler, Helles heller. Annaeherung an S-Kurve |
| `saturate(x)` | **Saturation** | Verstaerkt/reduziert die Saettigung aller Pixel. saturate(1.1) = +10% Saettigung. Global, nicht selektiv |
| `hue-rotate(Xdeg)` | **Hue Shift** | Rotiert ALLE Farben um X Grad auf dem Farbrad. hue-rotate(5deg) = leichter Warmshift (Richtung Gelb). VORSICHT: betrifft alles, auch Hauttoene |
| `sepia(x)` | **Warm Toning** | Wendet Sepia-Effekt an. sepia(0.1) = leichter warmer Tint. Reduziert gleichzeitig Saettigung |
| `opacity(x)` | **Kein Equivalent** | Transparenz, kein Grading-Tool |
| `grayscale(x)` | **Desaturation** | Konvertiert zu Graustufen. grayscale(0.3) = 30% entsaettigt |

### Wichtige Einschraenkung
CSS `filter()` wirkt GLOBAL auf den gesamten Container. Es gibt kein CSS-Equivalent fuer:
- Selektive Schatten-Korrektur (Lift)
- Selektive Highlight-Korrektur (Gain)
- Selektive Mittelton-Korrektur (Gamma)
- Farbbereich-Isolation (Qualifier)
- Hue vs Hue, Hue vs Sat, Hue vs Lum

**Fuer selektives Grading in CSS braucht man Blend-Mode-Layer.** Genau das macht die `ColorGrade.tsx`-Komponente.

## 9.2 Wie brightness(), contrast() und saturate() mathematisch arbeiten

### brightness(x)
```
Output = Input * x
brightness(0.97): Pixel(200, 150, 100) -> (194, 145.5, 97)
```

### contrast(x)
```
Output = (Input - 128) * x + 128
contrast(1.08): Pixel(200, 150, 100) -> (205.76, 153.76, 101.76)
contrast(1.08): Pixel(50, 50, 50) -> (41.76, 41.76, 41.76)
```
Helle Pixel werden heller, dunkle werden dunkler. Mittelgrau (128) bleibt exakt gleich.

### saturate(x)
```
Luminanz = 0.2126*R + 0.7152*G + 0.0722*B
Output_R = Luminanz + (Input_R - Luminanz) * x
Output_G = Luminanz + (Input_G - Luminanz) * x
Output_B = Luminanz + (Input_B - Luminanz) * x
```
x > 1: Farben werden saetter (weiter weg von Grau). x < 1: Farben gehen Richtung Grau.

## 9.3 Teal & Orange in CSS aufbauen

### Methode 1: Blend-Mode-Layer (ColorGrade.tsx-Ansatz)
```tsx
/* Schicht 1: Warm-Tint in Mitteltoenen via Multiply */
<div style={{
  position: 'absolute', inset: 0,
  background: 'rgba(255, 200, 120, 0.06)',  // Warmes Orange-Gold
  mixBlendMode: 'multiply',
  pointerEvents: 'none'
}} />

/* Schicht 2: Teal-Shift in Schatten via Screen */
<div style={{
  position: 'absolute', inset: 0,
  background: 'linear-gradient(180deg, transparent 0%, rgba(10, 40, 50, 0.10) 100%)',
  mixBlendMode: 'screen',
  pointerEvents: 'none'
}} />

/* Schicht 3: Kontrast + Brightness via Filter */
<div style={{
  position: 'absolute', inset: 0,
  backdropFilter: 'contrast(1.08) brightness(0.97) saturate(1.10)',
  pointerEvents: 'none'
}} />
```

### Methode 2: feColorMatrix (Praeziser)
```html
<svg width="0" height="0">
  <filter id="teal-orange-grade">
    <!-- Warm-Shift: Erhoehe Rot in Highlights, erhoehe Blau in Schatten -->
    <feColorMatrix type="matrix" values="
      1.05  0.00  -0.02  0  0.01
      0.00  1.02   0.00  0  0.00
     -0.03  0.00   1.08  0  0.02
      0     0      0     1  0
    "/>
  </filter>
</svg>

<div style={{ filter: 'url(#teal-orange-grade)' }}>
  {/* Video Content */}
</div>
```

**Die feColorMatrix erklaert:**
- Zeile 1 (Rot-Ausgang): 1.05*R + 0*G - 0.02*B + 0.01 = Rot wird leicht angehoben, Blau-Anteil reduziert = waermere Toene
- Zeile 2 (Gruen-Ausgang): 1.02*G = Gruen bleibt nahezu neutral, leicht angehoben
- Zeile 3 (Blau-Ausgang): -0.03*R + 1.08*B + 0.02 = Blau wird angehoben wo wenig Rot ist (= Schatten/Hintergrund = Teal-Shift), Rot-Anteil wird aus Blau entfernt

### Methode 3: CSS filter()-Kette (Einfachste)
```css
.teal-orange-grade {
  filter: contrast(1.08) brightness(0.97) saturate(1.10) sepia(0.06) hue-rotate(-3deg);
}
```
**Limitation:** Kein selektiver Teal-in-Schatten-Effekt. Nur globale Anpassungen.

## 9.4 mix-blend-mode als Grading-Tool

### multiply — Schatten vertiefen, Farbe einfaerben
```
Formel: Output = (A * B) / 255
```
- Schwarz (0) * irgendwas = Schwarz (bleibt)
- Weiss (255) * irgendwas = irgendwas (transparent)
- **Anwendung:** Warmer Tint — `rgba(255, 200, 120, 0.06)` mit multiply = Gold-Tonung in Mitteltoenen/Schatten, Highlights bleiben sauber

### screen — Highlights aufhellen, Schatten ignorieren
```
Formel: Output = 255 - ((255-A) * (255-B)) / 255
```
- Schwarz (0) screen irgendwas = irgendwas (transparent)
- Weiss (255) screen irgendwas = Weiss (bleibt)
- **Anwendung:** Teal-Lift in Schatten — `rgba(10, 40, 50, 0.10)` mit screen = Teal wird NUR in dunklen Bereichen sichtbar, Highlights bleiben unberuehrt

### soft-light — Kontrastanhebung, sanft
```
Formel: Komplexe Verzweigung (aehnlich overlay, aber weicher)
```
- Dunkle Farbe: verdunkelt leicht
- Helle Farbe: hellt leicht auf
- 50% Grau: kein Effekt
- **Anwendung:** `rgba(0, 0, 0, 0.08)` mit soft-light = sanfte Schatten-Vertiefung (wie in ColorGrade.tsx)

### overlay — Kontrastanhebung, aggressiv
```
Formel: if (B < 128) then (2*A*B/255) else (255 - 2*(255-A)*(255-B)/255)
```
- Dunkle Bereiche werden dunkler (wie multiply)
- Helle Bereiche werden heller (wie screen)
- **Anwendung:** Grain-Overlay — Rauschen mit overlay bei 4-8% Opacity fuer Film-Textur

### color — Nur Farbe uebertragen
```
Formel: Uebernimmt Hue + Saturation vom Vordergrund, behaelt Luminanz des Hintergrundes
```
- **Anwendung:** Einheitlichen Farbton ueber verschiedene Shots legen. z.B. `rgba(200, 160, 100, 0.05)` mit color = zarter Gold-Tint ohne Helligkeitsaenderung

**Relevanz fuer ColorGrade.tsx:** Die bestehende Implementierung nutzt multiply (warm tint), soft-light (contrast), screen (shadow lift), overlay (grain) — das ist korrekt und entspricht professionellen Blend-Mode-Stacking-Techniken.

## 9.5 SVG feColorMatrix fuer praezise Farb-Manipulation

### Die 5x4-Matrix verstehen
```
| R_out |   | r1 r2 r3 r4 r5 |   | R_in |
| G_out | = | g1 g2 g3 g4 g5 | * | G_in |
| B_out |   | b1 b2 b3 b4 b5 |   | B_in |
| A_out |   | a1 a2 a3 a4 a5 |   | A_in |
                                    | 1    |
```

### Rezepte fuer gaengige Farb-Operationen

**Identitaet (keine Aenderung):**
```
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 1 0
```

**Saettigung erhoehen (x1.2):**
```
0.8274  0.1716  0.0010  0  0
0.0454  0.8566  0.0980  0  0
0.0454  0.1716  0.7830  0  0
0       0       0       1  0
```

**Warm-Tint (Gold-Shift):**
```
1.05  0.02  0.00  0  0.02
0.00  1.02  0.00  0  0.01
0.00  0.00  0.96  0  -0.01
0     0     0     1  0
```
Erhoehung Rot (+5%), leichte Gruen-Erhoehung (+2%), Blau-Reduktion (-4%), minimaler Rot-Offset (+0.02).

**Teal-Schatten (Cool Shadows):**
```
0.95  0.00  0.00  0  0.00
0.00  1.02  0.02  0  0.01
0.05  0.00  1.06  0  0.02
0     0     0     1  0
```
Rot leicht reduziert (-5%), Rot-Anteil wird zu Blau addiert (+0.05), Blau gesamt erhoehte (+6%). Ergebnis: Wo wenig Rot ist (Schatten), kommt Teal durch.

**Bleach-Bypass-Approximation:**
```
0.65  0.25  0.10  0  0.03
0.10  0.65  0.25  0  0.03
0.10  0.25  0.65  0  0.03
0     0     0     1  0
```
Jeder Kanal mischt 35% der anderen Kanaele hinein = Entsaettigung + leichte Aufhellung.

## 9.6 Limitationen von CSS-Grading vs echtem Grading (DaVinci)

| Eigenschaft | CSS/Remotion | DaVinci Resolve |
|-------------|-------------|-----------------|
| Lift/Gamma/Gain selektiv | Nicht direkt, nur via Blend-Mode-Stacking | Direkt, per Farbrad |
| Qualifier (Farbe isolieren) | Nicht moeglich | Pixel-genau |
| Power Windows | Nur einfache Gradients/radial-gradient | Beliebige Formen, tracked |
| Curves (RGB einzeln) | Nur via feColorMatrix-Approximation | Direkte RGB-Curves |
| Hue vs Hue | Nicht moeglich | Direkt |
| Hue vs Sat | Nicht moeglich | Direkt |
| Bit-Tiefe | 8-bit (Canvas) | 32-bit float |
| Banding-Risiko | HOEHER (8-bit Canvas + CSS-Filter-Pipeline) | NIEDRIGER (32-bit Processing) |
| Node-basiertes Stacking | Nicht nativ, manuell per Layer | Unbegrenzte Nodes |
| Performance | 60fps im Browser | Echtzeit abhaengig von GPU |

### Konsequenz fuer Remotion
CSS-Grading ist eine **Annaeherung**, kein Ersatz. Fuer den LOCOS-Content-Level ist die `ColorGrade.tsx`-Approach ausreichend, weil:
1. Die Quellmaterial-Qualitaet (Talking-Head, Webcam/DSLR, Rec.709) keine extreme Grading-Flexibilitaet erfordert
2. Die Overlays und Grafiken in Remotion generiert werden = perfekte Farbkontrolle ab Quelle
3. Das Blend-Mode-Stacking die wichtigsten Operationen (Warm-Tint, Teal-Shadows, Vignette, Grain, Kontrast) abdeckt

**Relevanz: 5** — CSS-Grading ist der pragmatische Weg fuer Remotion. Die Limitationen kennen und kompensieren.

---

# 10. FARBPSYCHOLOGIE FUER FINANCE-CONTENT

## 10.1 Farben und Vertrauen

### Blau — Die Vertrauensfarbe #1
- **Psychologie:** Stabilitaet, Kompetenz, Sicherheit, Zuverlaessigkeit
- **Studie (Journal of Business Research):** Blau erhoehte die wahrgenommene Vertrauenswuerdigkeit um 42% in professionellen Kontexten
- **Physiologisch:** Senkt Herzfrequenz, reduziert Angst — ideal fuer Gespraeche ueber Geld
- **Finance-Einsatz:** 85% der Finanzinstitute nutzen Blau als Primaerfarbe (Chase, Goldman Sachs, Deutsche Bank, PayPal, Visa)
- **Hex-Werte:** Navy (#003B6F), Royal Blue (#1A56DB), Trust Blue (#0066CC)

### Warum LOCOS NICHT Blau als Primaerfarbe nutzt
Daniel Sauer positioniert sich als **Gegenposition zum Establishment**. Blau = Banken = "das System". Gold + Schwarz + Rot = Unabhaengigkeit, Premium, Handlungsdruck. Die bewusste Vermeidung von Bank-Blau ist ein Differenzierungsmerkmal.

## 10.2 Farben und Gefahr/Dringlichkeit

### Rot — Alarm, Urgency, Stopp
- **Hex:** LOCOS Rot: #E30613
- **Psychologie:** Erhoehte Herzfrequenz, gesteigerte Aufmerksamkeit, Handlungsdruck
- **Finance-Einsatz:** "Verlust", fallende Kurse, Warnungen, Breaking News
- **Dosierung:** LOCOS nutzt Rot als AKZENT (Titel, Zahlen, Alarme) — NICHT als Flaechenfarbe. Zu viel Rot = Panik statt Handlung.
- **Im Grade:** Rot-Saettigung in Overlay-Texten bei 100% belassen, im Gesamtbild bei 60-70%

### Orange — Dringlichkeit ohne Panik
- **Hex:** #E8A020 bis #FF8C00
- **Psychologie:** Weniger aggressiv als Rot, aber aktiver als Gelb. Suggeriert "handle bald, nicht sofort"
- **Finance-Einsatz:** Call-to-Action, Countdown-Timer, "Limitiertes Angebot"
- **Im Grade:** Hauttoene liegen im Orange-Bereich — Orange-Akzente harmonieren mit Talking-Head

## 10.3 Farben und Geld/Wert

### Gold — Premium, Wert, Bestaendigkeit
- **Hex:** LOCOS Gold: #A68B2C (gedaempft), LOCOS Gold Light: #C8A84C
- **Psychologie:** Luxus, Wohlstand, Zeitlosigkeit, Exklusivitaet
- **Wichtig:** Gold funktioniert NUR als AKZENT auf dunklem Hintergrund. Gold auf Weiss = unsichtbar. Gold auf Schwarz = Premium.
- **Uebernutzung:** Zu viel Gold = protzig statt edel. LOCOS nutzt Gold korrekt: Logo, Akzent-Linien, Key-Zahlen.
- **Im Grade:** Der Warmth-Parameter in ColorGrade.tsx erzeugt einen subtilen Gold-Schleier ueber das gesamte Bild

### Gruen — Wachstum, Gewinn
- **Hex:** Finance-Gruen: #00C853 (hell), #1B5E20 (dunkel)
- **Psychologie:** Positive Entwicklung, Sicherheit, Natur, Gesundheit
- **Finance-Einsatz:** Steigende Kurse, Gewinne, positive Kennzahlen
- **Im Grade:** NICHT als Gesamtton (macht Hauttoene krank). Nur in Overlays/Charts.

### Schwarz — Autoritaet, Luxus, Endgueltigkeit
- **Hex:** LOCOS Schwarz: #161514 (warmes Schwarz, NICHT reines #000000)
- **Psychologie:** Macht, Kontrolle, Premium-Positionierung
- **Finance-Einsatz:** High-End-Beratung, Private Banking, Premium-Marken
- **Im Grade:** Tiefe Schatten (aber mit Detail!) + schwarze Letterboxes = Kino-Autoritaet. LOCOS darkBg (#1A1918) ist ein warmes Schwarz — korrekt, da reines Schwarz auf Bildschirmen tot und kuenstlich wirkt.

## 10.4 Wie Bloomberg, CNBC, Financial Times Farbe nutzen

### Bloomberg
- **Palette:** Schwarz (#000000) + Amber/Orange (#FFA028) + Weiss (#FFFFFF)
- **Strategie:** Hoher Kontrast, Information-First. Das Amber referenziert den Bloomberg Terminal (gruener Text auf Schwarz, spaeter Orange auf Schwarz).
- **Signal:** "Daten stehen im Vordergrund, nicht Design"
- **Lernbar:** Amber/Orange als Daten-Highlight auf schwarzem Grund = hoehecter Kontrast

### Financial Times
- **Palette:** Salmon/Creme (#FFF1E0) + Teal (#0D7680) + Schwarz
- **Strategie:** Das lachsfarbene Papier ist seit 1893 das Markenzeichen. Signalisiert Exklusivitaet, Tradition, Intellekt.
- **Signal:** "Wir sind keine Boulevard-Zeitung" — der warme Creme-Ton beruhigt
- **Lernbar:** Teal als Akzent auf warmem Hintergrund = intellektueller, ruhiger Kontrast

### CNBC
- **Palette:** Blau (Peacock Blue) + Weiss + Rot/Gruen (Marktfarben) + Gelb (Breaking)
- **Strategie:** Broadcast-News-Paradigma. Blau = Vertrauen, Rot/Gruen = Marktdaten, Gelb = Eilmeldung
- **Signal:** "Breaking News, schnell, aktuell"
- **Lernbar:** Farbcodierung fuer Daten-Visualisierung (Rot = schlecht, Gruen = gut, Gelb = Achtung)

## 10.5 Daniel Sauers Farbpalette (LOCOS) — Analyse und Optimierung

### Aktuelle Palette
| Farbe | Hex | Funktion | Bewertung |
|-------|-----|----------|-----------|
| Gold | #A68B2C | Primaerfarbe, Branding | Exzellent — gedaempft, edel, differenziert |
| Gold Light | #C8A84C | Highlight-Gold | Gut — fuer leuchtende Akzente |
| Gold Dim | #8A7424 | Subtiler Gold-Ton | Gut — fuer Hintergrund-Elemente |
| Rot | #E30613 | Akzent, Warnung, Dringlichkeit | Gut — knallig genug fuer Alarm, sparsam eingesetzt |
| Schwarz | #161514 | Hintergrund, Text | Exzellent — warmes Schwarz, nicht tot |
| Dark BG | #1A1918 | Hintergrund-Variation | Gut — minimal heller als Schwarz, mehr Tiefe |
| Weiss | #EBE9E4 | Text, Flaechen | Exzellent — warmes Weiss (nicht blau-weiss), passt zu Gold |
| Silber | #78716C | Sekundaertext | Gut — warmes Grau |
| Text Light | #D4D0C8 | Sekundaertext hell | Gut — readability auf dunklem Grund |

### Ist sie optimal?
**JA**, mit einem kleinen Hinweis:

Die Palette hat KEINE kalte Farbe (kein Blau, kein Teal). Das ist GEWOLLT — es differenziert von Bank-Blau. Aber fuer die COLOR GRADE im Video ist ein leichter Teal-Shift in den Schatten EMPFEHLENSWERT, um:
1. Tiefe zu erzeugen (Komplementaer-Kontrast Gold vs Teal)
2. Die Palette nicht "zu warm" wirken zu lassen (Risiko: "versifft" statt "edel")
3. Den professionellen Kino-Look zu stuetzen (Teal-Schatten = Industriestandard)

**Das ist bereits in ColorGrade.tsx implementiert** — der Screen-Layer mit `rgba(10, 15, 30, 0.08)` erzeugt genau diesen Teal-Shadow-Effekt.

### Empfohlene Erweiterung: Teal fuer Daten-Visualisierung
Fuer Charts und Daten-Overlays waere ein explizites Teal als Palette-Erweiterung sinnvoll:
```typescript
// Vorschlag fuer colors.ts
teal: "#1A7A7A",      // Daten, Charts, kühle Akzente
tealLight: "#2A9A9A",  // Hover, Active States
tealDim: "#0D5050",    // Subtile Hintergruende
```

---

# ZUSAMMENFASSUNG — Die 20 wichtigsten Regeln fuer LOCOS Color Grading

1. **Rec.709 ist Gesetz.** Export IMMER in Rec.709, NIEMALS Rec.2020 SDR.
2. **Grain ON fuer finales Rendering.** 1-2% feinkoernig gegen YouTube-Banding.
3. **Hautton auf der I-Linie (123°).** JEDES Video pruefen. Zu rot = krank, zu gelb = krank.
4. **Teal in Schatten, Warm in Highlights.** Der Komplementaer-Kontrast ist das Grundgeruest des Looks.
5. **Saettigung bei 55-70%.** Nicht YouTube-bunt, nicht Arthouse-grau.
6. **Contrast bei 1.06-1.10.** Leicht erhoehter Kontrast = clean, professionell. Ueber 1.15 = zu aggressiv.
7. **Brightness bei 0.95-0.98.** Minimal dunkler als "neutral" = cinematic.
8. **Vignette bei 0.3-0.5.** Fokus auf den Sprecher, nicht auf die Raender.
9. **Gold-Warmth bei 0.10-0.20.** LOCOS-Branding-Ton als subtiler Schleier.
10. **Memory Colors respektieren.** Haut, Himmel, Gras muessen "richtig" aussehen.
11. **Primary ZUERST, dann Secondary.** Reihenfolge ist heilig.
12. **LUTs mit 30-50% Opacity.** NIE bei 100%.
13. **Shot Matching per Scopes.** Augen luegen, Waveform/Vectorscope nicht.
14. **4K hochladen = besserer Codec.** Auch wenn Quellmaterial 1080p ist.
15. **Am iPhone testen.** 55% der Views kommen mobil.
16. **Export-Bitrate: 15-20 Mbps (1080p) oder 50+ Mbps (4K).** YouTubes Minimum-Empfehlung ist zu niedrig.
17. **Kein HDR.** Aufwand/Nutzen-Verhaeltnis fuer Talking-Head-Content negativ.
18. **Warmes Schwarz (#161514) statt reines Schwarz (#000000).** Reines Schwarz wirkt tot.
19. **Warmes Weiss (#EBE9E4) statt reines Weiss (#FFFFFF).** Reines Weiss blendet und wirkt billig.
20. **Emotionsbogen in der Grade animieren.** Warmth/Saettigung verschieben sich mit dem Content (AnimatedGrade-Approach).

---

# QUELLEN

- [Color Grading Fundamentals — Lift/Gamma/Gain Tutorial](https://aaapresets.com/blogs/davinci-resolve-color-grading-gradient-tutorials/unlocking-visual-magic-a-deep-dive-into-lift-gamma-and-gain-color-wheels-in-2025)
- [What is Gamma? Pro Colorist Explains — Frame.io](https://blog.frame.io/2024/09/02/what-is-gamma-a-pro-colorist-explains/)
- [Color Gamut: Rec.709, DCI-P3, Rec.2020 — BenQ](https://www.benq.com/en-us/business/resource/trends/understanding-color-gamut.html)
- [Color Spaces Demystified — Shotkit](https://shotkit.com/color-spaces/)
- [The Skin Tone Line — Pixel Valley Studio](https://pixelvalleystudio.com/pmf-articles/the-skin-tone-line)
- [Skin Tones in DaVinci Resolve — Frame.io](https://blog.frame.io/2020/10/05/skin-tones-in-davinci-resolve/)
- [Teal & Orange Analysis — Maurizio Mercorella](https://www.mauriziomercorella.com/color-grading-blog/color-grading-teal-and-orange-analysis-of-a-look)
- [What is Bleach Bypass — Boris FX](https://borisfx.com/blog/what-is-bleach-bypass-complete-guide-film-technique/)
- [Essential Guide to LUTs — Frame.io](https://blog.frame.io/2019/08/12/luts-101/)
- [1D vs 3D LUTs — MixingLight](https://mixinglight.com/color-grading-tutorials/difference-between-1d-and-3d-luts/)
- [YouTube Upload Encoding Settings — Google](https://support.google.com/youtube/answer/1722171?hl=en)
- [Film Grain for Online Video — Garret Harkawik](https://www.garretharkawik.com/how-to-add-grain-to-online-video)
- [Color Banding Fixes — UniFab](https://unifab.ai/resource/what-is-color-banding)
- [CSS Filter Effects — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Filter_effects)
- [feColorMatrix — MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feColorMatrix)
- [Finessing feColorMatrix — A List Apart](https://alistapart.com/article/finessing-fecolormatrix/)
- [SVG Color Matrix Mixer](https://fecolormatrix.com/)
- [mix-blend-mode — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode)
- [Blend Modes — web.dev](https://web.dev/learn/css/blend-modes)
- [Color Psychology for Financial Brands — Bethany Works](https://bethanyworks.com/color-psychology-financial-services-brands/)
- [Psychology of Colours in Financial Planning — LinkedIn](https://www.linkedin.com/pulse/psychology-colours-financial-planning-building-trust-gzqie)
- [Bloomberg Brand Color Palette — Mobbin](https://mobbin.com/colors/brand/bloomberg)
- [Financial Times Color Codes — BrandColorCode](https://www.brandcolorcode.com/financial-times)
- [Memory Colors — Prolost](https://prolost.com/blog/2010/2/15/memory-colors.html)
- [Memory Colors for Colorists — Tobia Montanari](https://www.tobiamontanari.com/memory-colors-an-essential-tool-for-colorists/)
- [Wes Anderson Color Palette — Pixflow](https://pixflow.net/blog/the-ultimate-guide-to-wes-andersons-color-palette/)
- [Day for Night Technique — MixingLight](https://mixinglight.com/color-grading-tutorials/day-for-night/)
- [Log Profiles Explained — Winner Winner](https://winnerwinnerchickendinner.in/explainers/log-profiles-slog-clog-vlog-color-grading-explained)
- [Video Scopes — Vegas Creative Software](https://www.vegascreativesoftware.com/us/video-editing/video-scopes-waveform-vectorscope-for-accurate-color-grading/)
- [Waveform, Parade, Vectorscope — AAA Presets](https://aaapresets.com/blogs/davinci-resolve-color-grading-gradient-tutorials/unlocking-videos-true-potential-a-deep-dive-into-waveform-parade-and-vectorscope-in-2025)
