/* eslint-disable no-restricted-globals */

const CACHE_VERSION = "tobacco-atlas-v1"
const RUNTIME_CACHE = `runtime:${CACHE_VERSION}`
const CORE_CACHE = `core:${CACHE_VERSION}`

const CORE_ASSETS = [
  "/offline.html",
  "/manifest.json",
  "/icons/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys
          .filter((k) => k.startsWith("core:") || k.startsWith("runtime:"))
          .filter((k) => !k.endsWith(CACHE_VERSION))
          .map((k) => caches.delete(k)),
      )
      await self.clients.claim()
    })(),
  )
})

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

function isSameOrigin(url) {
  try {
    return new URL(url).origin === self.location.origin
  } catch {
    return false
  }
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE)
  try {
    const fresh = await fetch(request)
    if (fresh && fresh.ok) cache.put(request, fresh.clone())
    return fresh
  } catch {
    const cached = await cache.match(request)
    if (cached) return cached
    const offline = await caches.open(CORE_CACHE).then((c) => c.match("/offline.html"))
    return offline || new Response("Offline", { status: 503, statusText: "Offline" })
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE)
  const cached = await cache.match(request)
  const fetchPromise = fetch(request)
    .then((fresh) => {
      if (fresh && fresh.ok) cache.put(request, fresh.clone())
      return fresh
    })
    .catch(() => null)
  return cached || (await fetchPromise) || new Response("Offline", { status: 503 })
}

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return
  if (!isSameOrigin(request.url)) return

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request))
    return
  }

  const dest = request.destination
  if (dest === "style" || dest === "script" || dest === "worker" || dest === "font") {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  if (dest === "image") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE)
        const cached = await cache.match(request)
        if (cached) return cached
        try {
          const fresh = await fetch(request)
          if (fresh && fresh.ok) cache.put(request, fresh.clone())
          return fresh
        } catch {
          return new Response("", { status: 404 })
        }
      })(),
    )
  }
})

