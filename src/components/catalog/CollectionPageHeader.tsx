interface CollectionPageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  meta?: React.ReactNode;
}

export default function CollectionPageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  meta,
}: CollectionPageHeaderProps) {
  return (
    <header className="mb-6 md:mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/75">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            {subtitle}
          </p>
        </div>
        {action ? <div className="md:flex-shrink-0">{action}</div> : null}
      </div>
      {meta ? <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">{meta}</div> : null}
    </header>
  );
}
