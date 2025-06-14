"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface IconData {
  id: string
  dimensions: { width: number; height: number; depth: number }
  shape: "square" | "rounded" | "circle"
  cornerRadius: number
  background: string
  foreground: string
  text: string
  fontSize: number
  fontFamily: string
  texture: string | null
  style: "flat" | "gradient" | "glass" | "metal"
  shadow: boolean
  glow: boolean
}

interface RealIcon3DProps {
  iconData: IconData
}

export function RealIcon3D({ iconData }: RealIcon3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  // Crear geometría según la forma
  const geometry = useMemo(() => {
    const scale = 0.003
    const width = iconData.dimensions.width * scale
    const height = iconData.dimensions.height * scale
    const depth = iconData.dimensions.depth * scale

    if (iconData.shape === "circle") {
      return new THREE.CylinderGeometry(width / 2, width / 2, depth, 32)
    } else if (iconData.shape === "rounded") {
      // Crear geometría redondeada usando ExtrudeGeometry
      const roundedRectShape = new THREE.Shape()
      const radius = (iconData.cornerRadius / iconData.dimensions.width) * width

      roundedRectShape.moveTo(-width / 2 + radius, -height / 2)
      roundedRectShape.lineTo(width / 2 - radius, -height / 2)
      roundedRectShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
      roundedRectShape.lineTo(width / 2, height / 2 - radius)
      roundedRectShape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
      roundedRectShape.lineTo(-width / 2 + radius, height / 2)
      roundedRectShape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
      roundedRectShape.lineTo(-width / 2, -height / 2 + radius)
      roundedRectShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)

      const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 2,
        bevelSize: depth * 0.1,
        bevelThickness: depth * 0.1,
      }

      return new THREE.ExtrudeGeometry(roundedRectShape, extrudeSettings)
    } else {
      // Cuadrado con bisel
      const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 2,
        bevelSize: depth * 0.05,
        bevelThickness: depth * 0.05,
      }

      const squareShape = new THREE.Shape()
      squareShape.moveTo(-width / 2, -height / 2)
      squareShape.lineTo(width / 2, -height / 2)
      squareShape.lineTo(width / 2, height / 2)
      squareShape.lineTo(-width / 2, height / 2)
      squareShape.lineTo(-width / 2, -height / 2)

      return new THREE.ExtrudeGeometry(squareShape, extrudeSettings)
    }
  }, [iconData.shape, iconData.dimensions, iconData.cornerRadius])

  // Crear textura del icono
  const iconTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    const size = Math.max(iconData.dimensions.width, iconData.dimensions.height)
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Limpiar canvas
      ctx.clearRect(0, 0, size, size)

      // Crear fondo según el estilo
      if (iconData.style === "gradient") {
        const gradient = ctx.createLinearGradient(0, 0, 0, size)
        gradient.addColorStop(0, adjustBrightness(iconData.background, 20))
        gradient.addColorStop(0.5, iconData.background)
        gradient.addColorStop(1, adjustBrightness(iconData.background, -30))
        ctx.fillStyle = gradient
      } else if (iconData.style === "glass") {
        const gradient = ctx.createLinearGradient(0, 0, 0, size)
        gradient.addColorStop(0, adjustBrightness(iconData.background, 40))
        gradient.addColorStop(0.3, adjustBrightness(iconData.background, 10))
        gradient.addColorStop(0.7, iconData.background)
        gradient.addColorStop(1, adjustBrightness(iconData.background, -20))
        ctx.fillStyle = gradient
      } else if (iconData.style === "metal") {
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
        gradient.addColorStop(0, adjustBrightness(iconData.background, 60))
        gradient.addColorStop(0.3, adjustBrightness(iconData.background, 20))
        gradient.addColorStop(0.7, iconData.background)
        gradient.addColorStop(1, adjustBrightness(iconData.background, -40))
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = iconData.background
      }

      // Dibujar forma según el tipo
      if (iconData.shape === "circle") {
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2)
        ctx.fill()
      } else if (iconData.shape === "rounded") {
        drawRoundedRect(ctx, 10, 10, size - 20, size - 20, iconData.cornerRadius)
        ctx.fill()
      } else {
        ctx.fillRect(10, 10, size - 20, size - 20)
      }

      // Efectos adicionales según el estilo
      if (iconData.style === "glass") {
        // Efecto de brillo superior
        const glassGradient = ctx.createLinearGradient(0, 0, 0, size / 2)
        glassGradient.addColorStop(0, "rgba(255,255,255,0.4)")
        glassGradient.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = glassGradient

        if (iconData.shape === "circle") {
          ctx.beginPath()
          ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2)
          ctx.fill()
        } else if (iconData.shape === "rounded") {
          drawRoundedRect(ctx, 10, 10, size - 20, size - 20, iconData.cornerRadius)
          ctx.fill()
        } else {
          ctx.fillRect(10, 10, size - 20, size - 20)
        }
      }

      // Imagen de textura si existe
      if (iconData.texture) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          ctx.globalAlpha = 0.8
          ctx.drawImage(img, 20, 20, size - 40, size - 40)
          ctx.globalAlpha = 1
        }
        img.src = iconData.texture
      }

      // Texto del icono
      if (iconData.text) {
        ctx.fillStyle = iconData.foreground
        ctx.font = `bold ${iconData.fontSize}px ${iconData.fontFamily}`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Sombra del texto
        if (iconData.shadow) {
          ctx.shadowColor = "rgba(0,0,0,0.6)"
          ctx.shadowBlur = 10
          ctx.shadowOffsetX = 4
          ctx.shadowOffsetY = 4
        }

        // Efecto de brillo si está activado
        if (iconData.glow) {
          ctx.shadowColor = iconData.foreground
          ctx.shadowBlur = 25
        }

        ctx.fillText(iconData.text, size / 2, size / 2)

        // Resetear sombra
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [iconData])

  // Función auxiliar para dibujar rectángulos redondeados
  function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
  }

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

  // Material según el estilo
  const material = useMemo(() => {
    const baseProps = {
      map: iconTexture,
      roughness: iconData.style === "metal" ? 0.1 : iconData.style === "glass" ? 0.05 : 0.3,
      metalness: iconData.style === "metal" ? 0.8 : 0.1,
      clearcoat: iconData.style === "glass" ? 0.9 : 0.3,
      clearcoatRoughness: iconData.style === "glass" ? 0.1 : 0.3,
      reflectivity: iconData.style === "glass" ? 0.9 : iconData.style === "metal" ? 0.8 : 0.2,
      transparent: iconData.style === "glass",
      opacity: iconData.style === "glass" ? 0.9 : 1,
    }

    return new THREE.MeshPhysicalMaterial(baseProps)
  }, [iconTexture, iconData.style])

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow geometry={geometry} material={material} />

      {/* Efecto de brillo si está activado */}
      {iconData.glow && (
        <mesh geometry={geometry}>
          <meshBasicMaterial color={iconData.foreground} transparent opacity={0.2} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  )
}
