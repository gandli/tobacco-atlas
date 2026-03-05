import { cx } from "@/lib/utils"
import type { ReactNode } from "react"

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode
  tone?: "neutral" | "accent" | "soft"
  className?: string
}) {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide"
  const styles =
    tone === "accent"
      ? "border-ember-500/25 bg-ember-500/10 text-ink-950"
      : tone === "soft"
        ? "border-black/10 bg-black/5 text-ink-700"
        : "border-black/10 bg-white text-ink-700"

  return <span className={cx(base, styles, className)}>{children}</span>
}
