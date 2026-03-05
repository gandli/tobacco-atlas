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
        className={cx(active ? "fill-ember-500/85 stroke-ember-500" : "stroke-ink-500")}
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
  if (category === "cigarette") return "#2f7a3d"
  if (category === "cigar") return "#2f7a3d"
  return "#2f7a3d"
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(product.id)
  const accent = useMemo(() => accentByCategory(product.category), [product.category])

  return (
    <div
      className="animate-fade-up overflow-hidden rounded-2xl border hairline bg-panel shadow-soft"
      style={{ animationDelay: `${Math.min(index * 22, 260)}ms` }}
    >
      <div className="relative p-4">
        <div className="absolute left-6 top-6 z-10">
          <Badge tone="soft">{getCategoryLabel(product.category)}</Badge>
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={fav ? "取消收藏" : "加入收藏"}
          className={cx(
            "absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-2xl border bg-white/85 shadow-soft backdrop-blur transition hover:bg-white",
            fav ? "border-ember-500/30" : "border-black/10",
          )}
        >
          <FavoriteIcon active={fav} />
        </button>

        <PackArt category={product.category} label={product.nameZh} accent={accent} className="h-48" />
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight text-ink-950">{product.brand}</div>
            <div className="mt-0.5 text-xs text-muted">{product.series}</div>
          </div>
          <div className="shrink-0 text-sm font-semibold text-ink-700">¥ {product.priceCny}</div>
        </div>

        <div className="mt-2 line-clamp-1 text-sm text-ink-700">
          {product.nameZh}
          {product.nameEn ? <span className="text-muted"> · {product.nameEn}</span> : null}
        </div>

        <div className="mt-2 text-xs text-muted">{specLine(product)}</div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] text-ink-700">
                {t}
              </span>
            ))}
          </div>
          <Link href={`/product/${product.id}`} className="shrink-0">
            <Button variant="ghost" size="sm">
              详情 <span className="text-muted">Details</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
