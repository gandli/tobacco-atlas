"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Droplet,
  Thermometer,
  Sun,
  Wind,
  Clock,
  Calendar,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "droplet": Droplet,
  "thermometer": Thermometer,
  "sun-off": Sun,
  "wind": Wind,
  "clock": Clock,
  "calendar": Calendar,
};

interface TipCardProps {
  icon: string;
  title: string;
  description: string;
  details: string[];
}

export function TipCard({ icon, title, description, details }: TipCardProps) {
  const IconComponent = iconMap[icon] || Droplet;

  return (
    <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <IconComponent className="w-5 h-5" />
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
