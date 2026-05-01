import Link from "next/link";
import { bookNowHeaderClass } from "@/lib/cta-styles";

export function TentPlannerCallout({ variant = "light" }: { variant?: "light" | "dark" }) {
  const shell =
    variant === "dark"
      ? "border-[#b78a2d]/35 bg-[#1a1d22] text-stone-100"
      : "border-stone-200 bg-white text-stone-900";
  return (
    <aside
      className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${shell}`}
      aria-labelledby="tent-planner-callout-heading"
    >
      <h2 id="tent-planner-callout-heading" className="text-lg font-semibold tracking-tight sm:text-xl">
        Plan the layout before you lock a tent size
      </h2>
      <p className={`mt-2 text-sm leading-relaxed ${variant === "dark" ? "text-stone-400" : "text-stone-600"}`}>
        Our planning hub walks through guest count, ceremony vs reception, dance floor, buffet, and weather, so your quote matches how the day actually runs.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link href="/planning" className={`${bookNowHeaderClass} justify-center text-center sm:inline-flex`}>
          Open planning hub
        </Link>
        <Link
          href="/party-guides"
          className={`text-center text-sm font-semibold underline underline-offset-4 ${variant === "dark" ? "text-[#edc16c] hover:text-white" : "text-stone-800 hover:text-stone-950"}`}
        >
          Party guides
        </Link>
        <Link
          href="/quick-event-planner"
          className={`text-center text-sm font-semibold underline underline-offset-4 ${variant === "dark" ? "text-[#edc16c] hover:text-white" : "text-stone-800 hover:text-stone-950"}`}
        >
          Quick event planner
        </Link>
        <Link
          href="/contact#quote"
          className={`text-center text-sm font-semibold underline underline-offset-4 ${variant === "dark" ? "text-stone-300 hover:text-white" : "text-stone-700 hover:text-stone-900"}`}
        >
          Book Consultation
        </Link>
      </div>
    </aside>
  );
}
