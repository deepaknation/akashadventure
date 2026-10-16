import React, { useState } from 'react';
import { 
  Palette, 
  RotateCw, 
  Layers, 
  Camera, 
  Eye, 
  Sliders, 
  Info, 
  Wind,
  Compass,
  Sparkles,
  Download,
  Box,
  FileCode,
  CheckCircle2
} from 'lucide-react';

export function UIOverlay({
  fabricColor,
  setFabricColor,
  secondaryColor,
  setSecondaryColor,
  accentColor,
  setAccentColor,
  harnessColor,
  setHarnessColor,
  cushionColor,
  setCushionColor,
  showLines,
  setShowLines,
  showAirIntakes,
  setShowAirIntakes,
  showRisers,
  setShowRisers,
  showHarness,
  setShowHarness,
  lineColorMode,
  setLineColorMode,
  brakeLeft,
  setBrakeLeft,
  brakeRight,
  setBrakeRight,
  windSpeed,
  setWindSpeed,
  wireframe,
  setWireframe,
  blueprintMode,
  setBlueprintMode,
  autoRotate,
  setAutoRotate,
  onSetCameraView,
  onCaptureSnapshot,
  onExportBlenderGLB,
  onExportBlenderOBJ,
  activeHighlight,
  setActiveHighlight
}) {
  const [panelOpen, setPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('design'); // 'design', 'flight', 'blueprint', 'export'
  const [exportNotice, setExportNotice] = useState(null);

  const handleExport = (type) => {
    if (type === 'glb') {
      onExportBlenderGLB();
      setExportNotice('Exported tandem-paraglider-blender.glb successfully! Ready to drag & drop into Blender.');
    } else {
      onExportBlenderOBJ();
      setExportNotice('Exported tandem-paraglider.obj successfully!');
    }
    setTimeout(() => setExportNotice(null), 5000);
  };

  const colorPresets = [
    { name: 'Sky Blue & White', primary: '#2563eb', secondary: '#ffffff', accent: '#1d4ed8' },
    { name: 'Solar Sunset', primary: '#ea580c', secondary: '#fef08a', accent: '#dc2626' },
    { name: 'Neon Ozone', primary: '#06b6d4', secondary: '#a3e635', accent: '#0e7490' },
    { name: 'Alpine Crimson', primary: '#e11d48', secondary: '#ffffff', accent: '#9f1239' },
    { name: 'Stealth Carbon', primary: '#1e293b', secondary: '#94a3b8', accent: '#0f172a' },
    { name: 'Sunburst Gold', primary: '#eab308', secondary: '#ffffff', accent: '#ca8a04' }
  ];

  const applyPreset = (preset) => {
    setFabricColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setAccentColor(preset.accent);
  };

  return (
    <>
      {/* Top Header */}
      <header className="top-header">
        <div className="brand-badge">
          <div className="brand-icon">
            <Box size={18} />
          </div>
          <div>
            <div className="brand-title">Paraglider CAD Studio</div>
            <div className="brand-subtitle">Canopy + Risers + Harness 3D</div>
          </div>
        </div>

        {/* Blueprint CAD Toggle Chip */}
        <button 
          className={`spec-chip ${blueprintMode ? 'active-chip' : ''}`}
          style={{ 
            cursor: 'pointer', 
            background: blueprintMode ? 'rgba(56, 189, 248, 0.25)' : 'rgba(56, 189, 248, 0.1)',
            borderColor: blueprintMode ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)'
          }}
          onClick={() => setBlueprintMode(!blueprintMode)}
          title="Toggle Wireframe Blueprint CAD Mode"
        >
          <Sparkles size={14} />
          <span>{blueprintMode ? '✓ Blueprint CAD Mode' : 'Blueprint Mode'}</span>
        </button>
      </header>

      {/* Top Actions (Right) */}
      <div className="top-actions">
        {/* Quick 1-Click Blender Export Button */}
        <button 
          className="icon-btn active"
          style={{ 
            width: 'auto', 
            padding: '0 16px', 
            gap: 8, 
            background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
            color: '#fff',
            fontWeight: 700,
            border: 'none',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
          }}
          onClick={() => handleExport('glb')}
          title="Export 3D Model to Blender (.GLB binary)"
        >
          <Download size={16} />
          <span style={{ fontSize: 13 }}>Blender (.GLB)</span>
        </button>

        <button 
          className={`icon-btn ${autoRotate ? 'active' : ''}`} 
          title="Toggle 360° Studio Rotation"
          onClick={() => setAutoRotate(!autoRotate)}
        >
          <RotateCw size={18} />
        </button>

        <button 
          className={`icon-btn ${blueprintMode ? 'active' : ''}`} 
          title="Toggle CAD Topology Wireframe"
          onClick={() => setBlueprintMode(!blueprintMode)}
        >
          <Eye size={18} />
        </button>

        <button 
          className="icon-btn" 
          title="Capture High-Res Photo"
          onClick={onCaptureSnapshot}
        >
          <Camera size={18} />
        </button>

        <button 
          className={`icon-btn ${panelOpen ? 'active' : ''}`} 
          title="Toggle Settings Panel"
          onClick={() => setPanelOpen(!panelOpen)}
        >
          <Sliders size={18} />
        </button>
      </div>

      {/* Export Success Toast */}
      {exportNotice && (
        <div style={{
          position: 'absolute',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          padding: '12px 20px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid #38bdf8',
          borderRadius: 12,
          color: '#f8fafc',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 13,
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} color="#38bdf8" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Active Part indicator (compact pill) */}
      {activeHighlight && (
        <div className="part-toast" style={{ left: 360 }}>
          <span style={{ fontSize: 10, opacity: 0.6, marginRight: 6 }}>SELECTED</span>
          <strong style={{ color: '#38bdf8' }}>{activeHighlight}</strong>
          <span style={{ marginLeft: 8, cursor: 'pointer', opacity: 0.5, fontSize: 11 }} onClick={() => setActiveHighlight(null)}>✕</span>
        </div>
      )}

      {/* Right Controls Dock */}
      {panelOpen && (
        <aside className="controls-dock glass-panel">
          <div className="dock-header">
            <h3>
              <Sliders size={16} className="text-cyan-400" />
              <span>Studio & Blender Tools</span>
            </h3>
            <button 
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16 }}
              onClick={() => setPanelOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Sub-Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', padding: '0 6px' }}>
            <button 
              className={`camera-btn ${activeTab === 'design' ? 'active' : ''}`}
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => setActiveTab('design')}
            >
              <Palette size={13} /> Livery
            </button>
            <button 
              className={`camera-btn ${activeTab === 'flight' ? 'active' : ''}`}
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => setActiveTab('flight')}
            >
              <Wind size={13} /> Rigging
            </button>
            <button 
              className={`camera-btn ${activeTab === 'blueprint' ? 'active' : ''}`}
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => setActiveTab('blueprint')}
            >
              <Eye size={13} /> Blueprint
            </button>
            <button 
              className={`camera-btn ${activeTab === 'export' ? 'active' : ''}`}
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => setActiveTab('export')}
            >
              <Download size={13} /> Export
            </button>
          </div>

          <div className="dock-body">
            {/* TAB 1: Livery & Colors */}
            {activeTab === 'design' && (
              <>
                <div>
                  <div className="section-title">
                    <Sparkles size={13} />
                    <span>Wing Presets</span>
                  </div>
                  <div className="preset-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    {colorPresets.map((preset) => (
                      <div
                        key={preset.name}
                        className={`preset-chip ${fabricColor.toLowerCase() === preset.primary.toLowerCase() ? 'active' : ''}`}
                        style={{ 
                          background: `linear-gradient(135deg, ${preset.primary} 50%, ${preset.secondary} 50%)`,
                          height: 50,
                          textAlign: 'center'
                        }}
                        onClick={() => applyPreset(preset)}
                      >
                        <span className="preset-name" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                          {preset.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="section-title">
                    <Palette size={13} />
                    <span>Color Channels</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13 }}>Wing Fabric (Blue)</span>
                      <input
                        type="color"
                        value={fabricColor}
                        onChange={(e) => setFabricColor(e.target.value)}
                        className="custom-color-input"
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13 }}>Wing Stripe (White)</span>
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="custom-color-input"
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13 }}>Harness Inner Cushion</span>
                      <input
                        type="color"
                        value={cushionColor}
                        onChange={(e) => setCushionColor(e.target.value)}
                        className="custom-color-input"
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13 }}>Harness Outer Shell</span>
                      <input
                        type="color"
                        value={harnessColor}
                        onChange={(e) => setHarnessColor(e.target.value)}
                        className="custom-color-input"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: Rigging & Steering Toggles */}
            {activeTab === 'flight' && (
              <>
                <div>
                  <div className="section-title">
                    <Layers size={13} />
                    <span>Rigging Visibility</span>
                  </div>

                  <div className="toggle-row">
                    <span>Pilot Harness (Pod)</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={showHarness} 
                        onChange={(e) => setShowHarness(e.target.checked)} 
                      />
                      <span className="slider-switch"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <span>V-Angled Risers & Toggles</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={showRisers} 
                        onChange={(e) => setShowRisers(e.target.checked)} 
                      />
                      <span className="slider-switch"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <span>Suspension Line Cascades</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={showLines} 
                        onChange={(e) => setShowLines(e.target.checked)} 
                      />
                      <span className="slider-switch"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <span>Ram-Air Cell Intakes</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={showAirIntakes} 
                        onChange={(e) => setShowAirIntakes(e.target.checked)} 
                      />
                      <span className="slider-switch"></span>
                    </label>
                  </div>
                </div>

                <div className="range-group">
                  <div className="range-label">
                    <span>Left Brake Toggle (Pull Down)</span>
                    <span style={{ fontFamily: 'monospace' }}>{(brakeLeft * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={brakeLeft}
                    onChange={(e) => setBrakeLeft(parseFloat(e.target.value))}
                    className="custom-range"
                  />
                </div>

                <div className="range-group">
                  <div className="range-label">
                    <span>Right Brake Toggle (Pull Down)</span>
                    <span style={{ fontFamily: 'monospace' }}>{(brakeRight * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={brakeRight}
                    onChange={(e) => setBrakeRight(parseFloat(e.target.value))}
                    className="custom-range"
                  />
                </div>

                <div className="range-group">
                  <div className="range-label">
                    <span>Flight Breathing Oscillation</span>
                    <span style={{ fontFamily: 'monospace' }}>{windSpeed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2.0"
                    step="0.1"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
                    className="custom-range"
                  />
                </div>
              </>
            )}

            {/* TAB 3: Reference Blueprint Views */}
            {activeTab === 'blueprint' && (
              <>
                <div style={{ 
                  background: 'rgba(56, 189, 248, 0.08)', 
                  padding: 12, 
                  borderRadius: 12, 
                  border: '1px solid rgba(56, 189, 248, 0.2)' 
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8', marginBottom: 4 }}>
                    Camera Angles Matching References
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    Instantly align the viewport to your reference photos (Images 4 & 5).
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                  <button 
                    className="camera-btn" 
                    style={{ justifyContent: 'flex-start', background: 'rgba(255,255,255,0.06)' }}
                    onClick={() => onSetCameraView('harnessFront')}
                  >
                    <span>Image 5: Harness Front-Quarter View</span>
                  </button>

                  <button 
                    className="camera-btn" 
                    style={{ justifyContent: 'flex-start', background: 'rgba(255,255,255,0.06)' }}
                    onClick={() => onSetCameraView('harnessRear')}
                  >
                    <span>Image 4: Harness Rear Dorsal Pod</span>
                  </button>

                  <button 
                    className="camera-btn" 
                    style={{ justifyContent: 'flex-start', background: 'rgba(255,255,255,0.06)' }}
                    onClick={() => onSetCameraView('full')}
                  >
                    <span>Full Paraglider Flight System</span>
                  </button>
                </div>

                <div className="toggle-row" style={{ marginTop: 14 }}>
                  <span>CAD Wireframe Shading</span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={blueprintMode} 
                      onChange={(e) => setBlueprintMode(e.target.checked)} 
                    />
                    <span className="slider-switch"></span>
                  </label>
                </div>
              </>
            )}

            {/* TAB 4: Export to Blender */}
            {activeTab === 'export' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ 
                  background: 'rgba(15, 23, 42, 0.7)', 
                  padding: 14, 
                  borderRadius: 12, 
                  border: '1px solid var(--border-subtle)' 
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Box size={16} className="text-cyan-400" />
                    <span>Blender 3D Native Export</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
                    Exports the complete 3D model (Canopy, lines, risers, toggles, and harness) directly as a standard `.glb` file for Blender 3.x / 4.x.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button 
                      className="camera-btn active"
                      style={{ justifyContent: 'center', padding: '10px 14px', fontWeight: 700 }}
                      onClick={() => handleExport('glb')}
                    >
                      <Download size={15} /> Export for Blender (.GLB binary)
                    </button>
                    <button 
                      className="camera-btn"
                      style={{ justifyContent: 'center', padding: '8px 14px' }}
                      onClick={() => handleExport('obj')}
                    >
                      <Download size={15} /> Export Wavefront (.OBJ mesh)
                    </button>
                  </div>
                </div>

                <div style={{ 
                  background: 'rgba(15, 23, 42, 0.7)', 
                  padding: 14, 
                  borderRadius: 12, 
                  border: '1px solid var(--border-subtle)' 
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileCode size={15} className="text-cyan-400" />
                    <span>Components Generated</span>
                  </div>
                  <ul style={{ fontSize: 11, color: '#94a3b8', paddingLeft: 18, lineHeight: 1.6 }}>
                    <li><code>src/TandemCanopy.jsx</code> (42-Cell Wing)</li>
                    <li><code>src/components/ParagliderHarness.jsx</code></li>
                    <li><code>src/components/BrakeRisers.jsx</code></li>
                    <li><code>src/utils/export3D.js</code> (Blender Exporter)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Bottom Camera Angle Dock */}
      <div className="camera-dock">
        <button className="camera-btn" onClick={() => onSetCameraView('harnessFront')} title="Image 5 Front View">
          <span>Harness Front</span>
        </button>
        <button className="camera-btn" onClick={() => onSetCameraView('harnessRear')} title="Image 4 Rear Dorsal View">
          <span>Harness Rear</span>
        </button>
        <button className="camera-btn" onClick={() => onSetCameraView('toggles')} title="Toggles & Risers">
          <span>Toggles</span>
        </button>
        <button className="camera-btn" onClick={() => onSetCameraView('full')} title="Full Flight View">
          <span>Full Glider</span>
        </button>
        <button className="camera-btn" onClick={() => onSetCameraView('pilot')} title="Looking up into Canopy">
          <span>Pilot POV</span>
        </button>
        <button className="camera-btn" onClick={() => onSetCameraView('wing')} title="Canopy Upper Surface">
          <span>Wing Foil</span>
        </button>
      </div>

      {/* Bottom Left Specification Sheet */}
      <div className="specs-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#38bdf8' }}>
          <Compass size={14} />
          <span>System Topology</span>
        </div>
        <div className="spec-row">
          <span>Canopy:</span>
          <span className="spec-val">42-Cell Elliptical Arch</span>
        </div>
        <div className="spec-row">
          <span>Harness:</span>
          <span className="spec-val">Volumetric Pod & Airbag</span>
        </div>
        <div className="spec-row">
          <span>Risers:</span>
          <span className="spec-val">V-Angled with Brake Arms</span>
        </div>
        <div className="spec-row">
          <span>Export:</span>
          <span className="spec-val">Blender GLTF / OBJ</span>
        </div>
      </div>
    </>
  );
}

export default UIOverlay;
