"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projectCategories, projects } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProjectFilter() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("Tous");
  const filtered = useMemo(
    () => (active === "Tous" ? projects : projects.filter((project) => project.category === active)),
    [active],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer les réalisations">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-md border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500",
              active === category ? "border-cyan-500 bg-cyan-500 text-slate-950" : "border-slate-300 bg-white text-slate-700 hover:border-cyan-400",
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/realisations/${project.slug}`}
            className="group min-h-64 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-slate-200/70"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                {project.category}
              </span>
              <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-cyan-600" />
            </div>
            <h3 className="mt-8 text-xl font-semibold text-slate-950">{project.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{project.summary}</p>
            <div className="mt-7 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
