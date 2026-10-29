import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MGMCollegeModel } from './MGMCollegeModel';
import { NWCMCBuildingModel } from './NWCMCBuildingModel';

// Sector-specific camera waypoints:
// Stage 1: Metropolitan Overview (0.0)
// Stage 2: MGM College of Engineering (0.33)
// Stage 3: Urban Mobility Corridors (0.67)
// Stage 4: NWCMC Municipal Corporation (1.0)
export const SECTOR_WAYPOINTS = [
  // Sector 01 — Metropolitan Overview (progress = 0.0):
  // High-altitude cinematic drone view showing the whole smart city layout,
  // avenue traffic, and both civic landmarks anchored in the metropolis.
  {
    position: new THREE.Vector3(12.0, 9.5, 13.5),
    target: new THREE.Vector3(0.0, 0.45, 0.1),
    fov: 42
  },
  // Sector 02 — Innovation District / MGM College Hero View (progress = 0.33):
  // Elevated three-quarter view along the avenue corridor directly showcasing
  // MGM's College of Engineering facade, golden signage, portico, and side wings.
  {
    position: new THREE.Vector3(2.5, 1.9, 3.4),
    target: new THREE.Vector3(0.0, 0.45, 0.15),
    fov: 38
  },
  // Sector 03 — Urban Mobility Corridors (progress = 0.67):
  // Perspective framed along the front transit avenue between MGM College and NWCMC,
  // highlighting active intersection traffic while pulling back to reveal city scale.
  {
    position: new THREE.Vector3(-2.8, 3.0, 5.2),
    target: new THREE.Vector3(-3.69, 0.5, 0.2),
    fov: 42
  },
  // Sector 04 — NWCMC Municipal Civic Core (progress = 1.0):
  // Elevated three-quarter perspective showcasing the full Nanded-Waghala
  // City Municipal Corporation building, facade, entrance steps, and surrounding city streets.
  {
    position: new THREE.Vector3(-4.4, 2.3, 4.3),
    target: new THREE.Vector3(-7.38, 0.65, 0.1),
    fov: 38
  }
];

// Smoothstep cubic easing: C(t) = t * t * (3 - 2 * t)
function smoothstep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

interface CameraControllerProps {
  scrollProgress: number; // 0 to 1
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

export const CameraController: React.FC<CameraControllerProps> = ({ scrollProgress, mouseRef }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3());
  const currentTarget = useRef(new THREE.Vector3());
  const smoothMouse = useRef({ x: 0, y: 0 });
  const cameraPosWithMouse = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    // 3-segment continuous cinematic flight:
    // Stage 1 (0.0 -> 0.33): Overview zooms down into MGM College
    // Stage 2 (0.33 -> 0.67): MGM College transitions along Mobility Corridors
    // Stage 3 (0.67 -> 1.0): Mobility Corridors glide into NWCMC Municipal Core
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    let t: number;
    let p0: typeof SECTOR_WAYPOINTS[0];
    let p1: typeof SECTOR_WAYPOINTS[0];

    if (clampedProgress <= 0.33) {
      t = smoothstep(clampedProgress / 0.33);
      p0 = SECTOR_WAYPOINTS[0]; // Overview
      p1 = SECTOR_WAYPOINTS[1]; // MGM College
    } else if (clampedProgress <= 0.67) {
      t = smoothstep((clampedProgress - 0.33) / 0.34);
      p0 = SECTOR_WAYPOINTS[1]; // MGM College
      p1 = SECTOR_WAYPOINTS[2]; // Mobility Corridors
    } else {
      t = smoothstep((clampedProgress - 0.67) / 0.33);
      p0 = SECTOR_WAYPOINTS[2]; // Mobility Corridors
      p1 = SECTOR_WAYPOINTS[3]; // NWCMC Municipal Core
    }

    // Smoothly interpolate position and look-at target
    currentPos.current.copy(p0.position).lerp(p1.position, t);
    currentTarget.current.copy(p0.target).lerp(p1.target, t);

    // Mouse parallax damping
    const mouseFactor = 1 - Math.exp(-6 * delta);
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouseRef.current.x, mouseFactor);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouseRef.current.y, mouseFactor);

    // Apply subtle parallax offset to camera position using preallocated vector (no GC allocations)
    cameraPosWithMouse.current.copy(currentPos.current);
    cameraPosWithMouse.current.x += 0.25 * smoothMouse.current.x;
    cameraPosWithMouse.current.y += 0.15 * smoothMouse.current.y;

    camera.position.copy(cameraPosWithMouse.current);
    camera.lookAt(currentTarget.current);

    // Interpolate FOV
    const currentFov = THREE.MathUtils.lerp(p0.fov, p1.fov, t);
    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - currentFov) > 0.05) {
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

// 7x7 Grid of City Blocks — Rendered as a single InstancedMesh (1 draw call instead of 47)
// Clears block (3, 3) for MGM College and block (1, 3) for NWCMC
export const CityGrid: React.FC<{ material: THREE.Material }> = ({ material }) => {
  const { scene } = useGLTF('/city-plane.glb');
  const instancedRef = useRef<THREE.InstancedMesh>(null);

  // Extract base mesh geometry
  const meshGeometry = useMemo(() => {
    let geo: THREE.BufferGeometry | null = null;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !geo) {
        geo = (child as THREE.Mesh).geometry;
      }
    });

    return geo;
  }, [scene]);

  const gridPositions = useMemo(() => {
    if (!meshGeometry) return [];
    meshGeometry.computeBoundingBox();
    const box = meshGeometry.boundingBox;
    if (!box) return [];

    const sizeX = (box.max.x - box.min.x) * 0.8;
    const count = 7;
    const offset = (count * sizeX + (count - 1) * 0.55) / 2 - sizeX / 2;
    const positions: [number, number, number][] = [];

    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Clear central block (3, 3) for MGM College and separate block (1, 3) for NWCMC.
        // Block (2, 3) remains between them, creating natural urban separation.
        if ((x === 3 && z === 3) || (x === 1 && z === 3)) {
          continue;
        }

        positions.push([x * (sizeX + 0.55) - offset, 0, z * (sizeX + 0.55) - offset]);
      }
    }
    return positions;
  }, [meshGeometry]);

  useLayoutEffect(() => {
    if (!instancedRef.current || !meshGeometry || gridPositions.length === 0) return;
    const dummy = new THREE.Object3D();
    dummy.scale.set(0.8, 0.8, 0.8);
    dummy.rotation.set(0, Math.PI / 2, 0);

    gridPositions.forEach((pos, idx) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      dummy.updateMatrix();
      instancedRef.current!.setMatrixAt(idx, dummy.matrix);
    });
    instancedRef.current.instanceMatrix.needsUpdate = true;
    instancedRef.current.computeBoundingSphere();
  }, [gridPositions, meshGeometry]);

  if (!meshGeometry || gridPositions.length === 0) return null;

  return (
    <instancedMesh
      ref={instancedRef}
      args={[meshGeometry, material, gridPositions.length]}
      receiveShadow
      frustumCulled={false}
    />
  );
};

// Background Skyline — Preserves node translation [-29.07, 0, 2.20] so it stays
// far on the horizon as a majestic background skyline rather than spawning at (0, 0, 0).
export const BackgroundSkyline: React.FC = () => {
  const { scene } = useGLTF('/background.glb');

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const bgMat = new THREE.MeshStandardMaterial({
      color: '#4c6175',
      roughness: 0.82,
      metalness: 0.22
    });
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.receiveShadow = false;
        mesh.castShadow = false;
        mesh.material = bgMat;
      }
    });
    return clone;
  }, [scene]);

  // Position offset [-1.4, 0, 0] combined with internal node translation [-29.07, 0, 2.20]
  // positions the background skyline at x: -30.47, creating a distant scenic horizon.
  return <primitive object={clonedScene} position={[-1.4, 0, 0]} />;
};

// Animated Traffic Simulation along city avenues — Reduced by ~68% for a clean, premium city
export const TrafficSimulation: React.FC = () => {
  const { scene } = useGLTF('/car.glb');
  const instancedRef = useRef<THREE.InstancedMesh>(null);

  const carGeometry = useMemo(() => {
    let geo: THREE.BufferGeometry | null = null;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !geo) {
        geo = (child as THREE.Mesh).geometry;
      }
    });
    return geo;
  }, [scene]);

  const carMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#7e8d91',
      roughness: 0.5,
      metalness: 0.4
    });
  }, []);

  // Noticeable 68% reduction from 45 cars down to 14 strategically spaced vehicles
  const MAX_CARS = 14;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Road corridors matching exact street grid spacing between blocks
  const cars = useMemo(() => {
    const list = [];
    const avenues = [-9.23, -5.54, -1.85, 1.85, 5.54, 9.23];
    for (let i = 0; i < MAX_CARS; i++) {
      const isXAxis = i % 2 === 0;
      const avenueIdx = Math.floor(i / 2) % avenues.length;
      const roadCoord = avenues[avenueIdx];
      const dirSign = (i % 4 < 2) ? 1 : -1;
      const speed = 1.9 + (i % 3) * 0.35;
      const initialPos = -18 + ((i * 5.8) % 36);

      list.push({
        position: new THREE.Vector3(
          isXAxis ? initialPos : roadCoord + (dirSign > 0 ? 0.28 : -0.28),
          0.02,
          !isXAxis ? initialPos : roadCoord + (dirSign > 0 ? 0.28 : -0.28)
        ),
        direction: new THREE.Vector3(isXAxis ? dirSign : 0, 0, !isXAxis ? dirSign : 0),
        speed: speed,
        baseSpeed: speed,
        isXAxis
      });
    }
    return list;
  }, []);

  useFrame((_, delta) => {
    if (!instancedRef.current) return;

    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];
      car.position.x += car.direction.x * car.speed * delta;
      car.position.z += car.direction.z * car.speed * delta;

      // Wrap around grid boundaries
      if (car.position.x > 22) car.position.x = -22;
      if (car.position.x < -22) car.position.x = 22;
      if (car.position.z > 22) car.position.z = -22;
      if (car.position.z < -22) car.position.z = 22;

      dummy.position.copy(car.position);
      dummy.scale.set(0.65, 0.65, 0.65);

      // Orientation
      if (car.direction.x > 0) dummy.rotation.set(0, Math.PI / 2, 0);
      else if (car.direction.x < 0) dummy.rotation.set(0, -Math.PI / 2, 0);
      else if (car.direction.z > 0) dummy.rotation.set(0, 0, 0);
      else dummy.rotation.set(0, Math.PI, 0);

      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    }

    instancedRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!carGeometry) return null;

  return (
    <instancedMesh
      ref={instancedRef}
      args={[carGeometry, carMaterial, MAX_CARS]}
    />
  );
};

// Neon Road Lighting System — Adds cybernetic neon-lime, cyan, and cool-white road boundary strips
// Balanced emissive intensity creates sharp futuristic lines without blinding the camera or drowning city buildings
export const NeonRoadGrid: React.FC = () => {
  const neonLimeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#a3e635',
    emissive: '#84cc16',
    emissiveIntensity: 1.25,
    roughness: 0.2,
    metalness: 0.1
  }), []);

  const neonCyanMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#38bdf8',
    emissive: '#0ea5e9',
    emissiveIntensity: 1.15,
    roughness: 0.2,
    metalness: 0.1
  }), []);

  const neonWhiteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e2e8f0',
    emissive: '#94a3b8',
    emissiveIntensity: 1.05,
    roughness: 0.2,
    metalness: 0.1
  }), []);

  const xAvenueGeo = useMemo(() => new THREE.BoxGeometry(38, 0.006, 0.022), []);
  const zAvenueGeo = useMemo(() => new THREE.BoxGeometry(0.022, 0.006, 38), []);
  const curbCenterGeo = useMemo(() => new THREE.BoxGeometry(3.2, 0.008, 0.026), []);
  const curbSideGeo = useMemo(() => new THREE.BoxGeometry(0.026, 0.008, 0.9), []);

  const avenues = useMemo(() => [-9.23, -5.54, -1.85, 1.85, 5.54, 9.23], []);

  return (
    <group position={[0, 0.022, 0]}>
      {/* Longitudinal Avenue Boundary Lines along X */}
      {avenues.map((zCoord, idx) => (
        <group key={`x-ave-${idx}`}>
          {/* North Road Edge */}
          <mesh position={[0, 0, zCoord - 0.42]} geometry={xAvenueGeo} material={idx % 3 === 0 ? neonCyanMat : (idx % 2 === 0 ? neonWhiteMat : neonLimeMat)} />
          {/* South Road Edge */}
          <mesh position={[0, 0, zCoord + 0.42]} geometry={xAvenueGeo} material={neonLimeMat} />
        </group>
      ))}

      {/* Cross Avenue Boundary Lines along Z */}
      {avenues.map((xCoord, idx) => (
        <group key={`z-ave-${idx}`}>
          {/* West Road Edge */}
          <mesh position={[xCoord - 0.42, 0, 0]} geometry={zAvenueGeo} material={neonLimeMat} />
          {/* East Road Edge */}
          <mesh position={[xCoord + 0.42, 0, 0]} geometry={zAvenueGeo} material={idx % 2 === 0 ? neonCyanMat : neonLimeMat} />
        </group>
      ))}

      {/* Prominent MGM Campus Front Boulevard Curb Return Highlight (Z = 1.85) */}
      <group position={[0, 0.002, 1.35]}>
        {/* Continuous neon-lime curb line framing the front trees and sidewalk */}
        <mesh position={[0, 0, 0]} geometry={curbCenterGeo} material={neonLimeMat} />
        {/* Left curb return */}
        <mesh position={[-1.6, 0, -0.45]} geometry={curbSideGeo} material={neonLimeMat} />
        {/* Right curb return */}
        <mesh position={[1.6, 0, -0.45]} geometry={curbSideGeo} material={neonLimeMat} />
      </group>
    </group>
  );
};

// Street Lighting Posts with warm golden/amber pools of light
export const StreetLighting: React.FC = () => {
  const poleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a2228',
    roughness: 0.5,
    metalness: 0.8
  }), []);

  const lampGlowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ffcf55',
    emissive: '#ffaa22',
    emissiveIntensity: 2.2,
    roughness: 0.1,
    metalness: 0.1
  }), []);

  const poleGeo = useMemo(() => new THREE.CylinderGeometry(0.012, 0.016, 0.40, 6), []);
  const bracketGeo = useMemo(() => new THREE.BoxGeometry(0.014, 0.014, 0.09), []);
  const lampHeadGeo = useMemo(() => new THREE.BoxGeometry(0.032, 0.016, 0.038), []);

  // Streetlamp coordinates along the central boulevard, intersections, and NWCMC approach
  const lampPositions: [number, number, number][] = useMemo(() => [
    // MGM College Avenue
    [-2.2, 0, 1.38],
    [-0.75, 0, 1.38],
    [0.75, 0, 1.38],
    [2.2, 0, 1.38],
    [-2.2, 0, 2.32],
    [-0.75, 0, 2.32],
    [0.75, 0, 2.32],
    [2.2, 0, 2.32],
    [-1.85, 0, -0.7],
    [-1.85, 0, 0.7],
    [1.85, 0, -0.7],
    [1.85, 0, 0.7],
    // NWCMC Municipal Approach Avenue
    [-8.6, 0, 1.38],
    [-7.38, 0, 1.38],
    [-6.1, 0, 1.38],
    [-8.6, 0, 2.32],
    [-7.38, 0, 2.32],
    [-6.1, 0, 2.32],
    [-9.2, 0, 0.7],
    [-5.5, 0, 0.7]
  ], []);

  return (
    <group>
      {lampPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          {/* Slender Vertical Metal Pole */}
          <mesh position={[0, 0.20, 0]} geometry={poleGeo} material={poleMat} />
          {/* Angled Overhang Bracket */}
          <mesh position={[0, 0.41, 0.04]} geometry={bracketGeo} material={poleMat} />
          {/* Glowing Amber Luminaire Lamp Head */}
          <mesh position={[0, 0.395, 0.08]} geometry={lampHeadGeo} material={lampGlowMat} />
        </group>
      ))}

      {/* Strategic Avenue Warm Ambient Accent Lights */}
      <pointLight position={[0, 1.2, 1.85]} color="#ffcf66" intensity={2.0} distance={6.5} decay={2} />
      <pointLight position={[0, 1.2, -0.7]} color="#ffcf66" intensity={1.6} distance={5.5} decay={2} />
      {/* NWCMC Municipal Avenue Warm Ambient Accent */}
      <pointLight position={[-7.38, 1.2, 1.85]} color="#ffcf66" intensity={2.4} distance={7.0} decay={2} />
    </group>
  );
};

// Selective Illuminated Windows across surrounding city buildings
// Emissive materials simulate vibrant nocturnal activity without any dynamic light costs
export const SelectiveCityWindows: React.FC = () => {
  const warmMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ffc848',
    emissive: '#f59e0b',
    emissiveIntensity: 2.1,
    roughness: 0.2,
    metalness: 0.1
  }), []);

  const softAmberMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#fde047',
    emissive: '#d97706',
    emissiveIntensity: 1.7,
    roughness: 0.2,
    metalness: 0.1
  }), []);

  const coolMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e0f2fe',
    emissive: '#38bdf8',
    emissiveIntensity: 1.35,
    roughness: 0.2,
    metalness: 0.1
  }), []);

  // Carefully positioned window strips flush on building facades across neighboring city blocks
  // Building A (Skyscraper): local [-0.22, y, -0.60] (South face) & [0.04, y, -0.85] (East face)
  // Building B (Mid-rise):   local [0.40, y, 0.58] (South face) & [0.16, y, 0.35] (West face)
  const windowPanels = useMemo(() => [
    // --- East Block [3.69, 0, 0] ---
    // Building A South facade
    { pos: [3.69 - 0.22, 0.75, 0 - 0.60], size: [0.32, 0.13, 0.015], mat: warmMat },
    { pos: [3.69 - 0.22, 0.95, 0 - 0.60], size: [0.32, 0.13, 0.015], mat: softAmberMat },
    // Building B West facade (facing MGM College)
    { pos: [3.69 + 0.16, 0.52, 0 + 0.35], size: [0.015, 0.13, 0.28], mat: coolMat },
    { pos: [3.69 + 0.16, 0.72, 0 + 0.35], size: [0.015, 0.13, 0.28], mat: warmMat },
    // Building B South facade
    { pos: [3.69 + 0.40, 0.62, 0 + 0.58], size: [0.28, 0.13, 0.015], mat: softAmberMat },

    // --- West Block [-3.69, 0, 0] (between MGM and NWCMC) ---
    // Building A South facade
    { pos: [-3.69 - 0.22, 0.68, 0 - 0.60], size: [0.32, 0.13, 0.015], mat: warmMat },
    { pos: [-3.69 - 0.22, 0.90, 0 - 0.60], size: [0.32, 0.13, 0.015], mat: softAmberMat },
    // Building B South facade
    { pos: [-3.69 + 0.40, 0.55, 0 + 0.58], size: [0.28, 0.13, 0.015], mat: coolMat },
    { pos: [-3.69 + 0.40, 0.75, 0 + 0.58], size: [0.28, 0.13, 0.015], mat: warmMat },

    // --- South Block [0, 0, 3.69] across front transit avenue ---
    // Building A South facade
    { pos: [0 - 0.22, 0.70, 3.69 - 0.60], size: [0.32, 0.13, 0.015], mat: warmMat },
    { pos: [0 - 0.22, 0.92, 3.69 - 0.60], size: [0.32, 0.13, 0.015], mat: softAmberMat },
    // Building B South facade
    { pos: [0 + 0.40, 0.58, 3.69 + 0.58], size: [0.28, 0.13, 0.015], mat: coolMat },
    { pos: [0 + 0.40, 0.78, 3.69 + 0.58], size: [0.28, 0.13, 0.015], mat: warmMat },

    // --- North Block [0, 0, -3.69] behind campus ---
    // Building A South facade (facing toward campus back)
    { pos: [0 - 0.22, 0.65, -3.69 - 0.60], size: [0.32, 0.13, 0.015], mat: softAmberMat },
    { pos: [0 - 0.22, 0.88, -3.69 - 0.60], size: [0.32, 0.13, 0.015], mat: warmMat },

    // --- Southeast Block [3.69, 0, 3.69] ---
    { pos: [3.69 - 0.22, 0.72, 3.69 - 0.60], size: [0.30, 0.13, 0.015], mat: warmMat },
    { pos: [3.69 + 0.40, 0.60, 3.69 + 0.58], size: [0.28, 0.13, 0.015], mat: softAmberMat },

    // --- Southwest Block [-3.69, 0, 3.69] ---
    { pos: [-3.69 - 0.22, 0.75, 3.69 - 0.60], size: [0.30, 0.13, 0.015], mat: softAmberMat },
    { pos: [-3.69 + 0.40, 0.62, 3.69 + 0.58], size: [0.28, 0.13, 0.015], mat: warmMat },

    // --- Northeast Block [3.69, 0, -3.69] ---
    { pos: [3.69 - 0.22, 0.80, -3.69 - 0.60], size: [0.30, 0.13, 0.015], mat: warmMat },

    // --- Northwest Block [-3.69, 0, -3.69] ---
    { pos: [-3.69 - 0.22, 0.80, -3.69 - 0.60], size: [0.30, 0.13, 0.015], mat: softAmberMat },

    // --- Subdued Midground Accents ---
    { pos: [7.38 - 0.22, 0.85, 0 - 0.60], size: [0.28, 0.12, 0.015], mat: softAmberMat },
    { pos: [7.38 + 0.40, 0.65, 3.69 + 0.58], size: [0.26, 0.12, 0.015], mat: coolMat },
    { pos: [0 - 0.22, 0.90, 7.38 - 0.60], size: [0.28, 0.12, 0.015], mat: warmMat },
    { pos: [-7.38 - 0.22, 0.85, 3.69 - 0.60], size: [0.26, 0.12, 0.015], mat: softAmberMat }
  ], [warmMat, softAmberMat, coolMat]);

  return (
    <group>
      {windowPanels.map((p, idx) => (
        <mesh key={idx} position={p.pos as [number, number, number]}>
          <boxGeometry args={p.size as [number, number, number]} />
          <primitive object={p.mat} />
        </mesh>
      ))}
    </group>
  );
};

// Futuristic Cybertruck Traffic — Distinctive high-tech ground vehicles with models preserved, headlights removed
export const CybertruckTraffic: React.FC = () => {
  const { scene } = useGLTF('/cyber_truck.glb');

  // Clone two distinct truck scenes with shadows optimized (moving vehicles don't force shadow recalculations)
  const truckScene1 = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  const truckScene2 = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  const truck1Ref = useRef<THREE.Group>(null);
  const truck2Ref = useRef<THREE.Group>(null);

  const truck1Pos = useRef(new THREE.Vector3(-10.0, 0.02, 1.85 + 0.28));
  const truck2Pos = useRef(new THREE.Vector3(-5.54 - 0.28, 0.02, -14.0));

  useFrame((_, delta) => {
    // Truck 1: Moves along +X on the central transit boulevard
    truck1Pos.current.x += 2.1 * delta;
    if (truck1Pos.current.x > 22) truck1Pos.current.x = -22;

    if (truck1Ref.current) {
      truck1Ref.current.position.copy(truck1Pos.current);
    }

    // Truck 2: Moves along +Z on the western avenue corridor
    truck2Pos.current.z += 2.3 * delta;
    if (truck2Pos.current.z > 22) truck2Pos.current.z = -22;

    if (truck2Ref.current) {
      truck2Ref.current.position.copy(truck2Pos.current);
    }
  });

  // Scale: 0.00035 uniform scale across all 3 axes preserves exact dimensions & details
  const scale: [number, number, number] = [0.00035, 0.00035, 0.00035];
  // Pivot offset aligns truck wheels perfectly with the road surface at y=0
  const pivotOffset: [number, number, number] = [-491.36, -88.94, 61.78];

  return (
    <group>
      {/* Cybertruck 1: Moving in +X direction (rotY = Math.PI) */}
      <group
        ref={truck1Ref}
        position={[truck1Pos.current.x, truck1Pos.current.y, truck1Pos.current.z]}
        rotation={[0, Math.PI, 0]}
        scale={scale}
      >
        <primitive object={truckScene1} position={pivotOffset} />
      </group>

      {/* Cybertruck 2: Moving in +Z direction (rotY = Math.PI / 2) */}
      <group
        ref={truck2Ref}
        position={[truck2Pos.current.x, truck2Pos.current.y, truck2Pos.current.z]}
        rotation={[0, Math.PI / 2, 0]}
        scale={scale}
      >
        <primitive object={truckScene2} position={pivotOffset} />
      </group>
    </group>
  );
};

// Futuristic Cyberpunk Flyer — High-altitude aerial patrol vehicle with flight animations preserved
export const CyberpunkFlyer: React.FC = () => {
  const { scene } = useGLTF('/cyber__punk_flyer.glb');
  const flyerRef = useRef<THREE.Group>(null);

  const flyerScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
    return clone;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!flyerRef.current) return;

    // Smooth aerial circuit patrolling strictly along the eastern open skyway corridor
    const t = clock.getElapsedTime() * 0.20;

    const radiusX = 2.4;
    const radiusZ = 3.6;
    const centerX = 8.6;
    const centerZ = 4.0;

    const x = centerX + Math.cos(t) * radiusX;
    const z = centerZ + Math.sin(t) * radiusZ;
    const y = 3.2 + Math.sin(t * 2.0) * 0.14;

    // Heading calculation: tangent vector
    const dx = -Math.sin(t) * radiusX;
    const dz = Math.cos(t) * radiusZ;
    const heading = Math.atan2(-dz, dx);

    // Subtle aerodynamic banking roll and pitch
    const roll = -Math.sin(t) * 0.12;
    const pitch = Math.cos(t * 2.0) * 0.035;

    flyerRef.current.position.set(x, y, z);
    flyerRef.current.rotation.set(pitch, heading, roll);
  });

  // Scale: 0.021 uniform scale preserves flyer proportions and high fidelity detail
  const scale: [number, number, number] = [0.021, 0.021, 0.021];
  // Centering offset inside group
  const pivotOffset: [number, number, number] = [7.48, -10.54, -7.02];

  return (
    <group ref={flyerRef} scale={scale}>
      <primitive object={flyerScene} position={pivotOffset} />
    </group>
  );
};
