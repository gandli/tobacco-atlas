import FeedActivityItem, { type FeedActivity } from "@/components/feed/FeedActivityItem";

type FeedActivityListProps = {
  activities: FeedActivity[];
  sectionLabel: string;
};

export default function FeedActivityList({
  activities,
  sectionLabel,
}: FeedActivityListProps) {
  return (
    <div className="p-2 md:p-3">
      <div className="flex items-center justify-between px-3 pb-3 pt-2 md:px-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
          {sectionLabel}
        </p>
        <span className="text-xs text-muted-foreground/70">{activities.length}</span>
      </div>
      <ul className="divide-y divide-border/40">
        {activities.map((activity) => (
          <FeedActivityItem key={activity.id} activity={activity} />
        ))}
      </ul>
    </div>
  );
}
