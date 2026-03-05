import { deflateSync } from "node:zlib"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const outDir = join(process.cwd(), "public", "icons")
mkdirSync(outDir, { recursive: true })

function hexToRgb(hex) {
  const h = hex.replace("#", "").trim()
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x))
}

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

function setPixel(buf, w, x, y, r, g, b, a = 255) {
  const i = (y * w + x) * 4
  buf[i + 0] = r
  buf[i + 1] = g
  buf[i + 2] = b
  buf[i + 3] = a
}

function drawRoundedRect(buf, w, h, x0, y0, x1, y1, radius, color, alpha = 255) {
  const { r, g, b } = color
  const rr = radius * radius
  for (let y = Math.max(0, Math.floor(y0)); y < Math.min(h, Math.ceil(y1)); y++) {
    for (let x = Math.max(0, Math.floor(x0)); x < Math.min(w, Math.ceil(x1)); x++) {
      const dx = x < x0 + radius ? x - (x0 + radius) : x > x1 - radius ? x - (x1 - radius) : 0
      const dy = y < y0 + radius ? y - (y0 + radius) : y > y1 - radius ? y - (y1 - radius) : 0
      if (dx === 0 || dy === 0 || dx * dx + dy * dy <= rr) setPixel(buf, w, x, y, r, g, b, alpha)
    }
  }
}

function drawCircle(buf, w, h, cx, cy, radius, color, alpha = 255) {
  const { r, g, b } = color
  const rr = radius * radius
  const x0 = Math.floor(cx - radius)
  const x1 = Math.ceil(cx + radius)
  const y0 = Math.floor(cy - radius)
  const y1 = Math.ceil(cy + radius)
  for (let y = Math.max(0, y0); y < Math.min(h, y1); y++) {
    for (let x = Math.max(0, x0); x < Math.min(w, x1); x++) {
      const dx = x - cx
      const dy = y - cy
      if (dx * dx + dy * dy <= rr) setPixel(buf, w, x, y, r, g, b, alpha)
    }
  }
}

function drawGradient(buf, w, h, bg, accent) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = x / (w - 1)
      const ny = y / (h - 1)

      const d1 = Math.hypot(nx - 0.22, ny - 0.05)
      const d2 = Math.hypot(nx - 0.86, ny - 0.14)
      const d3 = Math.hypot(nx - 0.4, ny - 1.05)

      const k1 = 1 - smoothstep(0.0, 0.85, d1)
      const k2 = 1 - smoothstep(0.0, 0.9, d2)
      const k3 = 1 - smoothstep(0.0, 0.8, d3)

      const r = Math.round(
        lerp(bg.r, accent.r, 0.24 * k1) + lerp(0, 90, 0.1 * k2) + lerp(0, 0, 0.1 * k3),
      )
      const g = Math.round(
        lerp(bg.g, accent.g, 0.18 * k1) + lerp(0, 130, 0.1 * k2) + lerp(0, 220, 0.07 * k3),
      )
      const b = Math.round(
        lerp(bg.b, accent.b, 0.22 * k1) + lerp(0, 255, 0.1 * k2) + lerp(0, 200, 0.07 * k3),
      )
      setPixel(buf, w, x, y, Math.min(255, r), Math.min(255, g), Math.min(255, b), 255)
    }
  }
}

// --- PNG encoding (RGBA, filter 0) ---
const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

function crc32(buf) {
  let crc = 0 ^ -1
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buf[i]) & 0xff]
  }
  return (crc ^ -1) >>> 0
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[i] = c >>> 0
  }
  return table
})()

function chunk(type, data) {
  const t = Buffer.from(type, "ascii")
  const d = Buffer.isBuffer(data) ? data : Buffer.from(data)
  const len = Buffer.alloc(4)
  len.writeUInt32BE(d.length, 0)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([t, d])), 0)
  return Buffer.concat([len, t, d, crc])
}

function encodePngRgba(w, h, rgba) {
  const rowLen = w * 4
  const raw = Buffer.alloc((rowLen + 1) * h)
  for (let y = 0; y < h; y++) {
    raw[(rowLen + 1) * y] = 0
    rgba.copy(raw, (rowLen + 1) * y + 1, rowLen * y, rowLen * (y + 1))
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const idat = deflateSync(raw, { level: 9 })

  return Buffer.concat([PNG_SIGNATURE, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))])
}

function buildIcon(size, { maskable = false } = {}) {
  const w = size
  const h = size
  const buf = Buffer.alloc(w * h * 4)

  const bg = hexToRgb("#ffffff")
  const accent = hexToRgb("#2f7a3d")
  drawGradient(buf, w, h, bg, accent)

  const pad = maskable ? Math.round(size * 0.16) : Math.round(size * 0.11)
  const cardR = Math.round(size * 0.16)
  drawRoundedRect(
    buf,
    w,
    h,
    pad,
    Math.round(size * 0.2),
    size - pad,
    size - pad,
    cardR,
    hexToRgb("#ffffff"),
    245,
  )

  drawCircle(buf, w, h, size - pad - Math.round(size * 0.09), pad + Math.round(size * 0.15), Math.round(size * 0.1), accent, 235)

  // subtle highlight stripe
  for (let y = 0; y < h; y++) {
    for (let x = Math.round(size * 0.62); x < size; x++) {
      const nx = (x - size * 0.62) / (size * 0.38)
      const a = Math.round(16 * (1 - nx))
      const i = (y * w + x) * 4
      buf[i + 0] = Math.min(255, buf[i + 0] + a)
      buf[i + 1] = Math.min(255, buf[i + 1] + a)
      buf[i + 2] = Math.min(255, buf[i + 2] + a)
    }
  }

  return encodePngRgba(w, h, buf)
}

function write(name, buffer) {
  writeFileSync(join(outDir, name), buffer)
  // eslint-disable-next-line no-console
  console.log(`wrote ${name}`)
}

write("icon-192.png", buildIcon(192))
write("icon-512.png", buildIcon(512))
write("maskable-512.png", buildIcon(512, { maskable: true }))
write("apple-touch-icon.png", buildIcon(180))
