import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { FiImage } from 'react-icons/fi';
import { SITE } from '../config';

export function SEO({ title, desc, path = '' }) {
  const t = title ? `${title} | ${SITE.name}` : `${SITE.name} | Paragliding in Bir Billing`;
  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={SITE.url + path} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={SITE.url + path} />
      <meta property="og:image" content={SITE.url + '/images/hero.jpg'} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

// Shows a neutral placeholder if a photo has not been added yet, so the layout never breaks.
export function Img({ src, alt, className = '', style = {} }) {
  const [bad, setBad] = useState(false);
  if (bad) return (
    <div className={`ph-fallback ${className}`} role="img" aria-label={alt} style={style}>
      <FiImage />
    </div>
  );
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={style}
      onError={() => setBad(true)}
    />
  );
}

export function Head({ label, children, intro }) {
  return (
    <header className="wrap head">
      <div>
        <p className="section-label">{label}</p>
        <h1>{children}</h1>
      </div>
      {intro && <p className="intro">{intro}</p>}
    </header>
  );
}

export const Cta = ({ to, children }) => (
  <Link to={to} className="cta">{children}<FiArrowUpRight /></Link>
);
