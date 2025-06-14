"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { WorkspaceBox3D } from "./workspace-box-3d"
import { Suspense, useState } from "react"
import { RotateCcw, Maximize2, ZoomIn, ZoomOut, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5])
  const [autoRotate, setAutoRotate] = useState(false)

  const resetView = () => {
    setCameraPosition([0, 0, 5])
  }

  const takeScreenshot = () => {
    // Función para tomar captura de pantalla
    console.log("Tomando captura de pantalla...")
  }

  const faceNames: Record<string, string> = {
    front: "Frontal",
    back: "Trasera",
    left: "Izquierda",
    right: "Derecha",
    top: "Superior",
    bottom: "Inferior",
  }

  return (
    <div className="flex-1 relative bg-gradient-to-br from-ash-gray-900 via-ash-gray-800 to-ash-gray-900">
      {/* Zona de trabajo principal */}
      <div className="absolute inset-4 bg-gradient-to-b from-ash-gray-800/20 via-ash-gray-900/30 to-black/50 backdrop-blur-sm rounded-3xl border border-ash-gray-700/30 shadow-glass overflow-hidden">
        <Canvas camera={{ position: cameraPosition, fov: 50 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            {/* Iluminación profesional */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-5, 5, 5]} intensity={0.6} color="#ff6b35" />

            {/* Caja 3D principal */}
            <WorkspaceBox3D
              box={box}
              selectedFaceId={selectedFaceId}
              onFaceSelect={onFaceSelect}
              onFaceUpdate={onFaceUpdate}
            />

            {/* Sombras */}
            <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={8} blur={2} far={4} color="#000000" />

            <Environment preset="studio" background={false} />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={2}
              minDistance={2}
              maxDistance={10}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        {/* Controles flotantes superiores */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          <Button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-12 h-12 rounded-full backdrop-blur-sm border ${
              autoRotate
                ? "bg-neon-orange-500/80 hover:bg-neon-orange-600/80 border-neon-orange-500/30"
                : "bg-ash-gray-700/80 hover:bg-ash-gray-600/80 border-ash-gray-500/30"
            }`}
            title="Auto rotar"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </Button>

          <Button
            onClick={resetView}
            className="w-12 h-12 rounded-full bg-ash-gray-700/80 hover:bg-ash-gray-600/80 backdrop-blur-sm border border-ash-gray-500/30"
            title="Resetear vista"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </Button>

          <Button
            onClick={takeScreenshot}
            className="w-12 h-12 rounded-full bg-ash-gray-700/80 hover:bg-ash-gray-600/80 backdrop-blur-sm border border-ash-gray-500/30"
            title="Tomar captura"
          >
            <Camera className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Controles de zoom laterales */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          <Button
            className="w-10 h-10 rounded-full bg-ash-gray-700/80 hover:bg-ash-gray-600/80 backdrop-blur-sm border border-ash-gray-500/30"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-white" />
          </Button>

          <Button
            className="w-10 h-10 rounded-full bg-ash-gray-700/80 hover:bg-ash-gray-600/80 backdrop-blur-sm border border-ash-gray-500/30"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-white" />
          </Button>
        </div>

        {/* Indicador de cara seleccionada */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-neon-orange-500/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-neon-orange-500/30">
            <span className="text-neon-orange-400 font-medium">
              Cara seleccionada:{" "}
              <span className="text-white font-semibold">{faceNames[selectedFaceId] || selectedFaceId}</span>
            </span>
          </div>
        </div>

        {/* Instrucciones de uso */}
        <div className="absolute top-6 right-6 bg-ash-gray-800/60 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
          <div className="space-y-1">
            <div>🖱️ Click: Seleccionar cara</div>
            <div>🔄 Arrastrar: Rotar</div>
            <div>🔍 Scroll: Zoom</div>
          </div>
        </div>
      </div>
    </div>
  )
}
