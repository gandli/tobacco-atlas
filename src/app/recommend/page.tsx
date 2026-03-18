"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";

import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import RecommendationEngine from "@/components/RecommendationEngine";
import PreferenceQuiz from "@/components/PreferenceQuiz";
import { hasCompletedPreferences } from "@/lib/user-preferences";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";

export default function RecommendPage() {
  const { t } = useTranslation("recommend");
  const [hasPreferences, setHasPreferences] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const completed = hasCompletedPreferences();
    setHasPreferences(completed);
    setShowQuiz(!completed);
  }, []);

  const handleQuizComplete = () => {
    setHasPreferences(true);
    setShowQuiz(false);
  };

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <CollectionPageFrame className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* 页面标题 */}
            <div className="text-center space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {t("forYou")}
                </h1>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {hasPreferences
                  ? "基于你的偏好和浏览历史，为你精选的产品"
                  : "完成偏好设置，获取个性化推荐"}
              </p>
            </div>

            {/* 问卷或推荐引擎 */}
            {showQuiz ? (
              <div className="py-8">
                <PreferenceQuiz onComplete={handleQuizComplete} />
              </div>
            ) : (
              <div className="space-y-12">
                {/* 主要推荐 */}
                <RecommendationEngine
                  title={t("forYou")}
                  limit={20}
                  showQuiz={false}
                />

                {/* 热门产品 */}
                <div className="pt-8 border-t border-border/50">
                  <RecommendationEngine
                    title={t("type.popular")}
                    limit={10}
                    showQuiz={false}
                  />
                </div>

                {/* 新品推荐 */}
                <div className="pt-8 border-t border-border/50">
                  <RecommendationEngine
                    title={t("type.new")}
                    limit={10}
                    showQuiz={false}
                  />
                </div>
              </div>
            )}
          </div>
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </main>
  );
}
