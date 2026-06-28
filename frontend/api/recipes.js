import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://omrkhooeghasfszujsxs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tcmtob29lZ2hhc2ZzenVqc3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTE1MTIsImV4cCI6MjA5Nzg4NzUxMn0.sgh_sgJ4E-vTCSlZKhFubs4hEbMTTphkU8Am1lHpWuA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { q } = req.query;

      // Función para shufflear un array
      const shuffle = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };

      if (q) {
        // Búsqueda por nombre o ingredientes - sin límite estricto
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .or(`name.ilike.%${q}%,ingredients.cs.["${q}"]`);

        if (error) throw error;
        const shuffled = shuffle(data || []);
        return res.json({ query: q, results: shuffled });
      }

      // Obtener todas las recetas (189+)
      const { data, error } = await supabase
        .from('recipes')
        .select('*');

      if (error) throw error;
      const shuffled = shuffle(data || []);
      return res.json({
        recipes: shuffled,
        total: shuffled.length
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(405).json({ error: 'Método no permitido' });
}
