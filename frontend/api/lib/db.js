import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../../data/recipes.json');

// Recetas por defecto
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

export function getAllRecipes() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error leyendo recetas:', error);
  }
  return getDefaultRecipes();
}

export function searchRecipes(query) {
  const recipes = getAllRecipes();
  const lowerQuery = query.toLowerCase();

  return recipes.filter(recipe => {
    const matchName = recipe.name.toLowerCase().includes(lowerQuery);
    const matchIngredients = recipe.ingredients.some(ing =>
      ing.toLowerCase().includes(lowerQuery)
    );
    const matchTags = recipe.tags.some(tag =>
      tag.toLowerCase().includes(lowerQuery)
    );

    return matchName || matchIngredients || matchTags;
  });
}

export function getRecipeById(id) {
  const recipes = getAllRecipes();
  return recipes.find(r => r.id === parseInt(id));
}
