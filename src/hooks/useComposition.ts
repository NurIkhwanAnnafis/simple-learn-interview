import { useState, useCallback } from 'react'
import type { ScriptSegment } from '../types'

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

  return {
    segments,
    addSegment,
    removeSegment,
    updateSegmentText,
    getWordCount,
  }
}
