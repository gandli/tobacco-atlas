"use client"

import { useMemo, useState } from "react"
import { PRODUCTS } from "@/lib/products"
import type { Product, ProductCategory } from "@/lib/types"
import { cx } from "@/lib/utils"
import { ProductCard } from "@/components/product/ProductCard"
import { Chip } from "@/components/ui/Chip"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { PackArt } from "@/components/product/PackArt"

type CategoryFilter = ProductCategory | "all"

const categoryOptions: Array<{ key: CategoryFilter; zh: string; en: string }> = [
  { key: "all", zh: "全部", en: "All" },
  { key: "cigarette", zh: "卷烟", en: "Cigarettes" },
  { key: "cigar", zh: "雪茄", en: "Cigars" },
  { key: "ecig", zh: "电子烟", en: "E‑cigs" },
]

const priceOptions: Array<{ key: "any" | "low" | "mid" | "high"; label: string }> = [
  { key: "any", label: "价格 · 全部" },
  { key: "low", label: "≤ 20 元" },
  { key: "mid", label: "20–60 元" },
  { key: "high", label: "≥ 60 元" },
]

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function matchesQuery(p: Product, q: string) {
  if (!q) return true
  const hay = `${p.brand} ${p.series} ${p.nameZh} ${p.nameEn ?? ""} ${p.origin} ${p.tags.join(" ")}`
  return normalize(hay).includes(normalize(q))
}

function matchesPrice(p: Product, tier: "any" | "low" | "mid" | "high") {
  if (tier === "any") return true
  if (tier === "low") return p.priceCny <= 20
  if (tier === "mid") return p.priceCny > 20 && p.priceCny < 60
  return p.priceCny >= 60
}

export function BrandsScreen() {
  const [category, setCategory] = useState<CategoryFilter>("all")
  const [query, setQuery] = useState("")
  const [brand, setBrand] = useState<string | null>(null)
  const [price, setPrice] = useState<"any" | "low" | "mid" | "high">("any")

  const filtered = useMemo(() => {
    const list = PRODUCTS.filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => matchesQuery(p, query))
      .filter((p) => matchesPrice(p, price))
      .filter((p) => (brand ? p.brand === brand : true))

    return list.sort((a, b) => (a.brand === b.brand ? a.priceCny - b.priceCny : a.brand.localeCompare(b.brand, "zh-Hans")))
  }, [category, query, price, brand])

  const brandOptions = useMemo(() => {
    const list = PRODUCTS.filter((p) => (category === "all" ? true : p.category === category)).filter((p) =>
      matchesQuery(p, query),
    )
    const unique = Array.from(new Set(list.map((p) => p.brand)))
    unique.sort((a, b) => a.localeCompare(b, "zh-Hans"))
    return unique
  }, [category, query])

  const stats = useMemo(() => {
    const c = PRODUCTS.filter((p) => p.category === "cigarette").length
    const g = PRODUCTS.filter((p) => p.category === "cigar").length
    const e = PRODUCTS.filter((p) => p.category === "ecig").length
    return { c, g, e, total: PRODUCTS.length }
  }, [])

  const marquee = useMemo(() => PRODUCTS.slice(0, 12), [])

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border hairline bg-panel-strong p-5 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">图鉴 / Atlas</Badge>
              <Badge tone="soft">PWA</Badge>
              <Badge tone="soft">{stats.total} items</Badge>
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink-950">中国烟草图鉴</h1>
            <p className="mt-1 text-sm text-muted">Tobacco Atlas · 像画廊一样浏览：搜索、筛选、收藏。</p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              document.getElementById("catalog-filters")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
          >
            去浏览 / Browse
          </Button>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
            <div className="flex w-max animate-marquee motion-reduce:animate-none">
              <div className="flex gap-3 p-3">
                {marquee.map((p) => (
                  <div key={p.id} className="w-44 shrink-0">
                    <PackArt category={p.category} label={p.nameZh} className="h-24" />
                    <div className="mt-2 line-clamp-1 text-xs font-semibold text-ink-950">{p.brand}</div>
                    <div className="text-[11px] text-muted">¥ {p.priceCny}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 p-3" aria-hidden="true">
                {marquee.map((p) => (
                  <div key={`${p.id}-dup`} className="w-44 shrink-0">
                    <PackArt category={p.category} label={p.nameZh} className="h-24" />
                    <div className="mt-2 line-clamp-1 text-xs font-semibold text-ink-950">{p.brand}</div>
                    <div className="text-[11px] text-muted">¥ {p.priceCny}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-black/10 bg-white p-3">
            <div className="text-[10px] tracking-[0.22em] text-ink-500">CIGARETTES</div>
            <div className="mt-1 text-xl font-semibold text-ink-950">{stats.c}</div>
            <div className="mt-1 text-xs text-muted">卷烟</div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-3">
            <div className="text-[10px] tracking-[0.22em] text-ink-500">CIGARS</div>
            <div className="mt-1 text-xl font-semibold text-ink-950">{stats.g}</div>
            <div className="mt-1 text-xs text-muted">雪茄</div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-3">
            <div className="text-[10px] tracking-[0.22em] text-ink-500">E‑CIGS</div>
            <div className="mt-1 text-xl font-semibold text-ink-950">{stats.e}</div>
            <div className="mt-1 text-xs text-muted">电子烟</div>
          </div>
        </div>
      </section>

      <div id="catalog-filters" className="rounded-2xl border hairline bg-panel p-4 shadow-soft scroll-mt-4">
        <div className="relative">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-500">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M10.5 18a7.5 7.5 0 1 1 7.5-7.5A7.5 7.5 0 0 1 10.5 18Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M16.2 16.2 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索：中华 / 长城 / 悦刻…  Search brand, series, tags…"
            className="pl-12"
            inputMode="search"
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {categoryOptions.map((o) => (
            <Chip
              key={o.key}
              label={`${o.zh} · ${o.en}`}
              active={category === o.key}
              onClick={() => {
                setCategory(o.key)
                setBrand(null)
              }}
            />
          ))}
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {priceOptions.map((o) => (
            <Chip key={o.key} label={o.label} active={price === o.key} onClick={() => setPrice(o.key)} />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="text-xs text-muted">
            当前：
            <span className="text-ink-950"> {filtered.length}</span> 条结果
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setPrice("any")
              setBrand(null)
              setCategory("all")
            }}
            className="text-xs font-semibold text-ink-700 transition hover:text-ink-950"
          >
            清空筛选 / Reset
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Chip
          label={brand ? `品牌：${brand}` : "品牌 · All brands"}
          active={brand === null}
          onClick={() => setBrand(null)}
        />
        {brandOptions.slice(0, 18).map((b) => (
          <Chip key={b} label={b} active={brand === b} onClick={() => setBrand(b)} />
        ))}
        {brandOptions.length > 18 ? (
          <div className="grid place-items-center rounded-full border border-black/10 bg-white px-3 py-2 text-xs text-ink-700">
            +{brandOptions.length - 18}
          </div>
        ) : null}
      </div>

      <div className={cx("grid gap-3", filtered.length === 0 ? "opacity-90" : "")}>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border hairline bg-panel p-5 shadow-soft">
            <div className="text-sm font-semibold">没有匹配结果</div>
            <p className="mt-1 text-sm text-muted">试试更短的关键字，或切换分类与价格范围。</p>
          </div>
        ) : (
          filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
        )}
      </div>
    </div>
  )
}
