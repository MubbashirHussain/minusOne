"use client";

import HeroSection from "@/components/sections/hero";
import PhilosophySection from "@/components/sections/Philosophy";
import ProjectsSection from "@/components/sections/projects";
import ExperienceSection from "@/components/sections/experience";
import { Container } from "@/components/ui/container";
import Terminal from "@/components/ui/terminal";
import SpreaterLine from "@/components/animations/spreaterLine";
import ContactSection from "@/components/sections/contact";
export default function Home() {
  return (
    <main id="main-content" className="w-full min-w-0">
      <span id="home" />
      <div className="absolute bottom-0 w-full bg-transparent z-[100]">
        <Terminal />
      </div>
      <div
        className="hero-shell bg-primary relative lg:sticky lg:top-0 z-30 dark:bg-background"
      >
        <Container className="hero-container bg-background dark:bg-primary relative px-0 md:px-0">
          <HeroSection />
        </Container>
      </div>

      <div className="bg-background relative z-30">
        <Container className="font-space-grotesk">
          <div className="sec-2-main">
            <PhilosophySection />
          </div>
        </Container>

        <SpreaterLine title="Projects" />

        <div className="relative z-30 bg-background shadow-lg">
          <ProjectsSection />
        </div>

        <SpreaterLine title="Experience" />

        <ExperienceSection />

        <ContactSection />
      </div>
    </main>
  );
}
