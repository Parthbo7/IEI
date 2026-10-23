import React, { useMemo } from 'react';
import * as THREE from 'three';

// Procedural Canvas Texture for MGM's Iconic Perforated Jali / Lattice Screens
// Muted slate-gray tone matching the surrounding low-poly city
function createMutedJaliTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Slate-gray base matching the city building material
    ctx.fillStyle = '#617280';
    ctx.fillRect(0, 0, 256, 128);

    // Subtle framing border
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#51616e';
    ctx.strokeRect(2, 2, 252, 124);

    // Grid of perforated ventilation holes in muted charcoal
    const cols = 12;
    const rows = 6;
    const cellW = (256 - 16) / cols;
    const cellH = (128 - 16) / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 8 + c * cellW + cellW / 2;
        const y = 8 + r * cellH + cellH / 2;

        ctx.fillStyle = '#26333d';
        ctx.beginPath();
        if ((r + c) % 2 === 0) {
          ctx.arc(x, y, Math.min(cellW, cellH) * 0.32, 0, Math.PI * 2);
        } else {
          const s = Math.min(cellW, cellH) * 0.54;
          ctx.rect(x - s / 2, y - s / 2, s, s);
        }
        ctx.fill();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 2;
  return texture;
}

// Procedural High-Resolution Texture for Elegant Metallic Golden College Signage
// Text: "MGM'S COLLEGE OF ENGINEERING" in Cinzel SemiBold with metallic gold palette
function createGoldenSignageTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 144;
  const ctx = canvas.getContext('2d');

  const renderSign = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Architectural fascia backing plate (slate-gray matching building tone)
    ctx.fillStyle = '#4e5d6b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle outer border
    ctx.strokeStyle = '#3d4a56';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

    // Metallic gold filigree accent pinstripes
    const borderGold = ctx.createLinearGradient(0, 0, canvas.width, 0);
    borderGold.addColorStop(0, '#9C7928');
    borderGold.addColorStop(0.5, '#F5DE91');
    borderGold.addColorStop(1, '#9C7928');
    ctx.strokeStyle = borderGold;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    const text = "MGM'S COLLEGE OF ENGINEERING";
    // Cinzel SemiBold uppercase architectural lettering with fallbacks
    ctx.font = '600 50px "Cinzel", "Trajan Pro", "Montserrat", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Metallic gold multi-stop vertical gradient as specified:
    // Highlight: #F5DE91, Base: #D4AF37, Dark gold shading: #9C7928
    const goldGrad = ctx.createLinearGradient(0, centerY - 26, 0, centerY + 26);
    goldGrad.addColorStop(0.0, '#F5DE91');  // Subtle top highlight
    goldGrad.addColorStop(0.35, '#E6C862');
    goldGrad.addColorStop(0.55, '#D4AF37'); // Base metallic gold
    goldGrad.addColorStop(0.85, '#9C7928'); // Dark gold shading
    goldGrad.addColorStop(1.0, '#6B5216');  // Deep beveled base shadow

    // Expanded letter-spacing (tracking) for institutional architectural elegance
    const tracking = 14;
    let totalTextWidth = 0;
    const charWidths: number[] = [];
    for (let i = 0; i < text.length; i++) {
      const w = ctx.measureText(text[i]).width;
      charWidths.push(w);
      totalTextWidth += w + (i < text.length - 1 ? tracking : 0);
    }

    const startX = centerX - totalTextWidth / 2;

    // 1. Deep cast shadow for crisp readability from all camera angles
    ctx.fillStyle = 'rgba(15, 20, 24, 0.9)';
    let currX = startX;
    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], currX + charWidths[i] / 2, centerY + 3);
      currX += charWidths[i] + tracking;
    }

    // 2. Dark gold bevel outline
    ctx.strokeStyle = '#5E4612';
    ctx.lineWidth = 2.5;
    currX = startX;
    for (let i = 0; i < text.length; i++) {
      ctx.strokeText(text[i], currX + charWidths[i] / 2, centerY);
      currX += charWidths[i] + tracking;
    }

    // 3. Metallic golden lettering fill
    ctx.fillStyle = goldGrad;
    currX = startX;
    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], currX + charWidths[i] / 2, centerY);
      currX += charWidths[i] + tracking;
    }
  };

  renderSign();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Re-render when Cinzel font finishes loading
  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
      renderSign();
      texture.needsUpdate = true;
    });
  }

  return texture;
}

/**
 * MGM College of Engineering, Nanded — 3D Landmark Model
 * Features:
 * - Scaled to fit single city block (width ~3.0, depth ~2.4, height ~1.1 units).
 * - Muted slate blue-gray palette (#657584) matching surrounding city buildings.
 * - Prominent metallic golden signage: "MGM'S COLLEGE OF ENGINEERING" in Cinzel SemiBold.
 * - Symmetrical front facade, 5-bay portico, pillars, windows, jali screens, and side wings.
 */
export const MGMCollegeModel: React.FC = () => {
  const materials = useMemo(() => {
    const jaliTex = createMutedJaliTexture();
    const signTex = createGoldenSignageTexture();

    // 1. Primary facade: Muted blue-gray/slate-gray matching city-plane.glb
    const facadeMat = new THREE.MeshPhysicalMaterial({
      color: '#657584',
      roughness: 0.7,
      metalness: 0.45,
      reflectivity: 0.25,
      clearcoat: 0.08
    });

    // 2. Structural pillars & framing lintels (subtle tonal contrast)
    const pillarMat = new THREE.MeshPhysicalMaterial({
      color: '#738392',
      roughness: 0.65,
      metalness: 0.4
    });

    // 3. Dark institutional window glazing (understated, non-glaring)
    const windowMat = new THREE.MeshPhysicalMaterial({
      color: '#1f2a33',
      roughness: 0.25,
      metalness: 0.75,
      reflectivity: 0.6,
      clearcoat: 0.2
    });

    // 4. Perforated Jali lattice panel material
    const jaliMat = new THREE.MeshStandardMaterial({
      map: jaliTex,
      roughness: 0.65,
      metalness: 0.35
    });

    // 5. Flat roof surface
    const roofMat = new THREE.MeshStandardMaterial({
      color: '#4e5b66',
      roughness: 0.85,
      metalness: 0.2
    });

    // 6. Compact entrance reflection basin water (muted dark aqua-slate)
    const waterMat = new THREE.MeshStandardMaterial({
      color: '#283f4f',
      roughness: 0.2,
      metalness: 0.5
    });

    // 7. Base site pavement plinth
    const plinthMat = new THREE.MeshStandardMaterial({
      color: '#3d4852',
      roughness: 0.85,
      metalness: 0.15
    });

    // 8. Metallic Gold Signage Board Material
    const goldenSignMat = new THREE.MeshStandardMaterial({
      map: signTex,
      roughness: 0.35,
      metalness: 0.65
    });

    // 9. Metallic Gold Trim & Molding Material (Base: #D4AF37, Highlights: #F5DE91)
    const goldTrimMat = new THREE.MeshPhysicalMaterial({
      color: '#D4AF37',
      roughness: 0.28,
      metalness: 0.85,
      reflectivity: 0.85,
      clearcoat: 0.25,
      clearcoatRoughness: 0.2
    });

    return {
      facadeMat,
      pillarMat,
      windowMat,
      jaliMat,
      roofMat,
      waterMat,
      plinthMat,
      goldenSignMat,
      goldTrimMat
    };
  }, []);

  // 6 square pillars forming 5 bays across the central entrance portico
  const porticoPillarsX = [-0.55, -0.33, -0.11, 0.11, 0.33, 0.55];

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================
          1. COMPACT BLOCK PLINTH (Matches single city block footprint)
      ======================================================== */}
      <mesh position={[0, 0.015, 0.05]} receiveShadow>
        <boxGeometry args={[3.0, 0.03, 2.4]} />
        <primitive object={materials.plinthMat} />
      </mesh>

      {/* ========================================================
          2. CENTRAL ENTRANCE BLOCK (5 Bays: Portico, Windows, Jali Screens)
             Width: 1.25, Depth: 0.95, Height: 1.08
      ======================================================== */}
      <group position={[0, 0, 0.15]}>
        {/* Central Block Main Wall Mass */}
        <mesh position={[0, 0.54, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[1.25, 1.05, 0.85]} />
          <primitive object={materials.facadeMat} />
        </mesh>

        {/* Recessed Ground Floor Entrance Lobby */}
        <mesh position={[0, 0.18, 0.22]}>
          <boxGeometry args={[1.1, 0.34, 0.04]} />
          <primitive object={materials.windowMat} />
        </mesh>

        {/* Portico Ceiling / 1st Floor Overhang Slab */}
        <mesh position={[0, 0.37, 0.28]} castShadow receiveShadow>
          <boxGeometry args={[1.25, 0.04, 0.5]} />
          <primitive object={materials.facadeMat} />
        </mesh>

        {/* 6 Square Concrete Vertical Pillars */}
        {porticoPillarsX.map((xVal, idx) => (
          <group key={idx}>
            {/* Ground Level Portico Pillar */}
            <mesh position={[xVal, 0.18, 0.46]} castShadow receiveShadow>
              <boxGeometry args={[0.045, 0.36, 0.045]} />
              <primitive object={materials.pillarMat} />
            </mesh>
            {/* Upper Structural Vertical Ribs (Between bays) */}
            <mesh position={[xVal, 0.72, 0.38]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.65, 0.06]} />
              <primitive object={materials.pillarMat} />
            </mesh>
          </group>
        ))}

        {/* Floor 1: 5 Bay Office/Classroom Windows with Sills */}
        {[-0.44, -0.22, 0, 0.22, 0.44].map((bx, i) => (
          <group key={i} position={[bx, 0.56, 0.38]}>
            <mesh castShadow>
              <boxGeometry args={[0.17, 0.26, 0.02]} />
              <primitive object={materials.windowMat} />
            </mesh>
            {/* Window Sill / Sunshade Lintel */}
            <mesh position={[0, -0.14, 0.015]} castShadow>
              <boxGeometry args={[0.19, 0.025, 0.05]} />
              <primitive object={materials.pillarMat} />
            </mesh>
            <mesh position={[0, 0.14, 0.015]} castShadow>
              <boxGeometry args={[0.19, 0.025, 0.05]} />
              <primitive object={materials.pillarMat} />
            </mesh>
          </group>
        ))}

        {/* Floor 2: 5 Bay Iconic Perforated Jali / Lattice Screens */}
        {[-0.44, -0.22, 0, 0.22, 0.44].map((bx, i) => (
          <mesh key={i} position={[bx, 0.88, 0.385]} castShadow>
            <boxGeometry args={[0.18, 0.26, 0.03]} />
            <primitive object={materials.jaliMat} />
          </mesh>
        ))}

        {/* Horizontal Concrete Spandrels between floors */}
        <mesh position={[0, 0.72, 0.385]} castShadow>
          <boxGeometry args={[1.24, 0.04, 0.06]} />
          <primitive object={materials.facadeMat} />
        </mesh>
        <mesh position={[0, 1.025, 0.385]} castShadow>
          <boxGeometry args={[1.26, 0.04, 0.08]} />
          <primitive object={materials.facadeMat} />
        </mesh>

        {/* ========================================================
            GOLDEN COLLEGE SIGNAGE: "MGM'S COLLEGE OF ENGINEERING"
            Prominently positioned on the front-facing roof fascia,
            featuring metallic gold lettering in Cinzel SemiBold
        ======================================================== */}
        <group position={[0, 1.072, 0.42]}>
          {/* Signboard Backing Plate with High-Res Gold Lettering */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.20, 0.075, 0.016]} />
            <primitive object={materials.goldenSignMat} />
          </mesh>

          {/* Top Metallic Gold Architectural Molding */}
          <mesh position={[0, 0.041, 0.005]} castShadow>
            <boxGeometry args={[1.22, 0.01, 0.022]} />
            <primitive object={materials.goldTrimMat} />
          </mesh>

          {/* Bottom Metallic Gold Architectural Molding */}
          <mesh position={[0, -0.041, 0.005]} castShadow>
            <boxGeometry args={[1.22, 0.01, 0.022]} />
            <primitive object={materials.goldTrimMat} />
          </mesh>

          {/* Left & Right Metallic Gold End Cap Brackets */}
          <mesh position={[-0.605, 0, 0.005]} castShadow>
            <boxGeometry args={[0.015, 0.088, 0.022]} />
            <primitive object={materials.goldTrimMat} />
          </mesh>
          <mesh position={[0.605, 0, 0.005]} castShadow>
            <boxGeometry args={[0.015, 0.088, 0.022]} />
            <primitive object={materials.goldTrimMat} />
          </mesh>
        </group>

        {/* Central Roof Parapet & Coping */}
        <mesh position={[0, 1.12, -0.05]} castShadow>
          <boxGeometry args={[1.28, 0.04, 0.9]} />
          <primitive object={materials.pillarMat} />
        </mesh>

        {/* Central Rooftop Mast / Flagpole (Subtle institutional feature) */}
        <group position={[0, 1.14, 0.25]}>
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.006, 0.008, 0.24, 6]} />
            <primitive object={materials.pillarMat} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          3. SYMMETRICAL LEFT WING (3-Storey Institutional Block)
             Width: 0.82, Depth: 0.8, Height: 0.96
      ======================================================== */}
      <group position={[-1.04, 0, 0.1]}>
        {/* Left Wing Solid Mass */}
        <mesh position={[0, 0.48, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.94, 0.8]} />
          <primitive object={materials.facadeMat} />
        </mesh>

        {/* 3 Floors of Recessed Ribbon Windows */}
        {[0.19, 0.52, 0.82].map((yLevel, rowIdx) => (
          <group key={rowIdx} position={[0, yLevel, 0.36]}>
            <mesh castShadow>
              <boxGeometry args={[0.76, 0.17, 0.02]} />
              <primitive object={materials.windowMat} />
            </mesh>
            {/* Concrete Sunshade Chhajja */}
            <mesh position={[0, 0.095, 0.02]} castShadow>
              <boxGeometry args={[0.78, 0.02, 0.06]} />
              <primitive object={materials.pillarMat} />
            </mesh>
            {/* Vertical Mullion dividers */}
            {[-0.26, 0, 0.26].map((mx, mi) => (
              <mesh key={mi} position={[mx, 0, 0.015]} castShadow>
                <boxGeometry args={[0.03, 0.18, 0.04]} />
                <primitive object={materials.pillarMat} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Left Wing Roof Parapet */}
        <mesh position={[0, 0.96, -0.05]} castShadow>
          <boxGeometry args={[0.84, 0.05, 0.82]} />
          <primitive object={materials.pillarMat} />
        </mesh>
      </group>

      {/* ========================================================
          4. SYMMETRICAL RIGHT WING (3-Storey Institutional Block)
             Width: 0.82, Depth: 0.8, Height: 0.96
      ======================================================== */}
      <group position={[1.04, 0, 0.1]}>
        {/* Right Wing Solid Mass */}
        <mesh position={[0, 0.48, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.94, 0.8]} />
          <primitive object={materials.facadeMat} />
        </mesh>

        {/* 3 Floors of Recessed Ribbon Windows */}
        {[0.19, 0.52, 0.82].map((yLevel, rowIdx) => (
          <group key={rowIdx} position={[0, yLevel, 0.36]}>
            <mesh castShadow>
              <boxGeometry args={[0.76, 0.17, 0.02]} />
              <primitive object={materials.windowMat} />
            </mesh>
            {/* Concrete Sunshade Chhajja */}
            <mesh position={[0, 0.095, 0.02]} castShadow>
              <boxGeometry args={[0.78, 0.02, 0.06]} />
              <primitive object={materials.pillarMat} />
            </mesh>
            {/* Vertical Mullion dividers */}
            {[-0.26, 0, 0.26].map((mx, mi) => (
              <mesh key={mi} position={[mx, 0, 0.015]} castShadow>
                <boxGeometry args={[0.03, 0.18, 0.04]} />
                <primitive object={materials.pillarMat} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Right Wing Roof Parapet */}
        <mesh position={[0, 0.96, -0.05]} castShadow>
          <boxGeometry args={[0.84, 0.05, 0.82]} />
          <primitive object={materials.pillarMat} />
        </mesh>
      </group>

      {/* ========================================================
          5. REAR QUADRANGLE WINGS (Enclosing Central Courtyard)
             Depth: 0.75, Height: 0.72
      ======================================================== */}
      {/* Rear Left Wing */}
      <group position={[-1.25, 0, -0.65]}>
        <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.72, 0.75]} />
          <primitive object={materials.facadeMat} />
        </mesh>
        <mesh position={[0, 0.73, 0]} castShadow>
          <boxGeometry args={[0.42, 0.04, 0.77]} />
          <primitive object={materials.pillarMat} />
        </mesh>
      </group>

      {/* Rear Right Wing */}
      <group position={[1.25, 0, -0.65]}>
        <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.72, 0.75]} />
          <primitive object={materials.facadeMat} />
        </mesh>
        <mesh position={[0, 0.73, 0]} castShadow>
          <boxGeometry args={[0.42, 0.04, 0.77]} />
          <primitive object={materials.pillarMat} />
        </mesh>
      </group>

      {/* Inner Courtyard Base */}
      <mesh position={[0, 0.02, -0.55]} receiveShadow>
        <boxGeometry args={[1.8, 0.01, 0.65]} />
        <primitive object={materials.plinthMat} />
      </mesh>

      {/* ========================================================
          6. CLEAN ENTRANCE APPROACH & SUBTLE WATER BASINS
             Understated pedestrian approach directly in front of portico
      ======================================================== */}
      <group position={[0, 0, 0.75]}>
        {/* Central Entrance Paved Path */}
        <mesh position={[0, 0.025, 0]} receiveShadow>
          <boxGeometry args={[0.42, 0.02, 0.65]} />
          <primitive object={materials.pillarMat} />
        </mesh>

        {/* Small Symmetrical Water Basins */}
        <mesh position={[-0.48, 0.022, 0]} receiveShadow>
          <boxGeometry args={[0.44, 0.015, 0.55]} />
          <primitive object={materials.waterMat} />
        </mesh>
        <mesh position={[0.48, 0.022, 0]} receiveShadow>
          <boxGeometry args={[0.44, 0.015, 0.55]} />
          <primitive object={materials.waterMat} />
        </mesh>

        {/* Low stone curbs around basins */}
        <mesh position={[-0.48, 0.03, -0.28]} castShadow>
          <boxGeometry args={[0.46, 0.025, 0.03]} />
          <primitive object={materials.plinthMat} />
        </mesh>
        <mesh position={[0.48, 0.03, -0.28]} castShadow>
          <boxGeometry args={[0.46, 0.025, 0.03]} />
          <primitive object={materials.plinthMat} />
        </mesh>
      </group>
    </group>
  );
};

export default MGMCollegeModel;
