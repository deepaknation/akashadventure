import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { TandemCanopy } from './TandemCanopy';
import { UIOverlay } from './UIOverlay';
import { PartInfoPanel } from './PartInfoPanel';
import { exportToBlenderGLTF, exportToBlenderOBJ } from '../../utils/export3D';
import './canopy-3d.css';

// Grid background component rendered inside the 3D canvas
function GridBackground() {
  return (
    <>
      <Grid
        position={[0, -7.5, 0]}
        args={[200, 200]}
        cellSize={1}
        cellThickness={0.4}
        cellColor={'#1e3a5f'}
        sectionSize={5}
        sectionThickness={0.9}
        sectionColor={'#1d4ed8'}
        fadeDistance={65}
        fadeStrength={1.6}
        followCamera={false}
        infiniteGrid
      />
      <Grid
        position={[0, 0, -20]}
        rotation={[Math.PI / 2, 0, 0]}
        args={[200, 200]}
        cellSize={1}
        cellThickness={0.25}
        cellColor={'#0f2349'}
        sectionSize={5}
        sectionThickness={0.5}
        sectionColor={'#1e3a8a'}
        fadeDistance={45}
        fadeStrength={2.2}
        followCamera={false}
        infiniteGrid
      />
    </>
  );
}

// Camera controller helper with smooth cancelable cubic easing
function CameraController({ targetPosition, targetLookAt, controlsRef }) {
  const { camera } = useThree();

  const posX = targetPosition?.[0];
  const posY = targetPosition?.[1];
  const posZ = targetPosition?.[2];
  const lookX = targetLookAt?.[0] ?? 0;
  const lookY = targetLookAt?.[1] ?? 0;
  const lookZ = targetLookAt?.[2] ?? 0;

  useEffect(() => {
    if (!controlsRef.current) return;
    
    const controls = controlsRef.current;
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(posX, posY, posZ);
    const startTarget = controls.target.clone();
    const endTarget = new THREE.Vector3(lookX, lookY, lookZ);

    let startTime = null;
    const duration = 550;
    let animId;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(startPos, endPos, ease);
      controls.target.lerpVectors(startTarget, endTarget, ease);
      controls.update();

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [posX, posY, posZ, lookX, lookY, lookZ, camera, controlsRef]);

  return null;
}

export default function CanopyViewer() {
  const [fabricColor, setFabricColor] = useState('#2563eb');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [accentColor, setAccentColor] = useState('#1d4ed8');
  const [harnessColor, setHarnessColor] = useState('#1a1c23');
  const [cushionColor, setCushionColor] = useState('#dc2626');
  
  const [showLines, setShowLines] = useState(true);
  const [showAirIntakes, setShowAirIntakes] = useState(true);
  const [showRisers, setShowRisers] = useState(true);
  const [showHarness, setShowHarness] = useState(true);
  const [lineColorMode, setLineColorMode] = useState('cascade');
  const [brakeLeft, setBrakeLeft] = useState(0);
  const [brakeRight, setBrakeRight] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0.8);
  const [wireframe, setWireframe] = useState(false);
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [selectedPartInfo, setSelectedPartInfo] = useState(null);

  const [cameraTarget, setCameraTarget] = useState({
    pos: [0.8, -4.8, 2.8],
    look: [0, -5.1, 0]
  });

  const controlsRef = useRef();
  const gliderAssemblyRef = useRef();

  const handleSelectPart = (partName) => {
    setActiveHighlight(partName);
    setSelectedPartInfo(partName);
  };

  const handleSetCameraView = (viewType) => {
    switch (viewType) {
      case 'harnessRear':
      case 'blueprintHarness':
        setCameraTarget({ pos: [-1.2, -4.8, -1.8], look: [0, -5.1, 0] });
        break;
      case 'harnessFront':
      case 'blueprintFront':
        setCameraTarget({ pos: [0.75, -4.6, 2.2], look: [0, -5.0, 0] });
        break;
      case 'full':
      case 'blueprintFull':
        setCameraTarget({ pos: [8.5, -2.2, 12.0], look: [0, -2.8, 0] });
        break;
      case 'toggles':
        setCameraTarget({ pos: [0.75, -4.2, 1.2], look: [0.35, -4.4, 0] });
        break;
      case 'pilot':
        setCameraTarget({ pos: [0, -5.3, 0.4], look: [0, 1.0, 0] });
        break;
      case 'wing':
        setCameraTarget({ pos: [7, 1.5, 7.5], look: [0, 0.5, 0] });
        break;
      default:
        break;
    }
  };

  const handleCaptureSnapshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `tandem-paraglider-harness-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleExportBlenderGLB = () => {
    if (gliderAssemblyRef.current) {
      exportToBlenderGLTF(gliderAssemblyRef.current, 'tandem-paraglider-blender.glb');
    }
  };

  const handleExportBlenderOBJ = () => {
    if (gliderAssemblyRef.current) {
      exportToBlenderOBJ(gliderAssemblyRef.current, 'tandem-paraglider.obj');
    }
  };

  return (
    <div 
      className="canopy-studio-root"
      style={{ 
        background: blueprintMode 
          ? 'radial-gradient(ellipse at 50% 30%, #0c1a3a 0%, #040d1f 60%, #020810 100%)'
          : 'radial-gradient(ellipse at 50% 30%, #0d1b3e 0%, #060f28 55%, #030818 100%)'
      }}
    >
      
      {/* HUD Controls */}
      <UIOverlay
        fabricColor={fabricColor}
        setFabricColor={setFabricColor}
        secondaryColor={secondaryColor}
        setSecondaryColor={setSecondaryColor}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        harnessColor={harnessColor}
        setHarnessColor={setHarnessColor}
        cushionColor={cushionColor}
        setCushionColor={setCushionColor}
        showLines={showLines}
        setShowLines={setShowLines}
        showAirIntakes={showAirIntakes}
        setShowAirIntakes={setShowAirIntakes}
        showRisers={showRisers}
        setShowRisers={setShowRisers}
        showHarness={showHarness}
        setShowHarness={setShowHarness}
        lineColorMode={lineColorMode}
        setLineColorMode={setLineColorMode}
        brakeLeft={brakeLeft}
        setBrakeLeft={setBrakeLeft}
        brakeRight={brakeRight}
        setBrakeRight={setBrakeRight}
        windSpeed={windSpeed}
        setWindSpeed={setWindSpeed}
        wireframe={wireframe}
        setWireframe={setWireframe}
        blueprintMode={blueprintMode}
        setBlueprintMode={setBlueprintMode}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        onSetCameraView={handleSetCameraView}
        onCaptureSnapshot={handleCaptureSnapshot}
        onExportBlenderGLB={handleExportBlenderGLB}
        onExportBlenderOBJ={handleExportBlenderOBJ}
        activeHighlight={activeHighlight}
        setActiveHighlight={setActiveHighlight}
      />

      {/* Part Info Panel (click-to-inspect) */}
      <PartInfoPanel 
        partName={selectedPartInfo} 
        onClose={() => { setSelectedPartInfo(null); setActiveHighlight(null); }} 
      />

      {/* 3D Scene */}
      <div className="canvas-container">
        <Canvas 
          camera={{ position: [0.8, -4.8, 2.8], fov: 46 }}
          gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
          shadows
        >
          {/* Blue-tinted ambient light for the CAD studio feel */}
          <ambientLight intensity={0.5} color="#b0c4ff" />
          
          {/* Key Light */}
          <directionalLight 
            position={[8, 12, 10]} 
            intensity={1.4} 
            castShadow 
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
            color="#e8f0ff"
          />
          {/* Fill Light (cool blue-violet) */}
          <directionalLight position={[-8, 6, 8]} intensity={0.6} color="#8eb4ff" />
          {/* Rim / Back Light */}
          <directionalLight position={[0, -2, -10]} intensity={0.7} color="#ffffff" />
          {/* Upward ground bounce (blue tint matching grid) */}
          <directionalLight position={[0, -10, 0]} intensity={0.25} color="#1e40af" />

          {/* Grid floor & wall planes */}
          <GridBackground />

          {/* Environment */}
          <Environment preset="city" />

          {/* Paraglider Assembly with subtle flight breathing */}
          <Float speed={blueprintMode ? 0 : 0.8} rotationIntensity={0.03} floatIntensity={0.06}>
            <TandemCanopy 
              ref={gliderAssemblyRef}
              position={[0, 0, 0]} 
              scale={1} 
              fabricColor={fabricColor} 
              secondaryColor={secondaryColor}
              accentColor={accentColor}
              harnessColor={harnessColor}
              cushionColor={cushionColor}
              showLines={showLines}
              showAirIntakes={showAirIntakes}
              showRisers={showRisers}
              showHarness={showHarness}
              lineColorMode={lineColorMode}
              brakeLeft={brakeLeft}
              brakeRight={brakeRight}
              windSpeed={blueprintMode ? 0 : windSpeed}
              wireframe={wireframe}
              blueprintMode={blueprintMode}
              activeHighlight={activeHighlight}
              onSelectPart={handleSelectPart}
            />
          </Float>

          {/* Soft Ground Contact Shadow */}
          <ContactShadows 
            position={[0, -6.1, 0]} 
            opacity={0.35} 
            scale={8} 
            blur={2.5} 
            far={3.5} 
            color="#0a1628"
          />

          {/* Smooth Camera Transition Controller */}
          <CameraController 
            targetPosition={cameraTarget.pos} 
            targetLookAt={cameraTarget.look} 
            controlsRef={controlsRef} 
          />

          {/* OrbitControls */}
          <OrbitControls 
            ref={controlsRef}
            makeDefault 
            autoRotate={autoRotate}
            autoRotateSpeed={1.0}
            enableDamping={true}
            dampingFactor={0.06}
            minDistance={0.6}
            maxDistance={30}
          />
        </Canvas>
      </div>

    </div>
  );
}
