import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
      const scrollPos = window.scrollY + window.innerHeight * 0.35
      for (const link of LINKS) {
        const el = document.getElementById(link.id)
        if (el && el.offsetTop <= scrollPos) {
          setActive(link.id)
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`glass-panel flex items-center justify-between px-6 py-3 transition-shadow duration-500 ${
            scrolled ? 'shadow-glow-sm' : ''
          }`}
        >
          <button
            onClick={() => scrollTo('home')}
            className="font-display text-sm sm:text-base tracking-[0.2em] text-white hover:text-glow transition-colors"
          >
            SK<span className="text-glow">.</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  active === link.id ? 'text-glow' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-4 right-4 -bottom-0.5 h-px bg-glow shadow-glow-sm"
                  />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-6 justify-center items-end"
            aria-label="Toggle menu"
          >
            <span className={`h-px bg-glow transition-all ${open ? 'w-6 rotate-45 translate-y-[3px]' : 'w-6'}`} />
            <span className={`h-px bg-glow transition-all ${open ? 'opacity-0' : 'w-4'}`} />
            <span className={`h-px bg-glow transition-all ${open ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-6'}`} />
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 glass-panel flex flex-col p-2 overflow-hidden"
          >
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left px-4 py-3 font-mono text-xs tracking-[0.2em] uppercase rounded-lg transition-colors ${
                  active === link.id ? 'text-glow bg-white/5' : 'text-white/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
