import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Public_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site-config";
import { buildLocalBusinessSchema } from "@/lib/schema-org";
import "./globals.css";

// Direction "Graphite et cuivre numérique" (docs/design/design-tokens.md) :
// Hanken Grotesk pour les titres, Public Sans pour le corps, JetBrains Mono
// pour les labels techniques. Poids limités et sous-ensemble latin uniquement
// (support du français canadien inclus dans le sous-ensemble "latin" de Google
// Fonts) pour limiter le nombre de fichiers générés par le build.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Infotechs Solutions | Développement web et automatisation IA pour PME",
    template: "%s | Infotechs Solutions",
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: "Infotechs Solutions" }],
  creator: "Infotechs Solutions",
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: site.url,
    siteName: site.name,
    title: "Infotechs Solutions",
    description: site.description,
    images: [{ url: "/images/hero-technology-workspace.png", width: 1536, height: 1024, alt: "Interfaces numériques modernes pour PME" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infotechs Solutions",
    description: site.description,
    images: ["/images/hero-technology-workspace.png"],
  },
  alternates: {
    canonical: site.url,
    languages: {
      "fr-CA": site.url,
      "x-default": site.url,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = buildLocalBusinessSchema(site);

  return (
    <html
      lang="fr-CA"
      className={`${hankenGrotesk.variable} ${publicSans.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-bg-950 text-text-100">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
