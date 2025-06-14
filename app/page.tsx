"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { WorkspaceCanvas } from "@/components/workspace-canvas"
import { WorkspaceTools } from "@/components/workspace-tools"
import { TemplateGallery } from "@/components/template-gallery"
import { FormatConverter } from "@/components/format-converter"
import { EmailTemplates } from "@/components/email-templates"
import { PushNotificationDesigner } from "@/components/push-notification-designer"
import { PrintingTools } from "@/components/printing-tools"

interface BoxData {
  id: string
  dimensions: { width: number; height: number; depth: number }
  faces: Array<{
    id: string
    name: string
    texture: string | null
    color: string
    text: string
    fontSize: number
    fontFamily: string
  }>
  boxType: "software" | "dvd" | "cd" | "icon" | "desktop"
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("3dbox")
  const [selectedFaceId, setSelectedFaceId] = useState("front")

  const [currentBox, setCurrentBox] = useState<BoxData>({
    id: "main-box",
    dimensions: { width: 190, height: 270, depth: 25 },
    boxType: "software",
    faces: [
      {
        id: "front",
        name: "Frontal",
        texture: null,
        color: "#f8f9fa",
        text: "",
        fontSize: 24,
        fontFamily: "Arial, sans-serif",
      },
      {
        id: "back",
        name: "Trasera",
        texture: null,
        color: "#f0f0f0",
        text: "",
        fontSize: 18,
        fontFamily: "Arial, sans-serif",
      },
      {
        id: "left",
        name: "Izquierda",
        texture: null,
        color: "#f0f0f0",
        text: "",
        fontSize: 16,
        fontFamily: "Arial, sans-serif",
      },
      {
        id: "right",
        name: "Derecha",
        texture: null,
        color: "#f0f0f0",
        text: "",
        fontSize: 16,
        fontFamily: "Arial, sans-serif",
      },
      {
        id: "top",
        name: "Superior",
        texture: null,
        color: "#f0f0f0",
        text: "",
        fontSize: 14,
        fontFamily: "Arial, sans-serif",
      },
      {
        id: "bottom",
        name: "Inferior",
        texture: null,
        color: "#f0f0f0",
        text: "",
        fontSize: 14,
        fontFamily: "Arial, sans-serif",
      },
    ],
  })

  const handleBoxUpdate = (updates: Partial<BoxData>) => {
    setCurrentBox((prev) => ({ ...prev, ...updates }))
  }

  const handleFaceUpdate = (faceId: string, updates: any) => {
    setCurrentBox((prev) => ({
      ...prev,
      faces: prev.faces.map((face) => (face.id === faceId ? { ...face, ...updates } : face)),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ash-gray-900 via-ash-gray-900 to-black">
      <Header />

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 flex overflow-hidden">
          {activeTab === "3dbox" && (
            <>
              <WorkspaceCanvas
                box={currentBox}
                selectedFaceId={selectedFaceId}
                onFaceSelect={setSelectedFaceId}
                onBoxUpdate={handleBoxUpdate}
                onFaceUpdate={handleFaceUpdate}
              />

              <WorkspaceTools
                box={currentBox}
                selectedFaceId={selectedFaceId}
                onBoxUpdate={handleBoxUpdate}
                onFaceUpdate={handleFaceUpdate}
              />
            </>
          )}

          {activeTab === "templates" && (
            <div className="flex-1 overflow-hidden">
              <TemplateGallery />
            </div>
          )}

          {activeTab === "converter" && (
            <div className="flex-1 overflow-hidden">
              <FormatConverter />
            </div>
          )}

          {activeTab === "email" && (
            <div className="flex-1 overflow-hidden">
              <EmailTemplates />
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="flex-1 overflow-hidden">
              <PushNotificationDesigner />
            </div>
          )}

          {activeTab === "print" && (
            <div className="flex-1 overflow-hidden">
              <PrintingTools />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
