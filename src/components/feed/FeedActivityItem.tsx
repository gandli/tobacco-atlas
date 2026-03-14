import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

export type FeedActivity = {
  id: string;
  user: string;
  avatar: string;
  action: "wishlisted" | "tried" | "favorited";
  productNameZh: string;
  productNameEn: string;
  productHref: string;
  timestamp: string;
};

const actionGlyphMap: Record<FeedActivity["action"], string> = {
  wishlisted: "◇",
  tried: "✓",
  favorited: "★",
};

const actionToneMap: Record<FeedActivity["action"], string> = {
  wishlisted: "text-zinc-500",
  tried: "text-emerald-600",
  favorited: "text-amber-500",
};

type FeedActivityItemProps = {
  activity: FeedActivity;
};

export default function FeedActivityItem({ activity }: FeedActivityItemProps) {
  return (
    <li className="group flex items-start gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-secondary/35 md:px-5">
      <span
        aria-hidden="true"
        className={`mt-1 w-4 flex-shrink-0 text-center text-sm font-semibold ${actionToneMap[activity.action]}`}
      >
        {actionGlyphMap[activity.action]}
      </span>

      <OptimizedImage
        src={activity.avatar}
        alt={activity.user}
        width={36}
        height={36}
        className="h-9 w-9 rounded-full object-cover ring-1 ring-border/70"
        sizes="36px"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
          <p className="min-w-0 text-sm leading-6 text-foreground">
            <span className="font-medium text-foreground/95">@{activity.user}</span>{" "}
            <span className="text-muted-foreground">{activity.action}</span>{" "}
            <Link
              href={activity.productHref}
              className="font-medium text-foreground transition-colors hover:text-gold"
            >
              {activity.productNameZh}
              <span className="text-muted-foreground"> · </span>
              <span className="text-foreground/75">{activity.productNameEn}</span>
            </Link>
          </p>
          <span className="flex-shrink-0 text-xs text-muted-foreground/80">
            {activity.timestamp}
          </span>
        </div>
      </div>
    </li>
  );
}
