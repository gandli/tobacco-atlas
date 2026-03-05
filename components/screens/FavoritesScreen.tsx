"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useFavorites } from "@/components/favorites/FavoritesProvider"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { PRODUCTS } from "@/lib/products"

export function FavoritesScreen() {
  const { favorites, hydrated } = useFavorites()

  const list = useMemo(() => {
    const ids = Array.from(favorites)
    return PRODUCTS.filter((p) => ids.includes(p.id))
  }, [favorites])

  return (
    <div className="space-y-4">
      <SectionHeader
        badge="收藏 / Saved"
        title="收藏 / Favorites"
        subtitle="你喜欢的都在这里，离线也能翻。"
      />

      {!hydrated ? (
        <div className="rounded-2xl border hairline bg-panel p-5 shadow-soft">
          <div className="text-sm font-semibold">加载中…</div>
          <p className="mt-1 text-sm text-muted">正在读取本地收藏。</p>
        </div>
      ) : list.length === 0 ? (
        <div className="rounded-2xl border hairline bg-panel p-5 shadow-soft">
          <div className="text-sm font-semibold">还没有收藏</div>
          <p className="mt-1 text-sm text-muted">去「品牌」里点心形按钮，把产品加入收藏。</p>
          <Link href="/brands" className="mt-4 inline-flex">
            <Button>去浏览 / Browse</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

