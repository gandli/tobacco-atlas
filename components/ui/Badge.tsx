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
      ? "border-ember-500/35 bg-ember-500/15 text-white/90"
      : tone === "soft"
        ? "border-white/10 bg-white/5 text-white/80"
        : "border-white/10 bg-white/4 text-white/85"

  return <span className={cx(base, styles, className)}>{children}</span>
}
