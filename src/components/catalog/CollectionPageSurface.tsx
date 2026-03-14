type CollectionPageSurfaceProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CollectionPageSurface({
  children,
  className = "",
}: CollectionPageSurfaceProps) {
  return (
    <section
      className={`rounded-[28px] border border-border/60 bg-background/72 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${className}`.trim()}
    >
      {children}
    </section>
  );
}
