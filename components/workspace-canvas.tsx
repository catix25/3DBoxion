"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { WorkspaceBox3D } from "./workspace-box-3d"
import { Suspense } from "react"

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

interface WorkspaceCanvasProps {
  box: BoxData
  selectedFaceId: string
  onFaceSelect: (faceId: string) => void
  onBoxUpdate: (updates: Partial<BoxData>) => void
  onFaceUpdate: (faceId: string, updates: any) => void
}

export function WorkspaceCanvas({
  box,
  selectedFaceId,
  onFaceSelect,
  onBoxUpdate,
  onFaceUpdate,
}: WorkspaceCanvasProps) {
  const faceNames: Record<string, string> = {
    front: "Frontal",
    back: "Trasera",
    left: "Izquierda",
    right: "Derecha",
    top: "Superior",
    bottom: "Inferior",
  }

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-ash-gray-900 via-ash-gray-800 to-ash-gray-900">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 5, 5]} intensity={0.6} color="#ff6b35" />

          <WorkspaceBox3D
            box={box}
            selectedFaceId={selectedFaceId}
            onFaceSelect={onFaceSelect}
            onFaceUpdate={onFaceUpdate}
          />

          <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={8} blur={2} far={4} color="#000000" />

          <Environment preset="studio" background={false} />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            target={[0, 0, 0]}
            enableDamping={true}
            dampingFactor={0.05}
            touches={{
              ONE: 2, // ROTATE
              TWO: 1, // DOLLY (zoom)
            }}
          />
        </Suspense>
      </Canvas>

      {/* Indicador de cara */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-ash-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-ash-gray-600/30">
          <span className="text-ash-gray-300 text-sm">
            Cara: <span className="text-white font-medium">{faceNames[selectedFaceId]}</span>
          </span>
        </div>
      </div>

      {/* Botón de captura */}
      <div className="absolute bottom-4 right-4 z-10">
        <button
          onClick={() => {
            const canvas = document.querySelector("canvas")
            if (canvas) {
              const link = document.createElement("a")
              link.download = "caja-3d.png"
              link.href = canvas.toDataURL()
              link.click()
            }
          }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          📸 Capturar
        </button>
      </div>
    </div>
  )
}
