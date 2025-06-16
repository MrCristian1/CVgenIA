import type { CVData, CVSettings } from "@/contexts/cv-context"

export async function exportToPDF(data: CVData, settings: CVSettings) {
  try {
    // Usar jsPDF con html2canvas como alternativa más confiable
    const [jsPDF, html2canvas] = await Promise.all([import("jspdf").then((m) => m.jsPDF), import("html2canvas")])

    const element = document.getElementById("cv-preview")
    if (!element) {
      throw new Error("No se encontró el elemento CV para exportar")
    }

    // Crear un clon del elemento para modificarlo sin afectar la vista
    const clonedElement = element.cloneNode(true) as HTMLElement
    clonedElement.id = "cv-preview-clone"

    // Aplicar estilos específicos para PDF
    clonedElement.style.cssText = `
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: 794px !important;
      height: 1123px !important;
      max-height: 1123px !important;
      overflow: hidden !important;
      background: white !important;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      font-size: 11px !important;
      line-height: 1.3 !important;
      color: #000 !important;
      padding: 24px !important;
      box-sizing: border-box !important;
      transform: none !important;
      zoom: 1 !important;
    `

    // Aplicar estilos específicos a elementos internos
    const applyPDFStyles = (el: HTMLElement) => {
      // Resetear transforms y posicionamiento
      el.style.transform = "none"
      el.style.position = "relative"

      // Mejorar renderizado de texto
      if (el.tagName === "H1" || el.tagName === "H2" || el.tagName === "H3") {
        el.style.fontWeight = "bold"
        el.style.marginBottom = "8px"
        el.style.marginTop = "0"
      }

      // Asegurar que los iconos no interfieran
      if (el.tagName === "svg" || el.classList.contains("lucide")) {
        el.style.width = "12px"
        el.style.height = "12px"
        el.style.display = "inline-block"
        el.style.verticalAlign = "middle"
      }

      // Mejorar espaciado de párrafos
      if (el.tagName === "P") {
        el.style.margin = "4px 0"
        el.style.lineHeight = "1.4"
      }

      // Mejorar divs de contenido
      if (el.tagName === "DIV") {
        el.style.pageBreakInside = "avoid"
      }

      // Recursivamente aplicar a hijos
      Array.from(el.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          applyPDFStyles(child)
        }
      })
    }

    // Agregar el elemento clonado al DOM temporalmente
    document.body.appendChild(clonedElement)

    // Aplicar estilos específicos para PDF
    applyPDFStyles(clonedElement)

    // Esperar un momento para que se apliquen los estilos
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Capturar el elemento como imagen con configuración optimizada
    const canvas = await html2canvas.default(clonedElement, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      windowWidth: 794,
      windowHeight: 1123,
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: false,
      imageTimeout: 0,
      removeContainer: true,
      onclone: (clonedDoc) => {
        const clonedCV = clonedDoc.getElementById("cv-preview-clone")
        if (clonedCV) {
          // Asegurar estilos finales en el clon
          clonedCV.style.width = "794px"
          clonedCV.style.height = "1123px"
          clonedCV.style.overflow = "hidden"
          clonedCV.style.position = "relative"
          clonedCV.style.transform = "none"
        }
      },
    })

    // Remover el elemento clonado
    document.body.removeChild(clonedElement)

    // Crear PDF con dimensiones exactas
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [794, 1123], // A4 en pixels
      compress: true,
      precision: 2,
    })

    // Agregar la imagen al PDF con dimensiones exactas
    const imgData = canvas.toDataURL("image/jpeg", 0.95)
    pdf.addImage(imgData, "JPEG", 0, 0, 794, 1123, undefined, "FAST")

    // Descargar el PDF
    const fileName = `CV_${data.personalInfo.fullName?.replace(/\s+/g, "_") || "MiCV"}.pdf`
    pdf.save(fileName)

    console.log("PDF exportado exitosamente")
  } catch (error) {
    console.error("Error exporting PDF:", error)

    // Fallback a impresión si falla la exportación
    if (confirm("Error al exportar PDF. ¿Deseas intentar imprimir en su lugar?")) {
      printCV()
    }
  }
}

// Función de impresión mejorada
export function printCV() {
  try {
    const element = document.getElementById("cv-preview")
    if (!element) {
      throw new Error("No se encontró el elemento CV para imprimir")
    }

    // Crear ventana de impresión
    const printWindow = window.open("", "_blank", "width=800,height=600")
    if (!printWindow) {
      throw new Error("No se pudo abrir la ventana de impresión")
    }

    // Obtener estilos CSS
    const styleSheets = Array.from(document.styleSheets)
    let styles = ""

    styleSheets.forEach((styleSheet) => {
      try {
        if (styleSheet.cssRules) {
          Array.from(styleSheet.cssRules).forEach((rule) => {
            styles += rule.cssText + "\n"
          })
        }
      } catch (e) {
        // Ignorar errores de CORS en stylesheets externos
      }
    })

    // HTML para impresión con estilos mejorados
    const printHTML = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CV para Imprimir</title>
          <style>
            ${styles}
            
            @media print {
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
              }
              
              #cv-preview {
                width: 210mm !important;
                height: 297mm !important;
                max-height: 297mm !important;
                margin: 0 !important;
                padding: 0 !important;
                box-shadow: none !important;
                border: none !important;
                page-break-inside: avoid !important;
                overflow: hidden !important;
                transform: none !important;
                position: relative !important;
              }
              
              @page {
                size: A4;
                margin: 0;
              }
              
              .print-instructions {
                display: none !important;
              }
            }
            
            @media screen {
              body {
                background: #f0f0f0;
                padding: 20px;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              }
              
              #cv-preview {
                background: white;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                margin: 0 auto;
                max-width: 210mm;
                transform: none !important;
                position: relative !important;
              }
              
              .print-instructions {
                text-align: center;
                margin-bottom: 20px;
                padding: 10px;
                background: #e3f2fd;
                border-radius: 4px;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-instructions">
            <p><strong>✅ Método Recomendado:</strong> Usa Ctrl+P (Cmd+P en Mac) y selecciona "Guardar como PDF" en el destino</p>
            <p><small>💡 Este método garantiza la mejor calidad y formato del CV</small></p>
            <button onclick="window.print()" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 8px;">
              🖨️ Abrir Diálogo de Impresión
            </button>
          </div>
          ${element.outerHTML}
          <script>
            // Auto-focus para facilitar Ctrl+P
            window.focus();
            
            // Función para imprimir
            function printNow() {
              window.print();
            }
            
            // Cerrar ventana después de imprimir (opcional)
            window.addEventListener('afterprint', function() {
              setTimeout(() => {
                if (confirm('¿Deseas cerrar esta ventana?')) {
                  window.close();
                }
              }, 1000);
            });
          </script>
        </body>
      </html>
    `

    printWindow.document.write(printHTML)
    printWindow.document.close()
  } catch (error) {
    console.error("Error printing CV:", error)
    alert("Error al abrir la ventana de impresión. Intenta usar Ctrl+P para imprimir esta página.")
  }
}

// Función para exportar como imagen (alternativa adicional)
export async function exportAsImage(data: CVData, format: "png" | "jpeg" = "png") {
  try {
    const html2canvas = await import("html2canvas")

    const element = document.getElementById("cv-preview")
    if (!element) {
      throw new Error("No se encontró el elemento CV para exportar")
    }

    const canvas = await html2canvas.default(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      width: 794,
      height: 1123,
    })

    // Crear enlace de descarga
    const link = document.createElement("a")
    link.download = `CV_${data.personalInfo.fullName?.replace(/\s+/g, "_") || "MiCV"}.${format}`
    link.href = canvas.toDataURL(`image/${format}`, 0.95)

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    console.log(`Imagen ${format.toUpperCase()} exportada exitosamente`)
  } catch (error) {
    console.error("Error exporting image:", error)
    alert("Error al exportar como imagen. Intenta nuevamente.")
  }
}
