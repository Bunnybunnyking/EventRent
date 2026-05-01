"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { requestQuoteUpdateAction, updateOptionalAdditionAction } from "@/app/rsvp/actions";
import { recommendationForOptionalAddition } from "@/lib/rsvp/addition-recommendations";
import {
  daysUntilEventLocal,
  finalCountMessage,
  planningCountFromRollup,
  rollupRsvps,
} from "@/lib/rsvp/planning";
import type { RentalNeedOption, RsvpGuest, RsvpGuestStatus, SeatingStyleOption } from "@/lib/rsvp/types";

export type HostDashboardPayload = {
  slug: string;
  token: string;
  eventName: string;
  eventDate: string;
  eventType: string;
  location: string;
  estimatedGuestCount: number;
  rentalNeeds: string[];
  optionalAddition: RentalNeedOption | null;
  additionOptions: RentalNeedOption[];
  seatingStyle: string;
  indoorOutdoor: string;
  quoteUpdateRequested: boolean;
  quoteUpdateResolved: boolean;
  rsvps: RsvpGuest[];
};

const cardClass = "rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5";

function formatWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/New_York" });
}

function formatYmd(ymd: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return ymd;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });
}

function labelStatus(s: RsvpGuestStatus): string {
  if (s === "yes") return "Yes";
  if (s === "no") return "No";
  return "Maybe";
}

function labelSeat(s: string): string {
  if (s === "yes") return "Yes";
  if (s === "no") return "No";
  return "Not sure";
}

export function HostDashboard({ data }: { data: HostDashboardPayload }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | RsvpGuestStatus>("all");
  const [pending, startTransition] = useTransition();
  const [additionPending, startAdditionTransition] = useTransition();
  const [banner, setBanner] = useState<string | null>(null);
  const [localAddition, setLocalAddition] = useState<string>(data.optionalAddition ?? "");

  useEffect(() => {
    setLocalAddition(data.optionalAddition ?? "");
  }, [data.optionalAddition]);

  const rollup = useMemo(() => rollupRsvps(data.rsvps), [data.rsvps]);
  const planning = useMemo(() => planningCountFromRollup(rollup), [rollup]);
  const additionRec = useMemo(() => {
    if (!data.optionalAddition) return null;
    return recommendationForOptionalAddition(
      data.optionalAddition,
      planning,
      data.seatingStyle as SeatingStyleOption,
    );
  }, [data.optionalAddition, data.seatingStyle, planning]);

  const days = daysUntilEventLocal(data.eventDate);
  const finalMsg = finalCountMessage(days);

  const filtered = useMemo(() => {
    if (filter === "all") return data.rsvps;
    return data.rsvps.filter((g) => g.status === filter);
  }, [data.rsvps, filter]);

  const summaryText = useMemo(() => {
    const lines = [
      `Event: ${data.eventName}`,
      `Date: ${data.eventDate}`,
      `Planning count (confirmed + 50% maybe, rounded up): ${planning}`,
      `RSVP responses: ${rollup.responseCount}`,
      `Confirmed people (party sizes): ${rollup.confirmedPeople}`,
      `Maybe people: ${rollup.maybePeople}`,
      `Declined people: ${rollup.declinedPeople}`,
      `Base rental list (from create form): ${data.rentalNeeds.join(", ") || "—"}`,
      data.optionalAddition ? `Optional add-on focus: ${data.optionalAddition}` : "Optional add-on focus: (none selected)",
    ];
    return lines.join("\n");
  }, [
    data.eventDate,
    data.eventName,
    data.optionalAddition,
    data.rentalNeeds,
    planning,
    rollup.confirmedPeople,
    rollup.declinedPeople,
    rollup.maybePeople,
    rollup.responseCount,
  ]);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText);
      setBanner("Summary copied. Paste it into an email or quote request.");
    } catch {
      window.prompt("Copy this summary:", summaryText);
    }
  }

  function requestQuote() {
    setBanner(null);
    startTransition(async () => {
      const res = await requestQuoteUpdateAction(data.slug, data.token);
      if (!res.ok) {
        setBanner("We could not flag the quote update. Check your dashboard link.");
        return;
      }
      setBanner("Thanks — we marked that you want help updating your rental count.");
      router.refresh();
    });
  }

  function saveAdditionChoice() {
    setBanner(null);
    startAdditionTransition(async () => {
      const raw = localAddition === "" ? null : localAddition;
      const res = await updateOptionalAdditionAction(data.slug, data.token, raw);
      if (!res.ok) {
        setBanner(res.error === "unauthorized" ? "This dashboard link is no longer valid." : "We could not save that selection.");
        return;
      }
      setBanner("Saved. Recommendations below now match your add-on focus.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-10">
      {banner ? (
        <p className="rounded-xl border border-[#c9a228]/50 bg-[#fffdf8] px-4 py-3 text-sm text-stone-800" role="status">
          {banner}
        </p>
      ) : null}

      <section className={cardClass}>
        <h2 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">Event summary</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Event name</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.eventName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Event date</dt>
            <dd className="mt-1 font-medium text-stone-900">{formatYmd(data.eventDate)}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Event type</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.eventType}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Town / location</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.location}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Original estimated guests</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.estimatedGuestCount}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Indoor / outdoor</dt>
            <dd className="mt-1 font-medium text-stone-900">{data.indoorOutdoor}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Rental needs you selected</dt>
            <dd className="mt-1 text-stone-800">{data.rentalNeeds.length ? data.rentalNeeds.join(" · ") : "Not specified"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Seating style</dt>
            <dd className="mt-1 text-stone-800">{data.seatingStyle}</dd>
          </div>
          {data.quoteUpdateRequested ? (
            <div className="sm:col-span-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              Quote update requested{data.quoteUpdateResolved ? " (resolved on admin side)" : ""}. Our team can use your planning count
              alongside your Goodshuffle quote or wishlist when you are ready.
            </div>
          ) : null}
        </dl>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">RSVP totals</h2>
        <p className="mt-1 text-sm text-stone-600">Headcount uses each guest&apos;s party size by RSVP status.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Confirmed guests", value: rollup.confirmedPeople },
            { label: "Maybe guests", value: rollup.maybePeople },
            { label: "Declined guests", value: rollup.declinedPeople },
            { label: "Adults (reported)", value: rollup.adults },
            { label: "Kids (reported)", value: rollup.kids },
            { label: "Total responses", value: rollup.responseCount },
          ].map((c) => (
            <div key={c.label} className={cardClass}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{c.label}</p>
              <p className="mt-2 text-3xl font-semibold text-stone-900 [font-family:var(--font-display)]">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${cardClass} border-[#c9a228]/40 bg-[#fffdf8]`}>
        <h2 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">Planning count</h2>
        <p className="mt-3 text-4xl font-semibold text-stone-900 [font-family:var(--font-display)]">{planning}</p>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          We use confirmed guests plus part of the maybe list to help you avoid under-ordering tables, chairs, and linens.
        </p>
      </section>

      <section className={cardClass}>
        <h2 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">Optional add-on recommendations</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Ballpark notes appear only for <span className="font-semibold text-stone-800">one optional category</span> you might add on top
          of what you already selected when you created the event. This keeps guidance focused on what you are still deciding.
        </p>

        {data.additionOptions.length === 0 ? (
          <p className="mt-4 text-sm text-stone-700">
            You already included every equipment type from the planner checklist. If something new comes up, use{" "}
            <Link href="/contact#quote" className="font-semibold text-[#8a6218] underline underline-offset-2">
              Talk to Our Event Team
            </Link>{" "}
            below so we can adjust your quote.
          </p>
        ) : (
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1">
              <label htmlFor="addition-focus" className="block text-sm font-semibold text-stone-800">
                What are you thinking about adding?
              </label>
              <select
                id="addition-focus"
                className="mt-2 w-full min-h-[48px] rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 shadow-sm outline-none focus:border-[#b78a2d] focus:ring-2 focus:ring-[#c9a228]/40"
                value={localAddition}
                onChange={(e) => setLocalAddition(e.target.value)}
              >
                <option value="">No add-on selected</option>
                {data.additionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              disabled={additionPending}
              onClick={saveAdditionChoice}
              className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60 [font-family:var(--font-display)]"
            >
              {additionPending ? "Saving…" : "Save add-on focus"}
            </button>
          </div>
        )}

        {additionRec ? (
          <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50/80 p-4">
            <h3 className="text-base font-semibold text-stone-900">{additionRec.title}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-stone-700">
              {additionRec.lines.map((line, i) => (
                <li key={`${i}-${line.slice(0, 40)}`}>{line}</li>
              ))}
            </ul>
          </div>
        ) : data.additionOptions.length > 0 ? (
          <p className="mt-4 text-sm text-stone-600">Choose an add-on above and save to see tailored notes for that category only.</p>
        ) : null}
      </section>

      <section className={cardClass}>
        <h2 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">Final count timing</h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-700">{finalMsg}</p>
        {days !== null && days >= 0 ? (
          <p className="mt-2 text-xs text-stone-500">
            About {days} day{days === 1 ? "" : "s"} until your event date (calendar days, Eastern Time).
          </p>
        ) : null}
      </section>

      <section className={cardClass}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">Guest list</h2>
            <p className="mt-1 text-sm text-stone-600">Filter by RSVP status. Email and phone stay on this private dashboard only.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", "yes", "no", "maybe"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`min-h-[44px] rounded-full px-4 text-sm font-semibold transition ${
                  filter === f ? "bg-stone-900 text-white" : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50"
                }`}
              >
                {f === "all" ? "All" : labelStatus(f)}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
          <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
            <thead className="bg-stone-50 text-xs font-semibold uppercase tracking-[0.08em] text-stone-600">
              <tr>
                <th className="px-3 py-3">Guest</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Phone</th>
                <th className="px-3 py-3">RSVP</th>
                <th className="px-3 py-3">Party</th>
                <th className="px-3 py-3">Adults</th>
                <th className="px-3 py-3">Kids</th>
                <th className="px-3 py-3">Seating</th>
                <th className="px-3 py-3">Notes</th>
                <th className="px-3 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white text-stone-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-3 py-6 text-center text-sm text-stone-500">
                    No RSVPs in this filter yet.
                  </td>
                </tr>
              ) : (
                filtered.map((g) => (
                  <tr key={g.id}>
                    <td className="px-3 py-3 font-medium">{g.guestName}</td>
                    <td className="max-w-[10rem] truncate px-3 py-3 text-xs" title={g.guestEmail}>
                      {g.guestEmail || "—"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs">{g.guestPhone || "—"}</td>
                    <td className="px-3 py-3">{labelStatus(g.status)}</td>
                    <td className="px-3 py-3">{g.partySize}</td>
                    <td className="px-3 py-3">{g.adults}</td>
                    <td className="px-3 py-3">{g.kids}</td>
                    <td className="px-3 py-3">{labelSeat(g.needsSeat)}</td>
                    <td className="max-w-[10rem] truncate px-3 py-3 text-stone-600" title={[g.mealChoice, g.notes].filter(Boolean).join(" · ")}>
                      {[g.mealChoice, g.notes].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs text-stone-500">{formatWhen(g.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border-2 border-stone-900 bg-stone-900 p-6 text-white shadow-lg sm:p-8">
        <h2 className="text-2xl font-semibold [font-family:var(--font-display)]">Ready to update your rental count?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-200">
          Send your current planning count to our team so we can help adjust tables, chairs, linens, tent layout, and delivery planning.
        </p>
        {/*
          Goodshuffle integration (later): attach planning count + RSVP summary to the existing quote flow.
          - Link to the customer's Goodshuffle quote URL or project id (stored server-side when available).
          - Or deep-link to wishlist / cart with line items that match updated counts.
          - Do not replace Goodshuffle; pass structured notes into whatever field your team already uses.
        */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            disabled={pending}
            onClick={requestQuote}
            className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full bg-[#c9a228] px-6 py-3.5 text-base font-semibold text-stone-900 transition hover:bg-[#e3c766] disabled:opacity-60 [font-family:var(--font-display)]"
          >
            {pending ? "Sending…" : "Update My Rental Quote"}
          </button>
          <button
            type="button"
            onClick={() => void copySummary()}
            className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full border-2 border-white/70 bg-transparent px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Copy Guest Count Summary
          </button>
          <Link
            href="/contact#quote"
            className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full border-2 border-white bg-white px-6 py-3.5 text-center text-base font-semibold text-stone-900 transition hover:bg-stone-100 [font-family:var(--font-display)]"
          >
            Talk to Our Event Team
          </Link>
        </div>
        <p className="mt-4 text-xs text-stone-400">
          Prefer the catalog flow? Keep using{" "}
          <Link href="/wishlist" className="font-semibold text-[#f5e0b3] underline underline-offset-2">
            Book Online / wishlist
          </Link>{" "}
          for equipment picks — this dashboard only carries counts and notes into the conversation.
        </p>
      </section>
    </div>
  );
}
