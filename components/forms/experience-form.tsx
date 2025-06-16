"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useCVContext, type Experience } from "@/contexts/cv-context"
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { generateExperienceDescription } from "@/lib/ai-helpers"

export function ExperienceForm() {
  const { state, dispatch } = useCVContext()
  const { experience } = state.data
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [generatingFor, setGeneratingFor] = useState<string | null>(null)

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    }
    dispatch({ type: "ADD_EXPERIENCE", payload: newExperience })
    setExpandedItems((prev) => new Set([...prev, newExperience.id]))
  }

  const updateExperience = (id: string, data: Partial<Experience>) => {
    dispatch({ type: "UPDATE_EXPERIENCE", payload: { id, data } })
  }

  const deleteExperience = (id: string) => {
    dispatch({ type: "DELETE_EXPERIENCE", payload: id })
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
  }

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleGenerateDescription = async (exp: Experience) => {
    if (!exp.position.trim() || !exp.company.trim()) return

    setGeneratingFor(exp.id)
    try {
      const description = await generateExperienceDescription(exp.position, exp.company)
      updateExperience(exp.id, { description })
    } catch (error) {
      console.error("Error generating description:", error)
    } finally {
      setGeneratingFor(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Experiencia Laboral</CardTitle>
        <CardDescription>Agrega tu experiencia profesional</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {experience.map((exp) => (
          <Card key={exp.id} className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">
                    {exp.position || "Nueva Experiencia"}
                    {exp.company && ` - ${exp.company}`}
                  </h4>
                  {exp.startDate && (
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => toggleExpanded(exp.id)}>
                    {expandedItems.has(exp.id) ? "Contraer" : "Expandir"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedItems.has(exp.id) && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Puesto *</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                      placeholder="Desarrollador Frontend"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Empresa *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="Tech Company Inc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Inicio</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Fin</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      disabled={exp.current}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Ubicación</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      placeholder="Ciudad, País"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) =>
                      updateExperience(exp.id, {
                        current: checked as boolean,
                        endDate: checked ? "" : exp.endDate,
                      })
                    }
                  />
                  <Label htmlFor={`current-${exp.id}`}>Trabajo actual</Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Descripción</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGenerateDescription(exp)}
                      disabled={!exp.position.trim() || !exp.company.trim() || generatingFor === exp.id}
                    >
                      {generatingFor === exp.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Generar con IA
                    </Button>
                  </div>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    placeholder="Describe tus responsabilidades y logros en este puesto..."
                    rows={4}
                  />
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        <Button onClick={addExperience} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Experiencia
        </Button>
      </CardContent>
    </Card>
  )
}
