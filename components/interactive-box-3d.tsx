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
  position: [number, number, number]
  dimensions: { width: number; height: number; depth: number }
  faces: BoxFace[]
  boxType: "software" | "dvd" | "cd" | "icon" | "desktop"
}

interface InteractiveBox3DProps {
  box: BoxData
  isSelected: boolean
  selectedFaceId: string
  onBoxSelect: (boxId: string) => void
  onFaceSelect: (faceId: string) => void
}

export function InteractiveBox3D({
  box,
  isSelected,
  selectedFaceId,
  onBoxSelect,
  onFaceSelect,
}: InteractiveBox3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      if (isSelected) {
        meshRef.current.rotation.y += 0.01
        meshRef.current.position.y = box.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
      } else {
        meshRef.current.position.y = box.position[1]
      }
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

        // Patrón sutil para dar textura
        ctx.globalAlpha = 0.1
        ctx.fillStyle = "#ffffff"
        for (let i = 0; i < 512; i += 20) {
          for (let j = 0; j < 512; j += 20) {
            if ((i + j) % 40 === 0) {
              ctx.fillRect(i, j, 10, 10)
            }
          }
        }
        ctx.globalAlpha = 1

        // Texto si existe
        if (face.text) {
          ctx.fillStyle = "#ffffff"
          ctx.font = `bold ${face.fontSize || 24}px ${face.fontFamily || "Arial"}`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.shadowColor = "rgba(0,0,0,0.5)"
          ctx.shadowBlur = 4
          ctx.shadowOffsetX = 2
          ctx.shadowOffsetY = 2

          // Dividir texto en líneas si es muy largo
          const words = face.text.split(" ")
          const lines = []
          let currentLine = ""

          for (const word of words) {
            const testLine = currentLine + word + " "
            const metrics = ctx.measureText(testLine)
            if (metrics.width > 450 && currentLine !== "") {
              lines.push(currentLine)
              currentLine = word + " "
            } else {
              currentLine = testLine
            }
          }
          lines.push(currentLine)

          // Dibujar cada línea
          const lineHeight = face.fontSize || 24
          const startY = 256 - ((lines.length - 1) * lineHeight) / 2

          lines.forEach((line, index) => {
            ctx.fillText(line.trim(), 256, startY + index * lineHeight)
          })
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
        if (face.id === selectedFaceId && isSelected) {
          ctx.strokeStyle = "#39ff14"
          ctx.lineWidth = 8
          ctx.strokeRect(4, 4, 504, 504)

          // Efecto de brillo neón
          ctx.shadowColor = "#39ff14"
          ctx.shadowBlur = 20
          ctx.strokeRect(4, 4, 504, 504)
        }
      }

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      return texture
    })
  }, [box.faces, selectedFaceId, isSelected])

  // Dimensiones según el tipo
  const getBoxDimensions = (): [number, number, number] => {
    const scale = 0.01
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

  const handleClick = (event: any) => {
    event.stopPropagation()
    onBoxSelect(box.id)

    // Detectar cara clickeada
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
    <group position={box.position}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "default"
        }}
      >
        <boxGeometry args={boxDimensions} />
        {materials}
      </mesh>

      {/* Wireframe para caja seleccionada */}
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...boxDimensions)]} />
          <lineBasicMaterial color="#39ff14" linewidth={3} />
        </lineSegments>
      )}

      {/* Efecto de brillo para caja seleccionada */}
      {isSelected && (
        <mesh>
          <boxGeometry args={[boxDimensions[0] + 0.02, boxDimensions[1] + 0.02, boxDimensions[2] + 0.02]} />
          <meshBasicMaterial color="#39ff14" transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Efecto hover */}
      {hovered && !isSelected && (
        <mesh>
          <boxGeometry args={[boxDimensions[0] + 0.01, boxDimensions[1] + 0.01, boxDimensions[2] + 0.01]} />
          <meshBasicMaterial color="#ff6b35" transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  )
}
