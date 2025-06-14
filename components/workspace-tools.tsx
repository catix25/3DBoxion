"use client"

import type React from "react"
import { Upload, Palette, Type, Settings, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { AdvancedColorPicker } from "./advanced-color-picker"
import { AdvancedFontSelector } from "./advanced-font-selector"
import { SimpleBackgroundRemover } from "./simple-background-remover"

interface BoxData {
  id: string
  dimensions: { width: number; height: number; depth: number }
  faces: Array<{
    id: string
    name: string
    texture: string | null
    color: string
    text: string
    fontSize: number
    fontFamily: string
  }>
  boxType: "software" | "dvd" | "cd" | "icon" | "desktop"
}

interface WorkspaceToolsProps {
  box: BoxData
  selectedFaceId: string
  onBoxUpdate: (updates: Partial<BoxData>) => void
  onFaceUpdate: (faceId: string, updates: any) => void
}

export function WorkspaceTools({ box, selectedFaceId, onBoxUpdate, onFaceUpdate }: WorkspaceToolsProps) {
  const selectedFace = box.faces.find((face) => face.id === selectedFaceId)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selectedFace) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          onFaceUpdate(selectedFaceId, { texture: result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const boxPresets = [
    { name: "Software", type: "software" as const, dimensions: { width: 190, height: 270, depth: 25 } },
    { name: "DVD", type: "dvd" as const, dimensions: { width: 190, height: 270, depth: 14 } },
    { name: "CD", type: "cd" as const, dimensions: { width: 142, height: 125, depth: 10 } },
    { name: "Icono", type: "icon" as const, dimensions: { width: 120, height: 120, depth: 8 } },
  ]

  return (
    <div className="w-80 bg-gradient-to-b from-ash-gray-800/80 via-ash-gray-800/60 to-ash-gray-900/80 backdrop-blur-md border-l border-ash-gray-700/50 h-full overflow-y-auto custom-scrollbar">
      <div className="p-4 space-y-4">
        {/* Header con logo correcto */}
        <div className="bg-gradient-to-r from-ash-gray-700/40 to-ash-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <img
                src="/logo-create-studio.webp"
                alt="Create Studio 2025"
                className="w-12 h-12 rounded-xl shadow-lg object-cover"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-ash-gray-800 animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">3DBox Studio</h2>
              <p className="text-green-400 text-xs font-medium">Create Studio 2025</p>
            </div>
          </div>
          <div className="text-ash-gray-400 text-xs">Creador profesional de portadas 3D</div>
        </div>

        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-ash-gray-800/50">
            <TabsTrigger value="image" className="text-xs">
              <ImageIcon className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="color" className="text-xs">
              <Palette className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="text" className="text-xs">
              <Type className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="box" className="text-xs">
              <Settings className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          {/* Subir imagen */}
          <TabsContent value="image" className="space-y-4">
            <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-ash-gray-600/30">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-neon-orange-500" />
                Imagen de la Cara
              </h4>

              <div className="space-y-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label htmlFor="image-upload">
                  <Button asChild className="w-full bg-neon-orange-500 hover:bg-neon-orange-600 text-white">
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Imagen
                    </span>
                  </Button>
                </label>

                {selectedFace?.texture && (
                  <div className="space-y-2">
                    <img
                      src={selectedFace.texture || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-ash-gray-600"
                    />
                    <Button
                      onClick={() => onFaceUpdate(selectedFaceId, { texture: null })}
                      variant="outline"
                      size="sm"
                      className="w-full bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                    >
                      Quitar Imagen
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Herramienta de remoción de fondo */}
            {selectedFace?.texture && (
              <SimpleBackgroundRemover
                imageUrl={selectedFace.texture}
                onImageProcessed={(processedImage) => onFaceUpdate(selectedFaceId, { texture: processedImage })}
              />
            )}
          </TabsContent>

          {/* Colores */}
          <TabsContent value="color" className="space-y-4">
            {selectedFace && (
              <AdvancedColorPicker
                selectedColor={selectedFace.color}
                onColorChange={(color) => onFaceUpdate(selectedFaceId, { color })}
              />
            )}
          </TabsContent>

          {/* Texto */}
          <TabsContent value="text" className="space-y-4">
            {selectedFace && (
              <>
                <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-ash-gray-600/30">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Type className="w-4 h-4 text-neon-orange-500" />
                    Texto
                  </h4>
                  <Textarea
                    value={selectedFace.text}
                    onChange={(e) => onFaceUpdate(selectedFaceId, { text: e.target.value })}
                    placeholder="Escribe tu texto aquí..."
                    className="bg-ash-gray-800/50 border-ash-gray-600/50 text-white"
                    rows={3}
                  />
                </div>

                <AdvancedFontSelector
                  selectedFont={selectedFace.fontFamily}
                  fontSize={selectedFace.fontSize}
                  onFontChange={(font) => onFaceUpdate(selectedFaceId, { fontFamily: font })}
                  onFontSizeChange={(size) => onFaceUpdate(selectedFaceId, { fontSize: size })}
                />
              </>
            )}
          </TabsContent>

          {/* Configuración de caja */}
          <TabsContent value="box" className="space-y-4">
            <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-ash-gray-600/30">
              <h4 className="text-white font-medium mb-4">Tipo de Caja</h4>
              <div className="grid grid-cols-2 gap-2">
                {boxPresets.map((preset) => (
                  <Button
                    key={preset.type}
                    onClick={() => onBoxUpdate({ boxType: preset.type, dimensions: preset.dimensions })}
                    variant="outline"
                    size="sm"
                    className={`${
                      box.boxType === preset.type
                        ? "bg-neon-orange-500/20 border-neon-orange-500/50 text-neon-orange-400"
                        : "bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300"
                    }`}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-ash-gray-600/30">
              <h4 className="text-white font-medium mb-4">Dimensiones</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-ash-gray-300 text-sm mb-2 block flex justify-between">
                    <span>Ancho</span>
                    <span className="text-neon-orange-400">{box.dimensions.width}mm</span>
                  </label>
                  <Slider
                    value={[box.dimensions.width]}
                    onValueChange={([width]) => onBoxUpdate({ dimensions: { ...box.dimensions, width } })}
                    max={400}
                    min={50}
                    step={5}
                  />
                </div>

                <div>
                  <label className="text-ash-gray-300 text-sm mb-2 block flex justify-between">
                    <span>Alto</span>
                    <span className="text-neon-orange-400">{box.dimensions.height}mm</span>
                  </label>
                  <Slider
                    value={[box.dimensions.height]}
                    onValueChange={([height]) => onBoxUpdate({ dimensions: { ...box.dimensions, height } })}
                    max={400}
                    min={50}
                    step={5}
                  />
                </div>

                <div>
                  <label className="text-ash-gray-300 text-sm mb-2 block flex justify-between">
                    <span>Grosor</span>
                    <span className="text-neon-orange-400">{box.dimensions.depth}mm</span>
                  </label>
                  <Slider
                    value={[box.dimensions.depth]}
                    onValueChange={([depth]) => onBoxUpdate({ dimensions: { ...box.dimensions, depth } })}
                    max={50}
                    min={5}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
