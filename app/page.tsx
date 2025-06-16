"use client"
import { CVFormProvider } from "@/contexts/cv-context"
import { CVForm } from "@/components/cv-form"
import { CVPreview } from "@/components/cv-preview"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { WelcomeBanner } from "@/components/welcome-banner"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CVFormProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <WelcomeBanner />
          <main className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
              <div className="overflow-y-auto">
                <CVForm />
              </div>
              <div className="overflow-y-auto">
                <CVPreview />
              </div>
            </div>
          </main>
        </div>
      </CVFormProvider>
    </ThemeProvider>
  )
}
