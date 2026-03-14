import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Chinese Cigarette Museum - 中国烟草博物馆",
    template: "%s | 中国烟草博物馆",
  },
  description: "探索中国烟草品牌和产品的综合数据库 | A comprehensive database of Chinese cigarette brands and products",
  keywords: ["中国烟草", "香烟", "品牌", "烟草", "Chinese cigarettes", "tobacco brands"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
