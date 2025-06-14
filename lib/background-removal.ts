// Servicio para remoción de fondos - solo métodos locales
export class BackgroundRemovalService {
  // Método local usando Canvas API (gratuito y sin API)
  static async removeBackgroundLocal(imageDataUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            reject(new Error("No se pudo crear el contexto del canvas"))
            return
          }

          canvas.width = img.width
          canvas.height = img.height

          // Dibujar la imagen original
          ctx.drawImage(img, 0, 0)

          // Obtener los datos de la imagen
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          // Algoritmo simple de remoción de fondo basado en color dominante
          // Detectar el color de las esquinas (asumiendo que es el fondo)
          const cornerColors = [
            [data[0], data[1], data[2]], // Esquina superior izquierda
            [data[(canvas.width - 1) * 4], data[(canvas.width - 1) * 4 + 1], data[(canvas.width - 1) * 4 + 2]], // Esquina superior derecha
            [
              data[(canvas.height - 1) * canvas.width * 4],
              data[(canvas.height - 1) * canvas.width * 4 + 1],
              data[(canvas.height - 1) * canvas.width * 4 + 2],
            ], // Esquina inferior izquierda
          ]

          // Calcular color promedio de las esquinas
          const avgColor = [
            Math.round(cornerColors.reduce((sum, color) => sum + color[0], 0) / cornerColors.length),
            Math.round(cornerColors.reduce((sum, color) => sum + color[1], 0) / cornerColors.length),
            Math.round(cornerColors.reduce((sum, color) => sum + color[2], 0) / cornerColors.length),
          ]

          // Remover píxeles similares al color de fondo
          const tolerance = 50
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            // Calcular diferencia de color
            const diff = Math.sqrt(
              Math.pow(r - avgColor[0], 2) + Math.pow(g - avgColor[1], 2) + Math.pow(b - avgColor[2], 2),
            )

            // Si el color es similar al fondo, hacerlo transparente
            if (diff < tolerance) {
              data[i + 3] = 0 // Alpha = 0 (transparente)
            }
          }

          // Aplicar los cambios
          ctx.putImageData(imageData, 0, 0)

          // Convertir a data URL
          const resultDataUrl = canvas.toDataURL("image/png")
          resolve(resultDataUrl)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error("Error al cargar la imagen"))
      img.src = imageDataUrl
    })
  }

  // Método mejorado usando algoritmo de detección de bordes
  static async removeBackgroundAdvanced(imageDataUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            reject(new Error("No se pudo crear el contexto del canvas"))
            return
          }

          canvas.width = img.width
          canvas.height = img.height

          ctx.drawImage(img, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          // Aplicar filtro de detección de bordes Sobel
          const sobelData = this.applySobelFilter(data, canvas.width, canvas.height)

          // Crear máscara basada en la detección de bordes
          const mask = this.createEdgeMask(sobelData, canvas.width, canvas.height)

          // Aplicar la máscara para remover el fondo
          for (let i = 0; i < data.length; i += 4) {
            const pixelIndex = i / 4
            if (!mask[pixelIndex]) {
              data[i + 3] = 0 // Hacer transparente
            }
          }

          ctx.putImageData(imageData, 0, 0)

          const resultDataUrl = canvas.toDataURL("image/png")
          resolve(resultDataUrl)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error("Error al cargar la imagen"))
      img.src = imageDataUrl
    })
  }

  private static applySobelFilter(data: Uint8ClampedArray, width: number, height: number): number[] {
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1]
    const result = new Array(width * height)

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0,
          gy = 0

        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4
            const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3
            const kernelIdx = (ky + 1) * 3 + (kx + 1)

            gx += gray * sobelX[kernelIdx]
            gy += gray * sobelY[kernelIdx]
          }
        }

        result[y * width + x] = Math.sqrt(gx * gx + gy * gy)
      }
    }

    return result
  }

  private static createEdgeMask(sobelData: number[], width: number, height: number): boolean[] {
    const threshold = 50
    const mask = new Array(width * height).fill(false)

    // Marcar píxeles con bordes fuertes como objeto
    for (let i = 0; i < sobelData.length; i++) {
      if (sobelData[i] > threshold) {
        mask[i] = true
      }
    }

    // Expandir la máscara para incluir áreas conectadas
    const expanded = [...mask]
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x
        if (mask[idx]) {
          // Expandir a píxeles vecinos
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const neighborIdx = (y + dy) * width + (x + dx)
              expanded[neighborIdx] = true
            }
          }
        }
      }
    }

    return expanded
  }
}
