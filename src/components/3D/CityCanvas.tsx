import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  CameraController,
  CityGrid,
  BackgroundSkyline,
  TrafficSimulation,
  SECTOR_WAYPOINTS
} from './CityScene';
import { MGMCollegeModel } from './MGMCollegeModel';
import { NWCMCBuildingModel } from './NWCMCBuildingModel';

// Preload the essential 3D assets for the city environment
useGLTF.preload('/city-plane.glb');
useGLTF.preload('/background.glb');
useGLTF.preload('/car.glb');

interface CityCanvasProps {
  scrollProgress: number;
  currentView: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

export const CityCanvas: React.FC<CityCanvasProps> = ({
  scrollProgress,
  mouseRef
}) => {
  // Base architectural building material matching the reference's sleek charcoal slate
  const buildingMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#6a7b8a',
      roughness: 0.7,
      metalness: 0.5,
      sheen: 1.1,
      sheenColor: '#bdc2c5',
      sheenRoughness: 0.3,
      clearcoat: 0.1,
      clearcoatRoughness: 0.3,
      reflectivity: 0.3
    });
  }, []);

  const initialWaypoint = SECTOR_WAYPOINTS[0];

  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{
          position: [initialWaypoint.position.x, initialWaypoint.position.y, initialWaypoint.position.z],
          fov: initialWaypoint.fov,
          near: 0.1,
          far: 250
        }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color('#0B0F14');
          scene.fog = new THREE.Fog('#0B0F14', 24, 92);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {/* Ambient & Scene Directional Lighting */}
        <ambientLight intensity={1.4} />

        <directionalLight
          position={[13.1, 17.8, 14.6]}
          intensity={3.25}
          color="#9a9a9a"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        <spotLight
          position={[0, 15, 0]}
          angle={0.25}
          penumbra={0.8}
          intensity={520}
          color="#d0d0d0"
          distance={80}
        />

        {/* Dynamic Camera Choreography Across Sectors */}
        <CameraController scrollProgress={scrollProgress} mouseRef={mouseRef} />

        {/* 3D City Layers: City Grid, MGM College, NWCMC Municipal Building, Skyline & Traffic */}
        <React.Suspense fallback={null}>
          <CityGrid material={buildingMaterial} />
          <MGMCollegeModel />
          <NWCMCBuildingModel position={[-7.38, 0, 0]} />
          <BackgroundSkyline />
          <TrafficSimulation />
        </React.Suspense>
      </Canvas>
    </div>
  );
};
