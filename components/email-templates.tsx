"use client"

import { useState } from "react"
import { Mail, Eye, Code, Download } from "lucide-react"

export function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [activeTab, setActiveTab] = useState("preview")

  const templates = [
    {
      id: 1,
      name: "Newsletter Moderno",
      category: "Newsletter",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Plantilla moderna para newsletters con diseño responsive",
    },
    {
      id: 2,
      name: "Promoción Producto",
      category: "Marketing",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Ideal para promocionar productos con llamadas a la acción",
    },
    {
      id: 3,
      name: "Bienvenida Usuario",
      category: "Transaccional",
      preview: "/placeholder.svg?height=400&width=300",
      description: "Plantilla de bienvenida para nuevos usuarios",
    },
  ]

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-ash-gray-900 to-ash-gray-800">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Plantillas de Email</h2>
            <p className="text-ash-gray-400">Crea emails profesionales con nuestras plantillas personalizables</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de plantillas */}
            <div className="lg:col-span-1">
              <div className="bg-ash-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-ash-gray-700/30">
                <h3 className="text-white font-semibold mb-4">Plantillas Disponibles</h3>
                <div className="space-y-3">
                  {templates.map((template, index) => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedTemplate === index
                          ? "bg-neon-orange-500/20 border border-neon-orange-500/50"
                          : "bg-ash-gray-700/30 hover:bg-ash-gray-700/50"
                      }`}
                      onClick={() => setSelectedTemplate(index)}
                    >
                      <h4 className="text-white font-medium">{template.name}</h4>
                      <p className="text-ash-gray-400 text-sm mt-1">{template.category}</p>
                      <p className="text-ash-gray-500 text-xs mt-2">{template.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vista previa y editor */}
            <div className="lg:col-span-2">
              <div className="bg-ash-gray-800/30 backdrop-blur-sm rounded-2xl border border-ash-gray-700/30 overflow-hidden">
                <div className="border-b border-ash-gray-700/30 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab("preview")}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                          activeTab === "preview"
                            ? "bg-neon-orange-500 text-white"
                            : "bg-ash-gray-800/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        Vista Previa
                      </button>
                      <button
                        onClick={() => setActiveTab("code")}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                          activeTab === "code"
                            ? "bg-neon-orange-500 text-white"
                            : "bg-ash-gray-800/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                        }`}
                      >
                        <Code className="w-4 h-4" />
                        Código HTML
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button className="bg-ash-gray-800/50 border border-ash-gray-600/50 text-ash-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-ash-gray-700/50 transition-colors flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Enviar Prueba
                      </button>
                      <button className="bg-neon-orange-500 hover:bg-neon-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "preview" && (
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
                      <img
                        src={templates[selectedTemplate].preview || "/placeholder.svg"}
                        alt={templates[selectedTemplate].name}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  )}

                  {activeTab === "code" && (
                    <div className="bg-ash-gray-900/50 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-ash-gray-300 overflow-x-auto">
                        {`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templates[selectedTemplate].name}</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      margin: 0; 
      padding: 20px; 
      background-color: #f5f5f5; 
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white; 
      border-radius: 8px; 
      overflow: hidden; 
    }
    .header { 
      background: linear-gradient(135deg, #ff6b35, #ff8c42); 
      padding: 40px 20px; 
      text-align: center; 
    }
    .header h1 { 
      color: white; 
      margin: 0; 
      font-size: 28px; 
    }
    .content { 
      padding: 40px 20px; 
    }
    .button { 
      display: inline-block; 
      background: #ff6b35; 
      color: white; 
      padding: 12px 24px; 
      text-decoration: none; 
      border-radius: 6px; 
      margin: 20px 0; 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Bienvenido a 3DBox Studio!</h1>
    </div>
    <div class="content">
      <p>Gracias por unirte a nuestra comunidad de diseñadores.</p>
      <a href="#" class="button">Comenzar Ahora</a>
    </div>
  </div>
</body>
</html>`}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
