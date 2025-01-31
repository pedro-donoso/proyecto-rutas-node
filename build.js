import fs from "fs";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsDir = path.join(__dirname, "src", "views");
const outputDir = path.join(__dirname, "dist");

// Asegúrate de que la carpeta de salida exista
fs.mkdirSync(outputDir, { recursive: true });

// Lista de vistas a renderizar
const views = ["index.ejs", "about.ejs", "contact.ejs"];

// Renderiza cada vista
views.forEach((view) => {
 const template = fs.readFileSync(path.join(viewsDir, view), "utf-8");
 const html = ejs.render(template, {
  title: view.replace(".ejs", "").charAt(0).toUpperCase() + view.slice(1, -4),
 });
 fs.writeFileSync(path.join(outputDir, view.replace(".ejs", ".html")), html);
});

console.log("Build completed! HTML files are in the dist folder.");
