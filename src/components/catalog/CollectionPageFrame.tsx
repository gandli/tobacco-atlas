type CollectionPageFrameProps = {
  children: React.ReactNode;
  className?: string;
  size?: "standard" | "reading" | "narrow" | "wide";
};

const sizeClassMap: Record<NonNullable<CollectionPageFrameProps["size"]>, string> = {
  standard: "max-w-[1200px]",
  reading: "max-w-3xl",
  narrow: "max-w-4xl",
  wide: "max-w-[1400px]",
};

export default function CollectionPageFrame({
  children,
  className = "",
  size = "standard",
}: CollectionPageFrameProps) {
  return (
    <div
      data-testid="page-frame"
      className={`mx-auto ${sizeClassMap[size]} px-4 py-8 md:px-6 md:py-12 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
