"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Grid } from "@react-three/drei"
import { AdvancedBox3D } from "./advanced-box-3d"
import { Suspense } from "react"

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

interface AdvancedCanvas3DProps {
  boxes: BoxData[]
  selectedBoxId: string | null
  onBoxSelect: (id: string) => void
}

export function AdvancedCanvas3D({ boxes, selectedBoxId, onBoxSelect }: AdvancedCanvas3DProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-ash-gray-900 to-ash-gray-800 relative">
      <div className="absolute inset-4 bg-ash-gray-800/20 backdrop-blur-sm rounded-3xl border border-ash-gray-700/30 shadow-glass overflow-hidden">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }} shadows>
          <Suspense fallback={null}>
            {/* Iluminación mejorada */}
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ff6b35" />
            <pointLight position={[10, -10, 10]} intensity={0.3} color="#00ff80" />

            {/* Grid de referencia */}
            <Grid
              position={[0, -2, 0]}
              args={[20, 20]}
              cellSize={1}
              cellThickness={0.5}
              cellColor="#333333"
              sectionSize={5}
              sectionThickness={1}
              sectionColor="#555555"
              fadeDistance={25}
              fadeStrength={1}
            />

            {/* Renderizar todas las cajas */}
            {boxes.map((box) => (
              <AdvancedBox3D
                key={box.id}
                id={box.id}
                position={box.position}
                dimensions={box.dimensions}
                faces={box.faces}
                isSelected={selectedBoxId === box.id}
                onClick={() => onBoxSelect(box.id)}
              />
            ))}

            <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={15} blur={2} far={4} />

            <Environment preset="studio" />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={20}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Controles de vista */}
      <div className="absolute top-8 right-8 space-y-2">
        <div className="bg-neon-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-neon-orange-500/30">
          <span className="text-neon-orange-400 text-sm font-medium">
            {boxes.length} {boxes.length === 1 ? "Caja" : "Cajas"}
          </span>
        </div>
        {selectedBoxId && (
          <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-green-500/30">
            <span className="text-green-400 text-sm font-medium">Caja Seleccionada</span>
          </div>
        )}
      </div>
    </div>
  )
}
