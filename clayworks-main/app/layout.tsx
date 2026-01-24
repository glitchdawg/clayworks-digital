// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ClayWorks",
    default: "ClayWorks - Premium Coworking Spaces in Bangalore",
  },
  description:
    "Discover premium coworking spaces, private offices, and custom workspace solutions in Bangalore. Flexible plans, prime locations, and enterprise-grade amenities.",
  keywords: [
    "coworking bangalore",
    "private office",
    "workspace",
    "meeting rooms",
    "day pass",
    "virtual office",
    "built to suit",
    "office space bangalore",
  ],
  authors: [{ name: "ClayWorks" }],
  creator: "ClayWorks",
  publisher: "ClayWorks",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ClayWorks - Premium Coworking Spaces in Bangalore",
    description:
      "Flexible workspace solutions for startups and enterprises. Premium coworking spaces, private offices, and custom workspace solutions.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in",
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/clayworkspace.jpg",
        width: 1200,
        height: 630,
        alt: "ClayWorks Coworking Space",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClayWorks - Premium Coworking Spaces",
    description:
      "Flexible workspace solutions for modern teams. Premium coworking spaces, private offices, and custom workspace solutions in Bangalore.",
    images: ["/images/clayworkspace.jpg"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
