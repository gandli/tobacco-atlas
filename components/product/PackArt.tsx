import { cx } from "@/lib/utils"
import type { ProductCategory } from "@/lib/types"

export function PackArt({
  category,
  label,
  accent = "#2f7a3d",
  className,
}: {
  category: ProductCategory
  label: string
  accent?: string
  className?: string
}) {
  const glyph = category === "cigarette" ? "烟" : category === "cigar" ? "茄" : "电"

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,.04)]",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            "radial-gradient(900px 260px at 22% 0%, rgba(47,122,61,.18), transparent 60%), radial-gradient(820px 260px at 88% 14%, rgba(0,0,0,.06), transparent 62%)",
        }}
      />
      <div
        className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-2xl"
        style={{ background: `${accent}22` }}
      />
      <div className="absolute right-0 top-0 h-full w-20 bg-[linear-gradient(90deg,transparent,rgba(0,0,0,.06))]" />

      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500">TOBACCO ATLAS</div>
            <div className="mt-1 line-clamp-1 text-sm font-semibold tracking-tight text-ink-950">{label}</div>
            <div className="mt-2 h-1.5 w-16 rounded-full bg-black/10">
              <div className="h-1.5 w-8 rounded-full" style={{ background: `${accent}cc` }} />
            </div>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white text-sm font-black text-ink-950">
            {glyph}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="h-14 rounded-xl border border-black/10 bg-white/70"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
