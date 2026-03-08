import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight, Database, Shield, Heart, Globe } from "lucide-react";

interface WhyThisExistsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WhyThisExistsDialog = ({ open, onOpenChange }: WhyThisExistsDialogProps) => {
  const reasons = [
    {
      icon: Database,
      text: "A comprehensive, searchable database of Chinese cigarettes, cigars, and e-cigarettes.",
      textZh: "全面、可搜索的中国卷烟、雪茄、电子烟数据库。",
    },
    {
      icon: Shield,
      text: "Accurate product specifications, pricing data, and manufacturer information.",
      textZh: "准确的产品规格、价格数据和制造商信息。",
    },
    {
      icon: Heart,
      text: "An independent project dedicated to tobacco knowledge and education.",
      textZh: "独立的烟草知识教育项目。",
    },
    {
      icon: Globe,
      text: "Built by enthusiasts, for enthusiasts — no ads, no tracking, just data.",
      textZh: "由爱好者构建，为爱好者服务 — 无广告、无追踪、纯粹的数据。",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-ash">
            项目介绍 · Why this exists
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 p-4 rounded-lg bg-secondary/30 border border-border/40">
          <ul className="space-y-3">
            {reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-background flex items-center justify-center shrink-0 mt-0.5">
                  <reason.icon className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {reason.text}
                  </p>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed mt-0.5">
                    {reason.textZh}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-center text-muted-foreground/50 mt-4">
          Made with 🦞 by Tobacco Atlas Team
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default WhyThisExistsDialog;