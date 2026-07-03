import { useState } from 'react'
import { motion } from 'framer-motion'
import useMagnetic from '../hooks/useMagnetic'

const TERMINAL_LINES = [
  { key: 'email', label: 'email', value: 'rishab.ss64@gmail.com', href: 'mailto:rishab.ss64@gmail.com' },
  { key: 'github', label: 'github', value: 'github.com/shubham7667', href: 'https://github.com/shubham7667' },
  { key: 'linkedin', label: 'linkedin', value: 'linkedin.com/in/shubham-kumar', href: '#' },
  { key: 'location', label: 'location', value: 'Ranchi, Jharkhand, India', href: null },
]

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Contact() {
  const magnetic = useMagnetic(0.35)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to send message.')
      }
      setStatus('sent')
      setForm({ name: '', email: '', message: '', company: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label">Transmission</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 text-white">Establish Contact</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="glass-panel-strong hud-border overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.03]">
              <span className="w-3 h-3 rounded-full bg-red-400/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-[11px] text-white/40">
                shubham@portfolio: ~/contact
              </span>
            </div>
            <div className="p-6 font-mono text-sm space-y-4">
              <p className="text-emerald-300">
                $ cat contact_info.log
              </p>
              {TERMINAL_LINES.map((line, i) => (
                <motion.p
                  key={line.key}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i + 0.2 }}
                  className="text-white/70"
                >
                  <span className="text-cyan-300">{line.label}</span>
                  <span className="text-white/30">: </span>
                  {line.href ? (
                    <a
                      href={line.href}
                      target={line.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="text-glow hover:underline"
                    >
                      {line.value}
                    </a>
                  ) : (
                    <span>{line.value}</span>
                  )}
                </motion.p>
              ))}
              <p className="text-white/40 flex items-center gap-1">
                <span>$</span>
                <span className="w-2 h-4 bg-glow inline-block animate-pulse" />
              </p>
            </div>
          </motion.div>

          {/* Futuristic form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="glass-panel p-6 sm:p-8 flex flex-col gap-5"
          >
            <Field label="Name" name="name" value={form.name} onChange={handleChange} />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <div>
              <label className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-1.5 block">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 focus:border-glow/60 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors resize-none placeholder:text-white/25"
                placeholder="Transmit your message..."
              />
            </div>

            {/* Honeypot field — hidden from real users, catches simple bots */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <motion.button
              ref={magnetic.ref}
              onMouseMove={magnetic.onMouseMove}
              onMouseLeave={magnetic.onMouseLeave}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={status === 'sending'}
              className="btn-magnetic mt-2 disabled:opacity-50"
            >
              {status === 'idle' && 'Send Transmission'}
              {status === 'sending' && 'Transmitting…'}
              {status === 'sent' && 'Message Received ✓'}
              {status === 'error' && 'Retry Transmission'}
            </motion.button>

            {status === 'error' && (
              <p className="text-red-400 font-mono text-xs -mt-2">{errorMsg}</p>
            )}
            {status === 'sent' && (
              <p className="text-emerald-300 font-mono text-xs -mt-2">
                Thanks — your message has been delivered.
              </p>
            )}
          </motion.form>
        </div>

        <p className="text-center text-white/25 font-mono text-xs mt-20">
          © {new Date().getFullYear()} Shubham Kumar — Built for the next frontier.
        </p>
      </div>
    </section>
  )
}

function Field({ label, name, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-1.5 block">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="w-full bg-white/[0.03] border border-white/10 focus:border-glow/60 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25"
        placeholder={`Your ${label.toLowerCase()}`}
      />
    </div>
  )
}
