"use client"

import Link from "next/link"
import type { Product } from "@/lib/types"
import { getCategoryLabel } from "@/lib/products"
import { PackArt } from "@/components/product/PackArt"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { useFavorites } from "@/components/favorites/FavoritesProvider"

export function ProductDetailScreen({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(product.id)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Link href="/brands" className="inline-flex">
          <Button variant="ghost" size="sm">
            返回 / Back
          </Button>
        </Link>
        <Button variant={fav ? "primary" : "soft"} size="sm" onClick={() => toggleFavorite(product.id)}>
          {fav ? "已收藏 / Saved" : "收藏 / Save"}
        </Button>
      </div>

      <div className="rounded-2xl border hairline bg-panel-strong p-5 shadow-soft">
        <SectionHeader
          badge={getCategoryLabel(product.category)}
          title={product.brand}
          subtitle={`${product.series} · ${product.origin}`}
        />
        <div className="mt-3">
          <div className="text-lg font-semibold tracking-tight">{product.nameZh}</div>
          {product.nameEn ? <div className="mt-1 text-sm text-muted">{product.nameEn}</div> : null}
        </div>

        <div className="mt-4">
          <PackArt category={product.category} label={product.nameZh} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="accent">¥ {product.priceCny}</Badge>
          {product.tags.slice(0, 6).map((t) => (
            <Badge key={t} tone="soft">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border hairline bg-panel p-5 shadow-soft">
        <div className="text-sm font-semibold">参数 / Specs</div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <Spec k="分类" v={getCategoryLabel(product.category)} />
          <Spec k="产地" v={product.origin} />
          <Spec k="价格" v={`${product.priceCny} 元`} />
          <Spec k="品牌" v={product.brand} />

          {product.category === "cigarette" ? (
            <>
              <Spec k="类型" v={product.kind} />
              <Spec k="包装" v={product.pack} />
              <Spec k="焦油" v={`${product.tarMg} mg`} />
              <Spec k="烟碱" v={`${product.nicotineMg} mg`} />
            </>
          ) : null}

          {product.category === "cigar" ? (
            <>
              <Spec k="尺寸" v={product.size} />
              <Spec k="浓度" v={product.strength} />
              <Spec k="茄衣" v={product.wrapper} />
              <Spec k="茄套" v={product.binder} />
              <Spec k="茄芯" v={product.filler} />
            </>
          ) : null}

          {product.category === "ecig" ? (
            <>
              <Spec k="设备类型" v={product.deviceType} />
              <Spec k="电池" v={`${product.batteryMah} mAh`} />
              <Spec k="烟液" v={`${product.liquidMl} ml`} />
              <Spec k="尼古丁" v={`${product.nicotinePercent}%`} />
            </>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border hairline bg-panel p-5 shadow-soft">
        <div className="text-sm font-semibold">口感 / Notes</div>
        <p className="mt-2 text-sm text-white/80">{product.notes}</p>

        {product.category === "ecig" ? (
          <>
            <div className="mt-4 text-sm font-semibold">口味 / Flavors</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.flavors.map((f) => (
                <Badge key={f} tone="soft">
                  {f}
                </Badge>
              ))}
            </div>

            <div className="mt-4 text-sm font-semibold">特色 / Features</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.features.map((f) => (
                <Badge key={f} tone="soft">
                  {f}
                </Badge>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-3">
      <div className="text-[11px] uppercase tracking-[0.16em] text-white/45">{k}</div>
      <div className="mt-1 font-semibold text-white/90">{v}</div>
    </div>
  )
}

