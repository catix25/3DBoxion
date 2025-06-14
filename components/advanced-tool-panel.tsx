"use client"
import { Plus, Copy, Trash2, Download, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
}

interface AdvancedToolPanelProps {
  boxes: BoxData[]
  selectedBoxId: string | null
  onBoxAdd: () => void
  onBoxDuplicate: (id: string) => void
  onBoxDelete: (id: string) => void
  onBoxUpdate: (id: string, updates: Partial<BoxData>) => void
  onFaceUpdate: (boxId: string, faceId: string, texture: string | null) => void
}

export function AdvancedToolPanel({
  boxes,
  selectedBoxId,
  onBoxAdd,
  onBoxDuplicate,
  onBoxDelete,
  onBoxUpdate,
  onFaceUpdate,
}: AdvancedToolPanelProps) {
  const selectedBox = boxes.find((box) => box.id === selectedBoxId)

  const boxPresets = [
    { name: "DVD Estándar", dimensions: { width: 190, height: 270, depth: 14 } },
    { name: "CD Jewel Case", dimensions: { width: 142, height: 125, depth: 10 } },
    { name: "Blu-ray", dimensions: { width: 170, height: 240, depth: 12 } },
    { name: "Caja Software", dimensions: { width: 180, height: 240, depth: 25 } },
    { name: "Caja Grande", dimensions: { width: 200, height: 280, depth: 30 } },
    { name: "Icono App", dimensions: { width: 120, height: 120, depth: 8 } },
  ]

  return (
    <div className="w-80 bg-ash-gray-800/50 backdrop-blur-md border-r border-ash-gray-700/50 h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Header con logo */}
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo-create-studio.png" alt="Create Studio" className="w-12 h-12 rounded-lg" />
          <div>
            <h2 className="text-white font-bold text-lg">3DBox Studio</h2>
            <p className="text-ash-gray-400 text-xs">Create Studio 2025</p>
          </div>
        </div>

        {/* Gestión de cajas */}
        <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
          <h3 className="text-white font-semibold mb-4">Gestión de Cajas</h3>

          <div className="flex gap-2 mb-4">
            <Button
              onClick={onBoxAdd}
              size="sm"
              className="flex-1 bg-neon-orange-500 hover:bg-neon-orange-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Caja
            </Button>
            {selectedBoxId && (
              <>
                <Button
                  onClick={() => onBoxDuplicate(selectedBoxId)}
                  size="sm"
                  variant="outline"
                  className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onBoxDelete(selectedBoxId)}
                  size="sm"
                  variant="outline"
                  className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* Lista de cajas */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {boxes.map((box, index) => (
              <div
                key={box.id}
                className={`p-2 rounded-lg cursor-pointer transition-all ${
                  selectedBoxId === box.id
                    ? "bg-neon-orange-500/20 border border-neon-orange-500/50"
                    : "bg-ash-gray-800/30 hover:bg-ash-gray-700/50"
                }`}
                onClick={() => {
                  /* Seleccionar caja */
                }}
              >
                <p className="text-white text-sm font-medium">Caja {index + 1}</p>
                <p className="text-ash-gray-400 text-xs">
                  {box.dimensions.width}×{box.dimensions.height}×{box.dimensions.depth}
                </p>
              </div>
            ))}
          </div>
        </div>

        {selectedBox && (
          <Tabs defaultValue="dimensions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-ash-gray-800/50">
              <TabsTrigger value="dimensions">Dimensiones</TabsTrigger>
              <TabsTrigger value="faces">Caras</TabsTrigger>
            </TabsList>

            <TabsContent value="dimensions" className="space-y-4">
              {/* Controles de dimensiones */}
              <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
                <h4 className="text-white font-medium mb-4">Dimensiones de la Caja</h4>

                <div className="space-y-4">
                  <div>
                    <label className="text-ash-gray-300 text-sm font-medium mb-2 block">
                      Ancho: {selectedBox.dimensions.width}mm
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
                    <label className="text-ash-gray-300 text-sm font-medium mb-2 block">
                      Alto: {selectedBox.dimensions.height}mm
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
                    <label className="text-ash-gray-300 text-sm font-medium mb-2 block">
                      Profundidad: {selectedBox.dimensions.depth}mm
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

                {/* Presets de cajas */}
                <div className="mt-6">
                  <h5 className="text-ash-gray-300 text-sm font-medium mb-3">Presets de Cajas</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {boxPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onBoxUpdate(selectedBox.id, {
                            dimensions: preset.dimensions,
                          })
                        }
                        className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-neon-orange-500/20 text-xs"
                      >
                        {preset.name}
                      </Button>
                    ))}
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

        {/* Acciones de exportación */}
        <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
          <h4 className="text-white font-medium mb-3">Exportar Proyecto</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Proyecto
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300"
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
