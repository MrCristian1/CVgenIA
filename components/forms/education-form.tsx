"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useCVContext, type Education } from "@/contexts/cv-context"
import { Plus, Trash2 } from "lucide-react"

export function EducationForm() {
  const { state, dispatch } = useCVContext()
  const { education } = state.data
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    dispatch({ type: "ADD_EDUCATION", payload: newEducation })
    setExpandedItems((prev) => new Set([...prev, newEducation.id]))
  }

  const updateEducation = (id: string, data: Partial<Education>) => {
    dispatch({ type: "UPDATE_EDUCATION", payload: { id, data } })
  }

  const deleteEducation = (id: string) => {
    dispatch({ type: "DELETE_EDUCATION", payload: id })
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Educación</CardTitle>
        <CardDescription>Agrega tu formación académica</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu) => (
          <Card key={edu.id} className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">
                    {edu.degree || "Nueva Educación"}
                    {edu.field && ` en ${edu.field}`}
                  </h4>
                  {edu.institution && <p className="text-sm text-muted-foreground">{edu.institution}</p>}
                  {edu.startDate && (
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.current ? "En curso" : edu.endDate}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => toggleExpanded(edu.id)}>
                    {expandedItems.has(edu.id) ? "Contraer" : "Expandir"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteEducation(edu.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedItems.has(edu.id) && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Título/Grado *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      placeholder="Licenciatura, Maestría, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Campo de Estudio</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                      placeholder="Ingeniería en Sistemas, Diseño, etc."
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Institución *</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      placeholder="Universidad Nacional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Inicio</Label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Fin</Label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      disabled={edu.current}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-edu-${edu.id}`}
                    checked={edu.current}
                    onCheckedChange={(checked) =>
                      updateEducation(edu.id, {
                        current: checked as boolean,
                        endDate: checked ? "" : edu.endDate,
                      })
                    }
                  />
                  <Label htmlFor={`current-edu-${edu.id}`}>En curso</Label>
                </div>

                <div className="space-y-2">
                  <Label>Descripción (opcional)</Label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                    placeholder="Menciona logros académicos, proyectos destacados, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        <Button onClick={addEducation} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Educación
        </Button>
      </CardContent>
    </Card>
  )
}
