import axios from 'axios';
import { getAllRecipes } from '../db.js';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Integra con Claude API para respuestas inteligentes
 * Usa RAG (Retrieval Augmented Generation) con recetas
 */
export async function chatWithClaude(userMessage) {
  try {
    // Buscar recetas relevantes para context
    const relatedRecipes = getRelevantRecipes(userMessage);

    // Construir context con recetas
    const recipeContext = formatRecipesForContext(relatedRecipes);

    // Llamar a Claude con context
    const response = await callClaudeAPI(userMessage, recipeContext);

    return {
      message: response,
      relatedRecipes: relatedRecipes.slice(0, 3)
    };
  } catch (error) {
    console.error('Error en Claude integration:', error);
    throw error;
  }
}

/**
 * Busca recetas relevantes basadas en el mensaje
 */
function getRelevantRecipes(message) {
  const recipes = getAllRecipes();
  const lowerMessage = message.toLowerCase();

  // Score cada receta por relevancia
  const scored = recipes.map(recipe => {
    let score = 0;

    // Ingredientes mencionados
    recipe.ingredients.forEach(ing => {
      if (lowerMessage.includes(ing.toLowerCase())) score += 3;
    });

    // Tags mencionados
    recipe.tags.forEach(tag => {
      if (lowerMessage.includes(tag.toLowerCase())) score += 2;
    });

    // Nombre mencionado
    if (lowerMessage.includes(recipe.name.toLowerCase())) score += 5;

    return { ...recipe, score };
  });

  return scored
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * Formatea recetas para pasarle a Claude
 */
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

/**
 * Llama a Claude API
 */
async function callClaudeAPI(userMessage, context) {
  if (!CLAUDE_API_KEY) {
    console.warn('CLAUDE_API_KEY no configurada, usando respuesta simulada');
    return generateSimulatedResponse(userMessage);
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
    console.error('Error llamando Claude API:', error.message);
    return generateSimulatedResponse(userMessage);
  }
}

/**
 * Genera respuesta simulada si Claude no está disponible
 */
function generateSimulatedResponse(message) {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('energía') || lowerMsg.includes('cansancio')) {
    return 'Para más energía, te recomiendo alimentos ricos en proteína y grasas saludables como salmón, huevos y aguacate. También evita azúcares refinados que causan caídas de energía.';
  }

  if (lowerMsg.includes('inflamación') || lowerMsg.includes('inflamatorio')) {
    return 'Los alimentos antiinflamatorios clave son: cúrcuma, jengibre, pescados grasos (salmón), verduras de hoja verde y aceite de oliva. Evita procesados y azúcares refinados.';
  }

  if (lowerMsg.includes('ingredientes')) {
    return 'Puedo ayudarte a encontrar recetas con esos ingredientes. ¿Cuáles tienes disponibles?';
  }

  return 'Estoy aquí para ayudarte a encontrar recetas saludables para la menopausia. ¿Qué síntomas estás experimentando o qué ingredientes tienes disponibles?';
}
