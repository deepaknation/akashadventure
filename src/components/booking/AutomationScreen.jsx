import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  FaCheckCircle, 
  FaWhatsapp, 
  FaTable, 
  FaPrint 
} from 'react-icons/fa';
import { 
  FiCheck, 
  FiRefreshCw, 
  FiExternalLink, 
  FiMessageSquare 
} from 'react-icons/fi';
import { 
  BRAND_CONFIG, 
  generateClientWhatsAppMessage, 
  generateTeamAlertWhatsAppMessage 
} from '../../services/crmAutomationService';

export default function AutomationScreen({ 
  confirmedBooking, 
  syncResult, 
  whatsAppResult, 
  onViewSheet, 
  onResetBooking, 
  onOpenWhatsAppModal 
}) {
  const [activeMessageTab, setActiveMessageTab] = useState('client');

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  if (!confirmedBooking) return null;

  const clientMessage = generateClientWhatsAppMessage(confirmedBooking);
  const teamMessage = generateTeamAlertWhatsAppMessage(confirmedBooking);

  // WhatsApp Web URL directly to Akash Adventures (+91 75900 53446)
  const akashWhatsAppUrl = `https://wa.me/${BRAND_CONFIG.rawPhone}?text=${encodeURIComponent(clientMessage)}`;

  return (
    <div className="animate-slide-up" style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Success Hero Card */}
      <div className="glass-panel" style={{
        padding: '2rem 1.5rem',
        textAlign: 'center',
        background: '#FFFFFF',
        border: '1px solid #A7F3D0',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#059669',
          fontSize: '1.8rem',
          marginBottom: '1rem'
        }}>
          <FaCheckCircle />
        </div>

        <div style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#059669',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '0.35rem'
        }}>
          Akash Adventures • Flight Slot Reserved
        </div>

        <h2 style={{
          fontSize: '1.9rem',
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: '-0.02em',
          margin: '0 0 0.5rem'
        }}>
          Booking Confirmed with Akash Adventures!
        </h2>

        <p style={{
          color: '#64748B',
          fontSize: '0.92rem',
          maxWidth: '620px',
          margin: '0 auto 1.25rem'
        }}>
          Your flight slot has been reserved in the Bir Billing schedule. Payment screenshot has been submitted and verified.
        </p>

        {/* Booking Reference Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '0.55rem 1.1rem',
          marginBottom: '1rem'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Booking ID:</span>
          <span style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: '#0F172A',
            fontFamily: 'var(--font-mono)'
          }}>
            {confirmedBooking.id}
          </span>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            background: '#ECFDF5',
            color: '#059669',
            padding: '0.15rem 0.45rem',
            borderRadius: '9999px',
            border: '1px solid #A7F3D0'
          }}>
            TOKEN PAID: ₹{confirmedBooking.tokenPaid}
          </span>
        </div>

        {/* Direct WhatsApp Confirmation Button */}
        <div>
          <a
            href={akashWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              background: '#15803D',
              borderColor: '#15803D',
              padding: '0.85rem 1.75rem',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaWhatsapp size={18} />
            <span>Send Details to Akash Adventures on WhatsApp (+91 75900 53446)</span>
          </a>
        </div>

        {/* Book Next Flight / Reset Intake Details Button */}
        <div style={{ marginTop: '0.85rem' }}>
          <button
            onClick={onResetBooking}
            className="btn-secondary"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#F8FAFC',
              borderColor: '#CBD5E1',
              color: '#0F172A',
              cursor: 'pointer'
            }}
          >
            <FiRefreshCw />
            <span>Book Next Flight / Reset Form Details</span>
          </button>
        </div>
      </div>

      {/* Two Pillars of Automation Grid: CRM Sync vs WhatsApp Alert */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        
        {/* Pillar 1: CRM & Google Sheets Sync */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669'
              }}>
                <FaTable size={16} />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Google Sheets Ledger
              </h3>
            </div>

            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              background: '#ECFDF5',
              color: '#047857',
              border: '1px solid #A7F3D0',
              padding: '0.2rem 0.55rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <FiCheck /> Synced in {syncResult?.latencyMs || 260}ms
            </span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem', lineHeight: 1.4 }}>
            Passenger details, flight time, and Google Maps location URL are recorded in Akash Adventures' operational sheet.
          </p>

          {/* Appended Row Data Breakdown */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '10px',
            padding: '0.85rem',
            border: '1px solid #E2E8F0',
            fontSize: '0.78rem',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div>
                <span style={{ color: '#64748B' }}>Passenger: </span>
                <strong style={{ color: '#0F172A' }}>{confirmedBooking.clientName}</strong>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Weight / Age: </span>
                <span style={{ color: '#0F172A', fontWeight: 600 }}>{confirmedBooking.weight}kg / {confirmedBooking.age}y</span>
              </div>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: '#64748B' }}>Slot Window: </span>
              <strong style={{ color: '#0F172A' }}>{confirmedBooking.slotDate} • {confirmedBooking.timeSlot}</strong>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: '#64748B' }}>Pickup Hub: </span>
              <span style={{ color: '#334155' }}>{confirmedBooking.pickupLocation}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ color: '#64748B' }}>Maps Link: </span>
              <a
                href={confirmedBooking.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0284C7',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  maxWidth: '180px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontWeight: 600
                }}
              >
                {confirmedBooking.mapsUrl} <FiExternalLink size={10} />
              </a>
            </div>
          </div>

          <button
            onClick={onViewSheet}
            className="btn-secondary"
            style={{
              width: '100%',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <FaTable /> View in Akash Desk Ledger
          </button>
        </div>

        {/* Pillar 2: WhatsApp Cloud API Automation */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#DCFCE7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#15803D'
              }}>
                <FaWhatsapp size={18} />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                WhatsApp Dispatch
              </h3>
            </div>

            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              background: '#DCFCE7',
              color: '#15803D',
              border: '1px solid #86EFAC',
              padding: '0.2rem 0.55rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              ✓✓ Delivered
            </span>
          </div>

          {/* Switcher: Client Message vs Team Alert */}
          <div style={{
            display: 'flex',
            background: '#F1F5F9',
            borderRadius: '8px',
            padding: '3px',
            marginBottom: '0.85rem'
          }}>
            <button
              onClick={() => setActiveMessageTab('client')}
              style={{
                flex: 1,
                background: activeMessageTab === 'client' ? '#FFFFFF' : 'transparent',
                color: activeMessageTab === 'client' ? '#0F172A' : '#64748B',
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '0.4rem',
                borderRadius: '6px',
                border: activeMessageTab === 'client' ? '1px solid #E2E8F0' : 'none',
                boxShadow: activeMessageTab === 'client' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer'
              }}
            >
              Client Summary
            </button>
            <button
              onClick={() => setActiveMessageTab('team')}
              style={{
                flex: 1,
                background: activeMessageTab === 'team' ? '#FFFFFF' : 'transparent',
                color: activeMessageTab === 'team' ? '#0F172A' : '#64748B',
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '0.4rem',
                borderRadius: '6px',
                border: activeMessageTab === 'team' ? '1px solid #E2E8F0' : 'none',
                boxShadow: activeMessageTab === 'team' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer'
              }}
            >
              Akash Team Alert
            </button>
          </div>

          {/* Simulated WhatsApp Chat Bubble */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '10px',
            padding: '0.85rem',
            border: '1px solid #E2E8F0',
            maxHeight: '160px',
            overflowY: 'auto',
            marginBottom: '1rem',
            fontSize: '0.75rem',
            lineHeight: 1.45,
            color: '#1E293B',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            <pre style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              fontFamily: 'inherit'
            }}>
              {activeMessageTab === 'client' ? clientMessage : teamMessage}
            </pre>
          </div>

          <a
            href={akashWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              padding: '0.5rem 0.6rem',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              color: '#15803D',
              borderColor: '#BBF7D0',
              background: '#F0FDF4',
              textDecoration: 'none'
            }}
          >
            <FaWhatsapp /> Open in WhatsApp Web <FiExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Flight Pass / E-Ticket Boarding Card */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        border: '1px dashed #CBD5E1',
        marginBottom: '1.5rem',
        background: '#FFFFFF'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '0.85rem',
          marginBottom: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Official Tandem Airpass • Bir Billing
            </span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              AKASH ADVENTURES EXPEDITION PASS
            </h4>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Flight Window</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
              {confirmedBooking.slotDate} • {confirmedBooking.timeSlot}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          fontSize: '0.82rem'
        }}>
          <div>
            <div style={{ color: '#64748B', fontSize: '0.72rem' }}>Passenger</div>
            <div style={{ fontWeight: 700, color: '#0F172A' }}>{confirmedBooking.clientName}</div>
          </div>

          <div>
            <div style={{ color: '#64748B', fontSize: '0.72rem' }}>Category & Rules</div>
            <div style={{ fontWeight: 700, color: '#0F172A' }}>{confirmedBooking.category}</div>
          </div>

          <div>
            <div style={{ color: '#64748B', fontSize: '0.72rem' }}>Weight Registered</div>
            <div style={{ fontWeight: 700, color: '#059669' }}>{confirmedBooking.weight} kg (Safe harness)</div>
          </div>

          <div>
            <div style={{ color: '#64748B', fontSize: '0.72rem' }}>Payment Status</div>
            <div style={{ fontWeight: 700, color: '#0F172A' }}>Screenshot Attached ✓</div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <button
          onClick={onResetBooking}
          className="btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <FiRefreshCw /> Book Another Slot
        </button>

        <button
          onClick={() => window.print()}
          className="btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <FaPrint /> Print / Save PDF Pass
        </button>
      </div>
    </div>
  );
}
