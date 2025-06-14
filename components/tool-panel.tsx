"use client"

import { Upload, Download, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ToolPanelProps {
  boxData: any
  onUpdate: (updates: any) => void
}

export function ToolPanel({ boxData, onUpdate }: ToolPanelProps) {
  const colors = [
    "#ff6b35",
    "#ff8c42",
    "#ffa726",
    "#ffcc02",
    "#8bc34a",
    "#4caf50",
    "#00bcd4",
    "#2196f3",
    "#3f51b5",
    "#9c27b0",
    "#e91e63",
    "#f44336",
  ]

  const patterns = [
    { id: "none", name: "Sin patrón" },
    { id: "geometric", name: "Geométrico" },
    { id: "dots", name: "Puntos" },
    { id: "lines", name: "Líneas" },
  ]

  return (
    <div className="w-80 bg-gray-900/95 backdrop-blur-sm border-l border-gray-700 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">3DBox Studio</h2>
          <p className="text-gray-400 text-sm">Creador Profesional</p>
        </div>

        <Tabs defaultValue="design" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="design">Diseño</TabsTrigger>
            <TabsTrigger value="text">Texto</TabsTrigger>
            <TabsTrigger value="export">Exportar</TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-4">
            {/* Cara frontal */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Cara Frontal</h3>

              <div className="space-y-3">
                <div>
                  <label className="text-gray-300 text-sm">Título Principal</label>
                  <Input
                    value={boxData.front.title}
                    onChange={(e) =>
                      onUpdate({
                        front: { ...boxData.front, title: e.target.value },
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm">Subtítulo</label>
                  <Input
                    value={boxData.front.subtitle}
                    onChange={(e) =>
                      onUpdate({
                        front: { ...boxData.front, subtitle: e.target.value },
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Color del Título</label>
                  <div className="grid grid-cols-6 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded border-2 border-gray-600 hover:border-white"
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          onUpdate({
                            front: { ...boxData.front, titleColor: color },
                          })
                        }
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Patrón de Fondo</label>
                  <div className="grid grid-cols-2 gap-2">
                    {patterns.map((pattern) => (
                      <Button
                        key={pattern.id}
                        variant={boxData.front.pattern === pattern.id ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          onUpdate({
                            front: { ...boxData.front, pattern: pattern.id },
                          })
                        }
                        className="text-xs"
                      >
                        {pattern.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lomo */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Lomo</h3>

              <div className="space-y-3">
                <div>
                  <label className="text-gray-300 text-sm">Texto del Lomo</label>
                  <Input
                    value={boxData.spine.text}
                    onChange={(e) =>
                      onUpdate({
                        spine: { ...boxData.spine, text: e.target.value },
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Color de Fondo</label>
                  <div className="grid grid-cols-6 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded border-2 border-gray-600 hover:border-white"
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          onUpdate({
                            spine: { ...boxData.spine, background: color },
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Información del Producto</h3>

              <Textarea
                value={boxData.back.text}
                onChange={(e) =>
                  onUpdate({
                    back: { ...boxData.back, text: e.target.value },
                  })
                }
                className="bg-gray-700 border-gray-600 text-white"
                rows={4}
                placeholder="Describe tu producto..."
              />
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Exportar Proyecto</h3>

              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PNG
                </Button>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Proyecto
                </Button>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Exportar ICO
                </Button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Formatos Disponibles</h4>
              <div className="text-gray-400 text-sm space-y-1">
                <div>• PNG (Alta calidad)</div>
                <div>• ICO (Iconos Windows)</div>
                <div>• SVG (Vectorial)</div>
                <div>• PDF (Impresión)</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
