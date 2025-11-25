"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button, Container } from "@/components/ui";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[#faf9f7] pt-32 pb-0 overflow-hidden" id="pricing" ref={ref}>
      <Container>
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#0c0c0c] leading-[1.05] mb-6">
            Ready to transform your
            <br />
            engineering workflow?
          </h2>
          <p className="text-lg text-[#4a4a4a] mb-10">
            Free to start. Connect your first repo and see what Kool finds.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg">
              Request a demo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button variant="secondary" size="lg">
              Explore products
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Ocean depth gradient transition to footer */}
      <div 
        className="h-[400px] mt-12"
        style={{
          background: "linear-gradient(to bottom, #faf9f7 0%, #76B3E4 25%, #385EAC 50%, #00194C 75%, #000000 100%)"
        }}
      />
    </section>
  );
}
