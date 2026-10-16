// Akash Adventures | Bir Billing - Operational Slot System
// Operational Windows: Sunrise Special, Normal/Standard, Cross Country (XC), Sunset Special

export const CATEGORIES = {
  SUNRISE: {
    id: 'sunrise',
    name: 'Sunrise Special',
    timeBlock: '06:00 AM - 09:20 AM',
    badgeColor: 'amber',
    price: 4500,
    tokenAmount: 1000,
    totalCapacity: 4,
    description: 'Golden hour launch above mist-covered valleys. 1 Hour 40 Minutes full turnaround experience.'
  },
  STANDARD: {
    id: 'standard',
    name: 'Normal / Standard',
    timeBlock: '09:20 AM - 12:40 PM',
    badgeColor: 'emerald',
    price: 3500,
    tokenAmount: 1000,
    totalCapacity: 6,
    description: 'Classic high-altitude flight from Billing (2,430m). 1 Hour 40 Minutes flight experience.'
  },
  CROSS_COUNTRY: {
    id: 'xc',
    name: 'Cross Country (XC)',
    timeBlock: '01:00 PM - 04:20 PM',
    badgeColor: 'violet',
    price: 6500,
    tokenAmount: 2000,
    totalCapacity: 3,
    description: 'Extended thermal soaring. 1 Hour 40 Minutes turnaround, subject to pilot thermal check.'
  },
  SUNSET: {
    id: 'sunset',
    name: 'Sunset Special',
    timeBlock: '04:20 PM - 06:00 PM',
    badgeColor: 'orange',
    price: 4500,
    tokenAmount: 1000,
    totalCapacity: 4,
    description: 'Evening ridge flight soaring into crimson sunset. 1 Hour 40 Minutes golden hour slot.'
  }
};

// Generates operational slots for any date (minimum 1 hour 40 minutes duration per slot)
export const getDefaultSlotsForDate = (dateStr) => {
  return [
    {
      id: `${dateStr}-slot-1`,
      time: '06:00 AM - 07:40 AM',
      categoryKey: 'SUNRISE',
      duration: '1 hr 40 min',
      totalSlots: 4,
      bookedSlots: 0,
      locked: false,
      thermalCheckRequired: false
    },
    {
      id: `${dateStr}-slot-2`,
      time: '07:40 AM - 09:20 AM',
      categoryKey: 'SUNRISE',
      duration: '1 hr 40 min',
      totalSlots: 4,
      bookedSlots: 0,
      locked: false,
      thermalCheckRequired: false
    },
    {
      id: `${dateStr}-slot-3`,
      time: '09:20 AM - 11:00 AM',
      categoryKey: 'STANDARD',
      duration: '1 hr 40 min',
      totalSlots: 5,
      bookedSlots: 0,
      locked: false,
      thermalCheckRequired: false
    },
    {
      id: `${dateStr}-slot-4`,
      time: '11:00 AM - 12:40 PM',
      categoryKey: 'STANDARD',
      duration: '1 hr 40 min',
      totalSlots: 5,
      bookedSlots: 0,
      locked: false,
      thermalCheckRequired: false
    },
    {
      id: `${dateStr}-slot-5`,
      time: '01:00 PM - 02:40 PM',
      categoryKey: 'CROSS_COUNTRY',
      duration: '1 hr 40 min',
      totalSlots: 2,
      bookedSlots: 0,
      locked: false,
      thermalCheckRequired: true
    },
    {
      id: `${dateStr}-slot-6`,
      time: '02:40 PM - 04:20 PM',
      categoryKey: 'CROSS_COUNTRY',
      duration: '1 hr 40 min',
      totalSlots: 2,
      bookedSlots: 0,
      locked: false,
      thermalCheckRequired: true
    },
    {
      id: `${dateStr}-slot-7`,
      time: '04:20 PM - 06:00 PM',
      categoryKey: 'SUNSET',
      duration: '1 hr 40 min',
      totalSlots: 4,
      bookedSlots: 0,
      locked: false,
      thermalCheckRequired: false
    }
  ];
};

// Retrieve slots from localStorage if saved, otherwise default
export const getSlotsForDate = (dateStr) => {
  try {
    const key = `AKASH_SLOTS_V2_${dateStr}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading slots from storage', e);
  }
  return getDefaultSlotsForDate(dateStr);
};

// Persist slots for a specific date
export const saveSlotsForDate = (dateStr, slots) => {
  try {
    const key = `AKASH_SLOTS_V2_${dateStr}`;
    localStorage.setItem(key, JSON.stringify(slots));
  } catch (e) {
    console.error('Error saving slots to storage', e);
  }
};

export const POPULAR_PICKUP_POINTS = [
  {
    name: 'Bir Landing Ground (Main LZ Cafe)',
    address: 'Near Sunset Point, Chowgan, Bir Billing, HP',
    mapsUrl: 'https://maps.google.com/?q=32.0402,76.7169'
  },
  {
    name: 'Tibetan Colony Market Archway',
    address: 'Upper Tibetan Colony Gate, Bir, HP 176077',
    mapsUrl: 'https://maps.google.com/?q=32.0365,76.7198'
  },
  {
    name: 'Bir Bus Stand & Taxi Union Chowk',
    address: 'Main Chowk, Post Office Road, Bir',
    mapsUrl: 'https://maps.google.com/?q=32.0430,76.7210'
  },
  {
    name: 'Colonel’s Resort / Hotel Surya Entrance',
    address: 'VPO Bir, Tehsil Baijnath, Kangra',
    mapsUrl: 'https://maps.google.com/?q=32.0455,76.7245'
  },
  {
    name: 'Billing Take-Off Base Camp (Pilot Ridge)',
    address: 'Billing Launch Site (2430m), HP',
    mapsUrl: 'https://maps.google.com/?q=32.0578,76.7533'
  }
];

export const WEIGHT_LIMITS = {
  MIN_WEIGHT: 35,
  MAX_WEIGHT: 95,
  OVERWEIGHT_WARNING: 85,
  UNDERWEIGHT_WARNING: 40
};
