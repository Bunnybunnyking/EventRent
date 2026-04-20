"use client";

import type { ReactNode } from "react";

export function FieldLabel({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-2">
      <div className="text-sm font-semibold text-stone-900">{children}</div>
      {hint ? <p className="mt-1 text-xs leading-relaxed text-stone-500">{hint}</p> : null}
    </div>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  columns = "grid-cols-1 sm:grid-cols-2",
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  columns?: string;
}) {
  return (
    <div className={`grid gap-2 ${columns}`}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`touch-manipulation min-h-[48px] rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
            value === o.id
              ? "border-stone-900 bg-stone-900 text-white shadow-sm"
              : "border-stone-200 bg-white text-stone-800 hover:border-[#c9a227]/50 hover:bg-[#fffbf0]/40"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ToggleRow({
  label,
  helper,
  checked,
  onChange,
}: {
  label: string;
  helper?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full min-h-[52px] touch-manipulation items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#c9a227]/45 active:scale-[0.99]"
    >
      <span
        className={`mt-0.5 flex h-6 w-11 shrink-0 rounded-full p-0.5 transition ${checked ? "bg-[#b8860b]" : "bg-stone-300"}`}
      >
        <span className={`h-5 w-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </span>
      <span>
        <span className="block text-sm font-semibold text-stone-900">{label}</span>
        {helper ? <span className="mt-0.5 block text-xs text-stone-500">{helper}</span> : null}
      </span>
    </button>
  );
}

export function SectionDivider({ title }: { title: string }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-stone-200/90" />
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{title}</span>
      <div className="h-px flex-1 bg-stone-200/90" />
    </div>
  );
}
