"use client"

import { useState, useEffect } from "react"
import { Wifi, Battery, Search } from "lucide-react"
import Image from "next/image"
import { useDeviceTier } from "@/hooks/use-device-tier"
import { wallpaperUrlForTier } from "@/lib/wallpaper"

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const deviceTier = useDeviceTier()
  const wallpaperUrl = wallpaperUrlForTier(deviceTier)
  const [showContent, setShowContent] = useState(false)
  const [passwordDots, setPasswordDots] = useState(0)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(0)

  const password = "fullstack" // 9 characters = 9 dots
  const totalDots = password.length

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showContent) return

    // Start typing password after content shows
    const startTyping = setTimeout(() => {
      const interval = setInterval(() => {
        setPasswordDots(prev => {
          if (prev >= totalDots) {
            clearInterval(interval)
            // Start login sequence
            setTimeout(() => {
              setIsLoggingIn(true)
              setTimeout(() => {
                setShowProgress(true)
              }, 500)
            }, 400)
            return prev
          }
          return prev + 1
        })
      }, 150)

      return () => clearInterval(interval)
    }, 1000)

    return () => clearTimeout(startTyping)
  }, [showContent, totalDots])

  useEffect(() => {
    if (!showProgress) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onLogin(), 300)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }, [showProgress, onLogin])

  const currentTime = new Date().toLocaleTimeString('es-AR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })

  const currentDate = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-no-repeat opacity-[0.78] ${deviceTier === "mobile" ? "bg-top" : "bg-center"}`}
        style={{ backgroundImage: `url('${wallpaperUrl}')` }}
      />
      <div className="absolute inset-0 backdrop-blur-md bg-black/30" />

      {/* Top bar */}
      <div className={`
        absolute top-0 left-0 right-0 h-7 
        flex items-center justify-between px-4
        text-white/80 text-xs
        transition-opacity duration-500
        ${showContent ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="flex items-center gap-4">
          <span className="font-semibold">Portfolio OS</span>
        </div>
        <div className="flex items-center gap-3">
          <Wifi className="w-4 h-4" />
          <Battery className="w-5 h-5" />
          <span>{currentTime}</span>
        </div>
      </div>

      {/* Main content */}
      <div className={`
        absolute inset-0 flex flex-col items-center justify-center
        transition-all duration-700
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {/* Date and time */}
        <div className="text-center mb-12">
          <p className="text-white/60 text-lg capitalize">{currentDate}</p>
          <p className="text-white text-7xl font-light tracking-tight">{currentTime}</p>
        </div>

        {/* User avatar and login */}
        <div className={`
          flex flex-col items-center
          transition-all duration-500
          ${isLoggingIn && !showProgress ? 'scale-95 opacity-80' : ''}
          ${showProgress ? 'opacity-0 scale-90' : ''}
        `}>
          {/* Avatar - Real Photo */}
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-2xl ring-4 ring-white/20">
            <Image
              src="/profile.png"
              alt="Luca Monteleone"
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Name */}
          <h2 className="text-white text-xl font-medium mb-4">Luca Monteleone</h2>

          {/* Password field */}
          <div>
            <div className="
              w-56 h-8 
              bg-white/10 backdrop-blur-md
              border border-white/20
              rounded-full
              flex items-center justify-center gap-1
              px-4
            ">
              {/* Password dots animation */}
              {Array.from({ length: totalDots }).map((_, i) => (
                <div
                  key={i}
                  className={`
                    w-2 h-2 rounded-full
                    transition-all duration-150
                    ${i < passwordDots 
                      ? 'bg-white scale-100' 
                      : 'bg-white/20 scale-75'
                    }
                  `}
                  style={{
                    transitionDelay: `${i * 50}ms`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Hint text */}
          <p className="text-white/40 text-xs mt-3">
            {passwordDots < totalDots ? 'Ingresando...' : 'Iniciando sesion...'}
          </p>
        </div>

        {/* Loading progress bar */}
        {showProgress && (
          <div className="flex flex-col items-center animate-in fade-in duration-500">
            {/* Apple logo */}
            <svg className="w-16 h-16 text-white mb-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom icons */}
      <div className={`
        absolute bottom-8 left-0 right-0
        flex justify-center gap-8
        transition-opacity duration-500
        ${showContent && !showProgress ? 'opacity-100' : 'opacity-0'}
      `}>
        <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white/80 transition-colors">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-xs">Spotlight</span>
        </button>
      </div>
    </div>
  )
}
