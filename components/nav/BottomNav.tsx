"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cx } from "@/lib/utils"
import type { ReactNode } from "react"

type Tab = {
  href: string
  zh: string
  en: string
  icon: (active: boolean) => ReactNode
}

function IconHeart(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 21s-8-4.7-9.6-10.4C1.3 6.8 3.8 4 7 4c1.9 0 3.4.9 5 2.7C13.6 4.9 15.1 4 17 4c3.2 0 5.7 2.8 4.6 6.6C20 16.3 12 21 12 21Z"
        className={cx(
          "transition",
          active ? "fill-ember-500/85 stroke-ember-500" : "stroke-ink-500",
        )}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconGrid(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        className={cx(active ? "fill-ink-950" : "fill-ink-500/55")}
      />
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        className={cx(active ? "stroke-ember-500/55" : "stroke-black/10")}
        strokeWidth="1.5"
      />
    </svg>
  )
}

function IconChat(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M7.5 18.4 4 20V6.8C4 5.3 5.3 4 6.8 4h10.4C18.7 4 20 5.3 20 6.8v7.4c0 1.5-1.3 2.8-2.8 2.8H7.5Z"
        className={cx(active ? "fill-ember-500/10 stroke-ember-500/75" : "stroke-ink-500")}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 12.5h6"
        className={cx(active ? "stroke-ink-950" : "stroke-ink-500")}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconUser(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 12.2a4.2 4.2 0 1 0-4.2-4.2 4.2 4.2 0 0 0 4.2 4.2Z"
        className={cx(active ? "fill-black/5 stroke-ink-950" : "stroke-ink-500")}
        strokeWidth="1.5"
      />
      <path
        d="M4.5 20c1.6-4 13.4-4 15 0"
        className={cx(active ? "stroke-ember-500/75" : "stroke-ink-500")}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const tabs: Tab[] = [
  { href: "/favorites", zh: "收藏", en: "Favorites", icon: IconHeart },
  { href: "/brands", zh: "品牌", en: "Brands", icon: IconGrid },
  { href: "/community", zh: "社区", en: "Community", icon: IconChat },
  { href: "/profile", zh: "我的", en: "Profile", icon: IconUser },
]

function isActivePath(pathname: string, href: string) {
  if (href === "/brands") return pathname === "/brands" || pathname === "/" || pathname.startsWith("/product/")
  return pathname === href
}

export function BottomNav() {
  const pathname = usePathname() ?? "/brands"

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 safe-b">
      <div className="mx-auto w-full max-w-md px-4 pb-3">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/85 shadow-soft backdrop-blur-xl">
          <div className="relative grid grid-cols-4">
            {tabs.map((t) => {
              const active = isActivePath(pathname, t.href)
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={cx(
                    "group flex flex-col items-center justify-center gap-1 px-2 py-3 transition",
                    active ? "text-ink-950" : "text-ink-500 hover:text-ink-800",
                  )}
                >
                  <div
                    className={cx(
                      "grid place-items-center rounded-xl px-3 py-2 transition",
                      active ? "bg-ember-500/10 ring-1 ring-ember-500/20" : "group-hover:bg-black/5",
                    )}
                  >
                    {t.icon(active)}
                  </div>
                  <div className="leading-none">
                    <div className="text-[11px] font-semibold">{t.zh}</div>
                    <div className="mt-[2px] text-[9px] text-ink-500">{t.en}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
