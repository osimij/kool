"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui";

const problems = [
  {
    number: "01",
    title: "Context switching kills flow",
    description: "You've got Jira, GitHub, Slack, Notion open—and still can't find where that decision was documented.",
    stat: { value: "23", unit: "min", label: "to refocus per switch" },
    bgColor: "#4a6741",
    visual: (
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
        {/* Diagonal cascade of browser windows */}
        {[
          { name: "Jira", url: "jira.atlassian.com/browse/ENG-4521" },
          { name: "GitHub", url: "github.com/acme/api/pull/847" },
          { name: "Slack", url: "app.slack.com/client/T0293..." },
          { name: "Notion", url: "notion.so/Engineering-Wiki" },
          { name: "Linear", url: "linear.app/acme/issue/ACM-312" },
          { name: "Figma", url: "figma.com/file/design-system" },
        ].map((tab, i) => (
          <motion.div
            key={tab.name}
            className="absolute w-32 sm:w-36 md:w-44 rounded-lg overflow-hidden bg-white"
            style={{
              left: `${8 + i * 22}px`,
              top: `${-4 + i * 20}px`,
              zIndex: i,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 sm:py-1.5 bg-[#f8f8f8] border-b border-black/5">
              <div className="flex gap-0.5 sm:gap-1">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ff5f57]" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#febc2e]" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-0.5 sm:ml-1 text-[5px] sm:text-[6px] md:text-[7px] text-[#888] truncate flex-1">{tab.url}</span>
            </div>
            {/* Window content */}
            <div className="p-1.5 sm:p-2 h-10 sm:h-12 md:h-14 space-y-1 sm:space-y-1.5">
              <div className="h-1 sm:h-1.5 bg-[#eee] rounded-full w-full" />
              <div className="h-1 sm:h-1.5 bg-[#eee] rounded-full w-4/5" />
              <div className="h-1 sm:h-1.5 bg-[#eee] rounded-full w-3/5" />
            </div>
          </motion.div>
        ))}
        
      </div>
    ),
  },
  {
    number: "02",
    title: "Knowledge walks out the door",
    description: "The answer is in Slack, the wiki, or Mike's head. But Mike left 6 months ago.",
    stat: { value: "40", unit: "%", label: "duplicate work" },
    bgColor: "#c9c4b8",
    visual: (
      <div className="relative h-40 sm:h-48 md:h-56 flex items-center justify-center">
        {/* Search box */}
        <div className="w-44 sm:w-48 md:w-52 rounded-lg bg-white shadow-xl overflow-hidden">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 border-b border-black/5">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[8px] sm:text-[9px] text-[#333]">"auth refresh flow"</span>
          </div>
          <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
            {[
              { source: "Slack", note: "47 threads" },
              { source: "Docs", note: "2 years old" },
              { source: "Code", note: "// ask Mike" },
            ].map((item) => (
              <div key={item.source} className="flex items-center justify-between text-[7px] sm:text-[8px]">
                <span className="px-1 sm:px-1.5 py-0.5 rounded bg-[#f0f0f0] text-[#666] font-medium">{item.source}</span>
                <span className="text-[#999]">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mike badge */}
        <motion.div
          className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-[#1a1a1a] text-white text-[7px] sm:text-[8px] font-medium shadow-lg"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Mike left 6mo ago
        </motion.div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Incidents become chaos",
    description: "Production is down. Slack is blowing up. No one remembers what changed.",
    stat: { value: "2", unit: "x", label: "slower resolution" },
    bgColor: "#1a1a1a",
    textLight: true,
    visual: (
      <div className="relative h-40 sm:h-48 md:h-56 p-2 sm:p-3">
        {/* Terminal */}
        <div className="h-full rounded-lg bg-[#0a0a0a] border border-white/10 overflow-hidden">
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-[#141414] border-b border-white/5">
            <div className="flex gap-0.5 sm:gap-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff5f57]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#febc2e]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-1 sm:ml-1.5 text-[7px] sm:text-[8px] text-white/30 font-mono">prod-api</span>
          </div>
          <div className="p-2 sm:p-2.5 font-mono text-[7px] sm:text-[8px] leading-relaxed">
            <div className="text-green-400/80">INFO  Service ready</div>
            <div className="text-yellow-400/80">WARN  Latency: 2340ms</div>
            <motion.div
              className="text-red-400"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              ERR   Connection timeout
            </motion.div>
            <div className="text-red-400/50">      at checkout:142</div>
            <div className="mt-1 sm:mt-1.5 text-white/40">$ git log --oneline</div>
            <div className="text-white/30">a3f2c1b bump timeouts</div>
          </div>
        </div>
        
      </div>
    ),
  },
];

export function PainPoints() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-[#faf9f7]" id="problems">
      <Container>
        <motion.div
          ref={ref}
          className="max-w-xl mb-8 sm:mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C25D10] font-medium">
            Sound familiar?
          </span>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-[#0c0c0c] leading-[1.1] tracking-tight">
            The information exists.
            <br />
            <span className="text-[#999]">Finding it is the problem.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {problems.map((problem, index) => (
            <motion.article
              key={problem.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="h-full flex flex-col rounded-lg overflow-hidden bg-white border border-[#e5e5e5]">
                {/* Visual */}
                <div 
                  className="relative overflow-hidden"
                  style={{ backgroundColor: problem.bgColor }}
                >
                  {problem.visual}
                </div>
                
                {/* Content */}
                <div className="flex-1 p-3 sm:p-4 md:p-5">
                  <h3 className="text-base sm:text-lg font-medium text-[#0c0c0c] leading-snug">
                    {problem.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] text-[#666] leading-relaxed">
                    {problem.description}
                  </p>
                </div>
                
                {/* Stat */}
                <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 border-t border-[#eee] flex items-baseline justify-between">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xl sm:text-2xl font-display text-[#0c0c0c]">{problem.stat.value}</span>
                    <span className="text-sm sm:text-base text-[#999]">{problem.stat.unit}</span>
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-[#aaa] uppercase tracking-wider">{problem.stat.label}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
