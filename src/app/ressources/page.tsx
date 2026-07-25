import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { resources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ressources SEO pour PME",
  description: "Articles et guides pour comprendre la création de site web, l'automatisation IA et la sécurité web de base pour PME au Québec.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Ressources</p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">Guides pratiques pour mieux investir dans le numérique.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Une base de contenu SEO prête à évoluer en blog complet lorsque le site sera connecté à un CMS.
          </p>
        </div>
      </section>
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Articles prévus" text="Les sujets ciblent les recherches naturelles des PME au Québec et en Montérégie." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((item) => (
              <article key={item.slug} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <BookOpen className="h-6 w-6 text-cyan-700" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.readTime}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
