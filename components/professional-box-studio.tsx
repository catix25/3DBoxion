"use client"

import { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { ProfessionalBox3D } from "./professional-box-3d"
import { ToolPanel } from "./tool-panel"
import { TopBar } from "./top-bar"

export function ProfessionalBoxStudio() {
  const [boxData, setBoxData] = useState({
    front: {
      background: "linear-gradient(135deg, #e8f4f8, #d1ecf1)",
      pattern: "geometric",
      title: "ChatMarketer",
      subtitle: "2025",
      titleColor: "#ff6b35",
      subtitleColor: "#ff8c42",
      logo: null as string | null,
      elements: [] as any[],
    },
    back: {
      background: "#f0f0f0",
      text: "Información del producto",
      textColor: "#333",
    },
    spine: {
      background: "#ff6b35",
      text: "ChatMarketer 2025",
      textColor: "#fff",
    },
    dimensions: { width: 190, height: 270, depth: 25 },
  })

  const canvasRef = useRef<any>(null)

  const updateBoxData = (updates: any) => {
    setBoxData((prev) => ({ ...prev, ...updates }))
  }

  const captureImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.gl.domElement
      const link = document.createElement("a")
      link.download = "caja-3d.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <TopBar onCapture={captureImage} />

      <div className="flex-1 flex">
        {/* Canvas 3D */}
        <div className="flex-1 relative">
          <Canvas
            ref={canvasRef}
            camera={{ position: [3, 2, 5], fov: 45 }}
            gl={{ preserveDrawingBuffer: true, antialias: true }}
            style={{ touchAction: "none" }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-5, 5, 5]} intensity={0.6} color="#ff6b35" />

            <ProfessionalBox3D boxData={boxData} />

            <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={10} blur={2} far={4} />

            <Environment preset="sunset" background={false} />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={15}
              touches={{
                ONE: 2, // ROTATE
                TWO: 1, // DOLLY
              }}
            />
          </Canvas>

          {/* Overlay con instrucciones */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
            <div>📱 Touch: Rotar vista</div>
            <div>🔍 Pinch: Zoom</div>
          </div>
        </div>

        {/* Panel de herramientas */}
        <ToolPanel boxData={boxData} onUpdate={updateBoxData} />
      </div>
    </div>
  )
}
