import Image from "next/image";
import Link from "next/link";
import { business, galleryItems, townList } from "@/lib/site-data";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  titleAs = "h2",
  align = "center",
  variant = "light",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Use `h1` on standalone marketing pages so each route has a single primary heading. */
  titleAs?: "h1" | "h2";
  align?: "center" | "left";
  /** `dark` = light text on charcoal bands (e.g. service sections). */
  variant?: "light" | "dark";
}) {
  const TitleTag = titleAs;
  const wrap =
    align === "left"
      ? "mx-0 max-w-3xl text-left"
      : "mx-auto max-w-3xl text-center";
  const titleColor = variant === "dark" ? "text-stone-100" : "text-stone-900";
  const introColor = variant === "dark" ? "text-stone-300" : "text-stone-600";
  const eyebrowColor = variant === "dark" ? "text-[#d4a84b]" : "text-[#a97a21]";
  return (
    <div className={wrap}>
      <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${eyebrowColor}`}>{eyebrow}</p>
      <TitleTag className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${titleColor}`}>{title}</TitleTag>
      {intro ? <p className={`mt-4 ${introColor}`}>{intro}</p> : null}
    </div>
  );
}

export function ServiceAreaBlock() {
  return (
    <section className="bg-[#111315] py-16 text-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Service Area"
          title={`Serving ${business.primaryCity}, Hartford County, and towns across Connecticut`}
          intro="Searching for tent rentals near you? We deliver and install across the state with the same scheduling discipline—whether your event is in a suburban yard or a downtown venue."
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
            Request a quote
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

export function CTASection() {
  return (
    <section className="py-16" aria-labelledby="cta-quote-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#1a1d20] to-[#272b30] p-8 text-stone-100 md:p-12">
          <h2 id="cta-quote-heading" className="text-3xl font-semibold tracking-tight">
            Ready for a quote you can trust?
          </h2>
          <p className="mt-3 max-w-2xl text-stone-300">
            Tell us your date, town, and guest count. We will guide the setup plan, answer questions quickly, and help you lock in a clean, professional event layout.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact#quote"
              className="rounded-full bg-[#b78a2d] px-5 py-3 text-sm font-semibold text-[#1b1712] transition hover:bg-[#d6a645]"
            >
              Request a Quote
            </Link>
            <a href={business.phoneHref} className="rounded-full border border-stone-400 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
              Call {business.phone}
            </a>
          </div>
          <p className="mt-3 text-xs text-stone-400">
            No-pressure consultation. Fast quote turnaround. The quote form takes only a few minutes—start at{" "}
            <Link href="/contact#quote" className="text-stone-200 underline underline-offset-2 hover:text-white">
              contact
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
