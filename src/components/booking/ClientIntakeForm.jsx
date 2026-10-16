import React, { useState } from 'react';
import { 
  FaUser, 
  FaWhatsapp, 
  FaWeightHanging, 
  FaMapMarkerAlt, 
  FaArrowLeft, 
  FaArrowRight, 
  FaCheckCircle, 
  FaVideo 
} from 'react-icons/fa';
import { 
  FiExternalLink, 
  FiNavigation, 
  FiMail 
} from 'react-icons/fi';
import { POPULAR_PICKUP_POINTS, WEIGHT_LIMITS } from '../../data/slotData';

export default function ClientIntakeForm({ 
  formData, 
  setFormData, 
  selectedSlot, 
  selectedDate, 
  onBack, 
  onNext 
}) {
  const [gpsDetecting, setGpsDetecting] = useState(false);
  const [errors, setErrors] = useState({});

  // Real-time weight check
  const weight = parseFloat(formData.weight) || 0;
  const isWeightValid = weight >= WEIGHT_LIMITS.MIN_WEIGHT && weight <= WEIGHT_LIMITS.MAX_WEIGHT;
  const isHeavy = weight > WEIGHT_LIMITS.OVERWEIGHT_WARNING;

  // Handle GPS detect
  const handleAutoDetectLocation = () => {
    setGpsDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(5);
          const lng = position.coords.longitude.toFixed(5);
          const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
          setFormData(prev => ({
            ...prev,
            pickupLocation: `Current GPS Pin (${lat}, ${lng})`,
            mapsUrl
          }));
          setGpsDetecting(false);
        },
        () => {
          const fallbackLat = 32.0402;
          const fallbackLng = 76.7169;
          const mapsUrl = `https://maps.google.com/?q=${fallbackLat},${fallbackLng}`;
          setFormData(prev => ({
            ...prev,
            pickupLocation: 'Bir Landing Ground (Main LZ Cafe)',
            mapsUrl
          }));
          setGpsDetecting(false);
        },
        { timeout: 8000 }
      );
    } else {
      setGpsDetecting(false);
    }
  };

  // Preset pickup selection
  const handleSelectPresetPickup = (e) => {
    const val = e.target.value;
    if (!val) return;
    const preset = POPULAR_PICKUP_POINTS.find(p => p.name === val);
    if (preset) {
      setFormData(prev => ({
        ...prev,
        pickupLocation: preset.name,
        mapsUrl: preset.mapsUrl
      }));
    } else if (val === 'CUSTOM') {
      setFormData(prev => ({
        ...prev,
        pickupLocation: '',
        mapsUrl: ''
      }));
    }
  };

  // Validation
  const validateAndProceed = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.clientName || formData.clientName.trim().length < 3) {
      newErrors.clientName = 'Full Name is required (min 3 characters)';
    }

    if (!formData.whatsapp || formData.whatsapp.trim().length < 10) {
      newErrors.whatsapp = 'Valid WhatsApp phone number is required';
    }

    const ageNum = parseInt(formData.age, 10);
    if (!formData.age || isNaN(ageNum) || ageNum < 12 || ageNum > 80) {
      newErrors.age = 'Age must be between 12 and 80 years';
    }

    if (!formData.weight || isNaN(weight) || weight < WEIGHT_LIMITS.MIN_WEIGHT || weight > WEIGHT_LIMITS.MAX_WEIGHT) {
      newErrors.weight = `Weight must be within safety limits (${WEIGHT_LIMITS.MIN_WEIGHT}kg - ${WEIGHT_LIMITS.MAX_WEIGHT}kg)`;
    }

    if (!formData.pickupLocation || formData.pickupLocation.trim().length < 3) {
      newErrors.pickupLocation = 'Pickup location is required for shuttle dispatch';
    }

    if (!formData.mapsUrl || !formData.mapsUrl.includes('http')) {
      newErrors.mapsUrl = 'Valid Google Maps URL is required for CRM logistics sync';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="animate-slide-up" style={{ width: '100%', maxWidth: '860px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#475569',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: 0,
            marginBottom: '0.75rem'
          }}
        >
          <FaArrowLeft /> Back to Slot Selection
        </button>

        <div style={{
          alignItems: 'center',
          gap: '0.4rem',
          background: '#F1F5F9',
          color: '#475569',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '0.2rem 0.65rem',
          borderRadius: '9999px',
          marginBottom: '0.5rem',
          border: '1px solid #E2E8F0',
          display: 'inline-flex',
          width: 'fit-content'
        }}>
          Step 2: Client Intake & Flight Readiness
        </div>

        <h2 style={{
          fontSize: '1.65rem',
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: '-0.02em',
          margin: '0 0 0.35rem'
        }}>
          Passenger Information & Logistics
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Slot: <strong style={{ color: '#0F172A' }}>{selectedSlot?.time}</strong> ({selectedSlot?.categoryMeta?.name}) on <strong style={{ color: '#0F172A' }}>{selectedDate}</strong>
        </p>
      </div>

      <form onSubmit={validateAndProceed}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          
          {/* Passenger Identity Card */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{
              fontSize: '0.98rem',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaUser color="#0F172A" /> Passenger Details
            </h3>

            {/* Name */}
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">
                <span>Full Name *</span>
                {errors.clientName && <span style={{ color: '#E11D48', fontSize: '0.75rem' }}>{errors.clientName}</span>}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Rahul Sharma"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              />
            </div>

            {/* WhatsApp Phone */}
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <FaWhatsapp color="#15803D" /> WhatsApp Contact (for alerts) *
                </span>
                {errors.whatsapp && <span style={{ color: '#E11D48', fontSize: '0.75rem' }}>{errors.whatsapp}</span>}
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 98765 43210"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.2rem', display: 'block' }}>
                Confirmation & flight briefing will be delivered via WhatsApp Cloud API.
              </span>
            </div>

            {/* Age & Weight Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
              {/* Age */}
              <div>
                <label className="form-label">
                  <span>Age (Years) *</span>
                  {errors.age && <span style={{ color: '#E11D48', fontSize: '0.75rem' }}>{errors.age}</span>}
                </label>
                <input
                  type="number"
                  min="12"
                  max="80"
                  className="form-input"
                  placeholder="e.g. 28"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>

              {/* Weight */}
              <div>
                <label className="form-label">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FaWeightHanging color="#0F172A" size={12} /> Weight (kg) *
                  </span>
                  {errors.weight && <span style={{ color: '#E11D48', fontSize: '0.75rem' }}>Err</span>}
                </label>
                <input
                  type="number"
                  min="30"
                  max="110"
                  className="form-input"
                  placeholder="e.g. 68"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
            </div>

            {/* Dynamic Weight Safety Visual Gauge */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '10px',
              padding: '0.75rem',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                marginBottom: '0.35rem'
              }}>
                <span style={{ color: '#475569' }}>Tandem Wing Safety Bracket:</span>
                <span style={{
                  fontWeight: 700,
                  color: isWeightValid 
                    ? (isHeavy ? '#D97706' : '#059669') 
                    : (weight > 0 ? '#E11D48' : '#94A3B8')
                }}>
                  {weight === 0 
                    ? 'Input weight' 
                    : isWeightValid 
                    ? (isHeavy ? '⚠️ Heavy Wing (>85kg)' : '✅ Optimal Range (35-85kg)') 
                    : '❌ Outside 35-95kg Limit'}
                </span>
              </div>

              <div style={{
                width: '100%',
                height: '5px',
                background: '#E2E8F0',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(100, Math.max(0, ((weight - 30) / 70) * 100))}%`,
                  height: '100%',
                  background: isWeightValid 
                    ? (isHeavy ? '#D97706' : '#10B981') 
                    : '#E11D48',
                  borderRadius: '9999px',
                  transition: 'all 0.3s ease'
                }} />
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.65rem',
                color: '#94A3B8',
                marginTop: '0.25rem'
              }}>
                <span>35 kg (Min)</span>
                <span>Optimal (55-80kg)</span>
                <span>95 kg (Max Limit)</span>
              </div>
            </div>

            {/* Email (Optional) */}
            <div style={{ marginTop: '1rem' }}>
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <FiMail /> Email (Optional for E-Ticket)
                </span>
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="passenger@example.com"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Pickup Logistics & Google Maps Pin Card */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
              fontSize: '0.98rem',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaMapMarkerAlt color="#DC2626" /> Shuttle Pickup & GPS Link
            </h3>

            {/* Popular Pickup Dropdown */}
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">
                <span>Select Valley Pickup Hub</span>
              </label>
              <select
                className="form-input"
                onChange={handleSelectPresetPickup}
                value={POPULAR_PICKUP_POINTS.some(p => p.name === formData.pickupLocation) ? formData.pickupLocation : ''}
              >
                <option value="">-- Choose Known Hotel / Chowk --</option>
                {POPULAR_PICKUP_POINTS.map((p, idx) => (
                  <option key={idx} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="CUSTOM">
                  + Custom Location / Hotel
                </option>
              </select>
            </div>

            {/* Specific Pickup Address Text */}
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">
                <span>Pickup Location Name / Address *</span>
                {errors.pickupLocation && <span style={{ color: '#E11D48', fontSize: '0.75rem' }}>{errors.pickupLocation}</span>}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Bir Landing Ground LZ Cafe or Hotel Surya"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
              />
            </div>

            {/* Google Maps Link with Auto-GPS button */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.4rem'
              }}>
                <label className="form-label" style={{ margin: 0 }}>
                  <span>Google Maps GPS URL *</span>
                </label>
                <button
                  type="button"
                  onClick={handleAutoDetectLocation}
                  disabled={gpsDetecting}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    color: '#0F172A',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <FiNavigation />
                  {gpsDetecting ? 'Locating...' : '📍 Auto-Detect GPS'}
                </button>
              </div>

              <input
                type="url"
                className="form-input"
                placeholder="https://maps.google.com/?q=32.0402,76.7169"
                value={formData.mapsUrl}
                onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
              />
              {errors.mapsUrl && (
                <span style={{ color: '#E11D48', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>
                  {errors.mapsUrl}
                </span>
              )}

              {/* Verified Pin Preview Link */}
              {formData.mapsUrl && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a
                    href={formData.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.75rem',
                      color: '#059669',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    <FaCheckCircle size={12} /> Test Google Maps Pin in new tab <FiExternalLink size={11} />
                  </a>
                </div>
              )}
            </div>

            {/* Shuttle Timing Note */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '0.75rem',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              marginTop: 'auto'
            }}>
              <strong style={{ color: '#0F172A' }}>🚙 4x4 Mountain Transfer Included:</strong>
              <p style={{ margin: '0.2rem 0 0', lineHeight: 1.4 }}>
                Our driver will rendezvous at your verified map pin 45 minutes prior to slot launch to drive up to Billing take-off (2,430m).
              </p>
            </div>
          </div>
        </div>

        {/* Flight Add-ons Section */}
        <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', marginTop: '1.25rem' }}>
          <h4 style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <FaVideo color="#0F172A" /> Optional Flight Add-ons
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={formData.addOns?.includes('4K GoPro Video')}
                onChange={(e) => {
                  const current = formData.addOns || [];
                  if (e.target.checked) {
                    setFormData({ ...formData, addOns: [...current, '4K GoPro Video'] });
                  } else {
                    setFormData({ ...formData, addOns: current.filter(x => x !== '4K GoPro Video') });
                  }
                }}
                style={{ accentColor: '#0F172A', width: '16px', height: '16px' }}
              />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>
                  4K 60fps GoPro Helmet Cam
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  Unedited raw + reel highlights (+₹500 on spot)
                </div>
              </div>
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={formData.addOns?.includes('Acro Stunt Wingover')}
                onChange={(e) => {
                  const current = formData.addOns || [];
                  if (e.target.checked) {
                    setFormData({ ...formData, addOns: [...current, 'Acro Stunt Wingover'] });
                  } else {
                    setFormData({ ...formData, addOns: current.filter(x => x !== 'Acro Stunt Wingover') });
                  }
                }}
                style={{ accentColor: '#0F172A', width: '16px', height: '16px' }}
              />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>
                  High-Adrenaline Acro Spiral
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  G-force spiral dives with certified acro pilot
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="btn-primary"
            style={{
              padding: '0.85rem 1.85rem',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <span>Proceed to Step 3: QR Payment & UTR</span>
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}
