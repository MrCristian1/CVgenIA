"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Download, Sparkles, ImageIcon, Trash2, RotateCcw } from "lucide-react"
import { useCVContext } from "@/contexts/cv-context"
import { printCV, exportAsImage } from "@/lib/pdf-export"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function Header() {
  const { state, dispatch } = useCVContext()

  const handlePrint = () => {
    printCV()
  }

  const handleExportPNG = async () => {
    try {
      await exportAsImage(state.data, "png")
    } catch (error) {
      console.error("Error exporting PNG:", error)
    }
  }

  const handleExportJPEG = async () => {
    try {
      await exportAsImage(state.data, "jpeg")
    } catch (error) {
      console.error("Error exporting JPEG:", error)
    }
  }

  const handleClearAll = () => {
    dispatch({ type: "CLEAR_ALL_DATA" })
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">CVgenIA</h1>
          <div className="hidden sm:block ml-4 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
            ✨ Datos de ejemplo cargados
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Botón Limpiar */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Limpiar</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Limpiar todos los datos?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción eliminará toda la información del currículum y no se puede deshacer. ¿Estás seguro de que
                  deseas continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAll} className="bg-destructive hover:bg-destructive/90">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Sí, limpiar todo
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Menú Exportar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handlePrint}>
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExportPNG}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Exportar PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportJPEG}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Exportar JPEG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
