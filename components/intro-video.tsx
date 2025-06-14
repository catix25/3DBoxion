"use client"

import { useState, useEffect } from "react"

interface IntroVideoProps {
  onComplete: () => void
}

export function IntroVideo({ onComplete }: IntroVideoProps) {
  const [showSkip, setShowSkip] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)

  useEffect(() => {
    // Mostrar botón de saltar después de 2 segundos
    const timer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleVideoEnd = () => {
    setVideoEnded(true)
    setTimeout(onComplete, 1000) // Pequeña pausa antes de continuar
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.8)" }}
      >
        <source src="/intro-neon-lights.mp4" type="video/mp4" />
      </video>

      {/* Overlay con logo y texto - SIN superposición */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
        {/* Logo centrado */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/logo-create-studio.png"
              alt="3DBox Studio"
              className="w-16 h-16 animate-pulse"
              style={{
                filter: "drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 40px #39ff14)",
              }}
            />
          </div>

          <h1
            className="text-6xl font-bold text-white mb-2"
            style={{
              textShadow: "0 0 20px #39ff14, 0 0 40px #39ff14, 0 0 60px #39ff14",
              animation: "glow 2s ease-in-out infinite alternate",
            }}
          >
            3DBox Studio
          </h1>

          <p
            className="text-xl text-gray-300 mb-4"
            style={{
              textShadow: "0 0 10px #ff6b35",
            }}
          >
            Editor Profesional de Cajas 3D e Iconos
          </p>

          <div className="flex items-center justify-center gap-2 text-neon-orange-400">
            <div className="w-2 h-2 bg-neon-orange-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Cargando experiencia 3D...</span>
            <div className="w-2 h-2 bg-neon-orange-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Botón de saltar - Posicionado abajo */}
        {showSkip && (
          <div className="absolute bottom-8 right-8">
            <button
              onClick={handleSkip}
              className="bg-gradient-to-r from-neon-orange-500 to-neon-orange-600 hover:from-neon-orange-600 hover:to-neon-orange-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2 animate-bounce"
              style={{
                boxShadow: "0 0 20px rgba(255, 107, 53, 0.5)",
              }}
            >
              ⏭️ Saltar Intro
            </button>
          </div>
        )}

        {/* Indicador de progreso */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>

      {/* Estilos para el efecto glow */}
      <style jsx>{`
        @keyframes glow {
          from {
            text-shadow: 0 0 20px #39ff14, 0 0 30px #39ff14, 0 0 40px #39ff14;
          }
          to {
            text-shadow: 0 0 30px #39ff14, 0 0 40px #39ff14, 0 0 50px #39ff14, 0 0 60px #39ff14;
          }
        }
      `}</style>
    </div>
  )
}
