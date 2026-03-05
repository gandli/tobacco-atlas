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
          ? "border-ember-500/50 bg-ember-500/18 text-white shadow-[0_0_0_1px_rgba(233,69,96,.15)]"
          : "border-white/10 bg-white/4 text-white/75 hover:bg-white/7",
      )}
    >
      {label}
    </button>
  )
}

