import { useRef } from 'react'
import { Play, Square } from 'lucide-react'
import Say from 'react-say'
import { useTTS } from '../hooks/useTTS'
import type { ScriptSegment } from '../types'

interface ScriptSegmentCardProps {
  segment: ScriptSegment
  wordCount: number
  index: number
  onTextChange: (id: string, text: string) => void
  onDelete: (id: string) => void
  placeholder?: string
  voices: SpeechSynthesisVoice[]
  needSeparator?: boolean
}

export function ScriptSegmentCard({
  segment,
  wordCount,
  onTextChange,
  onDelete,
  placeholder = 'Type your question here...',
  voices,
  index,
  needSeparator,
}: ScriptSegmentCardProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const {
    handleSayUtteranceClick,
    sayProps,
    ponyfill,
    isPlaying,
    setIsPlaying,
    handleSelectedVoiceChange,
    selectedVoiceURI,
    selectVoice,
  } = useTTS({
    lang: 'id-ID',
  })

  const handleDelete = () => {
    setIsPlaying(false)
    onDelete(segment.id)
  }

  return (
    <>
      <h5 className='text-sm font-semibold text-slate-700'>Question {index + 1}</h5>
      <div className="flex gap-3 items-start">
        {/* Hidden react-say component — speaks when isPlaying is true */}
        {isPlaying && segment.text.trim() && (
          <Say
            text={segment.text}
            onEnd={() => setIsPlaying(false)}
            onError={() => setIsPlaying(false)}
            voice={selectVoice}
            ponyfill={ponyfill}
            {...sayProps}
          />
        )}

        {/* Card */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={segment.text}
            onChange={(e) => onTextChange(segment.id, e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="w-full px-5 pt-5 pb-3 text-slate-700 text-sm leading-relaxed
            placeholder:text-slate-300 resize-none outline-none bg-transparent
            font-normal"
          />

          {/* Footer */}
          <div className="flex items-center justify-between px-5 pb-4 pt-1">
            <select onChange={handleSelectedVoiceChange} value={selectedVoiceURI || ''} className='text-sm text-slate-400'>
              <option>Browser language default ({window.navigator.language})</option>
              {voices.map(({ lang, name, voiceURI }: SpeechSynthesisVoice) => (
                <option key={voiceURI} value={voiceURI}>{`[${lang}] ${name || voiceURI}`}</option>
              ))}
            </select>
            <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
              {wordCount} Words
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-2 pt-1">
          {/* Play / Stop button */}
          <button
            onClick={handleSayUtteranceClick}
            disabled={!segment.text.trim()}
            title={isPlaying ? 'Stop' : 'Play'}
            className="w-10 h-10 flex items-center justify-center rounded-lg
            bg-teal-800 text-white shadow-sm
            hover:bg-teal-700 active:scale-95
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-150"
          >
            {isPlaying
              ? <Square size={14} fill="white" />
              : <Play size={16} fill="white" />}
          </button>

          {/* Delete button */}
          {index > 0 && (
            <button
              onClick={handleDelete}
              title="Delete segment"
              className="w-10 h-10 flex items-center justify-center rounded-lg
            text-amber-700 hover:bg-amber-50 active:scale-95
            transition-all duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <textarea
          placeholder="Type your answer here..."
          rows={4}
          className="w-full px-5 pt-5 pb-3 text-slate-700 text-sm leading-relaxed
            placeholder:text-slate-300 resize-none outline-none bg-transparent
            font-normal"
        />
      </div>

      {needSeparator && (
        <div className="w-full h-px bg-slate-200 my-4" />
      )}
    </>
  )
}
