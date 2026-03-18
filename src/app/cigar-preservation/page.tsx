import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { PreservationGuide } from "@/components/cigar-preservation/PreservationGuide";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calculator, AlertTriangle, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "雪茄保存指南 | Tobacco Atlas",
  description: "专业的雪茄保存和保养指南，学习如何正确存储雪茄，保持最佳风味",
};

export default function CigarPreservationPage() {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-[var(--nav-height)] pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              专业指南
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              雪茄保存指南
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              学习正确的雪茄存储和保养方法，保持最佳湿度和温度，让您的雪茄在完美状态下陈化
            </p>
            
            {/* 快速导航 */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/cigar-preservation/tools/humidity-calculator">
                <Button className="gap-2">
                  <Calculator className="w-4 h-4" />
                  湿度计算器
                </Button>
              </Link>
              <Link href="/cigar-preservation/troubleshooting">
                <Button variant="outline" className="gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  问题诊断
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 主要内容 */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <PreservationGuide />
        </div>
      </section>

      {/* 底部行动召唤 */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">需要帮助？</h2>
            <p className="text-muted-foreground">
              遇到雪茄保存问题？查看我们的问题诊断指南获取详细解决方案
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/cigar-preservation/tools/humidity-calculator">
                <Button variant="outline" className="gap-2">
                  <Calculator className="w-4 h-4" />
                  使用湿度计算器
                </Button>
              </Link>
              <Link href="/cigar-preservation/troubleshooting">
                <Button variant="outline" className="gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  查看问题诊断
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MobileNav />
    </main>
  );
}
