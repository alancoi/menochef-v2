import './RecipeList.css';

export default function RecipeList({ recipes, onSelectRecipe }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No se encontraron recetas. Intenta con otros ingredientes o categorías.</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe, idx) => {
        // Manejar diferentes formatos de ingredientes
        const ingredientsList = Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : typeof recipe.ingredients === 'string'
          ? recipe.ingredients.split(',').map(i => i.trim())
          : [];

        // Descripción fallback
        const description = recipe.description || recipe.instructions || recipe.preparation || 'Receta preparada';

        return (
          <div
            key={idx}
            className="recipe-card"
            onClick={() => onSelectRecipe(recipe)}
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3>{recipe.name || 'Receta sin nombre'}</h3>

            {recipe.benefits && (
              <p style={{ fontSize: '0.85rem', color: '#8faf9d', fontWeight: '600', margin: '0.5rem 0' }}>
                {recipe.benefits}
              </p>
            )}

            {ingredientsList.length > 0 && (
              <p className="ingredients">
                <strong>Ingredientes:</strong> {ingredientsList.join(', ')}
              </p>
            )}

            {recipe.motivational_text && (
              <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic', margin: '0.75rem 0' }}>
                "{recipe.motivational_text}"
              </p>
            )}

            <p className="description">{description.substring(0, 120)}...</p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
              {recipe.time && <span>⏱️ {recipe.time}</span>}
              {recipe.servings && <span>👥 {recipe.servings}</span>}
              {recipe.calories && <span>🔥 {recipe.calories}</span>}
            </div>

            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#8faf9d', fontWeight: '600' }}>
              Toca para ver la receta completa →
            </p>
          </div>
        );
      })}
    </div>
  );
}
