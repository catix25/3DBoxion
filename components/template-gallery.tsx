"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TemplateGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Todas" },
    { id: "software", name: "Software" },
    { id: "games", name: "Juegos" },
    { id: "movies", name: "Películas" },
    { id: "music", name: "Música" },
    { id: "business", name: "Negocios" },
  ]

  const templates = [
    { id: 1, name: "Caja Software Moderna", category: "software", preview: "/placeholder.svg?height=200&width=150" },
    { id: 2, name: "Portada Juego Acción", category: "games", preview: "/placeholder.svg?height=200&width=150" },
    { id: 3, name: "DVD Película Clásica", category: "movies", preview: "/placeholder.svg?height=200&width=150" },
    { id: 4, name: "Álbum Musical", category: "music", preview: "/placeholder.svg?height=200&width=150" },
    { id: 5, name: "Presentación Corporativa", category: "business", preview: "/placeholder.svg?height=200&width=150" },
    { id: 6, name: "Caja Premium", category: "software", preview: "/placeholder.svg?height=200&width=150" },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="h-full p-6 bg-gradient-to-br from-ash-gray-900 to-ash-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Galería de Plantillas</h2>
          <p className="text-ash-gray-400">Explora y descarga plantillas profesionales para tus proyectos</p>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ash-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar plantillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-ash-gray-800/50 border-ash-gray-600/50 text-white placeholder-ash-gray-400"
            />
          </div>

          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-neon-orange-500 hover:bg-neon-orange-600"
                    : "bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de plantillas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-ash-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-ash-gray-700/30 hover:border-neon-orange-500/50 transition-all duration-300 group hover:shadow-neon"
            >
              <div className="aspect-[3/4] bg-ash-gray-700/50 rounded-xl mb-4 overflow-hidden">
                <img
                  src={template.preview || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-white font-medium mb-2 group-hover:text-neon-orange-400 transition-colors">
                {template.name}
              </h3>

              <div className="flex justify-between items-center">
                <span className="text-ash-gray-400 text-sm capitalize">
                  {categories.find((c) => c.id === template.category)?.name}
                </span>

                <Button
                  size="sm"
                  className="bg-neon-orange-500/20 hover:bg-neon-orange-500 text-neon-orange-400 hover:text-white border border-neon-orange-500/30 hover:border-neon-orange-500"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Usar
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ash-gray-400 text-lg">No se encontraron plantillas</p>
            <p className="text-ash-gray-500 text-sm mt-2">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
