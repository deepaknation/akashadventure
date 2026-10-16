import React, { useEffect, useState } from 'react';
import { X, Layers, Info, ChevronRight } from 'lucide-react';

// ── Complete Part Information Database ────────────────────────────────────
const PART_INFO = {
  'Upper Wing Surface': {
    icon: '🪂',
    title: 'Upper Wing Surface',
    subtitle: 'Extrados — Main Aerodynamic Lifting Skin',
    specs: [
      { label: 'Material', value: '40D Ripstop Nylon, 38 g/m²' },
      { label: 'Total Cells', value: '42 Elliptical Ram-Air' },
      { label: 'Flat Span', value: '≈ 11.6 m' },
      { label: 'Aspect Ratio', value: '5.8 : 1' },
      { label: 'Cert. Load', value: '8g (EN 1651)' },
      { label: 'Camber', value: '4.5% NACA modified' },
    ],
    desc: 'The pressurized upper skin provides the primary aerodynamic lifting surface. A NACA 4-digit modified airfoil profile with 4.5% camber is optimized for tandem paragliding — higher load capacity with forgiving stall behaviour.',
    color: '#3b82f6',
    category: 'CANOPY WING',
  },
  'Lower Undersurface': {
    icon: '🔵',
    title: 'Lower Canopy Surface',
    subtitle: 'Intrados — Pressurized Cell Floor',
    specs: [
      { label: 'Material', value: '40D Ripstop Nylon (coated)' },
      { label: 'Porosity', value: '< 5 L/m²/s' },
      { label: 'Color Zone', value: 'White Stripe / Secondary' },
      { label: 'Ribbing', value: 'Diagonal tension ribs' },
    ],
    desc: 'Lower surface seals the ram-air cells to maintain internal pressure. Diagonal cross-bracing ribs prevent cell distortion at high angles of attack, keeping the profile stable through turbulence.',
    color: '#6366f1',
    category: 'CANOPY WING',
  },
  'Ram-Air Cell Intakes': {
    icon: '💨',
    title: 'Ram-Air Cell Intakes',
    subtitle: 'Leading-Edge Pressurisation Inlets',
    specs: [
      { label: 'Type', value: 'Open-cell, no closure valves' },
      { label: 'Count', value: '42 individual openings' },
      { label: 'Intake Area', value: '≈ 0.12 m² total' },
      { label: 'Cell Pressure', value: '50–80 Pa above ambient' },
    ],
    desc: 'Leading-edge openings scoop ambient air as the glider flies forward, pressurizing each cell to create a structurally rigid wing without any frame or spars. Pressure is entirely dependent on forward airspeed — the glider deflates instantly if airspeed drops below minimum.',
    color: '#0ea5e9',
    category: 'CANOPY WING',
  },
  'Suspension Lines Cascade': {
    icon: '🔗',
    title: 'Suspension Line Cascade System',
    subtitle: 'A / B / C / Brake — 3-Tier Distribution',
    specs: [
      { label: 'Material', value: 'Dyneema SK75 / Aramid' },
      { label: 'Main Diam.', value: '1.5 mm (lower)' },
      { label: 'Upper Diam.', value: '0.8 mm (cascade)' },
      { label: 'Total Lines', value: '≈ 68 (A + B + C + Brake)' },
      { label: 'Break Load', value: '> 250 kg per main line' },
      { label: 'Color Code', value: 'Red=A | Yellow=B | Blue=C' },
    ],
    desc: 'Three-tier cascade distributes load from all 42 ribs into 4 delta maillon junctions per riser. Color-coded by row (A=red, B=yellow, C=blue, Brake=dark red) for fast preflight inspection. The entire line set is replaced every 300–500 flight hours.',
    color: '#f43f5e',
    category: 'RIGGING',
  },
  'Left Alloy Carabiner': {
    icon: '🔒',
    title: 'Left AustriAlpin Carabiner',
    subtitle: 'Blue Gate — Port Side Load Point',
    specs: [
      { label: 'Brand', value: 'AustriAlpin COBRA® Auto' },
      { label: 'Gate Color', value: 'Blue Anodized (Left)' },
      { label: 'MBS', value: '> 2500 daN (25 kN)' },
      { label: 'Weight', value: '≈ 128 g per unit' },
      { label: 'Gate Type', value: 'Twist-gate auto-lock' },
      { label: 'Material', value: 'High-Strength Alloy 7075' },
    ],
    desc: 'Left-side primary load-bearing connection between the harness side wing and the riser bottom loop. The blue color differentiates left from right for quick preflight ID. Twist-gate mechanism prevents accidental opening in-flight under load.',
    color: '#2563eb',
    category: 'HARNESS',
  },
  'Right Alloy Carabiner': {
    icon: '🔒',
    title: 'Right AustriAlpin Carabiner',
    subtitle: 'Lime Gate — Starboard Side Load Point',
    specs: [
      { label: 'Brand', value: 'AustriAlpin COBRA® Auto' },
      { label: 'Gate Color', value: 'Lime-Yellow Anodized (Right)' },
      { label: 'MBS', value: '> 2500 daN (25 kN)' },
      { label: 'Weight', value: '≈ 128 g per unit' },
      { label: 'Gate Type', value: 'Twist-gate auto-lock' },
      { label: 'Material', value: 'High-Strength Alloy 7075' },
    ],
    desc: 'Right-side primary load point. Lime-yellow gate color provides clear asymmetric visual confirmation — a mismatched gate color (e.g., two blue or two yellow) would immediately flag an incorrect harness-to-riser connection during preflight.',
    color: '#84cc16',
    category: 'HARNESS',
  },
  'Pod Harness Shell': {
    icon: '🪑',
    title: 'Aerodynamic Pod Harness Shell',
    subtitle: 'Tandem Pilot Bucket Enclosure',
    specs: [
      { label: 'Material', value: '500D Cordura® Ripstop' },
      { label: 'Under-Seat', value: 'Foam airbag protector pod' },
      { label: 'Pilot Range', value: '45–110 kg tandem pilot' },
      { label: 'Cert. Standard', value: 'EN 1651 (Tandem Harness)' },
      { label: 'Color', value: 'Charcoal #1a1c24' },
      { label: 'Seating', value: 'Full semi-supine recline' },
    ],
    desc: 'Fully enclosed aerodynamic pod harness with 5-point attachment system. The under-seat airbag inflates during the launch run to provide landing impact protection rated to 3.5 m/s vertical descent. The aerodynamic shell reduces pilot drag in flight by ≈12% vs. a seat board harness.',
    color: '#64748b',
    category: 'HARNESS',
  },
  'Red Ergonomic Interior Bucket Cushion': {
    icon: '🔴',
    title: 'Ergonomic Interior Bucket Cushion',
    subtitle: 'High-Density Foam Pilot Seating Surface',
    specs: [
      { label: 'Material', value: '40 mm HD Open-Cell Foam' },
      { label: 'Density', value: '38 kg/m³ compression foam' },
      { label: 'Cover', value: 'Stretch Cordura® Red' },
      { label: 'Lumbar', value: '3-channel quilted contour' },
      { label: 'Depth', value: 'Deep bucket, 12 cm recess' },
    ],
    desc: 'Contoured bucket cushion with three vertical quilted lumbar-support channels. Deep bucket recess ensures pilot sits well inside the pod for optimal pendulum stability in flight. The contoured backrest follows the spine curve to reduce fatigue on long tandem flights (60–90 min).',
    color: '#dc2626',
    category: 'HARNESS',
  },
  'Curved Shoulder Harness Yoke': {
    icon: '💪',
    title: 'Anatomical Shoulder Yoke Webbing',
    subtitle: 'Continuous Curved Load-Bearing Arch',
    specs: [
      { label: 'Material', value: '50 mm Polyester Webbing' },
      { label: 'Break Load', value: '2.2 t per strap' },
      { label: 'Padding', value: 'Neoprene comfort sleeve' },
      { label: 'Width', value: '50 mm padded yoke' },
      { label: 'Adjustment', value: 'Sternum + chest adjuster' },
    ],
    desc: 'Twin anatomical shoulder yokes arch continuously from the dorsal backpack over the pilot shoulders to the central chest buckle, distributing in-flight loads across the torso. The rear collar neck bridge connects both arches for additional structural integrity.',
    color: '#475569',
    category: 'HARNESS',
  },
  'Chest Safety Buckle': {
    icon: '🔐',
    title: 'AustriAlpin Cobra® Chest Buckle',
    subtitle: 'Central Sternum Quick-Release Closure',
    specs: [
      { label: 'Type', value: 'AustriAlpin Cobra® Auto-Lock' },
      { label: 'MBS', value: '1500 daN (15 kN)' },
      { label: 'Release', value: 'Red tongue pull (gloves OK)' },
      { label: 'Weight', value: '72 g' },
      { label: 'Standard', value: 'EN 12491 certified' },
    ],
    desc: 'One-hand, glove-friendly quick-release buckle. Auto-locks when closed. Red release tongue meets EN 12491 emergency color standard. Bridges the two shoulder yokes across the sternum, maintaining chest separation under load.',
    color: '#94a3b8',
    category: 'HARNESS',
  },
  'Groin Safety Strap': {
    icon: '❤️',
    title: 'Central Groin Safety Strap',
    subtitle: 'Anti-Ejection V-Strap from Seat to Chest',
    specs: [
      { label: 'Material', value: '25 mm Red Polyester Tubular' },
      { label: 'Break Load', value: '2.2 t anti-ejection rated' },
      { label: 'Route', value: 'Seat → crotch → chest buckle' },
      { label: 'Standard', value: 'EN 1651 required component' },
    ],
    desc: 'Continuous red tubular strap prevents pilot ejection from the bucket seat in extreme turbulence, spin, or reserve deployment. Routed as a continuous spline curve from the seat base anchor ring up through the crotch to the central chest buckle ring.',
    color: '#ef4444',
    category: 'HARNESS',
  },
  'Rescue Parachute Handle': {
    icon: '🆘',
    title: 'Emergency Reserve Handle',
    subtitle: 'Ballistic Deployment Grab Handle (Red)',
    specs: [
      { label: 'Type', value: 'Tubular Webbing D-Ring (Red)' },
      { label: 'Position', value: 'Left hip side flap' },
      { label: 'Deploy', value: 'Throw-and-release mechanism' },
      { label: 'Standard', value: 'EN 12491 certified reserve' },
    ],
    desc: 'The pilot grabs and throws this red handle to extract the ballistic reserve parachute from its left-side container. Standard left-side position for tandem pilots (EN regulations). The throw motion triggers the container pin and deploys the round reserve canopy.',
    color: '#dc2626',
    category: 'SAFETY',
  },
  'Left Riser Webbing': {
    icon: '📏',
    title: 'Left Riser Webbing Assembly',
    subtitle: 'V-Angled Load-Bearing Riser Strap',
    specs: [
      { label: 'Material', value: '45 mm Polyester Webbing' },
      { label: 'Break Load', value: '> 4500 daN (45 kN)' },
      { label: 'Length', value: '≈ 600 mm per riser' },
      { label: 'V-Angle', value: '12° outward flare' },
      { label: 'Maillons', value: '3× Delta Stainless SS316' },
    ],
    desc: 'Left-side load riser flared 12° outward from the carabiner to the delta maillon junction. Three delta quick-links attach A, B, and C line groups separately to the riser webbing. The V-shape improves lateral stability and load distribution.',
    color: '#1e293b',
    category: 'RIGGING',
  },
  'Right Riser Webbing': {
    icon: '📏',
    title: 'Right Riser Webbing Assembly',
    subtitle: 'V-Angled Load-Bearing Riser Strap',
    specs: [
      { label: 'Material', value: '45 mm Polyester Webbing' },
      { label: 'Break Load', value: '> 4500 daN (45 kN)' },
      { label: 'Length', value: '≈ 600 mm per riser' },
      { label: 'V-Angle', value: '12° outward flare' },
      { label: 'Maillons', value: '3× Delta Stainless SS316' },
    ],
    desc: 'Right-side load riser mirroring the left. Combined left+right risers must each support the total suspended weight of pilot + passenger + glider under maximum load of 8g (≈ 1000–1400 kg combined).',
    color: '#1e293b',
    category: 'RIGGING',
  },
  'Left Delta Maillons': {
    icon: '⚙️',
    title: 'Left Delta Maillon Quick-Links',
    subtitle: 'Stainless Steel Cascade Junction Hardware',
    specs: [
      { label: 'Material', value: '316L Stainless Steel' },
      { label: 'Shape', value: 'Delta / Triangular loop' },
      { label: 'MBS per link', value: '> 2000 daN' },
      { label: 'Count', value: '3 per riser (A + B + C)' },
      { label: 'Closure', value: 'Screw-gate (pre-flight check)' },
    ],
    desc: 'Stainless delta-shaped quick-links are the junction hardware joining line group cascades (A, B, C) to the riser webbing. All maillons are screwed fully closed during packing and safety-taped. Pre-flight mandatory check point.',
    color: '#94a3b8',
    category: 'RIGGING',
  },
  'Right Delta Maillons': {
    icon: '⚙️',
    title: 'Right Delta Maillon Quick-Links',
    subtitle: 'Stainless Steel Cascade Junction Hardware',
    specs: [
      { label: 'Material', value: '316L Stainless Steel' },
      { label: 'Shape', value: 'Delta / Triangular loop' },
      { label: 'MBS per link', value: '> 2000 daN' },
      { label: 'Count', value: '3 per riser (A + B + C)' },
      { label: 'Closure', value: 'Screw-gate (pre-flight check)' },
    ],
    desc: 'Right side mirror of left delta maillons. Mandatory pre-flight inspection: verify all maillon screws are fully closed flush with the gate, then safety-tape each one. An open maillon can unscrew under line vibration in flight.',
    color: '#94a3b8',
    category: 'RIGGING',
  },
  'Left Brake Toggle Handle': {
    icon: '✋',
    title: 'Left Brake Steering Toggle',
    subtitle: 'Pilot Control — Left Turn & Flare',
    specs: [
      { label: 'Shape', value: 'Closed Teardrop Webbing Loop' },
      { label: 'Material', value: '25 mm Tubular Red Webbing' },
      { label: 'Grip Bar', value: 'Padded finger crossbar' },
      { label: 'Brake Line', value: '2.2 mm Aramid' },
      { label: 'Full Pull', value: 'Flare braking effect' },
    ],
    desc: 'Pull left toggle downward to deflect the trailing edge on the left half of the canopy, inducing a left-hand turn. Full simultaneous pull on both toggles applies the landing flare, reducing sink rate by 30–40% for touchdown.',
    color: '#dc2626',
    category: 'CONTROLS',
  },
  'Right Brake Toggle Handle': {
    icon: '✋',
    title: 'Right Brake Steering Toggle',
    subtitle: 'Pilot Control — Right Turn & Flare',
    specs: [
      { label: 'Shape', value: 'Closed Teardrop Webbing Loop' },
      { label: 'Material', value: '25 mm Tubular Red Webbing' },
      { label: 'Grip Bar', value: 'Padded finger crossbar' },
      { label: 'Brake Line', value: '2.2 mm Aramid' },
      { label: 'Full Pull', value: 'Flare braking effect' },
    ],
    desc: 'Pull right toggle downward to induce a right-hand turn. Asymmetric toggle input (one side more than the other) also allows crab corrections on approach. Symmetric full pull = landing flare maneuver for tandem touchdown.',
    color: '#dc2626',
    category: 'CONTROLS',
  },
  'Structural Side Webbing': {
    icon: '📐',
    title: 'Diagonal Load-Bearing Side Webbing',
    subtitle: 'Carabiner → Seat Frame Structural Transfer',
    specs: [
      { label: 'Material', value: '25 mm Polyester Webbing' },
      { label: 'Function', value: 'Carabiner → seat frame load' },
      { label: 'Angle', value: '≈ 24° diagonal' },
      { label: 'Break Load', value: '1.8 t per strap' },
    ],
    desc: 'Short diagonal webbing transfers the full in-flight load from the carabiner attachment point down through the lateral wing wall into the seat frame base. Each strap carries approximately half the total suspended weight (pilot + passenger) during flight.',
    color: '#334155',
    category: 'HARNESS',
  },
  'Front Leg Support Apron': {
    icon: '🦵',
    title: 'Front Leg Support Apron',
    subtitle: 'Padded Thigh Brace & Aerodynamic Fairing',
    specs: [
      { label: 'Material', value: '500D Cordura® + HD Foam' },
      { label: 'Seams', value: '2 horizontal quilted channels' },
      { label: 'Function', value: 'Thigh support + pod fairing' },
      { label: 'Accent Patch', value: 'Red reflective oval (lower)' },
    ],
    desc: 'Padded front apron supports pilot thighs and provides the aerodynamic lower fairing of the pod. The lower red oval is a combined airbag pressure indicator and ground-level reflective safety patch visible to landing-zone ground crew.',
    color: '#374151',
    category: 'HARNESS',
  },
};

const CATEGORY_COLORS = {
  'CANOPY WING': '#3b82f6',
  'RIGGING': '#f59e0b',
  'HARNESS': '#10b981',
  'CONTROLS': '#ef4444',
  'SAFETY': '#f97316',
};

export function PartInfoPanel({ partName, onClose }) {
  const [visible, setVisible] = useState(false);
  const [animOut, setAnimOut] = useState(false);

  useEffect(() => {
    if (partName) {
      setAnimOut(false);
      setVisible(true);
    } else {
      setAnimOut(true);
      const t = setTimeout(() => setVisible(false), 320);
      return () => clearTimeout(t);
    }
  }, [partName]);

  if (!visible) return null;

  const info = PART_INFO[partName] || {
    icon: '🔎',
    title: partName || 'Unknown Component',
    subtitle: 'Paraglider Component',
    specs: [],
    desc: 'Click any part of the 3D model to view detailed technical specifications and information.',
    color: '#38bdf8',
    category: 'COMPONENT',
  };

  const catColor = CATEGORY_COLORS[info.category] || info.color;

  return (
    <div
      style={{
        position: 'absolute',
        left: 24,
        top: '50%',
        transform: `translateY(-50%) ${animOut ? 'translateX(-110%)' : 'translateX(0)'}`,
        zIndex: 50,
        width: 320,
        background: 'rgba(6, 12, 30, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${info.color}44`,
        borderLeft: `3px solid ${info.color}`,
        borderRadius: 16,
        boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 40px ${info.color}18`,
        transition: 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${info.color}, transparent)`,
        width: '100%',
      }} />

      {/* Header */}
      <div style={{ padding: '16px 18px 12px', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(255,255,255,0.08)', border: 'none',
            color: '#94a3b8', cursor: 'pointer', borderRadius: 8,
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          <X size={14} />
        </button>

        {/* Category badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 9px', borderRadius: 999,
          background: `${catColor}20`, border: `1px solid ${catColor}40`,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          color: catColor, marginBottom: 10, textTransform: 'uppercase',
        }}>
          <Layers size={9} />
          {info.category || 'COMPONENT'}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            fontSize: 28, width: 46, height: 46,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${info.color}18`, borderRadius: 12,
            border: `1px solid ${info.color}30`, flexShrink: 0,
          }}>
            {info.icon}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>
              {info.title}
            </div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 3, lineHeight: 1.3 }}>
              {info.subtitle}
            </div>
          </div>
        </div>
      </div>

      {/* Specs Table */}
      {info.specs && info.specs.length > 0 && (
        <div style={{ margin: '0 18px 12px', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          {info.specs.map((spec, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '7px 12px',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
              borderBottom: i < info.specs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{spec.label}</span>
              <span style={{ fontSize: 11, color: '#e2e8f0', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <div style={{
        margin: '0 18px 16px',
        padding: '10px 12px',
        background: `${info.color}0c`,
        borderRadius: 10,
        border: `1px solid ${info.color}20`,
      }}>
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
          <Info size={13} style={{ color: info.color, marginTop: 1, flexShrink: 0 }} />
          <p style={{ fontSize: 11.5, color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            {info.desc}
          </p>
        </div>
      </div>

      {/* Bottom hint */}
      <div style={{
        padding: '10px 18px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 10, color: '#334155',
      }}>
        <ChevronRight size={10} />
        Click any other part to inspect it
      </div>
    </div>
  );
}

export default PartInfoPanel;
