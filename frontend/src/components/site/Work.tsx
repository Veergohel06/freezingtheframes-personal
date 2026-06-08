"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionHeader } from "./Reveal";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";

type Project = { id: number; title: string; client: string; cat: string; img: string; span: string };

const projects: Project[] = [
  { id: 1, title: "Aarav x Meera", client: "Wedding Film", cat: "Weddings", img: typeof w1 === "string" ? w1 : w1.src, span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "Maison Noir", client: "Perfume Campaign", cat: "Commercial", img: typeof w2 === "string" ? w2 : w2.src, span: "" },
  { id: 3, title: "Editorial Vol. 04", client: "Portrait Series", cat: "Photography", img: typeof w3 === "string" ? w3 : w3.src, span: "md:row-span-2" },
  { id: 4, title: "Behind The Frame", client: "BTS Reel", cat: "Videography", img: typeof w4 === "string" ? w4 : w4.src, span: "md:col-span-2" },
  { id: 5, title: "Sacred Vows", client: "Wedding Story", cat: "Weddings", img: typeof w5 === "string" ? w5 : w5.src, span: "" },
  { id: 6, title: "Sound & Light", client: "Live Event", cat: "Events", img: typeof w6 === "string" ? w6 : w6.src, span: "md:col-span-2" },
];

const filters = ["All", "Photography", "Videography", "Commercial", "Events", "Weddings"];

export function Work() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Project | null>(null);
  const visible = projects.filter((p) => filter === "All" || p.cat === filter);

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-28 md:py-36">
      <SectionHeader
        eyebrow="Featured Work"
        title="Selected frames from recent stories."
        subtitle="A look into the projects that defined the last year — from intimate ceremonies to global campaigns."
      />

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              suppressHydrationWarning
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition ${
                filter === f
                  ? "bg-primary text-primary-foreground border-transparent"
                  : "glass border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-10 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[230px] gap-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.button
              layout
              key={p.id}
              onClick={() => setOpen(p)}
              suppressHydrationWarning
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl ${p.span}`}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-90 group-hover:opacity-100 transition" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{p.cat}</p>
                <h3 className="mt-1 font-display text-lg md:text-xl">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.client}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-background/85 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden glass"
            >
              <img src={open.img} alt={open.title} className="w-full aspect-[16/10] object-cover" />
              <div className="p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{open.cat}</p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">{open.title}</h3>
                <p className="mt-1 text-muted-foreground">{open.client}</p>
                <div className="mt-6 grid sm:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">Client</p>
                    <p className="mt-1">{open.client}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">Deliverables</p>
                    <p className="mt-1">Film · Stills · Reels</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">Year</p>
                    <p className="mt-1">2025</p>
                  </div>
                </div>
                <button onClick={() => setOpen(null)} suppressHydrationWarning className="mt-8 text-sm text-accent hover:underline underline-offset-4">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}