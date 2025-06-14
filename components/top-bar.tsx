"use client"

import { Camera, Download, Share2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopBarProps {
  onCapture: () => void
}

export function TopBar({ onCapture }: TopBarProps) {
  return (
    <div className="h-16 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg"></div>
        <div>
          <h1 className="text-white font-bold">3DBox Studio</h1>
          <p className="text-gray-400 text-xs">Creador Profesional de Cajas 3D</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={onCapture} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Camera className="w-4 h-4 mr-2" />
          Capturar
        </Button>

        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>

        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
          <Share2 className="w-4 h-4 mr-2" />
          Compartir
        </Button>

        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
