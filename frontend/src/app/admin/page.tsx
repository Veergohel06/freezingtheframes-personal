"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Inbox,
  User,
  Mail,
  Phone,
  Calendar,
  IndianRupee,
  Film,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  budget_range: string | null;
  preferred_date: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    // 1. Fetch initial enquiries
    async function fetchEnquiries() {
      try {
        const { data, error } = await supabase
          .from("enquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setEnquiries(data || []);
      } catch (err) {
        console.error("Error fetching enquiries:", err);
        toast.error("Failed to load enquiries.");
      } finally {
        setLoading(false);
      }
    }

    fetchEnquiries();

    // 2. Real-time subscription
    const channel = supabase
      .channel("realtime-enquiries")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "enquiries" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newEnquiry = payload.new as Enquiry;
            setEnquiries((prev) => [newEnquiry, ...prev]);
            toast.success(`New enquiry from ${newEnquiry.name}!`, {
              duration: 5000,
            });
            // Play a subtle notification sound if allowed by browser
            try {
              const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-500.wav");
              audio.volume = 0.2;
              audio.play();
            } catch (soundErr) {
              // Ignore audio errors (blocked autoplay, etc.)
            }
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as Enquiry;
            setEnquiries((prev) =>
              prev.map((item) => (item.id === updated.id ? updated : item))
            );
            setSelectedEnquiry((prev) => (prev?.id === updated.id ? updated : prev));
          } else if (payload.eventType === "DELETE") {
            const deletedId = payload.old.id;
            setEnquiries((prev) => prev.filter((item) => item.id !== deletedId));
            setSelectedEnquiry((prev) => (prev?.id === deletedId ? null : prev));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function updateStatus(id: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Enquiry marked as ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 text-accent">
            <Inbox className="size-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">Real-time Project Enquiries</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-muted-foreground font-medium">Live Feed Connected</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid md:grid-cols-12 gap-6 min-h-[calc(100vh-73px)]">
        {/* Enquiries List */}
        <section className="md:col-span-5 flex flex-col h-[calc(100vh-120px)] border border-white/10 rounded-2xl bg-zinc-950/40 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-950/80">
            <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Inbox ({enquiries.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 scrollbar-thin">
            {loading ? (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Loading enquiries...
              </div>
            ) : enquiries.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <Inbox className="size-10 mb-3 text-muted-foreground/35" />
                <p className="text-sm">No enquiries found</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Submit the contact form to see real-time updates</p>
              </div>
            ) : (
              enquiries.map((enq) => {
                const isSelected = selectedEnquiry?.id === enq.id;
                const dateString = format(new Date(enq.created_at), "dd MMM, hh:mm a");
                return (
                  <button
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className={`w-full text-left p-4 transition-colors flex flex-col gap-2 relative ${
                      isSelected ? "bg-accent/10" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />}
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm text-foreground pr-2 truncate">{enq.name}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{dateString}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground truncate max-w-[80%]">
                        {enq.project_type || "No service specified"}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          enq.status === "new"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : enq.status === "read"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </section>

        {/* Details View */}
        <section className="md:col-span-7 h-[calc(100vh-120px)] border border-white/10 rounded-2xl bg-zinc-950/40 overflow-hidden flex flex-col">
          {selectedEnquiry ? (
            <div className="flex flex-col h-full">
              {/* Card Header */}
              <div className="p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-4 bg-zinc-950/80">
                <div>
                  <h2 className="text-xl font-bold font-display">{selectedEnquiry.name}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Submitted on {format(new Date(selectedEnquiry.created_at), "PPPP 'at' p")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(selectedEnquiry.id, "read")}
                    className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-medium transition"
                  >
                    Mark as Read
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnquiry.id, "completed")}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="size-3.5" /> Complete
                  </button>
                </div>
              </div>

              {/* Details Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Meta details list */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <Mail className="size-4 text-accent shrink-0" />
                    <div className="overflow-hidden">
                      <span className="block text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Email</span>
                      <a href={`mailto:${selectedEnquiry.email}`} className="text-xs text-foreground hover:underline truncate block">
                        {selectedEnquiry.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <Phone className="size-4 text-accent shrink-0" />
                    <div className="overflow-hidden">
                      <span className="block text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Phone</span>
                      <span className="text-xs text-foreground truncate block">
                        {selectedEnquiry.phone || "Not provided"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <Film className="size-4 text-accent shrink-0" />
                    <div className="overflow-hidden">
                      <span className="block text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Project Type</span>
                      <span className="text-xs text-foreground truncate block">
                        {selectedEnquiry.project_type || "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <IndianRupee className="size-4 text-accent shrink-0" />
                    <div className="overflow-hidden">
                      <span className="block text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Budget Range</span>
                      <span className="text-xs text-foreground truncate block">
                        {selectedEnquiry.budget_range || "Not specified"}
                      </span>
                    </div>
                  </div>

                  {selectedEnquiry.preferred_date && (
                    <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl col-span-2">
                      <Calendar className="size-4 text-accent shrink-0" />
                      <div className="overflow-hidden">
                        <span className="block text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Preferred Date</span>
                        <span className="text-xs text-foreground truncate block">
                          {selectedEnquiry.preferred_date}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    <MessageSquare className="size-3.5 text-accent" />
                    <span>Message / Details</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl text-sm leading-relaxed text-foreground min-h-[140px] whitespace-pre-wrap">
                    {selectedEnquiry.message || "No message or comments provided by client."}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
              <Inbox className="size-14 mb-4 text-muted-foreground/25" />
              <h3 className="font-display text-lg font-medium mb-1">No Enquiry Selected</h3>
              <p className="text-xs text-muted-foreground/60 max-w-sm">
                Select an enquiry from the left sidebar to view contact details, message contents, and update status.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
