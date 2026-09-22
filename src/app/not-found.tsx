import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, FolderOpen } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Page introuvable | Infotechs Solutions" },
  description: "La page demandée est introuvable. Revenez à l’accueil ou explorez les services et les réalisations d’Infotechs Solutions.",
  alternates: { canonical: null },
  openGraph: {
    title: "Page introuvable | Infotechs Solutions",
    description: "La page demandée est introuvable.",
  },
  robots: { index: false, follow: true },
};

const linkClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100svh-64px)] items-center overflow-hidden border-b border-bg-800">
      <div
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(101,40,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(101,40,255,.08)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-(--container-max) px-4 py-20 sm:px-6 lg:px-8">
        <p className="font-mono text-sm uppercase tracking-[.24em] text-purple-300">Erreur 404</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-.035em] sm:text-5xl lg:text-6xl">
          Cette page est introuvable.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-text-400">
          L’adresse a peut-être changé ou la page ne fait plus partie du site public. Utilisez l’un des liens ci-dessous pour poursuivre votre navigation.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/" className={`${linkClass} bg-purple-600 text-[#f4f1ea]`}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour à l’accueil
          </Link>
          <Link href="/services" className={`${linkClass} border border-bg-800 text-text-100 hover:border-purple-400`}>
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" /> Explorer les services
          </Link>
          <Link href="/realisations" className={`${linkClass} border border-bg-800 text-text-100 hover:border-purple-400`}>
            <FolderOpen className="h-4 w-4" aria-hidden="true" /> Voir les réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}
