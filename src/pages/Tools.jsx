import React from 'react';
import { SEO } from '../components/ui';
import BookingEngine from '../components/booking/BookingEngine';
import CanopyViewer from '../components/canopy/CanopyViewer';

/**
 * Smart Booking Slot Engine Page
 * Features 4-step client intake, real-time slot dispatcher,
 * instant UPI QR payment verification, and Operations Admin CRM.
 */
export function Booking() {
  return (
    <>
      <SEO 
        title="Book a Flight | Smart Slot Dispatch Engine" 
        path="/booking" 
        desc="Book tandem paragliding in Bir Billing with instant UPI QR payment, real-time slot selection, automated WhatsApp ticket dispatch and Google Sheets CRM sync." 
      />
      <div style={{ paddingTop: '72px' }}>
        <BookingEngine />
      </div>
    </>
  );
}

/**
 * 3D Tandem Canopy Component Page
 * Features interactive Three.js 42-cell ram-air glider,
 * dynamic wind aerodynamics, brake steering lines, blueprint mode, and 3D export.
 */
export function Viewer3D() {
  return (
    <>
      <SEO 
        title="3D Tandem Canopy Anatomy | Aerodynamic Studio" 
        path="/3d-paraglider" 
        desc="Explore the interactive 3D anatomy and aerodynamics of a tandem paraglider. Customize colors, adjust brake lines, test wind speeds, inspect ram-air cells, and export 3D models." 
      />
      <div style={{ paddingTop: '72px' }}>
        <CanopyViewer />
      </div>
    </>
  );
}

export default { Booking, Viewer3D };
