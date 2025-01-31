import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsDir = path.join(__dirname, 'src', 'views');
const outputDir = path.join(__dirname, 'dist');

// Asegúrate de que la carpeta de salida exista
fs.mkdirSync(outputDir, { recursive: true });

// Lista de vistas a renderizar
const views =