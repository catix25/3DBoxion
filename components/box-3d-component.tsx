"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface BoxConfig {
  frontText: string
  frontSubtext: string
  frontColor: string
  spineText: string
  spineColor: string
  backText: string
  backColor: string
}

interface Box3DComponentProps {
  config: BoxConfig
}

export function Box3DComponent({ config }: Box3DComponentProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const textures = useMemo(() => {
    // Crear textura frontal
    const frontCanvas = document.createElement("canvas")
    frontCanvas.width = 512
    frontCanvas.height = 512
    const frontCtx = frontCanvas.getContext("2d")!

    // Fondo
    frontCtx.fillStyle = config.frontColor
    frontCtx.fillRect(0, 0, 512, 512)

    // Patrón geométrico sutil
    frontCtx.strokeStyle = "rgba(255,255,255,0.1)"
    frontCtx.lineWidth = 1
    for (let i = 0; i < 512; i += 30) {
      for (let j = 0; j < 512; j += 30) {
        frontCtx.strokeRect(i, j, 25, 25)
      }
    }

    // Título principal
    frontCtx.fillStyle = "#ffffff"
    frontCtx.font = "bold 42px Arial"
    frontCtx.textAlign = "center"
    frontCtx.shadowColor = "rgba(0,0,0,0.5)"
    frontCtx.shadowBlur = 4
    frontCtx.shadowOffsetX = 2
    frontCtx.shadowOffsetY = 2
    frontCtx.fillText(config.frontText, 256, 200)

    // Subtítulo
    frontCtx.font = "bold 32px Arial"
    frontCtx.fillText(config.frontSubtext, 256, 250)

    // Información adicional
    frontCtx.font = "16px Arial"
    frontCtx.fillStyle = "rgba(255,255,255,0.8)"
    frontCtx.fillText("Versión Profesional", 256, 350)
    frontCtx.fillText("Compatible con Windows/Mac/Linux", 256, 380)

    const frontTexture = new THREE.CanvasTexture(frontCanvas)

    // Crear textura del lomo
    const spineCanvas = document.createElement("canvas")
    spineCanvas.width = 512
    spineCanvas.height = 512
    const spineCtx = spineCanvas.getContext("2d")!

    spineCtx.fillStyle = config.spineColor
    spineCtx.fillRect(0, 0, 512, 512)

    spineCtx.save()
    spineCtx.translate(256, 256)
    spineCtx.rotate(-Math.PI / 2)
    spineCtx.fillStyle = "#ffffff"
    spineCtx.font = "bold 24px Arial"
    spineCtx.textAlign = "center"
    spineCtx.shadowColor = "rgba(0,0,0,0.3)"
    spineCtx.shadowBlur = 2
    spineCtx.fillText(config.spineText, 0, 0)
    spineCtx.restore()

    const spineTexture = new THREE.CanvasTexture(spineCanvas)

    // Crear textura trasera
    const backCanvas = document.createElement("canvas")
    backCanvas.width = 512
    backCanvas.height = 512
    const backCtx = backCanvas.getContext("2d")!

    backCtx.fillStyle = config.backColor
    backCtx.fillRect(0, 0, 512, 512)

    backCtx.fillStyle = "#333333"
    backCtx.font = "18px Arial"
    backCtx.textAlign = "center"

    // Dividir texto en líneas
    const words = config.backText.split(" ")
    let line = ""
    let y = 200

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " "
      const metrics = backCtx.measureText(testLine)
      if (metrics.width > 400 && n > 0) {
        backCtx.fillText(line, 256, y)
        line = words[n] + " "
        y += 25
      } else {
        line = testLine
      }
    }
    backCtx.fillText(line, 256, y)

    const backTexture = new THREE.CanvasTexture(backCanvas)

    // Retornar materiales para cada cara
    return [
      spineTexture, // right (+X)
      spineTexture, // left (-X)
      frontTexture, // top (+Y)
      frontTexture, // bottom (-Y)
      frontTexture, // front (+Z)
      backTexture, // back (-Z)
    ]
  }, [config])

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 2.8, 0.3]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial key={index} attach={`material-${index}`} map={texture} roughness={0.2} metalness={0.1} />
      ))}
    </mesh>
  )
}
