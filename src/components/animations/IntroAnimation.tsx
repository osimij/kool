"use client";

// Simple timing constants - no context, no state management
// All components just use these delays for their animations

export const INTRO_TIMING = {
  // How long the cursor blinks before typing starts
  CURSOR_DURATION: 1.5,
  // Approximate time for typing the first question (~45 chars at ~55ms avg)
  TYPING_DURATION: 2.5,
  // Pause after typing completes before other elements appear
  POST_TYPING_PAUSE: 1.0,
  // Duration for reveal animations (slower, more elegant)
  REVEAL_DURATION: 1.8,
  // Total intro duration - when other elements should start appearing
  get REVEAL_DELAY() {
    return this.CURSOR_DURATION + this.TYPING_DURATION + this.POST_TYPING_PAUSE;
  },
} as const;

// For convenience - the delay and duration other components should use
export const REVEAL_DELAY = INTRO_TIMING.REVEAL_DELAY; // ~4.5s
export const REVEAL_DURATION = INTRO_TIMING.REVEAL_DURATION; // 1.0s
