"use client";

/**
 * Embeds the standalone Frame Tent Planner when NEXT_PUBLIC_TENT_LAYOUT_PLANNER_URL is set
 * (deployed Konva canvas app — same spirit as “big tent” vendor layout builders).
 * Source project: sibling repo `frame-tent-planner/web` → route `/planner`.
 */
export function TentLayoutPlannerPanel() {
  const src = process.env.NEXT_PUBLIC_TENT_LAYOUT_PLANNER_URL?.trim();

  if (!src) {
    return (
      <div className="rounded-2xl border border-[#e4dcd0] bg-white/95 p-6 shadow-[0_12px_40px_-36px_rgba(35,28,22,0.35)] sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a7d68]">Canvas layout</p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#221c16] sm:text-2xl">
          Frame tent layout planner
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#5c5348]">
          Drag-and-drop tent footprint, tables, and inventory on a canvas (Konva) — the seat / floorplan-style tool we
          built separately from this marketing site.
        </p>
        <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-[#5c5348]">
          <li>
            <strong className="text-[#3d362e]">On your machine:</strong> open{" "}
            <code className="rounded bg-[#f3ece2] px-1.5 py-0.5 text-[13px] text-[#4a3f32]">frame-tent-planner/web</code>
            , run <code className="rounded bg-[#f3ece2] px-1.5 py-0.5 text-[13px]">npm run dev</code>, then{" "}
            <code className="rounded bg-[#f3ece2] px-1.5 py-0.5 text-[13px]">/planner</code>.
          </li>
          <li>
            <strong className="text-[#3d362e]">On the live hub:</strong> set{" "}
            <code className="rounded bg-[#f3ece2] px-1.5 py-0.5 text-[13px]">NEXT_PUBLIC_TENT_LAYOUT_PLANNER_URL</code>{" "}
            in Vercel to your deployed planner URL (include <code className="text-[13px]">/planner</code> path) and
            redeploy — the canvas loads in the frame below.
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e4dcd0] bg-white shadow-[0_12px_40px_-36px_rgba(35,28,22,0.35)]">
      <iframe
        title="Frame tent layout planner"
        src={src}
        className="h-[min(72vh,760px)] w-full bg-[#faf9f7]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
