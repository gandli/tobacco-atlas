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
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition active:translate-y-px disabled:opacity-50 disabled:pointer-events-none"
  const sizes = size === "sm" ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm"
  const styles =
    variant === "primary"
      ? "bg-ember-500/90 text-white shadow-glow hover:bg-ember-500"
      : variant === "soft"
        ? "bg-white/6 text-white/90 hover:bg-white/10 border border-white/10"
        : "bg-transparent text-white/85 hover:bg-white/6 border border-white/10"

  return (
    <button className={cx(base, sizes, styles, className)} {...props}>
      {children}
    </button>
  )
}
