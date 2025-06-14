"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { RealIcon3D } from "./real-icon-3d"
import { IconTools } from "./icon-tools"
import { Suspense } from "react"

export function IconGenerator() {
  const [iconData, setIconData] = useState({
    id: "icon-1",
    dimensions: { width: 512, height: 512, depth: 64 },
    shape: "rounded" as "square" | "rounded" | "circle",
    cornerRadius: 128,
    background: "#4a90e2",
    foreground: "#ffffff",
    text: "APP",
    fontSize: 180,
    fontFamily: "Arial, sans-serif",
    texture: null as string | null,
    style: "gradient" as "flat" | "gradient" | "glass" | "metal",
    shadow: true,
    glow: true,
  })

  const updateIconData = (updates: Partial<typeof iconData>) => {
    setIconData((prev) => ({ ...prev, ...updates }))
  }

  // Presets de iconos comunes
  const iconPresets = [
    {
      name: "App iOS",
      dimensions: { width: 1024, height: 1024, depth: 128 },
      shape: "rounded" as const,
      cornerRadius: 228,
      style: "gradient" as const,
    },
    {
      name: "App Android",
      dimensions: { width: 512, height: 512, depth: 64 },
      shape: "rounded" as const,
      cornerRadius: 64,
      style: "gradient" as const,
    },
    {
      name: "Windows",
      dimensions: { width: 256, height: 256, depth: 32 },
      shape: "square" as const,
      cornerRadius: 0,
      style: "flat" as const,
    },
    {
      name: "macOS",
      dimensions: { width: 1024, height: 1024, depth: 128 },
      shape: "rounded" as const,
      cornerRadius: 180,
      style: "glass" as const,
    },
    {
      name: "Favicon",
      dimensions: { width: 64, height: 64, depth: 8 },
      shape: "square" as const,
      cornerRadius: 0,
      style: "flat" as const,
    },
    {
      name: "PWA",
      dimensions: { width: 512, height: 512, depth: 64 },
      shape: "rounded" as const,
      cornerRadius: 96,
      style: "gradient" as const,
    },
  ]

  return (
    <div className="h-full overflow-hidden bg-gradient-to-br from-ash-gray-900 to-ash-gray-800">
      <div className="h-full flex">
        {/* Canvas 3D */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
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

              <RealIcon3D iconData={iconData} />

              <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={8} blur={2} far={4} color="#000000" />

              <Environment preset="studio" background={false} />

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={3}
                maxDistance={15}
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

          {/* Header del generador con logo */}
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
                <h2 className="text-2xl font-bold text-white mb-1">Generador de Iconos 3D</h2>
                <p className="text-ash-gray-400 text-sm">Crea iconos profesionales para aplicaciones</p>
              </div>
            </div>
          </div>

          {/* Información del icono */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-cyan-500/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-cyan-500/30">
              <span className="text-cyan-400 text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                {iconData.dimensions.width}×{iconData.dimensions.height}px
              </span>
            </div>
          </div>

          {/* Presets rápidos */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-ash-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-ash-gray-600/30">
              <h4 className="text-white font-medium mb-2 text-sm">Presets Rápidos:</h4>
              <div className="flex gap-2 flex-wrap">
                {iconPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      updateIconData({
                        dimensions: preset.dimensions,
                        shape: preset.shape,
                        cornerRadius: preset.cornerRadius,
                        style: preset.style,
                      })
                    }
                    className="bg-ash-gray-700/50 hover:bg-cyan-500/20 text-ash-gray-300 hover:text-cyan-400 px-2 py-1 rounded text-xs transition-colors border border-ash-gray-600/50 hover:border-cyan-500/50"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Botón de captura */}
          <div className="absolute bottom-4 right-4 z-10">
            <button
              onClick={() => {
                const canvas = document.querySelector("canvas")
                if (canvas) {
                  const link = document.createElement("a")
                  link.download = `icono-3d-${iconData.dimensions.width}x${iconData.dimensions.height}.png`
                  link.href = canvas.toDataURL()
                  link.click()
                }
              }}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              📸 Exportar Icono
            </button>
          </div>

          {/* Controles de vista */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-ash-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-ash-gray-700/50">
              <div className="text-ash-gray-300 text-xs space-y-1 text-center">
                <div>🖱️ Arrastrar: Rotar icono</div>
                <div>🔍 Scroll: Zoom</div>
                <div>📱 Touch: Compatible móvil</div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de herramientas */}
        <IconTools iconData={iconData} onUpdate={updateIconData} />
      </div>
    </div>
  )
}
