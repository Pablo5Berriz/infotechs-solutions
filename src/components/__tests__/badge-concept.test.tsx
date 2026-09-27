import { renderToStaticMarkup } from "@/test/render";
import { describe, expect, it } from "vitest";
import { BADGE_CONCEPT_TEXT, BadgeConcept } from "@/components/badge-concept";

describe("BadgeConcept", () => {
  it("renders the exact required text", () => {
    const markup = renderToStaticMarkup(<BadgeConcept />);
    expect(BADGE_CONCEPT_TEXT).toBe("Projet indépendant");
    expect(markup).toContain("Projet indépendant");
  });

  it("does not depend on hover-only classes that could hide it (no opacity-0/hidden hover utilities)", () => {
    const markup = renderToStaticMarkup(<BadgeConcept />);
    expect(markup).not.toMatch(/hover:opacity-0|hover:hidden|group-hover:opacity-0|group-hover:hidden/);
  });
});
