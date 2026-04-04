import { PlusCircle } from 'lucide-react'

interface AddFieldButtonProps {
  onClick: () => void
}

export function AddFieldButton({ onClick }: AddFieldButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-4 rounded-lg
        border-2 border-dashed border-slate-300 text-slate-500 text-sm font-medium
        hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50
        transition-all duration-200 cursor-pointer"
    >
      <PlusCircle size={18} />
      Add New Question
    </button>
  )
}
