"use client"

import type { CVData, CVSettings } from "@/contexts/cv-context"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Award, GraduationCap, Briefcase } from "lucide-react"

interface TemplateProps {
  data: CVData
  settings: CVSettings
}

export function CreativeTemplate({ data, settings }: TemplateProps) {
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
    <div className={`${getFontClass()} h-full flex`}>
      {/* Left Sidebar */}
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: settings.primaryColor }}>
        {/* Profile */}
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl font-bold">
              {personalInfo.fullName
                ? personalInfo.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                : "TN"}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">{personalInfo.fullName || "Tu Nombre"}</h1>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            CONTACTO
          </h2>
          <div className="space-y-3 text-sm">
            {personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <span>LinkedIn</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 flex-shrink-0" />
                <span>GitHub</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">HABILIDADES</h2>
            <div className="space-y-4">
              {skills.filter((s) => s.category === "Técnica").length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Técnicas</h4>
                  <div className="space-y-2">
                    {skills
                      .filter((s) => s.category === "Técnica")
                      .map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between text-xs mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.level}</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-1">
                            <div
                              className="bg-white h-1 rounded-full"
                              style={{
                                width:
                                  skill.level === "Básico"
                                    ? "25%"
                                    : skill.level === "Intermedio"
                                      ? "50%"
                                      : skill.level === "Avanzado"
                                        ? "75%"
                                        : "100%",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {skills.filter((s) => s.category === "Blanda").length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Blandas</h4>
                  <div className="flex flex-wrap gap-1">
                    {skills
                      .filter((s) => s.category === "Blanda")
                      .map((skill) => (
                        <span key={skill.id} className="px-2 py-1 bg-white/20 rounded text-xs">
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">IDIOMAS</h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-sm">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-xs">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8">
        {/* Professional Summary */}
        {professionalSummary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: settings.primaryColor }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: settings.primaryColor }}
              >
                ★
              </div>
              Resumen Profesional
            </h2>
            <p className="text-gray-700 leading-relaxed pl-10">{professionalSummary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: settings.primaryColor }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <Briefcase className="w-4 h-4" />
              </div>
              Experiencia Laboral
            </h2>
            <div className="space-y-6 pl-10">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {index < experience.length - 1 && (
                    <div className="absolute left-[-24px] top-8 w-0.5 h-full bg-gray-200"></div>
                  )}
                  <div
                    className="absolute left-[-28px] top-2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: settings.primaryColor }}
                  ></div>

                  <div className="mb-2">
                    <h3 className="text-lg font-bold">{exp.position}</h3>
                    <p className="font-semibold" style={{ color: settings.primaryColor }}>
                      {exp.company}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {formatDate(exp.startDate)} - {exp.current ? "Presente" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {exp.description && <p className="text-gray-700 leading-relaxed text-sm">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: settings.primaryColor }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <GraduationCap className="w-4 h-4" />
              </div>
              Educación
            </h2>
            <div className="space-y-4 pl-10">
              {education.map((edu, index) => (
                <div key={edu.id} className="relative">
                  {index < education.length - 1 && (
                    <div className="absolute left-[-24px] top-6 w-0.5 h-full bg-gray-200"></div>
                  )}
                  <div
                    className="absolute left-[-28px] top-2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: settings.primaryColor }}
                  ></div>

                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    <p className="font-semibold" style={{ color: settings.primaryColor }}>
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} - {edu.current ? "En curso" : formatDate(edu.endDate)}
                    </p>
                    {edu.description && <p className="text-gray-700 text-sm mt-1">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: settings.primaryColor }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <Award className="w-4 h-4" />
              </div>
              Certificaciones
            </h2>
            <div className="space-y-3 pl-10">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{cert.name}</h4>
                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                  </div>
                  {cert.date && <span className="text-sm text-gray-500">{formatDate(cert.date)}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
