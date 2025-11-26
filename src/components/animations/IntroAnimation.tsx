"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface IntroContextType {
  phase: "cursor" | "typing" | "revealing" | "done";
  showContent: boolean;
}

const IntroContext = createContext<IntroContextType>({
  phase: "cursor",
  showContent: false,
});

export const useIntro = () => useContext(IntroContext);

interface IntroAnimationProps {
  children: React.ReactNode;
}

export function IntroAnimation({ children }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"cursor" | "typing" | "revealing" | "done">("cursor");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Phase 1: Flickering cursor for 1.5 seconds
    const cursorTimer = setTimeout(() => {
      setPhase("typing");
    }, 1500);

    return () => clearTimeout(cursorTimer);
  }, []);

  useEffect(() => {
    if (phase === "revealing") {
      setShowContent(true);
      const doneTimer = setTimeout(() => {
        setPhase("done");
      }, 800);
      return () => clearTimeout(doneTimer);
    }
  }, [phase]);

  // Expose setPhase for Hero to call when typing is done
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as Window & { __introSetPhase?: (phase: "cursor" | "typing" | "revealing" | "done") => void }).__introSetPhase = setPhase;
    }
  }, []);

  return (
    <IntroContext.Provider value={{ phase, showContent }}>
      {children}
    </IntroContext.Provider>
  );
}

// Wrapper for content that should be hidden during intro
export function IntroReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { showContent, phase } = useIntro();
  
  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: showContent ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
