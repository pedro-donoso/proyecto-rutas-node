// Importar módulos necesarios
import fs from "fs"; // Módulo para trabajar con el sistema de archivos
import path from "path"; // Módulo para manejar rutas de archivos
import ejs from "ejs"; // Módulo para renderizar plantillas EJS
import { fileURLToPath } from "url"; // Módulo para convertir URLs a rutas de archivos

// Obtener el nombre del archivo actual y el directorio
const __filename = fileURLToPath(import.meta.url); // Obtener la ruta del archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio del archivo actual

// Definir las rutas para el directorio de vistas y el directorio de salida
const viewsDir = path.join(__dirname, "src", "views"); // Ruta del directorio que contiene las plantillas EJS
const outputDir = path.join(__dirname, "dist"); // Ruta del directorio donde se guardarán los archivos HTML generados

// Crear el directorio de salida si no existe
fs.mkdirSync(outputDir, { recursive: true }); // Crea el directorio de salida, incluyendo cualquier directorio padre necesario

// Lista de vistas (plantillas EJS) a procesar
const views = ["index.ejs", "about.ejs", "contact.ejs"];

// Iterar sobre cada vista para procesarla
views.forEach((view) => {
 try {
  // Leer la plantilla EJS
  const templatePath = path.join(viewsDir, view); // Construir la ruta completa de la plantilla
  const template = fs.readFileSync(templatePath, "utf-8"); // Leer el contenido de la plantilla como texto

  // Renderizar la plantilla con datos
  const html = ejs.render(
   template, // La plantilla EJS a renderizar
   {
    title: view.replace(".ejs", "").replace(/^\w/, (c) => c.toUpperCase()), // Título para la plantilla, capitalizando la primera letra
   },
   {
    views: [viewsDir], // Configuración para buscar parciales en el directorio de vistas
   }
  );

  // Guardar el archivo HTML generado
  const outputPath = path.join(outputDir, view.replace(".ejs", ".html")); // Construir la ruta de salida para el archivo HTML
  fs.writeFileSync(outputPath, html); // Escribir el contenido HTML en el archivo de salida
  console.log(`✅ ${view} -> ${outputPath}`); // Mensaje de éxito en la consola
 } catch (error) {
  // Manejo de errores
  console.error(`❌ Error procesando ${view}:`, error.message); // Mensaje de error en caso de fallo
 }
});
