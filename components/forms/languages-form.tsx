"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCVContext, type Language } from "@/contexts/cv-context"
import { Plus, X } from "lucide-react"

export function LanguagesForm() {
  const { state, dispatch } = useCVContext()
  const { languages } = state.data
  const [newLanguage, setNewLanguage] = useState({ name: "", level: "Intermedio" as const })

  const addLanguage = () => {
    if (!newLanguage.name.trim()) return

    const language: Language = {
      id: Date.now().toString(),
      ...newLanguage,
    }
    dispatch({ type: "ADD_LANGUAGE", payload: language })
    setNewLanguage({ name: "", level: "Intermedio" })
  }

  const deleteLanguage = (id: string) => {
    dispatch({ type: "DELETE_LANGUAGE", payload: id })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Idiomas</CardTitle>
        <CardDescription>Agrega los idiomas que dominas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Language */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">Agregar Nuevo Idioma</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Idioma</Label>
              <Input
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                placeholder="Español, Inglés, Francés, etc."
                onKeyPress={(e) => e.key === "Enter" && addLanguage()}
              />
            </div>
            <div className="space-y-2">
              <Label>Nivel</Label>
              <Select
                value={newLanguage.level}
                onValueChange={(value: any) => setNewLanguage({ ...newLanguage, level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Básico">Básico</SelectItem>
                  <SelectItem value="Intermedio">Intermedio</SelectItem>
                  <SelectItem value="Avanzado">Avanzado</SelectItem>
                  <SelectItem value="Nativo">Nativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addLanguage} disabled={!newLanguage.name.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar
          </Button>
        </div>

        {/* Languages List */}
        {languages.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Idiomas Agregados</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <Badge key={language.id} variant="secondary" className="flex items-center space-x-2">
                  <span>{language.name}</span>
                  <span className="text-xs opacity-70">({language.level})</span>
                  <button onClick={() => deleteLanguage(language.id)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
