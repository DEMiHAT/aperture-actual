import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Silian Rail — elegant high-contrast display serif
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Clean grotesque for body + UI
const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Aperture | Engineering Intelligent Digital Experiences",
  description: "We design and engineer scalable software products, enterprise platforms, and AI-powered solutions that help businesses innovate, automate, and grow.",
  keywords: ["Software Development", "Digital Transformation", "AI Solutions", "Enterprise Platform"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${grotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 flex flex-col relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
