import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";
import { serviceOfferings } from "@/lib/service-offerings";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/realisations", "/a-propos", "/contact", "/ressources", "/mentions-legales", "/confidentialite"];
  const serviceRoutes = serviceOfferings.map((service) => service.href);
  const projectRoutes = projects.map((project) => `/realisations/${project.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
