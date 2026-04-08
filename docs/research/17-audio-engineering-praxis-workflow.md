# 17 — Audio-Engineering Praxis-Workflow: Voice Processing, SFX Crafting, Mix-Referenz

> Deep Research, 04.04.2026
> Kontext: Daniel Sauer Finance-YouTube, Remotion Pipeline, Epidemic Sound
> Fokus: PRAKTISCHE Settings, dB-Werte, Frequenzen, Millisekunden — kein Theorie-Ueberbau

---

## 1. VOICE PROCESSING CHAIN — Exakte Reihenfolge

Die Signalkette eines Audio-Engineers fuer YouTube-Voice folgt einer festen Reihenfolge. Jeder Schritt baut auf dem vorherigen auf. Die Reihenfolge ist NICHT beliebig — sie ist akustisch begruendet.

### Warum diese Reihenfolge?

```
Signal-Fluss:
RAW → Noise Gate → HPF → De-Esser → EQ (subtraktiv) → Kompressor 1 → 
EQ (additiv) → Kompressor 2 → De-Breath → Limiter → OUT
```

**Prinzip:** Erst ENTFERNEN (unerwuenschtes Material), dann FORMEN (EQ), dann KONTROLLIEREN (Kompression), dann VEREDELN (additive EQ, Sättigung), dann BEGRENZEN (Limiter).

---

### Schritt 1: NOISE GATE

**Was es tut:** Entfernt Hintergrundgeraeusche (Luefter, Strasse, Rauschen) in den Sprechpausen. Oeffnet nur wenn die Stimme einen bestimmten Pegel ueberschreitet.

**Warum zuerst?** Alle nachfolgenden Plugins (besonders EQ-Boosts und Kompression) wuerden das Hintergrundrauschen mitverstaerken. Deshalb ZUERST entfernen.

| Parameter | Wert fuer Daniel (~120 Hz Grundfrequenz) | Erklaerung |
|---|---|---|
| **Threshold** | -40 dB bis -35 dB | Muss UNTER Daniels leiser Sprache liegen, aber UEBER dem Raum-Rauschen. Einstellen: Daniel fluestern lassen, Threshold knapp darunter. |
| **Attack** | 0.5 ms bis 2 ms | Extrem schnell. Gate muss sofort oeffnen wenn Daniel anfaengt zu sprechen, sonst werden Wortanfaenge abgeschnitten. |
| **Hold** | 50 ms bis 100 ms | Haelt das Gate offen nach dem letzten Signal ueber Threshold. Verhindert Flattern bei kurzen Pausen zwischen Silben. |
| **Release** | 80 ms bis 150 ms | Wie schnell das Gate schliesst wenn Daniel aufhoert zu sprechen. Zu schnell (<50ms) = hoerbares Abschneiden. Zu langsam (>200ms) = Rauschen laeuft nach. |
| **Range/Depth** | -20 dB bis -30 dB | NICHT auf -inf stellen. Das Gate soll das Rauschen REDUZIEREN, nicht eliminieren. -inf = unnatuerliche digitale Stille in Pausen. -20 bis -30 dB = Rauschen wird leiser, verschwindet aber nicht komplett. |
| **Sidechain HPF** | 100 Hz | High-Pass auf dem Sidechain-Input. Verhindert, dass tiefe Rumbles (Tritt auf den Boden, Subwoofer von nebenan) das Gate unbeabsichtigt oeffnen. |

**Typischer Fehler:** Threshold zu hoch → leise Woerter werden abgeschnitten. IMMER mit einer leisen Passage testen.

---

### Schritt 2: HIGH-PASS FILTER (HPF)

**Was es tut:** Entfernt alle Frequenzen unterhalb einer bestimmten Grenzfrequenz. Eliminiert Trittschall, Klimaanlagen-Brummen, Handling-Geraeusche und Proximity-Effekt.

**Warum an Position 2?** Nach dem Noise Gate (das Pausen bereinigt), aber VOR dem EQ (der sonst auch Muell verstaerken wuerde).

| Parameter | Wert | Erklaerung |
|---|---|---|
| **Frequenz** | 80 Hz bei 12 dB/Oct ODER 100 Hz bei 6 dB/Oct | Daniel hat ~120 Hz Grundfrequenz. Bei 80 Hz/12dB schneidet man alles unter 80 Hz steil ab, ohne die Grundfrequenz zu beruehren. Bei 100 Hz/6dB ist der Cut sanfter und reicht naeher an die Grundfrequenz, ohne sie hart abzuschneiden. |
| **Slope** | 12 dB/Oktave (2nd order) oder 18 dB/Oktave (3rd order) | 6 dB/Oct = zu sanft, laesst zu viel durch. 24 dB/Oct = zu steil, kann Phasenprobleme im Uebergangsbereich erzeugen. 12-18 dB/Oct ist der Sweet Spot. |

**Entscheidungshilfe:**
- Aufnahme mit Grossmembran-Kondensator (nah besprochen, viel Proximity-Effekt): **100 Hz, 18 dB/Oct**
- Aufnahme mit Richtmikrofon (weniger Proximity): **80 Hz, 12 dB/Oct**
- Aufnahme in lautem Raum mit viel Tiefton-Stoerung: **120 Hz, 12 dB/Oct** — aber Vorsicht: das greift schon in Daniels Grundfrequenz ein, macht die Stimme duenner

**Faustregel fuer Daniel Sauer:** 80 Hz bei 12 dB/Oct als Startpunkt. Dann hochdrehen bis man hoert, dass es "duenn" wird — dann 10-15 Hz zurueck.

---

### Schritt 3: DE-ESSER

**Was es tut:** Reduziert scharfe Zischlaute (S, Z, SCH, F, T am Wortende). Ist ein frequenzselektiver Kompressor, der nur im Zischlaut-Bereich arbeitet.

**Warum an Position 3 (vor EQ)?** Wenn man zuerst den EQ macht und die Presence boosted (3-5 kHz), werden Zischlaute NOCH schaerfer. Dann muss der De-Esser haerter arbeiten und erzeugt Artefakte (Lispeln). Besser: Zischlaute ZUERST baendigen, dann in Ruhe EQ-Boosts setzen.

| Parameter | Wert | Erklaerung |
|---|---|---|
| **Frequenz** | 5.5 kHz bis 7.5 kHz (Center) | Maennliche Stimme hat Sibilanzen primaer bei 5-8 kHz. Daniels Stimme: Start bei 6 kHz, dann per Bypass-Vergleich die schaerfste Stelle suchen. |
| **Bandbreite/Q** | Breitband (Split-Band) oder Bell mit Q=2-4 | Split-Band: alles ueber der Frequenz wird komprimiert. Bell: nur ein schmales Band wird komprimiert. Split-Band ist aggressiver aber einfacher einzustellen. |
| **Threshold** | So einstellen, dass Reduktion NUR bei Zischlauten greift | Im De-Esser-Meter sehen: Gain Reduction darf NUR bei "S", "Z", "SCH" anspringen. Wenn es auch bei normalen Vokalen oder Konsonanten arbeitet, ist der Threshold zu niedrig. |
| **Reduktion** | -3 dB bis -6 dB | -3 dB = subtil, nimmt die Schaerfe raus ohne das "S" komplett zu eliminieren. -6 dB = deutlich, fuer besonders scharfe Aufnahmen. Mehr als -8 dB = Lispeln-Effekt, klingt unnatuerlich. |
| **Attack** | 0.1 ms bis 1 ms | Extrem schnell. Zischlaute sind Transienten, die kommen innerhalb von Millisekunden und gehen schnell wieder. |
| **Release** | 20 ms bis 50 ms | Schnell, damit der De-Esser nach dem Zischlaut sofort loslässt und den naechsten Vokal nicht beschneidet. |

**Praxis-Test:** Das Wort "System" sprechen lassen. Das "S" am Anfang und am Ende muss kontrolliert sein, aber der Vokal "y" dazwischen darf NICHT beeinflusst werden. Wenn er doch beeinflusst wird: Frequenz hoeher drehen oder Q enger machen.

---

### Schritt 4: EQ SUBTRAKTIV — Problemfrequenzen entfernen

**Was es tut:** Entfernt unerwuenschte Frequenzanteile die die Stimme "matschig", "nasal", "kastig" oder "hart" klingen lassen.

**Warum subtraktiv VOR additiv?** Man baut kein Haus auf einem dreckigen Fundament. Erst den Muell entfernen, dann das Gute hervorheben. Sonst verstaerkt man mit den additiven EQ-Boosts auch die Problemfrequenzen.

| Frequenzbereich | Aktion | Warum | Typische Settings |
|---|---|---|---|
| **150-250 Hz ("Boxiness")** | Schmaler Cut, -2 bis -4 dB, Q=3-5 | Daniels Stimme bei ~120 Hz Grundfrequenz hat den 2. Oberton bei ~240 Hz. Wenn dieser Bereich zu prominent ist, klingt es "kastig" wie durch einen Schuhkarton gesprochen. | Bell, 200 Hz, -3 dB, Q=4 |
| **300-500 Hz ("Mud")** | Breiter Cut, -2 bis -4 dB, Q=1-2 | Die "Matsch-Zone". Hier staut sich Energie auf, besonders bei Kondensatormikrofonen mit Proximity-Effekt. Raubt Klarheit, ohne etwas Nuetzliches beizutragen. | Bell, 380 Hz, -3 dB, Q=1.5 |
| **800 Hz - 1 kHz ("Nasal")** | Enger Cut, -2 bis -3 dB, Q=5-8 | Klingt "nasal" wie eine verstopfte Nase. Nicht jede Stimme hat das Problem — erst hoeren, dann schneiden. | Bell, 900 Hz, -2 dB, Q=6 (nur wenn noetig) |
| **2.5-3.5 kHz ("Harshness")** | Enger Cut, -1 bis -3 dB, Q=4-6 | Die "Aggressions-Zone". Kann bei lauten/energetischen Passagen anstrengend klingen. Daniel spricht oft laut und energetisch — hier vorsichtig 1-2 dB rausnehmen. | Bell, 3 kHz, -2 dB, Q=5 |

**Methode zum Finden der Problemfrequenzen (Sweep-Methode):**
1. Schmales Band einstellen: Q=10, Gain +8 dB
2. Langsam durch das Spektrum fahren (100 Hz bis 8 kHz)
3. Wo es am SCHLIMMSTEN klingt (resonant, nasal, scharf) = dort ist das Problem
4. Auf die Problemfrequenz setzen, Q auf 3-6 oeffnen, Gain auf -2 bis -4 dB

**Wichtig:** NICHT mehr als 3-4 subtraktive Baender gleichzeitig. Wenn die Stimme so viele Probleme hat, liegt es an der Aufnahme (Mikrofon, Raum), nicht am EQ.

---

### Schritt 5: KOMPRESSOR 1 (Leichte Kontrolle)

**Was es tut:** Reduziert den Dynamik-Unterschied zwischen lauten und leisen Stellen. Daniel spricht dynamisch (leise Erklaerungen, laute Punchlines) — der Kompressor gleicht das an.

**Warum an Position 5?** NACH dem subtraktiven EQ, damit der Kompressor auf ein sauberes Signal reagiert. Wuerde man vor dem EQ komprimieren, wuerden die Problemfrequenzen in der Dynamik "eingefroren" und spaeter schwerer zu entfernen.

**Fuer Daniel Sauer: Serial Compression — 2 leichte Kompressoren statt 1 starkem.**

**Kompressor 1 — "Leveler" (kontrolliert grosse Dynamik-Spruenge):**

| Parameter | Wert | Erklaerung |
|---|---|---|
| **Threshold** | -24 dB bis -20 dB | Greift bei ca. 60-70% aller Sprach-Passagen. Nur die lautesten Stellen bleiben unkomprimiert. |
| **Ratio** | 2:1 bis 3:1 | Sanft. Fuer jeden dB ueber dem Threshold wird nur die Haelfte (2:1) oder ein Drittel (3:1) durchgelassen. |
| **Attack** | 10 ms bis 20 ms | Mittel-schnell. Laesst die Transienten (Konsonanten am Wortanfang) durch, faengt dann den Body ab. Zu schnell (<5ms) = Woerter verlieren ihren "Punch". Zu langsam (>30ms) = laute Peaks schlagen durch. |
| **Release** | 100 ms bis 180 ms | Mittel. Muss schnell genug sein, um zwischen Worten loszulassen. Zu schnell (<80ms) = Pumpen. Zu langsam (>250ms) = naechstes Wort wird noch komprimiert. |
| **Knee** | Soft (6-10 dB) | Weicher Uebergang in die Kompression. Klingt natuerlicher als Hard Knee (0 dB), das abrupt einsetzt. |
| **Gain Reduction** | -3 dB bis -6 dB im Durchschnitt | Nicht mehr. Wenn der GR-Meter staendig bei -8 dB oder tiefer steht: Threshold hoeher oder Ratio niedriger. |
| **Makeup Gain** | +2 dB bis +4 dB | Gleicht den Pegel-Verlust durch Kompression aus. Einstellen: Bypass-Vergleich, komprimiertes Signal soll gleich laut klingen wie unkomprimiertes. |

---

### Schritt 6: EQ ADDITIV — Charakter und Praesenz hinzufuegen

**Was es tut:** Verstaerkt Frequenzen, die die Stimme klar, praesent und "broadcast-like" klingen lassen.

**Warum NACH Kompressor 1?** Der Kompressor hat die Dynamik kontrolliert. Jetzt koennen wir gezielt boosten, ohne dass laute Passagen die Boosts in die Uebersteuerung treiben.

| Frequenzbereich | Aktion | Warum | Typische Settings |
|---|---|---|---|
| **100-120 Hz ("Chest/Warmth")** | Breiter Boost, +1 bis +2 dB, Q=1 | Gibt Daniels Stimme mehr Brustton-Waerme und Autoritaet. Nur LEICHT boosten, HPF hat darunter schon aufgeraeumt. | Shelf ab 120 Hz, +1.5 dB |
| **2-4 kHz ("Presence")** | Breiter Boost, +2 bis +4 dB, Q=1.5-3 | DER Klarheits-Boost. Macht die Stimme "vorne im Mix" hörbar, schneidet durch Musik und SFX. Das ist der Boost, der Hobby- von Profi-Audio trennt. | Bell, 3.2 kHz, +3 dB, Q=2 |
| **8-12 kHz ("Air/Brilliance")** | Shelf-Boost, +1 bis +3 dB | Gibt "Luft" und "Offenheit". Die Stimme klingt weniger stumpf, mehr "professionelles Studio". Nicht uebertreiben — zu viel Air + De-Esser-Probleme. | High Shelf ab 10 kHz, +2 dB |
| **5-6 kHz ("Clarity")** | OPTIONAL: +1 dB, Q=3 | Nur wenn nach dem De-Esser und subtraktivem EQ die Stimme zu dumpf klingt. Vorsicht: zu viel hier = Sibilanzen kommen zurueck. | Bell, 5.5 kHz, +1 dB, Q=3 |

**Die "typische YouTube-Voice" EQ-Kurve:**

```
dB
+4 |                                    ****
+3 |                                 ***    ***
+2 | **                             *          **
+1 |   **                          *              ****
 0 |     ****                    **                    ****
-1 |         ***               **
-2 |            ***           *
-3 |               ****     *
-4 |                   *****
   +----+----+----+----+----+----+----+----+----+----+
   80  120  200  350  500  1k  2k   3k  5k  8k  12k  Hz
   
   Warm    Body-Cut    Clean    Presence-Peak    Air
```

**Zusammengefasst:** Leichter Shelf-Boost bei 120 Hz, breiter Cut bei 200-500 Hz, leichter Dip bei 800-1k Hz (wenn nasal), grosser Boost bei 2-4 kHz, sanfter Air-Shelf ab 10 kHz.

---

### Schritt 7: KOMPRESSOR 2 (Feinkontrolle / "Glue")

**Was es tut:** Faengt die Peaks ab, die Kompressor 1 durchgelassen hat, und "klebt" die Stimme zusammen. Macht den Sound konsistenter und "polierter".

| Parameter | Wert | Erklaerung |
|---|---|---|
| **Threshold** | -18 dB bis -15 dB | Hoeher als Kompressor 1. Greift nur bei den lautesten Stellen, die Kompressor 1 durchgelassen hat. |
| **Ratio** | 3:1 bis 4:1 | Etwas staerker als Kompressor 1, weil er nur die Peaks abfaengt. |
| **Attack** | 5 ms bis 10 ms | Schneller als Kompressor 1. Soll die verbliebenen Peaks kontrollieren. |
| **Release** | 60 ms bis 100 ms | Schneller als Kompressor 1. Kurze Peaks rein, schnell wieder los. |
| **Knee** | Soft (4-8 dB) | Wieder weich fuer natuerlichen Klang. |
| **Gain Reduction** | -2 dB bis -4 dB im Durchschnitt | Weniger als Kompressor 1. Dieser Kompressor macht Feinarbeit, kein Heavy Lifting. |
| **Makeup Gain** | +1 dB bis +2 dB | Minimal. |

**Warum Serial Compression (2 leichte statt 1 starker)?**

| | 1 Kompressor (-8 dB GR) | 2 Kompressoren (je -4 dB GR) |
|---|---|---|
| Transparenz | Hoerbare "Quetsch"-Artefakte | Natuerlich, kaum hoerbar |
| Transienten | Werden plattgedrueckt | Bleiben erhalten (1. Kompressor laesst sie durch, 2. faengt Reste ab) |
| Pumpen | Wahrscheinlich bei lauten Passagen | Kaum, weil jeder Kompressor wenig arbeitet |
| Kontrolle | Grobes Werkzeug | Feines Werkzeug — Kompressor 1 fuer grosse Dynamik, Kompressor 2 fuer Peaks |

**Daniel-Sauer-Empfehlung:** Serial Compression mit Ratio 2.5:1 / 3.5:1. Daniel spricht energetisch und dynamisch (Finance-Content, Aufdeckung) — da braucht man Kontrolle OHNE die Energie zu killen. Ein einzelner Kompressor mit 6:1 wuerde seine Stimme leblos machen.

---

### Schritt 8: DE-BREATH

**Was es tut:** Reduziert oder entfernt hoerbare Atemgeraeusche zwischen Saetzen und Woertern.

**Position im Signal-Fluss:** NACH der Kompression. Warum? Die Kompression verstaerkt leise Sounds — Atmer waren vorher vielleicht -35 dB, nach der Kompression sind sie -25 dB und ploetzlich hoerbar.

| Einstellung | Wert | Erklaerung |
|---|---|---|
| **Modus** | REDUZIEREN, nicht entfernen | Atmer komplett entfernen klingt unnatuerlich ("Roboter"). Reduzieren auf -6 bis -10 dB unter das Sprach-Level klingt natuerlich. |
| **Reduktion** | -8 dB bis -15 dB | -8 dB = Atmer sind dezent hoerbar, natuerlich. -15 dB = Atmer sind fast weg, aber der Rhythmus bleibt. |
| **Sensitivity** | Mittel-hoch | Zu niedrig = Atmer werden nicht erkannt. Zu hoch = kurze Konsonanten werden als Atmer erkannt und reduziert. |

**Manuelle Methode (sauberste):**
1. Waveform anschauen — Atmer sind die kurzen, breiten Bumps zwischen Sprechbloecken
2. Jedes Atem-Segment einzeln selektieren
3. Volume-Reduktion um -10 dB anwenden
4. NICHT loeschen/cutten — das erzeugt unnatuerliche Stille

**Plugin-Empfehlungen:** iZotope RX Breath Control, Waves DeBreath, oder in RX die "Breath" Module.

---

### Schritt 9: LIMITER (Ceiling)

**Was es tut:** Absoluter Pegel-Begrenzer. Nichts kommt ueber den Ceiling-Wert hinaus. Letztes Sicherheitsnetz vor Uebersteuerung.

| Parameter | Wert | Erklaerung |
|---|---|---|
| **Ceiling** | -1.0 dBTP (True Peak) | YouTube re-encodiert in AAC/Opus. Dabei entstehen Inter-Sample-Peaks, die ueber 0 dB gehen koennen, wenn das Original bei 0 dB liegt. -1 dBTP gibt genug Headroom fuer das Re-Encoding. |
| **Release** | Auto oder 50 ms bis 100 ms | Schnell genug, um nach einem Peak sofort loszulassen. Auto-Release passt sich dem Material an und ist in den meisten Faellen die beste Wahl. |
| **Gain Reduction** | -0 dB bis -2 dB maximal | Der Limiter soll NUR die allerletzten Peaks abfangen. Wenn der Limiter regelmaessig -4 dB oder mehr arbeitet, ist der vorherige Mix zu laut oder die Kompression zu leicht. |
| **Lookahead** | 1 ms bis 5 ms | Gibt dem Limiter Zeit, um auf kommende Peaks zu reagieren. Verhindert hartes Clipping bei extrem schnellen Transienten. |

**YouTube-spezifisch:** YouTube normalisiert auf -14 LUFS integrated. Die Sprache-Track allein sollte bei -16 bis -14 LUFS liegen. Der Limiter stellt sicher, dass True Peaks nie ueber -1 dBTP gehen.

---

## 2. STIMME EQ FUER YOUTUBE — Die 5 Frequenzbereiche einer maennlichen Stimme

### Band-fuer-Band-Referenz (Daniel Sauer, ~120 Hz Grundfrequenz)

| Band | Bereich | Funktion | Anteil Energie | Anteil Verstaendlichkeit | Aktion |
|---|---|---|---|---|---|
| **Sub** | 20-80 Hz | Trittschall, Handling-Noise, Klimaanlage | ~5% | 0% | HPF schneiden. 80 Hz, 12 dB/Oct. Hier ist NICHTS Nuetzliches fuer Sprache. |
| **Low-Mid** | 80-250 Hz | Grundfrequenz (~120 Hz), Brustton, Waerme, Proximity-Effekt | ~55% | ~5% | Leichter Shelf-Boost bei 120 Hz (+1 dB) fuer Waerme. Cut bei 200-250 Hz (-3 dB, Q=2) gegen Mud/Boxiness. |
| **Mid** | 250 Hz - 2 kHz | Vokale, Koerper der Stimme, "Verstaendlichkeit beginnt" | ~25% | ~30% | Cut bei 350-500 Hz (-3 dB, Q=1.5) gegen Mud. Neutral lassen bei 500 Hz-1.5 kHz — hier lebt der natuerliche Stimmcharakter. |
| **Upper-Mid** | 2-5 kHz | Konsonanten, Praesenz, Klarheit, "schneidet durch den Mix" | ~10% | ~40% | DER WICHTIGSTE BOOST: +3 dB bei 3.2 kHz (Q=2). Macht Stimme praesent und verstaendlich auf JEDEM Geraet. |
| **High** | 5-12 kHz | Sibilanzen (5-8 kHz), Air/Brillanz (8-12 kHz) | ~5% | ~25% | De-Esser bei 6 kHz (-4 dB). Air-Shelf ab 10 kHz (+2 dB) fuer Offenheit. |

### Konkretes EQ-Profil als Zahlenwerte

```
Band  | Typ         | Frequenz | Gain  | Q    | Zweck
------|-------------|----------|-------|------|------------------------
1     | High-Pass   | 80 Hz    | —     | 12dB/Oct | Trittschall entfernen
2     | Low Shelf   | 120 Hz   | +1.5 dB | —    | Brustton-Waerme
3     | Bell        | 220 Hz   | -3 dB | 2.0  | Boxiness entfernen
4     | Bell        | 400 Hz   | -2.5 dB | 1.5  | Mud-Zone raeumen
5     | Bell        | 900 Hz   | -1.5 dB | 6.0  | Nasalitaet (nur wenn noetig!)
6     | Bell        | 3.2 kHz  | +3 dB | 2.0  | PRESENCE — YouTube-Klarheit
7     | Bell        | 6 kHz    | -2 dB | 4.0  | Harshness-Kontrolle (nach De-Esser)
8     | High Shelf  | 10 kHz   | +2 dB | —    | Air/Brillanz
```

### Q-Faktor Erklaerung

| Q-Wert | Bandbreite | Verwendung |
|---|---|---|
| 0.5-1.0 | Sehr breit (mehrere Oktaven) | Globale Klangfarben-Aenderung, Shelves |
| 1.5-3.0 | Mittel (ca. 1 Oktave) | Standard-Cuts und -Boosts |
| 4.0-8.0 | Eng (halbe Oktave oder weniger) | Chirurgische Eingriffe: einzelne Resonanzen, Nasalitaet |
| 10+ | Sehr eng (Notch) | Nur fuer stoerende Einzelfrequenzen (Brummen bei 50 Hz, Mikrofon-Resonanz) |

---

## 3. KOMPRESSION FUER YOUTUBE-VOICE — Drei Stufen

### Kompaktvergleich

| Level | Ratio | Threshold | Attack | Release | GR | Charakter | Wann nutzen |
|---|---|---|---|---|---|---|---|
| **Leicht** (natuerlich) | 2:1 | -22 dB | 15-20 ms | 150-200 ms | -3 dB avg | Sanft, dynamisch, "live"-Gefuehl | Ruhige Erklaer-Passagen, ASMR-Feeling, Tutorials |
| **Mittel** (YouTube Standard) | 3:1-4:1 | -20 bis -18 dB | 8-12 ms | 80-120 ms | -4 bis -6 dB avg | Kontrolliert, klar, professionell | Daniel Sauer Standard. Energetisch aber nicht platt. |
| **Stark** (Podcast/Radio) | 6:1-8:1 | -16 bis -12 dB | 3-5 ms | 40-60 ms | -8 bis -12 dB avg | Sehr gleichmaessig, "immer gleich laut" | Podcast-Episoden, Radio, Nachrichten-Stimme |

### Empfehlung fuer Daniel Sauer

**Mittlere Kompression mit Serial Compression.**

Daniel spricht dynamisch: leise Erklaerungen wechseln mit lauten, energetischen Punchlines ("Das ist KEIN Zufall!"). Er braucht Kontrolle, aber die Dynamik muss erhalten bleiben — sonst klingt er wie ein Nachrichtensprecher statt wie ein leidenschaftlicher Aufklaerer.

**Setup:**

```
Kompressor 1 ("Leveler"):
  Ratio:     2.5:1
  Threshold: -22 dB
  Attack:    15 ms
  Release:   150 ms
  Knee:      Soft (8 dB)
  GR:        -3 bis -5 dB durchschnittlich

Kompressor 2 ("Glue"):
  Ratio:     3.5:1
  Threshold: -16 dB
  Attack:    8 ms
  Release:   80 ms
  Knee:      Soft (6 dB)
  GR:        -2 bis -3 dB durchschnittlich

Gesamt-GR: -5 bis -8 dB
= natuerlich aber kontrolliert
```

### Warum Serial Compression besser ist

Stell dir vor, Daniel sagt: "Die Inflation liegt bei sieben Prozent." (leise) und dann "UND DAS IST SYSTEM!" (laut).

**Ein Kompressor (6:1, -6 dB GR):**
- Leise Passage: kaum Kompression (unter Threshold)
- Laute Passage: VIEL Kompression (-8 dB GR) → klingt gequetscht, verliert Energie
- Ergebnis: Ungleichmaessig. Ruhige Stellen klingen anders als laute Stellen.

**Zwei Kompressoren (2.5:1 + 3.5:1, je -3-4 dB GR):**
- Leise Passage: Kompressor 1 arbeitet leicht (-2 dB), Kompressor 2 tut fast nichts
- Laute Passage: Kompressor 1 reduziert um -4 dB, Kompressor 2 faengt den Rest ab (-3 dB)
- Ergebnis: Gleichmaessig. Beide Stellen klingen natuerlich, die Dynamik bleibt, aber der Lautstaerkeunterschied ist kontrolliert.

---

## 4. SFX CRAFTING — 3-Layer-Hit Schritt fuer Schritt

### Kompletter Workflow: Von der Library zum fertigen Sound

**Ziel:** Ein "Grosse Zahl erscheint"-Impact fuer eine Overlay-Animation.

---

**Schritt 1: Layer 1 (Sub/Weight) aussuchen**

| Quelle | Was suchen | Suchbegriffe |
|---|---|---|
| Epidemic Sound SFX | Sub-Bass-Impact, tiefer Boom | "sub bass hit", "low boom", "impact sub" |
| Bestehende Library | `ES_SFX.BOOM_ULTRA_LOW` (20-80 Hz, 5.9s) | — |
| Alternativ selber: | Sinuston bei 45 Hz, 400ms Decay, Exponential Fade | In jeder DAW mit Oszillator generierbar |

**Entscheidung:** `BOOM_ULTRA_LOW` aus der Epidemic Library hat zu viel High-End-Content. Besser: in der DAW mit Low-Pass bei 100 Hz filtern, sodass NUR der Sub-Anteil bleibt.

---

**Schritt 2: Layer 2 (Body/Punch) aussuchen**

| Quelle | Was suchen | Suchbegriffe |
|---|---|---|
| Epidemic Sound SFX | Impact mit Koerper, knackiger Punch | "cinematic hit", "impact close", "punch" |
| Bestehende Library | `ES_SFX.IMPACT_DEEP_HIT` (80-2000 Hz, 5.8s) | — |

**Entscheidung:** `IMPACT_DEEP_HIT` hat guten Body. In der DAW: High-Pass bei 80 Hz (Sub macht Layer 1), Low-Pass bei 3 kHz (Transient macht Layer 3).

---

**Schritt 3: Layer 3 (Top/Attack/Transient) aussuchen**

| Quelle | Was suchen | Suchbegriffe |
|---|---|---|
| Epidemic Sound SFX | Kurzer Click, Snap, metallischer Akzent | "click", "snap", "metallic hit short" |
| Bestehende Library | `ES_SFX.GLITCH_HIT` (2-12 kHz, 0.9s) | — |
| Alternativ | `ES_SFX.CAMERA_CLICK` (0.8s) | — |

**Entscheidung:** `GLITCH_HIT` fuer Tech/Finance-Kontext. High-Pass bei 2 kHz (alles darunter macht Layer 2).

---

**Schritt 4: In DAW importieren**

Alle 3 WAV-Dateien auf separate Tracks in der DAW:
- Track 1: "Sub" (BOOM_ULTRA_LOW, gefiltert)
- Track 2: "Body" (IMPACT_DEEP_HIT, gefiltert)
- Track 3: "Top" (GLITCH_HIT, gefiltert)

---

**Schritt 5: Zeitlich alignen**

1. Waveform-Ansicht auf Sample-Ebene zoomen
2. Den **Transient-Peak** (hoechste positive Spitze der Waveform) jedes Layers identifizieren
3. Alle 3 Transient-Peaks auf denselben Sample/Frame legen
4. **Ausnahme Top-Layer:** Kann 1-2 Samples (bei 48 kHz = ca. 0.02-0.04 ms) VORHER platziert werden — erzeugt "Pre-Transient Anticipation", klingt schaerfer

```
Timeline (Samples bei 48kHz):
         |--- Sample 0 (Hit Point)
Sub:     [____/\______________] ← Peak auf Sample 0
Body:    [__/\________________] ← Peak auf Sample 0
Top:     [/\__________________] ← Peak auf Sample -1 bis 0 (leicht vorher)
```

---

**Schritt 6: Phase checken**

**Was:** Die Waveforms muessen in die gleiche Richtung starten. Wenn Layer 1 mit einer positiven Halbwelle beginnt und Layer 2 mit einer negativen, loeschen sich die Frequenzen teilweise aus (Phasenausloeschung). Ergebnis: duenner, kraftloser Sound.

**Wie pruefen:**
1. Waveform-Ansicht: Schauen ob alle 3 Layer NACH OBEN (positiv) oder NACH UNTEN (negativ) starten
2. Wenn einer invertiert ist: Phase-Flip-Button (180-Grad-Drehung) im Channel-Strip
3. A/B-Test: Alle 3 Layer zusammen abspielen, dann einen Layer phase-flippen. Wenn es DUENNER klingt: falsche Phase. Wenn es VOLLER klingt: richtige Phase.

**Schnell-Check:** Solo alle 3 Layer zusammen auf Mono abspielen. Wenn der Bass verschwindet oder der Sound duenn wird: Phase-Problem.

---

**Schritt 7: EQ pro Layer — Cut was der Layer NICHT liefern soll**

| Layer | High-Pass | Low-Pass | Zusaetzlicher Cut |
|---|---|---|---|
| Sub (20-80 Hz) | keiner (oder 20 Hz, 24dB/Oct fuer DC-Offset) | 100 Hz, 24 dB/Oct (steil!) | — |
| Body (80-2000 Hz) | 80 Hz, 18 dB/Oct | 3 kHz, 12 dB/Oct | Optional: -2 dB bei 250 Hz (Mud) |
| Top (2000-12000 Hz) | 2 kHz, 18 dB/Oct | 12 kHz, 6 dB/Oct | Optional: -2 dB bei 5 kHz (Sibilanz-Kontrolle) |

**Warum so steil filtern?** Damit die Layer sich NICHT ueberlappen. Jeder Layer ist fuer sein Frequenzband zustaendig. Ueberlappung fuehrt zu Phasen-Interferenz und Matsch.

---

**Schritt 8: Volume-Balance**

| Layer | Relative Lautstaerke | Begruendung |
|---|---|---|
| Body | 0 dB (Referenz, lautester Layer) | Das ist was man "hoert" — der Haupt-Sound |
| Sub | -4 dB bis -6 dB unter Body | Man soll es FUEHLEN, nicht bewusst hoeren. Zu laut = matschig, muddy. |
| Top | -6 dB bis -8 dB unter Body | Gibt Schaerfe und Definition, soll aber nicht stechen. Zu laut = aggressiv, nervig. |

**Praxis-Methode:**
1. Nur Body auf Neutral-Pegel einstellen
2. Sub reinmischen bis man "Gewicht" fuehlt, aber der Body nicht matschig wird
3. Top reinmischen bis Transienten definiert sind, aber nichts sticht
4. Auf Laptop-Lautsprecher gegentesten — nur Body und Top sind hoerbar (Sub fehlt physisch)
5. Auf Kopfhoerer gegentesten — alle 3 Layer muessen ausgewogen sein

---

**Schritt 9: Reverb?**

| Kontext | Reverb | Typ | Wet/Dry | Decay |
|---|---|---|---|---|
| Impact auf Punchline | JA (kurz) | Plate | 15-25% | 0.4-0.8s |
| Impact auf Chart-Overlay | NEIN oder minimal | — | 5-10% | 0.3s |
| Boom in Stille-Moment | JA (laenger) | Hall | 20-30% | 1.0-2.0s |
| Whoosh/Transition | NEIN | — | — | — |

**Generell:** Reverb gibt dem Sound "Raum" und macht ihn groesser. Aber ZU VIEL Reverb verwischt die Transienten und macht den Mix matschig. Faustregel: lieber zu wenig als zu viel.

**Reverb-Settings fuer Impact:**
- Pre-Delay: 5-15 ms (Impact kommt erst trocken, dann folgt der Hall)
- Decay: 0.4-0.8s (kurz — langer Hall passt nicht zu schnellen Edits)
- HPF auf dem Reverb-Return: 200 Hz (kein matschiger Bass-Hall)
- LPF auf dem Reverb-Return: 6 kHz (keine scharfen Echos)

---

**Schritt 10: Als einzelne WAV bouncen**

| Parameter | Wert | Begruendung |
|---|---|---|
| Format | WAV (unkomprimiert) | Kein Qualitaetsverlust. MP3/AAC fuer finale Delivery, nicht fuer Assets. |
| Sample Rate | 48 kHz | YouTube-Standard. Nicht 44.1 kHz (CD-Standard). Nicht 96 kHz (unnoetig, doppelte Dateigroesse). |
| Bit Depth | 24-bit | Mehr Dynamikumfang als 16-bit. Besonders wichtig fuer SFX mit grossen Pegelunterschieden (leiser Tail nach lautem Peak). |
| Normalisierung | NEIN | Den Pegel so lassen wie gemischt. Normalisierung verfaelscht die relativen Pegel. |
| Mono vs. Stereo | Mono fuer Impacts, Stereo fuer Whooshes/Sweeps | Impacts sind zentral (Punchline). Whooshes duerfen Stereo-Bewegung haben. |
| Dateiname | `sfx-impact-big-number-48k-24b.wav` | Beschreibend, mit technischen Details im Namen. |

---

## 5. SILENCE-BEFORE-IMPACT — Frame-genaue Umsetzung

### Das Prinzip

Stille vor einem Impact verstaerkt dessen wahrgenommene Wucht um 30-50%. Das Gehirn nutzt die Stille als "Einatmen" — der Impact ist dann das "Ausatmen". Ohne Stille davor fehlt der Kontrast.

### Wie lang genau?

| Kontext | Stille-Dauer | Frames (25fps) | Frames (30fps) |
|---|---|---|---|
| Kleiner Reveal (Zahl, Fakt) | 200-400 ms | 5-10 Frames | 6-12 Frames |
| Mittlerer Reveal (Chart, Grafik) | 400-800 ms | 10-20 Frames | 12-24 Frames |
| Grosser Reveal (Schock, Plot Twist) | 800-1500 ms | 20-38 Frames | 24-45 Frames |
| Maximum (Finaler Cliffhanger) | 1500-2500 ms | 38-63 Frames | 45-75 Frames |

### Was passiert mit den Audio-Elementen in der Silence?

| Element | Verhalten | Technisch |
|---|---|---|
| **Musik** | Abrupter Schnitt oder sehr schneller Fade (3-5 Frames) | Volume auf 0 innerhalb von 120-200ms. KEIN langsamer Fade — das signalisiert "es geht weiter". Ein harter Stop signalisiert "JETZT ist es ernst". |
| **Room Tone** | BLEIBT. Geht NICHT auf 0. | Room Tone bei normalem Pegel weiterlaufen lassen (-45 dB). Wenn Room Tone auch verschwindet, entsteht "digitale Stille" — klingt wie ein Systemfehler, nicht wie Absicht. |
| **Riser (falls vorhanden)** | Endet BEVOR die Stille beginnt oder Peak faellt in die Stille | Riser-Peak 2-5 Frames vor der Stille. Der Reverb-Tail des Risers klingt in die Stille hinein und wird zum natuerlichen Uebergang. |
| **Daniels Stimme** | Letztes Wort endet. Pause. | Die Stille kommt NACH dem letzten Wort. Nicht mitten im Satz. |

### Wie schnell kommt die Musik nach dem Hit zurueck?

| Kontext | Musik-Rueckkehr | Technik |
|---|---|---|
| Weiter mit Erklaerung | 1-2 Sekunden nach dem Hit | Langsamer Fade-In (30-50 Frames), S-Kurve, auf reduzierten Pegel (-24 dB) |
| Emotion nachklingen lassen | 3-5 Sekunden nach dem Hit | Nur Room Tone + Reverb-Tail des Hits. Musik kommt spaeter mit neuem Track. |
| Sofort weiter (energetisch) | 0.5-1 Sekunde nach dem Hit | Musik setzt mit dem naechsten Downbeat ein. Harter Einsatz, kein Fade. |

### Konkretes Timeline-Beispiel (25fps)

Daniel sagt: "Das kostet jeden Deutschen siebzehn Tausend Euro."

```
Frame | Zeitpunkt | Was passiert
------|-----------|---------------------------------------------------
3750  | 150.0s    | Daniel sagt "...siebzehn Tausend Euro."
3751  | 150.04s   | Letztes Wort endet
3752  | 150.08s   | Musik-Fade beginnt (war bei 3%, fadet auf 0%)
3755  | 150.20s   | Musik ist auf 0% (3 Frames Fade = 120ms)
3755  | 150.20s   | *** STILLE BEGINNT *** (nur Room Tone)
3770  | 150.80s   | Stille-Phase (600ms = 15 Frames)
3770  | 150.80s   | *** IMPACT *** → BOOM_ULTRA_LOW bei 8% Volume
3770  | 150.80s   | Gleichzeitig: Overlay "17.000 EUR" faehrt ein
3770  | 150.80s   | Gleichzeitig: Zoom-Cut auf Daniel (naeher)
3772  | 150.88s   | Impact-Reverb-Tail klingt aus
3795  | 151.80s   | Musik fadet wieder ein (S-Kurve, 25 Frames)
3820  | 152.80s   | Musik bei normalem Pegel (3%)
```

### In Remotion implementiert

```typescript
// Silence-before-Impact Pattern
const SILENCE_START = 3752;  // Musik-Fade beginnt
const SILENCE_FULL = 3755;   // Musik bei 0%
const IMPACT_FRAME = 3770;   // Hit
const MUSIC_RETURN = 3795;   // Musik kommt zurueck

// In der MusicBed-Konfiguration:
ducks: [
  { from: SILENCE_START, to: MUSIC_RETURN, volume: 0 },  // Musik komplett weg
],
swells: [
  { from: MUSIC_RETURN, to: MUSIC_RETURN + 25, volume: 0.03 },  // Fade-In
],

// SFX Cue:
cues: [
  { frame: IMPACT_FRAME, sfx: ES_SFX.BOOM_ULTRA_LOW, volume: 0.08, duration: 60 },
],
```

---

## 6. SIDECHAIN-DUCKING — Praktische Optionen fuer den DS-Workflow

Remotion rendert frame-by-frame und hat keine Echtzeit-Audio-Engine. Deshalb kein "echtes" Sidechain-Ducking in Echtzeit. Drei Optionen:

### Option A: Musik-Track in DAW pre-ducken

**Workflow:**
1. Daniels Voice-WAV + Musik-Track in DAW (GarageBand, Logic, Reaper) laden
2. Sidechain-Kompressor auf Musik-Track, Sidechain-Input = Voice
3. Settings: Attack 50ms, Release 1000ms, Ratio 4:1, Threshold -20dB
4. Kompletten Musik-Track bouncen (Export als WAV, 48kHz/24bit)
5. Pre-geduckte Musik-WAV in Remotion importieren statt der Original-Musik
6. In Remotion: Musik einfach bei konstantem Volume abspielen (Ducking ist schon im WAV)

**Vorteil:** Professionellstes Ergebnis, DAW-Plugin-Qualitaet
**Nachteil:** Extra Arbeitsschritt, bei jeder Timeline-Aenderung muss man neu bouncen

### Option B: Volume-Automation in Remotion programmieren

**Workflow:**
1. Whisper-JSON hat Wort-Timestamps → daraus Sprech-Bloecke und Pausen extrahieren
2. Automatische Duck/Swell-Map generieren: Wo Sprache = Duck, Wo Pause > 0.8s = Swell
3. In der `SoundDesign`-Komponente als ducks[]/swells[] uebergeben

```typescript
// Automatischer Duck-Generator aus Whisper-Timestamps
function generateDuckMap(
  whisperWords: { start: number; end: number }[],
  fps: number,
  baseVolume: number,
  duckedVolume: number,
  swellVolume: number,
  minPauseForSwell: number = 0.8  // Sekunden
): { ducks: DuckRange[]; swells: SwellRange[] } {
  const ducks: DuckRange[] = [];
  const swells: SwellRange[] = [];
  
  // Sprech-Bloecke zusammenfassen (Woerter die <300ms Pause haben)
  let blockStart = whisperWords[0].start;
  let blockEnd = whisperWords[0].end;
  
  for (let i = 1; i < whisperWords.length; i++) {
    const gap = whisperWords[i].start - whisperWords[i - 1].end;
    
    if (gap < 0.3) {
      // Kurze Pause → selber Block
      blockEnd = whisperWords[i].end;
    } else {
      // Pause → Block abschliessen
      ducks.push({
        from: Math.round(blockStart * fps),
        to: Math.round(blockEnd * fps),
        volume: duckedVolume,
      });
      
      // Wenn Pause lang genug → Swell
      if (gap >= minPauseForSwell) {
        swells.push({
          from: Math.round(whisperWords[i - 1].end * fps) + 10,  // 10 Frames nach Sprache
          to: Math.round(whisperWords[i].start * fps) - 5,        // 5 Frames vor Sprache
          volume: swellVolume,
        });
      }
      
      blockStart = whisperWords[i].start;
      blockEnd = whisperWords[i].end;
    }
  }
  
  return { ducks, swells };
}
```

**Vorteil:** Komplett in Remotion, kein externer DAW-Schritt, automatisierbar
**Nachteil:** Kein echtes Kompressor-Verhalten (S-Kurve ist manuell, keine Ratio/Attack/Release)

### Option C: Hybrid (empfohlen fuer DS-Workflow)

**Workflow:**
1. Grobe Automation in Remotion (Option B) fuer schnelles Iterieren
2. Feintuning der Musik in DAW fuer finalen Export (Option A)
3. Whisper-basierter Auto-Duck als Startpunkt, manuelle Swells fuer emotionale Momente

**Empfehlung fuer den DS-Workflow:**

| Phase | Methode | Warum |
|---|---|---|
| Prototyping / Preview | Option B (Remotion-only) | Schnell iterieren, Preview im Remotion Studio sofort hoerbar |
| Finaler Export | Option A (DAW Pre-Duck) | Professionellstes Ergebnis fuer den YouTube-Upload |
| Wenn keine DAW verfuegbar | Option B (verfeinert) | Reicht fuer 90% der Faelle, besonders wenn Musik bei nur 3% spielt |

---

## 7. MUSIK-STEMS NUTZEN — Epidemic Sound Stems-Workflow

### Was Epidemic Sound liefert

Epidemic Sound bietet fuer viele Tracks getrennte Stems:
- **Drums** (Kick, Snare, Hi-Hat, Toms)
- **Bass** (Bassline)
- **Melody** (Piano, Synth-Leads, Gitarre)
- **Instruments/Pads** (Streicher, Pads, Atmospaere)

### Wann welche Stems nutzen?

| Szene im Video | Stems AN | Stems AUS | Begruendung |
|---|---|---|---|
| Daniel spricht (Standard) | Pads/Atmosphere | Drums, Bass, Melody | Nur Klangteppich. Alles andere kollidiert mit Sprache. |
| Daniel spricht (energetisch) | Pads + Bass (leise) | Drums, Melody | Bass gibt "Gewicht" unter energetischen Passagen. Drums wuerden mit Sprach-Rhythmus kollidieren. |
| Overlay OHNE Sprache (Chart, Grafik, Cutaway) | ALLE Stems | — | Volle Musik! Der Moment wo die Musik "atmet". |
| Transition zwischen Sections | Drums setzen EIN | — | Drums signalisieren "Tempo-Aenderung". Drums 2-4 Takte vor dem Wechsel einsetzen = Anticipation. |
| Emotionaler Hoehepunkt | Alle Stems + Lautstaerke +3-6 dB | — | Volle Kraft. |
| Vor Stille-Moment | Stems DROPPEN (einen nach dem anderen) | Drums zuerst, dann Bass, dann Melody | Musik "stirbt" → Stille → Impact. |

### Wie Stems wechseln innerhalb eines Tracks

**Konkretes Beispiel: 60 Sekunden eines Daniel-Videos**

```
Zeit    | Drums | Bass | Melody | Pads | Gesamt-Vol | Was passiert
--------|-------|------|--------|------|------------|---------------------------
0:00    | AUS   | AUS  | AUS    | AN   | 3%         | Daniel erklaert (nur Pads)
0:15    | AUS   | AN   | AUS    | AN   | 3%         | Daniel wird energischer (Bass rein)
0:25    | AUS   | AUS  | AUS    | AUS  | 0%         | STILLE (2s vor grossem Moment)
0:27    | AN    | AN   | AN     | AN   | 8%         | CHART OVERLAY (volle Musik!)
0:35    | AN    | AN   | AUS    | AN   | 5%         | Daniel redet ueber Chart (Melody raus)
0:40    | AUS   | AN   | AUS    | AN   | 3%         | Zurueck zu Erklaerung (Drums raus)
0:55    | AUS   | AUS  | AUS    | AN   | 3%         | Ruhige Passage
1:00    | AUS   | AUS  | AUS    | AN   | → 0%       | Fade-Out fuer naechsten Section-Wechsel
```

### In Remotion implementiert

Jeder Stem wird als eigener Audio-Track mit eigener Volume-Funktion importiert:

```typescript
// Stems als separate Audio-Komponenten
<Audio src={staticFile("sfx/epidemic/tracker-stems-pads.wav")} 
       volume={(f) => padVolume(f)} />
<Audio src={staticFile("sfx/epidemic/tracker-stems-drums.wav")} 
       volume={(f) => drumVolume(f)} />
<Audio src={staticFile("sfx/epidemic/tracker-stems-bass.wav")} 
       volume={(f) => bassVolume(f)} />
<Audio src={staticFile("sfx/epidemic/tracker-stems-melody.wav")} 
       volume={(f) => melodyVolume(f)} />

// Beispiel Volume-Funktion fuer Drums (Ein/Aus mit Fade)
function drumVolume(frame: number): number {
  const drumSections = [
    { from: 675, to: 875, vol: 0.03 },   // 0:27-0:35: AN
    { from: 875, to: 1000, vol: 0.03 },   // 0:35-0:40: noch AN
  ];
  
  let vol = 0;
  for (const s of drumSections) {
    if (frame >= s.from && frame <= s.to) {
      const fadeIn = Math.min(1, (frame - s.from) / 10);   // 10 Frames Fade-In
      const fadeOut = Math.min(1, (s.to - frame) / 10);     // 10 Frames Fade-Out
      vol = s.vol * Math.min(fadeIn, fadeOut);
    }
  }
  return vol;
}
```

---

## 8. MIX-REFERENZ — Konkretes 10-Minuten Daniel Sauer Video

### Komplette Mix-Tabelle mit dB-Werten

| Zeitpunkt | Szene | Voice (dBFS) | Musik (dBFS) | SFX (dBFS) | Stems aktiv | Est. Momentary LUFS |
|---|---|---|---|---|---|---|
| **0:00-0:03** | Hook (Schock-Aussage) | -10 | -22 (Pads+Bass) | BOOM -8 (1x) | Pads, Bass | -12 |
| **0:03-0:30** | Hook-Erklaerung | -12 | -28 (nur Pads) | Whoosh -22 (2x bei Overlays) | Pads | -16 |
| **0:30-1:00** | Kontext/Erklaerung | -12 | -30 (nur Pads) | keine | Pads | -17 |
| **1:00-1:08** | Chart-Overlay (kein Sprecher) | — | -16 (alle Stems!) | Whoosh -20, Glass -26 | Alle | -14 |
| **1:08-2:00** | Weiter Erklaerung | -12 | -28 (Pads) | Pop -24 (bei Bullet Points) | Pads | -16 |
| **2:00-2:02** | **STILLE** vor Punchline | — | 0 (AUS) | — | keine | -50+ |
| **2:02** | **IMPACT** (Punchline) | -10 ("DAS IST SYSTEM!") | 0 (AUS) | BOOM -6, Sub-Drop -10 | keine | -8 |
| **2:04-2:30** | Nachklingen + weiter | -12 | -26 (Fade-In, Pads+Bass) | — | Pads, Bass | -16 |
| **2:30-5:00** | Haupt-Erklaerung | -12 | -28 (Pads) | Dezente UI-SFX -26 bei Overlays | Pads | -16 |
| **5:00-5:05** | Chart-Overlay 2 (warm, Gold) | — | -18 (alle Stems, waermerer Track) | Chime -24 | Alle | -15 |
| **5:05-7:00** | Loesungs-Sektion | -12 | -24 (Pads, waermer) | Glass -26 bei Zahlen | Pads | -16 |
| **7:00-8:00** | Spannungsaufbau (Riser) | -12 | -24 → -18 (Riser baut auf, Drums rein) | Riser -16 (8s vor Climax) | Pads → Alle | -16 → -14 |
| **8:00-8:02** | **STILLE** vor Climax | — | 0 (AUS) | — | keine | -50+ |
| **8:02** | **CLIMAX IMPACT** | -8 ("UND DAS IST KEIN ZUFALL!") | 0 (AUS) | BOOM -4, Impact -6 | keine | -6 |
| **8:04-9:00** | Zusammenfassung | -12 | -22 (Pads+Melody, aufloesend) | — | Pads, Melody | -15 |
| **9:00-9:30** | CTA | -12 | -20 (energischer, Drums rein) | Ding -16 bei "Abonnieren" | Alle | -14 |
| **9:30-9:45** | Outro | — | -14 (Musik prominent) | — | Alle | -14 |

### Gesamt-Analyse

| Metrik | Zielwert | Geschaetzter Wert | OK? |
|---|---|---|---|
| Integrated LUFS | -14 LUFS | ca. -15 LUFS | Ja (YouTube verstaerkt minimal) |
| True Peak | -1.0 dBTP max | ca. -3 dBTP (Impact-Peaks begrenzt durch Limiter) | Ja |
| Short-term LUFS (lauteste 3s) | < -9 LUFS | ca. -7 LUFS (Impact-Moment) | Grenzwertig, akzeptabel bei kurzen Transienten |
| Sprache-zu-Musik Ratio | 18-24 dB Unterschied | ~16-18 dB | Ja |
| Dynamik-Range (LRA) | 8-12 LU | ca. 10 LU | Optimal |

---

## 9. AUDIO-EXPORT FUER YOUTUBE — Technische Spezifikationen

### Export-Settings

| Parameter | Empfohlener Wert | Begruendung |
|---|---|---|
| **Sample Rate** | 48.000 Hz (48 kHz) | YouTube-Standard. YouTube re-encodiert sowieso auf 48 kHz. Upload mit 44.1 kHz erzwingt eine Konvertierung, die minimale Qualitaetsverluste verursacht. |
| **Bit Depth** | 24-bit (fuer Assets/Rendering) → 16-bit final ist OK | 24-bit hat 144 dB Dynamikumfang (vs. 96 dB bei 16-bit). Fuer YouTube-Wiedergabe reichen 16-bit, aber 24-bit waehrend der Produktion vermeidet Rundungsfehler bei Bearbeitung. Remotion rendert intern als Float, also egal. |
| **Codec (Audio im Video)** | AAC-LC, 320 kbps (oder hoeher) | YouTube re-encodiert in AAC 128 kbps (128-192 fuer Premium). Wer mit hoeherem Bitrate hochlaedt, gibt YouTube mehr Material zum Arbeiten → besseres Ergebnis. PCM (unkomprimiert) in MOV/MKV ist optimal, wenn Upload-Groesse keine Rolle spielt. |
| **Loudness Target** | -14 LUFS Integrated | YouTube normalisiert auf diesen Wert. Lauter = wird leiser gedreht (kein Vorteil). Leiser = wird lauter gedreht (mehr Rauschen). Am besten direkt auf -14 LUFS mixen. |
| **True Peak** | -1.0 dBTP Maximum | YouTube re-encodiert in AAC. Dabei entstehen Inter-Sample-Peaks. -1 dBTP gibt Puffer. |
| **Channels** | Stereo (2.0) | YouTube unterstuetzt 5.1, aber 95%+ der Zuschauer hoeren Stereo (Kopfhoerer, Laptop). Mix fuer Stereo. |

### Wie misst man LUFS?

| Tool | Kostenlos? | Plattform | Anleitung |
|---|---|---|---|
| **Youlean Loudness Meter** | Ja (Free Version) | VST/AU/AAX | Als letztes Plugin im Master-Bus. Zeigt Integrated LUFS, True Peak, LRA in Echtzeit. |
| **ffmpeg (loudnorm Filter)** | Ja | CLI (Mac/Win/Linux) | `ffmpeg -i video.mp4 -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null /dev/null` — analysiert ohne zu aendern |
| **ffmpeg (Normalisierung)** | Ja | CLI | 2-Pass: Erst analysieren (Befehl oben), dann mit den Werten normalisieren |
| **dpMeter 5** | Ja | VST/AU | Einfacher LUFS-Meter, zeigt Momentary/Short-term/Integrated |
| **iZotope Insight 2** | Nein ($$) | VST/AU/AAX | Profi-Tool, detaillierte Analyse mit History |

### ffmpeg Komplett-Analyse-Befehl

```bash
# LUFS-Analyse eines fertigen Videos
ffmpeg -i /pfad/zum/video.mp4 \
  -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json \
  -f null /dev/null 2>&1 | grep -A 20 "Parsed_loudnorm"

# Ausgabe zeigt:
# input_i: -15.2    ← Integrated LUFS des Videos
# input_tp: -2.1    ← True Peak
# input_lra: 9.8    ← Loudness Range
# input_thresh: -25.3
# target_offset: 1.2  ← So viel muesste verstaerkt werden fuer -14 LUFS
```

### Remotion-spezifisch

Remotion rendert Video + Audio zusammen. Die Audio-Qualitaet haengt vom `--codec` und den ffmpeg-Optionen ab:

```bash
# Remotion Render mit optimalen Audio-Settings
npx remotion render src/index.ts CompositionId output.mp4 \
  --codec h264 \
  --audio-bitrate 320k \
  --sample-rate 48000
```

---

## 10. COMMON MISTAKES — Die 10 haeufigsten Audio-Fehler bei YouTube

### 1. Musik zu laut unter Sprache

**Problem:** Musik bei -18 dB statt -24 bis -28 dB. Sprache muss "kaempfen".
**Loesung:** Musik auf 2-3% Volume (Remotion: 0.02-0.03). Bypass-Test: Musik muten. Wenn die Sprache ploetzlich DEUTLICH klarer ist, war die Musik zu laut.
**Faustregel:** Wenn man die Musik bewusst hoert, ist sie zu laut. Sie soll nur FEHLEN wenn man sie abstellt.

### 2. Kein High-Pass → dumpfe, matschige Stimme

**Problem:** Sub-Bass-Muell (Trittschall, Handling, Proximity) liegt unter der Stimme. Kompression verstaerkt ihn. EQ-Boosts verstaerken ihn. Ergebnis: dumpf, matschig, undefiniert.
**Loesung:** HPF bei 80 Hz, 12 dB/Oct. Immer. Ausnahmslos. Auch wenn die Aufnahme "sauber" klingt — unter 80 Hz ist NICHTS Nuetzliches fuer Sprache.

### 3. Zu viel Kompression → leblose Stimme

**Problem:** Ein einzelner Kompressor mit 8:1 Ratio, -10 dB GR. Alle Dynamik wird plattgedrueckt. Punchlines klingen gleich laut wie Erklaerungen. Die Stimme verliert Emotionalitaet und Energie.
**Loesung:** Serial Compression (2x leicht statt 1x stark). Gesamte GR maximal -8 dB. A/B-Test: komprimierte Version neben unkomprimierter hoeren. Wenn die Stimme "tot" klingt: zu viel.

### 4. SFX-Timing 2-3 Frames daneben

**Problem:** Impact-Sound kommt 3 Frames NACH der visuellen Animation. Das Gehirn verarbeitet Audio schneller als Video — 3 Frames Verzoegerung fuehlen sich an wie "schlecht synchronisiert".
**Loesung:** SFX 2 Frames VOR dem visuellen Hit-Point platzieren. In Remotion: `frame: hitFrame - 2`. Single-Frame-Stepping im Preview nutzen.

### 5. Kein Room Tone → "Vacuum"-Effekt in Pausen

**Problem:** Zwischen Saetzen ist absolute digitale Stille (0 dB). Das klingt unnatuerlich — wie ein Systemfehler. Der Zuschauer merkt es nicht bewusst, aber es fuehlt sich "billig" an.
**Loesung:** Room Tone unter die gesamte Timeline legen. 30-60 Sekunden am Drehort aufnehmen (gleicher Raum, gleiches Mikrofon). Loop bei -45 dB. Oder: Noise Gate auf -25 dB Range statt -inf.

### 6. Kein De-Esser → scharfe Zischlaute bei jedem "S"

**Problem:** Besonders auf Kopfhoerern: jedes "S", "Z", "SCH" schneidet ins Ohr. Verstaerkt durch EQ-Boosts im Presence-Bereich (3-5 kHz) und YouTube-Kompression (AAC betont obere Mitten).
**Loesung:** De-Esser bei 6 kHz, -4 dB Reduktion. VOR dem additiven EQ in der Signalkette.

### 7. EQ-Boosts ohne vorherige Cuts

**Problem:** +4 dB Presence-Boost bei 3 kHz klingt gut — aber die Mud-Zone bei 300-500 Hz ist auch noch da. Ergebnis: Stimme ist "praesent UND matschig" gleichzeitig.
**Loesung:** Subtraktiven EQ ZUERST. -3 dB bei 200-500 Hz. DANN additive Boosts. Der Presence-Boost wirkt dann viel effektiver, weil der Muell darunter weg ist.

### 8. Alle SFX gleich laut

**Problem:** Jeder Whoosh, Click, Boom und Pop auf demselben Volume. Keine Hierarchie. Der Zuschauer kann nicht unterscheiden was wichtig ist und was Dekoration.
**Loesung:** SFX-Hierarchie einhalten:

| Wichtigkeit | SFX-Typ | Volume (Remotion) |
|---|---|---|
| Hoch (Punchline) | Boom, Impact | 0.06-0.10 |
| Mittel (Overlay) | Whoosh, Sweep | 0.03-0.06 |
| Niedrig (Dekoration) | Click, Pop, Glass | 0.01-0.03 |

### 9. Fehlende Stille vor Impact-Momenten

**Problem:** Musik laeuft durch, dann kommt ein Boom drauf. Klingt "aufgesetzt". Kein Kontrast.
**Loesung:** 400-800ms Stille (nur Room Tone) VOR jedem grossen Impact. Musik 3-5 Frames vor dem Stille-Start abrupt faden. Siehe Sektion 5.

### 10. Kein LUFS-Check vor Upload

**Problem:** Video bei -20 LUFS hochgeladen → YouTube verstaerkt um 6 dB → Rauschen wird hoerbar, Dynamik-Balance verschiebt sich. Oder: Video bei -8 LUFS hochgeladen → YouTube dreht runter → klingt gepresst und leblos (Kompression bleibt, aber leiser).
**Loesung:** Vor JEDEM Upload: `ffmpeg -af loudnorm=print_format=json -f null /dev/null` ausfuehren. Zielwert: -14 LUFS integrated, -1 dBTP True Peak. Wenn zu laut oder zu leise: Master-Gain anpassen und neu rendern.

---

## QUICK-REFERENCE KARTE

### Voice Chain in einem Blick

```
RAW AUDIO
  ↓
[1] NOISE GATE — Threshold -38dB, Attack 1ms, Release 100ms, Range -25dB
  ↓
[2] HPF — 80 Hz, 12 dB/Oct
  ↓
[3] DE-ESSER — 6 kHz, -4 dB, Split-Band
  ↓
[4] EQ SUBTRAKTIV — Cut: 220Hz -3dB, 400Hz -2.5dB, (900Hz -1.5dB)
  ↓
[5] KOMPRESSOR 1 — 2.5:1, -22dB Thr, 15ms Att, 150ms Rel → -4dB GR
  ↓
[6] EQ ADDITIV — Boost: 120Hz +1.5dB Shelf, 3.2kHz +3dB, 10kHz +2dB Shelf
  ↓
[7] KOMPRESSOR 2 — 3.5:1, -16dB Thr, 8ms Att, 80ms Rel → -3dB GR
  ↓
[8] DE-BREATH — Reduktion -10dB (nicht entfernen!)
  ↓
[9] LIMITER — Ceiling -1.0 dBTP, Auto Release
  ↓
PROCESSED VOICE → in Remotion als Audio-Asset
```

### SFX-Layering in einem Blick

```
LAYER 1 (Sub):    20-80 Hz,   LPF 100Hz/24dB,  Vol: -5dB unter Body
LAYER 2 (Body):   80-2000 Hz, HPF 80Hz, LPF 3kHz,  Vol: 0dB (Referenz)
LAYER 3 (Top):    2000-12kHz, HPF 2kHz,         Vol: -7dB unter Body
→ Phase checken → Transients alignen → Reverb (Plate, 15-25%, 0.5s) → Bounce 48kHz/24bit WAV
```

### Pegel-Referenz in einem Blick

```
Element                | Remotion Vol  | dBFS        | Relativ zu Voice
-----------------------|---------------|-------------|------------------
Voice                  | 0.8-1.0       | -12 bis -8  | REFERENZ
Musik (unter Sprache)  | 0.02-0.03     | -30 bis -24 | -18 bis -12 dB
Musik (allein)         | 0.06-0.10     | -18 bis -14 | -6 bis -2 dB
Boom/Impact            | 0.06-0.10     | -14 bis -8  | -6 bis 0 dB
Whoosh                 | 0.03-0.06     | -24 bis -18 | -12 bis -6 dB
UI Click/Pop           | 0.01-0.03     | -32 bis -22 | -20 bis -10 dB
Riser (Peak)           | 0.04-0.08     | -18 bis -12 | -6 bis 0 dB
Room Tone              | 0.002-0.005   | -50 bis -40 | -38 bis -28 dB
```

### Export in einem Blick

```
Sample Rate:  48 kHz
Bit Depth:    24-bit (Assets), 16-bit OK fuer finales Video
Codec:        AAC 320kbps (in MP4) oder PCM (in MOV)
LUFS:         -14 LUFS Integrated
True Peak:    -1.0 dBTP Maximum
Channels:     Stereo 2.0
Pruefen:      ffmpeg -af loudnorm=I=-14:TP=-1:print_format=json -f null /dev/null
```
