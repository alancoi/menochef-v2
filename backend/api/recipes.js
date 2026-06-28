import { getAllRecipes } from '../src/db.js';

export default async function handler(req, res) {
  try {
    const { q } = req.query;
    console.log(`🔍 Búsqueda: "${q}"`);
    let recipes = await getAllRecipes();

    if (q) {
      const searchLower = q.toLowerCase();

      const buttonCategories = [
        'desinflamarse',
        'mejor sueño',
        'bajar de peso',
        'menos antojos',
        'más energía',
        'jugos saludables',
        'postres saludables'
      ];

      const categoryButtons = [
        'desayuno / merienda',
        'postres'
      ];

      if (buttonCategories.includes(searchLower)) {
        recipes = recipes.filter(r =>
          r.button_category && r.button_category.toLowerCase() === searchLower
        );
      } else if (categoryButtons.includes(searchLower)) {
        recipes = recipes.filter(r =>
          r.category && r.category.toLowerCase() === searchLower
        );
      } else {
        recipes = recipes.filter(r => {
          const name = (r.name || '').toLowerCase();
          const ingredients = JSON.stringify(r.ingredients || []).toLowerCase();
          return name.includes(searchLower) || ingredients.includes(searchLower);
        });
      }
    }

    const results = recipes.slice(0, 3);
    res.json({ results, total: results.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
