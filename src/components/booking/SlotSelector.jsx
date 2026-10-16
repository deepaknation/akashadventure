import React, { useState } from 'react';
import { 
  FaSun, 
  FaCloudSun, 
  FaCompass, 
  FaCalendarAlt, 
  FaInfoCircle, 
  FaCheckCircle, 
  FaLock, 
  FaArrowRight, 
  FaShieldAlt, 
  FaClock 
} from 'react-icons/fa';
import { 
  FiClock, 
  FiAlertTriangle, 
  FiChevronRight, 
  FiZap 
} from 'react-icons/fi';
import { CATEGORIES } from '../../data/slotData';

export default function SlotSelector({ 
  selectedDate, 
  setSelectedDate, 
  slots, 
  selectedSlot, 
  setSelectedSlot, 
  onNext 
}) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');

  // Quick 7 days date generator starting today
  const today = new Date();
  const dateOptions = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { dateStr, dayName, formatted };
  });

  // Filter slots
  const filteredSlots = slots.filter(s => {
    if (activeCategoryFilter === 'ALL') return true;
    return s.categoryKey === activeCategoryFilter;
  });

  return (
    <div className="animate-slide-up" style={{ width: '100%' }}>
      {/* Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem'
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
            marginBottom: '0.5rem',
            border: '1px solid #E2E8F0'
          }}>
            <FaClock size={11} /> Step 1: Automated Scheduling Engine
          </div>
          <h2 style={{
            fontSize: '1.65rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#0F172A',
            margin: '0 0 0.35rem'
          }}>
            Select Flight Date & Operational Slot
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Dynamic calendar mapping morning to dusk operational hours with real-time capacity locking.
          </p>
        </div>

        {/* Status Guide Legend (matching prompt table) */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '0.55rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.9rem',
          fontSize: '0.78rem',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Open Capacity</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94A3B8' }} />
            <span style={{ color: '#64748B' }}>Locked / Booked (Grey)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7C3AED' }} />
            <span style={{ color: '#6D28D9', fontWeight: 600 }}>XC Thermal Check</span>
          </div>
        </div>
      </div>

      {/* Date Carousel & Picker */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.65rem'
        }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
            Choose Flight Date
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Custom Date:</span>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#0F172A',
                borderRadius: '8px',
                padding: '0.25rem 0.5rem',
                fontSize: '0.8rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>

        {/* Date cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))',
          gap: '0.5rem'
        }}>
          {dateOptions.map((opt) => {
            const isSelected = selectedDate === opt.dateStr;
            return (
              <button
                key={opt.dateStr}
                onClick={() => setSelectedDate(opt.dateStr)}
                style={{
                  background: isSelected ? '#FFFFFF' : '#FFFFFF',
                  border: isSelected 
                    ? '2px solid #0F172A' 
                    : '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '0.65rem 0.5rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(15, 23, 42, 0.08)' : 'var(--shadow-subtle)'
                }}
              >
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: isSelected ? '#0F172A' : '#64748B',
                  textTransform: 'uppercase'
                }}>
                  {opt.dayName}
                </div>
                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: isSelected ? '#0F172A' : '#334155',
                  marginTop: '0.15rem'
                }}>
                  {opt.formatted}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.4rem',
        marginBottom: '1.25rem'
      }}>
        <button
          onClick={() => setActiveCategoryFilter('ALL')}
          style={{
            background: activeCategoryFilter === 'ALL' ? '#0F172A' : '#FFFFFF',
            color: activeCategoryFilter === 'ALL' ? '#FFFFFF' : '#475569',
            fontWeight: 600,
            fontSize: '0.78rem',
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            border: activeCategoryFilter === 'ALL' ? '1px solid #0F172A' : '1px solid #E2E8F0',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          All Operational Windows ({slots.length})
        </button>

        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const count = slots.filter(s => s.categoryKey === key).length;
          const isSelected = activeCategoryFilter === key;
          return (
            <button
              key={key}
              onClick={() => setActiveCategoryFilter(key)}
              style={{
                background: isSelected ? '#0F172A' : '#FFFFFF',
                border: isSelected ? '1px solid #0F172A' : '1px solid #E2E8F0',
                color: isSelected ? '#FFFFFF' : '#475569',
                fontWeight: 600,
                fontSize: '0.78rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <span>{cat.name}</span>
              <span style={{
                background: isSelected ? 'rgba(255,255,255,0.2)' : '#F1F5F9',
                color: isSelected ? '#FFFFFF' : '#64748B',
                fontSize: '0.65rem',
                padding: '0.1rem 0.35rem',
                borderRadius: '9999px',
                fontWeight: 700
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Dynamic Time Slot Blocks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '0.85rem',
        marginBottom: '1.75rem'
      }}>
        {filteredSlots.map((slot) => {
          const cat = CATEGORIES[slot.categoryKey] || CATEGORIES.STANDARD;
          const isSelected = selectedSlot?.id === slot.id;
          const isSoldOut = slot.bookedSlots >= slot.totalSlots || slot.locked;
          const openCapacity = Math.max(0, slot.totalSlots - slot.bookedSlots);

          return (
            <div
              key={slot.id}
              onClick={() => {
                if (!isSoldOut) {
                  setSelectedSlot({ ...slot, categoryMeta: cat });
                }
              }}
              style={{
                background: isSoldOut 
                  ? '#F8FAFC' 
                  : isSelected 
                  ? '#FFFFFF' 
                  : '#FFFFFF',
                border: isSelected 
                  ? '2px solid #0F172A' 
                  : isSoldOut 
                  ? '1px dashed #CBD5E1' 
                  : '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '1.1rem',
                cursor: isSoldOut ? 'not-allowed' : 'pointer',
                opacity: isSoldOut ? 0.75 : 1,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                boxShadow: isSelected 
                  ? '0 4px 16px rgba(15, 23, 42, 0.08)' 
                  : 'var(--shadow-subtle)',
                transform: isSelected ? 'translateY(-2px)' : 'none'
              }}
            >
              {/* Category & Status Badges */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  background: cat.id === 'sunrise' 
                    ? '#FFFBEB' 
                    : cat.id === 'sunset' 
                    ? '#FFF7ED' 
                    : cat.id === 'xc' 
                    ? '#F5F3FF' 
                    : '#ECFDF5',
                  color: cat.id === 'sunrise' 
                    ? '#B45309' 
                    : cat.id === 'sunset' 
                    ? '#C2410C' 
                    : cat.id === 'xc' 
                    ? '#6D28D9' 
                    : '#047857',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                  {cat.name}
                </span>

                {/* Status Indicator (Green / Grey / XC Amber) */}
                {isSoldOut ? (
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#94A3B8',
                    background: '#F1F5F9',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    border: '1px solid #E2E8F0'
                  }}>
                    <FaLock size={9} /> BOOKED (GREY)
                  </span>
                ) : slot.thermalCheckRequired ? (
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#6D28D9',
                    background: '#F5F3FF',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    border: '1px solid #DDD6FE'
                  }}>
                    <FiAlertTriangle size={11} color="#D97706" /> Manual XC Review
                  </span>
                ) : (
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#047857',
                    background: '#ECFDF5',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    border: '1px solid #A7F3D0'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#10B981'
                    }} />
                    {openCapacity} SLOTS LEFT (GREEN)
                  </span>
                )}
              </div>

              {/* Time display with 1h 40m duration pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiClock size={16} color={isSelected ? '#0F172A' : '#64748B'} />
                  <span style={{
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: isSoldOut ? '#94A3B8' : '#0F172A',
                    letterSpacing: '-0.01em'
                  }}>
                    {slot.time}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#475569',
                  background: '#F1F5F9',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0'
                }}>
                  1h 40m
                </span>
              </div>

              {/* Capacity Progress Bar */}
              <div style={{ marginBottom: '0.85rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.72rem',
                  color: '#64748B',
                  marginBottom: '0.25rem'
                }}>
                  <span>Capacity: {slot.bookedSlots} / {slot.totalSlots} Booked</span>
                  <span style={{ fontWeight: 600 }}>{isSoldOut ? 'Locked' : `${openCapacity} Open`}</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  background: '#F1F5F9',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(slot.bookedSlots / slot.totalSlots) * 100}%`,
                    height: '100%',
                    background: isSoldOut 
                      ? '#CBD5E1' 
                      : (slot.bookedSlots / slot.totalSlots) > 0.6 
                      ? '#D97706' 
                      : '#10B981',
                    borderRadius: '9999px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Rules / Specifics */}
              <p style={{
                fontSize: '0.78rem',
                color: '#64748B',
                lineHeight: 1.4,
                margin: '0 0 0.85rem'
              }}>
                {cat.rules}
              </p>

              {/* Price & Token Pill */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.65rem',
                borderTop: '1px solid #F1F5F9'
              }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Token to Lock</div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A' }}>
                    ₹{cat.tokenAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Total Flight</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>
                    ₹{cat.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Slot Summary Bar & Proceed CTA */}
      {selectedSlot && (
        <div className="glass-panel animate-slide-up" style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          border: '1.5px solid #0F172A',
          background: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              fontSize: '1.2rem',
              border: '1px solid #A7F3D0'
            }}>
              <FaCheckCircle />
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                Slot Selected • {selectedDate}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                {selectedSlot.time} ({selectedSlot.categoryMeta?.name})
              </div>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                Token Advance: <strong style={{ color: '#0F172A' }}>₹{selectedSlot.categoryMeta?.tokenAmount}</strong> • Balance Due at Landing: ₹{selectedSlot.categoryMeta?.price - selectedSlot.categoryMeta?.tokenAmount}
              </div>
            </div>
          </div>

          <button
            onClick={onNext}
            className="btn-primary"
            style={{
              padding: '0.8rem 1.6rem',
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <span>Proceed to Client Intake</span>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
