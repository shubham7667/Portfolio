# Shubham Kumar — Portfolio

A cinematic, HUD-inspired portfolio built with React, Vite, Tailwind CSS, Three.js
(via React Three Fiber) and Framer Motion.

## Stack
- **React 18 + Vite** — app shell and dev server
- **Tailwind CSS** — utility styling, custom theme (space/glow/blue-hud palette)
- **@react-three/fiber + drei** — the 3D solar system scenes (hero + projects)
- **Framer Motion** — scroll reveals, page transitions, magnetic buttons

## Getting started
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure
```
src/
  components/
    StarField.jsx     — fixed canvas starfield (twinkle + parallax)
    SolarSystem.jsx    — reusable R3F solar system (sun + orbiting planets)
    Navbar.jsx         — sticky glassmorphism nav with scroll-spy
    Hero.jsx           — landing section, holographic portrait frame
    About.jsx          — Iron-Man style bio scan + animated stat counters
    Skills.jsx         — animated neural-network skill graph (SVG)
    Projects.jsx       — clickable orbiting project planets + modal
    Timeline.jsx       — wormhole vertical timeline
    Contact.jsx        — terminal-style contact card + form
  hooks/
    useParallax.js     — mouse-position parallax hook
    useMagnetic.js      — magnetic hover-pull for buttons
```

## Contact form backend

The form in `Contact.jsx` posts to a small Express + Nodemailer API in `server/`,
which emails submissions to you. Run it alongside the frontend:

```bash
cd server
npm install
cp .env.example .env      # then fill in SMTP_USER, SMTP_PASS, TO_EMAIL
npm run dev                # starts on http://localhost:4000
```

In the project root, also copy `.env.example` to `.env` (it points the frontend
at the backend's URL — defaults to `http://localhost:4000`, no change needed for local dev).

**Gmail setup** (simplest option): enable 2-Step Verification on the sending
Gmail account, then generate an **App Password** (Google Account → Security →
App passwords) and use that as `SMTP_PASS` — your normal password won't work.
Any SMTP provider works the same way (Outlook, Zoho, SendGrid, Resend, etc.) —
just change `SMTP_HOST` / `SMTP_PORT` accordingly.

**Deploying the backend**: `server/` is a standalone Node app — deploy it to
Render, Railway, Fly.io, or a small VPS. Point the frontend's `VITE_API_URL`
(set as an env var in your frontend host, e.g. Vercel/Netlify) at the deployed
backend's URL, and set `ALLOWED_ORIGIN` in the backend's env to your frontend's
domain so CORS only allows your site.

Built-in protections: a hidden honeypot field to catch simple bots, and rate
limiting (5 submissions / 15 min per IP).

## Customizing

- **Portrait**: `Hero.jsx` renders `<PlaceholderPortrait />`, an SVG silhouette.
  Swap it for an `<img>` of your actual photo when ready.
- **Contact form**: `Contact.jsx`'s `handleSubmit` is stubbed with a timeout.
  Wire it to Formspree, EmailJS, or your own API route to actually send mail.
- **LinkedIn URL**: placeholder in `Contact.jsx` — update once you have the real link.
- **Colors / fonts**: edit `tailwind.config.js` (`space`, `glow`, `blue.hud`) and the
  Google Fonts `<link>` in `index.html` (Orbitron / Inter / JetBrains Mono).
- **Architecture diagrams**: `Projects.jsx` modal has a dashed placeholder box —
  drop in real diagrams per project when available.

## Performance notes
The 3D scenes use a capped device pixel ratio (`dpr={[1, 1.5]}`) and lightweight
geometry to stay smooth on mobile. If you add heavier 3D content later, consider
lazy-loading the `SolarSystem` component with `React.lazy`.
