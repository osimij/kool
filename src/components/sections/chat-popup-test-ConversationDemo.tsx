"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui";

// Link icon for source buttons
const LinkIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

// Kool logo for avatar
const KoolAvatar = () => (
  <div className="w-10 h-10 rounded-full bg-[#0077ED] flex items-center justify-center shadow-md">
    <span className="text-white font-bold text-sm">K</span>
  </div>
);

interface ConversationDemoProps {
  isInView?: boolean;
}

export function ConversationDemo({ isInView: isInViewProp }: ConversationDemoProps) {
  const ref = useRef(null);
  const isInViewInternal = useInView(ref, { once: true, margin: "-100px" });
  const isInView = isInViewProp ?? isInViewInternal;

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Soft cream/bone background */}
      <div className="absolute inset-0 bg-[#F5F0EB]" />
      
      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-[24px] sm:text-[28px] md:text-[32px] text-[#0c0c0c] leading-[1.2] mb-3">
              Ask like a human.{" "}
              <span className="text-[#7a7a7a]">Not a search engine.</span>
            </h2>
            <p className="text-base text-[#4a4a4a] leading-relaxed">
              &ldquo;Where&apos;s the retry logic for auth?&rdquo; beats CTRL+F.
              <br />
              Kool understands intent, not just keywords.
            </p>
          </motion.div>

          {/* Conversation thread */}
          <div className="space-y-6">
            {/* Part A: Human Question */}
            <motion.div
              className="flex items-start gap-3 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#e5e0d8] border border-[#d5cfc5]">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                    alt="Jan Dittrich"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>

              {/* Message content */}
              <div className="flex-1">
                <span className="block text-xs text-[#7a7a7a] mb-1.5 font-sans tracking-wide">
                  Jan Dittrich
                </span>
                <div className="bg-white rounded-2xl rounded-tl-md px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e8e4dc]">
                  <p className="text-[15px] text-[#2a2a2a] leading-relaxed font-serif">
                    How can I convince my team to work harder towards their personal goals?
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Part B: Kool Response */}
            <motion.div
              className="flex items-start gap-3 max-w-xl ml-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {/* Kool Avatar */}
              <div className="flex-shrink-0">
                <KoolAvatar />
              </div>

              {/* Response card */}
              <div className="flex-1">
                <span className="block text-xs text-[#7a7a7a] mb-1.5 font-sans tracking-wide">
                  Kool
                </span>
                {/* Kool response card with warm taupe background */}
                <div className="bg-[#EBE5DC] rounded-2xl rounded-tl-md px-5 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#ddd6ca]">
                  {/* Response body */}
                  <p className="text-[15px] text-[#3a3a3a] leading-[1.7] mb-4 font-serif">
                    Jan, inspire through meaning. Remind your team of why they started. 
                    Show them a vision worth chasing, not just targets to hit. Then 
                    empower them to own the journey.
                  </p>

                  {/* Source links */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d8d1c5]/60 text-[#5a5a5a] text-xs font-medium hover:bg-[#d0c8ba] transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LinkIcon />
                      <span>Substack</span>
                    </motion.a>
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d8d1c5]/60 text-[#5a5a5a] text-xs font-medium hover:bg-[#d0c8ba] transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LinkIcon />
                      <span>YouTube</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c0c0c] text-white font-medium rounded-full hover:bg-[#1a1a1a] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try natural search
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default ConversationDemo;

