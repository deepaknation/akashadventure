# Bir Sky Flights – React site

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs /dist
```

## 1. Plug in your booking system and 3D viewer
Open `src/config.js`.
- **iframe:** set `BOOKING_URL` and `VIEWER_URL`.
- **React component:** in `src/pages/Tools.jsx`, import your component and render it in place of `<Embed />`.
Nav items "3D Paraglider" and "Book a flight" already point to `/3d-paraglider` and `/booking`.

## 2. Add real photos (free for commercial use)
Drop JPGs into `public/images/` with these names (about 1600px wide, under 300 KB each):
`pack-tandem, pack-couple, pack-camp, pack-stay, about, g1 … g8`.
Missing files show a neutral placeholder, so nothing breaks while you collect them.
Edit the `alt` text in `config.js` to match each photo.

Sources (download only items marked free; check each licence):
- Unsplash: https://unsplash.com/s/photos/paragliding  (skip anything tagged **Unsplash+**, that is paid)
- Pexels: https://www.pexels.com/search/paragliding/
- Wikimedia Commons: https://commons.wikimedia.org/w/index.php?search=bir+billing+paragliding  (CC BY / CC BY-SA need a credit line; add it in the footer or gallery)

Your own photos of real flights (with guest consent) will convert better than any stock image.

## 3. Before launch
- Replace brand, phone, email, address and domain in `src/config.js`, `index.html`, `public/sitemap.xml`, `public/robots.txt`.
- Rewrite the About story with your real team and experience.
- Hosting: add an SPA fallback (all routes → `index.html`). For stronger SEO, pre-render routes (e.g. vite-plugin-ssg) or move to Next.js.
