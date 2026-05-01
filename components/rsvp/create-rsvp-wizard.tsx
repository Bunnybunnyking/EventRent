"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { createHostedEventAction } from "@/app/rsvp/actions";
import {
  EVENT_TYPE_OPTIONS,
  INDOOR_OUTDOOR_OPTIONS,
  RENTAL_NEED_OPTIONS,
  SEATING_STYLE_OPTIONS,
} from "@/lib/rsvp/constants";
import type { CreateEventInput } from "@/lib/rsvp/service";
import type { EventTypeOption, IndoorOutdoorOption, RentalNeedOption, SeatingStyleOption } from "@/lib/rsvp/types";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 shadow-sm outline-none transition focus:border-[#b78a2d] focus:ring-2 focus:ring-[#c9a228]/40";
const labelClass = "block text-sm font-semibold text-stone-800";

function StepPill({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
        done ? "bg-[#c9a228] text-stone-900" : active ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-600"
      }`}
    >
      {done ? "✓" : n}
    </div>
  );
}

export function CreateRsvpWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [hostName, setHostName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState<EventTypeOption>("Wedding");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [estimatedGuestCount, setEstimatedGuestCount] = useState<number>(50);
  const [indoorOutdoor, setIndoorOutdoor] = useState<IndoorOutdoorOption>("Outdoor");
  const [hostMessage, setHostMessage] = useState("");

  const [seatingStyle, setSeatingStyle] = useState<SeatingStyleOption>("Seated dinner");
  const [rentalNeeds, setRentalNeeds] = useState<RentalNeedOption[]>([]);

  const [result, setResult] = useState<{
    slug: string;
    publicRsvpPath: string;
    hostDashboardPath: string;
    publicRsvpUrl: string;
    hostDashboardUrl: string;
  } | null>(null);

  const publicUrl = useMemo(() => result?.publicRsvpUrl ?? "", [result]);

  function toggleRental(need: RentalNeedOption) {
    setRentalNeeds((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]));
  }

  function goNextFromStep1() {
    setError(null);
    if (!hostName.trim() || !email.trim() || !phone.trim() || !eventName.trim() || !eventDate.trim() || !location.trim()) {
      setError("Please complete host name, email, phone, event name, date, and town or address.");
      return;
    }
    setStep(2);
  }

  function submit() {
    setError(null);
    const input: CreateEventInput = {
      hostName,
      email,
      phone,
      eventName,
      eventType,
      eventDate,
      location,
      estimatedGuestCount: Number(estimatedGuestCount),
      indoorOutdoor,
      seatingStyle,
      rentalNeeds,
      hostMessage,
    };
    startTransition(async () => {
      const res = await createHostedEventAction(input);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setResult({
        slug: res.slug,
        publicRsvpPath: res.publicRsvpPath,
        hostDashboardPath: res.hostDashboardPath,
        publicRsvpUrl: res.publicRsvpUrl,
        hostDashboardUrl: res.hostDashboardUrl,
      });
      setStep(3);
    });
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt("Copy this link:", text);
    }
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-center gap-3">
        <StepPill n={1} active={step === 1} done={step > 1} />
        <div className="h-px w-8 bg-stone-300" aria-hidden />
        <StepPill n={2} active={step === 2} done={step > 2} />
        <div className="h-px w-8 bg-stone-300" aria-hidden />
        <StepPill n={3} active={step === 3} done={false} />
      </div>
      <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
        {step === 1 ? "Step 1 · Basic event info" : step === 2 ? "Step 2 · Rentals & seating" : "Step 3 · Your links"}
      </p>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
          {error}
        </p>
      ) : null}

      {step === 1 ? (
        <div className="mt-8 space-y-5">
          <div>
            <label className={labelClass} htmlFor="hostName">
              Host name
            </label>
            <input id="hostName" className={fieldClass} value={hostName} onChange={(e) => setHostName(e.target.value)} autoComplete="name" />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={fieldClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">
              Phone
            </label>
            <input id="phone" type="tel" className={fieldClass} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          </div>
          <div>
            <label className={labelClass} htmlFor="eventName">
              Event name
            </label>
            <input id="eventName" className={fieldClass} value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="eventType">
              Event type
            </label>
            <select id="eventType" className={fieldClass} value={eventType} onChange={(e) => setEventType(e.target.value as EventTypeOption)}>
              {EVENT_TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="eventDate">
              Event date
            </label>
            <input id="eventDate" type="date" className={fieldClass} value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="location">
              Town / address
            </label>
            <input
              id="location"
              className={fieldClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Town or general area shown to guests"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="guests">
              Estimated guest count
            </label>
            <input
              id="guests"
              type="number"
              min={1}
              className={fieldClass}
              value={estimatedGuestCount}
              onChange={(e) => setEstimatedGuestCount(Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="io">
              Indoor, outdoor, or mixed
            </label>
            <select id="io" className={fieldClass} value={indoorOutdoor} onChange={(e) => setIndoorOutdoor(e.target.value as IndoorOutdoorOption)}>
              {INDOOR_OUTDOOR_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="hostMessage">
              Optional message to guests
            </label>
            <textarea
              id="hostMessage"
              className={`${fieldClass} min-h-[96px] resize-y`}
              value={hostMessage}
              onChange={(e) => setHostMessage(e.target.value)}
              placeholder="Parking, rain plan, attire, or timing notes guests should see."
            />
          </div>
          <button
            type="button"
            onClick={goNextFromStep1}
            className="mt-2 flex min-h-[52px] w-full items-center justify-center rounded-full bg-stone-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 [font-family:var(--font-display)]"
          >
            Continue to rental needs
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-8 space-y-6">
          <div>
            <label className={labelClass} htmlFor="seating">
              Seating style
            </label>
            <select id="seating" className={fieldClass} value={seatingStyle} onChange={(e) => setSeatingStyle(e.target.value as SeatingStyleOption)}>
              {SEATING_STYLE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className={labelClass}>Rental needs (check all that apply)</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {RENTAL_NEED_OPTIONS.map((need) => {
                const checked = rentalNeeds.includes(need);
                return (
                  <label
                    key={need}
                    className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold ${
                      checked ? "border-[#b78a2d] bg-[#fffdf8] text-stone-900" : "border-stone-200 bg-stone-50 text-stone-800"
                    }`}
                  >
                    <input type="checkbox" className="h-5 w-5 accent-[#b78a2d]" checked={checked} onChange={() => toggleRental(need)} />
                    {need}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full border-2 border-stone-300 bg-white px-6 py-3.5 text-base font-semibold text-stone-900 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
            >
              Back
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={submit}
              className="inline-flex min-h-[52px] flex-[2] items-center justify-center rounded-full bg-stone-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 disabled:opacity-60 [font-family:var(--font-display)]"
            >
              {pending ? "Creating your links…" : "Create my event page"}
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 && result ? (
        <div className="mt-8 space-y-6">
          <h2 className="text-center text-2xl font-semibold text-stone-900 [font-family:var(--font-display)]">Your event page is ready.</h2>
          <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5">
            <p className="text-sm font-semibold text-stone-900">Share this RSVP link with guests</p>
            <p className="mt-1 break-all text-xs text-stone-600">{publicUrl}</p>
            <button
              type="button"
              onClick={() => void copyText(publicUrl)}
              className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-full bg-stone-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 [font-family:var(--font-display)]"
            >
              Copy RSVP link
            </button>
          </div>
          <div className="rounded-2xl border border-[#c9a228]/50 bg-[#fffdf8] p-5">
            <p className="text-sm font-semibold text-stone-900">Keep this private for yourself</p>
            <p className="mt-2 text-xs leading-relaxed text-stone-700">
              Your dashboard link includes a security token. Anyone with the link can see responses and contact info you entered as the
              host.
            </p>
            <Link
              href={result.hostDashboardPath}
              className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-full border-2 border-stone-900 bg-white px-6 py-3.5 text-base font-semibold text-stone-900 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 [font-family:var(--font-display)]"
            >
              Open host dashboard
            </Link>
          </div>
          <p className="text-sm leading-relaxed text-stone-600">
            When email is turned on, we will send both links to the address you entered. Your RSVP link is for guests. Your dashboard link
            is for tracking your count and updating rental planning. For now, copy each link below and save them somewhere safe.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/rsvp"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-900 hover:bg-stone-50"
            >
              Event planner home
            </Link>
            <Link
              href="/contact#quote"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#c9a228] px-6 py-3 text-sm font-semibold text-stone-900 hover:bg-[#b78a2d]"
            >
              Talk to our event team
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
