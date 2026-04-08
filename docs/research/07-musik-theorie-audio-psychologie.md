# 07 — Musik-Theorie & Audio-Psychologie fuer Video-Editing

> Deep Research, 04.04.2026
> Kontext: Daniel Sauer Finance-YouTube, Remotion Pipeline, Epidemic Sound

---

## 1. MUSIK-EMOTIONEN — Welche Sounds erzeugen welche Gefuehle?

### 1.1 Moll vs. Dur — Die Grundregel

| Eigenschaft | Dur (Major) | Moll (Minor) |
|---|---|---|
| Emotionale Valenz | Positiv, offen, hoffnungsvoll | Negativ, ernst, nachdenklich |
| Warum psychologisch? | Konsonanter, weniger Rauhigkeit | Dissonanter, komplexere Tonstruktur |
| Sprach-Analogie | Froehliche Stimmlage (hoeher als erwartet) | Traurige Stimmlage (tiefer als erwartet) |
| BPM-Interaktion | Schnell + Dur = Freude, Energie | Schnell + Moll = Dringlichkeit, Panik |
| | Langsam + Dur = Erhabenheit, Wuerde | Langsam + Moll = Trauer, Melancholie |

**Forschungsergebnis (Parncutt 2014):** Die Assoziation Dur=positiv / Moll=negativ ist psychologisch robust, aber ohne einzelne akzeptierte Erklaerung. Mehrere Faktoren: Moll-Dreiklang ist rauher, die Toene liegen tiefer als erwartet (wie traurige Sprache).

**BPM-Einfluss auf Emotion (PMC-Studie):** Erhoehung von 90 auf 120 BPM steigert "Amusement" um 16%, "Tension" um 15.9%, "Happiness" um 14.3%, "Surprise" um 11.9%.

### 1.2 Tonarten-Charakteristiken

| Tonart | Charakter | Anwendung bei Daniel |
|---|---|---|
| C-Dur | Simpel, hell, neutral | Erklaer-Passagen, Einstieg |
| C-Moll | Dunkel, ernst, schwer | Warnung, Systemkritik |
| D-Moll | Melancholisch, nachdenklich | Persoenliche Geschichten |
| E-Moll | Rastlos, sehnsuechtig | Investigativ, "etwas stimmt nicht" |
| F-Moll | Depressiv, funereal | Crash-Szenarien, Verlust |
| G-Dur | Heiter, laendlich, ehrlich | Loesung, Aufatmen |
| A-Moll | Zart, klagend | Betroffenheit, "die Leute leiden" |
| B-Dur | Froh, strahlend, optimistisch | CTA, Abschluss, Gold-Momente |

**Faustregel:** Mehr schwarze Tasten in der Tonart = intensivere negative Gefuehle (Forschung: C-Dur ohne schwarze Tasten = am positivsten wahrgenommen).

### 1.3 Instrument → Emotion Mapping

| Instrument | Psychologischer Effekt | Einsatz |
|---|---|---|
| **Piano (solo, leise)** | Intimitaet, Verletzlichkeit, Ehrlichkeit | Persoenliche Ansprache, "Das betrifft DICH", Reflexion |
| **Streicher (Legato)** | Tiefe Emotion, Sehnsucht, Dramatik | Emotional geladene Passagen, Enthuellung |
| **Streicher (Staccato/Tremolo)** | Spannung, Nervositaet, Eile | Countdown, "die Zeit laeuft ab" |
| **Synth-Pads (dunkel)** | Unruhe, Zukunftsangst, Sci-Fi-Gefuehl | "Was kommt auf uns zu?", dystopische Szenarien |
| **Synth-Pads (hell)** | Weite, Moeglichkeit, Hoffnung | Loesungsraum, "es gibt einen Ausweg" |
| **Pulsierender Bass** | Dringlichkeit, Countdown, Vorwaertsbewegung | Ticking Clock, "die Uhr laeuft", Investigativ |
| **Tiefe Frequenzen (<80 Hz)** | Bedrohung, Macht, physisches Unbehagen | Hook, Schock-Momente, Eilmeldung |
| **Hohe Frequenzen (>4 kHz)** | Hoffnung, Leichtigkeit, Klarheit | Loesung, Aufbruch, "jetzt wird's besser" |
| **Brass (Blechblaeser)** | Heroismus, Gefahr, Autoritaet | Warnung, "Das muss aufhoeren" |
| **Holzblaeser** | Unschuld, Naivitaet, Leichtigkeit | Ironie, "die Leute glauben immer noch..." |
| **Percussion (Toms/Taiko)** | Action, Dringlichkeit, Kraft | Punchlines, Impact-Momente |

### 1.4 Stille — Das unterschaetzte Instrument

**Neurowissenschaft:** Das Gehirn nutzt Pausen, um Erinnerungen zu konsolidieren und emotional zu taggen. Wenn ein Film ploetzlich Musik/Dialog entzieht, lehnt sich das Gehirn VOR — Aufmerksamkeit steigt massiv.

**Technik:** "Stille" im Film ist nie absolute Stille. Es sind bewusst ausgewaehlte Ambient-Layers: Atmen, entfernter Verkehr, elektrisches Brummen. Diese simulieren Stille, halten aber die Immersion aufrecht.

**Anwendung bei Daniel:**
- Nach einer schockierenden Aussage: 1.5-3s "Stille" (nur Room Tone)
- VOR dem CTA: kurze Stille nach dem letzten Argument laesst den Zuschauer "nacharbeiten"
- Kontrast: Stille nach lautem Moment wirkt 3-5x staerker als die Stille allein

### 1.5 Emotions-Matrix fuer Finance-Video (Daniel Sauer)

| Emotion | Musik-Typ | BPM | Tonart | Instrumente | Epidemic Sound Ref |
|---|---|---|---|---|---|
| **Hook/Aufmerksamkeit** | Dark Pulse, Sub-Bass Drop | 85-100 | C-Moll / E-Moll | Pulsierender Bass, Synth-Stabs, Impact | `ES_MUSIC.CONFIDENTIALITY` (85 BPM, Moll) |
| **Erklaerung/Kontext** | Minimal, luftig, neutral | 70-85 | C-Dur / G-Dur | Leises Piano, dezente Pads | Neuer Track suchen: "ambient minimal piano" |
| **Warnung/Gefahr** | Tension Build, Streicher-Tremolo | 90-110 | F-Moll / C-Moll | Tremolo-Streicher, dunkle Synths, Riser | `ES_MUSIC.PARTICLE_EMISSION` (73 BPM, Dark) |
| **Schock/Breaking News** | Hard Drop → Stille | 0→120 | A-Moll | Sub-Bass Drop, dann STILLE (1.5-3s), dann Impact | `ES_SFX.BOOM_ULTRA_LOW` → Stille |
| **Loesung/Hoffnung** | Emotional, aufsteigend | 80-95 | G-Dur / B-Dur | Piano + Streicher (legato), helle Pads | `ES_MUSIC.CURTAINS_FALL` (82 BPM, Epic) |
| **CTA/Abschluss** | Energisch, motivierend, aufloesung | 100-120 | D-Dur / B-Dur | Piano + Streicher + leichte Percussion | Riser → Resolve-Akkord |

---

## 2. BEAT-MATCHING — Schnitte auf den Beat

### 2.1 Was bedeutet "auf den Beat schneiden"?

Visuellen Schnitt (Cut, Transition, Text-Einblendung) exakt auf den musikalischen Beat platzieren. Das Gehirn erwartet auf dem Beat eine Veraenderung — wenn sie kommt, fuehlt sich der Edit "richtig" an, auch wenn der Zuschauer es nicht bewusst bemerkt.

### 2.2 Beat-zu-Frame-Formel

```
Frames pro Beat = (FPS x 60) / BPM
```

**Konkrete Beispiele fuer Daniel-Videos (25fps):**

| BPM | Frames/Beat | Sekunden/Beat | Frames/Takt (4/4) |
|---|---|---|---|
| 73 (Particle Emission) | 20.55 | 0.822s | 82.2 |
| 82 (Curtains Fall) | 18.29 | 0.732s | 73.2 |
| 85 (Confidentiality) | 17.65 | 0.706s | 70.6 |
| 90 (Tracker) | 16.67 | 0.667s | 66.7 |
| 100 | 15.00 | 0.600s | 60.0 |
| 120 | 12.50 | 0.500s | 50.0 |

**Bei 30fps (Reels):**

| BPM | Frames/Beat | Sekunden/Beat |
|---|---|---|
| 73 | 24.66 | 0.822s |
| 85 | 21.18 | 0.706s |
| 90 | 20.00 | 0.667s |
| 120 | 15.00 | 0.500s |

**Ideale BPM-FPS-Kombination:** Wenn BPM ganzzahlig in FPS aufgeht, landet JEDER Beat exakt auf einer Frame-Grenze. Beispiel: 90 BPM bei 30fps = exakt 20 Frames/Beat (perfekt). Bei 85 BPM und 25fps = 17.65 Frames → Beat liegt zwischen Frames (minimal Drift, in der Praxis nicht hoerbar).

### 2.3 Muss JEDER Cut auf dem Beat sein?

**Nein.** Regel fuer Daniel-Videos:

| Element | Auf den Beat? | Begruendung |
|---|---|---|
| Szenen-Wechsel / Section-Transition | JA (Downbeat/Beat 1) | Groesster visueller Wechsel = groesster musikalischer Moment |
| Fullscreen-Overlay Ein | JA (Beat oder halber Beat) | Synchro verstaerkt Impact |
| Fullscreen-Overlay Aus | NEIN (inhaltlich getimed) | Raus wenn Sprecher weiterredet |
| Zoom-Cut (Talking Head) | OPTIONAL (50/50 Mix) | Alle auf Beat = zu mechanisch, abwechseln |
| Text-Einblendung | JA (Beat oder Upbeat) | Text-Pop auf Beat fuehlt sich "knackig" an |
| SFX (Impact, Boom) | JA (exakt auf Beat) | SFX ausserhalb des Beats klingt "daneben" |
| B-Roll Start | JA (Beat 1 des Takts) | Visueller Szenenwechsel auf starkem Beat |

### 2.4 Downbeat vs. Upbeat

| Begriff | Position | Wirkung beim Schneiden |
|---|---|---|
| **Downbeat** (Beat 1) | Erster Schlag im Takt | Staerkster Moment, fuer grosse Schnitte/Reveals |
| **Beat 2, 3** | Mittlere Schlaege | Fuer mittlere Aktionen (Zoom, Overlay) |
| **Upbeat** (letztes Achtel vor Beat 1) | Kurz VOR dem Downbeat | Anticipation — Cut auf Upbeat = "Ueberraschung" auf Beat 1 |
| **Off-Beat** (zwischen Beats) | Synkopiert | Bewusste Irritation, Unruhe, experimentell |

### 2.5 Off-Beat Cutting — Wann bewusst einsetzen?

- Spannung/Unruhe erzeugen: Cuts absichtlich ZWISCHEN den Beats platzieren
- "Etwas stimmt nicht"-Gefuehl: Off-Beat Schnitte signalisieren Chaos, Kontrollverlust
- Kontrast: Nach einer Reihe von On-Beat Schnitten wirkt ein Off-Beat Cut wie ein Stolperer — perfekt fuer Schock-Momente
- **Faustregel:** Erst die Regeln beherrschen (On-Beat), dann bewusst brechen (Off-Beat). Ohne rhythmisches Grundgeruest wirkt Off-Beat nur schlampig.

### 2.6 Beat-Matching in Remotion — Implementierung

```typescript
// BPM → Frame-Positionen berechnen
function beatFrames(bpm: number, fps: number, startFrame: number, count: number): number[] {
  const framesPerBeat = (fps * 60) / bpm;
  return Array.from({ length: count }, (_, i) => 
    Math.round(startFrame + i * framesPerBeat)
  );
}

// Beispiel: 90 BPM, 25fps, ab Frame 0, 32 Beats
// → [0, 17, 33, 50, 67, 83, 100, ...]

// Downbeats (nur Beat 1 jedes Takts, 4/4):
function downbeatFrames(bpm: number, fps: number, startFrame: number, bars: number): number[] {
  const framesPerBar = (fps * 60 * 4) / bpm; // 4 Beats pro Takt
  return Array.from({ length: bars }, (_, i) => 
    Math.round(startFrame + i * framesPerBar)
  );
}
```

---

## 3. MUSIK-TRANSITIONS — Uebergaenge zwischen Tracks

### 3.1 Cross-Fade Dauer

| Kontext | Dauer | Begruendung |
|---|---|---|
| Innerhalb einer Szene (Mood-Shift) | 2-4s | Langsamer Uebergang, Zuschauer soll es kaum merken |
| Szenen-Wechsel (Section-Change) | 0.5-1.5s | Deutlicher Wechsel, darf hoerbar sein |
| Harter Mood-Bruch (Schock) | 0s (Hard Cut) | Kein Fade — Musik stoppt, neue Musik startet |
| Sehr kurze Luecke (Schnitt-Glaettung) | 3 Frames (~120ms) | Verhindert hoerbaren Klick an der Schnittstelle |

**Faustregel:** 0.5s reicht meistens fuer smooth. Laenger nur bei bewusstem, langsamem Stimmungswandel.

### 3.2 Stem-Mixing fuer Transitions

Wenn Epidemic Sound Stems (Drums, Bass, Melodie, Pads getrennt) liefert:

**Technik: Drum-Bridge**
1. Track A spielt (alle Stems)
2. Track A Melodie + Pads faden aus (2-3s)
3. Track A Drums laufen weiter (1-2 Takte)
4. Track B Melodie + Pads faden ein
5. Track A Drums faden aus, Track B Drums uebernehmen

**Vorteil:** Der Rhythmus bleibt konstant waehrend sich der Charakter aendert. Kein "Loch" im Mix.

**Technik: Element-Muting**
- Ein Element (zB Drums) 1 Takt VOR dem Wechsel stummschalten
- Signalisiert dem Zuschauer unbewusst: "Etwas aendert sich gleich"
- Neues Element im naechsten Takt einfuehren

### 3.3 J-Cut und L-Cut fuer Musik

| Typ | Was passiert | Anwendung |
|---|---|---|
| **J-Cut** (Audio-Vorlauf) | Audio des NEUEN Tracks startet 2-3s VOR dem visuellen Wechsel | "Vorbereitung" — Zuschauer spuert den kommenden Mood, bevor er ihn sieht |
| **L-Cut** (Audio-Nachlauf) | Audio des ALTEN Tracks laeuft 2-3s NACH dem visuellen Wechsel weiter | "Nachwirkung" — Emotionaler Nachklang der vorherigen Szene |

**Bei Daniel-Videos:**
- J-Cut fuer den Uebergang von Warnung → Loesung: Hoffnungsvolle Musik startet 2s bevor die visuelle Wende kommt
- L-Cut fuer den Uebergang von Erklaerung → Schock: Die ruhige Erklaer-Musik laeuft noch 1-2s nach dem visuellen Schock-Cut weiter, bevor sie abrupt stoppt

### 3.4 Key-Matching zwischen Tracks

| Situation | Key-Match noetig? | Warum |
|---|---|---|
| Tracks ueberblenden sich (Cross-Fade > 1s) | JA, stark empfohlen | Verschiedene Tonarten im Overlap klingen dissonant |
| Hard Cut (kein Overlap) | NEIN | Kein gleichzeitiges Klingen, neue Tonart startet frisch |
| Musik sehr leise (3%) | Eher NEIN | Bei 3% Volume hoert man Dissonanz kaum |
| Stem-Transition (Drums-Bridge) | NEIN fuer Drums | Drums haben keine Tonhoehe, Melodie-Stems muessen aber matchen |

**Sichere Tonart-Wechsel:**
- Gleiche Tonart (C-Moll → C-Moll): immer safe
- Relative Tonart (C-Moll → Eb-Dur): klingt natuerlich
- Quinte (C → G): klassischer Aufloesungs-Wechsel
- Halbton hoch (C → C#): erzeugt Dringlichkeit, "es eskaliert"

### 3.5 Energy-Matching

Track-Wechsel fuehlt sich "falsch" an wenn:
1. **BPM-Sprung zu gross:** Max 15-20 BPM Unterschied bei Cross-Fade. Groessere Spruenge nur bei Hard Cut.
2. **Instrumentierungs-Clash:** Track A = volle Band, Track B = Solo-Piano → Hard Cut, kein Cross-Fade
3. **Dynamic Level springt:** Track A bei -18 LUFS, Track B bei -10 LUFS → Volume-Anpassung VOR dem Fade
4. **Fehlende Uebergangs-Elemente:** Riser vor dem Wechsel, Cymbal Swell, oder Reverb-Tail von Track A ueberbrueckt die Luecke

---

## 4. DYNAMIK-AUTOMATION — Professionelles Musik-Ducking

### 4.1 Grundprinzip: Musik atmet mit dem Sprecher

```
Sprecher redet  → Musik leiser  (Duck auf ~3%)
Sprecher pausiert → Musik lauter (Swell auf ~5-8%)
Grosser Moment   → Musik am lautesten (Peak auf ~10-15%)
Stille-Moment    → Musik fast weg (→ 0.5-1%)
```

### 4.2 Automation-Kurven

| Kurven-Typ | Beschreibung | Anwendung |
|---|---|---|
| **Linear** | Gleichmaessiger Anstieg/Abfall | NICHT verwenden — klingt mechanisch, unnatuerlich |
| **Logarithmisch** | Schneller Start, langsames Ende | Ideal fuer Release (Musik kommt zurueck): erst schnell, dann sanft einpendeln |
| **Exponentiell** | Langsamer Start, schnelles Ende | Ideal fuer Attack (Musik geht runter): reagiert zunaechst sanft, dann entschieden |
| **S-Kurve** | Langsam-schnell-langsam | Bester Kompromiss fuer die meisten Faelle. Natuerlich, kein hoerbarer Knick |

**Empfehlung fuer Daniel-Videos: S-Kurve als Default**, logarithmisch fuer Release wenn Swell-Effekt gewuenscht.

### 4.3 Sidechain-Compression Settings fuer Sprache/Musik-Ducking

| Parameter | Wert | Begruendung |
|---|---|---|
| **Threshold** | -25 bis -20 dB | Muss auf Daniels Sprach-Pegel reagieren |
| **Ratio** | 4:1 bis 8:1 (subtil), inf:1 (aggressiv) | 4:1 fuer "atmendes" Ducking, inf:1 fuer "alles weg bei Sprache" |
| **Attack** | 5-15 ms | Schnell genug um sofort zu reagieren, langsam genug um nicht zu "clicken" |
| **Release** | 100-200 ms | 100ms = schnelles Zurueckkommen (energisch), 200ms = langsameres Zurueckkommen (smooth) |
| **Hold** | 50-100 ms | Verhindert Flattern bei Sprechpausen innerhalb eines Satzes |
| **Range/Depth** | -6 bis -12 dB | Wie TIEF die Musik gedrueckt wird. -6dB = dezent, -12dB = deutlich |

### 4.4 Pumping vermeiden

**Problem:** Sidechain reagiert auf jede Silbe einzeln → Musik "pumpt" hoch und runter im Rhythmus der Sprache.

**Loesungen:**
1. **Hold erhoehen** auf 100-200ms: Compressor haelt den reduzierten Pegel, reagiert nicht auf kurze Pausen zwischen Woertern
2. **Attack langsamer** (10-20ms): Laesst kurze Konsonanten durch, reagiert nur auf laengere Sprach-Passagen
3. **Release langsamer** (150-250ms): Musik kommt langsamer zurueck, kein schnelles Pumpen
4. **Sidechain-EQ:** Nur 200Hz-4kHz der Stimme als Trigger nutzen (nicht den vollen Frequenzbereich). Atemgeraeusche, Plosive und Zischlaute triggern dann nicht
5. **Envelope Follower** statt Compressor: Glattere Reaktion auf durchschnittlichen Pegel statt auf Peaks

### 4.5 Automation in Remotion — Implementierungsansatz

```typescript
// Manuelle Automation (aktueller Ansatz bei DS-Videos)
// In SoundDesign-Komponente: MusicBed hat swells[] und ducks[]
const musicBed: MusicBedProps = {
  src: ES_MUSIC.TRACKER,
  baseVolume: 0.03,  // 3% Basis
  swells: [
    { frame: 450, volume: 0.08, duration: 60 },   // Pause → Musik-Swell
    { frame: 1200, volume: 0.12, duration: 90 },   // Grosser Moment
  ],
  ducks: [
    { frame: 0, volume: 0.015, duration: 9999 },   // Default: halb-geduckt
    // Explizite Ducks in Sprechpausen aufheben (swells ueberschreiben)
  ],
};

// Idealer Ansatz: Automatisch aus Whisper-Timestamps
// 1. Whisper gibt Wort-Timestamps → Sprechpausen identifizieren
// 2. Pausen > 0.8s → Swell einfuegen
// 3. Pausen > 2.0s → Grosser Swell
// 4. Sprechbloecke → Duck auf baseVolume
```

---

## 5. FREQUENZ-MANAGEMENT — Sprache, Musik, SFX im Mix

### 5.1 Sprach-Frequenzen (Maennliche Stimme wie Daniel)

| Frequenzband | Bereich | Funktion | Anteil Energie | Anteil Verstaendlichkeit |
|---|---|---|---|---|
| **Sub/Chest** | 80-150 Hz | Fundamentale, Brustton, "Waerme" | ~60% | ~5% |
| **Body** | 150-500 Hz | Koerper der Stimme, Fuelle | ~25% | ~10% |
| **Klarheit** | 500 Hz - 2 kHz | Vokale, Konsonant-Uebergaenge | ~10% | ~25% |
| **Praesenz** | 2-4 kHz | Konsonanten, Zischlaute, Verstaendlichkeit | ~3% | ~35% |
| **Brillanz** | 4-8 kHz | "Air", Klarheit, Raum | ~2% | ~25% |

**Kernfrequenz maennliche Stimme:** Fundamentale 85-180 Hz, kritischstes Band fuer Verstaendlichkeit: 2-4 kHz.

**Wichtigste Erkenntnis:** 1-8 kHz liefert nur 5% der Leistung, aber 60% der Verstaendlichkeit. Diese Frequenzen muessen IMMER frei sein.

### 5.2 Frequency Masking — Das Problem

Wenn Musik und Sprache im gleichen Frequenzbereich liegen, ueberdeckt das lautere Signal das leisere. Ergebnis: Sprache klingt "dumpf" oder "vergraben", obwohl die Lautstaerke stimmt.

**Haupt-Problemzone:** 200-500 Hz ("Muddy Zone"). Hier haben sowohl Daniels Stimm-Body als auch die meisten Instrumente (Piano, Gitarre, Synth-Pads) viel Energie.

### 5.3 EQ-Strategien fuer den Musik-Track

| Frequenzband | Aktion auf Musik | Begruendung |
|---|---|---|
| < 80 Hz | Belassen / leicht boosten | Sub-Bass kollidiert nicht mit Sprache, gibt Fundament |
| 80-250 Hz | -3 bis -6 dB Cut | Platz schaffen fuer Daniels Brustton |
| 250-500 Hz | -4 bis -8 dB Cut | "Mud"-Zone raeumen |
| 500 Hz - 2 kHz | -6 bis -10 dB Cut | Hauptkollision mit Sprach-Klarheit vermeiden |
| 2-4 kHz | -8 bis -12 dB Cut (WICHTIGSTER CUT) | Praesenz-Band der Sprache — hier MUSS Musik weg |
| 4-8 kHz | -3 bis -6 dB Cut | Sprach-Brillanz, weniger aggressiv |
| > 8 kHz | Belassen / leicht boosten | "Air" der Musik, kollidiert kaum mit Sprache |

### 5.4 Multiband-Sidechain — Intelligentes Ducking

**Statt die GESAMTE Musik zu ducken, nur die Sprach-Frequenzen:**

```
Standard-Sidechain: Gesamte Musik -8dB wenn Daniel spricht
→ Problem: Bass und Hi-Hats verschwinden unnoetig

Multiband-Sidechain: 
  Band 1 (< 200 Hz):   -0 dB (Bass bleibt!)
  Band 2 (200-800 Hz):  -4 dB (Body leicht geduckt)
  Band 3 (800-4000 Hz): -10 dB (Klarheitsband stark geduckt)
  Band 4 (> 4000 Hz):   -2 dB (Air kaum geduckt)
→ Ergebnis: Musik klingt "voll" aber Sprache sitzt klar darueber
```

**Spectral Ducking (Premium):** Tools wie Sonible smart:comp analysieren das Frequenz-Spektrum der Stimme und ducken nur GENAU die ueberlappenden Frequenzen. Ergebnis: minimaler Hoerverlust der Musik bei maximaler Sprach-Klarheit.

### 5.5 Frequenz-Aufteilung: Sprache vs. Musik vs. SFX

```
Frequenz-Spektrum eines Daniel-Sauer-Videos:
                                                        
20 Hz          100 Hz         1 kHz          10 kHz      20 kHz
|──────────────|──────────────|──────────────|───────────|
|  SUB-BASS    |    BASS      |    MITTEN    |   HOEHEN  |
|              |              |              |           |
|  ■■■■■■■■   |  ■■■■■■■■   |  ■■■■        |  ■■■      |  ← MUSIK
|              |  ████████   |  ████████████|  ████     |  ← SPRACHE (Daniel)
|  ▓▓▓▓       |  ▓▓▓▓▓▓     |     ▓▓▓▓▓▓  |  ▓▓▓▓▓   |  ← SFX
|              |              |              |           |
|  Boom, Sub   |  Daniel Body |  Daniel KLAR |  Air, Zisch|
|  Impact      |  Musik Body  |  KOLLISION!  |  Cymbals  |
```

**Prioritaet bei Kollision:** IMMER Sprache > SFX > Musik

### 5.6 YouTube-spezifisch: LUFS und Wiedergabe

| Parameter | Wert | Konsequenz |
|---|---|---|
| YouTube Normalisierung | -14 LUFS integriert | Lauter → wird leiser gedreht, leiser → wird lauter gedreht |
| Empfohlener Target | -13 bis -15 LUFS | Etwas Headroom lassen |
| Peak Maximum | -1 dBTP (True Peak) | Nie 0 dB erreichen (Clipping) |
| Dynamik-Range | 8-12 dB empfohlen | YouTube bestraft Uebercompression NICHT mehr, aber natuerliche Dynamik klingt besser |
| Handy-Lautsprecher | Kein Bass < 200 Hz | Mix MUSS auf Handy funktionieren: Test-Pflicht! |
| Kopfhoerer-Mix | Volle Bandbreite | Stereo-Effekte und Sub-Bass nur hier hoerbar |

**Praxis-Konsequenz:** NICHT fuer eine Wiedergabe-Art mixen. Mid-Range-Klarheit (1-4 kHz) ist auf ALLEN Geraeten hoerbar — dort muss die Information sitzen. Sub-Bass und Stereo-Effekte sind Bonus fuer Kopfhoerer.

---

## 6. AUDIO-PSYCHOLOGIE — Wie das Gehirn Sound verarbeitet

### 6.1 Cocktail-Party-Effekt

**Definition:** Die Faehigkeit des Gehirns, eine einzelne Stimme in einer lauten Umgebung herauszufiltern. Funktioniert primaer binaural (zwei Ohren → Richtungserkennung).

**Anwendung im Video-Edit:**
- Daniels Stimme MUSS die dominante "Quelle" sein — klar lokalisierbar (Mono/Center)
- Musik breiter im Stereo-Feld → Gehirn trennt leichter
- Neue Sound-Elemente ziehen Aufmerksamkeit auf sich → strategisch einsetzen (SFX auf Punchlines)
- Ploetzliche Veraenderungen (Stille, neues Element) brechen den "Filter" → Zuschauer wird "wachgeruettelt"

### 6.2 Warum YouTube-Audio anders klingt als Kino

| Faktor | Kino | YouTube |
|---|---|---|
| Wiedergabe | Kalibrierte Lautsprecher, Subwoofer | Handy-Speaker, Laptop, Kopfhoerer (Mix) |
| Dynamic Range | 20+ dB | 8-12 dB (komprimierter wg. verschiedener Geraete) |
| Low End | Voll (20-200 Hz) | Abgeschnitten bei ~200 Hz (Handy) |
| Abhoerentfernung | 3-15m | 0.3-1m (nah) |
| Aufmerksamkeit | Dediziert, dunkler Raum | Geteilt, ablenkende Umgebung |

**Konsequenz:** YouTube-Audio muss "lauter erzaehlen" als Kino-Audio. Klarheit vor Subtilitaet. Dynamik ja, aber nicht so extrem wie im Kino.

### 6.3 Warum manche Videos "leer" klingen

**Ursache:** Fehlende Frequenzbaender. Wenn ein Video NUR Sprache + leise Musik hat, fehlen:
- Sub-Bass (20-80 Hz): physisches "Gewicht", Gravitas
- Upper Mids (2-6 kHz): "Praesenz", Gefuehl von Naehe
- High-End "Air" (8-16 kHz): "Offenheit", Raum-Gefuehl

**Loesung:** Dezente SFX und Room Tone fuellen die Luecken:
- Room Tone / leichtes Rauschen → fuellt 200-2000 Hz
- Dezenter Sub-Bass-Layer → fuellt 30-80 Hz
- SFX-Akzente (Whoosh, Click, Impact) → fuellen kurzzeitig alle Baender
- Reverb auf Sprache → fuellt High-End

### 6.4 Waerme erzeugen

**Was ist "Waerme"?** Psychoakustisch das Gegenteil von "digital/steril". Assoziiert mit Analogem, Menschlichem.

**Technische Ursachen:**
- **Gerade (even) Harmonische:** Tube/Roehren-Saettigung erzeugt primaer gerade Harmonische (2f, 4f, 6f). Klingt "musikalisch warm, smooth, bright ohne Aggression"
- **Ungerade (odd) Harmonische:** Band-Saettigung erzeugt beide, primaer ungerade Harmonische (3f, 5f, 7f). Klingt "voller, koerperlicher"
- **Tape Saturation:** Kombiniert milde Verzerrung mit natuerlicher Kompression. Glaettet Transienten, fuegt Both even+odd Harmonische hinzu → "reichhaltiger, ausbalancierter Ton"
- **Low-End Bump:** Tape gibt dezenten Boost bei 60-120 Hz und daempft High-End leicht (>10 kHz)

**Anwendung bei Daniel-Videos:**
- Leichte Tape Saturation auf dem Master → Video fuehlt sich "wie professionelles TV" an
- Tube Saturation auf Daniels Stimme → waermer, menschlicher, vertrauenswuerdiger
- NICHT uebertreiben: 1-3% Wet, subtil. Hoerbar nur im A/B-Vergleich

### 6.5 Weite/Raum erzeugen

| Technik | Was es tut | Wann einsetzen |
|---|---|---|
| **Stereo-Imaging** | Breiteres Stereo-Feld, Mono → Stereo | Musik-Track breiter machen, Sprache in Mono lassen |
| **Haas-Effekt** | Ein Kanal 1-30ms verzoegert → Schallquelle erscheint breiter | Dezent auf Musik-Pads fuer "Raum"-Gefuehl |
| **Reverb** | Simuliert Raum-Reflexionen | Kurz (0.3-0.8s): naher Raum. Lang (1.5-3s): grosser Raum, Halle |
| **Delay** | Einzelne Wiederholungen | Stereo-Delay (leicht versetzt L/R) fuer Tiefe |

### 6.6 Pre-Delay auf Reverb — Warum und wie viel

**Was Pre-Delay tut:** Verzoegert den Start des Reverb-Halls um X Millisekunden nach dem Dry-Signal. Der urspruengliche Sound (zB Daniels Stimme) kommt ZUERST klar durch, DANN folgt der Hall.

**Ohne Pre-Delay:** Reverb startet sofort mit dem Dry-Signal → Stimme klingt "matschig", "in einem Eimer"
**Mit Pre-Delay:** Dry-Signal bleibt klar und praesent, Reverb ergaenzt danach → Stimme "steht VOR dem Raum"

| Raum-Groesse | Pre-Delay | Decay | Anwendung |
|---|---|---|---|
| Kleiner Raum | 0-10 ms | 0.3-0.8s | Intimate, nah, Podcast-Feeling |
| Mittlerer Raum | 10-30 ms | 0.8-1.5s | Standard fuer YouTube, "professionell" |
| Grosser Raum / Halle | 30-80 ms | 1.5-3.0s | Epische Momente, grosser Reveal |
| Kirche / Cathedral | 80-120 ms | 3.0-6.0s | Dramatik, "das ist historisch" |

**Fuer Daniel-Videos empfohlen:**
- Standard: **20-40ms Pre-Delay**, 0.8-1.2s Decay → professionell, klar, nicht ueberladen
- Epische Momente (Conclusion, CTA): **50-70ms Pre-Delay**, 1.5-2.0s Decay → groesser, "wichtig"
- Warnung: Pre-Delay > 80ms bei normalem Sprechen klingt unnatuerlich (hoerbare Luecke)

### 6.7 LUFS-Referenzwerte fuer Daniel-Videos

| Element | Pegel (relativ zum Master) | LUFS-Zielbereich |
|---|---|---|
| Sprache (Daniel) | 0 dB (Referenz) | -16 bis -14 LUFS |
| Musik (unter Sprache) | -18 bis -24 dB | -34 bis -38 LUFS |
| Musik (in Pausen/Swells) | -12 bis -15 dB | -28 bis -31 LUFS |
| SFX (Impact, Boom) | -12 bis -18 dB | -28 bis -34 LUFS |
| SFX (dezent: Click, Pop) | -20 bis -26 dB | -36 bis -42 LUFS |
| Room Tone / Ambience | -30 bis -36 dB | -46 bis -52 LUFS |
| Master (gesamt) | — | -14 LUFS (YouTube Target) |

---

## QUICK-REFERENCE: Entscheidungsbaum fuer Sound Design

```
SZENE IDENTIFIZIEREN
│
├── Hook (erste 3-5s)
│   ├── Musik: Dark Pulse, C-Moll, 85-100 BPM
│   ├── SFX: BOOM_ULTRA_LOW oder IMPACT_DEEP_HIT
│   ├── Dynamik: Laut starten (8-10%), sofort ducken
│   └── Cut: Auf Downbeat
│
├── Erklaerung (Kontext)
│   ├── Musik: Minimal Piano/Pad, Dur, 70-85 BPM
│   ├── SFX: Keine (oder dezenter Click bei Grafik)
│   ├── Dynamik: Konstant leise (2-3%), Swells in Pausen
│   └── Cut: Mix aus Beat und inhaltlich
│
├── Warnung (Gefahr)
│   ├── Musik: Tension Build, Moll, 90-110 BPM
│   ├── SFX: RISER vor Schock, GLITCH bei Einblendungen
│   ├── Dynamik: Langsam lauter werden (3% → 8%)
│   └── Cut: Schneller werden, Beat-matched
│
├── Schock (Breaking News)
│   ├── Musik: STOP → 1.5-3s STILLE → dann neuer Track
│   ├── SFX: BOOM_ULTRA_LOW im Moment des Schocks
│   ├── Dynamik: Maximum → Null → Langsam zurueck
│   └── Cut: Hard Cut, KEIN Cross-Fade
│
├── Loesung (Hoffnung)
│   ├── Musik: Emotional, Dur, Piano + Streicher, 80-95 BPM
│   ├── SFX: Dezent (Glass Clink bei Zahlen)
│   ├── Dynamik: Langsam aufbauen (3% → 6%), warm
│   └── Cut: Auf Beat, entspannter Rhythmus
│
└── CTA (Abschluss)
    ├── Musik: Energisch, aufloesend, 100-120 BPM
    ├── SFX: RISER_TRAILER 3-5s vor CTA, dann Resolve
    ├── Dynamik: Riser-Effekt (leise → laut), dann sauberer Schluss
    └── Cut: Auf Downbeat, klarer Abschluss
```

---

## FORMELN & REFERENZTABELLE

### Beat-Berechnung
```
Frames pro Beat     = (FPS × 60) / BPM
Frames pro Takt     = (FPS × 60 × Beats_pro_Takt) / BPM
Sekunden pro Beat   = 60 / BPM
ms pro Beat         = 60000 / BPM
```

### EQ Quick-Reference (Musik-Track unter Sprache)
```
< 80 Hz:     KEEP    (Sub-Bass, kein Conflict)
80-250 Hz:   CUT -4dB (Platz fuer Stimm-Body)
250-500 Hz:  CUT -6dB (Mud-Zone)
500-2000 Hz: CUT -8dB (Stimm-Klarheit)
2-4 kHz:     CUT -10dB (KRITISCH: Praesenz)
4-8 kHz:     CUT -4dB (Air/Brillanz)
> 8 kHz:     KEEP    (Musik-Air, kein Conflict)
```

### Sidechain Quick-Settings
```
Subtil (atmendes Ducking):   Attack 10-15ms, Release 150-200ms, Ratio 4:1, Depth -6dB
Standard (klares Ducking):   Attack 5-10ms,  Release 100-150ms, Ratio 6:1, Depth -9dB  
Aggressiv (Podcast-Style):   Attack 2-5ms,   Release 80-120ms,  Ratio inf:1, Depth -12dB
```

### Pre-Delay Referenz
```
Intimate/Nah:     0-10ms Pre-Delay,  0.3-0.8s Decay
YouTube Standard:  20-40ms Pre-Delay, 0.8-1.2s Decay
Episch/Gross:     50-70ms Pre-Delay, 1.5-2.0s Decay
Warnung:          >80ms klingt unnatuerlich bei Sprache
```

### LUFS Targets
```
YouTube Master:     -14 LUFS (integriert)
Sprache (Daniel):   -16 bis -14 LUFS
Musik (geduckt):    -34 bis -38 LUFS
Musik (Swell):      -28 bis -31 LUFS
SFX (Impact):       -28 bis -34 LUFS
Peak Maximum:       -1 dBTP (True Peak)
```

---

## Quellen

- Parncutt 2014: Emotional connotations of major vs minor tonality (SAGE Journals)
- PMC 4971092: Influence of Tempo and Rhythmic Unit in Musical Emotion Regulation
- DPA Microphones: Facts about Speech Intelligibility
- izotope.com: Frequency Masking, Reverb Pre-Delay, Audio Saturation, Sidechain Compression
- Sound on Sound: Analogue Warmth, Reverb & Psychoacoustics
- Sweetwater: How to Master Audio for YouTube
- No Film School: Disquieting Uses of Infrasound in Movies
- Wrongtools: Bass Pulse in Film Music
- silvermansound.com: BPM to FPS Calculator
- PremiumBeat: Creative Uses of Song Stems in Video Editing
- sonible.com: Spectral Ducking with smart:comp
