"use client";

import { type FormEvent, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import type { PartySparkCard } from "@/lib/party-spark-types";

type TextIdeaModalProps = {
  open: boolean;
  onClose: () => void;
  card: PartySparkCard | null;
  brandShort?: string;
};

export function TextIdeaModal({ open, onClose, card, brandShort = "Connecticut Party Rentals" }: TextIdeaModalProps) {
  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTown, setEventTown] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const baseId = useId();
  const titleId = `${baseId}-title`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open || !card) return null;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg("Please confirm consent to receive text messages.");
      setStatus("error");
      return;
    }
    if (!firstName.trim() || !phone.trim()) {
      setErrorMsg("First name and phone number are required.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/party-spark-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          phone: phone.trim(),
          eventDate: eventDate.trim() || undefined,
          eventTown: eventTown.trim() || undefined,
          email: email.trim() || undefined,
          consent: true,
          partyName: card.partyName,
          inviteLine: card.inviteLine,
          setupIdea: card.setupIdea,
          vibe: card.vibeLabel,
          eventType: card.eventTypeLabel,
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Request failed.");
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(ev) => {
        if (ev.target === ev.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[81] max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-[#E6E1D8] bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[#E6E1D8] bg-white px-5 py-4">
          <h2 id={titleId} className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#111111]">
            Want us to text this party idea to you?
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#777777] hover:bg-[#FAF8F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A]"
            aria-label="Close"
          >
            <span aria-hidden className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        {status === "success" ? (
          <div className="space-y-4 p-6">
            <p className="text-base leading-relaxed text-[#555555]">
              Your party idea is saved. We&apos;ll text it to you with the suggested setup.
            </p>
            <p className="text-sm text-[#777777]">
              Your phone number doesn&apos;t change how we name your party—it&apos;s only so we can send you this idea
              to keep.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[48px] w-full rounded-2xl bg-[#111111] text-sm font-bold text-white hover:bg-[#2a2a2a] focus-visible:ring-2 focus-visible:ring-[#C8A24A]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 p-6">
            <p className="text-sm leading-relaxed text-[#555555]">
              We&apos;ll send your party name, invite line, and suggested setup so you can save it for later.
            </p>

            <div>
              <label htmlFor={`${baseId}-fn`} className="block text-sm font-semibold text-[#111111]">
                First Name
              </label>
              <input
                id={`${baseId}-fn`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
                className="mt-1 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-3 text-[#111111] outline-none focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/30"
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-ph`} className="block text-sm font-semibold text-[#111111]">
                Phone Number
              </label>
              <input
                id={`${baseId}-ph`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                inputMode="tel"
                required
                className="mt-1 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-3 text-[#111111] outline-none focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/30"
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-dt`} className="block text-sm font-semibold text-[#111111]">
                Event Date <span className="font-normal text-[#777777]">(optional)</span>
              </label>
              <input
                id={`${baseId}-dt`}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-3 text-[#111111] outline-none focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/30"
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-tw`} className="block text-sm font-semibold text-[#111111]">
                Event Town <span className="font-normal text-[#777777]">(optional)</span>
              </label>
              <input
                id={`${baseId}-tw`}
                value={eventTown}
                onChange={(e) => setEventTown(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-3 text-[#111111] outline-none focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/30"
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-em`} className="block text-sm font-semibold text-[#111111]">
                Email <span className="font-normal text-[#777777]">(optional)</span>
              </label>
              <input
                id={`${baseId}-em`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mt-1 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-3 text-[#111111] outline-none focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/30"
              />
            </div>

            <label className="flex cursor-pointer gap-3 text-sm leading-snug text-[#555555]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-[#E6E1D8] text-[#C8A24A] focus:ring-[#C8A24A]"
              />
              <span>
                I agree to receive text messages about my event idea and rental request from {brandShort}. Message and
                data rates may apply. Reply STOP to opt out.
              </span>
            </label>

            {status === "error" && errorMsg ? (
              <p className="text-sm font-medium text-red-700" role="alert">
                {errorMsg}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="min-h-[52px] w-full rounded-2xl bg-[#111111] text-sm font-bold text-white transition enabled:hover:bg-[#2a2a2a] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2"
            >
              {status === "submitting" ? "Sending…" : "Text Me This Party Idea"}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
