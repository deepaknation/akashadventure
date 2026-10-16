import React from 'react';
import { 
  FaShieldAlt, 
  FaTimes, 
  FaExclamationTriangle, 
  FaShoePrints 
} from 'react-icons/fa';
import { 
  FiWind, 
  FiAlertCircle 
} from 'react-icons/fi';
import { WEIGHT_LIMITS } from '../../data/slotData';

export default function SafetyGuidelineModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '540px',
        padding: '1.75rem',
        background: '#FFFFFF',
        border: '1px solid #CBD5E1',
        boxShadow: 'var(--shadow-elevated)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaShieldAlt color="#0F172A" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Flight Safety & Equipment Protocol
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            <FaTimes />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
          {/* Weight */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '0.85rem'
          }}>
            <strong style={{ color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FiAlertCircle color="#D97706" /> Tandem Harness Weight Criteria
            </strong>
            <p style={{ margin: '0.3rem 0 0', color: '#475569', lineHeight: 1.4 }}>
              Safe weight bracket is strictly <strong>{WEIGHT_LIMITS.MIN_WEIGHT} kg to {WEIGHT_LIMITS.MAX_WEIGHT} kg</strong>. Passengers above {WEIGHT_LIMITS.OVERWEIGHT_WARNING} kg are assigned 42m² reinforced glider wings.
            </p>
          </div>

          {/* Footwear */}
          <div>
            <h4 style={{ color: '#0F172A', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FaShoePrints color="#059669" /> 1. Footwear & Clothing
            </h4>
            <p style={{ color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              Sports shoes or hiking boots with grip are mandatory for take-off running. Open sandals, crocs, or heels are strictly prohibited.
            </p>
          </div>

          {/* Altitude Temperature */}
          <div>
            <h4 style={{ color: '#0F172A', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FiWind color="#0284C7" /> 2. Altitude Temperature & Layers
            </h4>
            <p style={{ color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              Billing take-off sits at 2,430 meters (8,000 ft ASL). Wind chill can be 8°C cooler than the valley. Carry a light windbreaker or fleece jacket.
            </p>
          </div>

          {/* Cross Country XC */}
          <div>
            <h4 style={{ color: '#0F172A', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FaExclamationTriangle color="#D97706" /> 3. Cross Country (XC) Flight Rules
            </h4>
            <p style={{ color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              XC slots require thermal activity above 2.5 m/s climb rate. If thermal inversion occurs, pilot dispatch may convert slot to standard extended flight with token adjustment.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
