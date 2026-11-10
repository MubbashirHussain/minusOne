"use client";

import { useCallback, useRef, useState } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";

const MIN_TITLE_HOLD_MS = 900000;
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function RouteTransitions({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const leftPanel = useRef<HTMLDivElement>(null);
  const rightPanel = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const titleVisibleAt = useRef<number | null>(null);
  const [destination, setDestination] = useState("Loading");

  const leave = useCallback((next: () => void, _from?: string, to?: string) => {
    titleVisibleAt.current = null;
    if (prefersReducedMotion() || !overlay.current) {
      next();
      return;
    }

    const path = to?.split(/[?#]/)[0];
    setDestination(
      path?.startsWith("/blog/")
        ? "Journal entry"
        : path === "/blog"
          ? "The journal"
          : "Portfolio",
    );
    const panels = [leftPanel.current, rightPanel.current];
    gsap.set(overlay.current, { visibility: "visible", pointerEvents: "auto" });
    gsap.set(title.current, { opacity: 0 });

    const timeline = gsap.timeline({
      onComplete: () => {
        titleVisibleAt.current = performance.now();
        next();
      },
    });
    timeline
      .fromTo(
        panels,
        { yPercent: (index: number) => (index === 0 ? 100 : -100) },
        { yPercent: 0, duration: 0.6, ease: "power3.inOut" },
      )
      .to(title.current, { opacity: 1, duration: 0.24, ease: "power2.out" });
    return () => {
      timeline.kill();
    };
  }, []);

  const enter = useCallback((next: () => void) => {
    const element = overlay.current;
    const visibleAt = titleVisibleAt.current;
    if (!element || visibleAt === null || prefersReducedMotion()) {
      if (element)
        gsap.set(element, { visibility: "hidden", pointerEvents: "none" });
      next();
      return;
    }

    const remainingHold = Math.max(
      0,
      visibleAt + MIN_TITLE_HOLD_MS - performance.now(),
    );
    const timeline = gsap.timeline({
      delay: remainingHold / 1000,
      onComplete: () => {
        gsap.set(element, { visibility: "hidden", pointerEvents: "none" });
        next();
      },
    });
    timeline
      .to(title.current, { opacity: 0, duration: 0.25, ease: "power2.in" })
      .to(
        [leftPanel.current, rightPanel.current],
        {
          yPercent: (index: number) => (index === 0 ? -100 : 100),
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.08",
      );
    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <TransitionRouter leave={leave} enter={enter}>
      {children}
      <div ref={overlay} aria-hidden="true" className="route-transition-panel">
        <div
          ref={leftPanel}
          className="route-transition-slice left-0 border-r border-[#181b17]/20"
        />
        <div ref={rightPanel} className="route-transition-slice right-0" />
        <div
          ref={title}
          className="relative grid justify-items-center gap-4 px-6 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em]">
            Now opening
          </span>
          <span className="text-[clamp(2.5rem,9vw,8rem)] leading-none font-semibold tracking-tighter">
            {destination}
          </span>
        </div>
      </div>
    </TransitionRouter>
  );
}
