"use client"

import type React from "react"

import { Upload, Palette, Type, Settings, ImageIcon } from "lucide-react"
import { useState } from "react"

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
  const [activeTab, setActiveTab] = useState("color")

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
    { name: "Software", type: "software" as const, dimensions: { width: 190, height: 270, depth: 25 }, icon: "📦" },
    { name: "DVD", type: "dvd" as const, dimensions: { width: 190, height: 270, depth: 14 }, icon: "💿" },
    { name: "CD", type: "cd" as const, dimensions: { width: 142, height: 125, depth: 10 }, icon: "💽" },
    { name: "Icono App", type: "icon" as const, dimensions: { width: 120, height: 120, depth: 8 }, icon: "📱" },
    { name: "Desktop", type: "desktop" as const, dimensions: { width: 200, height: 280, depth: 30 }, icon: "🖥️" },
  ]

  // Colores estándar
  const standardColors = [
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
    "#795548",
    "#607d8b",
    "#424242",
    "#ffffff",
  ]

  // Colores neón
  const neonColors = [
    "#ff073a",
    "#39ff14",
    "#ff0080",
    "#00ff80",
    "#8000ff",
    "#ff8000",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
    "#80ff00",
    "#0080ff",
    "#ff4000",
  ]

  // Fuentes
  const fonts = [
    { name: "Arial", family: "Arial, sans-serif" },
    { name: "Helvetica", family: "Helvetica, Arial, sans-serif" },
    { name: "Times", family: "Times New Roman, serif" },
    { name: "Georgia", family: "Georgia, serif" },
    { name: "Courier", family: "Courier New, monospace" },
    { name: "Verdana", family: "Verdana, sans-serif" },
  ]

  return (
    <div className="w-80 h-full bg-gradient-to-b from-ash-gray-800/80 via-ash-gray-800/60 to-ash-gray-900/80 backdrop-blur-md border-l border-ash-gray-700/50 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-ash-gray-700/40 to-ash-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-lg">
                  3D
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-ash-gray-800 animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">3DBox Studio</h2>
                <p className="text-green-400 text-xs font-medium">Create Studio 2025</p>
              </div>
            </div>
            <div className="text-ash-gray-400 text-xs">Creador profesional de portadas 3D</div>
          </div>

          {/* Selector de cara */}
          <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-ash-gray-600/30">
            <h4 className="text-white font-medium mb-3">Cara Actual: {selectedFace?.name}</h4>
            <div className="grid grid-cols-3 gap-2">
              {box.faces.map((face) => (
                <button
                  key={face.id}
                  onClick={() => {
                    // Simular selección de cara
                    const event = new CustomEvent("faceSelect", { detail: face.id })
                    window.dispatchEvent(event)
                  }}
                  className={`text-xs py-2 px-3 rounded-lg transition-all ${
                    selectedFaceId === face.id
                      ? "bg-neon-orange-500/20 border border-neon-orange-500/50 text-neon-orange-400"
                      : "bg-ash-gray-800/50 border border-ash-gray-600/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                  }`}
                >
                  {face.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-xl border border-ash-gray-600/30">
            <div className="flex border-b border-ash-gray-600/30">
              {[
                { id: "image", icon: ImageIcon, label: "Imagen" },
                { id: "color", icon: Palette, label: "Color" },
                { id: "text", icon: Type, label: "Texto" },
                { id: "box", icon: Settings, label: "Caja" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 p-3 flex items-center justify-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? "bg-neon-orange-500/20 text-neon-orange-400"
                      : "text-ash-gray-400 hover:text-white hover:bg-ash-gray-700/30"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === "image" && (
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <div className="w-full bg-neon-orange-500 hover:bg-neon-orange-600 text-white py-3 px-4 rounded-lg cursor-pointer text-center transition-colors flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      Subir Imagen
                    </div>
                  </label>

                  {selectedFace?.texture && (
                    <div className="space-y-2">
                      <img
                        src={selectedFace.texture || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border border-ash-gray-600"
                      />
                      <button
                        onClick={() => onFaceUpdate(selectedFaceId, { texture: null })}
                        className="w-full bg-red-500/20 border border-red-500/50 text-red-400 py-2 px-4 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        Quitar Imagen
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "color" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-3">Colores Estándar</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {standardColors.map((color) => (
                        <button
                          key={color}
                          className="w-12 h-12 rounded-lg border-2 border-ash-gray-600 hover:border-white transition-all hover:scale-110"
                          style={{ backgroundColor: color }}
                          onClick={() => onFaceUpdate(selectedFaceId, { color })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Colores Neón ✨</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {neonColors.map((color) => (
                        <button
                          key={color}
                          className="w-12 h-12 rounded-lg border-2 border-ash-gray-600 hover:border-white transition-all hover:scale-110"
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 0 15px ${color}60`,
                          }}
                          onClick={() => onFaceUpdate(selectedFaceId, { color })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Color Personalizado</h4>
                    <input
                      type="color"
                      value={selectedFace?.color || "#ffffff"}
                      onChange={(e) => onFaceUpdate(selectedFaceId, { color: e.target.value })}
                      className="w-full h-12 rounded-lg border border-ash-gray-600 bg-transparent cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {activeTab === "text" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Texto</label>
                    <textarea
                      value={selectedFace?.text || ""}
                      onChange={(e) => onFaceUpdate(selectedFaceId, { text: e.target.value })}
                      placeholder="Escribe tu texto aquí..."
                      className="w-full px-3 py-2 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Fuente</label>
                    <select
                      value={selectedFace?.fontFamily || "Arial, sans-serif"}
                      onChange={(e) => onFaceUpdate(selectedFaceId, { fontFamily: e.target.value })}
                      className="w-full px-3 py-2 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white"
                    >
                      {fonts.map((font) => (
                        <option key={font.family} value={font.family}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Tamaño: {selectedFace?.fontSize || 24}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="72"
                      step="2"
                      value={selectedFace?.fontSize || 24}
                      onChange={(e) => onFaceUpdate(selectedFaceId, { fontSize: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {activeTab === "box" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-3">Tipo de Caja</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {boxPresets.map((preset) => (
                        <button
                          key={preset.type}
                          onClick={() => onBoxUpdate({ boxType: preset.type, dimensions: preset.dimensions })}
                          className={`p-3 rounded-lg border transition-all ${
                            box.boxType === preset.type
                              ? "bg-neon-orange-500/20 border-neon-orange-500/50 text-neon-orange-400"
                              : "bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg mb-1">{preset.icon}</div>
                            <div className="text-xs">{preset.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Dimensiones</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-ash-gray-300 text-sm mb-1">Ancho: {box.dimensions.width}px</label>
                        <input
                          type="range"
                          min="50"
                          max="400"
                          step="5"
                          value={box.dimensions.width}
                          onChange={(e) =>
                            onBoxUpdate({ dimensions: { ...box.dimensions, width: Number.parseInt(e.target.value) } })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-ash-gray-300 text-sm mb-1">Alto: {box.dimensions.height}px</label>
                        <input
                          type="range"
                          min="50"
                          max="400"
                          step="5"
                          value={box.dimensions.height}
                          onChange={(e) =>
                            onBoxUpdate({ dimensions: { ...box.dimensions, height: Number.parseInt(e.target.value) } })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-ash-gray-300 text-sm mb-1">Grosor: {box.dimensions.depth}px</label>
                        <input
                          type="range"
                          min="5"
                          max="50"
                          step="1"
                          value={box.dimensions.depth}
                          onChange={(e) =>
                            onBoxUpdate({ dimensions: { ...box.dimensions, depth: Number.parseInt(e.target.value) } })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
