"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCVContext } from "@/contexts/cv-context"
import { Sparkles, Loader2 } from "lucide-react"
import { generateProfessionalSummary } from "@/lib/ai-helpers"

export function ProfessionalSummaryForm() {
  const { state, dispatch } = useCVContext()
  const { professionalSummary } = state.data
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobTitle, setJobTitle] = useState("")

  const handleChange = (value: string) => {
    dispatch({
      type: "UPDATE_PROFESSIONAL_SUMMARY",
      payload: value,
    })
  }

  const handleGenerateSummary = async () => {
    if (!jobTitle.trim()) return

    setIsGenerating(true)
    try {
      const summary = await generateProfessionalSummary(jobTitle, state.data)
      handleChange(summary)
    } catch (error) {
      console.error("Error generating summary:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen Profesional</CardTitle>
        <CardDescription>Describe tu perfil profesional o genera uno automáticamente con IA</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Puesto objetivo (para generar con IA)</Label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="ej. Desarrollador Frontend, Diseñador UX, etc."
            />
          </div>
          <Button onClick={handleGenerateSummary} disabled={!jobTitle.trim() || isGenerating} className="w-full">
            {isGenerating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generar Resumen con IA
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Resumen Profesional</Label>
          <Textarea
            id="summary"
            value={professionalSummary}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Escribe un breve resumen de tu perfil profesional, experiencia y objetivos..."
            rows={6}
          />
        </div>
      </CardContent>
    </Card>
  )
}
