"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FormatConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [outputFormat, setOutputFormat] = useState("png")
  const [isConverting, setIsConverting] = useState(false)

  const formats = [
    { value: "png", label: "PNG" },
    { value: "jpg", label: "JPG" },
    { value: "webp", label: "WebP" },
    { value: "svg", label: "SVG" },
    { value: "ico", label: "ICO" },
    { value: "bmp", label: "BMP" },
    { value: "tiff", label: "TIFF" },
  ]

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleConvert = async () => {
    if (!selectedFile) return

    setIsConverting(true)
    // Simular conversión
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConverting(false)

    // Aquí iría la lógica real de conversión
    console.log(`Converting ${selectedFile.name} to ${outputFormat}`)
  }

  return (
    <div className="h-full p-6 bg-gradient-to-br from-ash-gray-900 to-ash-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Convertidor de Formatos</h2>
          <p className="text-ash-gray-400">Convierte imágenes entre diferentes formatos de manera rápida y sencilla</p>
        </div>

        <div className="bg-ash-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-ash-gray-700/30">
          {/* Área de subida */}
          <div className="mb-8">
            <label className="block text-white font-medium mb-4">Seleccionar archivo</label>
            <div className="border-2 border-dashed border-ash-gray-600 rounded-2xl p-8 text-center hover:border-neon-orange-500/50 transition-colors">
              <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="file-input" />
              <label htmlFor="file-input" className="cursor-pointer">
                <Upload className="w-12 h-12 text-ash-gray-400 mx-auto mb-4" />
                <p className="text-ash-gray-300 text-lg mb-2">
                  {selectedFile ? selectedFile.name : "Haz clic para seleccionar una imagen"}
                </p>
                <p className="text-ash-gray-500 text-sm">Soporta PNG, JPG, GIF, WebP, SVG y más</p>
              </label>
            </div>
          </div>

          {/* Selector de formato */}
          <div className="mb-8">
            <label className="block text-white font-medium mb-4">Formato de salida</label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger className="w-full bg-ash-gray-800/50 border-ash-gray-600/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-ash-gray-800 border-ash-gray-600">
                {formats.map((format) => (
                  <SelectItem key={format.value} value={format.value} className="text-white hover:bg-ash-gray-700">
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botón de conversión */}
          <div className="flex justify-center">
            <Button
              onClick={handleConvert}
              disabled={!selectedFile || isConverting}
              className="bg-neon-orange-500 hover:bg-neon-orange-600 text-white px-8 py-3 text-lg font-medium disabled:opacity-50"
            >
              {isConverting ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Convirtiendo...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Convertir a {outputFormat.toUpperCase()}
                </>
              )}
            </Button>
          </div>

          {/* Información adicional */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-ash-gray-700/30 rounded-xl p-4 text-center">
              <h4 className="text-white font-medium mb-2">Calidad Premium</h4>
              <p className="text-ash-gray-400 text-sm">Sin pérdida de calidad en la conversión</p>
            </div>
            <div className="bg-ash-gray-700/30 rounded-xl p-4 text-center">
              <h4 className="text-white font-medium mb-2">Procesamiento Rápido</h4>
              <p className="text-ash-gray-400 text-sm">Conversión instantánea en tu navegador</p>
            </div>
            <div className="bg-ash-gray-700/30 rounded-xl p-4 text-center">
              <h4 className="text-white font-medium mb-2">Privacidad Total</h4>
              <p className="text-ash-gray-400 text-sm">Tus archivos no salen de tu dispositivo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
