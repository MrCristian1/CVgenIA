"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCVContext } from "@/contexts/cv-context"

export function PersonalInfoForm() {
  const { state, dispatch } = useCVContext()
  const { personalInfo } = state.data

  const handleChange = (field: string, value: string) => {
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: { [field]: value },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>Ingresa tus datos personales y de contacto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo *</Label>
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Juan Pérez"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="juan@ejemplo.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Ciudad, País"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Sitio Web</Label>
            <Input
              id="website"
              value={personalInfo.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://miportfolio.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/usuario"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={personalInfo.github}
              onChange={(e) => handleChange("github", e.target.value)}
              placeholder="https://github.com/usuario"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
