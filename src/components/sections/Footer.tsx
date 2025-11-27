"use client";

import { Container, KoolLogo } from "@/components/ui";

const footerLinks = {
  Products: [
    { label: "North", href: "#" },
    { label: "Compass", href: "#" },
  ],
  Solutions: [
    { label: "Technology", href: "#" },
    { label: "Energy and Utilities", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Developers", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
  ],
};

interface FooterProps {
  variant?: "linear" | "classic-light" | "classic-dark";
}

export function Footer({ variant = "classic-dark" }: FooterProps) {
  const isDark = variant === "classic-dark" || variant === "linear";

  const getBackground = () => {
    switch (variant) {
      case "linear":
        return "linear-gradient(0deg, #00041B 0%, #00194C 17.59%, #385EAC 38.22%, #77B9FF 62.99%, #FFFFFF  85.5%)";
      case "classic-light":
        return "#f5f3ef";
      case "classic-dark":
        return "#0c0c0c";
    }
  };

  return (
    <footer 
      className={`py-8 sm:py-10 md:py-12 ${isDark ? "text-white" : "text-black"}`}
      style={{ background: getBackground() }}
    >
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-semibold">Kool</span>
            </div>
            <p className={`text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDark ? "text-white" : "text-black"}`}>
              AI moves fast
            </p>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-xs ${isDark ? "text-white/50" : "text-black/50"}`}>
              We&apos;ll keep you up to date with the latest.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className={`text-xs sm:text-sm font-medium mb-2 sm:mb-4 ${
                isDark ? "text-white" : "text-black"
              }`}>
                {category}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className={`text-xs sm:text-sm transition-colors ${
                        isDark 
                          ? "text-white/50 hover:text-white" 
                          : "text-black/50 hover:text-black"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row: Certifications left, Social links right */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 sm:mt-10 pt-4 sm:pt-6 border-t ${
          isDark ? "border-white/10" : "border-black/10"
        }`}>
          {/* Certifications */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span className={`text-[10px] sm:text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>SOC 2 Type II</span>
            <span className={`hidden sm:inline ${isDark ? "text-white/20" : "text-black/20"}`}>•</span>
            <span className={`text-[10px] sm:text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>GDPR Compliant</span>
            <span className={`hidden sm:inline ${isDark ? "text-white/20" : "text-black/20"}`}>•</span>
            <span className={`text-[10px] sm:text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>E2E Encrypted</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href="#" 
              className={`transition-colors ${
                isDark ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"
              }`} 
              aria-label="Twitter/X"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href="#" 
              className={`transition-colors ${
                isDark ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"
              }`} 
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a 
              href="#" 
              className={`transition-colors ${
                isDark ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"
              }`} 
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
