import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { getAllRecipes } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/recipes', async (req, res) => {
  try {
    const { q } = req.query;
    console.log(`🔍 Búsqueda: "${q}"`);
    let recipes = await getAllRecipes();

    if (q) {
      const searchLower = q.toLowerCase();

      // Botones principales (por button_category)
      const buttonCategories = [
        'desinflamarse',
        'mejor sueño',
        'bajar de peso',
        'menos antojos',
        'más energía',
        'jugos saludables',
        'postres saludables'
      ];

      // Botones secundarios (por category)
      const categoryButtons = [
        'desayuno / merienda',
        'postres'
      ];

      if (buttonCategories.includes(searchLower)) {
        // Búsqueda por button_category (problemas principales)
        recipes = recipes.filter(r =>
          r.button_category && r.button_category.toLowerCase() === searchLower
        );
      } else if (categoryButtons.includes(searchLower)) {
        // Búsqueda por category (ocasiones)
        recipes = recipes.filter(r =>
          r.category && r.category.toLowerCase() === searchLower
        );
      } else {
        // Búsqueda por texto libre (nombre, ingredientes)
        recipes = recipes.filter(r => {
          const name = (r.name || '').toLowerCase();
          const ingredients = JSON.stringify(r.ingredients || []).toLowerCase();
          return name.includes(searchLower) || ingredients.includes(searchLower);
        });
      }
    }

    // Limitar a 3 recetas
    const results = recipes.slice(0, 3);

    res.json({ results, total: results.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chat endpoint - Asistente Virtual
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    console.log(`💬 Pregunta: "${message}"`);

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    const response = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      system: `Eres un asistente de nutrición especializado en menopausia. Ayudas a mujeres a entender cómo los alimentos afectan su bienestar durante esta etapa.

Eres amable, empático y knowledgeable. Das recomendaciones basadas en evidencia pero de forma accesible.
Tienes acceso a recetas saludables y puedes recomendarlas.

Responde en español. Sé conciso pero informativo.`,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    });

    const reply = response.content[0].type === 'text' ? response.content[0].text : 'No pude generar una respuesta';

    res.json({ response: reply });
  } catch (error) {
    console.error('Error en chat:', error);
    res.status(500).json({ error: error.message });
  }
});

// Listener solo para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🍳 Backend en puerto ${PORT}`);
  });
}

export default app;
