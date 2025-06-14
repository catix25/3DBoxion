"use client"

import { useState } from "react"
import { Printer, FileText, Download, Settings, Zap } from "lucide-react"

export function PrintingTools() {
  const [selectedPrinter, setSelectedPrinter] = useState("thermal")
  const [paperSize, setPaperSize] = useState("80mm")
  const [printQuality, setPrintQuality] = useState(300)

  const printerTypes = [
    { id: "thermal", name: "Impresora Térmica", icon: "🖨️", description: "Para tickets y recibos" },
    { id: "commercial", name: "Impresora Comercial", icon: "🏢", description: "Para uso comercial" },
    { id: "pocket", name: "Impresora de Bolsillo", icon: "📱", description: "Portátil y compacta" },
    { id: "label", name: "Impresora de Etiquetas", icon: "🏷️", description: "Para etiquetas y códigos" },
  ]

  const paperSizes = [
    { id: "58mm", name: "58mm", description: "Tickets pequeños" },
    { id: "80mm", name: "80mm", description: "Tickets estándar" },
    { id: "110mm", name: "110mm", description: "Tickets grandes" },
    { id: "a4", name: "A4", description: "Hoja completa" },
  ]

  const ticketTemplates = [
    { id: "receipt", name: "Recibo de Venta", preview: "Recibo básico con logo y detalles" },
    { id: "invoice", name: "Factura", preview: "Factura completa con impuestos" },
    { id: "label", name: "Etiqueta de Producto", preview: "Etiqueta con código de barras" },
    { id: "custom", name: "Diseño Personalizado", preview: "Crea tu propio diseño" },
  ]

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-ash-gray-900 to-ash-gray-800">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Herramientas de Impresión</h2>
            <p className="text-ash-gray-400">Configura e imprime tickets, etiquetas y documentos comerciales</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuración de impresora */}
            <div className="lg:col-span-1">
              <div className="bg-ash-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-ash-gray-700/30">
                <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-neon-orange-500" />
                  Configuración de Impresora
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-ash-gray-300 text-sm font-medium mb-3">Tipo de Impresora</label>
                    <div className="space-y-2">
                      {printerTypes.map((printer) => (
                        <div
                          key={printer.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            selectedPrinter === printer.id
                              ? "bg-neon-orange-500/20 border border-neon-orange-500/50"
                              : "bg-ash-gray-700/30 hover:bg-ash-gray-700/50 border border-transparent"
                          }`}
                          onClick={() => setSelectedPrinter(printer.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{printer.icon}</span>
                            <div>
                              <p className="text-white font-medium text-sm">{printer.name}</p>
                              <p className="text-ash-gray-400 text-xs">{printer.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-ash-gray-300 text-sm font-medium mb-2">Tamaño de Papel</label>
                    <select
                      value={paperSize}
                      onChange={(e) => setPaperSize(e.target.value)}
                      className="w-full px-3 py-2 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white focus:border-neon-orange-500 focus:outline-none"
                    >
                      {paperSizes.map((size) => (
                        <option key={size.id} value={size.id}>
                          {size.name} - {size.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-ash-gray-300 text-sm font-medium mb-2">
                      Calidad de Impresión: {printQuality} DPI
                    </label>
                    <input
                      type="range"
                      min="150"
                      max="600"
                      step="50"
                      value={printQuality}
                      onChange={(e) => setPrintQuality(Number.parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" />
                    Configurar Impresora
                  </button>
                </div>
              </div>
            </div>

            {/* Plantillas de tickets */}
            <div className="lg:col-span-2">
              <div className="bg-ash-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-ash-gray-700/30">
                <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-neon-orange-500" />
                  Plantillas de Impresión
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {ticketTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-ash-gray-700/30 rounded-xl p-4 border border-ash-gray-600/30 hover:border-neon-orange-500/50 transition-all cursor-pointer group"
                    >
                      <div className="aspect-[3/4] bg-white rounded-lg mb-3 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="text-2xl mb-2">📄</div>
                          <div className="text-xs text-gray-600">{template.preview}</div>
                        </div>
                      </div>
                      <h4 className="text-white font-medium mb-1 group-hover:text-neon-orange-400 transition-colors">
                        {template.name}
                      </h4>
                      <p className="text-ash-gray-400 text-xs">{template.preview}</p>
                    </div>
                  ))}
                </div>

                {/* Vista previa del ticket */}
                <div className="bg-ash-gray-700/30 rounded-xl p-6 border border-ash-gray-600/30">
                  <h4 className="text-white font-medium mb-4">Vista Previa del Ticket</h4>
                  <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg">
                        3D
                      </div>
                      <h3 className="font-bold text-gray-800">3DBox Studio</h3>
                      <p className="text-xs text-gray-600">Create Studio 2025</p>
                    </div>

                    <div className="border-t border-gray-300 pt-4 mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Producto:</span>
                        <span>Caja 3D Premium</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Cantidad:</span>
                        <span>1</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold">
                        <span>Total:</span>
                        <span>$29.99</span>
                      </div>
                    </div>

                    <div className="text-center text-xs text-gray-500 border-t border-gray-300 pt-4">
                      <p>¡Gracias por tu compra!</p>
                      <p>www.createstudiodigital.com.mx</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 bg-neon-orange-500 hover:bg-neon-orange-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Printer className="w-4 h-4" />
                      Imprimir
                    </button>
                    <button className="bg-ash-gray-800/50 border border-ash-gray-600/50 text-ash-gray-300 py-3 px-4 rounded-lg hover:bg-ash-gray-700/50 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-ash-gray-800/30 rounded-xl p-4 text-center border border-ash-gray-700/30">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-2">Impresión Rápida</h4>
              <p className="text-ash-gray-400 text-sm">Imprime tickets en segundos con configuración automática</p>
            </div>
            <div className="bg-ash-gray-800/30 rounded-xl p-4 text-center border border-ash-gray-700/30">
              <Settings className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-2">Configuración Avanzada</h4>
              <p className="text-ash-gray-400 text-sm">Personaliza cada aspecto de tus impresiones</p>
            </div>
            <div className="bg-ash-gray-800/30 rounded-xl p-4 text-center border border-ash-gray-700/30">
              <FileText className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-2">Múltiples Formatos</h4>
              <p className="text-ash-gray-400 text-sm">Soporta tickets, etiquetas, facturas y más</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
