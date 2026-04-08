Jetzt habe ich genug Material fuer einen umfassenden Forschungsbericht. Hier kommt die Zusammenfassung.

---

# Forschungsbericht: Fortgeschrittene Remotion-Capabilities

## Aktueller Stand im Projekt

Das Projekt `ds-motion-graphics` nutzt bereits Remotion 4.0.435 mit folgenden Paketen:
- `@remotion/three` (React Three Fiber 3D)
- `@remotion/noise` (Perlin/Simplex Noise)
- `@remotion/paths` (SVG-Pfad-Utilities)
- `@remotion/transitions` (Szenen-Uebergaenge)
- `@remotion/light-leaks` (WebGL Licht-Effekte)
- Three.js 0.183 + `@react-three/drei`
- D3-geo fuer Weltkarten

Vorhandene Effekt-Komponenten umfassen ca. 38 Dateien, darunter bereits fortgeschrittene Stuecke wie `GoldParticles` (Partikel-System mit Ambient/Burst-Modi), `GoldBarren3D` (Three.js mit Environment-Lighting + Reflections), `ChromaticAberration` (RGB-Split mit Blend Modes), `NetworkBrain` (generatives Node-Netzwerk), `PathDraw` (SVG-Pfadanimation), `CinematicBackground` (animierte Gradient-Blobs), `GlasPanel` (Glassmorphismus) und `TextReveal` (3 Varianten: scale, blur, split).

---

## 1. Fortgeschrittene Animations-Techniken

### 1.1 Spring-Animationen und physikbasierte Bewegung

**Was Remotion bietet:** Die `spring()`-Funktion ist der zentrale Physik-Primitiv. Statt Dauer definiert man physikalische Eigenschaften.

**Verfuegbare Parameter:**
- `mass` (Standard: 1) -- kleinere Werte = schnellere Animation
- `damping` (Standard: 10) -- hoeher = weniger Bounce
- `stiffness` (Standard: 100) -- beeinflusst Bounciness
- `overshootClamping` (Standard: false) -- verhindert Ueberschwingen
- `durationInFrames` -- streckt die Animation auf exakte Frame-Laenge
- `reverse` -- spielt rueckwaerts ab
- `delay` -- Verzoegerung in Frames

**Was im Projekt noch nicht genutzt wird:**
- `durationInFrames` fuer exakte Laengen-Kontrolle bei Springs
- `overshootClamping` fuer praezise Animationen ohne Ueberschwingen
- Kombination von `spring()` als Easing-Input fuer `interpolate()` mit mehrstufigen Keyframes
- Der Remotion Timing Editor (https://www.remotion.dev/timing-editor) zum visuellen Designen von Kurven

**Konkreter Ansatz fuer Verbesserung:** Die bestehenden Komponenten nutzen Spring korrekt, aber immer mit aehnlichen Konfigurationen (damping 14-25, stiffness 40-140). Differenziertere Configs wuerden visuell mehr Variation bringen -- z.B. sehr steife Springs (stiffness: 300, damping: 8) fuer Impact-Momente oder sehr weiche Springs (stiffness: 20, damping: 5) fuer organische Drift-Bewegungen.

### 1.2 Komplexe Easing-Kurven

**Alle verfuegbaren Easing-Funktionen in Remotion:**
- `Easing.linear`, `Easing.quad`, `Easing.cubic`, `Easing.poly(n)`
- `Easing.sin`, `Easing.circle`, `Easing.exp`
- `Easing.bezier(x1, y1, x2, y2)` -- CSS-aequivalente Bezier-Kurven
- `Easing.bounce` -- Abprall-Effekt
- `Easing.elastic(bounciness)` -- Federnde Oszillation
- `Easing.back(s)` -- Zurueckziehen vor der Bewegung
- `Easing.ease` -- Standard-Traegheit
- Modifikatoren: `Easing.in()`, `Easing.out()`, `Easing.inOut()` zum Kombinieren

**Was das Projekt noch nicht nutzt:** Das Projekt verwendet aktuell fast ausschliesslich `spring()` oder manuelle `Math.sin()`-Berechnungen. Die Easing-Funktionen `bounce`, `elastic`, `back` und vor allem `Easing.bezier()` mit Custom-Kurven fehlen komplett. Insbesondere `Easing.inOut(Easing.elastic(1))` wuerde fuer Aufmerksamkeits-Effekte bei Zahlen-Countern hervorragend funktionieren.

### 1.3 Staggered Animations (Elemente in Sequenz)

**Remotion-Ansatz:** Es gibt keinen eingebauten `stagger()`-Befehl wie in GSAP oder Motion. Stattdessen:

**Pattern 1 -- `<Sequence from={...}>`:**
```tsx
{items.map((item, i) => (
  <Sequence from={baseDelay + i * staggerDelay} key={i}>
    <AnimatedItem data={item} />
  </Sequence>
))}
```

**Pattern 2 -- Spring mit berechnetem Delay:**
```tsx
const value = spring({
  frame: frame - delay - (index * STAGGER_FRAMES),
  fps,
  config: { damping: 14, stiffness: 120 }
});
```

**Pattern 3 -- `<Series>` fuer aufeinanderfolgende Clips** mit automatischer Start/End-Berechnung.

**Bewertung:** Das Projekt nutzt dieses Pattern teilweise (z.B. `spawnDelay` in `GoldParticles`), aber nicht systematisch als wiederverwendbares Pattern. Ein `StaggeredList`-Utility-Component wuerde Arbeit sparen.

### 1.4 SVG Path Animations

**@remotion/paths bietet:**
- `evolvePath(progress, path)` -- zeichnet einen Pfad von unsichtbar bis voll sichtbar. Progress 0 = unsichtbar, 1 = komplett gezeichnet.
- `interpolatePath(value, inputRange, outputRange)` -- morpht zwischen zwei SVG-Pfaden. Kernfunktion fuer Path Morphing.
- `warpPath(path, warpFn)` -- verzerrt Pfad-Koordinaten mit beliebiger Funktion (z.B. Wellen, Noise-basierte Verzerrung)
- `scalePath()`, `translatePath()`, `reversePath()`, `normalizePath()`
- `getLength()`, `getPointAtLength()`, `getTangentAtLength()` -- fuer Punkt-auf-Pfad-Animation (ein Objekt laeuft einem Pfad entlang)
- `getBoundingBox()`, `getSubpaths()`

**Was im Projekt fehlt:**
- `interpolatePath()` wird gar nicht genutzt -- das ist die Killer-Funktion fuer Shape-Morphing (z.B. Kreis morpht zu Stern, Euro-Zeichen morpht zu Dollar-Zeichen)
- `getPointAtLength()` + `getTangentAtLength()` fuer Punkt-Reise-Animationen (ein Dot der einem Pfad folgt -- aktuell in `PathDraw.tsx` nur als TODO kommentiert)
- `warpPath()` fuer dynamische Verzerrungen (z.B. "Wellen-Effekt" auf Text-Pfaden)

### 1.5 3D Transforms und Perspective

**Zwei Wege:**

**Weg 1 -- CSS 3D Transforms (einfacher, schneller):**
- `perspective`, `rotateX/Y/Z`, `translateZ`, `transform-style: preserve-3d`
- Hardware-beschleunigt in allen Browsern
- Ideal fuer: Card-Flips, 3D-Tilt auf Panels, Parallax-Layers
- Limitation: Keine echte 3D-Geometrie, kein Lighting, keine Reflections

**Weg 2 -- @remotion/three + React Three Fiber (volle 3D-Power):**
- `<ThreeCanvas>` synchronisiert mit `useCurrentFrame()`
- Animations muessen deklarativ sein (`useCurrentFrame()` statt `useFrame()`)
- `useVideoTexture()` und `useOffthreadVideoTexture()` fuer Video-als-Textur
- Voll kompatibel mit @react-three/drei (Environment, Lighting, Geometrie, Post-Processing)
- WICHTIG: `<Sequence layout="none">` innerhalb von ThreeCanvas, sonst Fehler
- Rendering erfordert `--gl=angle` (wird automatisch gesetzt fuer SSR)

**Was das Projekt schon nutzt:** `GoldBarren3D.tsx` mit `ThreeCanvas`, Environment-Lighting, MeshPhysicalMaterial (metalness, roughness, reflectivity), MeshReflectorMaterial fuer Spiegelungen. Das ist bereits ein solides Fundament.

**Was noch fehlt:**
- Kamera-Animation (Schwenks, Zooms, Orbit-Bewegungen)
- 3D-Text (Extrudierter Text mit TextGeometry + Custom Font)
- Post-Processing via @react-three/postprocessing (Bloom, Chromatic Aberration, Depth of Field als echte 3D-Effekte)
- Instanced Meshes fuer Partikel-Systeme in 3D

### 1.6 Parallax-Tiefeneffekte

**Implementierungs-Ansatz in Remotion:**
```tsx
const frame = useCurrentFrame();
const layers = [
  { z: 0, speed: 0.5 },   // Hintergrund, langsam
  { z: 1, speed: 1.0 },   // Mittelgrund, normal
  { z: 2, speed: 1.8 },   // Vordergrund, schnell
];

// Jeder Layer bewegt sich mit anderer Geschwindigkeit
const offset = frame * layer.speed;
```
Kombiniert mit `perspective` und `translateZ` auf dem Container entsteht echter 3D-Parallax. Das Projekt nutzt das noch gar nicht -- waere aber besonders fuer Intro-Sequenzen und Szenen-Uebergaenge stark.

### 1.7 Partikel-Systeme

**Aktueller Stand:** `GoldParticles.tsx` ist bereits ein voll funktionales Partikel-System mit ~300 Zeilen. Es nutzt deterministische Pseudo-Random-Seeds, hat Ambient- und Burst-Modus, Schwerkraft-Simulation, Rotation, Twinkle-Opazitaet und Glow-Rings.

**Wie es weitergehen koennte:**

**Level 1 -- CSS-basiert (aktueller Ansatz):** Bis ca. 100 Partikel performant. Reicht fuer goldene Glitzer-Effekte.

**Level 2 -- Canvas 2D:** Fuer 100-1000 Partikel. Man rendert in ein `<canvas>` Element statt in individuelle `<div>`s. In Remotion mit `useRef` und manuellem Canvas-Draw pro Frame moeglich.

**Level 3 -- WebGL/Three.js:** Fuer 1000+ Partikel. Mit `<ThreeCanvas>` und `InstancedMesh` oder `Points` aus Three.js. Tausende Partikel bei 60fps. Die `@remotion/three`-Integration existiert ja bereits.

**Level 4 -- GPU Compute (Shader):** Fuer 10.000+ Partikel. Custom GLSL-Shader mit Positions-Buffer. Theoretisch in Remotion moeglich via Three.js ShaderMaterial, aber extrem komplex.

**Empfehlung:** Level 2 (Canvas) wuerde den groessten Gewinn bringen -- deutlich mehr Partikel bei einfacherer Implementierung als WebGL. Ein generischer `CanvasParticleSystem`-Component mit konfigurierbaren Emittern waere die naechste logische Stufe.

---

## 2. Remotion + Externe Libraries

### 2.1 Framer-Motion-Konzepte in Remotion

**Wichtig:** Framer-Motion selbst kann NICHT direkt in Remotion genutzt werden. Framer-Motion arbeitet zeitbasiert (requestAnimationFrame), Remotion rendert Frame-by-Frame. Aber die Konzepte lassen sich uebertragen:
- `spring` Konfig aus framer-motion laesst sich 1:1 auf Remotion's `spring()` mappen
- `stagger` Pattern manuell mit Delay-Berechnung
- `layoutAnimation` gibt es nicht -- Layout muss manuell interpoliert werden
- `AnimatePresence` (Enter/Exit) via `<Sequence>` + Opacity/Scale

### 2.2 Three.js / React Three Fiber Integration

**Bereits im Projekt:** `@remotion/three` v4.0.435, `@react-three/fiber` 9.5.0, `@react-three/drei` 10.7.7, `three` 0.183.2.

**Was sofort nutzbar waere (ohne neue Dependencies):**
- `@react-three/drei` Utilities: `Text3D`, `Center`, `Float`, `PresentationControls`, `Sparkles`, `Stars`, `Cloud`, `Sky`, `ContactShadows`, `Caustics`
- `@react-three/postprocessing`: Bloom, God Rays, Depth of Field, Vignette, Noise, SSAO (braucht neue Dependency)
- GLTF/GLB Model-Import: Fertige 3D-Modelle (Goldmuenzen, Gebaeude, etc.) via `useGLTF` laden
- Video-als-Textur: Ein Remotion-Video auf eine 3D-Flaeche projizieren

**Offizielles Remotion-Beispiel:** Ein 3D-Handy mit Video-Screen, das sich dreht. Repository: `github.com/remotion-dev/template-three`

### 2.3 Lottie-Animationen in Remotion

**Offizielles Paket:** `@remotion/lottie` (noch nicht im Projekt installiert)

**Funktionsweise:**
- `<Lottie animationData={data} />` rendert Lottie-JSON synchron mit Remotion-Timeline
- Nutzt intern `lottie-web` mit `.goToAndStop()` pro Frame
- Unterstuetzt SVG-, Canvas- und HTML-Renderer
- Laden via `staticFile()` (lokal) oder `fetch()` + `delayRender()` (remote)
- `playbackRate`, `loop`, `direction` konfigurierbar

**Wichtige Limitation:** Lottie-Expressions koennen nicht-deterministisch rendern und Flickering verursachen. Einfache Lottie-Animationen ohne Expressions sind sicher.

**Praktischer Nutzen:** LottieFiles hat tausende kostenlose Animationen (Icons, Loader, Uebergaenge, UI-Elemente). Fuer Motion Graphics Overlays sehr wertvoll -- man muesste nicht jede Icon-Animation von Hand bauen.

### 2.4 SVG-Animation-Libraries

Neben `@remotion/paths` (bereits installiert):
- `flubber` -- SVG Shape Morphing zwischen beliebigen Formen. Funktioniert in Remotion, da es nur Pfad-Strings berechnet.
- `svg-path-properties` -- bereits in `@remotion/paths` enthalten
- `d3-interpolate-path` -- ebenfalls in `@remotion/paths` enthalten

### 2.5 Canvas-basierte Effekte

Canvas funktioniert in Remotion, erfordert aber manuelle Frame-by-Frame-Zeichnung:
```tsx
const canvasRef = useRef<HTMLCanvasElement>(null);
const frame = useCurrentFrame();

useEffect(() => {
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  // Zeichne basierend auf frame-Wert
}, [frame]);
```
**Vorteil:** Deutlich performanter fuer Partikel, Noise-Visualisierungen, oder generative Grafiken als hunderte DOM-Elemente.

---

## 3. Fortgeschrittene visuelle Effekte

### 3.1 Blur / Glassmorphismus

**Bereits vorhanden:** `GlasPanel.tsx` nutzt `backdropFilter: blur(20px)` mit halbtransparentem Hintergrund und Gold-Border.

**Erweiterungsmoeglichkeiten:**
- Animierter Blur-Wert (von `blur(0)` zu `blur(20px)` fuer Reveal-Effekt)
- Nested Glass-Layers mit unterschiedlichen Blur-Staerken fuer Tiefe
- `backdrop-filter: blur() saturate() brightness()` Kombinationen

**Performance-Warnung:** `backdrop-filter` ist GPU-intensiv. Auf Cloud-Rendering ohne GPU extrem langsam. Lokal auf M-Chip Macs kein Problem.

### 3.2 Gradient Mesh Animationen

**Bereits vorhanden:** `CinematicBackground.tsx` nutzt animierte Gradient-Blobs mit `radial-gradient()`.

**Naechste Stufe -- echter Mesh Gradient:**
- SVG `<mesh>` Element mit `<meshgradient>` (noch experimentell in Browsern)
- Alternative: Mehrere uebereinanderliegende `radial-gradient` Layers mit `mix-blend-mode`
- Oder: Canvas-basierter Mesh Gradient mit Bilinear-Interpolation zwischen Farbpunkten

### 3.3 Noise/Grain Overlays programmatisch

**Bereits im Projekt:** `@remotion/noise` ist installiert, `FilmGrain.tsx` existiert.

**Was @remotion/noise bietet:**
- `noise2D(seed, x, y)` -- 2D Simplex Noise
- `noise3D(seed, x, y, z)` -- 3D (z = Frame fuer Animation)
- `noise4D(seed, x, y, z, w)` -- 4D
- Deterministisch: Gleicher Seed + Koordinaten = gleicher Wert
- Offizielles Beispiel: Animiertes Dot-Grid als "Oberflaeche"

**Erweiterungsideen:**
- Noise-gesteuerte Displacement-Map fuer Text-Verzerrung
- Noise als Opacity-Map fuer Reveal-Effekte ("Aufloesung"-Animation)
- Noise-Partikel statt gleichmaessigem Raster fuer organischere Effekte
- Kombiniert mit `warpPath()` fuer noise-verzerrte SVG-Pfade

### 3.4 Blend Modes und Compositing

**Funktioniert in Remotion via CSS:**
- `mix-blend-mode`: screen, multiply, overlay, color-dodge, difference, etc.
- Bereits genutzt in `ChromaticAberration.tsx` (`mix-blend-mode: "screen"`)
- `isolation: isolate` auf Containern fuer kontrollierte Blend-Gruppen

**Nicht genutzte Moeglichkeiten:**
- `color-dodge` fuer intensive Lichteffekte
- `difference` fuer psychedelische Farbinversions-Uebergaenge
- `luminosity` fuer Farbtonwechsel bei gleichbleibender Helligkeit
- Blend Modes auf Video-Layers fuer Duotone-Effekte

### 3.5 Masking und Clipping

**Techniken fuer Remotion:**
- `clip-path: polygon(...)` / `clip-path: circle(...)` -- animierbar mit `interpolate()`
- `clip-path: url(#svgClipId)` -- beliebige SVG-Formen als Clip
- `-webkit-mask-image` fuer Gradient-basierte weiche Masken
- SVG `<clipPath>` mit animierten Pfaden

### 3.6 Video-in-Text Effekt

**Implementierung in Remotion:**
```tsx
<div style={{
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundImage: 'url(...)',  // oder Video via CSS
  fontSize: 120,
  fontWeight: 900,
}}>
  GOLD
</div>
```
Alternativ mit SVG `<clipPath>` + `<text>` als Maske ueber einem `<OffthreadVideo>`. Der Video-Inhalt wird nur durch die Buchstabenform sichtbar.

### 3.7 Split-Screen mit animierten Raendern

**Pattern:**
```tsx
<AbsoluteFill style={{ clipPath: `inset(0 ${100 - splitPosition}% 0 0)` }}>
  <SceneA />
</AbsoluteFill>
<AbsoluteFill style={{ clipPath: `inset(0 0 0 ${splitPosition}%)` }}>
  <SceneB />
</AbsoluteFill>
```
`splitPosition` animiert mit `interpolate()` oder `spring()`. Der Rand kann durch eine SVG-Wellenform oder Diagonal-Clip ersetzt werden.

### 3.8 Liquid/Morphing Transitions

**@remotion/transitions bietet eingebaut:**
- `fade()`, `slide()`, `wipe()`, `flip()`, `clockWipe()`, `iris()`, `cube()`
- `<TransitionSeries>` fuer einfache Verkettung
- `<TransitionSeries.Overlay>` fuer Effekte wie Light Leaks ohne Timeline-Verkuerzung

**Custom Transitions erstellen:**
Jede Transition ist eine Funktion die `TransitionPresentation` zurueckgibt. Man bekommt `presentationProgress` (0-1), `presentationDirection` (entering/exiting) und kann damit beliebige Effekte bauen -- z.B.:
- Circular Reveal (Kreis waechst aus Mitte)
- Noise-basierte Aufloesung (Pixel loesen sich auf)
- SVG-Shape-Wipe (Stern-Form fegt ueber den Bildschirm)

**@remotion/light-leaks:** Bereits installiert. WebGL-basierter Licht-Leck-Effekt mit konfigurierbarem `seed` fuer verschiedene Muster. Ideal als Overlay zwischen Szenen.

### 3.9 Motion Blur

**@remotion/motion-blur bietet zwei Komponenten:**
- `<CameraMotionBlur shutterAngle={180} samples={10}>` -- simuliert echte Kamera-Bewegungsunschaerfe. Rendert mehrere Frames mit Zeitversatz und kombiniert sie.
- `<Trail>` -- erzeugt Nachzieh-Effekt durch Layering vorheriger Frames mit reduzierter Opacity.

**Performance-Impact:** Jeder `samples`-Wert vervielfacht die Render-Arbeit. Bei `samples={10}` wird 10x gerendert pro Frame. Sparsam einsetzen.

---

## 4. Performance-Ueberlegungen

### 4.1 Was ist realistisch renderbar?

**Einfache CSS-Animationen (text, opacity, transform):** 0.05-0.2s pro Frame. Ein 30s Video bei 30fps = 900 Frames = ca. 1-3 Minuten Renderzeit.

**Moderate Effekte (blur, box-shadow, gradients):** 0.2-1s pro Frame. Gleiches Video = ca. 3-15 Minuten.

**Schwere Effekte (Three.js 3D, Canvas Particles, WebGL):** 1-5s pro Frame. Gleiches Video = ca. 15-75 Minuten.

**Extreme (Motion Blur samples=10 + Three.js + Blur):** 5-30s pro Frame. Potenziell Stunden fuer ein kurzes Video.

### 4.2 CSS vs Canvas vs WebGL Tradeoffs

| Methode | Partikel-Limit | Renderzeit | Komplexitaet | GPU noetig? |
|---------|---------------|------------|-------------|-------------|
| CSS/DOM | ~100 | niedrig | gering | Nein |
| SVG | ~200 | niedrig-mittel | gering | Nein |
| Canvas 2D | ~1000 | mittel | mittel | Hilft |
| WebGL/Three.js | ~100.000 | hoch | hoch | Ja |

### 4.3 Konkrete Optimierungs-Tipps

1. **`--concurrency` testen:** `npx remotion benchmark` findet den optimalen Wert fuer die Hardware.
2. **GPU-CSS vermeiden auf Cloud:** `box-shadow`, `backdrop-filter`, `filter: blur()`, `text-shadow` durch vorgerechnete Bilder ersetzen wenn auf Lambda/Cloud gerendert wird.
3. **`useMemo()` aggressiv nutzen:** Besonders bei generierten Daten (Partikel-Positionen, Pfad-Berechnungen).
4. **`React.memo()` fuer Sub-Components:** Wenn ein Child sich nicht jeden Frame aendert.
5. **`freeze()`:** Remotion-eigene Funktion, stoppt Re-Rendering wenn Animation abgeschlossen ist.
6. **JPEG statt PNG:** Ausser Transparenz noetig ist.
7. **`--gl=angle` auf macOS:** Kann Canvas-Rendering massiv beschleunigen, hat aber Memory-Leak bei langen Renders.
8. **`--log=verbose`:** Zeigt die langsamsten Frames, damit man Bottlenecks identifiziert.
9. **`OffthreadVideo` statt `Video`:** Bereits in Docs empfohlen, deutlich performanter.
10. **Aufloesung reduzieren mit `--scale=0.5`:** Fuer Previews und Tests.

---

## 5. State-of-the-Art Remotion-Projekte

### 5.1 Kommerziell erfolgreiche Projekte

- **Submagic** -- AI Shorts Tool. $1M ARR in 3 Monaten, 3+ Mio. User. Nutzt Remotion fuer automatisierte Kurzvideos.
- **Crayo** -- Video Stories Generator. $500k+ Umsatz pro Monat.
- **AIVideo.com** -- $1M ARR in unter einem Jahr. Professionelle AI-generierte Videos.
- **Tweet Hunter / Taplio** -- Social Media Content Tools mit Video-Generierung.

### 5.2 Technisch beeindruckende Projekte

- **wcandillon/remotion-fireship** (GitHub) -- Nachbau des Fireship.io Video-Stils in Remotion. Code-Animationen, Syntax-Highlighting, Diagramme, alles in React.
- **Remotion Template Three** -- 3D-Handy mit drehbarem Video-Screen. Zeigt ThreeCanvas + Video-Textur.
- **Remotion GLB Example** -- Animierte .glb 3D-Modelle in Remotion.
- **Basketball Tracker, Formula 1 Graphics, Football Graphics** -- Sport-Grafiken, in den Remotion-Ressourcen verlinkt.
- **GDG Nantes (Shortvid)** -- Event-Videos mit Speaker-Info automatisch generiert.
- **React Video Editor (RVE)** -- Community-Projekt mit freien Remotion-Effekten und Templates, darunter "3D Layouts & Effects".

### 5.3 Community-Ressourcen

- https://www.remotion.dev/docs/resources -- offizielle Ressourcen-Sammlung
- https://www.remotion.dev/success-stories -- Erfolgsgeschichten
- https://www.reactvideoeditor.com/remotion-templates -- freie Effekte und Templates
- https://github.com/remotion-dev/skills -- Remotion Skills fuer Claude Code (bereits im Projekt)

---

## Zusammenfassung: Was sofort umsetzbar ist vs. was Aufwand braucht

### Sofort umsetzbar (keine neuen Dependencies):

1. **Mehr Easing-Variation** -- `Easing.bounce`, `Easing.elastic`, `Easing.back` in bestehende Komponenten einbauen
2. **interpolatePath()** aus `@remotion/paths` fuer Shape-Morphing
3. **evolvePath()** fuer professionellere Pfad-Zeichnungs-Animationen
4. **CSS 3D Parallax** -- `perspective` + `translateZ` auf Layer-Containern
5. **Video-in-Text** -- `background-clip: text` mit Video-Background
6. **Animierter clip-path** fuer Reveal-Effekte und Split-Screen
7. **@remotion/noise** Nutzung fuer animierte Hintergruende (Dot-Grid aus Docs)
8. **@remotion/light-leaks** als Overlay bei Szenen-Wechseln
9. **Custom Transition Presentations** (z.B. Circular Reveal, Noise Dissolve)
10. **Blend Mode Compositing** -- `color-dodge`, `difference` auf Effekt-Layers

### Braucht neue Dependency (npm install):

1. **@remotion/lottie** + `lottie-web` -- Lottie-Animationen einbinden
2. **@remotion/motion-blur** -- Film-artige Bewegungsunschaerfe (bereits in package.json? Nein -- muesste installiert werden)
3. **@react-three/postprocessing** -- Bloom, God Rays, DOF fuer 3D-Szenen
4. **flubber** -- Robusteres Shape-Morphing als Alternative zu interpolatePath

### Braucht signifikanten Entwicklungsaufwand:

1. **Canvas-basiertes Partikel-System** -- Ersatz/Ergaenzung fuer CSS-basierte GoldParticles
2. **3D-Text mit Extrusion** -- TextGeometry + Custom Font in ThreeCanvas
3. **Kamera-Animationen in 3D** -- Orbit, Schwenk, Zoom
4. **WebGL Shader-Effekte** -- Custom GLSL fuer Liquid-Transitions oder GPU-Partikel
5. **Noise-basierte Dissolve-Transitions** -- Canvas + @remotion/noise

---

## Relevante Dateien im Projekt

- `/Users/dario/ds-motion-graphics/package.json` -- aktuelle Dependencies
- `/Users/dario/ds-motion-graphics/src/components/GoldParticles.tsx` -- bestehendes Partikel-System
- `/Users/dario/ds-motion-graphics/src/components/GoldBarren3D.tsx` -- bestehende Three.js Integration
- `/Users/dario/ds-motion-graphics/src/components/PathDraw.tsx` -- SVG Path Animation (ausbaufaehig)
- `/Users/dario/ds-motion-graphics/src/components/ChromaticAberration.tsx` -- Blend Mode Effekte
- `/Users/dario/ds-motion-graphics/src/components/GlasPanel.tsx` -- Glassmorphismus
- `/Users/dario/ds-motion-graphics/src/components/CinematicBackground.tsx` -- Gradient Blobs
- `/Users/dario/ds-motion-graphics/src/components/TextReveal.tsx` -- Text-Animationen (3 Varianten)
- `/Users/dario/ds-motion-graphics/src/components/NetworkBrain.tsx` -- Generatives Node-Netzwerk
- `/Users/dario/ds-motion-graphics/src/components/FilmGrain.tsx` -- Noise Overlay
- `/Users/dario/ds-motion-graphics/CLAUDE.md` -- Projekt-Kontext und Design-System

Sources:
- [spring() Dokumentation](https://www.remotion.dev/docs/spring)
- [Easing Dokumentation](https://www.remotion.dev/docs/easing)
- [Remotion Timing Editor](https://www.remotion.dev/timing-editor)
- [@remotion/paths Dokumentation](https://www.remotion.dev/docs/paths/)
- [evolvePath()](https://www.remotion.dev/docs/paths/evolve-path)
- [warpPath()](https://www.remotion.dev/docs/paths/warp-path)
- [@remotion/three Dokumentation](https://www.remotion.dev/docs/three)
- [ThreeCanvas](https://www.remotion.dev/docs/three-canvas)
- [Video als Three.js Textur](https://www.remotion.dev/docs/videos/as-threejs-texture)
- [Remotion Three Template](https://www.remotion.dev/templates/three)
- [GLB Example](https://github.com/remotion-dev/glb-example)
- [Performance Tips](https://www.remotion.dev/docs/performance)
- [GPU Nutzung](https://v3.remotion.dev/docs/gpu)
- [@remotion/lottie](https://www.remotion.dev/docs/lottie/)
- [Lottie Component](https://www.remotion.dev/docs/lottie/lottie)
- [@remotion/noise](https://www.remotion.dev/docs/noise)
- [Noise Visualization](https://www.remotion.dev/docs/noise-visualization)
- [noise2D()](https://www.remotion.dev/docs/noise/noise-2d)
- [@remotion/transitions](https://www.remotion.dev/docs/transitions/)
- [Custom Presentations](https://www.remotion.dev/docs/transitions/presentations/custom)
- [wipe()](https://www.remotion.dev/docs/transitions/presentations/wipe)
- [TransitionSeries](https://www.remotion.dev/docs/transitions/transitionseries)
- [@remotion/motion-blur](https://www.remotion.dev/docs/motion-blur)
- [CameraMotionBlur](https://www.remotion.dev/docs/motion-blur/camera-motion-blur)
- [Trail](https://www.remotion.dev/docs/motion-blur/trail)
- [@remotion/light-leaks](https://www.remotion.dev/docs/light-leaks/)
- [LightLeak Component](https://www.remotion.dev/docs/light-leaks/light-leak)
- [Remotion Showcase](https://www.remotion.dev/showcase/)
- [Success Stories](https://www.remotion.dev/success-stories)
- [Resources](https://www.remotion.dev/docs/resources)
- [Remotion Fireship Clone](https://github.com/wcandillon/remotion-fireship)
- [Advanced Animation Techniques Kurs](https://oboe.com/learn/declarative-video-creation-with-remotion-1kbq29c/advanced-animation-techniques-icqyj4)
- [Benchmark CLI](https://www.remotion.dev/docs/cli/benchmark)
- [GL Options](https://www.remotion.dev/docs/gl-options)
- [React Video Editor Templates](https://www.reactvideoeditor.com/remotion-templates)
- [Remotion Skills fuer Claude Code](https://github.com/remotion-dev/skills)