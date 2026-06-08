import { Reveal, SectionHeader } from "./Reveal";

const steps = [
  { n: "01", t: "Discovery", d: "We start with a conversation. Vision, audience, mood — the soul of the project." },
  { n: "02", t: "Strategy", d: "Concept boards, shotlists, references and a clear shape for the shoot day." },
  { n: "03", t: "Production", d: "On set with cinema-grade gear and a calm, focused team. Every minute counts." },
  { n: "04", t: "Editing", d: "Colour, sound, pacing. Edits crafted for emotion first, scrolls second." },
  { n: "05", t: "Delivery", d: "Final masters delivered across every format you need — print, web, social." },
];

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeader eyebrow="Process" title="A calm, considered way of working." />
      <div className="mt-16 relative">
        {/* Timeline connecting line */}
        <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className={`relative grid md:grid-cols-2 gap-6 md:gap-16 py-8 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
              <div className="flex items-start gap-6 [direction:ltr] group">
                {/* Step bubble */}
                <div className="relative shrink-0">
                  <div className="size-14 rounded-full glass border border-white/10 flex items-center justify-center font-display text-lg group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(229,184,105,0.15)] transition-all duration-500">
                    <span className="text-accent">{s.n}</span>
                  </div>
                  {/* Connector dot on timeline */}
                  <span className="absolute top-1/2 -translate-y-1/2 -right-[calc(1.75rem+0.5px)] hidden md:block size-2 rounded-full bg-accent/60" />
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-2xl md:text-3xl group-hover:text-accent transition-colors duration-300">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground max-w-md leading-relaxed">{s.d}</p>
                </div>
              </div>
              <div className="hidden md:block" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}