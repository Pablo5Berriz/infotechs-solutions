import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const motionPreference = vi.hoisted(() => ({ reduce: false }));

vi.mock("framer-motion", () => ({
  useReducedMotion: () => motionPreference.reduce,
  motion: {
    div: ({
      children,
      initial,
      whileInView,
      viewport,
      transition,
      ...props
    }: React.ComponentProps<"div"> & Record<string, unknown>) => {
      void viewport;
      void transition;
      return (
        <div
          {...props}
          data-initial={JSON.stringify(initial)}
          data-while-in-view={JSON.stringify(whileInView)}
        >
          {children}
        </div>
      );
    },
  },
}));

import { Reveal } from "@/components/reveal";

describe("Reveal", () => {
  beforeEach(() => {
    motionPreference.reduce = false;
  });

  it("rend immédiatement le contenu essentiel en reduced motion", () => {
    motionPreference.reduce = true;
    const markup = renderToStaticMarkup(<Reveal><h1>Hero essentiel</h1></Reveal>);

    expect(markup).toContain("Hero essentiel");
    expect(markup).toContain('class="reveal-content"');
    expect(markup).not.toContain("opacity");
    expect(markup).not.toContain("translate");
  });

  it("conserve l’animation d’apparition en mode normal", () => {
    const markup = renderToStaticMarkup(<Reveal delay={0.1}>Contenu animé</Reveal>);

    expect(markup).toContain('&quot;opacity&quot;:0');
    expect(markup).toContain('&quot;y&quot;:22');
    expect(markup).toContain('data-while-in-view="{&quot;opacity&quot;:1,&quot;y&quot;:0}"');
  });

  it("préserve les classes des autres usages de Reveal", () => {
    const markup = renderToStaticMarkup(<Reveal className="grid gap-4">Carte</Reveal>);

    expect(markup).toContain('class="reveal-content grid gap-4"');
  });

  it("force l’état final visible dans la media query reduce", () => {
    const css = readFileSync(resolve(process.cwd(), "src/app/globals.css"), "utf8");
    const reducedMotion = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));

    expect(reducedMotion).toMatch(/\.reveal-content\s*{[^}]*opacity:\s*1\s*!important;/);
    expect(reducedMotion).toMatch(/\.reveal-content\s*{[^}]*transform:\s*none\s*!important;/);
  });
});
