import React from 'react'
import { useTimerSpeakingStore } from '../store/timer-speaking.store'

const ProgressStatus: React.FC = () => {
  const { isSpeaking, isPlaying, cooldown, status } = useTimerSpeakingStore()

  const width = isPlaying ? (cooldown / 5) * 100 : 100

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Cooldown
        </span>
        <span className="text-[10px] font-bold text-teal-600 tabular-nums">
          {cooldown}s
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-teal-500 h-full rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className='w-full px-0.5'>
        <p className='text-[10px] tracking-widest font-bold text-slate-400 capitalize'>
          status: {status}
        </p>
      </div>
    </div>
  )
}

export default ProgressStatus
