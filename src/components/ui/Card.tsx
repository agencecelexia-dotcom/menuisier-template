interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  className = "",
  hover = true,
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-xl border border-border ${paddings[padding]} ${hover ? "shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1" : "shadow-premium"} ${className}`}
    >
      {children}
    </div>
  );
}
