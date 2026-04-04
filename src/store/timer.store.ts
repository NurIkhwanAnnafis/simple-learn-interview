import { create } from 'zustand'

interface TimerState {
  elapsed: number       // seconds
  isRunning: boolean
  intervalId: ReturnType<typeof setInterval> | null
  start: () => void
  pause: () => void
  reset: () => void
}

export const useTimerStore = create<TimerState>((set, get) => ({
  elapsed: 0,
  isRunning: false,
  intervalId: null,

  start: () => {
    if (get().isRunning) return
    const id = setInterval(() => {
      set((s) => ({ elapsed: s.elapsed + 1 }))
    }, 1000)
    set({ isRunning: true, intervalId: id })
  },

  pause: () => {
    const { intervalId } = get()
    if (intervalId) clearInterval(intervalId)
    set({ isRunning: false, intervalId: null })
  },

  reset: () => {
    const { intervalId } = get()
    if (intervalId) clearInterval(intervalId)
    set({ elapsed: 0, isRunning: false, intervalId: null })
  },
}))
