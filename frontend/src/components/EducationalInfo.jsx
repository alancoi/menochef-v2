import { useState } from 'react';
import './EducationalInfo.css';

export default function EducationalInfo() {
  const [expandedCard, setExpandedCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: 'Nutrición inteligente',
      emoji: '🥗',
      shortDesc: 'El alimento es tu medicina',
      fullDesc: 'Una buena nutrición durante la menopausia no es un lujo, es tu medicina. Los alimentos antiinflamatorios ayudan a reducir síntomas, mejorar la energía y fortalecer tu cuerpo.'
    },
    {
      id: 2,
      title: 'Tómate tiempo para ti',
      emoji: '💆‍♀️',
      shortDesc: 'Cuidarte no es egoísmo',
      fullDesc: 'Esta etapa es el momento perfecto para priorizar tu bienestar. Cocinar, comer con calma y disfrutar de comidas saludables es un acto de amor hacia ti misma.'
    },
    {
      id: 3,
      title: 'Tu cuerpo merece respeto',
      emoji: '💪',
      shortDesc: 'Celebra lo que tu cuerpo hace',
      fullDesc: 'La menopausia no es el fin de nada. Es una transición. Tu cuerpo sigue siendo fuerte, capaz y digno de cuidados especiales y atención.'
    },
    {
      id: 4,
      title: 'Sueño reparador',
      emoji: '😴',
      shortDesc: 'Duerme para sanar',
      fullDesc: 'El descanso es cuando tu cuerpo se recupera. Alimentos correctos + rutina + ambiente tranquilo = noche de calidad que te hace sentir diferente al día siguiente.'
    },
    {
      id: 5,
      title: 'Movimiento es vida',
      emoji: '🚶‍♀️',
      shortDesc: 'Cada paso cuenta',
      fullDesc: 'Caminar, bailar, estirar... el movimiento suave y consistente ayuda con síntomas, fortalece huesos y libera endorfinas. No necesita ser intenso, solo constante.'
    },
    {
      id: 6,
      title: 'No estás sola',
      emoji: '💚',
      shortDesc: 'Muchas vivimos esto',
      fullDesc: 'Millones de mujeres están en tu misma situación. Compartir experiencias, recetas y consejos con otras crea una red de apoyo invaluable.'
    }
  ];

  return (
    <section className="educational-info-section">
      <h2 className="edu-title">Información para tu bienestar 💚</h2>

      <div className="info-cards-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`info-card ${expandedCard === card.id ? 'expanded' : ''}`}
            onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
          >
            <div className="card-header">
              <span className="card-emoji">{card.emoji}</span>
              <h3 className="card-title">{card.title}</h3>
            </div>

            {expandedCard === card.id ? (
              <p className="card-full-text">{card.fullDesc}</p>
            ) : (
              <p className="card-short-text">{card.shortDesc}</p>
            )}

            <span className="card-indicator">
              {expandedCard === card.id ? '−' : '+'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
