"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#booking", label: "Calendar" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(96vw,1100px)]"
    >
      <div className="glass glow-border rounded-full px-5 py-2.5 flex items-center justify-between shadow-lg">
        {/* Spacer to keep original navbar alignment after removing logo */}
        <div className="w-24 shrink-0" />

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-foreground transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="#contact"
          className="text-xs md:text-sm rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-medium hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          Book a Shoot
        </a>
      </div>
    </motion.header>
  );
}