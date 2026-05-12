import type { AnchorHTMLAttributes } from "react";
import { business } from "@/lib/site-data";

export type CallAndTextVariant = "section" | "hero" | "sticky" | "header" | "compact";

const callLabelTone: Record<CallAndTextVariant, string> = {
  section: "text-stone-800",
  hero: "text-[#faf8f2] drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]",
  sticky: "text-stone-900",
  header: "text-stone-900",
  compact: "text-stone-800",
};

const callLabelProminence: Record<CallAndTextVariant, string> = {
  section: "text-base font-extrabold tracking-tight sm:text-lg md:text-xl",
  hero: "text-base font-extrabold tracking-tight sm:text-lg md:text-xl",
  sticky: "text-xs font-extrabold tracking-tight sm:text-sm",
  header: "text-xs font-extrabold sm:text-sm md:text-base",
  compact: "text-[11px] font-extrabold sm:text-xs",
};

/**
 * Phone inside the pill — maximum weight + contrast on gold / white pills so digits scan fast.
 */
const numberClass: Record<CallAndTextVariant, string> = {
  section:
    "text-[16px] font-black tabular-nums leading-none tracking-[0.03em] text-neutral-950 antialiased sm:text-[17px] md:text-lg",
  hero:
    "text-[0.82rem] font-black tabular-nums leading-none tracking-[0.03em] text-neutral-950 antialiased drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)] sm:text-[0.9rem] md:text-base",
  sticky:
    "text-[14px] font-black tabular-nums leading-none tracking-[0.03em] text-neutral-950 antialiased sm:text-[15px]",
  header:
    "text-[14px] font-black tabular-nums leading-none tracking-[0.03em] text-neutral-950 antialiased sm:text-[15px] md:text-[16px]",
  compact:
    "text-[12px] font-black tabular-nums leading-none tracking-[0.03em] text-neutral-950 antialiased sm:text-[13px]",
};

/** Sub-caption under the pill */
const anytimeClass: Record<CallAndTextVariant, string> = {
  section: "max-w-[14rem] text-[11px] font-bold leading-snug text-stone-600 sm:text-xs",
  hero:
    "max-w-[11rem] text-[11px] font-bold leading-snug text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.92)] sm:text-xs md:text-[13px]",
  sticky: "text-[10px] font-bold leading-snug text-stone-700 sm:text-[11px]",
  header: "text-[10px] font-bold leading-snug text-stone-600 sm:text-[11px]",
  compact: "max-w-[9rem] text-[9px] font-bold leading-snug text-stone-600 sm:text-[10px]",
};

/** Line shown under the phone pill site-wide */
export const CALL_TEXT_SUBCAPTION = "24 Hour texting";

export const callOrTextAriaLabel = `Call or text ${business.phone}; ${CALL_TEXT_SUBCAPTION}`;

export type CallAndTextLayout = "stack" | "inline";

/**
 * **Call** label + phone pill + **24 Hour texting** beneath; **inline** = “Call” beside pill, caption under pill (hero).
 */
export function CallAndTextCta({
  variant = "section",
  layout = "stack",
  linkClassName,
  wrapperClassName,
  captionClassName,
  labelClassName,
  showCallLabel,
  showSubcaption,
  phoneNumberClassName,
  phonePillLabel,
  linkProps,
}: {
  variant?: CallAndTextVariant;
  layout?: CallAndTextLayout;
  linkClassName: string;
  wrapperClassName?: string;
  /** Override sub-caption under the pill */
  captionClassName?: string;
  /** Extra classes on the “Call” label (e.g. `text-stone-200` on dark bands) */
  labelClassName?: string;
  /** When false, only the phone pill + sub-caption (e.g. mobile sticky bar — full number, no “Call” line) */
  showCallLabel?: boolean;
  /** When false, hide “24 Hour texting” under the pill (mobile sticky bar only; everywhere else keeps it) */
  showSubcaption?: boolean;
  /** Override classes on the phone number span (e.g. larger tabular numerals in fixed bar) */
  phoneNumberClassName?: string;
  /**
   * Text shown inside the phone pill instead of the full number (tel href unchanged).
   * Use on narrow fixed bars so the label stays readable; keep `aria-label` for the real number.
   */
  phonePillLabel?: string;
/** Spread onto the phone `<a>` (e.g. `data-cta`, `title`). `data-*` allowed for analytics. */
  linkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "aria-label" | "children"> & {
    "data-cta"?: string;
    "data-cta-location"?: string;
  };
}) {
  const showLabel = showCallLabel !== false;
  const showCap = showSubcaption !== false;
  const callLabelRow = [callLabelProminence[variant], callLabelTone[variant], labelClassName].filter(Boolean).join(" ");
  const captionRow = [anytimeClass[variant], captionClassName].filter(Boolean).join(" ");
  const digitsClass = phoneNumberClassName ?? numberClass[variant];
  const pillText = phonePillLabel ?? business.phone;

  const column = (
    <>
      <a href={business.phoneHref} className={linkClassName} aria-label={callOrTextAriaLabel} {...linkProps}>
        <span className={`block text-center ${digitsClass}`}>{pillText}</span>
      </a>
      {showCap ? <span className={`block text-center ${captionRow}`}>{CALL_TEXT_SUBCAPTION}</span> : null}
    </>
  );

  if (layout === "inline") {
    /** “Call” + pill on one line; caption under pill — aligns with catalog chip. */
    return (
      <div className={`flex flex-row items-center gap-2 sm:gap-3 ${wrapperClassName ?? ""}`}>
        {showLabel ? <span className={`shrink-0 leading-none ${callLabelRow}`}>Call</span> : null}
        <div className="relative min-w-0 shrink-0">
          <a href={business.phoneHref} className={linkClassName} aria-label={callOrTextAriaLabel} {...linkProps}>
            <span className={`block text-center ${digitsClass}`}>{pillText}</span>
          </a>
          {showCap ? (
            <span
              className={`pointer-events-none absolute left-1/2 top-full z-10 mt-1 w-max -translate-x-1/2 text-center ${captionRow}`}
            >
              {CALL_TEXT_SUBCAPTION}
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full flex-col items-center justify-center gap-1 ${wrapperClassName ?? ""}`}>
      {showLabel ? <span className={`text-center ${callLabelRow}`}>Call</span> : null}
      {column}
    </div>
  );
}
