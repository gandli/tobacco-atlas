import { BottomNav } from "@/components/nav/BottomNav"
import { NetworkToast } from "@/components/pwa/NetworkToast"
import type { ReactNode } from "react"

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh safe-t">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-3">
          <div className="text-sm font-semibold tracking-tight text-ink-950">Tobacco Atlas</div>
          <div className="text-xs text-muted">中国烟草图鉴</div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-md px-4 pt-4 pb-24">{children}</div>
      <NetworkToast />
      <BottomNav />
    </div>
  )
}
