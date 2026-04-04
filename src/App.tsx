import { useComposition } from './hooks/useComposition'
import { Header } from './components/Header'
import { ScriptSegmentCard } from './components/ScriptSegmentCard'
import { AddFieldButton } from './components/AddFieldButton'
import { Composer } from 'react-say'

const PLACEHOLDERS = [
  'Type your question here...',
  'And the next segment follows...',
  'Continue your presentation...',
  'Add more content here...',
]

function App() {
  const { segments, addSegment, removeSegment, updateSegmentText, getWordCount } =
    useComposition()

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-14">
        {/* Title block */}
        <div className="w-full max-w-2xl mb-10 text-left">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-2">
            Question from recruiter
          </h1>
          <p className="text-slate-500 text-base">
            Craft your question with precision.
          </p>
        </div>

        {/* Composition card */}
        <div className="w-full max-w-2xl bg-slate-100 rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4">
          {/* Segments */}

          <Composer>
            {({ voices }: { voices: SpeechSynthesisVoice[] }) => segments.map((segment, index) => (
              <ScriptSegmentCard
                key={segment.id}
                index={index}
                segment={segment}
                wordCount={getWordCount(segment.id)}
                onTextChange={updateSegmentText}
                onDelete={removeSegment}
                placeholder={PLACEHOLDERS[index] ?? PLACEHOLDERS[0]}
                voices={voices}
                needSeparator={index !== segments.length - 1}
              />
            ))}
          </Composer>

          {/* Add new field */}
          <AddFieldButton onClick={addSegment} />
        </div>
      </main>
    </div>
  )
}

export default App
