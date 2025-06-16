"use client"

import type { CVData, CVSettings } from "@/contexts/cv-context"
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react"

interface TemplateProps {
  data: CVData
  settings: CVSettings
}

export function ClassicTemplate({ data, settings }: TemplateProps) {
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
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className={`${getFontClass()} p-8 h-full`}>
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold mb-4" style={{ color: settings.primaryColor }}>
          {personalInfo.fullName || "Tu Nombre"}
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-2">
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {professionalSummary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: settings.primaryColor }}>
            RESUMEN PROFESIONAL
          </h2>
          <p className="text-gray-700 leading-relaxed text-center italic">{professionalSummary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: settings.primaryColor }}>
            EXPERIENCIA LABORAL
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: settings.primaryColor }}>
                <div className="mb-2">
                  <h3 className="text-lg font-bold">{exp.position}</h3>
                  <p className="font-semibold text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {exp.current ? "Presente" : formatDate(exp.endDate)}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                </div>
                {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: settings.primaryColor }}>
            EDUCACIÓN
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 pl-4" style={{ borderColor: settings.primaryColor }}>
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                {edu.field && <p className="font-semibold text-gray-700">{edu.field}</p>}
                <p className="font-semibold text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(edu.startDate)} - {edu.current ? "En curso" : formatDate(edu.endDate)}
                </p>
                {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center" style={{ color: settings.primaryColor }}>
              HABILIDADES
            </h2>
            <div className="space-y-4">
              {skills.filter((s) => s.category === "Técnica").length > 0 && (
                <div>
                  <h4 className="font-bold mb-2">Técnicas</h4>
                  <ul className="space-y-1">
                    {skills
                      .filter((s) => s.category === "Técnica")
                      .map((skill) => (
                        <li key={skill.id} className="flex justify-between">
                          <span>{skill.name}</span>
                          <span className="text-sm text-gray-600">({skill.level})</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              {skills.filter((s) => s.category === "Blanda").length > 0 && (
                <div>
                  <h4 className="font-bold mb-2">Blandas</h4>
                  <ul className="space-y-1">
                    {skills
                      .filter((s) => s.category === "Blanda")
                      .map((skill) => (
                        <li key={skill.id} className="flex justify-between">
                          <span>{skill.name}</span>
                          <span className="text-sm text-gray-600">({skill.level})</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center" style={{ color: settings.primaryColor }}>
              IDIOMAS
            </h2>
            <ul className="space-y-2">
              {languages.map((lang) => (
                <li key={lang.id} className="flex justify-between">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-gray-600">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: settings.primaryColor }}>
            CERTIFICACIONES
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="border-l-4 pl-4" style={{ borderColor: settings.primaryColor }}>
                <h4 className="font-bold">{cert.name}</h4>
                <p className="text-gray-700">{cert.issuer}</p>
                {cert.date && <p className="text-sm text-gray-500">{formatDate(cert.date)}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
