/**
 * Elegant placeholder until real tent photography or diagrams are added.
 */
export function TentImagePlaceholder({
  label,
  className = "",
  aspect = "video",
}: {
  label: string;
  className?: string;
  /** Tailwind aspect ratio class */
  aspect?: "video" | "square" | "[4/3]";
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "[4/3]" ? "aspect-[4/3]" : "aspect-video";
  return (
    <div
      className={`flex ${aspectClass} w-full flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300/90 bg-gradient-to-br from-[#faf8f5] via-white to-stone-100 text-center ${className}`}
    >
      <p className="px-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6d3a]">Photo / layout</p>
      <p className="mt-2 max-w-sm px-4 text-sm font-medium text-stone-600">{label}</p>
      <p className="mt-2 px-4 text-xs text-stone-500">Drop in hero or gallery imagery when ready.</p>
    </div>
  );
}
