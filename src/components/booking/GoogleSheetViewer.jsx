import React, { useState } from 'react';
import { 
  FaTable, 
  FaWhatsapp, 
  FaSearch, 
  FaTimes, 
  FaImage, 
  FaCheck, 
  FaDownload, 
  FaEye,
  FaTrashAlt
} from 'react-icons/fa';
import { 
  FiExternalLink, 
  FiSearch, 
  FiDownload, 
  FiInbox, 
  FiCheckCircle 
} from 'react-icons/fi';
import { generateClientWhatsAppMessage } from '../../services/crmAutomationService';

export default function GoogleSheetViewer({ 
  bookings, 
  onUpdateBookingStatus, 
  onOpenWhatsAppModal,
  onDeleteBooking,
  onClearAllBookings
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState(null);

  // Filter logic
  const filtered = bookings.filter(b => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      b.clientName?.toLowerCase().includes(q) ||
      b.id?.toLowerCase().includes(q) ||
      b.whatsapp?.toLowerCase().includes(q) ||
      b.pickupLocation?.toLowerCase().includes(q);
    
    if (categoryFilter === 'ALL') return matchesSearch;
    return matchesSearch && b.category?.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  // Export to CSV
  const handleExportCsv = () => {
    const headers = [
      'Timestamp', 'Booking ID', 'Passenger Name', 'WhatsApp', 'Age', 'Weight(kg)', 
      'Slot Date', 'Time Window', 'Category', 'Pickup Hub', 'Google Maps Link', 
      'Total Price(INR)', 'Token Paid(INR)', 'Balance Due(INR)', 'Status'
    ];
    
    const rows = bookings.map(b => [
      `"${b.timestamp}"`,
      `"${b.id}"`,
      `"${b.clientName}"`,
      `"${b.whatsapp}"`,
      b.age,
      b.weight,
      `"${b.slotDate}"`,
      `"${b.timeSlot}"`,
      `"${b.category}"`,
      `"${b.pickupLocation}"`,
      `"${b.mapsUrl}"`,
      b.totalPrice,
      b.tokenPaid,
      b.balanceDue,
      `"${b.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AkashAdventures_BirBilling_CRM_Sync_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Spreadsheet Header Toolbar */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '14px 14px 0 0',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        {/* Left: Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: '#ECFDF5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#059669',
            border: '1px solid #A7F3D0'
          }}>
            <FaTable size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A' }}>
                Akash Adventures CRM Google Sheet
              </span>
              <span style={{
                background: bookings.length > 0 ? '#ECFDF5' : '#F1F5F9',
                color: bookings.length > 0 ? '#059669' : '#64748B',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.15rem 0.45rem',
                borderRadius: '6px',
                border: bookings.length > 0 ? '1px solid #A7F3D0' : '1px solid #E2E8F0'
              }}>
                {bookings.length > 0 ? `LIVE SYNCED • ${bookings.length} BOOKINGS` : 'READY TO RECEIVE BOOKINGS'}
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
              Worksheet: <code>Akash_Adventures_Bir_Billing_2026</code> (Auto-Appended via Cloud Webhook)
            </div>
          </div>
        </div>

        {/* Right: Search, Filter, Export */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', left: '10px', top: '9px', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search passenger, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '0.45rem 0.75rem 0.45rem 2rem',
                color: '#0F172A',
                fontSize: '0.8rem',
                outline: 'none',
                width: '190px'
              }}
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '0.45rem 0.65rem',
              color: '#0F172A',
              fontSize: '0.8rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">All Categories</option>
            <option value="Sunrise">Sunrise Special</option>
            <option value="Standard">Standard Flights</option>
            <option value="Cross Country">Cross Country (XC)</option>
            <option value="Sunset">Sunset Special</option>
          </select>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            disabled={bookings.length === 0}
            style={{
              background: bookings.length > 0 ? '#FFFFFF' : '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '0.45rem 0.75rem',
              color: bookings.length > 0 ? '#0F172A' : '#94A3B8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: bookings.length > 0 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            title="Download CSV report"
          >
            <FiDownload size={13} />
            <span>Export CSV</span>
          </button>

          {/* Delete All Bookings Button */}
          {bookings.length > 0 && (
            <button
              onClick={onClearAllBookings}
              style={{
                background: '#FFF1F2',
                border: '1px solid #FECDD3',
                borderRadius: '8px',
                padding: '0.45rem 0.75rem',
                color: '#E11D48',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Delete all bookings from sheet"
            >
              <FaTrashAlt size={11} />
              <span>Delete All</span>
            </button>
          )}
        </div>
      </div>

      {/* Sheet Content Body */}
      {bookings.length === 0 ? (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderTop: 'none',
          borderRadius: '0 0 14px 14px',
          padding: '3.5rem 1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            fontSize: '1.8rem',
            marginBottom: '1rem'
          }}>
            <FiInbox />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.4rem' }}>
            Ledger Is Clean & Ready for Real Bookings
          </h3>
          <p style={{
            fontSize: '0.85rem',
            color: '#64748B',
            maxWidth: '520px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.5
          }}>
            No demo or fake bookings in ledger. When customers reserve a slot via the <strong>Client Portal</strong> and upload their payment screenshot, their passenger intake, GPS pickup link, and payment receipts will appear here in real-time.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#F1F5F9',
            border: '1px solid #E2E8F0',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: '#475569'
          }}>
            <span>Official WhatsApp Dispatch:</span>
            <strong style={{ color: '#0F172A' }}>+91 75900 53446</strong>
          </div>
        </div>
      ) : (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderTop: 'none',
          borderRadius: '0 0 14px 14px',
          overflowX: 'auto',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.78rem',
            minWidth: '1050px'
          }}>
            <thead>
              <tr style={{
                background: '#F8FAFC',
                borderBottom: '1px solid #E2E8F0',
                color: '#64748B',
                textTransform: 'uppercase',
                fontSize: '0.68rem',
                letterSpacing: '0.04em'
              }}>
                <th style={{ padding: '0.75rem 1rem' }}>#</th>
                <th style={{ padding: '0.75rem 1rem' }}>Booking ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Passenger & WhatsApp</th>
                <th style={{ padding: '0.75rem 1rem' }}>Age / Weight</th>
                <th style={{ padding: '0.75rem 1rem' }}>Slot Window</th>
                <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                <th style={{ padding: '0.75rem 1rem' }}>Pickup Hub & Maps Pin</th>
                <th style={{ padding: '0.75rem 1rem' }}>Token Paid</th>
                <th style={{ padding: '0.75rem 1rem' }}>Payment Screenshot</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, index) => {
                const isXC = b.category?.includes('Cross Country');
                const hasScreenshot = !!b.paymentReceiptImage;

                return (
                  <tr
                    key={b.id}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: '#FFFFFF',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                  >
                    {/* Row index */}
                    <td style={{ padding: '0.85rem 1rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                      {index + 2}
                    </td>

                    {/* Booking ID */}
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0F172A', fontFamily: 'var(--font-mono)' }}>
                      {b.id}
                    </td>

                    {/* Passenger & WhatsApp */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{b.clientName}</div>
                      <div style={{ color: '#15803D', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FaWhatsapp size={11} /> {b.whatsapp}
                      </div>
                    </td>

                    {/* Age & Weight */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{ color: '#475569' }}>{b.age} yrs</span> •{' '}
                      <span style={{
                        fontWeight: 700,
                        color: b.weight > 85 ? '#D97706' : '#059669'
                      }}>
                        {b.weight} kg
                      </span>
                    </td>

                    {/* Slot Window */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{b.timeSlot}</div>
                      <div style={{ color: '#94A3B8', fontSize: '0.7rem' }}>{b.slotDate}</div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        background: b.category?.includes('Sunrise') 
                          ? '#FFFBEB' 
                          : b.category?.includes('Sunset') 
                          ? '#FFF7ED' 
                          : isXC 
                          ? '#F5F3FF' 
                          : '#ECFDF5',
                        color: b.category?.includes('Sunrise') 
                          ? '#B45309' 
                          : b.category?.includes('Sunset') 
                          ? '#C2410C' 
                          : isXC 
                          ? '#6D28D9' 
                          : '#047857',
                        border: '1px solid rgba(0,0,0,0.05)'
                      }}>
                        {b.category}
                      </span>
                    </td>

                    {/* Pickup Hub & Maps link */}
                    <td style={{ padding: '0.85rem 1rem', maxWidth: '220px' }}>
                      <div style={{
                        color: '#334155',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {b.pickupLocation}
                      </div>
                      <a
                        href={b.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#0284C7',
                          textDecoration: 'none',
                          fontSize: '0.7rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontWeight: 600
                        }}
                      >
                        Maps Pin <FiExternalLink size={10} />
                      </a>
                    </td>

                    {/* Token */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 800, color: '#0F172A' }}>₹{b.tokenPaid}</div>
                      <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Due: ₹{b.balanceDue}</div>
                    </td>

                    {/* Payment Proof: Direct Screenshot Viewer */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {hasScreenshot ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <img
                            src={b.paymentReceiptImage}
                            alt="Receipt Thumbnail"
                            style={{
                              width: '32px',
                              height: '32px',
                              objectFit: 'cover',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              cursor: 'pointer'
                            }}
                            onClick={() => setSelectedReceiptBooking(b)}
                          />
                          <button
                            onClick={() => setSelectedReceiptBooking(b)}
                            style={{
                              background: '#F0FDF4',
                              border: '1px solid #BBF7D0',
                              color: '#15803D',
                              borderRadius: '6px',
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                          >
                            <FaEye size={10} />
                            <span>View Proof</span>
                          </button>
                        </div>
                      ) : (
                        <span style={{
                          fontSize: '0.7rem',
                          color: '#64748B',
                          background: '#F1F5F9',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          border: '1px solid #E2E8F0'
                        }}>
                          GPay (75900 53446)
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '9999px',
                        background: b.status?.includes('Confirmed') 
                          ? '#ECFDF5' 
                          : b.status?.includes('Review') 
                          ? '#FFFBEB' 
                          : '#F1F5F9',
                        color: b.status?.includes('Confirmed') 
                          ? '#047857' 
                          : b.status?.includes('Review') 
                          ? '#B45309' 
                          : '#334155',
                        border: b.status?.includes('Confirmed') 
                          ? '1px solid #A7F3D0' 
                          : b.status?.includes('Review') 
                          ? '1px solid #FDE68A' 
                          : '1px solid #E2E8F0'
                      }}>
                        {b.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button
                          onClick={() => {
                            const clean = b.whatsapp.replace(/[^0-9]/g, '');
                            const msg = generateClientWhatsAppMessage(b);
                            window.open(`https://wa.me/${clean}?text=${encodeURIComponent(msg)}`, '_blank');
                          }}
                          style={{
                            background: '#F0FDF4',
                            border: '1px solid #BBF7D0',
                            color: '#15803D',
                            borderRadius: '6px',
                            padding: '0.3rem 0.5rem',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                          title="Send Direct WhatsApp Message"
                        >
                          <FaWhatsapp size={12} />
                        </button>

                        {b.status?.includes('Review') && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'Verified & Confirmed')}
                            style={{
                              background: '#ECFDF5',
                              border: '1px solid #A7F3D0',
                              color: '#047857',
                              borderRadius: '6px',
                              padding: '0.3rem 0.55rem',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                            title="Confirm XC flight after thermal evaluation"
                          >
                            Approve
                          </button>
                        )}

                        {/* Row Delete Booking Button */}
                        <button
                          onClick={() => onDeleteBooking(b.id)}
                          style={{
                            background: '#FFF1F2',
                            border: '1px solid #FECDD3',
                            color: '#E11D48',
                            borderRadius: '6px',
                            padding: '0.3rem 0.5rem',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                          title="Delete this booking from sheet"
                        >
                          <FaTrashAlt size={10} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* POPUP MODAL: PAYMENT SCREENSHOT PREVIEW */}
      {selectedReceiptBooking && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 110,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            background: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-elevated)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#F8FAFC'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                  Payment Screenshot Verification
                </h4>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Booking: <strong>{selectedReceiptBooking.id}</strong> • {selectedReceiptBooking.clientName}
                </div>
              </div>
              <button
                onClick={() => setSelectedReceiptBooking(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Image Body */}
            <div style={{
              padding: '1.25rem',
              overflowY: 'auto',
              textAlign: 'center',
              background: '#F1F5F9'
            }}>
              {selectedReceiptBooking.paymentReceiptImage ? (
                <img
                  src={selectedReceiptBooking.paymentReceiptImage}
                  alt="Payment Receipt"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '52vh',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              ) : (
                <p style={{ color: '#64748B' }}>No screenshot data available.</p>
              )}

              {/* Payment Details summary */}
              <div style={{
                marginTop: '1rem',
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                border: '1px solid #E2E8F0',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                textAlign: 'left',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.72rem' }}>Token Paid:</span>
                  <div style={{ fontWeight: 800, color: '#059669', fontSize: '1rem' }}>
                    ₹{selectedReceiptBooking.tokenPaid}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.72rem' }}>Remaining Balance:</span>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>
                    ₹{selectedReceiptBooking.balanceDue}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.72rem' }}>Slot Time:</span>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>
                    {selectedReceiptBooking.timeSlot} ({selectedReceiptBooking.slotDate})
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.72rem' }}>Pickup Hub:</span>
                  <div style={{ fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {selectedReceiptBooking.pickupLocation}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{
              padding: '0.85rem 1.25rem',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              background: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    onUpdateBookingStatus(selectedReceiptBooking.id, 'Verified & Confirmed');
                    setSelectedReceiptBooking(null);
                  }}
                  className="btn-primary"
                  style={{
                    background: '#059669',
                    borderColor: '#059669',
                    fontSize: '0.82rem',
                    padding: '0.55rem 1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <FiCheckCircle />
                  <span>Mark Verified & Confirmed</span>
                </button>

                <button
                  onClick={() => {
                    onDeleteBooking(selectedReceiptBooking.id);
                    setSelectedReceiptBooking(null);
                  }}
                  style={{
                    background: '#FFF1F2',
                    border: '1px solid #FECDD3',
                    color: '#E11D48',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    padding: '0.55rem 0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <FaTrashAlt size={11} /> Delete
                </button>
              </div>

              <button
                onClick={() => setSelectedReceiptBooking(null)}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '0.55rem 1rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
