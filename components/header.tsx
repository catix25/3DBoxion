"use client"

import { Download, Save, Share2, Settings, Wifi, WifiOff } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <header className="h-16 bg-ash-gray-800/80 backdrop-blur-md border-b border-ash-gray-700/50 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold">
          3D
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">3DBox Studio</h1>
          <p className="text-xs text-ash-gray-400">Create Studio 2025</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
            isOnline ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
          }`}
        >
          {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {isOnline ? "Conectado" : "Sin conexión"}
        </div>

        <button className="text-ash-gray-300 hover:text-white hover:bg-ash-gray-700/50 p-2 rounded-lg transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          <span className="text-sm">Guardar</span>
        </button>

        <button className="text-ash-gray-300 hover:text-white hover:bg-ash-gray-700/50 p-2 rounded-lg transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span className="text-sm">Exportar</span>
        </button>

        <button className="text-ash-gray-300 hover:text-white hover:bg-ash-gray-700/50 p-2 rounded-lg transition-colors flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          <span className="text-sm">Compartir</span>
        </button>

        <button className="text-ash-gray-300 hover:text-white hover:bg-ash-gray-700/50 p-2 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
