"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui";
import { useIntro } from "@/components/animations/IntroAnimation";

const questions = [
  "Why are we seeing 500 errors on checkout?",
  "Where's the retry logic for auth?",
  "Who changed the payment timeout last week?",
  "How does our rate limiter work?",
];

// Find the longest question for space reservation
const longestQuestion = questions.reduce((a, b) => a.length > b.length ? a : b);

// Generate pause points for a question (after random groups of 1-3 words)
const generatePausePoints = (text: string): Set<number> => {
  const pausePoints = new Set<number>();
  const words = text.split(" ");
  let charIndex = 0;
  let wordIndex = 0;
  
  while (wordIndex < words.length - 1) {
    // Random burst size: 1-3 words
    const burstSize = 1 + Math.floor(Math.random() * 3);
    
    // Move through this burst of words
    for (let i = 0; i < burstSize && wordIndex < words.length - 1; i++) {
      charIndex += words[wordIndex].length + 1; // word + space
      wordIndex++;
    }
    
    // Add pause point after burst (if not at end)
    if (wordIndex < words.length - 1) {
      pausePoints.add(charIndex);
    }
  }
  
  return pausePoints;
};

type Phase = "intro-cursor" | "intro-typing" | "typing" | "selecting" | "selected";

export function Hero() {
  const { phase: introPhase } = useIntro();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<Phase>("intro-cursor");
  const [introComplete, setIntroComplete] = useState(false);
  const pausePointsRef = useRef<Set<number>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with intro animation phase
  useEffect(() => {
    if (introPhase === "typing" && phase === "intro-cursor") {
      setPhase("intro-typing");
    }
  }, [introPhase, phase]);

  // Generate new pause points when question changes
  useEffect(() => {
    pausePointsRef.current = generatePausePoints(questions[questionIndex]);
  }, [questionIndex]);

  useEffect(() => {
    const question = questions[questionIndex];
    
    if (phase === "intro-cursor") {
      // Just show blinking cursor, wait for intro phase change
      return;
    }
    
    if (phase === "intro-typing") {
      if (displayedText.length < question.length) {
        const isPausePoint = pausePointsRef.current.has(displayedText.length);
        const delay = isPausePoint 
          ? 180 + Math.random() * 120
          : 45 + Math.random() * 25;
        
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(question.slice(0, displayedText.length + 1));
        }, delay);
        
        return () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
      } else {
        // Done with intro typing, trigger reveal
        const timeout = setTimeout(() => {
          if (typeof window !== "undefined") {
            const setIntroPhase = (window as Window & { __introSetPhase?: (phase: "cursor" | "typing" | "revealing" | "done") => void }).__introSetPhase;
            if (setIntroPhase) setIntroPhase("revealing");
          }
          setIntroComplete(true);
          // Wait for reveal animation to complete (800ms) plus a pause, then start selection
          setTimeout(() => setPhase("selecting"), 1200);
        }, 400);
        return () => clearTimeout(timeout);
      }
    }
    
    if (phase === "typing") {
      if (displayedText.length < question.length) {
        const isPausePoint = pausePointsRef.current.has(displayedText.length);
        const delay = isPausePoint 
          ? 240 + Math.random() * 160
          : 36 + Math.random() * 20;
        
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(question.slice(0, displayedText.length + 1));
        }, delay);
        
        return () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
      } else {
        const timeout = setTimeout(() => setPhase("selecting"), 800);
        return () => clearTimeout(timeout);
      }
    } else if (phase === "selecting") {
      const timeout = setTimeout(() => setPhase("selected"), 500);
      return () => clearTimeout(timeout);
    } else if (phase === "selected") {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setQuestionIndex((prev) => (prev + 1) % questions.length);
        setPhase("typing");
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, phase, questionIndex, introComplete]);

  const isIntroPhase = phase === "intro-cursor" || phase === "intro-typing";
  const showCursor = phase === "intro-cursor" || phase === "intro-typing" || phase === "typing";

  return (
    <section className="relative overflow-hidden pt-32 pb-24 bg-[#faf9f7] dark:bg-[#0c0c0c]">
      {/* Background gradient - fades in with reveal */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent dark:from-[#0077ED]/5 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroPhase ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      <Container className="relative z-10">
        {/* Title + Subtitle + CTA */}
        <div className="mb-12">
          {/* Title animation */}
          <motion.div
            className="mb-6 relative"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <div className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.05] tracking-[-0.02em] invisible" aria-hidden="true">
              <span>{longestQuestion}</span>
              <span className="inline-block w-[3px] h-[1em] ml-1" />
            </div>
            
            <div className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.05] tracking-[-0.02em] absolute inset-0 text-[#0c0c0c] dark:text-white">
              <span 
                className={`transition-colors duration-100 ${
                  phase === "selecting" || phase === "selected" 
                    ? "bg-[#0077ED]/40 text-[#0c0c0c] dark:text-white" 
                    : "text-[#0c0c0c] dark:text-white"
                }`}
              >
                {displayedText}
              </span>
              {showCursor && (
                <motion.span 
                  className="inline-block w-[3px] h-[1em] bg-[#0077ED] ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.53, repeat: Infinity, repeatType: "reverse" }}
                />
              )}
            </div>
          </motion.div>

          {/* CTA + Subtitle row - hidden during intro */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isIntroPhase ? 0 : 1, y: isIntroPhase ? 20 : 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.a
              href="#"
              className="
                inline-flex items-center gap-2 shrink-0
                bg-[#0c0c0c] dark:bg-[#e8e8e8] text-white dark:text-[#1a1a1a]
                h-11 px-5 rounded-full
                font-medium text-base tracking-[-0.01em]
                hover:bg-[#1a1a1a] dark:hover:bg-[#d8d8d8]
                transition-colors duration-200
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              Try on your project
              <svg aria-hidden="true" className="w-2 h-4" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4258 12.7852C14.4258 12.4453 14.2969 12.1641 14.0508 11.9297L2.0039 0.339844C1.78125 0.117188 1.5 0 1.17187 0C0.51562 0 0 0.492188 0 1.16016C0 1.47656 0.1289 1.76953 0.33984 1.98047L11.5664 12.7852L0.33984 23.5781C0.1289 23.7891 0 24.0703 0 24.3984C0 25.0664 0.51562 25.5703 1.17187 25.5703C1.5 25.5703 1.78125 25.4414 2.0039 25.2305L14.0508 13.6406C14.2969 13.3945 14.4258 13.1133 14.4258 12.7852Z" fill="currentColor"/>
              </svg>
            </motion.a>

            <p className="text-sm sm:text-base lg:text-lg text-[#0c0c0c]/70 dark:text-white/80 whitespace-nowrap">
              Your company's entire knowledge—PRs, tickets, Slack, docs—one search away.
            </p>
          </motion.div>
        </div>

        {/* Kool Interface - Multi-panel layout - hidden during intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isIntroPhase ? 0 : 1, y: isIntroPhase ? 40 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="rounded-2xl lg:rounded-3xl bg-white dark:bg-[#0a0a0a] border border-black/[0.08] dark:border-white/[0.08] overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50">
            {/* Window chrome */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#f5f5f5] dark:bg-[#141414] border-b border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.04]">
                  <div className="w-4 h-4 rounded bg-[#0077ED] flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">K</span>
                  </div>
                  <span className="text-xs text-black/50 dark:text-white/50 font-medium">kool</span>
                </div>
              </div>
              <div className="w-[68px]" /> {/* Spacer for symmetry */}
            </div>

            {/* Multi-panel interface */}
            <div className="flex flex-col lg:flex-row min-h-[480px] bg-white dark:bg-transparent">
              {/* Left sidebar - Sources */}
              <div className="lg:w-64 bg-[#f8f8f8] dark:bg-[#0d0d0d] border-b lg:border-b-0 lg:border-r border-black/[0.06] dark:border-white/[0.06] p-4">
                <div className="text-[10px] uppercase tracking-wider text-black/30 dark:text-white/30 font-medium mb-3">Connected Sources</div>
                <div className="space-y-1">
                  {[
                    { icon: "github", name: "acme/backend", status: "synced", count: "2.4k files" },
                    { icon: "github", name: "acme/frontend", status: "synced", count: "1.8k files" },
                    { icon: "notion", name: "Engineering Docs", status: "synced", count: "342 pages" },
                    { icon: "linear", name: "Backend Board", status: "synced", count: "89 issues" },
                    { icon: "slack", name: "#engineering", status: "live", count: "30d history" },
                  ].map((source) => (
                    <div key={source.name} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors cursor-pointer group">
                      <div className="w-5 h-5 rounded bg-black/[0.06] dark:bg-white/[0.06] flex items-center justify-center">
                        {source.icon === "github" && <svg className="w-3 h-3 text-black/50 dark:text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>}
                        {source.icon === "notion" && <svg className="w-3 h-3 text-black/50 dark:text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.886.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>}
                        {source.icon === "linear" && <svg className="w-3 h-3 text-black/50 dark:text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M2.5 10.5L10.5 2.5C11.328 1.672 12.672 1.672 13.5 2.5L21.5 10.5C22.328 11.328 22.328 12.672 21.5 13.5L13.5 21.5C12.672 22.328 11.328 22.328 10.5 21.5L2.5 13.5C1.672 12.672 1.672 11.328 2.5 10.5Z"/></svg>}
                        {source.icon === "slack" && <svg className="w-3 h-3 text-black/50 dark:text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-black/70 dark:text-white/70 truncate">{source.name}</div>
                        <div className="text-[10px] text-black/30 dark:text-white/30">{source.count}</div>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${source.status === "live" ? "bg-green-500" : "bg-black/20 dark:bg-white/20"}`} />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <div className="text-[10px] uppercase tracking-wider text-black/30 dark:text-white/30 font-medium mb-3">Index Status</div>
                  <div className="text-2xl font-semibold text-black dark:text-white mb-1">47,832</div>
                  <div className="text-xs text-black/40 dark:text-white/40">items indexed</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-green-500/80">Live sync enabled</span>
                  </div>
                </div>
              </div>

              {/* Main chat area */}
              <div className="flex-1 flex flex-col">
                {/* Chat messages */}
                <div className="flex-1 p-6 space-y-6 overflow-auto">
                  {/* User question */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-md bg-[#0077ED] text-white">
                      <p className="text-sm">Why are we seeing 500 errors on the checkout endpoint?</p>
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex gap-3">
                    <div className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-[#0077ED] to-[#0055AA] flex items-center justify-center text-white font-bold text-[10px]">
                      K
                    </div>
                    <div className="flex-1 space-y-4 max-w-[90%]">
                      <div className="text-black/90 dark:text-white/90 text-sm leading-relaxed">
                        <p>
                          The 500s trace to a <span className="text-[#0066CC] dark:text-[#5BB4FF] font-medium">timeout mismatch</span>. 
                          Commit <code className="px-1.5 py-0.5 rounded bg-black/[0.06] dark:bg-white/[0.08] text-[11px] font-mono text-black/70 dark:text-white/70">a3f9c21</code> increased 
                          payment processing to ~3s, but ingress timeout stayed at 2s.
                        </p>
                      </div>

                      {/* Code fix */}
                      <div className="rounded-lg bg-[#f0f0f0] dark:bg-[#080808] border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-2 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.06]">
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-black/30 dark:text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <span className="text-xs text-black/50 dark:text-white/50 font-mono">infra/ingress.yaml</span>
                          </div>
                          <button className="text-[11px] text-[#0077ED] hover:text-[#5BB4FF] transition-colors font-medium">Apply fix →</button>
                        </div>
                        <pre className="p-3 text-xs font-mono overflow-x-auto">
                          <span className="text-red-600 dark:text-red-400/70">- timeout: 2000ms</span>{"\n"}
                          <span className="text-green-600 dark:text-green-400/70">+ timeout: 5000ms</span>
                        </pre>
                      </div>

                      {/* Sources */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          { icon: "code", label: "payment/service.ts:24" },
                          { icon: "ticket", label: "PAY-3824" },
                          { icon: "slack", label: "@sarah in #backend" },
                        ].map((source) => (
                          <span 
                            key={source.label}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-[11px] text-black/50 dark:text-white/50 hover:bg-black/[0.08] dark:hover:bg-white/[0.08] hover:text-black/70 dark:hover:text-white/70 transition-colors cursor-pointer"
                          >
                            {source.icon === "code" && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
                            {source.icon === "ticket" && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
                            {source.icon === "slack" && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                            {source.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input area */}
                <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.06] bg-[#f8f8f8] dark:bg-[#0d0d0d]">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-[#141414] border border-black/[0.08] dark:border-white/[0.08]">
                    <input 
                      type="text" 
                      placeholder="Ask anything about your codebase..."
                      className="flex-1 bg-transparent text-sm text-black/80 dark:text-white/80 placeholder:text-black/30 dark:placeholder:text-white/30 outline-none"
                      readOnly
                    />
                    <div className="flex items-center gap-2">
                      <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-black/[0.06] dark:bg-white/[0.06] text-[10px] text-black/30 dark:text-white/30 font-mono">⌘K</kbd>
                      <button className="w-7 h-7 rounded-lg bg-[#0077ED] flex items-center justify-center hover:bg-[#0066CC] transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
