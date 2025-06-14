"use client"

import { useState } from "react"
import { BackgroundRemovalService } from "@/lib/background-removal"

export function useBackgroundRemoval() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const removeBackground = async (
    imageDataUrl: string,
    method: "local-simple" | "local-advanced" = "local-simple",
  ): Promise<string | null> => {
    setIsProcessing(true)
    setError(null)
    setProgress(0)

    try {
      let result: string

      if (method === "local-advanced") {
        setProgress(25)
        result = await BackgroundRemovalService.removeBackgroundAdvanced(imageDataUrl)
        setProgress(100)
      } else {
        setProgress(25)
        result = await BackgroundRemovalService.removeBackgroundLocal(imageDataUrl)
        setProgress(100)
      }

      setIsProcessing(false)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      setIsProcessing(false)
      return null
    }
  }

  const clearError = () => setError(null)

  return {
    removeBackground,
    isProcessing,
    error,
    progress,
    clearError,
  }
}
