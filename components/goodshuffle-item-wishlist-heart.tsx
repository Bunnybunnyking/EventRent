"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders `gspro-item-card` for a single catalog row but relies on site CSS
 * (`.ctp-goodshuffle-inline-heart`) to show only the native wishlist / add control.
 * Shows a gold heart placeholder until the web component has a real button in its shadow root
 * (scripts load async; this avoids an empty-looking gap).
 * @see https://docs.goodshuffle.dev/docs/components/item-card
 */
export function GoodshuffleItemWishlistHeart({
  itemId,
  "aria-label": ariaLabel,
}: {
  itemId: string;
  "aria-label": string;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [wcInteractive, setWcInteractive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 100;

    const probe = () => {
      if (cancelled) return;
      attempts++;
      const card = wrapRef.current?.querySelector("gspro-item-card");
      const root = card?.shadowRoot;
      const btn = root?.querySelector("button");
      if (btn) {
        setWcInteractive(true);
        return;
      }
      if (attempts < maxAttempts) {
        window.setTimeout(probe, 60);
      }
    };

    void customElements.whenDefined("gspro-item-card").then(() => {
      requestAnimationFrame(probe);
    });

    return () => {
      cancelled = true;
    };
  }, [itemId]);

  return (
    <span
      ref={wrapRef}
      className="ctp-goodshuffle-inline-heart relative inline-flex shrink-0 items-center align-middle [vertical-align:middle]"
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {!wcInteractive ? (
        <span
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          aria-hidden
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="text-[#b8860b]"
            role="img"
            aria-hidden
          >
            <path
              fill="currentColor"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </span>
      ) : null}
      <gspro-item-card
        item-id={itemId}
        className={`relative z-[1] min-h-[28px] min-w-[28px] ${wcInteractive ? "opacity-100" : "opacity-[0.03]"}`}
      />
    </span>
  );
}
