"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Check, Loader2, Send, ChevronDown } from "lucide-react";
import { submitEnquiry } from "@/app/actions";

const projectTypes = ["Wedding", "Brand Film", "Portrait", "Product", "Event", "Reels"];
const budgets = ["Under ₹25k", "₹25k – ₹75k", "₹75k – ₹2L", "₹2L – ₹5L", "₹5L+"];

interface CustomDropdownProps {
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export function CustomDropdown({ name, placeholder, options, value, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <input type="hidden" name={name} value={value} />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-foreground/[0.02] border rounded-2xl px-5 py-4 text-left flex items-center justify-between text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 backdrop-blur-md hover:bg-foreground/[0.04] focus:outline-none ${
          isOpen
            ? "border-accent shadow-[0_0_15px_rgba(229,184,105,0.15)] bg-foreground/[0.03]"
            : "border-foreground/10 hover:border-foreground/15"
        }`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground/60"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground/80 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 left-0 right-0 mt-2 bg-card/95 border border-border rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl overflow-hidden max-h-[300px] overflow-y-auto no-scrollbar"
          >
            {options.map((opt) => {
              const isSelected = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group my-0.5 ${
                    isSelected
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                  }`}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                    {opt}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Check className="size-4 text-accent" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      project_type: String(fd.get("project_type") || ""),
      budget_range: String(fd.get("budget_range") || ""),
      preferred_date: String(fd.get("preferred_date") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
    };
    if (!data.name.trim() || !data.email.trim()) {
      toast.error("Please share your name and email.");
      return;
    }
    setLoading(true);
    try {
      await submitEnquiry(data);
      setDone(true);
      toast.success("Enquiry sent. I'll be in touch shortly.");
      form.reset();
      setProjectType("");
      setBudgetRange("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-6 md:p-10 text-center flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="size-14 rounded-full bg-accent/20 flex items-center justify-center mb-6 ring-1 ring-accent/40 relative"
        >
          {/* Animated pulsing outer waves */}
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-accent/40"
          />
          <motion.div
            animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
            className="absolute -inset-2 rounded-full border border-accent/20"
          />
          <Check className="size-6 text-accent relative z-10" />
        </motion.div>
        <h3 className="font-display text-2xl md:text-3xl mb-2">Enquiry Received!</h3>
        <p className="text-muted-foreground text-sm max-w-md mb-6">
          Your enquiry has been received successfully.
        </p>
        
        {calLink ? (
          <>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              To speed things up, you can instantly schedule a 15-minute consultation call with me below:
            </p>
            <div className="w-full min-h-[480px] bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden mb-6">
              <iframe
                src={`${calLink}${calLink.includes("?") ? "&" : "?"}embed=true`}
                className="w-full h-[480px] border-0"
                allow="camera; microphone; autoplay; clipboard-write"
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 py-6 w-full max-w-md">
            <p className="text-muted-foreground text-sm leading-relaxed">
              I will review your message and get back to you within 24 hours. In the meantime, feel free to reach out directly via WhatsApp for urgent queries.
            </p>
            <a
              href="https://wa.me/917744045416?text=Hi%20Veer,%20I%20just%20submitted%20a%20project%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent text-accent-foreground px-6 py-3.5 text-sm font-medium hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_20px_rgba(229,184,105,0.2)] hover:shadow-[0_0_35px_rgba(229,184,105,0.4)]"
            >
              Chat on WhatsApp
            </a>
          </div>
        )}

        <button
          onClick={() => setDone(false)}
          className="text-xs text-accent hover:underline underline-offset-4 mt-4"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  const inputCls =
    "w-full bg-foreground/[0.02] border border-foreground/10 rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-all duration-300 backdrop-blur-md hover:bg-foreground/[0.04] hover:border-foreground/15 focus:bg-foreground/[0.03]";

  return (
    <form onSubmit={onSubmit} className={`glass rounded-3xl p-6 md:p-10 ${compact ? "" : "shadow-[0_30px_120px_-30px_var(--glow)]"}`} suppressHydrationWarning>
      {!compact && (
        <>
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Start a project</p>
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-8 text-balance">
            Let's Create Something <span className="italic text-muted-foreground">Extraordinary.</span>
          </h2>
        </>
      )}

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden suppressHydrationWarning />

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <input name="name" required placeholder="Your name" className={inputCls} suppressHydrationWarning />
        <input name="email" type="email" required placeholder="Email address" className={inputCls} suppressHydrationWarning />
        <input name="phone" placeholder="Phone (optional)" className={inputCls} suppressHydrationWarning />
        <input name="preferred_date" type="date" className={`${inputCls} [color-scheme:dark]`} suppressHydrationWarning />
        <CustomDropdown
          name="project_type"
          placeholder="Project type"
          options={projectTypes}
          value={projectType}
          onChange={setProjectType}
        />
        <CustomDropdown
          name="budget_range"
          placeholder="Budget range"
          options={budgets}
          value={budgetRange}
          onChange={setBudgetRange}
        />
        <textarea
          name="message"
          rows={3}
          placeholder="Tell me about your project…"
          className={`${inputCls} md:col-span-2 resize-none`}
          suppressHydrationWarning
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:scale-[1.02] transition disabled:opacity-60"
        suppressHydrationWarning
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {loading ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}