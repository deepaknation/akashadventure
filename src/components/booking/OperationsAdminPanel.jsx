import React, { useState } from 'react';
import { 
  FaTable, 
  FaLock, 
  FaLockOpen, 
  FaWind, 
  FaCalendarAlt, 
  FaSlidersH,
  FaPlus,
  FaTrashAlt
} from 'react-icons/fa';
import { 
  FiUsers, 
  FiDollarSign, 
  FiActivity 
} from 'react-icons/fi';
import GoogleSheetViewer from './GoogleSheetViewer';
import AddSlotModal from './AddSlotModal';
import { CATEGORIES } from '../../data/slotData';

export default function OperationsAdminPanel({ 
  bookings, 
  slots, 
  setSlots, 
  onUpdateBookingStatus, 
  onDeleteBooking,
  onClearAllBookings,
  onOpenWhatsAppModal,
  selectedDate,
  setSelectedDate 
}) {
  const [adminTab, setAdminTab] = useState('sheet'); // 'sheet' | 'slots'
  const [thermalStatus, setThermalStatus] = useState('ACTIVE'); // 'ACTIVE' | 'MARGINAL' | 'GROUNDED'
  const [isAddSlotModalOpen, setIsAddSlotModalOpen] = useState(false);

  // Financial & capacity calculations
  const totalTokens = bookings.reduce((sum, b) => sum + (b.tokenPaid || 0), 0);
  const totalGross = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalBookedSlots = slots.reduce((sum, s) => sum + s.bookedSlots, 0);
  const totalCapacitySlots = slots.reduce((sum, s) => sum + s.totalSlots, 0);
  const fillRate = totalCapacitySlots > 0 ? Math.round((totalBookedSlots / totalCapacitySlots) * 100) : 0;

  // Toggle slot lock
  const handleToggleSlotLock = (slotId) => {
    setSlots(prev => prev.map(s => {
      if (s.id === slotId) {
        return { ...s, locked: !s.locked };
      }
      return s;
    }));
  };

  // Delete slot
  const handleDeleteSlot = (slotId) => {
    setSlots(prev => prev.filter(s => s.id !== slotId));
  };

  // Adjust booked count
  const handleAdjustBooked = (slotId, delta) => {
    setSlots(prev => prev.map(s => {
      if (s.id === slotId) {
        const next = Math.max(0, Math.min(s.totalSlots, s.bookedSlots + delta));
        return { ...s, bookedSlots: next };
      }
      return s;
    }));
  };

  return (
    <div className="animate-slide-up" style={{ width: '100%' }}>
      {/* Admin Command Header & Stats */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#F1F5F9',
              color: '#475569',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              marginBottom: '0.4rem',
              border: '1px solid #E2E8F0'
            }}>
              <FiActivity /> Operations & CRM Command Center
            </div>
            <h2 style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              margin: '0 0 0.25rem'
            }}>
              Daily Slot Operations & Google Sheets CRM
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Live booking ledger, real-time slot capacity locking, and thermal condition dispatch.
            </p>
          </div>

          {/* Quick Date Switcher for Admin */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '0.4rem 0.85rem',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <FaCalendarAlt color="#0F172A" />
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Viewing Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0F172A',
                fontWeight: 700,
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>

        {/* 4 Key Performance Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Card 1: Verified Bookings */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
              <span>Total Ledger Bookings</span>
              <FiUsers color="#0F172A" size={16} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>
              {bookings.length}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '0.2rem', fontWeight: 600 }}>
              100% Synced to Google Sheets ✓
            </div>
          </div>

          {/* Card 2: Token Money Collected */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
              <span>Verified Token Money</span>
              <FiDollarSign color="#059669" size={16} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>
              ₹{totalTokens.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
              Gross Value: ₹{totalGross.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Card 3: Capacity Fill Rate */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
              <span>Operational Capacity Filled</span>
              <FiActivity color="#D97706" size={16} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>
              {fillRate}%
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
              {totalBookedSlots} of {totalCapacitySlots} pilot slots booked today
            </div>
          </div>

          {/* Card 4: XC Thermal Dispatch Status */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
              <span>XC Thermal Flight Status</span>
              <FaWind color="#7C3AED" size={16} />
            </div>
            <div style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: thermalStatus === 'ACTIVE' ? '#047857' : thermalStatus === 'MARGINAL' ? '#B45309' : '#BE123C',
              marginTop: '0.35rem'
            }}>
              {thermalStatus === 'ACTIVE' ? 'Thermals Active (Flyable)' : thermalStatus === 'MARGINAL' ? 'Manual Pilot Review' : 'Grounded (Inversion)'}
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem' }}>
              <button
                onClick={() => setThermalStatus('ACTIVE')}
                style={{
                  background: thermalStatus === 'ACTIVE' ? '#059669' : '#F1F5F9',
                  color: thermalStatus === 'ACTIVE' ? '#FFFFFF' : '#64748B',
                  border: '1px solid #E2E8F0',
                  borderRadius: '4px',
                  fontSize: '0.65rem',
                  padding: '0.2rem 0.45rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Safe
              </button>
              <button
                onClick={() => setThermalStatus('MARGINAL')}
                style={{
                  background: thermalStatus === 'MARGINAL' ? '#D97706' : '#F1F5F9',
                  color: thermalStatus === 'MARGINAL' ? '#FFFFFF' : '#64748B',
                  border: '1px solid #E2E8F0',
                  borderRadius: '4px',
                  fontSize: '0.65rem',
                  padding: '0.2rem 0.45rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Review
              </button>
              <button
                onClick={() => setThermalStatus('GROUNDED')}
                style={{
                  background: thermalStatus === 'GROUNDED' ? '#E11D48' : '#F1F5F9',
                  color: thermalStatus === 'GROUNDED' ? '#FFFFFF' : '#64748B',
                  border: '1px solid #E2E8F0',
                  borderRadius: '4px',
                  fontSize: '0.65rem',
                  padding: '0.2rem 0.45rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Hold
              </button>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #E2E8F0',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}>
          <button
            onClick={() => setAdminTab('sheet')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: adminTab === 'sheet' ? '2px solid #0F172A' : '2px solid transparent',
              color: adminTab === 'sheet' ? '#0F172A' : '#64748B',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '0.75rem 0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaTable />
            <span>Google Sheets Live CRM ({bookings.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('slots')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: adminTab === 'slots' ? '2px solid #0F172A' : '2px solid transparent',
              color: adminTab === 'slots' ? '#0F172A' : '#64748B',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '0.75rem 0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaSlidersH />
            <span>Slot Capacity & Lock Controls ({slots.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Content 1: Google Sheet View */}
      {adminTab === 'sheet' && (
        <GoogleSheetViewer
          bookings={bookings}
          onUpdateBookingStatus={onUpdateBookingStatus}
          onDeleteBooking={onDeleteBooking}
          onClearAllBookings={onClearAllBookings}
          onOpenWhatsAppModal={onOpenWhatsAppModal}
        />
      )}

      {/* Tab Content 2: Slot Capacity & Lock Controls */}
      {adminTab === 'slots' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.25rem' }}>
                Operational Hours Slot Manager ({selectedDate})
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                Lock specific slots for maintenance/private events, or dynamically adjust passenger capacity.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Green = Open to Public • Grey = Locked / Sold Out
              </div>
              <button
                onClick={() => setIsAddSlotModalOpen(true)}
                className="btn-primary"
                style={{
                  background: '#0F172A',
                  color: '#FFFFFF',
                  padding: '0.42rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer'
                }}
              >
                <FaPlus size={11} />
                <span>Add Flight Slot</span>
              </button>
            </div>
          </div>

          {/* Slots Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{
                  background: '#F8FAFC',
                  borderBottom: '1px solid #E2E8F0',
                  color: '#64748B',
                  textTransform: 'uppercase',
                  fontSize: '0.68rem'
                }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Time Block</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Category Focus</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Total Capacity</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Current Booked</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Remaining</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Status UI</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Manage Slot</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((s) => {
                  const cat = CATEGORIES[s.categoryKey] || CATEGORIES.STANDARD;
                  const isSoldOut = s.bookedSlots >= s.totalSlots || s.locked;
                  const openCount = Math.max(0, s.totalSlots - s.bookedSlots);

                  return (
                    <tr
                      key={s.id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        background: s.locked ? '#FFF1F2' : '#FFFFFF'
                      }}
                    >
                      {/* Time */}
                      <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#0F172A' }}>
                        {s.time}
                      </td>

                      {/* Category */}
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          background: '#F1F5F9',
                          color: '#0F172A',
                          border: '1px solid #E2E8F0'
                        }}>
                          {cat.name}
                        </span>
                      </td>

                      {/* Total */}
                      <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center', fontWeight: 700 }}>
                        {s.totalSlots}
                      </td>

                      {/* Current Booked with + / - controls */}
                      <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleAdjustBooked(s.id, -1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              background: '#F1F5F9',
                              border: '1px solid #E2E8F0',
                              color: '#0F172A',
                              cursor: 'pointer',
                              fontWeight: 700
                            }}
                          >
                            -
                          </button>
                          <span style={{ minWidth: '24px', fontWeight: 700, color: '#0F172A' }}>
                            {s.bookedSlots}
                          </span>
                          <button
                            onClick={() => handleAdjustBooked(s.id, 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              background: '#F1F5F9',
                              border: '1px solid #E2E8F0',
                              color: '#0F172A',
                              cursor: 'pointer',
                              fontWeight: 700
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Remaining */}
                      <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center', fontWeight: 700, color: openCount > 0 && !s.locked ? '#047857' : '#94A3B8' }}>
                        {s.locked ? '0 (Locked)' : openCount}
                      </td>

                      {/* Status UI Display */}
                      <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>
                        {s.locked || isSoldOut ? (
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: '#94A3B8',
                            background: '#F1F5F9',
                            border: '1px solid #E2E8F0',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '9999px'
                          }}>
                            GREY (LOCKED/BOOKED)
                          </span>
                        ) : s.thermalCheckRequired ? (
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: '#6D28D9',
                            background: '#F5F3FF',
                            border: '1px solid #DDD6FE',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '9999px'
                          }}>
                            AMBER (XC MANUAL)
                          </span>
                        ) : (
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: '#047857',
                            background: '#ECFDF5',
                            border: '1px solid #A7F3D0',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '9999px'
                          }}>
                            GREEN (OPEN CAPACITY)
                          </span>
                        )}
                      </td>

                      {/* Slot Actions: Lock/Unlock & Delete */}
                      <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleToggleSlotLock(s.id)}
                            style={{
                              background: s.locked ? '#FFF1F2' : '#FFFFFF',
                              border: s.locked ? '1px solid #FECDD3' : '1px solid #CBD5E1',
                              color: s.locked ? '#E11D48' : '#0F172A',
                              borderRadius: '6px',
                              padding: '0.35rem 0.65rem',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                          >
                            {s.locked ? <><FaLock /> Unlock</> : <><FaLockOpen /> Lock</>}
                          </button>

                          <button
                            onClick={() => handleDeleteSlot(s.id)}
                            style={{
                              background: '#FFF1F2',
                              border: '1px solid #FECDD3',
                              color: '#E11D48',
                              borderRadius: '6px',
                              padding: '0.35rem 0.5rem',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            title="Delete this slot"
                          >
                            <FaTrashAlt size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Slot Modal */}
      <AddSlotModal
        isOpen={isAddSlotModalOpen}
        onClose={() => setIsAddSlotModalOpen(false)}
        selectedDate={selectedDate}
        onAddSlot={(newSlot) => {
          setSlots(prev => [...prev, newSlot]);
        }}
      />
    </div>
  );
}
