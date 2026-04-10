"use client";

import type { InputHTMLAttributes } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { bookNowSectionClass } from "@/lib/cta-styles";

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#a97a21] focus:ring-2 focus:ring-amber-100/80";

const labelClass = "mb-1.5 block text-sm font-semibold text-stone-800";
const optionalLabelClass = "mb-1.5 block text-sm font-medium text-stone-600";

export function QuoteForm() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const fromPlanner = sessionStorage.getItem("ctpr_planner_summary");
    if (!fromPlanner) return;
    const el = document.getElementById("eventDescription") as HTMLTextAreaElement | null;
    if (el && !el.value.trim()) {
      el.value = fromPlanner;
    }
    sessionStorage.removeItem("ctpr_planner_summary");
  }, []);

  const defaultEventType = searchParams.get("etype") ?? "";
  const defaultGuests = searchParams.get("guests") ?? "";

  return (
    <form className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8" noValidate>
      <div className="border-b border-stone-100 pb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-[1.75rem]">Get started</h2>
        <p className="mt-2 text-base leading-relaxed text-stone-600">
          A few quick fields—we’ll reply with next steps. You can share more about your event afterward.
        </p>
        <p className="mt-3 rounded-xl border border-amber-100/80 bg-amber-50/50 px-4 py-3 text-sm leading-relaxed text-stone-700">
          <span className="font-semibold text-stone-800">Our Event Concierge will follow up</span> to finalize tent size, layout, timing, and any special requests—no pressure.
        </p>
      </div>

      <div className="space-y-4 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a97a21]">Required</p>
        <div className="grid gap-4 sm:grid-cols-2">
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

      <details className="group mt-8 rounded-2xl border border-stone-200 bg-stone-50/80 open:bg-stone-50">
        <summary className="cursor-pointer list-none px-4 py-4 text-base font-semibold text-stone-800 transition marker:content-none sm:px-5 sm:py-4 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-3">
            <span>
              More details <span className="font-normal text-stone-500">(optional)</span>
            </span>
            <span className="inline-block text-[#a97a21] transition-transform duration-200 group-open:rotate-180" aria-hidden>
              ▼
            </span>
          </span>
        </summary>
        <div className="space-y-4 border-t border-stone-200/80 px-4 pb-5 pt-2 sm:px-5">
          <p className="text-sm leading-relaxed text-stone-600">
            Skip this for now if you’re unsure—we’ll cover guest count, venue, budget, and rentals when we reach out.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <OptionalField label="Venue name or town" name="venue" placeholder="Where will the event be held?" />
            <OptionalField
              label="Approximate guest count"
              name="guestCount"
              inputMode="numeric"
              placeholder="e.g. 120"
              defaultValue={defaultGuests}
            />
            <OptionalField label="Budget range" name="budget" placeholder="Optional ballpark" className="sm:col-span-2" />
            <OptionalField
              label="Rental preferences"
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
              placeholder="High-level vision or schedule"
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
              rows={3}
              className={inputClass}
              placeholder="Accessibility, weather concerns, load-in windows…"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="otherDetails" className={optionalLabelClass}>
              Other event details <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <textarea
              id="otherDetails"
              name="otherDetails"
              rows={2}
              className={inputClass}
              placeholder="Anything else we should know"
              autoComplete="off"
            />
          </div>
        </div>
      </details>

      <div className="mt-8 space-y-4">
        <button type="submit" className={`${bookNowSectionClass} w-full justify-center sm:w-full sm:py-4 sm:text-lg`}>
          Submit request
        </button>
        <p className="text-center text-sm text-stone-500">
          No payment required to start. We’ll reach out using the email or phone above.
        </p>
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
  label,
  name,
  type = "text",
  placeholder,
  inputMode,
  className = "",
  defaultValue,
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
