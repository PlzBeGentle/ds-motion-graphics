import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from "remotion";
import {ThreeCanvas} from "@remotion/three";
import {PerspectiveCamera, Environment, RoundedBox, Html} from "@react-three/drei";
import * as THREE from "three";

type GlareCard3DProps = {
  title: string;
  subtitle: string;
  fromValue: number;
  toValue: number;
  badgeText: string;
};

const formatNumber = (n: number): string => Math.round(n).toLocaleString("de-DE");

const GlareCard3D: React.FC<GlareCard3DProps> = ({
  title,
  subtitle,
  fromValue,
  toValue,
  badgeText,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Fly-In (Frames 0-28)
  const cardSpring = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 80, mass: 1},
  });
  const entryX = interpolate(cardSpring, [0, 1], [7, 0]);
  const entryScale = interpolate(cardSpring, [0, 1], [0.85, 1]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Permanent oscillation (beginnt bei Frame 0, volle Amplitude ab Frame 28)
  const oscFrame = frame; // nicht clampen — Card wackelt auch waehrend Fly-In
  const period = 220; // 220 Frames = ~7.3s fuer einen vollen X-Cycle @30fps
  const t = oscFrame / period;

  const oscRotX = Math.sin(t * Math.PI * 2) * 0.18;    // ~10° Amplitude (0.18 rad)
  const oscRotY = Math.cos(t * Math.PI * 1.5) * 0.22;  // ~12.6° Amplitude
  const oscRotZ = Math.sin(t * Math.PI * 0.7) * 0.04;  // ~2.3° Amplitude, subtiler roll

  const finalRotation: [number, number, number] = [oscRotX, oscRotY, oscRotZ];
  const finalPosition: [number, number, number] = [entryX, 0, 0];

  // Content Reveal Animations
  const titleOpacity = interpolate(frame, [30, 42], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const titleY = interpolate(frame, [30, 42], [18, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  const subtitleOpacity = interpolate(frame, [40, 54], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const subtitleY = interpolate(frame, [40, 54], [14, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  const numberOpacity = interpolate(frame, [50, 68], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const animatedValue = Math.round(interpolate(frame, [55, 120], [fromValue, toValue], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  }));

  const badgeOpacity = interpolate(frame, [72, 88], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <group position={finalPosition} rotation={finalRotation} scale={entryScale}>
      {/* Main Card */}
      <RoundedBox args={[3.4, 4.2, 0.42]} radius={0.22} smoothness={8}>
        <meshPhysicalMaterial
          color="#0a0f24"
          metalness={0.4}
          roughness={0.45}
          clearcoat={0.6}
          clearcoatRoughness={0.35}
          reflectivity={0.35}
          envMapIntensity={0.5}
          iridescence={0.6}
          iridescenceIOR={1.25}
          iridescenceThicknessRange={[200, 650]}
        />
      </RoundedBox>

      {/* HTML Content */}
      <Html
        position={[0, 0, 0.25]}
        transform
        occlude={false}
        distanceFactor={2.0}
        style={{
          width: 480,
          height: 620,
          pointerEvents: "none",
          opacity: cardOpacity,
        }}
      >
        <div style={{
          width: 480,
          height: 620,
          padding: "46px 42px",
          fontFamily: '"Inter", -apple-system, sans-serif',
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          {/* Title */}
          <div style={{
            fontSize: 22,
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            alignSelf: "flex-start",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textShadow: "0 2px 10px rgba(0,0,0,0.7)",
          }}>
            {title}
          </div>

          {/* Subtitle */}
          <div style={{
            fontSize: 15,
            fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: 6,
            alignSelf: "flex-start",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}>
            {subtitle}
          </div>

          {/* Spacer */}
          <div style={{flex: 1}} />

          {/* Big Number */}
          <div style={{
            fontSize: 120,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            opacity: numberOpacity,
            textShadow: "0 6px 28px rgba(180,120,255,0.55), 0 2px 12px rgba(0,0,0,0.5)",
            textAlign: "center",
          }}>
            {formatNumber(animatedValue)}
          </div>

          {/* Spacer */}
          <div style={{flex: 1}} />

          {/* Badge */}
          <div style={{
            backgroundColor: "rgba(255,255,255,0.14)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            borderRadius: 999,
            padding: "11px 26px",
            fontSize: 15,
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            backdropFilter: "blur(6px)",
            opacity: badgeOpacity,
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}>
            {badgeText}
          </div>
        </div>
      </Html>
    </group>
  );
};

export const DemoSceneGlareCard3D: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: "#040208"}}>
      <ThreeCanvas
        width={1920}
        height={1080}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        <PerspectiveCamera
          makeDefault
          fov={30}
          position={[0, -0.5, 8]}
          rotation={[0.06, 0, 0]}
        />

        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 5, 6]} intensity={0.9} color="#fff5e0" />
        <directionalLight position={[-2, 2, -6]} intensity={0.8} color="#6a4aff" />
        <directionalLight position={[5, -1, -4]} intensity={0.6} color="#ff4aa0" />
        <directionalLight position={[-4, -3, 3]} intensity={0.35} color="#4ad0ff" />
        <Environment preset="night" background={false} />

        <mesh position={[0, 0, -12]}>
          <planeGeometry args={[60, 34]} />
          <meshBasicMaterial color="#050308" />
        </mesh>

        <GlareCard3D
          title="HOLOGRAM"
          subtitle="SERIAL 2027-ΛX"
          fromValue={0}
          toValue={1337}
          badgeText="Limited Edition"
        />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

export default DemoSceneGlareCard3D;
