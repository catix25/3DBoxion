"use client"
import { Plus, Copy, Trash2, Download, Save, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EnhancedBoxFaceEditor } from "./enhanced-box-face-editor"

interface BoxData {
  id: string
  position: [number, number, number]
  dimensions: { width: number; height: number; depth: number }
  faces: Array<{
    id: string
    name: string
    texture: string | null
  }>
  boxType: "software" | "dvd" | "cd" | "icon" | "desktop"
}

interface FixedToolPanelProps {
  boxes: BoxData[]
  selectedBoxId: string | null
  onBoxAdd: () => void
  onBoxDuplicate: (id: string) => void
  onBoxDelete: (id: string) => void
  onBoxUpdate: (id: string, updates: Partial<BoxData>) => void
  onFaceUpdate: (boxId: string, faceId: string, texture: string | null) => void
}

export function FixedToolPanel({
  boxes,
  selectedBoxId,
  onBoxAdd,
  onBoxDuplicate,
  onBoxDelete,
  onBoxUpdate,
  onFaceUpdate,
}: FixedToolPanelProps) {
  const selectedBox = boxes.find((box) => box.id === selectedBoxId)

  const boxPresets = [
    {
      name: "Software Box",
      type: "software" as const,
      dimensions: { width: 190, height: 270, depth: 25 },
      icon: "📦",
    },
    {
      name: "DVD Case",
      type: "dvd" as const,
      dimensions: { width: 190, height: 270, depth: 14 },
      icon: "💿",
    },
    {
      name: "CD Jewel",
      type: "cd" as const,
      dimensions: { width: 142, height: 125, depth: 10 },
      icon: "💽",
    },
    {
      name: "App Icon",
      type: "icon" as const,
      dimensions: { width: 120, height: 120, depth: 8 },
      icon: "📱",
    },
    {
      name: "Desktop Box",
      type: "desktop" as const,
      dimensions: { width: 200, height: 280, depth: 30 },
      icon: "🖥️",
    },
  ]

  return (
    <div className="w-80 bg-gradient-to-b from-ash-gray-800/80 via-ash-gray-800/60 to-ash-gray-900/80 backdrop-blur-md border-r border-ash-gray-700/50 h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Header con logo mejorado */}
        <div className="bg-gradient-to-r from-ash-gray-700/40 to-ash-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <img src="/logo-create-studio.png" alt="Create Studio" className="w-12 h-12 rounded-xl shadow-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-ash-gray-800 animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">3DBox Studio</h2>
              <p className="text-green-400 text-xs font-medium">Create Studio 2025</p>
            </div>
          </div>
          <div className="text-ash-gray-400 text-xs">Creador profesional de portadas 3D</div>
        </div>

        {/* Gestión de cajas mejorada */}
        <div className="bg-gradient-to-b from-ash-gray-700/30 to-ash-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Box className="w-4 h-4 text-neon-orange-500" />
            Gestión de Cajas
          </h3>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button
              onClick={onBoxAdd}
              size="sm"
              className="bg-gradient-to-r from-neon-orange-500 to-neon-orange-600 hover:from-neon-orange-600 hover:to-neon-orange-700 text-white shadow-lg"
            >
              <Plus className="w-4 h-4" />
            </Button>
            {selectedBoxId && (
              <>
                <Button
                  onClick={() => onBoxDuplicate(selectedBoxId)}
                  size="sm"
                  variant="outline"
                  className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-blue-500/20 hover:border-blue-500/50"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onBoxDelete(selectedBoxId)}
                  size="sm"
                  variant="outline"
                  className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30 hover:border-red-500/70"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* Lista de cajas con scroll */}
          <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
            {boxes.map((box, index) => (
              <div
                key={box.id}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedBoxId === box.id
                    ? "bg-gradient-to-r from-neon-orange-500/20 to-neon-orange-600/20 border border-neon-orange-500/50 shadow-lg"
                    : "bg-ash-gray-800/30 hover:bg-ash-gray-700/50 border border-transparent"
                }`}
                onClick={() => {
                  /* Seleccionar caja */
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">
                      {boxPresets.find((p) => p.type === box.boxType)?.icon} Caja {index + 1}
                    </p>
                    <p className="text-ash-gray-400 text-xs">
                      {box.dimensions.width}×{box.dimensions.height}×{box.dimensions.depth}mm
                    </p>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      selectedBoxId === box.id ? "bg-neon-orange-500" : "bg-ash-gray-600"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedBox && (
          <Tabs defaultValue="type" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-ash-gray-800/50 rounded-xl">
              <TabsTrigger value="type" className="text-xs">
                Tipo
              </TabsTrigger>
              <TabsTrigger value="dimensions" className="text-xs">
                Tamaño
              </TabsTrigger>
              <TabsTrigger value="faces" className="text-xs">
                Caras
              </TabsTrigger>
            </TabsList>

            <TabsContent value="type" className="space-y-4">
              <div className="bg-gradient-to-b from-ash-gray-700/30 to-ash-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
                <h4 className="text-white font-medium mb-4">Tipo de Caja</h4>

                <Select
                  value={selectedBox.boxType}
                  onValueChange={(value: any) => onBoxUpdate(selectedBox.id, { boxType: value })}
                >
                  <SelectTrigger className="bg-ash-gray-800/50 border-ash-gray-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-ash-gray-800 border-ash-gray-600">
                    {boxPresets.map((preset) => (
                      <SelectItem key={preset.type} value={preset.type} className="text-white hover:bg-ash-gray-700">
                        <div className="flex items-center gap-2">
                          <span>{preset.icon}</span>
                          <span>{preset.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  {boxPresets.map((preset) => (
                    <Button
                      key={preset.type}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onBoxUpdate(selectedBox.id, {
                          boxType: preset.type,
                          dimensions: preset.dimensions,
                        })
                      }
                      className={`bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-neon-orange-500/20 text-xs p-2 h-auto ${
                        selectedBox.boxType === preset.type ? "border-neon-orange-500/50 bg-neon-orange-500/10" : ""
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{preset.icon}</div>
                        <div className="text-xs">{preset.name}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dimensions" className="space-y-4">
              <div className="bg-gradient-to-b from-ash-gray-700/30 to-ash-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
                <h4 className="text-white font-medium mb-4">Dimensiones Precisas</h4>

                <div className="space-y-6">
                  <div>
                    <label className="text-ash-gray-300 text-sm font-medium mb-2 block flex items-center justify-between">
                      <span>Ancho</span>
                      <span className="text-neon-orange-400 font-mono">{selectedBox.dimensions.width}mm</span>
                    </label>
                    <Slider
                      value={[selectedBox.dimensions.width]}
                      onValueChange={([width]) =>
                        onBoxUpdate(selectedBox.id, {
                          dimensions: { ...selectedBox.dimensions, width },
                        })
                      }
                      max={400}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-ash-gray-300 text-sm font-medium mb-2 block flex items-center justify-between">
                      <span>Alto</span>
                      <span className="text-neon-orange-400 font-mono">{selectedBox.dimensions.height}mm</span>
                    </label>
                    <Slider
                      value={[selectedBox.dimensions.height]}
                      onValueChange={([height]) =>
                        onBoxUpdate(selectedBox.id, {
                          dimensions: { ...selectedBox.dimensions, height },
                        })
                      }
                      max={400}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-ash-gray-300 text-sm font-medium mb-2 block flex items-center justify-between">
                      <span>Profundidad</span>
                      <span className="text-neon-orange-400 font-mono">{selectedBox.dimensions.depth}mm</span>
                    </label>
                    <Slider
                      value={[selectedBox.dimensions.depth]}
                      onValueChange={([depth]) =>
                        onBoxUpdate(selectedBox.id, {
                          dimensions: { ...selectedBox.dimensions, depth },
                        })
                      }
                      max={50}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faces">
              <EnhancedBoxFaceEditor
                faces={selectedBox.faces}
                onFaceUpdate={(faceId, texture) => onFaceUpdate(selectedBox.id, faceId, texture)}
              />
            </TabsContent>
          </Tabs>
        )}

        {/* Acciones de exportación con diseño mejorado */}
        <div className="bg-gradient-to-b from-ash-gray-700/30 to-black/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
          <h4 className="text-white font-medium mb-4 flex items-center gap-2">
            <Download className="w-4 h-4 text-green-400" />
            Exportar Proyecto
          </h4>
          <div className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-green-500/20 hover:border-green-500/50 justify-start"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Proyecto
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-blue-500/20 hover:border-blue-500/50 justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar PNG 4K
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-purple-500/20 hover:border-purple-500/50 justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar SVG
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
