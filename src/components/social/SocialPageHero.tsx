interface SocialPageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

const SocialPageHero = ({ eyebrow, title, subtitle, action }: SocialPageHeroProps) => {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-border/60 bg-gradient-to-br from-secondary/60 via-background to-background px-5 py-6 md:px-8 md:py-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <div className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-primary/8 blur-2xl" />
      <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/80">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            {subtitle}
          </p>
        </div>
        {action ? <div className="md:flex-shrink-0">{action}</div> : null}
      </div>
    </section>
  );
};

export default SocialPageHero;
