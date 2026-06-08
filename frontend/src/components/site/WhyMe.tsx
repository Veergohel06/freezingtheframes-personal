import { Reveal, SectionHeader } from "./Reveal";
import { Compass, Clapperboard, Zap, Workflow, Award, Eye, Share2, MessageCircle } from "lucide-react";

const reasons = [
  { i: Compass, t: "Creative Direction" },
  { i: Clapperboard, t: "Cinematic Storytelling" },
  { i: Zap, t: "Fast Delivery" },
  { i: Workflow, t: "Professional Workflow" },
  { i: Award, t: "Premium Quality" },
  { i: Eye, t: "Attention To Detail" },
  { i: Share2, t: "Social-Ready Content" },
  { i: MessageCircle, t: "Reliable Communication" },
];

export function WhyMe() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeader eyebrow="Why Work With Me" title="Built for brands that obsess over the details." />
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
        {reasons.map((r, i) => (
          <Reveal key={r.t} delay={i * 0.05}>
            <div className="rounded-2xl border border-white/5 bg-surface p-6 h-full hover:border-white/15 transition">
              <r.i className="size-5 text-accent" strokeWidth={1.5} />
              <p className="mt-4 font-display text-lg leading-snug">{r.t}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}