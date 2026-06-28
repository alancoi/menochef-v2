import { useState, useRef, useEffect } from 'react';
import './ChatBox.css';

export default function ChatBox({ messages, onSendMessage }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    await onSendMessage(input);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h2>👩‍⚕️ Asistente 24/7</h2>
        <p>Pregunta sobre recetas, ingredientes o síntomas</p>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>¡Hola! Soy tu asistente de recetas. Puedo ayudarte a:</p>
            <ul>
              <li>Encontrar recetas según ingredientes</li>
              <li>Recomendaciones para síntomas específicos</li>
              <li>Consejos antiinflamatorios</li>
              <li>Recetas rápidas y saludables</li>
            </ul>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className={`message-content ${msg.role}`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu pregunta aquí..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? '...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
