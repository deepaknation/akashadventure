import { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronUp, FiCalendar, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { SITE } from '../config';

const LINKS = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/gallery', 'Gallery'],
  ['/3d-paraglider', '3D Canopy'],
  ['/contact', 'Contact'],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [top, setTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => {
    const f = () => {
      setScrolled(window.scrollY > 30);
      setTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>

      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Main">
        <div className="wrap nav-in">
          <Link to="/" className="logo">
            <span className="logo-icon">🪂</span>
            {SITE.name}
          </Link>
          <ul className={open ? 'links open' : 'links'}>
            {LINKS.map(([to, t]) => (
              <li key={to}>
                <NavLink to={to} end>{t}</NavLink>
              </li>
            ))}
            <li>
              <Link to="/booking" className="btn">
                <FiCalendar /> Book a flight
              </Link>
            </li>
          </ul>
          <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <main id="main"><Outlet /></main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <div className="logo" style={{ marginBottom: 12 }}>
                <span className="logo-icon">🪂</span> {SITE.name}
              </div>
              <p>Paragliding, camping and stays in Bir Billing — India's paragliding capital. Fly the Dhauladhar range with certified pilots.</p>
              <div className="social">
                <a href="https://instagram.com" className="social-btn" aria-label="Instagram"><FaInstagram /></a>
                <a href={`https://wa.me/${SITE.phone}`} className="social-btn" aria-label="WhatsApp"><FaWhatsapp /></a>
                <a href="https://youtube.com" className="social-btn" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>
            <div className="foot-col">
              <h4>Quick links</h4>
              <ul className="flist">
                {LINKS.map(([to, t]) => <li key={to}><Link to={to}>{t}</Link></li>)}
                <li><Link to="/booking">Book a Flight</Link></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <ul className="flist">
                <li><FiMapPin style={{ color: 'var(--green)', flexShrink: 0 }} /> {SITE.address}</li>
                <li><FiPhone style={{ color: 'var(--green)', flexShrink: 0 }} /><a href={`tel:+${SITE.phone}`}>{SITE.phoneLabel}</a></li>
                <li><FiMail style={{ color: 'var(--green)', flexShrink: 0 }} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <p className="copy">© {new Date().getFullYear()} {SITE.name}. Paragliding involves risk; fly with certified pilots only.</p>
            <div className="foot-links">
              <Link to="/contact">Privacy</Link>
              <Link to="/contact">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp CTA */}
      <a
        href={`https://wa.me/${SITE.phone}?text=${encodeURIComponent('Hi! I want to book a paragliding flight in Bir Billing.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="float-wa"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp style={{ fontSize: 20 }} />
        <span>WhatsApp Booking</span>
      </a>

      {top && (
        <button className="top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FiChevronUp />
        </button>
      )}
    </>
  );
}
