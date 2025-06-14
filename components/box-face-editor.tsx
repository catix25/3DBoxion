"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, Scissors, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BoxFace {
  id: string
  name: string
  texture: string | null
}

interface BoxFaceEditorProps {
  faces: BoxFace[]
  onFaceUpdate: (faceId: string, texture: string | null) => void
}

export function BoxFaceEditor({ faces, onFaceUpdate }: BoxFaceEditorProps) {
  const [selectedFace, setSelectedFace] = useState(faces[0]?.id || "")
  const [dragActive, setDragActive] = useState("")

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

  const removeBackground = async (faceId: string) => {
    // Simulación de remoción de fondo
    console.log(`Removiendo fondo de la cara: ${faceId}`)
    // Aquí iría la integración con una API de remoción de fondo
  }

  return (
    <div className="space-y-6">
      <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
        <h3 className="text-white font-semibold mb-4">Editor de Caras de la Caja</h3>

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
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileInput(e, face.id)}
                      className="hidden"
                      id={`file-${face.id}`}
                    />
                    <label htmlFor={`file-${face.id}`} className="flex-1">
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
                          onClick={() => removeBackground(face.id)}
                          className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-blue-500/20"
                        >
                          <Scissors className="w-4 h-4" />
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
                        Imagen cargada correctamente. Usa las herramientas para editar.
                      </p>
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
