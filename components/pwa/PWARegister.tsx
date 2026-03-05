"use client"

import { useEffect } from "react"

export function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("serviceWorker" in navigator)) return

    const onLoad = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          if (reg.waiting) {
            reg.waiting.postMessage({ type: "SKIP_WAITING" })
          }
          reg.addEventListener("updatefound", () => {
            const sw = reg.installing
            if (!sw) return
            sw.addEventListener("statechange", () => {
              if (sw.state === "installed" && navigator.serviceWorker.controller) {
                reg.waiting?.postMessage({ type: "SKIP_WAITING" })
              }
            })
          })
        })
        .catch(() => {
          // ignore
        })
    }

    window.addEventListener("load", onLoad, { once: true })
    return () => window.removeEventListener("load", onLoad)
  }, [])

  return null
}

