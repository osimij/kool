"use client";

type BadgeVariant = "default" | "accent" | "success" | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[rgba(0,0,0,0.04)] text-[#52525b] border-[rgba(0,0,0,0.08)]",
  accent: "bg-[rgba(249,115,22,0.1)] text-[#f97316] border-[rgba(249,115,22,0.2)]",
  success: "bg-[rgba(34,197,94,0.1)] text-[#22c55e] border-[rgba(34,197,94,0.2)]",
  info: "bg-[rgba(59,130,246,0.1)] text-[#3b82f6] border-[rgba(59,130,246,0.2)]",
};

export function Badge({ variant = "default", children, className = "", dot = false }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-3 py-1 rounded-full
        text-xs font-medium tracking-wide
        border
        ${variants[variant]}
        ${className}
      `}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
