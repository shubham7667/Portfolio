import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'

const {
  PORT = 4000,
  SMTP_HOST,
  SMTP_PORT = 587,
  SMTP_USER,
  SMTP_PASS,
  TO_EMAIL,
  ALLOWED_ORIGIN = '*',
} = process.env

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
  console.warn(
    '[server] Missing SMTP_HOST / SMTP_USER / SMTP_PASS / TO_EMAIL in .env — ' +
      'the /api/contact route will fail until these are set. See server/.env.example.'
  )
}

const app = express()
app.set('trust proxy', 1)
app.use(express.json({ limit: '20kb' }))
app.use(cors({ origin: ALLOWED_ORIGIN }))

// Basic abuse protection: 5 submissions per 15 minutes per IP.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages sent. Please try again later.' },
})

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465, // true for 465, false for 587/others (STARTTLS)
  auth: { user: SMTP_USER, pass: SMTP_PASS },
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message, company } = req.body ?? {}

    // Honeypot: real users never fill this hidden field, bots often do.
    if (company) {
      return res.status(200).json({ ok: true })
    }

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Name, email and message are required.' })
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' })
    }
    if (String(message).length > 5000) {
      return res.status(400).json({ ok: false, error: 'Message is too long.' })
    }

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(String(message)).replace(/\n/g, '<br />')}</p>
        </div>
      `,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('[server] Failed to send contact email:', err)
    res.status(500).json({ ok: false, error: 'Something went wrong. Please try again later.' })
  }
})

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

app.listen(PORT, () => {
  console.log(`[server] Contact API listening on http://localhost:${PORT}`)
})
