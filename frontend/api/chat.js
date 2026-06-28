import axios from 'axios';
import { getAllRecipes } from './lib/db.js';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

function getRelevantRecipes(message) {
  const recipes = getAllRecipes();
  const lowerMessage = message.toLowerCase();

  const scored = recipes.map(recipe => {
    let score = 0;
    recipe.ingredients.forEach(ing => {
      if (lowerMessage.includes(ing.toLowerCase())) score += 3;
    });
    recipe.tags.forEach(tag => {
      if (lowerMessage.includes(tag.toLowerCase())) score += 2;
    });
    if (lowerMessage.includes(recipe.name.toLowerCase())) score += 5;
    return { ...recipe, score };
  });

  return scored
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

function formatRecipesForContext(recipes) {
  if (recipes.length === 0) {
    return 'No hay recetas relevantes en la base de datos.';
  }

  const formatted = recipes
    .slice(0, 5)
    .map(r => `
Receta: ${r.name}
Ingredientes: ${r.ingredients.join(', ')}
Preparación: ${r.instructions}
Tiempo: ${r.time || 'N/A'}
Categorías: ${r.tags.join(', ')}
    `)
    .join('\n---\n');

  return `Recetas disponibles:\n${formatted}`;
}

async function callClaudeAPI(userMessage, context) {
  if (!CLAUDE_API_KEY) {
    return 'Estoy aquí para ayudarte a encontrar recetas saludables para la menopausia. ¿Qué síntomas estás experimentando o qué ingredientes tienes disponibles?';
  }

  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `Eres un asistente nutricional especializado en menopausia.

Contexto - Recetas disponibles:
${context}

El usuario pregunta: ${userMessage}

Responde de forma breve, amable y útil. Si aplica, sugiere recetas específicas de las disponibles.`
          }
        ]
      },
      {
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        }
      }
    );

    return response.data.content[0].text;
  } catch (error) {
    console.error('Error en Claude:', error.message);
    return 'Perdón, no pude procesar tu mensaje en este momento.';
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Mensaje vacío' });
    }

    const relatedRecipes = getRelevantRecipes(message);
    const recipeContext = formatRecipesForContext(relatedRecipes);
    const response = await callClaudeAPI(message, recipeContext);

    res.json({
      message: response,
      relatedRecipes: relatedRecipes.slice(0, 3)
    });
  } catch (error) {
    console.error('Error en chat:', error);
    res.status(500).json({ error: 'Error procesando tu mensaje' });
  }
}
