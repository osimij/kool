"use client";

import {
  Navigation,
  Hero,
  Features,
  Integrations,
  Testimonials,
  CTA,
  Footer,
} from "@/components/sections";
import { IntroAnimation, IntroReveal } from "@/components/animations";

export default function Home() {
  return (
    <IntroAnimation>
      <main className="min-h-screen bg-[#faf9f7] dark:bg-[#0c0c0c]">
        <Navigation />
        <Hero />
        <IntroReveal>
          <Features />
          <Integrations />
          <Testimonials />
          <CTA />
          <Footer />
        </IntroReveal>
      </main>
    </IntroAnimation>
  );
}
