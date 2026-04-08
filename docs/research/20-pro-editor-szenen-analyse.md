Jetzt habe ich ein vollstaendiges Bild. Hier ist der umfassende Report.

---

# ULTRA-DEEP PRAXIS-REPORT: Von "Okay" zu "$10k-Editor" -- 12 Szenen-Analysen

Basierend auf deinem bestehenden Code in `/Users/dario/ds-motion-graphics/src/compositions/ezb-falle/` und Recherche zu den Workflows von Johnny Harris, Vox, Bloomberg, Al Jazeera, Kurzgesagt und Netflix-Dokus.

---

## SZENE 1: WELTKARTE -- Hormuz-Strasse (EZB05-HormuzMap.tsx)

### Was du hast
D3-geo Mercator-Projektion, flat SVG-Pfade, KargPulse als rote Ringe, gestrichelte Schiffsrouten, Camera-Flight per scale/translate auf dem SVG-Container, Parallax-Hintergrund-Foto. Technisch sauber, aber es sieht aus wie eine animierte Wikipedia-Karte.

### Was der Pro anders macht

**1. 3D Globe statt 2D Flat Map**
Johnny Harris und Vox nutzen den "Fly-in from Space"-Effekt als Storytelling-Werkzeug. Die Kamera startet im Weltraum, der Zuschauer sieht die Erde als Kugel, und dann zoomt sie herunter auf die konkrete Region. Das erzeugt sofort geografischen Kontext -- der Viewer VERSTEHT wo Hormuz liegt, weil er die Erde als Ganzes gesehen hat.

Technisch nutzen sie **Google Earth Studio** (kostenlos, browser-basiert) fuer den Satellite-Imagery Fly-In und **GEOlayers 3** (After Effects Plugin, ~$110) fuer das Ueberlagern von Annotationen, Routen und Labeling auf der Karte. GEOlayers rendert Karten direkt in AE und erlaubt Zoom, Pitch, Rotation mit Keyframes.

**In Remotion machbar:** `@remotion/three` + `react-globe.gl` oder `three-globe`. Du erstellst einen `<ThreeCanvas>` und renderst eine Sphere mit NASA Blue Marble Textur (frei verfuegbar, 8192x4096px). Die Kamera-Animation von Orbit zu Close-Up ist mit `useCurrentFrame()` + `interpolate()` auf Camera-Position/Rotation trivial. Die Bibliothek `react-globe.gl` liefert fertige Arcs fuer Schiffsrouten und Points fuer Markierungen.

**2. Echte Satelliten-Textur statt flat Farben**
CNN, BBC und Al Jazeera nutzen alle reale Satelliten-Imagery als Basis. Al Jazeera rendert seine Karten als "glassy slabs" -- halb-transparente Glas-Platten die auf dem Boden eines virtuellen Studios liegen, mit Cinema 4D fuer 3D-Elemente und realistische Beleuchtung. Die Laender sind nicht flach eingefaerbt sondern zeigen Terrain, Wueste, Berge.

**In Remotion machbar:** Die Blue Marble Textur als Sphere-Map in Three.js PLUS ein normales d3-geo SVG-Layer darueber fuer die Annotationen. Das SVG-Layer nutzt `mixBlendMode: 'screen'` oder `'multiply'` um die Laender-Highlights auf die Satelliten-Textur zu legen.

**3. Animierte Schiffs-Icons die sich BEWEGEN**
Deine gestrichelten Linien sind statisch -- sie zeichnen sich ein, bewegen sich aber nicht. Profis zeigen kleine Schiffs- oder Tanker-Icons die sich entlang der Route bewegen. Das nutzt `getPointAtLength()` auf dem SVG-Path um das Icon Frame fuer Frame entlang des Pfads zu positionieren.

**4. "Danger Zone" Aesthetik**
Nachrichten-Sender nutzen NICHT nur eine rote Linie fuer die Hormuz-Strasse. Sie zeigen eine halbdurchsichtige rote Zone (Polygon, nicht Linie), die pulsiert. Dazu kommen animierte Schraffur-Linien innerhalb der Zone (diagonale Streifen die sich bewegen -- ein militaerisches "Restricted Area" Pattern). Plus ein kleines Warndreiecks-Icon.

**5. Sound Design**
Bei einer Map-Animation arbeiten Profis mit: einem tiefen Bass-Rumble beim Zoom-In, einem Whoosh beim Camera-Travel, einem Impact-Hit wenn ein Label erscheint, und einem subtilen "Electronic Hum" waehrend die Danger Zone pulsiert.

### Warum es besser aussieht
Die 2D-Karte wirkt wie ein Schulbuch. Der 3D-Globe mit Satelliten-Textur wirkt wie CNN Breaking News. Der Unterschied ist *perceived production value* -- der Zuschauer assoziiert 3D-Globe sofort mit "grosses Budget, serioeser Content".

### Konkrete Remotion-Umsetzung (Aufwand: 2-3 Tage)
- `npm install @remotion/three three @react-three/fiber react-globe.gl`
- ThreeCanvas mit Sphere + Blue Marble Textur
- Camera-Path: `[{lat: 0, lon: 0, alt: 2.5}, {lat: 26.5, lon: 56.2, alt: 0.08}]` interpoliert ueber 90 Frames
- D3-geo SVG-Layer fuer Labels bleibt, wird UEBER den ThreeCanvas gelegt
- Schiffs-Icon per `getPointAtLength()` animiert

---

## SZENE 2: WELTKARTE -- Laender kaufen Gold (EZB14-GoldKaeuferMap.tsx)

### Was du hast
D3-geo NaturalEarth1, Laender leuchten Gold auf per spring-Animation, Labels als DOM-Badges, Camera-Flight von Polen nach China nach Malaysia. Ambient Gold-Dots schweben.

### Was der Pro anders macht

**1. 3D Globe der zu jedem Land ROTIERT**
PolyMatter und Netflix "Explained" nutzen einen Globus der sich physisch dreht wenn das naechste Land erwaehnt wird. Der Zuschauer hat das Gefuehl "die Welt dreht sich" und nicht "die Karte scrollt". In Three.js ist das eine Rotation der Sphere um ihre Y-Achse + ein Tilt der Kamera.

**2. Goldener "Beam" von oben auf jedes Land**
Statt dass das Land einfach aufleuchtet, faehrt ein vertikaler Lichtstrahl von oben herunter auf das Land. Das ist ein konischer Gradient der von opacity 0 zu opacity 0.5 interpoliert, zentriert auf die Laender-Position. In Kombination mit Partikeln die vom Beam-Center nach aussen driften.

**3. Gold-Partikel die auf dem Land "regnen"**
Deine AmbientGoldDots schweben im Hintergrund ohne Bezug zu den Laendern. Profis lassen die Partikel GENAU auf dem highlighted Land spawnen. In Three.js: PointsMaterial auf Positionen die innerhalb der Laender-Boundary liegen.

**4. Holografische Labels im 3D-Raum**
Al Jazeeras "Pinch Point" Show nutzt Labels die wie AR-Overlays im 3D-Raum schweben. Sie haben eine feine Verbindungslinie zum Land und einen subtilen Glas-Effekt (backdrop-blur + semi-transparenter Hintergrund). Deine Badges sind solide schwarze Boxen mit Gold-Border -- das wirkt dated.

**In Remotion machbar:** Labels als `<Html>` Komponenten innerhalb von `@remotion/three`, die sich mit der 3D-Kamera mitdrehen. `backdropFilter: 'blur(8px)'` auf dem Label-Container.

**5. Counter der "tickt" statt der springt**
Bloomberg zeigt Zahlen die Digit fuer Digit von 000 auf 850 hochzaehlen, mit einem subtilen "click" Sound pro Increment. Dein NumberCounter interpoliert linear -- das ist okay aber langweilig. Der Bloomberg-Style zeigt die Ziffern als Slot-Machine (jede Ziffer rollt einzeln von oben nach unten).

### Warum es besser aussieht
Der rotierende Globe erzeugt **Dynamik und geographisches Verstaendnis**. Labels im 3D-Raum erzeugen **Tiefe**. Gezielte Partikel erzeugen **Kausalitaet** (Gold faellt auf DAS Land). Das Ganze wirkt wie eine Netflix-Doku statt wie eine Praesentation.

---

## SZENE 3: CHART -- EZB Leitzins sinkt

### Was du hast (aus dem ChartBuild.tsx Komponenten-Pattern)
SVG Line Chart mit evolvePath, Datenpunkte erscheinen, Annotations. Flat Stil auf dunklem Hintergrund.

### Was der Pro anders macht

**1. Bloomberg Terminal Aesthetik**
Der Bloomberg-Style ist ein extrem praezises System: Dunkelblau (#0F1B2D) als Basis, weisse Serifenlose (Inter/DM Sans), Akzentfarben NUR fuer Daten (Gruen positiv, Rot negativ, Gold Highlight). In deiner eigenen Research-Datei `docs/research/17-frame-by-frame-breakdowns-advanced-techniques.md` hast du das Frame-fuer-Frame dokumentiert -- es ist dort alles drin, aber noch nicht implementiert.

Konkret fehlt: Das Panel erscheint nicht als flat SVG sondern als "Glass Panel" mit `backdrop-filter: blur(12px)`, Border-Top in Gold, Box-Shadow. Die Grid-Lines haben max opacity 0.12 (nie mehr). Achsen-Labels haben opacity 0.7 (nie 1.0). Die Datenlinie zeichnet sich mit einem "glowing head" -- ein kleiner Kreis am Ende der sich zeichnenden Linie.

**2. Chart auf realistischem Monitor-Mockup**
CNBC zeigt Charts haeufig auf einem virtuellen Monitor-Screen. In Remotion: Ein `<div>` mit border-radius, box-shadow und einem subtilen Bildschirm-Glare (linear-gradient diagonal, opacity 0.03). Der Chart sitzt INNERHALB dieses Containers.

**3. "Live Data Feed" Effekt**
Bloomberg zeigt Zahlen die sich aktualisieren -- die letzte Ziffer flackert, ein kleiner Pfeil nach unten erscheint neben dem aktuellen Wert, die Zahl wechselt von Weiss zu Rot wenn sie faellt. Dazu ein permanenter Ticker-Streifen am unteren Rand der durch das Bild scrollt.

**4. Stift-Annotation ("Einkreisen")**
Vox nutzt den "Highlighter"-Effekt: Ein Kreis wird um einen kritischen Datenpunkt GEZEICHNET (wie mit Stift), mit einem leicht ungleichmaessigen Strich. In SVG: Ein Kreis-Path mit stroke-dasharray Animation, aber der Radius ist NICHT perfekt -- er hat noise auf dem Pfad (`@remotion/noise`).

### Warum es besser aussieht
Bloomberg-Style signalisiert "Finanz-Expertise". Der Monitor-Mockup erzeugt "die schauen auf echte Trading-Screens". Die Live-Data-Aesthetik suggeriert Aktualitaet. Der Stift-Annotation schafft den "Erklaer-Moment" wo der Editor sagt "SCHAU HIER HIN".

### Konkrete Remotion-Umsetzung (Aufwand: 1-2 Tage)
- `BloombergChart.tsx` steht bereits in deiner CLAUDE.md als fehlende Komponente (Prioritaet Hoch)
- Implementiere den Frame-by-Frame Breakdown aus deiner Research Datei 17 direkt
- Fuege den Glow-Head als animierten Kreis am `getPointAtLength(currentLength)` hinzu
- Ticker-Bar am unteren Rand: Endlos scrollendes `<div>` mit `translateX(-frame * 2)px`

---

## SZENE 4: ENERGIEPREISE -- Oel +55%, Gas +70% (EZB06-OelGasRace.tsx)

### Was du hast
Zwei vertikale Balken auf KenBurns-Hintergrund (oil-refinery.jpg), Zahlen-Counter, Labels "ROHOEL" und "ERDGAS". Sauber animiert aber abstrakt.

### Was der Pro anders macht

**1. Physische Metaphern statt abstrakter Balken**
Profis nutzen GEGENSTAENDE die der Zuschauer sofort versteht. Fuer Oel: Ein 3D-gerendertes Oel-Fass das sich fuellt (Fluessigkeit steigt von 0 auf 55%). Fuer Gas: Eine Flamme die groesser wird. Die Zahlen stehen NEBEN den Objekten, nicht darueber.

In Remotion: Das Fass als SVG-Illustration (Seitenansicht), die Fuellung per `clipPath` von unten nach oben animiert. Die Flamme als animiertes SVG mit `@remotion/noise` fuer flackernde Kanten.

**2. Zapfsaeulen/Tankstellen-Mockup**
Wendest-Vergleich-Style: Eine stilisierte Zapfsaeule links, ein Gaszaehler rechts. Die Preise auf der Zapfsaeule rollen wie echte LED-Anzeigen (Slot-Machine-Animation pro Ziffer).

**3. Boersen-Ticker Zahlen die BLINKEN**
Die +55% und +70% sind statisch. Bei Bloomberg blinken Zahlen die sich gerade veraendert haben -- 3 Frames Rot, 3 Frames Standard, 3 Frames Rot. Das erzeugt Dringlichkeit. Dazu ein kleiner Pfeil-Icon nach oben neben der Zahl.

**4. Split-Screen mit Verlaufsvergleich**
Statt zwei Balken nebeneinander: Links der Oel-Preis als Mini-Linechart (Verlauf ueber 4 Wochen), rechts der Gas-Preis. Der Chart zeichnet sich und am Ende flasht die finale Zahl gross auf. Das ist informativer weil der Zuschauer den VERLAUF sieht, nicht nur das Ergebnis.

**5. Thermometer-Metapher**
Die einfachste physische Metapher: Ein Thermometer das steigt. Rot = heiss = teuer. Der Viewer versteht in 0.5 Sekunden was passiert.

### Warum es besser aussieht
Abstrakte Balken muss das Gehirn INTERPRETIEREN. Ein Oel-Fass das ueberlaeuft ist SOFORT emotional. Physical Metaphors reduzieren cognitive load um geschaetzt 40-60% (Tufte-Prinzip: "Show the data, not the decoration" -- aber hier IST das physische Objekt die beste Darstellungsform der Daten).

---

## SZENE 5: LAGARDE QUOTE -- "Bedeutender Schock" (EZB09-LagardeSchock.tsx)

### Was du hast
KenBurns auf lagarde.jpg, animierter Radial-Gradient, "EZB" Label, "CHRISTINE LAGARDE" Name, Gold-Divider, Typewriter-Quote mit rotem "Schock". Dekorative Anfuehrungszeichen.

### Was der Pro anders macht

**1. VIDEO-Clip statt Foto**
Das ist der groesste einzelne Upgrade. Profis zeigen 3-5 Sekunden des echten Pressekonferenz-Videos. Lagarde SPRICHT die Worte, der Zuschauer HOERT sie. Dann freeze-frame, der Hintergrund dimmt ab, und die Texteinblendung erscheint. Das ist 10x wirkungsvoller als ein Foto.

In Remotion: `<OffthreadVideo>` fuer den EZB-Pressekonferenz-Clip, `interpolate()` auf opacity und filter:brightness fuer den Dimm-Effekt. Der Text-Layer liegt darueber.

**2. Nachrichten-Lower-Third**
Statt dem aktuellen Layout (zentriert, gross) nutzen Nachrichten-Sender ein Lower Third: Ein Band im unteren Drittel mit dem Namen links, der Funktion rechts, und einem Sender-Logo. Das signalisiert sofort "dies ist eine offizielle Quelle". Die Animation: Das Band wipet von links rein, der Text fadet 2 Frames spaeter ein.

**3. Zitat als hervorgehobener Text auf Dokument-Mockup**
Alternativ: Das Zitat steht auf einem stilisierten EZB-Dokument (weisses Paper mit EZB-Logo, blaue Akzente). Ein gelber Highlighter-Strich faehrt ueber "bedeutenden Schock". Das sieht aus wie ein echtes Leak/Dokument.

**4. Breaking News Ticker**
Am unteren Bildrand laeuft ein roter Ticker mit "BREAKING: EZB-Praesidentin warnt vor Energieschock" durchs Bild. Nutzt `translateX()` mit konstantem Speed.

### Warum es besser aussieht
Video > Foto. Immer. Ein sprechendes Gesicht erzeugt parasoziale Bindung (deine eigene Research in `14-viewer-psychologie-storytelling-struktur.md` dokumentiert das). Das Lower-Third signalisiert journalistische Qualitaet. Der Document-Mockup suggeriert "exklusives Material".

### Konkrete Remotion-Umsetzung (Aufwand: 0.5 Tage)
- EZB-Pressekonferenz-Video von YouTube als Asset (Fair Use fuer Bildungszwecke)
- `<OffthreadVideo>` als Background, 150 Frames, dann `filter: brightness(${interpolate(frame, [120, 150], [1.0, 0.3])})`
- Lower Third als neuer Komponent `<BroadcastLowerThird>` mit Wipe-Animation

---

## SZENE 6: DREI OPTIONEN DER EZB (EZB11-DreiOptionen.tsx)

### Was du hast
3 Phasen (je 500-600 Frames) mit Titel-Badges, InlineCounter, Balken, animierten Hintergrund-Blobs, Grid-Overlay.

### Was der Pro anders macht

**1. 3 TUEREN/PFADE Metapher**
Statt abstrakter Phasen: Der Bildschirm zeigt 3 Tueren (oder 3 Wege die sich gabeln). Jede Tuer oeffnet sich und zeigt die Konsequenz dahinter. Vox nutzt diese "fork in the road" Metapher staendig -- eine Strasse die sich in 3 Richtungen teilt, mit einem Schild an jeder Abzweigung.

**2. Entscheidungsbaum als animiertes Diagramm**
Statt sequentielle Phasen: Ein Baum der von oben nach unten waechst. Stamm = "EZB muss handeln", dann 3 Aeste = 3 Optionen. Jeder Ast endet mit einem roten X oder einer Explosion. Die Botschaft: ALLE Wege sind schlecht.

**3. Waage die KIPPT**
Fuer jede Option eine Waage. Links: "Inflation", Rechts: "Rezession". Bei Option 1 kippt die Waage nach links. Bei Option 2 nach rechts. Bei Option 3 bricht die Waage auseinander. Physisch, emotional, sofort verstaendlich.

**4. Visuell: Alle 3 auf EINEM Screen**
Statt 3 sequentielle Phasen: Ein Triptychon. Links Option 1, Mitte Option 2, Rechts Option 3. Der Zuschauer sieht alle gleichzeitig und kann vergleichen. Die aktuell besprochene Option ist hell, die anderen gedimmt. Beim Wechsel faehrt ein Spotlight von einer zur naechsten.

### Warum es besser aussieht
Sequentielle Phasen zwingen den Zuschauer sich die vorherigen zu MERKEN. Ein Triptychon zeigt ALLES GLEICHZEITIG. Physische Metaphern (Tueren, Waage) machen die abstrakte Geldpolitik greifbar. Cognitive Load Theory (in deiner Research): Gleichzeitige visuelle Darstellung > sequentielle Praesentation bei Vergleichen.

---

## SZENE 7: DREIFACH-KRISE -- DAX, Trump, Energie (EZB13-TripleCrisis.tsx)

### Was du hast
3 bidirektionale Balken (DAX runter, Trump-Zoelle rauf, Energie rauf), Null-Linie, KenBurns stock-crash.jpg, "EZB: HANDLUNGSUNFAEHIG" als Punchline.

### Was der Pro anders macht

**1. Screen-Crack / Zerbrochener Monitor**
Der Bildschirm "zerbricht" in 3 Teile. Jeder Scherbe zeigt eine Krise. Das nutzt den `ScreenCrack.tsx` Komponent den du bereits hast. Technisch: 3 `clipPath`-Polygone die diagonal den Screen teilen, mit einem weissen "Riss" dazwischen und einem Impact-Flash + Camera-Shake beim Entstehen.

**2. 3 Nachrichtenbilder gleichzeitig (CNN Split-Screen)**
CNN zeigt bei komplexen Krisen einen 3-Way Split: Links ein fallender DAX-Chart, Mitte Trump am Rednerpult, Rechts eine Oelplattform. Jedes Panel hat ein eigenes Lower-Third. Das sieht sofort nach "Breaking News, multiple Fronten" aus.

**In Remotion machbar:** 3 `<div>` mit `width: 33.33%`, jeweils mit eigenem Video/Bild + Lower-Third. Trenner als 2px Gold-Linie.

**3. Domino-Effekt**
3 Dominosteine die nacheinander fallen. Stein 1 = "DAX -17%", faellt auf Stein 2 = "TRUMP ZOELLE +20%", faellt auf Stein 3 = "ENERGIE +70%". Das visualisiert KAUSALITAET (eine Krise loest die naechste aus), nicht nur Parallelitaet.

**4. Sturmfront-Metapher**
Eine Wetterkarte mit 3 Sturmzellen die auf Europa zusteuern und sich vereinen. Jede Sturmzelle traegt ein Label. Sie verschmelzen in der Mitte zu einer "Superzelle". Visuell dramatisch, meteorologisch intuitiv.

### Warum es besser aussieht
Balken sind ANALYTISCH. Der Split-Screen ist JOURNALISTISCH. Der Domino-Effekt ist NARRATIV. Der Screen-Crack ist EMOTIONAL. Je nach gewuenschtem Effekt waehlst du die passende Metapher.

---

## SZENE 8: FLOW DIAGRAM -- Geld drucken --> Gold kaufen (FlowDiagram.tsx)

### Was du hast
4 SVG-Boxen mit evolvePath-Pfeilen, stagger Animation, Card-Container mit optionalem Background-Image. Technisch sauber aber visuell "PowerPoint".

### Was der Pro anders macht

**1. Kurzgesagt-Style: Illustrierte Animation**
Kurzgesagt nutzt pro 10-Minuten-Video ca. 200 einzigartige Illustrationen. Fuer einen Flow "Geld drucken -> Gold kaufen" wuerde das so aussehen: Eine illustrierte Druckerpresse die Geldscheine ausspuckt, die Scheine fliegen durch ein Rohr, landen in einer Schmelzanlage, und kommen als Goldbarren heraus. Alles als stilisierte 2D-Illustration mit After Effects animiert (oder in Remotion: als SVG-Illustrationen die per interpolate() und spring() animiert werden).

**2. Vox-Style: Foto-Collage mit animierten Verbindungslinien**
Vox mischt echte Fotos (Gelddruckmaschine, Goldbarren, Zentralbank) mit animierten Pfeilen und Linien die die Fotos verbinden. Die Fotos haben bewusst "Ausschnitt-Kanten" (nicht gerade, sondern wie ausgerissen). Die Pfeile sind handgezeichnet (nicht gerade, mit leichtem Noise).

**In Remotion machbar:** Fotos als `<Img>` mit `clipPath: polygon(...)` fuer unregulmaessige Kanten. Pfeile als SVG-Paths mit `@remotion/noise` fuer organische Kurven.

**3. Pipeline/Rohre-Metapher**
Statt abstrakter Pfeile: Animierte Rohre durch die etwas FLIESST. Euro-Zeichen die von Box 1 nach Box 2 fliessen, dann Goldbarren-Icons die von Box 3 nach Box 4 fliessen. Das visualisiert die TRANSFORMATION (Geld wird zu Gold).

**4. Isometrische 3D-Ansicht**
Kurzgesagt nutzt zunehmend isometrische Perspektiven. Die Boxen stehen nicht flat nebeneinander sondern schraeg in einer isometrischen Grid-Ansicht, mit leichtem 3D-Effekt (Schatten, Kanten). In CSS: `transform: rotateX(45deg) rotateZ(-45deg)` auf dem Container.

### Warum es besser aussieht
Boxen mit Pfeilen = abstrakt, akademisch. Illustrationen = einpraegsam, teilbar. Foto-Collage = redaktionell, glaubwuerdig. Pipeline mit fliessendem Content = prozesshaft, dynamisch. Jede dieser Alternativen erzaehlt eine GESCHICHTE statt ein Diagramm zu zeigen.

---

## SZENE 9: SPLIT NARRATIVE -- "Was sie sagen" vs "Was sie tun" (SplitNarrative.tsx)

### Was du hast
Zwei clipPath-Haelften mit farbigem Overlay, optionale Background-Images, Center-Divider, Wipe-Entry Animation. Text zentriert in jeder Haelfte.

### Was der Pro anders macht

**1. VIDEO auf beiden Seiten**
Links: Lagarde bei der Pressekonferenz (sprechend, offiziell). Rechts: Footage von Goldtransporten/Zentralbank-Tresoren. Die Dichotomie wird GEZEIGT, nicht nur beschrieben. In Remotion: `<OffthreadVideo>` in jeder Haelfte, mit unterschiedlichen Clips.

**2. "Zeitungs-Headline vs Echte Daten"**
Links: Ein stilisiertes Zeitungs-Layout (Schriftart: Serifenschrift, Spalten-Layout, echte Headline). Rechts: Bloomberg-Chart oder Datenbank-Screenshot. Das kontrastiert "Narrative" mit "Fakten".

**In Remotion machbar:** Links ein `<div>` im Zeitungsstil (Playfair Display, column-count: 2, ein "Foto" im Fliesstext), rechts der Bloomberg-Chart-Komponent.

**3. Animated Reveal (Umblättern)**
Statt dass beide Haelften gleichzeitig reinkommen: Die linke Seite ("Was sie sagen") ist zuerst alleine sichtbar. Dann "blaettert" die rechte Seite auf, wie eine Buchseite. Der Effekt: ENTHUELLUNG. "Das sagen sie offiziell -- ABER..." *Seite dreht sich um* "...das tun sie wirklich."

In Remotion: `perspective: 1200px` auf dem Container, `rotateY()` von 90 auf 0 Grad auf der rechten Haelfte, mit `backface-visibility: hidden`.

**4. Glitch-Transition zwischen den Seiten**
Die Trennlinie ist nicht statisch gold -- sie "glitcht". Kurze (4-6 Frame) Bursts wo die Linie sich verdoppelt, der Bereich um sie herum RGB-splittet, und dann wieder stabil wird. Signalisiert: "Hier stimmt was nicht."

### Warum es besser aussieht
Video ist immer staerker als Text + Foto. Das Umblaetern erzeugt DRAMA. Der Glitch signalisiert WIDERSPRUCH visuell. Die Zeitungs-Aesthetik auf der linken Seite schafft die Illusion von "offiziellem Statement".

---

## SZENE 10: FULLSCREEN TAKEOVER -- "SCHOCK", "KEIN ZUFALL" (FullscreenTakeover.tsx)

### Was du hast
3 Varianten (impact/typewriter/scale), auto-sized Font, Flash-Overlay, Vignette, Exit-Fade. Schwarzer Hintergrund.

### Was der Pro anders macht

**1. Text HINTER dem Sprecher (Subject Isolation)**
Die wirkungsvollste Technik in modernem YouTube-Editing. Der grosse Text erscheint im Vollbild, aber Daniel steht DAVOR. Das erzeugt Tiefe und Dramatik.

Technisch: Dupliziere die Video-Ebene. Die obere Ebene wird auf Daniel gemaskt (Rotobrush in AE, oder in Premiere Pro: Duplikat-Layer mit Pen-Tool Mask auf der Silhouette). Der Text sitzt ZWISCHEN dem Original-Video (unten) und dem gemaskten Daniel (oben).

**In Remotion machbar:** Du brauchst ein Alpha-Matte von Daniel (per AI Segmentation vorab erstellt, z.B. mit `@imgly/background-removal` oder Runway ML). Layer-Reihenfolge: 1) Original Video, 2) Text-Layer, 3) Daniel-Cutout als `<Img>` mit Transparenz.

**2. 3D-Text mit Licht und Schatten**
In `@remotion/three`: `<Text3D>` aus drei-drei mit Extrusion, Bevel und einem SpotLight das dramatische Schatten wirft. Der Text rotiert leicht (5 Grad Y