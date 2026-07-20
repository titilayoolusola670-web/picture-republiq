import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config()

const filePath = 'selected-site-images/familypicture.jpeg'
const key = 'gallery/family/familypicture.jpeg'

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
const publicBase = R2_PUBLIC_URL.replace(/\/$/, '')

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
  const canonicalRequest = [method, url.pathname, '', canonicalHeaders, signedHeaders, payloadHash].join('\n')
  const credentialScope = `${date}/auto/s3/aws4_request`
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, sha256(canonicalRequest)].join('\n')
  const signature = hmac(signingKey(date), stringToSign, 'hex')
  const authorization = `AWS4-HMAC-SHA256 Credential=${R2_ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

  return { url, headers: { ...headers, authorization } }
}

async function objectExists(key) {
  const { url, headers } = signedRequest('HEAD', key)
  const res = await fetch(url, { method: 'HEAD', headers })
  return res.ok
}

const body = await fs.readFile(filePath)
const { url, headers } = signedRequest('PUT', key, body, 'image/jpeg')
const res = await fetch(url, { method: 'PUT', headers, body })

if (!res.ok) {
  throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`)
}

if (!await objectExists(key)) {
  throw new Error(`Upload verification failed for ${key}`)
}

console.log(`${path.basename(filePath)} -> ${publicBase}/${key}`)
