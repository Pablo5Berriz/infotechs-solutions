import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BADGE_CONCEPT_TEXT, BadgeConcept } from "@/components/badge-concept";

describe("BadgeConcept", () => {
  it("renders the exact required text", () => {
    const markup = renderToStaticMarkup(<BadgeConcept />);
    expect(BADGE_CONCEPT_TEXT).toBe("CONCEPT DÉMONSTRATIF");
    expect(markup).toContain("CONCEPT DÉMONSTRATIF");
  });

  it("does not depend on hover-only classes that could hide it (no opacity-0/hidden hover utilities)", () => {
    const markup = renderToStaticMarkup(<BadgeConcept />);
    expect(markup).not.toMatch(/hover:opacity-0|hover:hidden|group-hover:opacity-0|group-hover:hidden/);
  });
});
