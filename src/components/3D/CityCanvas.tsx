import React, { useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import {
  CameraController,
  CityGrid,
  BackgroundSkyline,
  TrafficSimulation,
  CybertruckTraffic,
  CyberpunkFlyer,
  NeonRoadGrid,
  StreetLighting,
  SelectiveCityWindows,
  SECTOR_WAYPOINTS
} from './CityScene';
import { MGMCollegeModel } from './MGMCollegeModel';
import { NWCMCBuildingModel } from './NWCMCBuildingModel';

// Preload the essential 3D assets for the city environment
useGLTF.preload('/city-plane.glb');
useGLTF.preload('/background.glb');
useGLTF.preload('/car.glb');
useGLTF.preload('/cyber_truck.glb');
useGLTF.preload('/cyber__punk_flyer.glb');

interface CityCanvasProps {
  scrollProgress: number;
  currentView: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

// Static Shadow Controller:
// Captures shadow map once scene assets load, then disables continuous per-frame
// recalculation of static architectural shadows to save massive GPU cycles.
const StaticShadowController: React.FC = () => {
  const { gl } = useThree();
  const frameCount = useRef(0);

  useFrame(() => {
    if (frameCount.current < 15) {
      gl.shadowMap.needsUpdate = true;
      frameCount.current++;
      if (frameCount.current === 15) {
        gl.shadowMap.autoUpdate = false;
      }
    }
  });

  return null;
};

export const CityCanvas: React.FC<CityCanvasProps> = React.memo(({
  scrollProgress,
  mouseRef
}) => {
  // Base architectural building material: Cool blue-grey / graphite slate with balanced PBR response
  // Using MeshStandardMaterial ensures high rendering performance while reflecting environmental lighting
  const buildingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#5b7085',
      roughness: 0.65,
      metalness: 0.22
    });
  }, []);

  const initialWaypoint = SECTOR_WAYPOINTS[0];

  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas
        dpr={[1, 1.35]}
        camera={{
          position: [initialWaypoint.position.x, initialWaypoint.position.y, initialWaypoint.position.z],
          fov: initialWaypoint.fov,
          near: 0.1,
          far: 210
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        onCreated={({ gl, scene }) => {
          // Atmospheric deep navy/charcoal nighttime background and gentle depth fog
          scene.background = new THREE.Color('#070B12');
          scene.fog = new THREE.Fog('#070B12', 35, 150);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.65;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.shadowMap.autoUpdate = true;
        }}
      >
        {/* Adaptive Quality: Automatically scales DPR if framerate dips */}
        <AdaptiveDpr pixelated={false} />
        <StaticShadowController />

        {/* Environmental Hemisphere Light: Soft cool blue-grey sky illuminating rooftops and walls, slate ground */}
        <hemisphereLight
          args={['#8EB8E0', '#182432', 1.60]}
        />

        {/* Ambient Fill for overall baseline visibility across all shadow zones */}
        <ambientLight intensity={0.85} color="#455B75" />

        {/* Key Directional Moonlight revealing architectural geometry with soft shadows */}
        <directionalLight
          position={[14.0, 18.0, 15.0]}
          intensity={3.2}
          color="#9AC2EC"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={48}
          shadow-camera-left={-16}
          shadow-camera-right={16}
          shadow-camera-top={16}
          shadow-camera-bottom={-16}
          shadow-bias={-0.0002}
        />

        {/* Secondary Soft Fill Directional Light (Zero shadow cost, illuminates opposite building faces) */}
        <directionalLight
          position={[-12.0, 14.0, -10.0]}
          intensity={1.40}
          color="#527296"
        />

        {/* Warm Golden Focus Pool on MGM College Central Portico */}
        <spotLight
          position={[0, 16, 2]}
          angle={0.32}
          penumbra={0.85}
          intensity={420}
          color="#ffd285"
          distance={75}
        />

        {/* Warm Golden Focus Pool on NWCMC Municipal Corporation Centerpiece */}
        <spotLight
          position={[-7.38, 16, 2.8]}
          angle={0.38}
          penumbra={0.80}
          intensity={580}
          color="#FFD185"
          distance={85}
        />

        {/* Dynamic Camera Choreography Across Sectors */}
        <CameraController scrollProgress={scrollProgress} mouseRef={mouseRef} />

        {/* 3D City Layers: City Grid, MGM College, NWCMC Building, Skyline, Traffic, Neon Grid, Streetlights, Windows */}
        <React.Suspense fallback={null}>
          <CityGrid material={buildingMaterial} />
          <NeonRoadGrid />
          <StreetLighting />
          <SelectiveCityWindows />
          <MGMCollegeModel />
          <NWCMCBuildingModel position={[-7.38, 0, 0]} />
          <BackgroundSkyline />
          <TrafficSimulation />
          <CybertruckTraffic />
          <CyberpunkFlyer />
        </React.Suspense>
      </Canvas>
    </div>
  );
});
