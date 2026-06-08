import { Camera, Film, Sparkles } from "lucide-react";
import { Reveal, SectionHeader } from "./Reveal";

const services = [
  {
    icon: Camera,
    title: "Photography",
    items: ["Brand Photography", "Product Photography", "Event Photography", "Portrait Sessions"],
  },
  {
    icon: Film,
    title: "Videography",
    items: ["Commercial Films", "Event Coverage", "Brand Videos", "Promotional Content"],
  },
  {
    icon: Sparkles,
    title: "Content Creation",
    items: ["Instagram Reels", "YouTube Videos", "Short-form Content", "Campaign Content"],
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeader
        eyebrow="Services"
        title="Crafted for brands, lovers, and storytellers."
        subtitle="Three disciplines, one obsession with detail. Pick what you need — or let me help you scope it."
      />
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="group relative h-full rounded-3xl border border-white/5 bg-surface p-8 hover:border-accent/20 hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(229,184,105,0.05)] transition-all duration-500 overflow-hidden">
              <div className="absolute -top-24 -right-24 size-64 rounded-full bg-accent/0 group-hover:bg-accent/10 blur-3xl transition-all duration-700" />
              <s.icon className="size-8 text-accent group-hover:scale-110 transition-transform duration-300" strokeWidth={1.4} />
              <h3 className="mt-6 font-display text-2xl md:text-3xl group-hover:text-accent transition-colors duration-300">{s.title}</h3>
              <ul className="mt-6 space-y-3 text-muted-foreground text-sm">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2.5 hover:text-foreground transition-colors duration-200 group/item">
                    <span className="size-1.5 rounded-full bg-accent group-hover/item:scale-125 transition-transform duration-200" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}