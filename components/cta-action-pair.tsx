import type { ReactNode } from "react";
import Link from "next/link";
import { CallAndTextCta } from "@/components/call-and-text-stack";
import {
  bookNowSectionClass,
  callNowSectionClass,
  ctaPairCellClass,
  ctaPairGridClass,
  footerSecondaryOutlineClass,
} from "@/lib/cta-styles";

export type CtaActionPairProps = {
  /** Gold primary (Book Consultation). Omit when only `secondaryAction` + call. */
  primaryAction?: { href: string; label: string };
  /** White outline second button (e.g. See what we offer). */
  secondaryAction?: { href: string; label: string };
  /** Show phone pill + 24 Hour texting. Default true. */
  showCall?: boolean;
  /** Column order on sm+ screens. */
  order?: "book-first" | "call-first";
  labelClassName?: string;
  captionClassName?: string;
};

/**
 * Matched pair of footer-band CTAs: equal-width cells, aligned centers, stacks on mobile.
 * Use in CTASection, HomeFooterCTA, and inline page closers for consistency.
 */
export function CtaActionPair({
  primaryAction,
  secondaryAction,
  showCall = true,
  order = "book-first",
  labelClassName = "text-stone-200",
  captionClassName = "text-stone-400",
}: CtaActionPairProps) {
  const callCell = showCall ? (
    <div className={ctaPairCellClass}>
      <CallAndTextCta
        variant="section"
        showCallLabel={false}
        labelClassName={labelClassName}
        captionClassName={captionClassName}
        linkClassName={`${callNowSectionClass} w-full max-w-none`}
        wrapperClassName="w-full"
      />
    </div>
  ) : null;

  const goldCell = primaryAction ? (
    <div className={ctaPairCellClass}>
      <Link href={primaryAction.href} className={`${bookNowSectionClass} w-full max-w-none text-center`}>
        {primaryAction.label}
      </Link>
    </div>
  ) : null;

  const outlineCell = secondaryAction ? (
    <div className={ctaPairCellClass}>
      <Link href={secondaryAction.href} className={`${footerSecondaryOutlineClass} w-full max-w-none`}>
        {secondaryAction.label}
      </Link>
    </div>
  ) : null;

  const cells: ReactNode[] = [];
  if (order === "call-first") {
    if (callCell) cells.push(callCell);
    if (outlineCell) cells.push(outlineCell);
    else if (goldCell) cells.push(goldCell);
  } else {
    if (goldCell) cells.push(goldCell);
    if (outlineCell) cells.push(outlineCell);
    if (callCell) cells.push(callCell);
  }

  if (cells.length === 0) return null;

  return <div className={ctaPairGridClass}>{cells}</div>;
}
