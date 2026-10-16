import { FiShield, FiUsers, FiMap, FiStar, FiCamera, FiWind } from 'react-icons/fi';
import { SEO, Img, Cta } from '../components/ui';
import { STEPS } from '../config';
import { Link } from 'react-router-dom';

const VALUES = [
  { Icon: FiShield, title: 'Safety First', desc: 'We brief every guest, inspect equipment before each flight and only fly when conditions are ideal. Your safety is non-negotiable.' },
  { Icon: FiUsers, title: 'Small, Personal Groups', desc: 'You are not a number. Our pilots take time to explain every step, answer every question and make the experience uniquely yours.' },
  { Icon: FiMap, title: 'Deep Local Knowledge', desc: 'Our team lives in Bir. We know every thermal, every take-off nuance and the best places to eat, sleep and explore after your flight.' },
  { Icon: FiWind, title: 'Premium Equipment', desc: 'We use certified, regularly serviced wings and harnesses from leading manufacturers. Gear is checked before every single flight.' },
  { Icon: FiStar, title: 'Rated #1 in Bir Billing', desc: 'Over 10,000 flights completed with a 4.9-star average. Our reputation is built on consistent, exceptional experiences.' },
  { Icon: FiCamera, title: 'Photos & Video Included', desc: 'A GoPro hero shot of your flight is included in most packages. Relive the moment and share it with the world.' },
];

const PILOTS = [
  {
    name: 'Rajan Sharma',
    role: 'Chief Tandem Pilot',
    flights: '3,200+ flights · 8 years',
    img: '/images/pilot-rajan.jpg',
    bio: 'Born in Bir, APPI Master Tandem certified with over 3,000 flights from Billing meadow.',
  },
  {
    name: 'Deepika Nair',
    role: 'Senior Cross-Country Pilot',
    flights: '2,100+ flights · 6 years',
    img: '/images/pilot-deepika.jpg',
    bio: 'Specialist in gentle, high-thermal soaring flights and nervous first-time flyers.',
  },
  {
    name: 'Arjun Thakur',
    role: 'Acro & Sunset Specialist',
    flights: '1,500+ flights · 4 years',
    img: '/images/pilot-arjun.jpg',
    bio: 'Local mountain native known for smooth takeoffs and breathtaking sunset photography flights.',
  },
];

export default function About() {
  return (
    <>
      <SEO title="About" path="/about" desc="Meet the team behind Bir Sky Flights and see how a tandem paragliding day works in Bir Billing, Himachal Pradesh." />

      {/* ── Head ── */}
      <section className="wrap head" aria-label="Page header">
        <div>
          <p className="section-label">About us</p>
          <h1>Born In Bir.<br /><em>Built Around The Sky.</em></h1>
        </div>
        <p className="intro">A small team of mountain people who love sharing the view from above and believe everyone deserves to feel free.</p>
      </section>

      {/* ── Story ── */}
      <section className="wrap sec-sm">
        <div className="split">
          <div className="split-img" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', maxHeight: 520 }}>
            <Img src="/images/about.jpg" alt="Our pilots at the Billing take-off meadow" className="ph wide" style={{ height: '100%' }} />
          </div>
          <div className="prose">
            <p className="section-label">Our Story</p>
            <h2>Why Bir Billing</h2>
            <p>Bir and Billing sit in the foothills of the Dhauladhar range in Kangra district, and the area has long been known as India's paragliding capital. The take-off meadow at Billing is about 2,400 metres above sea level, and pilots land in the fields near the Tibetan colony at Chogan, roughly 14 km away.</p>
            <p>We started Bir Sky to make that experience simple: transparent pricing, honest planning and a booking that takes minutes. Every pilot on our team has grown up in these mountains and carries a deep respect for the conditions, the equipment and the people who trust us with their adventure.</p>
            <p>Whether you are a nervous first-timer or a returning flyer looking for the best seat in the Himalayas, we are here to give you the flight of a lifetime — safely.</p>
            <div style={{ marginTop: 24 }}>
              <Link to="/contact" className="btn" style={{ padding: '12px 28px' }}>
                Talk to Our Team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="wrap sec" aria-labelledby="values-title">
        <div className="packages-header">
          <div>
            <p className="section-label">What We Stand For</p>
            <h2 id="values-title">Our Core<br /><em>Values</em></h2>
          </div>
        </div>
        <div className="values-grid">
          {VALUES.map(({ Icon, title, desc }) => (
            <div className="vcard" key={title}>
              <div className="vcard-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section className="wrap sec" aria-labelledby="team-title">
        <div className="packages-header">
          <div>
            <p className="section-label">Meet The Team</p>
            <h2 id="team-title">Our <em>Pilots</em></h2>
          </div>
          <p className="packages-intro">All our pilots are BHPA and APPI certified with thousands of flights over Bir Billing under their belts.</p>
        </div>
        <div className="grid3">
          {PILOTS.map((p) => (
            <div className="gcard" key={p.name} style={{ textAlign: 'center', padding: '36px 28px' }}>
              <img
                src={p.img}
                alt={p.name}
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 18px',
                  border: '3px solid var(--green)',
                  boxShadow: '0 8px 24px rgba(42, 125, 79, 0.25)',
                  display: 'block'
                }}
              />
              <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>{p.name}</h3>
              <p style={{ color: 'var(--green)', fontSize: '0.84rem', fontWeight: 700, marginBottom: 4 }}>{p.role}</p>
              <p style={{ color: 'var(--gold)', fontSize: '0.82rem', fontWeight: 600, marginBottom: 12 }}>{p.flights}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>{p.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Your Flight Day ── */}
      <section className="wrap sec" aria-labelledby="steps-title">
        <div className="split" style={{ gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }}>
          <div>
            <p className="section-label">How It Works</p>
            <h2 id="steps-title">Your <em>Flight Day</em><br />Step By Step</h2>
            <p style={{ color: 'var(--muted)', marginTop: 16, lineHeight: 1.75 }}>From check-in at our Bir office to landing at Chogan — here is exactly what to expect on the day of your flight.</p>
          </div>
          <div className="steps-list">
            {STEPS.map(([t, d], i) => (
              <div className="step" key={t}>
                <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="step-body">
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="wrap sec-sm">
        <div className="cta-banner">
          <img src="/images/about.jpg" alt="" className="cta-banner-bg" aria-hidden="true" />
          <div className="cta-banner-overlay" />
          <div className="cta-banner-content">
            <h2>Ready to Fly?</h2>
            <p>Join 10,000+ guests who have experienced the magic of Bir Billing from the air.</p>
            <div className="cta-banner-btns">
              <Link to="/booking" className="btn btn-hero-primary" style={{ padding: '14px 34px', fontSize: '1rem' }}>Book My Flight</Link>
              <Link to="/gallery" className="btn btn-hero-outline" style={{ padding: '14px 30px', fontSize: '1rem' }}>See Gallery</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
