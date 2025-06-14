"use client"

import { useRef, useState, useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

interface BoxFace {
  id: string
  name: string
  texture: string | null
  color: string
  text: string
  fontSize: number
  fontFamily: string
}

interface BoxData {
  id: string
  dimensions: { width: number; height: number; depth: number }
  faces: BoxFace[]
  boxType: "software" | "dvd" | "cd" | "icon" | "desktop"
}

interface WorkspaceBox3DProps {
  box: BoxData
  selectedFaceId: string
  onFaceSelect: (faceId: string) => void
  onFaceUpdate: (faceId: string, updates: any) => void
}

export function WorkspaceBox3D({ box, selectedFaceId, onFaceSelect, onFaceUpdate }: WorkspaceBox3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hoveredFace, setHoveredFace] = useState<string | null>(null)

  useFrame((state) => {
    if (meshRef.current && selectedFaceId) {
      meshRef.current.rotation.y += 0.005
    }
  })

  // Crear texturas para TODOS los 6 lados
  const textures = useMemo(() => {
    const faceOrder = ["right", "left", "top", "bottom", "front", "back"]

    return faceOrder.map((faceId) => {
      const face = box.faces.find((f) => f.id === faceId)
      if (!face) return null

      const canvas = document.createElement("canvas")
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Fondo con color o gradiente
        if (face.color.includes("gradient")) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 512)
          gradient.addColorStop(0, "#ff6b35")
          gradient.addColorStop(1, "#ff8c42")
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = face.color || "#f0f0f0"
        }
        ctx.fillRect(0, 0, 512, 512)

        // Texto si existe
        if (face.text) {
          ctx.fillStyle = "#333333"
          ctx.font = `${face.fontSize || 24}px ${face.fontFamily || "Arial"}`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.shadowColor = "rgba(0,0,0,0.3)"
          ctx.shadowBlur = 2
          ctx.shadowOffsetX = 1
          ctx.shadowOffsetY = 1
          ctx.fillText(face.text, 256, 256)
        }

        // Imagen si existe
        if (face.texture) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            ctx.globalAlpha = 0.8
            ctx.drawImage(img, 0, 0, 512, 512)
          }
          img.src = face.texture
        }

        // Borde si está seleccionada
        if (face.id === selectedFaceId) {
          ctx.strokeStyle = "#39ff14"
          ctx.lineWidth = 8
          ctx.strokeRect(4, 4, 504, 504)
        } else if (face.id === hoveredFace) {
          ctx.strokeStyle = "#ff6b35"
          ctx.lineWidth = 4
          ctx.strokeRect(2, 2, 508, 508)
        }
      }

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      return texture
    })
  }, [box.faces, selectedFaceId, hoveredFace])

  // Dimensiones según el tipo
  const getBoxDimensions = (): [number, number, number] => {
    const scale = 0.01

    if (box.boxType === "icon") {
      // Icono cuadrado/redondo
      const size = Math.max(box.dimensions.width, box.dimensions.height) * scale
      return [size, size, box.dimensions.depth * scale * 0.5]
    }

    return [box.dimensions.width * scale, box.dimensions.height * scale, box.dimensions.depth * scale]
  }

  const boxDimensions = getBoxDimensions()

  // Materiales para cada cara
  const materials = textures.map((texture, index) => (
    <meshPhysicalMaterial
      key={index}
      map={texture}
      roughness={0.1}
      metalness={0.05}
      clearcoat={0.3}
      clearcoatRoughness={0.1}
      reflectivity={0.2}
    />
  ))

  const handleFaceClick = (event: any) => {
    event.stopPropagation()
    const face = event.face
    if (face) {
      const normal = face.normal
      let clickedFaceId = "front"

      if (Math.abs(normal.x) > Math.abs(normal.y) && Math.abs(normal.x) > Math.abs(normal.z)) {
        clickedFaceId = normal.x > 0 ? "right" : "left"
      } else if (Math.abs(normal.y) > Math.abs(normal.z)) {
        clickedFaceId = normal.y > 0 ? "top" : "bottom"
      } else {
        clickedFaceId = normal.z > 0 ? "front" : "back"
      }

      onFaceSelect(clickedFaceId)
    }
  }

  return (
    <group>
      {box.boxType === "icon" ? (
        // Icono redondo/cuadrado
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onClick={handleFaceClick}
          onPointerOver={(e) => {
            e.stopPropagation()
            document.body.style.cursor = "pointer"
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default"
            setHoveredFace(null)
          }}
        >
          <cylinderGeometry args={[boxDimensions[0] / 2, boxDimensions[0] / 2, boxDimensions[2], 32]} />
          <meshPhysicalMaterial
            map={textures[4]} // Usar textura del frente
            roughness={0.1}
            metalness={0.05}
            clearcoat={0.5}
          />
        </mesh>
      ) : (
        // Caja normal con 6 caras
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onClick={handleFaceClick}
          onPointerOver={(e) => {
            e.stopPropagation()
            document.body.style.cursor = "pointer"
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default"
            setHoveredFace(null)
          }}
        >
          <boxGeometry args={boxDimensions} />
          {materials}
        </mesh>
      )}

      {/* Wireframe para selección */}
      {selectedFaceId && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...boxDimensions)]} />
          <lineBasicMaterial color="#39ff14" linewidth={2} />
        </lineSegments>
      )}
    </group>
  )
}
