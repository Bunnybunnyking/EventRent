"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { galleryItems } from "@/lib/site-data";

type Item = (typeof galleryItems)[number];

export function TentGalleryLightbox({ items }: { items: readonly Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const goPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : i === 0 ? items.length - 1 : i - 1));
  }, [items.length]);
  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : i === items.length - 1 ? 0 : i + 1));
  }, [items.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, goPrev, goNext]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a7a45] focus-visible:ring-offset-2"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              loading={index < 2 ? "eager" : "lazy"}
              priority={index < 2}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 right-3 text-sm font-medium text-white drop-shadow md:opacity-0 md:transition md:group-hover:opacity-100">
              View larger
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/20"
            onClick={close}
          >
            Close
          </button>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-[1] hidden -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white md:block md:px-4"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-[1] hidden -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white md:block md:px-4"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={items[openIndex].src}
                alt={items[openIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-stone-200">{items[openIndex].alt}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
