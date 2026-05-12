"use client";

import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import type { LeadPayload } from "@/lib/quiz/types";

type Props = {
  onSubmit: (lead: LeadPayload) => void;
};

const empty: LeadPayload = {
  name: "",
  phone: "",
  email: "",
  eventTown: "",
  eventDate: "",
  guestCount: "",
  notes: "",
  yardPhoto: null,
};

export function LeadCapture({ onSubmit }: Props) {
  const [form, setForm] = useState<LeadPayload>(empty);
  const [touched, setTouched] = useState(false);

  const err =
    touched &&
    (!form.name.trim() ||
      (!form.email.trim() && !form.phone.trim()) ||
      !form.eventTown.trim() ||
      !form.guestCount.trim());

  function update<K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (
      !form.name.trim() ||
      (!form.email.trim() && !form.phone.trim()) ||
      !form.eventTown.trim() ||
      !form.guestCount.trim()
    ) {
      return;
    }
    onSubmit(form);
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-3 text-[15px] text-[#faf6ee] outline-none ring-0 placeholder:text-[#7a7165] focus:border-[#e8c96b]/45 focus:bg-white/[0.09]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-lg"
    >
      <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#fffdf7] sm:text-3xl">
        Your result is ready.
      </p>
      <p className="mt-3 text-base leading-relaxed text-[#d8cdb8]">
        Want the real party setup for your date and town?
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4" autoComplete="on">
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#b5a995]" htmlFor="lead-name">
            Name
          </label>
          <input
            id="lead-name"
            className={fieldClass}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
            placeholder="Host name"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#b5a995]" htmlFor="lead-phone">
              Phone
            </label>
            <input
              id="lead-phone"
              className={fieldClass}
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              autoComplete="tel"
              placeholder="203-555-0100"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#b5a995]" htmlFor="lead-email">
              Email
            </label>
            <input
              id="lead-email"
              className={fieldClass}
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <p className="text-xs text-[#9a8f7e]">
          At least one of phone or email, so we can actually help.
        </p>
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#b5a995]" htmlFor="lead-town">
            Event town
          </label>
          <input
            id="lead-town"
            className={fieldClass}
            value={form.eventTown}
            onChange={(e) => update("eventTown", e.target.value)}
            autoComplete="address-level2"
            placeholder="West Hartford, CT"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#b5a995]" htmlFor="lead-date">
              Event date
            </label>
            <input
              id="lead-date"
              className={fieldClass}
              type="date"
              value={form.eventDate}
              onChange={(e) => update("eventDate", e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#b5a995]" htmlFor="lead-guests">
              Approx. guest count
            </label>
            <input
              id="lead-guests"
              className={fieldClass}
              inputMode="numeric"
              autoComplete="off"
              value={form.guestCount}
              onChange={(e) => update("guestCount", e.target.value)}
              placeholder="e.g. 75"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#b5a995]" htmlFor="lead-notes">
            Notes <span className="normal-case tracking-normal text-[#7a7165]">(optional)</span>
          </label>
          <textarea
            id="lead-notes"
            className={`${fieldClass} min-h-[88px] resize-y`}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            autoComplete="off"
            placeholder="Vibe, constraints, weird yard stuff…"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#b5a995]">
            Yard photo <span className="normal-case tracking-normal text-[#7a7165]">(optional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-2 block w-full text-sm text-[#d8cdb8] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8c96b]/20 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#f0d78c]"
            onChange={(e) =>
              update("yardPhoto", e.target.files?.[0] ?? null)
            }
          />
        </div>
        {err ? (
          <p className="text-sm text-[#f5a8a8]">
            Fill name, town, guest count, and at least email or phone.
          </p>
        ) : null}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full rounded-2xl bg-gradient-to-r from-[#c9983e] via-[#e8c96b] to-[#b8892f] py-4 text-base font-semibold text-[#1a1410] shadow-[0_16px_50px_-12px_rgba(232,201,107,0.55)]"
        >
          Reveal my party personality
        </motion.button>
      </form>
    </motion.div>
  );
}
