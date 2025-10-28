import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InternFinder",
  description: "Plateforme pour regrouper et postuler aux offres de stage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} ${geistMono.variable} antialiased`}>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-(--tint) blur-3xl opacity-90" />
          <div className="absolute -right-40 top-24 h-80 w-80 rounded-full bg-(--brand) blur-3xl opacity-40" />
          <div className="absolute left-1/3 -bottom-32 h-96 w-96 rounded-full bg-(--tint) blur-3xl opacity-70" />
        </div>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
