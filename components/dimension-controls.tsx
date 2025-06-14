"use client"

import { Slider } from "@/components/ui/slider"

interface DimensionControlsProps {
  dimensions: { width: number; height: number; depth: number }
  onChange: (dimensions: { width: number; height: number; depth: number }) => void
}

export function DimensionControls({ dimensions, onChange }: DimensionControlsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-ash-gray-300 text-sm font-medium mb-2 block">Ancho: {dimensions.width}px</label>
        <Slider
          value={[dimensions.width]}
          onValueChange={([width]) => onChange({ ...dimensions, width })}
          max={400}
          min={50}
          step={10}
          className="w-full"
        />
      </div>

      <div>
        <label className="text-ash-gray-300 text-sm font-medium mb-2 block">Alto: {dimensions.height}px</label>
        <Slider
          value={[dimensions.height]}
          onValueChange={([height]) => onChange({ ...dimensions, height })}
          max={400}
          min={50}
          step={10}
          className="w-full"
        />
      </div>

      <div>
        <label className="text-ash-gray-300 text-sm font-medium mb-2 block">Profundidad: {dimensions.depth}px</label>
        <Slider
          value={[dimensions.depth]}
          onValueChange={([depth]) => onChange({ ...dimensions, depth })}
          max={50}
          min={5}
          step={5}
          className="w-full"
        />
      </div>
    </div>
  )
}
