// ===== Edit this file first. Everything on the site reads from here. =====
export const SITE = {
  name: 'Bir Sky Flights',
  url: 'https://birskyflights.com',
  phone: '917590053446',
  phoneLabel: '+91 75900 53446',
  email: 'info@birskyflights.com',
  address: 'Bir Colony, Chaugan, Bir, Himachal Pradesh 176077',
  BOOKING_URL: '/booking',
  VIEWER_URL: '/3d-paraglider',
};

// Put your photos in /public/images using these file names (see README).
export const PACKAGES = [
  { img: '/images/pack-tandem.jpg', tag: 'Best for beginners', title: 'Tandem Flight', text: 'Fly with an experienced pilot from Billing and land at Chogan. No experience needed.', price: '₹3,000', duration: '15–25 mins flight' },
  { img: '/images/pack-couple.jpg', tag: 'Couple favourite', title: 'Sunset Pair Flight', text: 'Book back-to-back tandem slots and share the same sky, with both flights on one booking.', price: '₹5,500', duration: '2 pilots / 2 flyers' },
  { img: '/images/pack-camp.jpg', tag: 'Most popular', title: 'Fly + Camp', text: 'A morning flight followed by a night under the stars on the Billing meadows.', price: '₹4,800', duration: 'Flight + Dome tent + Meal' },
  { img: '/images/pack-stay.jpg', tag: 'Premium escape', title: 'Fly + Stay', text: 'A flight plus a comfortable room in Bir, with transfers to the take-off arranged.', price: '₹6,500', duration: 'Flight + Valley stay', gold: true },
];

export const GUIDE = [
  ['What is paragliding?', 'In a tandem flight you share a wing with a licensed pilot who handles take-off, flying and landing.'],
  ['Best flying season', 'Tandem flights generally run from mid-September to mid-July. Flights pause during the monsoon, so confirm before you travel.'],
  ['What to wear', 'Closed shoes with grip, comfortable layers and sunglasses with a strap. It is cooler at take-off than in the valley.'],
  ['What to carry', 'Keep it light: ID, phone and a jacket. Leave heavy bags at the office.'],
  ['How long is the flight?', 'Flight time depends on weather and thermals. Ask for the airtime included in your package.'],
  ['Is it safe?', 'Paragliding carries risk. Ask about pilot qualifications, equipment checks and the pre-flight briefing, and follow your pilot.'],
  ['Photos & video', 'Ask whether a camera recording is included in your package or charged separately before you book.'],
  ['Take-off & landing', 'Take-off is at Billing (about 2,400 m). You land near the Tibetan colony at Chogan, about 14 km away in Bir.'],
];

export const STEPS = [
  ['Meet & brief', 'Check-in at our Bir office, weight and health check, and a short safety briefing.'],
  ['Drive to Billing', 'A winding mountain drive to the take-off meadow at around 2,400 metres.'],
  ['Fly', 'Harness up, wing inflated, a few steps and you are airborne above the Kangra valley.'],
  ['Land at Chogan', 'A soft landing in the fields near the Tibetan colony, then a ride back to your stay.'],
];

// Replace src with your files. alt text is important for SEO and accessibility.
export const GALLERY = [
  { src: '/images/g1.jpg', alt: 'Paraglider flying above the Kangra valley at Bir Billing', category: 'In-flight' },
  { src: '/images/g2.jpg', alt: 'Pilot preparing a wing at the Billing take-off meadow', category: 'Takeoff & Landing' },
  { src: '/images/g3.jpg', alt: 'Colourful paragliders in the sky above Bir', category: 'In-flight' },
  { src: '/images/g4.jpg', alt: 'Dhauladhar mountain range seen from the air', category: 'Landscapes' },
  { src: '/images/g5.jpg', alt: 'Tents on the Billing meadow at sunrise', category: 'Landscapes' },
  { src: '/images/g6.jpg', alt: 'Tea gardens near Bir village', category: 'Landscapes' },
  { src: '/images/g7.jpg', alt: 'Paraglider landing in the fields at Chogan', category: 'Takeoff & Landing' },
  { src: '/images/g8.jpg', alt: 'Buddhist monastery and prayer flags in Bir', category: 'Culture' },
];
