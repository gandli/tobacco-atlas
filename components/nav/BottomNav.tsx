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
          active ? "fill-ember-500/85 stroke-ember-500" : "stroke-white/55",
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
        className={cx(active ? "fill-white/90" : "fill-white/40")}
      />
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        className={cx(active ? "stroke-ember-500/55" : "stroke-white/10")}
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
        className={cx(active ? "fill-white/12 stroke-ember-500/65" : "stroke-white/50")}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 12.5h6"
        className={cx(active ? "stroke-white/75" : "stroke-white/40")}
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
        className={cx(active ? "fill-white/10 stroke-white/75" : "stroke-white/50")}
        strokeWidth="1.5"
      />
      <path
        d="M4.5 20c1.6-4 13.4-4 15 0"
        className={cx(active ? "stroke-ember-500/65" : "stroke-white/35")}
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
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,15,35,.72)] shadow-soft backdrop-blur-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-20 bg-[radial-gradient(circle_at_50%_0%,rgba(233,69,96,.18),transparent_55%),radial-gradient(circle_at_20%_100%,rgba(91,124,255,.12),transparent_60%)]"
          />
          <div className="relative grid grid-cols-4">
            {tabs.map((t) => {
              const active = isActivePath(pathname, t.href)
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={cx(
                    "group flex flex-col items-center justify-center gap-1 px-2 py-3 transition",
                    active ? "text-white" : "text-white/70 hover:text-white/90",
                  )}
                >
                  <div
                    className={cx(
                      "grid place-items-center rounded-xl px-3 py-2 transition",
                      active ? "bg-ember-500/14 ring-1 ring-ember-500/25" : "group-hover:bg-white/5",
                    )}
                  >
                    {t.icon(active)}
                  </div>
                  <div className="leading-none">
                    <div className="text-[11px] font-semibold">{t.zh}</div>
                    <div className="mt-[2px] text-[9px] text-white/45">{t.en}</div>
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
