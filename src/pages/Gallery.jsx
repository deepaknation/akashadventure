import { useState, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiCalendar, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { SEO, Img } from '../components/ui';
import { GALLERY } from '../config';

const CATEGORIES = ['All', 'In-flight', 'Takeoff & Landing', 'Landscapes', 'Culture'];

export default function Gallery() {
  const [activeCat, setActiveCat] = useState('All');
  const [sel, setSel] = useState(null);
  const [selIdx, setSelIdx] = useState(null);

  const filtered = activeCat === 'All'
    ? GALLERY
    : GALLERY.filter((g) => g.category === activeCat);

  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') setSel(null);
      if (e.key === 'ArrowRight' && selIdx !== null) navigate(1);
      if (e.key === 'ArrowLeft' && selIdx !== null) navigate(-1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [selIdx, filtered]);

  const open = (g, i) => { setSel(g); setSelIdx(i); };
  const navigate = (dir) => {
    const next = (selIdx + dir + filtered.length) % filtered.length;
    setSel(filtered[next]);
    setSelIdx(next);
  };

  return (
    <>
      <SEO title="Gallery" path="/gallery" desc="Photos of paragliding, camping and mountain life in Bir Billing, Himachal Pradesh." />

      {/* ── Head ── */}
      <section className="wrap head" aria-label="Page header">
        <div>
          <p className="section-label">Real Photography</p>
          <h1>The View<br /><em>From Up Here.</em></h1>
        </div>
        <p className="intro">Authentic moments from the sky and the ground in Bir Billing — captured on GoPro and mirrorless cameras by our pilots and flyers.</p>
      </section>

      {/* ── Stats strip ── */}
      <section className="wrap sec-sm">
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          {[['8 real shots', 'Billing take-off to Chogan landing'], ['14 km', 'Air distance covered'], ['2,400 m', 'Take-off meadow altitude'], ['Infinity', 'Himalayan mountain view']].map(([n, l]) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", color: 'var(--ink)', fontSize: '1.4rem', fontWeight: 700 }}>{n}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 2 }}>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Filters ── */}
      <section className="wrap sec-sm" style={{ paddingBottom: 10 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                background: activeCat === cat ? 'var(--green)' : '#ffffff',
                color: activeCat === cat ? '#ffffff' : 'var(--ink)',
                border: activeCat === cat ? '1.5px solid var(--green)' : '1.5px solid var(--line)',
                padding: '9px 20px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeCat === cat ? '0 4px 14px rgba(42, 125, 79, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              {cat} {cat === 'All' ? `(${GALLERY.length})` : `(${GALLERY.filter(g => g.category === cat).length})`}
            </button>
          ))}
        </div>
      </section>

      {/* ── Masonry Grid ── */}
      <section className="wrap sec-sm gal" aria-label="Photo gallery">
        {filtered.map((g, i) => (
          <button
            key={g.src}
            onClick={() => open(g, i)}
            aria-label={`Open photo: ${g.alt}`}
            id={`gallery-btn-${i}`}
            style={{ position: 'relative' }}
          >
            <Img src={g.src} alt={g.alt} />
            <div style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              right: 8,
              padding: '6px 12px',
              background: 'rgba(10, 25, 14, 0.75)',
              backdropFilter: 'blur(8px)',
              borderRadius: 8,
              color: '#ffffff',
              fontSize: '0.74rem',
              fontWeight: 600,
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{g.category}</span>
              <span style={{ opacity: 0.75 }}>🔍 Click to zoom</span>
            </div>
          </button>
        ))}
      </section>

      {/* ── CTA Banner ── */}
      <section className="wrap sec-sm" style={{ marginTop: 40 }}>
        <div className="cta-banner">
          <img src="/images/hero.jpg" alt="" className="cta-banner-bg" aria-hidden="true" />
          <div className="cta-banner-overlay" />
          <div className="cta-banner-content">
            <h2>Experience This View Yourself</h2>
            <p>Our certified pilots will make sure you get the flight — and photos — of a lifetime.</p>
            <div className="cta-banner-btns">
              <Link to="/booking" className="btn btn-hero-primary" style={{ padding: '14px 34px', fontSize: '1rem' }}>
                <FiCalendar /> Book Your Flight
              </Link>
              <Link to="/contact" className="btn btn-hero-outline" style={{ padding: '14px 30px', fontSize: '1rem' }}>
                <FiPhone /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {sel && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label={sel.alt}
          onClick={() => setSel(null)}
        >
          <button className="lb-x" aria-label="Close lightbox">
            <FiX />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label="Previous photo"
            style={{
              position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.7)',
              borderRadius: '50%', width: 56, height: 56,
              display: 'grid', placeItems: 'center',
              color: '#fff', fontSize: 28, cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
            }}
          >
            <FiChevronLeft />
          </button>

          <div style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <img src={sel.src} alt={sel.alt} style={{ maxHeight: '80vh', maxWidth: '90vw', borderRadius: 'var(--radius-md)', border: '2px solid rgba(255,255,255,0.2)' }} />
            <div style={{ background: 'rgba(0,0,0,0.6)', padding: '10px 20px', borderRadius: 999, display: 'inline-block', marginTop: 14 }}>
              <span style={{ color: '#4ade80', fontWeight: 700, marginRight: 10, fontSize: '0.82rem' }}>{sel.category}</span>
              <span style={{ color: '#ffffff', fontSize: '0.92rem' }}>{sel.alt}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginLeft: 12 }}>({selIdx + 1} of {filtered.length})</span>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label="Next photo"
            style={{
              position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.7)',
              borderRadius: '50%', width: 56, height: 56,
              display: 'grid', placeItems: 'center',
              color: '#fff', fontSize: 28, cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
            }}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </>
  );
}
