import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { HumidityCalculator } from "@/components/cigar-preservation/HumidityCalculator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpen, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "湿度计算器 | 雪茄保存指南 | Tobacco Atlas",
  description: "计算和监控雪茄存储的湿度和温度条件，获取专业建议",
};

export default function HumidityCalculatorPage() {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      
      <section className="relative pt-[var(--nav-height)] pb-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* 返回导航 */}
            <div className="mb-6">
              <Link href="/cigar-preservation">
                <Button variant="ghost" className="gap-2 -ml-2">
                  <ArrowLeft className="w-4 h-4" />
                  返回保存指南
                </Button>
              </Link>
            </div>

            {/* 页面标题 */}
            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                互动工具
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                湿度计算器
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                调整滑块查看您当前的存储条件是否理想，获取实时建议
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 计算器主体 */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <HumidityCalculator />
          </div>
        </div>
      </section>

      {/* 相关工具 */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-6">相关工具</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/cigar-preservation">
                <div className="p-6 rounded-lg border bg-card hover:bg-card/80 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">保存指南</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    学习雪茄保存的核心知识和最佳实践
                  </p>
                </div>
              </Link>
              <Link href="/cigar-preservation/troubleshooting">
                <div className="p-6 rounded-lg border bg-card hover:bg-card/80 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold">问题诊断</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    解决常见的雪茄保存问题和故障
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MobileNav />
    </main>
  );
}
