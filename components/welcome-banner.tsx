"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Lightbulb, Edit3, Download } from "lucide-react"

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="container mx-auto px-4 pt-4">
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-primary">¡Bienvenido a CVgenIA!</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Hemos cargado un ejemplo completo para que veas cómo funciona. Puedes editarlo o usar el botón "Limpiar"
                para empezar desde cero.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="flex items-center space-x-1 bg-background/50 px-2 py-1 rounded">
                  <Edit3 className="h-3 w-3" />
                  <span>Edita cualquier campo</span>
                </div>
                <div className="flex items-center space-x-1 bg-background/50 px-2 py-1 rounded">
                  <Lightbulb className="h-3 w-3" />
                  <span>Usa IA para generar contenido</span>
                </div>
                <div className="flex items-center space-x-1 bg-background/50 px-2 py-1 rounded">
                  <Download className="h-3 w-3" />
                  <span>Exporta cuando esté listo</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="ml-4">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
