"use client"

import type React from "react"

import { Upload, Palette, Type, Settings, Download, Save, Smartphone } from "lucide-react"
import { useState } from "react"

interface IconData {
  id: string
  dimensions: { width: number; height: number; depth: number }
  shape: "square" | "rounded" | "circle"
  cornerRadius: number
  background: string
  foreground: string
  text: string
  fontSize: number
  fontFamily: string
  texture: string | null
  style: "flat" | "gradient" | "glass" | "metal"
  shadow: boolean
  glow: boolean
}

interface IconToolsProps {
  iconData: IconData
  onUpdate: (updates: Partial<IconData>) => void
}

export function IconTools({ iconData, onUpdate }: IconToolsProps) {
  const [activeTab, setActiveTab] = useState("design")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          onUpdate({ texture: result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Tamaños estándar de iconos
  const iconSizes = [
    { name: "Favicon", size: { width: 64, height: 64, depth: 8 } },
    { name: "App Small", size: { width: 128, height: 128, depth: 16 } },
    { name: "App Medium", size: { width: 256, height: 256, depth: 32 } },
    { name: "App Large", size: { width: 512, height: 512, depth: 64 } },
    { name: "iOS App", size: { width: 1024, height: 1024, depth: 128 } },
    { name: "Android", size: { width: 512, height: 512, depth: 64 } },
  ]

  // Colores de fondo populares
  const backgroundColors = [
    "#4a90e2",
    "#5cb85c",
    "#f0ad4e",
    "#d9534f",
    "#5bc0de",
    "#9b59b6",
    "#e67e22",
    "#1abc9c",
    "#34495e",
    "#95a5a6",
    "#e74c3c",
    "#3498db",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
  ]

  // Colores neón para iconos
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

  // Fuentes para iconos
  const iconFonts = [
    { name: "Arial", family: "Arial, sans-serif" },
    { name: "Helvetica", family: "Helvetica, Arial, sans-serif" },
    { name: "Roboto", family: "Roboto, sans-serif" },
    { name: "SF Pro", family: "SF Pro Display, sans-serif" },
    { name: "Segoe UI", family: "Segoe UI, sans-serif" },
    { name: "Impact", family: "Impact, sans-serif" },
  ]

  return (
    <div className="w-80 h-full bg-gradient-to-b from-ash-gray-800/80 via-ash-gray-800/60 to-ash-gray-900/80 backdrop-blur-md border-l border-ash-gray-700/50 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-ash-gray-700/40 to-ash-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-lg">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-ash-gray-800 animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Generador de Iconos</h2>
                <p className="text-cyan-400 text-xs font-medium">Create Studio 2025</p>
              </div>
            </div>
            <div className="text-ash-gray-400 text-xs">Crea iconos 3D profesionales para aplicaciones</div>
          </div>

          {/* Información del icono actual */}
          <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-ash-gray-600/30">
            <h4 className="text-white font-medium mb-3">Icono Actual</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ash-gray-300">Tamaño:</span>
                <span className="text-cyan-400">
                  {iconData.dimensions.width}×{iconData.dimensions.height}px
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ash-gray-300">Forma:</span>
                <span className="text-cyan-400 capitalize">{iconData.shape}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ash-gray-300">Estilo:</span>
                <span className="text-cyan-400 capitalize">{iconData.style}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-xl border border-ash-gray-600/30">
            <div className="flex border-b border-ash-gray-600/30">
              {[
                { id: "design", icon: Palette, label: "Diseño" },
                { id: "text", icon: Type, label: "Texto" },
                { id: "settings", icon: Settings, label: "Config" },
                { id: "export", icon: Download, label: "Export" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 p-3 flex items-center justify-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "text-ash-gray-400 hover:text-white hover:bg-ash-gray-700/30"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === "design" && (
                <div className="space-y-4">
                  {/* Forma del icono */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Forma del Icono</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "square", name: "Cuadrado", icon: "⬜" },
                        { id: "rounded", name: "Redondeado", icon: "🔲" },
                        { id: "circle", name: "Círculo", icon: "⭕" },
                      ].map((shape) => (
                        <button
                          key={shape.id}
                          onClick={() => onUpdate({ shape: shape.id as any })}
                          className={`p-3 rounded-lg border transition-all ${
                            iconData.shape === shape.id
                              ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                              : "bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg mb-1">{shape.icon}</div>
                            <div className="text-xs">{shape.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Radio de esquinas (solo para redondeado) */}
                  {iconData.shape === "rounded" && (
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Radio de Esquinas: {iconData.cornerRadius}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="256"
                        step="8"
                        value={iconData.cornerRadius}
                        onChange={(e) => onUpdate({ cornerRadius: Number.parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Estilo del icono */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Estilo Visual</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "flat", name: "Plano", desc: "Estilo minimalista" },
                        { id: "gradient", name: "Gradiente", desc: "Con degradado" },
                        { id: "glass", name: "Cristal", desc: "Efecto vidrio" },
                        { id: "metal", name: "Metal", desc: "Acabado metálico" },
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => onUpdate({ style: style.id as any })}
                          className={`p-3 rounded-lg border transition-all text-left ${
                            iconData.style === style.id
                              ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                              : "bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                          }`}
                        >
                          <div className="font-medium text-sm">{style.name}</div>
                          <div className="text-xs opacity-70">{style.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colores de fondo */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Color de Fondo</h4>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {backgroundColors.map((color) => (
                        <button
                          key={color}
                          className="w-12 h-12 rounded-lg border-2 border-ash-gray-600 hover:border-white transition-all hover:scale-110"
                          style={{ backgroundColor: color }}
                          onClick={() => onUpdate({ background: color })}
                        />
                      ))}
                    </div>

                    <div>
                      <h5 className="text-ash-gray-300 text-sm mb-2">Colores Neón ✨</h5>
                      <div className="grid grid-cols-4 gap-2">
                        {neonColors.map((color) => (
                          <button
                            key={color}
                            className="w-12 h-12 rounded-lg border-2 border-ash-gray-600 hover:border-white transition-all hover:scale-110"
                            style={{
                              backgroundColor: color,
                              boxShadow: `0 0 15px ${color}60`,
                            }}
                            onClick={() => onUpdate({ background: color })}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-ash-gray-300 text-sm mb-1">Color Personalizado</label>
                      <input
                        type="color"
                        value={iconData.background}
                        onChange={(e) => onUpdate({ background: e.target.value })}
                        className="w-full h-10 rounded-lg border border-ash-gray-600 bg-transparent cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Imagen de textura */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Imagen/Logo</h4>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="texture-upload"
                    />
                    <label htmlFor="texture-upload">
                      <div className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-lg cursor-pointer text-center transition-colors flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4" />
                        Subir Logo/Imagen
                      </div>
                    </label>

                    {iconData.texture && (
                      <div className="mt-3 space-y-2">
                        <img
                          src={iconData.texture || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-24 object-cover rounded-lg border border-ash-gray-600"
                        />
                        <button
                          onClick={() => onUpdate({ texture: null })}
                          className="w-full bg-red-500/20 border border-red-500/50 text-red-400 py-2 px-4 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          Quitar Imagen
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "text" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Texto del Icono</label>
                    <input
                      type="text"
                      value={iconData.text}
                      onChange={(e) => onUpdate({ text: e.target.value })}
                      placeholder="APP"
                      className="w-full px-3 py-2 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white"
                      maxLength={4}
                    />
                    <p className="text-ash-gray-500 text-xs mt-1">Máximo 4 caracteres recomendado</p>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Fuente</label>
                    <select
                      value={iconData.fontFamily}
                      onChange={(e) => onUpdate({ fontFamily: e.target.value })}
                      className="w-full px-3 py-2 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white"
                    >
                      {iconFonts.map((font) => (
                        <option key={font.family} value={font.family}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Tamaño de Fuente: {iconData.fontSize}px</label>
                    <input
                      type="range"
                      min="50"
                      max="300"
                      step="10"
                      value={iconData.fontSize}
                      onChange={(e) => onUpdate({ fontSize: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Color del Texto</label>
                    <input
                      type="color"
                      value={iconData.foreground}
                      onChange={(e) => onUpdate({ foreground: e.target.value })}
                      className="w-full h-10 rounded-lg border border-ash-gray-600 bg-transparent cursor-pointer"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-white font-medium">Sombra del Texto</label>
                      <button
                        onClick={() => onUpdate({ shadow: !iconData.shadow })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          iconData.shadow ? "bg-cyan-500" : "bg-ash-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            iconData.shadow ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-white font-medium">Efecto de Brillo</label>
                      <button
                        onClick={() => onUpdate({ glow: !iconData.glow })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          iconData.glow ? "bg-cyan-500" : "bg-ash-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            iconData.glow ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-3">Tamaños Predefinidos</h4>
                    <div className="space-y-2">
                      {iconSizes.map((size) => (
                        <button
                          key={size.name}
                          onClick={() => onUpdate({ dimensions: size.size })}
                          className={`w-full p-3 rounded-lg border transition-all text-left ${
                            iconData.dimensions.width === size.size.width
                              ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                              : "bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{size.name}</span>
                            <span className="text-sm opacity-70">
                              {size.size.width}×{size.size.height}px
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Dimensiones Personalizadas</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-ash-gray-300 text-sm mb-1">
                          Ancho: {iconData.dimensions.width}px
                        </label>
                        <input
                          type="range"
                          min="64"
                          max="1024"
                          step="64"
                          value={iconData.dimensions.width}
                          onChange={(e) =>
                            onUpdate({
                              dimensions: { ...iconData.dimensions, width: Number.parseInt(e.target.value) },
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-ash-gray-300 text-sm mb-1">
                          Alto: {iconData.dimensions.height}px
                        </label>
                        <input
                          type="range"
                          min="64"
                          max="1024"
                          step="64"
                          value={iconData.dimensions.height}
                          onChange={(e) =>
                            onUpdate({
                              dimensions: { ...iconData.dimensions, height: Number.parseInt(e.target.value) },
                            })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-ash-gray-300 text-sm mb-1">
                          Profundidad: {iconData.dimensions.depth}px
                        </label>
                        <input
                          type="range"
                          min="8"
                          max="128"
                          step="8"
                          value={iconData.dimensions.depth}
                          onChange={(e) =>
                            onUpdate({
                              dimensions: { ...iconData.dimensions, depth: Number.parseInt(e.target.value) },
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "export" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-3">Exportar Icono</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          const canvas = document.querySelector("canvas")
                          if (canvas) {
                            const link = document.createElement("a")
                            link.download = `icono-${iconData.dimensions.width}x${iconData.dimensions.height}.png`
                            link.href = canvas.toDataURL()
                            link.click()
                          }
                        }}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Descargar PNG
                      </button>

                      <button className="w-full bg-ash-gray-800/50 border border-ash-gray-600/50 text-ash-gray-300 hover:bg-green-500/20 hover:border-green-500/50 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" />
                        Guardar Proyecto
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Formatos Disponibles</h4>
                    <div className="text-ash-gray-400 text-sm space-y-1">
                      <div>• PNG (Transparente)</div>
                      <div>• ICO (Windows)</div>
                      <div>• ICNS (macOS)</div>
                      <div>• SVG (Vectorial)</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Información del Icono</h4>
                    <div className="bg-ash-gray-800/30 rounded-lg p-3 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-ash-gray-400">Resolución:</span>
                        <span className="text-white">
                          {iconData.dimensions.width}×{iconData.dimensions.height}px
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ash-gray-400">Formato:</span>
                        <span className="text-white">PNG 32-bit</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ash-gray-400">Transparencia:</span>
                        <span className="text-green-400">Sí</span>
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
