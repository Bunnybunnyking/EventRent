import Link from "next/link";

const accentLinkClass =
  "rounded-full px-3 py-1.5 text-sm font-semibold text-stone-600 transition [font-family:var(--font-display)] hover:bg-stone-100/95 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2";

const accentCurrentClass =
  "rounded-full bg-gradient-to-b from-stone-900 to-stone-800 px-3.5 py-1.5 text-sm font-semibold text-[#f5e6c8] shadow-sm ring-1 ring-[#b78a2d]/55 [font-family:var(--font-display)]";

export function Breadcrumb({
  items,
  className = "mb-6",
  variant = "default",
}: {
  items: { label: string; href?: string }[];
  /** Tailwind margin-bottom etc.; default keeps previous spacing */
  className?: string;
  /** `accent`: pill trail with gold accents (hub / marketing pages). */
  variant?: "default" | "accent";
}) {
  if (variant === "accent") {
    return (
      <nav aria-label="Breadcrumb" className={className}>
        <div className="inline-flex max-w-full rounded-full border border-stone-200/95 bg-white/85 p-1 shadow-[0_1px_2px_rgba(15,17,19,0.06),0_0_0_1px_rgba(183,138,45,0.12)] backdrop-blur-[2px]">
          <ol className="flex flex-wrap items-center gap-1 sm:flex-nowrap">
            {items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-1">
                {index > 0 ? (
                  <span className="select-none px-0.5 text-[0.65rem] font-bold leading-none text-[#b78a2d]" aria-hidden>
                    /
                  </span>
                ) : null}
                {item.href ? (
                  <Link href={item.href} className={accentLinkClass}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={accentCurrentClass}>{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className={`text-sm text-stone-500 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span className="text-stone-700">{item.label}</span>}
            {index < items.length - 1 ? <span>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
