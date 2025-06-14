"use client"

import { useState } from "react"
import { Bell, Smartphone, Monitor, Send } from "lucide-react"

export function PushNotificationDesigner() {
  const [notification, setNotification] = useState({
    title: "Nueva actualización disponible",
    body: "Descubre las nuevas funciones de 3DBox Studio",
    icon: "/placeholder.svg?height=64&width=64",
    image: "/placeholder.svg?height=200&width=400",
    badge: "/placeholder.svg?height=32&width=32",
  })

  const [previewDevice, setPreviewDevice] = useState("mobile")

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-ash-gray-900 to-ash-gray-800">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Diseñador de Notificaciones Push</h2>
            <p className="text-ash-gray-400">Crea notificaciones push atractivas para tus usuarios</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor */}
            <div className="bg-ash-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-ash-gray-700/30">
              <h3 className="text-white font-semibold mb-6">Configuración</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-ash-gray-300 text-sm font-medium mb-2">Título de la notificación</label>
                  <input
                    value={notification.title}
                    onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                    className="w-full px-3 py-2 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white focus:border-neon-orange-500 focus:outline-none"
                    placeholder="Título llamativo..."
                  />
                </div>

                <div>
                  <label className="block text-ash-gray-300 text-sm font-medium mb-2">Mensaje</label>
                  <textarea
                    value={notification.body}
                    onChange={(e) => setNotification({ ...notification, body: e.target.value })}
                    className="w-full px-3 py-2 bg-ash-gray-800/50 border border-ash-gray-600/50 rounded-lg text-white resize-none focus:border-neon-orange-500 focus:outline-none"
                    rows={3}
                    placeholder="Describe tu mensaje..."
                  />
                </div>

                <div>
                  <label className="block text-ash-gray-300 text-sm font-medium mb-2">Icono de la aplicación</label>
                  <div className="flex items-center gap-3">
                    <img
                      src={notification.icon || "/placeholder.svg"}
                      alt="Icon"
                      className="w-12 h-12 rounded-lg bg-ash-gray-700"
                    />
                    <button className="bg-ash-gray-800/50 border border-ash-gray-600/50 text-ash-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-ash-gray-700/50 transition-colors">
                      Cambiar Icono
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-ash-gray-300 text-sm font-medium mb-2">
                    Imagen destacada (opcional)
                  </label>
                  <div className="space-y-3">
                    <img
                      src={notification.image || "/placeholder.svg"}
                      alt="Featured"
                      className="w-full h-24 object-cover rounded-lg bg-ash-gray-700"
                    />
                    <button className="bg-ash-gray-800/50 border border-ash-gray-600/50 text-ash-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-ash-gray-700/50 transition-colors">
                      Cambiar Imagen
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vista previa */}
            <div className="bg-ash-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-ash-gray-700/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Vista Previa</h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      previewDevice === "mobile"
                        ? "bg-neon-orange-500 text-white"
                        : "bg-ash-gray-800/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Móvil
                  </button>
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      previewDevice === "desktop"
                        ? "bg-neon-orange-500 text-white"
                        : "bg-ash-gray-800/50 text-ash-gray-300 hover:bg-ash-gray-700/50"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    Escritorio
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Vista previa móvil */}
                {previewDevice === "mobile" && (
                  <div className="bg-ash-gray-900 rounded-2xl p-4 max-w-sm mx-auto">
                    <div className="bg-ash-gray-800 rounded-xl p-4 shadow-lg">
                      <div className="flex items-start gap-3">
                        <img
                          src={notification.icon || "/placeholder.svg"}
                          alt="App icon"
                          className="w-8 h-8 rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-white font-medium text-sm truncate">3DBox Studio</h4>
                            <span className="text-ash-gray-400 text-xs">ahora</span>
                          </div>
                          <h5 className="text-white font-semibold text-sm mb-1">{notification.title}</h5>
                          <p className="text-ash-gray-300 text-xs leading-relaxed">{notification.body}</p>
                          {notification.image && (
                            <img
                              src={notification.image || "/placeholder.svg"}
                              alt="Notification"
                              className="w-full h-20 object-cover rounded-lg mt-3"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vista previa escritorio */}
                {previewDevice === "desktop" && (
                  <div className="bg-ash-gray-900 rounded-xl p-4 max-w-md">
                    <div className="bg-ash-gray-800 rounded-lg p-4 shadow-lg border border-ash-gray-700">
                      <div className="flex items-start gap-3">
                        <img
                          src={notification.icon || "/placeholder.svg"}
                          alt="App icon"
                          className="w-10 h-10 rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium">3DBox Studio</h4>
                            <Bell className="w-4 h-4 text-ash-gray-400" />
                          </div>
                          <h5 className="text-white font-semibold mb-2">{notification.title}</h5>
                          <p className="text-ash-gray-300 text-sm leading-relaxed">{notification.body}</p>
                          {notification.image && (
                            <img
                              src={notification.image || "/placeholder.svg"}
                              alt="Notification"
                              className="w-full h-24 object-cover rounded-lg mt-3"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-center">
                <button className="bg-neon-orange-500 hover:bg-neon-orange-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Enviar Notificación de Prueba
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
