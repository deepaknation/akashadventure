import React, { useState } from 'react';
import { FaTimes, FaPlus, FaClock, FaTag, FaUsers, FaRupeeSign } from 'react-icons/fa';
import { CATEGORIES } from '../../data/slotData';

export default function AddSlotModal({ isOpen, onClose, selectedDate, onAddSlot }) {
  const [time, setTime] = useState('09:20 AM - 11:00 AM');
  const [categoryKey, setCategoryKey] = useState('STANDARD');
  const [totalSlots, setTotalSlots] = useState(4);
  const [customPrice, setCustomPrice] = useState(3500);
  const [customToken, setCustomToken] = useState(1000);
  const [thermalCheck, setThermalCheck] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSlot = {
      id: `${selectedDate}-custom-${Date.now()}`,
      time: time.trim(),
      categoryKey,
      totalSlots: parseInt(totalSlots, 10) || 4,
      bookedSlots: 0,
      locked: false,
      thermalCheckRequired: categoryKey === 'CROSS_COUNTRY' || thermalCheck,
      customPrice: parseInt(customPrice, 10),
      customToken: parseInt(customToken, 10)
    };
    onAddSlot(newSlot);
    onClose();
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
        maxWidth: '520px',
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
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Add New Flight Slot
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Date: <strong>{selectedDate}</strong> (Akash Adventures Schedule)
            </span>
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

        <form onSubmit={handleSubmit}>
          {/* Time Block */}
          <div style={{ marginBottom: '1rem' }}>
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FaClock size={12} /> Time Window *
              </span>
            </label>
            <input
              type="text"
              className="form-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 09:20 AM - 11:00 AM (1 hr 40 min)"
              required
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: '1rem' }}>
            <label className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FaTag size={12} /> Flight Category Focus *
              </span>
            </label>
            <select
              className="form-input"
              value={categoryKey}
              onChange={(e) => {
                const key = e.target.value;
                setCategoryKey(key);
                if (CATEGORIES[key]) {
                  setCustomPrice(CATEGORIES[key].price);
                  setCustomToken(CATEGORIES[key].tokenAmount);
                  setThermalCheck(key === 'CROSS_COUNTRY');
                }
              }}
            >
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.name} ({cat.timeBlock})
                </option>
              ))}
            </select>
          </div>

          {/* Capacity and Token grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
            <div>
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <FaUsers size={12} /> Total Capacity *
                </span>
              </label>
              <input
                type="number"
                min="1"
                max="20"
                className="form-input"
                value={totalSlots}
                onChange={(e) => setTotalSlots(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <FaRupeeSign size={12} /> Token Advance (₹) *
                </span>
              </label>
              <input
                type="number"
                min="500"
                step="500"
                className="form-input"
                value={customToken}
                onChange={(e) => setCustomToken(e.target.value)}
              />
            </div>
          </div>

          {/* Total Price */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">
              <span>Total Flight Price (₹)</span>
            </label>
            <input
              type="number"
              min="1000"
              step="500"
              className="form-input"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
            />
          </div>

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
              <FaPlus /> Add Slot to Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
