import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import './AdminApp.css';

export default function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="admin-app">
      <div className="admin-navbar">
        <div className="admin-navbar-content">
          <h1>🔧 MenoChef Admin</h1>
          <button onClick={handleLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </div>
      <AdminDashboard />
    </div>
  );
}
