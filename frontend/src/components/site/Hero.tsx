"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mouse, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import heroBg from "@/assets/hero-bg.jpg";
import portraitImg from "@/assets/veer-hero.jpg";
import strip1 from "@/assets/work-1.jpg";
import strip2 from "@/assets/work-2.jpg";
import strip3 from "@/assets/work-3.jpg";
import strip4 from "@/assets/work-4.jpg";

const ROTATING = ["Brands", "Creators", "Events", "Weddings", "Startups", "Stories"];

function CharReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: delay + i * 0.025, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden cinematic-gradient flex flex-col justify-between">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={typeof heroBg === "string" ? heroBg : heroBg.src}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 24 }).map((_, i) => {
        const sizes = ["size-1", "size-1.5", "size-2", "size-0.5"];
        const sizeClass = sizes[i % sizes.length];
        return (
          <span
            key={i}
            className={`absolute ${sizeClass} rounded-full bg-accent/30 blur-[0.5px]`}
            style={{
              left: `${(i * 47) % 100}%`,
              top: `${(i * 29) % 100}%`,
              animation: `float-slow ${7 + (i % 6)}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        );
      })}

      {/* Main Grid Content */}
      <div className="relative mx-auto max-w-6xl w-full px-6 pt-36 md:pt-44 flex-1 flex flex-col justify-center">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-center">

          {/* Left Block: Heading & Copy */}
          <div className="md:col-span-7 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs uppercase tracking-[0.4em] text-foreground/80 font-semibold flex items-center gap-2"
            >
              <Sparkles className="size-3 text-accent animate-pulse" />
              Freezing The Frames · Est. by Veer Gohel
            </motion.p>

            <h1 className="font-display font-bold text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-balance">
              <span className="block overflow-hidden text-glow text-foreground">
                <CharReveal text="Freezing Moments." />
              </span>
              <span className="block overflow-hidden text-muted-foreground">
                <CharReveal text="Creating Stories." delay={0.4} />
              </span>
              <span className="block overflow-hidden text-glow text-foreground">
                <CharReveal text="." delay={0.9} />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Premium photography and cinematic videography for{" "}
              <span className="relative inline-flex h-7 overflow-hidden align-bottom">
                <motion.span
                  key={idx}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-accent font-semibold"
                >
                  {ROTATING[idx]}
                </motion.span>
              </span>{" "}
              — transforming moments into unforgettable visual experiences.
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:scale-[1.02]"
              >
                Book a Shoot
                <span className="absolute inset-0 -z-10 rounded-full bg-accent/40 blur-2xl opacity-0 group-hover:opacity-100 transition" />
              </a>
              <a
                href="#work"
                className="rounded-full glass px-6 py-3.5 text-sm font-medium hover:bg-white/[0.08] transition"
              >
                View Portfolio
              </a>
              <a
                href="#showreel"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm text-muted-foreground hover:text-foreground transition"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full glass">
                  <Play className="size-3.5 fill-current" />
                </span>
                Watch Showreel
              </a>
            </motion.div>
          </div>

          {/* Right Block: Floating Polaroid/Editorial Frame */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ rotate: -1, scale: 1.03 }}
              className="bg-[#fcfbf7] p-4 pb-12 rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-[#f0eee4] w-full max-w-[320px] aspect-[4/5] relative group cursor-pointer"
            >
              {/* Photo Area */}
              <div className="w-full h-[82%] relative bg-zinc-900 rounded overflow-hidden">
                <Image
                  src={portraitImg}
                  alt="Veer Gohel Portrait"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.25] group-hover:scale-[1.20] object-[center_18%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Handwriting/Caption style */}
              <div className="h-[18%] flex items-center justify-center pt-3">
                <span className="font-serif italic text-zinc-700 text-lg tracking-wide select-none">
                  Veer Gohel
                </span>
              </div>

              {/* Pin Accent effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 size-6 rounded-full bg-accent/20 border border-accent/40 blur-[1px] pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Layout Strip: Cinematic Horizontal Filmstrip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="w-full border-y border-white/5 bg-black/10 backdrop-blur-sm mt-16 py-4 relative z-20 hidden md:block"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6">
          <div className="shrink-0 max-w-[120px]">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">Featured</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 block">Work Frames</span>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-4">
            {[strip1, strip2, strip3, strip4].map((img, i) => (
              <div key={i} className="h-16 relative rounded-lg overflow-hidden border border-white/5 group aspect-[16/9]">
                <Image
                  src={img}
                  alt={`Reel snippet ${i + 1}`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
          <div className="shrink-0 flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Scroll</span>
            <Mouse className="size-3.5 animate-bounce text-accent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}