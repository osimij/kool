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

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <KoolLogo size={36} color="#ffffff" animated={true} />
              <span className="text-lg font-semibold">kool</span>
            </div>
            <p className="text-[#0077ED] text-sm font-medium mb-2">AI moves fast</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              We&apos;ll keep you up to date with the latest.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-1">
                {category}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}
