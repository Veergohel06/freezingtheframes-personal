import { Instagram as IgIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import Image from "next/image";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";

const tiles = [w1, w3, w5, w2, w6, w4];

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-accent mb-4">@freezingtheframes</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">Follow The Journey.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <a
            href="https://instagram.com/freezingtheframes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm hover:bg-white/[0.08] transition"
          >
            <IgIcon className="size-4" /> Follow @freezingtheframes
          </a>
        </Reveal>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {tiles.map((src, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <a href="https://instagram.com/freezingtheframes" target="_blank" rel="noreferrer" className="block group relative aspect-square overflow-hidden rounded-xl">
              <Image src={src} alt={`Photography work ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition flex items-center justify-center">
                <IgIcon className="size-5 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}