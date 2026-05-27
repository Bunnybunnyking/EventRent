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
  if (!showCall && !primaryAction && !secondaryAction) return null;

  const callCell = showCall ? (
    <div key="call" className={ctaPairCellClass}>
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
    <div key="primary" className={ctaPairCellClass}>
      <Link href={primaryAction.href} className={`${bookNowSectionClass} w-full max-w-none text-center`}>
        {primaryAction.label}
      </Link>
    </div>
  ) : null;

  const outlineCell = secondaryAction ? (
    <div key="secondary" className={ctaPairCellClass}>
      <Link href={secondaryAction.href} className={`${footerSecondaryOutlineClass} w-full max-w-none`}>
        {secondaryAction.label}
      </Link>
    </div>
  ) : null;

  return (
    <div className={ctaPairGridClass}>
      {order === "call-first" ? (
        <>
          {callCell}
          {outlineCell ?? goldCell}
        </>
      ) : (
        <>
          {goldCell}
          {outlineCell}
          {callCell}
        </>
      )}
    </div>
  );
}
