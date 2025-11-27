"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best builders were using Kool.",
    name: "Diana Hu",
    role: "General Partner, Y Combinator",
    color: "#E87B35",
  },
  {
    quote: "The most useful AI tool that I currently pay for, hands down, is Kool. It's fast, autocompletes when and where you need it to, handles brackets properly.",
    name: "shadcn",
    role: "Creator of shadcn/ui",
    color: "#EC4899",
  },
  {
    quote: "The best LLM applications have an autonomy slider: you control how much independence to give the AI. In Kool, you can do Tab completion or let it rip.",
    name: "Andrej Karpathy",
    role: "CEO, Eureka Labs",
    color: "#8B5CF6",
  },
  {
    quote: "Kool quickly grew from hundreds to thousands of extremely enthusiastic Stripe employees. Significant economic outcomes when making that process more efficient.",
    name: "Patrick Collison",
    role: "Co-Founder & CEO, Stripe",
    color: "#10B981",
  },
  {
    quote: "It's official. I hate vibe coding. I love Kool tab coding. It's wild how much faster I ship now.",
    name: "ThePrimeagen",
    role: "@ThePrimeagen",
    color: "#3B82F6",
  },
  {
    quote: "It's definitely becoming more fun to be a programmer. It's less about digging through pages and more about what you want to happen.",
    name: "Greg Brockman",
    role: "President, OpenAI",
    color: "#F59E0B",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div 
      className="relative p-3 sm:p-4 rounded-lg border border-black/[0.08] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Quote */}
      <p className="text-[12px] sm:text-[13px] leading-[1.5] sm:leading-[1.6] text-black/80 dark:text-white/90 flex-1">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-2 sm:gap-2.5 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-black/5 dark:border-white/5">
        <div 
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shrink-0"
          style={{ backgroundColor: testimonial.color }}
        />
        <div className="min-w-0">
          <div className="text-[11px] sm:text-[12px] font-medium text-black dark:text-white truncate">
            {testimonial.name}
          </div>
          <div className="text-[10px] sm:text-[11px] text-black/50 dark:text-white/50 truncate">
            {testimonial.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#faf9f7] dark:bg-[#0c0c0c] overflow-hidden" ref={ref}>
      <Container>
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-stretch">
          
          {/* Left Column: Title at top + Stats grid at bottom */}
          <motion.div
            className="flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Header - at top */}
            <div>
              <h2 className="font-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-black dark:text-white leading-[1.1] mb-3 sm:mb-4">
                Engineers ship<br />faster with Kool
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-black/60 dark:text-white/60 max-w-md">
                Join thousands of engineers who've stopped searching and started building.
              </p>
            </div>

            {/* Stats grid - 2x2 */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-8 lg:mt-12 max-w-full lg:max-w-[90%]">
              <div className="p-3 sm:p-4 rounded-lg border border-black/[0.08] dark:border-[#2a2a2a]">
                <div className="font-display text-xl sm:text-2xl text-black dark:text-white tabular-nums">2M+</div>
                <div className="text-xs sm:text-sm text-black/50 dark:text-white/50 mt-0.5 sm:mt-1">Queries daily</div>
              </div>
              <div className="p-3 sm:p-4 rounded-lg border border-black/[0.08] dark:border-[#2a2a2a]">
                <div className="font-display text-xl sm:text-2xl text-black dark:text-white tabular-nums">47%</div>
                <div className="text-xs sm:text-sm text-black/50 dark:text-white/50 mt-0.5 sm:mt-1">Faster debugging</div>
              </div>
              <div className="p-3 sm:p-4 rounded-lg border border-black/[0.08] dark:border-[#2a2a2a]">
                <div className="font-display text-xl sm:text-2xl text-black dark:text-white tabular-nums">12x</div>
                <div className="text-xs sm:text-sm text-black/50 dark:text-white/50 mt-0.5 sm:mt-1">Faster onboarding</div>
              </div>
              <div className="p-3 sm:p-4 rounded-lg border border-black/[0.08] dark:border-[#2a2a2a]">
                <div className="font-display text-xl sm:text-2xl text-black dark:text-white tabular-nums">99.9%</div>
                <div className="text-xs sm:text-sm text-black/50 dark:text-white/50 mt-0.5 sm:mt-1">Uptime SLA</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Testimonial cards - 1 col on mobile, 2 cols on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-4 lg:mt-0">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard 
                key={testimonial.name} 
                testimonial={testimonial} 
                index={i}
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

