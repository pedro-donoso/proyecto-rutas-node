import fs from "fs";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsDir = path.join(__dirname, "src", "views");
const outputDir = path.join(__dirname, "dist");

fs.mkdirSync(outputDir, { recursive: true });

const views = ["index.ejs", "about.ejs", "contact.ejs"];

views.forEach((view) => {
 const template = fs.readFileSync(path.join(viewsDir, view), "utf-8");
 const html = ejs.render(template, {
  title: view.replace(".ejs", "").charAt(0).toUpperCase() + view.slice(1, -4),
 });
 fs.writeFileSync(path.join(outputDir, view.replace(".ejs", ".html")), html);
});

