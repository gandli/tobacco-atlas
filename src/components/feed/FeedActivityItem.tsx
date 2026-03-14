import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

export type FeedEntryKind = "maker" | "brand" | "product";

export type FeedActivity = {
  id: string;
  kind: FeedEntryKind;
  title: string;
  titleSecondary?: string;
  summary: string;
  href: string;
  image: string;
  badge: string;
  badgeTone: FeedEntryKind;
  timestamp: string;
};

const badgeToneClassMap: Record<FeedEntryKind, string> = {
  maker: "border-amber-500/25 bg-amber-500/10 text-amber-700",
  brand: "border-sky-500/25 bg-sky-500/10 text-sky-700",
  product: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700",
};

type FeedActivityItemProps = {
  activity: FeedActivity;
};

export default function FeedActivityItem({ activity }: FeedActivityItemProps) {
  return (
    <li className="px-3 py-2 md:px-4">
      <div
        data-testid={`feed-activity-${activity.id}`}
        className="museum-inline-panel group flex items-start gap-3 px-4 py-4 transition-colors hover:bg-secondary/30 md:px-5"
      >
        <OptimizedImage
          src={activity.image}
          alt={activity.title}
          width={40}
          height={40}
          className="mt-0.5 h-10 w-10 flex-shrink-0 rounded-2xl object-cover ring-1 ring-border/70"
          sizes="40px"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${badgeToneClassMap[activity.badgeTone]}`}
                >
                  {activity.badge}
                </span>
                <span className="text-xs text-muted-foreground/80">{activity.timestamp}</span>
              </div>

              <Link
                href={activity.href}
                className="mt-2 block text-base font-semibold text-foreground transition-colors hover:text-gold"
              >
                {activity.title}
                {activity.titleSecondary ? (
                  <span className="font-normal text-muted-foreground"> · {activity.titleSecondary}</span>
                ) : null}
              </Link>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">{activity.summary}</p>
            </div>

            <Link
              href={activity.href}
              className="text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
