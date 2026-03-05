import { cx } from "@/lib/utils"
import type { ProductCategory } from "@/lib/types"

export function PackArt({
  category,
  label,
  accent = "#e94560",
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
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(900px 220px at 20% 0%, rgba(233,69,96,.28), transparent 60%), radial-gradient(900px 240px at 80% 10%, rgba(91,124,255,.18), transparent 65%), radial-gradient(700px 220px at 50% 120%, rgba(0,255,209,.10), transparent 55%)",
        }}
      />
      <div
        className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-2xl"
        style={{ background: `${accent}33` }}
      />
      <div className="absolute right-0 top-0 h-full w-20 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.10))]" />

      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/55">TOBACCO ATLAS</div>
            <div className="mt-1 line-clamp-1 text-sm font-semibold tracking-tight">{label}</div>
            <div className="mt-2 h-1.5 w-16 rounded-full bg-white/8">
              <div className="h-1.5 w-8 rounded-full" style={{ background: `${accent}bb` }} />
            </div>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sm font-black">
            {glyph}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="h-14 rounded-xl border border-white/10 bg-white/4"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

