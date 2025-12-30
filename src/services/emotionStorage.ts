import type { EmotionEntry } from "@/components/Modal";

const STORAGE_KEY = "emotionsByDay";

export type EmotionsByDay = Record<string, EmotionEntry[]>;

export const loadEmotions = (): EmotionsByDay => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
};

export const saveEmotions = (data: EmotionsByDay) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
