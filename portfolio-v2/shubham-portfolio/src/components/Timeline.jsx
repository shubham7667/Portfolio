import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MILESTONES = [
  { year: '2021', title: 'B.Tech Started', desc: 'Began undergraduate journey into engineering.' },
  { year: '2025', title: 'GATE Qualified', desc: 'Cleared GATE, opening the path to M.Tech admission.' },
  { year: '2025', title: 'M.Tech AIML @ BIT Mesra', desc: 'Started specialized postgraduate study in AI/ML.' },
  { year: 'Future', title: 'AI Engineer / Researcher', desc: 'Building intelligent systems at the frontier.' },
]

export default function Timeline() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="timeline" ref={ref} className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label">Trajectory</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">Timeline</h2>
        </div>

        <div className="relative pl-10 sm:pl-14">
          {/* wormhole spine */}
          <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px overflow-hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-glow via-blue-hud to-transparent"
            />
            <div className="absolute inset-0 blur-[6px] bg-gradient-to-b from-glow/60 via-blue-hud/40 to-transparent" />
          </div>

          <div className="space-y-16">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative"
              >
                <span
                  className="absolute -left-10 sm:-left-14 top-1 w-6 h-6 rounded-full border-2 border-glow bg-space flex items-center justify-center shadow-glow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-glow animate-pulse" />
                </span>

                <div className="glass-panel p-6 hover:shadow-glow-sm transition-shadow duration-300">
                  <p className="font-mono text-xs tracking-widest uppercase text-cyan-300/70">
                    {m.year}
                  </p>
                  <h3 className="font-display text-xl text-white mt-1">{m.title}</h3>
                  <p className="text-white/50 text-sm mt-2">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
