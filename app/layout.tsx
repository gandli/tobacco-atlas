import type { Metadata, Viewport } from "next"
import "./globals.css"
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider"
import { PWARegister } from "@/components/pwa/PWARegister"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    default: "Tobacco Atlas · 中国烟草图鉴",
    template: "%s · Tobacco Atlas",
  },
  description: "中国卷烟、雪茄烟、电子烟图鉴。支持离线与安装 (PWA)。",
  applicationName: "Tobacco Atlas",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Tobacco Atlas",
  },
  formatDetection: { telephone: false },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hans" className="dark">
      <body className="noise">
        <FavoritesProvider>
          {children}
          <PWARegister />
        </FavoritesProvider>
      </body>
    </html>
  )
}
