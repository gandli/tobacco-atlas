import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Database, Target, Users } from "lucide-react";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HowItWorksDialog = ({ open, onOpenChange }: HowItWorksDialogProps) => {
  const steps = [
    {
      icon: Database,
      title: "Browse",
      titleZh: "浏览",
      description: "Explore 3,200+ Chinese tobacco products with detailed specs, pricing, and high-resolution images.",
      descriptionZh: "浏览 3200+ 中国烟草产品，包含详细规格、价格和高清图片。",
    },
    {
      icon: Target,
      title: "Discover",
      titleZh: "发现",
      description: "Filter by brand, region, tar level, and more to find exactly what you're looking for.",
      descriptionZh: "按品牌、地区、焦油量等筛选，精准找到你想要的产品。",
    },
    {
      icon: Users,
      title: "Connect",
      titleZh: "交流",
      description: "Join our community of tobacco enthusiasts, share reviews, and track your collection.",
      descriptionZh: "加入烟草爱好者社区，分享评测，追踪收藏。",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-ash">
            使用指南 · How it works
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0">
                <step.icon className="w-4 h-4 text-foreground/70" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {step.title} · {step.titleZh}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  {step.description}
                </p>
                <p className="text-xs text-muted-foreground/70 leading-relaxed">
                  {step.descriptionZh}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksDialog;