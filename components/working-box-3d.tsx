"use client"

import { useRef, useState, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface BoxFace {
  id: string
  name: string
  texture: string | null
  color: string
  text: string
  fontSize: number
  fontFamily: string
}

interface WorkingBox3DProps {
  id: string
  position: [number, number, number]
  dimensions: { width: number; height: number; depth: number }
  faces: BoxFace[]
  isSelected: boolean
  onClick: () => void
  boxType: "software" | "dvd" | "cd" | "icon" | "desktop"
}

export function WorkingBox3D({ id, position, dimensions, faces, isSelected, onClick, boxType }: WorkingBox3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Crear texturas dinámicas para cada cara
  const textures = useMemo(() => {
    return faces.map((face) => {
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
          ctx.fillStyle = face.color || "#666666"
        }
        ctx.fillRect(0, 0, 512, 512)

        // Agregar texto si existe
        if (face.text) {
          ctx.fillStyle = "#ffffff"
          ctx.font = `${face.fontSize || 24}px ${face.fontFamily || "Arial"}`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          // Texto con sombra
          ctx.shadowColor = "rgba(0,0,0,0.5)"
          ctx.shadowBlur = 4
          ctx.shadowOffsetX = 2
          ctx.shadowOffsetY = 2

          // Dividir texto en líneas si es muy largo
          const words = face.text.split(" ")
          const lines = []
          let currentLine = ""

          words.forEach((word) => {
            const testLine = currentLine + word + " "
            const metrics = ctx.measureText(testLine)
            if (metrics.width > 450 && currentLine !== "") {
              lines.push(currentLine)
              currentLine = word + " "
            } else {
              currentLine = testLine
            }
          })
          lines.push(currentLine)

          // Dibujar cada línea
          const lineHeight = face.fontSize || 24
          const startY = 256 - ((lines.length - 1) * lineHeight) / 2

          lines.forEach((line, index) => {
            ctx.fillText(line.trim(), 256, startY + index * lineHeight)
          })
        }

        // Si hay textura de imagen, superponerla
        if (face.texture) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            ctx.globalAlpha = 0.8
            ctx.drawImage(img, 0, 0, 512, 512)
          }
          img.src = face.texture
        }
      }

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      return texture
    })
  }, [faces])

  useFrame((state) => {
    if (meshRef.current) {
      if (isSelected) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02
      } else {
        meshRef.current.position.y = position[1]
      }
    }
  })

  // Dimensiones escaladas
  const scale = 0.01
  const boxDimensions: [number, number, number] = [
    dimensions.width * scale,
    dimensions.height * scale,
    dimensions.depth * scale,
  ]

  // Materiales para cada cara (orden: +X, -X, +Y, -Y, +Z, -Z)
  const materials = [
    textures[3], // right
    textures[2], // left
    textures[4], // top
    textures[5], // bottom
    textures[0], // front
    textures[1], // back
  ].map((texture, index) => (
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

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
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
          <lineBasicMaterial color="#39ff14" linewidth={2} />
        </lineSegments>
      )}

      {/* Efecto de brillo */}
      {(isSelected || hovered) && (
        <mesh>
          <boxGeometry args={[boxDimensions[0] + 0.02, boxDimensions[1] + 0.02, boxDimensions[2] + 0.02]} />
          <meshBasicMaterial
            color={isSelected ? "#39ff14" : "#ffffff"}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  )
}
