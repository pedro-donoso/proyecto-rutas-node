![imagen](https://github.com/user-attachments/assets/116eefa6-44b0-4941-9303-816df6719eac)

## [https://rutas-ejs-node.netlify.app/](https://rutas-ejs-node.netlify.app/)

### 1. Crear `package.json`

Abre tu terminal y navega a la carpeta de tu proyecto. Luego, ejecuta el siguiente comando para crear un archivo `package.json`:

```
npm init -y
```

### 2. Agregar scripts y type: module

```
{
  "name": "proyecto-rutas-node",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "node build.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "ejs": "^3.1.10",
    "express": "^4.21.2",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
```

### 3. Instala `Dependencias`
Instala Express, Morgan y EJS como dependencias de producción:

```
npm install express morgan ejs
```

Instala Nodemon como una dependencia de desarrollo:

```
npm install nodemon --save-dev
```

### 4. Configura el `Servidor` en src/index.js
Creo carpeta src y archivo index.js y agrega el siguiente código:

```
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

### 5. Configura las `Rutas` en src/routes/index.js
Abre src/routes/index.js y agrega el siguiente código:

```
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => res.render('index', { title: 'Home' }));
router.get('/about', (req, res) => res.render('about', { title: 'About' }));
router.get('/contact', (req, res) => res.render('contact', { title: 'Contact' }));

export default router;
```

### 6. Creo las `vistas` ejs
Agrega el siguiente contenido a src/views/index.ejs, about.ejs y contact.ejs

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <h1>This is the Home Page</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</body>
</html>
```

### 7. Agrega el `Script de Construcción` en build.js
Crea un archivo llamado build.js en la raíz de tu proyecto y agrega el siguiente código:

```
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
```

### 8. Creo `archivo de configuracion` netlify.toml:
En la reíz del proyecto

```
[build]
  publish = "dist"
  command = "npm run build"
```

### 9. Ejecuta el comando de `Construcción`:
Esto generará los archivos HTML en la carpeta dist, que es la que Netlify utilizará para el despliegue.

```
npm run build
```

### 10. `Despliegue manual` en Netlify:

![manual](https://github.com/user-attachments/assets/2f3f1e20-368b-46a4-aebe-ed596cbfc71b)

![drag](https://github.com/user-attachments/assets/51dfe80f-1281-4963-b9e8-2a730d9b5aad)

![dist](https://github.com/user-attachments/assets/55bcac16-cb52-4035-aa4e-ec10fc0384c5)




























