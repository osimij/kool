"use client";

import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-2xl
          bg-gradient-to-b from-[#18181b]/50 to-[#0f0f12]/50
          border border-[rgba(255,255,255,0.06)]
          backdrop-blur-sm
          ${hover ? "transition-all duration-300 hover:border-[rgba(255,255,255,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
