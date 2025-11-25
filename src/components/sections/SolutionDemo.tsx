"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui";

const useCases = [
  {
    icon: "🔍",
    title: "Debug faster",
    description: "Find the root cause across code, logs, and tickets in seconds instead of hours.",
    color: "from-[#0077ED] to-[#3399FF]",
  },
  {
    icon: "🚀",
    title: "Onboard instantly",
    description: "New engineers get productive in days. All the context, none of the Slack archaeology.",
    color: "from-[#8b5cf6] to-[#a78bfa]",
  },
  {
    icon: "📚",
    title: "Document less",
    description: "Stop writing docs nobody reads. Kool indexes what already exists.",
    color: "from-[#14b8a6] to-[#2dd4bf]",
  },
  {
    icon: "🔗",
    title: "Connect context",
    description: "Link PRs to tickets to docs automatically. No more \"where was that decision made?\"",
    color: "from-[#f5a623] to-[#f7b955]",
  },
];

export function SolutionDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative bg-[#faf9f7] overflow-hidden" id="product">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#0077ED]/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-r from-[#8b5cf6]/10 to-transparent rounded-full blur-3xl" />

      <Container>
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-[#14b8a6]/10 text-[#14b8a6] text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            Use cases
          </motion.span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-[#0c0c0c] leading-[0.95]">
            Built for how
            <br />
            engineers work
          </h2>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              className="group relative p-8 rounded-3xl bg-white border border-[#0c0c0c]/5 hover:border-[#0c0c0c]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-elevated"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                {useCase.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#0c0c0c] mb-3">{useCase.title}</h3>
              <p className="text-[#4a4a4a] leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Demo video card */}
        <motion.div
          className="relative rounded-[2.5rem] overflow-hidden shadow-elevated"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d5a4a] via-[#4a7c59] to-[#7a9e7a]" />
          
          {/* Overlay pattern */}
          <div 
            className="absolute inset-0 opacity-10"
              style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
          
          {/* Content */}
          <div className="relative p-8 sm:p-12 md:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left text */}
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm mb-6">
                  Watch it in action
                </span>
                <h3 className="font-display text-4xl sm:text-5xl text-white mb-6 leading-tight">
                  See how Kool finds answers in seconds
                </h3>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  Watch how engineering teams use Kool to debug faster, onboard instantly, and ship with confidence.
                </p>
                <motion.button 
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white text-[#0c0c0c] font-medium shadow-elevated hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#0077ED] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  Watch 2-min demo
                </motion.button>
                </div>

              {/* Right - Video thumbnail placeholder */}
                <div className="relative">
                <motion.div 
                  className="relative rounded-2xl overflow-hidden bg-[#0c0c0c] shadow-2xl aspect-video"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Fake video UI */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </motion.div>
                      <p className="text-white/60 text-sm">Click to play</p>
                          </div>
                        </div>

                  {/* Fake video progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#0077ED]"
                        initial={{ width: "0%" }}
                        animate={isInView ? { width: "35%" } : {}}
                        transition={{ delay: 1, duration: 2 }}
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating decorative elements */}
                <motion.div 
                  className="absolute -top-6 -right-6 w-16 h-16 rounded-xl bg-[#0077ED] shadow-glow-accent"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-12 h-12 rounded-lg bg-white shadow-lg"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
        </Container>
    </section>
  );
}
