"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download, RefreshCw } from "lucide-react"

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
    <div className="h-full overflow-y-auto bg-gradient-to-br from-ash-gray-900 to-ash-gray-800">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Convertidor de Formatos</h2>
            <p className="text-ash-gray-400">
              Convierte imágenes entre diferentes formatos de manera rápida y sencilla
            </p>
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
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full px-4 py-3 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white focus:border-neon-orange-500 focus:outline-none"
              >
                {formats.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón de conversión */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handleConvert}
                disabled={!selectedFile || isConverting}
                className="bg-neon-orange-500 hover:bg-neon-orange-600 text-white px-8 py-3 text-lg font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Convirtiendo...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Convertir a {outputFormat.toUpperCase()}
                  </>
                )}
              </button>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </div>
  )
}
