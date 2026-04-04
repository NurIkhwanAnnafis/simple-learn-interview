import { create } from "zustand";
import type { SegmentConfig } from "../types";

interface State {
  config: SegmentConfig
  setConfig: (config: Partial<SegmentConfig>) => void
}

export const useConfigSegmentStore = create<State>((set) => ({
  config: {
    showWordCount: true,
    showAnswer: true,
    showTimer: true,
  },
  setConfig: (partial) => set((state) => ({ config: { ...state.config, ...partial } })),
}))