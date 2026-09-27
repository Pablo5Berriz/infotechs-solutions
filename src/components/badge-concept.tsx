import {useContent} from "@/i18n/content";
import { cn } from "@/lib/utils";

// Composant réutilisable requis par INFOTECHS-DESIGN-IMPLEMENTATION-002A section 9.
// Contraintes non négociables (voir docs/design/animation-spec.md) :
// - texte exact "CONCEPT DÉMONSTRATIF", jamais reformulé ;
// - statique : jamais animé, jamais masqué au survol ou par une transition ;
// - palette lot INFOTECHS-DESIGN-PALETTE-003A : fond purple-950, bordure purple-500,
//   texte purple-100 — contraste mesuré 13.87:1 (WCAG AA/AAA, voir rapport 003A) ;
// - zone tactile compatible mobile (padding suffisant, pas de dépendance au hover).

export const BADGE_CONCEPT_TEXT = "CONCEPT DÉMONSTRATIF";

type BadgeConceptProps = {
  className?: string;
};

export function BadgeConcept({ className }: BadgeConceptProps) {
  const m=useContent();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-purple-500 bg-purple-950 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-purple-100",
        className,
      )}
    >
      {m.portfolio.statusLabels.concept}
    </span>
  );
}
