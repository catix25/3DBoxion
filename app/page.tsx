"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { MultiBoxCanvas } from "@/components/multi-box-canvas"
import { MultiBoxTools } from "@/components/multi-box-tools"
import { IconGenerator } from "@/components/icon-generator"
import { Header } from "@/components/header"
import { TemplateGallery } from "@/components/template-gallery"
import { FormatConverter } from "@/components/format-converter"
import { EmailTemplates } from "@/components/email-templates"
import { PushNotificationDesigner } from "@/components/push-notification-designer"
import { PrintingTools } from "@/components/printing-tools"
import { IntroVideo } from "@/components/intro-video"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeTab, setActiveTab] = useState("3dbox")
  const [selectedBoxId, setSelectedBoxId] = useState("box-1")
  const [selectedFaceId, setSelectedFaceId] = useState("front")

  const [boxes, setBoxes] = useState([
    {
      id: "box-1",
      position: [0, 0, 0] as [number, number, number],
      dimensions: { width: 190, height: 270, depth: 25 },
      faces: [
        {
          id: "front",
          name: "Frontal",
          texture: null,
          color: "#4a90e2",
          text: "3DBox Studio",
          fontSize: 32,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "back",
          name: "Trasera",
          texture: null,
          color: "#f0f0f0",
          text: "Información",
          fontSize: 16,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "left",
          name: "Izquierda",
          texture: null,
          color: "#ff6b35",
          text: "2025",
          fontSize: 24,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "right",
          name: "Derecha",
          texture: null,
          color: "#ff6b35",
          text: "2025",
          fontSize: 24,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "top",
          name: "Superior",
          texture: null,
          color: "#8bc34a",
          text: "TOP",
          fontSize: 20,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "bottom",
          name: "Inferior",
          texture: null,
          color: "#666666",
          text: "BOTTOM",
          fontSize: 20,
          fontFamily: "Arial, sans-serif",
        },
      ],
      boxType: "software" as const,
    },
  ])

  // Auto-ocultar intro después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const addNewBox = () => {
    const newBox = {
      id: `box-${Date.now()}`,
      position: [Math.random() * 4 - 2, 0, Math.random() * 4 - 2] as [number, number, number],
      dimensions: { width: 190, height: 270, depth: 25 },
      faces: [
        {
          id: "front",
          name: "Frontal",
          texture: null,
          color: "#4a90e2",
          text: "Nueva Caja",
          fontSize: 32,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "back",
          name: "Trasera",
          texture: null,
          color: "#f0f0f0",
          text: "Información",
          fontSize: 16,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "left",
          name: "Izquierda",
          texture: null,
          color: "#ff6b35",
          text: "2025",
          fontSize: 24,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "right",
          name: "Derecha",
          texture: null,
          color: "#ff6b35",
          text: "2025",
          fontSize: 24,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "top",
          name: "Superior",
          texture: null,
          color: "#8bc34a",
          text: "TOP",
          fontSize: 20,
          fontFamily: "Arial, sans-serif",
        },
        {
          id: "bottom",
          name: "Inferior",
          texture: null,
          color: "#666666",
          text: "BOTTOM",
          fontSize: 20,
          fontFamily: "Arial, sans-serif",
        },
      ],
      boxType: "software" as const,
    }
    setBoxes([...boxes, newBox])
    setSelectedBoxId(newBox.id)
  }

  const duplicateBox = (boxId: string) => {
    const boxToDuplicate = boxes.find((box) => box.id === boxId)
    if (boxToDuplicate) {
      const newBox = {
        ...boxToDuplicate,
        id: `box-${Date.now()}`,
        position: [boxToDuplicate.position[0] + 2, boxToDuplicate.position[1], boxToDuplicate.position[2]] as [
          number,
          number,
          number,
        ],
      }
      setBoxes([...boxes, newBox])
      setSelectedBoxId(newBox.id)
    }
  }

  const deleteBox = (boxId: string) => {
    if (boxes.length > 1) {
      const newBoxes = boxes.filter((box) => box.id !== boxId)
      setBoxes(newBoxes)
      if (selectedBoxId === boxId) {
        setSelectedBoxId(newBoxes[0].id)
      }
    }
  }

  const updateBox = (boxId: string, updates: any) => {
    setBoxes(boxes.map((box) => (box.id === boxId ? { ...box, ...updates } : box)))
  }

  const updateFace = (boxId: string, faceId: string, updates: any) => {
    setBoxes(
      boxes.map((box) =>
        box.id === boxId
          ? {
              ...box,
              faces: box.faces.map((face) => (face.id === faceId ? { ...face, ...updates } : face)),
            }
          : box,
      ),
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "3dbox":
        return (
          <div className="flex h-full">
            <div className="flex-1">
              <MultiBoxCanvas
                boxes={boxes}
                selectedBoxId={selectedBoxId}
                selectedFaceId={selectedFaceId}
                onBoxSelect={setSelectedBoxId}
                onFaceSelect={setSelectedFaceId}
                onBoxUpdate={updateBox}
                onFaceUpdate={updateFace}
              />
            </div>
            <MultiBoxTools
              boxes={boxes}
              selectedBoxId={selectedBoxId}
              selectedFaceId={selectedFaceId}
              onBoxAdd={addNewBox}
              onBoxDuplicate={duplicateBox}
              onBoxDelete={deleteBox}
              onBoxUpdate={updateBox}
              onFaceUpdate={updateFace}
            />
          </div>
        )
      case "icons":
        return <IconGenerator />
      case "templates":
        return <TemplateGallery />
      case "converter":
        return <FormatConverter />
      case "email":
        return <EmailTemplates />
      case "notifications":
        return <PushNotificationDesigner />
      case "print":
        return <PrintingTools />
      default:
        return (
          <div className="flex h-full">
            <div className="flex-1">
              <MultiBoxCanvas
                boxes={boxes}
                selectedBoxId={selectedBoxId}
                selectedFaceId={selectedFaceId}
                onBoxSelect={setSelectedBoxId}
                onFaceSelect={setSelectedFaceId}
                onBoxUpdate={updateBox}
                onFaceUpdate={updateFace}
              />
            </div>
            <MultiBoxTools
              boxes={boxes}
              selectedBoxId={selectedBoxId}
              selectedFaceId={selectedFaceId}
              onBoxAdd={addNewBox}
              onBoxDuplicate={duplicateBox}
              onBoxDelete={deleteBox}
              onBoxUpdate={updateBox}
              onFaceUpdate={updateFace}
            />
          </div>
        )
    }
  }

  if (showIntro) {
    return <IntroVideo onComplete={() => setShowIntro(false)} />
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-ash-gray-900 to-ash-gray-800 flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  )
}
