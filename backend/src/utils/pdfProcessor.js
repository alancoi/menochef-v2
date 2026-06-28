import axios from 'axios';

// URL base de Supabase Storage para PDFs
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://omrkhooeghafszszujsxs.supabase.co';
const STORAGE_BUCKET = 'pdfs';

/**
 * Obtiene lista de PDFs desde Supabase Storage
 */
export async function getPDFList() {
  try {
    // Para obtener la lista, usaríamos el REST API de Supabase
    // Por ahora retornamos la lista conocida de PDFs
    return [
      '10 Tortillas Sin Gluten.pdf',
      '100 ALMUERZOS Y CENA.pdf',
      '100 POSTRES SIN HARINA.pdf',
      '15 HARINAS SIN GLUTEN.pdf',
      '20 PANADERIA SALUDABL.pdf',
      '20 Sopas sin Azucar ni Glut.pdf',
      '40 PANES SIN HARINAS R.pdf',
      '500 RECETAS MIXTAS SIN.pdf',
      'helados saludables.pdf',
      'jugos e infusiones anti infla.pdf'
    ];
  } catch (error) {
    console.error('Error obteniendo lista de PDFs:', error);
    return [];
  }
}

/**
 * Descarga un PDF desde Supabase Storage
 */
export async function downloadPDFFromSupabase(pdfName) {
  try {
    const pdfUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${encodeURIComponent(pdfName)}`;

    const response = await axios.get(pdfUrl, {
      responseType: 'arraybuffer',
      timeout: 30000
    });

    return response.data;
  } catch (error) {
    console.error(`Error descargando PDF ${pdfName}:`, error.message);
    return null;
  }
}

/**
 * Procesa un archivo PDF para extraer recetas
 * Por ahora es un parser básico que se adapta a diferentes formatos
 */
export async function processPDFFile(pdfName) {
  try {
    // Descargar PDF desde Supabase
    const pdfBuffer = await downloadPDFFromSupabase(pdfName);
    if (!pdfBuffer) {
      console.warn(`No se pudo descargar PDF: ${pdfName}`);
      return [];
    }

    // Simulamos extracción de texto (en producción usarías pdfjs)
    // Por ahora retornamos recetas relacionadas por el nombre del PDF
    const recipes = generateRecipesFromPDFName(pdfName);
    return recipes;
  } catch (error) {
    console.error('Error procesando PDF:', error);
    return [];
  }
}

/**
 * Genera recetas basadas en el nombre del PDF
 * En producción: procesar el contenido real del PDF
 */
function generateRecipesFromPDFName(pdfName) {
  const recipes = [];
  const lowerName = pdfName.toLowerCase();

  // Mapeo de palabras clave en nombres de PDF a tipos de recetas
  if (lowerName.includes('tortillas')) {
    recipes.push({
      name: 'Tortillas Sin Gluten',
      source: pdfName,
      ingredients: ['harina de almendra', 'huevos', 'sal'],
      tags: ['sin gluten', 'desayuno', 'básico']
    });
  }
  if (lowerName.includes('almuerzo')) {
    recipes.push({
      name: 'Recetas de Almuerzo',
      source: pdfName,
      ingredients: ['proteína', 'vegetales', 'aceite de oliva'],
      tags: ['almuerzo', 'completo', 'nutritivo']
    });
  }
  if (lowerName.includes('postre')) {
    recipes.push({
      name: 'Postres Sin Harina',
      source: pdfName,
      ingredients: ['frutos secos', 'huevos', 'miel', 'frutas'],
      tags: ['postre', 'sin harina', 'dulce']
    });
  }
  if (lowerName.includes('pan')) {
    recipes.push({
      name: 'Panes Sin Harinas Refinadas',
      source: pdfName,
      ingredients: ['harina integral', 'levadura', 'agua', 'sal'],
      tags: ['pan', 'integral', 'salado']
    });
  }
  if (lowerName.includes('sopa')) {
    recipes.push({
      name: 'Sopas Sin Azúcar',
      source: pdfName,
      ingredients: ['caldo', 'vegetales', 'proteína', 'especias'],
      tags: ['sopa', 'caliente', 'desinflamatorio']
    });
  }
  if (lowerName.includes('jugo') || lowerName.includes('infusión')) {
    recipes.push({
      name: 'Jugos e Infusiones Antiinflamatorios',
      source: pdfName,
      ingredients: ['frutas', 'jengibre', 'cúrcuma', 'agua'],
      tags: ['bebida', 'desinflamatorio', 'energía']
    });
  }
  if (lowerName.includes('helado')) {
    recipes.push({
      name: 'Helados Saludables',
      source: pdfName,
      ingredients: ['frutas', 'yogur', 'miel', 'frutos secos'],
      tags: ['postre', 'helado', 'fresco']
    });
  }

  return recipes;
}


/**
 * Carga recetas simuladas para MVP
 */
export function getDefaultRecipes() {
  return [
    {
      id: 1,
      name: 'Ensalada de pollo con aguacate',
      ingredients: ['Pollo', 'Aguacate', 'Lechuga', 'Tomate', 'Aceite de oliva'],
      instructions: 'Cocina el pollo, rebana y mezcla con ingredientes crudos.',
      tags: ['desinflamarme', 'almuerzo', 'proteína'],
      time: '20 min'
    },
    {
      id: 2,
      name: 'Salmón a la papillote',
      ingredients: ['Salmón', 'Papas', 'Brócoli', 'Limón', 'Aceite de oliva'],
      instructions: 'Envuelve el salmón con vegetales en papel de hornear a 200°C por 15 min.',
      tags: ['desinflamarme', 'cena rápida', 'omega3'],
      time: '25 min'
    },
    {
      id: 3,
      name: 'Batido verde desinflamatorio',
      ingredients: ['Espinaca', 'Jengibre', 'Piña', 'Agua de coco'],
      instructions: 'Licúa todos los ingredientes hasta obtener una consistencia cremosa.',
      tags: ['desayuno', 'desinflamarme', 'energía'],
      time: '5 min'
    },
    {
      id: 4,
      name: 'Zucchini pasta con pesto',
      ingredients: ['Zucchini', 'Albahaca', 'Piñones', 'Ajo', 'Queso parmesano'],
      instructions: 'Corta zucchini en espiral, prepara pesto y mezcla.',
      tags: ['cena rápida', 'baja calorías'],
      time: '15 min'
    }
  ];
}
