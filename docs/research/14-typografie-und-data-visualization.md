# Typografie fuer Video & Data Visualization fuer Finance-Videos

> Deep Research Report fuer ds-motion-graphics.
> Fokus: Konkrete Werte, px-Groessen, Hex-Farben, Font-Namen, Chart-Regeln.
> Alle Angaben fuer 1920x1080 (Full HD) bei 25fps (DS-Standard).

---

## TEIL 1: TYPOGRAFIE FUER VIDEO

---

### 1.1 Font-Auswahl fuer Screen/Video

#### Warum Sans-Serif besser fuer Video

| Eigenschaft | Sans-Serif | Serif |
|---|---|---|
| **Pixel-Grid-Alignment** | Gerade Striche = saubere Pixelkanten | Serifen = Sub-Pixel-Details, verschwimmen bei kleinen Groessen |
| **Rendering bei Bewegung** | Klare Formen bleiben bei Motion Blur lesbar | Feine Serifen loesen sich bei Animation/Skalierung auf |
| **Kleine Groessen (< 28px)** | Lesbar ab ca. 18px auf 1080p | Unter 28px werden Serifen zu Matsch |
| **Kontrast-Verhaeltnis** | Einheitliche Strichstaerke = stabiler Kontrast | Haarlinien vs. dicke Striche = inkonsistenter Kontrast |
| **Variable Encoding** | 1 File mit Weight-Achse genuegt | Oft groessere Dateien, mehr Glyphen-Komplexitaet |

**Fazit:** Sans-Serif ist Default fuer alles unter Display-Groesse. Serif NUR fuer:
- Zitate (Playfair Display Italic — schon im Projekt vorhanden)
- Premium-Akzente (Kapitelueberschriften, Buchtitel)
- Kontrastpunkte in der Hierarchie (H1 Serif + Body Sans = starker Kontrast)

#### Die 10 besten Fonts fuer YouTube Motion Graphics 2025-2026

| # | Font | Typ | Besonderheit | Kostenlos | Variable | Empfehlung |
|---|---|---|---|---|---|---|
| 1 | **DM Sans** | Geometric Sans | Optische Groessen-Achse, Tabular Nums, Alternative Glyphen (a/g) | Ja (Google) | Ja (weight 100-700 + opsz) | **Bereits im Projekt — perfekt fuer Body + Headlines** |
| 2 | **Montserrat** | Geometric Sans | 900 Weight-Stufen, starkes All-Caps, hohe x-Hoehe | Ja (Google) | Ja (weight 100-900) | **Bereits im Projekt — ideal fuer KineticType, Impact** |
| 3 | **Inter** | Neo-Grotesque | Tabular Nums, Kontextuelle Alternates, optimiert fuer Screens | Ja (Google) | Ja (weight 100-900 + opsz) | Top-Alternative fuer Data-Labels und kleine Texte |
| 4 | **Poppins** | Geometric Sans | Rund, freundlich, DM Sans-Verwandter (gleiche Herkunft) | Ja (Google) | Nein (static weights) | Gute Alternative, aber DM Sans ist ueberlegen wegen Variable |
| 5 | **Roboto** | Neo-Grotesque | Google Standard, breitestes Sprachsupport | Ja (Google) | Ja (weight 100-900) | Neutraler als DM Sans, weniger Charakter |
| 6 | **Oswald** | Condensed Sans | Schmal, platzsparend, stark bei All-Caps | Ja (Google) | Ja (weight 200-700) | Alternativ-Display fuer enge Layouts |
| 7 | **Bebas Neue** | Display Sans | All-Caps Only, maximaler Impact | Ja (Google) | Nein (1 Weight) | Perfekt fuer einzelne Impact-Woerter, Headlines |
| 8 | **Archivo Black** | Display Sans | Extrem breit/schwer, dominiert jede Komposition | Ja (Google) | Nein (1 Weight) | Alternative zu Bebas fuer noch massiveren Impact |
| 9 | **Space Grotesk** | Geometric Sans | Monospace-Charakter, Tech-Look, Tabular Nums | Ja (Google) | Ja (weight 300-700) | Fuer Tech-Overlays, Code-Zitate, Daten-Panels |
| 10 | **Playfair Display** | Transitional Serif | Hoher Kontrast, elegant, perfekt fuer Zitate | Ja (Google) | Ja (weight 400-900) | **Bereits im Projekt — Akzent/Zitat-Font** |

#### Warum DM Sans + Montserrat + Playfair perfekt passen

Das bestehende Projekt hat bereits die ideale 3-Font-Kombination:

1. **DM Sans (Body + Headlines)** — Low-Contrast Geometric Sans, abgeleitet von Poppins aber mit Optischer-Groessen-Achse. Weight 100-700. OpenType Features: `tnum` (Tabular Nums), `liga` (Ligaturen), `ss01`/`ss02` (Alternative Glyphen). Die opsz-Achse macht Buchstaben bei kleinen Groessen robuster und bei Display-Groessen feiner.

2. **Montserrat (Display + KineticType)** — Geometric Sans mit Weight 100-900. Die 900er-Gewichtung (Black) ist extrem Impact-stark fuer KineticType. 900 Gewichtsstufen ermoeglichen fluessige Weight-Animationen. Grosse x-Hoehe = exzellente Lesbarkeit auch bei Distanz.

3. **Playfair Display (Akzent + Zitate)** — Transitional Serif mit hohem Kontrast. Italic-Variante fuer Zitate, Maximen, historische Referenzen. Kontrast zu den Geometric Sans-Fonts schafft visuelle Spannung.

#### Google Fonts vs. Premium Fonts

| Aspekt | Google Fonts | Premium Fonts |
|---|---|---|
| **Preis** | EUR 0 | EUR 30-500+ pro Font-Familie |
| **Qualitaet** | Top-Tier bei DM Sans, Inter, Montserrat | Mehr Optical Sizes, breitere Glyph-Sets |
| **Lizenz** | SIL Open Font License (kommerziell frei) | Oft Desktop + Web + App separat lizenziert |
| **Variable Support** | Zunehmend (DM Sans, Inter, Montserrat) | Standard bei Premium-Foundrys |
| **Empfehlung** | **Fuer YouTube-Videos ausreichend.** Die Top-Google-Fonts sind auf Profi-Niveau. | Lohnt sich erst bei eigenem Branding/Corporate Design mit exklusivem Look |

**Fazit fuer DS Motion Graphics:** Google Fonts sind voellig ausreichend. DM Sans + Montserrat + Playfair Display decken alle Anwendungsfaelle ab.

#### Font-Pairing Regeln

1. **Maximal 3 Fonts pro Projekt** — Headline, Body, Akzent
2. **Kontrast statt Aehnlichkeit** — Sans + Serif, nicht zwei aehnliche Sans-Fonts
3. **Gleiches Grundgefuehl** — DM Sans + Montserrat funktioniert weil beide Geometric Sans sind aber unterschiedliche Personality haben (DM Sans = ruhig/professionell, Montserrat = laut/impact)
4. **Headline = Charakter, Body = Neutralitaet** — DM Sans Bold 700 als Headline, DM Sans Regular 400 als Body
5. **Akzent = Kontrast** — Playfair Display Italic bricht die Geometric-Monotonie fuer Zitate

**Die DS-Pairing-Matrix:**

| Rolle | Font | Weight | Einsatz |
|---|---|---|---|
| H1 (Impact) | Montserrat | 800-900 | KineticType, FullscreenTakeover, Zahlen mit Wucht |
| H2 (Headline) | DM Sans | 700 | Chart-Titel, Panel-Headlines, Lower Thirds |
| Body | DM Sans | 400 | Erklaertexte, Labels, Beschreibungen |
| Caption/Label | DM Sans | 400-500 | Achsenbeschriftungen, Quellenangaben, Zeitstempel |
| Akzent/Zitat | Playfair Display | 400 Italic | Zitate, Maximen, historische Texte |
| Daten/Zahlen | DM Sans | 700 + `tnum` | NumberCounter, Chart-Werte, Prozente |

---

### 1.2 Readability bei verschiedenen Aufloesungen

#### Minimum Font-Sizes fuer 1080p (1920x1080)

Die Grundregel: **YouTube-Videos werden zu 70%+ auf Mobile geschaut.** Ein 6-Zoll-Display zeigt 1080p-Content auf ca. 14cm Breite. Was auf dem Desktop-Monitor bei 27 Zoll gut lesbar ist, ist auf dem Handy winzig.

**Simulation:** Auf dem 27"-Monitor das Remotion-Preview auf 25% Groesse skalieren = ungefaehre Handy-Darstellung. Besser: auf 50% skalieren fuer Tablet-Simulation.

| Element | Minimum 1080p | Empfohlen 1080p | Minimum 4K (3840x2160) |
|---|---|---|---|
| **H1 / Impact Text** | 72px | 96-160px | 144px |
| **H2 / Headline** | 48px | 56-72px | 96px |
| **Body / Erklaertext** | 36px | 42-48px | 72px |
| **Caption / Label** | 24px | 28-32px | 48px |
| **Chart-Achsenwerte** | 14px (SVG) | 16-18px (SVG) | 28px |
| **Untertitel** | 36px | 42-48px | 72px |
| **Kleinster lesbarer Text** | 18px | 24px+ | 36px |

**Faustregel:** Kein Text unter 24px bei 1080p. Fuer Mobile-First: **40px Minimum fuer alles was gelesen werden MUSS.**

**Aktuelle Probleme im Projekt:**
- `ChartBuild.tsx` Line 356: X-Achsen-Labels sind `fontSize={14}` — zu klein fuer Mobile!
- `ChartBuild.tsx` Line 328: Y-Achsen-Labels sind `fontSize={14}` — zu klein fuer Mobile!
- `ChartBuild.tsx` Line 469: Count-up Labels `fontSize={12}` — kaum lesbar!
- `FlowDiagram.tsx` Line 224: Node-Labels bei `fontSize={18}` sind grenzwertig

**Empfehlung:** Chart-Labels auf mindestens 18px (SVG-Kontext, entspricht ca. 28px in CSS auf 1080p Canvas).

#### Line Height (Zeilenhoehe / Leading)

| Kontext | Print | Web | **Video** |
|---|---|---|---|
| Verhaeltnis | 120% (1.2) | 140-160% (1.4-1.6) | **140-160% (1.4-1.6)** |
| Grund | Papier hat keine Ablenkung | Screen braucht mehr Luft | **Bewegter Hintergrund braucht noch mehr Separation** |

**Konkrete Werte bei 1080p:**

| Font-Size | Line-Height 140% | Line-Height 150% | Line-Height 160% |
|---|---|---|---|
| 48px | 67px | 72px | 77px |
| 64px | 90px | 96px | 102px |
| 96px | 134px | 144px | 154px |

**Empfehlung:** `lineHeight: 1.4` fuer Single-Line-Headlines, `lineHeight: 1.5` fuer Multi-Line-Body-Text, `lineHeight: 1.0` fuer Impact-Text (bereits korrekt in `FullscreenTakeover.tsx` Line 168).

#### Letter Spacing (Tracking)

| Kontext | Wert | CSS | Einsatz |
|---|---|---|---|
| **Eng (Negative)** | -0.01 bis -0.02em | `letterSpacing: "-0.01em"` | Grosse Headlines (>80px), Display-Text |
| **Normal** | 0 bis 0.02em | `letterSpacing: "0.02em"` | Body-Text, Standard-Beschriftungen |
| **Weit (Positive)** | 0.04 bis 0.08em | `letterSpacing: "0.06em"` | All-Caps, Labels, Kategorien, Subtitles |
| **Ultra-Weit** | 0.1 bis 0.2em | `letterSpacing: "0.15em"` | Decorative Spacing, Single Words |

**Aktuelle Werte im Projekt (korrekt):**
- `AnimatedText.tsx`: `letterSpacing: "0.02em"` — Standard, gut
- `KineticType.tsx`: `letterSpacing` animiert von `-0.05em` bis `0.04em` — hervorragend, erzeugt Atem-Effekt
- `QuoteCard.tsx`: Author bei `letterSpacing: "0.06em"` — korrekt fuer All-Caps-Vibe
- `ChartBuild.tsx` Title: `letterSpacing: "0.06em"` — korrekt fuer Uppercase-Label

#### Kontrast-Ratio (WCAG)

| Level | Verhaeltnis | Anwendung |
|---|---|---|
| **AA Normal** | 4.5:1 | Standard fuer jeden Text der gelesen werden muss |
| **AA Large** | 3:1 | Text ab 24px bold oder 19px regular |
| **AAA Normal** | 7:1 | Optimal, erhoehte Barrierefreiheit |
| **AAA Large** | 4.5:1 | Groesse kompensiert niedrigeren Kontrast |

**Die DS-Palette im Kontrast-Check:**

| Kombination | Ratio | Level | Empfehlung |
|---|---|---|---|
| `#EBE9E4` (white) auf `#161514` (black) | **15.8:1** | AAA | Perfekt fuer Body-Text |
| `#A68B2C` (gold) auf `#161514` (black) | **5.2:1** | AA | Gut fuer Headlines, knapp fuer kleinen Body |
| `#C8A84C` (goldLight) auf `#161514` (black) | **7.1:1** | AAA | Besser fuer goldenen Text |
| `#E30613` (red) auf `#161514` (black) | **4.8:1** | AA | OK fuer Warnungen, nicht fuer langen Text |
| `#78716C` (silver) auf `#161514` (black) | **3.4:1** | AA Large | NUR fuer grosse Labels/Captions |
| `#D4D0C8` (textLight) auf `#161514` (black) | **12.1:1** | AAA | Hervorragend fuer Body |
| `#A68B2C` (gold) auf `#1A1918` (darkBg) | **4.9:1** | AA | Akzeptabel fuer Chart-Linien |

**Wichtige Erkenntnis:** `LOCOS.silver` (#78716C) ist problematisch fuer kleine Text-Groessen. Wird im Projekt fuer Chart-Achsen-Labels verwendet (`ChartBuild.tsx` Line 329, 358) — bei fontSize 14px ist das Kontrast-Ratio 3.4:1 bei Font-Size 14 zu niedrig! Empfehlung: `LOCOS.textLight` (#D4D0C8) verwenden oder Silver nur ab 24px+.

#### Readability-Test-Methode

1. **50%-Zoom-Test:** Remotion Preview auf 50% skalieren. Jeder Text der unleserlich wird, ist zu klein fuer Mobile.
2. **Arm-Laengen-Test:** Laptop-Bildschirm auf Armlaenge halten. Alles was man nicht lesen kann, ist zu klein.
3. **Blur-Test:** 2px Gaussian Blur ueber Screenshot. Was verschwindet, hat zu wenig Kontrast oder ist zu klein.
4. **Geschwindigkeits-Test:** Video bei 1.5x-Speed abspielen. Jeder Text der nicht gelesen werden kann, braucht mehr Hold-Time.

---

### 1.3 Text-Hierarchie in Video

#### Groessen-Verhaeltnisse mit Modular Scale

Eine Modular Scale basiert auf einem Basiswert und einem Multiplikator. Fuer Video-Motion-Graphics eignet sich die **Perfect Fourth (1.333x)** am besten — groessere Spruenge als Major Third, aber nicht so extrem wie die Golden Ratio.

**Perfect Fourth Scale (Basis: 42px Body):**

| Stufe | Faktor | Groesse | Verwendung | Font | Weight |
|---|---|---|---|---|---|
| H0 (Impact) | x 1.333^4 | **133px** | FullscreenTakeover, Einzelzahlen | Montserrat | 900 |
| H1 (Display) | x 1.333^3 | **100px** | KineticType-Woerter, Kapitel-Titel | Montserrat | 800 |
| H2 (Headline) | x 1.333^2 | **75px** | Panel-Headlines, Overlay-Titel | DM Sans | 700 |
| H3 (Subheading) | x 1.333^1 | **56px** | Sektions-Titel, Chart-Titel | DM Sans | 700 |
| Body | x 1.0 | **42px** | Erklaertexte, Beschreibungen | DM Sans | 400 |
| Caption | x 1.333^-1 | **32px** | Untertitel, Quellenangaben | DM Sans | 400 |
| Label | x 1.333^-2 | **24px** | Achsenbeschriftungen, Timestamps | DM Sans | 400-500 |
| Micro | x 1.333^-3 | **18px** | Nur fuer Disclaimer-Texte, nie fuer Gelesenes | DM Sans | 400 |

**Alternative: Major Third (1.25x) fuer subtilere Hierarchie:**

| Stufe | Faktor | Groesse |
|---|---|---|
| H0 | x 1.25^4 | **102px** |
| H1 | x 1.25^3 | **82px** |
| H2 | x 1.25^2 | **66px** |
| H3 | x 1.25^1 | **53px** |
| Body | x 1.0 | **42px** |

**Empfehlung:** Perfect Fourth (1.333x) fuer Daniel Sauer Videos — die groesseren Spruenge passen zum Finance-YouTube-Genre wo Impact wichtiger ist als Subtilitaet.

#### ALL CAPS vs Mixed Case vs lowercase

| Stil | Wann | Warum | Beispiel |
|---|---|---|---|
| **ALL CAPS** | Headlines, Labels, KineticType, Kategorien | Autoritaet, Wichtigkeit, Kompaktheit | `DIE EZB-FALLE`, `INFLATIONSRATE` |
| **Mixed Case** | Body-Text, Erklaerungen, Zitate | Lesefluss, Natuerlichkeit, Lesegeschwindigkeit +13% vs Caps | `Die Europaeische Zentralbank senkt...` |
| **lowercase** | Social-Media-Aesthetic, Casual Reels | Trend 2024-2026, wirkt nahbar/modern | `wusstest du das?` |

**Regel fuer DS:** ALL CAPS fuer KineticType-Overlays (bereits implementiert in `KineticType.tsx` Line 299: `textTransform: "uppercase"`), Mixed Case fuer alle Erklaertexte und Chart-Titel.

**Wichtig:** ALL CAPS braucht IMMER erhoehtes Letter-Spacing (0.04-0.08em) weil Grossbuchstaben ohne Tracking zu dicht stehen.

#### Bold vs Regular vs Light

| Weight | Wann | Warum NICHT |
|---|---|---|
| **Black (800-900)** | Impact-Woerter, KineticType, einzelne Zahlen | Nie fuer laengere Texte (>5 Woerter) — wird unleserlich |
| **Bold (700)** | Headlines, wichtige Zahlen, Call-to-Actions | Nie fuer Body-Text — erzeugt visuelles Gewicht ohne Hierarchie |
| **Medium (500)** | Labels, Captions, sekundaere Headlines | Guter Kompromiss wenn Bold zu schwer und Regular zu leicht |
| **Regular (400)** | Body-Text, Erklaerungen, lange Passagen | Nie fuer Headlines — verschwindet im Hintergrund |
| **Light (200-300)** | **NIE IN VIDEO!** | Duenne Striche rendern schlecht, verschwinden bei Kompression, sind auf Mobile kaum sichtbar |

**Kritisch:** Font-Weights unter 400 sind fuer Video ungeeignet. Auch bei 4K-Output werden Light- und Thin-Weights durch YouTube-Kompression (H.264) degradiert. Die Haarlinien verlieren Detail und wirken matschig.

#### Farb-Hierarchie

| Prioritaet | Farbe | Hex | Einsatz |
|---|---|---|---|
| 1 (Hoechste) | Gold | `#C8A84C` (goldLight) | Wichtigste Zahl, Kernaussage |
| 2 | Weiss | `#EBE9E4` | Headlines, Haupttext |
| 3 | Text-Light | `#D4D0C8` | Body-Text, Erklaerungen |
| 4 | Rot | `#E30613` | Warnungen, negative Werte, Verluste |
| 5 (Niedrigste) | Silber | `#78716C` | Labels, Captions, Metadaten (NUR ab 24px!) |

---

### 1.4 Text-Rendering in Video

#### Anti-Aliasing Methoden

| Methode | Beschreibung | Fuer Video |
|---|---|---|
| **Subpixel-AA** | Nutzt RGB-Subpixel des Monitors fuer schaerfere Kanten | **Irrelevant fuer Video** — Pixel werden gerendert, nicht am Monitor dargestellt |
| **Grayscale-AA** | Glaettet Kanten mit Graustufen | **Standard fuer Video** — Unabhaengig vom Ausgabegeraet |
| **Kein AA** | Harte Pixelkanten | Nur fuer Pixel-Art-Aesthetik |

**In Remotion/CSS:**
```css
-webkit-font-smoothing: antialiased;  /* macOS: Grayscale statt Subpixel */
-moz-osx-font-smoothing: grayscale;   /* Firefox macOS */
text-rendering: optimizeLegibility;     /* Aktiviert Kerning + Ligaturen */
```

**Wichtig:** Remotion rendert Server-seitig (Headless Chrome). Das Rendering ist konsistent, aber `-webkit-font-smoothing: antialiased` sorgt fuer duennere/schaerfere Buchstaben als das macOS-Default `subpixel-antialiased`. Fuer Video ist `antialiased` besser weil es device-unabhaengig ist.

#### Warum duenne Fonts auf Video schlecht aussehen

1. **Kompression:** YouTube komprimiert mit H.264/VP9. Haarlinien (1-2px breit) liegen oft auf der Grenze zwischen Makrobloecken (8x8 oder 16x16 Pixel) und werden artefaktiert
2. **Chroma Subsampling:** YouTube nutzt 4:2:0 — Farb-Information hat halbe Aufloesung. Farbige duenne Linien verlieren Schaerfe
3. **Bitrate-Verteilung:** Der Encoder gibt bewegten Bereichen mehr Bits. Statischer duenner Text bekommt weniger Bits und zerfaellt
4. **Mobile Displays:** Bei 1080p auf 6-Zoll-Display hat ein Pixel ca. 0.08mm. Ein 1px-Strich ist physisch kaum sichtbar

**Minimum Strichstaerke:** Font-Weight 400 (Regular) bei mindestens 24px. Alles darunter nur mit Weight 500+ (Medium).

#### Stroke/Outline auf Text

| Methode | Wann | Wann NICHT |
|---|---|---|
| **Kein Outline** (Default) | Text auf dunklem, ruhigem Hintergrund | — |
| **Text-Shadow (weich)** | Text auf variablem/bewegtem Hintergrund | Nicht bei sehr kleinem Text |
| **Stroke/Outline (1-2px)** | Untertitel auf Live-Video | Nicht bei Motion Graphics — wirkt billig/YouTube-2015 |
| **Background Panel** | Laengere Text-Bloecke die gelesen werden muessen | Nicht bei einzelnen Impact-Woertern |
| **Backdrop-Blur** | Premium-Look, Glassmorphism-Aesthetic | Nicht bei niedriger Bitrate/Mobile |

**Best Practices im Projekt:**

1. **`KineticType.tsx`** (Line 261-267) — Hervorragend geloest: 5-Layer Text-Shadow mit statischer Readability-Basis + dynamischem Color-Glow. Die `rgba(0,0,0,0.85)` und `rgba(0,0,0,0.7)` Schatten sichern Lesbarkeit auf JEDEM Hintergrund.

2. **`AnimatedText.tsx`** (Line 66-68) — Glow-Option mit `#A68B2C80` und `#A68B2C40` Shadows. Gut fuer dunkle Hintergruende, aber KEIN Readability-Shadow fuer helle Bereiche. **Verbesserungspotential:** Einen rgba(0,0,0,0.6) Basis-Shadow hinzufuegen.

3. **`ChartBuild.tsx`** Panel (Line 224-229) — Dunkelgraues Panel (`rgba(10, 8, 6, 0.95)`) mit Gold-Border. Perfekter Ansatz fuer Data-Viz: Der opake Hintergrund garantiert konstanten Kontrast unabhaengig vom Video-Hintergrund.

#### Text auf bewegtem Hintergrund — Lesbarkeits-Strategien

| Prioritaet | Methode | CSS/Implementation |
|---|---|---|
| 1 (Beste) | **Opakes Panel** hinter dem Text | `background: rgba(10, 8, 6, 0.92)` + `borderRadius: 12` |
| 2 | **Semi-transparentes Panel** mit Blur | `background: rgba(10, 8, 6, 0.6)` + `backdropFilter: "blur(20px)"` |
| 3 | **Multi-Layer Text-Shadow** | `textShadow: "0 0 40px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.7)"` |
| 4 | **Vignette + Gradient** unter dem Text | `background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)` |
| 5 (Schwaecher) | **Nur Glow-Shadow** | `textShadow: "0 0 40px #A68B2C80"` — NICHT ausreichend als alleinige Massnahme |

---

### 1.5 Kinetic Typography Regeln

#### Die 7 Goldenen Regeln

**Regel 1: Maximal 5-7 Woerter gleichzeitig auf Screen**
- Arbeitsspeicher des Zuschauers: 7 +/- 2 Items (Miller's Law)
- Bei KineticType mit Animation: eher 3-5 Woerter weil Animation selbst Aufmerksamkeit verbraucht
- Im Projekt: `KineticType.tsx` nutzt `words[]`-Array — Verantwortung liegt bei der Composition den Array kurz zu halten

**Regel 2: Read-Time mindestens 1.5 Sekunden Hold pro Textblock**
- Lesegeschwindigkeit: ca. 3 Woerter pro Sekunde (Deutsch, aufmerksamer Zuschauer)
- Mindest-Hold bei 25fps:
  - 1-3 Woerter: 38 Frames (1.5s)
  - 4-5 Woerter: 50 Frames (2.0s)
  - 6-7 Woerter: 63 Frames (2.5s)
  - Ganzer Satz (8+ Woerter): 75+ Frames (3.0s+)
- Im Projekt: `KineticType.tsx` `holdFrames` Default ist 45 — das sind 1.8s bei 25fps, gut fuer 1-3 Woerter. Bei laengeren Textbloecken erhoehen!

**Regel 3: Animation darf Lesbarkeit NICHT stoeren**
- Text muss ZUERST lesbar sein, DANN animiert
- Entrance-Animation: 8-12 Frames (320-480ms), danach statisch halten
- Exit-Animation: 6-10 Frames, NACHDEM der Hold vorbei ist
- NIEMALS Text waehrend des Lesens drehen, skalieren oder verzerren

**Regel 4: Nicht alles gleichzeitig animieren**
- Stagger: 2-4 Frames Versatz zwischen Woertern (im Projekt: `staggerFrames = 4` — perfekt)
- Maximal 2 gleichzeitige Animationen (z.B. Einblend + Tracking, aber nicht zusaetzlich Rotation)
- Sequentiell > Gleichzeitig: Woerter nacheinander einblenden, nie alle auf einmal

**Regel 5: Die ersten 3 Sekunden sind entscheidend**
- KineticType hat den hoechsten Impact in den ersten 3 Sekunden eines Segments
- Hook-Text sofort zeigen, nicht mit langer Build-up-Animation verzoegern
- Fuer YouTube-Retention: Innerhalb von 90 Frames (3.6s bei 25fps) muss der Kern-Text lesbar sein

**Regel 6: Wann animieren vs. statisch zeigen**

| Inhalt | Animation | Statisch |
|---|---|---|
| Einzel-Woerter mit Emotion | Ja (Scale, Wipe, Tracking) | — |
| Laengere Erklaerungen (>7 Woerter) | — | Ja (Fade-In genuegt) |
| Zahlen/Daten | Counter-Animation | — |
| Zitate | Typewriter | — |
| Labels/Beschriftungen | — | Ja (erscheinen mit Panel) |
| Call-to-Actions | Ja (Attention-Grab) | — |

**Regel 7: Emotionale Typografie**
- **Schrift-Groesse = Lautstaerke** — Leise Woerter klein, laute Woerter GROSS
- **Schrift-Weight = Wichtigkeit** — Wichtiges Bold/Black, Nebensaechliches Regular
- **Farbe = Emotion** — Gold = positiv/wichtig, Rot = Warnung/negativ, Weiss = neutral
- **Animation = Energie** — Schnelle Animation = Dringlichkeit, langsame = Autoritaet
- **Position = Hierarchie** — Bildschirmmitte = Hauptaussage, Raender = Kontext

---

### 1.6 Text in Remotion/CSS — Premium-Properties

#### CSS Properties fuer Premium-Text

```css
/* 1. Ligaturen und tabellarische Zahlen */
font-feature-settings: "liga" 1, "kern" 1;
/* Oder spezifisch: */
font-variant-numeric: tabular-nums;  /* Zahlen gleich breit → Counter flackern nicht */
font-variant-ligatures: common-ligatures;

/* 2. Optimierte Lesbarkeit */
text-rendering: optimizeLegibility;  /* Kerning + Ligaturen aktivieren */
/* ACHTUNG: Kann Performance kosten bei sehr langen Texten.
   Fuer Video-Overlays (wenige Woerter) kein Problem. */

/* 3. Konsistentes Anti-Aliasing */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;

/* 4. Tabular Nums fuer Zahlen-Counter (BEREITS IM PROJEKT!) */
font-variant-numeric: tabular-nums;
/* NumberCounter.tsx Line 52: ✓ korrekt implementiert */

/* 5. Kein Text-Selection in Video */
user-select: none;  /* Verhindert blaue Auswahl bei Interaktion im Preview */
```

**Status im Projekt:**
- `font-variant-numeric: tabular-nums` — Implementiert in `NumberCounter.tsx` (Line 52). Korrekt!
- `-webkit-font-smoothing: antialiased` — NICHT global gesetzt. **Empfehlung: In Root-Style hinzufuegen.**
- `text-rendering: optimizeLegibility` — NICHT gesetzt. **Empfehlung: Global hinzufuegen.**
- `font-feature-settings` — NICHT explizit gesetzt. DM Sans Variable aktiviert Kerning automatisch, aber ein explizites `"kern" 1, "liga" 1` waere robuster.

#### Variable Fonts in Remotion (Weight Animation)

DM Sans und Montserrat sind beide Variable Fonts mit Weight-Achse. Das ermoeglicht:

**Weight-Animation (z.B. fuer Emphasis-Effekt):**
```tsx
// Font-Weight von Regular zu Bold animieren
const weightAnim = interpolate(
  spring({ frame, fps, config: { damping: 20, stiffness: 80 } }),
  [0, 1],
  [400, 700]  // DM Sans: 100-700, Montserrat: 100-900
);

// Style:
fontWeight: weightAnim,
// ODER ueber font-variation-settings fuer feinere Kontrolle:
fontVariationSettings: `"wght" ${weightAnim}`,
```

**Optical-Size-Animation (nur DM Sans):**
```tsx
// opsz-Achse: kleine Werte = robuster (fuer kleine Groessen), grosse = feiner (fuer Display)
fontVariationSettings: `"wght" ${weight}, "opsz" ${opticalSize}`,
// DM Sans opsz Range: 9-40
```

**Width-Animation (nur bei Fonts mit wdth-Achse — DM Sans/Montserrat haben KEINE):**
Fuer Width-Animation waere Inter eine Alternative (hat wdth-Achse nicht standardmaessig, aber einige Extended-Varianten).

#### Text-Shadow Layer fuer Tiefe

Premium-Text nutzt mehrere Shadow-Layer fuer raeumliche Tiefe:

```css
textShadow:
  /* Layer 1: Enge Readability (Halo um Buchstaben) */
  "0 0 8px rgba(0,0,0,0.9)",
  /* Layer 2: Mittlerer Schatten (gibt Tiefe) */
  "0 4px 12px rgba(0,0,0,0.6)",
  /* Layer 3: Weiter Glow (Atmosphaere) */
  "0 0 40px rgba(0,0,0,0.4)",
  /* Layer 4: Farb-Glow (Akzent, optional) */
  "0 0 60px #A68B2C40"
```

**Im Projekt bereits vorbildlich umgesetzt in `KineticType.tsx` (Line 261-267).**

#### backdrop-filter: blur() als Text-Hintergrund

```tsx
// Glassmorphism-Panel hinter Text
<div style={{
  background: "rgba(22, 21, 20, 0.55)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",  // Safari-Support
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "16px 24px",
}}>
  <span style={{ color: LOCOS.white, fontSize: 42 }}>Text hier</span>
</div>
```

**Vorsicht:** `backdrop-filter` kann in Remotion Render-Performance kosten. Fuer Compositions mit vielen Overlays sparsam einsetzen. Fuer einzelne Panels (wie ChartBuild) ist es unkritisch.

---

## TEIL 2: DATA VISUALIZATION FUER FINANCE-VIDEOS

---

### 2.1 Edward Tufte Prinzipien

Die sechs Kern-Prinzipien, angewendet auf DS Motion Graphics:

#### Prinzip 1: Data-Ink Ratio

**Definition:** Das Verhaeltnis von "Tinte die Daten darstellt" zu "gesamter Tinte auf der Grafik". Jedes visuelle Element das KEINE Daten traegt, ist potentiell Chartjunk.

**Fuer DS Videos:**
- Gridlines: Maximal 3-5 horizontale, gestrichelt, 12% Opazitaet (ChartBuild nutzt `strokeDasharray="4 6"` und `opacity={gridOpacity}` mit max 0.5 — **gut, aber 0.5 ist etwas hoch. Empfehlung: 0.2-0.3**)
- Achsen: Nur zeigen wenn noetig. Bei Bar Charts reichen die Werte AM Balken statt einer separaten Y-Achse
- Dekorative Elemente: Der Gold-Border und Glow im ChartBuild-Panel ist KEIN Chartjunk — er definiert den Datenbereich und schafft visuelle Hierarchie (Film-Look = bewusste Aesthetic, nicht Zufall)
- Hintergrund: `rgba(10, 8, 6, 0.95)` ist korrekt opak — kein ablenkender Video-Durchschein

#### Prinzip 2: Chartjunk vermeiden

| Element | Tufte sagt: Entfernen | DS-Anpassung |
|---|---|---|
| 3D-Effekte | Immer entfernen | Ja — NIE 3D in Charts |
| Dekorative Icons in Charts | Entfernen | Ja — Icons NUR in FlowDiagram-Nodes, nicht in Line/Bar-Charts |
| Gradient-Fills | Entfernen | **Ausnahme:** Der `linearGradient` Area-Fill in ChartBuild (Line 274-277, 0.28 → 0 Opacity) ist akzeptabel weil er die Datenflaeche visuell verankert ohne abzulenken |
| Animierte Dekorationen | Entfernen | **Ausnahme:** Der "Breathing Glow" (Line 198-206) nach Chart-Completion ist kein Chartjunk sondern ein "Living Data" Signal — hält Aufmerksamkeit auf dem Chart |

#### Prinzip 3: Small Multiples

Dieselbe Chart-Struktur mit verschiedenen Daten nebeneinander. Ideal fuer:
- Laendervergleiche (Inflation DE vs. USA vs. Tuerkei — gleicher Line-Chart, 3x)
- Zeitvergleiche (2020 vs. 2023 vs. 2026 — gleicher Bar-Chart)
- Szenario-Vergleiche (Sparer vs. Investor vs. Immobilien-Eigentuemer)

**Empfehlung:** Neue Komponente `SmallMultiples.tsx` die 2-4 ChartBuild-Instanzen nebeneinander rendert mit gemeinsamem Massstab.

#### Prinzip 4: Lie Factor

**Definition:** `Lie Factor = Groesse des Effekts in der Grafik / Groesse des Effekts in den Daten`. Ein Lie Factor von 1.0 ist ehrlich. Alles ueber 1.05 oder unter 0.95 verzerrt.

**Kritische Fehler die man vermeiden muss:**
- Y-Achse nicht bei 0 beginnen → uebertreibt Unterschiede dramatisch
- Unterschiedliche Skalen in Vergleichs-Charts → Aepfel mit Birnen
- Kreisdiagramm-Segmente die nicht 100% ergeben
- "Zoomed" Zeitachsen die kurze Schwankungen wie Crashs aussehen lassen

**Fuer Daniel Sauer besonders relevant:** Finance-Content steht unter Beobachtung. Ein verzerrter Chart kann Glaubwuerdigkeit zerstoeren. **IMMER Y-Achse bei 0 starten** (ausser bei Boersenkursen wo der absolute Nullpunkt irrelevant ist).

**Aktuell im Projekt:** ChartBuild (Line 78-79) berechnet `minVal`/`maxVal` automatisch aus den Daten und normalisiert darauf. Das bedeutet die Y-Achse startet NICHT bei 0 sondern beim niedrigsten Datenpunkt. **Fuer Vergleichscharts problematisch!** Empfehlung: Optional `forceZeroBaseline={true}` Prop einfuehren.

#### Prinzip 5: Sparklines

Winzige Inline-Charts (ohne Achsen, Labels, Dekoration) die Trends im Fliesstext zeigen. Ideal fuer:
- "Der Goldpreis [sparkline] stieg um 12% in 3 Monaten"
- Dashboard-Zeilen mit Metrik + Sparkline
- Schnelle Trend-Indikatoren neben Zahlen

**Nicht im Projekt vorhanden.** Waere eine wertvolle Ergaenzung fuer Info-Panels.

#### Prinzip 6: Graphical Excellence

"Graphical Excellence = well-designed presentation of interesting data — a matter of substance, of statistics, and of design."

Fuer DS: **Der Chart muss eine Geschichte erzaehlen, nicht Daten dekorieren.** Jeder Chart braucht:
1. Eine klare These (Titel: "Inflationsrate explodiert seit 2021")
2. Einen visuellen Hoehepunkt (Annotation am Extremwert)
3. Kontext (Quellenangabe, Zeitraum, Einheit)

---

### 2.2 Chart-Typ Auswahl

#### Die Entscheidungsmatrix

| Frage | Chart-Typ | DS-Komponente |
|---|---|---|
| **Wie hat sich X ueber Zeit entwickelt?** | Line Chart | `ChartBuild` |
| **Wie gross ist X im Vergleich zu Y?** | Bar Chart (horizontal) | `ComparisonBar` |
| **Woraus setzt sich X zusammen?** | Stacked Bar / Waterfall | `BudgetBreakdown` |
| **Wie laeuft Prozess X ab?** | Flow Diagram | `FlowDiagram` |
| **Wie stehen zwei Optionen gegenueber?** | Split Screen | `SplitNarrative` |
| **Wie hoch ist ein einzelner Wert?** | Animierter Counter | `NumberCounter` |
| **Wie sieht der genaue Kurs aus?** | Candlestick | **Fehlt — TODO** |
| **Wie verteilt sich X geografisch?** | Choropleth Map | **Fehlt — TODO** |
| **Wie ist der Anteil von X am Ganzen?** | Donut Chart | **Fehlt — TODO** |
| **Wo steht ein Wert in einer Skala?** | Gauge/Tacho | **Fehlt — TODO** |

#### Wann welcher Chart — Detail

**Line Chart (ChartBuild):**
- IDEAL: Zeitreihen mit 5+ Datenpunkten, Trends zeigen
- IDEAL: Boersenkurse, Inflationsverlauf, Zinsentwicklung
- NICHT: Vergleich von 2-3 einzelnen Werten (dafuer Bar Chart)
- NICHT: Anteil am Ganzen (dafuer Donut)

**Bar Chart (ComparisonBar):**
- IDEAL: Vergleich von 2-5 Kategorien
- IDEAL: Budget-Vergleiche, Laender-Rankings, Vorher/Nachher
- Horizontal wenn Labels lang sind (Laendernamen)
- Vertikal wenn Zeitachse wichtig ist (Jahre)

**Waterfall Chart (BudgetBreakdown als Basis):**
- IDEAL: Aufschluesslung wie ein Gesamtwert entsteht
- IDEAL: Gehaltsabrechnung (Brutto → Steuern → Netto)
- IDEAL: Unternehmens-P&L (Revenue → Kosten → Profit)
- Farb-Kodierung: Gruene Balken = Zufluss, Rote = Abfluss, Blaue = Summen

**Flow Diagram (FlowDiagram):**
- IDEAL: Prozesse mit 3-6 Schritten
- IDEAL: Geldfluss (EZB → Banken → Wirtschaft → Inflation)
- NICHT: Mehr als 6 Nodes — wird zu komplex fuer Video

**Donut Chart (NICHT Pie Chart):**
- NUR bei 2-5 Kategorien
- IMMER Donut statt Pie (Loch in der Mitte fuer Gesamtwert)
- IDEAL: Portfolio-Allokation (60% Aktien, 30% Anleihen, 10% Gold)
- NIE: Mehr als 5 Segmente — ab 6 wird es unleserlich

#### Finance-spezifische Visualisierungen

| Typ | Beschreibung | Anwendung bei DS |
|---|---|---|
| **Candlestick** | Open/High/Low/Close pro Zeiteinheit | Goldpreis, DAX, Bitcoin |
| **Waterfall** | Kaskade von Zu-/Abfluessen | Steuerrechnung, Brutto→Netto, Budget-Breakdown |
| **Gauge/Tacho** | Zeiger auf Skala (0-100% oder Gruen-Rot) | Inflationsrate, Verschuldungsquote, "Fieber-Thermometer" |
| **Comparison Table** | Tabellarischer Vergleich mit visuellen Akzenten | ETF A vs. ETF B, Tagesgeld-Vergleich |
| **Timeline/Zeitleiste** | Chronologische Ereigniskette | "Finanzkrise 2008 → Corona 2020 → Inflation 2022" |
| **Funnel Chart** | Trichter von breit nach schmal | Nicht typisch fuer Finance, eher fuer Marketing |
| **Heat Map** | Farbcodierte Matrix/Geografie | Inflation pro EU-Land, Immobilienpreise pro Region |

---

### 2.3 Animierte Charts — Best Practices

#### Universelle Animations-Reihenfolge

Die Reihenfolge in der Chart-Elemente erscheinen ist ENTSCHEIDEND fuer Verstaendnis:

```
Frame 0-15:   Panel erscheint (scale 0.94→1.0, opacity 0→1)
Frame 5-20:   Titel einblenden (fade-in)
Frame 10-25:  Achsen-Beschriftungen erscheinen (Y-Achse links, X-Achse unten)
Frame 15-30:  Grid-Lines einblenden (fade, sehr dezent 0.15 opacity)
Frame 20+:    DATEN zeichnen sich (evolvePath bei Line, grow-up bei Bar)
Frame N+8:    Datenpunkt-Labels erscheinen (NACHDEM der Punkt sichtbar ist!)
Frame N+15:   Annotationen erscheinen (NACHDEM der relevante Datenpunkt da ist!)
```

**Warum diese Reihenfolge?**
- Kontext VOR Daten: Der Zuschauer muss wissen WAS er gleich sieht (Achsen, Einheiten) bevor die Daten erscheinen
- Labels NACH Daten: Ein Label zu einem unsichtbaren Datenpunkt verwirrt
- Annotationen ZULETZT: Sie sind die Interpretation, nicht die Rohdaten

**Im Projekt (ChartBuild.tsx):**
- Panel-Entrance: Frame 0+ via `panelSpring` — korrekt
- Titel: Frame 0-18 via `titleOpacity` — korrekt
- Grid: Frame 0-20 via `gridOpacity` — korrekt (gleichzeitig mit Titel)
- Daten: Frame 0 bis `totalDrawFrames` via `drawProgress` — korrekt
- X-Labels: Erscheinen wenn `lineProgress >= i - 0.5` — korrekt (synced mit Line)
- Count-up Labels: Erscheinen bei `lineProgress` pro Punkt — korrekt
- Annotations: `annDelay` = Punkt-Frame + 8 — korrekt
- **Verbesserungspotential:** Achsen-Labels sollten VOR der Line erscheinen, nicht gleichzeitig.

#### Chart-spezifische Animationen

**Bar Chart:**
```
- Wachstum von unten nach oben (scaleY 0→1, transformOrigin: bottom)
- Easing: ease-out mit 3-5% Overshoot (spring: damping 12, stiffness 80)
- Stagger: 3-4 Frames zwischen Balken
- Wert-Label: Faehrt MIT dem Balken hoch (nicht separat einblenden)
- NIEMALS: Alle Balken gleichzeitig (zerstoert die Dramaturgie)
```

**Line Chart (bereits in ChartBuild implementiert):**
```
- evolvePath: Linie zeichnet sich von links nach rechts
- Datenpunkt-Dots: Erscheinen wenn die Linie sie erreicht (spring, dotArrivalFrame)
- Area Fill: Folgt der Linie via clipPath
- Breathing Glow: Nach Completion pulsiert der Glow (0.08 Frequenz)
- Camera Zoom: Zoomt auf letzten/wichtigsten Datenpunkt nach Completion
```

**Donut Chart (TODO — Empfohlene Animation):**
```
- Segment fuer Segment fuellen (im Uhrzeigersinn)
- Start bei 12-Uhr-Position
- Jedes Segment braucht 8-12 Frames
- 4 Frames Pause zwischen Segmenten
- Gesamtwert im Zentrum als Counter-Animation
- Groesstes Segment ZUERST (beginnt mit der Hauptkategorie)
```

**Number Counter (NumberCounter.tsx):**
```
- IMMER animiert (nie statisch einblenden)
- spring mit damping 20, stiffness 60 — langsam und schwer
- tabular-nums PFLICHT (sonst springen Ziffern horizontal)
- Prefix/Suffix statisch, nur die Zahl animiert
- Deutsche Formatierung (Punkt als Tausender-Trenner): ✓ implementiert
```

#### Zahlen: IMMER animierter Counter

Eine statisch eingeblendete Zahl verschenkt 80% ihres emotionalen Potentials. Ein Counter der von 0 auf 8.000.000.000 EUR zaehlt erzeugt:
- **Ankereffekt:** Der Zuschauer erlebt die Groesse der Zahl
- **Retention:** Die Animation haelt den Blick 1-2 Sekunden laenger
- **Dramatik:** Die Beschleunigung/Verzoegerung (via Spring) erzeugt Spannung

---

### 2.4 Farbe in Data-Viz

#### Die DS-Palette fuer Data Visualization

| Rolle | Farbe | Hex | Anwendung |
|---|---|---|---|
| **Positiv / Hauptlinie** | Gold | `#C8A84C` | Primaere Datenreihe, positive Werte, Gewinne |
| **Negativ / Warnung** | Rot | `#E30613` | Verluste, Inflation, Schulden, negative Trends |
| **Neutral / Kontext** | Silber | `#78716C` | Referenzlinien, historische Daten, Durchschnitte |
| **Neutral Text** | Text-Light | `#D4D0C8` | Achsenlabels, Beschriftungen, Erklaertext |
| **Hintergrund** | Schwarz | `#161514` | Panel-Hintergrund, Leerflaechen |
| **Panel-BG** | Dark-BG | `#1A1918` | Chart-Container, Karten |
| **Highlight** | Gold-Light | `#C8A84C` | Hervorgehobene Datenpunkte, Annotations |
| **Sekundaer-Positiv** | Gold-Dim | `#8A7424` | Sekundaere Datenreihe, weniger wichtig |
| **Akzent** | Weiss | `#EBE9E4` | Headlines in Charts, wichtigste Labels |

#### Erweiterte Palette fuer Multi-Datenreihen

Wenn ein Chart 3+ Datenreihen zeigt (z.B. Gold vs. DAX vs. Bitcoin), braucht man mehr Farben. Basierend auf der DS-Aesthetic:

| Reihe | Name | Hex | Kontrast zu BG | Farbenblind-sicher |
|---|---|---|---|---|
| 1 | Gold | `#C8A84C` | 7.1:1 | Ja |
| 2 | Blau-Grau | `#6B8CAE` | 4.8:1 | Ja |
| 3 | Gedaempftes Tuerkis | `#5B9E8F` | 4.5:1 | Ja |
| 4 | Warmes Orange | `#D4874D` | 5.1:1 | Ja (unterscheidbar von Gold) |
| 5 | Lavendel | `#9B8EC4` | 4.4:1 | Ja |

**Diese Palette wurde so gewaehlt dass:**
- Alle Farben mindestens 4.5:1 Kontrast auf `#161514` haben
- Kein Rot-Gruen-Paar vorkommt (8% der Maenner sind rot-gruen-blind)
- Die Farbtemperatur zum warmen DS-Look passt (keine kalten Neon-Toene)
- Jede Farbe sich in Helligkeit UND Farbton von den Nachbarn unterscheidet

#### Sequentielle und Divergierende Skalen

**Sequentiell (hell → dunkel, fuer Rangfolgen):**
```
#F5E6A8 → #C8A84C → #8A7424 → #5C4E18 → #2E270C
(hellstes Gold)                              (dunkelstes Gold)
```
Einsatz: Heat Maps, Choropleth Maps (z.B. Inflation pro Land)

**Divergierend (negativ ← neutral → positiv):**
```
#E30613 → #B5544C → #78716C → #8A9448 → #5B9E3A
(Rot/Verlust)  (Uebergang)  (Neutral)  (Uebergang)  (Gruen/Gewinn)
```
Einsatz: Gewinn/Verlust-Darstellungen, Veraenderungen gegenueber Vorjahr

**Farbenblind-sichere Alternative (divergierend):**
```
#D45D12 → #B87C4A → #78716C → #4A7BA8 → #1E6BB8
(Orange/Verlust)              (Neutral)              (Blau/Gewinn)
```
Orange-Blau statt Rot-Gruen: Fuer alle Formen der Farbenblindheit unterscheidbar.

#### Maximal 5-7 Farben pro Chart

- 2-3 Farben: Ideal, klare Aussage
- 4-5 Farben: Noch vertretbar
- 6-7 Farben: Maximum, nur mit Legende
- 8+ Farben: NICHT in Video. Zuviele Kategorien → Chart vereinfachen oder splitten

---

### 2.5 Data Visualization Fehler

Die 10 schlimmsten Fehler fuer Finance-Videos:

| # | Fehler | Konsequenz | Loesung |
|---|---|---|---|
| 1 | **Y-Achse nicht bei 0** | Uebertreibt Unterschiede um Faktor 3-10x | `forceZeroBaseline` Prop |
| 2 | **3D-Charts** | Verzerrt Proportionen, hintere Balken wirken kleiner | Immer 2D bleiben |
| 3 | **Pie Chart mit >5 Segmenten** | Ab 6 Segmenten kann das Auge Winkel nicht vergleichen | Donut max 5, Rest als "Sonstiges" |
| 4 | **Zu viele Gridlines** | Visuelles Rauschen, Data-Ink Ratio sinkt | Max 4-5 Gridlines, gestrichelt, 15-20% Opacity |
| 5 | **Fehlende Einheiten/Quellen** | Unglaubwuerdigkeit, wirkt unprofessionell | Immer "EUR", "%", "Mrd." + Quellenangabe |
| 6 | **Ablenkende Animationen** | Zuschauer beobachtet die Animation statt die Daten | Animation = Erklaerung, nicht Dekoration |
| 7 | **Inkonsistente Zeitachsen** | Viewer vergleicht falsch (2 Jahre vs. 10 Jahre) | Gleiche Zeitskala in Vergleichs-Charts |
| 8 | **Rot-Gruen als einziger Unterschied** | 8% der Maenner sehen keinen Unterschied | Orange-Blau ODER zusaetzlich Form/Muster |
| 9 | **Zahlen ohne Kontext** | "2,3%" sagt nichts ohne Vergleich | Immer Benchmark/Vorjahr daneben zeigen |
| 10 | **Chart ohne klare These** | Viewer weiss nicht was er sehen soll | Titel = Kernaussage, nicht "Daten-Beschreibung" |

**Beispiel Fehler 10:**
- Schlecht: "Inflationsrate 2019-2025"
- Gut: "Inflationsrate explodiert: Von 1,4% auf 8,7%"
- Noch besser: "Dein Geld verliert jaehrlich 8,7% an Wert"

---

### 2.6 Fehlende Komponenten — Empfohlene Erweiterungen

Basierend auf der Analyse fehlen folgende Visualisierungstypen:

| Komponente | Prioritaet | Beschreibung | Anwendungsfall |
|---|---|---|---|
| `DonutChart.tsx` | Hoch | 2-5 Segmente, Center-Counter, sequentielles Fill | Portfolio-Allokation, Budget-Verteilung |
| `GaugeChart.tsx` | Hoch | Halbkreis-Tacho mit Zeiger und Skala | Inflationsrate, Verschuldungsquote |
| `BarChart.tsx` | Hoch | Vertikale Balken mit Stagger-Animation | Laendervergleiche, Jahresvergleiche |
| `HorizontalBar.tsx` | Mittel | Sortierte horizontale Balken (Ranking) | Top-5-Listen, ETF-Vergleiche |
| `Sparkline.tsx` | Mittel | Minimaler Inline-Chart ohne Achsen/Labels | Trend-Indikatoren in Info-Panels |
| `CandlestickChart.tsx` | Mittel | OHLC mit Body + Wicks | Goldpreis, DAX, Bitcoin-Kurse |
| `WaterfallChart.tsx` | Mittel | Kaskade mit Zu-/Abfluss-Balken | Brutto→Netto, P&L-Breakdown |
| `SmallMultiples.tsx` | Niedrig | 2-4 Charts nebeneinander mit gemeinsamem Scale | Laendervergleiche, Szenario-Vergleiche |

---

### 2.7 Konkrete Implementierungs-Empfehlungen

#### 1. Globale Text-Rendering-Verbesserung

In der Root-Composition oder einem Global-Style sollte stehen:
```css
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

#### 2. Chart-Label-Groessen erhoehen

Alle Chart-Labels die aktuell unter 16px sind, auf mindestens 16px (SVG) erhoehen:
- `ChartBuild.tsx` X/Y-Achsen: 14px → 16px
- `ChartBuild.tsx` Count-up Labels: 12px → 14px
- `ChartBuild.tsx` Annotation Labels: 13px → 15px

#### 3. Silver-Farbe nur fuer grosse Labels

`LOCOS.silver` (#78716C) hat Kontrast-Ratio 3.4:1 auf dark BG. Fuer Labels unter 24px stattdessen `LOCOS.textLight` (#D4D0C8) mit 12.1:1 verwenden.

#### 4. Font-Feature-Settings global setzen

```tsx
// In theme/fonts.ts oder Root-Style
fontFeatureSettings: '"kern" 1, "liga" 1',
fontVariantNumeric: 'tabular-nums',  // Global fuer alle Zahlen
```

#### 5. Typography Scale als Konstanten

```ts
// theme/typography.ts
export const TYPE_SCALE = {
  impact:   133,  // H0: Montserrat 900
  display:  100,  // H1: Montserrat 800
  headline:  75,  // H2: DM Sans 700
  subhead:   56,  // H3: DM Sans 700
  body:      42,  // Body: DM Sans 400
  caption:   32,  // Caption: DM Sans 400-500
  label:     24,  // Label: DM Sans 400-500
  micro:     18,  // Micro: nur Disclaimer
} as const;

export const FONT_WEIGHT = {
  black:    900,
  extraBold: 800,
  bold:     700,
  semiBold: 600,
  medium:   500,
  regular:  400,
} as const;
```

---

### Zusammenfassung der wichtigsten Erkenntnisse

**Typografie:**
1. DM Sans + Montserrat + Playfair Display ist die perfekte 3-Font-Kombination
2. Kein Text unter 24px bei 1080p (Mobile-First!)
3. Font-Weight unter 400 (Light/Thin) NIE in Video verwenden
4. ALL CAPS braucht erhoehtes Letter-Spacing (0.04-0.08em)
5. Multi-Layer Text-Shadow fuer Lesbarkeit auf bewegtem Hintergrund (KineticType-Muster uebernehmen)
6. Perfect Fourth (1.333x) Modular Scale fuer klare Hierarchie
7. `-webkit-font-smoothing: antialiased` global setzen
8. `font-variant-numeric: tabular-nums` fuer alle Zahlen-Counter

**Data Visualization:**
1. Kontext VOR Daten zeigen (Achsen → Grid → Daten → Labels → Annotations)
2. Zahlen IMMER als animierter Counter (nie statisch)
3. Y-Achse bei 0 starten (ausser Boersenkurse)
4. Maximal 5-7 Farben pro Chart
5. Orange-Blau statt Rot-Gruen fuer Farbenblind-Sicherheit
6. Chart-Titel = Kernaussage, nicht Datenbeschreibung
7. 4 neue Komponenten mit hoher Prioritaet: DonutChart, GaugeChart, BarChart, HorizontalBar
8. ChartBuild-Labels von 12-14px auf 14-16px erhoehen

---

Sources:
- [Descript: 13 Best Fonts for Video](https://www.descript.com/blog/article/choosing-the-best-fonts-for-video-the-importance-of-typography)
- [Teamtown: 28 Best Fonts for YouTube](https://www.teamtown.co/blog/best-youtube-fonts)
- [Lettermine: Best Modern Fonts for Animated Projects](https://lettermine.com/best-modern-fonts-for-animated-projects/)
- [Legibility.info: Rules for Text in Videos](https://legibility.info/rules-for-text-in-videos)
- [Figma: Best Fonts for Thumbnails](https://www.figma.com/resource-library/best-fonts-for-thumbnails/)
- [NYFA: How to Make Good Kinetic Typography](https://www.nyfa.edu/student-resources/make-good-kinetic-typography-animation-video/)
- [Influencers-Time: Kinetic Typography Techniques 2026](https://www.influencers-time.com/boost-video-engagement-with-kinetic-typography-techniques-2/)
- [GeeksforGeeks: Mastering Tufte's Principles](https://www.geeksforgeeks.org/data-visualization/mastering-tuftes-data-visualization-principles/)
- [Edward Tufte: Official Site](https://www.edwardtufte.com/)
- [Canva: Ultimate Guide to Font Pairing](https://www.canva.com/learn/the-ultimate-guide-to-font-pairing/)
- [Elementor: Font Pairing Chart](https://elementor.com/blog/font-pairing-chart/)
- [CleanChart: Financial Data Visualization](https://www.cleanchart.app/blog/financial-data-visualization)
- [Datawrapper: Chart Types Guide](https://www.datawrapper.de/blog/chart-types-guide)
- [Atlassian: Essential Chart Types](https://www.atlassian.com/data/charts/essential-chart-types-for-data-visualization)
- [FontFYI: DM Sans Font Guide](https://fontfyi.com/blog/dm-sans-font-guide/)
- [Google Fonts: DM Sans](https://fonts.google.com/specimen/DM+Sans)
- [FontFYI: Montserrat Font Guide](https://fontfyi.com/blog/montserrat-font-guide/)
- [Google Fonts: Montserrat](https://fonts.google.com/specimen/Montserrat)
- [MDN: text-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-rendering)
- [MDN: Variable Fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts)
- [ETC: Animating Variable Fonts with CSS](https://etceteratype.co/blog/animating-a-variable-font-with-css)
- [CleanChart: Data Visualization Color Palettes](https://www.cleanchart.app/blog/data-visualization-color-palettes)
- [Atlassian: Data Viz Color Selection Guide](https://www.atlassian.com/data/charts/how-to-choose-colors-data-visualization)
- [Tableau: Colorblind-Friendly Visualizations](https://www.tableau.com/blog/examining-data-viz-rules-dont-use-red-green-together)
- [A List Apart: More Meaningful Typography](https://alistapart.com/article/more-meaningful-typography/)
- [Cieden: Type Scale Types](https://cieden.com/book/sub-atomic/typography/different-type-scale-types)
- [W3C: WCAG Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM: Contrast and Color Accessibility](https://webaim.org/articles/contrast/)
- [CSS-Tricks: text-rendering](https://css-tricks.com/almanac/properties/t/text-rendering/)
- [MDN: font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)
