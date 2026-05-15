"use client"

import { useState } from "react"
import { Power } from "lucide-react"

interface BootScreenProps {
  onBoot: () => void
}

export function BootScreen({ onBoot }: BootScreenProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => {
      onBoot()
    }, 800)
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div 
        className={`transition-all duration-700 ${isPressed ? 'opacity-0 scale-95' : 'opacity-100'}`}
      >
        <button
          onClick={handleClick}
          disabled={isPressed}
          className="group relative flex flex-col items-center gap-6 focus:outline-none"
        >
          {/* Power button glow effect */}
          <div className="absolute inset-0 -top-4 blur-3xl bg-white/5 rounded-full scale-150 group-hover:bg-white/10 transition-all duration-500" />
          
          {/* Power button */}
          <div className={`
            relative w-20 h-20 rounded-full 
            bg-gradient-to-b from-zinc-700 to-zinc-900
            border border-zinc-600
            flex items-center justify-center
            shadow-[0_0_30px_rgba(255,255,255,0.1)]
            group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]
            group-hover:from-zinc-600 group-hover:to-zinc-800
            group-active:scale-95
            transition-all duration-300
            cursor-pointer
          `}>
            <Power className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors duration-300" />
          </div>

          {/* Text */}
          <span className="text-zinc-500 text-sm tracking-widest uppercase group-hover:text-zinc-300 transition-colors duration-300">
            Presiona para encender
          </span>
        </button>
      </div>

      {/* Loading indicator when pressed */}
      {isPressed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
