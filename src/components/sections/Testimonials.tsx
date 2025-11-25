"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui";

const testimonials = [
  {
    quote: "I stopped interrupting my teammates with 'where is that thing' questions. Kool just knows. It's like having a senior engineer who's read every doc and every PR.",
    author: "Sarah Chen",
    role: "Staff Engineer",
    company: "Stripe",
    avatar: "SC",
    gradient: "from-[#0077ED] to-[#3399FF]",
  },
  {
    quote: "New engineers get productive in days, not weeks. The onboarding time difference is absolutely real—we've cut it by 60%.",
    author: "Marcus Williams",
    role: "Engineering Manager",
    company: "Linear",
    avatar: "MW",
    gradient: "from-[#8b5cf6] to-[#a78bfa]",
  },
  {
    quote: "Found a production bug root cause in under a minute. Context was across GitHub, Linear, and our internal wiki. Would've taken an hour manually.",
    author: "Alex Rivera",
    role: "SRE Lead",
    company: "Vercel",
    avatar: "AR",
    gradient: "from-[#14b8a6] to-[#2dd4bf]",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative bg-[#0c0c0c] overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0077ED]/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
      
      <Container>
        <motion.div 
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            Testimonials
          </motion.span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[0.95]">
            Loved by
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077ED] via-[#3399FF] to-[#60a5fa]">
              engineering teams
            </span>
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-6xl font-display text-white/5 leading-none">
                &ldquo;
              </div>
              
              <div className="relative">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-white/90 leading-relaxed mb-8 text-lg">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-white/50 text-sm">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          {[
            { value: "10k+", label: "Engineers" },
            { value: "500+", label: "Companies" },
            { value: "2M+", label: "Questions answered" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl sm:text-5xl text-white mb-2">{stat.value}</div>
              <div className="text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
