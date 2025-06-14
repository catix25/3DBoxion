"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { Box3D } from "./box-3d"
import { Suspense } from "react"

interface Canvas3DProps {
  selectedImage: string | null
  dimensions: { width: number; height: number; depth: number }
}

export function Canvas3D({ selectedImage, dimensions }: Canvas3DProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-ash-gray-900 to-ash-gray-800 relative">
      {/* Contenedor con efecto glass */}
      <div className="absolute inset-4 bg-ash-gray-800/20 backdrop-blur-sm rounded-3xl border border-ash-gray-700/30 shadow-glass overflow-hidden">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff6b35" />

            <Box3D image={selectedImage} dimensions={dimensions} />

            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />

            <Environment preset="studio" />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Suspense>
        </Canvas>
      </div>

      {/* Indicadores de esquina */}
      <div className="absolute top-8 right-8 bg-neon-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-neon-orange-500/30">
        <span className="text-neon-orange-400 text-sm font-medium">Vista 3D Activa</span>
      </div>
    </div>
  )
}
