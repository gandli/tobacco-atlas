import { cx } from "@/lib/utils"
import type { InputHTMLAttributes } from "react"

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      {...props}
      className={cx(
        "h-11 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-sm text-white/90 placeholder:text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] outline-none transition focus:border-ember-500/45 focus:bg-white/6",
        className,
      )}
    />
  )
}
