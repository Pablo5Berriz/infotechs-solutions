import { describe, expect, it } from "vitest";
import { projects, resources, services } from "@/lib/data";

function assertUniqueSlugs(items: { slug: string }[], label: string) {
  const slugs = items.map((item) => item.slug);
  const uniqueSlugs = new Set(slugs);
  expect(uniqueSlugs.size, `${label} must not contain duplicate slugs`).toBe(slugs.length);
}

function assertSlugFormat(items: { slug: string }[], label: string) {
  for (const item of items) {
    expect(item.slug, `${label} slug must be non-empty`).toBeTruthy();
    expect(item.slug, `${label} slug "${item.slug}" must be kebab-case`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  }
}

describe("services data", () => {
  it("has at least one service", () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it("has unique, kebab-case slugs", () => {
    assertUniqueSlugs([...services], "services");
    assertSlugFormat([...services], "services");
  });

  it("every service exposes the fields the detail route depends on", () => {
    for (const service of services) {
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(Array.isArray(service.deliverables)).toBe(true);
      expect(service.deliverables.length).toBeGreaterThan(0);
    }
  });
});

describe("projects (réalisations) data", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("has unique, kebab-case slugs", () => {
    assertUniqueSlugs(projects, "projects");
    assertSlugFormat(projects, "projects");
  });

  it("every project exposes the fields the detail route depends on", () => {
    for (const project of projects) {
      expect(project.title).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(Array.isArray(project.results)).toBe(true);
      expect(project.results.length).toBeGreaterThan(0);
    }
  });
});

describe("resources data", () => {
  it("has unique, kebab-case slugs", () => {
    assertUniqueSlugs(resources, "resources");
    assertSlugFormat(resources, "resources");
  });
});

describe("cross-collection slug collisions", () => {
  it("does not reuse a slug between services and projects (they share no route, but keep IDs unambiguous)", () => {
    type ServiceSlug = (typeof services)[number]["slug"];
    const isServiceSlug = (slug: string): slug is ServiceSlug =>
      services.some((service) => service.slug === slug);
    const overlap = projects.filter((project) => isServiceSlug(project.slug));
    expect(overlap, "services and projects must not share slugs").toEqual([]);
  });
});
