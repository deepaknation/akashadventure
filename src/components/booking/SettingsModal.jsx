import React, { useState } from 'react';
import { 
  FaCog, 
  FaTimes, 
  FaSave, 
  FaTable, 
  FaWhatsapp, 
  FaCheckCircle 
} from 'react-icons/fa';
import { 
  getWebhookConfig, 
  saveWebhookConfig 
} from '../../services/crmAutomationService';

export default function SettingsModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(getWebhookConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveWebhookConfig(config);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

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
        boxShadow: 'var(--shadow-elevated)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaCog color="#0F172A" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              CRM Integration & API Settings
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

        <form onSubmit={handleSave}>
          {/* Google Sheets Webhook URL */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FaTable color="#0F9D58" /> Google Apps Script / Webhook Endpoint
              </span>
            </label>
            <input
              type="url"
              className="form-input"
              value={config.googleAppsScriptUrl}
              onChange={(e) => setConfig({ ...config, googleAppsScriptUrl: e.target.value })}
              placeholder="https://script.google.com/macros/s/.../exec"
            />
            <span style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.25rem', display: 'block' }}>
              Upon form submission, client details & Google Maps URL are POSTed here to append rows in Google Workspace.
            </span>
          </div>

          {/* Sheet Tab Name */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">
              <span>Worksheet Name</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={config.sheetName}
              onChange={(e) => setConfig({ ...config, sheetName: e.target.value })}
              placeholder="Live_Client_Bookings_2026"
            />
          </div>

          {/* Internal Pilot Team Phone for WhatsApp Alerts */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FaWhatsapp color="#15803D" /> Internal Team Duty Alert WhatsApp Phone
              </span>
            </label>
            <input
              type="tel"
              className="form-input"
              value={config.teamAlertPhone}
              onChange={(e) => setConfig({ ...config, teamAlertPhone: e.target.value })}
              placeholder="+91 98820 99001"
            />
            <span style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.25rem', display: 'block' }}>
              Receives instant internal verified booking dispatch alert with passenger weight and pickup map link.
            </span>
          </div>

          {savedSuccess && (
            <div style={{
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '8px',
              padding: '0.6rem',
              color: '#047857',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <FaCheckCircle /> Configuration updated and persisted!
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <FaSave /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
