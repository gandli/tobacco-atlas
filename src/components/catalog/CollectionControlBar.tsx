type CollectionControlBarProps = {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  summary?: React.ReactNode;
  className?: string;
};

export default function CollectionControlBar({
  leading,
  trailing,
  summary,
  className = "",
}: CollectionControlBarProps) {
  return (
    <div
      data-testid="collection-control-bar"
      className={`rounded-[22px] border border-border/60 bg-secondary/35 px-3 py-3 md:px-4 md:py-4 ${className}`.trim()}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">{leading}</div>
        {trailing ? <div className="flex flex-wrap items-center gap-2">{trailing}</div> : null}
      </div>
      {summary ? (
        <div className="mt-3 border-t border-border/50 pt-3 text-sm text-muted-foreground">
          {summary}
        </div>
      ) : null}
    </div>
  );
}
