import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '0.0.0.0'
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || crypto.randomBytes(32).toString('hex')
const LEGACY_ADMIN_PASSWORD_HASH = 'd149f575651ad5cbf647353f662b263666d1218568287d311ac18dbf4f78c3d3'
const distDir = path.resolve(__dirname, '..', 'dist')

app.use((req, res, next) => {
  const url = req.originalUrl || req.url || ''
  if (!url.startsWith('/api')) return next()

  const origin = req.get('origin')
  if (origin) {
    res.set('Access-Control-Allow-Origin', origin)
    res.set('Vary', 'Origin')
  } else {
    res.set('Access-Control-Allow-Origin', '*')
  }

  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.set('Access-Control-Allow-Headers', req.get('access-control-request-headers') || 'Content-Type,Accept,Authorization')
  res.set('Access-Control-Max-Age', '86400')
  if (req.method === 'OPTIONS') return res.status(204).end()

  next()
})

app.use(express.json({ limit: '100kb' }))

const bookingSchema = new mongoose.Schema({
  kind: { type: String, required: true, trim: true, maxlength: 80 },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true })

const Booking = mongoose.model('Booking', bookingSchema)

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex')
}

function base64url(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url')
}

function signToken(payload) {
  const body = base64url({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 8 })
  const sig = crypto.createHmac('sha256', TOKEN_SECRET).update(body).digest('base64url')
  return `${body}.${sig}`
}

function verifyToken(token) {
  try {
    if (!token || !token.includes('.')) return false
    const [body, sig] = token.split('.')
    const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(body).digest('base64url')
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    return payload.exp > Date.now()
  } catch {
    return false
  }
}

function requireAdmin(req, res, next) {
  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!verifyToken(token)) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

function requireDb(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database is not connected. Check MONGODB_URI in .env.' })
  }
  next()
}

function publicRecord(record) {
  return {
    id: record._id,
    kind: record.kind,
    email: record.email,
    ts: record.createdAt,
    data: record.data,
  }
}

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.post('/api/admin/login', (req, res) => {
  const password = String(req.body?.password || '')
  const configuredPassword = process.env.ADMIN_PASSWORD
  const configuredHash = process.env.ADMIN_PASSWORD_HASH
  const ok = configuredPassword
    ? password === configuredPassword
    : sha256(password) === (configuredHash || LEGACY_ADMIN_PASSWORD_HASH)

  if (!ok) return res.status(401).json({ error: 'Incorrect password' })
  res.json({ token: signToken({ role: 'admin' }) })
})

app.post('/api/bookings', requireDb, async (req, res, next) => {
  try {
    const kind = String(req.body?.kind || '').trim()
    const data = req.body?.data
    if (!kind || !data || typeof data !== 'object') return res.status(400).json({ error: 'Invalid booking payload' })

    const booking = await Booking.create({ kind, data })
    res.status(201).json({ booking: publicRecord(booking) })
  } catch (err) {
    next(err)
  }
})

app.get('/api/admin/bookings', requireAdmin, requireDb, async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(500).lean()
    res.json({ bookings: bookings.map(publicRecord) })
  } catch (err) {
    next(err)
  }
})

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

app.use((err, req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Server error' })
})

async function start() {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
  } else {
    console.warn('MONGODB_URI is missing. API will start, but database routes will return 503.')
  }

  app.listen(PORT, HOST, () => {
    console.log(`API listening on http://${HOST}:${PORT}`)
  })
}

start().catch((err) => {
  console.error('Failed to start API:', err)
  process.exit(1)
})
