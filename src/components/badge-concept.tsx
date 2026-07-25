import { cn } from "@/lib/utils";

// Composant réutilisable requis par INFOTECHS-DESIGN-IMPLEMENTATION-002A section 9.
// Contraintes non négociables (voir docs/design/animation-spec.md et
// docs/design/design-tokens.md, tableau "Composants et états") :
// - texte exact "CONCEPT DÉMONSTRATIF", jamais reformulé ;
// - statique : jamais animé, jamais masqué au survol ou par une transition ;
// - contraste copper.500 (#E2793D) + texte #14151A, vérifié WCAG AA ;
// - zone tactile compatible mobile (padding suffisant, pas de dépendance au hover).

export const BADGE_CONCEPT_TEXT = "CONCEPT DÉMONSTRATIF";

type BadgeConceptProps = {
  className?: string;
};

export function BadgeConcept({ className }: BadgeConceptProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-copper-500 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#14151a]",
        className,
      )}
    >
      {BADGE_CONCEPT_TEXT}
    </span>
  );
}
