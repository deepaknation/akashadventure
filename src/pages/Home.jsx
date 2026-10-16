import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowUpRight, FiCalendar, FiBox, FiStar, FiShield,
  FiUsers, FiClock, FiAward, FiPlay, FiPause, FiVolume2, FiVolumeX
} from 'react-icons/fi';
import { SEO, Img, Cta } from '../components/ui';
import { PACKAGES, GUIDE, GALLERY } from '../config';

const TESTIMONIALS = [
  {
    stars: 5,
    text: 'Absolutely life-changing experience! Flying over the Kangra valley with the Dhauladhar peaks right in front of us — I cannot put it into words. The pilot was incredibly professional.',
    name: 'Priya Sharma',
    from: 'Mumbai',
    initials: 'PS',
  },
  {
    stars: 5,
    text: 'Booked the Fly + Camp package and it was perfect. The overnight stay on Billing meadow under the stars after a flight is something I will never forget.',
    name: 'Rahul Verma',
    from: 'Delhi',
    initials: 'RV',
  },
  {
    stars: 5,
    text: 'First time paragliding and I was nervous. The team made me feel completely at ease. The briefing was thorough and the flight itself was surreal. Already planning to come back!',
    name: 'Ananya Krishnan',
    from: 'Bangalore',
    initials: 'AK',
  },
];

const WHY = [
  { icon: <FiShield />, title: 'BHPA-Certified Pilots', desc: 'Every flight is conducted by internationally certified and locally experienced pilots with 100+ hours at Bir Billing.' },
  { icon: <FiAward />, title: 'Top-Rated Since 2015', desc: 'Consistently rated #1 paragliding operator in Bir with thousands of happy flyers and zero incident record.' },
  { icon: <FiClock />, title: 'Flexible Booking', desc: 'Book a date or stay flexible. We work around your schedule and provide full refunds for weather cancellations.' },
  { icon: <FiUsers />, title: 'Personal Experience', desc: 'We keep groups small. You\'re not a number — our pilots take time to brief, explain and make the experience yours.' },
];

const SEASONS = [
  { month: 'Jan', status: 'open' }, { month: 'Feb', status: 'open' }, { month: 'Mar', status: 'open' },
  { month: 'Apr', status: 'open' }, { month: 'May', status: 'open' }, { month: 'Jun', status: 'open' },
  { month: 'Jul', status: 'pause' }, { month: 'Aug', status: 'pause' }, { month: 'Sep', status: 'open' },
  { month: 'Oct', status: 'open' }, { month: 'Nov', status: 'open' }, { month: 'Dec', status: 'open' },
];

export default function Home() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <SEO desc="Tandem paragliding, camping and stay packages in Bir Billing, Himachal Pradesh. Book online with India's top-rated paragliding operator." />

      {/* ── Hero Video Banner (Clean, Cinematic & Unobstructed) ── */}
      <section className="hero-wrap" aria-label="Hero Video Banner">
        {/* Background Video with Poster Fallback */}
        <video
          ref={videoRef}
          className="hero-bg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/images/hero.jpg"
          aria-hidden="true"
        >
          <source src="/videos/intro-video.mp4" type="video/mp4" />
          <img src="/images/hero.jpg" alt="Paragliding over Bir Billing Himalayas" className="hero-bg" />
        </video>

        {/* Ambient Video Play/Mute Controls */}
        <div className="hero-video-controls" aria-label="Video controls">
          <button
            type="button"
            onClick={togglePlay}
            className="video-ctrl-btn"
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <FiPause /> : <FiPlay />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="video-ctrl-btn"
            aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
            <span>{isMuted ? "Muted" : "Sound"}</span>
          </button>
        </div>

        <div className="scroll-cue">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* ── Intro Showcase Section (Clean Light Cream Section below Video) ── */}
      <section className="hero-intro-sec" aria-labelledby="intro-headline">
        <div className="wrap">
          <div className="hero-intro-card">
            <div className="hero-intro-header">
              <div className="hero-intro-badge">🪂 India's Paragliding Capital</div>
              <h1 id="intro-headline" className="hero-intro-title">
                Leave The Ground.<br /><em>Keep The View.</em>
              </h1>
              <p className="hero-intro-sub">
                Fly above the Kangra valley from Billing at 2,400 m. No experience needed — just the courage to step off.
              </p>
              <div className="hero-intro-actions">
                <Link to="/booking" className="btn" style={{ padding: '14px 34px', fontSize: '1.02rem' }}>
                  <FiCalendar /> Book My Flight
                </Link>
                <Link to="/3d-paraglider" className="btn outline" style={{ padding: '14px 28px', fontSize: '1.02rem' }}>
                  🪂 3D Canopy Studio
                </Link>
                <Link to="/gallery" className="btn outline-green" style={{ padding: '14px 28px', fontSize: '1.02rem' }}>
                  View Gallery <FiArrowUpRight />
                </Link>
              </div>
            </div>

            <div className="hero-intro-stats">
              <div className="intro-stat-item">
                <div className="intro-stat-num">10<span>k+</span></div>
                <div className="intro-stat-label">Happy flyers</div>
              </div>
              <div className="intro-stat-item">
                <div className="intro-stat-num">10<span>+</span></div>
                <div className="intro-stat-label">Years in the sky</div>
              </div>
              <div className="intro-stat-item">
                <div className="intro-stat-num">2<span>,400m</span></div>
                <div className="intro-stat-label">Take-off altitude</div>
              </div>
              <div className="intro-stat-item">
                <div className="intro-stat-num"><FiStar style={{ display: 'inline', color: 'var(--gold)' }} /> 4.9</div>
                <div className="intro-stat-label">Average rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="wrap sec" aria-labelledby="packages-title">
        <div className="packages-header">
          <div>
            <p className="section-label">Our Packages</p>
            <h2 id="packages-title">The Fly + Stay<br /><em>Collection</em></h2>
          </div>
          <p className="packages-intro">Choose a package that suits your vibe — from a solo tandem flight to a full camping getaway under the Himalayas.</p>
        </div>
        <div className="grid4">
          {PACKAGES.map((p) => (
            <Link to="/booking" className="pk" key={p.title}>
              <div className="pk-img-wrap">
                <Img src={p.img} alt={`${p.title} at Bir Billing`} className="ph" />
                <span className={p.gold ? 'tag gold' : 'tag'}>{p.tag}</span>
              </div>
              <div className="pk-body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
              <div className="pk-footer">
                <div className="pk-price-tag">
                  {p.price}
                  <span>{p.duration}</span>
                </div>
                <span className="pk-btn">Book Flight <FiArrowUpRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Real Moments Photo Strip ── */}
      <section className="wrap sec" aria-labelledby="gallery-preview-title">
        <div className="packages-header">
          <div>
            <p className="section-label">Captured In Bir</p>
            <h2 id="gallery-preview-title">Real Moments.<br /><em>Pure Freedom.</em></h2>
          </div>
          <Link to="/gallery" className="btn outline" style={{ padding: '10px 24px', fontSize: '0.88rem' }}>
            View All 8+ Photos <FiArrowUpRight />
          </Link>
        </div>
        <div className="grid4">
          {GALLERY.slice(0, 4).map((g) => (
            <Link to="/gallery" key={g.src} className="pk" style={{ borderRadius: 'var(--radius-md)' }}>
              <div className="pk-img-wrap" style={{ aspectRatio: '4/3' }}>
                <Img src={g.src} alt={g.alt} className="ph" style={{ height: '100%', aspectRatio: 'auto' }} />
                <span className="tag" style={{ bottom: 12, top: 'auto', left: 12 }}>{g.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="wrap sec" aria-labelledby="why-title">
        <div className="packages-header">
          <div>
            <p className="section-label">Why Bir Sky</p>
            <h2 id="why-title">Fly With<br /><em>Confidence</em></h2>
          </div>
          <p className="packages-intro">We have been operating in Bir Billing since 2015 with an unblemished safety record and thousands of five-star flights.</p>
        </div>
        <div className="why-grid">
          {WHY.map((w) => (
            <div className="why-item" key={w.title}>
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="wrap sec-sm" aria-label="Book a flight CTA">
        <div className="cta-banner">
          <img src="/images/hero.jpg" alt="" className="cta-banner-bg" aria-hidden="true" />
          <div className="cta-banner-overlay" />
          <div className="cta-banner-content">
            <p className="section-label" style={{ justifyContent: 'center' }}>Ready?</p>
            <h2>Your Flight Awaits</h2>
            <p>Book online in minutes. No experience needed. Weather refunds guaranteed.</p>
            <div className="cta-banner-btns">
              <Link to="/booking" className="btn btn-hero-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                <FiCalendar /> Book Online
              </Link>
              <Link to="/about" className="btn btn-hero-outline" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tool Cards ── */}
      <section className="wrap sec" aria-label="Tools">
        <div className="grid2">
          <Link to="/booking" className="tool">
            <FiCalendar className="ti" />
            <h3>Book online</h3>
            <p>Choose your date, group size and package in a few taps. Instant confirmation.</p>
            <span className="btn-tool">Start Booking <FiArrowUpRight /></span>
          </Link>
          <Link to="/3d-paraglider" className="tool alt">
            <FiBox className="ti" />
            <h3>Explore a paraglider in 3D</h3>
            <p>Rotate the wing, lines and harness to understand how everything fits together before you fly.</p>
            <span className="btn-tool">Open 3D View <FiArrowUpRight /></span>
          </Link>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="wrap sec" aria-labelledby="reviews-title">
        <div className="packages-header">
          <div>
            <p className="section-label">Real Reviews</p>
            <h2 id="reviews-title">What Guests<br /><em>Are Saying</em></h2>
          </div>
          <p className="packages-intro">Over 10,000 flights and counting — read what adventurers from across India think of their experience.</p>
        </div>
        <div className="testimonials-track">
          {TESTIMONIALS.map((t) => (
            <div className="tcard" key={t.name}>
              <div className="tcard-stars">{'★'.repeat(t.stars)}</div>
              <p className="tcard-text">"{t.text}"</p>
              <div className="tcard-author">
                <div className="tcard-avatar">{t.initials}</div>
                <div>
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-from">{t.from}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Season Guide ── */}
      <section className="wrap sec" aria-labelledby="season-title">
        <div className="packages-header">
          <div>
            <p className="section-label">Flying Season</p>
            <h2 id="season-title">Best Time<br /><em>To Fly</em></h2>
          </div>
          <p className="packages-intro">Flights run September to June. Monsoon months (July–August) are paused for safety. Always confirm before you travel.</p>
        </div>
        <div className="season-grid">
          {SEASONS.map((s) => (
            <div className="season-item" key={s.month}>
              <div className="season-month">{s.month}</div>
              <div className={`season-status ${s.status}`}>{s.status === 'open' ? '✓ Open' : '⏸ Pause'}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Guide ── */}
      <section className="wrap sec" aria-labelledby="guide-title">
        <div className="head2">
          <div>
            <p className="section-label">Paragliding Guide</p>
            <h2 id="guide-title">Everything You Need<br />To Know <em>Before You Fly</em></h2>
          </div>
          <p className="intro">Plan your Bir Billing flight with confidence. These are the things every traveller should know before booking.</p>
        </div>
        <div className="grid4 gcards">
          {GUIDE.map(([t, d], i) => (
            <article className="gcard" key={t}>
              <div className="num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
