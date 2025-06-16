"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCVContext } from "@/contexts/cv-context"

const colorOptions = [
  { value: "#3b82f6", label: "Azul", color: "bg-blue-500" },
  { value: "#10b981", label: "Verde", color: "bg-emerald-500" },
  { value: "#f59e0b", label: "Amarillo", color: "bg-amber-500" },
  { value: "#ef4444", label: "Rojo", color: "bg-red-500" },
  { value: "#8b5cf6", label: "Púrpura", color: "bg-violet-500" },
  { value: "#06b6d4", label: "Cian", color: "bg-cyan-500" },
  { value: "#84cc16", label: "Lima", color: "bg-lime-500" },
  { value: "#f97316", label: "Naranja", color: "bg-orange-500" },
]

const fontOptions = [
  { value: "inter", label: "Inter (Moderno)" },
  { value: "roboto", label: "Roboto (Clásico)" },
  { value: "playfair", label: "Playfair Display (Elegante)" },
]

const templateOptions = [
  { value: "classic", label: "Clásico", description: "Diseño tradicional y profesional" },
  { value: "modern", label: "Moderno", description: "Diseño limpio y minimalista" },
  { value: "creative", label: "Creativo", description: "Diseño llamativo y único" },
]

export function SettingsForm() {
  const { state, dispatch } = useCVContext()
  const { settings } = state

  const updateSettings = (updates: Partial<typeof settings>) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: updates })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalización del Diseño</CardTitle>
        <CardDescription>Personaliza la apariencia de tu currículum</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-3">
          <Label>Plantilla</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templateOptions.map((template) => (
              <Card
                key={template.value}
                className={`cursor-pointer transition-all ${
                  settings.template === template.value ? "ring-2 ring-primary" : "hover:shadow-md"
                }`}
                onClick={() => updateSettings({ template: template.value as any })}
              >
                <CardContent className="p-4">
                  <h4 className="font-medium">{template.label}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-3">
          <Label>Color Principal</Label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                className={`w-8 h-8 rounded-full ${color.color} border-2 transition-all ${
                  settings.primaryColor === color.value ? "border-foreground scale-110" : "border-muted hover:scale-105"
                }`}
                onClick={() => updateSettings({ primaryColor: color.value })}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Font Selection */}
        <div className="space-y-3">
          <Label>Tipografía</Label>
          <Select value={settings.font} onValueChange={(value: any) => updateSettings({ font: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
