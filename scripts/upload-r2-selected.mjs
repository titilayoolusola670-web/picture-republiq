import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config()

const uploads = [
  ['public/assets/gallery/family/family-020.jpg', 'site-images/services/family/family-020.jpg'],
  ['public/assets/gallery/weddings/weddings-108.jpg', 'site-images/services/weddings/weddings-108.jpg'],
  ['public/assets/gallery/events/events-011.jpg', 'site-images/services/events/events-011.jpg'],
  ['public/assets/gallery/events/events-009.jpg', 'site-images/services/events/events-009.jpg'],
  ['public/assets/gallery/portraits/portraits-047.jpg', 'site-images/services/portraits/portraits-047.jpg'],
  ['public/assets/gallery/weddings/weddings-099.jpg', 'site-images/home/services/weddings/weddings-099.jpg'],
  ['public/assets/gallery/portraits/portraits-007.jpg', 'site-images/home/services/portraits/portraits-007.jpg'],
  ['public/assets/gallery/family/family-032.jpg', 'site-images/home/services/family/family-032.jpg'],
  ['public/assets/gallery/events/events-010.jpg', 'site-images/home/services/events/events-010.jpg'],
  ['public/assets/gallery/weddings/weddings-013.jpg', 'site-images/home/wedding-feature/weddings-013.jpg'],
  ['public/assets/gallery/weddings/weddings-052.jpg', 'site-images/home/hero/weddings-052.jpg'],
  ['public/assets/gallery/weddings/weddings-108.jpg', 'site-images/home/hero/weddings-108.jpg'],
  ['public/assets/gallery/family/family-018.jpg', 'site-images/home/hero/family-018.jpg'],
  ['public/assets/gallery/weddings/weddings-027.jpg', 'site-images/home/hero/weddings-027.jpg'],
]

const {
  R2_ACCOUNT_ID,
  R2_BUCKET_NAME,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_PUBLIC_URL,
} = process.env

for (const [name, value] of Object.entries({ R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_URL })) {
  if (!value) throw new Error(`${name} is missing from .env`)
}

const endpoint = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`

function hmac(key, value, encoding) {
  return crypto.createHmac('sha256', key).update(value).digest(encoding)
}

function sha256(value, encoding = 'hex') {
  return crypto.createHash('sha256').update(value).digest(encoding)
}

function signingKey(date) {
  const kDate = hmac(`AWS4${R2_SECRET_ACCESS_KEY}`, date)
  const kRegion = hmac(kDate, 'auto')
  const kService = hmac(kRegion, 's3')
  return hmac(kService, 'aws4_request')
}

function signedRequest(method, key, body = null, type = null) {
  const now = new Date()
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const date = amzDate.slice(0, 8)
  const encodedKey = key.split('/').map(encodeURIComponent).join('/')
  const url = new URL(`/${R2_BUCKET_NAME}/${encodedKey}`, endpoint)
  const payloadHash = body ? sha256(body) : 'UNSIGNED-PAYLOAD'
  const headers = {
    host: url.host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  }
  if (type) headers['content-type'] = type
  const signedHeaders = Object.keys(headers).sort().join(';')
  const canonicalHeaders = Object.keys(headers).sort().map((name) => `${name}:${headers[name]}\n`).join('')
  const canonicalRequest = [
    method,
    url.pathname,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n')
  const credentialScope = `${date}/auto/s3/aws4_request`
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256(canonicalRequest),
  ].join('\n')
  const signature = hmac(signingKey(date), stringToSign, 'hex')
  const authorization = `AWS4-HMAC-SHA256 Credential=${R2_ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`
  return { url, headers: { ...headers, authorization } }
}

function contentType(file) {
  const ext = path.extname(file).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.heic') return 'image/heic'
  return 'application/octet-stream'
}

async function putObject(filePath, key) {
  const body = await fs.readFile(filePath)
  const { url, headers } = signedRequest('PUT', key, body, contentType(filePath))

  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`)
  return `${R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`
}

async function objectExists(key) {
  const { url, headers } = signedRequest('HEAD', key)
  const res = await fetch(url, { method: 'HEAD', headers })
  return res.ok
}

const missing = []
for (const [file] of uploads) {
  try {
    await fs.access(file)
  } catch {
    missing.push(file)
  }
}

if (missing.length) {
  console.error('Missing selected image files:')
  missing.forEach((file) => console.error(`- ${file}`))
  process.exit(1)
}

const results = []
for (const [file, key] of uploads) {
  const url = await putObject(file, key)
  const exists = await objectExists(key)
  if (!exists) throw new Error(`Upload verification failed for ${key}`)
  results.push([key, url])
  console.log(`${file} -> ${url}`)
}

await fs.writeFile('r2-selected-urls.json', `${JSON.stringify(Object.fromEntries(results), null, 2)}\n`)
