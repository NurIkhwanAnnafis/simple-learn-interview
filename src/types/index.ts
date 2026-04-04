export interface ScriptSegment {
  id: string
  text: string
  voice: string
}

export type SegmentConfig = {
  showWordCount: boolean
  showAnswer: boolean
  showTimer: boolean
}
