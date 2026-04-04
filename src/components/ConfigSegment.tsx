import { useConfigSegmentStore } from '../store/config-segment.store'
import Timer from './Timer'

const ConfigSegment = () => {
  const { config, setConfig } = useConfigSegmentStore()

  return (
    <div className="sticky top-6 self-start flex flex-col gap-3 w-48">
      {/* Display settings panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
          Display
        </p>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            id="showWordCount"
            checked={config.showWordCount}
            onChange={(e) => setConfig({ showWordCount: e.target.checked })}
            className="w-4 h-4 rounded accent-teal-700 cursor-pointer"
          />
          <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
            Show word count
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            id="showAnswer"
            checked={config.showAnswer}
            onChange={(e) => setConfig({ showAnswer: e.target.checked })}
            className="w-4 h-4 rounded accent-teal-700 cursor-pointer"
          />
          <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
            Show answer
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            id="showTimer"
            checked={config.showTimer}
            onChange={(e) => setConfig({ showTimer: e.target.checked })}
            className="w-4 h-4 rounded accent-teal-700 cursor-pointer"
          />
          <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
            Show timer
          </span>
        </label>
      </div>

      {/* Timer — shown when toggled on */}
      {config.showTimer && <Timer />}
    </div>
  )
}

export default ConfigSegment