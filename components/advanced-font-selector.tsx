"use client"

import { useState } from "react"
import { Type, Download } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface AdvancedFontSelectorProps {
  selectedFont: string
  fontSize: number
  onFontChange: (font: string) => void
  onFontSizeChange: (size: number) => void
}

export function AdvancedFontSelector({
  selectedFont,
  fontSize,
  onFontChange,
  onFontSizeChange,
}: AdvancedFontSelectorProps) {
  const [previewText, setPreviewText] = useState("3DBox Studio")

  const systemFonts = [
    { name: "Arial", family: "Arial, sans-serif", category: "Sans-serif" },
    { name: "Helvetica", family: "Helvetica, Arial, sans-serif", category: "Sans-serif" },
    { name: "Times New Roman", family: "Times New Roman, serif", category: "Serif" },
    { name: "Georgia", family: "Georgia, serif", category: "Serif" },
    { name: "Courier New", family: "Courier New, monospace", category: "Monospace" },
    { name: "Verdana", family: "Verdana, sans-serif", category: "Sans-serif" },
    { name: "Trebuchet MS", family: "Trebuchet MS, sans-serif", category: "Sans-serif" },
    { name: "Impact", family: "Impact, sans-serif", category: "Display" },
  ]

  const webFonts = [
    {
      name: "Roboto",
      family: "Roboto, sans-serif",
      category: "Sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap",
    },
    {
      name: "Open Sans",
      family: "Open Sans, sans-serif",
      category: "Sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap",
    },
    {
      name: "Montserrat",
      family: "Montserrat, sans-serif",
      category: "Sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap",
    },
    {
      name: "Playfair Display",
      family: "Playfair Display, serif",
      category: "Serif",
      url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
    },
    {
      name: "Oswald",
      family: "Oswald, sans-serif",
      category: "Display",
      url: "https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&display=swap",
    },
    {
      name: "Lobster",
      family: "Lobster, cursive",
      category: "Script",
      url: "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
    },
    {
      name: "Orbitron",
      family: "Orbitron, monospace",
      category: "Futuristic",
      url: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap",
    },
    {
      name: "Bebas Neue",
      family: "Bebas Neue, cursive",
      category: "Display",
      url: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
    },
  ]

  const loadWebFont = (font: any) => {
    if (font.url && !document.querySelector(`link[href="${font.url}"]`)) {
      const link = document.createElement("link")
      link.href = font.url
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }
    onFontChange(font.family)
  }

  return (
    <div className="space-y-4">
      <div className="bg-ash-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-600/30">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Type className="w-4 h-4 text-neon-orange-500" />
          Selector de Fuentes
        </h4>

        {/* Tamaño de fuente */}
        <div className="mb-6">
          <label className="text-ash-gray-300 text-sm font-medium mb-2 block flex items-center justify-between">
            <span>Tamaño de Fuente</span>
            <span className="text-neon-orange-400 font-mono">{fontSize}px</span>
          </label>
          <Slider
            value={[fontSize]}
            onValueChange={([size]) => onFontSizeChange(size)}
            max={72}
            min={12}
            step={2}
            className="w-full"
          />
        </div>

        {/* Texto de vista previa */}
        <div className="mb-4">
          <label className="text-ash-gray-300 text-sm font-medium mb-2 block">Texto de Vista Previa</label>
          <input
            type="text"
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            className="w-full px-3 py-2 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white"
            placeholder="Escribe tu texto aquí..."
          />
        </div>

        {/* Fuentes del sistema */}
        <div className="mb-6">
          <h5 className="text-ash-gray-300 text-sm font-medium mb-3">Fuentes del Sistema</h5>
          <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
            {systemFonts.map((font) => (
              <button
                key={font.name}
                onClick={() => onFontChange(font.family)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedFont === font.family
                    ? "bg-neon-orange-500/20 border border-neon-orange-500/50"
                    : "bg-ash-gray-800/30 hover:bg-ash-gray-700/50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium" style={{ fontFamily: font.family }}>
                      {font.name}
                    </p>
                    <p className="text-ash-gray-400 text-xs">{font.category}</p>
                  </div>
                  <div className="text-ash-gray-300 text-sm" style={{ fontFamily: font.family, fontSize: "16px" }}>
                    Aa
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Google Fonts */}
        <div className="mb-6">
          <h5 className="text-ash-gray-300 text-sm font-medium mb-3 flex items-center gap-2">
            Google Fonts
            <Download className="w-3 h-3" />
          </h5>
          <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
            {webFonts.map((font) => (
              <button
                key={font.name}
                onClick={() => loadWebFont(font)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedFont === font.family
                    ? "bg-neon-orange-500/20 border border-neon-orange-500/50"
                    : "bg-ash-gray-800/30 hover:bg-ash-gray-700/50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{font.name}</p>
                    <p className="text-ash-gray-400 text-xs">{font.category}</p>
                  </div>
                  <div className="text-ash-gray-300 text-sm">Aa</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Vista previa grande */}
        <div className="bg-ash-gray-800/50 rounded-xl p-6 border border-ash-gray-600/30">
          <p className="text-ash-gray-400 text-xs mb-2">Vista Previa:</p>
          <div
            className="text-white text-center py-4"
            style={{
              fontFamily: selectedFont,
              fontSize: `${Math.min(fontSize, 32)}px`,
              lineHeight: "1.2",
            }}
          >
            {previewText}
          </div>
          <div className="mt-3 pt-3 border-t border-ash-gray-700/50">
            <p className="text-ash-gray-500 text-xs">
              <strong>Fuente:</strong> {selectedFont}
            </p>
            <p className="text-ash-gray-500 text-xs">
              <strong>Tamaño:</strong> {fontSize}px
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
