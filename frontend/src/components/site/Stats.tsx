"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString() + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const items = [
  { v: 50, s: "+", label: "Projects Delivered" },
  { v: 25, s: "+", label: "Happy Clients" },
  { v: 5, s: "M+", label: "Content Views" },
  { v: 100, s: "%", label: "Client Satisfaction" },
];

export function Stats() {
  return (
    <section className="border-y border-white/5 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {items.map((it) => (
          <div key={it.label} className="text-center md:text-left">
            <div className="font-display text-4xl md:text-6xl tracking-tight">
              <Counter to={it.v} suffix={it.s} />
            </div>
            <div className="mt-2 text-xs md:text-sm uppercase tracking-widest text-muted-foreground">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}