import type { Metadata } from "next";
import { Toaster } from "sonner";
import { CustomCursor } from "@/components/site/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import "../styles.css";

export const metadata: Metadata = {
  title: "Freezing The Frames | Cinematic Photography & Films by Veer Gohel",
  description: "Premium cinematic filmmaking and editorial photography based in Surat, India. Capturing brands, weddings, and commercial visuals globally.",
  keywords: ["Cinematic photography", "Wedding filmmaker Surat", "Editorial portrait photographer India", "Freezing The Frames", "Veer Gohel photography", "Commercial films Surat"],
  authors: [{ name: "Veer Gohel" }],
  creator: "Veer Gohel",
  metadataBase: new URL("https://freezingtheframes.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Freezing The Frames | Cinematic Photography & Films",
    description: "Premium cinematic filmmaking and editorial photography by Veer Gohel. Capturing moments. Crafting stories.",
    url: "https://freezingtheframes.com",
    siteName: "Freezing The Frames",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Freezing The Frames Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freezing The Frames | Cinematic Photography & Films",
    description: "Premium cinematic filmmaking and editorial photography by Veer Gohel.",
    creator: "@freezingtheframes",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="film-light-leak" aria-hidden="true" />
        <CustomCursor />
        <Toaster position="top-center" theme="dark" richColors />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
