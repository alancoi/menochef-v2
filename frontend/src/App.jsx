import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import QuickButtons from './components/QuickButtons';
import RecipeList from './components/RecipeList';
import ChatBox from './components/ChatBox';
import AdminDashboard from './components/AdminDashboard';
import EducationalInfo from './components/EducationalInfo';
import './App.css';

const BACKEND_URL = 'https://menochef-v2-backend.vercel.app';

export default function App() {
  const [screen, setScreen] = useState('home'); // home, recipes, chat, profile, admin
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/recipes?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      console.log('Datos recibidos:', data);

      // Manejar tanto búsqueda como obtener todas
      const recipes = data.results || data.recipes || [];
      setRecipes(recipes);
      setScreen('recipes');
    } catch (error) {
      console.error('Error buscando recetas:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickButton = (category) => {
    if (category === 'Asistente virtual') {
      setScreen('chat');
      setMessages([]);
    } else {
      handleSearch(category);
    }
  };

  const handleChatMessage = async (message) => {
    const newMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, newMessage]);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || 'Sin respuesta' }]);
    } catch (error) {
      console.error('Error en chat:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un error. Intenta de nuevo.' }]);
    }
  };

  return (
    <div className="app">
      <Header screen={screen} setScreen={setScreen} />

      <main className="app-main">
        {screen === 'home' && (
          <div className="home-screen">
            <div className="hero-section">
              <img src="/hero.svg" alt="Recetas para tu etapa" className="hero-image" />
            </div>

            <div className="search-section">
              <div className="quick-buttons-section">
                <QuickButtons onButtonClick={handleQuickButton} />
              </div>
            </div>

            <EducationalInfo />
          </div>
        )}

        {screen === 'recipes' && !selectedRecipe && (
          <div className="recipes-screen">
            <button onClick={() => setScreen('home')} className="btn-back">← Volver a Búsqueda</button>
            <h2>Resultados para: {searchQuery}</h2>
            <p>Total de recetas encontradas: {recipes.length}</p>
            {loading ? <p>Cargando...</p> : <RecipeList recipes={recipes} onSelectRecipe={setSelectedRecipe} />}
          </div>
        )}

        {screen === 'recipes' && selectedRecipe && (
          <div className="recipe-detail-screen">
            <button onClick={() => setSelectedRecipe(null)} className="btn-back">← Volver a Resultados</button>
            <div className="recipe-detail">
              <h1>{selectedRecipe.name}</h1>

              {selectedRecipe.benefits && (
                <p style={{ fontSize: '1rem', color: '#8faf9d', fontWeight: '600', marginBottom: '1rem' }}>
                  ✨ {selectedRecipe.benefits}
                </p>
              )}

              {selectedRecipe.motivational_text && (
                <div style={{ backgroundColor: '#f0f5f3', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid #8faf9d' }}>
                  <p style={{ fontSize: '1rem', color: '#333', fontStyle: 'italic', margin: '0' }}>
                    "{selectedRecipe.motivational_text}"
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', fontSize: '1rem', color: '#666' }}>
                {selectedRecipe.time && <span>⏱️ {selectedRecipe.time}</span>}
                {selectedRecipe.servings && <span>👥 {selectedRecipe.servings}</span>}
                {selectedRecipe.calories && <span>🔥 {selectedRecipe.calories}</span>}
              </div>

              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.3rem', color: '#5a7f74', marginBottom: '0.8rem' }}>Ingredientes</h2>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  {selectedRecipe.ingredients && (Array.isArray(selectedRecipe.ingredients)
                    ? selectedRecipe.ingredients
                    : typeof selectedRecipe.ingredients === 'string'
                    ? selectedRecipe.ingredients.split(',').map(i => i.trim())
                    : []
                  ).map((ingredient, idx) => (
                    <li key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee', paddingLeft: '1rem' }}>
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '1.3rem', color: '#5a7f74', marginBottom: '0.8rem' }}>Preparación</h2>
                <p style={{ lineHeight: '1.8', fontSize: '1rem', color: '#333' }}>
                  {selectedRecipe.description || selectedRecipe.instructions || selectedRecipe.preparation || 'Receta preparada'}
                </p>
              </section>
            </div>
          </div>
        )}

        {screen === 'chat' && (
          <div className="chat-screen">
            <button onClick={() => setScreen('home')} className="btn-back">← Volver a Inicio</button>
            <ChatBox messages={messages} onSendMessage={handleChatMessage} />
          </div>
        )}

        {screen === 'admin' && (
          <div className="admin-screen">
            <button onClick={() => setScreen('home')} className="btn-back">← Volver a Inicio</button>
            <AdminDashboard />
          </div>
        )}

      </main>
    </div>
  );
}
// Update
