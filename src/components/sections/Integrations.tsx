"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui";

const integrations = [
  { name: "GitHub", color: "#0c0c0c" },
  { name: "GitLab", color: "#FC6D26" },
  { name: "Jira", color: "#0052CC" },
  { name: "Linear", color: "#5E6AD2" },
  { name: "Notion", color: "#0c0c0c" },
  { name: "Confluence", color: "#0052CC" },
  { name: "Slack", color: "#E01E5A" },
  { name: "Discord", color: "#5865F2" },
];

export function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#0c0c0c] relative overflow-hidden" id="integrations" ref={ref}>
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
            Connects in 60 seconds
          </h2>
          <p className="text-white/50 mb-12">OAuth. No tokens. No config files.</p>
          
          {/* Integration logos as text - minimal */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {integrations.map((integration, i) => (
              <motion.span
                key={integration.name}
                className="text-lg font-medium text-white/30 hover:text-white/70 transition-colors cursor-default"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.05 }}
              >
                {integration.name}
              </motion.span>
            ))}
            <motion.span
              className="text-lg font-medium text-white/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              + more
            </motion.span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
