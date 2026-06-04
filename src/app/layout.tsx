import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bosco dell'Aquila - Appartamenti per giovani",
  description: "Residenza con 14 appartamenti moderni e spazi condivisi in Via Aquila 8 a Torino.",
};

// 1. Force Light Mode on Mobile (Fixes the black border/notch)
export const viewport: Viewport = {
  themeColor: "#f9fafb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      {/* 2. Force light mode CSS classes */}
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased flex flex-col min-h-screen`}>
        
        {/* Main Content: Grow to fill space, full width */}
        <main className="flex-grow w-full">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>

        {/* 3. Global Footer (Appears on EVERY page) */}
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="container mx-auto px-4 text-center">
            <h4 className="font-bold text-lg mb-4">Bosco dell&apos;Aquila 🦅</h4>
                
                <div className="space-y-2 text-gray-600 text-sm mb-8">
                    <p>Via Aquila 8, 10144 Torino (TO)</p>
                    <p>
                        <a href="mailto:info@boscodellaquila.it" className="text-blue-600 hover:underline">
                            info@boscodellaquila.it
                        </a>
                    </p>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Tutti i diritti riservati.</p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <a href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>

      </body>
    </html>
  );
}