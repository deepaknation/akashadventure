import React from 'react';
import { 
  FaCalendarCheck, 
  FaUserCheck, 
  FaQrcode, 
  FaRobot, 
  FaCheck 
} from 'react-icons/fa';

export default function StepIndicator({ currentStep, setStep, maxStepReached }) {
  const steps = [
    {
      num: 1,
      title: 'Slot Selection',
      subtitle: 'Date & Time Block',
      icon: FaCalendarCheck
    },
    {
      num: 2,
      title: 'Client Intake',
      subtitle: 'Weight & Pickup GPS',
      icon: FaUserCheck
    },
    {
      num: 3,
      title: 'QR Payment',
      subtitle: 'Token & 12-Digit UTR',
      icon: FaQrcode
    },
    {
      num: 4,
      title: 'Automated Dispatch',
      subtitle: 'Sheets CRM & WhatsApp',
      icon: FaRobot
    }
  ];

  return (
    <div style={{
      width: '100%',
      padding: '1.25rem 0 1.75rem',
      position: 'relative'
    }}>
      {/* Progress track */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.5rem',
        position: 'relative'
      }}>
        {steps.map((s, index) => {
          const isDone = currentStep > s.num;
          const isActive = currentStep === s.num;
          const isClickable = s.num <= maxStepReached;
          const Icon = isDone ? FaCheck : s.icon;

          return (
            <div
              key={s.num}
              onClick={() => isClickable && setStep(s.num)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: isClickable ? 'pointer' : 'default',
                opacity: s.num > maxStepReached && !isActive ? 0.5 : 1,
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '19px',
                  left: '50%',
                  width: '100%',
                  height: '2px',
                  background: isDone 
                    ? '#059669' 
                    : '#E2E8F0',
                  zIndex: 0
                }} />
              )}

              {/* Step Circle Badge */}
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isDone ? '0.9rem' : '0.9rem',
                fontWeight: 700,
                zIndex: 2,
                transition: 'all 0.2s ease',
                background: isDone
                  ? '#059669'
                  : isActive
                  ? '#0F172A'
                  : '#FFFFFF',
                color: isDone || isActive ? '#FFFFFF' : '#94A3B8',
                border: isActive
                  ? '2px solid #0F172A'
                  : isDone
                  ? '2px solid #059669'
                  : '1px solid #CBD5E1',
                boxShadow: isActive
                  ? '0 2px 8px rgba(15, 23, 42, 0.15)'
                  : isDone
                  ? '0 2px 8px rgba(5, 150, 105, 0.15)'
                  : 'none'
              }}>
                <Icon />
              </div>

              {/* Title & Subtitle */}
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#0F172A' : isDone ? '#059669' : '#64748B',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap'
                }}>
                  <span style={{ display: 'none' }} className="d-sm-inline">{s.num}. </span>
                  {s.title}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#94A3B8',
                  marginTop: '0.1rem',
                  display: 'none'
                }} className="d-md-block">
                  {s.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .d-sm-inline {
            display: inline !important;
          }
        }
        @media (min-width: 768px) {
          .d-md-block {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
