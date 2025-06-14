"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, RotateCcw, Loader2, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBackgroundRemoval } from "@/hooks/use-background-removal"
import { ApiSettingsDialog } from "./api-settings-dialog"
import { BACKGROUND_REMOVAL_PROVIDERS } from "@/lib/config"

interface BoxFace {
  id: string
  name: string
  texture: string | null
}

interface EnhancedBoxFaceEditorProps {
  faces: BoxFace[]
  onFaceUpdate: (faceId: string, texture: string | null) => void
}

export function EnhancedBoxFaceEditor({ faces, onFaceUpdate }: EnhancedBoxFaceEditorProps) {
  const [selectedFace, setSelectedFace] = useState(faces[0]?.id || "")
  const [dragActive, setDragActive] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<"removebg" | "local-simple" | "local-advanced">("local-simple")
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({})

  const { removeBackground, isProcessing, error, progress, clearError } = useBackgroundRemoval()

  const faceNames = [
    { id: "front", name: "Frontal", icon: "🎯" },
    { id: "back", name: "Trasera", icon: "🔙" },
    { id: "left", name: "Izquierda", icon: "⬅️" },
    { id: "right", name: "Derecha", icon: "➡️" },
    { id: "top", name: "Superior", icon: "⬆️" },
    { id: "bottom", name: "Inferior", icon: "⬇️" },
  ]

  const handleDrop = (e: React.DragEvent, faceId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive("")

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          onFaceUpdate(faceId, result)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, faceId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          onFaceUpdate(faceId, result)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleRemoveBackground = async (faceId: string) => {
    const currentFace = faces.find((f) => f.id === faceId)
    if (!currentFace?.texture) return

    clearError()

    try {
      const result = await removeBackground(currentFace.texture, selectedMethod, apiKeys[selectedMethod])

      if (result) {
        onFaceUpdate(faceId, result)
      }
    } catch (err) {
      console.error("Error removing background:", err)
    }
  }

  const handleApiKeyUpdate = (provider: string, apiKey: string) => {
    setApiKeys((prev) => ({ ...prev, [provider]: apiKey }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Editor de Caras de la Caja</h3>
          <ApiSettingsDialog onApiKeyUpdate={handleApiKeyUpdate} />
        </div>

        {/* Selector de método de remoción de fondo */}
        <div className="mb-4">
          <label className="block text-ash-gray-300 text-sm font-medium mb-2">Método de Remoción de Fondo</label>
          <Select value={selectedMethod} onValueChange={(value: any) => setSelectedMethod(value)}>
            <SelectTrigger className="bg-ash-gray-800/50 border-ash-gray-600/50 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-ash-gray-800 border-ash-gray-600">
              {BACKGROUND_REMOVAL_PROVIDERS.map((provider) => (
                <SelectItem key={provider.id} value={provider.id} className="text-white hover:bg-ash-gray-700">
                  <div className="flex items-center justify-between w-full">
                    <span>{provider.name}</span>
                    <span className={`text-xs ml-2 ${provider.requiresApiKey ? "text-yellow-400" : "text-green-400"}`}>
                      {provider.cost}
                    </span>
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

        <Tabs value={selectedFace} onValueChange={setSelectedFace}>
          <TabsList className="grid grid-cols-3 gap-1 bg-ash-gray-800/50 p-1">
            {faceNames.slice(0, 3).map((face) => (
              <TabsTrigger
                key={face.id}
                value={face.id}
                className="text-xs data-[state=active]:bg-neon-orange-500 data-[state=active]:text-white"
              >
                {face.icon} {face.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsList className="grid grid-cols-3 gap-1 bg-ash-gray-800/50 p-1 mt-2">
            {faceNames.slice(3, 6).map((face) => (
              <TabsTrigger
                key={face.id}
                value={face.id}
                className="text-xs data-[state=active]:bg-neon-orange-500 data-[state=active]:text-white"
              >
                {face.icon} {face.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {faceNames.map((face) => {
            const currentFace = faces.find((f) => f.id === face.id)
            return (
              <TabsContent key={face.id} value={face.id} className="mt-4">
                <div className="space-y-4">
                  {/* Área de vista previa */}
                  <div className="aspect-square bg-ash-gray-800/50 rounded-xl border-2 border-dashed border-ash-gray-600 relative overflow-hidden">
                    {currentFace?.texture ? (
                      <div className="relative w-full h-full">
                        <img
                          src={currentFace.texture || "/placeholder.svg"}
                          alt={`${face.name} face`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 w-8 h-8 p-0 bg-red-500/80 hover:bg-red-500"
                          onClick={() => onFaceUpdate(face.id, null)}
                        >
                          <X className="w-4 h-4 text-white" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className={`w-full h-full flex flex-col items-center justify-center transition-all ${
                          dragActive === face.id ? "border-neon-orange-500 bg-neon-orange-500/10" : ""
                        }`}
                        onDragEnter={(e) => {
                          e.preventDefault()
                          setDragActive(face.id)
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault()
                          setDragActive("")
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, face.id)}
                      >
                        <Upload className="w-8 h-8 text-ash-gray-400 mb-2" />
                        <p className="text-ash-gray-300 text-sm text-center">
                          Arrastra una imagen aquí
                          <br />
                          para la cara {face.name.toLowerCase()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Controles */}
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileInput(e, face.id)}
                      className="hidden"
                      id={`file-${face.id}`}
                    />
                    <label htmlFor={`file-${face.id}`} className="col-span-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-neon-orange-500/20"
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Subir Imagen
                        </span>
                      </Button>
                    </label>

                    {currentFace?.texture && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveBackground(face.id)}
                          disabled={isProcessing}
                          className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-blue-500/20 disabled:opacity-50"
                        >
                          {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-green-500/20"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Información de la imagen */}
                  {currentFace?.texture && (
                    <div className="bg-ash-gray-800/30 rounded-lg p-3">
                      <p className="text-ash-gray-300 text-sm">
                        <strong>Cara:</strong> {face.name}
                      </p>
                      <p className="text-ash-gray-400 text-xs mt-1">
                        Imagen cargada. Usa <Wand2 className="w-3 h-3 inline mx-1" /> para quitar el fondo.
                      </p>
                      {selectedMethod === "removebg" && !apiKeys.removebg && (
                        <p className="text-yellow-400 text-xs mt-2">
                          ⚠️ Configura tu API key de Remove.bg para mejor calidad
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
