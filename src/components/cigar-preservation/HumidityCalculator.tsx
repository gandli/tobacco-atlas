"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplet, Thermometer, AlertTriangle, CheckCircle2 } from "lucide-react";

interface HumidityCalculatorProps {
  language?: "zh" | "en";
}

export function HumidityCalculator({ language = "zh" }: HumidityCalculatorProps) {
  const { i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.includes("en") || language === "en";

  const [humidity, setHumidity] = useState(68);
  const [temperature, setTemperature] = useState(20);

  const humidityStatus = useMemo(() => {
    if (humidity < 60) return {
      label: isEnglish ? "Too Low" : "过低",
      color: "text-red-600",
      bgColor: "bg-red-600",
      icon: AlertTriangle,
      description: isEnglish 
        ? "Cigars will dry out quickly, wrappers may crack"
        : "雪茄会迅速干燥，茄衣可能开裂"
    };
    if (humidity < 65) return {
      label: isEnglish ? "Low" : "偏低",
      color: "text-orange-600",
      bgColor: "bg-orange-600",
      icon: AlertTriangle,
      description: isEnglish
        ? "Cigars are slightly dry, may burn faster"
        : "雪茄偏干，燃烧可能较快"
    };
    if (humidity <= 70) return {
      label: isEnglish ? "Ideal" : "理想",
      color: "text-green-600",
      bgColor: "bg-green-600",
      icon: CheckCircle2,
      description: isEnglish
        ? "Perfect conditions for cigar preservation"
        : "雪茄保存的理想条件"
    };
    if (humidity <= 75) return {
      label: isEnglish ? "High" : "偏高",
      color: "text-orange-600",
      bgColor: "bg-orange-600",
      icon: AlertTriangle,
      description: isEnglish
        ? "Cigars may be too moist, difficult to burn"
        : "雪茄过湿，可能难以燃烧"
    };
    return {
      label: isEnglish ? "Too High" : "过高",
      color: "text-red-600",
      bgColor: "bg-red-600",
      icon: AlertTriangle,
      description: isEnglish
        ? "High risk of mold and tobacco beetles"
        : "霉变和烟草甲虫风险很高"
    };
  }, [humidity, isEnglish]);

  const temperatureStatus = useMemo(() => {
    if (temperature < 16) return {
      label: isEnglish ? "Too Cold" : "过冷",
      color: "text-blue-600",
      description: isEnglish
        ? "Aging process inhibited"
        : "陈化过程被抑制"
    };
    if (temperature < 18) return {
      label: isEnglish ? "Cool" : "偏凉",
      color: "text-blue-600",
      description: isEnglish
        ? "Slightly below optimal range"
        : "略低于最佳范围"
    };
    if (temperature <= 21) return {
      label: isEnglish ? "Ideal" : "理想",
      color: "text-green-600",
      description: isEnglish
        ? "Perfect temperature for aging"
        : "陈化的理想温度"
    };
    if (temperature <= 24) return {
      label: isEnglish ? "Warm" : "偏暖",
      color: "text-orange-600",
      description: isEnglish
        ? "Risk of tobacco beetle activation"
        : "烟草甲虫激活风险"
    };
    return {
      label: isEnglish ? "Too Hot" : "过热",
      color: "text-red-600",
      description: isEnglish
        ? "High risk of beetle infestation"
        : "烟草甲虫侵害风险很高"
    };
  }, [temperature, isEnglish]);

  const getHumidityProgressColor = (value: number) => {
    if (value < 65 || value > 70) return "bg-red-600";
    return "bg-green-600";
  };

  const StatusIcon = humidityStatus.icon;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-primary" />
            {isEnglish ? "Humidity Calculator" : "湿度计算器"}
          </CardTitle>
          <CardDescription>
            {isEnglish 
              ? "Adjust the sliders to see the status of your storage conditions"
              : "调整滑块查看存储条件的状态"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* 湿度控制 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {isEnglish ? "Relative Humidity" : "相对湿度"}
              </label>
              <Badge className={`${humidityStatus.bgColor} text-white`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {humidityStatus.label} ({humidity}%)
              </Badge>
            </div>
            <Slider
              value={[humidity]}
              onValueChange={(value) => setHumidity(value[0])}
              min={50}
              max={80}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>50%</span>
              <span>65-70%</span>
              <span>80%</span>
            </div>
            <Progress 
              value={humidity} 
              className={`h-2 ${getHumidityProgressColor(humidity)}`}
            />
            <p className="text-sm text-muted-foreground">{humidityStatus.description}</p>
          </div>

          {/* 温度控制 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {isEnglish ? "Temperature" : "温度"}
              </label>
              <Badge variant="outline" className={temperatureStatus.color}>
                <Thermometer className="w-3 h-3 mr-1" />
                {temperatureStatus.label} ({temperature}°C / {Math.round(temperature * 9/5 + 32)}°F)
              </Badge>
            </div>
            <Slider
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
              min={14}
              max={28}
              step={0.5}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>14°C</span>
              <span>18-21°C</span>
              <span>28°C</span>
            </div>
            <p className="text-sm text-muted-foreground">{temperatureStatus.description}</p>
          </div>

          {/* 综合建议 */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-semibold mb-3">
              {isEnglish ? "Recommendations" : "综合建议"}
            </h4>
            <div className="space-y-2 text-sm">
              {humidity < 65 && (
                <p className="text-orange-600">
                  {isEnglish 
                    ? "💧 Increase humidity: Add distilled water or use humidity packs"
                    : "💧 增加湿度：添加蒸馏水或使用保湿包"}
                </p>
              )}
              {humidity > 70 && (
                <p className="text-orange-600">
                  {isEnglish
                    ? "🌬️ Decrease humidity: Improve ventilation or use dry humidity packs"
                    : "🌬️ 降低湿度：改善通风或使用干燥保湿包"}
                </p>
              )}
              {temperature < 18 && (
                <p className="text-blue-600">
                  {isEnglish
                    ? "🌡️ Increase temperature: Move to a warmer location"
                    : "🌡️ 提高温度：移至更温暖的位置"}
                </p>
              )}
              {temperature > 21 && (
                <p className="text-red-600">
                  {isEnglish
                    ? "❄️ Decrease temperature: Move to a cooler location, avoid heat sources"
                    : "❄️ 降低温度：移至更凉爽的位置，远离热源"}
                </p>
              )}
              {humidity >= 65 && humidity <= 70 && temperature >= 18 && temperature <= 21 && (
                <p className="text-green-600 font-medium">
                  {isEnglish
                    ? "✅ Perfect conditions! Maintain current settings"
                    : "✅ 完美条件！保持当前设置"}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快速参考 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {isEnglish ? "Quick Reference" : "快速参考"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-600" />
                {isEnglish ? "Humidity" : "湿度"}
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• {isEnglish ? "Ideal: 65-70% RH" : "理想：65-70% RH"}</li>
                <li>• {isEnglish ? "Long-term: 65-68%" : "长期：65-68%"}</li>
                <li>• {isEnglish ? "Short-term: 68-70%" : "短期：68-70%"}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-600" />
                {isEnglish ? "Temperature" : "温度"}
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• {isEnglish ? "Ideal: 18-21°C (64-70°F)" : "理想：18-21°C (64-70°F)"}</li>
                <li>• {isEnglish ? "Max: 21°C to prevent beetles" : "最高：21°C 防甲虫"}</li>
                <li>• {isEnglish ? "Avoid fluctuations" : "避免波动"}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
