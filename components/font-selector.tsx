"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function FontSelector() {
  const [selectedFont, setSelectedFont] = useState("Inter")

  const fonts = [
    { name: "Inter", style: "font-sans" },
    { name: "Roboto", style: "font-mono" },
    { name: "Playfair", style: "font-serif" },
    { name: "Oswald", style: "font-bold" },
    { name: "Lobster", style: "font-cursive" },
    { name: "Orbitron", style: "font-futuristic" },
  ]

  return (
    <div className="space-y-4">
      <h5 className="text-ash-gray-300 text-sm font-medium">Estilos de Letra</h5>

      <div className="space-y-2">
        {fonts.map((font) => (
          <Button
            key={font.name}
            variant={selectedFont === font.name ? "default" : "outline"}
            size="sm"
            className={`w-full justify-start text-left ${
              selectedFont === font.name
                ? "bg-neon-orange-500 hover:bg-neon-orange-600"
                : "bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
            }`}
            onClick={() => setSelectedFont(font.name)}
          >
            <span className={font.style}>{font.name}</span>
          </Button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-ash-gray-800/30 rounded-lg border border-ash-gray-600/30">
        <p className="text-ash-gray-400 text-xs mb-2">Vista previa:</p>
        <p className={`text-white text-lg ${fonts.find((f) => f.name === selectedFont)?.style}`}>3DBox Studio</p>
      </div>
    </div>
  )
}
