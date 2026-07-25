import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceIcons } from "@/lib/data";

type Service = {
  slug: string;
  title: string;
  short: string;
  icon: keyof typeof serviceIcons;
  category: string;
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-slate-200/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-md bg-cyan-50 text-cyan-700 group-hover:bg-cyan-500 group-hover:text-slate-950">
          <Icon className="h-6 w-6" />
        </span>
        <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:text-cyan-600" />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">{service.category}</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-950">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.short}</p>
    </Link>
  );
}
