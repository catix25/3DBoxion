import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "3DBox Studio - Create Studio 2025",
  description: "Creador profesional de portadas 3D, iconos y plantillas",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} h-full m-0 p-0 overflow-hidden`}>{children}</body>
    </html>
  )
}
