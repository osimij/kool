import {
  Navigation,
  Hero,
  Features,
  Integrations,
  CTA,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Integrations />
      <CTA />
      <Footer />
    </main>
  );
}
