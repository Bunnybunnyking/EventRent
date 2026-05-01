"use client";

import type { FormEvent, InputHTMLAttributes } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { bookNowQuoteFooterClass } from "@/lib/cta-styles";
import { business } from "@/lib/site-data";

const quoteFormAction = process.env.NEXT_PUBLIC_QUOTE_FORM_ACTION?.trim() ?? "";
const quoteThankYouUrl = process.env.NEXT_PUBLIC_QUOTE_THANK_YOU_URL?.trim() ?? "";

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#a97a21] focus:ring-2 focus:ring-amber-100/80";

const labelClass = "mb-0.5 block text-sm font-semibold text-stone-800";
const optionalLabelClass = "mb-0.5 block text-sm font-medium text-stone-600";

/** Compact header CTAs — same palette as site gold, smaller footprint */
const compactCallClass =
  "inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#6b5420] bg-gradient-to-b from-[#faf6eb] via-[#e4c96e] to-[#9f7322] px-3 py-1.5 text-[11px] font-bold leading-tight text-[#1a140c] shadow-sm transition hover:brightness-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:px-3.5 sm:py-1.5 sm:text-xs font-[family-name:var(--font-display)]";

const compactCatalogClass =
  "inline-flex max-w-full items-center justify-center rounded-full border border-stone-300 bg-white/95 px-3 py-1.5 text-center text-[11px] font-semibold leading-tight text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:text-xs font-[family-name:var(--font-display)]";

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
      setSubmitState("success");
      setBookingHint("Thanks — we received your request. Our team will follow up soon.");
      form.reset();
      setGuestApprox(0);
    } catch {
      setSubmitState("error");
      setBookingHint("Could not send right now. Please call us or try again in a moment.");
    }
  }

  return (
    <form
      className="rounded-2xl border border-stone-200/95 bg-white p-3.5 shadow-[0_10px_36px_-20px_rgba(15,15,15,0.12)] sm:p-4"
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
      <header className="border-b border-stone-100 pb-2">
        <h1 className="text-lg font-semibold tracking-tight text-stone-900 font-[family-name:var(--font-display)] sm:text-xl">
          Reserve Party Rentals Online
        </h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <a href={business.phoneHref} className={compactCallClass} title={`Call ${business.phone}`}>
            <span>Call now</span>
            <span className="max-w-[10rem] truncate font-semibold opacity-90 sm:max-w-none">{business.phone}</span>
          </a>
          <Link href="/wishlist" className={compactCatalogClass} title="Browse catalog and wishlist">
            Catalog
          </Link>
        </div>
      </header>

      <div className="space-y-2 pt-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Name" name="name" autoComplete="name" required />
          <Field label="Email" name="email" type="email" autoComplete="email" required />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" required className="sm:col-span-2" />
          <Field
            label="Event date or timeframe"
            name="eventDateOrTimeframe"
            placeholder="e.g. June 14, 2026 · a Saturday in July · fall 2026"
            required
            className="sm:col-span-2"
          />
          <Field
            label="Event type"
            name="eventType"
            placeholder="e.g. wedding, corporate, graduation, backyard party"
            required
            className="sm:col-span-2"
            defaultValue={defaultEventType}
          />
        </div>
      </div>

      <details className="group mt-2 rounded-lg border border-stone-200 bg-stone-50/70 open:bg-stone-50/90">
        <summary className="cursor-pointer list-none px-2.5 py-1.5 text-xs font-semibold text-stone-800 transition marker:content-none sm:px-3 sm:text-sm [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-2">
            <span>
              More details <span className="font-normal text-stone-500">(optional)</span>
            </span>
            <span className="shrink-0 text-[#a97a21] transition-transform duration-200 group-open:rotate-180" aria-hidden>
              ▼
            </span>
          </span>
        </summary>
        <div className="space-y-2.5 border-t border-stone-200/80 px-2.5 pb-2.5 pt-1.5 sm:px-3">
          <div>
            <p className={`${optionalLabelClass} text-xs`}>Check what applies</p>
            <div className="mt-1.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {eventElementOptions.map((opt) => (
                <label
                  key={opt.id}
                  htmlFor={opt.id}
                  className="flex cursor-pointer items-start gap-2 rounded-lg border border-stone-200/80 bg-white px-2.5 py-2 text-sm text-stone-800 transition hover:border-stone-300"
                >
                  <input id={opt.id} type="checkbox" name="eventElements" value={opt.value} className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-[#9a7a45] focus:ring-[#c9a228]" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="guestApproxSlider" className={optionalLabelClass}>
              Rough guest count <span className="font-normal text-stone-400">(slide; optional)</span>
            </label>
            <div className="mt-1.5 rounded-lg border border-stone-200/80 bg-white px-2.5 py-2">
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
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-[#9a7a45]"
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

          <div className="grid gap-2 sm:grid-cols-2">
            <OptionalField label="Venue name or town" name="venue" placeholder="Where will the event be held?" />
            <OptionalField label="Budget range" name="budget" placeholder="Optional ballpark" />
            <OptionalField
              label="Other rentals or layout notes"
              name="rentalPreferences"
              placeholder="Tent style, tables/chairs, games, inflatables…"
              className="sm:col-span-2"
            />
          </div>
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
          <input type="hidden" name="_subject" value="Connecticut Party Rentals — quote request" />
          <input type="hidden" name="_captcha" value="false" />
        </>
      ) : null}

      <div className="mt-2 space-y-1.5 border-t border-stone-100 pt-2">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className={`${bookNowQuoteFooterClass} justify-center disabled:pointer-events-none disabled:opacity-60`}
        >
          <span className="relative z-10">{submitState === "submitting" ? "Sending…" : "Book consultation"}</span>
        </button>
        <Link
          href="/wishlist"
          className={`${bookNowQuoteFooterClass} justify-center no-underline`}
          title="Browse packages and build your list online"
        >
          <span className="relative z-10">Book Online</span>
        </Link>
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
    </form>
  );
}

function Field({
  label, name, type = "text", autoComplete, placeholder, inputMode, required, className = "", defaultValue,
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
  label, name, type = "text", placeholder, inputMode, className = "", defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
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
        defaultValue={defaultValue}
        className={inputClass}
      />
    </div>
  );
}
