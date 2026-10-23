import React, { useRef, useMemo } from 'react';
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
  // Elevated three-quarter close-up view directly showcasing the Nanded-Waghala
  // City Municipal Corporation building, its iconic curved drum facade, and vertical fins.
  {
    position: new THREE.Vector3(-5.0, 1.9, 3.2),
    target: new THREE.Vector3(-7.38, 0.5, 0.15),
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

    // Apply subtle parallax offset to camera position
    const cameraPosWithMouse = currentPos.current.clone();
    cameraPosWithMouse.x += 0.25 * smoothMouse.current.x;
    cameraPosWithMouse.y += 0.15 * smoothMouse.current.y;

    camera.position.copy(cameraPosWithMouse);
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

// 7x7 Grid of City Blocks — Clears block (3, 3) for MGM College and block (1, 3) for NWCMC
export const CityGrid: React.FC<{ material: THREE.Material }> = ({ material }) => {
  const { scene } = useGLTF('/city-plane.glb');

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

  const gridItems = useMemo(() => {
    if (!meshGeometry) return [];
    meshGeometry.computeBoundingBox();
    const box = meshGeometry.boundingBox;
    if (!box) return [];

    const sizeX = (box.max.x - box.min.x) * 0.8;
    const count = 7;
    const offset = (count * sizeX + (count - 1) * 0.55) / 2 - sizeX / 2;
    const items = [];

    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Clear central block (3, 3) for MGM College and separate block (1, 3) for NWCMC.
        // Block (2, 3) remains between them, creating natural urban separation.
        if ((x === 3 && z === 3) || (x === 1 && z === 3)) {
          continue;
        }

        items.push({
          key: `${x}-${z}`,
          position: [x * (sizeX + 0.55) - offset, 0, z * (sizeX + 0.55) - offset] as [number, number, number]
        });
      }
    }
    return items;
  }, [meshGeometry]);

  if (!meshGeometry) return null;

  return (
    <group>
      {gridItems.map((item) => (
        <mesh
          key={item.key}
          geometry={meshGeometry}
          material={material}
          scale={0.8}
          rotation={[0, Math.PI / 2, 0]}
          position={item.position}
          receiveShadow
        />
      ))}
    </group>
  );
};

// Background Skyline — Preserves node translation [-29.07, 0, 2.20] so it stays
// far on the horizon as a majestic background skyline rather than spawning at (0, 0, 0).
export const BackgroundSkyline: React.FC = () => {
  const { scene } = useGLTF('/background.glb');

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const bgMat = new THREE.MeshStandardMaterial({
      color: '#47585c',
      roughness: 0.92,
      metalness: 0.18
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

// Animated Traffic Simulation along city avenues and campus boulevard
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

  const MAX_CARS = 45;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Road corridors matching exact street grid spacing between blocks
  const cars = useMemo(() => {
    const list = [];
    const avenues = [-9.23, -5.54, -1.85, 1.85, 5.54, 9.23];
    for (let i = 0; i < MAX_CARS; i++) {
      const isXAxis = Math.random() > 0.5;
      const roadCoord = avenues[Math.floor(Math.random() * avenues.length)];
      const dirSign = Math.random() > 0.5 ? 1 : -1;
      const speed = 2.2 + Math.random() * 3.2;

      list.push({
        position: new THREE.Vector3(
          isXAxis ? (Math.random() * 40 - 20) : roadCoord + (dirSign > 0 ? 0.28 : -0.28),
          0.02,
          !isXAxis ? (Math.random() * 40 - 20) : roadCoord + (dirSign > 0 ? 0.28 : -0.28)
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
