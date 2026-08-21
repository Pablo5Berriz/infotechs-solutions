import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infotechs Solutions",
  description:
    "Infotechs Solutions — solutions numeriques pour PME. Site en construction.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
