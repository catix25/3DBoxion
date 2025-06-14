"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Grid } from "@react-three/drei"
import { RealisticBox3D } from "./realistic-box-3d"
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
  boxType: "software" | "dvd" | "cd" | "icon" | "desktop"
}

interface EnhancedCanvas3DProps {
  boxes: BoxData[]
  selectedBoxId: string | null
  onBoxSelect: (id: string) => void
}

export function EnhancedCanvas3D({ boxes, selectedBoxId, onBoxSelect }: EnhancedCanvas3DProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-ash-gray-800 via-ash-gray-900 to-black relative">
      <div className="absolute inset-4 bg-gradient-to-b from-ash-gray-800/20 via-ash-gray-900/30 to-black/50 backdrop-blur-sm rounded-3xl border border-ash-gray-700/30 shadow-glass overflow-hidden">
        <Canvas
          camera={{ position: [4, 3, 6], fov: 45 }}
          shadows={{ type: "PCFSoftShadowMap" }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            {/* Iluminación profesional similar al 3D Box Maker */}
            <ambientLight intensity={0.2} color="#ffffff" />

            {/* Luz principal */}
            <directionalLight
              position={[8, 12, 8]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={4096}
              shadow-mapSize-height={4096}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
              shadow-bias={-0.0001}
            />

            {/* Luz de relleno */}
            <directionalLight position={[-5, 8, -5]} intensity={0.8} color="#4a9eff" />

            {/* Luz de acento */}
            <pointLight position={[0, 5, 5]} intensity={0.6} color="#39ff14" distance={20} decay={2} />

            {/* Luz de ambiente lateral */}
            <pointLight position={[-8, 2, 0]} intensity={0.4} color="#ff6b35" distance={15} decay={2} />

            {/* Grid de referencia mejorado */}
            <Grid
              position={[0, -2.5, 0]}
              args={[30, 30]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#333333"
              sectionSize={5}
              sectionThickness={1}
              sectionColor="#555555"
              fadeDistance={30}
              fadeStrength={1}
              infiniteGrid
            />

            {/* Superficie reflectante */}
            <mesh position={[0, -2.49, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[50, 50]} />
              <meshPhysicalMaterial
                color="#1a1a1a"
                roughness={0.1}
                metalness={0.8}
                reflectivity={0.9}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* Renderizar todas las cajas */}
            {boxes.map((box) => (
              <RealisticBox3D
                key={box.id}
                id={box.id}
                position={box.position}
                dimensions={box.dimensions}
                faces={box.faces}
                isSelected={selectedBoxId === box.id}
                onClick={() => onBoxSelect(box.id)}
                boxType={box.boxType}
              />
            ))}

            {/* Sombras de contacto mejoradas */}
            <ContactShadows position={[0, -2.4, 0]} opacity={0.8} scale={20} blur={2} far={6} color="#000000" />

            {/* Environment con HDR */}
            <Environment preset="studio" background={false} />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={25}
              maxPolarAngle={Math.PI / 2.2}
              minPolarAngle={Math.PI / 6}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Información de la escena */}
      <div className="absolute top-6 right-6 space-y-3">
        <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-green-500/30">
          <span className="text-green-400 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {boxes.length} {boxes.length === 1 ? "Caja" : "Cajas"}
          </span>
        </div>

        {selectedBoxId && (
          <div className="bg-gradient-to-r from-neon-orange-500/20 to-neon-orange-400/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-neon-orange-500/30">
            <span className="text-neon-orange-400 text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-orange-400 rounded-full"></div>
              Seleccionada
            </span>
          </div>
        )}
      </div>

      {/* Controles de vista */}
      <div className="absolute bottom-6 right-6 bg-ash-gray-800/80 backdrop-blur-sm rounded-2xl p-3 border border-ash-gray-700/50">
        <div className="text-ash-gray-300 text-xs space-y-1">
          <div>🖱️ Click: Seleccionar caja</div>
          <div>🔄 Arrastrar: Rotar vista</div>
          <div>🔍 Scroll: Zoom</div>
        </div>
      </div>
    </div>
  )
}
