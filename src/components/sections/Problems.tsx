"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container, Button } from "@/components/ui";

export function Problems() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  return (
    <section className="py-32 relative overflow-hidden" id="newsletter">
      {/* Beautiful flowing gradient background */}
      <div className="absolute inset-0 bg-[#faf9f7]" />
      
      {/* Animated gradient waves */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -bottom-1/2 left-0 right-0 h-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <svg 
            viewBox="0 0 1440 800" 
            className="absolute bottom-0 w-full h-full" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0077ED" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <motion.path 
              d="M0,400 C300,300 600,500 900,400 C1200,300 1350,450 1440,400 L1440,800 L0,800 Z" 
              fill="url(#waveGrad1)"
              animate={{ 
                d: [
                  "M0,400 C300,300 600,500 900,400 C1200,300 1350,450 1440,400 L1440,800 L0,800 Z",
                  "M0,420 C300,320 600,480 900,420 C1200,320 1350,470 1440,420 L1440,800 L0,800 Z",
                  "M0,400 C300,300 600,500 900,400 C1200,300 1350,450 1440,400 L1440,800 L0,800 Z"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path 
              d="M0,500 C400,400 800,600 1100,500 C1300,420 1380,550 1440,500 L1440,800 L0,800 Z" 
              fill="url(#waveGrad2)"
              animate={{ 
                d: [
                  "M0,500 C400,400 800,600 1100,500 C1300,420 1380,550 1440,500 L1440,800 L0,800 Z",
                  "M0,520 C400,420 800,580 1100,520 C1300,440 1380,570 1440,520 L1440,800 L0,800 Z",
                  "M0,500 C400,400 800,600 1100,500 C1300,420 1380,550 1440,500 L1440,800 L0,800 Z"
                ]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </motion.div>
      </div>
      
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-[#0077ED] text-white text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            Stay updated
          </motion.span>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#0c0c0c] leading-[0.95] mb-6">
            AI moves fast.
            <br />
            We&apos;ll keep you updated.
          </h2>
          
          <p className="text-lg text-[#4a4a4a] mb-10 max-w-lg mx-auto">
            Get monthly insights on AI for engineering teams, product updates, and tips from power users.
          </p>
          
          {/* Email signup */}
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="flex gap-3 p-2 rounded-full bg-white shadow-elevated border border-[#0c0c0c]/5">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 bg-transparent outline-none text-[#0c0c0c] placeholder:text-[#7a7a7a]"
              />
              <Button size="sm">
                Subscribe
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
            <p className="mt-4 text-xs text-[#7a7a7a]">
              No spam, unsubscribe anytime. Read our <a href="#" className="underline hover:text-[#0c0c0c]">privacy policy</a>.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
