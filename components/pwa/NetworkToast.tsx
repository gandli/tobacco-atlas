"use client"

import { useEffect, useState } from "react"
import { cx } from "@/lib/utils"

export function NetworkToast() {
  const [online, setOnline] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const now = navigator.onLine
      setOnline(now)
      setVisible(true)
      window.setTimeout(() => setVisible(false), 1800)
    }
    update()
    window.addEventListener("online", update)
    window.addEventListener("offline", update)
    return () => {
      window.removeEventListener("online", update)
      window.removeEventListener("offline", update)
    }
  }, [])

  return (
    <div
      className={cx(
        "pointer-events-none fixed left-1/2 top-3 z-50 -translate-x-1/2 transition",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
      )}
      aria-live="polite"
    >
      <div
        className={cx(
          "rounded-full border px-3 py-2 text-xs font-semibold shadow-soft backdrop-blur-xl",
          online ? "border-black/10 bg-white/85 text-ink-700" : "border-ember-500/25 bg-ember-500/12 text-ink-950",
        )}
      >
        {online ? "已连接 / Online" : "离线模式 / Offline"}
      </div>
    </div>
  )
}
