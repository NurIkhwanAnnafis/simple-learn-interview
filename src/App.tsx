import { useComposition } from './hooks/useComposition'
import { Header } from './components/Header'
import ScriptSegmentCard from './components/ScriptSegmentCard'
import { AddFieldButton } from './components/AddFieldButton'
import { Composer } from 'react-say'
import ConfigSegment from './components/ConfigSegment'

const PLACEHOLDERS = [
  'Type your question here...',
  'And the next segment follows...',
  'Continue your presentation...',
  'Add more content here...',
]

function App() {
  const {
    segments,
    refScriptSegments,
    addSegment,
    removeSegment,
    updateSegmentText,
    getWordCount,
    setSegmentSelected,
    onEndQuestion,
  } = useComposition()

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-14">
        {/* Title block */}
        <div className="w-full max-w-3xl mb-10 text-left">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-2">
            Question from recruiter
          </h1>
          <p className="text-slate-500 text-base">
            Craft your question with precision.
          </p>
        </div>

        {/* Composition card + sticky config */}
        <div className="w-full max-w-3xl flex items-start gap-3">
          {/* Composition card */}
          <div className="flex-1 bg-slate-100 rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4">
            <Composer>
              {({ voices }: { voices: SpeechSynthesisVoice[] }) => segments.map((segment, index) => (
                <ScriptSegmentCard
                  ref={el => { refScriptSegments.current[index] = el }}
                  key={segment.id}
                  index={index}
                  segment={segment}
                  wordCount={getWordCount(segment.id)}
                  onTextChange={updateSegmentText}
                  onDelete={removeSegment}
                  placeholder={PLACEHOLDERS[index] ?? PLACEHOLDERS[0]}
                  voices={voices}
                  needSeparator={index !== segments.length - 1}
                  onPlay={() => setSegmentSelected(index)}
                  onStop={() => onEndQuestion()}
                />
              ))}
            </Composer>

            {/* Add new field */}
            <AddFieldButton onClick={addSegment} />
          </div>

          {/* Config — sticky to the right of the card */}
          <ConfigSegment />
        </div>
      </main>
    </div>
  )
}

export default App
