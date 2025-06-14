"use client"

import { useRef, useState, useMemo } from "react"
import * as THREE from "three"
// Agregar useFrame para animación suave
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

  // Después de const [hoveredFace, setHoveredFace] = useState<string | null>(null)
  // Agregar animación de rotación suave
  useFrame((state) => {
    if (meshRef.current && selectedFaceId) {
      meshRef.current.rotation.y += 0.005
    }
  })

  // Crear texturas para cada cara
  const textures = useMemo(() => {
    return box.faces.map((face) => {
      const canvas = document.createElement("canvas")
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Fondo
        if (face.texture) {
          // Si hay imagen, cargarla
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            ctx.drawImage(img, 0, 0, 512, 512)
          }
          img.src = face.texture
        } else if (face.text || face.color) {
          // Fondo con color
          ctx.fillStyle = face.color || "#f0f0f0"
          ctx.fillRect(0, 0, 512, 512)

          // Texto
          if (face.text) {
            ctx.fillStyle = "#333333"
            ctx.font = `${face.fontSize || 24}px ${face.fontFamily || "Arial"}`
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            // Texto con sombra
            ctx.shadowColor = "rgba(0,0,0,0.3)"
            ctx.shadowBlur = 2
            ctx.shadowOffsetX = 1
            ctx.shadowOffsetY = 1

            ctx.fillText(face.text, 256, 256)
          }
        } else {
          // Estado "No Image"
          ctx.fillStyle = "#f8f9fa"
          ctx.fillRect(0, 0, 512, 512)

          // Texto "No Image"
          ctx.fillStyle = "#9ca3af"
          ctx.font = "24px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText("No Image", 256, 256)
        }

        // Borde si está seleccionada o hover
        if (face.id === selectedFaceId) {
          ctx.strokeStyle = "#3b82f6"
          ctx.lineWidth = 8
          ctx.strokeRect(4, 4, 504, 504)
        } else if (face.id === hoveredFace) {
          ctx.strokeStyle = "#60a5fa"
          ctx.lineWidth = 4
          ctx.strokeRect(2, 2, 508, 508)
        }
      }

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      return texture
    })
  }, [box.faces, selectedFaceId, hoveredFace])

  // Dimensiones escaladas
  const scale = 0.01
  const boxDimensions: [number, number, number] = [
    box.dimensions.width * scale,
    box.dimensions.height * scale,
    box.dimensions.depth * scale,
  ]

  // Mapeo de caras (orden Three.js: +X, -X, +Y, -Y, +Z, -Z)
  const faceMapping = ["right", "left", "top", "bottom", "front", "back"]

  const materials = faceMapping.map((faceId, index) => {
    const face = box.faces.find((f) => f.id === faceId)
    const textureIndex = box.faces.findIndex((f) => f.id === faceId)
    const texture = textures[textureIndex]

    return <meshStandardMaterial key={index} map={texture} roughness={0.1} metalness={0.05} transparent={false} />
  })

  const handleFaceClick = (event: any) => {
    event.stopPropagation()

    // Determinar qué cara fue clickeada basado en la normal
    const face = event.face
    if (face) {
      const normal = face.normal
      let clickedFaceId = "front"

      // Determinar la cara basada en la normal
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

      {/* Wireframe para la cara seleccionada */}
      {selectedFaceId && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...boxDimensions)]} />
          <lineBasicMaterial color="#fbbf24" linewidth={2} />
        </lineSegments>
      )}
    </group>
  )
}
