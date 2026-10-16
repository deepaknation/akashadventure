import React, { useRef, useMemo, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BrakeRisers } from './BrakeRisers';
import { ParagliderHarness } from './ParagliderHarness';

// --- TANDEM PARAGLIDER CANOPY COMPONENT ---
// Watertight structural alignment:
// Canopy (y ~ 0) -> Bridle Lines -> Risers & Maillons (y: -4.04 to -5.10) -> Carabiners -> Harness (y: -5.10 to -5.80)

export const TandemCanopy = forwardRef(function TandemCanopy({
  position = [0, 0, 0],
  scale = 1,
  fabricColor = "#2563eb",       // Primary paraglider color (Royal Blue)
  secondaryColor = "#ffffff",    // Secondary color (Pure White)
  accentColor = "#1d4ed8",       // Accent rib / trim color
  harnessColor = "#1a1c24",      // Harness shell Cordura
  cushionColor = "#dc2626",      // Red interior cushion
  toggleColor = "#dc2626",       // Red steering toggle handles
  showLines = true,              // Suspension line cascades
  showRisers = true,             // Brake risers & toggles
  showHarness = true,            // Pilot bucket harness
  showAirIntakes = true,         // Ram-air cell intake mouths
  lineColorMode = 'cascade',     // 'cascade' or 'mono'
  brakeLeft = 0,                 // 0 to 1
  brakeRight = 0,                // 0 to 1
  windSpeed = 0.8,               // Aerodynamic breathing oscillation
  wireframe = false,             // Mesh wireframe
  blueprintMode = false,         // CAD blueprint wireframe style
  activeHighlight = null,
  onSelectPart = null
}, ref) {
  const internalRef = useRef();
  const groupRef = ref || internalRef;
  const wingRef = useRef();
  const harnessGroupRef = useRef();

  // 1. AERO PARAMETERS (Matching Blueprint in Image 2)
  const numCells = 42;
  const numRibs = numCells + 1;
  const chordSamples = 22;
  const cellWidthSamples = 4;
  
  const spanRadius = 6.4;
  const maxArchAngle = 0.88;
  const centerChord = 2.85;
  const tipChord = 0.95;
  const maxThickness = 0.165;
  const sweepAngle = 0.44;
  const archHeight = 2.35;

  // 2. AIRFOIL FUNCTION
  const getFoilCoordinates = (v, isUpper) => {
    const t = maxThickness * (
      2.969 * Math.sqrt(Math.max(0.0001, v)) -
      1.260 * v -
      3.516 * Math.pow(v, 2) +
      2.843 * Math.pow(v, 3) -
      1.036 * Math.pow(v, 4)
    );
    const camber = 0.045 * Math.sin(Math.PI * Math.pow(v, 0.75));
    return isUpper ? (camber + 0.62 * t) : (camber - 0.38 * t);
  };

  // 3. PROCEDURAL CANOPY GEOMETRIES
  const { 
    upperGeometry, 
    lowerGeometry, 
    intakesGeometry, 
    attachmentPoints,
    cellColors 
  } = useMemo(() => {
    const ribs = [];
    for (let i = 0; i < numRibs; i++) {
      const normIdx = (i / numCells) * 2 - 1;
      const archAngle = normIdx * maxArchAngle;
      const u = Math.sin(archAngle) / Math.sin(maxArchAngle);

      const xArch = spanRadius * Math.sin(archAngle);
      const yArch = spanRadius * Math.cos(archAngle) - spanRadius * Math.cos(maxArchAngle) + archHeight;

      const chord = tipChord + (centerChord - tipChord) * Math.sqrt(Math.max(0, 1 - 0.88 * u * u));
      const zLE = sweepAngle * Math.pow(u, 2);

      const nx = Math.sin(archAngle);
      const ny = Math.cos(archAngle);

      ribs.push({ idx: i, u, archAngle, xArch, yArch, chord, zLE, nx, ny });
    }

    const cellColors = [];
    for (let c = 0; c < numCells; c++) {
      const uMid = (ribs[c].u + ribs[c + 1].u) / 2;
      const absU = Math.abs(uMid);
      if (absU > 0.84) {
        cellColors.push({ isPrimary: true, isTip: true });
      } else {
        const isStriped = (c % 2 === 0);
        cellColors.push({ isPrimary: isStriped, isTip: false });
      }
    }

    const upperVerts = [];
    const upperNorms = [];
    const upperUVs = [];
    const upperColors = [];
    const upperIndices = [];

    const lowerVerts = [];
    const lowerNorms = [];
    const lowerUVs = [];
    const lowerColors = [];
    const lowerIndices = [];

    const attachmentPoints = { A: [], B: [], C: [], Brake: [] };
    const anchorRibIndices = [3, 7, 12, 17, 21, 25, 30, 35, 39];

    const cPrimary = new THREE.Color(blueprintMode ? "#1e293b" : fabricColor);
    const cSecondary = new THREE.Color(blueprintMode ? "#334155" : secondaryColor);
    const cAccent = new THREE.Color(blueprintMode ? "#0f172a" : accentColor);

    let upperVertOffset = 0;
    let lowerVertOffset = 0;

    for (let c = 0; c < numCells; c++) {
      const ribL = ribs[c];
      const ribR = ribs[c + 1];
      const cellColorInfo = cellColors[c];

      const uRes = cellWidthSamples;
      const vRes = chordSamples;

      // Upper Surface
      for (let j = 0; j <= vRes; j++) {
        const v = j / vRes;

        for (let i = 0; i <= uRes; i++) {
          const w = i / uRes;

          const chord = ribL.chord * (1 - w) + ribR.chord * w;
          const xArch = ribL.xArch * (1 - w) + ribR.xArch * w;
          const yArch = ribL.yArch * (1 - w) + ribR.yArch * w;
          const zLE = ribL.zLE * (1 - w) + ribR.zLE * w;
          const nx = ribL.nx * (1 - w) + ribR.nx * w;
          const ny = ribL.ny * (1 - w) + ribR.ny * w;

          const baseHeight = getFoilCoordinates(v, true) * chord;
          const billow = 0.04 * chord * 4 * w * (1 - w) * Math.pow(Math.sin(Math.PI * Math.pow(v, 0.6)), 0.7);
          const totalHeight = baseHeight + billow;

          const px = xArch + totalHeight * nx;
          const py = yArch + totalHeight * ny;
          const pz = zLE + v * chord - centerChord * 0.35;

          upperVerts.push(px, py, pz);
          upperNorms.push(nx, ny + 0.3, 0);
          upperUVs.push((c + w) / numCells, v);

          let col = cellColorInfo.isPrimary ? cPrimary : cSecondary;
          if (v < 0.15 && !cellColorInfo.isTip) {
            col = (c % 4 < 2) ? cPrimary : cSecondary;
          }
          if (v > 0.35 && v < 0.55 && cellColorInfo.isPrimary) {
            col = cAccent;
          }

          upperColors.push(col.r, col.g, col.b);
        }
      }

      for (let j = 0; j < vRes; j++) {
        for (let i = 0; i < uRes; i++) {
          const row1 = upperVertOffset + j * (uRes + 1);
          const row2 = upperVertOffset + (j + 1) * (uRes + 1);
          upperIndices.push(row1 + i, row2 + i, row1 + i + 1);
          upperIndices.push(row1 + i + 1, row2 + i, row2 + i + 1);
        }
      }
      upperVertOffset += (uRes + 1) * (vRes + 1);

      // Lower Surface
      for (let j = 0; j <= vRes; j++) {
        const v = j / vRes;

        for (let i = 0; i <= uRes; i++) {
          const w = i / uRes;

          const chord = ribL.chord * (1 - w) + ribR.chord * w;
          const xArch = ribL.xArch * (1 - w) + ribR.xArch * w;
          const yArch = ribL.yArch * (1 - w) + ribR.yArch * w;
          const zLE = ribL.zLE * (1 - w) + ribR.zLE * w;
          const nx = ribL.nx * (1 - w) + ribR.nx * w;
          const ny = ribL.ny * (1 - w) + ribR.ny * w;

          const baseHeight = getFoilCoordinates(v, false) * chord;
          const billow = -0.025 * chord * 4 * w * (1 - w) * Math.pow(Math.sin(Math.PI * Math.pow(v, 0.7)), 0.6);
          const totalHeight = baseHeight + billow;

          const px = xArch + totalHeight * nx;
          const py = yArch + totalHeight * ny;
          const pz = zLE + v * chord - centerChord * 0.35;

          lowerVerts.push(px, py, pz);
          lowerNorms.push(-nx, -ny - 0.2, 0);
          lowerUVs.push((c + w) / numCells, v);

          let col = cPrimary;
          if (cellColorInfo.isTip) {
            col = cPrimary;
          } else if (c % 3 === 0) {
            col = cSecondary;
          }
          lowerColors.push(col.r, col.g, col.b);
        }
      }

      for (let j = 0; j < vRes; j++) {
        for (let i = 0; i < uRes; i++) {
          const row1 = lowerVertOffset + j * (uRes + 1);
          const row2 = lowerVertOffset + (j + 1) * (uRes + 1);
          lowerIndices.push(row1 + i, row1 + i + 1, row2 + i);
          lowerIndices.push(row1 + i + 1, row2 + i + 1, row2 + i);
        }
      }
      lowerVertOffset += (uRes + 1) * (vRes + 1);
    }

    // Line attachments
    anchorRibIndices.forEach((rIdx) => {
      const rib = ribs[rIdx];
      const computePos = (vRatio) => {
        const chord = rib.chord;
        const baseHeight = getFoilCoordinates(vRatio, false) * chord;
        return new THREE.Vector3(
          rib.xArch + baseHeight * rib.nx,
          rib.yArch + baseHeight * rib.ny,
          rib.zLE + vRatio * chord - centerChord * 0.35
        );
      };

      attachmentPoints.A.push({ pos: computePos(0.12), ribIdx: rIdx, u: rib.u });
      attachmentPoints.B.push({ pos: computePos(0.36), ribIdx: rIdx, u: rib.u });
      attachmentPoints.C.push({ pos: computePos(0.64), ribIdx: rIdx, u: rib.u });
      attachmentPoints.Brake.push({ pos: computePos(0.96), ribIdx: rIdx, u: rib.u });
    });

    // Ram-Air Intakes
    const intakeVerts = [];
    const intakeIndices = [];
    let intakeOffset = 0;

    for (let c = 1; c < numCells - 1; c++) {
      const ribL = ribs[c];
      const ribR = ribs[c + 1];

      const vTop = 0.02;
      const vBottom = 0.11;

      const p1 = new THREE.Vector3(
        ribL.xArch + getFoilCoordinates(vTop, true) * ribL.chord * ribL.nx * 0.8,
        ribL.yArch + getFoilCoordinates(vTop, true) * ribL.chord * ribL.ny * 0.8,
        ribL.zLE + vTop * ribL.chord - centerChord * 0.35
      );
      const p2 = new THREE.Vector3(
        ribR.xArch + getFoilCoordinates(vTop, true) * ribR.chord * ribR.nx * 0.8,
        ribR.yArch + getFoilCoordinates(vTop, true) * ribR.chord * ribR.ny * 0.8,
        ribR.zLE + vTop * ribR.chord - centerChord * 0.35
      );
      const p3 = new THREE.Vector3(
        ribR.xArch + getFoilCoordinates(vBottom, false) * ribR.chord * ribR.nx,
        ribR.yArch + getFoilCoordinates(vBottom, false) * ribR.chord * ribR.ny,
        ribR.zLE + vBottom * ribR.chord - centerChord * 0.35
      );
      const p4 = new THREE.Vector3(
        ribL.xArch + getFoilCoordinates(vBottom, false) * ribL.chord * ribL.nx,
        ribL.yArch + getFoilCoordinates(vBottom, false) * ribL.chord * ribL.ny,
        ribL.zLE + vBottom * ribL.chord - centerChord * 0.35
      );

      const pCenterBack = new THREE.Vector3(
        (p1.x + p2.x + p3.x + p4.x) / 4,
        (p1.y + p2.y + p3.y + p4.y) / 4,
        (p1.z + p2.z) / 2 + 0.12
      );

      intakeVerts.push(
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
        p3.x, p3.y, p3.z,
        p4.x, p4.y, p4.z,
        pCenterBack.x, pCenterBack.y, pCenterBack.z
      );

      intakeIndices.push(
        intakeOffset + 0, intakeOffset + 1, intakeOffset + 4,
        intakeOffset + 1, intakeOffset + 2, intakeOffset + 4,
        intakeOffset + 2, intakeOffset + 3, intakeOffset + 4,
        intakeOffset + 3, intakeOffset + 0, intakeOffset + 4
      );
      intakeOffset += 5;
    }

    const upperGeo = new THREE.BufferGeometry();
    upperGeo.setAttribute('position', new THREE.Float32BufferAttribute(upperVerts, 3));
    upperGeo.setAttribute('color', new THREE.Float32BufferAttribute(upperColors, 3));
    upperGeo.setAttribute('uv', new THREE.Float32BufferAttribute(upperUVs, 2));
    upperGeo.setIndex(upperIndices);
    upperGeo.computeVertexNormals();

    const lowerGeo = new THREE.BufferGeometry();
    lowerGeo.setAttribute('position', new THREE.Float32BufferAttribute(lowerVerts, 3));
    lowerGeo.setAttribute('color', new THREE.Float32BufferAttribute(lowerColors, 3));
    lowerGeo.setAttribute('uv', new THREE.Float32BufferAttribute(lowerUVs, 2));
    lowerGeo.setIndex(lowerIndices);
    lowerGeo.computeVertexNormals();

    const intakesGeo = new THREE.BufferGeometry();
    intakesGeo.setAttribute('position', new THREE.Float32BufferAttribute(intakeVerts, 3));
    intakesGeo.setIndex(intakeIndices);
    intakesGeo.computeVertexNormals();

    return {
      upperGeometry: upperGeo,
      lowerGeometry: lowerGeo,
      intakesGeometry: intakesGeo,
      attachmentPoints,
      cellColors
    };
  }, [numCells, numRibs, chordSamples, cellWidthSamples, spanRadius, maxArchAngle, centerChord, tipChord, maxThickness, sweepAngle, archHeight, fabricColor, secondaryColor, accentColor, blueprintMode]);

  // 4. SUSPENSION LINES BRIDLE SYSTEM
  // Exact convergence into top delta maillons at y = -4.04
  const lineCascades = useMemo(() => {
    if (!showLines || !attachmentPoints) return [];

    const leftMaillon = new THREE.Vector3(-0.44, -4.04, -0.01);
    const rightMaillon = new THREE.Vector3(0.44, -4.04, -0.01);

    const colors = {
      A: (blueprintMode || lineColorMode === 'mono') ? '#cbd5e1' : '#ef4444',
      B: (blueprintMode || lineColorMode === 'mono') ? '#cbd5e1' : '#eab308',
      C: (blueprintMode || lineColorMode === 'mono') ? '#cbd5e1' : '#3b82f6',
      Brake: (blueprintMode || lineColorMode === 'mono') ? '#cbd5e1' : '#dc2626'
    };

    const segments = [];

    ['A', 'B', 'C', 'Brake'].forEach((lineType) => {
      const points = attachmentPoints[lineType];
      if (!points) return;

      const col = colors[lineType];
      const leftPoints = points.filter(p => p.u < 0);
      const rightPoints = points.filter(p => p.u >= 0);

      const processWingHalf = (halfPoints, maillonPos, isRight) => {
        if (halfPoints.length === 0) return;

        const midIdx = Math.floor(halfPoints.length / 2);
        const innerCluster = halfPoints.slice(isRight ? 0 : midIdx);
        const outerCluster = halfPoints.slice(isRight ? midIdx : 0);

        const computeJunction = (cluster, yFrac) => {
          const avgPos = new THREE.Vector3();
          cluster.forEach(p => avgPos.add(p.pos));
          avgPos.divideScalar(cluster.length);
          return new THREE.Vector3().lerpVectors(maillonPos, avgPos, yFrac);
        };

        const innerJunction = computeJunction(innerCluster, 0.42);
        const outerJunction = computeJunction(outerCluster, 0.50);

        segments.push({ start: maillonPos.clone(), end: innerJunction, color: col });
        segments.push({ start: maillonPos.clone(), end: outerJunction, color: col });

        innerCluster.forEach(p => {
          segments.push({ start: innerJunction.clone(), end: p.pos.clone(), color: col });
        });

        outerCluster.forEach(p => {
          segments.push({ start: outerJunction.clone(), end: p.pos.clone(), color: col });
        });
      };

      processWingHalf(leftPoints, leftMaillon, false);
      processWingHalf(rightPoints, rightMaillon, true);
    });

    return segments;
  }, [attachmentPoints, showLines, lineColorMode, blueprintMode]);

  const linesBufferGeo = useMemo(() => {
    if (lineCascades.length === 0) return null;

    const linePositions = [];
    const lineColors = [];

    lineCascades.forEach(seg => {
      linePositions.push(
        seg.start.x, seg.start.y, seg.start.z,
        seg.end.x, seg.end.y, seg.end.z
      );
      const c = new THREE.Color(seg.color);
      lineColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
    return geo;
  }, [lineCascades]);

  // 5. ANIMATION & AERODYNAMIC SOARING
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * windSpeed;
    if (wingRef.current) {
      wingRef.current.position.y = Math.sin(t * 1.5) * 0.04;
      wingRef.current.rotation.z = Math.sin(t * 0.8) * 0.012 + (brakeLeft - brakeRight) * 0.06;
      wingRef.current.rotation.x = Math.cos(t * 1.2) * 0.008;
    }
    if (harnessGroupRef.current) {
      harnessGroupRef.current.rotation.z = Math.sin(t * 0.8) * 0.016 + (brakeLeft - brakeRight) * 0.05;
      harnessGroupRef.current.rotation.x = Math.cos(t * 1.1) * 0.01;
    }
  });

  const handleClick = (partName) => (e) => {
    if (onSelectPart) {
      e.stopPropagation();
      onSelectPart(partName);
    }
  };

  return (
    <group ref={groupRef} position={position} scale={scale} dispose={null}>
      
      {/* 1. AERO WING ASSEMBLY */}
      <group ref={wingRef}>
        
        {/* UPPER CANOPY SURFACE */}
        <mesh 
          geometry={upperGeometry} 
          castShadow 
          receiveShadow
          onClick={handleClick('Upper Wing Surface')}
        >
          <meshStandardMaterial 
            vertexColors 
            roughness={0.7} 
            metalness={0.08} 
            side={THREE.DoubleSide} 
            wireframe={wireframe || blueprintMode}
          />
        </mesh>

        {/* LOWER CANOPY SURFACE */}
        <mesh 
          geometry={lowerGeometry} 
          receiveShadow
          onClick={handleClick('Lower Undersurface')}
        >
          <meshStandardMaterial 
            vertexColors 
            roughness={0.75} 
            metalness={0.05} 
            side={THREE.DoubleSide} 
            wireframe={wireframe || blueprintMode}
          />
        </mesh>

        {/* RAM-AIR INTAKE CELL MOUTHS */}
        {showAirIntakes && (
          <mesh geometry={intakesGeometry} onClick={handleClick('Ram-Air Cell Intakes')}>
            <meshStandardMaterial 
              color={blueprintMode ? "#09090b" : "#0f172a"} 
              roughness={0.95} 
              metalness={0.0} 
              side={THREE.DoubleSide}
              wireframe={blueprintMode}
            />
          </mesh>
        )}

      </group>

      {/* 2. SUSPENSION BRIDLE / LINE CASCADES */}
      {showLines && linesBufferGeo && (
        <group onClick={handleClick('Suspension Lines Cascade')}>
          <lineSegments geometry={linesBufferGeo}>
            <lineBasicMaterial 
              vertexColors 
              transparent 
              opacity={blueprintMode ? 0.95 : 0.88} 
              linewidth={blueprintMode ? 2 : 1.5}
            />
          </lineSegments>
        </group>
      )}

      {/* 3. BRAKE RISERS & STEERING TOGGLE HANDLES (Physically linked to maillons at top, carabiners at bottom) */}
      {showRisers && (
        <BrakeRisers 
          position={[0, -5.10, -0.01]} 
          brakeLeft={brakeLeft}
          brakeRight={brakeRight}
          toggleColor={toggleColor}
          blueprintMode={blueprintMode}
          onSelectPart={onSelectPart}
        />
      )}

      {/* 4. DETAILED PARAGLIDING HARNESS (Anchored directly to carabiners) */}
      {showHarness && (
        <group ref={harnessGroupRef} position={[0, -5.46, -0.02]}>
          <ParagliderHarness 
            shellColor={harnessColor}
            cushionColor={cushionColor}
            blueprintMode={blueprintMode}
            onSelectPart={onSelectPart}
          />
        </group>
      )}

    </group>
  );
});

export default TandemCanopy;
