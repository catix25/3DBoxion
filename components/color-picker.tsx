"use client"

import { useState } from "react"

export function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#ff6b35")

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
    "#ff0080",
    "#00ff80",
    "#8000ff",
    "#ff8000",
  ]

  const neonColors = ["#ff073a", "#39ff14", "#ff073a", "#ffff00", "#00ffff", "#ff00ff", "#ff4500", "#adff2f"]

  return (
    <div className="space-y-4">
      <div>
        <h5 className="text-ash-gray-300 text-sm font-medium mb-2">Colores Estándar</h5>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                selectedColor === color ? "border-white" : "border-ash-gray-600"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-ash-gray-300 text-sm font-medium mb-2">Colores Neón</h5>
        <div className="grid grid-cols-4 gap-2">
          {neonColors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 shadow-neon ${
                selectedColor === color ? "border-white" : "border-ash-gray-600"
              }`}
              style={{
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}50`,
              }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-ash-gray-300 text-sm font-medium mb-2">Color Personalizado</h5>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-ash-gray-600 bg-ash-gray-800"
        />
      </div>
    </div>
  )
}
