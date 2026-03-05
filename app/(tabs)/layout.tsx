import { BottomNav } from "@/components/nav/BottomNav"
import { NetworkToast } from "@/components/pwa/NetworkToast"
import type { ReactNode } from "react"

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh safe-t">
      <div className="mx-auto w-full max-w-md px-4 pt-4 pb-24">{children}</div>
      <NetworkToast />
      <BottomNav />
    </div>
  )
}
