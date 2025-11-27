"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Container, KoolLogo } from "@/components/ui";
import { REVEAL_DELAY, REVEAL_DURATION } from "@/components/animations/IntroAnimation";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect system color scheme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Determine text colors based on scroll state and color scheme
  const logoColor = isScrolled 
    ? "var(--color-text-primary)" 
    : isDark ? "#ffffff" : "#0c0c0c";
  
  const textClass = isScrolled
    ? "text-[var(--color-text-primary)]"
    : isDark ? "text-white" : "text-[#0c0c0c]";
  
  const linkClass = isScrolled
    ? "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
    : isDark ? "text-white/60 hover:text-white" : "text-[#0c0c0c]/60 hover:text-[#0c0c0c]";

  return (
    <>
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-[background-color,border-color,backdrop-filter] duration-300
          ${isScrolled 
            ? "bg-[var(--color-nav-bg)] backdrop-blur-xl border-b border-[var(--color-nav-border)]" 
            : "bg-transparent"
          }
        `}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: REVEAL_DELAY, duration: REVEAL_DURATION, ease: "easeOut" }}
      >
        <Container>
          <nav className="flex items-center h-14 sm:h-16">
            {/* Logo - flex-1 to balance with right side */}
            <div className="flex-1 flex items-center">
              <a href="#" className="flex items-center gap-1.5 sm:gap-2" aria-label="Kool home">
                <KoolLogo 
                  size={32} 
                  color={logoColor} 
                  animated={true}
                />
                <span className={`text-base sm:text-lg font-semibold tracking-tight transition-colors ${textClass}`}>
                  Kool
                </span>
              </a>
            </div>

            {/* Center Links - truly centered */}
            <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm transition-colors ${linkClass}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right CTAs - flex-1 to balance with left side */}
            <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
              <a
                href="#"
                className={`hidden sm:block text-sm transition-colors ${linkClass}`}
              >
                Sign in
              </a>
              <Button size="sm" className="hidden xs:inline-flex text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-9">
                Get started
              </Button>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center -mr-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className={`w-5 h-5 ${textClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-bg-primary)] pt-16 sm:pt-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Container>
              <div className="space-y-1 py-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="block px-2 sm:px-4 py-3 sm:py-4 text-lg sm:text-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-b border-[var(--color-border)]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                {/* Sign in link on mobile */}
                <motion.a
                  href="#"
                  className="block px-2 sm:px-4 py-3 sm:py-4 text-lg sm:text-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-b border-[var(--color-border)]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </motion.a>
                {/* Get started CTA */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 }}
                >
                  <Button size="md" className="w-full">
                    Get started
                  </Button>
                </motion.div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
