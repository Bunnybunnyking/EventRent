import type { InputHTMLAttributes } from "react";

export function QuoteForm() {
  return (
    <form className="space-y-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm" noValidate>
      <div>
        <h2 className="text-2xl font-semibold text-stone-900">Request your quote</h2>
        <p className="mt-2 text-sm text-stone-600">
          Most hosts hear back quickly. Share what you know—we will help fill in tent size, layout, and weather backup.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Event date" name="eventDate" type="date" />
        <Field label="Event town / venue" name="eventTown" autoComplete="address-level2" />
        <Field label="Event type" name="eventType" placeholder="e.g. wedding, graduation, corporate" />
        <Field label="Tent needed" name="tentNeeded" placeholder="Unsure is fine—we will advise" />
        <Field label="Tables needed" name="tablesNeeded" />
        <Field label="Chairs needed" name="chairsNeeded" />
        <Field label="Approximate guest count" name="guestCount" inputMode="numeric" />
        <Field label="Setup surface / venue type" name="surfaceType" placeholder="Grass, patio, parking lot…" />
      </div>
      <div>
        <label htmlFor="notes" className="mb-1 block text-sm font-medium text-stone-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
          placeholder="Rain backup concerns, load-in timing, layout ideas, or other vendors on site."
          autoComplete="off"
        />
      </div>
      <button type="submit" className="w-full rounded-full bg-[#1d2124] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#131517]">
        Submit quote request
      </button>
      <p className="text-xs text-stone-500">This sends a quote request only—no payment required to start planning.</p>
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
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-stone-700">
        {label}
        {required ? <span className="text-stone-400"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        required={required}
        className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
      />
    </div>
  );
}
