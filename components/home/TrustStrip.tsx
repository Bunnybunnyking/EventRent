const segments = [
  "80+ years",
  "On-time delivery",
  "Clean equipment",
  "Setup + breakdown included",
  "CT + Southern MA",
] as const;

export function TrustStrip() {
  return (
    <section className="border-b border-stone-200 bg-[#faf8f5] py-5 sm:py-6" aria-label="Why hosts hire us">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="text-center text-[11px] font-medium leading-relaxed text-stone-700 sm:text-sm">
          {segments.map((seg, i) => (
            <span key={seg}>
              {i > 0 ? <span className="text-stone-300"> · </span> : null}
              {seg}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
