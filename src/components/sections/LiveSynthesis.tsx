"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui";

// Scenario data
const scenarios = [
  {
    id: "incident",
    label: "Production Incident",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    question: "Why are we seeing 500 errors on the checkout endpoint?",
    thinking: ["Searching payment-service commits...", "Cross-referencing infra configs...", "Analyzing error patterns..."],
    answer: {
      summary: "The issue is a timeout mismatch introduced in payment-service v3.4.2.",
      details: "The recent commit `fix: harden validation` increased processing time to ~3000ms, but the Load Balancer config in `infra/k8s/ingress.yaml` still has a hard timeout of 2000ms.",
      recommendation: "Recommendation: Bump the ingress timeout to 5000ms or revert the validation changes.",
      code: {
        file: "infra/k8s/ingress.yaml",
        before: "timeout: 2000ms",
        after: "timeout: 5000ms",
      },
      sources: [
        { type: "code", label: "payment/service.ts:42", color: "#0077ED" },
        { type: "ticket", label: "PAY-3024", color: "#0052CC" },
        { type: "doc", label: "Infra Runbook", color: "#ffffff" },
      ],
    },
  },
  {
    id: "architecture",
    label: "Architecture Query",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    question: "How does the notification system handle retries?",
    thinking: ["Scanning notification-service...", "Finding retry configurations...", "Tracing message flow..."],
    answer: {
      summary: "Notifications use an exponential backoff strategy with dead-letter queues.",
      details: "Failed notifications are retried 3 times with delays of 1s, 5s, and 30s. After exhausting retries, messages are moved to a DLQ for manual review. The retry logic lives in `NotificationWorker.processMessage()`.",
      recommendation: "The DLQ is monitored via PagerDuty alert #notify-dlq-depth.",
      code: {
        file: "services/notification/worker.ts",
        before: "// Retry config",
        after: "maxRetries: 3, backoff: [1000, 5000, 30000]",
      },
      sources: [
        { type: "code", label: "notification/worker.ts", color: "#0077ED" },
        { type: "doc", label: "Architecture ADR-024", color: "#ffffff" },
        { type: "slack", label: "#platform-arch", color: "#E01E5A" },
      ],
    },
  },
  {
    id: "onboarding",
    label: "Onboarding Help",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    question: "How do I add a new status to the Order model?",
    thinking: ["Finding Order model definition...", "Checking migration patterns...", "Looking for status enums..."],
    answer: {
      summary: "Adding a new Order status requires 4 steps across 3 files.",
      details: "1. Add to OrderStatus enum in `models/order.ts`\n2. Create a migration in `db/migrations/`\n3. Update the state machine in `services/order/stateMachine.ts`\n4. Add UI handling in `components/OrderBadge.tsx`",
      recommendation: "See PR #634 for the last time we added 'REFUNDED' status—good reference.",
      code: {
        file: "models/order.ts",
        before: "type OrderStatus = 'pending' | 'paid'",
        after: "type OrderStatus = 'pending' | 'paid' | 'new_status'",
      },
      sources: [
        { type: "code", label: "models/order.ts", color: "#0077ED" },
        { type: "pr", label: "PR #634", color: "#28c840" },
        { type: "doc", label: "Dev Onboarding", color: "#ffffff" },
      ],
    },
  },
];

// Typing animation component
function TypeWriter({ text, speed = 20, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);
  
  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          className="inline-block w-0.5 h-4 bg-[#0077ED] ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
      )}
    </>
  );
}

// Thinking animation
function ThinkingState({ steps, onComplete }: { steps: string[]; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length, onComplete]);
  
  return (
    <div className="space-y-2">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2 text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: i <= currentStep ? 1 : 0.3, 
            x: 0 
          }}
          transition={{ delay: i * 0.1 }}
        >
          {i < currentStep ? (
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : i === currentStep ? (
            <motion.div
              className="w-4 h-4 rounded-full border-2 border-[#0077ED] border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <div className="w-4 h-4 rounded-full border border-white/20" />
          )}
          <span className={i <= currentStep ? "text-white/70" : "text-white/30"}>{step}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Answer display component
function AnswerDisplay({ answer, isVisible }: { answer: typeof scenarios[0]["answer"]; isVisible: boolean }) {
  const [showCode, setShowCode] = useState(false);
  const [showSources, setShowSources] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      const codeTimer = setTimeout(() => setShowCode(true), 1500);
      const sourceTimer = setTimeout(() => setShowSources(true), 2200);
      return () => {
        clearTimeout(codeTimer);
        clearTimeout(sourceTimer);
      };
    } else {
      setShowCode(false);
      setShowSources(false);
    }
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Summary */}
      <p className="text-white/90 leading-relaxed">
        <TypeWriter text={answer.summary} speed={15} />
      </p>
      
      {/* Details */}
      <motion.div
        className="text-sm text-white/60 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {answer.details}
      </motion.div>
      
      {/* Code suggestion */}
      <AnimatePresence>
        {showCode && (
          <motion.div
            className="rounded-lg bg-[#0a0a0a] border border-white/[0.06] overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center justify-between px-3 py-2 bg-white/[0.02] border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/40">{answer.code.file}</span>
              <button className="text-xs text-[#0077ED] hover:text-[#3399FF] transition-colors">
                Apply fix →
              </button>
            </div>
            <div className="p-3 font-mono text-xs space-y-1">
              <div className="flex">
                <span className="text-red-400/70 select-none mr-2">-</span>
                <span className="text-red-400/70">{answer.code.before}</span>
              </div>
              <div className="flex">
                <span className="text-green-400/70 select-none mr-2">+</span>
                <span className="text-green-400/70">{answer.code.after}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Recommendation */}
      <motion.p
        className="text-sm text-[#0077ED]/80 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: showCode ? 1 : 0 }}
        transition={{ delay: 0.3 }}
      >
        💡 {answer.recommendation}
      </motion.p>
      
      {/* Sources */}
      <AnimatePresence>
        {showSources && (
          <motion.div
            className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs text-white/30">Sources:</span>
            {answer.sources.map((source, i) => (
              <motion.span
                key={source.label}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-white/60 hover:bg-white/[0.08] transition-colors cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                {source.label}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function LiveSynthesis() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeScenario, setActiveScenario] = useState(0);
  const [phase, setPhase] = useState<"idle" | "thinking" | "answering">("idle");
  
  const currentScenario = scenarios[activeScenario];
  
  // Auto-cycle through scenarios
  useEffect(() => {
    if (!isInView) return;
    
    // Start thinking phase
    setPhase("thinking");
    
    return () => {
      setPhase("idle");
    };
  }, [isInView, activeScenario]);
  
  const handleThinkingComplete = () => {
    setPhase("answering");
  };
  
  const handleScenarioChange = (index: number) => {
    if (index === activeScenario) return;
    setPhase("idle");
    setActiveScenario(index);
    // Small delay before starting new scenario
    setTimeout(() => setPhase("thinking"), 100);
  };

  return (
    <section className="py-24 bg-[#faf9f7] relative overflow-hidden" ref={ref}>
      <Container>
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0077ED]/10 border border-[#0077ED]/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0077ED] animate-pulse" />
            <span className="text-xs text-[#0077ED] font-medium">Live Synthesis</span>
          </motion.div>
          
          <h2 className="font-display text-[32px] sm:text-[40px] md:text-[48px] text-[#0c0c0c] leading-[1.1] mb-4">
            Answers, not links.
          </h2>
          <p className="text-lg text-[#4a4a4a] max-w-2xl">
            Kool doesn't just find files. It reads the docs, checks the tickets, parses the code, and gives you the actual answer.
          </p>
        </motion.div>

        {/* Interactive demo */}
        <motion.div
          className="grid lg:grid-cols-[300px,1fr] gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Scenario selector */}
          <div className="space-y-2">
            <span className="text-xs text-[#7a7a7a] uppercase tracking-wider font-medium">Select scenario</span>
            <div className="space-y-2">
              {scenarios.map((scenario, i) => (
                <motion.button
                  key={scenario.id}
                  onClick={() => handleScenarioChange(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeScenario === i
                      ? "bg-[#0c0c0c] text-white shadow-lg"
                      : "bg-white border border-[#e8e4dc] text-[#4a4a4a] hover:border-[#0077ED]/30 hover:bg-[#f5f3ef]"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeScenario === i ? "bg-[#0077ED]" : "bg-[#f0ebe3]"
                  }`}>
                    {scenario.icon}
                  </div>
                  <span className="font-medium text-sm">{scenario.label}</span>
                  {activeScenario === i && (
                    <motion.div
                      className="ml-auto w-2 h-2 rounded-full bg-[#0077ED]"
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat interface */}
          <div className="rounded-2xl bg-[#0c0c0c] border border-white/[0.06] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/[0.04]">
                <div className="w-4 h-4 rounded bg-[#0077ED] flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">K</span>
                </div>
                <span className="text-xs text-white/40">kool-engine v2.4</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-white/30">ONLINE</span>
              </div>
            </div>

            {/* Chat content */}
            <div className="p-6 min-h-[400px]">
              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`question-${activeScenario}`}
                  className="flex justify-end mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-md bg-[#0077ED] text-white">
                    <p className="text-sm">{currentScenario.question}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* AI Response */}
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#0077ED] to-[#0055AA] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">K</span>
                </div>
                <div className="flex-1 min-w-0">
                  <AnimatePresence mode="wait">
                    {phase === "thinking" && (
                      <motion.div
                        key="thinking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ThinkingState 
                          steps={currentScenario.thinking} 
                          onComplete={handleThinkingComplete}
                        />
                      </motion.div>
                    )}
                    {phase === "answering" && (
                      <motion.div
                        key="answering"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <AnswerDisplay 
                          answer={currentScenario.answer} 
                          isVisible={phase === "answering"}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

