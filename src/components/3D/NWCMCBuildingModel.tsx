import React, { useMemo } from 'react';
import * as THREE from 'three';

// High-resolution procedural texture for the illuminated municipal signage band
function createNWCMCSignTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Dark architectural fascia background
    ctx.fillStyle = '#0D141C';
    ctx.fillRect(0, 0, 1024, 200);

    // Subtle brushed metallic border
    ctx.strokeStyle = '#273442';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 1012, 188);

    // Golden illuminated typography matching target reference
    ctx.shadowColor = '#FFBA35';
    ctx.shadowBlur = 14;

    // Line 1: SMART
    ctx.fillStyle = '#FFD566';
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SMART', 512, 45);

    // Line 2: CITY INNOVATION
    ctx.fillStyle = '#FFEAA0';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.fillText('CITY INNOVATION', 512, 100);

    // Line 3: HACKATHON 2026
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#C6FF35';
    ctx.font = '700 28px "Space Grotesk", sans-serif';
    ctx.fillText('HACKATHON 2026', 512, 155);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  return texture;
}

/**
 * Enhanced Nanded-Waghala City Municipal Corporation (NWCMC) Building Model
 *
 * Recreated to match the reference visualization:
 * - Refined sandstone/limestone architectural facade with warm tones (#DCD7CB, #EAE6DC)
 * - Grand curved colonnade drum with prominent vertical structural fins & cornice
 * - Illuminated golden signage band ("नांदेड महानगरपालिका / NANDED WAGHALA CITY MUNICIPAL CORPORATION")
 * - Grand circular tiered entrance steps with warm foyer illumination
 * - Warm interior window glows combined with realistic reflective glazing
 * - Rooftop terrace garden, landscaped planters, and plaza approach
 * - Integrated warm architectural spotlights and entrance up-lights
 */
export const NWCMCBuildingModel: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, 0, 0]
}) => {
  const materials = useMemo(() => {
    const signTex = createNWCMCSignTexture();

    // 1. Main architectural facade: Warm contemporary sandstone / light travertine
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#E0DCD2',
      roughness: 0.55,
      metalness: 0.15
    });

    // 2. Vertical structural columns, entrance pillars & decorative fins (brighter limestone)
    const columnMat = new THREE.MeshStandardMaterial({
      color: '#F5EFE6',
      roughness: 0.45,
      metalness: 0.12
    });

    // 3. Contrast slate accents for cornices and mullions
    const slateAccentMat = new THREE.MeshStandardMaterial({
      color: '#2C3642',
      roughness: 0.65,
      metalness: 0.35
    });

    // 4. Realistic reflective architectural glass
    const glassMat = new THREE.MeshStandardMaterial({
      color: '#16222D',
      roughness: 0.15,
      metalness: 0.85
    });

    // 5. Warm golden interior office and foyer illumination (vibrant cinematic glow)
    const warmInteriorMat = new THREE.MeshStandardMaterial({
      color: '#FFF0B8',
      emissive: '#FFAE1A',
      emissiveIntensity: 4.8,
      roughness: 0.15,
      metalness: 0.1
    });

    // 6. Deep amber warm glass for upper executive offices
    const amberGlassMat = new THREE.MeshStandardMaterial({
      color: '#FFE29A',
      emissive: '#FF9400',
      emissiveIntensity: 3.8,
      roughness: 0.2,
      metalness: 0.1
    });

    // 7. Roof deck & parapet material
    const roofMat = new THREE.MeshStandardMaterial({
      color: '#6E7882',
      roughness: 0.8,
      metalness: 0.2
    });

    // 8. Landscape greenery / rooftop planter hedges (vibrant smart-city green)
    const foliageMat = new THREE.MeshStandardMaterial({
      color: '#2E7D32',
      roughness: 0.65,
      metalness: 0.05,
      emissive: '#1B5E20',
      emissiveIntensity: 0.35
    });

    // 9. Base plaza & stepped podium
    const plazaMat = new THREE.MeshStandardMaterial({
      color: '#464F58',
      roughness: 0.75,
      metalness: 0.25
    });

    // 10. Illuminated signage material with emissive backing
    const signMat = new THREE.MeshStandardMaterial({
      map: signTex,
      roughness: 0.3,
      metalness: 0.2,
      emissive: '#FFC857',
      emissiveIntensity: 1.4,
      emissiveMap: signTex
    });

    // 11. Warm exterior entrance uplight emissive lens
    const lampGlowMat = new THREE.MeshStandardMaterial({
      color: '#FFF2C6',
      emissive: '#FFAE1A',
      emissiveIntensity: 5.5,
      roughness: 0.1
    });

    // 12. Futuristic Neon Lime Architectural Accent Strips
    const neonLimeMat = new THREE.MeshStandardMaterial({
      color: '#C6FF35',
      emissive: '#C6FF35',
      emissiveIntensity: 2.8,
      roughness: 0.2,
      metalness: 0.1
    });

    return {
      wallMat,
      columnMat,
      slateAccentMat,
      glassMat,
      warmInteriorMat,
      amberGlassMat,
      roofMat,
      foliageMat,
      plazaMat,
      signMat,
      lampGlowMat,
      neonLimeMat
    };
  }, []);

  // Vertical structural fins array along the 140-degree front drum arc
  const drumFins = useMemo(() => {
    const fins = [];
    const radius = 0.88;
    const startAngle = -0.32;
    const totalAngle = 2.25;
    const count = 9;

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
          1. SITE PLAZA & APPROACH PAVEMENT
      ======================================================== */}
      {/* Main Base Plinth */}
      <mesh position={[0, 0.02, 0.1]} receiveShadow>
        <boxGeometry args={[3.8, 0.04, 3.0]} />
        <primitive object={materials.plazaMat} />
      </mesh>

      {/* Perimeter Curb Line */}
      <mesh position={[0, 0.035, 1.58]}>
        <boxGeometry args={[3.76, 0.02, 0.04]} />
        <primitive object={materials.slateAccentMat} />
      </mesh>

      {/* ========================================================
          2. GRAND CIRCULAR TIERED ENTRANCE STEPS
      ======================================================== */}
      <group position={[0.1, 0.02, 1.05]}>
        {/* Tier 1 (Base Step) */}
        <mesh position={[0, 0.015, 0]} receiveShadow>
          <cylinderGeometry args={[0.92, 0.96, 0.03, 32, 1, false, 0, Math.PI]} />
          <primitive object={materials.columnMat} />
        </mesh>
        {/* Tier 2 */}
        <mesh position={[0, 0.045, 0]} receiveShadow>
          <cylinderGeometry args={[0.82, 0.86, 0.03, 32, 1, false, 0, Math.PI]} />
          <primitive object={materials.columnMat} />
        </mesh>
        {/* Tier 3 (Podium Platform) */}
        <mesh position={[0, 0.075, 0]} receiveShadow>
          <cylinderGeometry args={[0.72, 0.76, 0.03, 32, 1, false, 0, Math.PI]} />
          <primitive object={materials.columnMat} />
        </mesh>

        {/* Small Entrance Bollard Lights flanking the steps */}
        {[-0.85, -0.6, 0.6, 0.85].map((bx, bIdx) => (
          <group key={bIdx} position={[bx, 0.09, 0.25]}>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
              <primitive object={materials.slateAccentMat} />
            </mesh>
            <mesh position={[0, 0.11, 0]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <primitive object={materials.lampGlowMat} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================
          3. MAIN ADMINISTRATIVE BODY (Rear Rectangular Wing)
             Warm sandstone facade with horizontal ribbon windows
      ======================================================== */}
      <group position={[0.2, 0, -0.42]}>
        {/* Main Solid Mass */}
        <mesh position={[0, 0.68, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.32, 1.35]} />
          <primitive object={materials.wallMat} />
        </mesh>

        {/* 4 Floors of Horizontal Strip Windows (Front Facade of Rear Wing) */}
        {[-1.15, 1.15].map((wx, wIdx) => (
          <group key={wIdx} position={[wx, 0, 0.685]}>
            {[0.24, 0.54, 0.84, 1.14].map((y, fIdx) => (
              <group key={fIdx} position={[0, y, 0]}>
                {/* Window Frame */}
                <mesh position={[0, 0, -0.005]}>
                  <boxGeometry args={[0.92, 0.19, 0.02]} />
                  <primitive object={materials.slateAccentMat} />
                </mesh>
                {/* Glowing Glazing */}
                <mesh position={[0, 0, 0.005]}>
                  <boxGeometry args={[0.88, 0.15, 0.015]} />
                  <primitive object={(fIdx % 2 === 0 || wIdx === 1) ? materials.warmInteriorMat : materials.amberGlassMat} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* Roof Cornice & Parapet */}
        <mesh position={[0, 1.36, 0]}>
          <boxGeometry args={[3.28, 0.06, 1.42]} />
          <primitive object={materials.slateAccentMat} />
        </mesh>

        {/* Rooftop Terrace Garden with Planter Boxes & Greenery */}
        <group position={[0.7, 1.39, 0]}>
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[1.3, 0.08, 0.9]} />
            <primitive object={materials.slateAccentMat} />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[1.2, 0.06, 0.8]} />
            <primitive object={materials.foliageMat} />
          </mesh>
          {/* Subtle Rooftop Terrace Pergola / Canopy */}
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[1.1, 0.02, 0.7]} />
            <primitive object={materials.columnMat} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          4. PROMINENT CENTRAL CURVED DRUM & COUNCIL CHAMBER
             Grand semicircular portico with monumental vertical ribs
      ======================================================== */}
      <group position={[0.1, 0, 0.35]}>
        {/* Ground Floor Foyer Glazed Core */}
        <mesh position={[0, 0.22, -0.1]} receiveShadow>
          <cylinderGeometry args={[0.82, 0.82, 0.44, 28, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.warmInteriorMat} />
        </mesh>

        {/* Ground Floor Monumental Colonnade Pillars */}
        {drumFins.map((fin, idx) => (
          <group key={`col-${idx}`} position={[fin.x * 0.95, 0.22, fin.z * 0.95]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.042, 0.042, 0.44, 12]} />
              <primitive object={materials.columnMat} />
            </mesh>
            {/* Pillar Base Trim */}
            <mesh position={[0, -0.21, 0]}>
              <cylinderGeometry args={[0.055, 0.06, 0.04, 12]} />
              <primitive object={materials.slateAccentMat} />
            </mesh>
            {/* Pillar Up-light Emissive Lens at Base */}
            <mesh position={[0, -0.19, 0.03]} rotation={[-Math.PI / 4, 0, 0]}>
              <sphereGeometry args={[0.016, 8, 8]} />
              <primitive object={materials.lampGlowMat} />
            </mesh>
          </group>
        ))}

        {/* First Floor Solid Curved Fascia Wall */}
        <mesh position={[0, 0.52, -0.1]} castShadow receiveShadow>
          <cylinderGeometry args={[0.84, 0.84, 0.18, 28, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.wallMat} />
        </mesh>

        {/* Curved Illuminated Signage Fascia Band */}
        <mesh position={[0, 0.69, -0.095]} castShadow>
          <cylinderGeometry args={[0.86, 0.86, 0.16, 28, 1, false, 0.12, Math.PI * 1.06]} />
          <primitive object={materials.signMat} />
        </mesh>

        {/* Upper Semicircular Chamber Walls (Levels 2 & 3) */}
        <mesh position={[0, 1.05, -0.1]} castShadow receiveShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.54, 30, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.wallMat} />
        </mesh>

        {/* Recessed Full-Height Warm Panoramic Windows behind vertical fins */}
        <mesh position={[0, 1.05, -0.088]}>
          <cylinderGeometry args={[0.855, 0.855, 0.46, 30, 1, false, 0.14, Math.PI * 1.02]} />
          <primitive object={materials.amberGlassMat} />
        </mesh>

        {/* Monumental Vertical Curved Architectural Fins / Ribs */}
        {drumFins.map((fin, idx) => (
          <group
            key={`rib-${idx}`}
            position={[fin.x, 1.05, fin.z]}
            rotation={[0, -fin.angle, 0]}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.065, 0.56, 0.18]} />
              <primitive object={materials.columnMat} />
            </mesh>
          </group>
        ))}

        {/* Curved Roof Header & Monumental Overhanging Cornice */}
        <mesh position={[0, 1.35, -0.1]} castShadow>
          <cylinderGeometry args={[0.92, 0.87, 0.08, 30, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.columnMat} />
        </mesh>

        {/* Neon-Lime Roof Accent Strip matching Image 2 */}
        <mesh position={[0, 1.385, -0.1]}>
          <cylinderGeometry args={[0.928, 0.928, 0.018, 30, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.neonLimeMat} />
        </mesh>

        {/* Rooftop Stepped Tier */}
        <mesh position={[0, 1.41, -0.1]}>
          <cylinderGeometry args={[0.84, 0.88, 0.04, 28, 1, false, 0, Math.PI * 1.3]} />
          <primitive object={materials.slateAccentMat} />
        </mesh>
      </group>

      {/* ========================================================
          5. ATTACHED CYLINDRICAL STAIR ROTUNDA (Left Tower)
      ======================================================== */}
      <group position={[-1.28, 0, 0.15]}>
        {/* Main Column Tower */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.34, 0.34, 1.48, 20]} />
          <primitive object={materials.wallMat} />
        </mesh>

        {/* Vertical Glazing Strip */}
        <mesh position={[0, 0.74, 0.33]}>
          <boxGeometry args={[0.16, 1.15, 0.04]} />
          <primitive object={materials.warmInteriorMat} />
        </mesh>

        {/* Rotunda Upper Observation Cornice & Dome */}
        <mesh position={[0, 1.49, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.35, 0.06, 20]} />
          <primitive object={materials.columnMat} />
        </mesh>

        {/* Neon-Lime Accent Ring on Rotunda Dome Base matching Image 2 */}
        <mesh position={[0, 1.515, 0]}>
          <torusGeometry args={[0.345, 0.016, 12, 32]} />
          <primitive object={materials.neonLimeMat} />
        </mesh>

        <mesh position={[0, 1.55, 0]} castShadow>
          <sphereGeometry args={[0.32, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
          <primitive object={materials.slateAccentMat} />
        </mesh>
      </group>

      {/* ========================================================
          6. LANDSCAPING TREES & PERIMETER ACCENTS
      ======================================================== */}
      {/* Front Entrance Trees */}
      {[
        [-1.35, 0.85],
        [1.45, 0.85],
        [-1.6, 0.3],
        [1.65, 0.3]
      ].map(([tx, tz], tIdx) => (
        <group key={tIdx} position={[tx, 0.04, tz]}>
          {/* Planter Curb */}
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.14, 0.16, 0.06, 12]} />
            <primitive object={materials.slateAccentMat} />
          </mesh>
          {/* Tree Trunk */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.02, 0.03, 0.18, 6]} />
            <primitive object={materials.slateAccentMat} />
          </mesh>
          {/* Dense Rounded Foliage Canopy with vibrant green PBR response */}
          <mesh position={[0, 0.32, 0]} castShadow>
            <sphereGeometry args={[0.17, 10, 8]} />
            <primitive object={materials.foliageMat} />
          </mesh>
          <mesh position={[0, 0.45, 0]} castShadow>
            <sphereGeometry args={[0.12, 8, 8]} />
            <primitive object={materials.foliageMat} />
          </mesh>
        </group>
      ))}

      {/* ========================================================
          7. DEDICATED ARCHITECTURAL WARM LIGHTING POOLS
             Directly illuminates the entrance colonnade & sign
      ======================================================== */}
      {/* Grand Entrance Warm Focus Spotlight */}
      <spotLight
        position={[0.1, 3.4, 2.2]}
        target-position={[0.1, 0.3, 0.8]}
        angle={0.75}
        penumbra={0.7}
        intensity={140}
        color="#FFC566"
        distance={9.0}
      />

      {/* Golden Signboard Glow Light */}
      <pointLight
        position={[0.1, 0.85, 1.05]}
        intensity={45}
        distance={3.5}
        color="#FFAE26"
      />

      {/* Foyer Interior Ambient Warmth */}
      <pointLight
        position={[0.1, 0.35, 0.25]}
        intensity={35}
        distance={4.0}
        color="#FFD175"
      />

      {/* Entrance Step Floor Glow */}
      <pointLight
        position={[0.1, 0.22, 1.15]}
        intensity={24}
        distance={3.5}
        color="#FFCF70"
      />
    </group>
  );
};

export default NWCMCBuildingModel;
