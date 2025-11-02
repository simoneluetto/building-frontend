import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bosco dell'Aquila - Appartamenti per giovani",
  description: "Una nuova residenza con 14 appartamenti moderni a Torino, pensata per studenti e giovani lavoratori.",
};

// We add a type for the 'children' prop to make our layout type-safe.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        {/* <Header /> */}
        <main className="container mx-auto px-6 py-8">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
        <footer className="text-center py-6 mt-12 bg-white border-t">
            <p>&copy; {new Date().getFullYear()} Bosco dell'Aquila. Tutti i diritti riservati.</p>
            <p className="text-sm text-gray-500 mt-1">Via Aquila 8, 10144 Torino TO</p>
            <p className="text-sm text-gray-500 mt-1">Mail: info@boscodellaquila.it</p>
        </footer>
      </body>
    </html>
  );
}
