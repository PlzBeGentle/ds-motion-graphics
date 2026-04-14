# B-Roll Classification — Foto-KenBurns vs Video-Generation

**Source:** `b-roll-slots.md` (11 slots, 74s total)
**Created:** 2026-04-14 post-iter (User-Klarstellung: "wir müssen noch unterscheiden zwischen video broll und foto ken burns broll")

## Classification-Regeln

### Foto-KenBurns (Still + Animation in Remotion)
- **Pro:** Deterministisch, billig (~$0.05/Bild via FLUX/Nano-Banana), frame-perfect, iterierbar, 1-Klick Re-Generation bei neuen Ideen
- **Con:** Statisches Motiv — lebt nur durch KenBurns scale/drift/brightness-animation
- **Pattern:** EZB-Falle nutzt 10 .jpg Files in `public/ezb-falle/assets/` → in Compositions mit `<KenBurns>` wrapper animiert (siehe `EZB03-BankBeratung.tsx`, `EZB09-LagardeSchock.tsx`, etc.)
- **Wann nutzen:**
  - Location-Shots wo Kamera-Move reicht (Alpen, BMF-Gebäude, Hafen)
  - Objekte wo Kamera-Push Atmosphäre erzeugt (Gold-Barren, Dokumente)
  - Metaphern wo kein Motion nötig (Weltkarten, Konzepte)
  - Bei jedem Slot wo "Drohnenaufnahme" oder "aerial" im Spec steht → Foto-KenBurns ist billiger + kontrollierter

### Video-Generation (fal.ai Veo 3.1 via `ae-premium-editing` Skill)
- **Pro:** Echte Bewegung (Menschen in Bewegung, Maschinen in Aktion, Fluss), cineastisch
- **Con:** Teuer (Veo 3.1 ~$0.75/Sekunde für 1080p), nicht deterministisch, braucht Retakes bei Fehlern, unflexibel bei Änderungen
- **Pattern:** Noch nicht etabliert — `ae-premium-editing` Skill hat die MCP-Tools + Veo-Integration, aber für BMF wäre das der erste Production-Use
- **Wann nutzen:**
  - Menschen die etwas tun (Arbeiter in Mine, Trader am Phone)
  - Industrielle Prozesse (Containerschiff fährt, Chipfabrik-Roboter bewegt sich)
  - Dynamik die ein Still nicht einfangen kann (Flugzeug landet, Zug fährt)
  - **Slots mit hohem emotionalem Impact** wo Bewegung den Punkt verstärkt

### Motion-Graphics-only (SVG + Remotion, keine echte Foto/Video-Source)
- **Pro:** 100% kontrolliert, bleibt perfekt im LOCOS-Brand, Zeit-fertig
- **Con:** Kein "real-world" feel
- **Pattern:** Schon im Phase-4 Spec gelistet
- **Wann nutzen:** Icon-Collagen, Symbol-Arrangements, abstrakte Metaphern

### Self-shot (User-Footage)
- **Pro:** Kostet nichts
- **Con:** Braucht Produktion, nicht "jetzt verfügbar"
- **Wann nutzen:** Nur wenn Dario sowieso Phone-Footage parat hat

---

## 11 Slot-Classification

| Slot | Topic | Typ | Begründung | Cost |
|---|---|---|---|---|
| **1** | BMF Berlin Exterior | **FOTO-KenBurns** | Statisches Gebäude, Drohnen-Look kommt aus scale-animation. FLUX kann "official government building berlin wilhelmstrasse facade at dusk" gut generieren. | ~$0.05 |
| **2** | PDF BMF-Schreiben Close-Up | **FOTO-KenBurns** | Nah am Dokument, Push-In oder Drift über Text reicht. Ideal für FLUX "close-up official german document paper stack on wooden desk warm tungsten light". Alternativ: echtes BMF-PDF ausdrucken + Phone (später). | ~$0.05 |
| **3** | Zollfreilager Frankfurt / Industriemetall-Barren | **FOTO-KenBurns** | Gestapelte Metallbarren in Lagerhalle — Still + Push-In perfekt. FLUX "stacked industrial metal ingots warehouse cold concrete floor moody lighting". | ~$0.05 |
| **4** | Telefon-Szene Steuerberater Donnerstag 20 Uhr | **VIDEO-GEN** (oder self-shot) | Emotional-Moment: Hand greift zum Phone, Display leuchtet auf. Veo 3.1 "middle-aged man reaching for smartphone on evening desk warm desk lamp melancholy". **Alternative:** self-shot Dario's Hand — sofort verfügbar, kostenlos. | ~$5.25 (7s) ODER self-shot |
| **5** | Kobalt-Mine Kongo / EV Batterie | **VIDEO-GEN** | **MUST get Peak-Moment.** Bewegung ist essenziell: Arbeiter bewegen sich in Mine, ODER Batterie-Produktionslinie fährt Roboter. Still hätte hier deutlich weniger Impact. Veo 3.1 "cobalt mine workers democratic republic congo industrial tension gritty documentary style" OR "lithium battery production line robots automated manufacturing". | ~$5.25 (7s) |
| **6** | Verkehrsschild / Baustelle Metapher | **FOTO-KenBurns** | Statisches Schild reicht, KenBurns Push-In macht es cinematic. FLUX "german road construction warning sign concrete barrier gray sky" | ~$0.05 |
| **7** | China Exportkontrollen Shanghai Hafen | **FOTO-KenBurns** (empfohlen) ODER VIDEO-GEN | Hafen mit Containern — Still reicht wenn Drohnen-Look gewählt. Push-In oder Pan suffice. Veo wäre overkill. FLUX "shanghai port container ships aerial view early morning haze". | ~$0.05 |
| **8** | Chipfabrik Reinraum TSMC/Intel/ASML | **VIDEO-GEN** | **MUST get Geopolitical-Anker.** Bewegung wichtig: Roboterarme fahren Wafer, Reinraum-Betrieb. Static still wirkt wie Werbefoto. Veo 3.1 "semiconductor cleanroom robotic arm handling silicon wafer taiwan tsmc blue lighting professional documentary". | ~$5.25 (7s) |
| **9** | China Staatsreserven Bunker / Strategic Reserves | **FOTO-KenBurns** | Atmosphärisches Still, Reihen von Metallfässern in Bunker-Look. Drift/Push perfekt. FLUX "strategic reserve bunker rows of metal barrels industrial warehouse dim lighting paranoid mood". | ~$0.05 |
| **10** | Schweiz Alpen Tresor Zürich | **FOTO-KenBurns** | **MUST get Warm-Payoff.** Alpen-Panorama = perfect KenBurns, golden hour → warm drift. Tresor = Still mit slow push. Beide als Foto ideal. FLUX "swiss alps panorama golden hour warm sunlight mountain peaks" + "luxury vault gold bars warm tungsten lighting zurich". | ~$0.10 (2 Bilder) |
| **11** | Branchen-Icons Collage (Halbleiter/Maschinenbau/PV/Medizin) | **MOTION-GRAPHICS-ONLY** | Keine Foto/Video-Source. SVG Icons + Staggered Reveal + LOCOS Gold. Schon im Phase-4 Spec als "Pure Motion Graphics" klassifiziert. | $0 |

## Cost-Summary

| Kategorie | Count | Total Cost |
|---|---|---|
| **Foto-KenBurns (FLUX/Nano-Banana)** | 7 Slots (1, 2, 3, 6, 7, 9, 10×2) | **~$0.40** |
| **Video-Generation (Veo 3.1)** | 3 Slots (4, 5, 8) → 21s total | **~$15.75** |
| **Motion-Graphics-only** | 1 Slot (11) | $0 |
| **Self-shot alternative** | Slot 4 optional | $0 |
| **TOTAL AI B-Roll** | 11 Slots | **~$16.15** (Video-Gen-heavy) ODER **~$11** (Slot 4 als self-shot) |

## Zeit-Aufwand

| Task | Time |
|---|---|
| 7 FLUX Still-Generations (iterativ, 2-3 Versuche bis zufriedenstellend) | ~45 min |
| 3 Veo Video-Generations + Review + Retake bei Bedarf | ~60-90 min |
| 1 SVG Icon-Collage (Motion-Graphics) inline bauen | ~20 min |
| **BRollPlaceholder → echte Components umstellen** (7 KenBurns + 3 OffthreadVideo + 1 Motion) | ~30-40 min |
| **TOTAL** | **~2.5-3.5h** |

## Render-Pattern pro Typ

### Foto-KenBurns Slot (Beispiel Slot 10 Alpen)

```tsx
// BmfBRoll10SchweizAlpen.tsx
import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { KenBurns } from "../../components/KenBurns";

export const BmfBRoll10SchweizAlpen: React.FC = () => {
  return (
    <AbsoluteFill>
      <KenBurns
        src={staticFile("bmf/b-roll/slot-10-schweiz-alpen.jpg")}
        zoomStart={1.00}
        zoomEnd={1.15}
        driftY={-0.03}  // slight upward drift
        driftX={0.02}
        duration={210}  // 7s @ 30fps
      />
    </AbsoluteFill>
  );
};
```

Genutzt in Master via `<Sequence from={...} durationInFrames={210}><BmfBRoll10SchweizAlpen /></Sequence>`.

### Video-Gen Slot (Beispiel Slot 5 Kobalt-Mine)

```tsx
// BmfBRoll05Kobalt.tsx
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

export const BmfBRoll05Kobalt: React.FC = () => {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile("bmf/b-roll/slot-05-kobalt-mine.mp4")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted  // b-roll audio wird via separaten <Audio> layer orchestriert
      />
    </AbsoluteFill>
  );
};
```

Veo-Output ist ein fertiges .mp4, direkt als OffthreadVideo loadable.

### Motion-Graphics Slot (Slot 11 Icons)

Reines Remotion inline Component mit SVG-Icons, Spring-Stagger, LOCOS-Gold-Color. Kein externes Asset.

---

## Proposed Build-Order

1. **Slot 11 Icons** zuerst (0 Cost, schnell, schon spec'd) — 20 min
2. **7 FLUX Stills** parallel (1 Prompt-File, 1 Python-Script das alle 7 nacheinander generiert) — 45 min
3. **3 Veo Videos** einzeln (teuer, sollte iteriert werden können) — 60-90 min
4. **BRollPlaceholder** refactor → 11 echte Components + Master-Composition wire-up — 30 min

**Total ~2.5-3.5h + ~$11-16 AI-Costs.**

---

## Offene Fragen für Dario

1. **Slot 4 (Telefon-Szene):** Self-shot oder Veo? Self-shot spart $5.25 aber braucht Produktions-Zeit. Veo ist sofort verfügbar.
2. **Slot 5 (Kobalt):** DRC-Mine (ethisch heikel) oder EV-Batterie-Fabrik (clean, aber weniger "Smoking Gun"-Vibe)?
3. **Slot 8 (Chipfabrik):** TSMC Taiwan, Intel US, oder ASML Niederlande? Jede hat andere geopolitische Konnotation.
4. **Wer orchestriert den AI-Build:** ich baue das Generator-Script + rufe die APIs, oder willst du die Prompts selbst iterieren?
