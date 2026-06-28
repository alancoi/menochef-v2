import { useState } from 'react';
import './Header.css';

export default function Header({ screen, setScreen }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="header">
      <div className="header-center">
        <div className="logo-container" onClick={() => setScreen('home')}>
          <img
            src="/logo.png"
            alt="MenoChef"
            className="logo-image"
          />
        </div>

        <div className="settings-btn-header">
          <button
            className="settings-icon-header"
            onClick={() => setShowSettings(!showSettings)}
            title="Configuración"
          >
            ⚙️
          </button>

          {showSettings && (
            <div className="settings-menu-header">
              <button onClick={() => window.location.href = 'mailto:sanaencasa.ar@gmail.com?subject=Feedback MenoChef'}>
                💬 Reportar error / Sugerencia
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
