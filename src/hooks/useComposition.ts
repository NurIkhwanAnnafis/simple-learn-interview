import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import type { ScriptSegment } from '../types'
import { useMic } from './useMic'
import type { ScriptSegmentCardHandle } from '../components/ScriptSegmentCard'
import { useTimerSpeakingStore } from '../store/timer-speaking.store'
import { useDebounce } from './useDebounce'
import { useTimerStore } from '../store/timer.store'

const DEFAULT_VOICE = 'Indonesian female'

const generateId = () => Math.random().toString(36).slice(2, 9)

const createSegment = (overrides?: Partial<ScriptSegment>): ScriptSegment => ({
  id: generateId(),
  text: '',
  voice: DEFAULT_VOICE,
  ...overrides,
})

const countWords = (text: string): number => {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

export function useComposition() {
  const { startSpeaking, isDetectSpeaking, stopRecording } = useMic()
  const { isPlaying, start, setIsIdle, cooldown, stop, reset } = useTimerSpeakingStore()
  const { pause } = useTimerStore()
  const [segmentSelected, setSegmentSelected] = useState(0)
  const [isQuestioning, setIsQuestioning] = useState(false)
  const refScriptSegments = useRef<Array<ScriptSegmentCardHandle | null>>([])
  const [segments, setSegments] = useState<ScriptSegment[]>([
    createSegment(),
    createSegment(),
  ])

  const addSegment = useCallback(() => {
    setSegments((prev) => [...prev, createSegment()])
  }, [])

  const removeSegment = useCallback((id: string) => {
    setSegments((prev) => {
      if (prev.length === 1) return prev // keep at least one
      return prev.filter((s) => s.id !== id)
    })
  }, [])

  const updateSegmentText = useCallback((id: string, text: string) => {
    setSegments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, text } : s)),
    )
  }, [])

  const getWordCount = useCallback(
    (id: string) => {
      const segment = segments.find((s) => s.id === id)
      return segment ? countWords(segment.text) : 0
    },
    [segments],
  )

  const handleCountdownCauseIdle = () => {
    setIsIdle()
    start()
  }

  const onStartQuestion = (index: number) => {
    setIsQuestioning(true)
    setSegmentSelected(index)
  }

  const onEndQuestion = () => {
    setIsQuestioning(false)
    startSpeaking()
  }

  const isMustCountdown = useMemo(() => {
    return !isDetectSpeaking && isPlaying && !isQuestioning
  }, [isDetectSpeaking, isPlaying, isQuestioning])

  const debounceIsIdle = useDebounce(isMustCountdown, 3000)

  useEffect(() => {
    if (debounceIsIdle) {
      console.log("triggering idle")
      const timeoutId = setTimeout(() => {
        handleCountdownCauseIdle()
      }, 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [debounceIsIdle])

  const handlePlayNextSegment = () => {
    stopRecording()
    if (refScriptSegments.current[segmentSelected + 1]) {
      refScriptSegments.current[segmentSelected + 1]?.handlePlayClick()
      stop()
    } else {
      reset()
      pause()
    }
  }
  useEffect(() => {
    if (cooldown === 0) handlePlayNextSegment()
  }, [cooldown])

  return {
    segments,
    addSegment,
    removeSegment,
    updateSegmentText,
    getWordCount,
    refScriptSegments,
    setSegmentSelected,
    onEndQuestion,
    onStartQuestion,
  }
}
