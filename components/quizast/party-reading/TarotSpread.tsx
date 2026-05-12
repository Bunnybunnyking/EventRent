"use client";

import type {
  PartyReadingCardKind,
  PartyReadingFlipPayload,
  RecommendedSetupDetail,
} from "@/lib/quizast/party-reading";
import { ReadingFlipCard } from "./ReadingFlipCard";
import { RecommendedSetupCard } from "./RecommendedSetupCard";

type Props = {
  cards: PartyReadingFlipPayload[];
  setup: RecommendedSetupDetail;
  flipped: Record<string, boolean>;
  onFlip: (id: string) => void;
  setupMetaNote?: string | null;
};

/** Face-down spread grid + featured setup row */
export function TarotSpread({ cards, setup, flipped, onFlip, setupMetaNote }: Props) {
  type FlipId = Exclude<PartyReadingCardKind, "setup">;
  const firstSix = cards.filter((c): c is PartyReadingFlipPayload & { id: FlipId } => c.id !== "setup");

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:gap-x-5">
        {firstSix.map((c) => (
          <ReadingFlipCard
            key={c.id}
            cardId={c.id}
            label={c.label}
            resultName={c.resultName}
            body={c.body}
            bullets={c.bullets}
            flipped={Boolean(flipped[c.id])}
            onToggle={() => onFlip(c.id)}
          />
        ))}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute -top-6 left-1/2 h-10 w-[min(92%,28rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4bc7a]/25 to-transparent blur-[2px]" />
        <RecommendedSetupCard
          setup={setup}
          flipped={Boolean(flipped.setup)}
          onToggle={() => onFlip("setup")}
          metaNote={setupMetaNote}
        />
      </div>
    </div>
  );
}
