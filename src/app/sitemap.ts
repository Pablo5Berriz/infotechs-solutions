import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { portfolioProjects } from "@/lib/project-portfolio";
import { serviceOfferings } from "@/lib/service-offerings";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/realisations", "/a-propos", "/contact", "/mentions-legales", "/confidentialite"];
  const serviceRoutes = serviceOfferings.map((service) => service.href);
  const projectRoutes = portfolioProjects.map((project) => project.href);

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
