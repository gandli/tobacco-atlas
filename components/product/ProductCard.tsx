"use client"

import Link from "next/link"
import { useMemo } from "react"
import type { Product } from "@/lib/types"
import { getCategoryLabel } from "@/lib/products"
import { cx } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { PackArt } from "@/components/product/PackArt"
import { useFavorites } from "@/components/favorites/FavoritesProvider"

function FavoriteIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M12 21s-8-4.7-9.6-10.4C1.3 6.8 3.8 4 7 4c1.9 0 3.4.9 5 2.7C13.6 4.9 15.1 4 17 4c3.2 0 5.7 2.8 4.6 6.6C20 16.3 12 21 12 21Z"
        className={cx(active ? "fill-ember-500/85 stroke-ember-500" : "stroke-white/55")}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function specLine(p: Product) {
  if (p.category === "cigarette") return `焦油 ${p.tarMg}mg · 烟碱 ${p.nicotineMg}mg · ${p.kind}`
  if (p.category === "cigar") return `${p.size} · ${p.strength}浓度 · ${p.wrapper}`
  return `${p.deviceType} · ${p.batteryMah}mAh · ${p.nicotinePercent}%`
}

function accentByCategory(category: Product["category"]) {
  if (category === "cigarette") return "#e94560"
  if (category === "cigar") return "#ffcc66"
  return "#4dd6ff"
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(product.id)
  const accent = useMemo(() => accentByCategory(product.category), [product.category])

  return (
    <div
      className="animate-fade-up rounded-2xl border hairline bg-panel shadow-soft"
      style={{ animationDelay: `${Math.min(index * 22, 260)}ms` }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="soft">{getCategoryLabel(product.category)}</Badge>
              <Badge tone="accent">¥ {product.priceCny}</Badge>
            </div>
            <div className="mt-2 text-lg font-semibold tracking-tight">
              <span className="text-white/95">{product.brand}</span>
              <span className="text-white/55"> · {product.series}</span>
            </div>
            <div className="mt-1 line-clamp-1 text-sm text-muted">
              {product.nameZh}
              {product.nameEn ? <span className="text-white/45"> · {product.nameEn}</span> : null}
            </div>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(product.id)}
            aria-label={fav ? "取消收藏" : "加入收藏"}
            className={cx(
              "grid h-10 w-10 place-items-center rounded-2xl border transition",
              fav
                ? "border-ember-500/40 bg-ember-500/12 shadow-[0_0_0_1px_rgba(233,69,96,.12)]"
                : "border-white/10 bg-white/5 hover:bg-white/8",
            )}
          >
            <FavoriteIcon active={fav} />
          </button>
        </div>

        <div className="mt-3">
          <PackArt category={product.category} label={product.nameZh} accent={accent} />
        </div>

        <div className="mt-3 text-xs text-white/65">{specLine(product)}</div>
        <div className="mt-2 line-clamp-2 text-sm text-white/80">{product.notes}</div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/4 px-2 py-1 text-[11px] text-white/75">
                {t}
              </span>
            ))}
          </div>
          <Link href={`/product/${product.id}`} className="shrink-0">
            <Button variant="ghost" size="sm">
              详情 <span className="text-white/45">Details</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

