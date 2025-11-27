"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui";

// Company data - these would be real customers
const companies = [
  { name: "Stripe", employees: "8,000+" },
  { name: "Vercel", employees: "500+" },
  { name: "Linear", employees: "80+" },
  { name: "Retool", employees: "400+" },
  { name: "Notion", employees: "500+" },
  { name: "Figma", employees: "1,200+" },
  { name: "Datadog", employees: "5,000+" },
  { name: "Twilio", employees: "7,000+" },
];

// Duplicate for seamless loop
const allCompanies = [...companies, ...companies];

export function CompanyLogos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 bg-[#faf9f7] border-y border-[#e8e4dc] overflow-hidden" ref={ref}>
      <Container>
        <motion.p
          className="text-center text-sm text-[#7a7a7a] mb-8 uppercase tracking-wider font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Trusted by engineering teams at
        </motion.p>
      </Container>
      
      {/* Marquee container */}
      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-[#faf9f7] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-[#faf9f7] to-transparent" />
        
        {/* Scrolling logos */}
        <motion.div
          className="flex gap-12 animate-marquee-left"
          style={{ "--marquee-duration": "40s" } as React.CSSProperties}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {allCompanies.map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex items-center gap-3 shrink-0 group"
            >
              {/* Company logo placeholder - stylized text */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-black/[0.02] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#0c0c0c] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {company.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="text-[#0c0c0c] font-semibold text-base tracking-tight">
                    {company.name}
                  </span>
                  <span className="block text-[10px] text-[#7a7a7a]">
                    {company.employees} engineers
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Stats row */}
      <Container>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="p-5 rounded-xl bg-white border border-black/[0.04]">
            <div className="text-2xl font-semibold text-[#0c0c0c] tabular-nums">2M+</div>
            <div className="text-sm text-[#7a7a7a] mt-1">Queries daily</div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-black/[0.04]">
            <div className="text-2xl font-semibold text-[#0c0c0c] tabular-nums">47%</div>
            <div className="text-sm text-[#7a7a7a] mt-1">Faster debugging</div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-black/[0.04]">
            <div className="text-2xl font-semibold text-[#0c0c0c] tabular-nums">12x</div>
            <div className="text-sm text-[#7a7a7a] mt-1">Faster onboarding</div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-black/[0.04]">
            <div className="text-2xl font-semibold text-[#0c0c0c] tabular-nums">99.9%</div>
            <div className="text-sm text-[#7a7a7a] mt-1">Uptime SLA</div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

