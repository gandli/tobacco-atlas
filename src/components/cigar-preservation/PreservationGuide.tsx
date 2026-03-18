"use client";

import { useTranslation } from "react-i18next";
import { preservationTips, storageTypes, humidityZones } from "@/data/cigar-preservation";
import { TipCard } from "./TipCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

interface PreservationGuideProps {
  language?: "zh" | "en";
}

export function PreservationGuide({ language = "zh" }: PreservationGuideProps) {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.includes("en") || language === "en";

  return (
    <div className="space-y-12">
      {/* 核心保存贴士 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{isEnglish ? "Core Preservation Tips" : "核心保存贴士"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preservationTips.map((tip) => (
            <TipCard
              key={tip.id}
              icon={tip.icon}
              title={isEnglish ? tip.titleEn : tip.titleZh}
              description={isEnglish ? tip.descriptionEn : tip.descriptionZh}
              details={isEnglish ? tip.detailsEn : tip.detailsZh}
            />
          ))}
        </div>
      </section>

      {/* 湿度区域说明 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{isEnglish ? "Humidity Zones" : "湿度区域说明"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {humidityZones.map((zone, index) => {
            const getZoneColor = () => {
              if (index < 2) return "bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-300";
              if (index === 2) return "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300";
              return "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300";
            };

            return (
              <Card key={zone.range} className={`border-2 ${getZoneColor()}`}>
                <CardHeader className="pb-2 text-center">
                  <CardTitle className="text-sm font-semibold">{zone.name}</CardTitle>
                  <CardDescription className="text-xs font-mono">{zone.range}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <p className="text-muted-foreground">{isEnglish ? zone.description : zone.description}</p>
                  <p className="font-medium">{isEnglish ? zone.recommendation : zone.recommendation}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 存储设备推荐 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{isEnglish ? "Storage Equipment Guide" : "存储设备指南"}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {storageTypes.map((type) => (
            <Card key={type.id} className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{isEnglish ? type.nameEn : type.nameZh}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {isEnglish ? type.descriptionEn : type.descriptionZh}
                    </CardDescription>
                  </div>
                  {type.recommended && (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {isEnglish ? "Recommended" : "推荐"}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {isEnglish ? "Pros" : "优点"}
                  </h4>
                  <ul className="space-y-1">
                    {(isEnglish ? type.prosEn : type.prosZh).map((pro, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-green-600 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {isEnglish ? "Cons" : "缺点"}
                  </h4>
                  <ul className="space-y-1">
                    {(isEnglish ? type.consEn : type.consZh).map((con, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-red-600 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
