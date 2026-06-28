import './QuickButtons.css';

export default function QuickButtons({ onButtonClick }) {
  const mainButtons = [
    { label: 'Desinflamarse', emoji: '🍃' },
    { label: 'Más energía', emoji: '⚡' },
    { label: 'Mejor sueño', emoji: '😴' },
    { label: 'Bajar de peso', emoji: '⚖️' },
    { label: 'Postres saludables', emoji: '🍰' },
    { label: 'Jugos saludables', emoji: '🥤' }
  ];

  const specialButton = { label: 'Asistente virtual', emoji: '👩‍⚕️' };

  return (
    <div className="quick-buttons-container">
      <div className="quick-buttons main-grid">
        {mainButtons.map((btn) => (
          <button
            key={btn.label}
            className="quick-btn premium-btn"
            onClick={() => onButtonClick(btn.label)}
          >
            <span className="btn-emoji">{btn.emoji}</span>
            <span className="btn-text">{btn.label}</span>
          </button>
        ))}
      </div>

      <button
        className="quick-btn special-btn"
        onClick={() => onButtonClick(specialButton.label)}
      >
        <span className="btn-emoji large">{specialButton.emoji}</span>
        <span className="btn-text">{specialButton.label}</span>
      </button>
    </div>
  );
}
