import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-experience";
import { getServiceOffering, serviceOfferings } from "@/lib/service-offerings";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return serviceOfferings.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offering = getServiceOffering(slug);
  if (offering) return { title: offering.seo.title, description: offering.seo.description, alternates: { canonical: offering.href }, openGraph: { title: `${offering.seo.title} | Infotechs Solutions`, description: offering.seo.description, url: offering.href } };
  return {};
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const offering = getServiceOffering(slug);
  if (!offering) notFound();
  return <ServiceDetail service={offering} />;
}
