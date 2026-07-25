import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { portfolioProjects } from "@/lib/project-portfolio";
import { serviceOfferings } from "@/lib/service-offerings";

describe("sitemap des services 002C-R1", () => {
  it("publie exactement les trois routes de service autorisées", () => {
    const serviceUrls = sitemap().map(({ url }) => url).filter((url) => url.includes("/services/"));
    expect(serviceUrls).toEqual(serviceOfferings.map(({ href }) => `https://infotechssolutions.ca${href}`));
  });

  it("retire les routes Ressources et Fondations du périmètre public", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(urls).not.toContain("https://infotechssolutions.ca/ressources");
    expect(urls).not.toContain("https://infotechssolutions.ca/fondations");
  });

  it("publie exactement les six réalisations de la source canonique", () => {
    const projectUrls = sitemap().map(({ url }) => url).filter((url) => url.includes("/realisations/"));
    expect(projectUrls).toEqual(portfolioProjects.map(({ href }) => `https://infotechssolutions.ca${href}`));
    expect(projectUrls).toHaveLength(6);
  });
});
