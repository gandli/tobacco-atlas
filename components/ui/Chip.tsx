"use client"

import { cx } from "@/lib/utils"

export function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold transition",
        active
          ? "border-ember-500/35 bg-ember-500/10 text-ink-950 shadow-[0_0_0_3px_rgba(47,122,61,.10)]"
          : "border-black/10 bg-white text-ink-700 hover:bg-black/5",
      )}
    >
      {label}
    </button>
  )
}
