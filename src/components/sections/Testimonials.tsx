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

// Marquee testimonials for the scrolling effect - split into rows
const marqueeRow1 = [
  "Reduced our debugging time by 60%",
  "Like having Google for your codebase",
  "Finally found that config change from 6 months ago",
  "New engineers are productive day one",
];

const marqueeRow2 = [
  "Worth 10x what we pay for it",
  "Should have built this ourselves... glad we didn't have to",
  "The search actually understands context",
  "Saved us during a critical outage",
];

const marqueeRow3 = [
  "Cut onboarding time in half",
  "No more digging through Slack threads",
  "Feels like having a senior dev on call",
  "The context awareness is incredible",
];

const marqueeRow4 = [
  "Game changer for code reviews",
  "Found a 2-year-old bug in minutes",
  "Our entire team switched in a week",
  "Best dev tool purchase this year",
];

function MarqueeRow({ items, direction = "left", duration = 45 }: { items: string[]; direction?: "left" | "right"; duration?: number }) {
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  
  // Create two identical sets for seamless looping (animation translates -50%)
  const duplicatedItems = [...items, ...items];
  
  return (
    <div className="relative overflow-hidden py-2">
      {/* Tight gradient fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-[#faf9f7] to-transparent dark:from-[#0c0c0c] dark:to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-[#faf9f7] to-transparent dark:from-[#0c0c0c] dark:to-transparent" />
      
      <div 
        className={`flex gap-4 whitespace-nowrap ${animationClass}`}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {/* Duplicate items 2x for seamless loop with -50% translation */}
        {duplicatedItems.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/[0.06] dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.06] text-[13px] text-black/70 dark:text-white/70 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] dark:bg-[#0077ED]" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div 
      className="relative p-4 rounded-lg border border-black/[0.08] dark:border-[#2a2a2a] bg-white dark:bg-[#141414] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Quote */}
      <p className="text-[13px] leading-[1.6] text-black/80 dark:text-white/90 flex-1">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-black/5 dark:border-white/5">
        <div 
          className="w-7 h-7 rounded-full shrink-0"
          style={{ backgroundColor: testimonial.color }}
        />
        <div className="min-w-0">
          <div className="text-[12px] font-medium text-black dark:text-white truncate">
            {testimonial.name}
          </div>
          <div className="text-[11px] text-black/50 dark:text-white/50 truncate">
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
    <section className="min-h-screen py-24 bg-[#faf9f7] dark:bg-[#0c0c0c] overflow-hidden flex items-center" ref={ref}>
      <Container>
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch min-h-[70vh]">
          
          {/* Left Column: Title at top + Marquee rows at bottom */}
          <motion.div
            className="flex flex-col justify-between h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Header - at top */}
            <div>
              <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[48px] text-black dark:text-white leading-[1.1] mb-4">
                Engineers ship<br />faster with Kool
              </h2>
              <p className="text-base lg:text-lg text-black/60 dark:text-white/60 max-w-md">
                Join thousands of engineers who've stopped searching and started building.
              </p>
            </div>

            {/* Marquee rows - at bottom */}
            <div className="space-y-1 mt-12 w-[80%]">
              <MarqueeRow items={marqueeRow1} direction="left" duration={25} />
              <MarqueeRow items={marqueeRow2} direction="right" duration={28} />
              <MarqueeRow items={marqueeRow3} direction="left" duration={23} />
              <MarqueeRow items={marqueeRow4} direction="right" duration={26} />
            </div>
          </motion.div>

          {/* Right Column: Testimonial cards - 2 per row, 3 rows */}
          <div className="grid grid-cols-2 gap-3 auto-rows-fr">
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

