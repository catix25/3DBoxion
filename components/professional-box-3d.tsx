"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ProfessionalBox3DProps {
  boxData: any
}

export function ProfessionalBox3D({ boxData }: ProfessionalBox3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Crear texturas dinámicas
  const textures = useMemo(() => {
    // Textura frontal
    const frontCanvas = document.createElement("canvas")
    frontCanvas.width = 512
    frontCanvas.height = 512
    const frontCtx = frontCanvas.getContext("2d")!

    // Fondo con patrón
    if (boxData.front.background.includes("gradient")) {
      const gradient = frontCtx.createLinearGradient(0, 0, 512, 512)
      gradient.addColorStop(0, "#e8f4f8")
      gradient.addColorStop(1, "#d1ecf1")
      frontCtx.fillStyle = gradient
    } else {
      frontCtx.fillStyle = boxData.front.background
    }
    frontCtx.fillRect(0, 0, 512, 512)

    // Patrón geométrico
    if (boxData.front.pattern === "geometric") {
      frontCtx.strokeStyle = "#ffffff40"
      frontCtx.lineWidth = 2
      for (let i = 0; i < 512; i += 40) {
        for (let j = 0; j < 512; j += 40) {
          frontCtx.strokeRect(i, j, 30, 30)
          frontCtx.beginPath()
          frontCtx.moveTo(i, j)
          frontCtx.lineTo(i + 30, j + 30)
          frontCtx.moveTo(i + 30, j)
          frontCtx.lineTo(i, j + 30)
          frontCtx.stroke()
        }
      }
    }

    // Título principal
    frontCtx.fillStyle = boxData.front.titleColor
    frontCtx.font = "bold 48px Arial"
    frontCtx.textAlign = "center"
    frontCtx.shadowColor = "rgba(0,0,0,0.3)"
    frontCtx.shadowBlur = 4
    frontCtx.shadowOffsetX = 2
    frontCtx.shadowOffsetY = 2
    frontCtx.fillText(boxData.front.title, 256, 150)

    // Subtítulo
    frontCtx.fillStyle = boxData.front.subtitleColor
    frontCtx.font = "bold 36px Arial"
    frontCtx.fillText(boxData.front.subtitle, 256, 200)

    // Información adicional (simulando la imagen de referencia)
    frontCtx.fillStyle = "#333"
    frontCtx.font = "16px Arial"
    frontCtx.fillText("Facturas-pro", 256, 350)
    frontCtx.fillText("CFDI 4.0 Completo", 256, 380)
    frontCtx.fillText("Gestión de clientes", 256, 410)

    const frontTexture = new THREE.CanvasTexture(frontCanvas)

    // Textura del lomo (spine)
    const spineCanvas = document.createElement("canvas")
    spineCanvas.width = 512
    spineCanvas.height = 512
    const spineCtx = spineCanvas.getContext("2d")!

    spineCtx.fillStyle = boxData.spine.background
    spineCtx.fillRect(0, 0, 512, 512)

    spineCtx.save()
    spineCtx.translate(256, 256)
    spineCtx.rotate(-Math.PI / 2)
    spineCtx.fillStyle = boxData.spine.textColor
    spineCtx.font = "bold 24px Arial"
    spineCtx.textAlign = "center"
    spineCtx.fillText(boxData.spine.text, 0, 0)
    spineCtx.restore()

    const spineTexture = new THREE.CanvasTexture(spineCanvas)

    // Textura trasera
    const backCanvas = document.createElement("canvas")
    backCanvas.width = 512
    backCanvas.height = 512
    const backCtx = backCanvas.getContext("2d")!

    backCtx.fillStyle = boxData.back.background
    backCtx.fillRect(0, 0, 512, 512)

    backCtx.fillStyle = boxData.back.textColor
    backCtx.font = "20px Arial"
    backCtx.textAlign = "center"
    backCtx.fillText(boxData.back.text, 256, 256)

    const backTexture = new THREE.CanvasTexture(backCanvas)

    return [
      spineTexture, // right
      spineTexture, // left
      frontTexture, // top
      frontTexture, // bottom
      frontTexture, // front
      backTexture, // back
    ]
  }, [boxData])

  const { width, height, depth } = boxData.dimensions
  const scale = 0.01

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={[width * scale, height * scale, depth * scale]}>
      <boxGeometry args={[1, 1, 1]} />
      {textures.map((texture, index) => (
        <meshPhysicalMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
          roughness={0.1}
          metalness={0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.1}
        />
      ))}
    </mesh>
  )
}
