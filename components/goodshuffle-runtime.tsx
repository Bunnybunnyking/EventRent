"use client";

import type { ReactNode } from "react";
import Script from "next/script";
import { goodshuffleWcEsmScriptUrl, goodshuffleWcLegacyScriptUrl } from "@/lib/goodshuffle";

type RuntimeProps = {
  dataUrl: string;
  children?: ReactNode;
};

/** Scripts + `gspro-wishlist-config` — required once per page that uses Goodshuffle (see https://docs.goodshuffle.dev/docs/setup/custom-setup/). */
export function GoodshuffleRuntime({ dataUrl, children }: RuntimeProps) {
  return (
    <>
      <Script src={goodshuffleWcEsmScriptUrl} strategy="afterInteractive" type="module" />
      <Script src={goodshuffleWcLegacyScriptUrl} strategy="afterInteractive" noModule />
      <gspro-wishlist-config data-url={dataUrl} show-quantity-on-card="true" />
      {children}
    </>
  );
}

type MissingProps = { compact?: boolean };

export function GoodshuffleMissingKeyNotice({ compact }: MissingProps) {
  return (
    <div
      className={
        compact
          ? "rounded-xl border border-amber-200/90 bg-amber-50/90 p-4 text-sm text-amber-950"
          : "rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
      }
    >
      <p className="font-medium">Goodshuffle public key not set</p>
      <p className="mt-2 text-amber-900/90">
        Add your Public Browser Key from Goodshuffle Pro to{" "}
        <code className="rounded bg-white/80 px-1 py-0.5">.env.local</code>:
      </p>
      <pre className="mt-3 overflow-x-auto rounded border border-amber-200/80 bg-white/90 p-3 text-xs">
        {`NEXT_PUBLIC_GOODSHUFFLE_PUBLIC_WEBSITE_KEY=your-key-here`}
      </pre>
      <p className="mt-3 text-amber-900/90">Restart <code className="rounded bg-white/80 px-1">npm run dev</code> after saving.</p>
    </div>
  );
}
