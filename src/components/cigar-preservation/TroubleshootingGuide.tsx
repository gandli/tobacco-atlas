"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { troubleshootingIssues, faqs } from "@/data/cigar-preservation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Info,
} from "lucide-react";

interface TroubleshootingGuideProps {
  language?: "zh" | "en";
}

export function TroubleshootingGuide({ language = "zh" }: TroubleshootingGuideProps) {
  const { i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.includes("en") || language === "en";

  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle className="w-3 h-3" />
            {isEnglish ? "High" : "高"}
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="secondary" className="gap-1 bg-orange-500/20 text-orange-700 dark:text-orange-300">
            <AlertTriangle className="w-3 h-3" />
            {isEnglish ? "Medium" : "中"}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="gap-1">
            <Info className="w-3 h-3" />
            {isEnglish ? "Low" : "低"}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* 问题诊断 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          {isEnglish ? "Troubleshooting Guide" : "问题诊断指南"}
        </h2>
        <div className="space-y-4">
          {troubleshootingIssues.map((issue) => (
            <Card 
              key={issue.id} 
              className={`border-border/50 cursor-pointer transition-colors ${
                expandedIssue === issue.id ? "bg-card" : "hover:bg-card/50"
              }`}
              onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{isEnglish ? issue.symptomEn : issue.symptomZh}</CardTitle>
                      {getSeverityBadge(issue.severity)}
                    </div>
                    <CardDescription className="text-sm">
                      <span className="font-medium">{isEnglish ? "Cause: " : "原因："}</span>
                      {isEnglish ? issue.causeEn : issue.causeZh}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedIssue(expandedIssue === issue.id ? null : issue.id);
                    }}
                  >
                    {expandedIssue === issue.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedIssue === issue.id && (
                <CardContent className="pt-0">
                  <div className="bg-muted/50 rounded-lg p-4 mt-3">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      {isEnglish ? "Solutions" : "解决方案"}
                    </h4>
                    <ol className="space-y-2">
                      {(isEnglish ? issue.solutionEn : issue.solutionZh).map((solution, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          <span className="mt-0.5">{solution}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* 常见问题 FAQ */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-primary" />
          {isEnglish ? "Frequently Asked Questions" : "常见问题 FAQ"}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className={`border-border/50 cursor-pointer transition-colors ${
                expandedFaq === index ? "bg-card" : "hover:bg-card/50"
              }`}
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-base font-medium">
                    {isEnglish ? faq.questionEn : faq.questionZh}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedFaq(expandedFaq === index ? null : index);
                    }}
                  >
                    {expandedFaq === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedFaq === index && (
                <CardContent className="pt-0">
                  <div className="bg-muted/30 rounded-lg p-4 mt-3 text-sm text-muted-foreground leading-relaxed">
                    {isEnglish ? faq.answerEn : faq.answerZh}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
