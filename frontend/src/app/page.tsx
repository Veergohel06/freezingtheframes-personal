import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { InteractiveBookingCalendar } from "@/components/site/InteractiveBookingCalendar";
import { Stats } from "@/components/site/Stats";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Showreel } from "@/components/site/Showreel";
import { Process } from "@/components/site/Process";
import { WhyMe } from "@/components/site/WhyMe";
import { Testimonials } from "@/components/site/Testimonials";
import { InstagramSection } from "@/components/site/Instagram";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://freezingtheframes.com/#business",
            name: "Freezing The Frames",
            description: "Premium photography and cinematic videography by Veer Gohel.",
            founder: { "@type": "Person", name: "Veer Gohel" },
            image: "/og-image.jpg",
            priceRange: "$$$",
            sameAs: ["https://instagram.com/freezingtheframes"],
          }),
        }}
      />
      <Nav />
      <main>
        <Hero />
        <About />
        <section className="relative mt-12 mx-auto max-w-5xl px-6 z-10 flex flex-col gap-12">
          <div id="booking" className="space-y-6 scroll-mt-28">
            <div className="text-center max-w-lg mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Direct Consultation Booking</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Select your preferred creative service, lock in a date from the real-time calendar, and book your shoot consultation instantly.
              </p>
            </div>
            <InteractiveBookingCalendar />
          </div>
        </section>
        <Stats />
        <Services />
        <Work />
        <Showreel />
        <Process />
        <WhyMe />
        <Testimonials />
        <InstagramSection />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
