interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "alt" | "dark";
}

export function SectionWrapper({
  children,
  className = "",
  id,
  background = "default",
}: SectionWrapperProps) {
  const backgrounds = {
    default: "bg-surface",
    alt: "bg-surface-2",
    dark: "bg-primary text-white",
  };

  return (
    <section id={id} className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
