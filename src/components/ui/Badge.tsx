interface BadgeProps {
  label: string;
  variant?: "primary" | "accent" | "muted";
  className?: string;
}

export function Badge({
  label,
  variant = "primary",
  className = "",
}: BadgeProps) {
  const variants = {
    primary: "bg-primary-100 text-primary",
    accent: "bg-accent-100 text-accent-700",
    muted: "bg-surface-2 text-text-muted",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
