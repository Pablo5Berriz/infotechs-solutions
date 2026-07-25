import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { serviceOfferings } from "@/lib/service-offerings";

describe("sitemap des services 002C-R1", () => {
  it("publie exactement les trois routes de service autorisées", () => {
    const serviceUrls = sitemap().map(({ url }) => url).filter((url) => url.includes("/services/"));
    expect(serviceUrls).toEqual(serviceOfferings.map(({ href }) => `https://infotechssolutions.ca${href}`));
  });
});
