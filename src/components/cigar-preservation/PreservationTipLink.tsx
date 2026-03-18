"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";

interface PreservationTipLinkProps {
  language?: "zh" | "en";
}

export function PreservationTipLink({ language = "zh" }: PreservationTipLinkProps) {
  const { i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.includes("en") || language === "en";

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-primary/20 text-primary">
            <BookOpen className="w-4 h-4" />
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
