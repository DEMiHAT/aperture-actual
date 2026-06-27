import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { MomentsRoot } from "@/components/moments/MomentsRoot";
import { PersonalRoot } from "@/components/personal/PersonalRoot";
import { site } from "@/lib/site";

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
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Aperture Technologies designs and engineers scalable software products, enterprise platforms, and AI-powered solutions that help businesses innovate, automate, and grow.",
  keywords: ["Software Development", "Digital Transformation", "AI Solutions", "Enterprise Platform"],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description:
      "Scalable software products, enterprise platforms, and AI-powered solutions.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email.general,
  telephone: site.phone.display,
  foundingDate: String(site.foundedYear),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [site.social.linkedin, site.social.github],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${grotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <ScrollProgress />
        <MomentsRoot>
          <PersonalRoot>
            <Navbar />
            <main className="flex-1 flex flex-col relative z-10">{children}</main>
            <Footer />
          </PersonalRoot>
        </MomentsRoot>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
