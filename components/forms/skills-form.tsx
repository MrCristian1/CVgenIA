"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCVContext, type Skill } from "@/contexts/cv-context"
import { Plus, X, Sparkles, Loader2 } from "lucide-react"
import { generateSkillSuggestions } from "@/lib/ai-helpers"

export function SkillsForm() {
  const { state, dispatch } = useCVContext()
  const { skills } = state.data
  const [newSkill, setNewSkill] = useState({ name: "", level: "Intermedio" as const, category: "Técnica" as const })
  const [jobTitle, setJobTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const addSkill = () => {
    if (!newSkill.name.trim()) return

    const skill: Skill = {
      id: Date.now().toString(),
      ...newSkill,
    }
    dispatch({ type: "ADD_SKILL", payload: skill })
    setNewSkill({ name: "", level: "Intermedio", category: "Técnica" })
  }

  const deleteSkill = (id: string) => {
    dispatch({ type: "DELETE_SKILL", payload: id })
  }

  const handleGenerateSkills = async () => {
    if (!jobTitle.trim()) return

    setIsGenerating(true)
    try {
      const suggestions = await generateSkillSuggestions(jobTitle)
      suggestions.forEach((suggestion) => {
        const skill: Skill = {
          id: Date.now().toString() + Math.random(),
          name: suggestion.name,
          level: suggestion.level,
          category: suggestion.category,
        }
        dispatch({ type: "ADD_SKILL", payload: skill })
      })
    } catch (error) {
      console.error("Error generating skills:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const technicalSkills = skills.filter((skill) => skill.category === "Técnica")
  const softSkills = skills.filter((skill) => skill.category === "Blanda")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habilidades</CardTitle>
        <CardDescription>Agrega tus habilidades técnicas y blandas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Skill Generation */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-2">
            <Label htmlFor="skillJobTitle">Puesto objetivo (para sugerir habilidades)</Label>
            <Input
              id="skillJobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="ej. Desarrollador Frontend, Diseñador UX, etc."
            />
          </div>
          <Button onClick={handleGenerateSkills} disabled={!jobTitle.trim() || isGenerating} className="w-full">
            {isGenerating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Sugerir Habilidades con IA
          </Button>
        </div>

        {/* Add New Skill */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">Agregar Nueva Habilidad</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Habilidad</Label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="React, Liderazgo, etc."
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
            </div>
            <div className="space-y-2">
              <Label>Nivel</Label>
              <Select value={newSkill.level} onValueChange={(value: any) => setNewSkill({ ...newSkill, level: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Básico">Básico</SelectItem>
                  <SelectItem value="Intermedio">Intermedio</SelectItem>
                  <SelectItem value="Avanzado">Avanzado</SelectItem>
                  <SelectItem value="Experto">Experto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value: any) => setNewSkill({ ...newSkill, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Técnica">Técnica</SelectItem>
                  <SelectItem value="Blanda">Blanda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addSkill} disabled={!newSkill.name.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar
          </Button>
        </div>

        {/* Technical Skills */}
        {technicalSkills.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Habilidades Técnicas</h4>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map((skill) => (
                <Badge key={skill.id} variant="secondary" className="flex items-center space-x-2">
                  <span>{skill.name}</span>
                  <span className="text-xs opacity-70">({skill.level})</span>
                  <button onClick={() => deleteSkill(skill.id)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {softSkills.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Habilidades Blandas</h4>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <Badge key={skill.id} variant="outline" className="flex items-center space-x-2">
                  <span>{skill.name}</span>
                  <span className="text-xs opacity-70">({skill.level})</span>
                  <button onClick={() => deleteSkill(skill.id)} className="ml-1 hover:text-destructive">
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
