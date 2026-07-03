import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 150, suffix: '+', label: 'DSA Problems Solved' },
  { value: 4, suffix: '', label: 'Major Projects' },
  { value: null, display: 'GATE', label: 'Qualified 2025' },
  { value: null, display: 'AI/ML', label: 'Research Enthusiast' },
]

function useCountUp(target, duration = 1.4, start) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start || target == null) return
    let raf
    const t0 = performance.now()
    function tick(now) {
      const progress = Math.min((now - t0) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}

function StatCard({ stat, index, inView }) {
  const count = useCountUp(stat.value, 1.5, inView)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 * index }}
      className="glass-panel px-6 py-8 text-center hover:shadow-glow-sm transition-shadow duration-300"
    >
      <p className="font-display text-3xl sm:text-4xl text-glow">
        {stat.value != null ? `${count}${stat.suffix}` : stat.display}
      </p>
      <p className="mt-2 font-mono text-xs tracking-wider uppercase text-white/50">
        {stat.label}
      </p>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const scanFields = [
    { label: 'Name', value: 'Shubham Kumar' },
    { label: 'Role', value: 'AI / ML Engineer' },
    { label: 'Institute', value: 'BIT Mesra' },
    { label: 'CGPA', value: '8.1 / 10' },
    { label: 'Status', value: 'Open for Internships', accent: true },
  ]

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Identity Scan</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">About the Pilot</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Iron-Man style scan panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="glass-panel-strong hud-border relative p-8 overflow-hidden"
          >
            <div className="scanline-overlay animate-scanline" />
            <div className="flex items-center justify-between mb-8">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-glow">
                Bio-Scan // Active
              </p>
              <span className="flex items-center gap-2 font-mono text-[10px] text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-glow-sm animate-pulse" />
                ONLINE
              </span>
            </div>

            <dl className="space-y-5">
              {scanFields.map((field, i) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <dt className="font-mono text-xs tracking-widest uppercase text-white/40">
                    {field.label}
                  </dt>
                  <dd
                    className={`font-display text-lg ${
                      field.accent ? 'text-emerald-300' : 'text-white'
                    }`}
                  >
                    {field.value}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <p className="mt-8 text-white/60 leading-relaxed text-sm">
              An AI/ML engineer in training, building end-to-end intelligent systems from
              transformer-based NLP pipelines to retrieval-augmented generation. Blends
              evolutionary computing research with production-grade deep learning practice.
            </p>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-5 content-center">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
