"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container, VaporizeTextCycle, Tag } from "@/components/ui";
import { KoolLogoMotion } from "@/components/ui/KoolLogo";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const NotionIcon = () => (
  <img src="/Notion.png" alt="Notion" className="w-full h-full object-contain" />
);

const LinearIcon = () => (
  <img src="/linear-dark-logo.svg" alt="Linear" className="w-full h-full object-contain" />
);

const SlackIcon = () => (
  <img src="/Slack.png" alt="Slack" className="w-full h-full object-contain" />
);

const ConfluenceIcon = () => (
  <img src="/Confluence.png" alt="Confluence" className="w-full h-full object-contain" />
);

const sources = [
  { name: "GitHub", icon: GitHubIcon, connected: true },
  { name: "Notion", icon: NotionIcon, connected: true },
  { name: "Linear", icon: LinearIcon, connected: true },
  { name: "Slack", icon: SlackIcon, connected: false },
  { name: "Confluence", icon: ConfluenceIcon, connected: false },
];

// Search results data with code previews
const searchResults = [
  {
    file: "lib/auth/retry.ts",
    line: "24-48",
    confidence: 98,
    preview: `export async function retryAuth(
  fn: () => Promise<AuthResult>,
  maxAttempts = 3
): Promise<AuthResult> {
  let lastError: AuthError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as AuthError;
      if (!isRetryable(error)) throw error;
      await delay(getBackoff(attempt));
    }
  }
  throw lastError;
}`,
    highlightLines: [1, 2, 3, 8, 9, 10, 11, 12],
    language: "typescript",
  },
  {
    file: "services/AuthService.ts",
    line: "156",
    confidence: 91,
    preview: `// Retry failed auth with exponential backoff
const result = await retryAuth(() => 
  this.provider.authenticate(credentials)
);`,
    highlightLines: [1, 2, 3],
    language: "typescript",
  },
  {
    file: "utils/auth-helpers.ts",
    line: "78-82",
    confidence: 73,
    preview: `function isRetryable(error: unknown): boolean {
  if (error instanceof NetworkError) return true;
  if (error instanceof TimeoutError) return true;
  return false;
}`,
    highlightLines: [1, 2, 3],
    language: "typescript",
  },
];

// Typing animation hook
function useTypingAnimation(text: string, speed: number = 50, startDelay: number = 0, shouldStart: boolean = false) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!shouldStart) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }

    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      const typeChar = () => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typeChar, speed);
        } else {
          setIsComplete(true);
        }
      };
      typeChar();
    };

    timeout = setTimeout(startTyping, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, shouldStart]);

  return { displayedText, isComplete };
}

// Code syntax highlighter component
function CodePreview({ code, highlightLines }: { code: string; highlightLines: number[] }) {
  const lines = code.split('\n');
  
  return (
    <div className="font-mono text-xs leading-relaxed">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`px-3 py-0.5 ${
            highlightLines.includes(i + 1)
              ? "bg-[#0077ED]/10 border-l-2 border-[#0077ED]"
              : ""
          }`}
        >
          <span className="text-[#7a7a7a] select-none mr-4 inline-block w-4 text-right">
            {i + 1}
          </span>
          <span className="text-[#2a2a2a]">
            {highlightKeywords(line)}
          </span>
        </div>
      ))}
    </div>
  );
}

// Simple keyword highlighting
function highlightKeywords(line: string) {
  const keywords = ['export', 'async', 'function', 'const', 'let', 'if', 'for', 'return', 'await', 'try', 'catch', 'throw', 'import', 'from'];
  const types = ['Promise', 'AuthResult', 'AuthError', 'boolean', 'unknown', 'string', 'number'];
  
  let result = line;
  
  // This is a simplified version - in production you'd use a proper tokenizer
  keywords.forEach(kw => {
    result = result.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<kw>${kw}</kw>`);
  });
  types.forEach(type => {
    result = result.replace(new RegExp(`\\b${type}\\b`, 'g'), `<type>${type}</type>`);
  });
  
  // Parse and render with React elements
  const parts = result.split(/(<kw>.*?<\/kw>|<type>.*?<\/type>)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('<kw>')) {
      return <span key={i} className="text-[#d73a49]">{part.replace(/<\/?kw>/g, '')}</span>;
    }
    if (part.startsWith('<type>')) {
      return <span key={i} className="text-[#6f42c1]">{part.replace(/<\/?type>/g, '')}</span>;
    }
    // Highlight strings
    if (part.includes('"') || part.includes("'") || part.includes('`')) {
      return <span key={i}>{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

// Search Demo Section Component
function SearchDemoSection({ isInView }: { isInView: boolean }) {
  const [hoveredResult, setHoveredResult] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const naturalQuery = "Where's the retry logic for auth?";
  const { displayedText, isComplete } = useTypingAnimation(naturalQuery, 45, 800, isInView);

  // Handle delayed hover
  const handleMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredResult(index);
    }, 450);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredResult(null);
  };

  // Trigger search animation after typing completes
  useEffect(() => {
    if (isComplete) {
      setIsSearching(true);
      const searchTimer = setTimeout(() => {
        setIsSearching(false);
        setShowResults(true);
      }, 1200);
      return () => clearTimeout(searchTimer);
    }
  }, [isComplete]);

  return (
    <div className="p-8 sm:p-10 lg:p-12 bg-[#f5f3ef] rounded-lg border border-[#e8e4dc]">
      {/* Fix #4: Changed items-start to items-center for balanced layout during animation */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
        {/* Text */}
        <motion.div
          className="lg:max-w-md flex flex-col justify-between lg:self-stretch lg:min-h-[420px] pt-2.5"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <h2 className="font-display text-[24px] sm:text-[28px] md:text-[32px] text-[#0c0c0c] leading-[1.1] mb-3">
              Ask like a human.
              <br />
              <span className="text-[#7a7a7a]">Not a search engine.</span>
            </h2>
            <p className="text-base text-[#4a4a4a] leading-relaxed">
              &ldquo;Where&apos;s the retry logic for auth?&rdquo; beats CTRL+F.
              <br />
              Kool understands intent, not just keywords.
            </p>
          </div>
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c0c0c] text-white font-medium rounded-full hover:bg-[#1a1a1a] transition-colors w-fit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try natural search
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Visual */}
        <motion.div
          className="relative lg:flex-1 lg:max-w-xl overflow-visible"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        {/* Fix #3: Added overflow-visible to allow popup to extend outside */}
        {/* Fixed height container to prevent grow/shrink during animation */}
        <div className="p-6 rounded-2xl bg-white border border-[#0c0c0c]/5 overflow-visible min-h-[420px]">
          {/* Search demo */}
          <div className="space-y-6">
            {/* Natural search with typing animation */}
            <motion.div 
              className="p-4 rounded-xl bg-[#0c0c0c] text-white shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <motion.span 
                  className="w-8 h-8 rounded-lg bg-[#0077ED] flex items-center justify-center text-sm font-bold shadow-md"
                  animate={isSearching ? { 
                    boxShadow: ["0 0 0 0 rgba(0,119,237,0.4)", "0 0 0 12px rgba(0,119,237,0)", "0 0 0 0 rgba(0,119,237,0)"]
                  } : {}}
                  transition={{ duration: 1.2, repeat: isSearching ? Infinity : 0 }}
                >
                  K
                </motion.span>
                <div className="flex-1 min-h-[24px]">
                  <span className="text-sm sm:text-base">{displayedText}</span>
                  {!isComplete && (
                    <motion.span 
                      className="inline-block w-0.5 h-4 bg-white ml-0.5 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </div>
                {isSearching && (
                  <motion.div
                    className="flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#0077ED]"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Results with hover preview */}
            {/* Fix #1: Replaced height animation with opacity + transform for smooth reveal */}
            <AnimatePresence>
              {showResults && (
                <motion.div 
                  className="space-y-3 pt-6 border-t border-[#0c0c0c]/5 overflow-visible"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-[#7a7a7a]">Found 3 results in 0.12s</span>
                    <motion.span 
                      className="text-xs text-[#0077ED] cursor-pointer hover:underline"
                      whileHover={{ x: 2 }}
                    >
                      View all →
                    </motion.span>
                  </div>
                  
                  {searchResults.map((result, i) => {
                    // Fix #2: Position popup above for last item to prevent clipping
                    const isLastItem = i === searchResults.length - 1;
                    
                    return (
                      <motion.div
                        key={i}
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <motion.div
                          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                            hoveredResult === i 
                              ? "bg-[#f0ebe3] border-[#e5dfd5]" 
                              : "bg-[#f7f5f0] border-transparent hover:bg-[#f0ebe3]"
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono ${
                              hoveredResult === i ? "bg-[#4a4a4a] text-white" : "bg-white text-[#7a7a7a]"
                            }`}>
                              {result.language === "typescript" ? "TS" : "JS"}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-mono text-[#2a2a2a] truncate">{result.file}</div>
                              <div className="text-xs text-[#7a7a7a]">Lines {result.line}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {/* Confidence bar */}
                            <div className="hidden sm:flex items-center gap-2">
                              <div className="w-16 h-1.5 rounded-full bg-[#e5e5e5] overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ 
                                    backgroundColor: result.confidence > 90 ? "#10b981" : result.confidence > 80 ? "#0077ED" : "#f59e0b"
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.confidence}%` }}
                                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                                />
                              </div>
                              <span className={`text-xs font-medium ${
                                result.confidence > 90 ? "text-emerald-600" : result.confidence > 80 ? "text-[#0077ED]" : "text-amber-600"
                              }`}>
                                {result.confidence}%
                              </span>
                            </div>
                            <svg 
                              className="w-4 h-4 text-[#7a7a7a]"
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.div>

                        {/* Code preview popup - positioned above for last item, below for others */}
                        <AnimatePresence>
                          {hoveredResult === i && (
                            <motion.div
                              className={`absolute left-0 right-0 z-20 rounded-xl bg-white border border-[#0c0c0c]/10 shadow-elevated overflow-hidden ${
                                isLastItem ? "bottom-full mb-2" : "top-full mt-2"
                              }`}
                              initial={{ opacity: 0, y: isLastItem ? 10 : -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: isLastItem ? 10 : -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="flex items-center justify-between px-3 py-2 bg-[#f7f5f0] border-b border-[#e5e5e5]">
                                <span className="text-xs font-mono text-[#4a4a4a]">{result.file}</span>
                                <span className="text-xs text-[#7a7a7a]">L{result.line}</span>
                              </div>
                              <div className="py-2 max-h-48 overflow-auto bg-[#fafafa]">
                                <CodePreview code={result.preview} highlightLines={result.highlightLines} />
                              </div>
                              <div className="px-3 py-2 bg-[#f7f5f0] border-t border-[#e5e5e5] flex items-center justify-between">
                                <span className="text-xs text-[#7a7a7a]">Click to open in editor</span>
                                <div className="flex gap-1">
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-[#e5e5e5] text-[#4a4a4a]">⌘</span>
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-[#e5e5e5] text-[#4a4a4a]">↵</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

// Animated Answer Card Component
const answerExamples = [
  {
    question: "Why was the payment timeout increased?",
    answer: "The payment timeout was increased from 2s to 5s in PR #734 to handle slower 3D Secure flows.",
    sources: ["PR #734", "PAY-291", "#payments-standup"],
    highlight: "PR #734",
  },
  {
    question: "Who owns the auth service?",
    answer: "The auth service is owned by the Platform team. Sarah is the tech lead, and major changes need review from @platform-core.",
    sources: ["TEAM-102", "auth/OWNERS", "#platform-general"],
    highlight: "@platform-core",
  },
  {
    question: "What broke the deploy last Friday?",
    answer: "A misconfigured feature flag in PR #891 caused the checkout flow to fail. Rolled back in PR #892 within 12 minutes.",
    sources: ["PR #891", "PR #892", "#incidents"],
    highlight: "PR #891",
  },
];

function AnimatedAnswerCard({ isInView }: { isInView: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cycle, setCycle] = useState(0); // Track cycle count to reset progress bars
  const [phase, setPhase] = useState<"question" | "thinking" | "answer">("question");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  
  const current = answerExamples[currentIndex];

  // Cycle through examples
  useEffect(() => {
    if (!isInView) return;
    
    const cyclePhases = () => {
      // Question phase
      setPhase("question");
      setDisplayedAnswer("");
      
      // Thinking phase after 1.5s
      const thinkTimer = setTimeout(() => setPhase("thinking"), 1500);
      
      // Answer phase after 3s
      const answerTimer = setTimeout(() => setPhase("answer"), 3000);
      
      // Next example after 8s
      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % answerExamples.length;
          if (next === 0) setCycle((c) => c + 1); // New cycle, reset progress bars
          return next;
        });
      }, 8000);
      
      return () => {
        clearTimeout(thinkTimer);
        clearTimeout(answerTimer);
        clearTimeout(nextTimer);
      };
    };
    
    const cleanup = cyclePhases();
    return cleanup;
  }, [currentIndex, isInView]);

  // Typing animation for answer
  useEffect(() => {
    if (phase !== "answer" || !isInView) return;
    
    let charIndex = 0;
    const text = current.answer;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= text.length) {
        setDisplayedAnswer(text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 20);
    
    return () => clearInterval(typeInterval);
  }, [phase, current.answer, isInView]);

  return (
    <motion.div 
      layout
      transition={{ layout: { type: "spring", stiffness: 300, damping: 25 } }}
      className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl bg-[#0c0c0c] text-white mt-auto overflow-hidden"
    >
      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`question-${currentIndex}`}
          layout="position"
          className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-white/10"
          initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0077ED] flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] sm:text-xs font-bold">?</span>
          </div>
          <span className="text-xs sm:text-sm text-white/60 leading-tight">{current.question}</span>
        </motion.div>
      </AnimatePresence>

      {/* Answer area */}
      <motion.div layout="position" className="min-h-[70px] sm:min-h-[80px]">
        <AnimatePresence mode="wait">
          {phase === "thinking" && (
            <motion.div
              layout="position"
              className="flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <KoolLogoMotion size={20} color="#0077ED" />
              <span className="text-xs sm:text-sm text-white/40">Searching 47,832 items...</span>
            </motion.div>
          )}

          {phase === "answer" && (
            <motion.div
              layout="position"
              initial={{ opacity: 0, filter: "blur(3px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-3 sm:space-y-4"
            >
              <motion.p layout="position" className="text-white/90 leading-relaxed text-xs sm:text-sm">
                {displayedAnswer.split(current.highlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-[#3399FF]">{current.highlight}</span>
                    )}
                  </span>
                ))}
                {displayedAnswer.length < current.answer.length && (
                  <motion.span
                    className="inline-block w-0.5 h-3 sm:h-4 bg-white/60 ml-0.5 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.p>
              
              {/* Sources - appear after answer */}
              {displayedAnswer.length === current.answer.length && (
                <motion.div
                  layout="position"
                  className="flex items-center gap-1.5 sm:gap-2 flex-wrap"
                  initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className="text-[10px] sm:text-xs text-white/40">Sources:</span>
                  {current.sources.map((source, i) => (
                    <motion.span
                      key={source}
                      className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/10 text-white/70 cursor-pointer hover:text-white hover:bg-white/20 transition-colors"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ delay: 0.25 + i * 0.08, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {source}
                    </motion.span>
                  ))}
                </motion.div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress indicator */}
      <motion.div layout="position" className="flex gap-1 sm:gap-1.5 mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-white/5">
        {answerExamples.map((_, i) => (
          <div key={i} className="relative flex-1 h-0.5 sm:h-1">
            {/* Background track */}
            <div className={`absolute inset-0 rounded-full ${i === currentIndex ? "bg-[#0077ED]/20" : "bg-white/10"}`} />
            {/* Progress fill */}
            <motion.div
              key={`${i}-${cycle}`}
              className="absolute left-0 top-0 bottom-0 rounded-full bg-[#0077ED]"
              initial={{ width: "0%" }}
              animate={{ width: i === currentIndex ? "100%" : i < currentIndex ? "100%" : "0%" }}
              transition={{ duration: i === currentIndex ? 8 : 0.3, ease: i === currentIndex ? "linear" : "easeOut" }}
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Features() {
  const ref = useRef(null);
  // Trigger when viewport middle reaches the section (50% from bottom)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50% 0px" });
  const [activeSource, setActiveSource] = useState(0);

  return (
    <section id="product" className="py-24 relative bg-[#faf9f7] overflow-hidden" ref={ref}>
      <Container className="space-y-12">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[32px] sm:text-[40px] md:text-[48px] text-[#0c0c0c] leading-[1.1] mb-4">
            Your team knows a lot.{" "}
            <span className="inline-block h-[40px] sm:h-[50px] md:h-[60px] w-[280px] sm:w-[360px] md:w-[450px] align-middle">
              <VaporizeTextCycle
                texts={["You just can't find it."]}
                font={{
                  fontFamily: "PP Mori, system-ui, sans-serif",
                  fontSize: "48px",
                  fontWeight: 400,
                }}
                color="rgb(122, 122, 122)"
                spread={3}
                density={6}
                animation={{
                  vaporizeDuration: 2.5,
                  fadeInDuration: 0.8,
                  waitDuration: 2,
                }}
                direction="left-to-right"
                alignment="left"
                tag={Tag.P}
                loop={false}
              />
            </span>
          </h2>
          <p className="text-lg text-[#4a4a4a] leading-relaxed">
            The answer exists somewhere—buried in a PR, a Notion page, a Slack thread from three months ago. Kool brings it all together.
          </p>
        </motion.div>

        {/* Features section wrapper */}
        <div className="space-y-4 sm:space-y-6">
          {/* Feature 1: Natural language search */}
          <SearchDemoSection isInView={isInView} />

          {/* Features 2 & 3: Side by side cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Reads everything */}
          <motion.div
            className="p-4 sm:p-6 md:p-8 rounded-lg bg-[#f5f3ef] border border-[#e8e4dc]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-display text-lg sm:text-xl text-[#0c0c0c] mb-1">Reads everything. Forgets nothing.</h3>
              <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed">
                PRs, tickets, docs, Slack threads—Kool indexes it all in real-time.
              </p>
            </div>

            {/* Visual: Connection sources */}
            <div className="relative p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-white border border-[#0c0c0c]/5">
              {/* Source icons row */}
              <div className="flex items-center justify-start gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                {sources.slice(0, 5).map((source, i) => (
                  <motion.button
                    key={source.name}
                    onClick={() => setActiveSource(i)}
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all ${
                      activeSource === i 
                        ? "bg-[#0c0c0c] text-white scale-110 shadow-md" 
                        : source.connected 
                          ? "bg-[#f0ebe3] text-[#4a4a4a] hover:bg-[#e5dfd5]"
                          : "bg-[#f7f5f0] text-[#7a7a7a] border border-dashed border-[#7a7a7a]/30"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5">
                      <source.icon />
                    </div>
                    {source.connected && (
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#34d399] border-2 border-white" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Live feed */}
              <div className="space-y-1.5 sm:space-y-2">
                {[
                  { time: "now", text: "PR #847 merged → main", source: "GitHub" },
                  { time: "2m", text: "Auth docs updated", source: "Notion" },
                  { time: "5m", text: "PAY-201 moved to Done", source: "Linear" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-[#f7f5f0]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-[10px] sm:text-xs text-[#7a7a7a] w-6 sm:w-7 shrink-0">{item.time}</span>
                    <span className="flex-1 text-xs sm:text-sm text-[#4a4a4a] truncate">{item.text}</span>
                    <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-white text-[#7a7a7a] shrink-0">{item.source}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#0c0c0c]/5 flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-[#7a7a7a]">47,832 items indexed</span>
                <span className="text-[10px] sm:text-xs text-[#34d399]">● Live sync</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Answers with receipts */}
          <motion.div
            className="p-4 sm:p-6 md:p-8 rounded-lg bg-[#f5f3ef] border border-[#e8e4dc] flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-display text-lg sm:text-xl text-[#0c0c0c] mb-1">Answers with receipts.</h3>
              <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed">
                Every answer links back to the PR, ticket, or Slack thread it came from.
              </p>
            </div>

            {/* Visual: Animated Answer card */}
            <AnimatedAnswerCard isInView={isInView} />
          </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
