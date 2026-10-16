import React from 'react';
import { 
  FaPaperPlane, 
  FaWhatsapp, 
  FaTable, 
  FaSun, 
  FaWind, 
  FaPhoneAlt 
} from 'react-icons/fa';
import { 
  FiCompass, 
  FiSettings 
} from 'react-icons/fi';
import { BRAND_CONFIG } from '../../services/crmAutomationService';

export default function Header({ 
  activeView, 
  setActiveView, 
  bookingCount, 
  onOpenSafetyModal,
  onOpenSettingsModal 
}) {
  return (
    <header style={{
      position: 'sticky',
      top: '72px',
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E2E8F0',
      padding: '0.85rem 1rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)'
    }}>
      <div className="container-max" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Brand & Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: '#0F172A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '1.2rem'
          }}>
            <FaPaperPlane />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '-0.02em',
                color: '#0F172A'
              }}>
                Akash Adventures
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                background: '#F1F5F9',
                color: '#475569',
                padding: '0.15rem 0.5rem',
                borderRadius: '6px',
                border: '1px solid #E2E8F0'
              }}>
                Bir Billing
              </span>
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: '#64748B',
              margin: 0
            }}>
              Official Tandem Flight Booking & Automated Dispatch
            </p>
          </div>
        </div>

        {/* Live Weather & Conditions pill */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.75rem',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '9999px',
          padding: '0.35rem 0.85rem',
          fontSize: '0.75rem',
          color: '#475569'
        }} className="weather-widget">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#D97706' }}>
            <FaSun />
            <span style={{ fontWeight: 600, color: '#0F172A' }}>Billing Launch 2,430m</span>
          </div>
          <span style={{ color: '#CBD5E1' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#0284C7' }}>
            <FaWind />
            <span>12 km/h • Thermals Active</span>
          </div>
        </div>

        {/* Action Controls & Navigation Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          
          {/* Direct WhatsApp Call/Chat Link to Akash (+91 75900 53446) */}
          <a
            href={`https://wa.me/${BRAND_CONFIG.rawPhone}?text=Hi%20Akash%20Adventures%2C%20I%20have%20an%20inquiry%20regarding%20tandem%20paragliding%20booking%20in%20Bir%20Billing.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#F0FDF4',
              color: '#15803D',
              border: '1px solid #BBF7D0',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
            title="Chat directly with Akash Adventures on WhatsApp"
          >
            <FaWhatsapp size={14} />
            <span>+91 75900 53446</span>
          </a>

          {/* Minimalist Segmented View Mode Toggle: Client Booking vs Owner Command Desk */}
          <div style={{
            display: 'flex',
            background: '#F1F5F9',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '3px'
          }}>
            <button
              onClick={() => setActiveView('booking')}
              style={{
                background: activeView === 'booking' ? '#FFFFFF' : 'transparent',
                color: activeView === 'booking' ? '#0F172A' : '#64748B',
                border: activeView === 'booking' ? '1px solid #E2E8F0' : '1px solid transparent',
                borderRadius: '7px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                boxShadow: activeView === 'booking' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <FiCompass />
              <span>Client Portal</span>
            </button>

            <button
              onClick={() => setActiveView('admin')}
              style={{
                background: activeView === 'admin' ? '#FFFFFF' : 'transparent',
                color: activeView === 'admin' ? '#0F172A' : '#64748B',
                border: activeView === 'admin' ? '1px solid #E2E8F0' : '1px solid transparent',
                borderRadius: '7px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                boxShadow: activeView === 'admin' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
            >
              <FaTable />
              <span>Akash Desk</span>
              <span style={{
                background: activeView === 'admin' ? '#0F172A' : '#E2E8F0',
                color: activeView === 'admin' ? '#FFFFFF' : '#475569',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.1rem 0.35rem',
                borderRadius: '9999px',
                marginLeft: '0.2rem'
              }}>
                {bookingCount}
              </span>
            </button>
          </div>

          {/* Config / Settings Button */}
          <button
            onClick={onOpenSettingsModal}
            className="btn-secondary"
            style={{
              padding: '0.45rem 0.65rem',
              fontSize: '0.85rem',
              color: '#64748B'
            }}
            title="Google Sheets CRM & Webhook Settings"
          >
            <FiSettings />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .weather-widget {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
