"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  location: string
}

export interface Skill {
  id: string
  name: string
  level: "Básico" | "Intermedio" | "Avanzado" | "Experto"
  category: "Técnica" | "Blanda"
}

export interface Language {
  id: string
  name: string
  level: "Básico" | "Intermedio" | "Avanzado" | "Nativo"
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url: string
}

export interface CVData {
  personalInfo: PersonalInfo
  professionalSummary: string
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  languages: Language[]
  certifications: Certification[]
}

export interface CVSettings {
  template: "classic" | "modern" | "creative"
  primaryColor: string
  font: "inter" | "roboto" | "playfair"
  sectionOrder: string[]
}

interface CVState {
  data: CVData
  settings: CVSettings
}

type CVAction =
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "UPDATE_PROFESSIONAL_SUMMARY"; payload: string }
  | { type: "ADD_EDUCATION"; payload: Education }
  | { type: "UPDATE_EDUCATION"; payload: { id: string; data: Partial<Education> } }
  | { type: "DELETE_EDUCATION"; payload: string }
  | { type: "ADD_EXPERIENCE"; payload: Experience }
  | { type: "UPDATE_EXPERIENCE"; payload: { id: string; data: Partial<Experience> } }
  | { type: "DELETE_EXPERIENCE"; payload: string }
  | { type: "ADD_SKILL"; payload: Skill }
  | { type: "UPDATE_SKILL"; payload: { id: string; data: Partial<Skill> } }
  | { type: "DELETE_SKILL"; payload: string }
  | { type: "ADD_LANGUAGE"; payload: Language }
  | { type: "UPDATE_LANGUAGE"; payload: { id: string; data: Partial<Language> } }
  | { type: "DELETE_LANGUAGE"; payload: string }
  | { type: "ADD_CERTIFICATION"; payload: Certification }
  | { type: "UPDATE_CERTIFICATION"; payload: { id: string; data: Partial<Certification> } }
  | { type: "DELETE_CERTIFICATION"; payload: string }
  | { type: "UPDATE_SETTINGS"; payload: Partial<CVSettings> }
  | { type: "LOAD_DATA"; payload: CVState }
  | { type: "CLEAR_ALL_DATA" }

// Datos de ejemplo optimizados para caber en una página
const exampleData: CVState = {
  data: {
    personalInfo: {
      fullName: "María García López",
      email: "maria.garcia@email.com",
      phone: "+34 612 345 678",
      location: "Madrid, España",
      website: "https://mariagarcia.dev",
      linkedin: "https://linkedin.com/in/mariagarcia",
      github: "https://github.com/mariagarcia",
    },
    professionalSummary:
      "Desarrolladora Frontend con 3+ años de experiencia creando aplicaciones web modernas. Especializada en React, TypeScript y Next.js con enfoque en UX y mejores prácticas de desarrollo.",
    education: [
      {
        id: "edu1",
        institution: "Universidad Politécnica de Madrid",
        degree: "Grado en Ingeniería Informática",
        field: "Ingeniería de Software",
        startDate: "2018-09",
        endDate: "2022-06",
        current: false,
        description: "Especialización en desarrollo web. Proyecto final: App de gestión con React y Node.js.",
      },
      {
        id: "edu2",
        institution: "Platzi",
        degree: "Certificación Profesional",
        field: "React.js y Next.js",
        startDate: "2022-01",
        endDate: "2022-03",
        current: false,
        description: "Curso intensivo sobre desarrollo frontend moderno.",
      },
    ],
    experience: [
      {
        id: "exp1",
        company: "TechSolutions S.L.",
        position: "Desarrolladora Frontend Senior",
        startDate: "2023-03",
        endDate: "",
        current: true,
        description:
          "Lidero desarrollo de interfaces con React, TypeScript y Tailwind CSS. Mejoré rendimiento de aplicación principal en 40% mediante optimizaciones y lazy loading.",
        location: "Madrid, España",
      },
      {
        id: "exp2",
        company: "StartupInnovate",
        position: "Desarrolladora Frontend",
        startDate: "2022-07",
        endDate: "2023-02",
        current: false,
        description:
          "Desarrollé aplicaciones web con React, Redux y Material-UI. Migré codebase de JS a TypeScript, reduciendo bugs en 30%.",
        location: "Madrid, España",
      },
    ],
    skills: [
      { id: "skill1", name: "React", level: "Avanzado", category: "Técnica" },
      { id: "skill2", name: "TypeScript", level: "Avanzado", category: "Técnica" },
      { id: "skill3", name: "Next.js", level: "Intermedio", category: "Técnica" },
      { id: "skill4", name: "JavaScript", level: "Experto", category: "Técnica" },
      { id: "skill5", name: "HTML/CSS", level: "Experto", category: "Técnica" },
      { id: "skill6", name: "Tailwind CSS", level: "Avanzado", category: "Técnica" },
      { id: "skill7", name: "Git", level: "Avanzado", category: "Técnica" },
      { id: "skill8", name: "Node.js", level: "Intermedio", category: "Técnica" },
      { id: "skill9", name: "Comunicación", level: "Avanzado", category: "Blanda" },
      { id: "skill10", name: "Trabajo en equipo", level: "Experto", category: "Blanda" },
      { id: "skill11", name: "Resolución de problemas", level: "Avanzado", category: "Blanda" },
      { id: "skill12", name: "Liderazgo", level: "Intermedio", category: "Blanda" },
    ],
    languages: [
      { id: "lang1", name: "Español", level: "Nativo" },
      { id: "lang2", name: "Inglés", level: "Avanzado" },
      { id: "lang3", name: "Francés", level: "Básico" },
    ],
    certifications: [
      {
        id: "cert1",
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2023-05",
        url: "https://coursera.org/verify/certificate123",
      },
      {
        id: "cert2",
        name: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2023-08",
        url: "https://aws.amazon.com/verification/cert456",
      },
    ],
  },
  settings: {
    template: "modern",
    primaryColor: "#3b82f6",
    font: "inter",
    sectionOrder: [
      "personalInfo",
      "professionalSummary",
      "experience",
      "education",
      "skills",
      "languages",
      "certifications",
    ],
  },
}

const emptyState: CVState = {
  data: {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
    },
    professionalSummary: "",
    education: [],
    experience: [],
    skills: [],
    languages: [],
    certifications: [],
  },
  settings: {
    template: "modern",
    primaryColor: "#3b82f6",
    font: "inter",
    sectionOrder: [
      "personalInfo",
      "professionalSummary",
      "experience",
      "education",
      "skills",
      "languages",
      "certifications",
    ],
  },
}

function cvReducer(state: CVState, action: CVAction): CVState {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload },
        },
      }
    case "UPDATE_PROFESSIONAL_SUMMARY":
      return {
        ...state,
        data: {
          ...state.data,
          professionalSummary: action.payload,
        },
      }
    case "ADD_EDUCATION":
      return {
        ...state,
        data: {
          ...state.data,
          education: [...state.data.education, action.payload],
        },
      }
    case "UPDATE_EDUCATION":
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.map((edu) =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu,
          ),
        },
      }
    case "DELETE_EDUCATION":
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.filter((edu) => edu.id !== action.payload),
        },
      }
    case "ADD_EXPERIENCE":
      return {
        ...state,
        data: {
          ...state.data,
          experience: [...state.data.experience, action.payload],
        },
      }
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.map((exp) =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp,
          ),
        },
      }
    case "DELETE_EXPERIENCE":
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.filter((exp) => exp.id !== action.payload),
        },
      }
    case "ADD_SKILL":
      return {
        ...state,
        data: {
          ...state.data,
          skills: [...state.data.skills, action.payload],
        },
      }
    case "UPDATE_SKILL":
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.map((skill) =>
            skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill,
          ),
        },
      }
    case "DELETE_SKILL":
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.filter((skill) => skill.id !== action.payload),
        },
      }
    case "ADD_LANGUAGE":
      return {
        ...state,
        data: {
          ...state.data,
          languages: [...state.data.languages, action.payload],
        },
      }
    case "UPDATE_LANGUAGE":
      return {
        ...state,
        data: {
          ...state.data,
          languages: state.data.languages.map((lang) =>
            lang.id === action.payload.id ? { ...lang, ...action.payload.data } : lang,
          ),
        },
      }
    case "DELETE_LANGUAGE":
      return {
        ...state,
        data: {
          ...state.data,
          languages: state.data.languages.filter((lang) => lang.id !== action.payload),
        },
      }
    case "ADD_CERTIFICATION":
      return {
        ...state,
        data: {
          ...state.data,
          certifications: [...state.data.certifications, action.payload],
        },
      }
    case "UPDATE_CERTIFICATION":
      return {
        ...state,
        data: {
          ...state.data,
          certifications: state.data.certifications.map((cert) =>
            cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert,
          ),
        },
      }
    case "DELETE_CERTIFICATION":
      return {
        ...state,
        data: {
          ...state.data,
          certifications: state.data.certifications.filter((cert) => cert.id !== action.payload),
        },
      }
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      }
    case "LOAD_DATA":
      return action.payload
    case "CLEAR_ALL_DATA":
      return emptyState
    default:
      return state
  }
}

const CVContext = createContext<{
  state: CVState
  dispatch: React.Dispatch<CVAction>
} | null>(null)

export function CVFormProvider({ children }: { children: ReactNode }) {
  // Inicializar con datos de ejemplo optimizados
  const [state, dispatch] = useReducer(cvReducer, exampleData)

  return <CVContext.Provider value={{ state, dispatch }}>{children}</CVContext.Provider>
}

export function useCVContext() {
  const context = useContext(CVContext)
  if (!context) {
    throw new Error("useCVContext must be used within a CVFormProvider")
  }
  return context
}
