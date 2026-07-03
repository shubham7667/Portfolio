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
