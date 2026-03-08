import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundSequence from "../components/BackgroundSequence";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PawMatch - Meet Local Pet Lovers",
  description: "Ludhiana's favorite casual meetup club for pet owners and enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased bg-transparent font-display text-slate-900 overflow-x-hidden min-h-screen flex flex-col relative`}>
        <BackgroundSequence />
        <div className="flex-grow z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
