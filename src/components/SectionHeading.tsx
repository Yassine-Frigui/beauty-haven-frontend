interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeading = ({ title, subtitle, className = "" }: SectionHeadingProps) => (
  <div className={`text-center mb-12 md:mb-16 ${className}`}>
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className="deco-line flex-1 max-w-[60px]" />
      <span className="text-primary text-xs tracking-[0.4em] uppercase font-body font-semibold">✦</span>
      <div className="deco-line flex-1 max-w-[60px]" />
    </div>
    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-foreground mb-4">{title}</h2>
    {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto tracking-wide text-sm">{subtitle}</p>}
    <div className="flex items-center justify-center gap-3 mt-6">
      <div className="w-12 h-px bg-primary/30" />
      <div className="w-2 h-2 rotate-45 border border-primary/40" />
      <div className="w-12 h-px bg-primary/30" />
    </div>
  </div>
);

export default SectionHeading;
