import Link from "next/link";
import { NAV_ITEMS } from "@/lib/navigation";

export function SiteNavigation() {
  return (
    <nav aria-label="Navigation principale">
      <ul className="flex items-center gap-6 text-sm font-medium">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="rounded-md px-1 py-1 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
