import Link from "next/link";
import type { ReactNode } from "react";
import { locationCardCtaClass, locationPanelCtaClass } from "@/lib/cta-styles";

type Props = {
  href: string;
  children: ReactNode;
  /** Full-width block in the identity sidebar; default is inline card CTA. */
  variant?: "card" | "panel";
  className?: string;
};

export function LocationCtaLink({ href, children, variant = "card", className = "" }: Props) {
  const base = variant === "panel" ? locationPanelCtaClass : locationCardCtaClass;

  return (
    <Link href={href} className={`group ${base} ${className}`.trim()}>
      <span className="relative z-10">{children}</span>
      {variant === "card" ? (
        <span
          className="relative z-10 text-emerald-800/75 transition group-hover:translate-x-0.5 group-hover:text-emerald-950"
          aria-hidden
        >
          →
        </span>
      ) : null}
    </Link>
  );
}
