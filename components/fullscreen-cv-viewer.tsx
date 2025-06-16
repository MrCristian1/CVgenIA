"use client"

import { useState, useEffect } from "react"
import { useCVContext } from "@/contexts/cv-context"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { Button } from "@/components/ui/button"
import { Minimize2, X, Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { printCV } from "@/lib/pdf-export"

interface FullscreenCVViewerProps {
  isOpen: boolean
  onClose: () => void
}

export function FullscreenCVViewer({ isOpen, onClose }: FullscreenCVViewerProps) {
  const { state } = useCVContext()
  const { data, settings } = state
  const [zoom, setZoom] = useState(1.2)

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const renderTemplate = () => {
    switch (settings.template) {
      case "classic":
        return <ClassicTemplate data={data} settings={settings} />
      case "modern":
        return <ModernTemplate data={data} settings={settings} />
      case "creative":
        return <CreativeTemplate data={data} settings={settings} />
      default:
        return <ModernTemplate data={data} settings={settings} />
    }
  }

  const handleExportPDF = () => {
    printCV()
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const resetZoom = () => {
    setZoom(1.2)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 dark:bg-gray-900">
      {/* Header de pantalla completa */}
      <div className="bg-white dark:bg-gray-800 border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">Vista Previa - Pantalla Completa</h2>
          <p className="text-sm text-muted-foreground">
            Plantilla:{" "}
            {settings.template === "classic" ? "Clásica" : settings.template === "modern" ? "Moderna" : "Creativa"} •
            Zoom: {Math.round(zoom * 100)}%
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Controles de zoom */}
          <div className="flex items-center space-x-1 border rounded-md">
            <Button variant="ghost" size="sm" onClick={zoomOut} disabled={zoom <= 0.5}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={resetZoom}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={zoomIn} disabled={zoom >= 2}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Acciones rápidas */}
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>

          {/* Cerrar */}
          <Button variant="outline" size="sm" onClick={onClose}>
            <Minimize2 className="h-4 w-4 mr-2" />
            Salir
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contenido en pantalla completa */}
      <div className="h-[calc(100vh-73px)] overflow-auto bg-gray-100 dark:bg-gray-900 p-8">
        <div className="flex justify-center">
          <div
            id="cv-preview-fullscreen"
            className="bg-white text-black shadow-2xl print-container transition-transform duration-200"
            style={{
              width: "210mm",
              minHeight: "297mm",
              maxHeight: "297mm",
              fontSize: "11px",
              lineHeight: "1.3",
              fontFamily: "system-ui, -apple-system, sans-serif",
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              marginBottom: "100px",
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Indicador de teclas */}
      <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded-md text-xs">
        <p>
          Presiona <kbd className="bg-white/20 px-1 rounded">Esc</kbd> para salir
        </p>
      </div>
    </div>
  )
}
