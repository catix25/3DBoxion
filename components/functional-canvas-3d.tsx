"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Grid } from "@react-three/drei"
import { WorkingBox3D } from "./working-box-3d"
import { Suspense } from "react"

interface BoxData {
  id: string
  position: [number, number, number]
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

interface FunctionalCanvas3DProps {
  boxes: BoxData[]
  selectedBoxId: string | null
  onBoxSelect: (id: string) => void
}

export function FunctionalCanvas3D({ boxes, selectedBoxId, onBoxSelect }: FunctionalCanvas3DProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-ash-gray-800 via-ash-gray-900 to-black relative">
      <div className="absolute inset-4 bg-gradient-to-b from-ash-gray-800/20 via-ash-gray-900/30 to-black/50 backdrop-blur-sm rounded-3xl border border-ash-gray-700/30 shadow-glass overflow-hidden">
        <Canvas
          camera={{ position: [5, 4, 8], fov: 45 }}
          shadows={{ type: "PCFSoftShadowMap" }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            {/* Iluminación profesional */}
            <ambientLight intensity={0.3} color="#ffffff" />

            <directionalLight
              position={[10, 15, 10]}
              intensity={1.8}
              castShadow
              shadow-mapSize-width={4096}
              shadow-mapSize-height={4096}
              shadow-camera-far={50}
              shadow-camera-left={-15}
              shadow-camera-right={15}
              shadow-camera-top={15}
              shadow-camera-bottom={-15}
              shadow-bias={-0.0001}
            />

            <directionalLight position={[-8, 10, -8]} intensity={0.6} color="#4a9eff" />
            <pointLight position={[0, 8, 8]} intensity={0.8} color="#39ff14" distance={25} decay={2} />
            <pointLight position={[-10, 3, 0]} intensity={0.5} color="#ff6b35" distance={20} decay={2} />

            {/* Superficie reflectante */}
            <mesh position={[0, -2.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[100, 100]} />
              <meshPhysicalMaterial
                color="#0a0a0a"
                roughness={0.05}
                metalness={0.9}
                reflectivity={0.95}
                transparent
                opacity={0.9}
              />
            </mesh>

            {/* Grid de referencia */}
            <Grid
              position={[0, -2.49, 0]}
              args={[50, 50]}
              cellSize={1}
              cellThickness={0.5}
              cellColor="#333333"
              sectionSize={10}
              sectionThickness={1}
              sectionColor="#555555"
              fadeDistance={40}
              fadeStrength={1}
              infiniteGrid
            />

            {/* Renderizar cajas */}
            {boxes.map((box) => (
              <WorkingBox3D
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

            <ContactShadows position={[0, -2.4, 0]} opacity={0.9} scale={25} blur={2} far={8} color="#000000" />

            <Environment preset="studio" background={false} />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={30}
              maxPolarAngle={Math.PI / 2.1}
              minPolarAngle={Math.PI / 8}
              autoRotate={false}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Información de la escena */}
      <div className="absolute top-6 right-6 space-y-3">
        <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-green-500/30">
          <span className="text-green-400 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {boxes.length} {boxes.length === 1 ? "Caja" : "Cajas"} Activas
          </span>
        </div>

        {selectedBoxId && (
          <div className="bg-gradient-to-r from-neon-orange-500/20 to-neon-orange-400/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-neon-orange-500/30">
            <span className="text-neon-orange-400 text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-orange-400 rounded-full animate-pulse"></div>
              Caja Seleccionada
            </span>
          </div>
        )}
      </div>

      {/* Controles de cámara */}
      <div className="absolute bottom-6 left-6 bg-ash-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-700/50">
        <div className="text-ash-gray-300 text-xs space-y-2">
          <div className="font-medium text-white mb-2">Controles de Vista:</div>
          <div>🖱️ Click: Seleccionar caja</div>
          <div>🔄 Arrastrar: Rotar vista</div>
          <div>🔍 Scroll: Zoom in/out</div>
          <div>⌨️ Shift + Arrastrar: Mover vista</div>
        </div>
      </div>

      {/* Botón de captura */}
      <div className="absolute bottom-6 right-6">
        <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2">
          📸 Tomar Captura
        </button>
      </div>
    </div>
  )
}
