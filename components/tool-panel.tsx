"use client"
import { ImageUploader } from "./image-uploader"
import { DimensionControls } from "./dimension-controls"
import { ColorPicker } from "./color-picker"
import { FontSelector } from "./font-selector"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ToolPanelProps {
  activeTab: string
  boxDimensions: { width: number; height: number; depth: number }
  onDimensionsChange: (dimensions: { width: number; height: number; depth: number }) => void
  selectedImage: string | null
  onImageSelect: (image: string | null) => void
}

export function ToolPanel({
  activeTab,
  boxDimensions,
  onDimensionsChange,
  selectedImage,
  onImageSelect,
}: ToolPanelProps) {
  if (activeTab !== "3dbox") return null

  return (
    <div className="h-full p-4 space-y-4">
      <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
        <h3 className="text-white font-semibold mb-4">Herramientas de Diseño</h3>

        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-ash-gray-800/50">
            <TabsTrigger value="image" className="text-xs">
              Imagen
            </TabsTrigger>
            <TabsTrigger value="dimensions" className="text-xs">
              Tamaño
            </TabsTrigger>
            <TabsTrigger value="style" className="text-xs">
              Estilo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            <ImageUploader onImageSelect={onImageSelect} />
          </TabsContent>

          <TabsContent value="dimensions" className="space-y-4">
            <DimensionControls dimensions={boxDimensions} onChange={onDimensionsChange} />
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <ColorPicker />
            <FontSelector />
          </TabsContent>
        </Tabs>
      </div>

      {/* Presets de cajas */}
      <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
        <h4 className="text-white font-medium mb-3">Tipos de Caja</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDimensionsChange({ width: 200, height: 280, depth: 20 })}
            className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-neon-orange-500/20 hover:border-neon-orange-500/50"
          >
            DVD
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDimensionsChange({ width: 150, height: 150, depth: 15 })}
            className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-neon-orange-500/20 hover:border-neon-orange-500/50"
          >
            CD
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDimensionsChange({ width: 180, height: 240, depth: 25 })}
            className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-neon-orange-500/20 hover:border-neon-orange-500/50"
          >
            Software
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDimensionsChange({ width: 120, height: 120, depth: 10 })}
            className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-neon-orange-500/20 hover:border-neon-orange-500/50"
          >
            Icono
          </Button>
        </div>
      </div>
    </div>
  )
}
