"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";

interface KoolLogoProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

export function KoolLogo({ 
  className = "", 
  size = 32, 
  color = "currentColor",
  animated = true 
}: KoolLogoProps) {
  const [animationKey, setAnimationKey] = useState(0);
  
  const handleMouseEnter = useCallback(() => {
    if (animated) {
      // Increment key to force re-render and restart animation
      setAnimationKey(prev => prev + 1);
    }
  }, [animated]);

  return (
    <svg 
      viewBox="0 0 100 55" 
      width={size} 
      height={size * 0.55}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kool logo"
      onMouseEnter={handleMouseEnter}
      style={{ cursor: animated ? 'pointer' : 'default' }}
    >
      <path
        key={animationKey}
        d="M2.5 28C3.5 12.5 23 2.5 52.5 2.5C74.5 2.5 97.5 13.5 97.5 28.5C97.5 40.5 80 52 57 52C32 52 12 43.5 12.5 30.5C12.5 23.5 27 12.5 49 12.5C65.5 12.5 77 15 84 25C86.5 32.5 77.5 38.5 60.5 38.5C47.5 38.5 32.5 37 35 28.5C37 23.5 46 22 54.5 24"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animated ? "kool-spiral-animated" : ""}
      />
    </svg>
  );
}

// Alternative version with Framer Motion animation for more control
export function KoolLogoMotion({ 
  className = "", 
  size = 32, 
  color = "currentColor",
  loop = true,
}: Omit<KoolLogoProps, 'animated'> & { loop?: boolean }) {
  return (
    <svg 
      viewBox="0 0 100 55" 
      width={size} 
      height={size * 0.55}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kool logo"
    >
      <motion.path
        d="M2.5 28C3.5 12.5 23 2.5 52.5 2.5C74.5 2.5 97.5 13.5 97.5 28.5C97.5 40.5 80 52 57 52C32 52 12 43.5 12.5 30.5C12.5 23.5 27 12.5 49 12.5C65.5 12.5 77 15 84 25C86.5 32.5 77.5 38.5 60.5 38.5C47.5 38.5 32.5 37 35 28.5C37 23.5 46 22 54.5 24"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
          repeat: loop ? Infinity : 0,
          times: [0, 0.4, 0.6, 1],
        }}
      />
    </svg>
  );
}

