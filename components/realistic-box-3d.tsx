"use client"

import { useRef, useState, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"

interface BoxFace {
  id: string
  name: string
  texture: string | null
}

interface RealisticBox3DProps {
  id: string
  position: [number, number, number]
  dimensions: { width: number; height: number; depth: number }
  faces: BoxFace[]
  isSelected: boolean
  onClick: () => void
  boxType: "software" | "dvd" | "cd" | "icon" | "desktop"
}

export function RealisticBox3D({ id, position, dimensions, faces, isSelected, onClick, boxType }: RealisticBox3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Cargar texturas para cada cara
  const textures = useMemo(() => {
    return faces.map((face) => {
      try {
        if (face.texture) {
          const texture = new TextureLoader().load(face.texture)
          return texture
        }
        return null
      } catch (error) {
        console.error("Error loading texture:", error)
        return null
      }
    })
  }, [faces])

  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02
    }
  })

  // Calcular dimensiones basadas en el tipo de caja
  const getBoxDimensions = () => {
    const baseScale = 0.01
    switch (boxType) {
      case "software":
        return [dimensions.width * baseScale, dimensions.height * baseScale, dimensions.depth * baseScale] as [
          number,
          number,
          number,
        ]
      case "dvd":
        return [1.9, 2.7, 0.14] as [number, number, number]
      case "cd":
        return [1.42, 1.25, 0.1] as [number, number, number]
      case "icon":
        return [1.2, 1.2, 0.08] as [number, number, number]
      case "desktop":
        return [2.0, 2.8, 0.3] as [number, number, number]
      default:
        return [1.9, 2.7, 0.14] as [number, number, number]
    }
  }

  const boxDimensions = getBoxDimensions()

  // Crear materiales para cada cara con efectos realistas
  const materials = useMemo(() => {
    const faceOrder = ["right", "left", "top", "bottom", "front", "back"]

    return faceOrder.map((faceName, index) => {
      const face = faces.find((f) => f.id === faceName)
      const texture = textures[faces.findIndex((f) => f.id === faceName)]

      if (texture) {
        texture.flipY = false
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping

        return (
          <meshPhysicalMaterial
            key={index}
            map={texture}
            roughness={0.1}
            metalness={0.05}
            clearcoat={0.3}
            clearcoatRoughness={0.1}
            reflectivity={0.2}
          />
        )
      }

      // Material por defecto con gradiente
      const color = isSelected ? "#ff6b35" : hovered ? "#888888" : faceName === "front" ? "#4a9eff" : "#666666"

      return (
        <meshPhysicalMaterial
          key={index}
          color={color}
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          reflectivity={0.3}
        />
      )
    })
  }, [faces, textures, isSelected, hovered])

  return (
    <group position={position}>
      {/* Caja principal */}
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={boxDimensions} />
        {materials}
      </mesh>

      {/* Esquinas redondeadas (efecto visual) */}
      {boxType === "software" && (
        <>
          {/* Bordes superiores */}
          <mesh position={[0, boxDimensions[1] / 2 + 0.01, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, boxDimensions[0] * 0.9]} rotation={[0, 0, Math.PI / 2]} />
            <meshPhysicalMaterial color="#333333" roughness={0.3} metalness={0.7} />
          </mesh>

          {/* Bordes laterales */}
          <mesh position={[boxDimensions[0] / 2 + 0.01, 0, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, boxDimensions[1] * 0.9]} />
            <meshPhysicalMaterial color="#333333" roughness={0.3} metalness={0.7} />
          </mesh>
        </>
      )}

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
    </group>
  )
}
