export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl">Freezing The Frames</p>
          <p className="mt-2 text-sm text-muted-foreground">Photography · Videography · Visual Storytelling</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm md:justify-center">
          {["Home", "About", "Services", "Portfolio", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition">{l}</a>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-end">
          {[
            { l: "Instagram", h: "https://instagram.com/freezingtheframes" },
            { l: "YouTube", h: "#" },
            { l: "LinkedIn", h: "#" },
            { l: "Behance", h: "#" },
          ].map((s) => (
            <a key={s.l} href={s.h} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition">{s.l}</a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground" suppressHydrationWarning>
        © {new Date().getFullYear()} Freezing The Frames · Crafted by Veer Gohel
      </div>
    </footer>
  );
}