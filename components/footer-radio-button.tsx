"use client"
import { Radio } from "lucide-react"

interface FooterRadioButtonProps {
  onTogglePlay: () => void
}

export default function FooterRadioButton({ onTogglePlay }: FooterRadioButtonProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <p className="text-sm text-gray-400 mb-2">Listen to our radio:</p>
      <button
        onClick={onTogglePlay}
        className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
      >
        <Radio className="h-4 w-4" />
        <span className="text-sm">Live Stream</span>
      </button>
    </div>
  )
}
