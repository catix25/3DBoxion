"use client"

import { Box, ImageIcon, Mail, Bell, RefreshCw, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: "3dbox", icon: Box, label: "Caja 3D", color: "from-blue-500 to-blue-600" },
    { id: "templates", icon: ImageIcon, label: "Plantillas", color: "from-purple-500 to-purple-600" },
    { id: "converter", icon: RefreshCw, label: "Convertidor", color: "from-green-500 to-green-600" },
    { id: "email", icon: Mail, label: "Email", color: "from-yellow-500 to-yellow-600" },
    { id: "notifications", icon: Bell, label: "Push", color: "from-red-500 to-red-600" },
    { id: "print", icon: Printer, label: "Imprimir", color: "from-indigo-500 to-indigo-600" },
  ]

  return (
    <div className="w-20 bg-ash-gray-800/30 backdrop-blur-md border-r border-ash-gray-700/30 flex flex-col items-center py-6 gap-4">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className={`w-12 h-12 rounded-2xl p-0 transition-all duration-300 transform hover:scale-110 ${
              isActive
                ? `bg-gradient-to-br ${tab.color} shadow-3d text-white`
                : "text-ash-gray-400 hover:text-white hover:bg-ash-gray-700/50"
            }`}
            title={tab.label}
          >
            <Icon className="w-5 h-5" />
          </Button>
        )
      })}
    </div>
  )
}
