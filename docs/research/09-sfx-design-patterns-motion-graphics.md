Jetzt habe ich genug Material gesammelt. Ich kompiliere alles in einen umfassenden Research Report.

---

# Sound Effect Design Patterns fuer Motion Graphics & Infografik-Animationen

## Vollstaendiger Research Report

---

## 1. SOUND-ZUORDNUNG: Welcher Sound fuer welche Animation?

Die folgende Tabelle zeigt fuer jede typische Motion-Graphics-Animation die empfohlenen 2-3 Sound-Layer. Die Angaben basieren auf Industrie-Standards aus professionellen Sound-Design-Libraries (Sonniss Infographic SFX, Epidemic Sound) und Best Practices von School of Motion, Krotos Audio und professionellen Post-Production-Haeusern.

### Text-Animationen

| Animation | Layer 1 (Bewegung) | Layer 2 (Impact/Landung) | Layer 3 (Sweetener) |
|---|---|---|---|
| **Text pop-in (spring)** | Kurzer Whoosh (50ms, hi-pass ab 2kHz) | Tight Pop/Snap (30-80ms, perkussiv, 1-4kHz) | Optional: Subtiler Sub-Thump (40-60Hz, 80ms) fuer Gewicht |
| **Text fade-in (smooth)** | Sanfter Swell/Pad-Anstieg (200-400ms, 500Hz-2kHz, leise) | Kein harter Impact -- stattdessen: leises Shimmer/Chime (3-6kHz, 150ms) | -- |
| **Text typewriter** | Keyboard-Click pro Buchstabe (10-30ms, 2-6kHz, mechanisch) | Leichter Carriage-Return-Sound am Zeilenende (50ms) | Optional: Subtiles Paper-Feed-Geraeusch als Bed |

### Daten-Visualisierungen

| Animation | Layer 1 (Bewegung) | Layer 2 (Impact/Landung) | Layer 3 (Sweetener) |
|---|---|---|---|
| **Bar Chart waechst** | Aufsteigender tonaler Sweep (300ms-1s, Pitch steigt von 200Hz auf 800Hz) | -- | Leises digitales Granular/Shimmer waehrend des Wachstums (2-5kHz, sehr leise) |
| **Bar Chart landet** | -- | Dumpfer Thud/Knock (60-120ms, 100-500Hz) | Micro-Click am exakten Stop-Frame (5ms, 3-8kHz) |
| **Line Chart zeichnet sich** | Kontinuierlicher, leiser Pencil-on-Paper / Digital Trace (500ms-2s, 1-4kHz, sehr subtil) | -- | Sanfter tonaler Anstieg passend zur Steigung der Linie |
| **Nummer zaehlt hoch** | Schnelle Tick-Sequenz (20-40ms pro Tick, 2-5kHz, Pitch steigt minimal) | -- | Leises digitales Rauschen/Processing-Sound als Bed (sehr leise, 5-10kHz) |
| **Nummer landet auf Endwert** | -- | Fester Impact/Lock-In (80-150ms, Schichtung: Sub 50Hz + Mid-Punch 400Hz + Click 4kHz) | Kurzer Reverb-Tail (300-500ms Decay, Plate) |
| **Progress Bar fuellt sich** | Sanfter tonaler Anstieg (Pitch proportional zum Fuellstand, 200-600Hz) | Completion-Ding/Chime wenn 100% erreicht (200ms, 1-3kHz, harmonisch) | -- |

### Panels & Cards

| Animation | Layer 1 (Bewegung) | Layer 2 (Impact/Landung) | Layer 3 (Sweetener) |
|---|---|---|---|
| **Panel/Card fliegt ein** | Whoosh (100-200ms, Bandpass 500Hz-4kHz, Pitch faellt = "kommt naeher") | Leichter Impact am Stopp-Punkt (50-80ms, 200-800Hz) | Optional: Luftdruck/Suction-Sound (sehr subtil) |
| **Panel/Card verschwindet** | Umgekehrter Whoosh (100-150ms, Pitch steigt = "entfernt sich") | -- | Leises "Poof"/Air-Release (50ms, hi-pass ab 3kHz) |
| **Fullscreen Takeover** | Breiter Sweep/Whoosh (200-400ms, volle Bandbreite) | Tiefer Impact/Boom (200-500ms, Sub 30-80Hz + Body 200-500Hz) | Kurzer Reverb-Tail (500ms-1s) fuer Dramatik |
| **Split-Screen oeffnet sich** | Mechanischer Slide-Sound (150-300ms, 500Hz-2kHz) | Leichter Click/Lock am Endpunkt (20ms, 3-6kHz) | -- |
| **Quote Card erscheint** | Sanfter Page-Turn oder Soft Whoosh (150ms, gedaempft) | Leises Paper-Settle (80ms, 1-3kHz, subtil) | -- |
| **Letterbox (Balken rein)** | Mechanischer Slide von oben/unten (200ms, gedaempft, 200-800Hz) | Sanfter Thud wenn Balken stoppen (40ms, 100-300Hz) | -- |

### Karten & Geografie

| Animation | Layer 1 (Bewegung) | Layer 2 (Impact/Landung) | Layer 3 (Sweetener) |
|---|---|---|---|
| **Karte/Map zoomt rein** | Tiefer Whoosh/Dive (300-500ms, Pitch faellt stark, 80-400Hz) | Leichter Sub-Pulse am Zielpunkt (100ms, 40-80Hz) | Atmosphaerischer Drone waehrend Zoom (sehr leise) |
| **Karte/Map pannt** | Breiter, weicher Sweep (300-800ms, 300Hz-2kHz, gleichmaessig) | -- | Wind-artiger Atmosphere-Layer (sehr subtil) |
| **Land/Region leuchtet auf** | Elektrischer Pulse/Glow-On (100-200ms, 1-4kHz, "sauber") | -- | Subtiler Sub-Bass-Pulse (60Hz, 80ms) fuer Gewicht |

### Icons, Grafiken & Akzente

| Animation | Layer 1 (Bewegung) | Layer 2 (Impact/Landung) | Layer 3 (Sweetener) |
|---|---|---|---|
| **Pfeil zeichnet sich** | Schneller Marker-auf-Whiteboard oder Laser-Trace (200-500ms, 2-6kHz) | Leichter Snap am Endpunkt (15ms, 4-8kHz) | -- |
| **Icon/Badge erscheint** | Kurzer Pop/Plop (50-100ms, 1-3kHz, weich perkussiv) | -- | Optional: Micro-Shimmer (5-8kHz, 100ms) |
| **Stempel/Stamp** | -- | Harter Impact/Thud (50-100ms, 200-800Hz, "Holz auf Papier") | Kurzer mechanischer Rattle-Tail (100ms, 2-5kHz) |
| **Warnung/Alert** | Alarm-Tone / Dissonanter Stab (200-400ms, 800Hz-2kHz, eckige Welle) | -- | Optional: Kurzer Riser davor (150ms) als Anticipation |
| **CTA/Abo Button** | -- | Sauberer Ding/Notification-Chime (200-300ms, 1-3kHz, harmonisch, positiv) | Subtiler Shimmer-Tail (150ms, 4-8kHz) |

### Kamera & Transitions

| Animation | Layer 1 (Bewegung) | Layer 2 (Impact/Landung) | Layer 3 (Sweetener) |
|---|---|---|---|
| **Zoom Cut (Kamera)** | Schnapper/Camera-Shutter-Click (30-60ms, 2-6kHz) ODER kurzer Whoosh (80ms) | -- | Optional: Subtiler Sub-Punch (40Hz, 50ms) bei hartem Jump-Cut |
| **Section Transition** | Breiter Sweep oder Reverse-Cymbal (300-600ms) | Leichter Impact am Schnitt-Punkt (80ms, 200-600Hz) | -- |

---

## 2. TIMING-REGELN

### Sound VOR, GLEICHZEITIG oder NACH der Animation?

**Grundregel:** Der Sound kommt **2-3 Frames VOR der visuellen Animation**. Das menschliche Gehirn verarbeitet akustische Reize ca. 20-50ms schneller als visuelle. Wenn Sound und Bild gleichzeitig starten, **fuehlt** es sich an, als kaeme der Sound zu spaet.

**Konkrete Frame-Offsets (bei 25fps / 30fps):**

| Animations-Typ | Sound-Offset | Begruendung |
|---|---|---|
| **Harter Impact** (Boom, Stamp, Nummer-Landung) | **2 Frames vor** dem visuellen Hit-Point | Anticipation -- das Ohr "bereitet" das Auge vor |
| **Whoosh** (Panel fliegt ein) | **Gleichzeitig** mit Bewegungsbeginn, PEAK des Whoosh liegt **am Impact-Frame** | Der Whoosh begleitet die Bewegung, sein Hoehepunkt trifft den Stopp |
| **Riser/Build** (vor grossem Moment) | **60-120 Frames (2-4s) vor** dem Ziel-Event starten | Emotionaler Aufbau braucht Zeit |
| **Pop/Click** (kleine Akzente) | **1 Frame vor** dem visuellen Event | Minimal, aber spuerbar |
| **Fade-In Sounds** (Chime, Shimmer) | **Gleichzeitig** mit visuellem Fade-Beginn | Paralleler Aufbau fuehlt sich natuerlich an |

### Dauer des SFX relativ zur Animation

| Regel | Beschreibung |
|---|---|
| **Impact/Hit:** Kuerzer als Animation | Die Transient (der "Schlag") dauert 5-30ms. Der Tail (Nachhall) kann 100-500ms laenger klingen, waehrend die Animation settled. |
| **Whoosh:** Gleiche Laenge wie Bewegung | Ein 200ms-Whoosh fuer eine 200ms-Slide-Animation. Peak = Mitte oder Ende der Bewegung. |
| **Riser:** Laenger als Animation | Startet 2-4 Sekunden vor dem visuellen Event, baut Spannung auf. |
| **Sweetener/Shimmer:** Laenger als Animation | Beginnt gleichzeitig, klingt 100-300ms nach dem visuellen Ende aus (verlaengert den Moment). |
| **Tick/Click-Sequenz:** Exakt synchron | Jeder Tick = exakt ein visueller Schritt (Buchstabe, Zahlenaenderung). |

### Was passiert bei falschem Timing?

| Problem | Auswirkung |
|---|---|
| **Sound zu frueh (>4 Frames)** | Wirkt "disconnected" -- Zuschauer sucht unbewusst nach der Ursache des Sounds, Animation kommt zu spaet |
| **Sound zu spaet (>2 Frames)** | Fuehlt sich "traege" und "amateurhaft" an -- wie ein schlecht synchronisierter Film |
| **Sound exakt auf Frame (0 Offset)** | Technisch korrekt, fuehlt sich aber minimal verzoegert an (wegen visueller Verarbeitungsdauer) |
| **Sweet Spot: 2-3 Frames vor** | Fuehlt sich "tight" und professionell an -- der Impact registriert gleichzeitig im Gehirn |

### Hit Point -- der exakte Frame

Der "Hit Point" ist der eine Frame, an dem Sound-Peak und visueller Hoehepunkt zusammentreffen muessen. In Motion Graphics ist das typischerweise:

- **Bei spring()-Animationen:** Der Frame, in dem das Element zum ERSTEN Mal die Endposition erreicht (vor dem Bounce-Back)
- **Bei ease-out-Animationen:** Der letzte Frame der Bewegung
- **Bei Zoom Cuts:** Der exakte Schnitt-Frame
- **Bei Stempeln/Stamps:** Der Frame des maximalen "Aufdrucks" (bevor Bounce)

---

## 3. SOUND DESIGN VOCABULARY

### Sweetener

Ein **Sweetener** ist ein zusaetzlicher, subtiler Sound-Layer, der einen bestehenden Sound "veredelt" oder "suesser" macht. Er wird UEBER einen primaeren Sound gelegt, um ihn voller, reicher oder detaillierter klingen zu lassen.

- **Beispiel:** Ein Impact-Hit klingt allein zu trocken. Ein Sweetener waere ein leises metallisches Shimmer (4-8kHz) oder ein subtiler Sub-Thump (40Hz), der dem Hit mehr Koerper gibt.
- **Lautstaerke:** -12dB bis -20dB unter dem Hauptsound -- soll nicht bewusst wahrgenommen werden, sondern den Gesamteindruck verbessern.
- **In Motion Graphics:** Glass-Clinks, Chimes oder Micro-Reverbs als Sweetener auf Text-Einblendungen.

### Stinger

Ein **Stinger** ist ein kurzer, musikalischer Akzent -- ein 1-5 Sekunden langer "Mini-Musikstueck", das einen dramatischen Moment unterstreicht. Anders als ein SFX-Hit hat ein Stinger eine **tonale/harmonische Qualitaet**.

- **Beispiel:** Orchestrale Brass-Stabs, ein einzelner Piano-Akkord, oder ein synthetischer Pad-Hit.
- **Verwendung:** Unter Headlines, bei Reveals, bei Plot-Twists. In Motion Graphics: wenn eine Schluesselbotschaft erscheint.
- **Unterschied zu SFX:** Ein Stinger hat eine musikalische Tonhoehe und harmonische Struktur. Ein SFX-Hit ist eher perkussiv/geraeuschbasiert.

### Bed

Ein **Bed** (auch "Sound Bed" oder "Music Bed") ist ein kontinuierlicher, leiser Klangteppich im Hintergrund. Er laeuft unter Sprache, SFX und anderen Elementen durch.

- **Beispiel:** Ambient Drone, leiser Pad, atmosphaerisches Rauschen, leise Filmmusik.
- **Lautstaerke:** 2-5% (bei Remotion: volume 0.02-0.05). Soll nicht aktiv gehoert werden, aber das Fehlen wuerde sofort auffallen ("Stille fuehlt sich leer an").
- **In Motion Graphics:** Suspense-Bed unter investigativen Segmenten, warmer Pad unter Loesungs-Segmenten.

### Hit vs. Impact vs. Boom

| Begriff | Frequenzbereich | Dauer | Charakter | Verwendung |
|---|---|---|---|---|
| **Hit** | Breitbandig (100Hz-8kHz) | 30-150ms | Perkussiv, "dry", definiert | Allgemeiner Oberbegriff fuer jeden kurzen, perkussiven Sound. Text-Einblendungen, Logo-Reveals. |
| **Impact** | Mittig-tief (60Hz-2kHz) | 100-500ms | Gewichtiger, koerperlicher als "Hit", oft mit Body | Speziell fuer "schwere" Momente: Zahlen die landen, Statements die einschlagen. Hat mehr Koerper und Nachhall als ein Hit. |
| **Boom** | Sehr tief (20Hz-200Hz) | 300ms-2s | Sub-Bass-dominant, viszeraler "Bauch-Sound" | Dramatische Hoehepunkte, Schock-Momente. Der Zuschauer soll den Sound physisch fuehlen. Sparsam einsetzen -- max. 3-5 pro Video. |

### Riser vs. Swell vs. Build

| Begriff | Verlauf | Dauer | Charakter | Verwendung |
|---|---|---|---|---|
| **Riser** | Pitch steigt von tief nach hoch, oft mit zunehmendem Volumen | 1-10s | Synthetisch, offensichtlich, "cinematisch" | Vor grossen Reveals, Transitions. Der Zuschauer weiss bewusst: "Jetzt kommt etwas." |
| **Swell** | Volumen steigt, Pitch bleibt relativ stabil | 2-8s | Orchestral/organisch, subtiler als Riser | Emotionaler Aufbau, "das Gefuehl wird groesser". Strings die anschwellen, Pad der lauter wird. |
| **Build** | Kombination: Tempo, Dichte, Volumen und ggf. Pitch steigen | 4-30s | Rhythmisch, oft mit zunehmender Percussion-Dichte | Laengerer Spannungsaufbau. In Motion Graphics: unter einer Sequenz von schnell aufeinanderfolgenden Datenpunkten. |

### Whoosh vs. Swoosh vs. Sweep

| Begriff | Geschwindigkeit | Charakter | Frequenz | Verwendung |
|---|---|---|---|---|
| **Whoosh** | Schnell (50-200ms) | Breit, luftig, "Wind-artig", atmosphaerisch | Breitbandig (200Hz-10kHz) | Schnelle Bewegungen: Panels einfliegen, Kamera-Moves, Transitions. Der Standard-Sound fuer "Objekt bewegt sich". |
| **Swoosh** | Sehr schnell (30-100ms) | Schaerfer, definierter, enger im Frequenzband | Hoehenlastig (1kHz-8kHz) | Noch schnellere/kleinere Bewegungen: Icon-Wipes, schnelle Text-Swipes. Fuehlt sich "schneidender" an als Whoosh. |
| **Sweep** | Langsam-mittel (200ms-2s) | Tonal, wie ein Filter der faehrt, gerichteter | Schmales Band, wandert durch Spektrum | Uebergaenge, Filter-Effekte, langsame Scene-Changes. Fuehlt sich "kontrollierter" und "eleganter" an als Whoosh. |

### Pop vs. Click vs. Tick

| Begriff | Dauer | Frequenz | Charakter | Verwendung |
|---|---|---|---|---|
| **Pop** | 30-80ms | 800Hz-3kHz, mit Sub-Anteil | Rund, weich-perkussiv, "ploppend" | Bullet-Points, Icon-Erscheinen, freundliche Akzente. Fuehlt sich "lebendig" und "spassig" an. |
| **Click** | 5-20ms | 2-8kHz, sehr scharf | Trocken, mechanisch, praezise | Maus-Clicks, Schalter, UI-Interaktionen, Szenen-Wechsel. Fuehlt sich "digital" und "praezise" an. |
| **Tick** | 3-10ms | 3-10kHz, sehr kurz und scharf | Minimal, repetitiv geeignet | Uhr-Ticks, Zaehler, Fortschrittsanzeigen, Typewriter pro Buchstabe. Fuer schnelle Wiederholungen geeignet. |

### Glitch vs. Static vs. Interference

| Begriff | Charakter | Frequenz | Verwendung |
|---|---|---|---|
| **Glitch** | Digital kaputt, "Fehler", rhythmisch/stotternd | Breitbandig, oft mit kurzen Stille-Luecken | Harte Cuts, Breaking News, System-Fehler, Tech-Themen. Der bewusst "kaputte" Sound. |
| **Static** | Kontinuierliches Rauschen, wie TV ohne Signal | Breitbandig, gleichmaessig (White/Pink Noise) | Retro-Effekte, "Signal verloren", Uebergaenge in/aus einem Segment. |
| **Interference** | Tonal stoerend, wie Radio-Stoerung, Piepen/Brummen | Schmale Frequenzbaender, dissonant | Bedrohliche Atmosphaere, "Kommunikation gestoert", dystopische Themen. |

### Ding vs. Chime vs. Bell

| Begriff | Tonalitaet | Dauer | Charakter | Verwendung |
|---|---|---|---|---|
| **Ding** | Einzelner, klarer Ton | 200-500ms | Sauber, positiv, "Notification" | CTA, Abo-Reminder, "Check!", Aufgabe erledigt. Der "iPhone-Notification"-Sound. |
| **Chime** | Mehrere harmonische Toene (Akkord) | 300ms-1s | Reicher als Ding, oft aufsteigend | Quote-Cards, positive Botschaften, "Loesung gefunden". Warm und angenehm. |
| **Bell** | Tiefer, mit langem Sustain und Obertonen | 500ms-3s | Metallisch, resonant, "kirchlich" | Dramatische Momente, Warnungen (Totenglocke), Zeitmarken. Gewichtiger als Ding/Chime. |

### Drone vs. Pad vs. Atmosphere

| Begriff | Zeitlich | Frequenz | Charakter | Verwendung |
|---|---|---|---|---|
| **Drone** | Kontinuierlich, statisch | Meist tief (30-300Hz), eine Tonhoehe | Dunkel, bedrohlich, unbeweglich | Spannung, Bedrohung, investigative Segmente. "Etwas stimmt nicht." |
| **Pad** | Kontinuierlich, kann sich aendern | Mittel (200Hz-2kHz), harmonisch | Weich, musikalisch, kann warm oder kalt sein | Emotionaler Untergrund: warmer Pad = Loesung, kalter Pad = Problem. |
| **Atmosphere** | Kontinuierlich, organisch | Breitbandig, komplex | Raeumlich, wie ein "Ort" (Wald, Stadt, Buero) | Kontextualisierung: "Wo sind wir?" Selten in Motion Graphics, eher in Film. |

---

## 4. FREQUENZ-LAYERING: Konkretes Beispiel

### Szenario: "850 TONNEN" erscheint mit spring()-Animation

Die Zahl faehrt von unten ein, overshooted leicht und settled auf der Endposition. Dauer der Animation: ca. 15 Frames (600ms bei 25fps).

#### Layer 1 -- Sub-Bass (30-80Hz)

| Eigenschaft | Wert |
|---|---|
| **Sound-Typ** | Sine-Wave Sub-Drop, kein 808 (zu musikalisch), kein Sub-Drop mit Pitch-Bend (zu dramatisch fuer Datenpunkt). Reiner, tiefer Sinus-Ton mit schnellem Attack. |
| **Frequenz** | 50Hz fundamental, leichter Rolloff unter 30Hz (unter 30Hz hoert man nicht, nur Membran-Bewegung) |
| **Volume relativ** | 15-20% des Gesamtsounds. Soll nicht bewusst gehoert werden, aber auf Kopfhoerern/Subwoofer fuehlt man das "Gewicht". |
| **Dauer** | 150-200ms. Attack: 2-5ms (sofort da). Schneller Decay -- kein langer Nachhall im Sub-Bereich (wuerde muddeln). |
| **Timing** | Startet exakt auf dem Hit-Frame (der Frame wo die Zahl zum ersten Mal die Endposition erreicht, VOR dem Bounce-Back). |
| **EQ** | Low-Pass bei 80Hz, steil (24dB/Oct). Kein Material ueber 80Hz von diesem Layer -- das ist Aufgabe von Layer 2. |

#### Layer 2 -- Body/Mid (200Hz-2kHz)

| Eigenschaft | Wert |
|---|---|
| **Sound-Typ** | Dumpfer Holz-Thud / Punch (wie ein Faust-auf-Tisch). Kein metallischer Sound (zu kalt fuer Finanzdaten). Organisch, gewichtig. Alternativ: Buch das auf Tisch faellt, Kiste die aufsetzt. |
| **Frequenz** | Fundamental bei 300-400Hz, Obertone bis 1.5kHz. |
| **Volume relativ** | 50-60% des Gesamtsounds. DAS ist der Sound den man bewusst hoert -- der "Koerper". |
| **Dauer** | 80-120ms. Schneller Attack (< 5ms), Medium Decay. Klingt "trocken" und "definiert". |
| **Timing** | Exakt gleichzeitig mit Layer 1 (Hit-Frame). Transient beider Layer muessen auf demselben Sample liegen. |
| **EQ** | Band-Pass: High-Pass bei 150Hz (damit kein Konflikt mit Layer 1), Low-Pass bei 2kHz (damit kein Konflikt mit Layer 3). |

#### Layer 3 -- Transient/High (2kHz-10kHz)

| Eigenschaft | Wert |
|---|---|
| **Sound-Typ** | Scharfer Click oder Snap. Wie ein Finger-Snap, Kugelschreiber-Click oder Glass-Tap. Klein, praezise, definiert. Gibt dem Gesamtsound "Artikulation" -- ohne diesen Layer wuerde alles dumpf und unscharf klingen. |
| **Frequenz** | Peak bei 4-6kHz, Praesenz bis 10kHz. |
| **Volume relativ** | 20-25% des Gesamtsounds. Laut genug um den Transient-Moment zu definieren, leise genug um nicht "schrill" zu wirken. |
| **Dauer** | 15-30ms. Extrem kurz -- reine Transient-Information, kein Sustain. |
| **Timing** | 0-1ms VOR Layer 1 und 2 (nicht hoerbar als Versatz, aber gibt dem Gesamtklang einen schaerferen Anfang). Die Transient "oeffnet" den Sound, Sub und Body folgen quasi sofort. |
| **EQ** | High-Pass bei 2kHz (steil). Kein Material unter 2kHz -- das ist Aufgabe von Layer 2. |

#### Layer 4 -- Reverb/Tail

| Eigenschaft | Wert |
|---|---|
| **Reverb-Typ** | Plate Reverb. NICHT Hall (zu gross und diffus fuer eine Zahl auf dem Screen). NICHT Room (zu realistisch/natuerlich). Plate ist synthetisch, glatt, "designed" -- passt zu Motion Graphics. |
| **Decay-Zeit** | 400-600ms. Lang genug um "Gewicht" und "Raum" zu suggerieren, kurz genug um nicht in die naechste Animation zu bluten. |
| **Wet/Dry Ratio** | 15-25% Wet. Der Reverb soll den trockenen Impact nur leicht "vergroessern", nicht in Hall ertrinken. |
| **Pre-Delay** | 10-20ms. Kleine Verzoegerung bevor Reverb einsetzt -- bewahrt die Schaerfe des Transients. |
| **EQ auf Reverb** | High-Pass bei 200Hz (kein Sub-Bass im Reverb -- wuerde muddy werden), Low-Pass bei 6kHz (kein scharfes Zischeln im Nachhall). |
| **Volume** | -8 bis -12dB unter dem Dry-Signal. |

#### Gesamt-Mix dieses einen Sounds

| Layer | Volume (relativ) | Dauer | Frequenzband |
|---|---|---|---|
| Sub-Bass | 15-20% | 150-200ms | 30-80Hz |
| Body/Mid | 50-60% | 80-120ms | 200Hz-2kHz |
| Transient | 20-25% | 15-30ms | 2kHz-10kHz |
| Reverb-Tail | 10-15% (vom Gesamt) | 400-600ms | 200Hz-6kHz |

**Gesamtdauer des zusammengesetzten Sounds:** Die Transient dauert ca. 120ms, der Reverb-Tail laesst den Sound ueber ca. 600ms ausklingen. Der Zuschauer nimmt einen einzelnen, gewichtigen "THUMP" wahr, der ca. 0.5 Sekunden nachklingt.

**Gesamtvolume in Remotion:** volume: 0.08-0.12 (bezogen auf den kombinierten Sound als einzelne .wav-Datei). Nicht lauter -- die Sprache von Daniel muss immer dominant sein.

---

## 5. EMOTIONALE SFX-FARBGEBUNG

### "Warme" Sounds

| Eigenschaft | Wert/Beschreibung |
|---|---|
| **Frequenz-Schwerpunkt** | Tiefe Mitten (200-500Hz) -- der Bereich wo menschliche Stimmen, Cello, Akustikgitarre leben |
| **Obertonstruktur** | Reich an geradzahligen Harmonischen (2., 4., 6.) -- das ist der Klang von Roehrenverstaerkern und analogen Geraeten |
| **Hoehen** | Sanfter Rolloff ab 4kHz -- nichts Scharfes, nichts Grelles |
| **Saturation** | Leichte analoge Saettigung (Tape-Warmth). 2-5% harmonische Verzerrung |
| **Attack** | Weich, nicht perkussiv. Sanftes Anschwellen statt harter Transient |
| **Reverb** | Laenger, diffuser (Room oder Hall). Suggeriert "Raum" und "Naehe" |
| **Typische Sounds** | Holz-Instrumente, Nylon-Gitarre, gedaempftes Piano, analoge Pads, Cello pizzicato |
| **Emotionale Zuordnung** | Vertrauen, Loesung, Gold, Sicherheit, "bei Daniel bist du richtig" |

### "Kalte" Sounds

| Eigenschaft | Wert/Beschreibung |
|---|---|
| **Frequenz-Schwerpunkt** | Hohe Mitten und Hoehen (2kHz-8kHz) -- metallisch, glatt, steril |
| **Obertonstruktur** | Ungeradzahlige Harmonische (3., 5., 7.) -- klingt synthetischer, "digitaler" |
| **Hoehen** | Praesent, scharf definiert, eventuell leicht harsch |
| **Saturation** | Keine oder digitale Distortion (Bit-Crushing, Aliasing) |
| **Attack** | Scharf, praezise. Harte Transients |
| **Reverb** | Kurz oder extrem lang (endloser Hall = "leerer Raum"). Kein mittlerer, gemuetlicher Reverb |
| **Typische Sounds** | Metall-Hits, Glass, digitale Synths, gefilterte White-Noise, Reverse-Sounds |
| **Emotionale Zuordnung** | System, Institution, EZB, Regulierung, "das kommt von aussen" |

### "Bedrohliche" Sounds

| Eigenschaft | Wert/Beschreibung |
|---|---|
| **Frequenz-Schwerpunkt** | Extreme: Entweder sehr tief (20-60Hz, Sub-Drone) oder sehr hoch (8-15kHz, Tinnitus-artig) -- die Mitte fehlt |
| **Dissonanz** | Intervalle wie kleine Sekunde, Tritonus. Kein harmonisches "Zuhause" |
| **Dynamik** | Langsame, unvorhersehbare Veraenderungen. Nie stabil -- immer leicht "morphend" |
| **Reverb** | Sehr lang, dunkel, diffus -- suggeriert "unbekannten, grossen Raum" |
| **Typische Sounds** | Sub-Drones, Reverse-Cymbal, dissonante Pad-Cluster, Metallisches Kratzen (gefiltert), "Heartbeat"-Pulse |
| **Emotionale Zuordnung** | Crash, Krise, Verlust, "dein Geld ist in Gefahr" |

### "Hoffnungsvolle" Sounds

| Eigenschaft | Wert/Beschreibung |
|---|---|
| **Frequenz-Schwerpunkt** | Obere Mitten (1-4kHz) -- klar, offen, "sonnig" |
| **Tonalitaet** | Dur-Akkorde, aufsteigende Melodie-Fragmente, reine Quinte |
| **Hoehen** | Praesent aber weich -- "Air" (8-12kHz) ohne Schaerfe |
| **Attack** | Mittel -- weder zu hart noch zu weich. Bestimmt aber nicht aggressiv |
| **Reverb** | Mittel, hell -- suggeriert "offenen Raum" (nicht dunkel/eingeengt) |
| **Typische Sounds** | Chimes, Glockenspiel, aufsteigende Arpeggios, Natur-Sounds (Voegel, Wasser), saubere Pads |
| **Emotionale Zuordnung** | Gold, Absicherung, Loesung, "so schuetzt du dich", CTA |

### Matching: Visuelle Farbpalette zu SFX

| Visuelle Farbe | SFX-Charakter | Konkretes Beispiel |
|---|---|---|
| **Gold/Amber** | Warm, reich, "analog" | Warmer Impact mit Holz-Body + Plate-Reverb. Sub-Bass bei 50Hz. |
| **Rot/Alarm** | Aggressiv, scharf, dissonant | Harter Impact mit metallischem Transient. Glitch-Element. Kurzer Riser. |
| **Blau/Corporate** | Kalt, clean, digital | Sauberer Click + kurzer synthetischer Chime. Wenig Sub-Bass, viel 2-6kHz. |
| **Gruen/Positiv** | Organisch, natuerlich, weich | Weicher Pop + Chime. Keine scharfen Transients. Warme Mitten. |
| **Schwarz/Dunkel** | Sub-Bass-dominant, Drone | Ultra-Low-Boom + langer Reverb-Tail. Wenig Hoehen. Bedrohlich. |
| **Weiss/Neutral** | Minimal, praezise, "sauber" | Einzelner Click oder Tick. Trocken, ohne Reverb. Extrem reduziert. |

---

## 6. SOUND DESIGN IN DER PRAXIS -- Workflow

### Reihenfolge des Mix-Aufbaus

Professionelle Sound-Designer folgen dieser Reihenfolge (in der Prioritaet absteigend):

**Schritt 1: Sprache (Dialog/Voiceover) -- IMMER ZUERST**
- Die Stimme von Daniel ist das wichtigste Element. Alles andere ordnet sich unter.
- Pegel: -16 bis -14 LUFS fuer die Sprache allein.
- EQ: Hoch-Pass bei 80Hz (Rumpeln entfernen), leichter Boost bei 2-4kHz (Praesenz/Klarheit).

**Schritt 2: Music Bed -- ALS ZWEITES**
- Musik auf 2-5% Lautstaerke setzen (volume: 0.02-0.05 in Remotion).
- Pruefen: Kann man Daniel bei laufender Musik problemlos verstehen? Wenn nein: leiser.
- Ducks einrichten: Musik geht bei Sprache automatisch 2-3dB leiser.

**Schritt 3: SFX auf Motion Graphics -- ALS DRITTES**
- Jetzt erst die SFX pro Animation platzieren.
- Immer im Kontext mit Sprache + Musik testen -- NICHT isoliert.
- SFX-Volume: 0.04-0.12 in Remotion (abhaengig vom Sound-Typ).
- Regel: Wenn ein SFX die Sprache auch nur minimal ueberdeckt, ist er zu laut.

**Schritt 4: Sweetener und Atmosphere -- ALS LETZTES**
- Die subtilsten Layer zum Schluss. Ambient-Pads, Reverb-Tails, Micro-Shimmer.
- Wenn man sie wegnimmt, soll es sich "leerer" anfuehlen. Wenn man sie hoert, ist es zu laut.

### Mix-Testing

| Test-Methode | Was man pruefen soll |
|---|---|
| **Handy-Lautsprecher** | PFLICHT-TEST #1. 80%+ der YouTube-Zuschauer hoeren auf dem Handy. Alles unter 100Hz wird auf Handy-Speakern nicht wiedergegeben. Wenn der Mix ohne Sub-Bass "leer" klingt, fehlt Mid-Range-Koerper. |
| **Laptop-Lautsprecher** | Aehnlich wie Handy, aber breiteres Stereo-Bild. Testen ob Stereo-Effekte (Pans, Delays) auf kleinen Speakern zusammenbrechen. |
| **Kopfhoerer** | Der ehrlichste Test. Hier hoert man jedes Detail -- auch Fehler. Sub-Bass wird hier gehoert. SFX-Timing-Fehler fallen hier am staerksten auf. |
| **Leise hoeren** | Bei 20-30% Lautstaerke hoeren. Ist die Sprache immer noch klar? Wenn nicht: SFX/Musik zu laut relativ zur Sprache. |

### Reference Track

Ein Reference Track ist ein fertiges Video eines anderen Creators oder Studios, dessen Sound-Mix man als Orientierung nutzt:

1. **Waehle 2-3 Videos** mit aehnlichem Format (Finanz-YouTube, Motion Graphics, Data-Visualisierung). Beispiele: Vox Explainers, ColdFusion, VisualPolitik.
2. **Analysiere** das Verhaeltnis: Wie laut ist die Sprache relativ zur Musik? Wie praesent sind SFX? Welche Arten von SFX werden verwendet?
3. **A/B-Vergleich:** Wechsle zwischen deinem Mix und der Referenz. Der Gesamteindruck sollte in einer aehnlichen "Lautstaerke-Welt" leben.
4. **NICHT kopieren** -- nur als Sanity-Check verwenden. Die Referenz zeigt dir ob du in der richtigen Ballpark bist.

### YouTube Loudness -- "Wie laut ist zu laut?"

| Regel | Wert |
|---|---|
| **YouTube-Ziel** | -14 LUFS Integrated (YouTube normalisiert auf diesen Wert) |
| **True Peak** | Maximal -1.0 dBTP (besser: -1.5 dBTP). Alles darueber wird geclippt oder verzerrt nach YouTubes Transcoding. |
| **Wenn zu laut hochgeladen** | YouTube dreht runter (Volume Normalization). Kein Clipping, aber der Zuschauer bekommt einen "gequetschten" Sound -- weniger Dynamik, weniger Punch. |
| **Wenn zu leise hochgeladen** | YouTube dreht NICHT hoch. Der Zuschauer muss manuell lauter drehen -- fuehrt zu Abspruengen. |
| **Empfehlung fuer DS-Videos** | Master auf -14 bis -16 LUFS. Sprache sollte bei -16 LUFS sitzen, Musik+SFX fuellen auf -14 LUFS auf. |
| **Tool zum Pruefen** | Youlean Loudness Meter (kostenlos) oder `ffmpeg -i video.mp4 -af loudnorm=print_format=summary -f null -` |

### Zusammenfassung: Der goldene Mix fuer Daniel Sauer Videos

| Element | Volume-Range (Remotion) | LUFS-Anteil | Anmerkung |
|---|---|---|---|
| **Sprache** | 1.0 (Master) | -16 LUFS | Immer dominant, nie verdeckt |
| **Music Bed** | 0.02-0.05 | -30 bis -26 LUFS | Fuellstoff, nie bewusst im Vordergrund |
| **SFX Impacts/Booms** | 0.08-0.12 | Kurze Peaks | Sparsam (max. 3-5 pro Minute) |
| **SFX Whoosh/Pop** | 0.04-0.07 | Kurze Peaks | Bei jedem Overlay-Wechsel ok |
| **SFX Riser** | 0.04-0.06 | Gradueller Anstieg | Vor grossen Momenten, max 4-6 pro Video |
| **Sweetener** | 0.02-0.04 | Kaum messbar | Optional, verfeinert den Gesamteindruck |

---

## Epidemic-Sound-Zuordnung fuer dein bestehendes Setup

Basierend auf der bereits vorhandenen `EpidemicSoundLibrary.ts`:

| Animation | Empfohlener ES_SFX | Volume | Duration (Frames) |
|---|---|---|---|
| Text pop-in | `ES_SFX.POP` | 0.06 | 25 |
| Text typewriter | `ES_SFX.KEYBOARD_CLICK` | 0.04 | pro Buchstabe |
| Bar chart landet | `ES_SFX.IMPACT_CINEMATIC` (leise) | 0.05 | 35 |
| Nummer landet | `ES_SFX.IMPACT_DEEP_HIT` | 0.08 | 45 |
| Panel fliegt ein | `ES_SFX.WHOOSH_DEEP` | 0.05 | 30 |
| Panel verschwindet | `ES_SFX.WHOOSH_SPACEY` (leise) | 0.03 | 25 |
| Fullscreen Takeover | `ES_SFX.BOOM_LOW` | 0.10 | 50 |
| Stempel/Stamp | `ES_SFX.IMPACT_CINEMATIC` | 0.10 | 40 |
| Warnung/Alert | `ES_SFX.GLITCH_HIT` | 0.07 | 25 |
| Zoom Cut | `ES_SFX.CAMERA_CLICK` | 0.04 | 20 |
| Section Transition | `ES_SFX.WHOOSH_DEEP` + `ES_SFX.POP` | 0.05 + 0.04 | 30 + 25 |
| CTA/Abo Button | `ES_SFX.GLASS_CLINK` oder `ES_SFX.POP` | 0.06 | 30 |
| Riser vor Reveal | `ES_SFX.RISER_SHARP` (kurz) oder `ES_SFX.RISER_LONG_TRAILER` (lang) | 0.05-0.06 | 30-250 |
| Hook Opening | `ES_SFX.BOOM_ULTRA_LOW` | 0.12 | 60 |
| Letterbox | `ES_SFX.WHOOSH_DEEP` (leise, gedaempft) | 0.03 | 20 |
| Quote Card | `ES_SFX.PAPER_RUSTLE` (leise) oder `ES_SFX.GLASS_CLINK` | 0.03 | 30 |

---

Sources:
- [School of Motion: Sound Design for Animation](https://www.schoolofmotion.com/blog/making-giants-sound-design)
- [MOWE Studio: Sound Design in Animation and Motion Graphics](https://mowe.studio/animation-sound-design-effects-music-motion-graphics/)
- [Krotos Audio: 6 Tips for Better Sound Design in Motion Graphics](https://www.krotosaudio.com/sound-effects-motion-graphics-tips/)
- [Pro Sound Effects: Sound Effects Terms Explained](https://blog.prosoundeffects.com/sound-effects-terms-explained-part-1)
- [Boom Box Post: Complete Glossary of Sound Effects](https://www.boomboxpost.com/blog/complete-glossary-of-sound-effects)
- [SoundGirls: Glossary of Sound Effects Part 2](https://soundgirls.org/glossary-of-sound-effects-part-2/)
- [Silverplatter Audio: Sound Designer's Glossary](https://silverplatteraudio.com/pages/glossary)
- [EDMtips: How to Layer Sounds Properly](https://edmtips.com/layering-sounds-properly/)
- [Unison Audio: Layering Sounds 101](https://unison.audio/layering-sounds/)
- [Palos Publishing: Animation Frame Timing and Synchronization](https://palospublishing.com/animation-frame-timing-and-synchronization/)
- [Pitch Drift: Audio Sync for Animation](https://pitchdrift-productions.com/audio-sync-for-animation/)
- [Think Branded Media: Perfecting Audio-Animation Sync](https://thinkbrandedmedia.com/blog/perfecting-the-audio-animation-sync-best-practices-for-high-quality-video-production/)
- [Pro Sound Effects: Sound Editing in Sync Tutorial](https://blog.prosoundeffects.com/sound-editing-in-sync-tutorial)
- [Sample Focus: Science Behind Sound and Frequency Emotion](https://blog.samplefocus.com/blog/the-science-behind-sound-how-frequency-affects-emotion-in-music/)
- [Sound & Design: Sound and Emotion](https://soundand.design/sound-emotion-b7d78223a9c8)
- [ClickyApps: Target LUFS for YouTube, TikTok, Spotify 2025](https://clickyapps.com/creator/video/guides/lufs-targets-2025)
- [Peak Studios: YouTube Audio Guidelines 2025](https://www.peak-studios.de/en/youtube-audio-richtlinien-streaming-2025/)
- [iZotope: Audio Post Production Workflow 101](https://www.izotope.com/en/learn/audio-post-production-workflow-101)
- [AI Audio Expert: Audio Quality Standards for YouTube 2025](https://aiaudioexpert.com/guides/audio-quality-standards-for-youtube-creators)
- [Boom Box Post: Step-by-Step Audio Post-Production Workflow](https://www.boomboxpost.com/blog/2022/4/26/step-by-step-audio-post-production-workflow)
- [Sonniss: Infographic SFX Library](https://sonniss.com/sound-effects/infographic-sfx/)
- [Pixflow: Cinematic Whoosh Sound Effects](https://pixflow.net/blog/cinematic-whoosh-sound-effects/)
- [Epidemic Sound: Whoosh Sound Effects](https://www.epidemicsound.com/sound-effects/categories/swooshes/whoosh/)
- [GUVI: Best Practices for Sound Design in Motion Graphics](https://www.guvi.in/blog/sound-design-in-motion-graphics/)