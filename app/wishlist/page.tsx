import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Wish List",
  description: "Save rental ideas and request a consultation with Connecticut Party Rentals.",
  path: "/wishlist",
});

export default function WishlistPage() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wish List" }]} />
        <h1 className="mt-6 text-3xl font-semibold text-stone-900">Your Wish List</h1>
        <p className="mt-3 text-stone-600">
          Save items here as we add the feature, or{" "}
          <Link href="/contact" className="font-semibold text-stone-800 underline">
            request a consultation
          </Link>{" "}
          and we will help you build your rental list for {business.primaryCity} and beyond.
        </p>
      </div>
    </section>
  );
}
