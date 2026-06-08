"use client";

import { Reveal } from "./Reveal";
import Image from "next/image";
import portrait from "@/assets/veer-portrait.jpg";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Award, Compass } from "lucide-react";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
        
        {/* Left Column: Premium Portrait Card */}
        <div className="md:col-span-5 flex justify-center md:justify-start">
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="bg-[#fcfbf7] p-4 pb-10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-[#f0eee4] w-full max-w-[340px] relative group cursor-pointer"
          >
            {/* Top Tag */}
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3">
              IT'S ME
            </div>

            {/* Main Portrait Frame */}
            <div className="w-full aspect-[4/5] relative bg-zinc-900 rounded overflow-hidden">
              <Image
                src={portrait}
                alt="Veer Gohel — founder of Freezing The Frames"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {/* Bottom Details Box inside card */}
            <div className="pt-4 space-y-1">
              <span className="font-display font-bold text-xl text-zinc-800 tracking-tight block">
                VEER GOHEL
              </span>
              <span className="text-[10px] text-zinc-500 font-medium block">
                Instagram: @freezingtheframes
              </span>
            </div>

            {/* Luxury Shadow overlay */}
            <div className="absolute -inset-1 rounded-xl bg-accent/5 blur-xl -z-10 group-hover:bg-accent/10 transition-colors" />
          </motion.div>
        </div>

        {/* Right Column: About Content with Editorial details */}
        <div className="md:col-span-7 space-y-8">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-accent mb-2">Who I Am</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
                Veer Gohel
              </h2>
            </Reveal>
          </div>

          {/* Horizontal pills */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2.5">
              {["01+ Year Active", "Films", "Portraits", "Commercial"].map((pill, i) => (
                <span
                  key={i}
                  className="rounded-full border border-foreground/10 bg-foreground/[0.02] px-4.5 py-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-muted-foreground backdrop-blur-md"
                >
                  {pill}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Text content */}
          <Reveal delay={0.3}>
            <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                I'm a visual storyteller drawn to the in-between — <span className="italic text-foreground">the breath before a kiss, the gleam in a founder's eye, the light that exists for only a heartbeat.</span>
              </p>
              <p>
                Through <span className="text-foreground font-semibold">Freezing The Frames</span>, I help brands, creators, and couples transform fleeting moments into cinematic artefacts. Every frame is captured with intention, edited with restraint, and crafted to a standard worthy of your wall, your feed, and your story.
              </p>
              <p className="text-foreground/90 font-medium">
                If it's worth remembering, it's worth filming properly.
              </p>
            </div>
          </Reveal>

          {/* Bottom check capabilities */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-3 pt-4">
              {[
                "Creative Direction",
                "Cinematic Filmmaking",
                "Editorial Photography",
                "Brand Storytelling",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2.5 rounded-lg bg-foreground/[0.02] border border-foreground/10 px-4 py-3 text-sm font-medium hover:border-accent/20 transition-colors"
                >
                  <span className="size-4.5 rounded bg-foreground/10 flex items-center justify-center text-accent">
                    ✓
                  </span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}