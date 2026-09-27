import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers Link/redirect/usePathname/useRouter/getPathname conscients
// des locales et du mapping `pathnames` défini dans routing.ts.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
