"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onImageSelect: (image: string | null) => void
}

export function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setUploadedImages((prev) => [...prev, result])
          onImageSelect(result)
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          dragActive ? "border-neon-orange-500 bg-neon-orange-500/10" : "border-ash-gray-600 hover:border-ash-gray-500"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <Upload className="w-8 h-8 text-ash-gray-400 mx-auto mb-2" />
        <p className="text-ash-gray-300 text-sm">Arrastra imágenes aquí o haz clic para seleccionar</p>
        <p className="text-ash-gray-500 text-xs mt-1">PNG, JPG, GIF hasta 10MB</p>
      </div>

      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-ash-gray-300 text-sm font-medium">Imágenes subidas:</h5>
          <div className="grid grid-cols-2 gap-2">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Uploaded ${index}`}
                  className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => onImageSelect(image)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 w-6 h-6 p-0 bg-red-500/80 hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const newImages = uploadedImages.filter((_, i) => i !== index)
                    setUploadedImages(newImages)
                    if (newImages.length === 0) onImageSelect(null)
                  }}
                >
                  <X className="w-3 h-3 text-white" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
