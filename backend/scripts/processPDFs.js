#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfDir = path.join(__dirname, '../data/pdfs');
const outputFile = path.join(__dirname, '../data/recipes.json');

/**
 * Script para procesar PDFs y extraer recetas
 * Uso: node scripts/processPDFs.js
 */

console.log('🔄 Procesando PDFs...\n');

// Crear estructura de directorios
if (!fs.existsSync(path.join(__dirname, '../data'))) {
  fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
}

// Verificar si existen PDFs
if (!fs.existsSync(pdfDir)) {
  console.log(`📁 Carpeta no encontrada: ${pdfDir}`);
  console.log('   Crea la carpeta y descarga los PDFs del Drive.');
  process.exit(1);
}

const pdfFiles = fs.readdirSync(pdfDir).filter(f => f.endsWith('.pdf'));

if (pdfFiles.length === 0) {
  console.log(`⚠️  No hay PDFs en ${pdfDir}`);
  console.log('   Descarga los PDFs desde el Drive compartido.');
  process.exit(1);
}

console.log(`Encontrados ${pdfFiles.length} PDFs:\n`);
pdfFiles.forEach(f => console.log(`  ✓ ${f}`));

// Para MVP: generar recetas de ejemplo basadas en nombres de PDF
const recipes = generateRecipesFromFilenames(pdfFiles);

// Guardar recetas
fs.writeFileSync(outputFile, JSON.stringify(recipes, null, 2));

console.log(`\n✅ ${recipes.length} recetas cargadas en data/recipes.json`);
console.log('\n💡 Próximos pasos:');
console.log('   1. Instala: npm install pdf-parse pdfjs-dist');
console.log('   2. Ejecuta: node scripts/extractText.js');
console.log('   3. Luego: npm run dev');

/**
 * Genera recetas de ejemplo basadas en nombres de PDF
 * En producción: extraer texto real de PDFs
 */
function generateRecipesFromFilenames(filenames) {
  const recipes = [];
  let id = 1;

  // Mapping de archivos a recetas de ejemplo
  const exampleRecipes = {
    'jugos': [
      {
        name: 'Jugo Verde Desinflamatorio',
        ingredients: ['Espinaca', 'Jengibre', 'Piña', 'Agua de coco'],
        instructions: 'Licúa todos los ingredientes frescos.',
        tags: ['jugo', 'desinflamarme', 'desayuno'],
        time: '5 min'
      },
      {
        name: 'Jugo Antiinflamatorio de Cúrcuma',
        ingredients: ['Cúrcuma', 'Pimienta negra', 'Leche de almendra', 'Miel'],
        instructions: 'Calienta la leche, agrega especias y endulza con miel.',
        tags: ['jugo', 'desinflamarme'],
        time: '10 min'
      }
    ],
    'helados': [
      {
        name: 'Helado de Plátano y Almendra',
        ingredients: ['Plátanos congelados', 'Leche de almendra', 'Vainilla'],
        instructions: 'Licúa plátanos congelados con leche de almendra.',
        tags: ['postre', 'helado'],
        time: '15 min'
      }
    ],
    'postres': [
      {
        name: 'Brownies sin Azúcar',
        ingredients: ['Cacao', 'Huevos', 'Mantequilla', 'Stevia'],
        instructions: 'Mezcla ingredientes y hornea a 180°C por 25 min.',
        tags: ['postre', 'sin azúcar'],
        time: '35 min'
      }
    ],
    'desayuno': [
      {
        name: 'Avena con Berries y Almendras',
        ingredients: ['Avena', 'Arándanos', 'Almendras', 'Leche de coco'],
        instructions: 'Cocina avena, agrega berries y frutos secos.',
        tags: ['desayuno', 'proteína'],
        time: '10 min'
      }
    ],
    'almuerzo': [
      {
        name: 'Salmón a la Papillote',
        ingredients: ['Salmón', 'Brócoli', 'Limón', 'Aceite de oliva'],
        instructions: 'Envuelve en papel y hornea a 200°C por 15 min.',
        tags: ['almuerzo', 'omega3', 'desinflamarme'],
        time: '25 min'
      }
    ],
    'cena': [
      {
        name: 'Pollo con Vegetales Asados',
        ingredients: ['Pechuga de pollo', 'Zapallo', 'Espárragos', 'Ajo'],
        instructions: 'Asa el pollo y vegetales a 200°C por 30 min.',
        tags: ['cena', 'proteína'],
        time: '40 min'
      }
    ],
    'pan': [
      {
        name: 'Pan sin Gluten de Almendra',
        ingredients: ['Harina de almendra', 'Huevos', 'Levadura', 'Sal'],
        instructions: 'Mezcla y hornea a 180°C por 40 min.',
        tags: ['pan', 'sin gluten'],
        time: '50 min'
      }
    ],
    'sopa': [
      {
        name: 'Sopa de Pollo y Vegetales',
        ingredients: ['Pollo', 'Zanahorias', 'Apio', 'Caldo de pollo'],
        instructions: 'Calienta caldo y cocina ingredientes por 30 min.',
        tags: ['sopa', 'cena rápida'],
        time: '35 min'
      }
    ]
  };

  // Generar recetas basadas en nombres de archivos
  filenames.forEach(filename => {
    const lower = filename.toLowerCase();

    Object.entries(exampleRecipes).forEach(([key, recipeList]) => {
      if (lower.includes(key)) {
        recipeList.forEach(recipe => {
          recipes.push({
            ...recipe,
            id: id++,
            source: filename
          });
        });
      }
    });
  });

  // Si no se generaron recetas, añade algunas por defecto
  if (recipes.length === 0) {
    recipes.push(
      {
        id: 1,
        name: 'Ensalada Mediterránea',
        ingredients: ['Lechuga', 'Tomate', 'Pepino', 'Aceitunas', 'Queso feta'],
        instructions: 'Combina todos los vegetales y aliña con aceite de oliva y vinagre.',
        tags: ['ensalada', 'almuerzo', 'desinflamarme'],
        time: '10 min'
      }
    );
  }

  return recipes;
}
