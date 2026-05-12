import Image from "next/image";
import Link from "next/link";
import { CallAndTextCta } from "@/components/call-and-text-stack";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import { business, galleryItems, townList } from "@/lib/site-data";

export function SectionHeading({
  eyebrow, title, intro, titleAs = "h2", align = "center", variant = "light", compact = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Use `h1` on standalone marketing pages so each route has a single primary heading. */
  titleAs?: "h1" | "h2";
  align?: "center" | "left";
  /** `dark` = light text on charcoal bands (e.g. service sections). */
  variant?: "light" | "dark";
  /** Tighter vertical rhythm (e.g. tent hub hero). */
  compact?: boolean;
}) {
  const TitleTag = titleAs;
  const wrap =
    align === "left"
      ? "mx-0 max-w-3xl text-left"
      : "mx-auto max-w-3xl text-center";
  const titleColor = variant === "dark" ? "text-stone-100" : "text-stone-900";
  const introColor = variant === "dark" ? "text-stone-300" : "text-stone-600";
  const eyebrowColor = variant === "dark" ? "text-[#d4a84b]" : "text-[#a97a21]";
  const titleMt = compact ? "mt-2" : "mt-3";
  const introMt = compact ? "mt-2.5" : "mt-4";
  return (
    <div className={wrap}>
      <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${eyebrowColor}`}>{eyebrow}</p>
      <TitleTag className={`${titleMt} text-3xl font-semibold tracking-tight sm:text-4xl ${titleColor}`}>{title}</TitleTag>
      {intro ? <p className={`${introMt} ${introColor}`}>{intro}</p> : null}
    </div>
  );
}

export function ServiceAreaBlock() {
  return (
    <section className="bg-[#111315] py-12 text-stone-100 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Service Area"
          title={`Serving ${business.primaryCity}, Hartford County, and towns across Connecticut`}
          intro="Looking for tent rentals near you? We deliver and install across Connecticut, from suburban yards to downtown lots, with the same scheduling standards either way."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {townList.map((town) => (
            <Link
              key={town}
              href={`/service-areas/${town.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:border-[#b78a2d] hover:text-white"
            >
              {town}
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-stone-400">
          <Link href="/service-areas" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
            Connecticut service area directory
          </Link>{" "}
          · Need a date held?{" "}
          <Link href="/contact#quote" className="font-medium text-stone-200 underline underline-offset-2 hover:text-white">
            Book Consultation
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export function GalleryGrid({ preview = false }: { preview?: boolean }) {
  const items = preview ? galleryItems.slice(0, 4) : galleryItems;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div key={`${item.src}-${index}`} className="group overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
          <div className="relative aspect-[4/3]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              priority={index < 2}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Bottom quote CTA band. Set `showPrimaryCta={false}` on pages where the primary Book Consultation
 * CTA is omitted; concierge copy stays visible with call + contact link.
 */
export function CTASection({ showPrimaryCta = true }: { showPrimaryCta?: boolean }) {
  return (
    <section className="py-12 sm:py-14" aria-labelledby="cta-quote-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#1a1d20] to-[#272b30] p-8 text-stone-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] md:p-12">
          <h2 id="cta-quote-heading" className="text-3xl font-semibold tracking-tight sm:text-[2rem]">
            Ready to book with confidence?
          </h2>

          {showPrimaryCta ? (
            <>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
                Tell us your date, town, and guest count. We will walk through setup with you, answer questions without the runaround, and help you get a layout that works for your people and your place.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-5">
                <Link href="/contact#quote" className={`${bookNowSectionClass} w-full justify-center sm:w-auto`}>
                  Book Consultation
                </Link>
                <CallAndTextCta
                  variant="section"
                  labelClassName="text-stone-200"
                  captionClassName="text-stone-400"
                  linkClassName={`${callNowSectionClass} w-full shrink-0 sm:w-auto`}
                />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-stone-400">
                No pressure, fast responses. The form takes a few minutes. Start on{" "}
                <Link href="/contact#quote" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
                  contact
                </Link>
                .
              </p>
            </>
          ) : (
            <>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
                Our Event Concierge walks you through venue limits, guest flow, timeline, and layout so nothing gets lost. Share your date, town, and guest count; we get back to you with clear options and a plan you can actually use.
              </p>
              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap sm:items-end sm:gap-5">
                <CallAndTextCta
                  variant="section"
                  labelClassName="text-stone-200"
                  captionClassName="text-stone-400"
                  linkClassName={`${callNowSectionClass} w-full justify-center sm:w-auto`}
                />
                <Link
                  href="/contact#quote"
                  className={`${bookNowSectionClass} w-full justify-center text-center sm:w-auto`}
                >
                  Book Consultation
                </Link>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-stone-400">
                Fast responses, no pressure. The form takes a few minutes. Start on{" "}
                <Link href="/contact#quote" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
                  contact
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
