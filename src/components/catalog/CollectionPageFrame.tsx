type CollectionPageFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CollectionPageFrame({
  children,
  className = "",
}: CollectionPageFrameProps) {
  return (
    <div className={`mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12 ${className}`.trim()}>
      {children}
    </div>
  );
}
