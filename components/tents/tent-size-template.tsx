import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { ServiceSchema } from "@/components/schema";
import { bookNowSectionClass } from "@/lib/cta-styles";
import type { TentSizePageData } from "@/lib/tent-section-types";
import { TentImagePlaceholder } from "./tent-image-placeholder";
import { TentPlannerCallout } from "./tent-planner-callout";

type Props = {
  data: TentSizePageData;
  breadcrumb: { label: string; href?: string }[];
  schemaPath: string;
  schemaName: string;
  schemaDescription: string;
  familyLinks?: { href: string; label: string }[];
  variant: "frame" | "large";
};

export function TentSizePageTemplate({
  data,
  breadcrumb,
  schemaPath,
  schemaName,
  schemaDescription,
  familyLinks,
  variant,
}: Props) {
  const h1Line =
    variant === "frame" ? `${data.sizeLabel} frame tent rental` : `${data.sizeLabel} large event structure`;
  const eyebrow = variant === "frame" ? `Frame tent · ${data.sizeLabel}` : `Large structure · ${data.sizeLabel}`;
  return (
    <>
      <ServiceSchema name={schemaName} description={schemaDescription} path={schemaPath} />
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6" items={breadcrumb} />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6d3a]">{eyebrow}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{h1Line}</h1>
              <p className="mt-4 text-lg text-stone-600">{data.heroSubhead}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center`}>
                  Get a quote
                </Link>
                <Link
                  href="/planning"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-center text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 sm:text-base"
                >
                  Plan my event
                </Link>
              </div>
              {familyLinks && familyLinks.length > 0 ? (
                <p className="mt-4 text-sm text-stone-500">
                  {familyLinks.map((l, i) => (
                    <span key={l.href}>
                      {i > 0 ? " · " : ""}
                      <Link href={l.href} className="font-medium text-stone-800 underline underline-offset-2">
                        {l.label}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
            <TentImagePlaceholder label={`${data.sizeLabel} tent, hero image`} />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Quick specs</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Square feet (approx.)</dt>
              <dd className="mt-1 text-lg font-semibold text-stone-900">{data.sqft.toLocaleString()} sq ft</dd>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Seated (estimated)</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-700">{data.guestSeatedEstimate}</dd>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Cocktail / standing (estimated)</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-700">{data.guestCocktailEstimate}</dd>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Best event types</dt>
              <dd className="mt-1 text-sm text-stone-700">{data.bestEventTypes.join(" · ")}</dd>
            </div>
          </dl>
          {data.surfacesNote ? (
            <p className="mt-4 text-sm text-stone-600">
              <strong className="text-stone-800">Surfaces / install:</strong> {data.surfacesNote}
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#faf8f5] py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">What this tent fits</h2>
          <ul className="mt-4 space-y-3 text-stone-700">
            {data.whatFits.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8860b]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Common layout ideas</h2>
          <p className="mt-2 text-sm text-stone-600">
            Examples only, your quote is built from a real layout conversation. Diagram placeholders below for future floor plans.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {data.layoutExamples.map((ex) => (
              <div key={ex.title} className="flex flex-col rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-stone-900">{ex.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{ex.body}</p>
                <div className="mt-4">
                  <TentImagePlaceholder label={`${ex.title} diagram`} aspect="square" className="min-h-[140px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">When to size up</h2>
          <ul className="mt-4 space-y-2 text-stone-700">
            {data.whenToSizeUp.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="font-bold text-[#8a6d3a]">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Best add-ons</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {data.bestAddOns.map((p) => (
              <li key={p} className="rounded-lg border border-stone-200 bg-[#faf8f5] px-4 py-2 text-sm text-stone-800">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#faf8f5] py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Gallery & detail shots</h2>
          <p className="mt-2 text-sm text-stone-600">Room for real event photography, placeholders for now.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <TentImagePlaceholder label="Wide event shot" aspect="[4/3]" />
            <TentImagePlaceholder label="Interior lighting" aspect="[4/3]" />
            <TentImagePlaceholder label="Sidewall / detail" aspect="[4/3]" />
          </div>
          <p className="mt-6 text-center">
            <Link href="/tents/gallery" className="text-sm font-semibold text-stone-900 underline underline-offset-4">
              Browse tent gallery
            </Link>
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Questions for this size</h2>
          <div className="mt-6 space-y-6">
            {data.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-stone-900">{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <TentPlannerCallout />
          <div className="mt-10 rounded-2xl border border-stone-200 bg-[#111315] p-8 text-center text-stone-100">
            <h2 className="text-xl font-semibold sm:text-2xl">See if this size fits your event</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-stone-400">
              Tell us your date, town, guest count, and how you want the day to flow, we will recommend sizes and add-ons that match reality, not guesses.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center`}>
                Request a quote
              </Link>
              <Link
                href="/planning"
                className="text-sm font-semibold text-[#edc16c] underline underline-offset-4 hover:text-white"
              >
                Build your event plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
