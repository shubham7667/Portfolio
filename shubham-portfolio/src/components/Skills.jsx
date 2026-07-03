import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const SKILLS = [
  { id: 'python', label: 'Python', x: 50, y: 8 },
  { id: 'ml', label: 'Machine Learning', x: 20, y: 24 },
  { id: 'dl', label: 'Deep Learning', x: 80, y: 24 },
  { id: 'nlp', label: 'NLP', x: 12, y: 50 },
  { id: 'pytorch', label: 'PyTorch', x: 62, y: 44 },
  { id: 'transformers', label: 'Transformers', x: 88, y: 50 },
  { id: 'langchain', label: 'LangChain', x: 30, y: 68 },
  { id: 'rag', label: 'RAG', x: 50, y: 82 },
  { id: 'faiss', label: 'FAISS', x: 70, y: 68 },
  { id: 'dsa', label: 'DSA', x: 8, y: 82 },
  { id: 'git', label: 'Git', x: 92, y: 82 },
]

const LINKS = [
  ['python', 'ml'],
  ['python', 'dl'],
  ['python', 'dsa'],
  ['python', 'git'],
  ['ml', 'nlp'],
  ['ml', 'dl'],
  ['dl', 'pytorch'],
  ['dl', 'transformers'],
  ['pytorch', 'transformers'],
  ['nlp', 'langchain'],
  ['transformers', 'langchain'],
  ['langchain', 'rag'],
  ['langchain', 'faiss'],
  ['rag', 'faiss'],
  ['rag', 'nlp'],
  ['faiss', 'transformers'],
]

export default function Skills() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const nodeMap = Object.fromEntries(SKILLS.map((s) => [s.id, s]))

  function isConnected(id) {
    if (!active) return false
    return LINKS.some(
      ([a, b]) => (a === active && b === id) || (b === active && a === id)
    )
  }

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label">Neural Map</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">Skill Network</h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm">
            Hover a node to trace how each capability connects to the rest of the stack.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-panel relative w-full aspect-[16/11] sm:aspect-[16/9] overflow-hidden"
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            {LINKS.map(([a, b], i) => {
              const na = nodeMap[a]
              const nb = nodeMap[b]
              const highlighted = active === a || active === b
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="url(#linkGrad)"
                  strokeWidth={highlighted ? 0.5 : 0.2}
                  strokeOpacity={active ? (highlighted ? 0.95 : 0.08) : 0.35}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.03 }}
                  style={{ transition: 'stroke-opacity 300ms ease, stroke-width 300ms ease' }}
                />
              )
            })}
          </svg>

          {SKILLS.map((skill, i) => {
            const dimmed = active && active !== skill.id && !isConnected(skill.id)
            return (
              <motion.button
                key={skill.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                onMouseEnter={() => setActive(skill.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(skill.id)}
                onBlur={() => setActive(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
              >
                <span
                  className={`block w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-glow transition-all duration-300 ${
                    active === skill.id
                      ? 'scale-[2.2] shadow-glow'
                      : dimmed
                      ? 'opacity-20'
                      : 'shadow-glow-sm animate-pulseGlow'
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap font-mono text-[9px] sm:text-[10px] tracking-wider uppercase transition-all duration-300 ${
                    active === skill.id ? 'text-glow' : dimmed ? 'text-white/15' : 'text-white/60'
                  }`}
                >
                  {skill.label}
                </span>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
