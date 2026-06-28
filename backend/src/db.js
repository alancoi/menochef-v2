import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RECIPES_PATH = path.join(__dirname, '../data/recipes.json');

// Cargar recetas una sola vez al iniciar
let recipesCache = null;

function loadRecipesSync() {
  if (recipesCache) return recipesCache;

  try {
    if (!fs.existsSync(RECIPES_PATH)) {
      console.error(`❌ Archivo no encontrado: ${RECIPES_PATH}`);
      return [];
    }

    const data = fs.readFileSync(RECIPES_PATH, 'utf8');
    recipesCache = JSON.parse(data);
    console.log(`✅ Cargadas ${recipesCache.length} recetas del archivo local`);
    return recipesCache;
  } catch (error) {
    console.error(`❌ Error cargando recetas:`, error.message);
    return [];
  }
}

// Cargar al iniciar el módulo
loadRecipesSync();

/**
 * Función para shufflear
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Obtiene todas las recetas
 */
export async function getAllRecipes() {
  return shuffle(recipesCache || []);
}

/**
 * Busca recetas (por ahora devuelve todas shuffleadas)
 */
export async function searchRecipes(query) {
  const recipes = recipesCache || [];
  return shuffle(recipes);
}

/**
 * Obtiene una receta por ID
 */
export async function getRecipeById(id) {
  const recipes = recipesCache || [];
  return recipes.find(r => r.id === parseInt(id));
}
