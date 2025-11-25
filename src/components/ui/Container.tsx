interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({ children, className = "", size = "xl" }: ContainerProps) {
  return (
    <div className={`mx-auto px-5 sm:px-8 lg:px-12 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}
