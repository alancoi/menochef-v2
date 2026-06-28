# Guía de Integración - recipes.json en MenoChef

## Descripción General

La base de datos `recipes.json` contiene **193 recetas** extraídas de los PDFs originales de MenoChef. Este documento describe cómo integrar esta base de datos en tu aplicación.

## Ubicación y Acceso

```
/sessions/great-confident-keller/mnt/MenoCheff/backend/data/recipes.json
```

**Tamaño**: 154.8 KB (193 recetas)
**Formato**: JSON válido, UTF-8 encoding
**Validado**: Estructura completa y sin errores

## Estructura de Datos

Cada receta tiene la siguiente estructura:

```json
{
  "name": "NOMBRE DE LA RECETA EN MAYÚSCULAS",
  "type": "CATEGORÍA",
  "ingredients": [
    "Ingrediente 1: cantidad",
    "Ingrediente 2: cantidad",
    "..."
  ],
  "benefits": "Texto describiendo propiedades nutricionales",
  "steps": [
    "Paso 1 de preparación",
    "Paso 2 de preparación",
    "..."
  ],
  "motivational": "Texto motivacional para la comensal"
}
```

### Campos

- **name** (string): Nombre único de la receta en mayúsculas. 100% completo.
- **type** (string): Categoría de clasificación. Valores: DESAYUNO, MERIENDA, POSTRE, BEBIDA, ENERGÍA, MEJOR, HINCHAZÓN, CLARIDAD, BAJAR, OTRO (99% clasificadas).
- **ingredients** (array): Lista de ingredientes con formato "nombre: cantidad". 100% presente.
- **benefits** (string): Explicación de beneficios nutricionales. 57.5% presente (opcional).
- **steps** (array): Pasos ordenados de preparación. 100% presente, 6.1 pasos en promedio.
- **motivational** (string): Texto motivacional para el usuario. 99.5% presente.

## Opciones de Integración

### Opción 1: Carga en Memoria (Node.js/JavaScript)

```javascript
// Backend (Express/Node.js)
const fs = require('fs');
const recipes = JSON.parse(fs.readFileSync('./recipes.json', 'utf-8'));

// Endpoint: GET /api/recipes
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// Endpoint: GET /api/recipes/:id
app.get('/api/recipes/:id', (req, res) => {
  const recipe = recipes[parseInt(req.params.id)];
  res.json(recipe || { error: 'Not found' });
});

// Filtrar por tipo
app.get('/api/recipes/type/:type', (req, res) => {
  const filtered = recipes.filter(r => r.type === req.params.type);
  res.json(filtered);
});
```

### Opción 2: Base de Datos SQL (PostgreSQL/MySQL)

```sql
-- Crear tabla
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL,
  ingredients TEXT[] NOT NULL,
  benefits TEXT,
  steps TEXT[] NOT NULL,
  motivational TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Importar desde JSON (usar script Python)
```

**Script Python para importar a PostgreSQL**:
```python
import json
import psycopg2

with open('recipes.json', 'r', encoding='utf-8') as f:
    recipes = json.load(f)

conn = psycopg2.connect("dbname=menochef user=postgres")
cur = conn.cursor()

for recipe in recipes:
    cur.execute("""
        INSERT INTO recipes (name, type, ingredients, benefits, steps, motivational)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        recipe['name'],
        recipe['type'],
        recipe['ingredients'],
        recipe['benefits'],
        recipe['steps'],
        recipe['motivational']
    ))

conn.commit()
cur.close()
conn.close()
```

### Opción 3: MongoDB

```javascript
// Importar JSON a MongoDB
const recipes = require('./recipes.json');

db.recipes.insertMany(recipes);

// Consultas
db.recipes.find({ type: "DESAYUNO" })
db.recipes.find({ name: /TOSTADA/ })
db.recipes.aggregate([
  { $group: { _id: "$type", count: { $sum: 1 } } }
])
```

### Opción 4: SQLite (más simple)

```python
import sqlite3
import json

# Crear base de datos
conn = sqlite3.connect('menochef.db')
c = conn.cursor()

# Tabla
c.execute('''CREATE TABLE recipes (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    type TEXT,
    ingredients TEXT,
    benefits TEXT,
    steps TEXT,
    motivational TEXT
)''')

# Cargar datos
with open('recipes.json', 'r', encoding='utf-8') as f:
    recipes = json.load(f)

for recipe in recipes:
    c.execute('INSERT INTO recipes VALUES (NULL, ?, ?, ?, ?, ?, ?)',
        (recipe['name'], recipe['type'], 
         json.dumps(recipe['ingredients']),
         recipe['benefits'],
         json.dumps(recipe['steps']),
         recipe['motivational']))

conn.commit()
conn.close()
```

## Operaciones Comunes

### Búsqueda por tipo
```javascript
const postres = recipes.filter(r => r.type === 'POSTRE');
const desayunos = recipes.filter(r => r.type === 'DESAYUNO');
```

### Búsqueda por nombre
```javascript
const recipe = recipes.find(r => 
  r.name.toLowerCase().includes('chocolate')
);
```

### Búsqueda por ingrediente
```javascript
const conChocolate = recipes.filter(r =>
  r.ingredients.some(ing => ing.includes('chocolate'))
);
```

### Estadísticas
```javascript
// Tipos disponibles
const types = [...new Set(recipes.map(r => r.type))];

// Contar por tipo
const typeCount = {};
recipes.forEach(r => {
  typeCount[r.type] = (typeCount[r.type] || 0) + 1;
});

// Recetas con beneficios
const withBenefits = recipes.filter(r => r.benefits).length;
```

## Frontend - Ejemplos de Uso

### React

```jsx
import { useState, useEffect } from 'react';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  const filtered = filter === 'ALL' 
    ? recipes 
    : recipes.filter(r => r.type === filter);

  return (
    <div>
      <select onChange={e => setFilter(e.target.value)}>
        <option>ALL</option>
        <option>DESAYUNO</option>
        <option>POSTRE</option>
        {/* ... más opciones */}
      </select>
      
      {filtered.map(recipe => (
        <div key={recipe.name} className="recipe-card">
          <h3>{recipe.name}</h3>
          <p className="type">{recipe.type}</p>
          
          <h4>Ingredientes:</h4>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          
          {recipe.benefits && (
            <div className="benefits">{recipe.benefits}</div>
          )}
          
          <h4>Preparación:</h4>
          <ol>
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          
          {recipe.motivational && (
            <blockquote className="motivational">
              "{recipe.motivational}"
            </blockquote>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
```

### Vue.js

```vue
<template>
  <div class="recipes">
    <select v-model="selectedType">
      <option value="">Todos</option>
      <option v-for="type in types" :key="type" :value="type">
        {{ type }}
      </option>
    </select>

    <div v-for="recipe in filteredRecipes" :key="recipe.name" class="recipe">
      <h3>{{ recipe.name }}</h3>
      <span class="badge">{{ recipe.type }}</span>
      
      <div class="ingredients">
        <h4>Ingredientes:</h4>
        <li v-for="(ing, i) in recipe.ingredients" :key="i">
          {{ ing }}
        </li>
      </div>

      <div v-if="recipe.benefits" class="benefits">
        {{ recipe.benefits }}
      </div>

      <div class="steps">
        <h4>Pasos:</h4>
        <ol>
          <li v-for="(step, i) in recipe.steps" :key="i">
            {{ step }}
          </li>
        </ol>
      </div>

      <blockquote v-if="recipe.motivational" class="quote">
        "{{ recipe.motivational }}"
      </blockquote>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [],
      selectedType: '',
    };
  },
  computed: {
    types() {
      return [...new Set(this.recipes.map(r => r.type))];
    },
    filteredRecipes() {
      return this.selectedType
        ? this.recipes.filter(r => r.type === this.selectedType)
        : this.recipes;
    },
  },
  mounted() {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => { this.recipes = data; });
  },
};
</script>
```

## Performance

- **Tamaño**: 154.8 KB - carga rápidamente
- **Registros**: 193 - procesable en memoria
- **Carga en JSON**: < 100ms
- **Búsqueda lineal**: < 10ms para 193 registros

Para apps grandes, considera indexación en base de datos:
```sql
CREATE INDEX idx_type ON recipes(type);
CREATE INDEX idx_name ON recipes(name);
CREATE INDEX idx_ingredients ON recipes USING GIN(ingredients);
```

## Mantenimiento

### Actualizar con nuevas recetas

Cuando tengas nuevos PDFs, usa `pdf_parser.py`:

```bash
python pdf_parser.py --input nuevos_pdfs.pdf --output recipes_updated.json
```

Luego merge manual o automático:
```python
import json

with open('recipes.json') as f1, open('recipes_updated.json') as f2:
    old = json.load(f1)
    new = json.load(f2)
    
    # Evitar duplicados por nombre
    names = {r['name'] for r in old}
    merged = old + [r for r in new if r['name'] not in names]
    
    with open('recipes_merged.json', 'w') as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)
```

### Validar integridad

```python
import json

with open('recipes.json') as f:
    recipes = json.load(f)

for i, r in enumerate(recipes):
    assert r.get('name'), f"Recipe {i} missing name"
    assert r.get('ingredients'), f"Recipe {i} missing ingredients"
    assert r.get('steps'), f"Recipe {i} missing steps"
    
print(f"✓ Todas las {len(recipes)} recetas son válidas")
```

## Preguntas Frecuentes

**P: ¿Puedo usar esto en producción?**
R: Sí, es una base de datos JSON válida y completa. Para millones de registros, usa una base de datos tradicional.

**P: ¿Cómo busco por ingrediente?**
R: Filtra el array `ingredients` de cada receta. Para búsqueda avanzada, usa base de datos.

**P: ¿Las recetas tienen información nutricional?**
R: No está incluida. Los beneficios son descriptivos, no nutricionales exactos.

**P: ¿Puedo modificar el JSON?**
R: Sí, pero mantén la estructura. Vuelve a generar con `pdf_parser.py` si necesitas actualizar desde PDFs.

## Soporte

Para problemas con el parser o la integración, consulta:
- `README.md` - Documentación del parser
- `EXTRACTION_REPORT.json` - Métricas y estadísticas
- `pdf_parser.py` - Código fuente comentado
