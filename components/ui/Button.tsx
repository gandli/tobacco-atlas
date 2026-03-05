import { cx } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "soft"
  size?: "sm" | "md"
  children: ReactNode
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
  const sizes = size === "sm" ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm"
  const styles =
    variant === "primary"
      ? "bg-ember-500 text-white shadow-glow hover:bg-ember-500/90"
      : variant === "soft"
        ? "border border-black/10 bg-white text-ink-950 shadow-[0_1px_0_rgba(0,0,0,.04)] hover:bg-black/5"
        : "border border-transparent bg-transparent text-ink-950 hover:bg-black/5"

  return (
    <button className={cx(base, sizes, styles, className)} {...props}>
      {children}
    </button>
  )
}
