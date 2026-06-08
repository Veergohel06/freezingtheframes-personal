import { SectionHeader } from "./Reveal";

const items = [
  { n: "Aarav Mehta", b: "Founder, Noir Studio", q: "Veer turned our launch shoot into a film we still share two years later. Surreal eye, calm presence." },
  { n: "Riya Sharma", b: "Bride, Mumbai", q: "He didn't just capture our wedding — he captured how it felt. Every frame is a memory." },
  { n: "Karan Patel", b: "Creative Director", q: "A rare blend of taste and craft. The man understands story, not just shutter speed." },
  { n: "Anika Roy", b: "Beauty Brand Founder", q: "Our campaign visuals out-performed every previous shoot. Worth every rupee." },
  { n: "Devansh K.", b: "Musician", q: "He made my first music video feel like a Spike Jonze short. Felt very, very seen." },
  { n: "Meera S.", b: "Bride, Surat", q: "Patient, intuitive, ridiculously talented. The reels alone broke the internet for us." },
];

function Card({ n, b, q }: { n: string; b: string; q: string }) {
  return (
    <div className="w-[340px] md:w-[420px] shrink-0 glass rounded-2xl p-7">
      <p className="text-foreground/90 text-[15px] leading-relaxed">"{q}"</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="size-9 rounded-full bg-gradient-to-br from-accent/60 to-accent/20 ring-1 ring-white/10" />
        <div>
          <p className="text-sm font-medium">{n}</p>
          <p className="text-xs text-muted-foreground">{b}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...items, ...items];
  return (
    <section className="py-28 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Kind Words" title="From the people behind the projects." />
      </div>
      <div className="mt-14 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="marquee-track flex gap-5 w-max">
          {doubled.map((t, i) => <Card key={i} {...t} />)}
        </div>
      </div>
    </section>
  );
}