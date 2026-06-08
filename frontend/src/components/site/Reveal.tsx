"use client";

import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: -35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, delay = 0, className }: PropsWithChildren<{ delay?: number; className?: string }>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.4em] text-accent mb-4">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-muted-foreground text-lg max-w-2xl">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}