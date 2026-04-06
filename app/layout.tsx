import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AHL — Ahmadiyya Hockey League",
  description: "Official stats, standings, and schedule for the Ahmadiyya Hockey League",
  openGraph: {
    title: "Ahmadiyya Hockey League",
    description: "Official stats, standings, and schedule",
    images: [{ url: "/ahl-logo-v2.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    images: ["/ahl-logo-v2.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <Nav />
<main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
