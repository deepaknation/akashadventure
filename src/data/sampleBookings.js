// Akash Adventures | Bir Billing - Operational Ledger & Test Presets

// Real bookings start clean (empty by default)
export const INITIAL_BOOKINGS = [];

// Optional presets for owner testing
export const DEMO_PRESETS = [
  {
    name: 'Rahul Sharma (Sunrise Tandem)',
    clientName: 'Rahul Sharma',
    whatsapp: '+91 98112 34567',
    email: 'rahul.sharma@gmail.com',
    age: 28,
    weight: 72,
    pickupLocation: 'Bir Landing Ground (Main LZ Cafe)',
    mapsUrl: 'https://maps.google.com/?q=32.0402,76.7169',
    addOns: ['4K GoPro Video']
  },
  {
    name: 'Pooja Verma (Standard Noon Flight)',
    clientName: 'Pooja Verma',
    whatsapp: '+91 98450 11928',
    email: 'pooja.verma@outlook.com',
    age: 25,
    weight: 58,
    pickupLocation: 'Tibetan Colony Market Archway',
    mapsUrl: 'https://maps.google.com/?q=32.0365,76.7198',
    addOns: ['4K GoPro Video', '360 Insta360 Angle']
  },
  {
    name: 'Aman Deep (Cross Country XC)',
    clientName: 'Aman Deep',
    whatsapp: '+91 98820 99001',
    email: 'aman.deep@gmail.com',
    age: 32,
    weight: 81,
    pickupLocation: 'Colonel’s Resort / Hotel Surya Entrance',
    mapsUrl: 'https://maps.google.com/?q=32.0455,76.7245',
    addOns: ['Acro Flight Maneuvers', '4K GoPro Video']
  }
];
