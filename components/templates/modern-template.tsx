"use client"

import type { CVData, CVSettings } from "@/contexts/cv-context"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from "lucide-react"

interface TemplateProps {
  data: CVData
  settings: CVSettings
}

export function ModernTemplate({ data, settings }: TemplateProps) {
  const { personalInfo, professionalSummary, experience, education, skills, languages, certifications } = data

  const getFontClass = () => {
    switch (settings.font) {
      case "roboto":
        return "font-sans"
      case "playfair":
        return "font-serif"
      default:
        return "font-sans"
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div
      className={`${getFontClass()} p-6 h-full text-xs leading-tight`}
      style={{ fontSize: "11px", lineHeight: "1.3" }}
    >
      {/* Header - Compacto */}
      <div className="mb-5">
        <h1 className="text-xl font-bold mb-2" style={{ color: settings.primaryColor, fontSize: "20px" }}>
          {personalInfo.fullName || "Tu Nombre"}
        </h1>

        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              <span>LinkedIn</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-3 h-3" />
              <span>GitHub</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary - Compacto */}
      {professionalSummary && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-2 pb-1 border-b" style={{ borderColor: settings.primaryColor }}>
            Resumen Profesional
          </h2>
          <p className="text-gray-700 leading-relaxed text-xs">{professionalSummary}</p>
        </div>
      )}

      {/* Experience - Compacto */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-2 pb-1 border-b" style={{ borderColor: settings.primaryColor }}>
            Experiencia Laboral
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-xs">{exp.position}</h3>
                    <p className="text-gray-600 text-xs">{exp.company}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-2 h-2" />
                      <span>
                        {formatDate(exp.startDate)} - {exp.current ? "Presente" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.location && <p className="text-xs">{exp.location}</p>}
                  </div>
                </div>
                {exp.description && <p className="text-gray-700 text-xs mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education - Compacto */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-2 pb-1 border-b" style={{ borderColor: settings.primaryColor }}>
            Educación
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xs">{edu.degree}</h3>
                    {edu.field && <p className="text-gray-600 text-xs">{edu.field}</p>}
                    <p className="text-gray-600 text-xs">{edu.institution}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-2 h-2" />
                      <span>
                        {formatDate(edu.startDate)} - {edu.current ? "En curso" : formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
                {edu.description && <p className="text-gray-700 text-xs mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skills - Compacto */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-2 pb-1 border-b" style={{ borderColor: settings.primaryColor }}>
              Habilidades
            </h2>
            <div className="space-y-2">
              {skills.filter((s) => s.category === "Técnica").length > 0 && (
                <div>
                  <h4 className="font-medium text-xs mb-1">Técnicas</h4>
                  <div className="flex flex-wrap gap-1">
                    {skills
                      .filter((s) => s.category === "Técnica")
                      .map((skill) => (
                        <span
                          key={skill.id}
                          className="px-1.5 py-0.5 text-xs rounded text-white"
                          style={{ backgroundColor: settings.primaryColor, fontSize: "10px" }}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}
              {skills.filter((s) => s.category === "Blanda").length > 0 && (
                <div>
                  <h4 className="font-medium text-xs mb-1">Blandas</h4>
                  <div className="flex flex-wrap gap-1">
                    {skills
                      .filter((s) => s.category === "Blanda")
                      .map((skill) => (
                        <span
                          key={skill.id}
                          className="px-1.5 py-0.5 text-xs rounded border"
                          style={{ borderColor: settings.primaryColor, color: settings.primaryColor, fontSize: "10px" }}
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages - Compacto */}
        {languages.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-2 pb-1 border-b" style={{ borderColor: settings.primaryColor }}>
              Idiomas
            </h2>
            <div className="space-y-1">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="font-medium text-xs">{lang.name}</span>
                  <span className="text-xs text-gray-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certifications - Compacto */}
      {certifications.length > 0 && (
        <div className="mt-3">
          <h2 className="text-sm font-semibold mb-2 pb-1 border-b" style={{ borderColor: settings.primaryColor }}>
            Certificaciones
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-xs">{cert.name}</h4>
                  <p className="text-gray-600 text-xs">{cert.issuer}</p>
                </div>
                {cert.date && <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
