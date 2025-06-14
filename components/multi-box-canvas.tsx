"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Grid } from "@react-three/drei"
import { DirectInteractiveBox3D } from "./direct-interactive-box-3d"
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

interface MultiBoxCanvasProps {
  boxes: BoxData[]
  selectedBoxId: string | null
  selectedFaceId: string
  onBoxSelect: (boxId: string) => void
  onFaceSelect: (faceId: string) => void
  onBoxUpdate: (boxId: string, updates: any) => void
  onFaceUpdate: (boxId: string, faceId: string, updates: any) => void
}

export function MultiBoxCanvas({
  boxes,
  selectedBoxId,
  selectedFaceId,
  onBoxSelect,
  onFaceSelect,
  onBoxUpdate,
  onFaceUpdate,
}: MultiBoxCanvasProps) {
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
        camera={{ position: [5, 3, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 5, 5]} intensity={0.6} color="#ff6b35" />
          <pointLight position={[5, -5, -5]} intensity={0.4} color="#39ff14" />

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

          {/* Renderizar todas las cajas con interacción directa */}
          {boxes.map((box) => (
            <DirectInteractiveBox3D
              key={box.id}
              box={box}
              isSelected={selectedBoxId === box.id}
              selectedFaceId={selectedFaceId}
              onBoxSelect={onBoxSelect}
              onFaceSelect={onFaceSelect}
              onBoxUpdate={onBoxUpdate}
              onFaceUpdate={onFaceUpdate}
            />
          ))}

          <ContactShadows position={[0, -1.9, 0]} opacity={0.4} scale={15} blur={2} far={4} color="#000000" />

          <Environment preset="studio" background={false} />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={20}
            target={[0, 0, 0]}
            enableDamping={true}
            dampingFactor={0.05}
            touches={{
              ONE: 2, // ROTATE
              TWO: 1, // DOLLY (zoom)
            }}
            // Permitir que las cajas intercepten eventos cuando están seleccionadas
            enabled={!selectedBoxId}
          />
        </Suspense>
      </Canvas>

      {/* Header con logo - SEPARADO del video */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-ash-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-ash-gray-600/30 flex items-center gap-3">
          <img
            src="/logo-create-studio.png"
            alt="3DBox Studio"
            className="w-8 h-8"
            style={{
              filter: "drop-shadow(0 0 10px #39ff14)",
            }}
          />
          <div>
            <h2 className="text-xl font-bold text-white">3DBox Studio</h2>
            <p className="text-ash-gray-400 text-sm">Editor Profesional</p>
          </div>
        </div>
      </div>

      {/* Información de la escena */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="bg-green-500/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-green-500/30">
          <span className="text-green-400 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {boxes.length} {boxes.length === 1 ? "Caja" : "Cajas"}
          </span>
        </div>

        {selectedBoxId && (
          <div className="bg-neon-orange-500/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-neon-orange-500/30">
            <span className="text-neon-orange-400 text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-orange-400 rounded-full animate-pulse"></div>
              Seleccionada - Arrastra para mover
            </span>
          </div>
        )}
      </div>

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
              link.download = "cajas-3d.png"
              link.href = canvas.toDataURL()
              link.click()
            }
          }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          📸 Capturar
        </button>
      </div>

      {/* Controles de vista mejorados */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-ash-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-ash-gray-700/50">
          <div className="text-ash-gray-300 text-xs space-y-1 text-center">
            <div>
              🖱️ <strong>Click:</strong> Seleccionar caja/cara
            </div>
            <div>
              ✋ <strong>Arrastrar caja:</strong> Mover en 3D
            </div>
            <div>
              🔄 <strong>Arrastrar fondo:</strong> Rotar vista
            </div>
            <div>
              🔍 <strong>Scroll:</strong> Zoom
            </div>
            <div>
              📱 <strong>Touch:</strong> Compatible móvil
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
