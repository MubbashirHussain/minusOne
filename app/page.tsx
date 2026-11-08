"use client";

import { Header } from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";
import PhilosophySection from "@/components/sections/Philosophy";
import ProjectsSection from "@/components/sections/projects";
import ExperienceSection from "@/components/sections/experience";
import { Container } from "@/components/ui/container";
import Terminal from "@/components/ui/terminal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useEffect } from "react";
import SpreaterLine from "@/components/animations/spreaterLine";
import ContactSection from "@/components/sections/contact";
export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const header = headerRef.current;
    const main = mainRef.current;
    const hero = heroRef.current;

    if (!header || !main || !hero) return;

    const ctx = gsap.context(() => {
      // Initial animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(header, {
        y: -100,
        duration: 1,
        delay: 0.4,
      });

      // Keep navigation at a usable width at every viewport size.
      ScrollTrigger.create({
        trigger: hero,
        start: "95% top",
        onEnter: () => gsap.to(header, { y: 8, duration: 0.4 }),
        onLeaveBack: () => gsap.to(header, { y: 0, duration: 0.4 }),
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);
  return (
    <main id="home" className="w-full min-w-0" ref={mainRef}>
      <div className="absolute bottom-0 w-full bg-transparent z-[100]">
        <Terminal />
      </div>
      {/* Header */}

      <Header
        ref={headerRef}
        // links={navLinks}
        className="portfolio-header h-16"
        bgClassName="bg-secondary"
        textClassName="text-text-inverse"
        // We'll control width/height via Tailwind classes for responsiveness
        style={{ position: "fixed" }}
      />
      <div
        className="hero-shell bg-primary relative lg:sticky lg:top-0 z-30 dark:bg-background"
        ref={heroRef}
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
