"use client"

import { useRef, useState, useMemo } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"

interface BoxFace {
  id: string
  name: string
  texture: string | null
}

interface AdvancedBox3DProps {
  id: string
  position: [number, number, number]
  dimensions: { width: number; height: number; depth: number }
  faces: BoxFace[]
  isSelected: boolean
  onClick: () => void
}

export function AdvancedBox3D({ id, position, dimensions, faces, isSelected, onClick }: AdvancedBox3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Cargar texturas para cada cara
  const textures = useMemo(() => {
    return faces.map((face) => {
      try {
        return face.texture ? useLoader(TextureLoader, face.texture) : null
      } catch {
        return null
      }
    })
  }, [faces])

  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  const { width, height, depth } = dimensions
  const scale: [number, number, number] = [width / 100, height / 100, depth / 100]

  // Crear materiales para cada cara
  const materials = textures.map((texture, index) => {
    if (texture) {
      return <meshStandardMaterial key={index} map={texture} roughness={0.1} metalness={0.2} />
    }
    return (
      <meshStandardMaterial key={index} color={isSelected ? "#ff6b35" : "#666666"} roughness={0.3} metalness={0.1} />
    )
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2.8, 0.4]} />
      {materials.length === 6 ? (
        materials
      ) : (
        <meshStandardMaterial
          color={isSelected ? "#ff6b35" : hovered ? "#888888" : "#666666"}
          roughness={0.3}
          metalness={0.1}
        />
      )}

      {/* Wireframe para caja seleccionada */}
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2, 2.8, 0.4)]} />
          <lineBasicMaterial color="#ff6b35" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  )
}
