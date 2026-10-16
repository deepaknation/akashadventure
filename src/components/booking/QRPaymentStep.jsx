import React, { useState, useEffect } from 'react';
import { 
  FaQrcode, 
  FaCheckCircle, 
  FaArrowLeft, 
  FaClock, 
  FaUpload, 
  FaReceipt, 
  FaImage, 
  FaTrashAlt 
} from 'react-icons/fa';
import { 
  FiClock, 
  FiCopy, 
  FiCheck, 
  FiAlertCircle 
} from 'react-icons/fi';
import { BRAND_CONFIG } from '../../services/crmAutomationService';

export default function QRPaymentStep({ 
  formData, 
  setFormData, 
  selectedSlot, 
  selectedDate, 
  onBack, 
  onSubmitPayment 
}) {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes hold
  const [uploadError, setUploadError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const tokenAmount = selectedSlot?.categoryMeta?.tokenAmount || 1000;
  const totalPrice = selectedSlot?.categoryMeta?.price || 3500;
  const balanceDue = totalPrice - tokenAmount;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('7590053446');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  // Handle Screenshot Upload with full Base64 preview
  const handleScreenshotChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('Image size should be under 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          receiptUploaded: true,
          receiptFileName: file.name,
          paymentReceiptImage: event.target.result
        }));
        setUploadError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveScreenshot = () => {
    setFormData(prev => ({
      ...prev,
      receiptUploaded: false,
      receiptFileName: '',
      paymentReceiptImage: null
    }));
  };

  const handleProceed = () => {
    if (!formData.paymentReceiptImage && !formData.receiptUploaded) {
      setUploadError('Please attach your payment screenshot to confirm the booking');
      return;
    }
    setUploadError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onSubmitPayment({
        ...formData,
        tokenPaid: tokenAmount,
        totalPrice,
        balanceDue,
        receiptUploaded: true
      });
    }, 600);
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
          <FaArrowLeft /> Back to Passenger Details
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
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
              <FaQrcode size={11} /> Step 3: Google Pay QR & Payment Screenshot
            </div>
            <h2 style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              margin: '0 0 0.35rem'
            }}>
              Pay Token Money & Upload Screenshot
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Scan Akash Adventures' official Google Pay QR code to pay token advance and upload the payment screenshot below.
            </p>
          </div>

          {/* Slot Hold Timer */}
          <div style={{
            background: '#FFF1F2',
            border: '1px solid #FECDD3',
            borderRadius: '10px',
            padding: '0.55rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <FiClock color="#E11D48" size={17} />
            <div>
              <div style={{ fontSize: '0.65rem', color: '#BE123C', textTransform: 'uppercase', fontWeight: 700 }}>
                Slot Hold Timer
              </div>
              <div style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#E11D48',
                fontFamily: 'var(--font-mono)'
              }}>
                {formatTimer(timerSeconds)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        
        {/* Left Column: Official Google Pay QR Code Card */}
        <div className="glass-panel" style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Price Breakdown Banner */}
          <div style={{
            width: '100%',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.4rem'
            }}>
              <span>Flight ({selectedSlot?.categoryMeta?.name})</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '0.5rem',
              borderTop: '1px solid #E2E8F0',
              marginBottom: '0.4rem'
            }}>
              <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>
                Token Advance Payable Now
              </span>
              <span style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em'
              }}>
                ₹{tokenAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{
              fontSize: '0.72rem',
              color: '#64748B',
              textAlign: 'right'
            }}>
              Remaining ₹{balanceDue.toLocaleString('en-IN')} payable at flight landing
            </div>
          </div>

          {/* Akash Adventures Real Google Pay QR Code */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            padding: '0.85rem',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid #E2E8F0',
            position: 'relative',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            <img
              src="/akash_adventures_qr.png"
              alt="Akash Adventures Google Pay QR Code"
              style={{
                width: '210px',
                height: '210px',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Google Pay / Phone Number pill with Copy action */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '0.6rem 0.85rem',
            marginBottom: '1rem',
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Google Pay / PhonePe Number:</div>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#0F172A',
                fontFamily: 'var(--font-mono)'
              }}>
                75900 53446
              </div>
            </div>

            <button
              onClick={handleCopyNumber}
              style={{
                background: copiedNumber ? '#ECFDF5' : '#FFFFFF',
                color: copiedNumber ? '#059669' : '#0F172A',
                border: copiedNumber ? '1px solid #A7F3D0' : '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '0.35rem 0.7rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease'
              }}
            >
              {copiedNumber ? <><FiCheck /> Copied</> : <><FiCopy /> Copy Number</>}
            </button>
          </div>

          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
            Merchant: <strong>Akash Adventures</strong> • Bir Billing
          </div>
        </div>

        {/* Right Column: Payment Screenshot Upload (Primary Focus) */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0F172A',
              margin: '0 0 0.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaReceipt color="#059669" /> Upload Payment Screenshot *
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              After paying ₹{tokenAmount} on Google Pay, PhonePe, or Paytm, upload your payment receipt screenshot here.
            </p>
          </div>

          {/* Screenshot Dropzone & Image Preview */}
          <div style={{ marginBottom: '1.25rem' }}>
            {formData.paymentReceiptImage ? (
              /* Uploaded Image Preview */
              <div style={{
                border: '1.5px solid #10B981',
                borderRadius: '12px',
                padding: '0.85rem',
                background: '#ECFDF5',
                textAlign: 'center'
              }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.5rem' }}>
                  <img
                    src={formData.paymentReceiptImage}
                    alt="Payment Screenshot Preview"
                    style={{
                      maxHeight: '180px',
                      maxWidth: '100%',
                      borderRadius: '8px',
                      border: '1px solid #A7F3D0',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}
                  />
                  <button
                    onClick={handleRemoveScreenshot}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#E11D48',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem'
                    }}
                    title="Remove Screenshot"
                  >
                    ✕
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#047857', fontWeight: 700, fontSize: '0.85rem' }}>
                  <FaCheckCircle /> Payment Screenshot Attached!
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.15rem' }}>
                  Ready to confirm with Akash Adventures
                </div>
              </div>
            ) : (
              /* File Picker Dropzone */
              <label style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #CBD5E1',
                borderRadius: '12px',
                padding: '1.75rem 1rem',
                background: '#F8FAFC',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'center'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  style={{ display: 'none' }}
                />
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0F172A',
                  fontSize: '1.25rem',
                  marginBottom: '0.65rem'
                }}>
                  <FaUpload />
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                  Tap to Select Payment Screenshot
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                  Take screenshot from Google Pay or choose from Gallery (PNG / JPG)
                </span>
              </label>
            )}

            {uploadError && (
              <div style={{ color: '#E11D48', fontSize: '0.75rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <FiAlertCircle /> {uploadError}
              </div>
            )}
          </div>

          {/* Passenger Recap Card */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '10px',
            padding: '0.85rem',
            border: '1px solid #E2E8F0',
            fontSize: '0.78rem',
            marginBottom: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ color: '#64748B' }}>Passenger:</span>
              <strong style={{ color: '#0F172A' }}>{formData.clientName} ({formData.age}y, {formData.weight}kg)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ color: '#64748B' }}>Pickup Point:</span>
              <span style={{ color: '#0F172A', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {formData.pickupLocation}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>WhatsApp:</span>
              <span style={{ color: '#15803D', fontWeight: 600 }}>{formData.whatsapp}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={handleProceed}
              disabled={isVerifying}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.95rem',
                fontSize: '0.98rem',
                background: formData.paymentReceiptImage ? '#059669' : '#0F172A',
                border: formData.paymentReceiptImage ? '1px solid #059669' : '1px solid #0F172A'
              }}
            >
              {isVerifying ? (
                <span>Locking Flight with Akash Adventures...</span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheckCircle /> Confirm Booking with Screenshot ✓
                </span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
