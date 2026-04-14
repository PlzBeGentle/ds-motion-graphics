# LUT Recommendations — BMF Industriemetalle

## Einbau-Reihenfolge (pro Segment)

```
[SOURCE FOOTAGE]
     |
     v
[INPUT LUT — Technical / 100%]
     |
     v
[LUMETRI BASIC CORRECTION]
     |
     v
[LUMETRI CREATIVE LOOK LUT — 30-45%]
     |
     v
[LUMETRI CURVES + COLOR WHEELS]
     |
     v
[HSL SECONDARY — Skin Protect + Red Boost (Shock segments only)]
     |
     v
[VIGNETTE + GRAIN + HALATION/CA (wenn aktiv)]
     |
     v
[OUTPUT]
```

## Technical LUT (Input — all segments)

### `LOCOS_Rec709_Neutral.cube`
- **Opacity:** 100% (immer)
- **Funktion:** Linearisiert Kamera-Output in Rec.709 Space. Keine kreative Färbung.
- **Format:** 33×33×33 3D LUT
- **Alternative wenn nicht vorhanden:** Rec709-Kodak-Standard oder ARRI-LogC-to-Rec709 falls Daniel-Footage in LogC aufgenommen wurde.
- **Reihenfolge:** Immer FIRST vor jedem anderen Grade.

## Creative LUTs (pro Segment)

### `LOCOS_Premium_Base.cube` — Standard-Base
- **Opacity Empfehlung:** 35–40%
- **Segmente:** col_002 (40%), col_008 (35%), col_010 (38%)
- **Funktion:** LOCOS Signature Look. Leicht erhöhter Kontrast, -5-10% Saturation, warm Gold-Tint auf Highlights, cooler Schatten-Split.
- **Eigenbau:** In Premiere: "Export Look as LUT" aus col_002_context Lumetri-State.

### `LOCOS_Premium_CoolDesaturate.cube` — Cool/Pain Variante
- **Opacity Empfehlung:** 30–38%
- **Segmente:** col_001 (35%), col_003 (30%), col_005 (38%), col_011 (35%)
- **Funktion:** Base + zusätzliche Desaturation + stärkerer Blue-Shift in Shadows (Hue 205–210°). Skin-Tone bleibt geschützt via HSL-Qualifier.
- **Eigenbau:** Aus col_005 Lumetri-State exportieren.

### `LOCOS_Premium_ValleyDeep.cube` — Valley-Extreme Variante
- **Opacity Empfehlung:** 45%
- **Segmente:** col_007 (45%)
- **Funktion:** Tiefste Desaturation (70%), Hue-Sat-Curve drückt alles außer Skin-Tone Richtung Null, deep blue shadows. NIE höher als 50% Opacity weil Skin-Tone sonst kippt.
- **Eigenbau:** Aus col_007 Lumetri-State exportieren.

### `LOCOS_Shock_RedAccent.cube` — SHOCK Peak-Variante
- **Opacity Empfehlung:** 42–45%
- **Segmente:** col_004 (45%), col_006 (42%)
- **Funktion:** Global -8 bis -10% Desaturation + selektiver Rot-Boost (Hue 350–12°) bei gleichzeitigem warm-black Shadow-Lift (Hue 20–22°). Hintergrund zieht Richtung #161514.
- **WICHTIG:** Ersetzt den alten Teal-Orange-Look. KEIN Teal-Orange irgendwo in diesem LUT.
- **Eigenbau:** Aus col_004 Lumetri-State exportieren. Alternativ als Kombi aus LOCOS_Premium_Base + Secondary HSL Qualifier (Red boost) on adjustment layer — das ist flexibler als ein baked LUT.

### `LOCOS_Gold_Payoff.cube` — Resolution-Variante
- **Opacity Empfehlung:** 40%
- **Segmente:** col_009 (40%)
- **Funktion:** Warm Gold Push (Hue 30–38° boosted +10–20%), Exposure +0.12, Halation-friendly Highlights. Stärkster Warm-Frame des Videos.
- **Eigenbau:** Aus col_009 Lumetri-State exportieren.

## LUT-Erstellungs-Workflow

Wenn keine LOCOS-LUTs existieren (Erst-Run):

1. **Daniel-Footage öffnen** in Premiere (clean shot, gute Belichtung)
2. **`LOCOS_Rec709_Neutral.cube`** als Input-LUT setzen (oder auslassen wenn Source bereits Rec.709)
3. **Pro Segment-Typ** die `base_correction` + `creative.adjustments` aus dem jeweiligen Lumetri-Preset-JSON in diese Ordnung applizieren:
   - Basic → Creative → Curves → Color Wheels
4. **Look Export:** `Lumetri Color → Creative → Look → Browse → Save Preset` (alternativ via `File > Export > LUT` in späteren Premiere-Versionen)
5. **LUT-Datei** nach `/Users/dario/ds-motion-graphics/public/luts/locos/` ablegen
6. In jedem Segment-Preset das `creative.look`-Feld auf den neuen LUT-Pfad referenzieren

## Opacity-Regeln (aus D2.5)

- Technical LUT = 100% (Input-Korrektur, nicht verhandelbar)
- Creative LUT = **NIE über 50%** (verliert sonst Original-Material)
- Shock-Red Accent LUT = 42–45% (bei Peaks höher weil kürzer)
- Bei langen Segmenten (col_002, col_007) bleibe bei 35–45%
- Bei Halation/Grain: läuft nach Creative LUT in separaten Layern

## Validierung

Nach LUT-Anwendung MUSS geprüft werden:
1. **Vectorscope:** Skin-Tone auf I-Line 123° ±3°? (alle Segmente außer Peaks)
2. **Waveform:** Kein Clipping >1%? (Luminance)
3. **RGB Parade:** Balance zwischen R/G/B korrekt? Keine massive Blue/Red-Drift in Mitten?
4. **Peak-Check (col_004/006):** Rot-Akzent sichtbar isoliert? Skin-Tone nicht rot überfärbt?
