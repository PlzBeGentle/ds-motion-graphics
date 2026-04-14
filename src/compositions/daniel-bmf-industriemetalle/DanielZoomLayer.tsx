import React from "react";
import { OffthreadVideo, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";

/**
 * DanielZoomLayer — Applies 19 zoom keyframes from phase-4/edit/zoom-keyframes.json
 * to the Daniel master footage. Creates visual variation without cuts on a
 * single-camera talking-head.
 *
 * Keyframes cover push-in/pull-out/ken-burns/snap/crash/static. Scales 1.0-1.25
 * (under 1.28 1080p pixelation limit). transformOrigin anchored to Daniel's face
 * at "50% 38-45%" — never 50/50 (bauch-zoom looks cheap).
 */

type OriginTuple = [number, number]; // x%, y%

type ZoomSeg = {
  fs: number;
  fe: number;
  start: number;
  end: number;
  origin: OriginTuple;
  easing?: (t: number) => number;
};

const parseOrigin = (s: string): OriginTuple => {
  const m = s.match(/(\d+(?:\.\d+)?)\s*%\s+(\d+(?:\.\d+)?)\s*%/);
  if (!m) return [50, 45];
  return [parseFloat(m[1]), parseFloat(m[2])];
};

// All 19 zooms flattened to {fs, fe, start_scale, end_scale, origin, easing}
// Source: phase-4/edit/zoom-keyframes.json
const ZOOMS: ZoomSeg[] = [
  { fs: 0,     fe: 60,    start: 1.0,  end: 1.12, origin: parseOrigin("50% 45%"), easing: Easing.inOut(Easing.cubic) },
  { fs: 60,    fe: 1159,  start: 1.12, end: 1.12, origin: parseOrigin("50% 43%") },
  { fs: 1159,  fe: 3746,  start: 1.05, end: 1.05, origin: parseOrigin("50% 45%") },
  { fs: 3746,  fe: 3791,  start: 1.05, end: 1.15, origin: parseOrigin("50% 45%"), easing: Easing.out(Easing.cubic) },
  { fs: 3791,  fe: 4470,  start: 1.15, end: 1.15, origin: parseOrigin("50% 45%") },
  { fs: 4470,  fe: 4478,  start: 1.15, end: 1.18, origin: parseOrigin("50% 42%") }, // snap_zoom
  { fs: 4478,  fe: 5820,  start: 1.18, end: 1.18, origin: parseOrigin("50% 42%") },
  { fs: 5820,  fe: 5826,  start: 1.18, end: 1.25, origin: parseOrigin("50% 40%"), easing: Easing.out(Easing.exp) }, // crash_zoom pre-Kobalt
  { fs: 5826,  fe: 6324,  start: 1.25, end: 1.25, origin: parseOrigin("50% 40%") },
  { fs: 6324,  fe: 6344,  start: 1.25, end: 1.10, origin: parseOrigin("50% 38%"), easing: Easing.inOut(Easing.cubic) }, // pull_out
  { fs: 6344,  fe: 8400,  start: 1.10, end: 1.10, origin: parseOrigin("50% 45%") },
  { fs: 8400,  fe: 8700,  start: 1.10, end: 1.15, origin: parseOrigin("50% 45%"), easing: Easing.inOut(Easing.cubic) }, // ken-burns push
  { fs: 8700,  fe: 10872, start: 1.15, end: 1.15, origin: parseOrigin("50% 45%") },
  { fs: 10872, fe: 10880, start: 1.15, end: 1.22, origin: parseOrigin("50% 40%"), easing: Easing.out(Easing.exp) }, // crash_zoom pre-NullEuro
  { fs: 10880, fe: 11205, start: 1.22, end: 1.22, origin: parseOrigin("50% 40%") },
  { fs: 11205, fe: 11225, start: 1.22, end: 1.08, origin: parseOrigin("50% 38%"), easing: Easing.inOut(Easing.cubic) }, // pull_out
  { fs: 11225, fe: 14400, start: 1.08, end: 1.08, origin: parseOrigin("50% 45%") },
  { fs: 14400, fe: 14900, start: 1.08, end: 1.14, origin: parseOrigin("50% 45%"), easing: Easing.inOut(Easing.cubic) }, // ken-burns push
  { fs: 14900, fe: 15117, start: 1.14, end: 1.14, origin: parseOrigin("50% 45%") },
  { fs: 15117, fe: 15300, start: 1.05, end: 1.05, origin: parseOrigin("50% 45%") }, // static drop
  { fs: 15300, fe: 16500, start: 1.05, end: 1.08, origin: parseOrigin("50% 45%"), easing: Easing.inOut(Easing.cubic) }, // warm push
  { fs: 16500, fe: 17079, start: 1.08, end: 1.08, origin: parseOrigin("50% 45%") },
  { fs: 17079, fe: 17643, start: 1.0,  end: 1.08, origin: parseOrigin("55% 55%"), easing: Easing.inOut(Easing.cubic) }, // ken-burns on-asset
  { fs: 17643, fe: 19050, start: 1.08, end: 1.08, origin: parseOrigin("50% 45%") },
  { fs: 19050, fe: 19200, start: 1.06, end: 1.06, origin: parseOrigin("50% 45%") },
  { fs: 19200, fe: 22200, start: 1.05, end: 1.05, origin: parseOrigin("50% 45%") },
  { fs: 22200, fe: 22649, start: 1.05, end: 1.10, origin: parseOrigin("50% 45%"), easing: Easing.inOut(Easing.cubic) }, // slow_push
  { fs: 22649, fe: 22800, start: 1.10, end: 1.10, origin: parseOrigin("50% 42%") }, // static_freeze
];

const findSegment = (frame: number): ZoomSeg => {
  for (const z of ZOOMS) {
    if (frame >= z.fs && frame < z.fe) return z;
  }
  // Default: last-known state
  return ZOOMS[ZOOMS.length - 1];
};

export const DanielZoomLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const seg = findSegment(frame);

  // Interpolate scale within segment
  const scale = interpolate(frame, [seg.fs, seg.fe], [seg.start, seg.end], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: seg.easing,
  });

  // Interpolate transform origin between current and next segment for smoothness
  // (otherwise origin jumps hard at segment boundaries, which looks cheap)
  const idx = ZOOMS.indexOf(seg);
  const nextSeg = idx < ZOOMS.length - 1 ? ZOOMS[idx + 1] : seg;
  const originBlendProgress = interpolate(
    frame,
    [seg.fs, seg.fe],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ox = seg.origin[0] * (1 - originBlendProgress) + nextSeg.origin[0] * originBlendProgress;
  const oy = seg.origin[1] * (1 - originBlendProgress) + nextSeg.origin[1] * originBlendProgress;

  // Subtle breathing micro-drift (0.5% sine, 4s period)
  const breath = 1 + 0.005 * Math.sin(frame * 0.039);
  const finalScale = scale * breath;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${finalScale})`,
          transformOrigin: `${ox}% ${oy}%`,
          willChange: "transform",
        }}
      >
        <OffthreadVideo
          src={staticFile("bmf/daniel-master.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default DanielZoomLayer;
