"use client"

import { useEffect, useMemo, useState } from "react"
import { useFavorites } from "@/components/favorites/FavoritesProvider"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { PRODUCTS } from "@/lib/products"

export function ProfileScreen() {
  const { favorites, clearFavorites } = useFavorites()
  const [storage, setStorage] = useState<{ usage?: number; quota?: number }>({})

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nav = navigator as any
        if (!nav?.storage?.estimate) return
        const est = await nav.storage.estimate()
        if (!cancelled) setStorage({ usage: est.usage, quota: est.quota })
      } catch {
        // ignore
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const counts = useMemo(() => {
    return {
      fav: favorites.size,
      total: PRODUCTS.length,
    }
  }, [favorites.size])

  const usageText = useMemo(() => {
    if (!storage.usage || !storage.quota) return "—"
    const mb = (n: number) => Math.round((n / 1024 / 1024) * 10) / 10
    return `${mb(storage.usage)} / ${mb(storage.quota)} MB`
  }, [storage])

  return (
    <div className="space-y-4">
      <SectionHeader
        badge="我的 / Me"
        title="我的 / Profile"
        subtitle="偏好与离线状态（Mock）。未来可接入登录、云同步与评分。"
      />

      <div className="rounded-2xl border hairline bg-panel p-5 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">本地数据 / Local</div>
            <div className="mt-1 text-sm text-muted">
              收藏 <span className="text-white/80">{counts.fav}</span> / 总计{" "}
              <span className="text-white/80">{counts.total}</span>
            </div>
            <div className="mt-1 text-xs text-muted">存储占用（估算）：{usageText}</div>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/4 text-lg font-black">
            我
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="soft" onClick={() => location.reload()}>
            刷新 / Refresh
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (confirm("清空所有收藏？")) clearFavorites()
            }}
          >
            清空收藏 / Clear favorites
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border hairline bg-panel p-5 shadow-soft">
        <div className="text-sm font-semibold">提示 / Notes</div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>本项目为产品图鉴示例：数据与价格为 Mock。</li>
          <li>离线：首次访问后会缓存静态资源与已访问页面。</li>
          <li>中英文：界面默认双语标签，产品字段可扩展 i18n。</li>
        </ul>
      </div>
    </div>
  )
}

