"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FaqCategory, FaqItem } from "@/lib/faq-data";

function matchesQuery(query: string, item: FaqItem, category: FaqCategory): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const hay = [
    item.question,
    item.answer,
    ...(item.links?.map((l) => `${l.label} ${l.href}`) ?? []),
    category.title,
    category.description,
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

export function FaqHelpCenter({ categories }: { categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => matchesQuery(query, item, cat)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, query]);

  const totalVisible = filtered.reduce((n, c) => n + c.items.length, 0);
  const totalAll = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="space-y-10">
      <div className="relative">
        <label htmlFor="faq-search" className="sr-only">
          Search questions and answers
        </label>
        <input
          id="faq-search"
          type="search"
          autoComplete="off"
          placeholder="Search questions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-3.5 text-[15px] text-stone-900 shadow-sm outline-none ring-[#c9a228]/0 transition placeholder:text-stone-400 focus:border-[#d4c4a0] focus:ring-2 focus:ring-[#c9a228]/35"
        />
        <p className="mt-2 text-sm text-stone-500" aria-live="polite">
          {query.trim()
            ? totalVisible === 0
              ? "No matches — try a shorter word or clear the box to see everything."
              : `Showing ${totalVisible} of ${totalAll} questions`
            : `${totalAll} questions across ${categories.length} topics`}
        </p>
      </div>

      <div className="space-y-14">
        {filtered.map((category) => (
          <section
            key={category.id}
            id={`category-${category.id}`}
            aria-labelledby={`heading-${category.id}`}
            className="scroll-mt-28"
          >
            <div className="border-b border-stone-200/90 pb-4">
              <h2 id={`heading-${category.id}`} className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                {category.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">{category.description}</p>
            </div>
            <div className="mt-6 space-y-3">
              {category.items.map((item) => (
                <details
                  key={item.id}
                  id={`faq-${item.id}`}
                  className="group scroll-mt-28 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-stone-300 open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-stone-50/80 [&::-webkit-details-marker]:hidden">
                    <span className="font-medium text-stone-900">{item.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-lg font-semibold tabular-nums text-[#8f6f28]" aria-hidden>
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <div className="border-t border-stone-100 px-5 pb-5 pt-0">
                    <p className="pt-4 text-sm leading-relaxed text-stone-700">{item.answer}</p>
                    {item.links?.length ? (
                      <p className="mt-4 text-sm leading-relaxed text-stone-700">
                        <span className="font-medium text-stone-800">Helpful links: </span>
                        {item.links.map((link, i) => (
                          <span key={link.href}>
                            {i > 0 ? ", " : null}
                            <Link href={link.href} className="font-semibold text-[#7a5c1d] underline decoration-[#c9a228]/60 underline-offset-2 hover:text-stone-900">
                              {link.label}
                            </Link>
                          </span>
                        ))}
                        .
                      </p>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
