"use client"

import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import type * as THREE from "three"

interface Box3DProps {
  image: string | null
  dimensions: { width: number; height: number; depth: number }
}

export function Box3D({ image, dimensions }: Box3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Cargar textura si hay imagen
  const texture = image ? useLoader(TextureLoader, image || "/white.png") : null

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const { width, height, depth } = dimensions
  const scale = [width / 100, height / 100, depth / 100]

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
      <boxGeometry args={[2, 2.8, 0.4]} />
      {texture ? (
        <meshStandardMaterial map={texture} roughness={0.1} metalness={0.2} />
      ) : (
        <meshStandardMaterial color="#ff6b35" roughness={0.3} metalness={0.7} />
      )}
    </mesh>
  )
}
