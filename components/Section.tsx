import type { ReactNode } from "react";
import { Container } from "@/components/Container";

type SectionTone = "light" | "muted" | "dark";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-background text-foreground",
  muted: "tone-muted bg-background text-foreground",
  dark: "tone-dark bg-background text-foreground",
};

export function Section({
  tone = "light",
  children,
  className = "",
}: {
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-24 ${toneClasses[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
