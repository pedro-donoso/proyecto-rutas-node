import fs from "fs";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsDir = path.join(__dirname, "src", "views");
const outputDir = path.join(__dirname, "dist");

// Crear el directorio de salida si no existe
fs.mkdirSync(outputDir, { recursive: true });

const views = ["index.ejs", "about.ejs", "contact.ejs"];

views.forEach((view) => {
 try {
  // Leer la plantilla EJS
  const templatePath = path.join(viewsDir, view);
  const template = fs.readFileSync(templatePath, "utf-8");

  // Renderizar la plantilla
  const html = ejs.render(
   template,
   {
    title: view.replace(".ejs", "").replace(/^\w/, (c) => c.toUpperCase()),
   },
   {
    views: [viewsDir], // Buscar parciales en viewsDir
   }
  );

  // Guardar el archivo HTML
  const outputPath = path.join(outputDir, view.replace(".ejs", ".html"));
  fs.writeFileSync(outputPath, html);
  console.log(`✅ ${view} -> ${outputPath}`);
 } catch (error) {
  console.error(`❌ Error procesando ${view}:`, error.message);
 }
});
