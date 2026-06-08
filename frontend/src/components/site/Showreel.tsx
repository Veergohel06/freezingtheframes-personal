import { Play } from "lucide-react";
import { Reveal } from "./Reveal";

export function Showreel() {
  return (
    <section id="showreel" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 -z-10 cinematic-gradient" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,oklch(0.85_0.09_75/0.12),transparent_70%)]" />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-accent mb-5">Showreel · 2025</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
            Every Frame Has <span className="italic text-muted-foreground">A Story.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <button suppressHydrationWarning className="group mt-12 inline-flex items-center gap-4 rounded-full glass pl-2 pr-8 py-2 hover:bg-white/[0.06] transition">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground transition group-hover:scale-105">
              <Play className="size-5 fill-current ml-0.5" />
            </span>
            <span className="text-sm font-medium">Play 90-second reel</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}