"use client"

import { useState } from "react"
import { Palette, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AdvancedColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

export function AdvancedColorPicker({ selectedColor, onColorChange }: AdvancedColorPickerProps) {
  const [customColor, setCustomColor] = useState("#ff6b35")

  const standardColors = [
    "#ff6b35", // Naranja
    "#ff8c42", // Naranja claro
    "#ffa726", // Amarillo naranja
    "#ffcc02", // Amarillo
    "#8bc34a", // Verde claro
    "#4caf50", // Verde
    "#00bcd4", // Cian
    "#2196f3", // Azul
    "#3f51b5", // Azul índigo
    "#9c27b0", // Púrpura
    "#e91e63", // Rosa
    "#f44336", // Rojo
    "#795548", // Marrón
    "#607d8b", // Azul gris
    "#424242", // Gris oscuro
    "#ffffff", // Blanco
  ]

  const neonColors = [
    "#ff073a", // Rojo neón
    "#39ff14", // Verde neón
    "#ff0080", // Rosa neón
    "#00ff80", // Verde lima neón
    "#8000ff", // Púrpura neón
    "#ff8000", // Naranja neón
    "#ffff00", // Amarillo neón
    "#00ffff", // Cian neón
    "#ff00ff", // Magenta neón
    "#80ff00", // Lima neón
    "#0080ff", // Azul neón
    "#ff4000", // Rojo naranja neón
    "#4000ff", // Azul púrpura neón
    "#ff0040", // Rosa rojo neón
    "#40ff00", // Verde amarillo neón
    "#0040ff", // Azul marino neón
  ]

  const gradientColors = [
    "linear-gradient(135deg, #ff6b35, #ff8c42)",
    "linear-gradient(135deg, #39ff14, #8bc34a)",
    "linear-gradient(135deg, #2196f3, #00bcd4)",
    "linear-gradient(135deg, #9c27b0, #e91e63)",
    "linear-gradient(135deg, #ff073a, #ff0080)",
    "linear-gradient(135deg, #ffcc02, #ffa726)",
    "linear-gradient(135deg, #8000ff, #ff00ff)",
    "linear-gradient(135deg, #00ffff, #0080ff)",
    "linear-gradient(135deg, #ff8000, #ffff00)",
    "linear-gradient(135deg, #4caf50, #00ff80)",
    "linear-gradient(135deg, #f44336, #ff073a)",
    "linear-gradient(135deg, #3f51b5, #2196f3)",
  ]

  return (
    <div className="space-y-4">
      <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Palette className="w-4 h-4 text-neon-orange-500" />
          Selector de Colores
        </h4>

        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-ash-gray-800/50 mb-4">
            <TabsTrigger value="standard" className="text-xs">
              Estándar
            </TabsTrigger>
            <TabsTrigger value="neon" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              Neón
            </TabsTrigger>
            <TabsTrigger value="gradient" className="text-xs">
              Gradiente
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {standardColors.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-xl border-2 transition-all hover:scale-110 shadow-lg ${
                    selectedColor === color ? "border-white ring-2 ring-neon-orange-500" : "border-ash-gray-600"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorChange(color)}
                  title={color}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="neon" className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {neonColors.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-xl border-2 transition-all hover:scale-110 ${
                    selectedColor === color ? "border-white ring-2 ring-white" : "border-ash-gray-600"
                  }`}
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 20px ${color}80, inset 0 0 20px ${color}40`,
                  }}
                  onClick={() => onColorChange(color)}
                  title={color}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-ash-gray-400 text-xs">✨ Colores con efecto neón brillante</p>
            </div>
          </TabsContent>

          <TabsContent value="gradient" className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {gradientColors.map((gradient, index) => (
                <button
                  key={index}
                  className={`w-16 h-12 rounded-xl border-2 transition-all hover:scale-110 ${
                    selectedColor === gradient ? "border-white ring-2 ring-neon-orange-500" : "border-ash-gray-600"
                  }`}
                  style={{ background: gradient }}
                  onClick={() => onColorChange(gradient)}
                  title={gradient}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Color personalizado */}
        <div className="mt-6 space-y-3">
          <h5 className="text-ash-gray-300 text-sm font-medium">Color Personalizado</h5>
          <div className="flex gap-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-12 h-12 rounded-xl border-2 border-ash-gray-600 bg-transparent cursor-pointer"
            />
            <Button
              onClick={() => onColorChange(customColor)}
              size="sm"
              className="flex-1 bg-neon-orange-500 hover:bg-neon-orange-600 text-white"
            >
              Aplicar Color
            </Button>
          </div>
          <input
            type="text"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            placeholder="#ff6b35"
            className="w-full px-3 py-2 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white text-sm"
          />
        </div>

        {/* Vista previa del color seleccionado */}
        <div className="mt-4 p-3 bg-ash-gray-800/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg border border-ash-gray-600"
              style={{
                background: selectedColor,
                boxShadow: selectedColor.includes("gradient")
                  ? "none"
                  : neonColors.includes(selectedColor)
                    ? `0 0 15px ${selectedColor}60`
                    : "none",
              }}
            ></div>
            <div>
              <p className="text-white text-sm font-medium">Color Actual</p>
              <p className="text-ash-gray-400 text-xs font-mono">{selectedColor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
