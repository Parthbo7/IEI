import React, { useMemo } from 'react';
import * as THREE from 'three';

// Procedural texture for the curved municipal signage band
function createNWCMCSignTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#495764';
    ctx.fillRect(0, 0, 1024, 96);

    // Subtle borders
    ctx.strokeStyle = '#38444f';
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, 1020, 92);

    ctx.fillStyle = '#e4ebf0';
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('नांदेड वाघाळा शहर महानगरपालिका, नांदेड', 512, 48);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 4;
  return texture;
}

/**
 * Nanded-Waghala City Municipal Corporation (NWCMC) Building Model
 *
 * Distinctive Architecture based on reference photographs:
 * - Prominent curved / quarter-circle front drum with monumental vertical structural ribs
 * - Tall recessed vertical window bays along the curved upper facade
 * - Ground-floor pilotis colonnade with entrance foyer
 * - Adjoining 4-storey rectangular administrative office wing
 * - Cylindrical service rotunda and gently curved roofline
 * - Muted slate blue-gray materials (#647583, #566573, #7A8996) matching the smart city
 * - Sized to medium building scale (width ~3.1, depth ~2.3, height ~1.2)
 */
export const NWCMCBuildingModel: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, 0, 0]
}) => {
  const materials = useMemo(() => {
    const signTex = createNWCMCSignTexture();

    // 1. Main walls: Muted blue-gray matching city-plane.glb
    const wallMat = new THREE.MeshPhysicalMaterial({
      color: '#647583',
      roughness: 0.7,
      metalness: 0.45,
      reflectivity: 0.25,
      clearcoat: 0.08
    });

    // 2. Secondary curved drum upper section (darker slate)
    const drumUpperMat = new THREE.MeshPhysicalMaterial({
      color: '#566573',
      roughness: 0.65,
      metalness: 0.45
    });

    // 3. Structural vertical ribs & columns
    const ribMat = new THREE.MeshPhysicalMaterial({
      color: '#738392',
      roughness: 0.6,
      metalness: 0.4
    });

    // 4. Dark institutional window glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#1f2a33',
      roughness: 0.25,
      metalness: 0.75,
      reflectivity: 0.6,
      clearcoat: 0.2
    });

    // 5. Roof surface
    const roofMat = new THREE.MeshStandardMaterial({
      color: '#7A8996',
      roughness: 0.85,
      metalness: 0.2
    });

    // 6. Base site plinth
    const plinthMat = new THREE.MeshStandardMaterial({
      color: '#3d4852',
      roughness: 0.85,
      metalness: 0.15
    });

    // 7. Signage band
    const signMat = new THREE.MeshStandardMaterial({
      map: signTex,
      roughness: 0.5,
      metalness: 0.2
    });

    return {
      wallMat,
      drumUpperMat,
      ribMat,
      glassMat,
      roofMat,
      plinthMat,
      signMat
    };
  }, []);

  // Curved drum vertical fins (6 fins across ~135 degree arc)
  const drumFins = useMemo(() => {
    const fins = [];
    const radius = 0.72;
    const startAngle = -0.3;
    const totalAngle = 2.1;
    const count = 7;

    for (let i = 0; i < count; i++) {
      const angle = startAngle + (i / (count - 1)) * totalAngle;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      fins.push({ x, z, angle });
    }
    return fins;
  }, []);

  return (
    <group position={position}>
      {/* ========================================================
          1. COMPACT BLOCK PLINTH (Matches single city block footprint)
      ======================================================== */}
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <boxGeometry args={[3.1, 0.03, 2.3]} />
        <primitive object={materials.plinthMat} />
      </mesh>

      {/* ========================================================
          2. MAIN RECTANGULAR ADMINISTRATIVE WING (Rear Body)
             Width: 2.6, Depth: 1.1, Height: 1.05
      ======================================================== */}
      <group position={[0, 0, -0.45]}>
        {/* Main Body Solid Mass */}
        <mesh position={[0, 0.54, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 1.05, 1.1]} />
          <primitive object={materials.wallMat} />
        </mesh>

        {/* 4 Floors of Horizontal Administrative Windows on the Wing */}
        {[-0.85, 0.85].map((wx, wIdx) => (
          <group key={wIdx} position={[wx, 0, 0.56]}>
            {[0.2, 0.46, 0.72, 0.94].map((y, fIdx) => (
              <mesh key={fIdx} position={[0, y, 0]} castShadow>
                <boxGeometry args={[0.72, 0.14, 0.02]} />
                <primitive object={materials.glassMat} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Roof Parapet on Rectangular Wing */}
        <mesh position={[0, 1.08, 0]} castShadow>
          <boxGeometry args={[2.64, 0.05, 1.14]} />
          <primitive object={materials.roofMat} />
        </mesh>

        {/* Rooftop HVAC / Service Enclosure (from Aerial Photo) */}
        <mesh position={[-0.6, 1.16, 0.1]} castShadow>
          <boxGeometry args={[0.8, 0.12, 0.5]} />
          <primitive object={materials.wallMat} />
        </mesh>
        <mesh position={[0.6, 1.15, 0.1]} castShadow>
          <boxGeometry args={[0.7, 0.1, 0.4]} />
          <primitive object={materials.wallMat} />
        </mesh>
      </group>

      {/* ========================================================
          3. PROMINENT CENTRAL CURVED DRUM / COUNCIL CHAMBER
             Projects forward to +Z with monumental vertical ribs
      ======================================================== */}
      <group position={[0.05, 0, 0.22]}>
        {/* Ground Floor Open Colonnade / Pilotis */}
        <mesh position={[0, 0.17, -0.1]} receiveShadow>
          <cylinderGeometry args={[0.66, 0.66, 0.34, 18, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.glassMat} />
        </mesh>

        {/* Ground Floor Pilotis Columns */}
        {drumFins.map((fin, idx) => (
          <mesh key={`col-${idx}`} position={[fin.x * 0.96, 0.17, fin.z * 0.96]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.34, 8]} />
            <primitive object={materials.ribMat} />
          </mesh>
        ))}

        {/* First Floor Solid Curved Wall */}
        <mesh position={[0, 0.48, -0.1]} castShadow receiveShadow>
          <cylinderGeometry args={[0.69, 0.69, 0.28, 20, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.wallMat} />
        </mesh>

        {/* First Floor Windows */}
        <mesh position={[0, 0.48, -0.09]} castShadow>
          <cylinderGeometry args={[0.70, 0.70, 0.14, 20, 1, false, 0.2, Math.PI]} />
          <primitive object={materials.glassMat} />
        </mesh>

        {/* Curved Signage Fascia Band: NWCMC */}
        <mesh position={[0, 0.66, -0.095]} castShadow>
          <cylinderGeometry args={[0.71, 0.71, 0.1, 20, 1, false, 0.15, Math.PI * 1.05]} />
          <primitive object={materials.signMat} />
        </mesh>

        {/* Upper Floors (2nd & 3rd): Darker Slate Drum Wall */}
        <mesh position={[0, 0.94, -0.1]} castShadow receiveShadow>
          <cylinderGeometry args={[0.70, 0.70, 0.46, 22, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.drumUpperMat} />
        </mesh>

        {/* Recessed Vertical Glass Bays behind the fins */}
        <mesh position={[0, 0.94, -0.092]}>
          <cylinderGeometry args={[0.705, 0.705, 0.38, 22, 1, false, 0.15, Math.PI * 1.05]} />
          <primitive object={materials.glassMat} />
        </mesh>

        {/* Monumental Vertical Curved Fins / Ribs (Signature architectural feature) */}
        {drumFins.map((fin, idx) => (
          <mesh
            key={`rib-${idx}`}
            position={[fin.x, 0.94, fin.z]}
            rotation={[0, -fin.angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.05, 0.48, 0.14]} />
            <primitive object={materials.ribMat} />
          </mesh>
        ))}

        {/* Curved Roof Header & Cornice */}
        <mesh position={[0, 1.20, -0.1]} castShadow>
          <cylinderGeometry args={[0.74, 0.72, 0.06, 22, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.roofMat} />
        </mesh>

        {/* Curved Barrel Roof Dome Cap (from Aerial Photo) */}
        <mesh position={[0, 1.25, -0.12]} rotation={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.68, 16, 12, 0, Math.PI * 1.3, 0, Math.PI * 0.28]} />
          <primitive object={materials.roofMat} />
        </mesh>
      </group>

      {/* ========================================================
          4. ATTACHED CYLINDRICAL ROTUNDA / STAIR TOWER (Left side)
             Distinctive volume seen in reference photo 1
      ======================================================== */}
      <group position={[-1.15, 0, 0.05]}>
        <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.26, 1.16, 16]} />
          <primitive object={materials.wallMat} />
        </mesh>
        {/* Rotunda Window Ring */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.265, 0.265, 0.12, 16]} />
          <primitive object={materials.glassMat} />
        </mesh>
        {/* Rotunda Roof Dome */}
        <mesh position={[0, 1.18, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.04, 16]} />
          <primitive object={materials.roofMat} />
        </mesh>
      </group>

      {/* ========================================================
          5. ENTRANCE FORECOURT & PLAZA (Subtle municipal approach)
      ======================================================== */}
      <mesh position={[0.05, 0.02, 0.88]} receiveShadow>
        <boxGeometry args={[1.2, 0.015, 0.45]} />
        <primitive object={materials.plinthMat} />
      </mesh>
    </group>
  );
};

export default NWCMCBuildingModel;
