import { create } from 'zustand'

interface TimerState {
  intervalId: ReturnType<typeof setInterval> | null
  cooldown: number
  isPlaying: boolean
  isSpeaking: boolean
  status: 'idle' | 'speaking' | 'listening' | 'mic-not-allowed' |''

  start: () => void
  reset: () => void
  setIsPlaying: (playing: boolean) => void
  setIsSpeaking: () => void
  setIsMicNotAllowed: () => void
  setIsIdle: () => void
  restart: () => void
}

export const useTimerSpeakingStore = create<TimerState>((set, get) => ({
  intervalId: null,
  isPlaying: false,
  isSpeaking: false,
  cooldown: 5,
  status: '',

  start: () => {
    if (get().intervalId) return
    const id = setInterval(() => {
      const { isPlaying, cooldown } = get()
      if (isPlaying && cooldown > 0) {
        set((s) => ({ cooldown: Math.max(0, s.cooldown - 1) }))
      }
    }, 1000)
    set({ intervalId: id })
  },

  restart: () => {
    const { intervalId } = get()
    if (intervalId) clearInterval(intervalId)
    set({ intervalId: null, cooldown: 5, isPlaying: true, isSpeaking: true })
  },

  reset: () => {
    const { intervalId } = get()
    if (intervalId) clearInterval(intervalId)
    set({ intervalId: null, cooldown: 5, isPlaying: false, isSpeaking: false, status: '' })
  },

  setIsPlaying: (playing: boolean) => {
    set({ isPlaying: playing, status: playing ? 'listening' : '' })
    if (playing) {
      set({ cooldown: 5, isSpeaking: true })
    }
  },

  setIsSpeaking: () => {
    set({ status: 'speaking' })
  },

  setIsMicNotAllowed: () => {
    set({ status: 'mic-not-allowed' })
  },

  setIsIdle: () => {
    set({ status: 'idle' })
  }
}))
