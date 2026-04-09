import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { createPageMetadata } from "@/lib/metadata";
import { business, townList, townPageExtras } from "@/lib/site-data";

type Props = {
  params: Promise<{ town: string }>;
};

function slugify(input: string) {
  return input.toLowerCase().replace(/\s+/g, "-");
}

function unslug(input: string) {
  return input
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return townList.map((town) => ({ town: slugify(town) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { town } = await params;
  const townName = unslug(town);
  const extra = townPageExtras[townName];

  return createPageMetadata({
    title: extra?.metaTitle ?? `${townName} Tent Rentals CT`,
    description:
      extra?.metaDescription ??
      `Tent rentals, table and chair rentals, and event setup service in ${townName}, Connecticut.`,
    path: `/service-areas/${town}`,
  });
}

export default async function TownPage({ params }: Props) {
  const { town } = await params;
  const townName = unslug(town);
  if (!townList.includes(townName)) notFound();

  const extra = townPageExtras[townName];

  const defaultH1 = `${townName} tent rentals and event rentals`;
  const defaultIntro = (
    <>
      We support weddings, backyard events, graduation parties, and corporate functions in {townName} with clean equipment, reliable scheduling, and professional setup. Family owned
      and operated since {business.establishedYear}.
    </>
  );

  return (
    <>
      {extra?.hero ? (
        <section className="border-b border-stone-200 bg-[#f4f1eb] pt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <figure className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-md">
              <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
                <Image
                  src={extra.hero.src}
                  alt={extra.hero.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="border-t border-stone-200 bg-white px-4 py-3 text-center text-sm text-stone-600">{extra.hero.caption}</figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/service-areas" }, { label: `${townName}` }]} />
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{extra?.h1 ?? defaultH1}</h1>
          <p className="mt-3 text-stone-600">{extra?.intro ?? defaultIntro}</p>

          {extra ? (
            <p className="mt-4 text-sm text-stone-600">
              Explore{" "}
              <Link href="/tent-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                tent rentals
              </Link>
              ,{" "}
              <Link href="/wedding-tent-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                wedding tent rentals
              </Link>
              , and{" "}
              <Link href="/table-chair-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                table and chair rentals
              </Link>{" "}
              for your {townName} event, or{" "}
              <Link href="/contact" className="font-medium text-stone-800 underline underline-offset-2">
                request a quote
              </Link>{" "}
              for a tailored plan.
            </p>
          ) : null}

          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-xl font-semibold">Popular event needs in {townName}</h2>
            <ul className="mt-4 space-y-2 text-sm text-stone-700">
              <li>Wedding ceremony and reception tent layouts</li>
              <li>Backyard party tent packages with tables and chairs</li>
              <li>Graduation tent rentals with rain-ready sidewall options</li>
              <li>Corporate and school event setups with clean presentation</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#1d2124] px-5 py-3 text-sm font-semibold text-white">
              Request a {townName} Quote
            </Link>
            <a href={business.phoneHref} className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800">
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
