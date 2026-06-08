"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  Video,
  Camera,
  Briefcase,
  Sparkles,
  Check
} from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, startOfDay, addDays } from "date-fns";

interface BookingSlot {
  time: string;
  available: boolean;
}

const SERVICES = [
  { id: "wedding", name: "Wedding Film / Photo", icon: Sparkles, duration: "6-12 Hours" },
  { id: "portrait", name: "Creative Portrait", icon: Camera, duration: "2 Hours" },
  { id: "commercial", name: "Commercial / Brand", icon: Briefcase, duration: "4 Hours" },
  { id: "consult", name: "15-Min Consultation", icon: Video, duration: "15 Mins" },
];

export function InteractiveBookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1)); // Default to tomorrow
  const [selectedService, setSelectedService] = useState(SERVICES[3].id); // Default to Consultation
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingStep, setBookingStep] = useState<"calendar" | "success">("calendar");

  // Get all days of the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Generate dynamic, simulated time slots based on the chosen date and service
  useEffect(() => {
    setLoadingSlots(true);
    setSelectedTimeSlot(null);

    const timer = setTimeout(() => {
      // Simulate real-time randomized booking slot availability
      const baseSlots = [
        "09:00 AM",
        "10:30 AM",
        "11:00 AM",
        "01:30 PM",
        "03:00 PM",
        "04:30 PM",
        "06:00 PM",
      ];
      
      const simulatedSlots = baseSlots.map((time) => {
        // Deterministic random based on date/service
        const seed = (selectedDate.getDate() + time.length + selectedService.length) % 10;
        return {
          time,
          available: seed > 3, // ~70% chance of availability
        };
      });

      setSlots(simulatedSlots);
      setLoadingSlots(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [selectedDate, selectedService]);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleBooking = () => {
    if (!selectedTimeSlot) return;
    setBookingStep("success");
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-white/10 glass overflow-hidden shadow-[0_30px_100px_-20px_rgba(229,184,105,0.15)]">
      <AnimatePresence mode="wait">
        {bookingStep === "calendar" ? (
          <motion.div
            key="calendar-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10"
          >
            {/* Left Column: Services and Details */}
            <div className="md:col-span-4 p-6 md:p-8 flex flex-col gap-6 bg-zinc-950/20">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Step 1</span>
                <h3 className="text-2xl font-bold font-display mt-1 tracking-tight">Select Experience</h3>
              </div>

              <div className="flex flex-col gap-3">
                {SERVICES.map((service) => {
                  const Icon = service.icon;
                  const isSelected = selectedService === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      suppressHydrationWarning
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 relative overflow-hidden group ${
                        isSelected
                          ? "bg-accent/10 border-accent text-accent shadow-[0_0_20px_rgba(229,184,105,0.1)]"
                          : "bg-white/[0.02] border-white/5 hover:border-white/15 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeServiceGlow"
                          className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none"
                        />
                      )}
                      <div className={`size-10 rounded-xl flex items-center justify-center border transition-colors ${
                        isSelected ? "bg-accent/20 border-accent/30 text-accent" : "bg-white/5 border-white/10 group-hover:bg-white/10"
                      }`}>
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold tracking-tight">{service.name}</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5 block">{service.duration}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Booking Summary Box */}
              <div className="mt-auto pt-6 border-t border-white/15 bg-white/[0.01] rounded-2xl p-4 border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2 font-medium">Selected Slot</span>
                <div className="flex items-start gap-3">
                  <CalendarIcon className="size-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-foreground">
                      {format(selectedDate, "eeee, dd MMMM yyyy")}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Clock className="size-3 text-accent" />
                      {selectedTimeSlot ? selectedTimeSlot : "Select a time slot"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Month view, Horizontal Scroll Dates, Slots */}
            <div className="md:col-span-8 p-6 md:p-8 flex flex-col gap-6">
              {/* Header Navigation */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Step 2</span>
                  <h3 className="text-2xl font-bold font-display mt-1 tracking-tight">Select Date & Time</h3>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1">
                  <button
                    onClick={handlePrevMonth}
                    disabled={isBefore(monthStart, new Date())}
                    suppressHydrationWarning
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <span className="text-xs font-bold font-display min-w-[90px] text-center tracking-wide" suppressHydrationWarning>
                    {format(currentMonth, "MMMM yyyy")}
                  </span>
                  <button
                    onClick={handleNextMonth}
                    suppressHydrationWarning
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Dates */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 snap-x">
                  {daysInMonth.map((day) => {
                    const isSelected = isSameDay(selectedDate, day);
                    const isDisabled = isBefore(day, startOfDay(new Date()));
                    return (
                      <button
                        key={day.toISOString()}
                        disabled={isDisabled}
                        onClick={() => setSelectedDate(day)}
                        suppressHydrationWarning
                        className={`min-w-[65px] h-[85px] rounded-xl flex flex-col items-center justify-center border transition-all snap-center relative ${
                          isSelected
                            ? "bg-accent border-accent text-background shadow-[0_0_20px_rgba(229,184,105,0.3)] scale-[1.03]"
                            : isDisabled
                            ? "opacity-25 pointer-events-none border-white/5"
                            : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className={`text-[9px] uppercase tracking-wider ${isSelected ? "text-background/80 font-bold" : "text-muted-foreground"}`}>
                          {format(day, "eee")}
                        </span>
                        <span className="text-xl font-bold font-display mt-1.5">{format(day, "d")}</span>
                        {/* Tiny Indicator Dot */}
                        <span className={`size-1 rounded-full mt-2 ${isSelected ? "bg-background" : "bg-accent/40"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Area */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Available Slots</h4>
                
                <div className="min-h-[160px] relative">
                  {loadingSlots ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    >
                      {slots.map((slot, i) => {
                        const isSelected = selectedTimeSlot === slot.time;
                        return (
                          <button
                            key={i}
                            disabled={!slot.available}
                            onClick={() => setSelectedTimeSlot(slot.time)}
                            suppressHydrationWarning
                            className={`p-3.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                              isSelected
                                ? "bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(229,184,105,0.05)] scale-[1.02]"
                                : slot.available
                                ? "bg-white/[0.01] border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
                                : "opacity-35 border-transparent bg-white/[0.002] line-through pointer-events-none"
                            }`}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-4 flex justify-end">
                <button
                  disabled={!selectedTimeSlot}
                  onClick={handleBooking}
                  suppressHydrationWarning
                  className="px-8 py-3.5 rounded-full bg-accent text-background font-bold text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-[0_10px_30px_rgba(229,184,105,0.2)]"
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-12 text-center flex flex-col items-center max-w-xl mx-auto"
          >
            <div className="size-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mb-6 text-accent">
              <Check className="size-8" />
            </div>
            
            <h3 className="font-display text-3xl font-bold mb-3 tracking-tight">Booking Confirmed!</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              We've successfully scheduled your session. An invite with meeting details has been dispatched to your email address.
            </p>

            <div className="w-full bg-white/[0.02] border border-white/5 p-5 rounded-2xl mb-8 text-left space-y-3">
              <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
                <span className="text-muted-foreground font-medium">Session Type:</span>
                <span className="font-semibold text-accent">
                  {SERVICES.find((s) => s.id === selectedService)?.name}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
                <span className="text-muted-foreground font-medium">Date:</span>
                <span className="font-semibold text-foreground">
                  {format(selectedDate, "dd MMMM yyyy")}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-medium">Time:</span>
                <span className="font-semibold text-foreground">{selectedTimeSlot}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedTimeSlot(null);
                setBookingStep("calendar");
              }}
              className="text-xs text-accent hover:underline underline-offset-4 tracking-wider font-semibold uppercase"
            >
              Book Another Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
