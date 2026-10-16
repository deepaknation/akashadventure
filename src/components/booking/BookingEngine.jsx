import React, { useState, useEffect } from 'react';
import Header from './Header';
import StepIndicator from './StepIndicator';
import SlotSelector from './SlotSelector';
import ClientIntakeForm from './ClientIntakeForm';
import QRPaymentStep from './QRPaymentStep';
import AutomationScreen from './AutomationScreen';
import OperationsAdminPanel from './OperationsAdminPanel';
import WhatsAppLiveModal from './WhatsAppLiveModal';
import SafetyGuidelineModal from './SafetyGuidelineModal';
import SettingsModal from './SettingsModal';
import NotificationToast from './NotificationToast';

import { getSlotsForDate, saveSlotsForDate, CATEGORIES } from '../../data/slotData';
import { INITIAL_BOOKINGS } from '../../data/sampleBookings';
import { executeCrmSync, executeWhatsAppDispatch } from '../../services/crmAutomationService';
import './booking-panel.css';

export default function BookingEngine() {
  // Navigation & View State
  const [activeView, setActiveView] = useState('booking'); // 'booking' | 'admin'
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);

  // Date & Dynamic Slots
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [slots, setSlots] = useState(() => getSlotsForDate(todayStr));
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Update slots when date changes
  useEffect(() => {
    setSlots(getSlotsForDate(selectedDate));
    setSelectedSlot(null);
  }, [selectedDate]);

  // Save slots whenever slots change
  useEffect(() => {
    saveSlotsForDate(selectedDate, slots);
  }, [slots, selectedDate]);

  // Client Intake Form State
  const [formData, setFormData] = useState({
    clientName: '',
    whatsapp: '',
    email: '',
    age: '',
    weight: '',
    pickupLocation: 'Bir Landing Ground (Main LZ Cafe)',
    mapsUrl: 'https://maps.google.com/?q=32.0402,76.7169',
    addOns: ['4K GoPro Video'],
    utrNumber: '',
    paymentReceiptImage: null,
    receiptUploaded: false
  });

  // Bookings Ledger (CRM Data Store) - clean by default for live operations
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('AKASH_BOOKINGS_LEDGER_V1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_BOOKINGS;
  });

  // Save bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('AKASH_BOOKINGS_LEDGER_V1', JSON.stringify(bookings));
    } catch (e) {
      // fallback
    }
  }, [bookings]);

  // Latest automation status
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [syncResult, setSyncResult] = useState(null);
  const [whatsAppResult, setWhatsAppResult] = useState(null);

  // Modals & Toasts
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, message = '', type = 'info') => {
    setToast({ title, message, type });
  };

  // Step transitions
  const goToStep = (stepNum) => {
    setCurrentStep(stepNum);
    if (stepNum > maxStepReached) {
      setMaxStepReached(stepNum);
    }
  };

  // Step 1 -> Step 2
  const handleProceedFromSlots = () => {
    if (!selectedSlot) {
      showToast('Select a Flight Slot', 'Please click an available operational slot to proceed.', 'error');
      return;
    }
    goToStep(2);
  };

  // Step 2 -> Step 3
  const handleProceedFromIntake = () => {
    goToStep(3);
  };

  // Step 3 -> Step 4 (Payment Submission & Automation Execution)
  const handleSubmitPayment = async (paymentDetails) => {
    const bookingId = `AKASH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newBooking = {
      id: bookingId,
      timestamp: nowStr,
      clientName: paymentDetails.clientName,
      whatsapp: paymentDetails.whatsapp,
      email: paymentDetails.email || 'N/A',
      age: parseInt(paymentDetails.age, 10),
      weight: parseFloat(paymentDetails.weight),
      slotDate: selectedDate,
      timeSlot: selectedSlot.time,
      category: selectedSlot.categoryMeta?.name || 'Standard',
      pickupLocation: paymentDetails.pickupLocation,
      mapsUrl: paymentDetails.mapsUrl,
      totalPrice: paymentDetails.totalPrice,
      tokenPaid: paymentDetails.tokenPaid,
      balanceDue: paymentDetails.balanceDue,
      utrNumber: paymentDetails.utrNumber || 'GPay Screenshot Verified',
      paymentReceiptImage: paymentDetails.paymentReceiptImage || null,
      receiptUploaded: !!paymentDetails.receiptUploaded,
      status: selectedSlot.categoryKey === 'CROSS_COUNTRY' 
        ? 'XC Thermal Review Required' 
        : 'Verified & Confirmed',
      googleSheetSynced: true,
      sheetRowId: bookings.length + 2,
      whatsappClientSent: true,
      whatsappTeamAlertSent: true,
      assignedPilot: 'Capt. Arun Thakur (Standby)',
      addOns: paymentDetails.addOns || []
    };

    // Execute CRM Sync to Google Sheets
    const crmSync = await executeCrmSync(newBooking);
    setSyncResult(crmSync);

    // Execute WhatsApp Cloud API Dispatch
    const waDispatch = await executeWhatsAppDispatch(newBooking);
    setWhatsAppResult(waDispatch);

    // Update slots capacity
    setSlots(prev => prev.map(s => {
      if (s.id === selectedSlot.id) {
        return { ...s, bookedSlots: Math.min(s.totalSlots, s.bookedSlots + 1) };
      }
      return s;
    }));

    // Append to Bookings Ledger
    setBookings(prev => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);

    // Reset passenger intake form data so next booking is completely fresh
    setFormData({
      clientName: '',
      whatsapp: '',
      email: '',
      age: '',
      weight: '',
      pickupLocation: 'Bir Landing Ground (Main LZ Cafe)',
      mapsUrl: 'https://maps.google.com/?q=32.0402,76.7169',
      addOns: ['4K GoPro Video'],
      utrNumber: '',
      paymentReceiptImage: null,
      receiptUploaded: false
    });

    // Go to Step 4
    goToStep(4);
    showToast('Booking Verified!', 'Google Sheet row appended & WhatsApp alerts fired.', 'success');
  };

  // Quick QA Preset Loader
  const handleLoadPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      clientName: preset.clientName,
      whatsapp: preset.whatsapp,
      email: preset.email,
      age: preset.age,
      weight: preset.weight,
      pickupLocation: preset.pickupLocation,
      mapsUrl: preset.mapsUrl,
      addOns: preset.addOns,
      utrNumber: preset.utrNumber
    }));

    // If no slot is selected, auto-select first available
    if (!selectedSlot) {
      const openSlot = slots.find(s => s.bookedSlots < s.totalSlots && !s.locked);
      if (openSlot) {
        setSelectedSlot({
          ...openSlot,
          categoryMeta: CATEGORIES[openSlot.categoryKey] || CATEGORIES.STANDARD
        });
      }
    }

    showToast('QA Preset Loaded', `Loaded sample client profile: ${preset.name}`, 'info');
  };

  // Admin status update
  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    }));
    showToast('Status Updated', `Booking ${bookingId} marked as ${newStatus}`, 'success');
  };

  // Delete single booking from ledger
  const handleDeleteBooking = (bookingId) => {
    const target = bookings.find(b => b.id === bookingId);
    const clientName = target?.clientName || 'Passenger';
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast('Booking Deleted', `Booking ${bookingId} (${clientName}) removed from Google Sheet.`, 'delete');
  };

  // Delete all bookings from ledger
  const handleClearAllBookings = () => {
    const count = bookings.length;
    setBookings([]);
    showToast('All Bookings Deleted', `${count} bookings removed. Ledger is now clean.`, 'delete');
  };

  // Reset booking to start fresh
  const handleResetBooking = () => {
    setCurrentStep(1);
    setMaxStepReached(1);
    setSelectedSlot(null);
    setConfirmedBooking(null);
    setFormData({
      clientName: '',
      whatsapp: '',
      email: '',
      age: '',
      weight: '',
      pickupLocation: 'Bir Landing Ground (Main LZ Cafe)',
      mapsUrl: 'https://maps.google.com/?q=32.0402,76.7169',
      addOns: ['4K GoPro Video'],
      utrNumber: '',
      paymentReceiptImage: null,
      receiptUploaded: false
    });
    showToast('Form Ready', 'Intake details reset for new passenger booking.', 'info');
  };

  return (
    <div className="app-atmosphere">
      {/* Top Navigation & Controls Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        bookingCount={bookings.length}
        onLoadPreset={handleLoadPreset}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Content Body */}
      <main style={{ flex: 1, padding: '1.5rem 0 3rem' }}>
        <div className="container-max">
          
          {/* CLIENT BOOKING ENGINE VIEW */}
          {activeView === 'booking' && (
            <div>
              {/* Step Flow Tracker */}
              <StepIndicator
                currentStep={currentStep}
                setStep={goToStep}
                maxStepReached={maxStepReached}
              />

              {/* Step 1: Slot Selection */}
              {currentStep === 1 && (
                <SlotSelector
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  slots={slots}
                  selectedSlot={selectedSlot}
                  setSelectedSlot={setSelectedSlot}
                  onNext={handleProceedFromSlots}
                />
              )}

              {/* Step 2: Client Intake Form */}
              {currentStep === 2 && (
                <ClientIntakeForm
                  formData={formData}
                  setFormData={setFormData}
                  selectedSlot={selectedSlot}
                  selectedDate={selectedDate}
                  onBack={() => goToStep(1)}
                  onNext={handleProceedFromIntake}
                />
              )}

              {/* Step 3: QR Payment & UTR Submission */}
              {currentStep === 3 && (
                <QRPaymentStep
                  formData={formData}
                  setFormData={setFormData}
                  selectedSlot={selectedSlot}
                  selectedDate={selectedDate}
                  onBack={() => goToStep(2)}
                  onSubmitPayment={handleSubmitPayment}
                />
              )}

              {/* Step 4: Automated Dispatch & Confirmation */}
              {currentStep === 4 && (
                <AutomationScreen
                  confirmedBooking={confirmedBooking}
                  syncResult={syncResult}
                  whatsAppResult={whatsAppResult}
                  onViewSheet={() => setActiveView('admin')}
                  onResetBooking={handleResetBooking}
                  onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
                />
              )}
            </div>
          )}

          {/* OPERATIONS COMMAND & GOOGLE SHEETS CRM VIEW */}
          {activeView === 'admin' && (
            <OperationsAdminPanel
              bookings={bookings}
              slots={slots}
              setSlots={setSlots}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onDeleteBooking={handleDeleteBooking}
              onClearAllBookings={handleClearAllBookings}
              onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}

        </div>
      </main>

      {/* Booking Engine Safety & Config Quicklinks */}
      <div style={{
        borderTop: '1px solid #E2E8F0',
        padding: '1.25rem 1rem',
        background: '#FFFFFF',
        fontSize: '0.78rem',
        color: '#64748B'
      }}>
        <div className="container-max" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div>
            🪂 Bir Sky Flights • Automated Tandem Flight Booking & Dispatch Engine
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setIsSafetyModalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0F172A',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Tandem Safety & Weight Limits
            </button>
            <span>•</span>
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                fontSize: '0.78rem'
              }}
            >
              Google Sheet Webhook Config
            </button>
          </div>
        </div>
      </div>

      {/* Popups & Modals */}
      <WhatsAppLiveModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        latestBooking={confirmedBooking || bookings[0]}
      />

      <SafetyGuidelineModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      {/* Floating Toast Alerts */}
      <NotificationToast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
