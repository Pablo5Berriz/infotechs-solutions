import Link from "@/components/localized-link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400",
        variant === "primary" && "bg-purple-600 text-[#f4f1ea] shadow-lg shadow-purple-600/20 hover:bg-purple-700",
        variant === "secondary" && "border border-bg-800 bg-bg-900 text-text-100 hover:border-purple-400 hover:text-purple-300",
        variant === "ghost" && "text-text-400 hover:text-purple-300",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
