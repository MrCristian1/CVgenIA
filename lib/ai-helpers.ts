import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import type { CVData } from "@/contexts/cv-context"

export async function generateProfessionalSummary(jobTitle: string, cvData: CVData): Promise<string> {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `Genera un resumen profesional en español para un currículum vitae. 
      
Información del candidato:
- Puesto objetivo: ${jobTitle}
- Nombre: ${cvData.personalInfo.fullName || "No especificado"}
- Experiencia laboral: ${cvData.experience.map((exp) => `${exp.position} en ${exp.company}`).join(", ") || "No especificada"}
- Educación: ${cvData.education.map((edu) => `${edu.degree} en ${edu.field || edu.institution}`).join(", ") || "No especificada"}
- Habilidades: ${cvData.skills.map((skill) => skill.name).join(", ") || "No especificadas"}

Genera un resumen profesional de 3-4 líneas que:
1. Destaque la experiencia relevante para el puesto objetivo
2. Mencione las habilidades clave
3. Sea conciso y profesional
4. Esté en español
5. No exceda las 150 palabras

Responde solo con el resumen, sin comillas ni texto adicional.`,
    })

    return text.trim()
  } catch (error) {
    console.error("Error generating professional summary:", error)
    if (error instanceof Error && error.message.includes("API key")) {
      throw new Error(
        "API key de Gemini no configurada. Verifica que GOOGLE_GENERATIVE_AI_API_KEY esté en tu archivo .env.local",
      )
    }
    throw new Error("No se pudo generar el resumen profesional. Intenta nuevamente.")
  }
}

export async function generateExperienceDescription(position: string, company: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `Genera una descripción profesional en español para una experiencia laboral en un currículum vitae.

Puesto: ${position}
Empresa: ${company}

Genera una descripción de 3-4 líneas que:
1. Describa las responsabilidades principales del puesto
2. Incluya logros o resultados específicos (usa números cuando sea apropiado)
3. Use verbos de acción en pasado
4. Sea profesional y concisa
5. Esté en español
6. No exceda las 120 palabras

Responde solo con la descripción, sin comillas ni texto adicional.`,
    })

    return text.trim()
  } catch (error) {
    console.error("Error generating experience description:", error)
    if (error instanceof Error && error.message.includes("API key")) {
      throw new Error(
        "API key de Gemini no configurada. Verifica que GOOGLE_GENERATIVE_AI_API_KEY esté en tu archivo .env.local",
      )
    }
    throw new Error("No se pudo generar la descripción de experiencia. Intenta nuevamente.")
  }
}

// Función auxiliar para limpiar la respuesta JSON de Gemini
function cleanJsonResponse(text: string): string {
  // Remover bloques de código markdown
  let cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "")

  // Remover espacios en blanco al inicio y final
  cleaned = cleaned.trim()

  // Si no empieza con [ o {, buscar el primer [ o {
  if (!cleaned.startsWith("[") && !cleaned.startsWith("{")) {
    const arrayStart = cleaned.indexOf("[")
    const objectStart = cleaned.indexOf("{")

    if (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) {
      cleaned = cleaned.substring(arrayStart)
    } else if (objectStart !== -1) {
      cleaned = cleaned.substring(objectStart)
    }
  }

  // Si no termina con ] o }, buscar el último ] o }
  if (!cleaned.endsWith("]") && !cleaned.endsWith("}")) {
    const arrayEnd = cleaned.lastIndexOf("]")
    const objectEnd = cleaned.lastIndexOf("}")

    if (arrayEnd !== -1 && arrayEnd > objectEnd) {
      cleaned = cleaned.substring(0, arrayEnd + 1)
    } else if (objectEnd !== -1) {
      cleaned = cleaned.substring(0, objectEnd + 1)
    }
  }

  return cleaned
}

export async function generateSkillSuggestions(
  jobTitle: string,
): Promise<
  Array<{ name: string; level: "Básico" | "Intermedio" | "Avanzado" | "Experto"; category: "Técnica" | "Blanda" }>
> {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `Sugiere habilidades relevantes para el puesto: ${jobTitle}

Genera ÚNICAMENTE un array JSON válido con 8-12 habilidades (mix de técnicas y blandas).

Formato exacto requerido:
[
  {"name": "React", "level": "Avanzado", "category": "Técnica"},
  {"name": "Comunicación", "level": "Intermedio", "category": "Blanda"}
]

Criterios:
1. Incluye tanto habilidades técnicas como blandas
2. Los niveles DEBEN ser exactamente: "Básico", "Intermedio", "Avanzado", "Experto"
3. Las categorías DEBEN ser exactamente: "Técnica", "Blanda"
4. Que sean relevantes para el puesto: ${jobTitle}
5. En español
6. Responde SOLO con el array JSON, sin texto adicional, sin bloques de código, sin explicaciones

IMPORTANTE: No uses \`\`\`json ni \`\`\`, responde directamente con el array JSON.`,
    })

    console.log("Raw response from Gemini:", text)

    const cleanedText = cleanJsonResponse(text)
    console.log("Cleaned JSON:", cleanedText)

    const skills = JSON.parse(cleanedText)

    // Validar que sea un array
    if (!Array.isArray(skills)) {
      throw new Error("La respuesta no es un array válido")
    }

    // Validar estructura de cada habilidad
    const validSkills = skills.filter(
      (skill) =>
        skill &&
        typeof skill.name === "string" &&
        ["Básico", "Intermedio", "Avanzado", "Experto"].includes(skill.level) &&
        ["Técnica", "Blanda"].includes(skill.category),
    )

    if (validSkills.length === 0) {
      throw new Error("No se encontraron habilidades válidas en la respuesta")
    }

    return validSkills
  } catch (error) {
    console.error("Error generating skill suggestions:", error)

    if (error instanceof Error && error.message.includes("API key")) {
      throw new Error(
        "API key de Gemini no configurada. Verifica que GOOGLE_GENERATIVE_AI_API_KEY esté en tu archivo .env.local",
      )
    }

    if (error instanceof SyntaxError) {
      // Si falla el parsing JSON, devolver habilidades por defecto
      console.log("Fallback: usando habilidades por defecto para", jobTitle)
      return getDefaultSkills(jobTitle)
    }

    throw new Error("No se pudieron generar sugerencias de habilidades. Intenta nuevamente.")
  }
}

// Función de respaldo con habilidades por defecto
function getDefaultSkills(
  jobTitle: string,
): Array<{ name: string; level: "Básico" | "Intermedio" | "Avanzado" | "Experto"; category: "Técnica" | "Blanda" }> {
  const lowerJobTitle = jobTitle.toLowerCase()

  if (
    lowerJobTitle.includes("desarrollador") ||
    lowerJobTitle.includes("programador") ||
    lowerJobTitle.includes("frontend") ||
    lowerJobTitle.includes("backend")
  ) {
    return [
      { name: "JavaScript", level: "Avanzado", category: "Técnica" },
      { name: "HTML/CSS", level: "Avanzado", category: "Técnica" },
      { name: "React", level: "Intermedio", category: "Técnica" },
      { name: "Node.js", level: "Intermedio", category: "Técnica" },
      { name: "Git", level: "Intermedio", category: "Técnica" },
      { name: "Resolución de problemas", level: "Avanzado", category: "Blanda" },
      { name: "Trabajo en equipo", level: "Avanzado", category: "Blanda" },
      { name: "Comunicación", level: "Intermedio", category: "Blanda" },
    ]
  }

  if (lowerJobTitle.includes("diseñador") || lowerJobTitle.includes("ux") || lowerJobTitle.includes("ui")) {
    return [
      { name: "Figma", level: "Avanzado", category: "Técnica" },
      { name: "Adobe Creative Suite", level: "Intermedio", category: "Técnica" },
      { name: "Prototipado", level: "Avanzado", category: "Técnica" },
      { name: "Design Thinking", level: "Intermedio", category: "Técnica" },
      { name: "Creatividad", level: "Avanzado", category: "Blanda" },
      { name: "Atención al detalle", level: "Avanzado", category: "Blanda" },
      { name: "Comunicación visual", level: "Avanzado", category: "Blanda" },
      { name: "Empatía", level: "Intermedio", category: "Blanda" },
    ]
  }

  // Habilidades generales para otros puestos
  return [
    { name: "Microsoft Office", level: "Intermedio", category: "Técnica" },
    { name: "Análisis de datos", level: "Básico", category: "Técnica" },
    { name: "Gestión de proyectos", level: "Intermedio", category: "Técnica" },
    { name: "Comunicación", level: "Avanzado", category: "Blanda" },
    { name: "Liderazgo", level: "Intermedio", category: "Blanda" },
    { name: "Trabajo en equipo", level: "Avanzado", category: "Blanda" },
    { name: "Adaptabilidad", level: "Avanzado", category: "Blanda" },
    { name: "Resolución de problemas", level: "Avanzado", category: "Blanda" },
  ]
}
