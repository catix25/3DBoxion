"use client"

import { useState } from "react"
import { Wand2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useBackgroundRemoval } from "@/hooks/use-background-removal"
import { BACKGROUND_REMOVAL_PROVIDERS } from "@/lib/config"

interface SimpleBackgroundRemoverProps {
  imageUrl: string | null
  onImageProcessed: (processedImageUrl: string) => void
}

export function SimpleBackgroundRemover({ imageUrl, onImageProcessed }: SimpleBackgroundRemoverProps) {
  const [selectedMethod, setSelectedMethod] = useState<"local-simple" | "local-advanced">("local-simple")
  const { removeBackground, isProcessing, error, progress, clearError } = useBackgroundRemoval()

  const handleRemoveBackground = async () => {
    if (!imageUrl) return

    clearError()

    try {
      const result = await removeBackground(imageUrl, selectedMethod)
      if (result) {
        onImageProcessed(result)
      }
    } catch (err) {
      console.error("Error removing background:", err)
    }
  }

  const availableProviders = BACKGROUND_REMOVAL_PROVIDERS.filter((p) => !p.requiresApiKey)

  return (
    <div className="space-y-4">
      <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-ash-gray-600/30">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-neon-orange-500" />
          Quitar Fondo
        </h4>

        {/* Selector de método */}
        <div className="mb-4">
          <label className="block text-ash-gray-300 text-sm font-medium mb-2">Método de Procesamiento</label>
          <Select value={selectedMethod} onValueChange={(value: any) => setSelectedMethod(value)}>
            <SelectTrigger className="bg-ash-gray-800/50 border-ash-gray-600/50 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-ash-gray-800 border-ash-gray-600">
              {availableProviders.map((provider) => (
                <SelectItem key={provider.id} value={provider.id} className="text-white hover:bg-ash-gray-700">
                  <div className="flex items-center justify-between w-full">
                    <span>{provider.name}</span>
                    <span className="text-xs ml-2 text-green-400">{provider.cost}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Indicador de progreso */}
        {isProcessing && (
          <div className="mb-4 bg-ash-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="w-4 h-4 animate-spin text-neon-orange-500" />
              <span className="text-white text-sm">Procesando imagen...</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
            <Button variant="ghost" size="sm" onClick={clearError} className="mt-2 text-red-400 hover:text-red-300">
              Cerrar
            </Button>
          </div>
        )}

        {/* Botón de procesamiento */}
        <Button
          onClick={handleRemoveBackground}
          disabled={!imageUrl || isProcessing}
          className="w-full bg-neon-orange-500 hover:bg-neon-orange-600 text-white disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Quitar Fondo
            </>
          )}
        </Button>

        {/* Información */}
        <div className="mt-4 text-xs text-ash-gray-400">
          <p>✨ Procesamiento local - Sin envío de datos a servidores externos</p>
          <p>🔒 Tus imágenes permanecen privadas en tu dispositivo</p>
        </div>
      </div>
    </div>
  )
}
