"use client"

import { useRef, useState, useMemo } from "react"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { useDrag } from "@use-gesture/react"

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

interface DirectInteractiveBox3DProps {
  box: BoxData
  isSelected: boolean
  selectedFaceId: string
  onBoxSelect: (boxId: string) => void
  onFaceSelect: (faceId: string) => void
  onBoxUpdate: (boxId: string, updates: any) => void
  onFaceUpdate: (boxId: string, faceId: string, updates: any) => void
}

export function DirectInteractiveBox3D({
  box,
  isSelected,
  selectedFaceId,
  onBoxSelect,
  onFaceSelect,
  onBoxUpdate,
  onFaceUpdate,
}: DirectInteractiveBox3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const { size, viewport, camera, gl } = useThree()

  // Animación de la caja seleccionada
  useFrame((state) => {
    if (meshRef.current) {
      if (isSelected && !isDragging) {
        meshRef.current.rotation.y += 0.01
        meshRef.current.position.y = box.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
      } else if (!isDragging) {
        meshRef.current.position.y = box.position[1]
      }
    }
  })

  // Sistema de arrastre mejorado
  const bind = useDrag(
    ({ active, movement: [x, y], memo, event }) => {
      if (!isSelected) return memo

      setIsDragging(active)

      if (active) {
        // Prevenir que OrbitControls interfiera
        event?.stopPropagation()

        if (!memo) {
          memo = [...box.position]
        }

        // Convertir movimiento del mouse a coordenadas 3D
        const factor = 0.01
        const newX = memo[0] + x * factor
        const newZ = memo[2] - y * factor

        // Actualizar posición en tiempo real
        if (groupRef.current) {
          groupRef.current.position.set(newX, memo[1], newZ)
        }

        return memo
      } else {
        // Al soltar, actualizar el estado permanentemente
        if (memo && groupRef.current) {
          const newPosition: [number, number, number] = [
            groupRef.current.position.x,
            memo[1],
            groupRef.current.position.z,
          ]
          onBoxUpdate(box.id, { position: newPosition })
        }
        return memo
      }
    },
    {
      pointerEvents: true,
      preventDefault: true,
      filterTaps: true,
      threshold: 5,
    },
  )

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
        // Fondo con color o gradiente neón
        if (face.color.includes("#39ff14") || face.color.includes("neon")) {
          const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
          gradient.addColorStop(0, face.color)
          gradient.addColorStop(0.7, face.color)
          gradient.addColorStop(1, adjustBrightness(face.color, -30))
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = face.color || "#f0f0f0"
        }
        ctx.fillRect(0, 0, 512, 512)

        // Efecto de textura sutil
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
          ctx.shadowColor = "rgba(0,0,0,0.8)"
          ctx.shadowBlur = 6
          ctx.shadowOffsetX = 3
          ctx.shadowOffsetY = 3

          // Efecto neón para texto
          if (face.color.includes("#39ff14") || face.color.includes("neon")) {
            ctx.shadowColor = "#39ff14"
            ctx.shadowBlur = 15
          }

          // Dividir texto en líneas
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
            ctx.drawImage(img, 50, 50, 412, 412)
          }
          img.src = face.texture
        }

        // Borde si está seleccionada
        if (face.id === selectedFaceId && isSelected) {
          ctx.strokeStyle = "#39ff14"
          ctx.lineWidth = 12
          ctx.shadowColor = "#39ff14"
          ctx.shadowBlur = 25
          ctx.strokeRect(6, 6, 500, 500)
        }
      }

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      return texture
    })
  }, [box.faces, selectedFaceId, isSelected])

  // Función auxiliar para ajustar brillo
  function adjustBrightness(color: string, amount: number): string {
    const num = Number.parseInt(color.replace("#", ""), 16)
    const amt = Math.round(2.55 * amount)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

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
    if (isDragging) return // No seleccionar si estamos arrastrando

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

  const handlePointerDown = (event: any) => {
    if (isSelected) {
      event.stopPropagation()
      gl.domElement.style.cursor = "grabbing"
    }
  }

  const handlePointerUp = () => {
    gl.domElement.style.cursor = isSelected ? "grab" : "pointer"
  }

  return (
    <group ref={groupRef} position={box.position}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          gl.domElement.style.cursor = isSelected ? "grab" : "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          if (!isDragging) {
            gl.domElement.style.cursor = "default"
          }
        }}
        {...(isSelected ? bind() : {})}
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
          <meshBasicMaterial color="#39ff14" transparent opacity={0.15} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Efecto hover */}
      {hovered && !isSelected && (
        <mesh>
          <boxGeometry args={[boxDimensions[0] + 0.01, boxDimensions[1] + 0.01, boxDimensions[2] + 0.01]} />
          <meshBasicMaterial color="#ff6b35" transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Indicador visual de que se puede arrastrar */}
      {isSelected && !isDragging && (
        <mesh position={[0, boxDimensions[1] / 2 + 0.3, 0]}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#39ff14" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  )
}
