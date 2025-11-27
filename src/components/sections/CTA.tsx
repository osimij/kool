"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button, Container } from "@/components/ui";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[#faf9f7] min-h-[320px] sm:min-h-[380px] md:min-h-[460px] flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24" id="pricing" ref={ref}>
      <Container className="flex items-center justify-center">
        <motion.div
          className="text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title + Subtitle group */}
          <div className="mb-6 sm:mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#0c0c0c] leading-[1.1] tracking-tight mb-2 sm:mb-3">
              Seriously, just try it.
            </h2>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-[#5a5a5a] max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Takes 2 minutes to set up. You&apos;ll wonder how you shipped without it.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <Button size="md" className="w-full sm:w-auto">
              Start Free Trial
            </Button>
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              Book a Demo
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
