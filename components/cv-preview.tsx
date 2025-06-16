"use client"

import { useState } from "react"
import { useCVContext } from "@/contexts/cv-context"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"
import { FullscreenCVViewer } from "@/components/fullscreen-cv-viewer"

export function CVPreview() {
  const { state } = useCVContext()
  const { data, settings } = state
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

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

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Vista Previa</h2>
            <p className="text-muted-foreground">Así se verá tu currículum</p>
          </div>
          <Button variant="outline" onClick={() => setIsFullscreenOpen(true)} className="flex items-center space-x-2">
            <Maximize2 className="h-4 w-4" />
            <span>Pantalla completa</span>
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div
              id="cv-preview"
              className="bg-white text-black w-full overflow-hidden print-container cursor-pointer hover:shadow-lg transition-shadow"
              style={{
                width: "210mm",
                minHeight: "297mm",
                maxHeight: "297mm",
                fontSize: "11px",
                lineHeight: "1.3",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              onClick={() => setIsFullscreenOpen(true)}
              title="Haz clic para ver en pantalla completa"
            >
              {renderTemplate()}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            💡 Haz clic en el CV o usa el botón "Pantalla completa" para una mejor vista
          </p>
        </div>
      </div>

      <FullscreenCVViewer isOpen={isFullscreenOpen} onClose={() => setIsFullscreenOpen(false)} />
    </>
  )
}
