"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import PreferenceQuiz from "@/components/PreferenceQuiz";
import CollectionPageFrame from "@/components/catalog/CollectionPageFrame";

export default function QuizPage() {
  const router = useRouter();
  const { t } = useTranslation("recommend");

  const handleComplete = () => {
    router.push("/recommend");
  };

  const handleSkip = () => {
    router.push("/recommend");
  };

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-[var(--nav-height)]">
        <CollectionPageFrame className="py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {t("quiz.intro.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("quiz.intro.description")}
              </p>
            </div>

            <PreferenceQuiz
              onComplete={handleComplete}
              onSkip={handleSkip}
            />
          </div>
        </CollectionPageFrame>
      </div>
      <MobileNav />
    </main>
  );
}
