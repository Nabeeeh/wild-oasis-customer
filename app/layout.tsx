import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_context/ReservationContext";

import { AuthProvider } from "./_context/AuthContext";
import { SessionProvider } from "next-auth/react";

import Header from "./_components/Header";

import "@/app/_styles/globals.css";

export const metadata: Metadata = {
  title: { template: "%s |  Wild Oasis", default: "Welcome | Wild Oasis" },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

const josefinFont = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AuthProvider>
        <html lang="en">
          <body
            className={`${josefinFont.className} min-h-dvh bg-primary-950 text-primary-100 antialiased flex flex-col relative`}
          >
            <Header />

            <div className="flex-1 px-3 py-8 sm:px-8 md:px-8 md:py-12 grid">
              <main className="max-w-7xl mx-auto w-full">
                <ReservationProvider>{children}</ReservationProvider>
              </main>
            </div>
          </body>
        </html>
      </AuthProvider>
    </SessionProvider>
  );
}
