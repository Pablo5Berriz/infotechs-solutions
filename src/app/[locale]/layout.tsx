import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {isLocale,localizedPath} from '@/i18n/paths';
import type {Content} from '@/i18n/content';
import {getSiteConfig} from '@/lib/site-config';
import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Public_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site-config";
import { buildLocalBusinessSchema } from "@/lib/schema-org";
import { getServerTheme } from "@/lib/theme-server";
import "../globals.css";

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

export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:site.name,template:'%s | Infotechs Solutions'},authors:[{name:site.name}],creator:site.name};
export function generateStaticParams(){return [{locale:'fr'},{locale:'en'}];}

export default async function RootLayout({
  children, params,
}: Readonly<{
  children: React.ReactNode;
  params:Promise<{locale:string}>;
}>) {
  const {locale}=await params;
  if (!isLocale(locale)) notFound();
  const messages=await getMessages() as unknown as Content;
  const localizedSite=getSiteConfig(locale);
  const localBusinessSchema = buildLocalBusinessSchema({...site,...localizedSite,url:site.url+localizedPath('/',locale)});
  const theme = await getServerTheme();

  return (
    <html
      lang={locale==='fr'?'fr-CA':'en-CA'}
      data-theme={theme}
      className={`${hankenGrotesk.variable} ${publicSans.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-bg-950 text-text-100">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <NextIntlClientProvider locale={locale} messages={{common:messages.common,navigation:messages.navigation,home:messages.home,contact:messages.contact}}><SiteHeader initialTheme={theme} /></NextIntlClientProvider>
        <NextIntlClientProvider locale={locale} messages={{common:messages.common,navigation:messages.navigation,home:messages.home,contact:messages.contact}}><main className="flex-1">{children}</main></NextIntlClientProvider>
        <SiteFooter />
      </body>
    </html>
  );
}
