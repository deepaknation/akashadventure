import React, { useState } from 'react';
import { 
  FaWhatsapp, 
  FaTimes, 
  FaPaperPlane, 
  FaCheckDouble, 
  FaUserShield, 
  FaExternalLinkAlt, 
  FaPhoneAlt, 
  FaVideo 
} from 'react-icons/fa';
import { 
  FiMoreVertical, 
  FiArrowLeft, 
  FiSmile, 
  FiPaperclip, 
  FiMic, 
  FiExternalLink 
} from 'react-icons/fi';
import { 
  generateClientWhatsAppMessage, 
  generateTeamAlertWhatsAppMessage 
} from '../../services/crmAutomationService';

export default function WhatsAppLiveModal({ isOpen, onClose, latestBooking }) {
  const [activeChannel, setActiveChannel] = useState('client'); // 'client' | 'internal'

  if (!isOpen) return null;

  const booking = latestBooking || {
    id: 'AERO-2026-DEMO',
    clientName: 'Rahul Sharma',
    whatsapp: '+91 98112 34567',
    age: 28,
    weight: 72,
    slotDate: '2026-10-13',
    timeSlot: '06:00 AM - 07:00 AM',
    category: 'Sunrise Special',
    pickupLocation: 'Bir Landing Ground (Main LZ Cafe)',
    mapsUrl: 'https://maps.google.com/?q=32.0402,76.7169',
    tokenPaid: 1500,
    balanceDue: 3000,
    utrNumber: '428819230182'
  };

  const clientText = generateClientWhatsAppMessage(booking);
  const teamText = generateTeamAlertWhatsAppMessage(booking);

  const cleanPhone = booking.whatsapp.replace(/[^0-9]/g, '');
  const realWhatsAppWebUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(clientText)}`;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        height: '90vh',
        maxHeight: '720px',
        background: '#0c1317',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.1)',
        border: '1px solid rgba(37, 211, 102, 0.3)'
      }}>
        {/* Smartphone Notch & WhatsApp Top App Bar */}
        <div style={{
          background: '#202c33',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: activeChannel === 'client' ? '#00a884' : '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 700
            }}>
              {activeChannel === 'client' ? <FaWhatsapp size={22} /> : <FaUserShield size={20} />}
            </div>

            <div>
              <div style={{
                color: '#e9edef',
                fontSize: '0.92rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span>{activeChannel === 'client' ? 'AeroFlight Official' : 'Ops Flight Dispatch'}</span>
                <span style={{
                  fontSize: '0.62rem',
                  background: '#00a884',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '14px',
                  height: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>✓</span>
              </div>
              <div style={{ color: '#8696a0', fontSize: '0.72rem' }}>
                {activeChannel === 'client' ? `Delivered to ${booking.whatsapp}` : 'Internal Pilot Duty Radio'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#e9edef',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>

        {/* Channel Segment Switcher */}
        <div style={{
          background: '#111b21',
          padding: '0.4rem 0.75rem',
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <button
            onClick={() => setActiveChannel('client')}
            style={{
              flex: 1,
              background: activeChannel === 'client' ? '#00a884' : 'transparent',
              color: activeChannel === 'client' ? '#fff' : '#8696a0',
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '0.35rem 0.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            1. Client Booking Summary
          </button>

          <button
            onClick={() => setActiveChannel('internal')}
            style={{
              flex: 1,
              background: activeChannel === 'internal' ? '#0284c7' : 'transparent',
              color: activeChannel === 'internal' ? '#fff' : '#8696a0',
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '0.35rem 0.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            2. Pilot & Team Alert
          </button>
        </div>

        {/* WhatsApp Chat Area with classic wallpaper look */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          background: '#0b141a',
          backgroundImage: 'radial-gradient(#1f2c34 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {/* Security notice bubble */}
          <div style={{
            background: 'rgba(24, 34, 41, 0.9)',
            borderRadius: '8px',
            padding: '0.45rem 0.75rem',
            margin: '0 auto',
            maxWidth: '90%',
            textAlign: 'center',
            fontSize: '0.68rem',
            color: '#8696a0',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            🔒 Messages to this chat and calls are secured with 256-bit end-to-end encryption.
          </div>

          {/* Date pill */}
          <div style={{
            background: '#182229',
            borderRadius: '6px',
            padding: '0.2rem 0.6rem',
            margin: '0 auto',
            fontSize: '0.68rem',
            color: '#8696a0',
            fontWeight: 600
          }}>
            TODAY
          </div>

          {/* Outgoing Message Bubble from Cloud API */}
          <div style={{
            alignSelf: 'flex-start',
            maxWidth: '88%',
            background: '#202c33',
            borderRadius: '12px 12px 12px 2px',
            padding: '0.75rem 0.85rem',
            position: 'relative',
            boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
            color: '#e9edef',
            fontSize: '0.8rem',
            lineHeight: 1.45
          }}>
            <pre style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              {activeChannel === 'client' ? clientText : teamText}
            </pre>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.25rem',
              marginTop: '0.35rem',
              fontSize: '0.65rem',
              color: '#8696a0'
            }}>
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <FaCheckDouble size={11} color="#53bdeb" />
            </div>
          </div>
        </div>

        {/* WhatsApp Footer Bar */}
        <div style={{
          background: '#202c33',
          padding: '0.65rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ fontSize: '0.72rem', color: '#8696a0' }}>
            Cloud API Status: <span style={{ color: '#00a884', fontWeight: 700 }}>Active (200 OK)</span>
          </div>

          <a
            href={realWhatsAppWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#00a884',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <FaWhatsapp /> Launch in Real Web <FiExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
