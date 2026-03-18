"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, ChevronRight, ChevronLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { saveUserPreferences } from "@/lib/user-preferences";
import type { TastePreference, ProductTypePreference } from "@/data/types";

interface PreferenceQuizProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

type QuizStep = "intro" | "taste" | "price" | "type" | "brands" | "complete";

interface QuizState {
  taste: TastePreference;
  priceMin: number;
  priceMax: number;
  productType: ProductTypePreference;
  favoriteBrands: string[];
}

const COMMON_BRANDS = [
  "中华",
  "玉溪",
  "芙蓉王",
  "利群",
  "黄鹤楼",
  "南京",
  "苏烟",
  "云烟",
  "软中华",
  "硬中华",
];

export default function PreferenceQuiz({ onComplete, onSkip }: PreferenceQuizProps) {
  const { t, i18n } = useTranslation("recommend");
  const isEnglish = i18n.resolvedLanguage === "en-US";
  
  const [currentStep, setCurrentStep] = useState<QuizStep>("intro");
  const [state, setState] = useState<QuizState>({
    taste: "medium",
    priceMin: 0,
    priceMax: 1000,
    productType: "any",
    favoriteBrands: [],
  });

  const steps: QuizStep[] = ["intro", "taste", "price", "type", "brands", "complete"];
  const currentStepIndex = steps.indexOf(currentStep);
  const totalSteps = steps.length - 1; // 不包括 complete
  const progress = ((currentStepIndex) / totalSteps) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleComplete = () => {
    saveUserPreferences({
      taste: state.taste,
      priceRange: { min: state.priceMin, max: state.priceMax },
      productType: state.productType,
      favoriteBrands: state.favoriteBrands,
    });
    onComplete?.();
  };

  const toggleBrand = (brand: string) => {
    setState((prev) => ({
      ...prev,
      favoriteBrands: prev.favoriteBrands.includes(brand)
        ? prev.favoriteBrands.filter((b) => b !== brand)
        : [...prev.favoriteBrands, brand],
    }));
  };

  const renderIntro = () => (
    <div className="text-center space-y-6 py-8">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-foreground">
          {t("quiz.intro.title")}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("quiz.intro.description")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button onClick={handleNext} size="lg" className="min-w-[140px]">
          {t("quiz.start")}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        <Button variant="ghost" onClick={onSkip} size="lg">
          {t("quiz.skip")}
        </Button>
      </div>
    </div>
  );

  const renderTaste = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          {t("quiz.taste.title")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("quiz.taste.description")}
        </p>
      </div>

      <div className="grid gap-3">
        <button
          onClick={() => setState((prev) => ({ ...prev, taste: "mild" }))}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            state.taste === "mild"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("quiz.taste.mild")}</p>
              <p className="text-sm text-muted-foreground">{t("quiz.taste.mildDesc")}</p>
            </div>
            {state.taste === "mild" && <Check className="w-5 h-5 text-primary" />}
          </div>
        </button>

        <button
          onClick={() => setState((prev) => ({ ...prev, taste: "medium" }))}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            state.taste === "medium"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("quiz.taste.medium")}</p>
              <p className="text-sm text-muted-foreground">{t("quiz.taste.mediumDesc")}</p>
            </div>
            {state.taste === "medium" && <Check className="w-5 h-5 text-primary" />}
          </div>
        </button>

        <button
          onClick={() => setState((prev) => ({ ...prev, taste: "strong" }))}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            state.taste === "strong"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("quiz.taste.strong")}</p>
              <p className="text-sm text-muted-foreground">{t("quiz.taste.strongDesc")}</p>
            </div>
            {state.taste === "strong" && <Check className="w-5 h-5 text-primary" />}
          </div>
        </button>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t("quiz.back")}
        </Button>
        <Button onClick={handleNext}>
          {t("quiz.next")}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderPrice = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          {t("quiz.price.title")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("quiz.price.description")}
        </p>
      </div>

      <div className="space-y-6 py-4">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("quiz.price.min")}</span>
            <span className="font-medium text-foreground">¥{state.priceMin}</span>
          </div>
          <Slider
            value={[state.priceMin]}
            onValueChange={([min]) => setState((prev) => ({ ...prev, priceMin: min }))}
            min={0}
            max={state.priceMax - 10 || 100}
            step={10}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("quiz.price.max")}</span>
            <span className="font-medium text-foreground">¥{state.priceMax}</span>
          </div>
          <Slider
            value={[state.priceMax]}
            onValueChange={([max]) => setState((prev) => ({ ...prev, priceMax: max }))}
            min={state.priceMin + 10 || 10}
            max={1000}
            step={10}
            className="w-full"
          />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {t("quiz.price.range", { min: state.priceMin, max: state.priceMax })}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t("quiz.back")}
        </Button>
        <Button onClick={handleNext}>
          {t("quiz.next")}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderType = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          {t("quiz.type.title")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("quiz.type.description")}
        </p>
      </div>

      <div className="grid gap-3">
        <button
          onClick={() => setState((prev) => ({ ...prev, productType: "any" }))}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            state.productType === "any"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("quiz.type.any")}</p>
              <p className="text-sm text-muted-foreground">{t("quiz.type.anyDesc")}</p>
            </div>
            {state.productType === "any" && <Check className="w-5 h-5 text-primary" />}
          </div>
        </button>

        <button
          onClick={() => setState((prev) => ({ ...prev, productType: "cigarette" }))}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            state.productType === "cigarette"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("quiz.type.cigarette")}</p>
              <p className="text-sm text-muted-foreground">{t("quiz.type.cigaretteDesc")}</p>
            </div>
            {state.productType === "cigarette" && <Check className="w-5 h-5 text-primary" />}
          </div>
        </button>

        <button
          onClick={() => setState((prev) => ({ ...prev, productType: "cigar" }))}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            state.productType === "cigar"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("quiz.type.cigar")}</p>
              <p className="text-sm text-muted-foreground">{t("quiz.type.cigarDesc")}</p>
            </div>
            {state.productType === "cigar" && <Check className="w-5 h-5 text-primary" />}
          </div>
        </button>

        <button
          onClick={() => setState((prev) => ({ ...prev, productType: "vape" }))}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            state.productType === "vape"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("quiz.type.vape")}</p>
              <p className="text-sm text-muted-foreground">{t("quiz.type.vapeDesc")}</p>
            </div>
            {state.productType === "vape" && <Check className="w-5 h-5 text-primary" />}
          </div>
        </button>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t("quiz.back")}
        </Button>
        <Button onClick={handleNext}>
          {t("quiz.next")}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderBrands = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          {t("quiz.brands.title")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("quiz.brands.description")}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {COMMON_BRANDS.map((brand) => (
          <button
            key={brand}
            onClick={() => toggleBrand(brand)}
            className={`p-3 rounded-lg border text-sm transition-all ${
              state.favoriteBrands.includes(brand)
                ? "border-primary bg-primary/5 text-primary"
                : "border-border hover:border-primary/50 text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {state.favoriteBrands.includes(brand) && (
                <Check className="w-4 h-4" />
              )}
              {brand}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t("quiz.back")}
        </Button>
        <Button onClick={handleComplete}>
          {t("quiz.complete")}
          <Sparkles className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center space-y-6 py-8">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center animate-bounce">
        <Check className="w-10 h-10 text-white" />
      </div>
      
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-foreground">
          {t("quiz.completeTitle")}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("quiz.completeDescription")}
        </p>
      </div>

      <Button onClick={handleComplete} size="lg">
        {t("quiz.viewRecommendations")}
        <Sparkles className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        {currentStep !== "intro" && currentStep !== "complete" && (
          <>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>
                {t("quiz.step", { current: currentStepIndex, total: totalSteps })}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}
      </CardHeader>
      <CardContent>
        {currentStep === "intro" && renderIntro()}
        {currentStep === "taste" && renderTaste()}
        {currentStep === "price" && renderPrice()}
        {currentStep === "type" && renderType()}
        {currentStep === "brands" && renderBrands()}
        {currentStep === "complete" && renderComplete()}
      </CardContent>
    </Card>
  );
}
