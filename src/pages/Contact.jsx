import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SEO } from '../components/ui';
import { SITE } from '../config';

const CONTACT_INFO = [
  {
    icon: <FiPhone />,
    label: 'Call or WhatsApp',
    value: SITE.phoneLabel,
    href: `tel:+${SITE.phone}`,
  },
  {
    icon: <FiMail />,
    label: 'Email us',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: <FiMapPin />,
    label: 'Our office',
    value: SITE.address,
    href: null,
  },
  {
    icon: <FiClock />,
    label: 'Office hours',
    value: 'Daily 7 AM – 7 PM (IST)',
    href: null,
  },
];

const FAQS = [
  ['How quickly will you respond?', 'We reply to WhatsApp messages within 2 hours during office hours (7 AM – 7 PM IST). Email responses within 24 hours.'],
  ['Can I book same-day?', 'Same-day slots are available subject to weather and availability. WhatsApp us directly for the fastest response.'],
  ['Do you offer group discounts?', 'Yes — for groups of 5 or more we offer custom pricing. Mention your group size in the enquiry form.'],
];

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', date: '', people: '2', pkg: '', msg: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const send = (e) => {
    e.preventDefault();
    const t = `Hi! I'm ${f.name} (${f.phone}). Package: ${f.pkg || 'not specified'}. Date: ${f.date || 'flexible'}, people: ${f.people}. ${f.msg}`;
    window.open(`https://wa.me/${SITE.phone}?text=${encodeURIComponent(t)}`, '_blank', 'noopener');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <SEO title="Contact" path="/contact" desc="Contact Bir Sky Flights to plan your paragliding flight in Bir Billing. Call, WhatsApp or send an enquiry." />

      {/* ── Head ── */}
      <section className="wrap head" aria-label="Page header">
        <div>
          <p className="section-label">Contact</p>
          <h1>Let's Plan<br /><em>Your Flight.</em></h1>
        </div>
        <p className="intro">Tell us your dates and group size and we will reply with the best flight options within 2 hours.</p>
      </section>

      {/* ── Split layout ── */}
      <section className="wrap sec-sm">
        <div className="split" style={{ gap: 'clamp(32px, 5vw, 80px)' }}>

          {/* Form */}
          <div>
            <div style={{ marginBottom: 28 }}>
              <p className="section-label">Send an Enquiry</p>
              <h2 style={{ fontSize: '1.8rem', marginBottom: 8 }}>Book via <em>WhatsApp</em></h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Fill in the form and it will open directly in WhatsApp — the fastest way to confirm your flight.</p>
            </div>
            <form onSubmit={send} className="form">
              <div className="two">
                <label>
                  Full name
                  <input required value={f.name} onChange={set('name')} autoComplete="name" placeholder="Your name" />
                </label>
                <label>
                  Phone / WhatsApp
                  <input required type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="+91 ..." />
                </label>
              </div>
              <label>
                Package interested in
                <select value={f.pkg} onChange={set('pkg')}>
                  <option value="">Select a package (optional)</option>
                  <option>Tandem Flight</option>
                  <option>Sunset Pair Flight</option>
                  <option>Fly + Camp</option>
                  <option>Fly + Stay</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <div className="two">
                <label>
                  Preferred date
                  <input type="date" value={f.date} onChange={set('date')} />
                </label>
                <label>
                  No. of people
                  <input type="number" min="1" max="20" value={f.people} onChange={set('people')} />
                </label>
              </div>
              <label>
                Message (optional)
                <textarea rows="4" value={f.msg} onChange={set('msg')} placeholder="Tell us anything else — e.g. weight range, special requests..." />
              </label>
              <button
                className="btn"
                type="submit"
                style={{
                  gap: 10,
                  background: '#25D366',
                  borderColor: '#20ba59',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  padding: '16px 28px',
                  width: '100%',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)'
                }}
              >
                <FaWhatsapp style={{ fontSize: 22 }} />
                {sent ? '✓ Opening WhatsApp…' : 'Send Enquiry on WhatsApp'}
                <FiSend />
              </button>
            </form>
          </div>

          {/* Contact info + map */}
          <div>
            <div style={{ marginBottom: 28 }}>
              <p className="section-label">Find Us In Bir</p>
              <h2 style={{ fontSize: '1.8rem', marginBottom: 8 }}>Get In <em>Touch</em></h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Drop by our clubhouse in Bir or message our pilot team anytime.</p>
            </div>
            <ul className="clist" style={{ marginBottom: 24 }}>
              {CONTACT_INFO.map(({ icon, label, value, href }) => (
                <li key={label}>
                  <div className="clist-icon">{icon}</div>
                  <div className="clist-text">
                    <span className="clist-label">{label}</span>
                    {href
                      ? <a href={href} className="clist-val" style={{ color: 'var(--ink)', fontWeight: 600 }}>{value}</a>
                      : <span className="clist-val">{value}</span>
                    }
                  </div>
                </li>
              ))}
            </ul>

            {/* WhatsApp direct button */}
            <a
              href={`https://wa.me/${SITE.phone}?text=${encodeURIComponent('Hi! I want to enquire about paragliding in Bir Billing.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '15px 24px',
                marginBottom: 24,
                background: '#25D366',
                borderColor: '#20ba59',
                color: '#ffffff',
                fontSize: '0.98rem',
                fontWeight: 700,
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)'
              }}
            >
              <FaWhatsapp style={{ fontSize: 22 }} /> Chat Directly on WhatsApp
            </a>

            <iframe
              className="map"
              title="Map of Bir Billing Paragliding"
              loading="lazy"
              src="https://www.google.com/maps?q=Bir+Billing+Paragliding+Himachal+Pradesh&output=embed"
            />
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="wrap sec" aria-labelledby="faq-title">
        <div className="packages-header">
          <div>
            <p className="section-label"><FiMessageCircle style={{ marginRight: 6 }} />FAQs</p>
            <h2 id="faq-title">Common <em>Questions</em></h2>
          </div>
        </div>
        <div className="grid2" style={{ marginTop: 0 }}>
          {FAQS.map(([q, a]) => (
            <div className="gcard" key={q}>
              <h3 style={{ fontSize: '1rem', marginBottom: 10 }}>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
