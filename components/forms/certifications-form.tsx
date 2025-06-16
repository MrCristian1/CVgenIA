"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCVContext, type Certification } from "@/contexts/cv-context"
import { Plus, Trash2, ExternalLink } from "lucide-react"

export function CertificationsForm() {
  const { state, dispatch } = useCVContext()
  const { certifications } = state.data
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      url: "",
    }
    dispatch({ type: "ADD_CERTIFICATION", payload: newCertification })
    setExpandedItems((prev) => new Set([...prev, newCertification.id]))
  }

  const updateCertification = (id: string, data: Partial<Certification>) => {
    dispatch({ type: "UPDATE_CERTIFICATION", payload: { id, data } })
  }

  const deleteCertification = (id: string) => {
    dispatch({ type: "DELETE_CERTIFICATION", payload: id })
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
        <CardTitle>Certificaciones</CardTitle>
        <CardDescription>Agrega tus certificaciones y cursos completados</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {certifications.map((cert) => (
          <Card key={cert.id} className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{cert.name || "Nueva Certificación"}</h4>
                  {cert.issuer && <p className="text-sm text-muted-foreground">{cert.issuer}</p>}
                  {cert.date && <p className="text-sm text-muted-foreground">{cert.date}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  {cert.url && (
                    <Button variant="ghost" size="sm" onClick={() => window.open(cert.url, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => toggleExpanded(cert.id)}>
                    {expandedItems.has(cert.id) ? "Contraer" : "Expandir"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteCertification(cert.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedItems.has(cert.id) && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Nombre de la Certificación *</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                      placeholder="AWS Certified Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Emisor *</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Obtención</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>URL de Verificación (opcional)</Label>
                    <Input
                      value={cert.url}
                      onChange={(e) => updateCertification(cert.id, { url: e.target.value })}
                      placeholder="https://verify.certificate.com/123456"
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        <Button onClick={addCertification} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Certificación
        </Button>
      </CardContent>
    </Card>
  )
}
