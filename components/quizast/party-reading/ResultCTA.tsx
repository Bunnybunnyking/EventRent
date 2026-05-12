"use client";

type Props = {
  onSave: () => void;
  onShare: () => void;
  onAgain: () => void;
};

/** CTAs after every flip card is revealed — reading already visible; contact is optional */
export function ResultCTA({ onSave, onShare, onAgain }: Props) {
  const btn =
    "inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227]/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6ef] sm:text-[15px]";

  return (
    <div className="mx-auto mt-12 max-w-2xl space-y-3 px-1">
      <p className="text-center font-[family-name:var(--font-display)] text-lg font-semibold text-[#3d362e] sm:text-xl">
        Your spread is complete
      </p>
      <p className="text-center text-[13px] leading-relaxed text-[#6b6156]">
        <span className="font-semibold text-[#3d362e]">You already have your full reading above.</span> Nothing was submitted to us—no
        email, no account. Copy or share saves text on your device only (clipboard or your phone&apos;s share sheet).
      </p>
      <p className="text-center text-[12px] leading-relaxed text-[#8a8278]">
        Want help with tents or planning? Use the optional contact button—we only hear from you if you choose to reach out.
      </p>
      <div className="grid gap-2.5 pt-4 sm:grid-cols-2">
        <button type="button" onClick={onSave} className={`${btn} bg-gradient-to-r from-[#c9a227] via-[#e8c96b] to-[#b8892f] text-[#1f1610] shadow-[0_14px_40px_-18px_rgba(160,120,40,0.55)] hover:brightness-[1.03]`}>
          Copy reading to clipboard
        </button>
        <a
          href="/contact#quote"
          className={`${btn} border border-[#d4bc7a]/70 bg-white/95 text-[#3d362e] shadow-sm hover:bg-[#fffefb]`}
        >
          Optional: contact our team
        </a>
        <button type="button" onClick={onShare} className={`${btn} border border-[#e8dcc8] bg-[#faf8f3] text-[#3d362e] hover:bg-[#fffefb]`}>
          Share reading (device only)
        </button>
        <button type="button" onClick={onAgain} className={`${btn} border border-stone-300/90 bg-transparent text-[#5c5348] hover:bg-white/80`}>
          Take the Quiz Again
        </button>
      </div>
    </div>
  );
}
