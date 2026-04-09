import Link from "next/link";

export function Breadcrumb({
  items,
  className = "mb-6",
}: {
  items: { label: string; href?: string }[];
  /** Tailwind margin-bottom etc.; default keeps previous spacing */
  className?: string;
}) {
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