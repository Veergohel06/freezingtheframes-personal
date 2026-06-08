import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-accent/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 size-[400px] rounded-full bg-accent/10 blur-[100px]" style={{ animation: "float-slow 10s ease-in-out infinite" }} />
      </div>
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.5em] text-accent mb-6">Let's Create Together</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-5xl md:text-8xl leading-[0.95] text-balance text-glow">
            Ready To Bring Your <br />
            <span className="italic text-muted-foreground">Vision To Life?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Let's create visuals that leave a lasting impression — frames that freeze time.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative rounded-full bg-primary text-primary-foreground px-8 py-4 text-sm font-medium hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(229,184,105,0.15)] hover:shadow-[0_0_50px_rgba(229,184,105,0.3)]"
            >
              Book a Shoot
              <span className="absolute inset-0 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </a>
            <a href="#contact" className="rounded-full glass border border-white/10 px-8 py-4 text-sm font-medium hover:bg-white/[0.08] hover:border-accent/30 transition-all duration-300">
              Schedule a Call
            </a>
            <a href="#work" className="rounded-full px-8 py-4 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              View Portfolio →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}