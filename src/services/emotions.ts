import type { EmotionEntry } from "@/domain/emotion";

export type DraftEmotions = Record<string, number>;

export const buildDraftFromInitial = (initial?: EmotionEntry[]): DraftEmotions => {
  if (!initial) return {};
  return Object.fromEntries(
    initial.map(e => [e.emotion, e.intensity])
  );
};
