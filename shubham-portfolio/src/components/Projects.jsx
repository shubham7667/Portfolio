import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SolarSystem from './SolarSystem'

const PROJECTS = [
  {
    id: 'docchat',
    label: 'DocChat RAG',
    radius: 3.4,
    size: 0.55,
    color: '#00e5ff',
    speed: 0.1,
    title: 'DocChat RAG System',
    description:
      'An end-to-end retrieval-augmented generation pipeline for PDF question answering — chunking, embedding, vector search and grounded generation working as one system.',
    stack: ['LangChain', 'FAISS', 'HuggingFace Embeddings', 'Gemini', 'Python'],
    github: 'https://github.com/shubham7667',
  },
  {
    id: 'wsd',
    label: 'WSD',
    radius: 4.6,
    size: 0.32,
    color: '#2563eb',
    speed: 0.14,
    title: 'Word Sense Disambiguation',
    description:
      'Implemented the Lesk algorithm with WordNet to resolve lexical ambiguity in text, comparing gloss overlap across candidate senses in context.',
    stack: ['Python', 'NLTK', 'WordNet', 'NLP'],
    github: 'https://github.com/shubham7667',
  },
  {
    id: 'sentiment',
    label: 'Sentiment',
    radius: 5.8,
    size: 0.3,
    color: '#00e5ff',
    speed: 0.17,
    title: 'Sentiment Analysis',
    description:
      'Built a sentiment classifier over text reviews using TF-IDF vectorization and Logistic Regression, reaching 88% accuracy on the held-out test set.',
    stack: ['Python', 'Scikit-learn', 'TF-IDF', 'Logistic Regression'],
    github: 'https://github.com/shubham7667',
  },
  {
    id: 'lulc',
    label: 'LULC',
    radius: 7,
    size: 0.34,
    color: '#2563eb',
    speed: 0.08,
    title: 'LULC Analysis',
    description:
      'Applied K-Means clustering to satellite imagery for unsupervised land-use / land-cover classification, distinguishing terrain classes by spectral signature.',
    stack: ['Python', 'K-Means', 'Scikit-learn', 'Remote Sensing'],
    github: 'https://github.com/shubham7667',
  },
]

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <p className="section-label">Mission Log</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">Project Orbit</h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm">
            Click a planet to open its mission file.
          </p>
        </div>

        <div className="relative h-[520px] sm:h-[620px] glass-panel overflow-hidden">
          <SolarSystem
            planets={PROJECTS}
            onSelect={setSelected}
            interactive
            allowControls
            sunSize={1.2}
            cameraPosition={[0, 7, 15]}
          />
        </div>

        {/* Fallback list for accessibility / no-JS-hover devices */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="glass-panel text-left p-5 hover:shadow-glow-sm transition-shadow duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-glow-sm"
                  style={{ background: p.color }}
                />
                <p className="font-display text-white group-hover:text-glow transition-colors">
                  {p.title}
                </p>
              </div>
              <p className="text-white/50 text-sm line-clamp-2">{p.description}</p>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-space/80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel-strong hud-border relative max-w-2xl w-full p-8 overflow-hidden"
      >
        <div className="scanline-overlay animate-scanline" />
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-glow hover:border-glow/50 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <p className="section-label mb-3">Mission File</p>
        <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">{project.title}</h3>
        <p className="text-white/70 leading-relaxed text-sm mb-6">{project.description}</p>

        <div className="mb-6">
          <p className="font-mono text-xs tracking-widest uppercase text-white/40 mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border border-glow/30 text-cyan-300 text-xs font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-mono text-xs tracking-widest uppercase text-white/40 mb-3">
            Architecture
          </p>
          <div className="border border-dashed border-white/15 rounded-xl h-32 flex items-center justify-center text-white/25 font-mono text-xs">
            [ architecture diagram placeholder ]
          </div>
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="btn-magnetic w-full sm:w-auto"
        >
          View on GitHub ↗
        </a>
      </motion.div>
    </motion.div>
  )
}
