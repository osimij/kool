"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Container, KoolLogo } from "@/components/ui";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled 
            ? "bg-[#faf9f7]/95 backdrop-blur-xl border-b border-[#0c0c0c]/5" 
            : "bg-transparent"
          }
        `}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Container>
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2" aria-label="Kool home">
              <KoolLogo 
                size={36} 
                color={isScrolled ? "#0c0c0c" : "#ffffff"} 
                animated={true}
              />
              <span className={`text-lg font-semibold tracking-tight transition-colors ${isScrolled ? "text-[#0c0c0c]" : "text-white"}`}>
                kool
              </span>
            </a>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm transition-colors ${isScrolled ? "text-[#4a4a4a] hover:text-[#0c0c0c]" : "text-white/60 hover:text-white"}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className={`hidden sm:block text-sm transition-colors ${isScrolled ? "text-[#4a4a4a] hover:text-[#0c0c0c]" : "text-white/60 hover:text-white"}`}
              >
                Sign in
              </a>
              <Button size="sm">
                Get started
              </Button>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden w-10 h-10 flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className={`w-5 h-5 ${isScrolled ? "text-[#0c0c0c]" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="fixed inset-0 z-40 bg-[#0c0c0c] pt-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Container>
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-4 text-xl text-white/80 hover:text-white border-b border-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
