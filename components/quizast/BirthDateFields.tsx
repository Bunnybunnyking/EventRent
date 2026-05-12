"use client";

import { QUIZ_SELECT } from "@/lib/quizast/quiz-input-classes";
import { useCallback, useEffect, useMemo, useState } from "react";

const MONTHS = [
  { v: 1, label: "January" },
  { v: 2, label: "February" },
  { v: 3, label: "March" },
  { v: 4, label: "April" },
  { v: 5, label: "May" },
  { v: 6, label: "June" },
  { v: 7, label: "July" },
  { v: 8, label: "August" },
  { v: 9, label: "September" },
  { v: 10, label: "October" },
  { v: 11, label: "November" },
  { v: 12, label: "December" },
] as const;

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function parseIso(iso: string): { y: number; m: number; d: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!y || mo < 1 || mo > 12 || d < 1) return null;
  const check = new Date(y, mo - 1, d);
  if (check.getFullYear() !== y || check.getMonth() !== mo - 1 || check.getDate() !== d) return null;
  return { y, m: mo, d };
}

function toIso(y: number, m: number, d: number): string | null {
  const dim = daysInMonth(y, m);
  const dayClamped = Math.min(d, dim);
  const iso = `${y}-${String(m).padStart(2, "0")}-${String(dayClamped).padStart(2, "0")}`;
  return parseIso(iso) ? iso : null;
}

type Props = {
  value: string;
  onChange: (iso: string) => void;
};

/**
 * Year-first dropdowns so jumping to 1977 / 1987 is one scroll — no decade-long native date spinner.
 */
export function BirthDateFields({ value, onChange }: Props) {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 1;
  const minYear = 1924;

  const years = useMemo(
    () => Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i),
    [maxYear, minYear],
  );

  const initial = parseIso(value);
  const [y, setY] = useState<number | "">(initial?.y ?? "");
  const [m, setM] = useState<number | "">(initial?.m ?? "");
  const [d, setD] = useState<number | "">(initial?.d ?? "");

  useEffect(() => {
    const p = parseIso(value);
    queueMicrotask(() => {
      if (!p) {
        setY("");
        setM("");
        setD("");
        return;
      }
      setY(p.y);
      setM(p.m);
      setD(p.d);
    });
  }, [value]);

  const commit = useCallback(
    (nextY: number | "", nextM: number | "", nextD: number | "") => {
      setY(nextY);
      setM(nextM);
      setD(nextD);
      if (nextY === "" || nextM === "" || nextD === "") {
        onChange("");
        return;
      }
      const dim = daysInMonth(nextY, nextM);
      const dayClamped = Math.min(nextD, dim);
      if (dayClamped !== nextD) setD(dayClamped);
      const iso = toIso(nextY, nextM, dayClamped);
      onChange(iso ?? "");
    },
    [onChange],
  );

  const dim =
    typeof y === "number" && typeof m === "number" && m >= 1 && m <= 12 ? daysInMonth(y, m) : 31;
  const days = useMemo(() => Array.from({ length: dim }, (_, i) => i + 1), [dim]);

  return (
    <div className="mt-6 space-y-4">
      <p className="text-xs font-medium leading-relaxed text-[#bfb6c9]">
        Choose <span className="font-semibold text-[#e8dcc8]">year first</span>, then month and day. Jump straight to 1977,
        1987, or any year without spinning wheels for decades.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4bc7a]">
          Year
          <select
            value={y === "" ? "" : String(y)}
            onChange={(e) => {
              const raw = e.target.value;
              commit(raw === "" ? "" : Number(raw), m, d);
            }}
            className={`mt-2 w-full ${QUIZ_SELECT}`}
          >
            <option value="" className="bg-[#fbf8f2] text-[#141018]">
              Year
            </option>
            {years.map((year) => (
              <option key={year} value={year} className="bg-[#fbf8f2] text-[#141018]">
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4bc7a]">
          Month
          <select
            value={m === "" ? "" : String(m)}
            onChange={(e) => {
              const raw = e.target.value;
              commit(y, raw === "" ? "" : Number(raw), d);
            }}
            className={`mt-2 w-full ${QUIZ_SELECT}`}
          >
            <option value="" className="bg-[#fbf8f2] text-[#141018]">
              Month
            </option>
            {MONTHS.map((mo) => (
              <option key={mo.v} value={mo.v} className="bg-[#fbf8f2] text-[#141018]">
                {mo.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4bc7a]">
          Day
          <select
            value={d === "" ? "" : String(d)}
            onChange={(e) => {
              const raw = e.target.value;
              commit(y, m, raw === "" ? "" : Number(raw));
            }}
            className={`mt-2 w-full ${QUIZ_SELECT}`}
          >
            <option value="" className="bg-[#fbf8f2] text-[#141018]">
              Day
            </option>
            {days.map((day) => (
              <option key={day} value={day} className="bg-[#fbf8f2] text-[#141018]">
                {day}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
