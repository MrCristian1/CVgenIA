import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CVgenIA - Generador de CV con Inteligencia Artificial",
  description:
    "Crea currículums profesionales y dinámicos con ayuda de IA. Plantillas modernas, personalización avanzada y exportación a PDF.",
  keywords: "CV, currículum, generador CV, inteligencia artificial, plantillas CV, PDF, profesional",
  authors: [{ name: "CVgenIA" }],
  creator: "CVgenIA",
  publisher: "CVgenIA",
  robots: "index, follow",
  openGraph: {
    title: "CVgenIA - Generador de CV con IA",
    description: "Crea currículums profesionales con inteligencia artificial",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVgenIA - Generador de CV con IA",
    description: "Crea currículums profesionales con inteligencia artificial",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
