import { motion } from 'framer-motion'
import { useMemo } from 'react'
import profileImg from '../../profile_img.png'
import SolarSystem from './SolarSystem'
import useParallax from '../hooks/useParallax'
import useMagnetic from '../hooks/useMagnetic'

const HERO_PLANETS = [
  { id: 'p1', label: 'About', radius: 3.2, size: 0.22, color: '#00e5ff', speed: 0.22 },
  { id: 'p2', label: 'Skills', radius: 4.4, size: 0.3, color: '#2563eb', speed: 0.16 },
  { id: 'p3', label: 'Projects', radius: 5.6, size: 0.26, color: '#00e5ff', speed: 0.12 },
  { id: 'p4', label: 'Contact', radius: 6.8, size: 0.18, color: '#2563eb', speed: 0.09 },
]

export default function Hero() {
  const parallax = useParallax(12)
  const magnetic = useMagnetic(0.4)

  const planets = useMemo(() => HERO_PLANETS, [])

  function scrollToUniverse() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Ambient 3D solar system backdrop, decorative only */}
      <div className="absolute inset-0 opacity-90">
        <SolarSystem
          planets={planets}
          interactive={false}
          sunSize={1.1}
          cameraPosition={[0, 4, 11]}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-space/40 via-transparent to-space pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <motion.div
          style={{
            transform: `translate(${parallax.x * -1}px, ${parallax.y * -1}px)`,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <p className="section-label mb-5">System Online // Portfolio v2.0</p>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white">
            Shubham
            <br />
            <span className="text-glow">Kumar</span>
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-white/80 font-light">AI / ML Engineer</p>
          <p className="mt-3 font-mono text-sm text-cyan-300/70 tracking-wide">
            M.Tech AIML @ BIT Mesra&nbsp;|&nbsp;NLP&nbsp;|&nbsp;GenAI&nbsp;|&nbsp;RAG
          </p>

          <motion.button
            ref={magnetic.ref}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            onClick={scrollToUniverse}
            whileTap={{ scale: 0.96 }}
            className="btn-magnetic mt-10 group"
          >
            Explore Universe
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.button>
        </motion.div>

        {/* Right: holographic portrait */}
        <motion.div
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          className="relative mx-auto flex items-center justify-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float">
            {/* glow behind */}
            <div className="absolute inset-0 rounded-full bg-glow/20 blur-3xl animate-pulseGlow" />

            {/* rotating HUD rings */}
            <svg
              className="absolute -inset-8 animate-spin-slow"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="96" stroke="#00e5ff" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 10" />
            </svg>
            <svg
              className="absolute -inset-4 animate-spin-reverse"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="90" stroke="#2563eb" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 6" />
              <circle cx="100" cy="4" r="3" fill="#00e5ff" />
            </svg>

            {/* portrait frame */}
            <div className="hud-border glass-panel-strong absolute inset-4 rounded-full overflow-hidden flex items-center justify-center">
              <PlaceholderPortrait />
              <div className="scanline-overlay animate-scanline" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-glow to-transparent" />
      </motion.div>
    </section>
  )
}

function PlaceholderPortrait() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <radialGradient id="portraitBg" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#0a1128" />
          <stop offset="100%" stopColor="#050816" />
        </radialGradient>
        <linearGradient id="portraitFig" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#00e5ff" />
        </linearGradient>
      </defs>

      <rect width="300" height="300" fill="url(#portraitBg)" />
      <image
        href={profileImg}
        x="0"
        y="0"
        width="300"
        height="300"
        preserveAspectRatio="xMidYMid slice"
      />
      <circle cx="150" cy="150" r="140" stroke="#00e5ff" strokeOpacity="0.15" fill="none" />
    </svg>
  )
}
