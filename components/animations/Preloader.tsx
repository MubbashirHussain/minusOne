"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NodeFlowApp } from "../flow/NodeFlowApp";

// A short, skippable introduction: the percentage describes the animation,
// rather than pretending to measure network or build progress.
export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [canvas, setCanvas] = useState({ width: 1100, height: 700, scale: 1 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width < 600 ? 440 : 1100;
      const height = width === 440 ? 920 : 700;
      setCanvas({ width, height, scale: Math.min(entry.contentRect.width / width, entry.contentRect.height / height, 1) });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const duration = reducedMotion ? 300 : 9000;
    const start = performance.now();
    const timer = window.setInterval(() => {
      setProgress(Math.min(100, Math.round((performance.now() - start) / duration * 100)));
    }, 100);
    const finish = window.setTimeout(onFinish, duration + 200);
    return () => { clearInterval(timer); clearTimeout(finish); };
  }, [onFinish, reducedMotion]);

  return (
    <motion.section
      aria-label="Portfolio introduction"
      className="fixed inset-0 z-[300] flex flex-col bg-background p-4 text-text sm:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
    >
      <div className="flex items-center justify-between gap-4 pb-4">
        <p className="font-space-grotesk text-sm">Mubbashir / Creative Developer</p>
        <button autoFocus onClick={onFinish} className="shrink-0 rounded-full border border-current px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-4">Skip intro</button>
      </div>
      <div ref={canvasRef} className="relative min-h-0 flex-1 overflow-hidden rounded-3xl border border-text/10">
        <div className="absolute left-1/2 top-1/2" style={{ width: canvas.width, height: canvas.height, transform: `translate(-50%, -50%) scale(${canvas.scale})` }}>
          {!reducedMotion && <NodeFlowApp />}
        </div>
      </div>
      <div className="flex items-end justify-between gap-4 pt-4">
        <div><p className="text-xl font-semibold sm:text-3xl">Generating my digital world</p><p className="mt-1 text-sm text-text-muted">An introduction to the ideas behind the portfolio.</p></div>
        <span aria-hidden="true" className="text-4xl font-bold tabular-nums sm:text-6xl">{progress}%</span>
      </div>
      <div role="progressbar" aria-label="Introduction progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="mt-4 h-1 overflow-hidden rounded bg-text/10"><div className="h-full bg-primary transition-[width]" style={{ width: `${progress}%` }} /></div>
    </motion.section>
  );
}
