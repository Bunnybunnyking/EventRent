import Link from "next/link";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { mobileTextLinkClass } from "@/lib/mobile-booking";
import {
  buildGraduationLeadParagraph,
  buildNearbyCollegeSentence,
  getTownSchoolMention,
  graduationOccasionBullets,
} from "@/lib/town-school-mentions";

type Props = {
  townSlug: string;
  townName: string;
};

/**
 * Local graduation context for service-area pages — one primary CTA, secondary text link, disclaimer.
 */
export function GraduationPartyLocalSection({ townSlug, townName }: Props) {
  const data = getTownSchoolMention(townSlug, townName);
  const lead = buildGraduationLeadParagraph(data);
  const collegeLine = buildNearbyCollegeSentence(data);

  return (
    <section
      className="mt-7 rounded-2xl border border-[#d9cbb0]/90 bg-gradient-to-b from-[#fdfbf7] to-[#faf6ee] px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-6 sm:py-6"
      aria-labelledby={`graduation-local-${townSlug}`}
    >
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#7a5f28]">Graduation season</p>
      <h2 id={`graduation-local-${townSlug}`} className="mt-2 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
        Graduations & celebrations · {townName}, CT
      </h2>

      <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone-700 sm:text-[0.9375rem]">
        <p>{lead}</p>
        {collegeLine ? <p>{collegeLine}</p> : null}
        {data.localNotes ? <p className="text-stone-600">{data.localNotes}</p> : null}
      </div>

      <ul className="mt-4 space-y-2 text-sm leading-snug text-stone-800 sm:mt-5">
        {graduationOccasionBullets.map((line, i) => (
          <li key={line} className={`flex gap-2 ${i >= 4 ? "hidden md:flex" : ""}`}>
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#b8975a]" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 border-t border-stone-200/80 pt-5 sm:mt-6 sm:flex-row sm:items-center sm:gap-6">
        <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center sm:inline-flex`}>
          Plan a Graduation Party
        </Link>
        <Link href="/wishlist" prefetch={true} className={`${mobileTextLinkClass} text-center sm:text-left`}>
          Build My Event List
        </Link>
      </div>

      <p className="mt-4 text-[0.65rem] leading-snug text-stone-500 sm:text-[11px]">
        School names are used for local reference only. Connecticut Party Rentals is not affiliated with or endorsed by
        these schools or institutions.
      </p>
    </section>
  );
}
