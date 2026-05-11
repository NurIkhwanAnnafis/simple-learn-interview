import { RotateCcw, Square, Play } from 'lucide-react'
import { useTimerStore } from '../store/timer.store'
import cx from '../utils/cx'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const Timer = () => {
  const { elapsed, isRunning, reset, pause, start } = useTimerStore()

  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-3">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        Timer
      </p>

      {/* Clock display */}
      <div className="flex items-center justify-center">
        <span
          className={cx(
            'text-3xl font-mono font-bold tracking-tight transition-colors duration-300',
            isRunning ? 'text-teal-700' : 'text-slate-700'
          )}
        >
          {pad(minutes)}:{pad(seconds)}
        </span>

        {/* Running indicator dot */}
        {isRunning && (
          <span className="ml-2 w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
        )}
      </div>

      {/* Reset and Stop button */}
      <div className="flex items-center justify-between">
        <button
          onClick={reset}
          title="Reset timer"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-700
            transition-colors duration-150 w-fit"
        >
          <RotateCcw size={12} />
          Reset
        </button>

        <button
          onClick={isRunning ? pause : start}
          title="Stop timer"
          className={cx(
            'flex items-center gap-2 text-xs transition-colors duration-150 w-fit',
            isRunning
              ? 'text-red-400 hover:text-red-700'
              : 'text-teal-400 hover:text-teal-700'
          )}
        >
          {isRunning ? <Square fill='red' size={12} /> : <Play fill='text-teal-700' size={12} />}
          {isRunning ? 'Pause' : seconds + minutes > 0 ? 'Resume' : 'Start'}
        </button>
      </div>
    </div>
  )
}

export default Timer