"use client";

import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, RefreshCw, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PreferenceQuiz from "./PreferenceQuiz";
import RecommendedProducts from "./RecommendedProducts";
import {
  getRecommendations,
  getRecommendedProducts,
  needsPreferenceSetup,
} from "@/lib/recommendation-algo";
import { getUserPreferences, resetUserPreferences } from "@/lib/user-preferences";
import type { Recommendation } from "@/data/types";

interface RecommendationEngineProps {
  productId?: number; // 如果是相似推荐，提供产品 ID
  title?: string;
  limit?: number;
  showQuiz?: boolean;
  className?: string;
}

export default function RecommendationEngine({
  productId,
  title,
  limit = 10,
  showQuiz = false,
  className,
}: RecommendationEngineProps) {
  const { t, i18n } = useTranslation("recommend");
  const [showQuizState, setShowQuizState] = useState(false);
  const [recommendations, setRecommendations] = useState<(Recommendation & { sku_id?: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPreferences, setHasPreferences] = useState(false);

  // 检查用户是否有偏好设置
  useEffect(() => {
    const checkPreferences = () => {
      const needsSetup = needsPreferenceSetup();
      setHasPreferences(!needsSetup);
      
      // 如果需要设置且显示 quiz
      if (needsSetup && showQuiz) {
        setShowQuizState(true);
      }
    };

    checkPreferences();
  }, [showQuiz]);

  // 获取推荐
  useEffect(() => {
    const loadRecommendations = () => {
      setIsLoading(true);
      
      try {
        const recs = getRecommendations({
          limit,
          productId,
          strategy: productId ? "similar" : "mixed",
        });
        
        setRecommendations(recs);
      } catch (error) {
        console.error("Failed to load recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!showQuizState) {
      loadRecommendations();
    }
  }, [limit, productId, showQuizState, i18n.resolvedLanguage]);

  // 获取产品详情
  const productsWithDetails = useMemo(() => {
    return getRecommendedProducts(recommendations as Recommendation[]);
  }, [recommendations]);

  const handleQuizComplete = () => {
    setShowQuizState(false);
    setHasPreferences(true);
  };

  const handleResetPreferences = () => {
    if (confirm(t("confirmReset"))) {
      resetUserPreferences();
      setHasPreferences(false);
      setShowQuizState(true);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const recs = getRecommendations({
        limit,
        productId,
        strategy: productId ? "similar" : "mixed",
      });
      setRecommendations(recs);
      setIsLoading(false);
    }, 500);
  };

  // 如果显示问卷且用户没有偏好设置
  if (showQuizState && !hasPreferences) {
    return (
      <div className={className}>
        <PreferenceQuiz
          onComplete={handleQuizComplete}
          onSkip={() => setShowQuizState(false)}
        />
      </div>
    );
  }

  // 如果没有偏好设置，显示设置提示
  if (!hasPreferences && showQuiz) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {t("setupTitle")}
          </CardTitle>
          <CardDescription>{t("setupDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("setupBenefits")}
          </p>
          <div className="flex gap-3">
            <Button onClick={() => setShowQuizState(true)}>
              {t("setupButton")}
            </Button>
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              {t("browseWithoutSetup")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-foreground">
            {title || t("forYou")}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="text-muted-foreground"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            {t("refresh")}
          </Button>
          
          {hasPreferences && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetPreferences}
              className="text-muted-foreground"
            >
              <Settings2 className="w-4 h-4 mr-1" />
              {t("resetPreferences")}
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-card/50 overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-secondary/50" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-secondary/50 rounded w-3/4" />
                <div className="h-3 bg-secondary/50 rounded w-1/2" />
                <div className="h-3 bg-secondary/50 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : productsWithDetails.length > 0 ? (
        <RecommendedProducts
          recommendations={productsWithDetails}
          showReason
        />
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {t("noRecommendations")}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
