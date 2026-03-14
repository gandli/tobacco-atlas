interface SocialEmptyPanelProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

const SocialEmptyPanel = ({ title, description, action, className = "" }: SocialEmptyPanelProps) => {
  return (
    <div className={`rounded-[24px] border border-dashed border-border/70 bg-secondary/30 px-6 py-8 text-center ${className}`}>
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
};

export default SocialEmptyPanel;
