export function PartyGuideImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div className="flex aspect-[21/9] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-gradient-to-br from-[#faf8f5] to-stone-100 text-center sm:aspect-[2.2/1]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Featured image</p>
      <p className="mt-2 max-w-lg px-4 text-sm text-stone-600">{caption}</p>
    </div>
  );
}
