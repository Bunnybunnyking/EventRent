"use client";

import type { FormEvent, InputHTMLAttributes } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { callOrTextAriaLabel, CallAndTextCta } from "@/components/call-and-text-stack";
import { bookNowQuoteFooterClass, callNowQuoteSidebarClass } from "@/lib/cta-styles";
import { QUOTE_CONVERSION_SESSION_KEY } from "@/lib/google-ads-conversion";
import { business } from "@/lib/site-data";

const quoteFormAction = process.env.NEXT_PUBLIC_QUOTE_FORM_ACTION?.trim() ?? "";
/** External form redirect target — include `?quote=1` so thank-you tracking fires (e.g. `https://www.eventrentct.com/contact/thank-you?quote=1`). */
const quoteThankYouUrl = process.env.NEXT_PUBLIC_QUOTE_THANK_YOU_URL?.trim() ?? "";

/** Warm white fields + gold focus — matches contact page frame & eventrentct-style CTAs */
const inputClass =
  "w-full rounded-xl border border-stone-300/95 bg-white px-3 py-2 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#b78a2d] focus:ring-2 focus:ring-[#c9a228]/30";

const labelClass = "mb-0.5 block text-sm font-semibold text-stone-800";
const optionalLabelClass = "mb-0.5 block text-sm font-medium text-stone-600";

const optionalPanelClass =
  "rounded-xl border border-[#e8dfd3]/90 bg-white/90 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-3";

/** Compact header CTAs — same palette as site gold, smaller footprint */
const compactCallClass =
  "inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#6b5420] bg-gradient-to-b from-[#faf6eb] via-[#e4c96e] to-[#9f7322] px-3 py-1.5 text-[11px] font-bold leading-tight text-[#1a140c] shadow-sm transition hover:brightness-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:px-3.5 sm:py-1.5 sm:text-xs font-[family-name:var(--font-display)]";

const compactCatalogClass =
  "inline-flex max-w-full items-center justify-center rounded-full border border-stone-300 bg-white/95 px-3 py-1.5 text-center text-[11px] font-semibold leading-tight text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:text-xs font-[family-name:var(--font-display)]";

/** Full-width catalog control inside quote sidebar (md+) */
const quoteSidebarCatalogClass =
  "inline-flex w-full min-h-[46px] select-none items-center justify-center rounded-2xl border-2 border-stone-300/95 bg-white/95 px-4 py-2.5 text-center text-sm font-semibold text-stone-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_10px_-4px_rgba(55,42,28,0.08)] transition hover:border-[#c9a228]/80 hover:bg-[#fffefb] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 [font-family:var(--font-display)]";

const eventElementOptions = [
  { id: "ev-dj", value: "DJ / entertainment", label: "DJ / entertainment" },
  { id: "ev-dance", value: "Dance floor", label: "Dance floor" },
  { id: "ev-food", value: "Food / catering service", label: "Food / catering" },
  { id: "ev-bar", value: "Bar / beverages", label: "Bar / beverages" },
  { id: "ev-ceremony", value: "Ceremony space", label: "Ceremony space" },
  { id: "ev-lighting", value: "Lighting (bistro, uplighting, etc.)", label: "Lighting" },
  { id: "ev-stage", value: "Stage / podium", label: "Stage / podium" },
  { id: "ev-av", value: "AV / microphones / slideshow", label: "AV / slideshow" },
  { id: "ev-games", value: "Games / inflatables", label: "Games / inflatables" },
  { id: "ev-photo", value: "Photo or video team space", label: "Photo / video" },
] as const;

export function QuoteForm() {
  const searchParams = useSearchParams();
  const [bookingHint, setBookingHint] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const defaultEventType = searchParams.get("etype") ?? "";

  const [guestApprox, setGuestApprox] = useState(() => {
    const g = parseInt(searchParams.get("guests") ?? "", 10);
    if (!Number.isFinite(g) || g <= 0) return 0;
    return Math.min(500, Math.max(0, Math.round(g / 25) * 25));
  });

  useEffect(() => {
    const fromPlanner = sessionStorage.getItem("ctpr_planner_summary");
    if (!fromPlanner) return;
    const el = document.getElementById("eventDescription") as HTMLTextAreaElement | null;
    if (el && !el.value.trim()) {
      el.value = fromPlanner;
    }
    sessionStorage.removeItem("ctpr_planner_summary");
  }, []);

  async function onSubmitQuote(e: FormEvent<HTMLFormElement>) {
    if (quoteFormAction) return;
    e.preventDefault();
    setBookingHint(null);
    setSubmitState("submitting");
    const form = e.currentTarget;
    try {
      const fd = new FormData(form);
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSubmitState("error");
        setBookingHint(data.error ?? "Something went wrong. Please call us or try again.");
        return;
      }
      try {
        sessionStorage.setItem(QUOTE_CONVERSION_SESSION_KEY, "1");
      } catch {
        /* ignore — thank-you URL still carries ?quote=1 */
      }
      /** Full page navigation so GTM / GA tags tied to a real page view on `/contact/thank-you` fire reliably (SPA alone often misses). */
      window.location.assign("/contact/thank-you?quote=1");
      return;
    } catch {
      setSubmitState("error");
      setBookingHint("Could not send right now. Please call us or try again in a moment.");
    }
  }

  return (
    <form
      id="quote-form"
      name="quote"
      autoComplete="on"
      className="rounded-2xl border border-[#e3d3b0]/85 bg-gradient-to-b from-white via-[#fffefb] to-[#faf6ee]/95 p-4 shadow-[0_12px_40px_-24px_rgba(75,58,28,0.18)] sm:p-5"
      noValidate
      action={quoteFormAction || undefined}
      method={quoteFormAction ? "post" : undefined}
      onSubmit={onSubmitQuote}
    >
      {/* Honeypot: hidden from users; if filled, server discards as spam */}
      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6 lg:gap-8">
        <aside className="hidden w-full shrink-0 md:block md:w-[min(100%,288px)] lg:w-[min(100%,308px)] md:sticky md:top-24 md:self-start" aria-label="Phone and catalog">
          <div
            className="relative overflow-hidden rounded-2xl border border-[#e3d3b0]/95 bg-[linear-gradient(165deg,#fffefb_0%,#faf6ee_48%,#f0e6d8_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_36px_-22px_rgba(75,58,28,0.22)] sm:p-5"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
              aria-hidden
            />
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 sm:text-[11px]">
              Prefer to talk?
            </p>
            <div className="mt-3 w-full">
              <CallAndTextCta
                variant="section"
                layout="stack"
                wrapperClassName="w-full gap-2.5"
                linkClassName={callNowQuoteSidebarClass}
                linkProps={{ title: callOrTextAriaLabel }}
              />
            </div>
            <p className="mt-3.5 text-center text-xs leading-relaxed text-stone-600 sm:text-[13px]">
              Same team reads every request. We can walk through tents, guest counts, and what fits your space.
            </p>
            <Link
              href="/wishlist"
              prefetch
              className={`${quoteSidebarCatalogClass} mt-4`}
              title="Browse catalog and wishlist"
            >
              Browse catalog &amp; wishlist
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
      <header className="border-b border-[#ebe4d9] pb-2.5 md:pb-3">
        <h1 className="text-lg font-semibold tracking-tight text-stone-900 font-[family-name:var(--font-display)] sm:text-xl">
          Reserve Party Rentals Online
        </h1>
        <div className="mt-1.5 flex flex-wrap items-end gap-1.5 md:hidden">
          <CallAndTextCta variant="compact" linkClassName={compactCallClass} linkProps={{ title: callOrTextAriaLabel }} />
          <Link href="/wishlist" className={compactCatalogClass} title="Browse catalog and wishlist">
            Catalog
          </Link>
        </div>
      </header>

      <div className="space-y-2 pt-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Name" name="name" autoComplete="name" required />
          <Field label="Email" name="email" type="email" autoComplete="email" required />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required className="sm:col-span-2" />
          <Field
            label="Event date or timeframe"
            name="eventDateOrTimeframe"
            autoComplete="off"
            placeholder="e.g. June 14, 2026 · a Saturday in July · fall 2026"
            required
            className="sm:col-span-2"
          />
          <Field
            label="Event type"
            name="eventType"
            autoComplete="off"
            placeholder="e.g. wedding, corporate, graduation, backyard party"
            required
            className="sm:col-span-2"
            defaultValue={defaultEventType}
          />
        </div>
      </div>

      <details className="group mt-3 rounded-xl border border-[#e3d3b0]/70 bg-[linear-gradient(180deg,#faf8f4_0%,#f5f0e8/95_100%)] open:shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
        <summary className="cursor-pointer list-none px-3 py-2 text-xs font-semibold text-stone-800 transition marker:content-none sm:px-3.5 sm:text-sm [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-2">
            <span>
              More details <span className="font-normal text-stone-500">(optional)</span>
            </span>
            <span className="shrink-0 text-[#b78a2d] transition-transform duration-200 group-open:rotate-180" aria-hidden>
              ▼
            </span>
          </span>
        </summary>
        <div className="space-y-3 border-t border-[#e8dfd3]/90 px-3 pb-3 pt-2 sm:px-3.5">
          <div>
            <p className={`${optionalLabelClass} text-xs`}>Check what applies</p>
            <div className="mt-1.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {eventElementOptions.map((opt) => (
                <label
                  key={opt.id}
                  htmlFor={opt.id}
                  className="flex cursor-pointer items-start gap-2 rounded-lg border border-[#e8dfd3]/85 bg-white px-2.5 py-2 text-sm text-stone-800 transition hover:border-[#d4bc7a]/70"
                >
                  <input id={opt.id} type="checkbox" name="eventElements" value={opt.value} className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-[#b78a2d] focus:ring-[#c9a228]" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="guestApproxSlider" className={optionalLabelClass}>
              Rough guest count <span className="font-normal text-stone-400">(slide; optional)</span>
            </label>
            <div className="mt-1.5 rounded-lg border border-[#e8dfd3]/90 bg-white px-2.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <div className="flex items-center justify-between gap-2 text-xs font-medium text-stone-700">
                <span id="guestApproxLabel">{guestApprox === 0 ? "Not sure yet" : `About ${guestApprox} guests`}</span>
                {guestApprox > 0 ? (
                  <button
                    type="button"
                    className="text-[11px] font-semibold text-[#8a6220] underline underline-offset-2 hover:text-stone-900"
                    onClick={() => setGuestApprox(0)}
                  >
                    Clear
                  </button>
                ) : null}
              </div>
              <input
                id="guestApproxSlider"
                type="range"
                min={0}
                max={500}
                step={25}
                value={guestApprox}
                onChange={(ev) => setGuestApprox(Number(ev.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-[#b78a2d]"
                aria-valuemin={0}
                aria-valuemax={500}
                aria-valuenow={guestApprox}
                aria-labelledby="guestApproxLabel"
              />
              <div className="mt-1 flex justify-between text-[10px] text-stone-400">
                <span>0</span>
                <span>250</span>
                <span>500+</span>
              </div>
              <input type="hidden" name="approxGuestCount" value={guestApprox === 0 ? "" : String(guestApprox)} />
            </div>
          </div>

          <div className={optionalPanelClass}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a6e22]">Event location</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <OptionalField
                label="Venue or site name"
                name="venue"
                autoComplete="organization"
                placeholder="Private residence, club, park…"
              />
              <OptionalField label="Budget range" name="budget" autoComplete="off" placeholder="Optional ballpark" />
              <OptionalField
                label="Street address"
                name="addressLine1"
                autoComplete="address-line1"
                placeholder="123 Main Street"
                className="sm:col-span-2"
              />
              <div className="grid min-w-0 gap-2 sm:col-span-2 sm:grid-cols-3">
                <OptionalField
                  label="City"
                  name="venueCity"
                  autoComplete="address-level2"
                  placeholder="West Hartford"
                />
                <OptionalField
                  label="State"
                  name="addressRegion"
                  autoComplete="address-level1"
                  placeholder="CT"
                  defaultValue="CT"
                />
                <OptionalField
                  label="ZIP"
                  name="postalCode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  placeholder="06107"
                />
              </div>
            </div>
          </div>
          <OptionalField
            label="Other rentals or layout notes"
            name="rentalPreferences"
            autoComplete="off"
            placeholder="Tent style, tables/chairs, games, inflatables…"
          />
          <div>
            <label htmlFor="eventDescription" className={optionalLabelClass}>
              Event description <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              rows={3}
              className={inputClass}
              placeholder="High-level vision, schedule, or vibe"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="specialRequests" className={optionalLabelClass}>
              Special requests <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              rows={2}
              className={inputClass}
              placeholder="Accessibility, weather, load-in windows…"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="otherDetails" className={optionalLabelClass}>
              Anything else for your planner <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <textarea
              id="otherDetails"
              name="otherDetails"
              rows={2}
              className={inputClass}
              placeholder="Parking, power, neighbor notes…"
              autoComplete="off"
            />
          </div>
        </div>
      </details>

      {quoteFormAction && quoteThankYouUrl ? (
        <input type="hidden" name="_next" value={quoteThankYouUrl} />
      ) : null}
      {quoteFormAction && quoteFormAction.includes("formsubmit.co") ? (
        <>
          <input type="hidden" name="_subject" value="Connecticut Party Rentals: quote request" />
          <input type="hidden" name="_captcha" value="false" />
        </>
      ) : null}

      <div className="mt-3 border-t border-[#ebe4d9] pt-3">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className={`${bookNowQuoteFooterClass} justify-center disabled:pointer-events-none disabled:opacity-60`}
        >
          <span className="relative z-10">{submitState === "submitting" ? "Sending…" : "Book consultation"}</span>
        </button>
        <p className="mx-auto mt-2 max-w-md px-1 text-center text-[11px] leading-snug text-stone-500">
          By submitting, you agree to our{" "}
          <Link href="/privacy-policy" className="font-medium text-stone-600 underline underline-offset-2 hover:text-stone-800">
            Privacy Policy
          </Link>
          . We do not sell your information or share it with third parties for their marketing without your consent.
        </p>
        <p className="mx-auto mt-3 max-w-md px-1 text-center text-[13px] leading-relaxed text-stone-600 sm:text-sm">
          Explore our tent inventory, chairs, and tables online, then build a wishlist to help expedite your quote
          when you&apos;re ready.
        </p>
        <div className="mt-5">
          <Link
            href="/rental-inventory"
            prefetch
            className={`${bookNowQuoteFooterClass} justify-center no-underline !font-extrabold tracking-tight`}
            title="View tents, tables, chairs, and rental inventory"
          >
            <span className="relative z-10">View Inventory</span>
          </Link>
        </div>
        {bookingHint ? (
          <p
            className={`rounded-lg border px-2.5 py-1.5 text-center text-[11px] ${
              submitState === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                : "border-amber-200 bg-amber-50 text-amber-950"
            }`}
          >
            {bookingHint}
          </p>
        ) : null}
      </div>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  inputMode,
  required,
  className = "",
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  className?: string;
  defaultValue?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label} <span className="text-[#b45309]">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        required={required}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </div>
  );
}

function OptionalField({
  label, name, type = "text", placeholder, inputMode, autoComplete, className = "", defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  className?: string;
  defaultValue?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className={optionalLabelClass}>
        {label} <span className="text-stone-400">(optional)</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </div>
  );
}
