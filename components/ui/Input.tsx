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
        "h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-ink-950 placeholder:text-ink-500 shadow-[inset_0_1px_0_rgba(0,0,0,.02)] outline-none transition focus:border-ember-500/55 focus:shadow-[0_0_0_3px_rgba(47,122,61,.12)]",
        className,
      )}
    />
  )
}
