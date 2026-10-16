import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

// --- HIGH-FIDELITY BRAKE RISERS & STEERING TOGGLES COMPONENT ---
// Recreates the authentic paragliding risers, delta maillons, ceramic pulleys,
// and closed teardrop ergonomic brake handles from user reference Images 3 & 5.

export function BrakeRisers({
  position = [0, 0, 0],
  scale = 1,
  brakeLeft = 0,         // 0 to 1 pull amount
  brakeRight = 0,        // 0 to 1 pull amount
  webbingColor = "#18181b",
  toggleColor = "#dc2626",      // Deep red toggle handle
  hardwareColor = "#94a3b8",    // Delta quick-link maillons
  blueprintMode = false,
  onSelectPart = null
}) {
  const riserGroup = useRef();

  const handleClick = (partName) => (e) => {
    if (onSelectPart) {
      e.stopPropagation();
      onSelectPart(partName);
    }
  };

  // 1. PROCEDURAL CLOSED TEARDROP TOGGLE HANDLE GEOMETRY (Image 3 & 5)
  // Continuous smooth closed webbing loop with zero gaps
  const teardropHandleGeo = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0.07, 0),        // Top apex sleeve
      new THREE.Vector3(-0.042, 0.02, 0),    // Left upper flare
      new THREE.Vector3(-0.045, -0.04, 0),   // Left lower curve
      new THREE.Vector3(-0.025, -0.075, 0),  // Left bottom
      new THREE.Vector3(0, -0.08, 0),        // Bottom center
      new THREE.Vector3(0.025, -0.075, 0),   // Right bottom
      new THREE.Vector3(0.045, -0.04, 0),    // Right lower curve
      new THREE.Vector3(0.042, 0.02, 0),     // Right upper flare
      new THREE.Vector3(0, 0.07, 0)         // Closed back to apex!
    ];
    const curve = new THREE.CatmullRomCurve3(points, true);
    return new THREE.TubeGeometry(curve, 32, 0.0075, 8, true);
  }, []);

  const renderRiserAssembly = (isRight, brakeAmount) => {
    const xSign = isRight ? 1 : -1;
    // Riser hang-point base directly at carabiner
    const riserBaseX = 0.20 * xSign;
    // Outward V-flare angle towards canopy lines (Image 5)
    const vAngle = -0.228 * xSign;
    const toggleYOffset = -brakeAmount * 0.45;

    return (
      <group key={isRight ? 'right-riser' : 'left-riser'} position={[riserBaseX, 0, 0]}>
        
        {/* ANGLED RISER LEG (Flaring outward in V-shape) */}
        <group rotation={[0, 0, vAngle]}>
          
          {/* 1. MAIN WEBBING RISER STRAP */}
          <group onClick={handleClick(isRight ? 'Right Riser Webbing' : 'Left Riser Webbing')}>
            <mesh position={[0, 0.52, 0]} castShadow>
              <boxGeometry args={[0.034, 1.05, 0.012]} />
              <meshStandardMaterial 
                color={blueprintMode ? "#1f2937" : webbingColor} 
                roughness={0.8}
                wireframe={blueprintMode}
              />
            </mesh>

            {/* Black reinforcement wrapping bands (Image 3) */}
            <mesh position={[0, 0.32, 0]}>
              <boxGeometry args={[0.042, 0.14, 0.018]} />
              <meshStandardMaterial color={blueprintMode ? "#334155" : "#09090b"} roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.75, 0]}>
              <boxGeometry args={[0.042, 0.16, 0.018]} />
              <meshStandardMaterial color={blueprintMode ? "#334155" : "#09090b"} roughness={0.9} />
            </mesh>

            {/* Bottom loop passing directly through carabiner */}
            <mesh position={[0, 0.01, 0]}>
              <torusGeometry args={[0.022, 0.006, 12, 20]} />
              <meshStandardMaterial color={blueprintMode ? "#cbd5e1" : webbingColor} roughness={0.8} />
            </mesh>
          </group>

          {/* 2. TOP DELTA MAILLONS (Stainless Steel Quick-Links for A, B, C Lines) */}
          <group position={[0, 1.06, 0]} onClick={handleClick(isRight ? 'Right Delta Maillons' : 'Left Delta Maillons')}>
            {[-0.024, 0, 0.024].map((xOffset, idx) => (
              <group key={idx} position={[xOffset, 0, 0]}>
                <mesh castShadow>
                  <torusGeometry args={[0.014, 0.0035, 8, 16]} />
                  <meshStandardMaterial color={blueprintMode ? "#ffffff" : hardwareColor} metalness={0.92} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.008, 0]}>
                  <cylinderGeometry args={[0.005, 0.005, 0.012, 12]} />
                  <meshStandardMaterial color={blueprintMode ? "#cbd5e1" : "#e2e8f0"} metalness={0.95} roughness={0.15} />
                </mesh>
              </group>
            ))}
          </group>

          {/* 3. HORIZONTAL BRAKE PULLEY STANDOFF ARM (Extending outward, Image 3 & 5) */}
          <group position={[0.035 * xSign, 0.82, -0.03]} rotation={[0, 0, -0.15 * xSign]}>
            {/* Outward horizontal arm */}
            <mesh position={[0.065 * xSign, 0, 0]}>
              <boxGeometry args={[0.13, 0.018, 0.01]} />
              <meshStandardMaterial color={blueprintMode ? "#475569" : "#09090b"} roughness={0.7} />
            </mesh>

            {/* Low-friction ceramic guide pulley ring */}
            <mesh position={[0.135 * xSign, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.014, 0.004, 12, 24]} />
              <meshStandardMaterial color={blueprintMode ? "#38bdf8" : "#0284c7"} metalness={0.8} roughness={0.3} />
            </mesh>
          </group>

        </group>

        {/* 4. VERTICAL RED BRAKE CONTROL LINE & CLOSED TEARDROP TOGGLE HANDLE */}
        <group position={[0.35 * xSign, 0.72, -0.03]}>
          
          {/* Vertical red brake line running through pulley down to toggle */}
          <mesh position={[0, -0.32 + toggleYOffset / 2, 0]}>
            <cylinderGeometry args={[0.0022, 0.0022, 0.68 - toggleYOffset, 8]} />
            <meshStandardMaterial color={blueprintMode ? "#ffffff" : "#dc2626"} roughness={0.5} />
          </mesh>

          {/* CLOSED ERGONOMIC TEARDROP TOGGLE (Zero gaps, Image 3 & 5) */}
          <group 
            position={[0, -0.66 + toggleYOffset, 0]}
            onClick={handleClick(isRight ? 'Right Brake Toggle Handle' : 'Left Brake Toggle Handle')}
          >
            {/* Top apex connection sleeve */}
            <mesh position={[0, 0.09, 0]}>
              <cylinderGeometry args={[0.007, 0.006, 0.03, 12]} />
              <meshStandardMaterial color={blueprintMode ? "#cbd5e1" : "#1f2937"} roughness={0.4} metalness={0.7} />
            </mesh>

            {/* Seamless Closed Teardrop Webbing Loop */}
            <mesh geometry={teardropHandleGeo} castShadow>
              <meshStandardMaterial 
                color={blueprintMode ? "#ffffff" : toggleColor} 
                roughness={0.65} 
                metalness={0.1}
                wireframe={blueprintMode} 
              />
            </mesh>

            {/* Thick Padded Finger Grip Bar at bottom of loop (Image 3) */}
            <mesh position={[0, -0.078, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.013, 0.013, 0.062, 16]} />
              <meshStandardMaterial color={blueprintMode ? "#cbd5e1" : "#7f1d1d"} roughness={0.75} />
            </mesh>
          </group>

        </group>

      </group>
    );
  };

  return (
    <group ref={riserGroup} position={position} scale={scale}>
      {renderRiserAssembly(false, brakeLeft)}
      {renderRiserAssembly(true, brakeRight)}
    </group>
  );
}

export default BrakeRisers;
