import { Mail, Phone, MapPin, Instagram as IgIcon, MessageCircle } from "lucide-react";
import { EnquiryForm } from "./EnquiryForm";
import { Reveal, SectionHeader } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeader
        eyebrow="Let's Talk"
        title="Tell me about your project."
        subtitle="Whether it's a wedding, a launch film, or a portrait sitting — I read every enquiry personally."
      />
      <div className="mt-14 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-5 text-sm">
          {[
            { href: "mailto:freezingtheframes@gmail.com", icon: Mail, label: "Email", value: "freezingtheframes@gmail.com", delay: 0 },
            { href: "tel:+917744045416", icon: Phone, label: "Phone", value: "+91 7744045416", delay: 0.05 },
            { href: "https://instagram.com/freezingtheframes", icon: IgIcon, label: "Instagram", value: "@freezingtheframes", delay: 0.1, external: true },
          ].map(({ href, icon: Icon, label, value, delay, external }) => (
            <Reveal key={label} delay={delay}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-start gap-4"
              >
                <span className="size-11 rounded-full glass border border-foreground/10 flex items-center justify-center group-hover:border-accent/40 group-hover:shadow-[0_0_16px_rgba(229,184,105,0.2)] transition-all duration-400">
                  <Icon className="size-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                </span>
                <span className="pt-0.5">
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</span>
                  <span className="text-base group-hover:text-accent transition-colors duration-300">{value}</span>
                </span>
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <div className="flex items-start gap-4">
              <span className="size-11 rounded-full glass border border-foreground/10 flex items-center justify-center">
                <MapPin className="size-4 text-muted-foreground" />
              </span>
              <span className="pt-0.5">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Based In</span>
                <span className="text-base">Dahanu , Maharashtra · Available worldwide</span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="https://wa.me/917744045416?text=Hi%20Veer,%20I%20would%20like%20to%20book%20a%20shoot."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-accent text-accent-foreground px-6 py-3.5 text-sm font-medium hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_20px_rgba(229,184,105,0.2)] hover:shadow-[0_0_35px_rgba(229,184,105,0.4)]"
            >
              <MessageCircle className="size-4 group-hover:rotate-12 transition-transform duration-300" />
              Book via WhatsApp
            </a>
          </Reveal>
        </div>
        <div className="md:col-span-3">
          <EnquiryForm compact />
        </div>
      </div>
    </section>
  );
}
