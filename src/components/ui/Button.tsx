"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "gradient";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-[#0c0c0c] dark:bg-white text-white dark:text-[#0c0c0c] font-medium
    hover:bg-[#1a1a1a] dark:hover:bg-[#e8e8e8]
  `,
  gradient: `
    bg-[#0077ED] text-white font-medium
    hover:bg-[#0066CC]
  `,
  secondary: `
    bg-white dark:bg-[#1a1a1a] text-[#0c0c0c] dark:text-white
    border border-[#0c0c0c]/10 dark:border-white/10
    hover:bg-[#f7f5f0] dark:hover:bg-[#2a2a2a] hover:border-[#0c0c0c]/15 dark:hover:border-white/15
  `,
  outline: `
    bg-transparent text-[#0c0c0c] dark:text-white
    border-2 border-[#0c0c0c]/15 dark:border-white/15
    hover:bg-[#0c0c0c]/5 dark:hover:bg-white/5 hover:border-[#0c0c0c]/25 dark:hover:border-white/25
  `,
  ghost: `
    bg-transparent text-[#4a4a4a] dark:text-[#b0b0b0]
    hover:text-[#0c0c0c] dark:hover:text-white hover:bg-[#0c0c0c]/5 dark:hover:bg-white/5
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-sm gap-2 rounded-full",
  md: "h-12 px-6 text-sm gap-2 rounded-full",
  lg: "h-14 px-8 text-base gap-2.5 rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={`
          inline-flex items-center justify-center
          font-medium tracking-[-0.01em]
          transition-all duration-200 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077ED] focus-visible:ring-offset-2
          disabled:opacity-50 disabled:pointer-events-none
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
