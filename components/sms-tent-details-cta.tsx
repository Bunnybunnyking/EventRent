import { smsMobileGoldCtaClass, smsMobileGoldCtaCompactClass } from "@/lib/cta-styles";
import { tentReservationSmsHref } from "@/lib/tent-reservation-sms";

export type SmsCtaLocation = "homepage-hero" | "homepage-intro" | "graduation-page" | "contact-page" | "mobile-sticky";

/** Emerald accent on leading “Text” so it stays tappable-looking (never white-on-hover). */
function SmsButtonLabel({ text }: { text: string }) {
  if (text.startsWith("Text")) {
    const rest = text.slice(4);
    return (
      <span className="relative z-10">
        <span className="text-emerald-900">Text</span>
        <span className="text-[#1a140c]">{rest}</span>
      </span>
    );
  }
  return <span className="relative z-10 text-[#1a140c]">{text}</span>;
}

type Props = {
  /** Analytics / experiment segmentation */
  location: SmsCtaLocation;
  /** Visible button label */
  buttonText?: string;
  helperText: string;
  /** Optional wrapper classes (stack is always hidden on md+ — SMS is mobile-only) */
  className?: string;
  /** Smaller helper line */
  helperClassName?: string;
  /** Use compact button padding (e.g. contact card) */
  compact?: boolean;
};

export function SmsTentDetailsCta({
  location,
  buttonText = "Text Event Details",
  helperText,
  className = "",
  helperClassName = "mt-2 max-w-xl text-[11px] leading-snug text-stone-500 sm:text-xs",
  compact = false,
}: Props) {
  const href = tentReservationSmsHref();
  const btnClass = compact ? smsMobileGoldCtaCompactClass : smsMobileGoldCtaClass;

  return (
    <div className={`md:hidden ${className}`.trim()}>
      <a
        href={href}
        data-cta="text-event-details"
        data-cta-location={location}
        aria-label="Text event details to reserve a tent"
        className={btnClass}
      >
        <SmsButtonLabel text={buttonText} />
      </a>
      <p className={helperClassName}>{helperText}</p>
    </div>
  );
}
