"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { submitGuestRsvpAction } from "@/app/rsvp/actions";
import type { GuestRsvpInput } from "@/lib/rsvp/service";
import type { GuestSeatingNeed, RsvpGuestStatus } from "@/lib/rsvp/types";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 shadow-sm outline-none transition focus:border-[#b78a2d] focus:ring-2 focus:ring-[#c9a228]/40";
const labelClass = "block text-sm font-semibold text-stone-800";

export function GuestRsvpForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [status, setStatus] = useState<RsvpGuestStatus>("yes");
  const [partySize, setPartySize] = useState(2);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [needsSeat, setNeedsSeat] = useState<GuestSeatingNeed>("yes");
  const [mealChoice, setMealChoice] = useState("");
  const [notes, setNotes] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const input: GuestRsvpInput = {
      slug,
      guestName,
      guestEmail,
      guestPhone,
      status,
      partySize,
      adults,
      kids,
      needsSeat,
      mealChoice,
      notes,
    };
    startTransition(async () => {
      const res = await submitGuestRsvpAction(input);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push(`/rsvp/${slug}?thanks=1`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
          {error}
        </p>
      ) : null}
      <div>
        <label className={labelClass} htmlFor="g-name">
          Your name
        </label>
        <input
          id="g-name"
          className={fieldClass}
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="g-email">
          Email
        </label>
        <input
          id="g-email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          required
        />
        <p className="mt-1 text-xs text-stone-500">Shared only with your host and our event team for this RSVP.</p>
      </div>
      <div>
        <label className={labelClass} htmlFor="g-phone">
          Phone
        </label>
        <input
          id="g-phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={fieldClass}
          value={guestPhone}
          onChange={(e) => setGuestPhone(e.target.value)}
          placeholder="203-555-0100"
          required
        />
        <p className="mt-1 text-xs text-stone-500">Include area code (at least 10 digits). Not shown to other guests.</p>
      </div>
      <fieldset>
        <legend className={labelClass}>Attending</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {(
            [
              { v: "yes" as const, label: "Yes" },
              { v: "no" as const, label: "No" },
              { v: "maybe" as const, label: "Maybe" },
            ] as const
          ).map((opt) => (
            <label
              key={opt.v}
              className={`flex min-h-[52px] cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-semibold ${
                status === opt.v ? "border-[#b78a2d] bg-[#fffdf8] text-stone-900" : "border-stone-200 bg-stone-50 text-stone-800"
              }`}
            >
              <input type="radio" className="sr-only" name="status" value={opt.v} checked={status === opt.v} onChange={() => setStatus(opt.v)} />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="party">
            Number in party
          </label>
          <input
            id="party"
            type="number"
            min={1}
            className={fieldClass}
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="adults">
            Adults
          </label>
          <input
            id="adults"
            type="number"
            min={0}
            className={fieldClass}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="kids">
            Kids
          </label>
          <input id="kids" type="number" min={0} className={fieldClass} value={kids} onChange={(e) => setKids(Number(e.target.value))} />
        </div>
      </div>
      <fieldset>
        <legend className={labelClass}>Need seating?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {(
            [
              { v: "yes" as const, label: "Yes" },
              { v: "no" as const, label: "No" },
              { v: "not_sure" as const, label: "Not sure" },
            ] as const
          ).map((opt) => (
            <label
              key={opt.v}
              className={`flex min-h-[52px] cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-semibold ${
                needsSeat === opt.v ? "border-[#b78a2d] bg-[#fffdf8] text-stone-900" : "border-stone-200 bg-stone-50 text-stone-800"
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                name="needsSeat"
                value={opt.v}
                checked={needsSeat === opt.v}
                onChange={() => setNeedsSeat(opt.v)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className={labelClass} htmlFor="meal">
          Meal choice <span className="font-normal text-stone-500">(optional)</span>
        </label>
        <input id="meal" className={fieldClass} value={mealChoice} onChange={(e) => setMealChoice(e.target.value)} placeholder="If applicable" />
      </div>
      <div>
        <label className={labelClass} htmlFor="notes">
          Notes <span className="font-normal text-stone-500">(optional)</span>
        </label>
        <textarea id="notes" className={`${fieldClass} min-h-[88px] resize-y`} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="flex min-h-[54px] w-full items-center justify-center rounded-full bg-stone-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 disabled:opacity-60 [font-family:var(--font-display)]"
      >
        {pending ? "Saving…" : "Submit RSVP"}
      </button>
      <p className="text-center text-xs text-stone-500">
        We do not show other guests, the host&apos;s contact info, or rental quotes on this page. Your email and phone go only to the host
        dashboard.
      </p>
      <div className="border-t border-stone-200 pt-6 text-center">
        <p className="text-sm font-semibold text-stone-900">Need rentals for your own event?</p>
        <p className="mt-2 text-sm text-stone-600">Plan your party with Connecticut Party Rentals.</p>
        <Link
          href="/rsvp"
          className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center rounded-full border-2 border-stone-900 bg-white px-6 py-3.5 text-base font-semibold text-stone-900 transition hover:bg-stone-50 sm:w-auto"
        >
          Start My Event Plan
        </Link>
      </div>
    </form>
  );
}
