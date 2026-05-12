"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { adminResolveQuoteAction, adminSetQuoteRequestedAction } from "@/app/rsvp/actions";

export type AdminRsvpRow = {
  slug: string;
  eventDate: string;
  eventName: string;
  hostName: string;
  phone: string;
  email: string;
  location: string;
  eventType: string;
  estimatedGuestCount: number;
  planningCount: number;
  rsvpCount: number;
  rentalNeeds: string;
  quoteUpdateRequested: boolean;
  quoteUpdateResolved: boolean;
  createdAt: string;
  dashboardUrl: string;
};

export function AdminRsvpTable({ rows, staffKey }: { rows: AdminRsvpRow[]; staffKey: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function copyContact(row: AdminRsvpRow) {
    const text = [row.hostName, row.phone, row.email, row.location].filter(Boolean).join("\n");
    void navigator.clipboard.writeText(text).catch(() => {
      window.prompt("Copy host contact:", text);
    });
  }

  function run(action: () => Promise<unknown>) {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm">
      <table className="min-w-[1100px] w-full divide-y divide-stone-200 text-left text-sm">
        <thead className="bg-stone-100 text-xs font-semibold uppercase tracking-[0.08em] text-stone-600">
          <tr>
            <th className="px-3 py-3">Event date</th>
            <th className="px-3 py-3">Event name</th>
            <th className="px-3 py-3">Host</th>
            <th className="px-3 py-3">Phone</th>
            <th className="px-3 py-3">Email</th>
            <th className="px-3 py-3">Town</th>
            <th className="px-3 py-3">Type</th>
            <th className="px-3 py-3">Est.</th>
            <th className="px-3 py-3">Planning</th>
            <th className="px-3 py-3">RSVPs</th>
            <th className="px-3 py-3">Rentals</th>
            <th className="px-3 py-3">Quote flag</th>
            <th className="px-3 py-3">Created</th>
            <th className="px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 bg-white text-stone-800">
          {rows.length === 0 ? (
            <tr>
                <td colSpan={14} className="px-3 py-8 text-center text-stone-500">
                No event planners yet. When hosts create pages, they will show up here.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.slug}>
                <td className="whitespace-nowrap px-3 py-3 text-xs">{row.eventDate}</td>
                <td className="max-w-[10rem] truncate px-3 py-3 font-medium" title={row.eventName}>
                  {row.eventName}
                </td>
                <td className="px-3 py-3">{row.hostName}</td>
                <td className="whitespace-nowrap px-3 py-3 text-xs">{row.phone}</td>
                <td className="max-w-[9rem] truncate px-3 py-3 text-xs" title={row.email}>
                  {row.email}
                </td>
                <td className="max-w-[8rem] truncate px-3 py-3 text-xs" title={row.location}>
                  {row.location}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-xs">{row.eventType}</td>
                <td className="px-3 py-3">{row.estimatedGuestCount}</td>
                <td className="px-3 py-3 font-semibold">{row.planningCount}</td>
                <td className="px-3 py-3 font-medium">{row.rsvpCount}</td>
                <td className="max-w-[10rem] truncate px-3 py-3 text-xs" title={row.rentalNeeds}>
                  {row.rentalNeeds || "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-xs">
                  {row.quoteUpdateRequested ? (row.quoteUpdateResolved ? "Resolved" : "Open") : "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-xs text-stone-500">{row.createdAt}</td>
                <td className="space-y-2 px-3 py-3 align-top">
                  <Link
                    href={row.dashboardUrl}
                    className="block text-xs font-semibold text-[#8a6218] underline underline-offset-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View dashboard
                  </Link>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => copyContact(row)}
                    className="block text-xs font-semibold text-stone-700 underline underline-offset-2 disabled:opacity-50"
                  >
                    Copy host contact
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => run(() => adminSetQuoteRequestedAction(row.slug, staffKey, !row.quoteUpdateRequested))}
                    className="block text-xs font-semibold text-stone-700 underline underline-offset-2 disabled:opacity-50"
                  >
                    Toggle quote flag
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => run(() => adminResolveQuoteAction(row.slug, staffKey))}
                    className="block text-xs font-semibold text-stone-700 underline underline-offset-2 disabled:opacity-50"
                  >
                    Mark resolved
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-stone-200 bg-stone-50 px-3 py-3">
        <button
          type="button"
          disabled
          title="CSV export is not available yet."
          className="inline-flex min-h-[40px] cursor-not-allowed items-center rounded-full border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-400"
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}
