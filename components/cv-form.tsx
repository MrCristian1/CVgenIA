"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { ProfessionalSummaryForm } from "@/components/forms/professional-summary-form"
import { EducationForm } from "@/components/forms/education-form"
import { ExperienceForm } from "@/components/forms/experience-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { LanguagesForm } from "@/components/forms/languages-form"
import { CertificationsForm } from "@/components/forms/certifications-form"
import { SettingsForm } from "@/components/forms/settings-form"
import { User, FileText, GraduationCap, Briefcase, Zap, Globe, Award, Settings } from "lucide-react"

export function CVForm() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Información del CV</h2>
        <p className="text-muted-foreground">Completa la información para generar tu currículum profesional</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="personal" className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center space-x-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Resumen</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center space-x-1">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Educación</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center space-x-1">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Experiencia</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center space-x-1">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Habilidades</span>
          </TabsTrigger>
          <TabsTrigger value="languages" className="flex items-center space-x-1">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Idiomas</span>
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center space-x-1">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Certificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Diseño</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <PersonalInfoForm />
        </TabsContent>
        <TabsContent value="summary" className="mt-6">
          <ProfessionalSummaryForm />
        </TabsContent>
        <TabsContent value="education" className="mt-6">
          <EducationForm />
        </TabsContent>
        <TabsContent value="experience" className="mt-6">
          <ExperienceForm />
        </TabsContent>
        <TabsContent value="skills" className="mt-6">
          <SkillsForm />
        </TabsContent>
        <TabsContent value="languages" className="mt-6">
          <LanguagesForm />
        </TabsContent>
        <TabsContent value="certifications" className="mt-6">
          <CertificationsForm />
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <SettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
