"use client"

import { useState } from "react"
import { Settings, Key, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BACKGROUND_REMOVAL_PROVIDERS } from "@/lib/config"

interface ApiSettingsDialogProps {
  onApiKeyUpdate: (provider: string, apiKey: string) => void
}

export function ApiSettingsDialog({ onApiKeyUpdate }: ApiSettingsDialogProps) {
  const [apiKeys, setApiKeys] = useState({
    removebg: "",
    clipdrop: "",
    photoroom: "",
  })

  const handleSave = (provider: string) => {
    onApiKeyUpdate(provider, apiKeys[provider as keyof typeof apiKeys])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-ash-gray-800/50 border-ash-gray-600/50 text-ash-gray-300">
          <Settings className="w-4 h-4 mr-2" />
          Configurar APIs
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-ash-gray-800 border-ash-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-neon-orange-500" />
            Configuración de APIs
          </DialogTitle>
          <DialogDescription className="text-ash-gray-400">
            Configura las claves de API para servicios de remoción de fondo
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="providers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-ash-gray-700/50">
            <TabsTrigger value="providers">Proveedores</TabsTrigger>
            <TabsTrigger value="keys">Claves API</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-4">
            <div className="space-y-4">
              {BACKGROUND_REMOVAL_PROVIDERS.map((provider) => (
                <div key={provider.id} className="bg-ash-gray-700/30 rounded-lg p-4 border border-ash-gray-600/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white">{provider.name}</h4>
                      <p className="text-sm text-ash-gray-400 mt-1">{provider.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            provider.requiresApiKey
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {provider.requiresApiKey ? "Requiere API Key" : "Sin API Key"}
                        </span>
                        <span className="text-xs text-ash-gray-500">{provider.cost}</span>
                      </div>
                    </div>
                    <Info className="w-4 h-4 text-ash-gray-500" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="keys" className="space-y-4">
            <div className="space-y-6">
              <div>
                <Label htmlFor="removebg-key" className="text-ash-gray-300">
                  Remove.bg API Key
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="removebg-key"
                    type="password"
                    placeholder="Ingresa tu API key de Remove.bg"
                    value={apiKeys.removebg}
                    onChange={(e) => setApiKeys({ ...apiKeys, removebg: e.target.value })}
                    className="bg-ash-gray-700/50 border-ash-gray-600/50 text-white"
                  />
                  <Button
                    onClick={() => handleSave("removebg")}
                    size="sm"
                    className="bg-neon-orange-500 hover:bg-neon-orange-600"
                  >
                    Guardar
                  </Button>
                </div>
                <p className="text-xs text-ash-gray-500 mt-1">
                  Obtén tu API key en{" "}
                  <a
                    href="https://www.remove.bg/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-orange-400 hover:underline"
                  >
                    remove.bg/api
                  </a>
                </p>
              </div>

              <div>
                <Label htmlFor="clipdrop-key" className="text-ash-gray-300">
                  Clipdrop API Key
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="clipdrop-key"
                    type="password"
                    placeholder="Ingresa tu API key de Clipdrop"
                    value={apiKeys.clipdrop}
                    onChange={(e) => setApiKeys({ ...apiKeys, clipdrop: e.target.value })}
                    className="bg-ash-gray-700/50 border-ash-gray-600/50 text-white"
                  />
                  <Button
                    onClick={() => handleSave("clipdrop")}
                    size="sm"
                    className="bg-neon-orange-500 hover:bg-neon-orange-600"
                  >
                    Guardar
                  </Button>
                </div>
                <p className="text-xs text-ash-gray-500 mt-1">
                  Obtén tu API key en{" "}
                  <a
                    href="https://clipdrop.co/apis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-orange-400 hover:underline"
                  >
                    clipdrop.co/apis
                  </a>
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
