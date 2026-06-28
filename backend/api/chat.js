import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    console.log(`💬 Pregunta: "${message}"`);

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
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
}
