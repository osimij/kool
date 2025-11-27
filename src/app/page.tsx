"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Navigation,
  Hero,
  PainPoints,
  Features,
  Integrations,
  Testimonials,
  CTA,
  Footer,
} from "@/components/sections";
import { REVEAL_DELAY, REVEAL_DURATION } from "@/components/animations/IntroAnimation";

export default function Home() {
  // Lock scroll during intro animation, unlock when typing finishes
  useEffect(() => {
    // Lock scroll immediately
    document.body.style.overflow = "hidden";
    
    // Unlock scroll when intro animation completes (REVEAL_DELAY)
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, REVEAL_DELAY * 1000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#faf9f7] dark:bg-[#0c0c0c]">
      <Navigation />
      <Hero />
      {/* All sections below appear after the intro typing animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: REVEAL_DELAY, duration: REVEAL_DURATION, ease: "easeOut" }}
      >
        <PainPoints />
        <Features />
        <Integrations />
        <Testimonials />
        <CTA />
        <Footer />
      </motion.div>
    </main>
  );
}
