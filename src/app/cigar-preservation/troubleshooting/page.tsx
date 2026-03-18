import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { TroubleshootingGuide } from "@/components/cigar-preservation/TroubleshootingGuide";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calculator, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "问题诊断 | 雪茄保存指南 | Tobacco Atlas",
  description: "解决雪茄保存中的常见问题，包括湿度、温度、霉变和烟草甲虫防治",
};

export default function TroubleshootingPage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-medium">
                故障排除
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                问题诊断指南
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                识别和解决雪茄保存中的常见问题，包括湿度异常、霉变、烟草甲虫等
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 诊断指南主体 */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <TroubleshootingGuide />
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
              <Link href="/cigar-preservation/tools/humidity-calculator">
                <div className="p-6 rounded-lg border bg-card hover:bg-card/80 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">湿度计算器</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    计算和监控您的存储条件是否理想
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 紧急提示 */}
      <section className="py-8 bg-red-50 dark:bg-red-950/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <div className="p-2 bg-red-600 rounded-full flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                  紧急情况
                </h3>
                <p className="text-sm text-red-800 dark:text-red-200">
                  如果发现严重霉变或烟草甲虫侵害，请立即隔离受影响的雪茄，并采取紧急措施。
                  不要犹豫丢弃严重受损的雪茄以保护其他藏品。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobileNav />
    </main>
  );
}
