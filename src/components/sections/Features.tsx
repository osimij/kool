"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui";
import { KoolLogoMotion } from "@/components/ui/KoolLogo";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.906c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.046-.747.326-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.454-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM2.64 1.782l13.168-.933c1.634-.14 2.055-.047 3.082.7l4.25 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.046-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.969c0-.826.373-1.12 1.589-1.187z"/>
  </svg>
);

const LinearIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M2.5 10.56l10.94 10.94a9.96 9.96 0 01-10.94-10.94zM.06 8.24a12.09 12.09 0 000 .4L15.37 23.94c.13-.02.26-.03.4-.05L.06 8.24zm.36-2.07L16.19 21.94c.21-.08.41-.16.62-.25L.67 5.92c-.09.2-.17.41-.25.62zm.87-1.86L18.04 21.07c.19-.12.38-.25.56-.39L1.68 3.76c-.14.18-.27.37-.39.55zm1.22-1.46l17.43 17.43a9.9 9.9 0 00.79-.79L3.3 2.06c-.26.24-.52.5-.77.79zm1.69-1.34l16.64 16.64c.2-.32.39-.65.56-.99L4.77 2.53a12 12 0 00-.57.98zm1.45-1.11L21.3 16.04c.13-.36.24-.73.34-1.11L6.02 1.31c-.38.1-.75.21-1.11.34zm2.34-.64l14.88 14.88c.05-.4.09-.8.11-1.21L7.19.24c-.4.02-.8.06-1.2.11zm2.57-.29l13.5 13.5c-.04-.5-.1-1-.18-1.5L9.01.29c-.49.08-.99.14-1.49.18z"/>
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.163 0a2.528 2.528 0 012.523 2.522v6.312zM15.163 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.163 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.163a2.528 2.528 0 01-2.522 2.523h-6.315z"/>
  </svg>
);

const ConfluenceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M1.393 17.74a1.13 1.13 0 00.39 1.543l4.916 3.029a1.125 1.125 0 001.55-.403c1.23-2.085 2.59-2.477 5.093-1.32l4.682 2.168a1.127 1.127 0 001.473-.539l2.333-5.09a1.127 1.127 0 00-.547-1.474l-4.63-2.14c-5.206-2.406-9.373-1.189-12.75 4.226h-.51zM22.606 6.26a1.127 1.127 0 00-.388-1.543L17.3 1.688a1.127 1.127 0 00-1.55.403c-1.23 2.085-2.59 2.477-5.093 1.32L6.02 1.242a1.125 1.125 0 00-1.473.539l-2.334 5.09c-.27.555-.03 1.224.547 1.473l4.63 2.14c5.207 2.406 9.373 1.189 12.75-4.225h2.466z"/>
  </svg>
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
    <div className="mb-40 p-8 sm:p-10 lg:p-12 bg-[#f5f3ef] rounded-lg border border-[#e8e4dc]">
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
      className="p-6 rounded-xl bg-[#0c0c0c] text-white mt-auto overflow-hidden"
    >
      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`question-${currentIndex}`}
          layout="position"
          className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10"
          initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="w-6 h-6 rounded-full bg-[#0077ED] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold">?</span>
          </div>
          <span className="text-sm text-white/60">{current.question}</span>
        </motion.div>
      </AnimatePresence>

      {/* Answer area */}
      <motion.div layout="position" className="min-h-[80px]">
        <AnimatePresence mode="wait">
          {phase === "thinking" && (
            <motion.div
              layout="position"
              className="flex items-center gap-3"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <KoolLogoMotion size={24} color="#0077ED" />
              <span className="text-sm text-white/40">Searching 47,832 items...</span>
            </motion.div>
          )}

          {phase === "answer" && (
            <motion.div
              layout="position"
              initial={{ opacity: 0, filter: "blur(3px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-4"
            >
              <motion.p layout="position" className="text-white/90 leading-relaxed text-sm">
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
                    className="inline-block w-0.5 h-4 bg-white/60 ml-0.5 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.p>
              
              {/* Sources - appear after answer */}
              {displayedAnswer.length === current.answer.length && (
                <motion.div
                  layout="position"
                  className="flex items-center gap-2 flex-wrap"
                  initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className="text-xs text-white/40">Sources:</span>
                  {current.sources.map((source, i) => (
                    <motion.span
                      key={source}
                      className="text-xs px-2 py-1 rounded bg-white/10 text-white/70 cursor-pointer hover:text-white hover:bg-white/20 transition-colors"
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
      <motion.div layout="position" className="flex gap-1.5 mt-4 pt-3 border-t border-white/5">
        {answerExamples.map((_, i) => (
          <div key={i} className="relative flex-1 h-1">
            {/* Background track */}
            <div className={`absolute inset-0 rounded-full ${i === currentIndex ? "bg-[#0077ED]/20" : "bg-white/10"}`} />
            {/* Progress fill */}
            <motion.div
              key={`${i}-${cycle}`}
              className="absolute inset-0 rounded-full bg-[#0077ED]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: i === currentIndex ? 1 : i < currentIndex ? 1 : 0 }}
              transition={{ duration: i === currentIndex ? 8 : 0.3, ease: i === currentIndex ? "linear" : "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSource, setActiveSource] = useState(0);

  return (
    <section className="py-24 relative bg-[#faf9f7] overflow-hidden" ref={ref}>
      <Container className="space-y-12">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[32px] sm:text-[40px] md:text-[48px] text-[#0c0c0c] leading-[1.1] mb-4">
            Your team knows a lot. <span className="text-[#7a7a7a]">You just can't find it.</span>
          </h2>
          <p className="text-lg text-[#4a4a4a] leading-relaxed">
            The answer exists somewhere—buried in a PR, a Notion page, a Slack thread from three months ago. Kool brings it all together.
          </p>
        </motion.div>

        {/* Features 1 & 3: Side by side cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Reads everything */}
          <motion.div
            className="p-8 rounded-lg bg-[#f5f3ef] border border-[#e8e4dc]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-6">
              <h3 className="font-display text-xl text-[#0c0c0c] mb-1">Reads everything. Forgets nothing.</h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">
                PRs, tickets, docs, Slack threads—Kool indexes it all in real-time.
              </p>
            </div>

            {/* Visual: Connection sources */}
            <div className="relative p-6 rounded-xl bg-white border border-[#0c0c0c]/5">
              {/* Source icons row */}
              <div className="flex items-center justify-center gap-3 mb-6">
                {sources.slice(0, 5).map((source, i) => (
                  <motion.button
                    key={source.name}
                    onClick={() => setActiveSource(i)}
                    className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      activeSource === i 
                        ? "bg-[#0c0c0c] text-white scale-110 shadow-md" 
                        : source.connected 
                          ? "bg-[#f0ebe3] text-[#4a4a4a] hover:bg-[#e5dfd5]"
                          : "bg-[#f7f5f0] text-[#7a7a7a] border border-dashed border-[#7a7a7a]/30"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-5 h-5">
                      <source.icon />
                    </div>
                    {source.connected && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#34d399] border-2 border-white" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Live feed */}
              <div className="space-y-2">
                {[
                  { time: "now", text: "PR #847 merged → main", source: "GitHub" },
                  { time: "2m", text: "Auth docs updated", source: "Notion" },
                  { time: "5m", text: "PAY-201 moved to Done", source: "Linear" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[#f7f5f0]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-xs text-[#7a7a7a] w-7">{item.time}</span>
                    <span className="flex-1 text-sm text-[#4a4a4a]">{item.text}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white text-[#7a7a7a]">{item.source}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-[#0c0c0c]/5 flex items-center justify-between">
                <span className="text-xs text-[#7a7a7a]">47,832 items indexed</span>
                <span className="text-xs text-[#34d399]">● Live sync</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Answers with receipts */}
          <motion.div
            className="p-8 rounded-lg bg-[#f5f3ef] border border-[#e8e4dc] flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Header */}
            <div className="mb-6">
              <h3 className="font-display text-xl text-[#0c0c0c] mb-1">Answers with receipts.</h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">
                Every answer links back to the PR, ticket, or Slack thread it came from.
              </p>
            </div>

            {/* Visual: Animated Answer card */}
            <AnimatedAnswerCard isInView={isInView} />
          </motion.div>
        </div>

        {/* Feature 2: Natural language search */}
        <SearchDemoSection isInView={isInView} />
      </Container>
    </section>
  );
}
