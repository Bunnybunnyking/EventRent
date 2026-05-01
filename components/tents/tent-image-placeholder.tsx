import Image from "next/image";
import { galleryItems } from "@/lib/site-data";

export function TentImagePlaceholder({
  label, className = "", aspect = "video",
}: {
  label: string;
  className?: string;
  /** Tailwind aspect ratio class */
  aspect?: "video" | "square" | "[4/3]";
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "[4/3]" ? "aspect-[4/3]" : "aspect-video";
  const item = galleryItems[pickGalleryIndex(label, galleryItems.length)];

  return (
    <div
      className={`group relative ${aspectClass} w-full overflow-hidden rounded-2xl border border-stone-200/90 bg-stone-100 text-center ${className}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover transition duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent px-3 py-2 text-left">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f7ddb0]">Photo / layout</p>
        <p className="mt-1 text-xs text-white/95">{label}</p>
      </div>
    </div>
  );
}

function pickGalleryIndex(seed: string, length: number): number {
  let sum = 0;
  for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
  return sum % Math.max(length, 1);
}
