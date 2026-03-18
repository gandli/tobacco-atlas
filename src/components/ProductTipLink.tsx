"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Shield, Cigarette, ArrowRight } from "lucide-react";

interface ProductTipLinkProps {
  productType?: string;
  tobaccoType?: string;
}

export function ProductTipLink({ productType, tobaccoType }: ProductTipLinkProps) {
  const { i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.includes("en");

  // 判断是否为雪茄产品
  const isCigar = productType?.toLowerCase().includes("cigar") || 
                  tobaccoType?.toLowerCase().includes("雪茄") ||
                  tobaccoType?.toLowerCase().includes("cigar");

  if (isCigar) {
    // 雪茄产品 - 显示保存贴士
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <Cigarette className="w-4 h-4" />
            </div>
            <CardTitle className="text-base font-semibold">
              {isEnglish ? "Cigar Preservation Tips" : "雪茄保存贴士"}
            </CardTitle>
          </div>
          <CardDescription className="text-sm">
            {isEnglish
              ? "Learn how to properly store and maintain your cigars"
              : "学习如何正确存储和保养您的雪茄"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/cigar-preservation">
            <Button className="w-full gap-2" size="sm" variant="default">
              {isEnglish ? "View Guide" : "查看指南"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // 卷烟产品 - 显示真伪鉴别
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-primary/20 text-primary">
            <Shield className="w-4 h-4" />
          </div>
          <CardTitle className="text-base font-semibold">
            {isEnglish ? "Authenticity Verification" : "真伪鉴别指南"}
          </CardTitle>
        </div>
        <CardDescription className="text-sm">
          {isEnglish
            ? "Learn how to identify genuine products and avoid counterfeits"
            : "学习如何识别正品，避免购买假冒产品"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/authenticity-guide">
          <Button className="w-full gap-2" size="sm" variant="default">
            {isEnglish ? "View Guide" : "查看指南"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
