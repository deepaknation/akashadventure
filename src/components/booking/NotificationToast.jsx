import React, { useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaTrashAlt, 
  FaTimes 
} from 'react-icons/fa';

export default function NotificationToast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isDelete = toast.type === 'delete';

  const borderColor = isDelete 
    ? '#FECDD3' 
    : isSuccess 
    ? '#A7F3D0' 
    : isError 
    ? '#FECDD3' 
    : '#CBD5E1';

  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: 99999,
      background: '#FFFFFF',
      border: `1.5px solid ${borderColor}`,
      borderRadius: '12px',
      padding: '0.9rem 1.25rem',
      color: '#0F172A',
      display: 'flex',
      alignItems: 'center',
      gap: '0.85rem',
      boxShadow: '0 12px 32px -4px rgba(15, 23, 42, 0.16), 0 4px 12px rgba(0, 0, 0, 0.06)',
      animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      minWidth: '320px',
      maxWidth: '440px'
    }}>
      {/* Icon Bubble */}
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: isDelete 
          ? '#FFF1F2' 
          : isSuccess 
          ? '#ECFDF5' 
          : isError 
          ? '#FFF1F2' 
          : '#F1F5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {isDelete ? (
          <FaTrashAlt color="#E11D48" size={15} />
        ) : isSuccess ? (
          <FaCheckCircle color="#059669" size={18} />
        ) : isError ? (
          <FaExclamationCircle color="#E11D48" size={18} />
        ) : (
          <FaInfoCircle color="#0F172A" size={18} />
        )}
      </div>

      {/* Message Text */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
          {toast.title}
        </div>
        {toast.message && (
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.15rem', lineHeight: 1.35 }}>
            {toast.message}
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#94A3B8',
          cursor: 'pointer',
          padding: '0.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.85rem'
        }}
        title="Dismiss notification"
      >
        <FaTimes />
      </button>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
